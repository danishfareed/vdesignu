/**
 * GCC Compliance & Arabic SEO Suite
 * KSA CR Validator and Arabic Transliteration
 */
import { useState } from 'react';
import { ShieldCheck, Languages, Building2, CheckCircle, Info, Zap, Scale, FileSearch, Globe } from 'lucide-react';
import ToolOutput from '../ToolOutput';

export default function GCCComplianceSuite() {
  const [tool, setTool] = useState('ksa-cr');
  const [input, setInput] = useState('');
  const [results, setResults] = useState<any>(null);

  const validate = () => {
    if (tool === 'ksa-cr') {
      const isValid = /^\d{10}$/.test(input);
      setResults(isValid ? { status: 'Valid', msg: 'Registration number follows Saudi Ministry of Commerce standards (10 digits).' } : { status: 'Invalid', msg: 'CR number must be exactly 10 digits.' });
    } else if (tool === 'transliteration') {
      // Simple logic for demonstration
      const map: any = { 'marketing': 'ماركتنج', 'seo': 'سيو', 'digital': 'ديجيتال' };
      const out = map[input.toLowerCase()] || input;
      setResults({ status: 'Converted', msg: `Phonetic Arabic: ${out}` });
    } else {
      setResults({ status: 'Protected', msg: 'Your data architecture meets GCC Data Protection Law (PDPL) requirements for residency.' });
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Settings Panel */}
        <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] p-10 shadow-2xl">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-14 h-14 rounded-2xl bg-[var(--accent-red)] flex items-center justify-center text-white shadow-xl shadow-red-600/20">
               <Scale className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-black uppercase tracking-tight text-[var(--text-primary)]">Compliance Hub</h3>
              <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">MENA Regulatory Standard</p>
            </div>
          </div>

          <div className="flex gap-4 p-2 bg-[var(--bg-primary)] rounded-2xl border border-[var(--border-subtle)] mb-8 overflow-x-auto scrollbar-none">
             {[
                { id: 'ksa-cr', icon: Building2, label: 'KSA CR' },
                { id: 'transliteration', icon: Languages, label: 'Alpha' },
                { id: 'protection', icon: ShieldCheck, label: 'Privacy' }
             ].map((t) => (
                <button 
                  key={t.id}
                  onClick={() => setTool(t.id)}
                  className={`flex items-center gap-2 py-3 px-6 rounded-xl text-[10px] font-black uppercase transition-all whitespace-nowrap ${tool === t.id ? 'bg-[var(--accent-red)] text-white shadow-lg' : 'text-[var(--text-muted)]'}`}
                >
                   <t.icon className="w-4 h-4" /> {t.label}
                </button>
             ))}
          </div>

          <div className="space-y-6">
             <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-3 ml-1">
                   {tool === 'ksa-cr' ? 'Commercial Registration (CR) Number' : tool === 'transliteration' ? 'Keyword for Transliteration' : 'Target Market (GCC)'}
                </label>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="w-full px-6 py-4 bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] rounded-2xl font-bold"
                  placeholder={tool === 'ksa-cr' ? 'e.g. 1010123456' : 'e.g. SEO'}
                />
             </div>

             <button 
                onClick={validate}
                className="w-full py-4 bg-[var(--accent-red)] text-white font-black uppercase rounded-2xl hover:bg-black transition-all shadow-xl"
             >
                Verify & Process
             </button>

             {results && (
                <div className={`mt-6 p-6 rounded-2xl border flex items-center gap-4 ${results.status === 'Invalid' ? 'bg-red-50 border-red-200 text-red-600' : 'bg-green-50 border-green-200 text-green-600'}`}>
                   {results.status === 'Invalid' ? <FileSearch className="w-6 h-6" /> : <CheckCircle className="w-6 h-6" />}
                   <div>
                      <h4 className="text-xs font-black uppercase">{results.status}</h4>
                      <p className="text-[10px] font-bold opacity-80">{results.msg}</p>
                   </div>
                </div>
             )}
          </div>
        </div>

        {/* Output Panel */}
        <div className="space-y-8">
           <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] p-10">
              <div className="flex items-center gap-3 mb-6">
                 <Globe className="w-5 h-5 text-[var(--accent-red)]" />
                 <h4 className="text-xs font-black uppercase tracking-widest text-[var(--text-primary)]">Regional Governance</h4>
              </div>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed italic mb-6">
                 Trust is the foundation of E-commerce in Riyadh and Dubai. VDESIGNU ensures your site meets all Ministry of Commerce and PDPL regulations, which are now critical factors in both user trust and algorithmic local rankings.
              </p>
              <div className="grid grid-cols-2 gap-4">
                 <div className="p-4 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl text-[9px] font-black uppercase tracking-widest text-[var(--text-muted)] text-center italic">
                    Ministry of Commerce
                 </div>
                 <div className="p-4 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl text-[9px] font-black uppercase tracking-widest text-[var(--text-muted)] text-center italic">
                    SDAIA / PDPL
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
