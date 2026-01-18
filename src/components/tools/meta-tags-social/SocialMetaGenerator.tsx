/**
 * Advanced Social Meta Generator
 * Generates Open Graph and Twitter Card tags with unified interface
 */
import { useState, useEffect } from 'react';
import { Share2, Facebook, Twitter, Linkedin, Info, Copy, Globe, Image as ImageIcon } from 'lucide-react';
import ToolOutput from '../ToolOutput';

export default function SocialMetaGenerator() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    url: '',
    image: '',
    siteName: 'VDesignU',
    twitterHandle: '@vdesignu',
    cardType: 'summary_large_image'
  });

  const [output, setOutput] = useState('');

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    let result = '<!-- Open Graph / Facebook -->\n';
    result += `<meta property="og:type" content="website" />\n`;
    result += `<meta property="og:url" content="${formData.url}" />\n`;
    result += `<meta property="og:title" content="${formData.title}" />\n`;
    result += `<meta property="og:description" content="${formData.description}" />\n`;
    result += `<meta property="og:image" content="${formData.image}" />\n\n`;

    result += '<!-- Twitter -->\n';
    result += `<meta name="twitter:card" content="${formData.cardType}" />\n`;
    result += `<meta name="twitter:url" content="${formData.url}" />\n`;
    result += `<meta name="twitter:title" content="${formData.title}" />\n`;
    result += `<meta name="twitter:description" content="${formData.description}" />\n`;
    result += `<meta name="twitter:image" content="${formData.image}" />\n`;
    if (formData.twitterHandle) {
      result += `<meta name="twitter:site" content="${formData.twitterHandle}" />\n`;
    }

    setOutput(result);
  }, [formData]);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-12 gap-12">
        {/* Settings Panel */}
        <div className="lg:col-span-7 bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] p-10 shadow-2xl">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-14 h-14 rounded-2xl bg-[var(--accent-red)] flex items-center justify-center text-white shadow-xl shadow-red-600/20">
              <Share2 className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-black uppercase tracking-tight text-[var(--text-primary)]">Social Authority</h3>
              <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Open Graph & Twitter</p>
            </div>
          </div>

          <div className="space-y-6">
             <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3 ml-1">Content Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => updateField('title', e.target.value)}
                  placeholder="The Ultimate SEO Guide 2024"
                  className="w-full px-6 py-4 bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] rounded-2xl text-[var(--text-primary)] font-bold focus:border-[var(--accent-red)] focus:outline-none transition-all"
                />
             </div>

             <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3 ml-1">Social Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => updateField('description', e.target.value)}
                  placeholder="Master the art of search engine optimization with our comprehensive guide..."
                  className="w-full px-6 py-4 bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] rounded-2xl text-[var(--text-primary)] font-bold focus:border-[var(--accent-red)] focus:outline-none transition-all"
                  rows={3}
                />
             </div>

             <div className="grid md:grid-cols-2 gap-4">
                <div>
                   <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3 ml-1">Page URL</label>
                   <input
                     type="url"
                     value={formData.url}
                     onChange={(e) => updateField('url', e.target.value)}
                     placeholder="https://vdesignu.com/blog/seo"
                     className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl text-[var(--text-primary)] font-bold focus:border-[var(--accent-red)]"
                   />
                </div>
                <div>
                   <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3 ml-1">Image URL</label>
                   <input
                     type="url"
                     value={formData.image}
                     onChange={(e) => updateField('image', e.target.value)}
                     placeholder="https://vdesignu.com/og-image.jpg"
                     className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl text-[var(--text-primary)] font-bold focus:border-[var(--accent-red)]"
                   />
                </div>
             </div>

             <div className="pt-6 border-t border-[var(--border-subtle)] grid grid-cols-2 gap-4">
                <div>
                   <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3 ml-1">Twitter Card</label>
                   <select 
                     value={formData.cardType}
                     onChange={(e) => updateField('cardType', e.target.value)}
                     className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl text-[var(--text-primary)] font-bold"
                   >
                      <option value="summary_large_image">Large Image</option>
                      <option value="summary">Small Image</option>
                   </select>
                </div>
                <div>
                   <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3 ml-1">Twitter Handle</label>
                   <input
                     type="text"
                     value={formData.twitterHandle}
                     onChange={(e) => updateField('twitterHandle', e.target.value)}
                     className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl text-[var(--text-primary)] font-bold"
                   />
                </div>
             </div>
          </div>
        </div>

        {/* Live Preview Panel */}
        <div className="lg:col-span-5 space-y-8">
           <div className="bg-[#1877F2] p-8 rounded-[2.5rem] text-white shadow-2xl">
              <div className="flex items-center gap-2 mb-4">
                 <Facebook className="w-5 h-5 fill-current" />
                 <span className="text-[10px] font-black uppercase tracking-[0.2em]">Facebook Preview</span>
              </div>
              <div className="bg-white rounded-xl overflow-hidden text-black">
                 {formData.image ? (
                   <img src={formData.image} alt="OG Preview" className="w-full h-48 object-cover border-b" />
                 ) : (
                   <div className="w-full h-48 bg-gray-100 flex items-center justify-center border-b">
                      <ImageIcon className="w-12 h-12 text-gray-300" />
                   </div>
                 )}
                 <div className="p-4 bg-gray-100">
                    <p className="text-[10px] uppercase text-gray-400 font-bold mb-1 tracking-wider">{formData.url ? new URL(formData.url).hostname : 'WEBSITE.COM'}</p>
                    <h4 className="font-bold text-lg leading-tight mb-2 line-clamp-2">{formData.title || 'Your Content Title'}</h4>
                    <p className="text-xs text-gray-500 line-clamp-2">{formData.description || 'Your eye-catching social description goes here.'}</p>
                 </div>
              </div>
           </div>

           <ToolOutput 
             output={output} 
             language="html" 
             title="Social Meta Tags"
           />
        </div>
      </div>
    </div>
  );
}
