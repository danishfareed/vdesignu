/**
 * Meta Tag HTML Generator
 * Generates essential SEO and Social Media meta tags
 */
import { useState } from 'react';
import { Layout, Globe, Share2, Twitter, Facebook, Download, Copy, Check, Info, AlertTriangle, Eye } from 'lucide-react';
import ToolOutput from '../ToolOutput';

export default function MetaTagGenerator() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    url: '',
    image: '',
    author: '',
    robots: 'index, follow',
    ogType: 'website',
    twitterCard: 'summary_large_image'
  });
  
  const [output, setOutput] = useState('');
  const [activeTab, setActiveTab] = useState<'standard' | 'og' | 'twitter'>('standard');

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateTags = () => {
    let tags = `<!-- Primary Meta Tags -->\n`;
    tags += `<title>${formData.title || 'Page Title'}</title>\n`;
    tags += `<meta name="title" content="${formData.title || 'Page Title'}">\n`;
    tags += `<meta name="description" content="${formData.description}">\n`;
    if (formData.author) tags += `<meta name="author" content="${formData.author}">\n`;
    tags += `<meta name="robots" content="${formData.robots}">\n`;
    if (formData.url) tags += `<link rel="canonical" href="${formData.url}">\n\n`;

    tags += `<!-- Open Graph / Facebook -->\n`;
    tags += `<meta property="og:type" content="${formData.ogType}">\n`;
    if (formData.url) tags += `<meta property="og:url" content="${formData.url}">\n`;
    tags += `<meta property="og:title" content="${formData.title || 'Page Title'}">\n`;
    tags += `<meta property="og:description" content="${formData.description}">\n`;
    if (formData.image) tags += `<meta property="og:image" content="${formData.image}">\n\n`;

    tags += `<!-- Twitter -->\n`;
    tags += `<meta property="twitter:card" content="${formData.twitterCard}">\n`;
    if (formData.url) tags += `<meta property="twitter:url" content="${formData.url}">\n`;
    tags += `<meta property="twitter:title" content="${formData.title || 'Page Title'}">\n`;
    tags += `<meta property="twitter:description" content="${formData.description}">\n`;
    if (formData.image) tags += `<meta property="twitter:image" content="${formData.image}">`;

    setOutput(tags);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Input Panel */}
        <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-14 h-14 rounded-2xl bg-[var(--accent-red)] flex items-center justify-center text-white shadow-xl shadow-red-600/20">
              <Layout className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-black uppercase tracking-tight text-[var(--text-primary)]">Meta Data Config</h3>
              <p className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest">Global SEO Standards</p>
            </div>
          </div>

          <div className="space-y-6">
             <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3 ml-1">Page Title (Max 60 chars)</label>
                <input
                  type="text"
                  maxLength={60}
                  value={formData.title}
                  onChange={(e) => updateField('title', e.target.value)}
                  placeholder="The best SEO Tools Suite - VDesignU"
                  className="w-full px-6 py-4 bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] rounded-2xl text-[var(--text-primary)] font-bold focus:border-[var(--accent-red)] focus:outline-none transition-all"
                />
                <div className="mt-2 flex justify-end">
                   <span className={`text-[10px] font-bold ${formData.title.length > 55 ? 'text-red-500' : 'text-green-500'}`}>
                      {formData.title.length}/60
                   </span>
                </div>
             </div>

             <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3 ml-1">Meta Description (Max 160 chars)</label>
                <textarea
                  maxLength={160}
                  value={formData.description}
                  onChange={(e) => updateField('description', e.target.value)}
                  placeholder="Boost your website's visibility with our free, professional-grade SEO tools suite..."
                  rows={3}
                  className="w-full px-6 py-4 bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] rounded-2xl text-[var(--text-primary)] font-bold focus:border-[var(--accent-red)] focus:outline-none transition-all resize-none"
                />
                <div className="mt-2 flex justify-end">
                   <span className={`text-[10px] font-bold ${formData.description.length > 150 ? 'text-red-500' : 'text-green-500'}`}>
                      {formData.description.length}/160
                   </span>
                </div>
             </div>

             <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3 ml-1">Canonical URL</label>
                   <input
                     type="url"
                     value={formData.url}
                     onChange={(e) => updateField('url', e.target.value)}
                     placeholder="https://vdesignu.com"
                     className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl text-[var(--text-primary)] text-sm font-bold focus:border-[var(--accent-red)] focus:outline-none"
                   />
                </div>
                <div>
                   <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3 ml-1">Author</label>
                   <input
                     type="text"
                     value={formData.author}
                     onChange={(e) => updateField('author', e.target.value)}
                     placeholder="VDesignU"
                     className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl text-[var(--text-primary)] text-sm font-bold focus:border-[var(--accent-red)] focus:outline-none"
                   />
                </div>
             </div>

             <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3 ml-1">OG Image URL (1200x630px recommended)</label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => updateField('image', e.target.value)}
                  placeholder="https://vdesignu.com/og-image.jpg"
                  className="w-full px-6 py-4 bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] rounded-2xl text-[var(--text-primary)] font-bold focus:border-[var(--accent-red)] focus:outline-none transition-all"
                />
             </div>

             <button
                onClick={generateTags}
                className="w-full py-6 bg-[var(--accent-red)] text-white font-black italic uppercase tracking-tighter text-2xl rounded-2xl hover:bg-black transition-all active:scale-[0.98] shadow-2xl shadow-red-600/20 flex items-center justify-center gap-3 mt-4"
             >
                Generate HTML
                <Globe className="w-6 h-6" />
             </button>
          </div>
        </div>

        {/* Preview & Output */}
        <div className="space-y-8">
           {/* Social Preview */}
           <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] p-8 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                 <h4 className="text-sm font-black uppercase tracking-widest text-[var(--text-primary)] flex items-center gap-2">
                    <Eye className="w-4 h-4 text-[var(--accent-yellow)]" />
                    Live Social Preview
                 </h4>
                 <div className="flex gap-2">
                    <button 
                      onClick={() => setActiveTab('standard')}
                      className={`px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'standard' ? 'bg-[var(--accent-red)] text-white' : 'bg-[var(--bg-primary)] text-[var(--text-muted)]'}`}
                    >
                       Google
                    </button>
                    <button 
                      onClick={() => setActiveTab('og')}
                      className={`px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'og' ? 'bg-[#1877F2] text-white' : 'bg-[var(--bg-primary)] text-[var(--text-muted)]'}`}
                    >
                       Facebook
                    </button>
                    <button 
                      onClick={() => setActiveTab('twitter')}
                      className={`px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'twitter' ? 'bg-black text-white' : 'bg-[var(--bg-primary)] text-[var(--text-muted)]'}`}
                    >
                       X / Twitter
                    </button>
                 </div>
              </div>

              <div className="bg-[var(--bg-primary)] rounded-2xl border-2 border-[var(--border-subtle)] overflow-hidden">
                 {activeTab === 'standard' && (
                    <div className="p-6 space-y-2">
                       <p className="text-[#1a0dab] text-xl font-medium hover:underline cursor-pointer truncate">
                          {formData.title || 'Page Title will appear here'}
                       </p>
                       <p className="text-[#006621] text-sm flex items-center gap-1">
                          {formData.url || 'https://vdesignu.com'} <span className="text-[10px]">▼</span>
                       </p>
                       <p className="text-[#545454] text-sm leading-relaxed line-clamp-2">
                          {formData.description || 'Provide a compelling description to improve click-through rates on search engine results pages...'}
                       </p>
                    </div>
                 )}

                 {activeTab === 'og' && (
                    <div className="flex flex-col">
                       <div className="aspect-[1.91/1] bg-[var(--bg-secondary)] flex items-center justify-center overflow-hidden">
                          {formData.image ? (
                             <img src={formData.image} alt="OG Preview" className="w-full h-full object-cover" />
                          ) : (
                             <Share2 className="w-12 h-12 text-[var(--text-muted)] opacity-20" />
                          )}
                       </div>
                       <div className="p-4 bg-[#f2f3f5] border-t border-[#ddd]">
                          <p className="text-[#606770] text-[12px] uppercase">{new URL(formData.url || 'https://vdesignu.com').hostname}</p>
                          <p className="text-[#1d2129] font-bold text-[16px] mt-1 line-clamp-1">{formData.title || 'Page Title'}</p>
                          <p className="text-[#606770] text-[14px] mt-1 line-clamp-2">{formData.description || 'Description summary...'}</p>
                    </div>
                    </div>
                 )}

                 {activeTab === 'twitter' && (
                    <div className="flex flex-col">
                       <div className="aspect-[2/1] bg-[var(--bg-secondary)] flex items-center justify-center overflow-hidden">
                          {formData.image ? (
                             <img src={formData.image} alt="Twitter Card Preview" className="w-full h-full object-cover" />
                          ) : (
                             <Twitter className="w-12 h-12 text-[var(--text-muted)] opacity-20" />
                          )}
                       </div>
                       <div className="p-4 border-t border-[var(--border-subtle)]">
                          <p className="text-[var(--text-muted)] text-sm">{new URL(formData.url || 'https://vdesignu.com').hostname}</p>
                          <p className="text-[var(--text-primary)] font-bold text-base mt-1">{formData.title || 'Page Title'}</p>
                          <p className="text-[var(--text-secondary)] text-sm mt-1 line-clamp-2">{formData.description || 'Description...'}</p>
                       </div>
                    </div>
                 )}
              </div>
           </div>

           <ToolOutput 
             output={output} 
             language="html" 
             title="Generated Meta Tags"
           />
        </div>
      </div>
    </div>
  );
}
