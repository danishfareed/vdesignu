/**
 * Canonical URL Batch Generator
 * Generates canonical tags for multiple URLs to prevent duplicate content
 */
import { useState, useEffect } from 'react';
import { Link, Copy, Download, Info, Trash2, Plus, Globe } from 'lucide-react';
import ToolOutput from '../ToolOutput';

export default function CanonicalGenerator() {
  const [urls, setUrls] = useState(['https://vdesignu.com/page-1', 'https://vdesignu.com/page-2']);
  const [output, setOutput] = useState('');

  const addUrl = () => {
    setUrls([...urls, '']);
  };

  const removeUrl = (index: number) => {
    setUrls(urls.filter((_, i) => i !== index));
  };

  const updateUrl = (index: number, value: string) => {
    const newUrls = [...urls];
    newUrls[index] = value;
    setUrls(newUrls);
  };

  useEffect(() => {
    let result = '<!-- SEO Canonical Tags -->\n';
    urls.forEach(url => {
      if (url.trim()) {
        result += `<link rel="canonical" href="${url.trim()}" />\n`;
      }
    });

    setOutput(result);
  }, [urls]);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Input Panel */}
        <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] p-10 shadow-2xl">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-14 h-14 rounded-2xl bg-[var(--accent-red)] flex items-center justify-center text-white shadow-xl shadow-red-600/20">
              <Link className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-black uppercase tracking-tight text-[var(--text-primary)]">URL Repository</h3>
              <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Duplicate Prevention</p>
            </div>
          </div>

          <div className="space-y-4">
             {urls.map((url, index) => (
                <div key={index} className="flex gap-2">
                   <div className="flex-1 relative">
                      <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
                      <input
                        type="url"
                        value={url}
                        onChange={(e) => updateUrl(index, e.target.value)}
                        placeholder="https://example.com/target-page"
                        className="w-full pl-12 pr-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl text-[var(--text-primary)] font-bold focus:border-[var(--accent-red)] focus:outline-none transition-all"
                      />
                   </div>
                   <button 
                     onClick={() => removeUrl(index)}
                     className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                   >
                      <Trash2 className="w-5 h-5" />
                   </button>
                </div>
             ))}

             <button 
               onClick={addUrl}
               className="w-full mt-4 py-3 border-2 border-dashed border-[var(--border-subtle)] rounded-xl text-[9px] font-black uppercase tracking-widest text-[var(--text-muted)] hover:border-[var(--accent-red)] hover:text-[var(--accent-red)] transition-all flex items-center justify-center gap-2"
             >
                <Plus className="w-4 h-4" />
                Add URL to Batch
             </button>
          </div>
        </div>

        {/* Output Panel */}
        <div className="space-y-8">
           <ToolOutput 
             output={output} 
             language="html" 
             title="Canonical HTML Tags"
           />
           
           <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] p-8">
              <div className="flex items-center gap-3 mb-4 text-[var(--accent-yellow)]">
                 <Info className="w-5 h-5" />
                 <h4 className="text-[10px] font-black uppercase tracking-widest text-[var(--text-primary)]">Why Use Canonical Tags?</h4>
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed italic">
                 Canonical tags tell search engines which version of a URL is the "master" copy. This prevents multiple versions of the same page (e.g., with tracking parameters) from competing against each other in search results, effectively <strong>consolidating your link equity</strong>.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
