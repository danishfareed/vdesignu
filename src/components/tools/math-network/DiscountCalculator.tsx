import React, { useState, useEffect } from 'react';
import { Tag, TrendingDown, DollarSign, Percent } from 'lucide-react';

const DiscountCalculator = () => {
    const [price, setPrice] = useState(100);
    const [discount, setDiscount] = useState(20);
    const [tax, setTax] = useState(0);
    const [result, setResult] = useState({
        savings: 0,
        finalPrice: 0,
        taxAmount: 0,
        total: 0
    });

    useEffect(() => {
        const savingsAmount = (price * discount) / 100;
        const priceAfterDiscount = price - savingsAmount;
        const taxAmount = (priceAfterDiscount * tax) / 100;
        const totalAmount = priceAfterDiscount + taxAmount;

        setResult({
            savings: savingsAmount,
            finalPrice: priceAfterDiscount,
            taxAmount,
            total: totalAmount
        });
    }, [price, discount, tax]);

    return (
        <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Input Section */}
            <div className="space-y-6">
                 <div className="relative">
                    <label className="block text-sm font-medium text-[var(--text-muted)] mb-2">Original Price</label>
                    <div className="bg-[var(--bg-secondary)] p-4 rounded-xl border border-[var(--border-subtle)] flex items-center gap-4 focus-within:border-[var(--accent-primary)] transition-colors">
                        <DollarSign className="w-5 h-5 text-[var(--text-muted)]" />
                        <input 
                            type="number" 
                            value={price}
                            onChange={(e) => setPrice(Number(e.target.value))}
                            className="flex-1 bg-transparent text-xl font-bold text-[var(--text-primary)] focus:outline-none"
                            placeholder="0.00"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-[var(--text-muted)] mb-2">Discount (%)</label>
                         <div className="bg-[var(--bg-secondary)] p-4 rounded-xl border border-[var(--border-subtle)] flex items-center gap-4 focus-within:border-[var(--accent-primary)] transition-colors">
                            <Percent className="w-5 h-5 text-[var(--text-muted)]" />
                            <input 
                                type="number" 
                                value={discount}
                                onChange={(e) => setDiscount(Number(e.target.value))}
                                className="flex-1 bg-transparent text-xl font-bold text-[var(--text-primary)] focus:outline-none"
                                placeholder="0"
                            />
                        </div>
                        {/* Quick percentages */}
                        <div className="flex gap-2 mt-2">
                            {[10, 20, 50, 75].map(p => (
                                <button 
                                    key={p} 
                                    onClick={() => setDiscount(p)}
                                    className="px-2 py-1 text-xs rounded-md bg-[var(--bg-tertiary)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                                >
                                    {p}%
                                </button>
                            ))}
                        </div>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-[var(--text-muted)] mb-2">Tax Rate (%)</label>
                         <div className="bg-[var(--bg-secondary)] p-4 rounded-xl border border-[var(--border-subtle)] flex items-center gap-4 focus-within:border-[var(--accent-primary)] transition-colors">
                            <Tag className="w-5 h-5 text-[var(--text-muted)]" />
                            <input 
                                type="number" 
                                value={tax}
                                onChange={(e) => setTax(Number(e.target.value))}
                                className="flex-1 bg-transparent text-xl font-bold text-[var(--text-primary)] focus:outline-none"
                                placeholder="0"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Results Section */}
            <div className="bg-[var(--bg-secondary)] p-8 rounded-3xl border border-[var(--border-subtle)] shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-32 bg-[var(--accent-primary)] opacity-5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
                
                <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6 pb-6 border-b border-[var(--border-subtle)]">
                        <div>
                            <p className="text-sm text-[var(--text-muted)] mb-1">Total Savings</p>
                            <p className="text-3xl font-bold text-green-500 flex items-center">
                                <TrendingDown className="w-6 h-6 mr-2" />
                                ${result.savings.toFixed(2)}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4 mb-6">
                        <div className="flex justify-between text-sm">
                            <span className="text-[var(--text-muted)]">Discounted Price</span>
                            <span className="font-bold text-[var(--text-primary)]">${result.finalPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-[var(--text-muted)]">Tax Amount</span>
                            <span className="font-bold text-[var(--text-primary)]">${result.taxAmount.toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="p-4 bg-[var(--bg-tertiary)] rounded-2xl flex justify-between items-center">
                        <span className="font-bold text-[var(--text-secondary)]">Final Total</span>
                        <span className="text-4xl font-bold text-[var(--accent-primary)]">${result.total.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DiscountCalculator;
