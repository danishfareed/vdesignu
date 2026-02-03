import React, { useState } from 'react';
import { Image as ImageIcon, Download, Trash2, Copy, Check } from 'lucide-react';

const Base64ImageDecoder = () => {
    const [input, setInput] = useState('');
    const [previewUrl, setPreviewUrl] = useState('');
    const [copied, setCopied] = useState(false);
    const [meta, setMeta] = useState<{ width: number, height: number, size: string } | null>(null);

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const val = e.target.value.trim();
        setInput(val);
        
        // Auto-fix missing header
        let src = val;
        if (val && !val.startsWith('data:image')) {
            // Very basic heuristic, assume png if unknown
            src = `data:image/png;base64,${val}`;
        }
        setPreviewUrl(src);

        if (src) {
            const i = new Image();
            i.onload = () => {
                setMeta({
                    width: i.width,
                    height: i.height,
                    size: formatBytes(val.length * 0.75) // Rough approximation
                });
            };
            i.src = src;
        } else {
            setMeta(null);
        }
    };

    const formatBytes = (bytes: number) => {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const dm = 2;
        const sizes = ['B', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    };

    const handleCopy = () => {
        if (!input) return;
        navigator.clipboard.writeText(input);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <label className="text-sm font-bold uppercase text-[var(--text-muted)]">Base64 String</label>
                        {input && (
                             <button
                                onClick={handleCopy}
                                className="flex items-center gap-1 text-xs font-bold text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                            >
                                {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                                {copied ? 'Copied' : 'Copy'}
                            </button>
                        )}
                    </div>
                    <textarea 
                        value={input}
                        onChange={handleInput}
                        placeholder="Paste base64 string (e.g., data:image/png;base64,...)"
                        className="w-full h-80 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-xl p-4 font-mono text-xs focus:outline-none focus:border-[var(--accent-red)] resize-none break-all"
                    />
                </div>

                <div className="space-y-2">
                     <label className="text-sm font-bold uppercase text-[var(--text-muted)]">Image Preview</label>
                     <div className="w-full h-80 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl flex items-center justify-center p-4 relative overflow-hidden bg-checkered flex-col gap-4">
                        {previewUrl && input ? (
                            <>
                                <img src={previewUrl} alt="Preview" className="max-w-full max-h-[80%] object-contain shadow-lg" />
                                {meta && (
                                    <div className="text-xs bg-black/50 text-white px-3 py-1 rounded-full backdrop-blur-md">
                                        {meta.width} x {meta.height} px • ~{meta.size}
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="text-[var(--text-muted)] flex flex-col items-center">
                                <ImageIcon className="w-12 h-12 opacity-20 mb-2" />
                                <span className="text-sm opacity-50">Paste string to view image</span>
                            </div>
                        )}
                     </div>
                </div>
            </div>

            {/* Controls */}
            <div className="flex justify-center gap-4">
                <button
                    onClick={() => { setInput(''); setPreviewUrl(''); setMeta(null); }}
                    className="p-3 rounded-lg hover:bg-[var(--bg-secondary)] text-[var(--text-muted)] border border-transparent hover:border-[var(--border-subtle)] transition-colors"
                >
                    <Trash2 className="w-5 h-5" />
                </button>
                {previewUrl && input && (
                     <a
                        href={previewUrl}
                        download="decoded-image.png"
                        className="flex items-center gap-2 bg-[var(--accent-red)] text-white px-8 py-3 rounded-xl font-bold hover:bg-red-600 transition-colors shadow-lg"
                    >
                        <Download className="w-4 h-4" /> Save Image
                    </a>
                )}
            </div>

            <style>{`
                .bg-checkered {
                    background-image: linear-gradient(45deg, #eee 25%, transparent 25%), linear-gradient(-45deg, #eee 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #eee 75%), linear-gradient(-45deg, transparent 75%, #eee 75%);
                    background-size: 20px 20px;
                    background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
                }
                @media (prefers-color-scheme: dark) {
                     .bg-checkered {
                        background-image: linear-gradient(45deg, #1a1a1a 25%, transparent 25%), linear-gradient(-45deg, #1a1a1a 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #1a1a1a 75%), linear-gradient(-45deg, transparent 75%, #1a1a1a 75%);
                     }
                }
            `}</style>
        </div>
    );
};

export default Base64ImageDecoder;
