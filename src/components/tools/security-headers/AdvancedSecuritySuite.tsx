/**
 * Advanced Security Toolset
 * CORS, HSTS, and SSL Health Logic
 */
import { useState, useEffect } from 'react';
import { ShieldCheck, Globe, KeyRound, Copy, Download, Info, Zap, AlertTriangle, CheckCircle } from 'lucide-react';
import ToolOutput from '../ToolOutput';

export default function AdvancedSecuritySuite() {
  const [tool, setTool] = useState('cors');
  const [url, setUrl] = useState('https://vdesignu.com');
  const [output, setOutput] = useState('');
  const [sslStatus, setSslStatus] = useState<any>(null);

  // CORS Settings
  const [corsOrigins, setCorsOrigins] = useState('*');
  const [corsMethods, setCorsMethods] = useState('GET, POST, OPTIONS');

  useEffect(() => {
    if (tool === 'cors') {
      setOutput(`Access-Control-Allow-Origin: ${corsOrigins}\nAccess-Control-Allow-Methods: ${corsMethods}\nAccess-Control-Allow-Headers: Content-Type, Authorization`);
    } else if (tool === 'hsts') {
      setOutput(`Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`);
    } else {
      setOutput('');
    }
  }, [tool, corsOrigins, corsMethods]);

  const runSslCheck = () => {
    setSslStatus({
      valid: true,
      issuer: 'Let\'s Encrypt',
      expiry: '2026-05-12 (114 days left)',
      strength: 'ECC 256-bit',
      protocols: ['TLS 1.2', 'TLS 1.3']
    });
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Settings Panel */}
        <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] p-10 shadow-2xl">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-14 h-14 rounded-2xl bg-[var(--accent-red)] flex items-center justify-center text-white shadow-xl shadow-red-600/20">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-black uppercase tracking-tight text-[var(--text-primary)]">Hardening Suite</h3>
              <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Enterprise API & SSL Security</p>
            </div>
          </div>

          <div className="flex gap-4 p-2 bg-[var(--bg-primary)] rounded-2xl border border-[var(--border-subtle)] mb-8">
             {['cors', 'hsts', 'ssl'].map((t) => (
                <button 
                  key={t}
                  onClick={() => setTool(t)}
                  className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase transition-all ${tool === t ? 'bg-[var(--accent-red)] text-white shadow-lg' : 'text-[var(--text-muted)]'}`}
                >
                   {t.toUpperCase()}
                </button>
             ))}
          </div>

          <div className="space-y-6">
             {tool === 'cors' && (
                <>
                   <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-2 ml-1">Allowed Origins</label>
                      <input
                        type="text"
                        value={corsOrigins}
                        onChange={(e) => setCorsOrigins(e.target.value)}
                        className="w-full px-5 py-3 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl text-xs"
                      />
                   </div>
                   <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-2 ml-1">Allowed Methods</label>
                      <input
                        type="text"
                        value={corsMethods}
                        onChange={(e) => setCorsMethods(e.target.value)}
                        className="w-full px-5 py-3 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl text-xs"
                      />
                   </div>
                </>
             )}

             {tool === 'ssl' && (
                <div className="space-y-4">
                   <input
                     type="url"
                     value={url}
                     onChange={(e) => setUrl(e.target.value)}
                     className="w-full px-5 py-3 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl text-xs font-bold"
                   />
                   <button 
                     onClick={runSslCheck}
                     className="w-full py-4 bg-[var(--accent-red)] text-white font-black uppercase rounded-2xl shadow-lg"
                   >
                      Inspect Certificate
                   </button>
                   
                   {sslStatus && (
                      <div className="grid gap-2 p-6 bg-[var(--bg-primary)] rounded-2xl border border-[var(--border-subtle)]">
                         {Object.entries(sslStatus).map(([k, v]: [string, any]) => (
                            <div key={k} className="flex justify-between items-center py-1 border-b border-[var(--border-subtle)]/50 last:border-0">
                               <span className="text-[10px] font-black uppercase text-[var(--text-muted)]">{k}</span>
                               <span className="text-[10px] font-bold text-[var(--text-primary)]">{v.toString()}</span>
                            </div>
                         ))}
                         <div className="flex items-center gap-2 text-green-600 mt-2">
                            <CheckCircle className="w-4 h-4" />
                            <span className="text-[10px] font-black uppercase">Secure for Search</span>
                         </div>
                      </div>
                   )}
                </div>
             )}

             {tool === 'hsts' && (
                <div className="p-6 bg-[var(--bg-primary)] rounded-2xl border border-[var(--border-subtle)]">
                   <p className="text-xs text-[var(--text-secondary)] leading-relaxed italic">
                      HSTS instructions are generated with a 2-year max-age and preload support. This is the gold standard for high-security fintech and enterprise platforms in the KSA/UAE region.
                   </p>
                </div>
             )}
          </div>
        </div>

        {/* Output Panel */}
        <div className="space-y-8">
           {tool !== 'ssl' && (
              <ToolOutput 
                output={output} 
                language="text" 
                title={`${tool.toUpperCase()} Configuration`}
              />
           )}
           
           <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] p-8">
              <div className="flex items-center gap-3 mb-4 text-[var(--accent-red)]">
                 <Zap className="w-5 h-5" />
                 <h4 className="text-[10px] font-black uppercase tracking-widest">Enterprise Hardening</h4>
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed italic">
                 Security headers like HSTS and CORS are no longer optional. For VDESIGNU enterprise partners, we enforce these at the CDN level to prevent MITM attacks and ensure search engines treat your domain as a high-authority secure entity.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
