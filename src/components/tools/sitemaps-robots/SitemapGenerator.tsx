/**
 * Sitemap XML Generator
 * Generates SEO-compliant XML sitemaps
 */
import { useState } from 'react';
import { FileCode, Plus, Trash2, Download, Copy, Check, Info, AlertTriangle } from 'lucide-react';
import ToolOutput from '../ToolOutput';

interface SitemapURL {
  url: string;
  priority: string;
  changefreq: string;
  lastmod: string;
}

export default function SitemapGenerator() {
  const [urls, setUrls] = useState<SitemapURL[]>([
    { url: 'https://example.com/', priority: '1.0', changefreq: 'daily', lastmod: new Date().toISOString().split('T')[0] }
  ]);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const priorities = ['1.0', '0.9', '0.8', '0.7', '0.6', '0.5', '0.4', '0.3', '0.2', '0.1'];
  const frequencies = ['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'];

  const addUrl = () => {
    setUrls([...urls, { url: '', priority: '0.8', changefreq: 'weekly', lastmod: new Date().toISOString().split('T')[0] }]);
  };

  const removeUrl = (index: number) => {
    if (urls.length === 1) return;
    const newUrls = [...urls];
    newUrls.splice(index, 1);
    setUrls(newUrls);
  };

  const updateUrl = (index: number, field: keyof SitemapURL, value: string) => {
    const newUrls = [...urls];
    newUrls[index][field] = value;
    setUrls(newUrls);
  };

  const generateSitemap = () => {
    setError('');
    const validUrls = urls.filter(u => u.url.trim() !== '');

    if (validUrls.length === 0) {
      setError('Please enter at least one URL');
      return;
    }

    // Validate URLs
    for (const item of validUrls) {
      try {
        new URL(item.url);
      } catch (e) {
        setError(`Invalid URL format: ${item.url}`);
        return;
      }
    }

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    validUrls.forEach(item => {
      xml += `  <url>\n`;
      xml += `    <loc>${item.url.trim()}</loc>\n`;
      xml += `    <lastmod>${item.lastmod}</lastmod>\n`;
      xml += `    <changefreq>${item.changefreq}</changefreq>\n`;
      xml += `    <priority>${item.priority}</priority>\n`;
      xml += `  </url>\n`;
    });

    xml += `</urlset>`;
    setOutput(xml);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Input area */}
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-2xl bg-[var(--accent-red)] flex items-center justify-center text-white shadow-xl shadow-red-600/20">
                  <FileCode className="w-6 h-6" />
               </div>
               <div>
                  <h3 className="text-xl font-black uppercase tracking-tight text-[var(--text-primary)]">URL Configuration</h3>
                  <p className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest">Build Your Index Structure</p>
               </div>
            </div>
            <button 
              onClick={addUrl}
              className="flex items-center gap-2 px-4 py-2 bg-[var(--accent-red)]/10 text-[var(--accent-red)] rounded-xl text-xs font-black uppercase tracking-widest hover:bg-[var(--accent-red)] hover:text-white transition-all shadow-lg active:scale-95"
            >
              <Plus className="w-4 h-4" />
              Add URL
            </button>
          </div>

          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
            {urls.map((item, index) => (
              <div key={index} className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-2xl p-6 relative group/item hover:border-[var(--accent-red)]/30 transition-all">
                <button 
                  onClick={() => removeUrl(index)}
                  className="absolute -top-3 -right-3 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition-opacity shadow-lg hover:bg-black"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <div className="grid gap-6">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3">Target URL</label>
                    <input
                      type="url"
                      value={item.url}
                      onChange={(e) => updateUrl(index, 'url', e.target.value)}
                      placeholder="https://example.com/page"
                      className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl text-[var(--text-primary)] font-bold focus:border-[var(--accent-red)] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] mb-2">Priority</label>
                      <select
                        value={item.priority}
                        onChange={(e) => updateUrl(index, 'priority', e.target.value)}
                        className="w-full px-3 py-2 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-lg text-[var(--text-primary)] text-xs font-bold focus:border-[var(--accent-red)] focus:outline-none"
                      >
                        {priorities.map(p => <option key={p} value={p}>{p}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] mb-2">ChangeFreq</label>
                      <select
                        value={item.changefreq}
                        onChange={(e) => updateUrl(index, 'changefreq', e.target.value)}
                        className="w-full px-3 py-2 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-lg text-[var(--text-primary)] text-xs font-bold focus:border-[var(--accent-red)] focus:outline-none"
                      >
                        {frequencies.map(f => <option key={f} value={f}>{f}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] mb-2">Last Mod</label>
                      <input
                        type="date"
                        value={item.lastmod}
                        onChange={(e) => updateUrl(index, 'lastmod', e.target.value)}
                        className="w-full px-3 py-2 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-lg text-[var(--text-primary)] text-[10px] font-bold focus:border-[var(--accent-red)] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl flex items-center gap-3 text-red-500 text-sm font-bold">
              <AlertTriangle className="w-5 h-5" />
              {error}
            </div>
          )}

          <button
            onClick={generateSitemap}
            className="w-full py-6 bg-black text-white font-black italic uppercase tracking-tighter text-2xl rounded-2xl hover:bg-[var(--accent-red)] transition-all active:scale-[0.98] shadow-2xl flex items-center justify-center gap-3 group"
          >
            Generate Sitemap
            <FileCode className="w-6 h-6 group-hover:rotate-12 transition-transform" />
          </button>
        </div>

        {/* Output area */}
        <div className="relative">
           <div className="sticky top-32">
              <ToolOutput 
                output={output} 
                language="xml" 
                title="Sitemap XML"
              />
              
              <div className="mt-8 bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-3xl p-8">
                 <h4 className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-[var(--text-primary)] mb-4">
                    <Info className="w-4 h-4 text-[var(--accent-red)]" />
                    SEO Optimization Tips
                 </h4>
                 <ul className="space-y-4 text-xs text-[var(--text-secondary)] font-medium leading-relaxed">
                    <li className="flex gap-2">
                       <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-red)] mt-1.5 flex-shrink-0"></div>
                       Submit your sitemap to Google Search Console (GSC) for faster indexing.
                    </li>
                    <li className="flex gap-2">
                       <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-red)] mt-1.5 flex-shrink-0"></div>
                       Keep sitemap size under 50MB and 50,000 URLs per single sitemap file.
                    </li>
                    <li className="flex gap-2">
                       <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-red)] mt-1.5 flex-shrink-0"></div>
                       Ensure all URLs use the correct protocol (HTTP vs HTTPS).
                    </li>
                 </ul>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
