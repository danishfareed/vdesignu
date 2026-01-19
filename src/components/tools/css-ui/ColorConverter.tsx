import React, { useState, useEffect } from 'react';
import { Palette, Copy, Check, ArrowRightLeft } from 'lucide-react';

const ColorConverter = () => {
    const [hex, setHex] = useState('#EF4444');
    const [rgb, setRgb] = useState('rgb(239, 68, 68)');
    const [hsl, setHsl] = useState('hsl(0, 84%, 60%)');
    const [preview, setPreview] = useState('#EF4444');
    const [copied, setCopied] = useState('');

    const handleCopy = (text: string, type: string) => {
        navigator.clipboard.writeText(text);
        setCopied(type);
        setTimeout(() => setCopied(''), 2000);
    };

    // Helper: HEX to RGB/HSL
    const updateFromHex = (val: string) => {
        setHex(val);
        if (/^#[0-9A-F]{6}$/i.test(val)) {
            setPreview(val);
            const r = parseInt(val.substring(1, 3), 16);
            const g = parseInt(val.substring(3, 5), 16);
            const b = parseInt(val.substring(5, 7), 16);
            setRgb(`rgb(${r}, ${g}, ${b})`);
            
            // RGB to HSL logic
            const rPrime = r / 255;
            const gPrime = g / 255;
            const bPrime = b / 255;
            const max = Math.max(rPrime, gPrime, bPrime);
            const min = Math.min(rPrime, gPrime, bPrime);
            let h = 0, s = 0, l = (max + min) / 2;

            if (max !== min) {
                const d = max - min;
                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                switch (max) {
                    case rPrime: h = (gPrime - bPrime) / d + (gPrime < bPrime ? 6 : 0); break;
                    case gPrime: h = (bPrime - rPrime) / d + 2; break;
                    case bPrime: h = (rPrime - gPrime) / d + 4; break;
                }
                h /= 6;
            }
            setHsl(`hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`);
        }
    };

    // Helper: RGB to HEX/HSL (Simplified for input handling)
    const updateFromRgb = (val: string) => {
        setRgb(val);
        const match = val.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
        if (match) {
            const r = parseInt(match[1]);
            const g = parseInt(match[2]);
            const b = parseInt(match[3]);
            if (r <= 255 && g <= 255 && b <= 255) {
                const hexVal = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
                setHex(hexVal);
                setPreview(hexVal);
                // Trigger HSL update via Hex (lazy way but works for consistency)
                updateFromHex(hexVal);
                setRgb(val); // Restore original RGB text to avoid cursor jumping if we were strict
            }
        }
    };

    return (
        <div className="space-y-8">
            {/* Color Preview */}
            <div className="h-32 rounded-2xl shadow-lg flex items-center justify-center border border-[var(--border-subtle)] relative overflow-hidden" style={{ backgroundColor: preview }}>
                <div className="bg-black/20 backdrop-blur-md text-white px-6 py-2 rounded-full font-mono font-bold text-xl uppercase tracking-widest">
                    {preview}
                </div>
            </div>

            {/* Inputs Grid */}
            <div className="grid gap-6">
                <ColorInput 
                    label="HEX Code" 
                    value={hex} 
                    onChange={updateFromHex} 
                    onCopy={() => handleCopy(hex, 'hex')}
                    copied={copied === 'hex'}
                />
                
                <ColorInput 
                    label="RGB Color" 
                    value={rgb} 
                    onChange={updateFromRgb} 
                    onCopy={() => handleCopy(rgb, 'rgb')}
                    copied={copied === 'rgb'}
                    placeholder="rgb(255, 0, 0)"
                />

                <ColorInput 
                    label="HSL Color" 
                    value={hsl} 
                    onChange={() => {}} // Read-only for now for simplicity, or implement inverse logic similarly
                    onCopy={() => handleCopy(hsl, 'hsl')}
                    copied={copied === 'hsl'}
                    readOnly
                />
            </div>

            <div className="flex justify-center text-[var(--text-muted)] text-sm">
                <ArrowRightLeft className="w-4 h-4 mr-2" />
                <span>Edit HEX to update all formats instantly.</span>
            </div>
        </div>
    );
};

const ColorInput = ({ label, value, onChange, onCopy, copied, placeholder, readOnly }: any) => (
    <div className="bg-[var(--bg-secondary)] p-4 rounded-xl border border-[var(--border-subtle)] flex items-center gap-4 transition-colors focus-within:border-[var(--accent-red)]">
        <div className="p-3 bg-[var(--bg-primary)] rounded-lg text-[var(--text-muted)]">
            <Palette className="w-5 h-5" />
        </div>
        <div className="flex-1">
            <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-1">{label}</label>
            <input 
                type="text" 
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                readOnly={readOnly}
                className="w-full bg-transparent font-mono font-bold text-lg text-[var(--text-primary)] focus:outline-none"
            />
        </div>
         <button 
            onClick={onCopy}
            className="p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
            title="Copy"
        >
            {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
        </button>
    </div>
);

export default ColorConverter;
