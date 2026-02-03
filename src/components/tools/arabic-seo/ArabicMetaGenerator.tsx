/**
 * Arabic SEO Meta Generator
 * Optimized for MENA markets (KSA, UAE, Qatar)
 * Handles RTL metadata and region-specific signals
 */
import { useState, useEffect } from 'react';
import { Languages, Globe, Copy, Info, CheckCircle, Type, Layout } from 'lucide-react';
import ToolOutput from '../ToolOutput';

export default function ArabicMetaGenerator() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    region: 'SA',
    language: 'ar',
    hreflang: 'ar-sa',
    author: 'VDESIGNU'
  });

  const [output, setOutput] = useState('');

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    let result = '<!-- MENA Region SEO Tags -->\n';
    result += `<html lang="${formData.language}" dir="rtl">\n`;
    result += `<title>${formData.title}</title>\n`;
    result += `<meta name="description" content="${formData.description}" />\n`;
    result += `<meta name="geo.region" content="${formData.region}" />\n`;
    result += `<link rel="alternate" hreflang="${formData.hreflang}" href="https://vdesignu.com/ar/" />\n`;
    result += `<meta name="author" content="${formData.author}" />`;

    setOutput(result);
  }, [formData]);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Input Panel */}
        <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] p-10 shadow-2xl" dir="rtl">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-14 h-14 rounded-2xl bg-[var(--accent-red)] flex items-center justify-center text-white shadow-xl shadow-red-600/20">
              <Languages className="w-7 h-7" />
            </div>
            <div className="text-right">
              <h3 className="text-xl font-black uppercase tracking-tight text-[var(--text-primary)]">تحسين محركات البحث باللغة العربية</h3>
              <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest text-right">MENA SEO Optimization</p>
            </div>
          </div>

          <div className="space-y-6">
             <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3 mr-1 text-right">عنوان الصفحة (Arabic Title)</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => updateField('title', e.target.value)}
                  placeholder="شركة سيو في الرياض - أفضل الخدمات"
                  className="w-full px-6 py-4 bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] rounded-2xl text-[var(--text-primary)] font-bold focus:border-[var(--accent-red)] focus:outline-none transition-all text-right"
                />
             </div>

             <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3 mr-1 text-right">وصف الميتا (Meta Description)</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => updateField('description', e.target.value)}
                  placeholder="نحن نقدم أفضل الحلول التقنية في المملكة العربية السعودية..."
                  className="w-full px-6 py-4 bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] rounded-2xl text-[var(--text-primary)] font-bold focus:border-[var(--accent-red)] focus:outline-none transition-all text-right"
                  rows={3}
                />
             </div>

             <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3 mr-1 text-right">المنطقة (Target Region)</label>
                   <select 
                     value={formData.region}
                     onChange={(e) => updateField('region', e.target.value)}
                     className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl text-[var(--text-primary)] font-bold text-right"
                   >
                      <option value="SA">KSA (المملكة العربية السعودية)</option>
                      <option value="AE">UAE (الإمارات العربية المتحدة)</option>
                      <option value="QA">Qatar (قطر)</option>
                      <option value="EG">Egypt (مصر)</option>
                   </select>
                </div>
                <div>
                   <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3 mr-1 text-right">Hreflang</label>
                   <input
                     value={formData.hreflang}
                     onChange={(e) => updateField('hreflang', e.target.value)}
                     className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl text-[var(--text-primary)] font-bold text-right"
                   />
                </div>
             </div>
          </div>
        </div>

        {/* Output Panel */}
        <div className="space-y-8">
           <ToolOutput 
             output={output} 
             language="html" 
             title="RTL Optimized Meta Tags"
           />
           
           <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] p-8">
              <div className="flex items-center gap-3 mb-4 text-[var(--accent-red)]">
                 <Globe className="w-5 h-5" />
                 <h4 className="text-[10px] font-black uppercase tracking-widest">Localization Secret</h4>
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed italic">
                 For the Saudi and GCC markets, Google favors pages that explicitly define <code>dir="rtl"</code> and use region-specific <code>geo.region</code> tags. VDESIGNU tools ensure your Arabic content is technically superior to generic global competitors.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
