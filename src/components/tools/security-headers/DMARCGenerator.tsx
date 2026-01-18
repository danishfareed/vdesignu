/**
 * DMARC Policy Generator
 * Generates DMARC DNS records for email authentication
 */
import { useState } from 'react';
import { ShieldPlus, Copy, CheckCircle, AlertTriangle } from 'lucide-react';

export default function DMARCGenerator() {
  const [domain, setDomain] = useState('');
  const [policy, setPolicy] = useState<'none' | 'quarantine' | 'reject'>('none');
  const [subdomainPolicy, setSubdomainPolicy] = useState<'none' | 'quarantine' | 'reject'>('none');
  const [percentage, setPercentage] = useState(100);
  const [reportEmail, setReportEmail] = useState('');
  const [forensicEmail, setForensicEmail] = useState('');
  const [copied, setCopied] = useState(false);

  const generateDMARC = () => {
    let record = 'v=DMARC1';
    record += `; p=${policy}`;
    
    if (subdomainPolicy !== policy) {
      record += `; sp=${subdomainPolicy}`;
    }
    
    if (percentage < 100) {
      record += `; pct=${percentage}`;
    }
    
    if (reportEmail) {
      record += `; rua=mailto:${reportEmail}`;
    }
    
    if (forensicEmail) {
      record += `; ruf=mailto:${forensicEmail}`;
    }
    
    record += '; adkim=r; aspf=r';
    
    return record;
  };

  const copyRecord = () => {
    navigator.clipboard.writeText(generateDMARC());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const dmarcRecord = generateDMARC();

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Input Panel */}
        <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] p-10 shadow-2xl">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-14 h-14 rounded-2xl bg-[var(--accent-red)] flex items-center justify-center text-white shadow-xl">
              <ShieldPlus className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-black uppercase tracking-tight text-[var(--text-primary)]">DMARC Generator</h3>
              <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Email Authentication Policy</p>
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

            {/* Policy */}
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-2">Domain Policy</label>
              <div className="grid grid-cols-3 gap-2">
                {(['none', 'quarantine', 'reject'] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPolicy(p)}
                    className={`p-3 rounded-xl text-center transition-all ${policy === p ? 'bg-[var(--accent-red)] text-white' : 'bg-[var(--bg-primary)] border border-[var(--border-subtle)]'}`}
                  >
                    <div className="text-xs font-black uppercase">{p}</div>
                    <div className="text-[9px] opacity-75">
                      {p === 'none' && 'Monitor Only'}
                      {p === 'quarantine' && 'Mark Suspicious'}
                      {p === 'reject' && 'Block Failed'}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Subdomain Policy */}
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-2">Subdomain Policy</label>
              <select
                value={subdomainPolicy}
                onChange={(e) => setSubdomainPolicy(e.target.value as any)}
                className="w-full px-5 py-4 bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] rounded-2xl text-sm"
              >
                <option value="none">None (Monitor)</option>
                <option value="quarantine">Quarantine</option>
                <option value="reject">Reject</option>
              </select>
            </div>

            {/* Percentage */}
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-2">
                Policy Percentage: {percentage}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={percentage}
                onChange={(e) => setPercentage(parseInt(e.target.value))}
                className="w-full"
              />
              <p className="text-[10px] text-[var(--text-muted)] mt-1">
                Percentage of messages the policy applies to (start low during testing)
              </p>
            </div>

            {/* Report Email */}
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-2">Aggregate Reports Email</label>
              <input
                type="email"
                value={reportEmail}
                onChange={(e) => setReportEmail(e.target.value)}
                placeholder="dmarc-reports@yourdomain.com"
                className="w-full px-5 py-4 bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] rounded-2xl text-sm"
              />
            </div>
          </div>
        </div>

        {/* Output Panel */}
        <div className="space-y-8">
          <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] p-8">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-xs font-black uppercase tracking-widest text-[var(--text-primary)]">Generated DMARC Record</h4>
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
              <code className="text-sm text-[var(--text-primary)] font-mono break-all">{dmarcRecord}</code>
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
                <span className="ml-2 font-bold text-[var(--text-primary)]">_dmarc.{domain || 'yourdomain.com'}</span>
              </div>
              <div className="p-3 bg-[var(--bg-primary)] rounded-xl">
                <span className="text-[var(--text-muted)]">TTL:</span>
                <span className="ml-2 font-bold text-[var(--text-primary)]">3600 (1 hour)</span>
              </div>
            </div>
          </div>

          {/* Warning */}
          {policy === 'reject' && <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 p-6 rounded-2xl">
                  <h4 className="flex items-center gap-2 text-sm font-black uppercase tracking-wider text-gray-900 dark:text-amber-400 mb-3">
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                    DNS Propagation
                  </h4>
                  <p className="text-xs text-gray-700 dark:text-amber-200 leading-relaxed">
                    DNS changes can take up to 48 hours to propagate globally. Don't worry if your DMARC record isn't visible immediately.
                  </p>
                </div>
          }
        </div>
      </div>
    </div>
  );
}
