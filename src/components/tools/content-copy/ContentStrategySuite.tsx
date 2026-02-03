/**
 * Content Strategy Suite
 * LSI Keyword Finder and Content Brief Generator
 */
import { useState } from 'react';
import { Search, FileText, List, Copy, Download, Info, Zap, BookOpen, Sparkles } from 'lucide-react';
import ToolOutput from '../ToolOutput';

export default function ContentStrategySuite() {
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [brief, setBrief] = useState('');

  const findLSI = () => {
    // Simulated LSI finding based on regional trends
    const lsi = [
      `${keyword} services Riyadh`,
      `best ${keyword} in UAE`,
      `${keyword} strategy for beginners`,
      `advanced ${keyword} techniques`,
      `local ${keyword} optimization`,
      `${keyword} trends 2026`
    ];
    setResults(lsi);
  };

  const generateBrief = () => {
    const output = `// SEO Content Brief: ${keyword}\n\n1. PRIMARY KEYWORD: ${keyword}\n2. TARGET AUDIENCE: GCC Businesses & Decision Makers\n3. RECOMMENDED LENGTH: 1200 - 1500 words\n4. PROPOSED H1: Ultimate Guide to ${keyword} in Saudi Arabia\n5. KEY SECTIONS:\n   - Introduction to ${keyword}\n   - Regional Market Analysis (UAE/KSA)\n   - Implementation Best Practices\n   - Case Studies & Results`;
    setBrief(output);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Settings Panel */}
        <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] p-10 shadow-2xl">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-14 h-14 rounded-2xl bg-[var(--accent-red)] flex items-center justify-center text-white shadow-xl shadow-red-600/20">
               <Sparkles className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-black uppercase tracking-tight text-[var(--text-primary)]">Content Strategy</h3>
              <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Semantic Planning Lab</p>
            </div>
          </div>

          <div className="space-y-6">
             <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-3 ml-1">Main Topic / Seed Keyword</label>
                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="w-full px-6 py-4 bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] rounded-2xl font-bold"
                  placeholder="e.g. Arabic SEO"
                />
             </div>

             <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={findLSI}
                  className="py-4 bg-black text-white font-black uppercase rounded-xl hover:bg-[var(--accent-red)] transition-all flex items-center justify-center gap-2"
                >
                   <List className="w-4 h-4" /> Find LSI
                </button>
                <button 
                  onClick={generateBrief}
                  className="py-4 bg-black text-white font-black uppercase rounded-xl hover:bg-[var(--accent-red)] transition-all flex items-center justify-center gap-2"
                >
                   <FileText className="w-4 h-4" /> Build Brief
                </button>
             </div>
          </div>

          {results.length > 0 && (
             <div className="mt-8 grid gap-2">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-2">Semantic Keywords</h4>
                {results.map((r, i) => (
                   <div key={i} className="px-4 py-2 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-lg text-[10px] font-bold flex justify-between items-center">
                      <span>{r}</span>
                      <button onClick={() => navigator.clipboard.writeText(r)}><Copy className="w-3 h-3 text-[var(--text-muted)]" /></button>
                   </div>
                ))}
             </div>
          )}
        </div>

        {/* Output Panel */}
        <div className="space-y-8">
           <ToolOutput 
             output={brief} 
             language="text" 
             title="Content Brief / Strategy"
           />
           
           <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] p-8">
              <div className="flex items-center gap-3 mb-4 text-[var(--accent-red)]">
                 <BookOpen className="w-5 h-5" />
                 <h4 className="text-[10px] font-black uppercase tracking-widest">Semantic Excellence</h4>
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed italic">
                 Search engines have evolved from keyword matching to "Topic Modeling". For VDESIGNU clients, we use LSI (Latent Semantic Indexing) clusters to build authority across entire topical domains, not just single keywords.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
