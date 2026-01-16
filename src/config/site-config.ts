/**
 * vdesignu Central Configuration
 * Single source of truth for site settings, programmatic SEO definitions, and service mappings.
 */

export const siteConfig = {
  name: "vdesignu",
  baseUrl: "https://vdesignu.com",
  analytics: {
    ga4Id: "G-XXXXXXXXXX", // Placeholder for actual GA4 ID
  },
  sitemap: {
    changefreq: "weekly",
    priority: 0.7,
  },
  locales: ["en", "ar"], // Support for bilingual optimization
  defaultLocale: "en",
};

export const services = [
  { id: "web-development", name: "Web Development & Engineering", slug: "web-development" },
  { id: "digital-platforms", name: "Custom Digital Platforms & Portals", slug: "digital-platforms" },
  { id: "web-app-dev", name: "Web Application Development", slug: "web-app-dev" },
  { id: "ecommerce-dev", name: "Ecommerce Development", slug: "ecommerce-dev" },
  { id: "ecommerce-management", name: "Ecommerce Support & Management", slug: "ecommerce-management" },
  { id: "website-management", name: "Web Management & Performance", slug: "website-management" },
  { id: "seo", name: "Search Engine Optimisation (SEO)", slug: "seo" },
  { id: "ai-solutions", name: "AI Solutions & Integrations", slug: "ai-solutions" },
  { id: "email-marketing", name: "Email HTML & CRM Marketing", slug: "email-marketing" },
  { id: "ppc", name: "PPC & Performance Media", slug: "ppc" },
  { id: "design-services", name: "Creative Design & Branding", slug: "design-services" },
];

export const industries = [
  { id: "oil-gas", name: "Oil & Gas", slug: "oil-gas", keywords: ["drilling", "field services", "petroleum"] },
  { id: "marine", name: "Marine & Maritime", slug: "marine", keywords: ["ports", "ship supplies", "vessels"] },
  { id: "electrical", name: "Electrical & Power", slug: "electrical", keywords: ["industrial electrical", "generators"] },
  { id: "safety", name: "Safety Equipment & PPE", slug: "safety", keywords: ["fire protection", "industrial safety"] },
  { id: "hvac-mep", name: "HVAC & MEP", slug: "hvac-mep", keywords: ["mechanical", "electrical", "plumbing"] },
  { id: "automotive", name: "Automotive & Heavy Equipment", slug: "automotive", keywords: ["fleet", "spare parts"] },
  { id: "construction", name: "Construction Equipment", slug: "construction", keywords: ["building materials", "machinery"] },
  { id: "manufacturing", name: "Manufacturing & Industrial Supplies", slug: "manufacturing", keywords: ["production", "factory"] },
  { id: "logistics", name: "Logistics & Supply Chain", slug: "logistics", keywords: ["freight", "warehousing"] },
  { id: "real-estate", name: "Real Estate & Property Development", slug: "real-estate", keywords: ["property", "development"] },
  { id: "healthcare", name: "Healthcare & Specialized Clinics", slug: "healthcare", keywords: ["medical", "clinics"] },
  { id: "hospitality", name: "Hospitality & Tourism", slug: "hospitality", keywords: ["hotels", "travel"] },
  { id: "finance", name: "Financial Services & Consulting", slug: "finance", keywords: ["banking", "investment"] },
];

export const cities = [
  { id: "dubai", name: "Dubai", country: "UAE", slug: "dubai" },
  { id: "abu-dhabi", name: "Abu Dhabi", country: "UAE", slug: "abu-dhabi" },
  { id: "sharjah", name: "Sharjah", country: "UAE", slug: "sharjah" },
  { id: "riyadh", name: "Riyadh", country: "KSA", slug: "riyadh" },
  { id: "jeddah", name: "Jeddah", country: "KSA", slug: "jeddah" },
  { id: "dammam", name: "Dammam", country: "KSA", slug: "dammam" },
  { id: "doha", name: "Doha", country: "Qatar", slug: "doha" },
  { id: "kuwait-city", name: "Kuwait City", country: "Kuwait", slug: "kuwait-city" },
  { id: "muscat", name: "Muscat", country: "Oman", slug: "muscat" },
  { id: "manama", name: "Manama", country: "Bahrain", slug: "manama" },
  { id: "hyderabad", name: "Hyderabad", country: "India", slug: "hyderabad" },
  { id: "bangalore", name: "Bangalore", country: "India", slug: "bangalore" },
  { id: "chennai", name: "Chennai", country: "India", slug: "chennai" },
  { id: "mumbai", name: "Mumbai", country: "India", slug: "mumbai" },
  { id: "delhi", name: "Delhi", country: "India", slug: "delhi" },
  { id: "chicago", name: "Chicago", country: "USA", slug: "chicago" },
  { id: "melbourne", name: "Melbourne", country: "Australia", slug: "melbourne" },
];

/**
 * Navigation Structure
 */
export const navigation = {
  header: [
    { label: "Our Work", href: "/work" },
    { 
      label: "Expertise", 
      dropdown: services.slice(0, 6).map(s => ({ label: s.name, href: `/services/${s.slug}` }))
    },
    { label: "About", href: "/about" },
    { label: "Insights", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  footer: {
    about: {
      text: "vdesignu is a premium digital growth agency engineering high-performance ecosystems for B2B industrial leaders and visionary brands.",
    },
    services: services.map(s => ({ label: s.name, href: `/services/${s.slug}` })),
    locations: [
      { country: "UAE", cities: ["Dubai", "Abu Dhabi"] },
      { country: "KSA", cities: ["Riyadh", "Jeddah"] },
      { country: "USA", cities: ["Chicago"] },
      { country: "Australia", cities: ["Melbourne"] },
      { country: "Other", cities: ["Doha", "Muscat", "Manama", "Kuwait City", "Hyderabad"] }
    ],
  }
};
