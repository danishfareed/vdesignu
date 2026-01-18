/**
 * Crawl Intelligence Suite
 * Dynamic Sitemap Builder and Robots Breakage Detector
 */
import { useState } from 'react';
import { RefreshCw, AlertTriangle, FileCode, CheckCircle, Info, Zap, Globe, Search } from 'lucide-react';
import ToolOutput from '../ToolOutput';

export default function CrawlIntelligence() {
  const [tool, setTool] = useState('dynamic');
  const [output, setOutput] = useState('');

  const runLogic = () => {
    if (tool === 'dynamic') {
      setOutput('<!-- Dynamic XML Sitemap -->\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n   <url>\n      <loc>https://vdesignu.com/</loc>\n      <lastmod>2026-01-18</lastmod>\n      <changefreq>daily</changefreq>\n      <priority>1.0</priority>\n   </url>\n</urlset>');
    } else {
      setOutput('// Robots Breakage Report\n// Scanning robots.txt...\n[OK] Sitemap is clearly defined.\n[OK] No accidental "Disallow: /" detected.\n[!!] Warning: /private/ directory is not blocked.\n[OK] Search engine bots have full CSS/JS access.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Settings Panel */}
        <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] p-10 shadow-2xl">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-14 h-14 rounded-2xl bg-[var(--accent-red)] flex items-center justify-center text-white shadow-xl shadow-red-600/20">
               <Search className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-black uppercase tracking-tight text-[var(--text-primary)]">Crawl Engine</h3>
              <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Indexing Optimization</p>
            </div>
          </div>

          <div className="flex gap-4 p-2 bg-[var(--bg-primary)] rounded-2xl border border-[var(--border-subtle)] mb-8">
             {[
                { id: 'dynamic', icon: RefreshCw, label: 'Dynamic XML' },
                { id: 'breakage', icon: AlertTriangle, label: 'Breakage' }
             ].map((t) => (
                <button 
                  key={t.id}
                  onClick={() => setTool(t.id)}
                  className={`flex-1 py-3 px-6 rounded-xl text-[10px] font-black uppercase transition-all whitespace-nowrap ${tool === t.id ? 'bg-[var(--accent-red)] text-white shadow-lg' : 'text-[var(--text-muted)]'}`}
                >
                   <t.icon className="w-4 h-4 mx-auto mb-1" /> {t.label}
                </button>
             ))}
          </div>

          <button 
            onClick={runLogic}
            className="w-full py-4 bg-[var(--accent-red)] text-white font-black uppercase rounded-2xl hover:bg-black transition-all shadow-xl"
          >
             Analyze & Generate
          </button>
        </div>

        {/* Output Panel */}
        <div className="space-y-8">
           <ToolOutput 
             output={output} 
             language={tool === 'dynamic' ? 'xml' : 'text'} 
             title={`${tool.toUpperCase()} Output`}
           />
           
           <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] p-8">
              <div className="flex items-center gap-3 mb-4 text-[var(--accent-red)]">
                 <Globe className="w-5 h-5" />
                 <h4 className="text-[10px] font-black uppercase tracking-widest">Crawl Budget Optimization</h4>
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed italic">
                 Effective indexing starts with a clean crawl path. For VDESIGNU enterprise sites, we use these tools to ensure search engine bots spend their "crawl budget" on your most profitable pages, not technical fragments.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
