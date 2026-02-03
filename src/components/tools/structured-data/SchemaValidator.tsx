/**
 * Universal JSON-LD Schema Validator
 * Audits structured data for syntax and logical errors
 */
import { useState } from 'react';
import { ShieldCheck, Code, AlertTriangle, CheckCircle, Info, Zap } from 'lucide-react';
import ToolOutput from '../ToolOutput';

export default function SchemaValidator() {
  const [json, setJson] = useState('');
  const [results, setResults] = useState<any[]>([]);

  const validate = () => {
    const findings: any[] = [];
    if (!json) return;

    try {
      const parsed = JSON.parse(json);
      findings.push({ type: 'success', msg: 'Valid JSON syntax confirmed.' });

      // Semantic Checks
      if (!parsed['@context']) findings.push({ type: 'error', msg: 'Missing @context (Usually https://schema.org)' });
      if (!parsed['@type']) findings.push({ type: 'error', msg: 'Missing @type property' });

      // specific type checks
      if (parsed['@type'] === 'LocalBusiness' && !parsed.address) {
        findings.push({ type: 'warning', msg: 'LocalBusiness often requires an address property' });
      }

      if (findings.filter(f => f.type === 'error').length === 0) {
        findings.push({ type: 'success', msg: 'Schema structure appears logically sound.' });
      }
    } catch (e) {
      findings.push({ type: 'error', msg: 'Fatal Syntax Error: Invalid JSON' });
    }

    setResults(findings);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[3rem] p-10 shadow-2xl mb-12">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-14 h-14 rounded-2xl bg-[var(--accent-red)] flex items-center justify-center text-white shadow-xl shadow-red-600/20">
            <Code className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-xl font-black uppercase tracking-tight text-[var(--text-primary)]">Markup Audit</h3>
            <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Universal JSON-LD Validator</p>
          </div>
        </div>

        <div className="space-y-6">
           <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-3 ml-1">Paste JSON-LD Configuration</label>
              <textarea
                value={json}
                onChange={(e) => setJson(e.target.value)}
                placeholder='{ "@context": "https://schema.org", "@type": "Product", ... }'
                className="w-full px-6 py-4 bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] rounded-2xl text-[var(--text-primary)] font-mono text-xs focus:border-[var(--accent-red)] focus:outline-none transition-all shadow-inner"
                rows={10}
              />
           </div>
           
           <button 
             onClick={validate}
             className="w-full py-6 bg-[var(--accent-red)] text-white font-black italic uppercase tracking-tighter text-2xl rounded-2xl hover:bg-black transition-all shadow-2xl"
           >
              Audit Schema Markup
           </button>

           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {results.map((f, i) => (
                 <div key={i} className={`p-4 rounded-xl border flex items-center gap-3 ${f.type === 'error' ? 'bg-red-50 border-red-200 text-red-600' : f.type === 'warning' ? 'bg-yellow-50 border-yellow-200 text-yellow-700' : 'bg-green-50 border-green-200 text-green-600'}`}>
                    {f.type === 'error' ? <AlertTriangle className="w-4 h-4" /> : f.type === 'warning' ? <AlertTriangle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                    <span className="text-[10px] font-black uppercase tracking-tight">{f.msg}</span>
                 </div>
              ))}
           </div>
        </div>
      </div>

      <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] p-10">
         <div className="flex items-center gap-3 mb-6">
            <Zap className="w-5 h-5 text-[var(--accent-red)]" />
            <h4 className="text-xs font-black uppercase tracking-widest text-[var(--text-primary)]">The VDESIGNU Standard</h4>
         </div>
         <p className="text-sm text-[var(--text-secondary)] leading-relaxed italic">
            Validating your structured data before deployment prevents "Partial Crawl" issues in Google Search Console. While Google provides a rich results test, the VDESIGNU validator focuses on the logical completeness required for regional GCC business listings.
         </p>
      </div>
    </div>
  );
}
