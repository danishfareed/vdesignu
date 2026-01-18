/**
 * Product Schema JSON-LD Generator
 * Generates structured data for ecommerce products
 */
import { useState } from 'react';
import { ShoppingBag, Plus, Trash2, Copy, Download, Check, Info } from 'lucide-react';
import ToolOutput from '../ToolOutput';

export default function ProductSchema() {
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    description: '',
    brand: '',
    sku: '',
    currency: 'AED',
    price: '',
    availability: 'https://schema.org/InStock',
    condition: 'https://schema.org/NewCondition',
    ratingValue: '',
    reviewCount: ''
  });

  const [output, setOutput] = useState('');

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateSchema = () => {
    const schema: any = {
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": formData.name || "Product Name",
      "image": formData.image ? [formData.image] : [],
      "description": formData.description,
      "sku": formData.sku,
      "brand": {
        "@type": "Brand",
        "name": formData.brand || "Brand Name"
      },
      "offers": {
        "@type": "Offer",
        "url": window.location.href,
        "priceCurrency": formData.currency,
        "price": formData.price,
        "availability": formData.availability,
        "itemCondition": formData.condition
      }
    };

    if (formData.ratingValue && formData.reviewCount) {
      schema.aggregateRating = {
        "@type": "AggregateRating",
        "ratingValue": formData.ratingValue,
        "reviewCount": formData.reviewCount
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
              <ShoppingBag className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-black uppercase tracking-tight text-[var(--text-primary)]">Product Details</h3>
              <p className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest">Ecommerce Rich Results</p>
            </div>
          </div>

          <div className="space-y-6">
             <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3 ml-1">Product Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  placeholder="e.g. Ultra Slim Laptop Pro"
                  className="w-full px-6 py-4 bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] rounded-2xl text-[var(--text-primary)] font-bold focus:border-[var(--accent-red)] focus:outline-none transition-all"
                />
             </div>

             <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3 ml-1">Price</label>
                   <input
                     type="number"
                     value={formData.price}
                     onChange={(e) => updateField('price', e.target.value)}
                     placeholder="2999"
                     className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl text-[var(--text-primary)] font-bold focus:border-[var(--accent-red)] focus:outline-none"
                   />
                </div>
                <div>
                   <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3 ml-1">Currency</label>
                   <select
                     value={formData.currency}
                     onChange={(e) => updateField('currency', e.target.value)}
                     className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl text-[var(--text-primary)] font-bold focus:border-[var(--accent-red)] focus:outline-none"
                   >
                      <option value="AED">AED</option>
                      <option value="SAR">SAR</option>
                      <option value="USD">USD</option>
                      <option value="GBP">GBP</option>
                      <option value="EUR">EUR</option>
                   </select>
                </div>
             </div>

             <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3 ml-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => updateField('description', e.target.value)}
                  placeholder="Comprehensive description of the product and features..."
                  rows={3}
                  className="w-full px-6 py-4 bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] rounded-2xl text-[var(--text-primary)] font-bold focus:border-[var(--accent-red)] focus:outline-none transition-all"
                />
             </div>

             <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3 ml-1">Brand</label>
                   <input
                     type="text"
                     value={formData.brand}
                     onChange={(e) => updateField('brand', e.target.value)}
                     placeholder="TechBrand"
                     className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl text-[var(--text-primary)] font-bold focus:border-[var(--accent-red)] focus:outline-none"
                   />
                </div>
                <div>
                   <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3 ml-1">SKU</label>
                   <input
                     type="text"
                     value={formData.sku}
                     onChange={(e) => updateField('sku', e.target.value)}
                     placeholder="TECH-101-PRO"
                     className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl text-[var(--text-primary)] font-bold focus:border-[var(--accent-red)] focus:outline-none"
                   />
                </div>
             </div>

             <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3 ml-1">Rating (1-5)</label>
                   <input
                     type="number"
                     step="0.1"
                     min="1"
                     max="5"
                     value={formData.ratingValue}
                     onChange={(e) => updateField('ratingValue', e.target.value)}
                     placeholder="4.8"
                     className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl text-[var(--text-primary)] font-bold focus:border-[var(--accent-red)] focus:outline-none"
                   />
                </div>
                <div>
                   <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3 ml-1">Reviews Count</label>
                   <input
                     type="number"
                     value={formData.reviewCount}
                     onChange={(e) => updateField('reviewCount', e.target.value)}
                     placeholder="124"
                     className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl text-[var(--text-primary)] font-bold focus:border-[var(--accent-red)] focus:outline-none"
                   />
                </div>
             </div>

             <button
                onClick={generateSchema}
                className="w-full py-6 bg-[var(--accent-red)] text-white font-black italic uppercase tracking-tighter text-2xl rounded-2xl hover:bg-black transition-all active:scale-[0.98] shadow-2xl shadow-red-600/20"
             >
                Generate JSON-LD
             </button>
          </div>
        </div>

        {/* Output Panel */}
        <div className="space-y-8">
           <ToolOutput 
             output={output} 
             language="json" 
             title="Product Structured Data"
           />
           
           <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] p-8">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-[var(--accent-red)] mb-4">Pro Implementation</h4>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                 Product schema is vital for ecommerce. When correctly implemented, it enables <strong>Google Rich Results</strong> including price, availability, and star ratings directly in search results, significantly increasing CTR.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
