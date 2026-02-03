import React, { useState, useEffect } from 'react';
import { Maximize, Calculator, Copy, Check } from 'lucide-react';

const AspectRatioCalculator = () => {
    const [width, setWidth] = useState<number | string>(1920);
    const [height, setHeight] = useState<number | string>(1080);
    const [ratioW, setRatioW] = useState(16);
    const [ratioH, setRatioH] = useState(9);
    const [mode, setMode] = useState<'calc' | 'find'>('calc'); // calc dimensions OR find ratio

    // For Ratio Finder
    const [findW, setFindW] = useState<number | string>(1920);
    const [findH, setFindH] = useState<number | string>(1080);
    const [foundRatio, setFoundRatio] = useState('16:9');

    // Calculate height when width changes
    const updateHeight = (w: number) => {
        if (!w || !ratioW || !ratioH) return;
        setHeight(Math.round(w * (ratioH / ratioW)));
    };

    // Calculate width when height changes
    const updateWidth = (h: number) => {
        if (!h || !ratioW || !ratioH) return;
        setWidth(Math.round(h * (ratioW / ratioH)));
    };

    const handleWidthChange = (val: string) => {
        setWidth(val);
        const w = parseInt(val);
        if (w) updateHeight(w);
    };

    const handleHeightChange = (val: string) => {
        setHeight(val);
        const h = parseInt(val);
        if (h) updateWidth(h);
    };

    const setRatio = (w: number, h: number) => {
        setRatioW(w);
        setRatioH(h);
        if (width && typeof width === 'number') updateHeight(width);
    };

    // Ratio Finder Logic
    const calculateGCD = (a: number, b: number): number => {
        return b === 0 ? a : calculateGCD(b, a % b);
    };

    useEffect(() => {
        if (mode === 'find' && findW && findH) {
            const w = Number(findW);
            const h = Number(findH);
            if (w && h) {
                const gcd = calculateGCD(w, h);
                setFoundRatio(`${w/gcd}:${h/gcd}`);
            }
        }
    }, [findW, findH, mode]);

    return (
        <div className="space-y-8">
            <div className="flex justify-center gap-4 bg-[var(--bg-secondary)] p-2 rounded-xl w-fit mx-auto">
                <button 
                    onClick={() => setMode('calc')}
                    className={`px-6 py-2 rounded-lg font-bold transition-all ${mode === 'calc' ? 'bg-[var(--bg-card)] shadow text-[var(--accent-red)]' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'}`}
                >
                    Calculate Dimensions
                </button>
                <button 
                    onClick={() => setMode('find')}
                     className={`px-6 py-2 rounded-lg font-bold transition-all ${mode === 'find' ? 'bg-[var(--bg-card)] shadow text-[var(--accent-red)]' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'}`}
                >
                    Find Ratio
                </button>
            </div>

            {mode === 'calc' ? (
                <div className="grid md:grid-cols-2 gap-8">
                     <div className="bg-[var(--bg-card)] p-8 rounded-3xl border border-[var(--border-subtle)] space-y-8">
                        <div>
                             <label className="text-sm font-bold uppercase text-[var(--text-muted)] mb-4 block">Common Ratios</label>
                             <div className="flex flex-wrap gap-2">
                                 {[
                                     {label: '16:9', w:16, h:9}, 
                                     {label: '4:3', w:4, h:3}, 
                                     {label: '1:1', w:1, h:1}, 
                                     {label: '9:16', w:9, h:16},
                                     {label: '21:9', w:21, h:9}
                                 ].map(r => (
                                     <button
                                        key={r.label}
                                        onClick={() => setRatio(r.w, r.h)}
                                        className={`px-4 py-2 rounded-lg font-bold text-sm border transitonn-colors
                                            ${ratioW === r.w && ratioH === r.h 
                                                ? 'bg-[var(--accent-red)] text-white border-[var(--accent-red)]' 
                                                : 'border-[var(--border-subtle)] hover:border-[var(--text-muted)]'}`}
                                     >
                                         {r.label}
                                     </button>
                                 ))}
                             </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 items-center">
                            <div>
                                <label className="text-xs font-bold uppercase text-[var(--text-muted)] mb-2 block">All Ratio (W)</label>
                                <input type="number" value={ratioW} onChange={(e) => { setRatioW(Number(e.target.value)); if(width) updateHeight(Number(width)); }} className="w-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-lg px-3 py-2 font-bold" />
                            </div>
                            <div className="text-center font-black text-xl text-[var(--text-muted)]">:</div>
                            <div>
                                <label className="text-xs font-bold uppercase text-[var(--text-muted)] mb-2 block">All Ratio (H)</label>
                                <input type="number" value={ratioH} onChange={(e) => { setRatioH(Number(e.target.value)); if(width) updateHeight(Number(width)); }} className="w-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-lg px-3 py-2 font-bold" />
                            </div>
                        </div>

                        <div className="border-t border-[var(--border-subtle)] pt-6 grid gap-6">
                            <div>
                                <label className="text-sm font-bold uppercase text-[var(--text-muted)] mb-2 block">Width (px)</label>
                                <input 
                                    type="number" 
                                    value={width} 
                                    onChange={(e) => handleWidthChange(e.target.value)}
                                    className="w-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-xl px-4 py-3 font-black text-2xl"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-bold uppercase text-[var(--text-muted)] mb-2 block">Height (px)</label>
                                <input 
                                    type="number" 
                                    value={height} 
                                    onChange={(e) => handleHeightChange(e.target.value)}
                                    className="w-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-xl px-4 py-3 font-black text-2xl"
                                />
                            </div>
                        </div>
                     </div>

                     <div className="flex flex-col items-center justify-center p-8 bg-[var(--bg-secondary)] rounded-3xl">
                         <div 
                            className="bg-[var(--accent-red)] rounded-lg shadow-lg flex items-center justify-center text-white font-bold transition-all duration-300 relative"
                            style={{ 
                                aspectRatio: `${ratioW}/${ratioH}`,
                                width: '100%',
                                maxWidth: '300px'
                            }}
                         >
                             <span className="absolute inset-0 flex items-center justify-center bg-black/10">
                                 {ratioW}:{ratioH}
                             </span>
                         </div>
                         <p className="mt-8 font-mono text-sm text-[var(--text-muted)] text-center">
                             Result based on your input.<br/>
                             Width: {width}px | Height: {height}px
                         </p>
                     </div>
                </div>
            ) : (
                <div className="max-w-xl mx-auto bg-[var(--bg-card)] p-8 rounded-3xl border border-[var(--border-subtle)] text-center space-y-8">
                     <h3 className="text-xl font-bold">What's my Ratio?</h3>
                     <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-bold uppercase text-[var(--text-muted)] mb-2 block">Width</label>
                            <input 
                                type="number" 
                                value={findW} 
                                onChange={(e) => setFindW(e.target.value)}
                                className="w-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-xl px-4 py-3 font-black text-xl text-center"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-bold uppercase text-[var(--text-muted)] mb-2 block">Height</label>
                             <input 
                                type="number" 
                                value={findH} 
                                onChange={(e) => setFindH(e.target.value)}
                                className="w-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-xl px-4 py-3 font-black text-xl text-center"
                            />
                        </div>
                     </div>

                     <div className="py-8">
                         <div className="text-sm text-[var(--text-muted)] mb-2">Calculated Aspect Ratio</div>
                         <div className="text-5xl font-black text-[var(--accent-red)]">{foundRatio}</div>
                     </div>
                </div>
            )}
        </div>
    );
};

export default AspectRatioCalculator;
