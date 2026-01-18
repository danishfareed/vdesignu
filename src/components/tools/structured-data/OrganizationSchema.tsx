/**
 * Organization Schema JSON-LD Generator
 * Generates structured data for brand and company identity
 */
import { useState } from 'react';
import { Building, Plus, Trash2, Copy, Download, Link, Info } from 'lucide-react';
import ToolOutput from '../ToolOutput';

export default function OrganizationSchema() {
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    logo: '',
    description: '',
    sameAs: ['', ''],
    contactType: 'customer service',
    telephone: '',
    email: ''
  });

  const [output, setOutput] = useState('');

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateSameAs = (index: number, value: string) => {
    const newSameAs = [...formData.sameAs];
    newSameAs[index] = value;
    setFormData(prev => ({ ...prev, sameAs: newSameAs }));
  };

  const addSameAs = () => {
    setFormData(prev => ({ ...prev, sameAs: [...prev.sameAs, ''] }));
  };

  const removeSameAs = (index: number) => {
    const newSameAs = formData.sameAs.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, sameAs: newSameAs }));
  };

  const generateSchema = () => {
    const schema: any = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": formData.name || "Organization Name",
      "url": formData.url,
      "logo": formData.logo,
      "description": formData.description,
      "sameAs": formData.sameAs.filter(link => link.trim() !== '')
    };

    if (formData.telephone || formData.email) {
      schema.contactPoint = {
        "@type": "ContactPoint",
        "telephone": formData.telephone,
        "contactType": formData.contactType,
        "email": formData.email
      };
    }

    setOutput(JSON.stringify(schema, null, 2));
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Input Panel */}
        <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] p-10 shadow-2xl">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-14 h-14 rounded-2xl bg-[var(--accent-red)] flex items-center justify-center text-white shadow-xl shadow-red-600/20">
              <Building className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-black uppercase tracking-tight text-[var(--text-primary)]">Organization Info</h3>
              <p className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest">Brand Authority</p>
            </div>
          </div>

          <div className="space-y-6">
             <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3 ml-1">Organization Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  placeholder="e.g. VDesignU Tech Solutions"
                  className="w-full px-6 py-4 bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] rounded-2xl text-[var(--text-primary)] font-bold focus:border-[var(--accent-red)] focus:outline-none transition-all"
                />
             </div>

             <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3 ml-1">Website URL</label>
                   <input
                     type="url"
                     value={formData.url}
                     onChange={(e) => updateField('url', e.target.value)}
                     placeholder="https://vdesignu.com"
                     className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl text-[var(--text-primary)] font-bold focus:border-[var(--accent-red)] focus:outline-none"
                   />
                </div>
                <div>
                   <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3 ml-1">Logo URL</label>
                   <input
                     type="url"
                     value={formData.logo}
                     onChange={(e) => updateField('logo', e.target.value)}
                     placeholder="https://vdesignu.com/logo.png"
                     className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl text-[var(--text-primary)] font-bold focus:border-[var(--accent-red)] focus:outline-none"
                   />
                </div>
             </div>

             <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3 ml-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => updateField('description', e.target.value)}
                  placeholder="Briefly describe your organization's mission and services..."
                  rows={2}
                  className="w-full px-6 py-4 bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] rounded-2xl text-[var(--text-primary)] font-bold focus:border-[var(--accent-red)] focus:outline-none transition-all"
                />
             </div>

             <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3 ml-1">Social Profiles (SameAs)</label>
                <div className="space-y-3">
                   {formData.sameAs.map((url, index) => (
                      <div key={index} className="flex gap-2">
                         <input
                           type="url"
                           value={url}
                           onChange={(e) => updateSameAs(index, e.target.value)}
                           placeholder="https://facebook.com/brand"
                           className="flex-1 px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl text-[var(--text-primary)] text-sm focus:border-[var(--accent-red)] focus:outline-none"
                         />
                         <button 
                           onClick={() => removeSameAs(index)}
                           className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                         >
                            <Trash2 className="w-5 h-5" />
                         </button>
                      </div>
                   ))}
                   <button 
                     onClick={addSameAs}
                     className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[var(--accent-red)] hover:gap-3 transition-all mt-2"
                   >
                      <Plus className="w-4 h-4" />
                      Add Profile
                   </button>
                </div>
             </div>

             <div className="pt-6 border-t border-[var(--border-subtle)] space-y-6">
                <h4 className="text-xs font-black uppercase tracking-widest text-[var(--text-primary)] flex items-center gap-2">
                   Contact Details
                </h4>
                <div className="grid grid-cols-2 gap-4">
                   <div>
                      <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3 ml-1">Phone</label>
                      <input
                        type="tel"
                        value={formData.telephone}
                        onChange={(e) => updateField('telephone', e.target.value)}
                        placeholder="+971 50..."
                        className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl text-[var(--text-primary)] font-bold focus:border-[var(--accent-red)] focus:outline-none"
                      />
                   </div>
                   <div>
                      <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3 ml-1">Email</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateField('email', e.target.value)}
                        placeholder="hello@brand.com"
                        className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl text-[var(--text-primary)] font-bold focus:border-[var(--accent-red)] focus:outline-none"
                      />
                   </div>
                </div>
             </div>

             <button
                onClick={generateSchema}
                className="w-full py-6 bg-[var(--accent-red)] text-white font-black italic uppercase tracking-tighter text-2xl rounded-2xl hover:bg-black transition-all active:scale-[0.98] shadow-2xl shadow-red-600/20"
             >
                Generate Brand Schema
             </button>
          </div>
        </div>

        {/* Output Panel */}
        <div className="space-y-8">
           <ToolOutput 
             output={output} 
             language="json" 
             title="Organization JSON-LD"
           />
           
           <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] p-8">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-[var(--accent-red)] mb-4 flex items-center gap-2">
                 <Info className="w-4 h-4" /> Knowledge Panel Tip
              </h4>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed italic">
                 Organization schema is the primary data source for Google's Knowledge Panel. Ensure your <strong>Name, Logo, and Social Profiles</strong> are consistent across the web to increase the likelihood of appearing in the brand box on SERPs.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
