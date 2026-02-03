import React, { useState } from 'react';
import { Copy, Check, Scissors } from 'lucide-react';

const SHAPES = {
    'Triangle': 'polygon(50% 0%, 0% 100%, 100% 100%)',
    'Trapezoid': 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)',
    'Parallelogram': 'polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)',
    'Rhombus': 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
    'Pentagon': 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
    'Hexagon': 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
    'Circle': 'circle(50% at 50% 50%)',
    'Ellipse': 'ellipse(25% 40% at 50% 50%)',
    'Inset': 'inset(10% 20% 10% 20%)'
};

const ClipPathGenerator = () => {
    const [activeShape, setActiveShape] = useState('Triangle');
    const [customClip, setCustomClip] = useState('');
    const [copied, setCopied] = useState(false);

    const currentClip = customClip || SHAPES[activeShape as keyof typeof SHAPES];

    const handleCopy = () => {
        const css = `clip-path: ${currentClip};`;
        navigator.clipboard.writeText(css);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="grid lg:grid-cols-2 gap-12">
            <div>
                 <div className="bg-[var(--bg-card)] p-6 rounded-2xl border border-[var(--border-subtle)]">
                     <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                         <Scissors className="w-5 h-5 text-[var(--accent-red)]" /> Presets
                     </h3>
                     <div className="grid grid-cols-3 gap-3">
                         {Object.keys(SHAPES).map(shape => (
                             <button
                                key={shape}
                                onClick={() => { setActiveShape(shape); setCustomClip(''); }}
                                className={`p-4 rounded-xl border font-bold text-sm transition-all
                                    ${activeShape === shape && !customClip
                                        ? 'bg-[var(--accent-red)] text-white border-[var(--accent-red)]' 
                                        : 'bg-[var(--bg-secondary)] border-[var(--border-subtle)] hover:border-[var(--accent-red)]'
                                    }`}
                             >
                                 {shape}
                             </button>
                         ))}
                     </div>

                     <div className="mt-8">
                         <label className="text-sm font-bold uppercase text-[var(--text-muted)] mb-2 block">Custom Value</label>
                         <input 
                            type="text" 
                            value={currentClip} 
                            onChange={(e) => { setCustomClip(e.target.value); setActiveShape('Custom'); }}
                            className="w-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-lg px-3 py-2 font-mono text-sm"
                         />
                     </div>
                 </div>
            </div>

            <div className="flex flex-col items-center justify-center">
                 <div 
                     className="w-64 h-64 bg-gradient-to-tr from-cyan-500 to-blue-600 shadow-2xl transition-all duration-300 relative"
                     style={{ clipPath: currentClip }}
                 >
                     <div className="absolute inset-0 flex items-center justify-center text-white/50 font-black text-4xl pointer-events-none uppercase">
                         {activeShape}
                     </div>
                 </div>

                 <div className="mt-8 w-full max-w-sm">
                    <div className="bg-[#1e1e1e] p-4 rounded-xl relative group">
                        <code className="text-purple-400 font-mono text-sm break-all">
                            clip-path: {currentClip};
                        </code>
                        <button 
                            onClick={handleCopy}
                            className="absolute top-2 right-2 p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
                        >
                            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </button>
                     </div>
                </div>
            </div>
        </div>
    );
};

export default ClipPathGenerator;
