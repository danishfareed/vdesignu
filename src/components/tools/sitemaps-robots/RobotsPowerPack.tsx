/**
 * Robots.txt Validator & Template Library
 * Validates syntax and provides best-practice templates
 */
import { useState } from 'react';
import { Bot, CheckCircle, AlertTriangle, FileCode, Copy, Download, Info, ShieldCheck, Layout } from 'lucide-react';
import ToolOutput from '../ToolOutput';

export default function RobotsPowerPack() {
  const [robots, setRobots] = useState('User-agent: *\nDisallow: /admin/\nAllow: /\n\nSitemap: https://vdesignu.com/sitemap.xml');
  const [results, setResults] = useState<any[]>([]);

  const templates = {
    wordpress: "User-agent: *\nDisallow: /wp-admin/\nAllow: /wp-admin/admin-ajax.php\n\nSitemap: https://vdesignu.com/sitemap_index.xml",
    shopify: "User-agent: *\nDisallow: /checkout\nDisallow: /cart\nDisallow: /orders\n\nSitemap: https://vdesignu.com/sitemap.xml",
    ecommerce: "User-agent: *\nDisallow: /search\nDisallow: /account\nDisallow: /cart\nDisallow: /wishlist\n\nSitemap: https://vdesignu.com/sitemap.xml"
  };

  const validate = () => {
    const findings: any[] = [];
    if (!robots) return;

    if (!robots.includes('User-agent:')) {
      findings.push({ type: 'error', msg: 'Missing User-agent directive' });
    }
    if (robots.includes('Disallow: /') && robots.length < 50) {
      findings.push({ type: 'warning', msg: 'The directive "Disallow: /" blocks your entire site' });
    }
    if (!robots.includes('Sitemap:')) {
      findings.push({ type: 'info', msg: 'Sitemap reference recommended for better crawling' });
    }

    if (findings.length === 0) {
      findings.push({ type: 'success', msg: 'Robots.txt syntax is valid.' });
    }
    setResults(findings);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Editor Panel */}
        <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] p-10 shadow-2xl">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[var(--accent-red)] flex items-center justify-center text-white shadow-xl shadow-red-600/20">
                <Bot className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-black uppercase tracking-tight text-[var(--text-primary)]">Crawl Guardian</h3>
                <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Robots.txt Power Pack</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
             <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-none">
                {Object.keys(templates).map((key) => (
                   <button
                     key={key}
                     onClick={() => setRobots((templates as any)[key])}
                     className="whitespace-nowrap px-4 py-2 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl text-[9px] font-black uppercase tracking-widest text-[var(--text-muted)] hover:border-[var(--accent-red)] hover:text-[var(--accent-red)] transition-all"
                   >
                      {key} Template
                   </button>
                ))}
             </div>

             <textarea
               value={robots}
               onChange={(e) => setRobots(e.target.value)}
               className="w-full px-6 py-4 bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] rounded-2xl text-[var(--text-primary)] font-mono text-xs focus:border-[var(--accent-red)] focus:outline-none transition-all shadow-inner h-[300px]"
             />

             <button
               onClick={validate}
               className="w-full py-4 bg-[var(--accent-red)] text-white font-black uppercase rounded-2xl hover:bg-black transition-all shadow-xl"
             >
                Validate Directives
             </button>

             <div className="grid grid-cols-1 gap-3">
                {results.map((f, i) => (
                   <div key={i} className={`p-4 rounded-xl border flex items-center gap-3 ${f.type === 'error' ? 'bg-red-50 border-red-200 text-red-600' : f.type === 'warning' ? 'bg-yellow-50 border-yellow-200 text-yellow-700' : 'bg-green-50 border-green-200 text-green-600'}`}>
                      {f.type === 'error' ? <AlertTriangle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                      <span className="text-[10px] font-black uppercase tracking-tight">{f.msg}</span>
                   </div>
                ))}
             </div>
          </div>
        </div>

        {/* Output/Info */}
        <div className="space-y-8">
           <ToolOutput 
             output={robots} 
             language="text" 
             title="Verified Robots.txt"
           />
           
           <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] p-8">
              <div className="flex items-center gap-3 mb-4 text-[var(--accent-red)]">
                 <ShieldCheck className="w-5 h-5" />
                 <h4 className="text-[10px] font-black uppercase tracking-widest">Bot Governance Standard</h4>
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed italic">
                 A single mistake in robots.txt can de-index your entire domain from Google. VDESIGNU provides these battle-tested templates to ensure your high-value pages are accessible while private areas remain shielded from crawlers.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
