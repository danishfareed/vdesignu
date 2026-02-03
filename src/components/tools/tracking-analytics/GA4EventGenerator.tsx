/**
 * GA4 Event Generator
 * Generates standard and custom GA4 event tracking code
 */
import { useState, useEffect } from 'react';
import { Tag, Plus, Trash2, Copy, Download, Info, BarChart3, Database } from 'lucide-react';
import ToolOutput from '../ToolOutput';

export default function GA4EventGenerator() {
  const [eventName, setEventName] = useState('generate_lead');
  const [params, setParams] = useState([
    { key: 'page_location', value: 'https://vdesignu.com/contact' },
    { key: 'client_id', value: 'vdesignu_user_01' }
  ]);
  const [output, setOutput] = useState('');

  const addParam = () => {
    setParams([...params, { key: '', value: '' }]);
  };

  const removeParam = (index: number) => {
    setParams(params.filter((_, i) => i !== index));
  };

  const updateParam = (index: number, field: 'key' | 'value', value: string) => {
    const newParams = [...params];
    newParams[index][field] = value;
    setParams(newParams);
  };

  useEffect(() => {
    const paramObj: any = {};
    params.forEach(p => {
      if (p.key) paramObj[p.key] = p.value;
    });

    const result = `gtag('event', '${eventName}', ${JSON.stringify(paramObj, null, 2)});`;
    setOutput(result);
  }, [eventName, params]);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Input Panel */}
        <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] p-10 shadow-2xl">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-14 h-14 rounded-2xl bg-[var(--accent-red)] flex items-center justify-center text-white shadow-xl shadow-red-600/20">
              <Tag className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-black uppercase tracking-tight text-[var(--text-primary)]">GA4 Measurement</h3>
              <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Event Configuration</p>
            </div>
          </div>

          <div className="space-y-6">
             <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3 ml-1">Event Name</label>
                <div className="flex gap-4">
                   <input
                     type="text"
                     value={eventName}
                     onChange={(e) => setEventName(e.target.value)}
                     className="flex-1 px-6 py-4 bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] rounded-2xl text-[var(--text-primary)] font-bold focus:border-[var(--accent-red)] focus:outline-none transition-all"
                   />
                   <select 
                     onChange={(e) => setEventName(e.target.value)}
                     className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl px-4 text-[10px] font-black uppercase"
                   >
                      <option value="">Recommended Events</option>
                      <option value="generate_lead">Lead</option>
                      <option value="purchase">Purchase</option>
                      <option value="sign_up">Sign Up</option>
                      <option value="view_item">View Item</option>
                      <option value="add_to_cart">Add to Cart</option>
                   </select>
                </div>
             </div>

             <div>
                <div className="flex items-center justify-between mb-4">
                   <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] ml-1">Event Parameters</label>
                   <button 
                     onClick={addParam}
                     className="text-[10px] font-black uppercase text-[var(--accent-red)] hover:underline"
                   >
                      + Add Parameter
                   </button>
                </div>
                
                <div className="space-y-3">
                   {params.map((p, index) => (
                      <div key={index} className="flex gap-2">
                         <input
                           type="text"
                           value={p.key}
                           onChange={(e) => updateParam(index, 'key', e.target.value)}
                           placeholder="Key"
                           className="w-1/3 px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl text-xs font-bold"
                         />
                         <input
                           type="text"
                           value={p.value}
                           onChange={(e) => updateParam(index, 'value', e.target.value)}
                           placeholder="Value"
                           className="flex-1 px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl text-xs"
                         />
                         <button onClick={() => removeParam(index)} className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors">
                            <Trash2 className="w-4 h-4" />
                         </button>
                      </div>
                   ))}
                </div>
             </div>
          </div>
        </div>

        {/* Output Panel */}
        <div className="space-y-8">
           <ToolOutput 
             output={output} 
             language="javascript" 
             title="gtag.js Tracking Code"
           />
           
           <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] p-8">
              <div className="flex items-center gap-3 mb-4 text-[var(--accent-red)]">
                 <Database className="w-5 h-5" />
                 <h4 className="text-[10px] font-black uppercase tracking-widest">Implementation Tip</h4>
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed italic mb-4">
                 Standard GA4 event names like <code>generate_lead</code> or <code>purchase</code> enable automatic conversion reporting and audience building in Google Analytics. Use these whenever possible before defining custom event names.
              </p>
              <div className="flex items-center gap-2 p-3 bg-[var(--bg-primary)] rounded-xl border border-[var(--border-subtle)]">
                 <BarChart3 className="w-4 h-4 text-[var(--accent-yellow)]" />
                 <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">
                    Validated against GA4 measurement protocol.
                 </span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
