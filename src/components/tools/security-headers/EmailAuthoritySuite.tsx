/**
 * Email Authority Suite
 * SPF, DKIM, and DMARC Generator
 */
import { useState, useEffect } from 'react';
import { Mail, ShieldCheck, Lock, Copy, Download, Info, Zap, Server, Shield } from 'lucide-react';
import ToolOutput from '../ToolOutput';

export default function EmailAuthoritySuite() {
  const [tool, setTool] = useState('spf');
  const [domain, setDomain] = useState('vdesignu.com');
  const [output, setOutput] = useState('');

  useEffect(() => {
    if (tool === 'spf') {
      setOutput(`v=spf1 include:_spf.google.com include:sendgrid.net ~all`);
    } else if (tool === 'dmarc') {
      setOutput(`v=DMARC1; p=quarantine; rua=mailto:security@${domain}; ruf=mailto:security@${domain}; fo=1`);
    } else {
      setOutput(`v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAv...`);
    }
  }, [tool, domain]);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Settings Panel */}
        <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] p-10 shadow-2xl">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-14 h-14 rounded-2xl bg-[var(--accent-red)] flex items-center justify-center text-white shadow-xl shadow-red-600/20">
               <Mail className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-black uppercase tracking-tight text-[var(--text-primary)]">Deliverability HQ</h3>
              <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Email DNS Authority</p>
            </div>
          </div>

          <div className="flex gap-4 p-2 bg-[var(--bg-primary)] rounded-2xl border border-[var(--border-subtle)] mb-8">
             {['spf', 'dkim', 'dmarc'].map((t) => (
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
             <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-3 ml-1">Your Domain</label>
                <input
                  type="text"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  className="w-full px-6 py-4 bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] rounded-2xl font-bold"
                />
             </div>

             <div className="p-6 bg-[var(--bg-primary)] rounded-2xl border border-[var(--border-subtle)] flex items-center gap-4">
                <Shield className="w-10 h-10 text-[var(--accent-red)] opacity-30" />
                <p className="text-[10px] text-[var(--text-muted)] italic leading-relaxed">
                   Proper email authentication prevents domain spoofing and ensures your professional B2B communications land in the inbox, not the spam folder.
                </p>
             </div>
          </div>
        </div>

        {/* Output Panel */}
        <div className="space-y-8">
           <ToolOutput 
             output={output} 
             language="text" 
             title={`${tool.toUpperCase()} DNS Record`}
           />
           
           <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] p-8">
              <div className="flex items-center gap-3 mb-4 text-[var(--accent-red)]">
                 <Server className="w-5 h-5" />
                 <h4 className="text-[10px] font-black uppercase tracking-widest">Enterprise Trust</h4>
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed italic">
                 For VDESIGNU enterprise partners, email security is a core component of domain authority. High-integrity DNS records signal to both mail servers and search engines that your infrastructure is secure and high-trust.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
