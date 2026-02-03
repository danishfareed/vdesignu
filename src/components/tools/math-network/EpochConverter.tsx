import React, { useState, useEffect } from 'react';
import { Clock, RefreshCw, Copy, Check } from 'lucide-react';

const EpochConverter = () => {
    const [timestamp, setTimestamp] = useState<number>(Math.floor(Date.now() / 1000));
    const [humanTime, setHumanTime] = useState('');
    const [copied, setCopied] = useState(false);
    const [now, setNow] = useState(Math.floor(Date.now() / 1000));

    // Update "current time" display every second
    useEffect(() => {
        const interval = setInterval(() => {
            setNow(Math.floor(Date.now() / 1000));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    // Convert whenever timestamp changes
    useEffect(() => {
        try {
            // Check if ms or seconds (heuristic: if > 100000000000, probably ms)
            // But standard epoch is seconds. We will treat input as seconds by default unless user specifies?
            // For simplicity, let's assume inputs < 100000000000 are seconds (valid until year 5138)
            
            const date = new Date(timestamp * 1000);
            if (isNaN(date.getTime())) {
                setHumanTime('Invalid Timestamp');
            } else {
                setHumanTime(date.toUTCString() + ' | ' + date.toLocaleString());
            }
        } catch (e) {
            setHumanTime('Invalid Timestamp');
        }
    }, [timestamp]);

    const handleCopy = () => {
        navigator.clipboard.writeText(timestamp.toString());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const convertToEpoch = (dateString: string) => {
        const date = new Date(dateString);
        if (!isNaN(date.getTime())) {
            setTimestamp(Math.floor(date.getTime() / 1000));
        }
    };

    return (
        <div className="space-y-8">
            {/* Current Time Badge */}
            <div className="flex justify-center">
                 <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-full px-6 py-2 flex items-center gap-3 shadow-sm">
                    <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">Current Epoch</span>
                    <span className="font-mono text-[var(--accent-red)] font-bold text-lg">{now}</span>
                    <button onClick={() => setTimestamp(now)} title="Use Current Time" className="text-[var(--text-muted)] hover:text-[var(--text-primary)]">
                        <RefreshCw className="w-4 h-4" />
                    </button>
                 </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Epoch to Human */}
                <div className="space-y-4">
                    <div className="bg-[var(--bg-secondary)] p-6 rounded-2xl border border-[var(--border-subtle)] space-y-4 h-full">
                        <div className="flex items-center gap-2 mb-2">
                            <Clock className="w-5 h-5 text-[var(--accent-red)]" />
                            <h3 className="font-bold text-lg">Epoch to Human Date</h3>
                        </div>
                        
                        <div className="space-y-2">
                             <label className="text-xs font-bold text-[var(--text-muted)] uppercase">Timestamp (Seconds)</label>
                             <div className="relative">
                                <input 
                                    type="number" 
                                    value={timestamp}
                                    onChange={(e) => setTimestamp(parseInt(e.target.value) || 0)}
                                    className="w-full bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-4 font-mono font-bold text-lg focus:border-[var(--accent-red)] focus:outline-none"
                                />
                                <button 
                                    onClick={handleCopy}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                                >
                                    {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                                </button>
                             </div>
                        </div>

                        <div className="p-4 bg-[var(--bg-card)] rounded-xl border border-[var(--border-subtle)]">
                            <span className="block text-xs font-bold text-[var(--text-muted)] uppercase mb-1">Result (Local)</span>
                            <div className="font-mono text-[var(--text-primary)] break-words">
                                {humanTime.split('|')[1]?.trim() || humanTime}
                            </div>
                         </div>
                         <div className="p-4 bg-[var(--bg-card)] rounded-xl border border-[var(--border-subtle)]">
                            <span className="block text-xs font-bold text-[var(--text-muted)] uppercase mb-1">Result (UTC)</span>
                            <div className="font-mono text-[var(--text-secondary)] break-words">
                                {humanTime.split('|')[0]?.trim()}
                            </div>
                         </div>
                    </div>
                </div>

                {/* Date to Epoch */}
                <div className="space-y-4">
                     <div className="bg-[var(--bg-secondary)] p-6 rounded-2xl border border-[var(--border-subtle)] space-y-4 h-full">
                        <div className="flex items-center gap-2 mb-2">
                            <RefreshCw className="w-5 h-5 text-[var(--text-secondary)]" />
                            <h3 className="font-bold text-lg">Date to Epoch</h3>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-[var(--text-muted)] uppercase">Select Date & Time</label>
                            <input 
                                type="datetime-local" 
                                onChange={(e) => convertToEpoch(e.target.value)}
                                className="w-full bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-4 font-bold text-[var(--text-primary)] focus:border-[var(--accent-red)] focus:outline-none"
                            />
                        </div>
                        
                        <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]/50 text-sm text-[var(--text-secondary)]">
                            <p>Select a date to update the timestamp on the left.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EpochConverter;
