import React, { useState } from 'react';
import ReactColor from 'react-color';
const ChromePicker = (ReactColor as any).ChromePicker || (ReactColor as any).default?.ChromePicker || ReactColor;
import { Copy, Check, Layers } from 'lucide-react';

const BoxShadowGenerator = () => {
    const [hOffset, setHOffset] = useState(0);
    const [vOffset, setVOffset] = useState(4);
    const [blur, setBlur] = useState(10);
    const [spread, setSpread] = useState(0);
    const [color, setColor] = useState({ r: 0, g: 0, b: 0, a: 0.15 });
    const [inset, setInset] = useState(false);
    const [copied, setCopied] = useState(false);
    const [bgColor, setBgColor] = useState('#ffffff');
    const [boxColor, setBoxColor] = useState('#3b82f6');

    const generateShadow = () => {
        const c = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
        return `${inset ? 'inset ' : ''}${hOffset}px ${vOffset}px ${blur}px ${spread}px ${c}`;
    };

    const handleCopy = () => {
        const css = `box-shadow: ${generateShadow()};`;
        navigator.clipboard.writeText(css);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="grid lg:grid-cols-2 gap-8">
            {/* Controls */}
            <div className="space-y-6">
                 <div className="bg-[var(--bg-card)] p-6 rounded-2xl border border-[var(--border-subtle)] space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="text-xs font-bold uppercase text-[var(--text-muted)] mb-2 block">Horizontal Offset</label>
                            <input type="range" min="-50" max="50" value={hOffset} onChange={(e) => setHOffset(parseInt(e.target.value))} className="w-full accent-[var(--accent-red)]" />
                            <div className="text-right font-mono text-xs">{hOffset}px</div>
                        </div>
                        <div>
                             <label className="text-xs font-bold uppercase text-[var(--text-muted)] mb-2 block">Vertical Offset</label>
                             <input type="range" min="-50" max="50" value={vOffset} onChange={(e) => setVOffset(parseInt(e.target.value))} className="w-full accent-[var(--accent-red)]" />
                             <div className="text-right font-mono text-xs">{vOffset}px</div>
                        </div>
                        <div>
                            <label className="text-xs font-bold uppercase text-[var(--text-muted)] mb-2 block">Blur Radius</label>
                            <input type="range" min="0" max="100" value={blur} onChange={(e) => setBlur(parseInt(e.target.value))} className="w-full accent-[var(--accent-red)]" />
                            <div className="text-right font-mono text-xs">{blur}px</div>
                        </div>
                        <div>
                             <label className="text-xs font-bold uppercase text-[var(--text-muted)] mb-2 block">Spread Radius</label>
                             <input type="range" min="-50" max="50" value={spread} onChange={(e) => setSpread(parseInt(e.target.value))} className="w-full accent-[var(--accent-red)]" />
                             <div className="text-right font-mono text-xs">{spread}px</div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <input type="checkbox" id="inset" checked={inset} onChange={(e) => setInset(e.target.checked)} className="w-5 h-5 accent-[var(--accent-red)] rounded" />
                        <label htmlFor="inset" className="font-bold text-[var(--text-primary)] cursor-pointer">Inset Shadow</label>
                    </div>

                    <div className="border-t border-[var(--border-subtle)] pt-6">
                        <label className="text-sm font-bold uppercase text-[var(--text-muted)] mb-4 block">Shadow Color</label>
                        <ChromePicker 
                            color={color}
                            onChange={(c) => setColor({ ...c.rgb, a: c.rgb.a ?? 1 })}
                            styles={{
                                default: {
                                    picker: { boxShadow: 'none', background: 'transparent', width: '100%' }
                                }
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Preview */}
            <div className="bg-[var(--bg-secondary)] p-8 rounded-2xl flex flex-col items-center justify-center min-h-[400px]">
                <div 
                    className="w-48 h-48 rounded-2xl transition-all duration-200 flex items-center justify-center text-white font-bold text-xl"
                    style={{ 
                        backgroundColor: boxColor,
                        boxShadow: generateShadow(),
                        border: bgColor === boxColor ? '1px solid rgba(0,0,0,0.1)' : 'none'
                    }}
                >
                    Preview
                </div>

                <div className="mt-12 w-full max-w-md">
                     <div className="bg-[#1e1e1e] p-4 rounded-xl relative group">
                        <code className="text-green-400 font-mono text-sm break-all">
                            box-shadow: {generateShadow()};
                        </code>
                        <div className="absolute top-2 right-2 flex gap-2">
                            <button 
                                onClick={handleCopy}
                                className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
                            >
                                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            </button>
                        </div>
                     </div>
                </div>

                <div className="mt-8 flex gap-4 text-sm">
                    <div className="flex items-center gap-2">
                        <label>Box Color:</label>
                        <input type="color" value={boxColor} onChange={(e) => setBoxColor(e.target.value)} className="w-8 h-8 rounded cursor-pointer" />
                    </div>
                     <div className="flex items-center gap-2">
                        <label>Bg Color:</label>
                        <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-8 h-8 rounded cursor-pointer" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BoxShadowGenerator;
