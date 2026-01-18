/**
 * Article / BlogPosting Schema JSON-LD Generator
 * Generates structured data for news and blog content
 */
import { useState } from 'react';
import { FileText, Plus, Trash2, Copy, Download, Check, Info } from 'lucide-react';
import ToolOutput from '../ToolOutput';

export default function ArticleSchema() {
  const [formData, setFormData] = useState({
    headline: '',
    image: '',
    authorName: '',
    authorType: 'Person',
    publisherName: 'VDesignU',
    datePublished: new Date().toISOString().split('T')[0],
    dateModified: new Date().toISOString().split('T')[0],
    description: ''
  });

  const [output, setOutput] = useState('');

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateSchema = () => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": formData.headline || "Article Headline",
      "image": formData.image ? [formData.image] : [],
      "author": {
        "@type": formData.authorType,
        "name": formData.authorName || "Author Name"
      },
      "publisher": {
        "@type": "Organization",
        "name": formData.publisherName,
        "logo": {
          "@type": "ImageObject",
          "url": "https://vdesignu.com/logo.png"
        }
      },
      "datePublished": formData.datePublished,
      "dateModified": formData.dateModified,
      "description": formData.description
    };

    setOutput(JSON.stringify(schema, null, 2));
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Input Panel */}
        <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] p-10 shadow-2xl">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-14 h-14 rounded-2xl bg-[var(--accent-red)] flex items-center justify-center text-white shadow-xl shadow-red-600/20">
              <FileText className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-black uppercase tracking-tight text-[var(--text-primary)]">Article Settings</h3>
              <p className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest">Content Authority</p>
            </div>
          </div>

          <div className="space-y-6">
             <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3 ml-1">Headline</label>
                <input
                  type="text"
                  value={formData.headline}
                  onChange={(e) => updateField('headline', e.target.value)}
                  placeholder="e.g. 10 Best SEO Strategies for 2024"
                  className="w-full px-6 py-4 bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] rounded-2xl text-[var(--text-primary)] font-bold focus:border-[var(--accent-red)] focus:outline-none transition-all"
                />
             </div>

             <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3 ml-1">Author Name</label>
                   <input
                     type="text"
                     value={formData.authorName}
                     onChange={(e) => updateField('authorName', e.target.value)}
                     placeholder="Danish Fareed"
                     className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl text-[var(--text-primary)] font-bold focus:border-[var(--accent-red)] focus:outline-none"
                   />
                </div>
                <div>
                   <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3 ml-1">Author Type</label>
                   <select
                     value={formData.authorType}
                     onChange={(e) => updateField('authorType', e.target.value)}
                     className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl text-[var(--text-primary)] font-bold focus:border-[var(--accent-red)] focus:outline-none"
                   >
                      <option value="Person">Person</option>
                      <option value="Organization">Organization</option>
                   </select>
                </div>
             </div>

             <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3 ml-1">Date Published</label>
                   <input
                     type="date"
                     value={formData.datePublished}
                     onChange={(e) => updateField('datePublished', e.target.value)}
                     className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl text-[var(--text-primary)] font-bold focus:border-[var(--accent-red)] focus:outline-none"
                   />
                </div>
                <div>
                   <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3 ml-1">Date Modified</label>
                   <input
                     type="date"
                     value={formData.dateModified}
                     onChange={(e) => updateField('dateModified', e.target.value)}
                     className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl text-[var(--text-primary)] font-bold focus:border-[var(--accent-red)] focus:outline-none"
                   />
                </div>
             </div>

             <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3 ml-1">Featured Image URL</label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => updateField('image', e.target.value)}
                  placeholder="https://vdesignu.com/blog/image.jpg"
                  className="w-full px-6 py-4 bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] rounded-2xl text-[var(--text-primary)] font-bold focus:border-[var(--accent-red)] focus:outline-none transition-all"
                />
             </div>

             <button
                onClick={generateSchema}
                className="w-full py-6 bg-[var(--accent-red)] text-white font-black italic uppercase tracking-tighter text-2xl rounded-2xl hover:bg-black transition-all active:scale-[0.98] shadow-2xl shadow-red-600/20"
             >
                Generate Article Schema
             </button>
          </div>
        </div>

        {/* Output Panel */}
        <div className="space-y-8">
           <ToolOutput 
             output={output} 
             language="json" 
             title="Article JSON-LD"
           />
           
           <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] p-8">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-[var(--accent-red)] mb-4">SEO Benefits</h4>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                 Article schema helps Google understand your content better and can lead to placement in the <strong>Top Stories</strong> carousel or Google Discover. It also establishes <strong>E-E-A-T</strong> (Experience, Expertise, Authoritativeness, and Trustworthiness) by explicitly linking the author and publisher.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
