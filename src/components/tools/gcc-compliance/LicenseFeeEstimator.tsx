/**
 * GCC Business License Fee Estimator
 * Provides rough estimates for professional and commercial licenses
 */
import { useState, useEffect } from 'react';
import { Landmark, Coins, FileText, Download, Info, CheckCircle, Wallet } from 'lucide-react';
import ToolOutput from '../ToolOutput';

export default function LicenseFeeEstimator() {
  const [region, setRegion] = useState('dubai_mainland');
  const [type, setType] = useState('professional');
  const [visaCount, setVisaCount] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let base = 0;
    let perVisa = 0;

    if (region === 'dubai_mainland') {
      base = type === 'professional' ? 12000 : 18000;
      perVisa = 3500;
    } else if (region === 'riyadh_mainland') {
      base = 15000;
      perVisa = 4000;
    } else {
      base = 10000;
      perVisa = 3000;
    }

    setTotal(base + (visaCount * perVisa));
  }, [region, type, visaCount]);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Input Panel */}
        <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] p-10 shadow-2xl">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-14 h-14 rounded-2xl bg-[var(--accent-red)] flex items-center justify-center text-white shadow-xl shadow-red-600/20">
              <Wallet className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-black uppercase tracking-tight text-[var(--text-primary)]">Startup Budgeting</h3>
              <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Trade License Estimates</p>
            </div>
          </div>

          <div className="space-y-6">
             <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3 ml-1">Jurisdiction</label>
                <select 
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl font-bold"
                >
                   <option value="dubai_mainland">Dubai Mainland (DED)</option>
                   <option value="dubai_freezone">Dubai Freezone (IFZA/DMCC)</option>
                   <option value="riyadh_mainland">Riyadh (MISA/MC)</option>
                   <option value="abu_dhabi">Abu Dhabi (ADDED)</option>
                </select>
             </div>

             <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3 ml-1">License Type</label>
                   <select 
                     value={type}
                     onChange={(e) => setType(e.target.value)}
                     className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl font-bold"
                   >
                      <option value="professional">Professional</option>
                      <option value="commercial">Commercial</option>
                      <option value="industrial">Industrial</option>
                   </select>
                </div>
                <div>
                   <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3 ml-1">Visa Quota</label>
                   <input
                     type="number"
                     min="0"
                     max="50"
                     value={visaCount}
                     onChange={(e) => setVisaCount(parseInt(e.target.value) || 0)}
                     className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl font-bold"
                   />
                </div>
             </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="space-y-6">
           <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] p-10 flex flex-col items-center justify-center text-center shadow-2xl">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-muted)] mb-4">Estimated Initial Setup Cost</span>
              <span className="text-6xl font-black text-[var(--accent-red)] tracking-tighter italic">
                 {total.toLocaleString()}
              </span>
              <span className="text-xl font-bold text-[var(--text-primary)] mt-2">AED / SAR</span>
              <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest mt-6">Excludes office rent and secondary approvals</p>
           </div>

           <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] p-8">
              <div className="flex items-center gap-3 mb-4 text-[var(--accent-red)]">
                 <Coins className="w-5 h-5" />
                 <h4 className="text-[10px] font-black uppercase tracking-widest">Business Advisory</h4>
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed italic">
                 License fees in the GCC are subject to frequent updates porportional to municipal fees and market regulations. For VDESIGNU startup partners, we provide these baseline estimates to help you plan your initial capitalization.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
