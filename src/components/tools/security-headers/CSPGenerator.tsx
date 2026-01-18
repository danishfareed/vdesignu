/**
 * Content Security Policy (CSP) Generator
 * Hardening your site against XSS and data injection attacks
 */
import { useState, useEffect } from 'react';
import { ShieldAlert, Plus, Trash2, Copy, Download, Info, Lock } from 'lucide-react';
import ToolOutput from '../ToolOutput';

export default function CSPGenerator() {
  const [directives, setDirectives] = useState([
    { name: 'default-src', value: "'self'" },
    { name: 'script-src', value: "'self' 'unsafe-inline' https://www.google-analytics.com" },
    { name: 'style-src', value: "'self' 'unsafe-inline' https://fonts.googleapis.com" },
    { name: 'img-src', value: "'self' data: https:" }
  ]);

  const [output, setOutput] = useState('');

  const addDirective = () => {
    setDirectives([...directives, { name: '', value: '' }]);
  };

  const removeDirective = (index: number) => {
    setDirectives(directives.filter((_, i) => i !== index));
  };

  const updateDirective = (index: number, field: string, value: string) => {
    const newDirectives = [...directives];
    (newDirectives[index] as any)[field] = value;
    setDirectives(newDirectives);
  };

  useEffect(() => {
    const result = directives
      .filter(d => d.name && d.value)
      .map(d => `${d.name} ${d.value}`)
      .join('; ');

    setOutput(`Content-Security-Policy: ${result};`);
  }, [directives]);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Settings Panel */}
        <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] p-10 shadow-2xl">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-14 h-14 rounded-2xl bg-[var(--accent-red)] flex items-center justify-center text-white shadow-xl shadow-red-600/20">
              <Lock className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-black uppercase tracking-tight text-[var(--text-primary)]">Security Hardening</h3>
              <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">CSP Policy Builder</p>
            </div>
          </div>

          <div className="space-y-4">
             {directives.map((d, index) => (
                <div key={index} className="flex gap-2 items-center">
                   <select
                     value={d.name}
                     onChange={(e) => updateDirective(index, 'name', e.target.value)}
                     className="w-1/3 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl py-3 px-4 text-[10px] font-black uppercase"
                   >
                      <option value="">Choose Directive</option>
                      <option value="default-src">default-src</option>
                      <option value="script-src">script-src</option>
                      <option value="style-src">style-src</option>
                      <option value="img-src">img-src</option>
                      <option value="font-src">font-src</option>
                      <option value="connect-src">connect-src</option>
                      <option value="frame-src">frame-src</option>
                   </select>
                   <input
                     type="text"
                     value={d.value}
                     onChange={(e) => updateDirective(index, 'value', e.target.value)}
                     placeholder="'self' https://..."
                     className="flex-1 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl py-3 px-4 text-xs"
                   />
                   <button onClick={() => removeDirective(index)} className="p-3 text-red-500 hover:bg-red-50 rounded-xl">
                      <Trash2 className="w-4 h-4" />
                   </button>
                </div>
             ))}

             <button 
               onClick={addDirective}
               className="w-full py-4 border-2 border-dashed border-[var(--border-subtle)] rounded-2xl text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] hover:border-[var(--accent-red)] transition-all flex items-center justify-center gap-2"
             >
                <Plus className="w-4 h-4" /> Add Directive
             </button>
          </div>
        </div>

        {/* Output Panel */}
        <div className="space-y-8">
           <ToolOutput 
             output={output} 
             language="text" 
             title="HTTP Security Header"
           />
           
           <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] p-8">
              <div className="flex items-center gap-3 mb-4 text-[var(--accent-red)]">
                 <ShieldAlert className="w-5 h-5" />
                 <h4 className="text-[10px] font-black uppercase tracking-widest">XSS Prevention</h4>
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed italic">
                 Content Security Policy (CSP) is the most powerful browser-level defense against Cross-Site Scripting (XSS). For VDESIGNU clients, we strictly enforce CSP to ensure user data remains secure and search engines trust your domain's integrity.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
