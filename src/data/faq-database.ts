import type { FAQItem } from '../types/faq';

export const faqDatabase: FAQItem[] = [
    // ==========================================
    // GLOBAL TRUST (Scope: Global)
    // ==========================================
    {
        id: 'global-trust-1',
        question: 'How does vdesignu ensure data security for enterprise clients?',
        answer: 'We utilize enterprise-grade encryption and secure cloud infrastructure (AWS/Azure) compliant with GDPR and local regulations like PDPL in Saudi Arabia. All data is stored in sovereign local data centers where required.',
        intent: 'informational',
        scope: 'global',
        tags: ['security', 'trust']
    },
    {
        id: 'global-trust-2',
        question: 'What makes your agency different from other digital firms in the Gulf?',
        answer: 'We are an engineering-first agency. While others focus on vanity metrics, we focus on sub-second performance, programmatic SEO, and AI-driven growth systems that are mathematically designed to increase revenue.',
        intent: 'commercial',
        scope: 'global',
        tags: ['differentiation']
    },
    {
        id: 'global-trust-3',
        question: 'Do you offer bilingual support (Arabic & English)?',
        answer: 'Yes, all our digital systems, content strategies, and support teams are fully bilingual. We build "Arabic-First" or "English-First" architectures depending on your primary target audience.',
        intent: 'commercial',
        scope: 'global',
        tags: ['language']
    },
    {
        id: 'global-trust-4',
        question: 'What is your typical project timeline?',
        answer: 'For enterprise platforms, we typically deliver within 8-12 weeks. For marketing and SEO sprints, initial setup takes 2 weeks with measurable results often visible by month 3.',
        intent: 'transactional',
        scope: 'global',
        tags: ['timeline']
    },

    // ==========================================
    // CITY SPECIFIC: DUBAI (Scope: City)
    // ==========================================
    {
        id: 'city-dubai-1',
        question: 'Do you have experience working with Dubai government entities?',
        answer: 'Yes, our digital systems are built to align with Smart Dubai initiatives and comply with local digital data laws. We understand the specific requirements for government and semi-government tendering in Dubai.',
        intent: 'transactional',
        scope: 'city',
        city: 'dubai'
    },
    {
        id: 'city-dubai-2',
        question: 'Can you help us target tourists visiting Dubai?',
        answer: 'Absolutely. We use geo-fencing and "Travel Intent" SEO to capture international search traffic from key feeder markets (UK, Russia, China) before they even land in DXB.',
        intent: 'commercial',
        scope: 'city',
        city: 'dubai'
    },
    {
        id: 'city-dubai-3',
        question: 'Are your websites compliant with Dubai accessibility standards?',
        answer: 'Yes, we adhere to POD (People of Determination) accessibility guidelines to ensure your digital presence is inclusive and compliant with Dubai government standards.',
        intent: 'informational',
        scope: 'city',
        city: 'dubai'
    },

    // ==========================================
    // CITY SPECIFIC: RIYADH (Scope: City)
    // ==========================================
    {
        id: 'city-riyadh-1',
        question: 'Is your agency compliant with Saudi Vision 2030 digital standards?',
        answer: 'Yes, our strategies are directly aligned with Vision 2030 goals, focusing on digital transformation, data sovereignty, and local content contribution.',
        intent: 'transactional',
        scope: 'city',
        city: 'riyadh'
    },
    {
        id: 'city-riyadh-2',
        question: 'Do you host data inside Saudi Arabia?',
        answer: 'Yes, for all KSA clients, we utilize local cloud regions (Oracle Jeddah/Riyadh, Google Cloud Dammam) to ensure full compliance with NDMO and CST regulations.',
        intent: 'informational',
        scope: 'city',
        city: 'riyadh'
    },

    // ==========================================
    // INDUSTRY: REAL ESTATE (Scope: Industry)
    // ==========================================
    {
        id: 'ind-real-estate-1',
        question: 'How do you generate high-quality leads for off-plan properties?',
        answer: 'We move beyond generic "buy apartment" keywords. We target specific investor intents like "ROI on Dubai Hills vs Downtown" and use AI-driven landing pages to capture lead data instantly.',
        intent: 'commercial',
        scope: 'industry',
        industry: 'real-estate'
    },
    {
        id: 'ind-real-estate-2',
        question: 'Do you integrate with property portals and CRMs?',
        answer: 'Yes, we build custom APIs to sync your inventory with Property Finder, Bayut, and your internal CRM (Salesforce/Dynamics) in real-time, preventing double-booking issues.',
        intent: 'transactional',
        scope: 'industry',
        industry: 'real-estate'
    },
    {
        id: 'ind-real-estate-3',
        question: 'Can you create virtual tour experiences?',
        answer: 'We build high-performance 3D tour integrations that allow international investors to walk through your properties virtually without slowing down your website speed.',
        intent: 'commercial',
        scope: 'industry',
        industry: 'real-estate'
    },

    // ==========================================
    // INDUSTRY: HEALTHCARE (Scope: Industry)
    // ==========================================
    {
        id: 'ind-healthcare-1',
        question: 'Is your medical content marketing compliant with MOH/DHA regulations?',
        answer: 'Strictly. We have a dedicated medical review process to ensure all content meets the advertising guidelines set by the Ministry of Health and Dubai Health Authority.',
        intent: 'informational',
        scope: 'industry',
        industry: 'healthcare'
    },
    {
        id: 'ind-healthcare-2',
        question: 'How do you handle patient data privacy?',
        answer: 'We implement HIPAA and GDPR-compliant data handlers. For Saudi clients, we ensure strict adherence to SDAIA health data standards, encrypting all patient information at rest and in transit.',
        intent: 'informational',
        scope: 'industry',
        industry: 'healthcare'
    },

    // ==========================================
    // SERVICE x INDUSTRY: SEO x OIL & GAS
    // ==========================================
    {
        id: 'srv-ind-seo-oil-gas-1',
        question: 'How does SEO help an Oil & Gas service company?',
        answer: 'Procurement officers don\'t just look at directories anymore; they search for technical specs. We optimize your technical datasheets and capability statements to rank for specific engineering queries.',
        intent: 'commercial',
        scope: 'service-industry',
        service: 'seo',
        industry: 'oil-gas'
    },
    {
        id: 'srv-ind-seo-oil-gas-2',
        question: 'Can you help us rank for "EPC Contractor" keywords?',
        answer: 'Yes, we build authority pillars around your specific EPC capabilities, targeting long-tail keywords like "Turnkey Pipeline Construction in GCC" to attract qualified tender invitations.',
        intent: 'commercial',
        scope: 'service-industry',
        service: 'seo',
        industry: 'oil-gas'
    },

    // ==========================================
    // SERVICE x INDUSTRY: CRM x REAL ESTATE
    // ==========================================
    {
        id: 'srv-ind-crm-real-estate-1',
        question: 'Can your CRM automate follow-ups for property leads?',
        answer: 'Yes, our real estate CRM workflows send instant WhatsApp welcomes and schedule automated viewing reminders, increasing agent efficiency by up to 40%.',
        intent: 'transactional',
        scope: 'service-industry',
        service: 'crm-systems',
        industry: 'real-estate'
    },

    // ==========================================
    // MATRIX: DUBAI x REAL ESTATE x SEO
    // ==========================================
    {
        id: 'matrix-dubai-re-seo-1',
        question: 'How can we rank for "Luxury Villas in Palm Jumeirah"?',
        answer: 'Ranking for ultra-luxury communities requires "Authority Stacking". We create a dedicated neighborhood guide for Palm Jumeirah, backed by high-quality backlinks and 3D tour content, to signal to Google that you are the definitive area specialist.',
        intent: 'transactional',
        scope: 'service-industry-city',
        city: 'dubai',
        industry: 'real-estate',
        service: 'seo'
    },
    {
        id: 'matrix-dubai-re-seo-2',
        question: 'Does RERA compliance affect our real estate SEO?',
        answer: 'Indirectly, yes. Displaying your RERA license number and transparent pricing builds trust signals (E-E-A-T) that Google rewards. We ensure your site structure highlights your regulatory compliance to boost rankings.',
        intent: 'informational',
        scope: 'service-industry-city',
        city: 'dubai',
        industry: 'real-estate',
        service: 'seo'
    },
    {
        id: 'matrix-dubai-re-seo-3',
        question: 'How do we compete with Bayut and Property Finder on Google?',
        answer: 'You don\'t compete on "Listings"; you compete on "Expertise". We build "Hyper-Local" content (e.g., "Investment potential of Dubai Hills in 2026") that portals cannot generate, capturing the research-phase investor.',
        intent: 'commercial',
        scope: 'service-industry-city',
        city: 'dubai',
        industry: 'real-estate',
        service: 'seo'
    },

    // ==========================================
    // MATRIX: RIYADH x FINANCE x WEB DEV
    // ==========================================
    {
        id: 'matrix-riyadh-fin-web-1',
        question: 'Can you build a SAMA-compliant fintech app?',
        answer: 'Yes, we have experience building financial platforms that meet the Saudi Central Bank (SAMA) cybersecurity and data hosting guidelines, ensuring your app is ready for the Sandbox or full launch.',
        intent: 'transactional',
        scope: 'service-industry-city',
        city: 'riyadh',
        industry: 'finance',
        service: 'website-development'
    },
    {
        id: 'matrix-riyadh-fin-web-2',
        question: 'How do you handle Arabic UI for financial dashboards?',
        answer: 'We design "RTL-First" (Right-to-Left). Financial data tables, charts, and user flows are natively designed for Arabic users in Riyadh, ensuring a seamless experience for your Saudi customer base.',
        intent: 'informational',
        scope: 'service-industry-city',
        city: 'riyadh',
        industry: 'finance',
        service: 'website-development'
    },

    // ==========================================
    // MATRIX: JEDDAH x LOGISTICS x WEB
    // ==========================================
    {
        id: 'matrix-jeddah-logistics-web-1',
        question: 'Can you integrate our site with Jeddah Islamic Port systems?',
        answer: 'We build custom APIs that can connect your logistics portal with Fasah (Saudi Customs) and port tracking systems, giving your clients real-time visibility on their shipments arriving in Jeddah.',
        intent: 'transactional',
        scope: 'service-industry-city',
        city: 'jeddah',
        industry: 'logistics',
        service: 'website-development'
    },

    // ==========================================
    // MATRIX: DAMMAM x OIL & GAS x SEO
    // ==========================================
    {
        id: 'matrix-dammam-oil-seo-1',
        question: 'How can we rank for "Aramco Approved Vendor" searches?',
        answer: 'We create technical capability pages that highlight your ISO certifications, IKTVA scores, and approved vendor status. This signals trust to procurement officers in Dammam searching for pre-qualified suppliers.',
        intent: 'commercial',
        scope: 'service-industry-city',
        city: 'dammam',
        industry: 'oil-gas',
        service: 'seo'
    },

    // ==========================================
    // MATRIX: CHICAGO x REAL ESTATE x SEO
    // ==========================================
    {
        id: 'matrix-chicago-re-seo-1',
        question: 'How do you handle local SEO for Chicago real estate agents?',
        answer: 'We focus on neighborhood-level hyper-localization. By targeting keywords like "Wicker Park Condos" or "Luxury Lofts in West Loop" and optimizing your GMB for specific zip codes, we ensure you dominate the local map pack.',
        intent: 'transactional',
        scope: 'service-industry-city',
        city: 'chicago',
        industry: 'real-estate',
        service: 'seo'
    },

    // ==========================================
    // MATRIX: MELBOURNE x EDUCATION x WEB
    // ==========================================
    {
        id: 'matrix-melbourne-edu-web-1',
        question: 'Can you build a student portal for a Melbourne-based RTO?',
        answer: 'Yes, we specialize in building ASQA-compliant learning management systems and student portals that integrate with local payment gateways and identity verification services used across Victoria.',
        intent: 'transactional',
        scope: 'service-industry-city',
        city: 'melbourne',
        industry: 'education',
        service: 'website-development'
    },

    // ==========================================
    // MATRIX: ABU DHABI x GOV x SEO
    // ==========================================
    {
        id: 'matrix-ab-gov-seo-1',
        question: 'How do you handle SEO for companies targeting Abu Dhabi government tenders?',
        answer: 'Tendering is about "Authorized Visuals". We optimize your capability statements and CSR pages to rank specifically for procurement officer research queries, ensuring your "ICV (In-Country Value)" signals are prominent.',
        intent: 'commercial',
        scope: 'service-industry-city',
        city: 'abu-dhabi',
        industry: 'legal', // Using legal/corporate as proxy
        service: 'seo'
    },

    // ==========================================
    // MATRIX: MUSCAT x LOGISTICS x WEB
    // ==========================================
    {
        id: 'matrix-muscat-logistics-web-1',
        question: 'Can you build a tracking system for an Omani logistics firm?',
        answer: 'Yes, we develop custom web portals that integrate with Muscat Port and Sohar Freezone logistics data, allowing your Omani clients to track international freight transitions seamlessly.',
        intent: 'transactional',
        scope: 'service-industry-city',
        city: 'muscat',
        industry: 'logistics',
        service: 'website-development'
    },

    // ==========================================
    // ULTRA-DEEP EXPANSION: REAL ESTATE
    // ==========================================
    {
        id: 'ud-re-1',
        question: 'How does digital transformation impact off-plan sales in {city}?',
        answer: 'Digital transformation allows developers in {city} to reach international investors through virtual tours, real-time inventory updates, and blockchain-secured booking platforms, significantly accelerating the sales velocity of off-plan projects.',
        intent: 'informational',
        scope: 'industry',
        industry: 'real-estate'
    },
    {
        id: 'ud-re-2',
        question: 'What are the SEO challenges for real estate agencies in hyper-competitive districts like {city}?',
        answer: 'The primary challenge is the "Neighborhood War". Ranking for broad terms like "{service} in {city}" is difficult; the win happens by dominating long-tail search for specific communities, building-level keywords, and high-intent buyer personas.',
        intent: 'commercial',
        scope: 'industry',
        industry: 'real-estate'
    },
    {
        id: 'ud-re-3',
        question: 'Can you integrate property management systems with our website in {city}?',
        answer: 'Yes, we specialize in API integrations with platforms like PowerBI, Masterkey, and Property Finder, ensuring your website in {city} displays live, accurate inventory and automates lead capture directly into your CRM.',
        intent: 'transactional',
        scope: 'industry',
        industry: 'real-estate'
    },
    {
        id: 'ud-re-4',
        question: 'How do you handle multilingual SEO for the international {city} property market?',
        answer: 'We implement HREFLANG tags and localized content strategies for Arabic, Chinese, and Russian-speaking investors, ensuring your {city} properties are visible to the highest-net-worth audiences globally.',
        intent: 'commercial',
        scope: 'industry',
        industry: 'real-estate'
    },

    // ==========================================
    // ULTRA-DEEP EXPANSION: HEALTHCARE
    // ==========================================
    {
        id: 'ud-hc-1',
        question: 'How do you ensure medical content compliance with local {city} health authorities?',
        answer: 'Every piece of healthcare content we produce for {city} clients is reviewed against DHA/MOH (or local equivalent) advertising guidelines. we focus on evidence-based claims and clinical authority to pass strict regulatory audits.',
        intent: 'commercial',
        scope: 'industry',
        industry: 'healthcare'
    },
    {
        id: 'ud-hc-2',
        question: 'What is the importance of E-E-A-T for healthcare websites in {city}?',
        answer: 'Experience, Expertise, Authoritativeness, and Trustworthiness (E-E-A-T) are critical for YMYL (Your Money Your Life) sectors like healthcare. We build technical trust through doctor credentials, patient verified reviews, and secure patient portals.',
        intent: 'informational',
        scope: 'industry',
        industry: 'healthcare'
    },
    {
        id: 'ud-hc-3',
        question: 'Can we implement online patient registration for our clinic in {city}?',
        answer: 'Absolutely. We develop secure, HIPAA-compliant patient onboarding flows that integrate with your HMS (Hospital Management System), reducing front-desk friction and improving the patient experience in {city}.',
        intent: 'transactional',
        scope: 'industry',
        industry: 'healthcare'
    },

    // ==========================================
    // ULTRA-DEEP EXPANSION: LOGISTICS
    // ==========================================
    {
        id: 'ud-lg-1',
        question: 'How does SEO help B2B logistics firms in {city} secure maritime contracts?',
        answer: 'B2B logistics is about "Digital Capability Proof". We optimize your site for procurement-specific keywords like "Jebel Ali freight forwarders" or "{city} cold chain storage," proving your infrastructure through data-heavy technical pages.',
        intent: 'commercial',
        scope: 'industry',
        industry: 'logistics'
    },
    {
        id: 'ud-lg-2',
        question: 'Can you build a custom client portal for container tracking in {city}?',
        answer: 'Yes, we integrate with maritime APIs and customs platforms (like Fasah in KSA) to provide your {city} clients with a real-time dashboard for shipment status and documentation management.',
        intent: 'transactional',
        scope: 'industry',
        industry: 'logistics'
    },

    // ==========================================
    // GLOBAL TRUST & ROI
    // ==========================================
    {
        id: 'ud-glob-1',
        question: 'What is the typical ROI timeline for an ultra-deep SEO campaign?',
        answer: 'While technical fixes show impact in 4-6 weeks, the compound authority from our "Ultra-Deep" content model usually results in a 200-300% increase in organic leads within 6-9 months, depending on the {city} market difficulty.',
        intent: 'informational',
        scope: 'global'
    },
    {
        id: 'ud-glob-2',
        question: 'Why does vdesignu focus on sub-second loading speeds (LCP)?',
        answer: 'Performance is a primary ranking factor. In the {city} market, where mobile usage is at {cityData.marketStats.mobileUsage}, a slow site means lost revenue. We use Astro to ensure every page is lean, fast, and SEO-hardened.',
        intent: 'informational',
        scope: 'global'
    },
    {
        id: 'ud-glob-3',
        question: 'Do you provide bilingual (Arabic/English) content strategies for GCC markets?',
        answer: 'Yes. We don\'t just translate; we transcreate. Our native Arabic copywriters ensure your message resonates with local decision-makers in {city} while maintaining global brand standards.',
        intent: 'commercial',
        scope: 'global'
    }
];

// Helper to retrieve FAQs based on context
export const getContextualFAQs = (
    city: string,
    industry: string,
    service: string,
    limit: number = 20
): FAQItem[] => {
    // 1. Exact Match (Matrix)
    const matrix = faqDatabase.filter(f =>
        f.scope === 'service-industry-city' &&
        f.city === city &&
        f.industry === industry &&
        f.service === service
    );

    // 2. Service + Industry
    const srvInd = faqDatabase.filter(f =>
        f.scope === 'service-industry' &&
        f.service === service &&
        f.industry === industry
    );

    // 3. Service + City
    const srvCity = faqDatabase.filter(f =>
        f.scope === 'service-city' &&
        f.service === service &&
        f.city === city
    );

    // 4. Industry + City
    const indCity = faqDatabase.filter(f =>
        f.scope === 'industry-city' &&
        f.industry === industry &&
        f.city === city
    );

    // 5. Industry specific
    const ind = faqDatabase.filter(f =>
        f.scope === 'industry' &&
        f.industry === industry
    );

    // 6. City specific
    const loc = faqDatabase.filter(f =>
        f.scope === 'city' &&
        f.city === city
    );

    // 7. Global Fallback
    const glob = faqDatabase.filter(f => f.scope === 'global');

    // Combine and deduplicate
    const all = [...matrix, ...srvInd, ...srvCity, ...indCity, ...ind, ...loc, ...glob];
    const unique = Array.from(new Set(all.map(a => a.id)))
        .map(id => all.find(a => a.id === id)!)
        .slice(0, limit);

    return unique;
};
