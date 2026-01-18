/**
 * HTTP Security Headers Generator
 * Generates security configurations for .htaccess and Nginx
 */
import { useState, useEffect } from 'react';
import { Shield, ShieldAlert, Lock, Copy, RefreshCw, Info } from 'lucide-react';
import ToolOutput from '../ToolOutput';

export default function SecurityHeaders() {
  const [config, setConfig] = useState({
    xFrameOptions: 'SAMEORIGIN',
    xssProtection: '1; mode=block',
    contentTypeOptions: 'nosniff',
    referrerPolicy: 'strict-origin-when-cross-origin',
    hsts: true,
    hstsMaxAge: '31536000'
  });

  const [platform, setPlatform] = useState<'apache' | 'nginx'>('apache');
  const [output, setOutput] = useState('');

  useEffect(() => {
    let result = '';
    
    if (platform === 'apache') {
      result = `<IfModule mod_headers.c>\n`;
      result += `  Header set X-Frame-Options "${config.xFrameOptions}"\n`;
      result += `  Header set X-XSS-Protection "${config.xssProtection}"\n`;
      result += `  Header set X-Content-Type-Options "${config.contentTypeOptions}"\n`;
      result += `  Header set Referrer-Policy "${config.referrerPolicy}"\n`;
      if (config.hsts) {
        result += `  Header set Strict-Transport-Security "max-age=${config.hstsMaxAge}; includeSubDomains; preload"\n`;
      }
      result += `</IfModule>`;
    } else {
      result += `add_header X-Frame-Options "${config.xFrameOptions}" always;\n`;
      result += `add_header X-XSS-Protection "${config.xssProtection}" always;\n`;
      result += `add_header X-Content-Type-Options "${config.contentTypeOptions}" always;\n`;
      result += `add_header Referrer-Policy "${config.referrerPolicy}" always;\n`;
      if (config.hsts) {
        result += `add_header Strict-Transport-Security "max-age=${config.hstsMaxAge}; includeSubDomains; preload" always;\n`;
      }
    }

    setOutput(result);
  }, [config, platform]);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Settings Panel */}
        <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] p-10 shadow-2xl">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[var(--accent-red)] flex items-center justify-center text-white shadow-xl shadow-red-600/20">
                <Shield className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-black uppercase tracking-tight text-[var(--text-primary)]">Security Policy</h3>
                <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Header Hardening</p>
              </div>
            </div>
            
            <div className="flex bg-[var(--bg-primary)] p-1 rounded-xl border border-[var(--border-subtle)]">
               <button 
                 onClick={() => setPlatform('apache')}
                 className={`px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-lg transition-all ${platform === 'apache' ? 'bg-[var(--accent-red)] text-white' : 'text-[var(--text-muted)]'}`}
               >
                  Apache
               </button>
               <button 
                 onClick={() => setPlatform('nginx')}
                 className={`px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-lg transition-all ${platform === 'nginx' ? 'bg-[var(--accent-red)] text-white' : 'text-[var(--text-muted)]'}`}
               >
                  Nginx
               </button>
            </div>
          </div>

          <div className="space-y-6">
             <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3 ml-1">X-Frame-Options</label>
                <select 
                  value={config.xFrameOptions}
                  onChange={(e) => setConfig({...config, xFrameOptions: e.target.value})}
                  className="w-full px-6 py-4 bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] rounded-2xl text-[var(--text-primary)] font-bold focus:border-[var(--accent-red)] focus:outline-none"
                >
                   <option value="DENY">DENY (Strict)</option>
                   <option value="SAMEORIGIN">SAMEORIGIN (Recommended)</option>
                </select>
             </div>

             <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3 ml-1">XSS Protection</label>
                   <select 
                     value={config.xssProtection}
                     onChange={(e) => setConfig({...config, xssProtection: e.target.value})}
                     className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl text-[var(--text-primary)] font-bold focus:border-[var(--accent-red)] focus:outline-none"
                   >
                      <option value="1; mode=block">Enabled (Block)</option>
                      <option value="0">Disabled</option>
                   </select>
                </div>
                <div>
                   <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3 ml-1">Content Type</label>
                   <select 
                     value={config.contentTypeOptions}
                     onChange={(e) => setConfig({...config, contentTypeOptions: e.target.value})}
                     className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl text-[var(--text-primary)] font-bold focus:border-[var(--accent-red)] focus:outline-none"
                   >
                      <option value="nosniff">Nosniff</option>
                      <option value="">None</option>
                   </select>
                </div>
             </div>

             <div className="p-6 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-3xl space-y-4">
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-2">
                       <ShieldAlert className="w-4 h-4 text-[var(--accent-red)]" />
                       <span className="text-xs font-black uppercase tracking-widest text-[var(--text-primary)]">Strict-Transport-Security (HSTS)</span>
                   </div>
                   <input 
                     type="checkbox"
                     checked={config.hsts}
                     onChange={(e) => setConfig({...config, hsts: e.target.checked})}
                     className="w-5 h-5 accent-[var(--accent-red)]"
                   />
                </div>
                {config.hsts && (
                   <div className="flex items-center gap-4 animate-in fade-in slide-in-from-top-2">
                      <select 
                        value={config.hstsMaxAge}
                        onChange={(e) => setConfig({...config, hstsMaxAge: e.target.value})}
                        className="flex-1 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl px-4 py-2 text-xs font-bold"
                      >
                         <option value="31536000">1 Year (31536000)</option>
                         <option value="63072000">2 Years (63072000)</option>
                         <option value="15768000">6 Months (15768000)</option>
                      </select>
                      <span className="text-[10px] font-black uppercase text-[var(--text-muted)] italic">Seconds</span>
                   </div>
                )}
             </div>
          </div>
        </div>

        {/* Output Panel */}
        <div className="space-y-8">
           <ToolOutput 
             output={output} 
             language="text" 
             title={`${platform.toUpperCase()} Config`}
           />
           
           <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] p-8">
              <div className="flex items-center gap-3 mb-4 text-[var(--accent-red)]">
                 <Lock className="w-5 h-5" />
                 <h4 className="text-[10px] font-black uppercase tracking-widest">Security Advantage</h4>
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
                 HTTP security headers protect your site from <strong>Clickjacking, XSS attacks, and packet sniffing</strong>. Modern SEO algorithms also favor secure sites that implement HSTS and strict Referrer Policies.
              </p>
              <div className="flex items-center gap-2 p-3 bg-[var(--bg-primary)] rounded-xl border border-[var(--border-subtle)]">
                 <RefreshCw className="w-3 h-3 text-[var(--text-muted)] animate-spin-slow" />
                 <span className="text-[10px] font-black uppercase tracking-tighter text-[var(--text-muted)]">
                    Always test config in a staging environment first.
                 </span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
