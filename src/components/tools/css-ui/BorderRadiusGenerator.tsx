import React, { useState } from 'react';
import { Copy, Check, Square } from 'lucide-react';

const BorderRadiusGenerator = () => {
    // 8 values for complex shapes: top-left-x, top-right-x, etc.
    const [tl, setTl] = useState(50);
    const [tr, setTr] = useState(50);
    const [br, setBr] = useState(50);
    const [bl, setBl] = useState(50);
    const [tl2, setTl2] = useState(50);
    const [tr2, setTr2] = useState(50);
    const [br2, setBr2] = useState(50);
    const [bl2, setBl2] = useState(50);
    
    const [fullControl, setFullControl] = useState(false);
    const [copied, setCopied] = useState(false);

    const generateCSS = () => {
        if (!fullControl) {
            return `${tl}%`;
        }
        return `${tl}% ${tr}% ${br}% ${bl}% / ${tl2}% ${tr2}% ${br2}% ${bl2}%`;
    };

    const handleCopy = () => {
        const css = `border-radius: ${generateCSS()};`;
        navigator.clipboard.writeText(css);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const randomize = () => {
        const r = () => Math.floor(Math.random() * 80) + 20;
        setFullControl(true);
        setTl(r()); setTr(r()); setBr(r()); setBl(r());
        setTl2(r()); setTr2(r()); setBr2(r()); setBl2(r());
    };

    return (
        <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Preview Area (Blob) */}
            <div className="flex flex-col items-center">
                <div 
                    className="w-64 h-64 bg-gradient-to-br from-[var(--accent-red)] to-purple-600 transition-all duration-300 shadow-2xl"
                    style={{ borderRadius: generateCSS() }}
                ></div>
                
                <div className="mt-8 w-full max-w-sm">
                    <div className="bg-[#1e1e1e] p-4 rounded-xl relative group">
                        <code className="text-yellow-400 font-mono text-sm break-all">
                            border-radius: {generateCSS()};
                        </code>
                        <button 
                            onClick={handleCopy}
                            className="absolute top-2 right-2 p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
                        >
                            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </button>
                     </div>
                </div>

                <div className="flex gap-4 mt-6">
                     <button onClick={randomize} className="px-6 py-2 bg-[var(--bg-card)] border border-[var(--border-subtle)] font-bold rounded-lg hover:bg-[var(--bg-secondary)]">
                         Random Blob
                     </button>
                </div>
            </div>

            {/* Controls */}
            <div className="space-y-8">
                 <div className="flex items-center justify-between">
                     <h3 className="text-xl font-bold">Corner Controls</h3>
                     <div className="flex items-center gap-2">
                        <input type="checkbox" id="full" checked={fullControl} onChange={(e) => setFullControl(e.target.checked)} className="w-5 h-5 accent-[var(--accent-red)]" />
                        <label htmlFor="full" className="font-medium cursor-pointer">Advanced (Blobs)</label>
                     </div>
                 </div>

                 {fullControl ? (
                     <div className="grid grid-cols-2 gap-8">
                         <div className="space-y-4">
                             <label className="text-xs font-bold uppercase text-[var(--text-muted)]">Horizontal Radii</label>
                             <div className="space-y-2">
                                 <div>Top Left: {tl}% <input type="range" value={tl} onChange={(e) => setTl(parseInt(e.target.value))} className="w-full accent-[var(--accent-red)]" /></div>
                                 <div>Top Right: {tr}% <input type="range" value={tr} onChange={(e) => setTr(parseInt(e.target.value))} className="w-full accent-[var(--accent-red)]" /></div>
                                 <div>Btm Right: {br}% <input type="range" value={br} onChange={(e) => setBr(parseInt(e.target.value))} className="w-full accent-[var(--accent-red)]" /></div>
                                 <div>Btm Left: {bl}% <input type="range" value={bl} onChange={(e) => setBl(parseInt(e.target.value))} className="w-full accent-[var(--accent-red)]" /></div>
                             </div>
                         </div>
                         <div className="space-y-4">
                             <label className="text-xs font-bold uppercase text-[var(--text-muted)]">Vertical Radii</label>
                             <div className="space-y-2">
                                 <div>Top Left: {tl2}% <input type="range" value={tl2} onChange={(e) => setTl2(parseInt(e.target.value))} className="w-full accent-blue-500" /></div>
                                 <div>Top Right: {tr2}% <input type="range" value={tr2} onChange={(e) => setTr2(parseInt(e.target.value))} className="w-full accent-blue-500" /></div>
                                 <div>Btm Right: {br2}% <input type="range" value={br2} onChange={(e) => setBr2(parseInt(e.target.value))} className="w-full accent-blue-500" /></div>
                                 <div>Btm Left: {bl2}% <input type="range" value={bl2} onChange={(e) => setBl2(parseInt(e.target.value))} className="w-full accent-blue-500" /></div>
                             </div>
                         </div>
                     </div>
                 ) : (
                     <div className="space-y-4">
                         <label className="text-xs font-bold uppercase text-[var(--text-muted)]">All Corners</label>
                         <input type="range" value={tl} onChange={(e) => { 
                             const v = parseInt(e.target.value);
                             setTl(v); setTr(v); setBr(v); setBl(v);
                         }} className="w-full accent-[var(--accent-red)]" />
                         <div className="text-center font-bold text-2xl">{tl}%</div>
                     </div>
                 )}
            </div>
        </div>
    );
};

export default BorderRadiusGenerator;
