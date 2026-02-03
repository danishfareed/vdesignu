/**
 * Professional Word Counter
 * Analyzes text for length, density, and readability
 */
import { useState, useEffect } from 'react';
import { Type, Clock, MessageSquare, List, BarChart3, Copy, Trash2, Check, Info } from 'lucide-react';

export default function WordCounter() {
  const [text, setText] = useState('');
  const [stats, setStats] = useState({
    words: 0,
    chars: 0,
    charsNoSpaces: 0,
    sentences: 0,
    paragraphs: 0,
    readingTime: 0,
    speakingTime: 0
  });

  useEffect(() => {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const chars = text.length;
    const charsNoSpaces = text.replace(/\s/g, '').length;
    const sentences = text.trim() ? text.split(/[.!?]+/).filter(Boolean).length : 0;
    const paragraphs = text.trim() ? text.split(/\n+/).filter(Boolean).length : 0;
    
    // Average reading speed: 225 wpm
    // Average speaking speed: 130 wpm
    const readingTime = Math.ceil(words / 225);
    const speakingTime = Math.ceil(words / 130);

    setStats({ words, chars, charsNoSpaces, sentences, paragraphs, readingTime, speakingTime });
  }, [text]);

  const clearText = () => setText('');
  const copyText = () => {
    navigator.clipboard.writeText(text);
  };

  const getKeywordDensity = () => {
    if (!text.trim()) return [];
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    const stopWords = new Set(['the', 'and', 'a', 'to', 'of', 'in', 'is', 'it', 'that', 'on', 'for', 'with', 'as', 'at', 'by', 'an', 'be', 'this', 'which', 'or']);
    const freq: Record<string, number> = {};
    
    words.forEach(word => {
      if (!stopWords.has(word) && word.length > 2) {
        freq[word] = (freq[word] || 0) + 1;
      }
    });

    return Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Input Panel */}
        <div className="lg:col-span-8 bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[var(--accent-red)] flex items-center justify-center text-white shadow-xl shadow-red-600/20">
                <Type className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black uppercase tracking-tight text-[var(--text-primary)]">Text Analyzer</h3>
            </div>
            <div className="flex gap-2">
               <button onClick={copyText} className="p-3 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl text-[var(--text-muted)] hover:text-[var(--accent-red)] transition-all" title="Copy Text">
                  <Copy className="w-5 h-5" />
               </button>
               <button onClick={clearText} className="p-3 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl text-[var(--text-muted)] hover:text-red-500 transition-all" title="Clear All">
                  <Trash2 className="w-5 h-5" />
               </button>
            </div>
          </div>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your content here to analyze word count, density, and reading time..."
            className="w-full h-[400px] px-8 py-6 bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] rounded-[2rem] text-lg font-medium text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:border-[var(--accent-red)] focus:outline-none transition-all resize-none shadow-inner"
          />

          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
             <div className="bg-[var(--bg-primary)] p-6 rounded-2xl border border-[var(--border-subtle)] text-center group hover:border-[var(--accent-red)] transition-all">
                <div className="text-3xl font-black italic text-[var(--accent-red)] mb-1">{stats.words}</div>
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)]">Words</div>
             </div>
             <div className="bg-[var(--bg-primary)] p-6 rounded-2xl border border-[var(--border-subtle)] text-center group hover:border-[var(--accent-yellow)] transition-all">
                <div className="text-3xl font-black italic text-[var(--text-primary)] mb-1">{stats.chars}</div>
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)]">Chars</div>
             </div>
             <div className="bg-[var(--bg-primary)] p-6 rounded-2xl border border-[var(--border-subtle)] text-center group hover:border-[var(--accent-red)] transition-all">
                <div className="text-3xl font-black italic text-[var(--text-primary)] mb-1">{stats.sentences}</div>
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)]">Sentences</div>
             </div>
             <div className="bg-[var(--bg-primary)] p-6 rounded-2xl border border-[var(--border-subtle)] text-center group hover:border-[var(--accent-yellow)] transition-all">
                <div className="text-3xl font-black italic text-[var(--text-primary)] mb-1">{stats.paragraphs}</div>
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)]">Paragraphs</div>
             </div>
          </div>
        </div>

        {/* Info & Density Panel */}
        <div className="lg:col-span-4 space-y-8">
           <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] p-8 shadow-xl">
              <h4 className="text-sm font-black uppercase tracking-widest text-[var(--text-primary)] mb-8 flex items-center gap-2">
                 <Clock className="w-4 h-4 text-[var(--accent-red)]" />
                 Time Analysis
              </h4>
              <div className="space-y-6">
                 <div className="flex items-center justify-between p-4 bg-[var(--bg-primary)] rounded-2xl border border-[var(--border-subtle)]">
                    <div className="flex items-center gap-3">
                       <Type className="w-5 h-5 text-[var(--text-muted)]" />
                       <span className="text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)]">Reading</span>
                    </div>
                    <span className="text-lg font-black italic text-[var(--text-primary)]">{stats.readingTime}m</span>
                 </div>
                 <div className="flex items-center justify-between p-4 bg-[var(--bg-primary)] rounded-2xl border border-[var(--border-subtle)]">
                    <div className="flex items-center gap-3">
                       <MessageSquare className="w-5 h-5 text-[var(--text-muted)]" />
                       <span className="text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)]">Speaking</span>
                    </div>
                    <span className="text-lg font-black italic text-[var(--text-primary)]">{stats.speakingTime}m</span>
                 </div>
              </div>
           </div>

           <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] p-8 shadow-xl">
              <h4 className="text-sm font-black uppercase tracking-widest text-[var(--text-primary)] mb-8 flex items-center gap-2">
                 <BarChart3 className="w-4 h-4 text-[var(--accent-yellow)]" />
                 Keyword Density
              </h4>
              <div className="space-y-4">
                 {getKeywordDensity().length > 0 ? (
                    getKeywordDensity().map(([word, count]) => (
                       <div key={word} className="flex items-center justify-between group">
                          <span className="text-xs font-bold text-[var(--text-secondary)] group-hover:text-[var(--accent-red)] transition-colors uppercase">
                             {word}
                          </span>
                          <div className="flex items-center gap-2">
                             <div className="w-24 h-1.5 bg-[var(--bg-primary)] rounded-full overflow-hidden border border-[var(--border-subtle)]">
                                <div 
                                  className="h-full bg-[var(--accent-red)] rounded-full transition-all duration-1000"
                                  style={{ width: `${(count / stats.words) * 500}%` }}
                                ></div>
                             </div>
                             <span className="text-[10px] font-black text-[var(--text-muted)] w-6 text-right">{count}</span>
                          </div>
                       </div>
                    ))
                 ) : (
                    <div className="text-center py-10 text-[var(--text-muted)] text-[10px] uppercase font-bold tracking-widest opacity-40">
                       Analysis will appear here
                    </div>
                 )}
              </div>
           </div>

           <div className="bg-[var(--accent-red)] text-white rounded-[2rem] p-6 shadow-2xl shadow-red-600/20">
              <h4 className="text-xs font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                 <Info className="w-4 h-4" />
                 Pro Writing Tip
              </h4>
              <p className="text-[11px] font-medium leading-relaxed opacity-90">
                 SEO best practices recommend a target length of <strong>1,200+ words</strong> for long-form articles to maximize semantic coverage and authority scoring.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
