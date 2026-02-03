import React, { useState } from 'react';
import { Globe, Code2, ArrowRightLeft, Copy, Check, Trash2 } from 'lucide-react';

const UrlEntityEncoder = () => {
    const [activeTool, setActiveTool] = useState<'url' | 'html'>('url');
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [copied, setCopied] = useState(false);

    // Encode/Decode logic
    const process = (action: 'encode' | 'decode') => {
        try {
            if (!input) { setOutput(''); return; }

            if (activeTool === 'url') {
                if (action === 'encode') setOutput(encodeURIComponent(input));
                else setOutput(decodeURIComponent(input));
            } else {
                if (action === 'encode') {
                    setOutput(input.replace(/[\u00A0-\u9999<>&"]/g, (i) => '&#' + i.charCodeAt(0) + ';'));
                } else {
                    const doc = new DOMParser().parseFromString(input, 'text/html');
                    setOutput(doc.documentElement.textContent || '');
                }
            }
        } catch (e) {
            setOutput('Error processing input');
        }
    };

    const handleCopy = () => {
        if (!output) return;
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-center">
                <div className="bg-[var(--bg-secondary)] p-1 rounded-full border border-[var(--border-subtle)] flex">
                     <button 
                        onClick={() => { setActiveTool('url'); setInput(''); setOutput(''); }}
                        className={`flex items-center gap-2 px-6 py-2 rounded-full font-bold transition-all ${activeTool === 'url' ? 'bg-[var(--accent-red)] text-white shadow-lg' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'}`}
                     >
                         <Globe className="w-4 h-4" /> URL Encoder
                     </button>
                     <button 
                        onClick={() => { setActiveTool('html'); setInput(''); setOutput(''); }}
                        className={`flex items-center gap-2 px-6 py-2 rounded-full font-bold transition-all ${activeTool === 'html' ? 'bg-[var(--accent-red)] text-white shadow-lg' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'}`}
                     >
                         <Code2 className="w-4 h-4" /> HTML Entities
                     </button>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                    <label className="text-sm font-bold uppercase text-[var(--text-muted)]">Input String</label>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={activeTool === 'url' ? "https://example.com/search?q=hello world" : "<div>Hello & Welcome</div>"}
                        className="w-full h-48 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-xl p-4 font-mono text-sm focus:outline-none focus:border-[var(--accent-red)] resize-none"
                    />
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <label className="text-sm font-bold uppercase text-[var(--text-muted)]">Result</label>
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
                        className="w-full h-48 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-4 font-mono text-sm focus:outline-none resize-none text-[var(--text-primary)]"
                    />
                </div>
            </div>

            <div className="flex justify-center gap-4">
                <button
                    onClick={() => process('encode')}
                    className="flex items-center gap-2 bg-[var(--bg-secondary)] hover:bg-[var(--bg-card)] border border-[var(--border-subtle)] px-6 py-3 rounded-xl font-bold transition-all"
                >
                    Encode
                </button>
                <div className="w-px bg-[var(--border-subtle)]"></div>
                <button
                    onClick={() => process('decode')}
                    className="flex items-center gap-2 bg-[var(--bg-secondary)] hover:bg-[var(--bg-card)] border border-[var(--border-subtle)] px-6 py-3 rounded-xl font-bold transition-all"
                >
                    Decode
                </button>
                 <button
                    onClick={() => { setInput(''); setOutput(''); }}
                    className="p-3 rounded-xl hover:bg-[var(--bg-secondary)] text-[var(--text-muted)] transition-colors ml-4"
                    title="Clear"
                >
                    <Trash2 className="w-5 h-5" />
                </button>
            </div>
            
            <div className="bg-[var(--bg-secondary)] p-6 rounded-2xl border border-[var(--border-subtle)]">
                <h3 className="font-bold text-lg mb-2">
                    {activeTool === 'url' ? 'URL Encoding (Percent-Encoding)' : 'HTML Entity Encoding'}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {activeTool === 'url' 
                        ? "URL encoding converts characters into a format that can be transmitted over the Internet. Characters like spaces become %20 and slashes become %2F to ensure the URL is valid."
                        : "HTML encoding converts reserved characters like <, >, and & into their corresponding entity codes (e.g. &lt;). This prevents the browser from interpreting them as code, which is crucial for preventing XSS attacks."
                    }
                </p>
            </div>
        </div>
    );
};

export default UrlEntityEncoder;
