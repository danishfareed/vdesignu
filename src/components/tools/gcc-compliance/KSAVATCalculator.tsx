/**
 * KSA VAT Calculator (15%)
 * Specialized for Saudi Arabian tax regulations
 */
import { useState, useEffect } from 'react';
import { Landmark, Calculator, Receipt, Download, Info, CheckCircle, TrendingUp } from 'lucide-react';
import ToolOutput from '../ToolOutput';

export default function KSAVATCalculator() {
  const [amount, setAmount] = useState('1000');
  const [type, setType] = useState('exclusive');
  const [results, setResults] = useState({
    net: 0,
    vat: 0,
    total: 0
  });

  useEffect(() => {
    const val = parseFloat(amount) || 0;
    const rate = 0.15;
    
    if (type === 'exclusive') {
      const vat = val * rate;
      setResults({
        net: val,
        vat: vat,
        total: val + vat
      });
    } else {
      const net = val / (1 + rate);
      const vat = val - net;
      setResults({
        net: net,
        vat: vat,
        total: val
      });
    }
  }, [amount, type]);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Input Panel */}
        <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] p-10 shadow-2xl">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-14 h-14 rounded-2xl bg-[var(--accent-red)] flex items-center justify-center text-white shadow-xl shadow-red-600/20">
              <Landmark className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-black uppercase tracking-tight text-[var(--text-primary)]">Saudi Tax Engine</h3>
              <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">KSA VAT (15%) Compliance</p>
            </div>
          </div>

          <div className="space-y-8">
             <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3 ml-1">Principal Amount (SAR)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-8 py-6 bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] rounded-3xl text-3xl font-black text-[var(--text-primary)] focus:border-[var(--accent-red)] focus:outline-none transition-all shadow-inner"
                />
             </div>

             <div className="flex gap-4 p-2 bg-[var(--bg-primary)] rounded-2xl border border-[var(--border-subtle)]">
                <button 
                  onClick={() => setType('exclusive')}
                  className={`flex-1 py-4 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${type === 'exclusive' ? 'bg-[var(--accent-red)] text-white shadow-lg' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'}`}
                >
                   VAT Exclusive
                </button>
                <button 
                  onClick={() => setType('inclusive')}
                  className={`flex-1 py-4 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${type === 'inclusive' ? 'bg-[var(--accent-red)] text-white shadow-lg' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'}`}
                >
                   VAT Inclusive
                </button>
             </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="space-y-6">
           <div className="grid grid-cols-1 gap-4">
              {[
                { label: 'Net Amount', value: results.net, color: 'text-[var(--text-secondary)]' },
                { label: 'VAT (15%)', value: results.vat, color: 'text-[var(--accent-red)]' },
                { label: 'Total Payable', value: results.total, color: 'text-[var(--text-primary)] font-black' }
              ].map((item, i) => (
                 <div key={i} className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-2xl p-6 flex justify-between items-center transition-all hover:border-[var(--accent-red)]/30 group">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] group-hover:text-[var(--accent-red)]">{item.label}</span>
                    <span className={`text-xl font-bold ${item.color}`}>
                       {item.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span className="text-[10px] uppercase ml-1">SAR</span>
                    </span>
                 </div>
              ))}
           </div>

           <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] p-8">
              <div className="flex items-center gap-3 mb-4 text-[var(--accent-red)]">
                 <Receipt className="w-5 h-5" />
                 <h4 className="text-[10px] font-black uppercase tracking-widest">ZATCA Rule Compliance</h4>
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed italic">
                 Calculations are strictly based on the Saudi Zakat, Tax and Customs Authority (ZATCA) guidelines for the 15% standard rate. For VDESIGNU clients in Riyadh and Jeddah, this tool ensures financial accuracy in all digital tax reporting.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
