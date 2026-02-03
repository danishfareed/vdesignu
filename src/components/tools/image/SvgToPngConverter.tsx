import React, { useState, useRef } from 'react';
import { Upload, Download, Image as ImageIcon, Trash2, Code } from 'lucide-react';

const SvgToPngConverter = () => {
    const [svgInput, setSvgInput] = useState('');
    const [previewUrl, setPreviewUrl] = useState('');
    const [error, setError] = useState('');
    const [width, setWidth] = useState(800);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setSvgInput(event.target?.result as string);
                generatePreview(event.target?.result as string);
            };
            reader.readAsText(file);
        }
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setSvgInput(e.target.value);
        generatePreview(e.target.value);
    };

    const generatePreview = (svgContent: string) => {
        setError('');
        try {
            if (!svgContent.trim()) {
                setPreviewUrl('');
                return;
            }
            
            // Basic validation
            if (!svgContent.includes('<svg')) {
                throw new Error('Invalid SVG content. Must contain <svg> tag.');
            }

            const blob = new Blob([svgContent], { type: 'image/svg+xml' });
            const url = URL.createObjectURL(blob);
            setPreviewUrl(url);
        } catch (err) {
            setError((err as Error).message);
            setPreviewUrl('');
        }
    };

    const downloadPng = () => {
        if (!previewUrl || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const img = new Image();

        img.onload = () => {
            // Set canvas size
            canvas.width = width;
            canvas.height = (width / img.width) * img.height;

            if (ctx) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                
                const pngUrl = canvas.toDataURL('image/png');
                const a = document.createElement('a');
                a.href = pngUrl;
                a.download = 'icon-vdesignu.png';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            }
        };
        img.src = previewUrl;
    };

    return (
        <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <label className="text-sm font-bold uppercase text-[var(--text-muted)]">Input SVG</label>
                        <div className="relative">
                            <input 
                                type="file" 
                                accept=".svg" 
                                onChange={handleFileUpload} 
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <button className="text-xs flex items-center gap-1 text-[var(--accent-red)] hover:underline font-bold">
                                <Upload className="w-3 h-3" /> Upload File
                            </button>
                        </div>
                    </div>
                    <textarea 
                        value={svgInput}
                        onChange={handleTextChange}
                        placeholder="Paste your <svg> code here..."
                        className="w-full h-64 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-xl p-4 font-mono text-sm focus:outline-none focus:border-[var(--accent-red)] resize-none"
                    />
                </div>

                <div className="space-y-4">
                     <label className="text-sm font-bold uppercase text-[var(--text-muted)]">Live Preview</label>
                     <div className="w-full h-64 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl flex items-center justify-center p-4 relative overflow-hidden bg-checkered">
                        {previewUrl ? (
                            <img src={previewUrl} alt="Preview" className="max-w-full max-h-full object-contain" />
                        ) : (
                            <div className="text-[var(--text-muted)] flex flex-col items-center">
                                <ImageIcon className="w-8 h-8 opacity-50 mb-2" />
                                <span className="text-xs">No SVG loaded</span>
                            </div>
                        )}
                        
                        {error && (
                            <div className="absolute inset-0 bg-red-500/10 backdrop-blur-sm flex items-center justify-center p-4">
                                <div className="bg-[var(--bg-card)] p-3 rounded-lg border border-red-500 text-red-500 text-xs font-bold text-center">
                                    {error}
                                </div>
                            </div>
                        )}
                     </div>
                </div>
            </div>

            {/* Controls */}
            <div className="bg-[var(--bg-secondary)] p-6 rounded-2xl border border-[var(--border-subtle)] flex flex-wrap gap-6 items-end justify-between">
                <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">Output Width (px)</label>
                    <input 
                        type="number" 
                        value={width}
                        onChange={(e) => setWidth(parseInt(e.target.value) || 100)}
                        className="w-32 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-lg p-2 font-bold focus:border-[var(--accent-red)] focus:outline-none"
                    />
                </div>
                
                <div className="flex gap-4">
                     <button
                        onClick={() => { setSvgInput(''); setPreviewUrl(''); setError(''); }}
                        className="p-3 rounded-lg hover:bg-[var(--bg-card)] text-[var(--text-muted)] border border-transparent hover:border-[var(--border-subtle)] transition-colors"
                        title="Clear"
                    >
                        <Trash2 className="w-5 h-5" />
                    </button>
                    <button
                        onClick={downloadPng}
                        disabled={!previewUrl || !!error}
                        className="flex items-center gap-2 bg-[var(--accent-red)] disabled:opacity-50 text-white px-8 py-3 rounded-xl font-bold hover:bg-red-600 transition-colors shadow-lg"
                    >
                        <Download className="w-4 h-4" /> Download PNG
                    </button>
                </div>
            </div>
            
            {/* Hidden Canvas for Conversion */}
            <canvas ref={canvasRef} style={{ display: 'none' }} />

            <style>{`
                .bg-checkered {
                    background-image: linear-gradient(45deg, #1a1a1a 25%, transparent 25%), linear-gradient(-45deg, #1a1a1a 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #1a1a1a 75%), linear-gradient(-45deg, transparent 75%, #1a1a1a 75%);
                    background-size: 20px 20px;
                    background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
                }
            `}</style>
        </div>
    );
};

export default SvgToPngConverter;
