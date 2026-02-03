/**
 * Site Migration Mastery Tools
 * Specialized Redirect Builders (Apache/Nginx) & SEO Checklist
 */
import { useState } from 'react';
import { ClipboardList, Server, Terminal, CheckCircle, Info, Zap, ArrowRight, Download, Copy, AlertCircle } from 'lucide-react';
import ToolOutput from '../ToolOutput';

export default function MigrationMastery() {
  const [tool, setTool] = useState('checklist');
  const [redirectType, setRedirectType] = useState('apache');
  const [rules, setRules] = useState('Redirect 301 /old-page https://vdesignu.com/new-page');

  const checklistItems = [
    { id: 1, text: 'Audit existing URL structure and traffic', done: false },
    { id: 2, text: 'Map old URLs to new URLs (1-to-1)', done: false },
    { id: 3, text: 'Setup 301 redirects on destination server', done: false },
    { id: 4, text: 'Update internal links to new structure', done: false },
    { id: 5, text: 'Update XML sitemap and robots.txt', done: false },
    { id: 6, text: 'Submit new sitemap to Search Console', done: false },
    { id: 7, text: 'Monitor 404 errors and index coverage', done: false }
  ];

  const [items, setItems] = useState(checklistItems);

  const toggle = (id: number) => {
    setItems(items.map(i => i.id === id ? { ...i, done: !i.done } : i));
  };

  const generateRedirect = (type: string) => {
     setRedirectType(type);
     if (type === 'apache') {
        setRules('Redirect 301 /old-page https://vdesignu.com/new-page\nRewriteRule ^old-path/(.*)$ /new-path/$1 [R=301,L]');
     } else {
        setRules('rewrite ^/old-page$ https://vdesignu.com/new-page permanent;\nlocation ~ ^/old-path/(.*)$ {\n   return 301 /new-path/$1;\n}');
     }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Settings Panel */}
        <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] p-10 shadow-2xl">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-14 h-14 rounded-2xl bg-[var(--accent-red)] flex items-center justify-center text-white shadow-xl shadow-red-600/20">
              <ClipboardList className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-black uppercase tracking-tight text-[var(--text-primary)]">Migration Engine</h3>
              <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">SEO Pre-Flight Control</p>
            </div>
          </div>

          <div className="flex gap-4 p-2 bg-[var(--bg-primary)] rounded-2xl border border-[var(--border-subtle)] mb-8">
             <button 
               onClick={() => setTool('checklist')}
               className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase transition-all ${tool === 'checklist' ? 'bg-[var(--accent-red)] text-white shadow-lg' : 'text-[var(--text-muted)]'}`}
             >
                Checklist
             </button>
             <button 
               onClick={() => setTool('config')}
               className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase transition-all ${tool === 'config' ? 'bg-[var(--accent-red)] text-white shadow-lg' : 'text-[var(--text-muted)]'}`}
             >
                Server Config
             </button>
          </div>

          <div className="space-y-4">
             {tool === 'checklist' ? (
                <div className="space-y-3">
                   {items.map((item) => (
                      <div 
                        key={item.id} 
                        onClick={() => toggle(item.id)}
                        className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center gap-3 ${item.done ? 'bg-green-50 border-green-200 text-green-700' : 'bg-[var(--bg-primary)] border-[var(--border-subtle)]'}`}
                      >
                         {item.done ? <CheckCircle className="w-5 h-5" /> : <div className="w-5 h-5 rounded-full border-2 border-[var(--border-subtle)]" />}
                         <span className={`text-xs font-bold ${item.done ? 'line-through opacity-70' : ''}`}>{item.text}</span>
                      </div>
                   ))}
                </div>
             ) : (
                <div className="space-y-6">
                   <div className="flex gap-3">
                      <button 
                        onClick={() => generateRedirect('apache')}
                        className={`flex-1 py-3 rounded-xl border-2 text-[9px] font-black uppercase tracking-widest transition-all ${redirectType === 'apache' ? 'border-[var(--accent-red)] text-[var(--accent-red)] bg-[var(--accent-red)]/5' : 'border-[var(--border-subtle)] text-[var(--text-muted)]'}`}
                      >
                         <Server className="w-3 h-3 mx-auto mb-1" /> Apache (.htaccess)
                      </button>
                      <button 
                        onClick={() => generateRedirect('nginx')}
                        className={`flex-1 py-3 rounded-xl border-2 text-[9px] font-black uppercase tracking-widest transition-all ${redirectType === 'nginx' ? 'border-[var(--accent-red)] text-[var(--accent-red)] bg-[var(--accent-red)]/5' : 'border-[var(--border-subtle)] text-[var(--text-muted)]'}`}
                      >
                         <Terminal className="w-3 h-3 mx-auto mb-1" /> Nginx (conf)
                      </button>
                   </div>
                   <p className="text-[10px] text-[var(--text-muted)] italic leading-relaxed">
                      Server-side redirects are the only way to ensure 100% SEO equity transfer. Client-side JS redirects are NOT recommended for migrations.
                   </p>
                </div>
             )}
          </div>
        </div>

        {/* Output Panel */}
        <div className="space-y-8">
           {tool === 'config' && (
              <ToolOutput 
                output={rules} 
                language="text" 
                title={`${redirectType.toUpperCase()} Redirect Rules`}
              />
           )}
           
           <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] p-8">
              <div className="flex items-center gap-3 mb-4 text-[var(--accent-red)]">
                 <Zap className="w-5 h-5" />
                 <h4 className="text-[10px] font-black uppercase tracking-widest">Zero-Loss Migration</h4>
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed italic">
                 A failed site migration is the fastest way to lose years of SEO progress. For VDESIGNU enterprise relaunches, we follow this strict pre-flight checklist to ensure your visibility in Dubai and Riyadh search results actually increases post-migration.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
