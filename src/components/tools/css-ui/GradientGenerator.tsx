import React, { useState, useEffect } from 'react';
import ReactColor from 'react-color';
const ChromePicker = (ReactColor as any).ChromePicker || (ReactColor as any).default?.ChromePicker || ReactColor;
import { Copy, Check, RotateCcw, ArrowRightLeft } from 'lucide-react';

interface ColorStop {
    id: string;
    color: string;
    position: number;
}

const GradientGenerator = () => {
    const [stops, setStops] = useState<ColorStop[]>([
        { id: '1', color: '#ff00cc', position: 0 },
        { id: '2', color: '#333399', position: 100 }
    ]);
    const [angle, setAngle] = useState(90);
    const [type, setType] = useState<'linear' | 'radial'>('linear');
    const [activeStopId, setActiveStopId] = useState<string>('1');
    const [copied, setCopied] = useState(false);

    const activeStop = stops.find(s => s.id === activeStopId) || stops[0];

    const generateCSS = () => {
        const sortedStops = [...stops].sort((a, b) => a.position - b.position);
        const stopsStr = sortedStops.map(s => `${s.color} ${s.position}%`).join(', ');
        return type === 'linear' 
            ? `linear-gradient(${angle}deg, ${stopsStr})`
            : `radial-gradient(circle, ${stopsStr})`;
    };

    const handleCopy = () => {
        const css = `background: ${generateCSS()};`;
        navigator.clipboard.writeText(css);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const updateStopColor = (color: string) => {
        setStops(prev => prev.map(s => s.id === activeStopId ? { ...s, color } : s));
    };

    const updateStopPosition = (position: number) => {
         setStops(prev => prev.map(s => s.id === activeStopId ? { ...s, position } : s));
    };

    const addStop = () => {
        const newStop = { id: Math.random().toString(), color: '#ffffff', position: 50 };
        setStops(prev => [...prev, newStop]);
        setActiveStopId(newStop.id);
    };

    const removeStop = (id: string) => {
        if (stops.length <= 2) return;
        setStops(prev => prev.filter(s => s.id !== id));
        if (activeStopId === id) setActiveStopId(stops[0].id);
    };

    return (
        <div className="grid lg:grid-cols-2 gap-8">
            {/* Controls */}
            <div className="space-y-6">
                <div className="bg-[var(--bg-card)] p-6 rounded-2xl border border-[var(--border-subtle)] space-y-6">
                    {/* Color Picker */}
                    <div>
                        <label className="text-sm font-bold uppercase text-[var(--text-muted)] mb-4 block">Pick Color</label>
                        <ChromePicker 
                            color={activeStop.color}
                            onChange={(c) => updateStopColor(c.hex)}
                            disableAlpha
                            styles={{
                                default: {
                                    picker: { boxShadow: 'none', background: 'transparent', width: '100%' }
                                }
                            }}
                        />
                    </div>

                    <div className="border-t border-[var(--border-subtle)] pt-6">
                         <div className="flex items-center justify-between mb-2">
                             <label className="text-sm font-bold uppercase text-[var(--text-muted)]">Selected Stop Position</label>
                             <span className="font-mono">{activeStop.position}%</span>
                         </div>
                         <input 
                            type="range" 
                            min="0" 
                            max="100" 
                            value={activeStop.position}
                            onChange={(e) => updateStopPosition(parseInt(e.target.value))}
                            className="w-full h-2 bg-[var(--bg-secondary)] rounded-lg appearance-none cursor-pointer accent-[var(--accent-red)]"
                         />
                    </div>

                     {/* Global Controls */}
                     <div className="grid grid-cols-2 gap-4">
                        <div>
                             <label className="text-sm font-bold uppercase text-[var(--text-muted)] mb-2 block">Type</label>
                             <select 
                                value={type}
                                onChange={(e) => setType(e.target.value as any)}
                                className="w-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-lg px-3 py-2 font-bold"
                             >
                                 <option value="linear">Linear</option>
                                 <option value="radial">Radial</option>
                             </select>
                        </div>
                        {type === 'linear' && (
                             <div>
                                <label className="text-sm font-bold uppercase text-[var(--text-muted)] mb-2 block">Angle ({angle}°)</label>
                                <input 
                                    type="number" 
                                    value={angle}
                                    onChange={(e) => setAngle(parseInt(e.target.value))}
                                    className="w-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-lg px-3 py-2 font-bold"
                                />
                             </div>
                        )}
                     </div>
                </div>
            </div>

            {/* Preview */}
            <div className="space-y-8">
                <div className="bg-[var(--bg-card)] p-6 rounded-2xl border border-[var(--border-subtle)]">
                     <div 
                        className="w-full h-64 rounded-xl shadow-inner mb-6 transition-all duration-300 relative group"
                        style={{ background: generateCSS() }}
                     >
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="bg-black/50 text-white px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm">Preview</span>
                        </div>
                     </div>

                     {/* Gradient Slider Bar */}
                     <div className="relative h-6 bg-[var(--bg-secondary)] rounded-full mb-6 cursor-pointer" onClick={(e) => e.stopPropagation()}>
                         <div className="absolute inset-0 rounded-full" style={{ background: generateCSS() }}></div>
                         {stops.map(stop => (
                             <button
                                key={stop.id}
                                className={`absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-2 shadow-sm transition-transform hover:scale-110
                                    ${activeStopId === stop.id ? 'border-white scale-125 ring-2 ring-[var(--accent-red)]' : 'border-white'}`}
                                style={{ left: `${stop.position}%`, backgroundColor: stop.color }}
                                onClick={() => setActiveStopId(stop.id)}
                             ></button>
                         ))}
                     </div>

                     <div className="flex gap-4 mb-6">
                        <button onClick={addStop} className="px-4 py-2 bg-[var(--bg-secondary)] hover:bg-[var(--accent-red)] hover:text-white rounded-lg font-bold text-sm transition-colors">
                            + Add Color
                        </button>
                         <button onClick={() => removeStop(activeStopId)} className="px-4 py-2 bg-[var(--bg-secondary)] hover:bg-black hover:text-white rounded-lg font-bold text-sm transition-colors" disabled={stops.length <= 2}>
                            - Remove Selected
                        </button>
                     </div>

                     <div className="bg-[#1e1e1e] p-4 rounded-xl relative group">
                        <code className="text-pink-400 font-mono text-sm break-all">
                            background: {generateCSS()};
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

export default GradientGenerator;
