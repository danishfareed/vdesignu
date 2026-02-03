/**
 * VDesignU SEO Tools Suite
 * Central data file for all 100 tools across 9 categories
 */

// Tool Category Interface
export interface ToolCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string; // Lucide icon name
  tier: 1 | 2;
  toolCount: number;
}

// Tool Interface
export interface Tool {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  categoryId: string;
  tier: 1 | 2;
  icon: string;
  keywords: string[];
  featured?: boolean;
  instructions?: string[];
  link?: string;
}

// Categories Definition
export const toolCategories: ToolCategory[] = [
  {
    id: "structured-data",
    name: "Structured Data",
    slug: "structured-data",
    description: "Generate JSON-LD schema markup for better search engine understanding. Enhance your SERP appearances with rich snippets.",
    icon: "Code2",
    tier: 1,
    toolCount: 12
  },
  {
    id: "sitemaps-robots",
    name: "Sitemaps & Robots",
    slug: "sitemaps-robots",
    description: "Create and validate sitemaps, robots.txt files, and crawl configurations for optimal search engine indexing.",
    icon: "FileCode",
    tier: 1,
    toolCount: 8
  },
  {
    id: "meta-tags-social",
    name: "Meta Tags & Social",
    slug: "meta-tags-social",
    description: "Generate meta tags, Open Graph tags, and social media markup for improved sharing and SEO.",
    icon: "Share2",
    tier: 1,
    toolCount: 11
  },
  {
    id: "tracking-analytics",
    name: "Tracking & Analytics",
    slug: "tracking-analytics",
    description: "Build UTM parameters, GA4 events, dataLayer configurations, and tracking code for comprehensive analytics.",
    icon: "BarChart3",
    tier: 1,
    toolCount: 14
  },
  {
    id: "redirects-migrations",
    name: "Redirects & Migrations",
    slug: "redirects-migrations",
    description: "Generate redirect rules for Apache, Nginx, Netlify, and Vercel. Plan and execute site migrations.",
    icon: "ArrowRightLeft",
    tier: 1,
    toolCount: 8
  },
  {
    id: "security-headers",
    name: "Security & Headers",
    slug: "security-headers",
    description: "Generate HTTP security headers, CSP policies, SSL configurations, and email authentication records.",
    icon: "Shield",
    tier: 1,
    toolCount: 10
  },
  {
    id: "content-copy",
    name: "Content & Copy",
    slug: "content-copy",
    description: "Generate SEO-optimized titles, descriptions, headings, and content briefs for better rankings.",
    icon: "FileText",
    tier: 2,
    toolCount: 12
  },
  {
    id: "arabic-seo",
    name: "Arabic SEO & Localization",
    slug: "arabic-seo",
    description: "Specialized tools for Arabic SEO, RTL optimization, and Middle East regional targeting.",
    icon: "Languages",
    tier: 2,
    toolCount: 15
  },
  {
    id: "gcc-compliance",
    name: "GCC Compliance & Government",
    slug: "gcc-compliance",
    description: "VAT calculators, business registration tools, and compliance checkers for UAE, KSA, and GCC markets.",
    icon: "Building2",
    tier: 2,
    toolCount: 10
  },
  {
    id: "local-seo",
    name: "Local SEO Tools",
    slug: "local-seo",
    description: "Free tools for local search optimization. Check local rankings, generate review links, and create LocalBusiness schema markup.",
    icon: "MapPin",
    tier: 1,
    toolCount: 4
  },
  {
    id: "developer-formatters",
    name: "Developer & Formatters",
    slug: "developer-formatters",
    description: "Essential tools for developers: JSON/XML/SQL formatters, minifiers, and data converters.",
    icon: "Braces",
    tier: 1,
    toolCount: 12
  },
  {
    id: "security-crypto",
    name: "Security & Crypto",
    slug: "security-crypto",
    description: "Protect your data with encryption tools, hash generators, password creators, and security headers.",
    icon: "ShieldCheck",
    tier: 1,
    toolCount: 22
  },
  {
    id: "string-text",
    name: "String & Text Manipulation",
    slug: "string-text",
    description: "Tools for text processing: word counters, case converters, lorem ipsum generators, and diff checkers.",
    icon: "Type",
    tier: 1,
    toolCount: 11
  },
  {
    id: "image-tools",
    name: "Image Tools",
    slug: "image-tools",
    description: "Optimize, compress, convert, and manipulate images directly in your browser without uploading to any server.",
    icon: "Image",
    tier: 1,
    toolCount: 8
  },
  {
    id: "math-network",
    name: "Math & Network",
    slug: "math-network",
    description: "Calculators for developers and network utilities like IP lookup and subnet calculators.",
    icon: "Calculator",
    tier: 1,
    toolCount: 6
  },
  {
    id: "css-ui",
    name: "CSS & UI Tools",
    slug: "css-ui",
    description: "Generators for CSS gradients, shadows, borders, and UI component styling.",
    icon: "Palette",
    tier: 1,
    toolCount: 10
  },
  {
    id: "domain-tools",
    name: "Domain Tools",
    slug: "domain-tools",
    description: "Domain reconnaissance, subdomain discovery, vulnerability scanning, and visual network mapping tools for security professionals.",
    icon: "Network",
    tier: 1,
    toolCount: 1
  }
];

// All 100 Tools Definition
export const tools: Tool[] = [
  // ==========================================
  // CATEGORY 1: STRUCTURED DATA (1-12)
  // ==========================================
  {
    id: "localbusiness-schema",
    name: "LocalBusiness JSON-LD Schema Generator",
    slug: "localbusiness-schema",
    description: "Generate valid LocalBusiness schema markup for your business to appear in local search results with rich information like address, hours, and contact details.",
    shortDescription: "Generate LocalBusiness schema for local SEO",
    categoryId: "structured-data",
    tier: 1,
    icon: "MapPin",
    keywords: ["local business schema", "json-ld", "local seo", "google my business"],
    featured: true,
    instructions: [
      "Select your business type from the extensive Schema.org list.",
      "Enter your standard NAP (Name, Address, Phone) details.",
      "Add geo-coordinates and opening hours.",
      "Click 'Generate' to create the JSON-LD script.",
      "Test in Rich Results Test before deploying."
    ]
  },
  {
    id: "faq-schema",
    name: "FAQPage JSON-LD Generator",
    slug: "faq-schema",
    description: "Create FAQPage schema markup to display your frequently asked questions directly in search results, increasing visibility and click-through rates.",
    shortDescription: "Generate FAQ schema for rich snippets",
    categoryId: "structured-data",
    tier: 1,
    icon: "HelpCircle",
    keywords: ["faq schema", "json-ld", "rich snippets", "featured snippets"],
    featured: true,
    instructions: [
      "Enter your first Question and Answer pair.",
      "Click 'Add another FAQ' for additional items.",
      "Ensure answers are concise and factual.",
      "Copy the JSON-LD code once complete.",
      "Place into the <head> of your FAQ page."
    ]
  },
  {
    id: "howto-schema",
    name: "HowTo Schema Markup Generator",
    slug: "howto-schema",
    description: "Generate HowTo schema for step-by-step guides and tutorials to appear as rich results in Google Search.",
    shortDescription: "Create HowTo schema for tutorials",
    categoryId: "structured-data",
    tier: 1,
    icon: "ListOrdered",
    keywords: ["howto schema", "tutorial schema", "step by step", "rich results"],
    instructions: [
      "Enter the Tutorial Name and Description.",
      "Add estimated time and total cost.",
      "Break down the process into clear Steps with images.",
      "Generate the code to win 'How-To' rich results.",
      "Validate the output using Google's testing tool."
    ]
  },
  {
    id: "organization-schema",
    name: "Organization Schema Generator",
    slug: "organization-schema",
    description: "Create Organization schema markup to enhance your brand's knowledge panel and search presence.",
    shortDescription: "Generate Organization schema for brands",
    categoryId: "structured-data",
    tier: 1,
    icon: "Building",
    keywords: ["organization schema", "company schema", "knowledge panel", "brand seo"],
    instructions: [
      "Input your Organization's legal name and URL.",
      "Add links to your logo and official social profiles.",
      "Include contact points for customer service.",
      "Generate the script to power your Knowledge Panel.",
      "Embed in your homepage's HTML header."
    ]
  },
  {
    id: "event-schema",
    name: "Event Schema Generator",
    slug: "event-schema",
    description: "Generate Event schema markup for conferences, webinars, and events to appear in Google's event listings.",
    shortDescription: "Create Event schema for event listings",
    categoryId: "structured-data",
    tier: 1,
    icon: "Calendar",
    keywords: ["event schema", "conference schema", "webinar schema", "event seo"],
    instructions: [
      "Set the Event Name, Start Date, and End Date.",
      "Choose the Location type: Physical, Online, or Mixed.",
      "Add ticket prices and availability status.",
      "Generate the markup for Google Events search.",
      "Embed on your event landing page."
    ]
  },
  {
    id: "product-schema",
    name: "Product Schema Generator",
    slug: "product-schema",
    description: "Create Product schema with pricing, availability, and reviews for enhanced ecommerce search results.",
    shortDescription: "Generate Product schema for ecommerce",
    categoryId: "structured-data",
    tier: 1,
    icon: "ShoppingBag",
    keywords: ["product schema", "ecommerce schema", "price schema", "review schema"],
    instructions: [
      "Enter Product Name, Brand, and Description.",
      "Add one or more Offers (Price, Currency, Availability).",
      "Include aggregate rating data if available.",
      "Generate code to display price and stock in SERPs.",
      "Add to your individual product pages."
    ]
  },
  {
    id: "article-schema",
    name: "Article/BlogPosting Schema Generator",
    slug: "article-schema",
    description: "Generate Article and BlogPosting schema for news articles and blog posts to improve search visibility.",
    shortDescription: "Create Article schema for blogs",
    categoryId: "structured-data",
    tier: 1,
    icon: "FileText",
    keywords: ["article schema", "blog schema", "news schema", "content seo"],
    instructions: [
      "Enter the Headline and Description.",
      "Add Author name and Publisher logo.",
      "Set Publication and Modification dates.",
      "Generate code for Top Stories eligibility.",
      "Insert into your article or blog post header."
    ]
  },
  {
    id: "breadcrumb-schema",
    name: "Breadcrumb JSON-LD Generator",
    slug: "breadcrumb-schema",
    description: "Create BreadcrumbList schema to display navigation paths in search results for better user experience.",
    shortDescription: "Generate Breadcrumb schema for navigation",
    categoryId: "structured-data",
    tier: 1,
    icon: "ChevronRight",
    keywords: ["breadcrumb schema", "navigation schema", "site structure", "ux seo"],
    instructions: [
      "Define the position 1 item (usually Home).",
      "Add subsequent levels (Category > Page).",
      "Enter names and absolute URLs for each item.",
      "Generate markup to show path in search results.",
      "Deploy site-wide or on deeper pages."
    ]
  },
  {
    id: "review-schema",
    name: "Aggregate Review Schema Generator",
    slug: "review-schema",
    description: "Generate AggregateRating schema to display star ratings in search results for products and services.",
    shortDescription: "Create Review schema for ratings",
    categoryId: "structured-data",
    tier: 1,
    icon: "Star",
    keywords: ["review schema", "rating schema", "star rating", "social proof"],
    instructions: [
      "Select the Item Type (Product, Book, Course, etc.).",
      "Enter the Reviewer's name and Rating value.",
      "Add the review body and date.",
      "Generate code to display star ratings.",
      "Embed on the relevant review page."
    ]
  },
  {
    id: "video-schema",
    name: "Video Schema Generator",
    slug: "video-schema",
    description: "Create VideoObject schema for videos to appear in Google Video search and video carousels.",
    shortDescription: "Generate Video schema for video SEO",
    categoryId: "structured-data",
    tier: 1,
    icon: "Video",
    keywords: ["video schema", "youtube schema", "video seo", "video markup"],
    instructions: [
      "Enter Video Title, Description, and Upload Date.",
      "Provide URLs for Thumbnail and Content file.",
      "Add specific timestamps for Key Moments.",
      "Generate JSON-LD for video search visibility.",
      "Place on pages with embedded video content."
    ]
  },
  {
    id: "schema-validator",
    name: "Schema Markup Validator",
    slug: "schema-validator",
    description: "Validate your JSON-LD schema markup against Schema.org specifications and check for errors.",
    shortDescription: "Validate JSON-LD schema markup",
    categoryId: "structured-data",
    tier: 1,
    icon: "CheckCircle",
    keywords: ["schema validator", "json-ld validator", "structured data testing", "schema check"],
    instructions: [
      "Paste your existing JSON-LD code snippet.",
      "Click 'Validate' to run syntax checks.",
      "Review any errors or missing required fields.",
      "Correct the code directly in the editor.",
      "Copy the fixed schema for deployment."
    ]
  },
  {
    id: "localbusiness-audit",
    name: "LocalBusiness Schema Audit Checker",
    slug: "localbusiness-audit",
    description: "Audit your existing LocalBusiness schema for completeness and best practices compliance.",
    shortDescription: "Audit LocalBusiness schema quality",
    categoryId: "structured-data",
    tier: 1,
    icon: "ClipboardCheck",
    keywords: ["schema audit", "local seo audit", "schema checker", "markup review"],
    instructions: [
      "Enter the URL of the page you want to audit.",
      "Run the audit to detect existing schema types.",
      "Analyze warnings and missing opportunities.",
      "Export the report for your development team.",
      "Prioritize fixes for critical business entities."
    ]
  },

  // ==========================================
  // CATEGORY 2: SITEMAPS & ROBOTS (13-20)
  // ==========================================
  {
    id: "sitemap-generator",
    name: "Sitemap XML Generator",
    slug: "sitemap-generator",
    description: "Generate valid XML sitemaps from a list of URLs with priority, changefreq, and lastmod attributes.",
    shortDescription: "Create XML sitemaps for search engines",
    categoryId: "sitemaps-robots",
    tier: 1,
    icon: "FileCode",
    keywords: ["sitemap generator", "xml sitemap", "sitemap builder", "seo sitemap"],
    featured: true,
    instructions: [
      "Paste your full list of website URLs (one per line).",
      "Set the Priority (0.1 - 1.0) and Change Frequency.",
      "Check 'Include Last Modified' if you have date data.",
      "Click 'Generate' to build your standard XML file.",
      "Download and upload to your server's root directory."
    ]
  },
  {
    id: "dynamic-sitemap",
    name: "Dynamic Sitemap Builder",
    slug: "dynamic-sitemap",
    description: "Build dynamic sitemaps with automatic URL discovery and crawl configuration settings.",
    shortDescription: "Build dynamic sitemaps with crawling",
    categoryId: "sitemaps-robots",
    tier: 1,
    icon: "RefreshCw",
    keywords: ["dynamic sitemap", "auto sitemap", "sitemap crawler", "url discovery"],
    instructions: [
      "Enter your Homepage URL to start the crawler.",
      "Set the maximum crawl depth and thread count.",
      "Configure exclude patterns for admin or login pages.",
      "Run the discovery process to find all internal links.",
      "Export the resulting XML sitemap for Search Console."
    ]
  },
  {
    id: "robots-generator",
    name: "Robots.txt Generator",
    slug: "robots-generator",
    description: "Create robots.txt files with user-agent rules, allow/disallow directives, and sitemap references.",
    shortDescription: "Generate robots.txt for crawl control",
    categoryId: "sitemaps-robots",
    tier: 1,
    icon: "Bot",
    keywords: ["robots.txt", "robots generator", "crawl control", "googlebot"],
    instructions: [
      "Select a User-Agent (e.g., Googlebot, Bingbot, or *).",
      "Add 'Allow' or 'Disallow' directives for specific paths.",
      "Include the absolute URL to your Sitemap index.",
      "Set a Crawl-Delay if your server needs throttling.",
      "Copy the formatted text to your robots.txt file."
    ]
  },
  {
    id: "robots-validator",
    name: "Robots.txt Validator",
    slug: "robots-validator",
    description: "Validate your robots.txt file for syntax errors and check crawl permissions for different user agents.",
    shortDescription: "Validate robots.txt syntax",
    categoryId: "sitemaps-robots",
    tier: 1,
    icon: "CheckSquare",
    keywords: ["robots validator", "robots.txt check", "crawl validation", "syntax checker"],
    instructions: [
      "Paste your current robots.txt content or upload the file.",
      "Enter a test URL to check against your rules.",
      "Select the User-Agent you wish to simulate.",
      "Run the test to see if the URL is Allowed or Blocked.",
      "Fix any unintended blocking rules immediately."
    ]
  },
  {
    id: "robots-breakage",
    name: "Robots.txt Breakage Detector",
    slug: "robots-breakage",
    description: "Detect potential issues in robots.txt that could block important pages from search engine crawlers.",
    shortDescription: "Detect robots.txt blocking issues",
    categoryId: "sitemaps-robots",
    tier: 1,
    icon: "AlertTriangle",
    keywords: ["robots breakage", "crawl issues", "blocked pages", "indexing problems"],
    instructions: [
      "Enter your domain URL.",
      "The tool scans for common logic errors in robots.txt.",
      "Identify conflicting Allow/Disallow rules.",
      "Check for accidental blocking of CSS/JS resources.",
      "Receive a clean bill of health or a fix list."
    ]
  },
  {
    id: "canonical-tool",
    name: "URL Canonicalization Batch Tool",
    slug: "canonical-tool",
    description: "Generate canonical tags for multiple URLs to prevent duplicate content issues.",
    shortDescription: "Batch generate canonical tags",
    categoryId: "sitemaps-robots",
    tier: 1,
    icon: "Link2",
    keywords: ["canonical url", "duplicate content", "canonical tag", "url normalization"],
    instructions: [
      "Enter your list of duplicate or similar URLs.",
      "Specify the 'Master' or 'Canonical' version.",
      "Generate the <link rel='canonical'> tags in bulk.",
      "Implement the specific tag on each variation page.",
      "Prevent self-competition in search rankings."
    ]
  },
  {
    id: "robots-templates",
    name: "Robots.txt Template Library",
    slug: "robots-templates",
    description: "Access pre-built robots.txt templates for WordPress, Shopify, ecommerce, and other common platforms.",
    shortDescription: "Pre-built robots.txt templates",
    categoryId: "sitemaps-robots",
    tier: 1,
    icon: "Library",
    keywords: ["robots templates", "wordpress robots", "shopify robots", "ecommerce robots"],
    instructions: [
      "Select your CMS or Platform (WordPress, Shopify, etc.).",
      "Review the recommended standard configuration.",
      "Customize specific paths for your unique setup.",
      "Click to Copy the optimized robots.txt content.",
      "Replace your server's default file."
    ]
  },
  {
    id: "crawl-simulator",
    name: "Crawl Simulation Checker",
    slug: "crawl-simulator",
    description: "Simulate how search engine bots crawl your website based on your robots.txt configuration.",
    shortDescription: "Simulate search engine crawling",
    categoryId: "sitemaps-robots",
    tier: 1,
    icon: "Search",
    keywords: ["crawl simulation", "bot simulation", "crawl testing", "googlebot test"],
    instructions: [
      "Input your Robots.txt rules and a target URL.",
      "Simulate a visit from Googlebot Smartphone.",
      "Watch the step-by-step logic matching process.",
      "Confirm exactly which line triggers a block/allow.",
      "Verify your strict indexing controls."
    ]
  },

  // ==========================================
  // CATEGORY 3: META TAGS & SOCIAL (21-31)
  // ==========================================
  {
    id: "meta-generator",
    name: "Meta Tags HTML Generator",
    slug: "meta-generator",
    description: "Generate complete HTML meta tags including title, description, keywords, and viewport settings.",
    shortDescription: "Generate complete HTML meta tags",
    categoryId: "meta-tags-social",
    tier: 1,
    icon: "Code",
    keywords: ["meta tags", "html meta", "seo tags", "meta generator"],
    featured: true,
    instructions: [
      "Input your Page Title (keeping it under 60 chars).",
      "Draft a compelling Meta Description (under 160 chars).",
      "Set your viewport and charset settings (usually default).",
      "Generate the complete HTML block.",
      "Paste into the <head> section of your webpage."
    ]
  },
  {
    id: "opengraph-generator",
    name: "OpenGraph Tag Generator",
    slug: "opengraph-generator",
    description: "Create Open Graph meta tags for optimal sharing on Facebook, LinkedIn, and other social platforms.",
    shortDescription: "Generate Open Graph tags for social",
    categoryId: "meta-tags-social",
    tier: 1,
    icon: "Share2",
    keywords: ["open graph", "og tags", "facebook sharing", "social meta"],
    instructions: [
      "Enter the OG Title and Description for social display.",
      "Add the URL and Type (e.g., website, article).",
      "Provide a high-quality Image URL (1200x630px recommended).",
      "Generate the Open Graph meta tags.",
      "Deploy and test using the Facebook Sharing Debugger."
    ]
  },
  {
    id: "twitter-card",
    name: "Twitter Card Generator",
    slug: "twitter-card",
    description: "Generate Twitter Card meta tags for enhanced Twitter/X sharing with images and rich previews.",
    shortDescription: "Create Twitter Card meta tags",
    categoryId: "meta-tags-social",
    tier: 1,
    icon: "Twitter",
    keywords: ["twitter card", "twitter meta", "x card", "social sharing"],
    instructions: [
      "Choose the Card Type (Summary or Summary Large Image).",
      "Enter your Site and Creator @usernames.",
      "Add the title, description, and image URL.",
      "Generate the meta tags for X/Twitter.",
      "Validate using the Twitter Card Validator."
    ]
  },
  {
    id: "linkedin-meta",
    name: "LinkedIn Meta Tags Generator",
    slug: "linkedin-meta",
    description: "Optimize your meta tags specifically for LinkedIn sharing and professional content distribution.",
    shortDescription: "Optimize meta tags for LinkedIn",
    categoryId: "meta-tags-social",
    tier: 1,
    icon: "Linkedin",
    keywords: ["linkedin meta", "linkedin sharing", "b2b social", "professional sharing"],
    instructions: [
      "Input your professional headline and summary.",
      "Add your company or author profile URL.",
      "Select an image that looks good in LinkedIn's feed.",
      "Generate the specific meta tags.",
      "Ensure professional formatting with the LinkedIn Inspector."
    ]
  },
  {
    id: "meta-width",
    name: "Meta Description Pixel-Width Calculator",
    slug: "meta-width",
    description: "Calculate the pixel width of your meta descriptions to ensure they display fully in search results.",
    shortDescription: "Calculate meta description pixel width",
    categoryId: "meta-tags-social",
    tier: 1,
    icon: "Ruler",
    keywords: ["meta width", "pixel calculator", "description length", "serp preview"],
    instructions: [
      "Type your meta description into the field.",
      "Watch the pixel counter update in real-time.",
      "Ensure the bar remains green (under ~920px).",
      "Adjust wording to fit the visible snippet space.",
      "Preview how it looks on desktop vs mobile."
    ]
  },
  {
    id: "title-checker",
    name: "Title Tag Length Checker",
    slug: "title-checker",
    description: "Check if your title tags are within optimal length limits for search engine display.",
    shortDescription: "Verify title tag length limits",
    categoryId: "meta-tags-social",
    tier: 1,
    icon: "Type",
    keywords: ["title length", "title checker", "seo title", "serp title"],
    instructions: [
      "Enter your proposed page title.",
      "The tool checks against the ~600px display limit.",
      "Review suggestions for optimal keyword placement.",
      "Ensure your brand name fits at the end.",
      "Copy the perfectly sized title tag."
    ]
  },
  {
    id: "meta-robots-builder",
    name: "Meta Robots Tag Builder",
    slug: "meta-robots-builder",
    description: "Build meta robots tags with noindex, nofollow, noarchive, and other directives.",
    shortDescription: "Build meta robots directives",
    categoryId: "meta-tags-social",
    tier: 1,
    icon: "Bot",
    keywords: ["meta robots", "noindex", "nofollow", "crawl directives"],
    instructions: [
      "Decide on Indexing (Index vs NoIndex).",
      "Choose Link following behavior (Follow vs NoFollow).",
      "Toggle advanced options like noarchive or nosnippet.",
      "Generate the compact <meta name='robots'> tag.",
      "Add to pages you want to control."
    ]
  },
  {
    id: "favicon-generator",
    name: "Favicon + Apple Icon Generator Code",
    slug: "favicon-generator",
    description: "Generate HTML code for favicons, Apple touch icons, and other browser icon configurations.",
    shortDescription: "Generate favicon HTML code",
    categoryId: "meta-tags-social",
    tier: 1,
    icon: "Image",
    keywords: ["favicon", "apple icon", "browser icon", "site icon"],
    instructions: [
      "Enter the path to your icon files.",
      "Select sizes for Apple Touch, Android, and Windows.",
      "Set your specific theme color hex code.",
      "Generate the full block of rel='icon' links.",
      "Place in <head> and upload images to root."
    ]
  },
  {
    id: "pwa-manifest",
    name: "PWA/Web App Manifest Generator",
    slug: "pwa-manifest",
    description: "Create web app manifest files for Progressive Web Apps with icons, colors, and display settings.",
    shortDescription: "Generate PWA manifest files",
    categoryId: "meta-tags-social",
    tier: 1,
    icon: "Smartphone",
    keywords: ["pwa manifest", "web app", "manifest.json", "progressive web app"],
    instructions: [
      "Fill in App Name, Short Name, and Description.",
      "Choose Display Mode (Standalone, Fullscreen).",
      "Define theme and background colors.",
      "Generate the manifest.json file structure.",
      "Save as 'manifest.json' and link in your HTML."
    ]
  },
  {
    id: "pinterest-pins",
    name: "Pinterest Rich Pins Code Generator",
    slug: "pinterest-pins",
    description: "Generate meta tags for Pinterest Rich Pins including product, recipe, and article pins.",
    shortDescription: "Create Pinterest Rich Pins markup",
    categoryId: "meta-tags-social",
    tier: 1,
    icon: "Pin",
    keywords: ["pinterest pins", "rich pins", "pinterest meta", "pinterest seo"],
    instructions: [
      "Select Rich Pin Type (Article, Product, Recipe).",
      "Enter required fields like Price, Availability, or Ingredients.",
      "Add specific Pinterest attribute tags.",
      "Generate the meta code for the Pinterest crawler.",
      "Validate with the Rich Pins Validator."
    ]
  },
  {
    id: "instagram-meta",
    name: "Instagram Meta Tags Generator",
    slug: "instagram-meta",
    description: "Optimize your website meta tags for Instagram link sharing and in-app browser display.",
    shortDescription: "Optimize for Instagram sharing",
    categoryId: "meta-tags-social",
    tier: 1,
    icon: "Instagram",
    keywords: ["instagram meta", "instagram sharing", "social meta", "instagram seo"],
    instructions: [
      "Enter content aimed at mobile engagement.",
      "Add specific meta tags for in-app browser optimization.",
      "Ensure image aspect ratios format correctly.",
      "Generate the code to improve link preview engagement.",
      "Test by sharing the link in a DM."
    ]
  },

  // ==========================================
  // CATEGORY 4: TRACKING & ANALYTICS (32-45)
  // ==========================================
  {
    id: "utm-builder",
    name: "UTM Builder + URL Generator",
    slug: "utm-builder",
    description: "Build UTM-tagged URLs for campaign tracking in Google Analytics with source, medium, and campaign parameters.",
    shortDescription: "Build UTM-tagged campaign URLs",
    categoryId: "tracking-analytics",
    tier: 1,
    icon: "Link",
    keywords: ["utm builder", "campaign tracking", "google analytics", "url tagging"],
    featured: true
  },
  {
    id: "utm-validator",
    name: "UTM Parameter Validator",
    slug: "utm-validator",
    description: "Validate UTM parameters in your URLs for correct formatting and best practices compliance.",
    shortDescription: "Validate UTM parameter formatting",
    categoryId: "tracking-analytics",
    tier: 1,
    icon: "CheckCircle2",
    keywords: ["utm validator", "utm check", "parameter validation", "tracking validation"]
  },
  {
    id: "utm-best-practices",
    name: "UTM Best Practices Checker",
    slug: "utm-best-practices",
    description: "Check your UTM strategy against best practices for consistent campaign naming and tracking.",
    shortDescription: "Check UTM best practices",
    categoryId: "tracking-analytics",
    tier: 1,
    icon: "Award",
    keywords: ["utm practices", "campaign naming", "tracking consistency", "analytics best practices"]
  },
  {
    id: "ga4-event-naming",
    name: "GA4 Event Naming Convention Generator",
    slug: "ga4-event-naming",
    description: "Generate consistent GA4 event names following Google's recommended naming conventions.",
    shortDescription: "Generate GA4 event names",
    categoryId: "tracking-analytics",
    tier: 1,
    icon: "Tag",
    keywords: ["ga4 events", "event naming", "google analytics 4", "event tracking"]
  },
  {
    id: "ga4-event-mapper",
    name: "GA4 Event Parameter Mapper",
    slug: "ga4-event-mapper",
    description: "Map and configure GA4 event parameters for custom event tracking implementation.",
    shortDescription: "Map GA4 event parameters",
    categoryId: "tracking-analytics",
    tier: 1,
    icon: "Map",
    keywords: ["ga4 parameters", "event mapping", "custom events", "parameter configuration"]
  },
  {
    id: "ga4-ecommerce",
    name: "GA4 Ecommerce Event Code Generator",
    slug: "ga4-ecommerce",
    description: "Generate GA4 ecommerce tracking code for product views, add to cart, purchases, and more.",
    shortDescription: "Generate GA4 ecommerce tracking",
    categoryId: "tracking-analytics",
    tier: 1,
    icon: "ShoppingCart",
    keywords: ["ga4 ecommerce", "ecommerce tracking", "purchase tracking", "product analytics"]
  },
  {
    id: "ga3-to-ga4",
    name: "GA3 to GA4 Dimension Equivalency Mapper",
    slug: "ga3-to-ga4",
    description: "Map Universal Analytics (GA3) dimensions and metrics to their GA4 equivalents for migration.",
    shortDescription: "Map GA3 to GA4 dimensions",
    categoryId: "tracking-analytics",
    tier: 1,
    icon: "ArrowRightLeft",
    keywords: ["ga3 to ga4", "analytics migration", "dimension mapping", "ua to ga4"]
  },
  {
    id: "ga4-conversions",
    name: "GA4 Conversion Goal Generator",
    slug: "ga4-conversions",
    description: "Generate GA4 conversion tracking configurations for key business goals and events.",
    shortDescription: "Generate GA4 conversion goals",
    categoryId: "tracking-analytics",
    tier: 1,
    icon: "Target",
    keywords: ["ga4 conversions", "goal tracking", "conversion events", "kpi tracking"]
  },
  {
    id: "datalayer-ecommerce",
    name: "dataLayer Builder (Ecommerce)",
    slug: "datalayer-ecommerce",
    description: "Build dataLayer push code for ecommerce events including product impressions, clicks, and purchases.",
    shortDescription: "Build ecommerce dataLayer code",
    categoryId: "tracking-analytics",
    tier: 1,
    icon: "Database",
    keywords: ["datalayer", "gtm ecommerce", "tag manager", "ecommerce datalayer"]
  },
  {
    id: "datalayer-forms",
    name: "dataLayer Builder (Forms)",
    slug: "datalayer-forms",
    description: "Generate dataLayer code for form tracking including submissions, field interactions, and errors.",
    shortDescription: "Build form tracking dataLayer",
    categoryId: "tracking-analytics",
    tier: 1,
    icon: "FormInput",
    keywords: ["form tracking", "datalayer forms", "lead tracking", "form analytics"]
  },
  {
    id: "gtm-cheatsheet",
    name: "Google Tag Manager Cheat Sheet",
    slug: "gtm-cheatsheet",
    description: "Comprehensive GTM reference guide with variable types, trigger conditions, and tag configurations.",
    shortDescription: "GTM reference and cheat sheet",
    categoryId: "tracking-analytics",
    tier: 1,
    icon: "BookOpen",
    keywords: ["gtm cheatsheet", "tag manager guide", "gtm reference", "gtm variables"]
  },
  {
    id: "conversion-pixel",
    name: "Conversion Pixel Code Generator",
    slug: "conversion-pixel",
    description: "Generate conversion tracking pixel code for Facebook, Google Ads, LinkedIn, and other platforms.",
    shortDescription: "Generate conversion pixel code",
    categoryId: "tracking-analytics",
    tier: 1,
    icon: "Crosshair",
    keywords: ["conversion pixel", "facebook pixel", "google ads", "linkedin insight"]
  },
  {
    id: "campaign-naming",
    name: "Campaign Naming Convention Template Generator",
    slug: "campaign-naming",
    description: "Create consistent campaign naming conventions for your organization's marketing tracking.",
    shortDescription: "Generate campaign naming templates",
    categoryId: "tracking-analytics",
    tier: 1,
    icon: "FileSpreadsheet",
    keywords: ["campaign naming", "naming convention", "marketing template", "tracking structure"]
  },
  {
    id: "dashboard-wizard",
    name: "Analytics Dashboard Planning Wizard",
    slug: "dashboard-wizard",
    description: "Plan and structure your analytics dashboards with KPIs, dimensions, and visualization recommendations.",
    shortDescription: "Plan analytics dashboards",
    categoryId: "tracking-analytics",
    tier: 1,
    icon: "LayoutDashboard",
    keywords: ["analytics dashboard", "kpi planning", "dashboard design", "reporting structure"]
  },

  // ==========================================
  // CATEGORY 5: REDIRECTS & MIGRATIONS (46-53)
  // ==========================================
  {
    id: "redirect-301",
    name: "301 Redirect Code Generator",
    slug: "redirect-301",
    description: "Generate 301 redirect code for Apache, Nginx, Netlify, and Vercel to preserve SEO during URL changes.",
    shortDescription: "Generate 301 redirect code",
    categoryId: "redirects-migrations",
    tier: 1,
    icon: "ArrowRight",
    keywords: ["301 redirect", "redirect code", "url redirect", "seo redirect"],
    featured: true
  },
  {
    id: "netlify-redirects",
    name: "Netlify _redirects File Generator",
    slug: "netlify-redirects",
    description: "Generate Netlify _redirects file with proper syntax for redirects, rewrites, and proxies.",
    shortDescription: "Generate Netlify redirects file",
    categoryId: "redirects-migrations",
    tier: 1,
    icon: "FileCode2",
    keywords: ["netlify redirects", "_redirects", "netlify hosting", "jamstack redirects"]
  },
  {
    id: "vercel-redirects",
    name: "Vercel redirects.json Generator",
    slug: "vercel-redirects",
    description: "Create Vercel redirects configuration in vercel.json format for Next.js and other frameworks.",
    shortDescription: "Generate Vercel redirects config",
    categoryId: "redirects-migrations",
    tier: 1,
    icon: "FileJson",
    keywords: ["vercel redirects", "next.js redirects", "vercel config", "serverless redirects"]
  },
  {
    id: "htaccess-generator",
    name: "Apache .htaccess Redirect Builder",
    slug: "htaccess-generator",
    description: "Build Apache .htaccess redirect rules with RewriteRule and Redirect directives.",
    shortDescription: "Build Apache .htaccess redirects",
    categoryId: "redirects-migrations",
    tier: 1,
    icon: "Server",
    keywords: ["htaccess", "apache redirect", "rewriterule", "mod_rewrite"]
  },
  {
    id: "nginx-rewrite",
    name: "Nginx Rewrite Rules Generator",
    slug: "nginx-rewrite",
    description: "Generate Nginx rewrite rules and return statements for URL redirects and rewrites.",
    shortDescription: "Generate Nginx rewrite rules",
    categoryId: "redirects-migrations",
    tier: 1,
    icon: "Terminal",
    keywords: ["nginx redirect", "nginx rewrite", "nginx config", "server block"]
  },
  {
    id: "redirect-tester",
    name: "301 Redirect Tester",
    slug: "redirect-tester",
    description: "Test redirect chains and verify that your 301 redirects are working correctly.",
    shortDescription: "Test 301 redirect chains",
    categoryId: "redirects-migrations",
    tier: 1,
    icon: "TestTube",
    keywords: ["redirect tester", "redirect checker", "redirect chain", "redirect validation"]
  },
  {
    id: "bulk-url-mapper",
    name: "Bulk URL Mapper CSV to Redirects",
    slug: "bulk-url-mapper",
    description: "Convert CSV files with old/new URL mappings into redirect rules for any platform.",
    shortDescription: "Convert CSV to redirect rules",
    categoryId: "redirects-migrations",
    tier: 1,
    icon: "FileSpreadsheet",
    keywords: ["bulk redirects", "csv redirect", "url mapping", "mass redirect"]
  },
  {
    id: "migration-checklist",
    name: "Site Migration Pre-Flight Checklist",
    slug: "migration-checklist",
    description: "Comprehensive checklist for site migrations to preserve SEO rankings and avoid common pitfalls.",
    shortDescription: "Site migration SEO checklist",
    categoryId: "redirects-migrations",
    tier: 1,
    icon: "ClipboardList",
    keywords: ["site migration", "migration checklist", "domain migration", "seo migration"]
  },

  // ==========================================
  // CATEGORY 6: SECURITY & HEADERS (54-63)
  // ==========================================
  {
    id: "security-headers",
    name: "HTTP Security Headers Generator",
    slug: "security-headers",
    description: "Generate HTTP security headers including X-Frame-Options, X-Content-Type-Options, and more.",
    shortDescription: "Generate HTTP security headers",
    categoryId: "security-headers",
    tier: 1,
    icon: "Shield",
    keywords: ["security headers", "http headers", "web security", "header configuration"],
    featured: true
  },
  {
    id: "csp-generator",
    name: "Content Security Policy (CSP) Generator",
    slug: "csp-generator",
    description: "Build Content Security Policy headers to protect against XSS and other injection attacks.",
    shortDescription: "Generate CSP headers",
    categoryId: "security-headers",
    tier: 1,
    icon: "Lock",
    keywords: ["csp", "content security policy", "xss protection", "security policy"]
  },
  {
    id: "csp-validator",
    name: "CSP Validator",
    slug: "csp-validator",
    description: "Validate your Content Security Policy for syntax errors and security best practices.",
    shortDescription: "Validate CSP policies",
    categoryId: "security-headers",
    tier: 1,
    icon: "ShieldCheck",
    keywords: ["csp validator", "security validation", "policy check", "csp testing"]
  },
  {
    id: "cors-generator",
    name: "CORS Headers Generator",
    slug: "cors-generator",
    description: "Generate Cross-Origin Resource Sharing headers for API and resource access control.",
    shortDescription: "Generate CORS headers",
    categoryId: "security-headers",
    tier: 1,
    icon: "Globe",
    keywords: ["cors", "cross-origin", "api security", "access control"]
  },
  {
    id: "hsts-generator",
    name: "HSTS (HTTP Strict-Transport-Security) Generator",
    slug: "hsts-generator",
    description: "Generate HSTS headers to enforce HTTPS connections and prevent downgrade attacks.",
    shortDescription: "Generate HSTS headers",
    categoryId: "security-headers",
    tier: 1,
    icon: "ShieldAlert",
    keywords: ["hsts", "https security", "ssl enforcement", "transport security"]
  },
  {
    id: "ssl-checker",
    name: "SSL Certificate Health Checker",
    slug: "ssl-checker",
    description: "Check SSL certificate validity, expiration, and configuration for your domain.",
    shortDescription: "Check SSL certificate health",
    categoryId: "security-headers",
    tier: 1,
    icon: "KeyRound",
    keywords: ["ssl check", "certificate check", "https validation", "ssl expiry"]
  },
  {
    id: "ssl-comparison",
    name: "SSL Certificate Comparison Tool",
    slug: "ssl-comparison",
    description: "Compare SSL certificate types and providers to choose the right certificate for your needs.",
    shortDescription: "Compare SSL certificates",
    categoryId: "security-headers",
    tier: 1,
    icon: "Scale",
    keywords: ["ssl comparison", "certificate types", "ssl providers", "ssl pricing"]
  },
  {
    id: "email-auth-analyzer",
    name: "Email Authentication Analyzer",
    slug: "email-auth-analyzer",
    description: "Analyze your domain's email authentication setup including SPF, DKIM, and DMARC records.",
    shortDescription: "Analyze email authentication",
    categoryId: "security-headers",
    tier: 1,
    icon: "Mail",
    keywords: ["email auth", "spf dkim dmarc", "email security", "domain authentication"]
  },
  {
    id: "spf-generator",
    name: "SPF Record Generator",
    slug: "spf-generator",
    description: "Generate SPF (Sender Policy Framework) DNS records to prevent email spoofing.",
    shortDescription: "Generate SPF DNS records",
    categoryId: "security-headers",
    tier: 1,
    icon: "MailCheck",
    keywords: ["spf record", "email spf", "dns spf", "email deliverability"]
  },
  {
    id: "dmarc-generator",
    name: "DMARC Policy Generator",
    slug: "dmarc-generator",
    description: "Create DMARC policies for email authentication and reporting configuration.",
    shortDescription: "Generate DMARC policies",
    categoryId: "security-headers",
    tier: 1,
    icon: "ShieldPlus",
    keywords: ["dmarc", "email policy", "dmarc record", "email protection"]
  },

  // ==========================================
  // CATEGORY 7: CONTENT & COPY (64-75)
  // ==========================================
  {
    id: "title-generator",
    name: "SEO Title Tag Generator",
    slug: "title-generator",
    description: "Generate SEO-optimized title tags based on your keywords, brand, and page type.",
    shortDescription: "Generate SEO title tags",
    categoryId: "content-copy",
    tier: 2,
    icon: "Heading1",
    keywords: ["title generator", "seo title", "title tag", "page title"],
    featured: true
  },
  {
    id: "description-generator",
    name: "Meta Description Generator",
    slug: "description-generator",
    description: "Create compelling meta descriptions optimized for click-through rates and search visibility.",
    shortDescription: "Generate meta descriptions",
    categoryId: "content-copy",
    tier: 2,
    icon: "AlignLeft",
    keywords: ["meta description", "description generator", "serp description", "seo description"]
  },
  {
    id: "heading-generator",
    name: "H1/H2/H3 Heading Generator",
    slug: "heading-generator",
    description: "Generate SEO-friendly heading structures for your content with proper hierarchy.",
    shortDescription: "Generate heading structures",
    categoryId: "content-copy",
    tier: 2,
    icon: "Heading",
    keywords: ["heading generator", "h1 h2 h3", "heading structure", "content headings"]
  },
  {
    id: "anchor-text",
    name: "Internal Link Anchor Text Suggestion Tool",
    slug: "anchor-text",
    description: "Get anchor text suggestions for internal links to improve site navigation and SEO.",
    shortDescription: "Suggest internal link anchors",
    categoryId: "content-copy",
    tier: 2,
    icon: "Link2",
    keywords: ["anchor text", "internal linking", "link building", "seo links"]
  },
  {
    id: "cta-generator",
    name: "Call-to-Action (CTA) Copy Generator",
    slug: "cta-generator",
    description: "Generate persuasive call-to-action copy for buttons, links, and conversion elements.",
    shortDescription: "Generate CTA copy",
    categoryId: "content-copy",
    tier: 2,
    icon: "MousePointerClick",
    keywords: ["cta generator", "call to action", "button copy", "conversion copy"]
  },
  {
    id: "snippet-optimizer",
    name: "Featured Snippet Optimization Helper",
    slug: "snippet-optimizer",
    description: "Optimize your content structure to increase chances of appearing in featured snippets.",
    shortDescription: "Optimize for featured snippets",
    categoryId: "content-copy",
    tier: 2,
    icon: "Sparkles",
    keywords: ["featured snippet", "position zero", "snippet optimization", "serp features"]
  },
  {
    id: "blog-outline",
    name: "Blog Post Outline Generator",
    slug: "blog-outline",
    description: "Generate comprehensive blog post outlines with headings, sections, and key points.",
    shortDescription: "Generate blog post outlines",
    categoryId: "content-copy",
    tier: 2,
    icon: "ListTree",
    keywords: ["blog outline", "content outline", "article structure", "post planning"]
  },
  {
    id: "pillar-content",
    name: "Pillar Page Content Cluster Mapper",
    slug: "pillar-content",
    description: "Plan pillar pages and topic clusters for comprehensive content strategies.",
    shortDescription: "Map pillar page clusters",
    categoryId: "content-copy",
    tier: 2,
    icon: "Network",
    keywords: ["pillar page", "topic cluster", "content strategy", "hub and spoke"]
  },
  {
    id: "content-brief",
    name: "Long-Form Content Brief Generator",
    slug: "content-brief",
    description: "Create detailed content briefs for writers with keywords, structure, and requirements.",
    shortDescription: "Generate content briefs",
    categoryId: "content-copy",
    tier: 2,
    icon: "FileSignature",
    keywords: ["content brief", "writing brief", "seo brief", "content requirements"]
  },
  {
    id: "product-description",
    name: "Product Description Generator Template",
    slug: "product-description",
    description: "Generate ecommerce product descriptions with SEO optimization and persuasive copy.",
    shortDescription: "Generate product descriptions",
    categoryId: "content-copy",
    tier: 2,
    icon: "Package",
    keywords: ["product description", "ecommerce copy", "product seo", "sales copy"]
  },
  {
    id: "content-gap",
    name: "Content Gap Analyzer",
    slug: "content-gap",
    description: "Identify content gaps and opportunities by comparing your content with competitors.",
    shortDescription: "Analyze content gaps",
    categoryId: "content-copy",
    tier: 2,
    icon: "Search",
    keywords: ["content gap", "competitor analysis", "content opportunities", "seo gaps"]
  },
  {
    id: "keyword-density",
    name: "Keyword Density Analyzer",
    slug: "keyword-density",
    description: "Analyze keyword density and distribution in your content for optimal SEO balance.",
    shortDescription: "Analyze keyword density",
    categoryId: "content-copy",
    tier: 2,
    icon: "BarChart2",
    keywords: ["keyword density", "keyword analysis", "content optimization", "keyword stuffing"]
  },

  // ==========================================
  // CATEGORY 8: ARABIC SEO & LOCALIZATION (76-90)
  // ==========================================
  {
    id: "arabic-transliteration",
    name: "Arabic ↔ English Transliteration Tool",
    slug: "arabic-transliteration",
    description: "Convert text between Arabic and English transliteration for SEO keyword research and content.",
    shortDescription: "Transliterate Arabic and English",
    categoryId: "arabic-seo",
    tier: 2,
    icon: "Languages",
    keywords: ["arabic transliteration", "arabizi", "arabic english", "transliteration tool"],
    featured: true
  },
  {
    id: "arabic-keyword-planner",
    name: "Regional Arabic Keyword Research Planner",
    slug: "arabic-keyword-planner",
    description: "Plan Arabic keyword research with regional variations for UAE, KSA, Egypt, and other markets.",
    shortDescription: "Plan regional Arabic keywords",
    categoryId: "arabic-seo",
    tier: 2,
    icon: "Search",
    keywords: ["arabic keywords", "arabic seo", "gulf keywords", "mena keywords"]
  },
  {
    id: "dialect-selector",
    name: "Dialect Selector & Content Recommendation",
    slug: "dialect-selector",
    description: "Choose the right Arabic dialect for your target audience with content recommendations.",
    shortDescription: "Select Arabic dialect",
    categoryId: "arabic-seo",
    tier: 2,
    icon: "MessageCircle",
    keywords: ["arabic dialect", "gulf arabic", "levantine arabic", "egyptian arabic"]
  },
  {
    id: "rtl-meta-generator",
    name: "RTL (Right-to-Left) Meta Tag Generator",
    slug: "rtl-meta-generator",
    description: "Generate meta tags optimized for RTL (Right-to-Left) Arabic and Hebrew websites.",
    shortDescription: "Generate RTL meta tags",
    categoryId: "arabic-seo",
    tier: 2,
    icon: "PilcrowRight",
    keywords: ["rtl meta", "arabic meta", "right to left", "bidi seo"]
  },
  {
    id: "hreflang-arabic",
    name: "Hreflang Generator (Arabic/English Multi-Region)",
    slug: "hreflang-arabic",
    description: "Generate hreflang tags for Arabic/English multilingual websites targeting multiple regions.",
    shortDescription: "Generate Arabic hreflang tags",
    categoryId: "arabic-seo",
    tier: 2,
    icon: "Globe2",
    keywords: ["hreflang arabic", "multilingual seo", "arabic english", "regional targeting"]
  },
  {
    id: "arabic-seo-checklist",
    name: "Arabic Content SEO Readiness Checklist",
    slug: "arabic-seo-checklist",
    description: "Comprehensive checklist to ensure your Arabic content is fully optimized for search engines.",
    shortDescription: "Arabic SEO checklist",
    categoryId: "arabic-seo",
    tier: 2,
    icon: "ClipboardCheck",
    keywords: ["arabic checklist", "arabic optimization", "rtl seo", "arabic content"]
  },
  {
    id: "arabic-intent",
    name: "Arabic Keyword Search Intent Analyzer",
    slug: "arabic-intent",
    description: "Analyze search intent behind Arabic keywords for better content targeting.",
    shortDescription: "Analyze Arabic search intent",
    categoryId: "arabic-seo",
    tier: 2,
    icon: "Brain",
    keywords: ["arabic intent", "search intent", "keyword intent", "arabic queries"]
  },
  {
    id: "punycode-converter",
    name: "Punycode Domain Converter",
    slug: "punycode-converter",
    description: "Convert Arabic and international domains to/from Punycode format for domain registration.",
    shortDescription: "Convert Punycode domains",
    categoryId: "arabic-seo",
    tier: 2,
    icon: "AtSign",
    keywords: ["punycode", "idn domain", "arabic domain", "international domain"]
  },
  {
    id: "content-parity",
    name: "Arabic-English Content Parity Checker",
    slug: "content-parity",
    description: "Check content consistency between Arabic and English versions of your website.",
    shortDescription: "Check Arabic-English parity",
    categoryId: "arabic-seo",
    tier: 2,
    icon: "GitCompare",
    keywords: ["content parity", "translation check", "bilingual content", "localization check"]
  },
  {
    id: "pricing-mapper",
    name: "Regional Arabic Pricing & Tax Mapper",
    slug: "pricing-mapper",
    description: "Map pricing and tax configurations for different Arabic-speaking markets and currencies.",
    shortDescription: "Map regional pricing",
    categoryId: "arabic-seo",
    tier: 2,
    icon: "Calculator",
    keywords: ["arabic pricing", "regional tax", "gcc pricing", "mena ecommerce"]
  },
  {
    id: "arabic-stopwords",
    name: "Arabic Stop Words Remover",
    slug: "arabic-stopwords",
    description: "Remove common Arabic stop words from text for keyword extraction and analysis.",
    shortDescription: "Remove Arabic stop words",
    categoryId: "arabic-seo",
    tier: 2,
    icon: "Filter",
    keywords: ["arabic stopwords", "text processing", "keyword extraction", "arabic nlp"]
  },
  {
    id: "arabic-benchmarking",
    name: "Arabic SEO Benchmarking Tool",
    slug: "arabic-benchmarking",
    description: "Benchmark your Arabic SEO performance against competitors in the MENA region.",
    shortDescription: "Benchmark Arabic SEO",
    categoryId: "arabic-seo",
    tier: 2,
    icon: "TrendingUp",
    keywords: ["arabic benchmark", "mena seo", "competitor analysis", "arabic rankings"]
  },
  {
    id: "arabic-intent-patterns",
    name: "Arabic Search Intent Pattern Extractor",
    slug: "arabic-intent-patterns",
    description: "Extract search intent patterns from Arabic queries for content optimization.",
    shortDescription: "Extract Arabic intent patterns",
    categoryId: "arabic-seo",
    tier: 2,
    icon: "Workflow",
    keywords: ["intent patterns", "arabic queries", "search patterns", "query analysis"]
  },
  {
    id: "msa-dialect-advisor",
    name: "Modern Standard Arabic (MSA) vs Colloquial Dialect Advisor",
    slug: "msa-dialect-advisor",
    description: "Get recommendations on using MSA vs colloquial Arabic dialects for your content strategy.",
    shortDescription: "MSA vs dialect advice",
    categoryId: "arabic-seo",
    tier: 2,
    icon: "GraduationCap",
    keywords: ["msa arabic", "fusha", "colloquial arabic", "arabic strategy"]
  },
  {
    id: "arabic-brand-checker",
    name: "Arabic Brand Name Cultural Appropriateness Checker",
    slug: "arabic-brand-checker",
    description: "Check if your brand name has appropriate meaning and connotations in Arabic cultures.",
    shortDescription: "Check Arabic brand names",
    categoryId: "arabic-seo",
    tier: 2,
    icon: "BadgeCheck",
    keywords: ["arabic branding", "brand localization", "cultural check", "arabic meaning"]
  },

  // ==========================================
  // CATEGORY 9: GCC COMPLIANCE & GOVERNMENT (91-100)
  // ==========================================
  {
    id: "uae-vat-calculator",
    name: "UAE VAT Calculator (5%)",
    slug: "uae-vat-calculator",
    description: "Calculate UAE Value Added Tax (5%) for products and services with inclusive/exclusive options.",
    shortDescription: "Calculate UAE 5% VAT",
    categoryId: "gcc-compliance",
    tier: 2,
    icon: "Calculator",
    keywords: ["uae vat", "vat calculator", "5% vat", "uae tax"],
    featured: true
  },
  {
    id: "gcc-vat-calculator",
    name: "GCC Multi-Country VAT Calculator",
    slug: "gcc-vat-calculator",
    description: "Calculate VAT across GCC countries including UAE, KSA, Bahrain, and Oman with varying rates.",
    shortDescription: "Calculate GCC VAT rates",
    categoryId: "gcc-compliance",
    tier: 2,
    icon: "Landmark",
    keywords: ["gcc vat", "saudi vat", "bahrain vat", "oman vat"]
  },
  {
    id: "vat-threshold",
    name: "VAT Registration Threshold Checker",
    slug: "vat-threshold",
    description: "Check VAT registration requirements and thresholds for GCC countries.",
    shortDescription: "Check VAT thresholds",
    categoryId: "gcc-compliance",
    tier: 2,
    icon: "Gauge",
    keywords: ["vat threshold", "vat registration", "mandatory vat", "gcc registration"]
  },
  {
    id: "vat-invoice-template",
    name: "VAT Invoice Template Generator",
    slug: "vat-invoice-template",
    description: "Generate compliant VAT invoice templates for UAE and GCC business transactions.",
    shortDescription: "Generate VAT invoice templates",
    categoryId: "gcc-compliance",
    tier: 2,
    icon: "Receipt",
    keywords: ["vat invoice", "tax invoice", "uae invoice", "fta compliant"]
  },
  {
    id: "vat-return-calculator",
    name: "Quarterly VAT Return Calculator",
    slug: "vat-return-calculator",
    description: "Calculate quarterly VAT returns with input/output tax and net payable amounts.",
    shortDescription: "Calculate VAT returns",
    categoryId: "gcc-compliance",
    tier: 2,
    icon: "FileSpreadsheet",
    keywords: ["vat return", "quarterly vat", "vat filing", "tax return"]
  },
  {
    id: "uae-activity-selector",
    name: "UAE Business Activity Selector",
    slug: "uae-activity-selector",
    description: "Select appropriate business activities for UAE company registration and licensing.",
    shortDescription: "Select UAE business activities",
    categoryId: "gcc-compliance",
    tier: 2,
    icon: "Briefcase",
    keywords: ["uae activities", "business license", "trade license", "ded activities"]
  },
  {
    id: "gcc-registration-checklist",
    name: "GCC Company Registration Checklist",
    slug: "gcc-registration-checklist",
    description: "Comprehensive checklist for company registration requirements across GCC countries.",
    shortDescription: "GCC registration checklist",
    categoryId: "gcc-compliance",
    tier: 2,
    icon: "ClipboardList",
    keywords: ["gcc registration", "company setup", "uae company", "saudi company"]
  },
  {
    id: "freezone-mainland",
    name: "Free Zone vs Mainland UAE Comparison",
    slug: "freezone-mainland",
    description: "Compare Free Zone and Mainland company setup options in UAE with pros and cons.",
    shortDescription: "Free Zone vs Mainland comparison",
    categoryId: "gcc-compliance",
    tier: 2,
    icon: "Scale",
    keywords: ["free zone", "mainland uae", "dubai freezone", "uae setup"]
  },
  {
    id: "license-fee-estimator",
    name: "Business License Fee Estimator (UAE)",
    slug: "license-fee-estimator",
    description: "Estimate business license fees for different UAE Emirates and Free Zones.",
    shortDescription: "Estimate UAE license fees",
    categoryId: "gcc-compliance",
    tier: 2,
    icon: "Wallet",
    keywords: ["license fees", "uae fees", "freezone cost", "business setup cost"]
  },
  {
    id: "compliance-timeline",
    name: "GCC Business Compliance Timeline Tool",
    slug: "compliance-timeline",
    description: "Track compliance deadlines for VAT, audits, renewals, and regulatory requirements in GCC.",
    shortDescription: "Track GCC compliance deadlines",
    categoryId: "gcc-compliance",
    tier: 2,
    icon: "Calendar",
    keywords: ["compliance timeline", "gcc deadlines", "vat deadline", "audit deadline"]
  },

  // ==========================================
  // CATEGORY 5: DEVELOPER & FORMATTERS (NEW)
  // ==========================================
  {
    id: "json-formatter",
    name: "JSON Formatter & Beautifier",
    slug: "json-formatter",
    description: "Format, validate, and minify your JSON data. Fix common errors and make your JSON readable.",
    shortDescription: "Format & Validate JSON",
    categoryId: "developer-formatters",
    tier: 1,
    icon: "Braces",
    keywords: ["json formatter", "json beautifier", "json validator", "minify json"],
    featured: true,
    instructions: [
      "Paste your raw JSON string into the input editor.",
      "If the JSON is invalid, review the error message to fix it.",
      "Click 'Beautify' to indent and format the code.",
      "Click 'Minify' to compress it for production use.",
      "Use 'Copy' to grab the result."
    ]
  },
  {
    id: "xml-formatter",
    name: "XML Formatter",
    slug: "xml-formatter",
    description: "Beautify and minify XML code. Standardize your XML structure for better readability.",
    shortDescription: "Format XML Data",
    categoryId: "developer-formatters",
    tier: 1,
    icon: "Code",
    keywords: ["xml formatter", "xml beautifier", "xml pretty print"],
    instructions: [
      "Paste your XML code into the input area.",
      "Click 'Beautify' to add proper indentation and line breaks.",
      "Click 'Minify' to remove all unnecessary whitespace.",
      "Copy the processed XML for your project."
    ]
  },
  {
    id: "sql-formatter",
    name: "SQL Formatter",
    slug: "sql-formatter",
    description: "Format complex SQL queries. support for various dialects (Standard, PostgreSQL, MySQL).",
    shortDescription: "Format SQL Queries",
    categoryId: "developer-formatters",
    tier: 1,
    icon: "Database",
    keywords: ["sql formatter", "sql beautifier", "sql pretty print", "query formatter"],
    instructions: [
      "Enter your raw SQL query into the editor.",
      "The tool will automatically detect keywords and clauses.",
      "Click 'Beautify' to organize the query with proper indentation.",
      "Review the formatted SQL for readability and correctness."
    ]
  },
  {
    id: "yaml-formatter",
    name: "YAML Validator & Formatter",
    slug: "yaml-formatter",
    description: "Validate and format YAML files. Convert between YAML and JSON.",
    shortDescription: "Format & Validate YAML",
    categoryId: "developer-formatters",
    tier: 1,
    icon: "FileJson",
    keywords: ["yaml formatter", "yaml validator", "yaml lint"],
    instructions: [
      "Paste your YAML content into the editor.",
      "The tool validates the syntax in real-time.",
      "Click 'Beautify' to fix indentation levels.",
      "Use the controls to convert to JSON if needed."
    ]
  },
  {
    id: "json-to-csv",
    name: "JSON to CSV Converter",
    slug: "json-to-csv",
    description: "Convert nested JSON data into a flat CSV format for Excel/Sheets analysis.",
    shortDescription: "Convert JSON to CSV",
    categoryId: "developer-formatters",
    tier: 1,
    icon: "Table",
    keywords: ["json to csv", "convert json", "data converter"],
    instructions: [
      "Paste your JSON array or object into the input field.",
      "The tool will flatten nested objects automatically.",
      "View the generated CSV in the output panel.",
      "Download the .csv file or copy the text to your clipboard."
    ]
  },
  {
    id: "csv-to-json",
    name: "CSV to JSON Converter",
    slug: "csv-to-json",
    description: "Convert CSV data into structured JSON arrays. Supports custom delimiters.",
    shortDescription: "Convert CSV to JSON",
    categoryId: "developer-formatters",
    tier: 1,
    icon: "FileSpreadsheet",
    keywords: ["csv to json", "convert csv", "csv parser"],
    instructions: [
      "Paste your CSV data (headers in first row recommended).",
      "The tool parses the data into a JSON array of objects.",
      "Review the JSON output structure.",
      "Copy the result for use in your API or application."
    ]
  },
  {
    id: "curl-to-code",
    name: "cURL to Code",
    slug: "curl-to-code",
    description: "Convert cURL commands into Python, JavaScript (Fetch), Node.js, Go, and PHP code.",
    shortDescription: "Convert cURL to Code",
    categoryId: "developer-formatters",
    tier: 1,
    icon: "Terminal",
    keywords: ["curl converter", "curl to python", "curl to node", "api tool"],
    instructions: [
      "Paste a standard cURL command into the input box.",
      "Select your target language (Python, JS, Go, etc.).",
      "The tool generates the equivalent code snippet.",
      "Copy the code to integrate into your application."
    ]
  },
  {
    id: "html-minifier",
    name: "HTML Minifier",
    slug: "html-minifier",
    description: "Compress HTML code by removing whitespace, comments, and newlines.",
    shortDescription: "Minify HTML Code",
    categoryId: "developer-formatters",
    tier: 1,
    icon: "FileCode",
    keywords: ["html minifier", "compress html", "web optimization"],
    instructions: [
      "Paste your HTML source code.",
      "Click 'Minify' to strip comments and whitespace.",
      "Check the compression ratio stats.",
      "Copy the optimized HTML for your deployment."
    ]
  },
  {
    id: "css-minifier",
    name: "CSS Minifier",
    slug: "css-minifier",
    description: "Minify CSS code to reduce file size and improve page load speed.",
    shortDescription: "Minify CSS Code",
    categoryId: "developer-formatters",
    tier: 1,
    icon: "Palette",
    keywords: ["css minifier", "compress css", "css optimizer"],
    instructions: [
      "Enter your CSS stylesheets into the editor.",
      "Click 'Minify' to remove spaces and unnecessary characters.",
      "Ensure functionality remains intact.",
      "Copy the minified CSS to your .min.css file."
    ]
  },
  {
    id: "js-minifier",
    name: "JavaScript Minifier",
    slug: "js-minifier",
    description: "Compress JavaScript code. Reduce bundle size and bandwidth usage.",
    shortDescription: "Minify JS Code",
    categoryId: "developer-formatters",
    tier: 1,
    icon: "FileJson",
    keywords: ["js minifier", "javascript compressor", "uglify js"],
    instructions: [
      "Paste your JavaScript code (ES6+ supported).",
      "Click 'Minify' to compress the script.",
      "Review the output for any syntax errors.",
      "Copy the optimized code for production."
    ]
  },
  {
    id: "jwt-debugger",
    name: "JWT Debugger",
    slug: "jwt-debugger",
    description: "Decode and verify JSON Web Tokens (JWT). View header and payload data.",
    shortDescription: "Decode JWTs",
    categoryId: "developer-formatters",
    tier: 1,
    icon: "ShieldCheck",
    keywords: ["jwt debugger", "decode jwt", "jwt viewer", "token decoder"],
    instructions: [
      "Paste your JWT string (header.payload.signature).",
      "The tool implicitly decodes the Header and Payload.",
      "Inspect the claims (exp, iat, sub, etc.).",
      "Verify the signature status if a secret is provided."
    ]
  },
  {
    id: "regex-tester",
    name: "Regex Tester",
    slug: "regex-tester",
    description: "Test and debug Regular Expressions against test strings in real-time.",
    shortDescription: "Test Regex Patterns",
    categoryId: "developer-formatters",
    tier: 1,
    icon: "Regex",
    keywords: ["regex tester", "regex debugger", "regular expression", "pattern match"],
    instructions: [
      "Enter your Regular Expression pattern.",
      "Add flags if needed (g, i, m).",
      "Type a test string to see matches highlighted.",
      "Review capture groups and match details."
    ]
  },
  // ==========================================
  // CATEGORY 6: SECURITY & CRYPTO (NEW)
  // ==========================================
  {
    id: "base64-encoder",
    name: "Base64 Encoder/Decoder",
    slug: "base64-encoder",
    description: "Encode and decode text to Base64 format securely in your browser.",
    shortDescription: "Base64 Encode/Decode",
    categoryId: "security-crypto",
    tier: 1,
    icon: "Lock",
    keywords: ["base64 encoder", "base64 decoder", "b64 converter", "string to base64"],
    instructions: [
      "Paste your text into the input field.",
      "The tool converts it to a standard ASCII Base64 string.",
      "Use 'Decode' to convert Base64 back to plain text.",
      "Copy the result."
    ]
  },
  {
    id: "base64url-encoder",
    name: "Base64URL Encoder/Decoder",
    slug: "base64url-encoder",
    description: "Base64 encoding with URL-safe characters. Useful for JWT and URL parameters.",
    shortDescription: "URL-Safe Base64",
    categoryId: "security-crypto",
    tier: 1,
    icon: "Link",
    keywords: ["base64url", "base64 url safe", "jwt encoding"],
    instructions: [
      "Enter your raw text string.",
      "The tool encodes it using the URL-safe Base64 alphabet.",
      "Different from standard Base64: + becomes -, / becomes _.",
      "Use this for ensuring safe data transmission in URLs."
    ]
  },
  {
    id: "hex-encoder",
    name: "Hex Converter",
    slug: "hex-converter",
    description: "Convert text or numbers to Hexadecimal strings and vice versa.",
    shortDescription: "Text to Hex",
    categoryId: "security-crypto",
    tier: 1,
    icon: "Binary",
    keywords: ["hex converter", "text to hex", "hex decoder"],
    instructions: [
      "Type your normal text string.",
      "View the Hexadecimal representation immediately.",
      "Switch mode to convert Hex codes back to text.",
      "Useful for debugging binary data protocols."
    ]
  },
  {
    id: "url-encoder",
    name: "URL Encoder / Decoder",
    slug: "url-encoder",
    description: "Encode special characters in URLs to valid format (percent-encoding).",
    shortDescription: "URL Encode/Decode",
    categoryId: "security-crypto",
    tier: 1,
    icon: "Globe",
    keywords: ["url encoder", "percent encoding", "uri encoder"],
    instructions: [
      "Paste a URL or string with special characters.",
      "Click 'Encode' to apply standard percent-encoding.",
      "Characters like spaces become %20, etc.",
      "Click 'Decode' to revert encoded URLs to human-readable format."
    ]
  },
  {
    id: "html-entity-encoder",
    name: "HTML Entity Encoder",
    slug: "html-entity-encoder",
    description: "Convert reserved characters (<, >, &, \") to HTML entities to prevent XSS.",
    shortDescription: "HTML Entities",
    categoryId: "security-crypto",
    tier: 1,
    icon: "Code2",
    keywords: ["html entities", "escape html", "xss prevention"],
    instructions: [
      "Enter any text containing HTML special characters.",
      "The tool converts <, >, &, etc., into Safe Entities (&lt;).",
      "Use the encoded output to safely display code on web pages.",
      "You can also decode entities back to raw characters."
    ]
  },
  {
    id: "hash-generator-md5",
    name: "MD5 Hash Generator",
    slug: "hash-generator-md5",
    description: "Generate MD5 fingerprints. Note: MD5 is not crypotgraphically secure.",
    shortDescription: "Generate MD5",
    categoryId: "security-crypto",
    tier: 1,
    icon: "Hash",
    keywords: ["md5 generator", "md5 hash", "checksum"],
    instructions: [
      "Type your input string.",
      "The 32-character MD5 hash is generated instantly.",
      "Use this for file integrity checks (checksums).",
      "Do not use MD5 for password storage."
    ]
  },
  {
    id: "hash-generator-sha256",
    name: "SHA-256 Hash Generator",
    slug: "hash-generator-sha256",
    description: "Generate secure SHA-256 hashes. Standard for modern security.",
    shortDescription: "Generate SHA-256",
    categoryId: "security-crypto",
    tier: 1,
    icon: "ShieldCheck",
    keywords: ["sha256 generator", "secure hash", "crypto hash"],
    instructions: [
      "Enter sensitive data or text.",
      "A unique 64-character SHA-256 hash is created.",
      "This is a one-way process; the original text cannot be recovered.",
      "Commonly used for digital signatures and blockchain."
    ]
  },
  {
    id: "hash-generator-sha512",
    name: "SHA-512 Hash Generator",
    slug: "hash-generator-sha512",
    description: "Generate ultra-secure SHA-512 hashes. 128 characters long.",
    shortDescription: "Generate SHA-512",
    categoryId: "security-crypto",
    tier: 1,
    icon: "ShieldAlert",
    keywords: ["sha512 generator", "high security hash", "crypto"],
    instructions: [
      "Input your text string.",
      "Obtain the SHA-512 hash digest.",
      "This mechanism offers higher collision resistance than SHA-256.",
      "Suitable for high-security cryptographic applications."
    ]
  },
  {
    id: "hmac-generator",
    name: "HMAC Generator",
    slug: "hmac-generator",
    description: "Create Hash-based Message Authentication Codes using a secret key.",
    shortDescription: "Generate HMAC",
    categoryId: "security-crypto",
    tier: 1,
    icon: "Key",
    keywords: ["hmac generator", "signed hash", "hmac sha256", "hmac calculator"],
    instructions: [
      "Enter the message payload you wish to sign.",
      "Provide a Secret Key (passphrase).",
      "Select the hashing algorithm (SHA-256, SHA-512, MD5).",
      "The tool verifies the integrity and authenticity of the message."
    ]
  },
  {
    id: "password-generator",
    name: "Strong Password Generator",
    slug: "password-generator",
    description: "Create secure, random passwords with customizable length and character sets.",
    shortDescription: "Generate Passwords",
    categoryId: "security-crypto",
    tier: 1,
    icon: "Unlock",
    keywords: ["password generator", "secure password", "random password", "password creator"],
    instructions: [
      "Select your desired password length (8-64 characters).",
      "Toggle options for Symbols, Numbers, and Capital Letters.",
      "Click 'Generate' to create a cryptographically strong password.",
      "Copy it to your clipboard (we do not store any generated data)."
    ]
  },
  {
    id: "uuid-generator",
    name: "UUID / GUID Generator",
    slug: "uuid-generator",
    description: "Generate Version 4 UUIDs (Universally Unique Identifiers) instantly.",
    shortDescription: "Generate UUIDs",
    categoryId: "security-crypto",
    tier: 1,
    icon: "Fingerprint",
    keywords: ["uuid generator", "guid generator", "v4 uuid", "unique id"],
    instructions: [
      "Select the quantity of UUIDs you need (1 to 100).",
      "Click 'Generate' to create valid Version 4 UUIDs.",
      "Use the 'Copy All' button for bulk operations.",
      "Ideal for database keys and unique session identifiers."
    ]
  },
  {
    id: "hash-generator-sha1",
    name: "SHA-1 Hash Generator",
    slug: "hash-generator-sha1",
    description: "Generate SHA-1 hashes used in legacy systems and git commit IDs.",
    shortDescription: "Generate SHA-1",
    categoryId: "security-crypto",
    tier: 1,
    icon: "Hash",
    keywords: ["sha1 generator", "sha1 hash", "git hash", "checksum"],
    instructions: [
      "Input the text string you need to hash.",
      "The tool outputs the 40-character SHA-1 checksum.",
      "Verify legacy file integrity or Git object IDs.",
      "Note: SHA-1 is considered collision-vulnerable."
    ]
  },
  {
    id: "hash-generator-sha224",
    name: "SHA-224 Hash Generator",
    slug: "hash-generator-sha224",
    description: "Generate SHA-224 hashes. A truncated version of SHA-256.",
    shortDescription: "Generate SHA-224",
    categoryId: "security-crypto",
    tier: 1,
    icon: "Shield",
    keywords: ["sha224 generator", "sha224 hash", "crypto224"],
    instructions: [
      "Enter your input text.",
      "Generate a 56-character SHA-224 hash.",
      "Use this for 3DES equivalent security strength requirements.",
      "Result is a truncated version of the SHA-256 algorithm."
    ]
  },
  {
    id: "hash-generator-sha384",
    name: "SHA-384 Hash Generator",
    slug: "hash-generator-sha384",
    description: "Generate SHA-384 hashes. A truncated version of SHA-512.",
    shortDescription: "Generate SHA-384",
    categoryId: "security-crypto",
    tier: 1,
    icon: "Shield",
    keywords: ["sha384 generator", "sha384 hash", "crypto384"],
    instructions: [
      "Type your string to be hashed.",
      "Get the 96-character SHA-384 output.",
      "Commonly used in NSA Suite B Cryptography.",
      "Provides a balance between SHA-256 and SHA-512 size."
    ]
  },
  // ==========================================
  // CATEGORY 7: STRING & TEXT MANIPULATION (NEW)
  // ==========================================
  {
    id: "word-counter",
    name: "Word & Character Counter",
    slug: "word-counter",
    description: "Count words, characters, sentences, and paragraphs in real-time. Estimate reading time.",
    shortDescription: "Count words & chars",
    categoryId: "string-text",
    tier: 1,
    icon: "Type",
    keywords: ["word counter", "character count", "text stats", "reading time"],
    instructions: [
      "Paste your article or text draft into the main area.",
      "View instant counts for words, characters, and sentences.",
      "Check the 'Reading Time' estimate for your audience.",
      "Ensure your content meets specific length requirements."
    ]
  },
  {
    id: "case-converter",
    name: "Case Converter",
    slug: "case-converter",
    description: "Convert text between Uppercase, Lowercase, Title Case, CamelCase, Snake_Case, and more.",
    shortDescription: "Text Case Converter",
    categoryId: "string-text",
    tier: 1,
    icon: "Baseline",
    keywords: ["case converter", "uppercase", "lowercase", "camelcase", "snakecase"],
    instructions: [
      "Type or paste your text.",
      "Choose a transformation button (e.g., 'UPPER CASE').",
      "Convert code variables to CamelCase or Snake_Case.",
      "Fix accidental Caps Lock typing instantly."
    ]
  },
  {
    id: "lorem-ipsum-generator",
    name: "Lorem Ipsum Generator",
    slug: "lorem-ipsum-generator",
    description: "Generate placeholder text (Lorem Ipsum) for your designs. Customize paragraphs, words, or lists.",
    shortDescription: "Generate Lorem Ipsum",
    categoryId: "string-text",
    tier: 1,
    icon: "FileText",
    keywords: ["lorem ipsum", "dummy text", "placeholder text", "generator"],
    instructions: [
      "Select 'Paragraphs', 'Sentences', or 'Words'.",
      "Choose the quantity you need (e.g., 5 paragraphs).",
      "Click 'Generate' to create the placeholder text.",
      "Copy it into your design mockups or wireframes."
    ]
  },
  {
    id: "remove-duplicate-lines",
    name: "Remove Duplicate Lines",
    slug: "remove-duplicate-lines",
    description: "Instantly remove duplicate lines from a text list. Sort and clean up your data.",
    shortDescription: "Remove Duplicates",
    categoryId: "string-text",
    tier: 1,
    icon: "ListX",
    keywords: ["remove duplicates", "deduplicate", "unique lines", "list cleaner"],
    instructions: [
      "Paste your list (emails, names, URLs, etc.).",
      "The tool identifies and removes identical lines.",
      "View the count of removed duplicates.",
      "Copy the cleaned unique list."
    ]
  },
  {
    id: "string-reverser",
    name: "String Reverser",
    slug: "string-reverser",
    description: "Reverse text, words, or letters. Check for palindromes.",
    shortDescription: "Reverse Text",
    categoryId: "string-text",
    tier: 1,
    icon: "RefreshCw",
    keywords: ["reverse text", "flip text", "palindrome checker", "backwards text"],
    instructions: [
      "Enter your text string.",
      "Choose 'Reverse Characters' to flip the entire string.",
      "Choose 'Reverse Words' to keep words intact but change order.",
      "Check if your text is a Palindrome (reads same backwards)."
    ]
  },
  {
    id: "text-diff",
    name: "Text Diff Checker",
    slug: "text-diff",
    description: "Compare two text files or strings and highlight the differences (additions and removals).",
    shortDescription: "Compare Text Differences",
    categoryId: "string-text",
    tier: 1,
    icon: "Diff",
    keywords: ["diff checker", "text compare", "version compare", "difference"],
    instructions: [
      "Paste the 'Original' text in the left panel.",
      "Paste the 'Modified' text in the right panel.",
      "Click 'Compare Differences'.",
      "View additions (Green) and removals (Red) inline."
    ]
  },
  {
    id: "slug-generator",
    name: "URL Slug Generator",
    slug: "slug-generator",
    description: "Convert headlines or text into SEO-friendly URL slugs. Removes special characters and spaces.",
    shortDescription: "Generate URL Slugs",
    categoryId: "string-text",
    tier: 1,
    icon: "Link2",
    keywords: ["slug generator", "url cleaner", "seo slug", "permalink"],
    instructions: [
      "Type your article title or product name.",
      "The tool removes special characters and replaces spaces with dashes.",
      "Output is lowercase and URL-safe.",
      "Copy the slug for your permalink structure."
    ]
  },
  {
    id: "ascii-art",
    name: "ASCII Art Generator",
    slug: "ascii-art",
    description: "Convert text into decorative ASCII art using various fonts/styles.",
    shortDescription: "Generate ASCII Art",
    categoryId: "string-text",
    tier: 1,
    icon: "Image",
    keywords: ["ascii art", "text art", "figlet", "banner"],
    instructions: [
      "Enter the text you want to stylize.",
      "The tool converts standard text into large ASCII banner art.",
      "Perfect for code comments, README files, or social posts.",
      "Copy the block of text characters."
    ]
  },
  {
    id: "markdown-to-html",
    name: "Markdown to HTML",
    slug: "markdown-to-html",
    description: "Convert Markdown syntax to raw HTML. Preview the result in real-time.",
    shortDescription: "Convert MD to HTML",
    categoryId: "string-text",
    tier: 1,
    icon: "FileCode",
    keywords: ["markdown converter", "md to html", "markdown preview", "parse markdown"],
    instructions: [
      "Write or paste Markdown in the left editor (# Heading, **bold**).",
      "See the live HTML preview on the right.",
      "View the raw HTML source code below.",
      "Copy snippets for your web pages or blog."
    ]
  },
  {
    id: "text-replacement",
    name: "Text Replacement Tool",
    slug: "text-replacement",
    description: "Find and replace text / strings. Supports Regular Expressions.",
    shortDescription: "Find & Replace",
    categoryId: "string-text",
    tier: 1,
    icon: "Replace",
    keywords: ["find replace", "text sub", "string replace", "regex replace"],
    instructions: [
      "Paste your source text.",
      "Enter the text to 'Find' and the text to 'Replace With'.",
      "Enable 'Use Regex' for advanced pattern matching.",
      "Click 'Replace All' to process the entire text."
    ]
  },
  {
    id: "unicode-detector",
    name: "Unicode Character Detector",
    slug: "unicode-detector",
    description: "Identify Unicode characters, code points, and HTML entities in your text.",
    shortDescription: "Detect Unicode Info",
    categoryId: "string-text",
    tier: 1,
    icon: "Info",
    keywords: ["unicode info", "char code", "codepoint", "what character"],
    instructions: [
      "Paste unknown symbols or emojis.",
      "The tool breaks down each character.",
      "View the Decimal code, Hex code (U+XXXX), and HTML Entity.",
      "Useful for debugging encoding issues."
    ]
  },

  {
    id: "serp-checker",
    name: "Local SERP Checker",
    slug: "serp-checker",
    description: "Check Google search results from any location worldwide. View localized SERPs for any country, city, or ZIP code on Google Search and Google Maps.",
    shortDescription: "View Google results from any location",
    categoryId: "local-seo",
    tier: 1,
    icon: "Search",
    keywords: ["serp checker", "local search", "google results", "rank checker", "local seo"],
    featured: true,
    instructions: [
      "Enter your target keyword (e.g., 'plumbers near me').",
      "Specify the exact location (City, Zip Code, or Address).",
      "Choose the device type (Desktop or Mobile) to simulate.",
      "Select the Google domain (e.g., google.com, google.ae).",
      "Click 'Check SERP' to view the real-time localized search results."
    ]
  },
  {
    id: "review-link-generator",
    name: "Google Review Link Generator",
    slug: "review-link-generator",
    description: "Create a direct link and QR code that takes customers straight to your Google review form. Generate printable QR codes for marketing materials.",
    shortDescription: "Generate Google review links & QR codes",
    categoryId: "local-seo",
    tier: 1,
    icon: "Star",
    keywords: ["google reviews", "review link", "qr code", "customer reviews", "gbp"],
    featured: true,
    instructions: [
      "Use the 'Find Your Place ID' helper to locate your business ID.",
      "Copy the ID starting with 'ChIJ' or 'GhIJ'.",
      "Paste it into the generator field below.",
      "Click 'Generate' to create your official review link.",
      "Download the QR code for your printed marketing materials."
    ]
  },
  {
    id: "local-schema-generator",
    name: "LocalBusiness Schema Generator",
    slug: "local-schema-generator",
    description: "Generate Google-compliant JSON-LD structured data for your local business. Includes opening hours builder and real-time preview.",
    shortDescription: "Generate LocalBusiness JSON-LD schema",
    categoryId: "local-seo",
    tier: 1,
    icon: "Code2",
    keywords: ["schema markup", "json-ld", "local business", "structured data", "rich snippets"],
    instructions: [
      "Enter your Business Name and select the specific 'Type' (e.g. Dentist, Restaurant).",
      "Upload your logo URL and social profile links.",
      "Add your full address and pinpoint the geo-coordinates.",
      "Set your operating hours using the visual scheduler.",
      "Copy the generated JSON-LD script to your website's <head> tag."
    ]
  },
  {
    id: "georanker",
    name: "GeoRanker (Local Rank Tracker)",
    slug: "georanker",
    description: "The world's first enterprise-grade, open-source grid tracker. Stop paying for credits and start owning your data. Unlimited scans, smart city grids, and local privacy.",
    shortDescription: "Open-source Google Maps grid tracker",
    categoryId: "local-seo",
    tier: 1,
    icon: "Map",
    keywords: ["geo ranker", "local rank tracker", "google maps grid", "serp checker"],
    featured: true,
    link: "/google-maps-serp-checker-free-tool",
    instructions: [
      "Select your city and target keywords.",
      "Set the grid size (up to 13x13).",
      "Run the scan to visualize rankings.",
      "Analyze competitor share of voice.",
      "Export data for reporting."
    ]
  },
  // ==========================================
  // CATEGORY 8: IMAGE TOOLS (NEW)
  // ==========================================
  {
    id: "image-compressor",
    name: "Image Compressor",
    slug: "image-compressor",
    description: "Compress JPG, PNG, and WebP images directly in your browser. Reduce file size without losing quality.",
    shortDescription: "Compress Images",
    categoryId: "image-tools",
    tier: 1,
    icon: "ImageDown",
    keywords: ["image compressor", "compress png", "compress jpg", "optimize images", "reduce image size"],
    instructions: [
      "Drag and drop your images (JPG, PNG, WebP).",
      "Adjust the compression quality slider.",
      "Wait for the compression to finish.",
      "Download the compressed images individually or as a ZIP."
    ]
  },
  {
    id: "image-converter",
    name: "Image Converter",
    slug: "image-converter",
    description: "Convert images between formats (JPG, PNG, WebP). Bulk conversion supported.",
    shortDescription: "Convert Image Formats",
    categoryId: "image-tools",
    tier: 1,
    icon: "FileOutput",
    keywords: ["image converter", "png to jpg", "webp converter", "change image format"],
    instructions: [
      "Upload your image files.",
      "Select the target output format (JPG, PNG, WebP).",
      "Click 'Convert' to process the files.",
      "Download your converted images."
    ]
  },
  {
    id: "image-cropper",
    name: "Image Cropper & Resizer",
    slug: "image-cropper",
    description: "Crop and resize images to exact dimensions. Pre-set aspect ratios for social media.",
    shortDescription: "Crop & Resize Images",
    categoryId: "image-tools",
    tier: 1,
    icon: "Crop",
    keywords: ["image cropper", "resize image", "photo editor", "aspect ratio"],
    instructions: [
      "Upload an image to the editor.",
      "Drag the corners to crop or enter specific dimensions.",
      "Choose an aspect ratio (e.g., 1:1, 16:9).",
      "Download the cropped version."
    ]
  },
  {
    id: "color-picker",
    name: "Color Picker & Palette",
    slug: "color-picker",
    description: "Extract colors from images or generate harmonious color palettes.",
    shortDescription: "Pick Colors & Palettes",
    categoryId: "image-tools",
    tier: 1,
    icon: "Palette",
    keywords: ["color picker", "hex code finder", "image color extract", "palette generator"],
    instructions: [
      "Upload an image to extract its dominant colors.",
      "Or use the color wheel to generate palettes.",
      "Copy HEX, RGB, and HSL codes instantly.",
      "Save your favorite palettes."
    ]
  },
  {
    id: "svg-to-png-converter",
    name: "SVG to PNG Converter",
    slug: "svg-to-png-converter",
    description: "Convert Scalable Vector Graphics (SVG) code or files into high-resolution PNG images. Transparent background preserved.",
    shortDescription: "SVG to PNG",
    categoryId: "image-tools",
    tier: 1,
    icon: "Image",
    keywords: ["svg to png", "convert svg", "rasterize svg", "svg converter", "vector to png"],
    instructions: [
      "Paste your SVG code or upload an .svg file.",
      "Check the live preview to ensure it renders correctly.",
      "Set the desired output width (height is auto-calculated).",
      "Click 'Download PNG' to save the image."
    ]
  },
  {
    id: "base64-image-decoder",
    name: "Base64 Image Decoder",
    slug: "base64-image-decoder",
    description: "Decode Base64 strings back into images. Preview and download the original file instantly.",
    shortDescription: "Base64 to Image",
    categoryId: "image-tools",
    tier: 1,
    icon: "Image",
    keywords: ["base64 to image", "decode image", "base64 converter", "view base64", "image decoder"],
    instructions: [
      "Paste the Base64 string into the text box.",
      "The tool will automatically attempt to render the image.",
      "Check the preview and image dimensions.",
      "Click 'Save Image' to download."
    ]
  },
  // ==========================================
  // CATEGORY 9: CSS & UI TOOLS (NEW)
  // ==========================================
  {
    id: "css-gradient-generator",
    name: "CSS Gradient Generator",
    slug: "css-gradient-generator",
    description: "Create beautiful linear and radial CSS gradients. Customize colors, direction, and opacity.",
    shortDescription: "Gradient Generator",
    categoryId: "css-ui",
    tier: 1,
    icon: "Palette",
    keywords: ["css gradient", "gradient generator", "background generator", "css background"],
    instructions: [
      "Choose Linear or Radial type.",
      "Add and move color stops.",
      "Adjust angle and copy the CSS."
    ]
  },
  {
    id: "box-shadow-generator",
    name: "Box Shadow Generator",
    slug: "box-shadow-generator",
    description: "Generate CSS box-shadows visually. Adjust offset, blur, spread, and color.",
    shortDescription: "Box Shadow Maker",
    categoryId: "css-ui",
    tier: 1,
    icon: "Layers",
    keywords: ["box shadow", "css shadow", "shadow generator", "drop shadow"],
    instructions: [
      "Use sliders to adjust X/Y offset.",
      "Set blur radius and spread.",
      "Pick a shadow color and opacity.",
      "Copy the CSS."
    ]
  },
  {
    id: "border-radius-generator",
    name: "Border Radius Generator",
    slug: "border-radius-generator",
    description: "Create advanced border-radius shapes and organic blobs using 8-point values.",
    shortDescription: "Border Radius & Blobs",
    categoryId: "css-ui",
    tier: 1,
    icon: "Square",
    keywords: ["border radius", "css radius", "blob generator", "organic shapes", "css shapes"],
    instructions: [
      "Drag corners to change individual radii.",
      "Enable 'Blob Mode' for organic shapes.",
      "Copy the `border-radius` CSS."
    ]
  },
  {
    id: "glassmorphism-generator",
    name: "Glassmorphism Generator",
    slug: "glassmorphism-generator",
    description: "Generate the popular frosted glass effect using backdrop-filter and transparency.",
    shortDescription: "Glass Effect Maker",
    categoryId: "css-ui",
    tier: 1,
    icon: "Maximize",
    keywords: ["glassmorphism", "glass effect", "frosted glass", "backdrop filter"],
    instructions: [
      "Adjust blur and transparency.",
      "Change background color.",
      "Copy the glass effect CSS."
    ]
  },
  {
    id: "clip-path-generator",
    name: "Clip Path Generator",
    slug: "clip-path-generator",
    description: "Create custom shapes using CSS clip-path polygons. Drag points to edit.",
    shortDescription: "Clip Path Maker",
    categoryId: "css-ui",
    tier: 1,
    icon: "Scissors",
    keywords: ["clip path", "css shapes", "polygon generator", "masking"],
    instructions: [
      "Select a preset shape or create custom.",
      "Drag usage handles to manipulate vertices.",
      "Copy the `clip-path` code."
    ]
  },
  {
    id: "color-converter",
    name: "Color Converter",
    slug: "color-converter",
    description: "Convert colors between HEX, RGB, and HSL formats instantly. View live previews.",
    shortDescription: "HEX / RGB / HSL",
    categoryId: "css-ui",
    tier: 1,
    icon: "Palette",
    keywords: ["color converter", "hex to rgb", "rgb to hex", "hsl converter", "color code"],
    instructions: [
      "Enter a HEX code.",
      "Instantly see the RGB and HSL equivalents.",
      "Copy the format you need for your CSS."
    ]
  },

  // ==========================================
  // CATEGORY 10: CALCULATORS & CONVERTERS (NEW)
  // ==========================================
  {
    id: "pixel-rem-converter",
    name: "Pixel to REM Converter",
    slug: "pixel-rem-converter",
    description: "Convert pixels to REM/EM units and vice versa. Essential for responsive and accessible web development.",
    shortDescription: "PX to REM Converter",
    categoryId: "calculators",
    tier: 1,
    icon: "ArrowRightLeft",
    keywords: ["px to rem", "rem converter", "css units", "pixel converter", "responsive typography"],
    instructions: [
      "Enter the base font size (default is 16px).",
      "Type a value in pixels to see the REM equivalent.",
      "Or type in REM to see the pixel value.",
      "Copy the result to your CSS."
    ]
  },
  {
    id: "aspect-ratio-calculator",
    name: "Aspect Ratio Calculator",
    slug: "aspect-ratio-calculator",
    description: "Calculate dimensions based on aspect ratios (16:9, 4:3, etc.). Perfect for images and video containers.",
    shortDescription: "Calculate Aspect Ratio",
    categoryId: "calculators",
    tier: 1,
    icon: "Maximize",
    keywords: ["aspect ratio", "image dimensions", "video ratio", "screen resolution", "calculate height"],
    instructions: [
      "Enter a known width or height.",
      "Select a common aspect ratio or enter a custom one.",
      "The missing dimension will be calculated automatically.",
      "Use the 'Ratio Finder' to find the aspect ratio of two numbers."
    ]
  },
  {
    id: "social-media-size-guide",
    name: "Social Media Size Guide",
    slug: "social-media-size-guide",
    description: "Always up-to-date guide for image sizes across social platforms (Instagram, LinkedIn, Twitter, etc.).",
    shortDescription: "Social Media Dimensions",
    categoryId: "calculators",
    tier: 1,
    icon: "Smartphone",
    keywords: ["social media sizes", "instagram post size", "linkedin banner size", "twitter header", "facebook cover"],
    instructions: [
      "Select a social media platform.",
      "View the recommended dimensions for posts, stories, and covers.",
      "See safe zones and aspect ratio tips.",
      "Use these values in your design tool or our Image Cropper."
    ]
  },
  {
    id: "epoch-converter",
    name: "Epoch Timestamp Converter",
    slug: "epoch-converter",
    description: "Convert Unix Epoch timestamps to human-readable dates and vice versa. Supports local and UTC time.",
    shortDescription: "Unix Epoch Converter",
    categoryId: "math-network",
    tier: 1,
    icon: "Clock",
    keywords: ["epoch converter", "unix timestamp", "date to epoch", "epoch to date", "time converter"],
    instructions: [
      "Enter a timestamp to see the human-readable date.",
      "Or select a date to get the epoch timestamp.",
      "Copy the result instantly."
    ]
  },
  {
    id: "unit-converter",
    name: "Unit Converter",
    slug: "unit-converter",
    description: "Convert between various units of Length, Weight, and Temperature instantly.",
    shortDescription: "Convert Units",
    categoryId: "math-network",
    tier: 1,
    icon: "Scale",
    keywords: ["unit converter", "metric imperial", "length converter", "weight converter", "temp converter"],
    instructions: [
      "Select a category (Length, Weight, Temp).",
      "Enter the value.",
      "Choose 'From' and 'To' units.",
      "See the result instantly."
    ]
  },
  {
    id: "ip-address-lookup",
    name: "IP Address Lookup",
    slug: "ip-address-lookup",
    description: "Find the geolocation, ISP, and organization details of any public IP address.",
    shortDescription: "IP Geo Lookup",
    categoryId: "math-network",
    tier: 1,
    icon: "Globe",
    keywords: ["ip lookup", "ip geolocation", "find my ip", "whois ip", "ip address details"],
    instructions: [
      "Leave blank to search your own IP.",
      "Enter an IPv4 or IPv6 address to lookup.",
      "View location, map coordinates, and ISP info."
    ]
  },
  {
    id: "subnet-calculator",
    name: "Subnet Calculator",
    slug: "subnet-calculator",
    description: "Calculate network range, netmask, and broadcast address from an IP and CIDR.",
    shortDescription: "CIDR Calculator",
    categoryId: "math-network",
    tier: 1,
    icon: "Network",
    keywords: ["subnet calculator", "cidr calc", "network mask", "ip calculator", "broadcast address"],
    instructions: [
      "Enter an IP Address.",
      "Adjust the slider to set the Subnet Mask (CIDR).",
      "Instantly view the Network, Broadcast, and Host range."
    ]
  },
  // ==========================================
  // CATEGORY 11: STRING & TEXT MANIPULATION (BATCH 9)
  // ==========================================
  {
    id: "word-counter",
    name: "Word & Character Counter",
    slug: "word-counter",
    description: "Count words, characters, sentences, and paragraphs in your text. Estimates reading time.",
    shortDescription: "Count Words & Chars",
    categoryId: "string-text",
    tier: 1,
    icon: "Type",
    keywords: ["word counter", "character count", "text statistics", "reading time"],
    instructions: [
      "Paste or type your text into the input area.",
      "Instantly see the count of words, characters, and sentences.",
      "Check the estimated reading and speaking time."
    ]
  },
  {
    id: "lorem-ipsum-generator",
    name: "Lorem Ipsum Generator",
    slug: "lorem-ipsum-generator",
    description: "Generate placeholder text for specific needs (paragraphs, sentences, words).",
    shortDescription: "Generate Lorem Ipsum",
    categoryId: "string-text",
    tier: 1,
    icon: "FileText",
    keywords: ["lorem ipsum", "dummy text", "generator", "placeholder"],
    instructions: [
      "Select type (Paragraphs, Sentences, Words).",
      "Set the count (length).",
      "Click Generate.",
      "Copy the text."
    ]
  },
  {
    id: "text-diff-checker",
    name: "Text Diff Checker",
    slug: "text-diff-checker",
    description: "Compare two blocks of text and highlight the differences (additions and removals).",
    shortDescription: "Compare Text Differences",
    categoryId: "string-text",
    tier: 1,
    icon: "Diff",
    keywords: ["diff checker", "compare text", "text difference", "find changes"],
    instructions: [
      "Paste the original text on the left.",
      "Paste the modified text on the right.",
      "Click Compare.",
      "View valid changes highlighted in Green and Red."
    ]
  },
  {
    id: "case-converter",
    name: "Case Converter",
    slug: "case-converter",
    description: "Convert text between Uppercase, lowercase, Title Case, camelCase, snake_case, and more.",
    shortDescription: "Change Text Case",
    categoryId: "string-text",
    tier: 1,
    icon: "WholeWord",
    keywords: ["case converter", "uppercase", "lowercase", "title case", "camelcase"],
    instructions: [
      "Enter your text.",
      "Click the button for the desired case (e.g., UPPERCASE).",
      "Copy the converted text."
    ]
  },
  {
    id: "remove-duplicate-lines",
    name: "Remove Duplicate Lines",
    slug: "remove-duplicate-lines",
    description: "Clean up your lists by automatically removing duplicate entries.",
    shortDescription: "Deduplicate Lists",
    categoryId: "string-text",
    tier: 1,
    icon: "ListX",
    keywords: ["remove duplicates", "deduplicate", "unique lines", "clean list"],
    instructions: [
      "Paste your list of items.",
      "Click 'Remove Duplicates'.",
      "Copy the clean list."
    ]
  },
  {
    id: "string-reverser",
    name: "String Reverser",
    slug: "string-reverser",
    description: "Reverse text character by character or word by word.",
    shortDescription: "Reverse Text",
    categoryId: "string-text",
    tier: 1,
    icon: "Rewind",
    keywords: ["reverse string", "reverse text", "flip text", "backward text"],
    instructions: [
      "Type your text.",
      "Choose to reverse by Character or Word.",
      "Copy the reversed result."
    ]
  },
  {
    id: "slug-generator",
    name: "Slug Generator",
    slug: "slug-generator",
    description: "Convert titles into SEO-friendly URL slugs (e.g., 'Hello World' -> 'hello-world').",
    shortDescription: "Create URL Slugs",
    categoryId: "string-text",
    tier: 1,
    icon: "Link",
    keywords: ["slug generator", "url slug", "seo friendly url", "clean url"],
    instructions: [
      "Enter a title or phrase.",
      "The tool automatically generates a hyphenated URL slug.",
      "Copy the valid path."
    ]
  },
  {
    id: "ascii-art-generator",
    name: "ASCII Art Generator",
    slug: "ascii-art-generator",
    description: "Convert text into large ASCII art banners using figlet fonts.",
    shortDescription: "Text to ASCII Art",
    categoryId: "string-text",
    tier: 1,
    icon: "Image",
    keywords: ["ascii art", "text banner", "figlet", "ascii generator"],
    instructions: [
      "Type your text.",
      "Select a font style.",
      "Copy the ASCII art block."
    ]
  },
  {
    id: "markdown-to-html",
    name: "Markdown to HTML",
    slug: "markdown-to-html",
    description: "Convert Markdown syntax (# Heading) into raw HTML code (<h1>Heading</h1>).",
    shortDescription: "Markdown -> HTML",
    categoryId: "string-text",
    tier: 1,
    icon: "FileCode",
    keywords: ["markdown to html", "md converter", "html generator", "parse markdown"],
    instructions: [
      "Write Markdown in the input area.",
      "See the HTML preview and code instantly.",
      "Copy the HTML code."
    ]
  },
  {
    id: "text-replacement-tool",
    name: "Text Replacement Tool",
    slug: "text-replacement-tool",
    description: "Find and replace text occurrences, supporting simple strings or Regular Expressions.",
    shortDescription: "Find & Replace",
    categoryId: "string-text",
    tier: 1,
    icon: "Replace",
    keywords: ["find replace", "regex replace", "substitute text", "search replace"],
    instructions: [
      "Enter your main text.",
      "Specify what to Find and what to Replace With.",
      "Use Regex checkbox for advanced patterns.",
      "Click Replace."
    ]
  },
  {
    id: "unicode-detector",
    name: "Unicode Character Detector",
    slug: "unicode-detector",
    description: "Analyze text to identify special Unicode characters, emojis, and hidden symbols.",
    shortDescription: "Detect Unicode Infos",
    categoryId: "string-text",
    tier: 1,
    icon: "Info",
    keywords: ["unicode detector", "character code", "ascii value", "emoji info"],
    instructions: [
      "Paste text containing special characters.",
      "Hover or click on characters to see their Unicode code point (U+XXXX).",
      "Identify invisible characters."
    ]
  },
  {
    id: "html-minifier",
    name: "HTML Minifier",
    slug: "html-minifier",
    description: "Minify your HTML code by removing unnecessary whitespace, comments, and attributes.",
    shortDescription: "Minify HTML",
    categoryId: "developer-formatters",
    tier: 1,
    icon: "FileCode",
    keywords: ["html minifier", "compress html", "minify code", "web optimization"],
    instructions: [
      "Paste your HTML code.",
      "Click Minify.",
      "Copy the optimized code."
    ]
  },
  {
    id: "css-minifier",
    name: "CSS Minifier",
    slug: "css-minifier",
    description: "Compress CSS code to reduce file size and improve page load speed.",
    shortDescription: "Minify CSS",
    categoryId: "developer-formatters",
    tier: 1,
    icon: "FileCode",
    keywords: ["css minifier", "compress css", "minify styles"],
    instructions: [
      "Paste your CSS code.",
      "Click Minify.",
      "Copy the compressed CSS."
    ]
  },
  {
    id: "js-minifier",
    name: "JavaScript Minifier",
    slug: "js-minifier",
    description: "Minify JavaScript code/files to optimize performance and reduce bandwidth.",
    shortDescription: "Minify JS",
    categoryId: "developer-formatters",
    tier: 1,
    icon: "FileCode",
    keywords: ["js minifier", "javascript compressor", "minify js"],
    instructions: [
      "Paste your JS code.",
      "Click Minify.",
      "Copy the minified script."
    ]
  },
  {
    id: "regex-tester",
    name: "Regex Tester",
    slug: "regex-tester",
    description: "Test and debug Regular Expressions with real-time matching and highlighting.",
    shortDescription: "Test Regex",
    categoryId: "developer-formatters",
    tier: 1,
    icon: "Search",
    keywords: ["regex tester", "regular expression", "debug regex", "regex match"],
    instructions: [
      "Enter your Regular Expression.",
      "Enter the test string.",
      "View matches instantly."
    ]
  },
  {
    id: "jwt-debugger",
    name: "JWT Debugger",
    slug: "jwt-debugger",
    description: "Decode and inspect JSON Web Tokens (JWT) to view headers and payloads.",
    shortDescription: "Decode JWT",
    categoryId: "developer-formatters",
    tier: 1,
    icon: "Lock",
    keywords: ["jwt debugger", "decode jwt", "token inspector", "jwt decoder"],
    instructions: [
      "Paste your JWT string.",
      "See the decoded Header and Payload.",
      "Verify token structure."
    ]
  },
  {
    id: "csv-to-json",
    name: "CSV to JSON",
    slug: "csv-to-json",
    description: "Convert CSV data to JSON format. Supports custom delimiters.",
    shortDescription: "CSV -> JSON",
    categoryId: "developer-formatters",
    tier: 1,
    icon: "FileText",
    keywords: ["csv to json", "csv converter", "convert data"],
    instructions: [
      "Paste CSV data.",
      "Click Convert.",
      "Copy the JSON output."
    ]
  },
  {
    id: "json-to-csv",
    name: "JSON to CSV",
    slug: "json-to-csv",
    description: "Convert JSON array data into CSV format for spreadsheets.",
    shortDescription: "JSON -> CSV",
    categoryId: "developer-formatters",
    tier: 1,
    icon: "FileText",
    keywords: ["json to csv", "json converter", "export csv"],
    instructions: [
      "Paste JSON data.",
      "Click Convert.",
      "Copy the CSV output."
    ]
  },
  {
    id: "curl-to-code",
    name: "cURL to Code",
    slug: "curl-to-code",
    description: "Convert cURL commands into code snippets for Python, JS, PHP, and more.",
    shortDescription: "cURL -> Code",
    categoryId: "developer-formatters",
    tier: 1,
    icon: "Terminal",
    keywords: ["curl convert", "curl to python", "curl to node", "api request"],
    instructions: [
      "Paste a cURL command.",
      "Select target language.",
      "Copy the generated code."
    ]
  },
  {
    id: "scientific-calculator",
    name: "Scientific Calculator",
    slug: "scientific-calculator",
    description: "Advanced scientific calculator with trigonometric, logarithmic, and exponential functions.",
    shortDescription: "Advanced Calculator",
    categoryId: "math-network",
    tier: 1,
    icon: "Calculator",
    keywords: ["scientific calculator", "math calculator", "trigonometry", "logarithm", "online calculator"],
    instructions: [
      "Enter your mathematical expression or use the keypad.",
      "Use advanced functions like sin, cos, tan, log.",
      "View history of past calculations.",
      "Press '=' to solve."
    ]
  },
  {
    id: "discount-calculator",
    name: "Discount Calculator",
    slug: "discount-calculator",
    description: "Calculate final price after discount and tax. See exact savings instantly.",
    shortDescription: "Calculate Discount & Tax",
    categoryId: "math-network",
    tier: 1,
    icon: "Percent",
    keywords: ["discount calculator", "sale calculator", "percentage off", "tax calculator", "price calculator"],
    instructions: [
      "Enter the original price.",
      "Set the discount percentage.",
      "Optionally add a sales tax rate.",
      "See the final price and total savings."
    ]
  },
  {
    id: "ip-converter",
    name: "IP to Binary Converter",
    slug: "ip-converter",
    description: "Convert IPv4 addresses to their binary representation and vice versa.",
    shortDescription: "IP <-> Binary",
    categoryId: "math-network",
    tier: 1,
    icon: "Binary",
    keywords: ["ip to binary", "binary to ip", "ipv4 converter", "network mask", "binary notation"],
    instructions: [
      "Type an IP address to see binary.",
      "Or type binary to see the IP.",
      "Copy the result."
    ]
  },

  // ==========================================
  // CATEGORY: DOMAIN TOOLS
  // ==========================================
  {
    id: "domain-recon-scanner",
    name: "Visual Domain Intelligence Scanner",
    slug: "domain-recon-scanner",
    description: "The ultimate Domain Intelligence Dashboard. Visualize network topology, uncover hidden subdomains, analyze security posture, detecting WAFs, and explore historical changes with the Wayback Machine—all in one interactive map.",
    shortDescription: "Visual domain recon with network graph",
    categoryId: "domain-tools",
    tier: 1,
    icon: "Network",
    keywords: ["domain map", "network topology", "subdomain scanner", "dns visualization", "cybersecurity tool", "OSINT", "reconnaissance", "whois lookup", "wayback machine", "sitemap visualizer"],
    featured: true,
    instructions: [
      "Enter a target domain (e.g., example.com).",
      "Click 'Analyze' to start the reconnaissance scan.",
      "Watch the network graph build in real-time.",
      "Click nodes to view detailed information.",
      "Drag nodes to reorganize the visualization.",
      "Use tabs to explore subdomains, vulnerabilities, and more.",
      "Export results as JSON, CSV, or PDF report."
    ]
  },
];

// Helper Functions
export function getToolsByCategory(categoryId: string): Tool[] {
  return tools.filter(tool => tool.categoryId === categoryId);
}

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find(tool => tool.slug === slug);
}

export function getCategoryBySlug(slug: string): ToolCategory | undefined {
  return toolCategories.find(cat => cat.slug === slug);
}

export function getFeaturedTools(): Tool[] {
  return tools.filter(tool => tool.featured);
}

export function getToolsByTier(tier: 1 | 2): Tool[] {
  return tools.filter(tool => tool.tier === tier);
}

export function getRelatedTools(tool: Tool, limit: number = 3): Tool[] {
  return tools
    .filter(t => t.categoryId === tool.categoryId && t.id !== tool.id)
    .slice(0, limit);
}
