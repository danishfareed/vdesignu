import React, { useState } from 'react';
import ReactColor from 'react-color';
const ChromePicker = (ReactColor as any).ChromePicker || (ReactColor as any).default?.ChromePicker || ReactColor;
import { useDropzone } from 'react-dropzone';
import { UploadCloud, Palette, Copy, Check } from 'lucide-react';

/* 
 * A simple color extractor could be implemented with canvas, 
 * but for this iteration we'll focus on the Picker + Palette generator side.
 * Extracting from image will be a "Version 1.5" feature or simplified here if easy.
 */

const ColorPicker = () => {
    const [color, setColor] = useState('#EF4444');
    const [copied, setCopied] = useState('');
    const [imgSrc, setImgSrc] = useState('');
    
    // Simple palette based on color theory (monochromatic, etc? For now just static/random logic or lighter/darker)
    const generatePalette = (baseColor: string) => {
        // Mock generation for visual demo
        return [baseColor, '#000000', '#FFFFFF', '#CCCCCC', '#333333']; 
    };

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(text);
        setTimeout(() => setCopied(''), 2000);
    };

    const { getRootProps, getInputProps } = useDropzone({
        accept: {'image/*': []},
        onDrop: (files) => {
            const reader = new FileReader();
            reader.onload = () => setImgSrc(reader.result as string);
            reader.readAsDataURL(files[0]);
        }
    });

    // Image color extraction logic (simplified: click on image to pick color)
    const pickColorFromImage = (e: React.MouseEvent<HTMLImageElement>) => {
        if (!imgSrc) return;
        const img = e.target as HTMLImageElement;
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.drawImage(img, 0, 0, img.width, img.height);
        
        // Calculate click position relative to image
        const rect = img.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const pixel = ctx.getImageData(x, y, 1, 1).data;
        // Convert to hex
        const hex = "#" + ((1 << 24) + (pixel[0] << 16) + (pixel[1] << 8) + pixel[2]).toString(16).slice(1).toUpperCase();
        setColor(hex);
    };

    return (
        <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-8">
                <div className="bg-[var(--bg-card)] p-6 rounded-2xl border border-[var(--border-subtle)] flex flex-col items-center">
                    <ChromePicker 
                        color={color} 
                        onChange={(c) => setColor(c.hex)}
                        disableAlpha
                        styles={{
                            default: {
                                picker: { boxShadow: 'none', background: 'transparent', width: '100%' },
                            }
                        }}
                    />
                </div>

                <div className="bg-[var(--bg-card)] p-6 rounded-2xl border border-[var(--border-subtle)] space-y-4">
                    <h3 className="font-bold text-lg flex items-center gap-2">
                        <Palette className="w-5 h-5" /> Selected Color
                    </h3>
                    <div className="grid gap-2">
                         <div className="flex items-center justify-between p-3 bg-[var(--bg-secondary)] rounded-lg">
                             <span className="font-mono text-[var(--text-secondary)]">HEX</span>
                             <button onClick={() => handleCopy(color)} className="flex items-center gap-2 font-black uppercase text-[var(--text-primary)] hover:text-[var(--accent-red)]">
                                 {color} {copied === color ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                             </button>
                         </div>
                         {/* Would add RGB/HSL conversion here ideally */}
                    </div>
                </div>
            </div>

            <div className="space-y-8">
                {/* Image Picker */}
                <div 
                    {...getRootProps()}
                    className="border-3 border-dashed border-[var(--border-subtle)] rounded-2xl p-6 min-h-[300px] flex items-center justify-center relative overflow-hidden group cursor-crosshair hover:border-[var(--accent-red)] transition-colors"
                >
                    <input {...getInputProps()} />
                    {imgSrc ? (
                        <>
                            <img 
                                src={imgSrc} 
                                className="max-w-full max-h-[300px] object-contain relative z-10" 
                                onClick={(e) => { e.stopPropagation(); pickColorFromImage(e); }} // Stop prop to prevent open dialog
                                alt="Pick color from this"
                            />
                            <div className="absolute top-4 right-4 bg-black/70 text-white text-xs px-2 py-1 rounded pointer-events-none z-20">
                                Click image to pick color
                            </div>
                        </>
                    ) : (
                        <div className="text-center pointer-events-none">
                            <UploadCloud className="w-12 h-12 mx-auto text-[var(--text-muted)] mb-4" />
                            <p className="font-bold text-[var(--text-muted)]">Drop image to extract colors</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ColorPicker;
