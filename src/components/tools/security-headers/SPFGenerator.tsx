/**
 * SPF Record Generator
 * Generates Sender Policy Framework DNS records
 */
import { useState } from 'react';
import { MailCheck, Copy, Plus, Trash2, CheckCircle } from 'lucide-react';

export default function SPFGenerator() {
  const [domain, setDomain] = useState('');
  const [includes, setIncludes] = useState<string[]>(['_spf.google.com']);
  const [ipv4, setIpv4] = useState<string[]>([]);
  const [ipv6, setIpv6] = useState<string[]>([]);
  const [allowAll, setAllowAll] = useState(false);
  const [policy, setPolicy] = useState<'~all' | '-all' | '?all'>('-all');
  const [copied, setCopied] = useState(false);

  const addInclude = () => setIncludes([...includes, '']);
  const removeInclude = (index: number) => setIncludes(includes.filter((_, i) => i !== index));
  const updateInclude = (index: number, value: string) => {
    const newIncludes = [...includes];
    newIncludes[index] = value;
    setIncludes(newIncludes);
  };

  const addIpv4 = () => setIpv4([...ipv4, '']);
  const removeIpv4 = (index: number) => setIpv4(ipv4.filter((_, i) => i !== index));
  const updateIpv4 = (index: number, value: string) => {
    const newIps = [...ipv4];
    newIps[index] = value;
    setIpv4(newIps);
  };

  const generateSPF = () => {
    let record = 'v=spf1';
    
    // Add includes
    includes.filter(i => i.trim()).forEach(inc => {
      record += ` include:${inc}`;
    });
    
    // Add IPv4
    ipv4.filter(ip => ip.trim()).forEach(ip => {
      record += ` ip4:${ip}`;
    });
    
    // Add IPv6
    ipv6.filter(ip => ip.trim()).forEach(ip => {
      record += ` ip6:${ip}`;
    });
    
    // Add policy
    record += ` ${policy}`;
    
    return record;
  };

  const copyRecord = () => {
    navigator.clipboard.writeText(generateSPF());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const spfRecord = generateSPF();

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Input Panel */}
        <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] p-10 shadow-2xl">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-14 h-14 rounded-2xl bg-[var(--accent-red)] flex items-center justify-center text-white shadow-xl">
              <MailCheck className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-black uppercase tracking-tight text-[var(--text-primary)]">SPF Generator</h3>
              <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Sender Policy Framework</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Domain */}
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-2">Your Domain</label>
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="example.com"
                className="w-full px-5 py-4 bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] rounded-2xl text-sm"
              />
            </div>

            {/* Includes */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">Include (Email Providers)</label>
                <button onClick={addInclude} className="text-[10px] font-bold text-[var(--accent-red)] flex items-center gap-1">
                  <Plus className="w-3 h-3" /> Add
                </button>
              </div>
              <div className="space-y-2">
                {includes.map((inc, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={inc}
                      onChange={(e) => updateInclude(index, e.target.value)}
                      placeholder="_spf.google.com"
                      className="flex-1 px-4 py-2 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl text-sm"
                    />
                    <button onClick={() => removeInclude(index)} className="p-2 text-red-500 hover:bg-red-100 rounded-lg">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {['_spf.google.com', 'spf.protection.outlook.com', 'amazonses.com', 'mailgun.org'].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => !includes.includes(preset) && setIncludes([...includes, preset])}
                    className="px-2 py-1 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded text-[9px] font-bold text-[var(--text-muted)] hover:border-[var(--accent-red)]"
                  >
                    + {preset}
                  </button>
                ))}
              </div>
            </div>

            {/* IPv4 */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">IP Addresses (IPv4)</label>
                <button onClick={addIpv4} className="text-[10px] font-bold text-[var(--accent-red)] flex items-center gap-1">
                  <Plus className="w-3 h-3" /> Add
                </button>
              </div>
              <div className="space-y-2">
                {ipv4.map((ip, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={ip}
                      onChange={(e) => updateIpv4(index, e.target.value)}
                      placeholder="192.168.1.1 or 192.168.1.0/24"
                      className="flex-1 px-4 py-2 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl text-sm"
                    />
                    <button onClick={() => removeIpv4(index)} className="p-2 text-red-500 hover:bg-red-100 rounded-lg">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Policy */}
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-2">Failure Policy</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setPolicy('-all')}
                  className={`p-3 rounded-xl text-center transition-all ${policy === '-all' ? 'bg-[var(--accent-red)] text-white' : 'bg-[var(--bg-primary)] border border-[var(--border-subtle)]'}`}
                >
                  <div className="text-xs font-black">-all</div>
                  <div className="text-[9px] opacity-75">Hard Fail</div>
                </button>
                <button
                  onClick={() => setPolicy('~all')}
                  className={`p-3 rounded-xl text-center transition-all ${policy === '~all' ? 'bg-[var(--accent-red)] text-white' : 'bg-[var(--bg-primary)] border border-[var(--border-subtle)]'}`}
                >
                  <div className="text-xs font-black">~all</div>
                  <div className="text-[9px] opacity-75">Soft Fail</div>
                </button>
                <button
                  onClick={() => setPolicy('?all')}
                  className={`p-3 rounded-xl text-center transition-all ${policy === '?all' ? 'bg-[var(--accent-red)] text-white' : 'bg-[var(--bg-primary)] border border-[var(--border-subtle)]'}`}
                >
                  <div className="text-xs font-black">?all</div>
                  <div className="text-[9px] opacity-75">Neutral</div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Output Panel */}
        <div className="space-y-8">
          <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] p-8">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-xs font-black uppercase tracking-widest text-[var(--text-primary)]">Generated SPF Record</h4>
              <button
                onClick={copyRecord}
                className="flex items-center gap-2 px-4 py-2 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl text-[10px] font-bold hover:bg-[var(--accent-red)] hover:text-white transition-all"
              >
                {copied ? <CheckCircle className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            
            <div className="p-6 bg-[var(--bg-primary)] rounded-2xl border border-[var(--border-subtle)]">
              <p className="text-[10px] text-[var(--text-muted)] mb-2">TXT Record Value:</p>
              <code className="text-sm text-[var(--text-primary)] font-mono break-all">{spfRecord}</code>
            </div>
          </div>

          {/* DNS Instructions */}
          <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] p-8">
            <h4 className="text-xs font-black uppercase tracking-widest text-[var(--text-primary)] mb-4">DNS Configuration</h4>
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-[var(--bg-primary)] rounded-xl">
                <span className="text-[var(--text-muted)]">Type:</span>
                <span className="ml-2 font-bold text-[var(--text-primary)]">TXT</span>
              </div>
              <div className="p-3 bg-[var(--bg-primary)] rounded-xl">
                <span className="text-[var(--text-muted)]">Host:</span>
                <span className="ml-2 font-bold text-[var(--text-primary)]">@ (or {domain || 'yourdomain.com'})</span>
              </div>
              <div className="p-3 bg-[var(--bg-primary)] rounded-xl">
                <span className="text-[var(--text-muted)]">TTL:</span>
                <span className="ml-2 font-bold text-[var(--text-primary)]">3600 (1 hour)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
