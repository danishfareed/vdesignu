/**
 * Hreflang Generator for MENA
 * Handles multi-regional Arabic and English targeting
 */
import { useState, useEffect } from 'react';
import { Globe, Plus, Trash2, Copy, Download, Info, MapPin } from 'lucide-react';
import ToolOutput from '../ToolOutput';

export default function HreflangGenerator() {
  const [baseUrl, setBaseUrl] = useState('https://vdesignu.com');
  const [mappings, setMappings] = useState([
    { lang: 'ar-sa', path: '/sa/ar' },
    { lang: 'en-sa', path: '/sa/en' },
    { lang: 'ar-ae', path: '/ae/ar' },
    { lang: 'x-default', path: '/' }
  ]);

  const [output, setOutput] = useState('');

  const addMapping = () => {
    setMappings([...mappings, { lang: '', path: '' }]);
  };

  const removeMapping = (index: number) => {
    setMappings(mappings.filter((_, i) => i !== index));
  };

  const updateMapping = (index: number, field: string, value: string) => {
    const newMappings = [...mappings];
    (newMappings[index] as any)[field] = value;
    setMappings(newMappings);
  };

  useEffect(() => {
    const tags = mappings
      .filter(m => m.lang && m.path)
      .map(m => `<link rel="alternate" hreflang="${m.lang}" href="${baseUrl.replace(/\/$/, '')}${m.path.startsWith('/') ? m.path : '/' + m.path}" />`)
      .join('\n');

    setOutput(tags);
  }, [baseUrl, mappings]);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Settings Panel */}
        <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] p-10 shadow-2xl">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-14 h-14 rounded-2xl bg-[var(--accent-red)] flex items-center justify-center text-white shadow-xl shadow-red-600/20">
              <Globe className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-black uppercase tracking-tight text-[var(--text-primary)]">Multi-Regional SEO</h3>
              <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Hreflang Manager</p>
            </div>
          </div>

          <div className="space-y-6">
             <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3 ml-1">Domain URL</label>
                <input
                  type="url"
                  value={baseUrl}
                  onChange={(e) => setBaseUrl(e.target.value)}
                  className="w-full px-6 py-4 bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] rounded-2xl font-bold"
                />
             </div>

             <div className="space-y-3">
                {mappings.map((m, index) => (
                   <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={m.lang}
                        onChange={(e) => updateMapping(index, 'lang', e.target.value)}
                        placeholder="ar-sa"
                        className="w-1/3 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl py-2 px-4 text-xs font-bold"
                      />
                      <input
                        type="text"
                        value={m.path}
                        onChange={(e) => updateMapping(index, 'path', e.target.value)}
                        placeholder="/ar"
                        className="flex-1 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl py-2 px-4 text-xs font-bold"
                      />
                      <button onClick={() => removeMapping(index)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                         <Trash2 className="w-4 h-4" />
                      </button>
                   </div>
                ))}
             </div>

             <button 
               onClick={addMapping}
               className="w-full py-4 border-2 border-dashed border-[var(--border-subtle)] rounded-2xl text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] hover:border-[var(--accent-red)] transition-all flex items-center justify-center gap-2"
             >
                <Plus className="w-4 h-4" /> Add Language/Region
             </button>
          </div>
        </div>

        {/* Output Panel */}
        <div className="space-y-8">
           <ToolOutput 
             output={output} 
             language="html" 
             title="Hreflang Meta Tags"
           />
           
           <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] p-8">
              <div className="flex items-center gap-3 mb-4 text-[var(--accent-red)]">
                 <MapPin className="w-5 h-5" />
                 <h4 className="text-[10px] font-black uppercase tracking-widest">Cross-Border Strategy</h4>
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed italic">
                 Hreflang tags prevent duplicate content issues when targeting multiple countries with the same language (like KSA and UAE). VDESIGNU implements these as standard for all MENA enterprises to ensure Google serves the right currency and local contact info.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
