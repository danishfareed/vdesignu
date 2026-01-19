import React, { useState } from 'react';
import { Lock, Copy, Check, Trash2, ArrowRightLeft } from 'lucide-react';
import CryptoJS from 'crypto-js';

const Base64Encoder = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [mode, setMode] = useState<'encode' | 'decode'>('encode');
    const [copied, setCopied] = useState(false);

    const handleProcess = () => {
        try {
            if (!input) {
                setOutput('');
                return;
            }

            if (mode === 'encode') {
                const encoded = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(input));
                setOutput(encoded);
            } else {
                const decoded = CryptoJS.enc.Base64.parse(input).toString(CryptoJS.enc.Utf8);
                setOutput(decoded);
            }
        } catch (error) {
            setOutput('Error: Invalid input for decoding');
        }
    };

    const handleCopy = () => {
        if (!output) return;
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-center mb-6">
                <div className="bg-[var(--bg-secondary)] p-1 rounded-lg flex gap-1 border border-[var(--border-subtle)]">
                    <button
                        onClick={() => { setMode('encode'); setInput(''); setOutput(''); }}
                        className={`px-6 py-2 rounded-md font-bold text-sm transition-all ${mode === 'encode' ? 'bg-[var(--bg-card)] shadow text-[var(--accent-red)]' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'}`}
                    >
                        Encode
                    </button>
                    <button
                        onClick={() => { setMode('decode'); setInput(''); setOutput(''); }}
                        className={`px-6 py-2 rounded-md font-bold text-sm transition-all ${mode === 'decode' ? 'bg-[var(--bg-card)] shadow text-[var(--accent-red)]' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'}`}
                    >
                        Decode
                    </button>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                    <label className="text-sm font-bold uppercase text-[var(--text-muted)]">
                        {mode === 'encode' ? 'Plain Text Input' : 'Base64 Input'}
                    </label>
                    <textarea
                        value={input}
                        onChange={(e) => { setInput(e.target.value); }}
                        placeholder={mode === 'encode' ? 'Type text to encode...' : 'Paste Base64 string to decode...'}
                        className="w-full h-64 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-xl p-4 font-mono text-sm focus:outline-none focus:border-[var(--accent-red)] resize-none"
                    />
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <label className="text-sm font-bold uppercase text-[var(--text-muted)]">
                            {mode === 'encode' ? 'Base64 Output' : 'Plain Text Output'}
                        </label>
                        {output && (
                            <button
                                onClick={handleCopy}
                                className="flex items-center gap-1 text-xs font-bold text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                            >
                                {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                                {copied ? 'Copied!' : 'Copy'}
                            </button>
                        )}
                    </div>
                    <textarea
                        readOnly
                        value={output}
                        placeholder="Result will appear here..."
                        className="w-full h-64 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-4 font-mono text-sm focus:outline-none resize-none text-[var(--text-primary)]"
                    />
                </div>
            </div>

            <div className="flex justify-center gap-4">
                <button
                    onClick={handleProcess}
                    className="flex items-center gap-2 bg-[var(--accent-red)] text-white px-8 py-3 rounded-xl font-bold hover:opacity-90 transition-opacity"
                >
                    <ArrowRightLeft className="w-5 h-5" />
                    {mode === 'encode' ? 'Encode to Base64' : 'Decode from Base64'}
                </button>
                <button
                    onClick={() => { setInput(''); setOutput(''); }}
                    className="p-3 rounded-xl hover:bg-[var(--bg-secondary)] text-[var(--text-muted)] transition-colors border border-transparent hover:border-[var(--border-subtle)]"
                    title="Clear All"
                >
                    <Trash2 className="w-5 h-5" />
                </button>
            </div>

            <div className="bg-[var(--bg-secondary)] p-6 rounded-2xl border border-[var(--border-subtle)]">
                <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                    <Lock className="w-5 h-5 text-[var(--accent-red)]"/>
                    About Base64
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    Base64 is a binary-to-text encoding scheme. It is commonly used to encode data (like images or files) 
                    so that it can be embedded directly into HTML/CSS files or sent via APIs that handle text better than binary data.
                    It is **not** encryption and should not be used to secure sensitive data.
                </p>
            </div>
        </div>
    );
};

export default Base64Encoder;
