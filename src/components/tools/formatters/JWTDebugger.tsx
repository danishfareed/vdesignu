import React, { useState } from 'react';
import { Lock, AlertTriangle, CheckCircle, Copy } from 'lucide-react';

const JwtDebugger = () => {
    const [token, setToken] = useState('');
    const [header, setHeader] = useState<any>(null);
    const [payload, setPayload] = useState<any>(null);
    const [error, setError] = useState('');

    const decode = (input: string) => {
        setToken(input);
        setError('');
        setHeader(null);
        setPayload(null);

        if (!input.trim()) return;

        try {
            const parts = input.split('.');
            if (parts.length !== 3) {
                throw new Error('Invalid JWT: Must have 3 parts (Header.Payload.Signature)');
            }

            const decodePart = (part: string) => {
                try {
                    return JSON.parse(atob(part.replace(/-/g, '+').replace(/_/g, '/')));
                } catch (e) {
                    throw new Error('Failed to decode Base64 part');
                }
            };

            const h = decodePart(parts[0]);
            const p = decodePart(parts[1]);

            setHeader(h);
            setPayload(p);
        } catch (e: any) {
            setError(e.message);
        }
    };

    const formatJson = (data: any) => JSON.stringify(data, null, 2);

    return (
        <div className="space-y-8">
            <div className="space-y-2">
                <label className="text-sm font-bold uppercase text-[var(--text-muted)]">JWT Token</label>
                <textarea 
                    value={token}
                    onChange={(e) => decode(e.target.value)}
                    placeholder="Paste your JWT here (eyJ...)"
                    className={`w-full h-32 bg-[var(--bg-secondary)] border rounded-xl p-4 font-mono text-xs focus:outline-none resize-none break-all ${error ? 'border-red-500' : 'border-[var(--border-subtle)] focus:border-[var(--accent-red)]'}`}
                />
                {error && (
                    <div className="flex items-center gap-2 text-red-500 text-xs font-bold">
                        <AlertTriangle className="w-3 h-3" /> {error}
                    </div>
                )}
                {header && !error && (
                     <div className="flex items-center gap-2 text-green-500 text-xs font-bold">
                        <CheckCircle className="w-3 h-3" /> Valid Structure
                    </div>
                )}
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Header */}
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <label className="text-xs font-bold text-[var(--accent-red)] uppercase tracking-wider">Header</label>
                        <span className="text-[10px] text-[var(--text-muted)]">Algorithm & Type</span>
                    </div>
                    <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-4 min-h-[200px] relative group">
                        <pre className="font-mono text-xs text-[var(--text-secondary)] whitespace-pre-wrap">
                            {header ? formatJson(header) : '// Header data'}
                        </pre>
                    </div>
                </div>

                 {/* Payload */}
                 <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <label className="text-xs font-bold text-purple-500 uppercase tracking-wider">Payload</label>
                         <span className="text-[10px] text-[var(--text-muted)]">Data & Claims</span>
                    </div>
                    <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-4 min-h-[200px] relative group">
                        <pre className="font-mono text-xs text-[var(--text-primary)] whitespace-pre-wrap">
                            {payload ? formatJson(payload) : '// Payload data'}
                        </pre>
                    </div>
                </div>
            </div>

            {/* Signature Info */}
             <div className="space-y-2">
                <label className="text-xs font-bold text-blue-500 uppercase tracking-wider">Signature</label>
                <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-4 opacity-50">
                    <p className="font-mono text-xs text-[var(--text-muted)] break-all">
                        {token.split('.')[2] ? 'HMACSHA256(base64UrlEncode(header) + "." + base64UrlEncode(payload), secret)' : '// Signature'}
                    </p>
                    <p className="text-[10px] text-[var(--text-muted)] mt-2 italic">
                        *Signature verification requires the secret key, which is not verified here for security.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default JwtDebugger;
