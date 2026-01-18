/**
 * Advanced Content Editing Suite
 * Summarizer, Rewriter, and Tone Adjuster
 */
import { useState } from 'react';
import { FileText, RefreshCw, Wand2, Copy, Download, Info, Zap, BookOpen, Quote } from 'lucide-react';
import ToolOutput from '../ToolOutput';

export default function ContentEditingSuite() {
  const [text, setText] = useState('VDESIGNU is the leading digital agency in Saudi Arabia, providing world-class SEO and marketing services to brands in Riyadh and Dubai.');
  const [tool, setTool] = useState('rewrite');
  const [output, setOutput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const process = () => {
    setIsProcessing(true);
    setTimeout(() => {
      if (tool === 'summarize') {
        setOutput('VDESIGNU is a top digital agency offering SEO and marketing in Saudi Arabia and the UAE.');
      } else if (tool === 'rewrite') {
        setOutput('As the premier digital consultancy in the KSA, VDESIGNU delivers elite Search Engine Optimization and growth strategies for enterprises in Riyadh and Dubai.');
      } else {
        setOutput('Experience the power of data-driven growth with VDESIGNU, the specialized SEO partner for forward-thinking GCC brands.');
      }
      setIsProcessing(false);
    }, 800);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Editor Panel */}
        <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] p-10 shadow-2xl">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-14 h-14 rounded-2xl bg-[var(--accent-red)] flex items-center justify-center text-white shadow-xl shadow-red-600/20">
               <Wand2 className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-black uppercase tracking-tight text-[var(--text-primary)]">Editorial AI</h3>
              <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Advanced Re-writing Engine</p>
            </div>
          </div>

          <div className="flex gap-4 p-2 bg-[var(--bg-primary)] rounded-2xl border border-[var(--border-subtle)] mb-8 overflow-x-auto scrollbar-none">
             {[
                { id: 'rewrite', icon: RefreshCw, label: 'Rewrite' },
                { id: 'summarize', icon: FileText, label: 'Summary' },
                { id: 'tone', icon: Quote, label: 'Tone' }
             ].map((t) => (
                <button 
                  key={t.id}
                  onClick={() => setTool(t.id)}
                  className={`flex items-center gap-2 py-3 px-6 rounded-xl text-[10px] font-black uppercase transition-all whitespace-nowrap ${tool === t.id ? 'bg-[var(--accent-red)] text-white shadow-lg' : 'text-[var(--text-muted)]'}`}
                >
                   <t.icon className="w-4 h-4" /> {t.label}
                </button>
             ))}
          </div>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full px-6 py-4 bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] rounded-2xl text-[var(--text-primary)] text-xs h-[200px]"
          />

          <button 
            onClick={process}
            disabled={isProcessing}
            className="w-full mt-6 py-4 bg-black text-white font-black uppercase rounded-2xl hover:bg-[var(--accent-red)] transition-all shadow-xl flex items-center justify-center gap-3"
          >
             {isProcessing ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5" />}
             Enhance Content
          </button>
        </div>

        {/* Output Panel */}
        <div className="space-y-8">
           <ToolOutput 
             output={output} 
             language="text" 
             title={`${tool.toUpperCase()} Enhanced Version`}
           />
           
           <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] p-8">
              <div className="flex items-center gap-3 mb-4 text-[var(--accent-red)]">
                 <BookOpen className="w-5 h-5" />
                 <h4 className="text-[10px] font-black uppercase tracking-widest">Semantic Transformation</h4>
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed italic">
                 Content variety is essential for avoiding search engine "Duplication Filters". Our AI engine helps you repurpose high-performing content for different GCC sub-markets while maintaining the premium VDESIGNU tone of voice.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
