import React, { useState } from 'react';
import { ArrowRightLeft, Copy, Check, Binary, Network } from 'lucide-react';

const IpConverter = () => {
    const [ip, setIp] = useState('192.168.1.1');
    const [binary, setBinary] = useState('11000000.10101000.00000001.00000001');
    const [copied, setCopied] = useState('');

     const handleCopy = (text: string, type: string) => {
        navigator.clipboard.writeText(text);
        setCopied(type);
        setTimeout(() => setCopied(''), 2000);
    };

    const updateFromIp = (val: string) => {
        setIp(val);
        const parts = val.split('.');
        if (parts.length === 4 && parts.every(p => p !== '' && !isNaN(Number(p)) && Number(p) >= 0 && Number(p) <= 255)) {
            const bin = parts.map(p => Number(p).toString(2).padStart(8, '0')).join('.');
            setBinary(bin);
        } else {
            setBinary('Invalid IP');
        }
    };

    const updateFromBinary = (val: string) => {
        setBinary(val);
        // Clean input allowing only 0, 1, and .
        const cleanVal = val.replace(/[^01.]/g, '');
        const parts = cleanVal.split('.');
        
        if (parts.length === 4 && parts.every(p => p.length > 0 && p.length <= 8)) {
            const ipVal = parts.map(p => parseInt(p, 2)).join('.');
            setIp(ipVal);
        } else {
             setIp('Invalid Binary');
        }
    };

    return (
        <div className="space-y-8">
            <div className="grid gap-6">
                {/* IP Input */}
                 <div className="bg-[var(--bg-secondary)] p-4 rounded-xl border border-[var(--border-subtle)] flex items-center gap-4 transition-colors focus-within:border-[var(--accent-primary)]">
                    <div className="p-3 bg-[var(--bg-primary)] rounded-lg text-[var(--text-muted)]">
                        <Network className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                        <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-1">IPV4 Address</label>
                        <input 
                            type="text" 
                            value={ip}
                            onChange={(e) => updateFromIp(e.target.value)}
                            placeholder="e.g. 192.168.1.1"
                            className="w-full bg-transparent font-mono font-bold text-lg text-[var(--text-primary)] focus:outline-none"
                        />
                    </div>
                     <button 
                        onClick={() => handleCopy(ip, 'ip')}
                        className="p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                        title="Copy"
                    >
                        {copied === 'ip' ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                    </button>
                </div>

                <div className="flex justify-center">
                    <ArrowRightLeft className="w-6 h-6 text-[var(--text-muted)] rotate-90 md:rotate-0" />
                </div>

                {/* Binary Input */}
                  <div className="bg-[var(--bg-secondary)] p-4 rounded-xl border border-[var(--border-subtle)] flex items-center gap-4 transition-colors focus-within:border-[var(--accent-primary)]">
                    <div className="p-3 bg-[var(--bg-primary)] rounded-lg text-[var(--text-muted)]">
                        <Binary className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                        <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-1">Binary Representation</label>
                        <input 
                            type="text" 
                            value={binary}
                            onChange={(e) => updateFromBinary(e.target.value)}
                            placeholder="e.g. 11000000.10101000..."
                            className="w-full bg-transparent font-mono font-bold text-lg text-[var(--text-primary)] focus:outline-none"
                        />
                    </div>
                     <button 
                        onClick={() => handleCopy(binary, 'bin')}
                        className="p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                        title="Copy"
                    >
                        {copied === 'bin' ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            <div className="bg-[var(--bg-secondary)] p-6 rounded-2xl border border-[var(--border-subtle)] text-sm text-[var(--text-muted)]">
                <h4 className="font-bold text-[var(--text-primary)] mb-2 flex items-center gap-2">
                    <Binary className="w-4 h-4" />
                    How it works
                </h4>
                <p>
                    IPv4 addresses are 32-bit numbers usually displayed in dot-decimal notation. 
                    Each of the four numbers (octets) corresponds to 8 bits in binary.
                    For example, <b>192</b> is <b>11000000</b> in binary.
                </p>
            </div>
        </div>
    );
};

export default IpConverter;
