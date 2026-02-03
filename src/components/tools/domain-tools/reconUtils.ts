// Domain reconnaissance utilities
import type { 
  Subdomain, DNSRecord, GraphNode, GraphEdge, TechStack, SecurityHeader,
  WhoisData, RobotsTxtData, EmailSecurityData, SSLInfo, WaybackSnapshot 
} from './types';

// DNS lookup via Google DNS API
export async function dnsLookup(hostname: string, type: string = 'A'): Promise<DNSRecord[]> {
  try {
    const res = await fetch(`https://dns.google/resolve?name=${hostname}&type=${type}`);
    const data = await res.json();
    
    if (data.Status === 0 && data.Answer) {
      return data.Answer.map((ans: any) => ({
        type: type,
        value: ans.data,
        ttl: ans.TTL
      }));
    }
    return [];
  } catch {
    return [];
  }
}

// Check if subdomain is live
export async function checkSubdomainStatus(hostname: string): Promise<'live' | 'dead'> {
  try {
    const records = await dnsLookup(hostname, 'A');
    return records.length > 0 ? 'live' : 'dead';
  } catch {
    return 'dead';
  }
}

// Certificate Transparency lookup via crt.sh
export async function getCrtShSubdomains(domain: string): Promise<string[]> {
  try {
    const res = await fetch(`https://crt.sh/?q=%25.${domain}&output=json`);
    if (!res.ok) return [];
    
    const data = await res.json();
    const subdomains = new Set<string>();
    
    for (const cert of data) {
      const names = cert.name_value.split('\n');
      for (const name of names) {
        const cleaned = name.trim().toLowerCase().replace(/^\*\./, '');
        if (cleaned.endsWith(domain) && !cleaned.includes('*')) {
          subdomains.add(cleaned);
        }
      }
    }
    
    return Array.from(subdomains);
  } catch {
    return [];
  }
}

// DNS brute force with common subdomain names
export async function bruteforceSubdomains(domain: string, onProgress?: (found: number) => void): Promise<string[]> {
  const commonNames = [
    'www', 'mail', 'ftp', 'localhost', 'webmail', 'smtp', 'pop', 'ns1', 'ns2',
    'admin', 'api', 'dev', 'staging', 'test', 'beta', 'app', 'mobile', 'cdn',
    'blog', 'shop', 'store', 'secure', 'vpn', 'remote', 'portal', 'dashboard',
    'static', 'assets', 'images', 'img', 'css', 'js', 'media', 'files', 'docs',
    'support', 'help', 'status', 'mx', 'mx1', 'mx2', 'email', 'cloud', 'git',
    'jenkins', 'ci', 'build', 'deploy', 'prod', 'production', 'uat', 'demo',
    'sandbox', 'internal', 'intranet', 'extranet', 'partner', 'partners',
    'customer', 'clients', 'client', 'crm', 'erp', 'hr', 'billing', 'payment',
    'auth', 'login', 'sso', 'oauth', 'id', 'identity', 'accounts', 'account'
  ];
  
  const found: string[] = [];
  const batchSize = 10;
  
  for (let i = 0; i < commonNames.length; i += batchSize) {
    const batch = commonNames.slice(i, i + batchSize);
    const results = await Promise.all(
      batch.map(async (name) => {
        const hostname = `${name}.${domain}`;
        const records = await dnsLookup(hostname, 'A');
        return records.length > 0 ? hostname : null;
      })
    );
    
    for (const r of results) {
      if (r) found.push(r);
    }
    
    if (onProgress) onProgress(found.length);
  }
  
  return found;
}

// Archive.org historical subdomains
export async function getArchiveSubdomains(domain: string): Promise<string[]> {
  try {
    const res = await fetch(
      `https://web.archive.org/cdx/search/cdx?url=*.${domain}&output=json&fl=original&collapse=urlkey&limit=500`
    );
    if (!res.ok) return [];
    
    const data = await res.json();
    const subdomains = new Set<string>();
    
    // Skip header row
    for (let i = 1; i < data.length; i++) {
      try {
        const url = new URL(data[i][0]);
        if (url.hostname.endsWith(domain)) {
          subdomains.add(url.hostname.toLowerCase());
        }
      } catch {}
    }
    
    return Array.from(subdomains);
  } catch {
    return [];
  }
}

// Get IP geolocation info
export async function getIpInfo(ip: string): Promise<Record<string, any> | null> {
  try {
    const res = await fetch(`https://ipapi.co/${ip}/json/`);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

// WHOIS lookup via free API
// WHOIS lookup via free API

export async function getWhoisData(domain: string): Promise<WhoisData | null> {
  let data: any = null;
  
  try {
    // 1. Try who-dat API (easier to parse)
    const res = await fetch(`https://who-dat.as93.net/${domain}`);
    if (res.ok) {
      data = await res.json();
    }
  } catch {}

  // 2. Fallback to RDAP (Standard & Reliable)
  if (!data || !data.domain) {
    try {
      const rdapRes = await fetch(`https://rdap.org/domain/${domain}`);
      if (rdapRes.ok) {
        const rdap = await rdapRes.json();
        const events = rdap.events || [];
        
        const created = events.find((e: any) => e.eventAction === 'registration')?.eventDate;
        const expires = events.find((e: any) => e.eventAction === 'expiration')?.eventDate;
        const updated = events.find((e: any) => e.eventAction === 'last changed')?.eventDate;
        
        data = {
          domain: {
             created_date: created,
             expiration_date: expires,
             updated_date: updated
          },
          registrar: {
            name: rdap.entities?.find((e: any) => e.roles?.includes('registrar'))?.vcardArray?.[1]?.find((p: any) => p[0] === 'fn')?.[3],
            url: rdap.links?.find((l: any) => l.rel === 'related')?.href
          },
          nameservers: rdap.nameservers?.map((n: any) => n.ldhName),
          status: rdap.header?.status || rdap.status,
          dnssec: rdap.secureDNS?.delegationSigned ? 'signedDelegation' : 'unsigned'
        };
      }
    } catch {}
  }

  if (!data) return null;
  
  // Parse dates
  const creationDate = data.domain?.created_date || data.created || null;
  const expirationDate = data.domain?.expiration_date || data.expires || null;
      
  let daysUntilExpiry: number | undefined;
  let domainAge: number | undefined;
      
  if (expirationDate) {
    const expDate = new Date(expirationDate);
    const now = new Date();
    daysUntilExpiry = Math.floor((expDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  }
      
  if (creationDate) {
    const createDate = new Date(creationDate);
    const now = new Date();
    domainAge = Math.floor((now.getTime() - createDate.getTime()) / (1000 * 60 * 60 * 24));
  }
      
  return {
    domainName: domain,
    registrar: data.registrar?.name || data.registrar,
    registrarUrl: data.registrar?.url,
    creationDate,
    expirationDate,
    updatedDate: data.domain?.updated_date || data.updated,
    nameServers: data.domain?.name_servers || data.nameservers || [],
    status: data.domain?.status || data.status || [],
    dnssec: data.domain?.dnssec || data.dnssec,
    registrantOrg: data.registrant?.organization || data.registrant?.name,
    registrantCountry: data.registrant?.country,
    daysUntilExpiry,
    domainAge
  };
}

// Robots.txt analysis
// Robots.txt analysis

// Helper to bypass CORS using a proxy
async function fetchWithProxy(url: string, asJson = false): Promise<any> {
  const proxies = [
    `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
    `https://corsproxy.io/?${encodeURIComponent(url)}`,
    `https://thingproxy.freeboard.io/fetch/${url}`
  ];

  for (const proxy of proxies) {
    try {
      const res = await fetch(proxy);
      if (res.ok) {
        return asJson ? await res.json() : await res.text();
      }
    } catch {}
  }
  
  // Fallback to direct fetch (might work if CORS is enabled)
  const res = await fetch(url);
  if (res.ok) {
    return asJson ? await res.json() : await res.text();
  }
  throw new Error('Failed to fetch');
}

export async function analyzeRobotsTxt(domain: string): Promise<RobotsTxtData> {
  try {
    const content = await fetchWithProxy(`https://${domain}/robots.txt`);
    
    if (!content || typeof content !== 'string') {
      throw new Error('No content');
    }
    
    const lines = content.split('\n');
    
    const userAgents: string[] = [];
    const disallowedPaths: string[] = [];
    const allowedPaths: string[] = [];
    const sitemaps: string[] = [];
    let crawlDelay: number | undefined;
    
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.toLowerCase().startsWith('user-agent:')) {
        userAgents.push(trimmed.split(':')[1]?.trim() || '');
      } else if (trimmed.toLowerCase().startsWith('disallow:')) {
        const path = trimmed.split(':')[1]?.trim();
        if (path) disallowedPaths.push(path);
      } else if (trimmed.toLowerCase().startsWith('allow:')) {
        const path = trimmed.split(':')[1]?.trim();
        if (path) allowedPaths.push(path);
      } else if (trimmed.toLowerCase().startsWith('sitemap:')) {
        sitemaps.push(trimmed.split(':', 2)[1]?.trim() || '');
      } else if (trimmed.toLowerCase().startsWith('crawl-delay:')) {
        crawlDelay = parseInt(trimmed.split(':')[1]?.trim() || '0');
      }
    }
    
    return {
      exists: true,
      content: content.slice(0, 2000), // Limit size
      userAgents: [...new Set(userAgents)],
      disallowedPaths: [...new Set(disallowedPaths)],
      allowedPaths: [...new Set(allowedPaths)],
      sitemaps: [...new Set(sitemaps)],
      crawlDelay
    };
  } catch {
    return { exists: false, userAgents: [], disallowedPaths: [], allowedPaths: [], sitemaps: [] };
  }
}

// Email security (SPF, DMARC) check via DNS
// Email security (SPF, DMARC) check via DNS

export async function checkEmailSecurity(domain: string): Promise<EmailSecurityData> {
  const [txtRecords, dmarcRecords, mxRecords] = await Promise.all([
    dnsLookup(domain, 'TXT'),
    dnsLookup(`_dmarc.${domain}`, 'TXT'),
    dnsLookup(domain, 'MX')
  ]);
  
  const spfRecord = txtRecords.find(r => r.value.includes('v=spf1'));
  const dmarcRecord = dmarcRecords.find(r => r.value.includes('v=DMARC1'));
  
  return {
    hasSPF: !!spfRecord,
    spfRecord: spfRecord?.value,
    hasDMARC: !!dmarcRecord,
    dmarcRecord: dmarcRecord?.value,
    hasMX: mxRecords.length > 0,
    mxRecords: mxRecords.map(r => r.value)
  };
}

// SSL Certificate info (basic check)
// SSL Certificate info (basic check)

export async function checkSSL(domain: string): Promise<SSLInfo> {
  try {
    const res = await fetch(`https://${domain}/`, { method: 'HEAD' });
    return {
      valid: res.ok || res.status < 500,
      protocol: 'TLS 1.2/1.3 (assumed)'
    };
  } catch {
    return { valid: false };
  }
}

// Helper to batch resolve IPs for subdomains
export async function resolveSubdomainIPs(subdomains: Subdomain[]): Promise<Subdomain[]> {
  const resolved: Subdomain[] = [];
  const batchSize = 10;
  
  for (let i = 0; i < subdomains.length; i += batchSize) {
    const batch = subdomains.slice(i, i + batchSize);
    await Promise.all(batch.map(async (sub) => {
      try {
        const records = await dnsLookup(sub.hostname, 'A');
        if (records.length > 0) {
          resolved.push({ ...sub, ip: records[0].value, status: 'live' });
        } else {
          resolved.push({ ...sub, status: 'dead' }); // Or unknown if just no A record
        }
      } catch {
        resolved.push(sub);
      }
    }));
  }
  return resolved;
}

// Sitemap detection with strict validation
export async function detectSitemap(domain: string, robotsTxt?: RobotsTxtData): Promise<string[]> {
  const sitemaps: string[] = [];
  
  if (robotsTxt?.sitemaps) {
    sitemaps.push(...robotsTxt.sitemaps);
  }
  
  const commonPaths = [
    '/sitemap.xml', '/sitemap_index.xml', '/sitemap/', '/sitemaps/sitemap.xml',
    '/sitemap1.xml', '/wp-sitemap.xml', '/sitemap-index.xml'
  ];
  
  for (const path of commonPaths) {
    const fullUrl = `https://${domain}${path}`;
    if (sitemaps.includes(fullUrl)) continue;
    
    try {
      const content = await fetchWithProxy(fullUrl);
      // Validate content to avoid soft 404s
      if (typeof content === 'string' && (content.includes('<urlset') || content.includes('<sitemapindex') || content.includes('www.sitemaps.org'))) {
        sitemaps.push(fullUrl);
      }
    } catch {}
  }
  
  return [...new Set(sitemaps)];
}

// Build network graph ensuring valid tree structure
export function buildNetworkGraph(
  domain: string,
  subdomains: Subdomain[],
  vulnerabilities: { target: string; severity: string }[]
): { nodes: GraphNode[]; edges: GraphEdge[] } {
  const nodes: GraphNode[] = [];
  const edges: GraphEdge[] = [];
  const addedNodeIds = new Set<string>();
  
  // Add root
  nodes.push({
    id: domain,
    type: 'root',
    label: domain,
    status: 'live',
    risk: vulnerabilities.some(v => v.target === domain) ? 'high' : 'low'
  });
  addedNodeIds.add(domain);
  
  // Add subdomains
  for (const sub of subdomains) {
    if (addedNodeIds.has(sub.hostname)) continue;
    
    const isVuln = vulnerabilities.some(v => v.target === sub.hostname);
    nodes.push({
      id: sub.hostname,
      type: 'subdomain',
      label: sub.hostname.replace(`.${domain}`, ''),
      status: sub.status,
      risk: isVuln ? 'critical' : 'none',
      data: { ip: sub.ip, source: sub.source }
    });
    addedNodeIds.add(sub.hostname);
    
    // Always connect to root to ensure tree structure
    edges.push({ source: domain, target: sub.hostname, type: 'CONTAINS' });
    
    // Add IP Node if exists
    if (sub.ip && !addedNodeIds.has(sub.ip)) {
      nodes.push({
        id: sub.ip,
        type: 'ip',
        label: sub.ip,
        status: 'live',
        risk: 'none'
      });
      addedNodeIds.add(sub.ip);
    }
    
    if (sub.ip) {
      edges.push({ source: sub.hostname, target: sub.ip, type: 'RESOLVES_TO' });
    }
  }
  
  return { nodes, edges };
}

// RESTORED FUNCTIONS

// WAF/CDN Detection
export function detectWAF(headers: Headers): string | null {
  const server = headers.get('server')?.toLowerCase() || '';
  const cfRay = headers.get('cf-ray');
  
  if (cfRay || server.includes('cloudflare')) return 'Cloudflare';
  if (server.includes('awselb') || headers.get('x-amz-cf-id')) return 'AWS CloudFront';
  if (server.includes('akamai') || headers.get('x-akamai-request-id')) return 'Akamai';
  if (headers.get('x-sucuri-id')) return 'Sucuri';
  if (server.includes('fastly')) return 'Fastly';
  if (headers.get('x-cdn') === 'Imperva' || headers.get('x-iinfo')) return 'Imperva';
  
  return null;
}

// Extract HTTP response headers for display
export function extractImportantHeaders(headers: Headers): Record<string, string> {
  const important = [
    'server', 'x-powered-by', 'content-type', 'cache-control',
    'x-frame-options', 'x-xss-protection', 'x-content-type-options',
    'strict-transport-security', 'content-security-policy',
    'referrer-policy', 'permissions-policy', 'cf-ray', 'x-cache',
    'age', 'via', 'vary', 'etag', 'last-modified'
  ];
  
  const result: Record<string, string> = {};
  for (const name of important) {
    const value = headers.get(name);
    if (value) result[name] = value;
  }
  return result;
}

// Technology detection from HTML and headers
export function detectTechnologies(html: string, headers: Headers): TechStack[] {
  const techs: TechStack[] = [];
  
  // Server detection
  const server = headers.get('server');
  if (server) {
    if (server.toLowerCase().includes('nginx')) {
      techs.push({ category: 'Web Server', name: 'Nginx', confidence: 100 });
    } else if (server.toLowerCase().includes('apache')) {
      techs.push({ category: 'Web Server', name: 'Apache', confidence: 100 });
    } else if (server.toLowerCase().includes('cloudflare')) {
      techs.push({ category: 'CDN', name: 'Cloudflare', confidence: 100 });
    }
  }
  
  // Framework detection from HTML
  if (html.includes('wp-content') || html.includes('wp-includes')) {
    techs.push({ category: 'CMS', name: 'WordPress', confidence: 95 });
  }
  if (html.includes('Shopify.theme')) {
    techs.push({ category: 'E-commerce', name: 'Shopify', confidence: 95 });
  }
  if (html.includes('data-reactroot') || html.includes('__NEXT_DATA__')) {
    techs.push({ category: 'Framework', name: 'React', confidence: 90 });
  }
  // Simplified for brevity, adding back core logic
  
  return techs;
}

// Security headers analysis
export function analyzeSecurityHeaders(headers: Headers): SecurityHeader[] {
  const results: SecurityHeader[] = [];
  
  const checkHeader = (name: string, present: boolean, value?: string): SecurityHeader => {
    return {
      name,
      present,
      value: value || undefined,
      severity: present ? 'good' : 'warning'
    };
  };
  
  results.push(checkHeader('Strict-Transport-Security', !!headers.get('strict-transport-security')));
  results.push(checkHeader('Content-Security-Policy', !!headers.get('content-security-policy')));
  results.push(checkHeader('X-Frame-Options', !!headers.get('x-frame-options')));
  results.push(checkHeader('X-Content-Type-Options', !!headers.get('x-content-type-options')));
  results.push(checkHeader('X-XSS-Protection', !!headers.get('x-xss-protection')));
  results.push(checkHeader('Referrer-Policy', !!headers.get('referrer-policy')));
  
  return results;
}

// Wayback Machine Snapshots
export async function getWaybackSnapshots(domain: string): Promise<WaybackSnapshot[]> {
  try {
    const res = await fetch(
      `https://web.archive.org/cdx/search/cdx?url=${domain}&output=json&fl=timestamp,original,statuscode,mimetype&filter=statuscode:200&collapse=timestamp:6&limit=50`
    );
    if (!res.ok) return [];
    
    const data = await res.json();
    const snapshots: WaybackSnapshot[] = [];
    
    for (let i = 1; i < data.length; i++) {
      const [timestamp, original, statusCode, mimeType] = data[i];
      const year = timestamp.slice(0, 4);
      const month = timestamp.slice(4, 6);
      const day = timestamp.slice(6, 8);
      
      snapshots.push({
        timestamp,
        displayDate: `${year}-${month}-${day}`,
        url: `https://web.archive.org/web/${timestamp}/${original}`,
        statusCode,
        mimeType
      });
    }
    return snapshots;
  } catch {
    return [];
  }
}

export async function getWaybackSummary(domain: string): Promise<any> {
    try {
        const res3 = await fetch(`https://web.archive.org/cdx/search/cdx?url=${domain}&output=json&fl=timestamp&showNumPages=true`);
        const count = await res3.text();
        return { totalSnapshots: parseInt(count) || 0 };
    } catch { return null; }
}
