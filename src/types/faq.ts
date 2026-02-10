export interface FAQItem {
    id: string;
    question: string;
    answer: string;
    intent: 'commercial' | 'informational' | 'transactional' | 'navigational';
    scope: 'global' | 'industry' | 'city' | 'service' | 'service-industry' | 'service-city' | 'industry-city' | 'service-industry-city';
    service?: string;
    industry?: string;
    city?: string;
    tags?: string[];
}
