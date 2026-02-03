import React, { useState } from 'react';
import { ArrowRightLeft, Copy, Check } from 'lucide-react';

const PixelRemConverter = () => {
    const [baseSize, setBaseSize] = useState(16);
    const [px, setPx] = useState<number | string>(16);
    const [rem, setRem] = useState<number | string>(1);
    const [copied, setCopied] = useState('');

    const handleBaseChange = (value: number) => {
        setBaseSize(value);
        if (typeof px === 'number') {
            setRem(parseFloat((px / value).toFixed(4)));
        }
    };

    const handlePxChange = (value: string) => {
        setPx(value);
        const num = parseFloat(value);
        if (!isNaN(num)) {
            setRem(parseFloat((num / baseSize).toFixed(4)));
        } else {
            setRem('');
        }
    };

    const handleRemChange = (value: string) => {
        setRem(value);
        const num = parseFloat(value);
        if (!isNaN(num)) {
            setPx(parseFloat((num * baseSize).toFixed(4)));
        } else {
            setPx('');
        }
    };

    const copyToClipboard = (text: string, type: string) => {
        navigator.clipboard.writeText(text);
        setCopied(type);
        setTimeout(() => setCopied(''), 2000);
    };

    return (
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <div className="bg-[var(--bg-card)] p-8 rounded-3xl border border-[var(--border-subtle)] space-y-8">
                <div>
                    <label className="text-sm font-bold uppercase text-[var(--text-muted)] mb-2 block">Base Font Size (px)</label>
                    <input 
                        type="number" 
                        value={baseSize} 
                        onChange={(e) => handleBaseChange(parseInt(e.target.value) || 16)}
                        className="w-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-xl px-4 py-3 font-bold text-[var(--text-primary)]"
                    />
                    <p className="text-xs text-[var(--text-muted)] mt-2">Default browser font size is usually 16px.</p>
                </div>

                <div className="relative">
                     <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center pointer-events-none md:hidden">
                         <div className="bg-[var(--bg-card)] p-2 rounded-full border border-[var(--border-subtle)]">
                             <ArrowRightLeft className="w-5 h-5 text-[var(--text-muted)]" />
                         </div>
                     </div>
                </div>

                <div className="grid gap-6">
                    <div className="relative group">
                         <label className="text-sm font-bold uppercase text-[var(--text-muted)] mb-2 block">Pixels (px)</label>
                         <div className="relative">
                            <input 
                                type="number" 
                                value={px} 
                                onChange={(e) => handlePxChange(e.target.value)}
                                className="w-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-xl px-4 py-4 font-black text-3xl text-[var(--text-primary)]"
                            />
                            <button 
                                onClick={() => copyToClipboard(`${px}px`, 'px')}
                                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 hover:bg-[var(--bg-card)] rounded-lg text-[var(--text-muted)] transition-colors opacity-0 group-hover:opacity-100"
                                title="Copy"
                            >
                                {copied === 'px' ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                            </button>
                         </div>
                    </div>

                    <div className="relative group">
                         <label className="text-sm font-bold uppercase text-[var(--text-muted)] mb-2 block">REM</label>
                         <div className="relative">
                            <input 
                                type="number" 
                                value={rem} 
                                onChange={(e) => handleRemChange(e.target.value)}
                                className="w-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-xl px-4 py-4 font-black text-3xl text-[var(--accent-red)]"
                            />
                             <button 
                                onClick={() => copyToClipboard(`${rem}rem`, 'rem')}
                                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 hover:bg-[var(--bg-card)] rounded-lg text-[var(--text-muted)] transition-colors opacity-0 group-hover:opacity-100"
                                title="Copy"
                            >
                                {copied === 'rem' ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                            </button>
                         </div>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <div className="bg-[var(--bg-secondary)] p-6 rounded-2xl">
                    <h3 className="font-bold text-lg mb-4">Quick Reference (Base {baseSize}px)</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                        {[12, 14, 16, 18, 20, 24, 32, 48, 64].map(size => (
                            <div key={size} className="flex justify-between p-2 hover:bg-[var(--bg-card)] rounded-lg transition-colors cursor-pointer" onClick={() => handlePxChange(size.toString())}>
                                <span className="font-mono text-[var(--text-secondary)]">{size}px</span>
                                <span className="font-bold text-[var(--text-primary)]">{(size / baseSize).toFixed(3).replace(/\.?0+$/, '')}rem</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-[var(--heading-block-bg)] p-6 rounded-2xl border border-[var(--heading-block-border)]">
                    <h4 className="font-bold text-[var(--heading-block-text)] mb-2 flex items-center gap-2">
                        💡 Why use REM?
                    </h4>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                        REM (Root EM) units are relative to the root HTML element. Using them ensures your website respects the user's browser font size settings, making your site more **accessible** and easier to scale responsively.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PixelRemConverter;
