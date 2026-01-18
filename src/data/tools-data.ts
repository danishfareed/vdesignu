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
    toolCount: 3
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
  // CATEGORY 10: LOCAL SEO TOOLS (101-103)
  // ==========================================
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
  }
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
