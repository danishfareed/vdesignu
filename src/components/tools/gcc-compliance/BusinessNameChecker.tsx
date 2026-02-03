/**
 * UAE & KSA Business Name Checker
 * Validates brand names against regional linguistic and legal standards
 */
import { useState } from 'react';
import { BadgeCheck, Search, ShieldCheck, Copy, Info, AlertCircle, CheckCircle } from 'lucide-react';
import ToolOutput from '../ToolOutput';

export default function BusinessNameChecker() {
  const [name, setName] = useState('');
  const [results, setResults] = useState<any[]>([]);

  const check = () => {
    const findings = [];
    if (!name) return;

    // Linguistic check
    if (/[@#$%^&*()]/.test(name)) findings.push({ type: 'error', msg: 'Name contains illegal special characters' });
    
    // GCC Standards
    if (name.length < 3) findings.push({ type: 'error', msg: 'Minimum 3 characters required' });
    if (name.toLowerCase().includes('god') || name.toLowerCase().includes('allah')) {
      findings.push({ type: 'error', msg: 'Sensitive religious terms are restricted' });
    }

    // Professional advice
    if (name.includes(' ')) {
      findings.push({ type: 'info', msg: 'Multi-word names require linguistic approval in UAE' });
    }

    if (findings.length === 0) {
      findings.push({ type: 'success', msg: 'Brand name follows standard GCC naming conventions.' });
    }

    setResults(findings);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[3rem] p-10 shadow-2xl mb-12">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-14 h-14 rounded-2xl bg-[var(--accent-red)] flex items-center justify-center text-white shadow-xl shadow-red-600/20">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-xl font-black uppercase tracking-tight text-[var(--text-primary)]">Corporate Branding</h3>
            <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Business Name Feasibility</p>
          </div>
        </div>

        <div className="space-y-6">
           <div className="flex gap-4">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter proposed business name..."
                className="flex-1 px-6 py-4 bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] rounded-2xl text-[var(--text-primary)] font-bold focus:border-[var(--accent-red)] focus:outline-none transition-all"
              />
              <button 
                onClick={check}
                className="px-10 py-4 bg-[var(--accent-red)] text-white font-black uppercase rounded-2xl hover:bg-black transition-all shadow-xl"
              >
                 Check
              </button>
           </div>

           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {results.map((f, i) => (
                 <div key={i} className={`p-4 rounded-xl border flex items-center gap-3 ${f.type === 'error' ? 'bg-red-50 border-red-200 text-red-600' : f.type === 'warning' ? 'bg-yellow-50 border-yellow-200 text-yellow-700' : 'bg-green-50 border-green-200 text-green-600'}`}>
                    {f.type === 'error' ? <AlertCircle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                    <span className="text-[10px] font-black uppercase tracking-tight">{f.msg}</span>
                 </div>
              ))}
           </div>
        </div>
      </div>

      <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] p-10">
         <div className="flex items-center gap-3 mb-6">
            <BadgeCheck className="w-5 h-5 text-[var(--accent-red)]" />
            <h4 className="text-xs font-black uppercase tracking-widest text-[var(--text-primary)]">Regional Registration Tip</h4>
         </div>
         <p className="text-sm text-[var(--text-secondary)] leading-relaxed italic">
            In markets like Dubai and Riyadh, your business name must be translatable into Arabic and should not conflict with existing brands. For VDESIGNU startup partners, we provide these checks to streamline the DED and MISA registration processes.
         </p>
      </div>
    </div>
  );
}
