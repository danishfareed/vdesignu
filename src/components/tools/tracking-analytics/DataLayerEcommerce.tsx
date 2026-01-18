/**
 * DataLayer Ecommerce Builder
 * Generates GTM dataLayer pushes for ecommerce events
 */
import { useState } from 'react';
import { Database, ShoppingCart, Copy, Plus, Trash2 } from 'lucide-react';
import ToolOutput from '../ToolOutput';

const ECOMMERCE_EVENTS = [
  { id: 'view_item', name: 'Product View', description: 'When a user views a product' },
  { id: 'add_to_cart', name: 'Add to Cart', description: 'When a user adds item to cart' },
  { id: 'remove_from_cart', name: 'Remove from Cart', description: 'When a user removes item' },
  { id: 'begin_checkout', name: 'Begin Checkout', description: 'When checkout starts' },
  { id: 'purchase', name: 'Purchase', description: 'When transaction completes' },
  { id: 'view_item_list', name: 'View Item List', description: 'When viewing category/list' }
];

export default function DataLayerEcommerce() {
  const [eventType, setEventType] = useState('purchase');
  const [currency, setCurrency] = useState('AED');
  const [transactionId, setTransactionId] = useState('T_12345');
  const [items, setItems] = useState([
    { id: 'SKU_001', name: 'Product Name', price: 100, quantity: 1, category: 'Category' }
  ]);
  const [output, setOutput] = useState('');

  const addItem = () => {
    setItems([...items, { id: `SKU_00${items.length + 1}`, name: '', price: 0, quantity: 1, category: '' }]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: string, value: string | number) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const generateCode = () => {
    const totalValue = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    const dataLayerPush = {
      event: eventType,
      ecommerce: {
        ...(eventType === 'purchase' && {
          transaction_id: transactionId,
          value: totalValue,
          currency: currency,
          tax: totalValue * 0.05,
          shipping: 0
        }),
        items: items.map((item, index) => ({
          item_id: item.id,
          item_name: item.name,
          affiliation: 'Online Store',
          currency: currency,
          index: index,
          item_category: item.category,
          price: item.price,
          quantity: item.quantity
        }))
      }
    };

    const code = `// Clear the previous ecommerce object
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({ ecommerce: null });

// Push the ${eventType} event
window.dataLayer.push(${JSON.stringify(dataLayerPush, null, 2)});

// VDESIGNU - GA4 Ecommerce dataLayer`;

    setOutput(code);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Input Panel */}
        <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] p-10 shadow-2xl">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-14 h-14 rounded-2xl bg-[var(--accent-red)] flex items-center justify-center text-white shadow-xl">
              <Database className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-black uppercase tracking-tight text-[var(--text-primary)]">DataLayer Ecommerce</h3>
              <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">GTM Data Layer Builder</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Event Type */}
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-2">Event Type</label>
              <div className="grid grid-cols-2 gap-2">
                {ECOMMERCE_EVENTS.map((event) => (
                  <button
                    key={event.id}
                    onClick={() => setEventType(event.id)}
                    className={`p-3 rounded-xl text-left transition-all ${
                      eventType === event.id
                        ? 'bg-[var(--accent-red)] text-white'
                        : 'bg-[var(--bg-primary)] text-[var(--text-muted)] border border-[var(--border-subtle)]'
                    }`}
                  >
                    <div className="text-[10px] font-black uppercase">{event.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Transaction Details */}
            {eventType === 'purchase' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-2">Transaction ID</label>
                  <input
                    type="text"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-2">Currency</label>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl text-sm"
                  >
                    <option value="AED">AED (UAE)</option>
                    <option value="SAR">SAR (KSA)</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                  </select>
                </div>
              </div>
            )}

            {/* Items */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">Products</label>
                <button onClick={addItem} className="text-[10px] font-bold text-[var(--accent-red)] flex items-center gap-1">
                  <Plus className="w-3 h-3" /> Add Item
                </button>
              </div>
              
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {items.map((item, index) => (
                  <div key={index} className="p-3 bg-[var(--bg-primary)] rounded-xl border border-[var(--border-subtle)]">
                    <div className="grid grid-cols-4 gap-2 mb-2">
                      <input
                        type="text"
                        placeholder="SKU"
                        value={item.id}
                        onChange={(e) => updateItem(index, 'id', e.target.value)}
                        className="px-2 py-1 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded text-xs"
                      />
                      <input
                        type="text"
                        placeholder="Name"
                        value={item.name}
                        onChange={(e) => updateItem(index, 'name', e.target.value)}
                        className="col-span-2 px-2 py-1 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded text-xs"
                      />
                      <button onClick={() => removeItem(index)} className="text-red-500 hover:bg-red-100 rounded p-1">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <input
                        type="number"
                        placeholder="Price"
                        value={item.price}
                        onChange={(e) => updateItem(index, 'price', parseFloat(e.target.value) || 0)}
                        className="px-2 py-1 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded text-xs"
                      />
                      <input
                        type="number"
                        placeholder="Qty"
                        value={item.quantity}
                        onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value) || 1)}
                        className="px-2 py-1 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded text-xs"
                      />
                      <input
                        type="text"
                        placeholder="Category"
                        value={item.category}
                        onChange={(e) => updateItem(index, 'category', e.target.value)}
                        className="px-2 py-1 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded text-xs"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={generateCode}
              className="w-full py-4 bg-[var(--accent-red)] text-white font-black uppercase rounded-2xl hover:bg-black transition-all shadow-xl"
            >
              Generate DataLayer Code
            </button>
          </div>
        </div>

        {/* Output Panel */}
        <div>
          <ToolOutput output={output} language="javascript" title="DataLayer Push Code" />
        </div>
      </div>
    </div>
  );
}
