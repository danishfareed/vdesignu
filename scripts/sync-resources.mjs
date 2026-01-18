import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import { pipeline } from "node:stream/promises";
import matter from "gray-matter";
import * as tar from "tar";
import fetch from "node-fetch";

// CHANGED: Unified output filename to match Astro page import
const OUT_FILE = "src/data/resources.json";
const CACHE_FILE = ".cache/developer-resources.json";
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

// Optional GitHub token for higher rate limits (5000/hr vs 60/hr)
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

// Canonicalize URLs - remove duplicates
function canonicalizeUrl(input) {
  try {
    const u = new URL(input.trim());
    u.hash = "";
    
    // Remove tracking params
    ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", 
     "ref", "source", "fbclid", "gclid"].forEach(p => u.searchParams.delete(p));
    
    u.hostname = u.hostname.replace(/^www\./, "").toLowerCase();
    u.pathname = u.pathname.replace(/\/+$/, "");
    if (!u.pathname) u.pathname = "/";
    u.protocol = "https:";
    if ([...u.searchParams.keys()].length === 0) u.search = "";
    
    return u.toString();
  } catch {
    return null;
  }
}

// Merge duplicate resources
function mergeResource(a, b) {
  return {
    title: a.title || b.title,
    url: a.url,
    description: (a.description?.length > b.description?.length ? a.description : b.description) || "",
    tags: Array.from(new Set([...(a.tags || []), ...(b.tags || [])])),
    categories: Array.from(new Set([...(a.categories || []), ...(b.categories || [])])),
    sources: Array.from(new Set([...(a.sources || []), ...(b.sources || [])])),
    lastUpdatedAt: new Date().toISOString(),
  };
}

// Download GitHub repo tarball
async function downloadAndExtractTarball(url, destDir) {
  const headers = GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}` } : {};
  const res = await fetch(url, { headers });
  
  if (!res.ok) {
    if (res.status === 403) {
      throw new Error(`Rate limit hit. Add GITHUB_TOKEN env variable for 5000 req/hr.`);
    }
    throw new Error(`Download failed: ${res.status} ${url}`);
  }
  
  const tgzPath = path.join(destDir, "repo.tgz");
  const writeStream = (await import("node:fs")).createWriteStream(tgzPath);
  await pipeline(res.body, writeStream);
  
  await tar.x({ file: tgzPath, cwd: destDir });
  const entries = await fs.readdir(destDir);
  const root = entries.find(e => e !== "repo.tgz");
  return path.join(destDir, root);
}

// Parse free-for.dev README
function parseFreeForDev(readmeContent) {
  const resources = [];
  const lines = readmeContent.split("\n");
  let currentCategory = "";
  
  for (const line of lines) {
    const trimmed = line.trim();
    
    // Detect category headers (## Something)
    if (trimmed.startsWith("## ") && !trimmed.includes("Table of Contents")) {
      currentCategory = trimmed.replace(/^##\s*/, "").replace(/\*\*\[.*?\]\(.*?\)\*\*/, "").trim();
      continue;
    }
    
    // Parse list items with links: * [Title](url) - description
    const linkMatch = trimmed.match(/^\s*\*\s*\[([^\]]+)\]\(([^)]+)\)\s*[-—–]\s*(.+)/);
    if (linkMatch && currentCategory) {
      const [, title, url, description] = linkMatch;
      const canon = canonicalizeUrl(url);
      
      if (canon && title && !title.toLowerCase().includes("back to top")) {
        resources.push({
          title: title.trim(),
          url: canon,
          description: description.trim().replace(/\*\*/g, "").substring(0, 300),
          tags: [],
          categories: [currentCategory],
          sources: ["free-for.dev"],
        });
      }
    }
  }
  
  return resources;
}

// Parse web-dev-resources README
function parseWebDevResources(readmeContent) {
  const resources = [];
  const lines = readmeContent.split("\n");
  let currentCategory = "";
  
  for (const line of lines) {
    const trimmed = line.trim();
    
    // Detect headers (## or ###)
    if (trimmed.startsWith("### ") || trimmed.startsWith("## ")) {
      currentCategory = trimmed.replace(/^#{2,3}\s*/, "").replace(/📚|🎨|⚡|🔧|📝|🔥/g, "").trim();
      continue;
    }
    
    // Parse markdown links
    const linkMatch = trimmed.match(/^\s*[-*]\s*\[([^\]]+)\]\(([^)]+)\)\s*[-—–]?\s*(.*)/);
    if (linkMatch && currentCategory) {
      const [, title, url, description] = linkMatch;
      const canon = canonicalizeUrl(url);
      
      if (canon && title) {
        resources.push({
          title: title.trim(),
          url: canon,
          description: (description || "").trim().substring(0, 300),
          tags: [],
          categories: [currentCategory],
          sources: ["web-dev-resources"],
        });
      }
    }
  }
  
  return resources;
}

// Parse freestuff.dev frontmatter files
async function parseFreeStuffDevTools(toolsDir) {
  const resources = [];
  
  try {
    const files = await fs.readdir(toolsDir);
    
    for (const file of files.filter(f => f.endsWith(".md"))) {
      try {
        const raw = await fs.readFile(path.join(toolsDir, file), "utf8");
        const { data: fm, content } = matter(raw);
        
        if (!fm.link) continue;
        
        const canon = canonicalizeUrl(fm.link);
        if (!canon) continue;
        
        const bodyDescription = content.trim().split("\n").filter(l => l.trim()).join(". ");
        const fullDescription = fm.snippet || bodyDescription || "";
        
        resources.push({
          title: fm.title || "",
          url: canon,
          description: fullDescription.substring(0, 300),
          tags: Array.isArray(fm.tags) ? fm.tags.map(String) : [],
          categories: [],
          sources: ["freestuff.dev"],
        });
      } catch (err) {
        console.warn(`Failed to parse ${file}:`, err.message);
      }
    }
  } catch (err) {
    console.warn("Failed to read tools directory:", err.message);
  }
  
  return resources;
}

// Check cache validity
async function isCacheValid() {
  try {
    const stats = await fs.stat(CACHE_FILE);
    const age = Date.now() - stats.mtimeMs;
    return age < CACHE_DURATION;
  } catch {
    return false;
  }
}

async function loadCache() {
  try {
    const data = await fs.readFile(CACHE_FILE, "utf8");
    return JSON.parse(data);
  } catch {
    return null;
  }
}

async function saveCache(data) {
  await fs.mkdir(path.dirname(CACHE_FILE), { recursive: true });
  await fs.writeFile(CACHE_FILE, JSON.stringify(data, null, 2), "utf8");
}

async function main() {
  console.log("🚀 Starting resource sync...");
  
  // Check cache first
  if (await isCacheValid()) {
    console.log("✅ Using cached data (less than 24 hours old)");
    const cached = await loadCache();
    if (cached) {
      await fs.mkdir(path.dirname(OUT_FILE), { recursive: true });
      const output = {
        lastUpdatedAt: new Date().toISOString(), // Or get from cache file stats if we wanted to be precise, but this is fine
        resources: cached
      };
      await fs.writeFile(OUT_FILE, JSON.stringify(output, null, 2), "utf8");
      console.log(`📦 Loaded ${cached.length} resources from cache`);
      return;
    }
  }
  
  console.log("🔄 Fetching fresh data from GitHub...");
  
  const tmp = await fs.mkdtemp(path.join(os.tmpdir(), "resources-sync-"));
  
  const repos = [
    {
      name: "free-for.dev",
      tarball: "https://codeload.github.com/ripienaar/free-for-dev/tar.gz/refs/heads/master",
      parser: async (repoRoot) => {
        const readmePath = path.join(repoRoot, "README.md");
        const content = await fs.readFile(readmePath, "utf8");
        return parseFreeForDev(content);
      }
    },
    {
      name: "web-dev-resources",
      tarball: "https://codeload.github.com/iamismile/web-dev-resources/tar.gz/refs/heads/main",
      parser: async (repoRoot) => {
        const readmePath = path.join(repoRoot, "README.md");
        const content = await fs.readFile(readmePath, "utf8");
        return parseWebDevResources(content);
      }
    },
    {
      name: "freestuff.dev",
      tarball: "https://codeload.github.com/hilmanski/freeStuffDev/tar.gz/refs/heads/main",
      parser: async (repoRoot) => {
        const toolsDir = path.join(repoRoot, "src/content/tools");
        return await parseFreeStuffDevTools(toolsDir);
      }
    },
  ];
  
  const all = [];
  
  for (const repo of repos) {
    console.log(`📥 Downloading ${repo.name}...`);
    const dir = await fs.mkdtemp(path.join(tmp, repo.name.replace(/\W/g, "-") + "-"));
    
    try {
      const repoRoot = await downloadAndExtractTarball(repo.tarball, dir);
      console.log(`🔍 Parsing ${repo.name}...`);
      const resources = await repo.parser(repoRoot);
      console.log(`✅ Found ${resources.length} resources from ${repo.name}`);
      all.push(...resources);
    } catch (err) {
      console.error(`❌ Failed to process ${repo.name}:`, err.message);
    }
  }
  
  console.log(`\n🔄 Deduplicating ${all.length} total resources...`);
  
  // Dedupe by canonical URL
  const byUrl = new Map();
  for (const resource of all) {
    if (!byUrl.has(resource.url)) {
      byUrl.set(resource.url, resource);
    } else {
      byUrl.set(resource.url, mergeResource(byUrl.get(resource.url), resource));
    }
  }
  
  const dedupedResources = [...byUrl.values()].sort((a, b) => 
    a.title.localeCompare(b.title)
  );
  
  console.log(`✨ ${dedupedResources.length} unique resources after deduplication`);
  
  // Save output and cache
  const finalOutput = {
    lastUpdatedAt: new Date().toISOString(),
    resources: dedupedResources
  };

  await fs.mkdir(path.dirname(OUT_FILE), { recursive: true });
  await fs.writeFile(OUT_FILE, JSON.stringify(finalOutput, null, 2), "utf8");
  await saveCache(dedupedResources);
  
  console.log(`\n💾 Saved to ${OUT_FILE}`);
  
  // Stats
  const sourceCounts = {};
  const categoryCounts = {};
  dedupedResources.forEach(r => {
    r.sources.forEach(s => sourceCounts[s] = (sourceCounts[s] || 0) + 1);
    r.categories.forEach(c => categoryCounts[c] = (categoryCounts[c] || 0) + 1);
  });
  
  console.log("\n📊 Stats:");
  console.log("Sources:", sourceCounts);
  console.log("Categories:", Object.keys(categoryCounts).length);
  
  // Cleanup
  await fs.rm(tmp, { recursive: true, force: true });
  console.log("\n✅ Sync complete!");
}

main().catch(err => {
  console.error("❌ Fatal error:", err);
  process.exit(1);
});
