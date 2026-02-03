/**
 * Meta Description Generator
 * Generates compelling meta descriptions with character counting
 */
import { useState } from 'react';
import { AlignLeft, Sparkles, Copy, CheckCircle } from 'lucide-react';

const DESCRIPTION_TEMPLATES = {
  informational: [
    'Discover everything about {keyword}. Our comprehensive guide covers {topic1}, {topic2}, and expert tips. Learn more at {brand}.',
    'Looking for {keyword} information? Get expert insights, practical tips, and industry best practices. Updated for {year}.',
    '{keyword} explained: From basics to advanced strategies. {brand} brings you the definitive resource.'
  ],
  transactional: [
    'Shop {keyword} at {brand}. Premium quality, competitive prices, and fast delivery to {location}. Order now!',
    'Buy {keyword} online. {brand} offers the best selection with free shipping on orders over $100.',
    'Get the best {keyword} deals at {brand}. Limited time offers, {discount}% off. Shop today!'
  ],
  local: [
    'Looking for {keyword} in {location}? {brand} offers professional services with proven results. Contact us today!',
    '{brand} provides expert {keyword} services in {location}. 5-star rated, locally trusted. Get a free quote.',
    'Top {keyword} company in {location}. {brand} delivers quality results. Call now for a consultation!'
  ]
};

export default function DescriptionGenerator() {
  const [keyword, setKeyword] = useState('');
  const [brand, setBrand] = useState('');
  const [location, setLocation] = useState('Dubai');
  const [intent, setIntent] = useState('informational');
  const [descriptions, setDescriptions] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const generateDescriptions = () => {
    const templates = DESCRIPTION_TEMPLATES[intent as keyof typeof DESCRIPTION_TEMPLATES];
    const year = new Date().getFullYear();
    
    const generated = templates.map(template => 
      template
        .replace(/{keyword}/g, keyword || 'your services')
        .replace(/{brand}/g, brand || 'our company')
        .replace(/{location}/g, location)
        .replace(/{year}/g, year.toString())
        .replace(/{topic1}/g, 'key features')
        .replace(/{topic2}/g, 'benefits')
        .replace(/{discount}/g, '20')
    );
    
    // Add AI-style variations
    const aiVariations = [
      `${keyword} services by ${brand} in ${location}. Trusted by 500+ clients. Professional, reliable, and results-driven. Contact us today.`,
      `Explore top-rated ${keyword} solutions. ${brand} delivers excellence across ${location}. Get started with a free consultation.`,
      `${brand}: Your ${keyword} partner in ${location}. Quality service, competitive pricing, 100% satisfaction guaranteed.`
    ];
    
    setDescriptions([...generated, ...aiVariations]);
  };

  const copyDescription = (desc: string, index: number) => {
    navigator.clipboard.writeText(desc);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const getCharacterStatus = (length: number) => {
    if (length < 120) return { color: 'text-amber-500', status: 'Too short - aim for 120-160 characters' };
    if (length <= 160) return { color: 'text-green-500', status: 'Perfect length ✓' };
    return { color: 'text-red-500', status: 'Too long - will be truncated' };
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Input Panel */}
        <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] p-10 shadow-2xl">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-14 h-14 rounded-2xl bg-[var(--accent-red)] flex items-center justify-center text-white shadow-xl">
              <AlignLeft className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-black uppercase tracking-tight text-[var(--text-primary)]">Description Generator</h3>
              <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Meta Description Creator</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-2">Primary Keyword/Topic</label>
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="e.g., SEO services, web design"
                className="w-full px-5 py-4 bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] rounded-2xl text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-2">Brand Name</label>
                <input
                  type="text"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  placeholder="Your brand"
                  className="w-full px-5 py-4 bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] rounded-2xl text-sm"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-2">Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Dubai, Riyadh"
                  className="w-full px-5 py-4 bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] rounded-2xl text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-2">Search Intent</label>
              <div className="grid grid-cols-3 gap-2">
                {['informational', 'transactional', 'local'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setIntent(type)}
                    className={`py-3 rounded-xl text-[10px] font-black uppercase transition-all ${
                      intent === type
                        ? 'bg-[var(--accent-red)] text-white'
                        : 'bg-[var(--bg-primary)] text-[var(--text-muted)] border border-[var(--border-subtle)]'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={generateDescriptions}
              className="w-full py-4 bg-[var(--accent-red)] text-white font-black uppercase rounded-2xl hover:bg-black transition-all shadow-xl flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5" /> Generate Descriptions
            </button>
          </div>
        </div>

        {/* Output Panel */}
        <div className="space-y-4">
          <h4 className="text-xs font-black uppercase tracking-widest text-[var(--text-muted)]">Generated Descriptions</h4>
          
          {descriptions.length === 0 && (
            <div className="bg-[var(--bg-card)] border-2 border-dashed border-[var(--border-subtle)] rounded-2xl p-8 text-center">
              <p className="text-[var(--text-muted)] text-sm">Enter your details and click Generate</p>
            </div>
          )}

          {descriptions.map((desc, index) => {
            const status = getCharacterStatus(desc.length);
            return (
              <div key={index} className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-2xl p-5 hover:border-[var(--accent-red)] transition-all">
                <p className="text-sm text-[var(--text-primary)] mb-3 leading-relaxed">{desc}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] font-bold ${status.color}`}>
                      {desc.length}/160 chars
                    </span>
                    <span className="text-[10px] text-[var(--text-muted)]">{status.status}</span>
                  </div>
                  <button
                    onClick={() => copyDescription(desc, index)}
                    className="flex items-center gap-1 px-3 py-1 bg-[var(--bg-primary)] rounded-lg text-[10px] font-bold hover:bg-[var(--accent-red)] hover:text-white transition-all"
                  >
                    {copiedIndex === index ? <CheckCircle className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    {copiedIndex === index ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
