/**
 * LocalBusiness SEO Audit Tool
 * Specialized for GCC business compliance and consistency
 */
import { useState } from 'react';
import { ClipboardCheck, MapPin, Phone, Globe, Info, Zap, CheckCircle, AlertCircle, Copy } from 'lucide-react';
import ToolOutput from '../ToolOutput';

export default function LocalBusinessAudit() {
  const [data, setData] = useState({
    name: 'VDESIGNU Digital Solutions',
    phone: '+966 50 123 4567',
    address: 'King Fahd Road, Riyadh, KSA',
    website: 'https://vdesignu.com'
  });

  const [findings, setFindings] = useState<any[]>([]);

  const audit = () => {
    const list = [];
    
    if (data.phone.includes('+971') || data.phone.includes('+966')) {
      list.push({ type: 'success', msg: 'Phone number uses proper GCC regional code' });
    } else {
      list.push({ type: 'warning', msg: 'Missing international prefix for regional targeting' });
    }

    if (data.address.toLowerCase().includes('dubai') || data.address.toLowerCase().includes('riyadh') || data.address.toLowerCase().includes('ksa')) {
      list.push({ type: 'success', msg: 'Address contains critical geographic signals' });
    } else {
      list.push({ type: 'error', msg: 'Missing city/country mapping in address' });
    }

    if (!data.website.startsWith('https')) {
      list.push({ type: 'error', msg: 'Insecure URL detected (SSL is a local ranking factor)' });
    }

    setFindings(list);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[3rem] p-10 shadow-2xl mb-12">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-14 h-14 rounded-2xl bg-[var(--accent-red)] flex items-center justify-center text-white shadow-xl shadow-red-600/20">
            <ClipboardCheck className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-xl font-black uppercase tracking-tight text-[var(--text-primary)]">Local Authority</h3>
            <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">LocalBusiness Schema Audit</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
           {Object.keys(data).map((key) => (
              <div key={key}>
                 <label className="block text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-2 ml-1">{key}</label>
                 <input
                   type="text"
                   value={(data as any)[key]}
                   onChange={(e) => setData({ ...data, [key]: e.target.value })}
                   className="w-full px-5 py-3 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl text-xs font-bold"
                 />
              </div>
           ))}
        </div>

        <button 
          onClick={audit}
          className="w-full py-4 bg-[var(--accent-red)] text-white font-black uppercase rounded-2xl hover:bg-black transition-all shadow-xl"
        >
           Run Audit Analysis
        </button>

        <div className="grid md:grid-cols-3 gap-4 mt-8">
           {findings.map((f, i) => (
              <div key={i} className={`p-4 rounded-xl border flex items-center gap-3 ${f.type === 'error' ? 'bg-red-50 border-red-200 text-red-600' : f.type === 'warning' ? 'bg-yellow-50 border-yellow-200 text-yellow-700' : 'bg-green-50 border-green-200 text-green-600'}`}>
                 {f.type === 'error' ? <AlertCircle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                 <span className="text-[9px] font-black uppercase tracking-tight">{f.msg}</span>
              </div>
           ))}
        </div>
      </div>

      <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] p-10">
         <div className="flex items-center gap-3 mb-6">
            <MapPin className="w-5 h-5 text-[var(--accent-red)]" />
            <h4 className="text-xs font-black uppercase tracking-widest text-[var(--text-primary)]">NAP Consistency Standard</h4>
         </div>
         <p className="text-sm text-[var(--text-secondary)] leading-relaxed italic">
            Name, Address, and Phone (NAP) consistency is the foundation of local SEO. For VDESIGNU clients in the GCC, we enforce strict formatting to ensure your business appears in the "Map Pack" for Riyadh and Dubai localized searches.
         </p>
      </div>
    </div>
  );
}
