/**
 * Analytics Strategy & Mapping Suite
 * GA4 Conversions, Dimension Mapper, and Campaign Naming
 */
import { useState } from 'react';
import { Target, ArrowRightLeft, FileSpreadsheet, Copy, Download, Info, Zap, LayoutDashboard, CheckCircle } from 'lucide-react';
import ToolOutput from '../ToolOutput';

export default function AnalyticsStrategySuite() {
  const [tool, setTool] = useState('conversions');
  const [output, setOutput] = useState('');

  const generate = () => {
    if (tool === 'conversions') {
      setOutput('// GA4 Conversion Goal Configuration\n// Go to Admin > Events > Mark as conversion\n{\n  "event_name": "generate_lead",\n  "parameters": {\n    "value": 50,\n    "currency": "SAR",\n    "method": "contact_form"\n  }\n}');
    } else if (tool === 'mapper') {
      setOutput('// Dimension Equivalency Table\n// UA Dimension -> GA4 Equivalent\n"Custom Dimension 1" -> "user_type"\n"Event Category" -> "event_name"\n"Event Action" -> "event_name"\n"Event Label" -> "parameter_name"');
    } else {
      setOutput('// Campaign Naming Template\n// Format: [Channel]_[Region]_[CampaignType]_[Date]\n// Example: social_ksa_promo_20260118\n// Example: search_uae_brand_vdesignu');
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Settings Panel */}
        <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] p-10 shadow-2xl">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-14 h-14 rounded-2xl bg-[var(--accent-red)] flex items-center justify-center text-white shadow-xl shadow-red-600/20">
               <LayoutDashboard className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-black uppercase tracking-tight text-[var(--text-primary)]">Strategy Engine</h3>
              <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Analytics Planning & Mapping</p>
            </div>
          </div>

          <div className="flex gap-4 p-2 bg-[var(--bg-primary)] rounded-2xl border border-[var(--border-subtle)] mb-8 overflow-x-auto scrollbar-none">
             {[
                { id: 'conversions', icon: Target, label: 'GA4 Goals' },
                { id: 'mapper', icon: ArrowRightLeft, label: 'UA to GA4' },
                { id: 'naming', icon: FileSpreadsheet, label: 'Campaigns' }
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

          <button 
            onClick={generate}
            className="w-full py-4 bg-[var(--accent-red)] text-white font-black uppercase rounded-2xl hover:bg-black transition-all shadow-xl"
          >
             Build Configuration
          </button>
        </div>

        {/* Output Panel */}
        <div className="space-y-8">
           <ToolOutput 
             output={output} 
             language="json" 
             title={`${tool.toUpperCase()} Configuration`}
           />
           
           <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] p-8">
              <div className="flex items-center gap-3 mb-4 text-[var(--accent-red)]">
                 <Target className="w-5 h-5" />
                 <h4 className="text-[10px] font-black uppercase tracking-widest">ROI Focused Measurement</h4>
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed italic">
                 Aligning your measurement strategy with business KPIs is crucial for GCC market dominance. VDESIGNU ensures your GA4 setup captures the real economic value of every organic visit in SAR and AED.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
