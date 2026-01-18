/**
 * GA4 Ecommerce Event Generator
 * Generates dataLayer push code for purchase, add_to_cart, etc.
 */
import { useState, useEffect } from 'react';
import { ShoppingCart, Plus, Trash2, Copy, Download, Info, Tag, Package } from 'lucide-react';
import ToolOutput from '../ToolOutput';

export default function GA4Ecommerce() {
  const [eventName, setEventName] = useState('purchase');
  const [currency, setCurrency] = useState('SAR');
  const [transactionId, setTransactionId] = useState('T-12345');
  const [value, setValue] = useState('450.00');
  const [items, setItems] = useState([
    { item_name: 'SEO Audit Pro', item_id: 'SKU_001', price: '450.00', quantity: 1 }
  ]);

  const [output, setOutput] = useState('');

  const addItem = () => {
    setItems([...items, { item_name: '', item_id: '', price: '0.00', quantity: 1 }]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: string, value: any) => {
    const newItems = [...items];
    (newItems[index] as any)[field] = value;
    setItems(newItems);
  };

  useEffect(() => {
    const dataLayer = {
      event: eventName,
      ecommerce: {
        transaction_id: transactionId,
        value: parseFloat(value),
        currency: currency,
        items: items.map(item => ({
          ...item,
          price: parseFloat(item.price),
          quantity: parseInt(item.quantity as any)
        }))
      }
    };

    setOutput(`window.dataLayer = window.dataLayer || [];\nwindow.dataLayer.push(${JSON.stringify(dataLayer, null, 2)});`);
  }, [eventName, currency, transactionId, value, items]);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Input Panel */}
        <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] p-10 shadow-2xl">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-14 h-14 rounded-2xl bg-[var(--accent-red)] flex items-center justify-center text-white shadow-xl shadow-red-600/20">
              <ShoppingCart className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-black uppercase tracking-tight text-[var(--text-primary)]">Transaction Tracking</h3>
              <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">GA4 Ecommerce dataLayer</p>
            </div>
          </div>

          <div className="space-y-6">
             <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3 ml-1">Event Type</label>
                   <select 
                     value={eventName}
                     onChange={(e) => setEventName(e.target.value)}
                     className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl font-bold"
                   >
                      <option value="purchase">Purchase (Success)</option>
                      <option value="add_to_cart">Add to Cart</option>
                      <option value="view_item">View Item</option>
                      <option value="begin_checkout">Begin Checkout</option>
                   </select>
                </div>
                <div>
                   <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3 ml-1">Currency</label>
                   <select 
                     value={currency}
                     onChange={(e) => setCurrency(e.target.value)}
                     className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl font-bold"
                   >
                      <option value="SAR">SAR (KSA)</option>
                      <option value="AED">AED (UAE)</option>
                      <option value="USD">USD</option>
                      <option value="QAR">QAR</option>
                   </select>
                </div>
             </div>

             <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3 ml-1">Transaction ID</label>
                   <input
                     type="text"
                     value={transactionId}
                     onChange={(e) => setTransactionId(e.target.value)}
                     className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl text-xs font-bold"
                   />
                </div>
                <div>
                   <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3 ml-1">Total Value</label>
                   <input
                     type="number"
                     value={value}
                     onChange={(e) => setValue(e.target.value)}
                     className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl text-xs font-bold"
                   />
                </div>
             </div>

             <div className="pt-6 border-t border-[var(--border-subtle)]">
                <div className="flex items-center justify-between mb-4">
                   <h4 className="text-[10px] font-black uppercase tracking-widest text-[var(--text-primary)]">Order Items</h4>
                   <button onClick={addItem} className="text-[10px] font-black uppercase text-[var(--accent-red)] hover:underline">+ Add Item</button>
                </div>
                
                <div className="space-y-3">
                   {items.map((item, index) => (
                      <div key={index} className="p-4 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl space-y-3 relative group">
                         <div className="flex gap-2">
                            <input
                              type="text"
                              value={item.item_name}
                              onChange={(e) => updateItem(index, 'item_name', e.target.value)}
                              placeholder="Product Name"
                              className="flex-1 bg-transparent border-b border-[var(--border-subtle)] py-1 text-xs font-bold focus:border-[var(--accent-red)] focus:outline-none"
                            />
                            <button onClick={() => removeItem(index)} className="p-1 text-red-500 hover:bg-red-50 rounded-lg">
                               <Trash2 className="w-3 h-3" />
                            </button>
                         </div>
                         <div className="grid grid-cols-3 gap-2">
                            <div className="flex items-center gap-1">
                               <Tag className="w-3 h-3 text-[var(--text-muted)]" />
                               <input
                                 type="text"
                                 value={item.item_id}
                                 onChange={(e) => updateItem(index, 'item_id', e.target.value)}
                                 placeholder="SKU"
                                 className="w-full bg-transparent border-b border-[var(--border-subtle)] py-1 text-[10px] focus:outline-none"
                               />
                            </div>
                            <div className="flex items-center gap-1">
                               <Package className="w-3 h-3 text-[var(--text-muted)]" />
                               <input
                                 type="number"
                                 value={item.quantity}
                                 onChange={(e) => updateItem(index, 'quantity', e.target.value)}
                                 className="w-full bg-transparent border-b border-[var(--border-subtle)] py-1 text-[10px] focus:outline-none"
                               />
                            </div>
                            <div className="flex items-center gap-1 font-bold">
                               <span className="text-[10px] text-[var(--text-muted)]">$</span>
                               <input
                                 type="number"
                                 value={item.price}
                                 onChange={(e) => updateItem(index, 'price', e.target.value)}
                                 className="w-full bg-transparent border-b border-[var(--border-subtle)] py-1 text-[10px] focus:outline-none"
                               />
                            </div>
                         </div>
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
             title="dataLayer Push Code"
           />
           
           <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] p-8">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-[var(--text-primary)] mb-4 flex items-center gap-2">
                 <Info className="w-4 h-4 text-[var(--accent-red)]" /> Strategic Insight
              </h4>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed italic">
                 GA4 Ecommerce tracking is essential for calculating Customer Acquisition Cost (CAC) and Return on Ad Spend (ROAS). For VDESIGNU enterprise partners, we implement these schemas to bridge the gap between search impressions and actual revenue in SAR/AED.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
