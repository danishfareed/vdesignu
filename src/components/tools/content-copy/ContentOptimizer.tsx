/**
 * SEO Content Optimizer
 * Generates AI-style Titles and Meta Descriptions
 */
import { useState } from 'react';
import { FileText, Sparkles, RefreshCw, Copy, Download, Info, Zap, Type, AlignLeft } from 'lucide-react';
import ToolOutput from '../ToolOutput';

export default function ContentOptimizer() {
  const [keyword, setKeyword] = useState('');
  const [type, setType] = useState('title');
  const [results, setResults] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const generate = () => {
    setIsGenerating(true);
    // Simulate generation based on best practices
    setTimeout(() => {
      let suggestions: string[] = [];
      if (type === 'title') {
        suggestions = [
          `Top 10 Ways to Master ${keyword} in 2026`,
          `${keyword}: The Ultimate Guide for GCC Businesses`,
          `How to Optimize ${keyword} for Maximum SEO Growth`,
          `Why ${keyword} is the Key to Digital Success in Riyadh`,
          `5 Secret Strategies for ${keyword} You Need to Know`
        ];
      } else {
        suggestions = [
          `Discover how ${keyword} can transform your business. Our expert guide covers the latest trends and technical strategies for the Middle East market.`,
          `Struggling with ${keyword}? Learn the top 5 proven techniques to dominate search results and drive high-quality traffic today.`,
          `Master ${keyword} with VDESIGNU. We provide data-driven insights and professional optimization for modern enterprises.`,
          `Looking for the best ${keyword} solutions? Read our comprehensive review of the latest tools and strategies for 2026.`
        ];
      }
      setResults(suggestions);
      setIsGenerating(false);
    }, 800);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[3rem] p-10 shadow-2xl mb-12">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-14 h-14 rounded-2xl bg-[var(--accent-red)] flex items-center justify-center text-white shadow-xl shadow-red-600/20">
            <Sparkles className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-xl font-black uppercase tracking-tight text-[var(--text-primary)]">Linguistic Engine</h3>
            <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">SEO Content Generator</p>
          </div>
        </div>

        <div className="space-y-8">
           <div className="grid md:grid-cols-2 gap-8">
              <div>
                 <label className="block text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-3 ml-1">Target Keyword / Topic</label>
                 <input
                   type="text"
                   value={keyword}
                   onChange={(e) => setKeyword(e.target.value)}
                   placeholder="e.g. Real Estate SEO Riyadh"
                   className="w-full px-6 py-4 bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] rounded-2xl text-[var(--text-primary)] font-bold focus:border-[var(--accent-red)] focus:outline-none transition-all"
                 />
              </div>
              <div className="flex items-end gap-2">
                 <button 
                   onClick={() => setType('title')}
                   className={`flex-1 py-4 border-2 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${type === 'title' ? 'bg-[var(--accent-red)] border-[var(--accent-red)] text-white shadow-xl' : 'border-[var(--border-subtle)] text-[var(--text-muted)] hover:border-[var(--accent-red)]'}`}
                 >
                    <Type className="w-4 h-4 mx-auto mb-1" /> Title Tags
                 </button>
                 <button 
                   onClick={() => setType('description')}
                   className={`flex-1 py-4 border-2 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${type === 'description' ? 'bg-[var(--accent-red)] border-[var(--accent-red)] text-white shadow-xl' : 'border-[var(--border-subtle)] text-[var(--text-muted)] hover:border-[var(--accent-red)]'}`}
                 >
                    <AlignLeft className="w-4 h-4 mx-auto mb-1" /> Meta Desc
                 </button>
              </div>
           </div>

           <button 
             onClick={generate}
             disabled={!keyword || isGenerating}
             className="w-full py-5 bg-black text-white font-black uppercase italic tracking-tighter text-xl rounded-2xl hover:bg-[var(--accent-red)] transition-all shadow-2xl flex items-center justify-center gap-3 disabled:opacity-50"
           >
              {isGenerating ? <RefreshCw className="w-6 h-6 animate-spin" /> : <Zap className="w-6 h-6" />}
              Generate High-CTR Copy
           </button>

           <div className="grid gap-4 mt-8">
              {results.map((res, i) => (
                 <div key={i} className="group p-6 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-2xl hover:border-[var(--accent-red)] transition-all flex justify-between items-center gap-4">
                    <p className="text-sm font-medium text-[var(--text-primary)] leading-relaxed">{res}</p>
                    <button 
                      onClick={() => navigator.clipboard.writeText(res)}
                      className="p-3 bg-[var(--bg-card)] rounded-xl text-[var(--text-muted)] hover:text-[var(--accent-red)] shadow-sm"
                    >
                       <Copy className="w-4 h-4" />
                    </button>
                 </div>
              ))}
           </div>
        </div>
      </div>

      <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] p-10">
         <div className="flex items-center gap-3 mb-6">
            <Sparkles className="w-5 h-5 text-[var(--accent-red)]" />
            <h4 className="text-xs font-black uppercase tracking-widest text-[var(--text-primary)]">The VDESIGNU Copy Standard</h4>
         </div>
         <p className="text-sm text-[var(--text-secondary)] leading-relaxed italic">
            In competitive markets like Dubai and Riyadh, CTR is the definitive ranking factor. Our generator uses regional psychological triggers and linguistic patterns proven to capture attention in the GCC digital landscape.
         </p>
      </div>
    </div>
  );
}
