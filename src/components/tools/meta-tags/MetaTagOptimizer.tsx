/**
 * Meta Tag Width & Length Optimizer
 * Validates pixel width and character count for Google SERPs
 */
import { useState, useEffect } from 'react';
import { Layout, MoveHorizontal, Type, Copy, Info, CheckCircle, AlertCircle, Search } from 'lucide-react';
import ToolOutput from '../ToolOutput';

export default function MetaTagOptimizer() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [output, setOutput] = useState('');

  // Constants for SEO benchmarks
  const MAX_TITLE_CHARS = 60;
  const MAX_TITLE_PX = 580;
  const MAX_DESC_CHARS = 160;
  const MAX_DESC_PX = 920;

  // Helper to estimate pixel width (rough simulation)
  const estimatePx = (text: string, fontSize: number) => {
    if (typeof document === 'undefined') return 0;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (context) {
      context.font = `${fontSize}px Arial`;
      return context.measureText(text).width;
    }
    return text.length * 8; // Fallback
  };

  const [metrics, setMetrics] = useState({
    titleChars: 0,
    titlePx: 0,
    descChars: 0,
    descPx: 0
  });

  useEffect(() => {
    setMetrics({
      titleChars: title.length,
      titlePx: Math.round(estimatePx(title, 18)),
      descChars: description.length,
      descPx: Math.round(estimatePx(description, 13))
    });

    setOutput(`<!-- SEO Optimized Tags -->\n<title>${title}</title>\n<meta name="description" content="${description}" />`);
  }, [title, description]);

  const renderStatus = (val: number, max: number, type: 'chars' | 'px') => {
    const isOver = val > max;
    return (
      <div className={`flex items-center gap-2 text-[10px] font-black uppercase ${isOver ? 'text-red-500' : 'text-green-500'}`}>
        {isOver ? <AlertCircle className="w-3 h-3" /> : <CheckCircle className="w-3 h-3" />}
        {val} / {max} {type}
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Editor Panel */}
        <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] p-10 shadow-2xl">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-14 h-14 rounded-2xl bg-[var(--accent-red)] flex items-center justify-center text-white shadow-xl shadow-red-600/20">
              <MoveHorizontal className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-black uppercase tracking-tight text-[var(--text-primary)]">Pixel Precision</h3>
              <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">SERP Width Optimizer</p>
            </div>
          </div>

          <div className="space-y-8">
             <div>
                <div className="flex justify-between items-center mb-3">
                   <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] ml-1">Page Title</label>
                   <div className="flex gap-4">
                      {renderStatus(metrics.titleChars, MAX_TITLE_CHARS, 'chars')}
                      {renderStatus(metrics.titlePx, MAX_TITLE_PX, 'px')}
                   </div>
                </div>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter your target page title..."
                  className="w-full px-6 py-4 bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] rounded-2xl text-lg font-bold text-[var(--text-primary)] focus:border-[var(--accent-red)] focus:outline-none transition-all"
                />
             </div>

             <div>
                <div className="flex justify-between items-center mb-3">
                   <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] ml-1">Meta Description</label>
                   <div className="flex gap-4">
                      {renderStatus(metrics.descChars, MAX_DESC_CHARS, 'chars')}
                      {renderStatus(metrics.descPx, MAX_DESC_PX, 'px')}
                   </div>
                </div>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter your meta description (120-160 chars recommended)..."
                  className="w-full px-6 py-4 bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] rounded-2xl text-sm font-bold text-[var(--text-primary)] focus:border-[var(--accent-red)] focus:outline-none transition-all"
                  rows={4}
                />
             </div>
          </div>
        </div>

        {/* Live Preview Panel */}
        <div className="space-y-8">
           <div className="bg-white border border-gray-200 rounded-[2.5rem] p-10 shadow-xl overflow-hidden">
              <div className="flex items-center gap-2 mb-6 text-gray-400">
                 <Search className="w-4 h-4" />
                 <span className="text-[10px] uppercase font-bold tracking-widest">Google Desktop Preview</span>
              </div>
              <div className="max-w-[600px] space-y-1">
                 <p className="text-sm text-[#202124] flex items-center gap-1 mb-1">
                    https://vdesignu.com <span className="text-gray-400">› ...</span>
                 </p>
                 <h4 className="text-[20px] text-[#1a0dab] font-medium leading-tight hover:underline cursor-pointer block truncate-px overflow-hidden" 
                     style={{ maxWidth: `${MAX_TITLE_PX}px` }}>
                    {title || 'Example Page Title - Your Brand Name'}
                 </h4>
                 <p className="text-[14px] text-[#4d5156] leading-relaxed line-clamp-2"
                    style={{ maxWidth: `${MAX_DESC_PX}px` }}>
                    {description || 'This is how your meta description will look in Google search results. Keep it between 120 and 160 characters for the best appearance on most devices.'}
                 </p>
              </div>
           </div>

           <ToolOutput 
             output={output} 
             language="html" 
             title="Optimized Meta Tags"
           />
        </div>
      </div>
    </div>
  );
}
