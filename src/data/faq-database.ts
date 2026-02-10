import type { FAQItem } from '../types/faq';

export const faqDatabase: FAQItem[] = [
    // ==========================================
    // 1. UNIVERSAL (Trust & Process) - Target: 2 per page
    // ==========================================
    {
        id: 'univ-payment',
        question: 'What is your payment structure for digital projects?',
        answer: 'We operate on a milestone-based model for development (30% mobilization, 40% beta, 30% launch) and a monthly retainer for growth/SEO partnerships. All contracts are governed by local service agreements.',
        intent: 'transactional',
        scope: 'universal',
        tags: ['payment', 'contracts']
    },
    {
        id: 'univ-guarantee',
        question: 'Do you offer performance guarantees?',
        answer: 'Yes. Our SEO contracts include KPI-based milestones. If we don\'t hit agreed traffic or authority targets within the first 90 days, we work specifically on those deficits at no extra cost until resolved.',
        intent: 'commercial',
        scope: 'universal',
        tags: ['guarantee', 'performance']
    },
    {
        id: 'univ-support',
        question: 'What happens after the website goes live?',
        answer: 'We provide a comprehensive 30-day hyper-care period for immediate fixes, followed by optional annual maintenance contracts (AMC) that cover security patches, server monitoring, and content updates.',
        intent: 'informational',
        scope: 'universal',
        tags: ['support', 'maintenance']
    },
    {
        id: 'univ-timeline',
        question: 'How fast can you launch?',
        answer: 'For "Speed-to-Market" campaigns, we can deploy a high-performance landing page framework in 7-10 days. Full enterprise platform development typically ranges from 8 to 12 weeks.',
        intent: 'commercial',
        scope: 'universal',
        tags: ['timeline', 'speed']
    },

    // ==========================================
    // 2. CITY SPECIFIC - Target: 3 per page
    // ==========================================
    // --- DUBAI ---
    {
        id: 'city-dubai-rera',
        question: 'Do you handle RERA ad approvals for real estate campaigns?',
        answer: 'Yes, our team is trained on the Trakheesi system. We ensure all landing pages and digital creatives contain the mandatory QR codes and permit numbers to avoid fines.',
        intent: 'transactional',
        scope: 'city',
        city: 'dubai'
    },
    {
        id: 'city-dubai-comp',
        question: 'My Dubai competitor is spending millions. How do we win?',
        answer: 'You don\'t outspend them; you outmaneuver them. We target "Neighborhood-Specific" keywords (e.g., "Villas in District One" vs just "Dubai Villas") where conversion rates are 5x higher and CPC is 60% lower.',
        intent: 'commercial',
        scope: 'city',
        city: 'dubai'
    },
    {
        id: 'city-dubai-tech',
        question: 'Are your sites hosted in the UAE?',
        answer: 'For maximizing speed in Dubai, we use AWS Middle East (Bahrain/UAE) regions. This ensures sub-50ms latency for your local customers, which is a critical ranking factor for Google.ae.',
        intent: 'technical',
        scope: 'city',
        city: 'dubai'
    },

    // --- RIYADH ---
    {
        id: 'city-riyadh-data',
        question: 'Is your hosting compliant with Saudi Data Sovereignty laws?',
        answer: 'Absolutely. We utilize Oracle Cloud Jeddah or Google Cloud Dammam regions to ensure all user data remains within the Kingdom, fully compliant with NDMO and NCA regulations.',
        intent: 'technical',
        scope: 'city',
        city: 'riyadh'
    },
    {
        id: 'city-riyadh-pay',
        question: 'Can you integrate Mada and STC Pay?',
        answer: 'Yes, we are certified integration partners for Moyasar, HyperPay, and Checkout.com, ensuring seamless acceptance of Mada, STC Pay, and Apple Pay for your Saudi customers.',
        intent: 'transactional',
        scope: 'city',
        city: 'riyadh'
    },
    {
        id: 'city-riyadh-vision',
        question: 'How does your strategy align with Vision 2030?',
        answer: 'We focus on "Digital Localization." We don\'t just translate content; we adapt it to reflect the modern Saudi identity, focusing on sectors like Tourism, Entertainment, and Tech that are central to the Vision.',
        intent: 'commercial',
        scope: 'city',
        city: 'riyadh'
    },

    // --- DOHA ---
    {
        id: 'city-doha-domain',
        question: 'Do I need a .qa domain for SEO in Qatar?',
        answer: 'It is highly recommended. A .qa domain signals strong local relevance to Google Qatar. We handle the registration requirements through authorized local registrars to secure your brand identity.',
        intent: 'technical',
        scope: 'city',
        city: 'doha'
    },
    {
        id: 'city-doha-qfc',
        question: 'We are a QFC company. Can you help with B2B lead gen?',
        answer: 'Yes, we specialize in targeting the corporate sector in West Bay and Lusail. Our LinkedIn and SEO strategies are designed to reach decision-makers in Qatar\'s energy and finance sectors.',
        intent: 'commercial',
        scope: 'city',
        city: 'doha'
    },

    // --- CHICAGO ---
    {
        id: 'city-chicago-local',
        question: 'How do you handle local SEO for complete Chicago coverage?',
        answer: 'Chicago is a city of neighborhoods. We create specific location pages for areas like Lincoln Park, West Loop, and Hyde Park, ensuring you rank for "near me" searches across the entire metro area.',
        intent: 'commercial',
        scope: 'city',
        city: 'chicago'
    },

    // ==========================================
    // 3. INDUSTRY SPECIFIC - Target: 3 per page
    // ==========================================
    // --- REAL ESTATE ---
    {
        id: 'ind-re-portals',
        question: 'Should we invest in SEO or just stick to Property Finder/Bayut?',
        answer: 'Portals own your leads; SEO owns your future. While portals are good for immediate traffic, building your own SEO authority builds an asset where you control the data, the retargeting, and the brand experience.',
        intent: 'commercial',
        scope: 'industry',
        industry: 'real-estate'
    },
    {
        id: 'ind-re-crm',
        question: 'Which CRMs do you integrate with?',
        answer: 'We have native integrations for Salesforce, Microsoft Dynamics, HubSpot, and industry-specific tools like Masterkey and Bitrix24 to ensure seamless lead flow.',
        intent: 'technical',
        scope: 'industry',
        industry: 'real-estate'
    },
    {
        id: 'ind-re-offplan',
        question: 'How do we sell off-plan properties digitally?',
        answer: 'Visuals sell. We integrate high-speed 3D walkthroughs and interactive masterplans directly into the landing page, allowing investors to "feel" the property without visiting the sales center.',
        intent: 'commercial',
        scope: 'industry',
        industry: 'real-estate'
    },

    // --- HEALTHCARE ---
    {
        id: 'ind-hc-compliance',
        question: 'Is your content writing medically accurate?',
        answer: 'We adhere to the "YMYL" (Your Money Your Life) Google standard. All medical content is reviewed for factual accuracy and compliance with local health authority advertising guidelines (MOH/DHA/HAAD).',
        intent: 'informational',
        scope: 'industry',
        industry: 'healthcare'
    },
    {
        id: 'ind-hc-booking',
        question: 'Can patients book appointments directly on the site?',
        answer: 'Yes, we integrate with practice management systems (like Okadoc, Practo, or custom HMS) to allow real-time slot booking, reducing call center volume.',
        intent: 'transactional',
        scope: 'industry',
        industry: 'healthcare'
    },
    {
        id: 'ind-hc-privacy',
        question: 'How is patient data secured?',
        answer: 'We strictly follow data privacy laws (HIPAA/GDPR/PDPL). No sensitive health data is stored on the marketing front-end; it is encrypted and passed securely to your specialized backend systems.',
        intent: 'technical',
        scope: 'industry',
        industry: 'healthcare'
    },

    // --- FINANCE ---
    {
        id: 'ind-fin-trust',
        question: 'How do you build trust for a new fintech brand?',
        answer: 'Trust is built through transparency and authority. We create "Education Centers" that explain complex financial concepts simply, positioning your brand as a helpful advisor rather than just a service provider.',
        intent: 'commercial',
        scope: 'industry',
        industry: 'finance'
    },
    {
        id: 'ind-fin-sec',
        question: 'Do you conduct security stress testing?',
        answer: 'Yes, all financial platforms undergo OWASP Top 10 vulnerability scanning and penetration testing before launch to ensure absolute integrity of user assets.',
        intent: 'technical',
        scope: 'industry',
        industry: 'finance'
    },

    // ==========================================
    // 4. SERVICE SPECIFIC - Target: 2 per page
    // ==========================================
    // --- SEO ---
    {
        id: 'srv-seo-time',
        question: 'How long does it take to see SEO results?',
        answer: 'Technical fixes (speed, indexing) show results in 2-4 weeks. Content authority and ranking improvements typically compound between months 3 and 6.',
        intent: 'informational',
        scope: 'service',
        service: 'seo'
    },
    {
        id: 'srv-seo-guarantee',
        question: 'Can you guarantee a #1 ranking on Google?',
        answer: 'No ethical agency guarantees a specific #1 spot as algorithms change daily. We DO guarantee performance metrics: traffic growth, lead quality improvements, and technical health scores.',
        intent: 'commercial',
        scope: 'service',
        service: 'seo'
    },

    // --- WEB DEV ---
    {
        id: 'srv-web-platform',
        question: 'Do you use templates or custom code?',
        answer: 'For high-performance clients, we use custom code (Astro/Next.js) because it passes Core Web Vitals by default. We only use templates (WordPress) if the budget or timeline strictly demands it.',
        intent: 'technical',
        scope: 'service',
        service: 'website-development'
    },
    {
        id: 'srv-web-mobile',
        question: 'Will the site work perfectly on mobile?',
        answer: 'We design "Mobile-First". We recognize that 80%+ of traffic in the Gulf comes from phones, so the mobile experience is the primary design standard, not an afterthought.',
        intent: 'technical',
        scope: 'service',
        service: 'website-development'
    },

    // --- CRM ---
    {
        id: 'srv-crm-custom',
        question: 'Do we need a custom CRM or off-the-shelf?',
        answer: 'If you have standard sales processes, tools like HubSpot are great. If you have unique workflows (e.g., specific real estate commission structures), a custom CRM module is often more cost-effective long term.',
        intent: 'commercial',
        scope: 'service',
        service: 'crm-systems'
    }
];

// Helper to retrieve FAQs based on context with specific "Mix Logic"
export const getContextualFAQs = (
    city: string,
    industry: string,
    service: string,
    limit: number = 10
): FAQItem[] => {

    // 1. Get Universals (Target: 2)
    const universals = faqDatabase
        .filter(f => f.scope === 'universal')
        .sort(() => 0.5 - Math.random()) // Shuffle
        .slice(0, 2);

    // 2. Get City Specifics (Target: 3)
    const cityQs = faqDatabase
        .filter(f => f.scope === 'city' && f.city === city)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);

    // Fallback if no specific city Qs, use more universals
    if (cityQs.length < 3) {
        const extraUniv = faqDatabase
            .filter(f => f.scope === 'universal' && !universals.includes(f))
            .slice(0, 3 - cityQs.length);
        cityQs.push(...extraUniv);
    }

    // 3. Get Industry Specifics (Target: 3)
    const industryQs = faqDatabase
        .filter(f => f.scope === 'industry' && f.industry === industry)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);

    // 4. Get Service Specifics (Target: 2)
    const serviceQs = faqDatabase
        .filter(f => f.scope === 'service' && f.service === service)
        .sort(() => 0.5 - Math.random())
        .slice(0, 2);

    // Combine into a curated list
    // Order: Universal -> City -> Industry -> Service (Logical flow)
    const combined = [
        ...cityQs,      // Hook with local relevance first
        ...industryQs,  // Show sector expertise
        ...serviceQs,   // Technical details
        ...universals   // Close with trust/process
    ];

    // Deduplicate just in case
    const unique = Array.from(new Set(combined.map(a => a.id)))
        .map(id => combined.find(a => a.id === id)!);

    return unique.slice(0, limit);
};
