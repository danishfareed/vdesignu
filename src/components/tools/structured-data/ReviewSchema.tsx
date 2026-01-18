/**
 * Aggregate Rating & Review Schema JSON-LD Generator
 * Generates structured data for ratings and testimonials
 */
import { useState } from 'react';
import { Star, Plus, Trash2, Copy, Download, Info, User } from 'lucide-react';
import ToolOutput from '../ToolOutput';

export default function ReviewSchema() {
  const [formData, setFormData] = useState({
    itemType: 'Product',
    itemName: '',
    ratingValue: '4.8',
    bestRating: '5',
    worstRating: '1',
    reviewCount: '156',
    ratingCount: '156',
    reviews: [
      { author: 'Ahmed K.', date: '2024-03-15', rating: '5', body: 'Excellent results and fast performance.' }
    ]
  });

  const [output, setOutput] = useState('');

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateReview = (index: number, field: string, value: string) => {
    const newReviews = [...formData.reviews];
    (newReviews[index] as any)[field] = value;
    setFormData(prev => ({ ...prev, reviews: newReviews }));
  };

  const addReview = () => {
    setFormData(prev => ({
      ...prev,
      reviews: [...prev.reviews, { author: '', date: '', rating: '5', body: '' }]
    }));
  };

  const removeReview = (index: number) => {
    const newReviews = formData.reviews.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, reviews: newReviews }));
  };

  const generateSchema = () => {
    const schema: any = {
      "@context": "https://schema.org",
      "@type": formData.itemType,
      "name": formData.itemName || "Item Name",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": formData.ratingValue,
        "bestRating": formData.bestRating,
        "worstRating": formData.worstRating,
        "ratingCount": formData.ratingCount,
        "reviewCount": formData.reviewCount
      },
      "review": formData.reviews.map(review => ({
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": review.author
        },
        "datePublished": review.date,
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": review.rating
        },
        "reviewBody": review.body
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
              <Star className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-black uppercase tracking-tight text-[var(--text-primary)]">Social Proof</h3>
              <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Aggregate Rating</p>
            </div>
          </div>

          <div className="space-y-6">
             <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3 ml-1">Item Type</label>
                   <select 
                     value={formData.itemType}
                     onChange={(e) => updateField('itemType', e.target.value)}
                     className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl text-[var(--text-primary)] font-bold focus:border-[var(--accent-red)] focus:outline-none"
                   >
                      <option value="Product">Product</option>
                      <option value="LocalBusiness">Local Business</option>
                      <option value="Course">Course</option>
                      <option value="Service">Service</option>
                   </select>
                </div>
                <div>
                   <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3 ml-1">Target Name</label>
                   <input
                     type="text"
                     value={formData.itemName}
                     onChange={(e) => updateField('itemName', e.target.value)}
                     className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl text-[var(--text-primary)] font-bold focus:border-[var(--accent-red)] focus:outline-none"
                     placeholder="e.g. SEO Audit Pro"
                   />
                </div>
             </div>

             <div className="grid grid-cols-3 gap-4">
                <div>
                   <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3 ml-1">Rating Value</label>
                   <input
                     type="number"
                     step="0.1"
                     value={formData.ratingValue}
                     onChange={(e) => updateField('ratingValue', e.target.value)}
                     className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl text-[var(--text-primary)] font-bold"
                   />
                </div>
                <div>
                   <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3 ml-1">Best</label>
                   <input
                     type="number"
                     value={formData.bestRating}
                     onChange={(e) => updateField('bestRating', e.target.value)}
                     className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl text-[var(--text-primary)] font-bold"
                   />
                </div>
                <div>
                   <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3 ml-1">Worst</label>
                   <input
                     type="number"
                     value={formData.worstRating}
                     onChange={(e) => updateField('worstRating', e.target.value)}
                     className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl text-[var(--text-primary)] font-bold"
                   />
                </div>
             </div>

             <div className="grid grid-cols-2 gap-4 pt-6 border-t border-[var(--border-subtle)]">
                <div>
                   <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3 ml-1">Total Reviews</label>
                   <input
                     type="number"
                     value={formData.reviewCount}
                     onChange={(e) => updateField('reviewCount', e.target.value)}
                     className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl text-[var(--text-primary)] font-bold"
                   />
                </div>
                <div>
                   <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3 ml-1">Total Ratings</label>
                   <input
                     type="number"
                     value={formData.ratingCount}
                     onChange={(e) => updateField('ratingCount', e.target.value)}
                     className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl text-[var(--text-primary)] font-bold"
                   />
                </div>
             </div>

             <button
                onClick={generateSchema}
                className="w-full py-6 mt-6 bg-[var(--accent-red)] text-white font-black italic uppercase tracking-tighter text-2xl rounded-2xl hover:bg-black transition-all active:scale-[0.98] shadow-2xl shadow-red-600/20"
             >
                Generate Social Proof
             </button>
          </div>
        </div>

        {/* Output Panel */}
        <div className="space-y-8">
           <ToolOutput 
             output={output} 
             language="json" 
             title="Aggregate Review JSON-LD"
           />
           
           <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] p-8 space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-[var(--accent-red)] flex items-center gap-2">
                 <Info className="w-4 h-4" /> Rich Snippet Rule
              </h4>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed italic">
                 Google displays aggregate star ratings for Products and SoftwareApps, but is more strict with LocalBusiness and Organization ratings (often requiring third-party validation). Using structured data is the best way to earn those gold stars in SERPs.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
