/**
 * Professional Redirect Generator
 * Unified tool for Apache, Nginx, and Meta redirects
 */
import { useState, useEffect } from 'react';
import { ArrowRight, Copy, Download, Terminal, Server, Globe, Trash2, Plus } from 'lucide-react';
import ToolOutput from '../ToolOutput';

export default function RedirectGenerator() {
  const [platform, setPlatform] = useState<'apache' | 'nginx' | 'meta' | 'netlify'>('apache');
  const [redirects, setRedirects] = useState([{ oldUrl: '/old-page', newUrl: '/new-page', type: '301' }]);
  const [output, setOutput] = useState('');

  const addRedirect = () => {
    setRedirects([...redirects, { oldUrl: '', newUrl: '', type: '301' }]);
  };

  const removeRedirect = (index: number) => {
    setRedirects(redirects.filter((_, i) => i !== index));
  };

  const updateRedirect = (index: number, field: string, value: string) => {
    const newRedirects = [...redirects];
    (newRedirects[index] as any)[field] = value;
    setRedirects(newRedirects);
  };

  useEffect(() => {
    let result = '';
    
    if (platform === 'apache') {
      result = 'RewriteEngine On\n\n';
      redirects.forEach(r => {
        if (r.oldUrl && r.newUrl) {
          result += `Redirect ${r.type} ${r.oldUrl} ${r.newUrl}\n`;
        }
      });
    } else if (platform === 'nginx') {
      redirects.forEach(r => {
        if (r.oldUrl && r.newUrl) {
          result += `rewrite ^${r.oldUrl}$ ${r.newUrl} ${r.type === '301' ? 'permanent' : 'redirect'};\n`;
        }
      });
    } else if (platform === 'netlify') {
      redirects.forEach(r => {
        if (r.oldUrl && r.newUrl) {
          result += `${r.oldUrl}  ${r.newUrl}  ${r.type}\n`;
        }
      });
    } else if (platform === 'meta') {
      const r = redirects[0];
      result = `<html>\n  <head>\n    <meta http-equiv="refresh" content="0; url=${r?.newUrl || '#'}" />\n  </head>\n</html>`;
    }

    setOutput(result);
  }, [redirects, platform]);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-12 gap-8">
        {/* Source Panel */}
        <div className="lg:col-span-12 xl:col-span-7 bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[3rem] p-10 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[var(--accent-red)] flex items-center justify-center text-white shadow-xl shadow-red-600/20">
                <ArrowRight className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-black uppercase tracking-tight text-[var(--text-primary)]">Redirect Rules</h3>
                <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-[0.2em]">Crawl Budget Preservation</p>
              </div>
            </div>

            <div className="flex p-1 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-2xl overflow-hidden">
               {(['apache', 'nginx', 'netlify', 'meta'] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPlatform(p)}
                    className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-all ${platform === p ? 'bg-[var(--accent-red)] text-white' : 'text-[var(--text-muted)] hover:text-[var(--accent-red)]'}`}
                  >
                     {p}
                  </button>
               ))}
            </div>
          </div>

          <div className="space-y-4">
             {redirects.map((r, index) => (
                <div key={index} className="grid md:grid-cols-12 gap-4 items-center p-4 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-2xl group transition-all hover:border-[var(--accent-red)]/30">
                   <div className="md:col-span-5 relative">
                      <span className="absolute -top-6 left-1 text-[9px] font-black uppercase tracking-widest text-[var(--text-muted)] opacity-50">Old Path</span>
                      <input 
                        type="text" 
                        value={r.oldUrl}
                        onChange={(e) => updateRedirect(index, 'oldUrl', e.target.value)}
                        className="w-full bg-transparent border-b border-[var(--border-subtle)] py-2 text-sm font-bold text-[var(--text-primary)] focus:border-[var(--accent-red)] focus:outline-none"
                      />
                   </div>
                   <div className="md:col-span-1 flex justify-center text-[var(--text-muted)]">
                      <ArrowRight className="w-4 h-4" />
                   </div>
                   <div className="md:col-span-4 relative">
                      <span className="absolute -top-6 left-1 text-[9px] font-black uppercase tracking-widest text-[var(--text-muted)] opacity-50">New URL</span>
                      <input 
                        type="text" 
                        value={r.newUrl}
                        onChange={(e) => updateRedirect(index, 'newUrl', e.target.value)}
                        className="w-full bg-transparent border-b border-[var(--border-subtle)] py-2 text-sm font-bold text-[var(--text-primary)] focus:border-[var(--accent-red)] focus:outline-none"
                      />
                   </div>
                   <div className="md:col-span-2 flex items-center justify-end gap-2">
                       <select 
                         value={r.type}
                         onChange={(e) => updateRedirect(index, 'type', e.target.value)}
                         className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-lg px-2 py-1 text-[10px] font-black italic text-[var(--accent-red)]"
                       >
                          <option value="301">301</option>
                          <option value="302">302</option>
                       </select>
                       <button 
                         onClick={() => removeRedirect(index)}
                         className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                       >
                          <Trash2 className="w-4 h-4" />
                       </button>
                   </div>
                </div>
             ))}
          </div>

          <button 
            onClick={addRedirect}
            className="w-full mt-8 py-4 border-2 border-dashed border-[var(--border-subtle)] rounded-2xl text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] hover:border-[var(--accent-red)] hover:text-[var(--accent-red)] transition-all flex items-center justify-center gap-2"
          >
             <Plus className="w-4 h-4" />
             Add Another Rule
          </button>
        </div>

        {/* Output Panel */}
        <div className="lg:col-span-12 xl:col-span-5 space-y-8">
           <ToolOutput 
             output={output} 
             language={platform === 'meta' ? 'html' : 'text'} 
             title={`${platform.toUpperCase()} Config`}
           />

           <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] p-8">
              <div className="flex items-center gap-3 mb-6">
                 <Terminal className="w-5 h-5 text-[var(--accent-yellow)]" />
                 <h4 className="text-xs font-black uppercase tracking-widest text-[var(--text-primary)]">Deployment Note</h4>
              </div>
              <ul className="space-y-4">
                 <li className="flex items-start gap-3">
                    <Server className="w-4 h-4 text-[var(--text-muted)] mt-0.5" />
                    <p className="text-[10px] text-[var(--text-secondary)] leading-relaxed italic">
                       <strong>Apache:</strong> Paste into your `.htaccess` file in the root directory. Requires `mod_rewrite` enabled.
                    </p>
                 </li>
                 <li className="flex items-start gap-3">
                    <Globe className="w-4 h-4 text-[var(--text-muted)] mt-0.5" />
                    <p className="text-[10px] text-[var(--text-secondary)] leading-relaxed italic">
                       <strong>Nginx:</strong> Place inside your `server { }` block and reload Nginx for changes to take effect.
                    </p>
                 </li>
              </ul>
           </div>
        </div>
      </div>
    </div>
  );
}
