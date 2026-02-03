/**
 * UTM Parameter Validator
 * Validates tracking URLs for errors and consistency
 */
import { useState } from 'react';
import { Target, CheckCircle, AlertCircle, Copy, Info, BarChart } from 'lucide-react';
import ToolOutput from '../ToolOutput';

export default function UTMValidator() {
  const [url, setUrl] = useState('');
  const [results, setResults] = useState<any[]>([]);

  const validate = () => {
    const findings = [];
    try {
      const parsed = new URL(url);
      const params = parsed.searchParams;

      // Required params
      if (!params.get('utm_source')) findings.push({ type: 'error', msg: 'Missing utm_source (Required)' });
      if (!params.get('utm_medium')) findings.push({ type: 'error', msg: 'Missing utm_medium (Required)' });
      if (!params.get('utm_campaign')) findings.push({ type: 'error', msg: 'Missing utm_campaign (Required)' });

      // Best practices
      params.forEach((val, key) => {
        if (key.startsWith('utm_')) {
          if (/[A-Z]/.test(val)) findings.push({ type: 'warning', msg: `${key} contains uppercase (Inconsistent)` });
          if (val.includes(' ')) findings.push({ type: 'warning', msg: `${key} contains spaces (Use underscores)` });
        }
      });

      if (findings.length === 0) findings.push({ type: 'success', msg: 'All UTM parameters are valid and optimized.' });
    } catch (e) {
      findings.push({ type: 'error', msg: 'Invalid URL Format' });
    }
    setResults(findings);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[3rem] p-10 shadow-2xl mb-12">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-14 h-14 rounded-2xl bg-[var(--accent-red)] flex items-center justify-center text-white shadow-xl shadow-red-600/20">
            <Target className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-xl font-black uppercase tracking-tight text-[var(--text-primary)]">Tracking Integrity</h3>
            <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">UTM Validator & Best Practices</p>
          </div>
        </div>

        <div className="space-y-6">
           <div className="flex gap-4">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://vdesignu.com/?utm_source=google&utm_medium=cpc..."
                className="flex-1 px-6 py-4 bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] rounded-2xl text-[var(--text-primary)] font-bold focus:border-[var(--accent-red)] focus:outline-none transition-all"
              />
              <button 
                onClick={validate}
                className="px-10 py-4 bg-[var(--accent-red)] text-white font-black uppercase rounded-2xl hover:bg-black transition-all"
              >
                 Validate
              </button>
           </div>

           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {results.map((f, i) => (
                 <div key={i} className={`p-4 rounded-xl border flex items-center gap-3 ${f.type === 'error' ? 'bg-red-50 border-red-200 text-red-600' : f.type === 'warning' ? 'bg-yellow-50 border-yellow-200 text-yellow-700' : 'bg-green-50 border-green-200 text-green-600'}`}>
                    {f.type === 'error' ? <AlertCircle className="w-4 h-4" /> : f.type === 'warning' ? <AlertCircle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                    <span className="text-[10px] font-black uppercase tracking-tight">{f.msg}</span>
                 </div>
              ))}
           </div>
        </div>
      </div>

      <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] p-10">
         <div className="flex items-center gap-3 mb-6">
            <BarChart className="w-5 h-5 text-[var(--accent-red)]" />
            <h4 className="text-xs font-black uppercase tracking-widest text-[var(--text-primary)]">Why Validation Matters?</h4>
         </div>
         <p className="text-sm text-[var(--text-secondary)] leading-relaxed italic">
            Inconsistent UTM parameters (e.g., using "Facebook" and "facebook") split your data in Google Analytics, making it impossible to calculate true ROI. VDESIGNU recommends using lowercase only and avoiding spaces to maintain 100% data integrity.
         </p>
      </div>
    </div>
  );
}
