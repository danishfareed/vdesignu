/**
 * Specialized Netlify & Vercel Redirect Generator
 * High-performance configuration for Jamstack deployments
 */
import { useState, useEffect } from 'react';
import { ArrowRightLeft, Plus, Trash2, Copy, Download, Info, Zap, Server } from 'lucide-react';
import ToolOutput from '../ToolOutput';

export default function JamstackRedirects() {
  const [platform, setPlatform] = useState('netlify');
  const [rules, setRules] = useState([
    { from: '/old-path', to: '/new-path', status: '301' }
  ]);
  const [output, setOutput] = useState('');

  const addRule = () => {
    setRules([...rules, { from: '', to: '', status: '301' }]);
  };

  const removeRule = (index: number) => {
    setRules(rules.filter((_, i) => i !== index));
  };

  const updateRule = (index: number, field: string, value: string) => {
    const newRules = [...rules];
    (newRules[index] as any)[field] = value;
    setRules(newRules);
  };

  useEffect(() => {
    if (platform === 'netlify') {
      const netlifyOutput = rules
        .filter(r => r.from && r.to)
        .map(r => `${r.from}  ${r.to}  ${r.status}`)
        .join('\n');
      setOutput(netlifyOutput);
    } else {
      const vercelConfig = {
        redirects: rules
          .filter(r => r.from && r.to)
          .map(r => ({
            source: r.from,
            destination: r.to,
            permanent: r.status === '301'
          }))
      };
      setOutput(JSON.stringify(vercelConfig, null, 2));
    }
  }, [platform, rules]);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Settings Panel */}
        <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] p-10 shadow-2xl">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-14 h-14 rounded-2xl bg-[var(--accent-red)] flex items-center justify-center text-white shadow-xl shadow-red-600/20">
              <Zap className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-black uppercase tracking-tight text-[var(--text-primary)]">Jamstack Router</h3>
              <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Edge Implementation</p>
            </div>
          </div>

          <div className="flex gap-4 p-2 bg-[var(--bg-primary)] rounded-2xl border border-[var(--border-subtle)] mb-8">
             <button 
               onClick={() => setPlatform('netlify')}
               className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase transition-all ${platform === 'netlify' ? 'bg-[var(--accent-red)] text-white shadow-lg' : 'text-[var(--text-muted)]'}`}
             >
                Netlify (_redirects)
             </button>
             <button 
               onClick={() => setPlatform('vercel')}
               className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase transition-all ${platform === 'vercel' ? 'bg-[var(--accent-red)] text-white shadow-lg' : 'text-[var(--text-muted)]'}`}
             >
                Vercel (vercel.json)
             </button>
          </div>

          <div className="space-y-4">
             {rules.map((rule, index) => (
                <div key={index} className="flex gap-2 items-end">
                   <div className="flex-1">
                      <label className="text-[9px] font-bold text-[var(--text-muted)] uppercase ml-1">Source</label>
                      <input
                        type="text"
                        value={rule.from}
                        onChange={(e) => updateRule(index, 'from', e.target.value)}
                        placeholder="/old"
                        className="w-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl py-2 px-3 text-xs"
                      />
                   </div>
                   <div className="flex-1">
                      <label className="text-[9px] font-bold text-[var(--text-muted)] uppercase ml-1">Destination</label>
                      <input
                        type="text"
                        value={rule.to}
                        onChange={(e) => updateRule(index, 'to', e.target.value)}
                        placeholder="/new"
                        className="w-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl py-2 px-3 text-xs"
                      />
                   </div>
                   <button onClick={() => removeRule(index)} className="p-3 text-red-500 hover:bg-red-50 rounded-xl">
                      <Trash2 className="w-4 h-4" />
                   </button>
                </div>
             ))}

             <button 
               onClick={addRule}
               className="w-full py-4 border-2 border-dashed border-[var(--border-subtle)] rounded-2xl text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] hover:border-[var(--accent-red)] transition-all flex items-center justify-center gap-2"
             >
                <Plus className="w-4 h-4" /> Add Mapping
             </button>
          </div>
        </div>

        {/* Output Panel */}
        <div className="space-y-8">
           <ToolOutput 
             output={output} 
             language={platform === 'netlify' ? 'text' : 'json'} 
             title={`${platform === 'netlify' ? '_redirects' : 'vercel.json'} Configuration`}
           />
           
           <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] p-8">
              <div className="flex items-center gap-3 mb-4 text-[var(--accent-red)]">
                 <Server className="w-5 h-5" />
                 <h4 className="text-[10px] font-black uppercase tracking-widest">Edge Redirect Standard</h4>
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed italic">
                 For performance-critical VDESIGNU apps, server-side redirects via platform configuration are 10x faster than client-side routing. This ensures link equity (SEO power) is transferred instantly without loading unnecessary scripts.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
