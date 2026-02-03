import React, { useState } from 'react';
import ReactColor from 'react-color';
const ChromePicker = (ReactColor as any).ChromePicker || (ReactColor as any).default?.ChromePicker || ReactColor;
import { Copy, Check, Droplet } from 'lucide-react';

const GlassmorphismGenerator = () => {
    const [blur, setBlur] = useState(16);
    const [opacity, setOpacity] = useState(0.5);
    const [saturation, setSaturation] = useState(180);
    const [color, setColor] = useState({ r: 255, g: 255, b: 255 });
    const [copied, setCopied] = useState(false);

    const generateCSS = () => {
        const bg = `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})`;
        return `
background: ${bg};
backdrop-filter: blur(${blur}px) saturate(${saturation}%);
-webkit-backdrop-filter: blur(${blur}px) saturate(${saturation}%);
border: 1px solid rgba(255, 255, 255, 0.3);
        `.trim();
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generateCSS());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="grid lg:grid-cols-2 gap-12">
             {/* Preview */}
             <div className="relative min-h-[400px] bg-gradient-to-br from-[#ff00cc] to-[#333399] rounded-2xl flex items-center justify-center p-8 overflow-hidden">
                 {/* Decorative background blobs */}
                 <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
                 <div className="absolute bottom-10 right-10 w-48 h-48 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>

                 {/* The Glass Card */}
                 <div 
                    className="relative z-10 w-full max-w-sm h-64 rounded-2xl p-6 shadow-xl flex flex-col justify-between"
                    style={{ 
                        background: `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})`,
                        backdropFilter: `blur(${blur}px) saturate(${saturation}%)`,
                        WebkitBackdropFilter: `blur(${blur}px) saturate(${saturation}%)`,
                        border: '1px solid rgba(255, 255, 255, 0.3)'
                    }}
                 >
                     <div className="space-y-2">
                         <div className="w-12 h-12 rounded-full bg-white/30 mb-4"></div>
                         <div className="h-4 w-3/4 bg-white/40 rounded-full"></div>
                         <div className="h-4 w-1/2 bg-white/40 rounded-full"></div>
                     </div>
                     <div className="text-white/80 font-bold tracking-widest text-sm text-right mt-auto">GLASS UI</div>
                 </div>
             </div>

             {/* Controls */}
            <div className="space-y-6">
                 <div className="bg-[var(--bg-card)] p-6 rounded-2xl border border-[var(--border-subtle)] space-y-6">
                    <div>
                        <label className="text-sm font-bold uppercase text-[var(--text-muted)] mb-2 block">Blur Amount</label>
                        <input type="range" min="0" max="40" value={blur} onChange={(e) => setBlur(parseInt(e.target.value))} className="w-full accent-[var(--accent-red)]" />
                        <div className="text-right font-mono text-xs">{blur}px</div>
                    </div>
                    <div>
                        <label className="text-sm font-bold uppercase text-[var(--text-muted)] mb-2 block">Opacity ({Math.round(opacity * 100)}%)</label>
                        <input type="range" min="0" max="1" step="0.01" value={opacity} onChange={(e) => setOpacity(parseFloat(e.target.value))} className="w-full accent-[var(--accent-red)]" />
                    </div>
                    <div>
                        <label className="text-sm font-bold uppercase text-[var(--text-muted)] mb-2 block">Saturation ({saturation}%)</label>
                        <input type="range" min="0" max="200" value={saturation} onChange={(e) => setSaturation(parseInt(e.target.value))} className="w-full accent-[var(--accent-red)]" />
                    </div>

                    <div className="border-t border-[var(--border-subtle)] pt-6">
                         <label className="text-sm font-bold uppercase text-[var(--text-muted)] mb-4 block">Glass Color</label>
                         <ChromePicker 
                            color={color}
                            onChange={(c) => setColor(c.rgb)}
                            disableAlpha
                            styles={{
                                default: {
                                    picker: { boxShadow: 'none', background: 'transparent', width: '100%' }
                                }
                            }}
                        />
                    </div>
                </div>

                <div className="bg-[#1e1e1e] p-4 rounded-xl relative group">
                    <pre className="text-cyan-400 font-mono text-sm overflow-x-auto whitespace-pre-wrap">
                        {generateCSS()}
                    </pre>
                    <button 
                        onClick={handleCopy}
                        className="absolute top-2 right-2 p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
                    >
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GlassmorphismGenerator;
