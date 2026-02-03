import React, { useState, useEffect } from 'react';
import { Network, ArrowRight } from 'lucide-react';
// Actually, simple subnet calc is easy to do with just bitwise operations.

const SubnetCalculator = () => {
    const [ipAddress, setIpAddress] = useState('192.168.1.1');
    const [maskBits, setMaskBits] = useState(24);
    const [result, setResult] = useState<any>(null);

    useEffect(() => {
        calculate();
    }, [ipAddress, maskBits]);

    const calculate = () => {
        // Simple IPv4 validator
        const parts = ipAddress.split('.');
        if (parts.length !== 4 || parts.some(p => isNaN(parseInt(p)) || parseInt(p) < 0 || parseInt(p) > 255)) {
            setResult(null);
            return;
        }

        const ipNum = (parseInt(parts[0]) << 24) | (parseInt(parts[1]) << 16) | (parseInt(parts[2]) << 8) | parseInt(parts[3]);
        const maskNum = 0xffffffff << (32 - maskBits);
        
        const networkNum = ipNum & maskNum;
        const broadcastNum = networkNum | (~maskNum);

        const toIp = (num: number) => {
            return [
                (num >>> 24) & 0xff,
                (num >>> 16) & 0xff,
                (num >>> 8) & 0xff,
                num & 0xff
            ].join('.');
        };

        const hosts = Math.pow(2, 32 - maskBits) - 2;

        setResult({
            networkAddress: toIp(networkNum),
            broadcastAddress: toIp(broadcastNum),
            netmask: toIp(maskNum),
            firstHost: toIp(networkNum + 1),
            lastHost: toIp(broadcastNum - 1),
            totalHosts: hosts > 0 ? hosts : 0,
            cidr: `/${maskBits}`,
            wildcard: toIp(~maskNum)
        });
    };

    return (
        <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8 items-start">
                {/* Inputs */}
                <div className="space-y-6 bg-[var(--bg-secondary)] p-6 rounded-2xl border border-[var(--border-subtle)]">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-[var(--text-muted)] uppercase tracking-wider">IP Address</label>
                        <input 
                            type="text" 
                            value={ipAddress}
                            onChange={(e) => setIpAddress(e.target.value)}
                            placeholder="e.g. 192.168.1.1"
                            className="w-full bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-4 font-mono font-bold focus:border-[var(--accent-red)] focus:outline-none"
                        />
                    </div>
                    
                    <div className="space-y-2">
                        <div className="flex justify-between">
                             <label className="text-sm font-bold text-[var(--text-muted)] uppercase tracking-wider">Subnet Mask (CIDR)</label>
                             <span className="font-mono text-[var(--accent-red)] font-bold">/{maskBits}</span>
                        </div>
                        <input 
                            type="range" 
                            min="1" max="32" 
                            value={maskBits} 
                            onChange={(e) => setMaskBits(parseInt(e.target.value))}
                            className="w-full accent-[var(--accent-red)] h-2 bg-[var(--border-subtle)] rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-xs text-[var(--text-muted)] font-mono">
                            <span>/1</span>
                            <span>/16</span>
                            <span>/24</span>
                            <span>/32</span>
                        </div>
                    </div>
                </div>

                {/* Results */}
                <div className="space-y-4">
                    {result ? (
                        <>
                            <ResultRow label="Network Address" value={result.networkAddress} />
                            <ResultRow label="Subnet Mask" value={result.netmask} />
                            <ResultRow label="Broadcast Address" value={result.broadcastAddress} />
                            <ResultRow label="Wildcard Mask" value={result.wildcard} />
                            <div className="h-px bg-[var(--border-subtle)] my-2" />
                            <ResultRow label="First Usable Host" value={result.firstHost} highlight />
                            <ResultRow label="Last Usable Host" value={result.lastHost} highlight />
                            <ResultRow label="Total Usable Hosts" value={result.totalHosts.toLocaleString()} />
                            <ResultRow label="CIDR Notation" value={result.cidr} />
                        </>
                    ) : (
                        <div className="h-full flex items-center justify-center p-8 bg-[var(--bg-card)] border border-[var(--border-subtle)] border-dashed rounded-2xl text-[var(--text-muted)]">
                            Invalid IP Address
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const ResultRow = ({ label, value, highlight = false }: { label: string, value: string, highlight?: boolean }) => (
    <div className={`flex justify-between items-center p-4 rounded-xl border ${highlight ? 'bg-[var(--bg-card)] border-[var(--accent-red)]/30' : 'bg-[var(--bg-secondary)] border-[var(--border-subtle)]'}`}>
        <span className="text-xs font-bold text-[var(--text-muted)] uppercase">{label}</span>
        <span className={`font-mono font-bold ${highlight ? 'text-[var(--accent-red)]' : 'text-[var(--text-primary)]'}`}>{value}</span>
    </div>
);

export default SubnetCalculator;
