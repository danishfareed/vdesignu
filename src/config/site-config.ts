/**
 * vdesignu Central Configuration
 * Single source of truth for site settings, programmatic SEO definitions, and service mappings.
 */

export const siteConfig = {
  name: "VDESIGNU",
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
  { id: "seo", name: "Search Engine Optimisation (SEO)", slug: "seo" },
  { id: "ai-seo", name: "AI SEO / GEO (Search for AI)", slug: "ai-seo" },
  { id: "crm-systems", name: "Omnichannel CRM Systems", slug: "crm-systems" },
  { id: "website-development", name: "Website Development", slug: "website-development" },
  { id: "digital-platforms", name: "Custom Digital Platforms & Portals", slug: "digital-platforms" },
  { id: "performance-media", name: "Performance Media & PPC", slug: "performance-media" },
  { id: "branding-strategy", name: "Corporate Strategy & Branding", slug: "branding-strategy" },
];

export const industries = [
  { id: "oil-gas", name: "Oil & Gas", slug: "oil-gas", keywords: ["drilling", "field services", "petroleum"] },

  { id: "manufacturing", name: "Manufacturing", slug: "manufacturing", keywords: ["production", "factory"] },
  { id: "construction", name: "Construction & MEP", slug: "construction", keywords: ["building materials", "machinery"] },
  { id: "logistics", name: "Logistics & Supply Chain", slug: "logistics", keywords: ["freight", "warehousing"] },
  { id: "real-estate", name: "Real Estate Development", slug: "real-estate", keywords: ["property", "development"] },
  { id: "healthcare", name: "Healthcare & Life Sciences", slug: "healthcare", keywords: ["medical", "clinics"] },
  { id: "hospitals", name: "Hospitals", slug: "hospitals", keywords: ["medical center", "surgical"] },
  { id: "clinics", name: "Specialized Clinics", slug: "clinics", keywords: ["dental", "derma", "health"] },
  { id: "restaurants", name: "Restaurants", slug: "restaurants", keywords: ["f&b", "dining", "food service"] },
  { id: "fine-dining", name: "Fine Dining", slug: "fine-dining", keywords: ["luxury dining", "michelin", "premium"] },
  { id: "retail", name: "Retail & E-commerce", slug: "retail", keywords: ["shopping", "boutique", "fashion"] },
  { id: "hospitality", name: "Hospitality & Hotels", slug: "hospitality", keywords: ["luxury hotels", "resorts"] },
  { id: "education", name: "Education & Schools", slug: "education", keywords: ["nurseries", "private schools", "universities"] },
  { id: "legal", name: "Legal & Law Firms", slug: "legal", keywords: ["lawyers", "corporate law"] },
  { id: "finance", name: "Finance & Fintech", slug: "finance", keywords: ["banking", "investment"] },
  { id: "fitness", name: "Fitness & Gyms", slug: "fitness", keywords: ["wellnesscenter", "crossfit"] },
  { id: "beauty", name: "Beauty & Wellness", slug: "beauty", keywords: ["salons", "spas"] },
  { id: "automotive", name: "Automotive", slug: "automotive", keywords: ["dealerships", "car service"] },
];

export const cities = [
  // UAE
  { id: "dubai", name: "Dubai", country: "UAE", slug: "dubai" },
  { id: "abu-dhabi", name: "Abu Dhabi", country: "UAE", slug: "abu-dhabi" },
  { id: "sharjah", name: "Sharjah", country: "UAE", slug: "sharjah" },
  { id: "ajman", name: "Ajman", country: "UAE", slug: "ajman" },
  { id: "rak", name: "Ras Al Khaimah", country: "UAE", slug: "rak" },
  { id: "fujairah", name: "Fujairah", country: "UAE", slug: "fujairah" },
  { id: "uaq", name: "Umm Al Quwain", country: "UAE", slug: "uaq" },
  // KSA
  { id: "riyadh", name: "Riyadh", country: "KSA", slug: "riyadh" },
  { id: "jeddah", name: "Jeddah", country: "KSA", slug: "jeddah" },
  { id: "dammam", name: "Dammam", country: "KSA", slug: "dammam" },
  { id: "khobar", name: "Al Khobar", country: "KSA", slug: "khobar" },
  { id: "medina", name: "Medina", country: "KSA", slug: "medina" },
  { id: "mecca", name: "Mecca", country: "KSA", slug: "mecca" },
  // OTHER GCC
  { id: "doha", name: "Doha", country: "Qatar", slug: "doha" },
  { id: "kuwait-city", name: "Kuwait City", country: "Kuwait", slug: "kuwait-city" },
  { id: "muscat", name: "Muscat", country: "Oman", slug: "muscat" },
  { id: "manama", name: "Manama", country: "Bahrain", slug: "manama" },
  // GLOBAL
  { id: "chicago", name: "Chicago", country: "USA", slug: "chicago" },
  { id: "melbourne", name: "Melbourne", country: "Australia", slug: "melbourne" },
];

/**
 * Navigation Structure
 */
export const navigation = {
  header: [],
  footer: {
    about: {
      text: "Trusted B2B & B2C digital growth partner. We build websites and AI systems that find customers and close deals for leaders in the Gulf and beyond.",
    },
    services: services.map(s => ({ label: s.name, href: `/services/${s.slug}` })),
    locations: [
      { country: "UAE", cities: ["Dubai", "Abu Dhabi", "Sharjah", "RAK"] },
      { country: "KSA", cities: ["Riyadh", "Jeddah", "Dammam", "Khobar"] },
      { country: "Other GCC", cities: ["Doha", "Manama", "Kuwait City", "Muscat"] },
      { country: "Worldwide", cities: ["Chicago", "Melbourne"] }
    ],
  }
};
