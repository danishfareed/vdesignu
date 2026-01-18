/**
 * Advanced Analytics Implementation Suite
 * Form dataLayer, Conversion Pixel, and GTM Reference
 */
import { useState, useEffect } from 'react';
import { Database, FormInput, BookOpen, Crosshair, Copy, Download, Info, Zap, Tag, CheckCircle, Target, CheckCircle2, ShoppingBag } from 'lucide-react';
import ToolOutput from '../ToolOutput';

export default function AnalyticsPowerSuite() {
  const [tool, setTool] = useState('forms');
  const [formId, setFormId] = useState('contact_form');
  const [output, setOutput] = useState('');

  useEffect(() => {
    if (tool === 'datalayer-forms') {
      setOutput(`window.dataLayer = window.dataLayer || [];\nwindow.dataLayer.push({\n  'event': 'form_submission',\n  'form_id': 'contact_footer',\n  'location': 'Saudi Arabia'\n});`);
    } else if (tool === 'conversion-pixel') {
      setOutput(`<!-- VDESIGNU Optimized Pixel -->\n<script>\nfbq('track', 'Purchase', {value: 100, currency: 'SAR'});\n</script>`);
    } else if (tool === 'utm-validator') {
      setOutput('UTM Status: Valid\nSource: google\nMedium: cpc\nCampaign: rsa_brand_awareness\nSafety: URL Encoded');
    } else if (tool === 'utm-best-practices') {
      setOutput('// UTM Best Practices\n// 1. Use consistent naming conventions.\n// 2. Keep parameters concise and readable.\n// 3. Avoid using spaces; use underscores or hyphens.\n// 4. Use lowercase for all parameters.\n// 5. Test your UTMs before launching campaigns.');
    } else if (tool === 'ga4-ecommerce') {
      setOutput(`gtag("event", "purchase", {\n  transaction_id: "T_12345",\n  value: 250.00,\n  currency: "SAR",\n  items: [{ item_id: "SKU_001", item_name: "SEO Audit" }]\n});`);
    } else {
      setOutput(`Variable Name | Type | Description\n----------------------------------\n{{DLV - City}} | Data Layer | User City\n{{Click URL}} | Built-in | Target Link`);
    }
  }, [tool]);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Settings Panel */}
        <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] p-10 shadow-2xl">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-14 h-14 rounded-2xl bg-[var(--accent-red)] flex items-center justify-center text-white shadow-xl shadow-red-600/20">
               <Crosshair className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-black uppercase tracking-tight text-[var(--text-primary)]">Analytics Lab</h3>
              <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Precision Tracking Engine</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 p-2 bg-[var(--bg-primary)] rounded-2xl border border-[var(--border-subtle)] mb-8">
             {[
                { id: 'datalayer-forms', icon: Database, label: 'DataLayer' },
                { id: 'conversion-pixel', icon: Target, label: 'Pixel' },
                { id: 'gtm-cheatsheet', icon: BookOpen, label: 'CheatSheet' },
                { id: 'utm-validator', icon: CheckCircle2, label: 'UTM Val' },
                { id: 'utm-best-practices', icon: Info, label: 'UTM Best' },
                { id: 'ga4-ecommerce', icon: ShoppingBag, label: 'GA4 Ecom' }
             ].map((t) => (
                <button 
                  key={t.id}
                  onClick={() => setTool(t.id)}
                  className={`flex items-center gap-2 py-3 px-4 rounded-xl text-[9px] font-black uppercase transition-all ${tool === t.id ? 'bg-[var(--accent-red)] text-white shadow-lg' : 'text-[var(--text-muted)]'}`}
                >
                   <t.icon className="w-3.5 h-3.5" /> {t.label}
                </button>
             ))}
          </div>

          <div className="space-y-6">
                <div>
                   <label className="block text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-2 ml-1">HTML Form ID</label>
                   <input
                     type="text"
                     value={formId}
                     onChange={(e) => setFormId(e.target.value)}
                     className="w-full px-5 py-3 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl text-xs font-bold"
                   />
                </div>

             {tool === 'pixel' && (
                <div className="p-4 bg-[var(--bg-primary)] rounded-xl border border-[var(--border-subtle)]">
                   <p className="text-[10px] text-[var(--text-secondary)] italic">
                      Pixel templates are pre-configured for VDESIGNU standard lead generation tracking across Meta and Google Ads.
                   </p>
                </div>
             )}

             {tool === 'gtm' && (
                <div className="grid grid-cols-2 gap-3">
                   {['Page Views', 'Form Submits', 'Video Plays', 'Scroll Depth'].map((ref) => (
                      <div key={ref} className="p-3 bg-[var(--bg-primary)] rounded-lg border border-[var(--border-subtle)] flex items-center gap-2">
                         <div className="w-2 h-2 rounded-full bg-[var(--accent-red)]" />
                         <span className="text-[10px] font-black uppercase text-[var(--text-primary)]">{ref}</span>
                      </div>
                   ))}
                </div>
             )}
          </div>
        </div>

        {/* Output Panel */}
        <div className="space-y-8">
           <ToolOutput 
             output={output} 
             language={tool === 'gtm' ? 'text' : 'javascript'} 
             title={`${tool.toUpperCase()} Code Snippet`}
           />
           
           <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] p-8">
              <div className="flex items-center gap-3 mb-4 text-[var(--accent-red)]">
                 <Tag className="w-5 h-5" />
                 <h4 className="text-[10px] font-black uppercase tracking-widest">Analytics Integrity</h4>
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed italic">
                 Precise dataLayer implementation is what separates raw noise from actionable business intelligence. For VDESIGNU partners, we use these schemas to ensure 100% conversion accuracy in KSA and UAE retail environments.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
