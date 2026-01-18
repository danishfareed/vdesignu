/**
 * Heading Generator
 * Generates SEO-friendly H1/H2/H3 heading structures
 */
import { useState } from 'react';
import { Heading, Sparkles, Copy, ChevronDown } from 'lucide-react';

export default function HeadingGenerator() {
  const [topic, setTopic] = useState('');
  const [keyword, setKeyword] = useState('');
  const [headings, setHeadings] = useState<{ level: string; text: string }[]>([]);
  const [copied, setCopied] = useState(false);

  const generateHeadings = () => {
    if (!topic) return;
    
    const h1s = [
      `${topic}: The Complete Guide`,
      `Everything You Need to Know About ${topic}`,
      `${topic} - Expert Tips & Best Practices`
    ];
    
    const h2s = [
      `What is ${topic}?`,
      `Why ${topic} Matters`,
      `How to Get Started with ${topic}`,
      `${topic} Best Practices`,
      `Common ${topic} Mistakes to Avoid`,
      `${topic} Tools and Resources`,
      `${topic} Case Studies`,
      `Frequently Asked Questions About ${topic}`
    ];
    
    const h3s = [
      `Key Benefits of ${topic}`,
      `Step-by-Step ${topic} Guide`,
      `${topic} for Beginners`,
      `Advanced ${topic} Strategies`,
      `Measuring ${topic} Success`,
      `${topic} vs Alternatives`
    ];
    
    const generatedHeadings = [
      { level: 'H1', text: h1s[0] },
      { level: 'H2', text: h2s[0] },
      { level: 'H3', text: h3s[0] },
      { level: 'H3', text: h3s[1] },
      { level: 'H2', text: h2s[1] },
      { level: 'H3', text: h3s[2] },
      { level: 'H2', text: h2s[2] },
      { level: 'H3', text: h3s[3] },
      { level: 'H3', text: h3s[4] },
      { level: 'H2', text: h2s[3] },
      { level: 'H2', text: h2s[4] },
      { level: 'H2', text: h2s[5] },
      { level: 'H2', text: h2s[7] }
    ];
    
    setHeadings(generatedHeadings);
  };

  const copyAllHeadings = () => {
    const text = headings.map(h => `${h.level}: ${h.text}`).join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getHeadingStyle = (level: string) => {
    switch (level) {
      case 'H1': return 'text-2xl font-black bg-[var(--accent-red)] text-white';
      case 'H2': return 'text-lg font-bold bg-[var(--bg-primary)] text-[var(--text-primary)] ml-4';
      case 'H3': return 'text-sm font-medium bg-[var(--bg-secondary)] text-[var(--text-secondary)] ml-8';
      default: return '';
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Input Panel */}
        <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] p-10 shadow-2xl">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-14 h-14 rounded-2xl bg-[var(--accent-red)] flex items-center justify-center text-white shadow-xl">
              <Heading className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-black uppercase tracking-tight text-[var(--text-primary)]">Heading Generator</h3>
              <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">H1/H2/H3 Structure</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-2">Main Topic</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., SEO, Content Marketing, Web Design"
                className="w-full px-5 py-4 bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] rounded-2xl text-sm"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-2">Target Keyword (Optional)</label>
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Primary keyword to optimize for"
                className="w-full px-5 py-4 bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] rounded-2xl text-sm"
              />
            </div>

            <button
              onClick={generateHeadings}
              disabled={!topic}
              className="w-full py-4 bg-[var(--accent-red)] text-white font-black uppercase rounded-2xl hover:bg-black transition-all shadow-xl flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Sparkles className="w-5 h-5" /> Generate Headings
            </button>
          </div>

          {/* Tips */}
          <div className="mt-8 p-4 bg-[var(--bg-primary)] rounded-2xl border border-[var(--border-subtle)]">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-[var(--text-primary)] mb-3">Heading Best Practices</h4>
            <ul className="space-y-2 text-xs text-[var(--text-muted)]">
              <li>• Use only ONE H1 per page</li>
              <li>• Include keywords naturally in headings</li>
              <li>• Maintain logical hierarchy (H1 → H2 → H3)</li>
              <li>• Keep headings concise and descriptive</li>
            </ul>
          </div>
        </div>

        {/* Output Panel */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-black uppercase tracking-widest text-[var(--text-muted)]">Generated Headings</h4>
            {headings.length > 0 && (
              <button
                onClick={copyAllHeadings}
                className="flex items-center gap-2 px-4 py-2 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl text-[10px] font-bold hover:bg-[var(--accent-red)] hover:text-white transition-all"
              >
                <Copy className="w-3 h-3" /> {copied ? 'Copied!' : 'Copy All'}
              </button>
            )}
          </div>

          {headings.length === 0 && (
            <div className="bg-[var(--bg-card)] border-2 border-dashed border-[var(--border-subtle)] rounded-2xl p-8 text-center">
              <p className="text-[var(--text-muted)] text-sm">Enter a topic to generate headings</p>
            </div>
          )}

          <div className="space-y-2">
            {headings.map((heading, index) => (
              <div key={index} className={`${getHeadingStyle(heading.level)} p-4 rounded-xl transition-all hover:scale-[1.02]`}>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-black uppercase opacity-50">{heading.level}</span>
                  <span>{heading.text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
