/**
 * BreadcrumbList Schema JSON-LD Generator
 * Generates navigation hierarchy markup
 */
import { useState } from 'react';
import { ChevronRight, Plus, Trash2, Copy, Download, Info } from 'lucide-react';
import ToolOutput from '../ToolOutput';

export default function BreadcrumbSchema() {
  const [items, setItems] = useState([
    { name: 'Home', url: 'https://vdesignu.com/' },
    { name: 'Services', url: 'https://vdesignu.com/services' }
  ]);

  const [output, setOutput] = useState('');

  const addItem = () => {
    setItems([...items, { name: '', url: '' }]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: 'name' | 'url', value: string) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const generateSchema = () => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": item.url
      }))
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
              <ChevronRight className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-black uppercase tracking-tight text-[var(--text-primary)]">Hierarchy Mapping</h3>
              <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Breadcrumb Presence</p>
            </div>
          </div>

          <div className="space-y-4">
             {items.map((item, index) => (
                <div key={index} className="flex gap-4 items-end p-6 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-2xl relative group">
                   <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[var(--accent-red)] text-white text-[10px] font-black flex items-center justify-center shadow-lg">
                      {index + 1}
                   </div>
                   <div className="flex-1 space-y-4">
                      <div>
                         <label className="block text-[9px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-1">Page Name</label>
                         <input
                           type="text"
                           value={item.name}
                           onChange={(e) => updateItem(index, 'name', e.target.value)}
                           placeholder="SEO Services"
                           className="w-full bg-transparent border-b border-[var(--border-subtle)] py-2 text-sm font-bold text-[var(--text-primary)] focus:border-[var(--accent-red)] focus:outline-none"
                         />
                      </div>
                      <div>
                         <label className="block text-[9px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-1">Absolute URL</label>
                         <input
                           type="url"
                           value={item.url}
                           onChange={(e) => updateItem(index, 'url', e.target.value)}
                           placeholder="https://vdesignu.com/services/seo"
                           className="w-full bg-transparent border-b border-[var(--border-subtle)] py-2 text-xs text-[var(--text-secondary)] focus:border-[var(--accent-red)] focus:outline-none"
                         />
                      </div>
                   </div>
                   <button 
                     onClick={() => removeItem(index)}
                     className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                   >
                      <Trash2 className="w-5 h-5" />
                   </button>
                </div>
             ))}

             <button 
               onClick={addItem}
               className="w-full py-4 border-2 border-dashed border-[var(--border-subtle)] rounded-2xl text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] hover:border-[var(--accent-red)] hover:text-[var(--accent-red)] transition-all flex items-center justify-center gap-2"
             >
                <Plus className="w-4 h-4" />
                Add Nested Level
             </button>

             <button
                onClick={generateSchema}
                className="w-full py-6 mt-6 bg-[var(--accent-red)] text-white font-black italic uppercase tracking-tighter text-2xl rounded-2xl hover:bg-black transition-all active:scale-[0.98] shadow-2xl shadow-red-600/20"
             >
                Generate Breadcrumb
             </button>
          </div>
        </div>

        {/* Output Panel */}
        <div className="space-y-8">
           <ToolOutput 
             output={output} 
             language="json" 
             title="BreadcrumbList JSON-LD"
           />
           
           <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] p-8">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-[var(--text-primary)] mb-4">Search UX Advantage</h4>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed italic">
                 Breadcrumb schema replaces the URL in search results with a clickable path. This not only improves user orientation but also establishes a clear site architecture for Google's indexing bot.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
