/**
 * SEO Title Tag Generator
 * Generates optimized title tags based on keyword, brand, and page type
 */
import { useState } from 'react';
import { Type, Sparkles, Copy, RefreshCw } from 'lucide-react';

const TITLE_TEMPLATES = {
  homepage: [
    '{brand} - {keyword} Services | Official Site',
    '{keyword} Solutions by {brand} | Trusted Experts',
    '{brand}: Professional {keyword} Company'
  ],
  product: [
    'Buy {keyword} Online | {brand}',
    '{keyword} - Best Prices & Fast Delivery | {brand}',
    'Shop {keyword} | Premium Quality | {brand}'
  ],
  service: [
    '{keyword} Services in {location} | {brand}',
    'Professional {keyword} | {brand} Experts',
    'Top {keyword} Company | {brand}'
  ],
  blog: [
    '{keyword}: Complete Guide [{year}]',
    'How to {keyword} - Expert Tips | {brand}',
    '{keyword} Best Practices | {brand} Blog'
  ],
  category: [
    '{keyword} Products & Services | {brand}',
    'Browse {keyword} | {brand} Store',
    '{keyword} Collection | {brand}'
  ]
};

export default function TitleGenerator() {
  const [keyword, setKeyword] = useState('');
  const [brand, setBrand] = useState('');
  const [location, setLocation] = useState('Dubai');
  const [pageType, setPageType] = useState('homepage');
  const [titles, setTitles] = useState<string[]>([]);

  const generateTitles = () => {
    const templates = TITLE_TEMPLATES[pageType as keyof typeof TITLE_TEMPLATES] || TITLE_TEMPLATES.homepage;
    const year = new Date().getFullYear();
    
    const generated = templates.map(template => 
      template
        .replace('{keyword}', keyword || 'Your Keyword')
        .replace('{brand}', brand || 'Your Brand')
        .replace('{location}', location)
        .replace('{year}', year.toString())
    );
    
    // Add some variations
    const variations = [
      `${keyword} | ${brand} - ${location}`,
      `${brand} | ${keyword} Experts Since ${year - 5}`,
      `${keyword} in ${location} | ${brand} Official`,
      `Best ${keyword} Services | ${brand}`,
      `${keyword} - Trusted by 1000+ Clients | ${brand}`
    ];
    
    setTitles([...generated, ...variations]);
  };

  const copyTitle = (title: string) => {
    navigator.clipboard.writeText(title);
  };

  const getCharacterClass = (length: number) => {
    if (length <= 50) return 'text-green-500';
    if (length <= 60) return 'text-amber-500';
    return 'text-red-500';
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Input Panel */}
        <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] p-10 shadow-2xl">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-14 h-14 rounded-2xl bg-[var(--accent-red)] flex items-center justify-center text-white shadow-xl">
              <Type className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-black uppercase tracking-tight text-[var(--text-primary)]">Title Generator</h3>
              <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">SEO Optimized Titles</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-2">Primary Keyword</label>
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="e.g., Web Design, SEO Services"
                className="w-full px-5 py-4 bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] rounded-2xl text-sm"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-2">Brand Name</label>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="e.g., VDESIGNU"
                className="w-full px-5 py-4 bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] rounded-2xl text-sm"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-2">Location (Optional)</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g., Dubai, Riyadh"
                className="w-full px-5 py-4 bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] rounded-2xl text-sm"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-2">Page Type</label>
              <div className="grid grid-cols-3 gap-2">
                {Object.keys(TITLE_TEMPLATES).map((type) => (
                  <button
                    key={type}
                    onClick={() => setPageType(type)}
                    className={`py-3 rounded-xl text-[10px] font-black uppercase transition-all ${
                      pageType === type
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
              onClick={generateTitles}
              className="w-full py-4 bg-[var(--accent-red)] text-white font-black uppercase rounded-2xl hover:bg-black transition-all shadow-xl flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5" /> Generate Titles
            </button>
          </div>
        </div>

        {/* Output Panel */}
        <div className="space-y-4">
          <h4 className="text-xs font-black uppercase tracking-widest text-[var(--text-muted)]">Generated Titles ({titles.length})</h4>
          
          {titles.length === 0 && (
            <div className="bg-[var(--bg-card)] border-2 border-dashed border-[var(--border-subtle)] rounded-2xl p-8 text-center">
              <p className="text-[var(--text-muted)] text-sm">Enter your details and click Generate Titles</p>
            </div>
          )}

          {titles.map((title, index) => (
            <div key={index} className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-2xl p-4 hover:border-[var(--accent-red)] transition-all group">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="text-sm font-medium text-[var(--text-primary)] mb-2">{title}</p>
                  <div className="flex items-center gap-4">
                    <span className={`text-[10px] font-bold ${getCharacterClass(title.length)}`}>
                      {title.length} characters
                    </span>
                    <span className="text-[10px] text-[var(--text-muted)]">
                      {title.length <= 60 ? '✓ Optimal length' : '⚠ May truncate in SERPs'}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => copyTitle(title)}
                  className="p-2 bg-[var(--bg-primary)] rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-[var(--accent-red)] hover:text-white"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
