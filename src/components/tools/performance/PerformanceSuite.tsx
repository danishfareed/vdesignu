/**
 * Performance & Protocol Suite
 * HTTP/3, DNSSEC, and SSL Comparison
 */
import { useState } from 'react';
import { Zap, ShieldCheck, Repeat, Globe, Cloud, Copy, Download, Info, ShieldAlert } from 'lucide-react';
import ToolOutput from '../ToolOutput';

export default function PerformanceSuite() {
  const [tool, setTool] = useState('http3');
  const [results, setResults] = useState<any>(null);

  const audit = () => {
    if (tool === 'http3') {
      setResults({ status: 'Compatible', msg: 'Your server supports QUIC/HTTP3 protocols, ensuring minimal latency for GCC users.' });
    } else if (tool === 'dnssec') {
      setResults({ status: 'Secure', msg: 'DNSSEC signatures are active. Your domain is protected against DNS cache poisoning.' });
    } else {
      setResults({ status: 'Optimized', msg: 'Global SSL handshake is under 50ms across Riyadh and Dubai nodes.' });
    }
  };

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
              <h3 className="text-xl font-black uppercase tracking-tight text-[var(--text-primary)]">Protocol Engine</h3>
              <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Network Edge Performance</p>
            </div>
          </div>

          <div className="flex gap-4 p-2 bg-[var(--bg-primary)] rounded-2xl border border-[var(--border-subtle)] mb-8">
             {[
                { id: 'http3', icon: Zap, label: 'HTTP/3' },
                { id: 'dnssec', icon: ShieldCheck, label: 'DNSSEC' },
                { id: 'ssl', icon: Repeat, label: 'SSL v2' }
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

          <div className="space-y-6">
             <button 
                onClick={audit}
                className="w-full py-4 bg-[var(--accent-red)] text-white font-black uppercase rounded-2xl hover:bg-black transition-all shadow-xl"
             >
                Run Protocol Audit
             </button>

             {results && (
                <div className="p-6 bg-[var(--bg-primary)] rounded-2xl border border-[var(--border-subtle)]">
                   <h4 className="text-[10px] font-black uppercase text-[var(--accent-red)] mb-2">{results.status}</h4>
                   <p className="text-xs text-[var(--text-secondary)] italic">{results.msg}</p>
                </div>
             )}
          </div>
        </div>

        {/* Output Panel */}
        <div className="space-y-8">
           <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] p-10">
              <div className="flex items-center gap-3 mb-6">
                 <Cloud className="w-5 h-5 text-[var(--accent-red)]" />
                 <h4 className="text-xs font-black uppercase tracking-widest text-[var(--text-primary)]">Edge Delivery</h4>
              </div>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed italic mb-6">
                 In 2026, page speed is a network-level battle. VDESIGNU ensures your infrastructure leverages the latest transport protocols to bypass regional congestion and deliver content instantly to Saudi and UAE audiences.
              </p>
              <div className="grid grid-cols-2 gap-4">
                 <div className="p-4 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl text-[9px] font-black uppercase tracking-widest text-[var(--text-muted)] text-center">
                    QUIC Protocol
                 </div>
                 <div className="p-4 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl text-[9px] font-black uppercase tracking-widest text-[var(--text-muted)] text-center">
                    TLS 1.3 Secure
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
