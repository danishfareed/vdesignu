/**
 * HowTo Schema JSON-LD Generator
 * Generates structured data for step-by-step instructions
 */
import { useState } from 'react';
import { ListOrdered, Plus, Trash2, Copy, Download, Info } from 'lucide-react';
import ToolOutput from '../ToolOutput';

export default function HowToSchema() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    totalTime: 'PT15M',
    estimatedCost: '0',
    currency: 'AED',
    steps: [
      { name: 'First Step', text: 'Detailed instructions for step 1', image: '' },
      { name: 'Second Step', text: 'Detailed instructions for step 2', image: '' }
    ]
  });

  const [output, setOutput] = useState('');

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateStep = (index: number, field: string, value: string) => {
    const newSteps = [...formData.steps];
    (newSteps[index] as any)[field] = value;
    setFormData(prev => ({ ...prev, steps: newSteps }));
  };

  const addStep = () => {
    setFormData(prev => ({
      ...prev,
      steps: [...prev.steps, { name: '', text: '', image: '' }]
    }));
  };

  const removeStep = (index: number) => {
    const newSteps = formData.steps.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, steps: newSteps }));
  };

  const generateSchema = () => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": formData.name || "How to...",
      "description": formData.description,
      "totalTime": formData.totalTime,
      "estimatedCost": {
        "@type": "HowToSupply",
        "estimatedCost": {
          "@type": "MonetaryAmount",
          "currency": formData.currency,
          "value": formData.estimatedCost
        }
      },
      "step": formData.steps.map(step => ({
        "@type": "HowToStep",
        "name": step.name,
        "itemListElement": [{
           "@type": "HowToDirection",
           "text": step.text
        }],
        "image": step.image ? step.image : undefined
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
              <ListOrdered className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-black uppercase tracking-tight text-[var(--text-primary)]">Tutorial Details</h3>
              <p className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest">Instructional SEO</p>
            </div>
          </div>

          <div className="space-y-6">
             <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3 ml-1">Tutorial Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  placeholder="e.g. How to Setup GTM in 5 Minutes"
                  className="w-full px-6 py-4 bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] rounded-2xl text-[var(--text-primary)] font-bold focus:border-[var(--accent-red)] focus:outline-none transition-all"
                />
             </div>

             <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3 ml-1">Total Time (ISO 8601)</label>
                   <input
                     type="text"
                     value={formData.totalTime}
                     onChange={(e) => updateField('totalTime', e.target.value)}
                     placeholder="PT15M"
                     className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl text-[var(--text-primary)] font-bold focus:border-[var(--accent-red)] focus:outline-none"
                   />
                </div>
                <div>
                   <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3 ml-1">Estimated Cost</label>
                   <div className="flex gap-2">
                      <input
                        type="number"
                        value={formData.estimatedCost}
                        onChange={(e) => updateField('estimatedCost', e.target.value)}
                        className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl text-[var(--text-primary)] font-bold focus:border-[var(--accent-red)] focus:outline-none"
                      />
                      <select 
                        value={formData.currency}
                        onChange={(e) => updateField('currency', e.target.value)}
                        className="bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl px-2 font-black text-[10px]"
                      >
                         <option value="AED">AED</option>
                         <option value="USD">USD</option>
                         <option value="SAR">SAR</option>
                      </select>
                   </div>
                </div>
             </div>

             <div className="pt-6 border-t border-[var(--border-subtle)]">
                <div className="flex items-center justify-between mb-6">
                   <h4 className="text-xs font-black uppercase tracking-widest text-[var(--text-primary)]">Steps Configuration</h4>
                   <button 
                     onClick={addStep}
                     className="px-4 py-2 bg-[var(--bg-primary)] border border-[var(--accent-red)] text-[var(--accent-red)] text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-[var(--accent-red)] hover:text-white transition-all"
                   >
                      Add Step
                   </button>
                </div>

                <div className="space-y-6">
                   {formData.steps.map((step, index) => (
                      <div key={index} className="p-6 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-2xl relative group">
                         <button 
                           onClick={() => removeStep(index)}
                           className="absolute top-4 right-4 text-[var(--text-muted)] hover:text-red-500 transition-colors"
                         >
                            <Trash2 className="w-4 h-4" />
                         </button>
                         <div className="space-y-4">
                            <input
                              type="text"
                              value={step.name}
                              onChange={(e) => updateStep(index, 'name', e.target.value)}
                              placeholder={`Step ${index + 1} Title`}
                              className="w-full bg-transparent border-b border-[var(--border-subtle)] py-2 text-sm font-bold text-[var(--text-primary)] focus:border-[var(--accent-red)] focus:outline-none"
                            />
                            <textarea
                              value={step.text}
                              onChange={(e) => updateStep(index, 'text', e.target.value)}
                              placeholder="Describe the actions in this step..."
                              rows={2}
                              className="w-full bg-transparent text-xs text-[var(--text-secondary)] focus:outline-none resize-none"
                            />
                         </div>
                      </div>
                   ))}
                </div>
             </div>

             <button
                onClick={generateSchema}
                className="w-full py-6 bg-[var(--accent-red)] text-white font-black italic uppercase tracking-tighter text-2xl rounded-2xl hover:bg-black transition-all active:scale-[0.98] shadow-2xl shadow-red-600/20"
             >
                Generate HowTo Schema
             </button>
          </div>
        </div>

        {/* Output Panel */}
        <div className="space-y-8">
           <ToolOutput 
             output={output} 
             language="json" 
             title="HowTo Structured Data"
           />
           
           <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] p-8">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-[var(--text-primary)] mb-4">Rich Results Bonus</h4>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed italic">
                 HowTo schema allows your content to be displayed as an interactive step-by-step list in search results, often including total time and cost information. This is exceptionally powerful for capturing high-intent tutorial traffic.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
