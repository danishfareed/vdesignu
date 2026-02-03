/**
 * RTL & Arabic SEO Auditor
 * Checks for directionality, language tags, and fonts
 */
import { useState } from 'react';
import { Eye, Languages, CheckCircle, AlertCircle, Copy, Info, AlignRight } from 'lucide-react';
import ToolOutput from '../ToolOutput';

export default function RTLAuditor() {
  const [html, setHtml] = useState('');
  const [results, setResults] = useState<any[]>([]);

  const audit = () => {
    const findings = [];
    
    if (!html.includes('dir="rtl"')) {
      findings.push({ type: 'error', msg: 'Missing dir="rtl" attribute on <html> or <body>' });
    } else {
      findings.push({ type: 'success', msg: 'RTL directionality is correctly defined.' });
    }

    if (!html.includes('lang="ar"')) {
      findings.push({ type: 'error', msg: 'Missing lang="ar" attribute' });
    } else {
      findings.push({ type: 'success', msg: 'Arabic language tag is present.' });
    }

    if (html.toLowerCase().includes('font-family') && !html.toLowerCase().includes('arabic')) {
      findings.push({ type: 'warning', msg: 'Non-Arabic optimized font detected' });
    }

    if (findings.filter(f => f.type === 'error').length === 0 && findings.length > 0) {
      findings.push({ type: 'success', msg: 'Basic RTL architecture is solid.' });
    }

    setResults(findings);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[3rem] p-10 shadow-2xl mb-12">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-14 h-14 rounded-2xl bg-[var(--accent-red)] flex items-center justify-center text-white shadow-xl shadow-red-600/20">
            <AlignRight className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-xl font-black uppercase tracking-tight text-[var(--text-primary)]">RTL Architecture</h3>
            <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Arabic SEO Compliance Auditor</p>
          </div>
        </div>

        <div className="space-y-6">
           <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-3 ml-1">Paste HTML Snippet (Head/Body)</label>
              <textarea
                value={html}
                onChange={(e) => setHtml(e.target.value)}
                placeholder='<html lang="ar" dir="rtl">...'
                className="w-full px-6 py-4 bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] rounded-2xl text-[var(--text-primary)] font-mono text-xs focus:border-[var(--accent-red)] focus:outline-none transition-all"
                rows={6}
              />
           </div>
           
           <button 
             onClick={audit}
             className="w-full py-4 bg-[var(--accent-red)] text-white font-black uppercase rounded-2xl hover:bg-black transition-all shadow-xl"
           >
              Run RTL Health Check
           </button>

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
            <Languages className="w-5 h-5 text-[var(--accent-red)]" />
            <h4 className="text-xs font-black uppercase tracking-widest text-[var(--text-primary)]">RTL UX Standards</h4>
         </div>
         <p className="text-sm text-[var(--text-secondary)] leading-relaxed italic">
            Search engines in the MENA region prioritize user experience. Incorrectly configured RTL layouts lead to high bounce rates which negatively impact your rankings. VDESIGNU ensures your site architecture is technically perfect for the Arabic-speaking world.
         </p>
      </div>
    </div>
  );
}
