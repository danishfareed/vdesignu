export interface Persona {
    name: string;
    role: string;
    bio: string;
    stats: string[];
    image?: string; // Optional for future use
    social?: {
        linkedin?: string;
        twitter?: string;
    };
}

export const PERSONAS: Record<string, Persona> = {
    architect: {
        name: "Danish Fareed",
        role: "Senior SEO Architect",
        bio: "Strategy lead for {industry} growth in {city}. Specializing in multi-market programmatic systems and technical SEO hardening.",
        stats: ["12+ Years Exp.", "500M+ Revenue Driven"],
        social: {
            linkedin: "https://www.linkedin.com/in/danishfareed",
        },
    },
    strategist: {
        name: "Sarah Al-Rashed",
        role: "Growth Strategist (GCC)",
        bio: "Expert in {city} market dynamics and {industry} consumer behavior. Engineering hyper-local conversion funnels for the Gulf region.",
        stats: ["Top 1% GCC Strategist", "Vision 2030 Consultant"],
        social: {
            linkedin: "https://www.linkedin.com/in/sarahalrashed-demo" // Placeholder
        }
    },
};

export const getPersona = (type: "architect" | "strategist", city: string, industry: string): Persona => {
    const template = PERSONAS[type];
    return {
        ...template,
        bio: template.bio.replace("{city}", city).replace("{industry}", industry)
    };
}
