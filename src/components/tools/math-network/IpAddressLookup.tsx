import React, { useState, useEffect } from 'react';
import { Globe, Search, MapPin, Network, Activity, AlertCircle } from 'lucide-react';

interface IpData {
    ip: string;
    city: string;
    region: string;
    country_name: string;
    country_code: string;
    postal: string;
    latitude: number;
    longitude: number;
    timezone: string;
    org: string;
    asn: string;
    error?: boolean;
    reason?: string;
}

const IpAddressLookup = () => {
    const [ip, setIp] = useState('');
    const [data, setData] = useState<IpData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch user's IP on load
        fetchIpData('');
    }, []);

    const fetchIpData = async (targetIp: string) => {
        setLoading(true);
        setError('');
        setData(null);

        try {
            const url = targetIp ? `https://ipapi.co/${targetIp}/json/` : 'https://ipapi.co/json/';
            const res = await fetch(url);
            
             // Handle ipapi.co rate limiting or errors
            if (res.status === 429) {
                throw new Error('Rate limit exceeded. Please try again later.');
            }

            const json = await res.json();

            if (json.error) {
                throw new Error(json.reason || 'Failed to resolve IP');
            }

            setData(json);
        } catch (err: any) {
            setError(err.message || 'Failed to fetch IP data');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        fetchIpData(ip);
    };

    return (
        <div className="space-y-8">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex gap-4">
                <div className="flex-1 relative">
                    <input 
                        type="text" 
                        value={ip}
                        onChange={(e) => setIp(e.target.value)}
                        placeholder="Enter an IP Address (leave empty for yours)"
                        className="w-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-xl px-4 py-3 pl-12 font-mono text-[var(--text-primary)] focus:border-[var(--accent-red)] focus:outline-none"
                    />
                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
                </div>
                <button 
                    type="submit"
                    disabled={loading}
                    className="bg-[var(--accent-red)] text-white px-6 py-3 rounded-xl font-bold hover:bg-black transition-colors shadow-lg disabled:opacity-50"
                >
                    {loading ? <Activity className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
                </button>
            </form>

            {/* Error State */}
            {error && (
                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-xl flex items-center gap-3 text-red-500">
                    <AlertCircle className="w-5 h-5" />
                    <span className="font-bold">{error}</span>
                </div>
            )}

            {/* Results */}
            {data && !error && (
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Main Info Card */}
                    <div className="bg-[var(--bg-card)] p-8 rounded-2xl border border-[var(--border-subtle)] md:col-span-2 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--accent-red)] opacity-5 blur-[100px] rounded-full pointer-events-none" />
                        
                        <div className="space-y-1 relative z-10 text-center md:text-left">
                            <h2 className="text-3xl font-bold font-mono tracking-tight">{data.ip}</h2>
                            <div className="flex items-center justify-center md:justify-start gap-2 text-[var(--text-muted)] font-bold">
                                <Network className="w-4 h-4" />
                                {data.org || 'Unknown Organization'}
                            </div>
                        </div>

                        <div className="flex flex-col items-center md:items-end gap-1 relative z-10">
                            <span className="text-5xl">{getFlagEmoji(data.country_code)}</span>
                            <span className="font-bold text-lg">{data.country_name}</span>
                            <span className="text-sm text-[var(--text-muted)]">{data.region}, {data.city}</span>
                        </div>
                    </div>

                    {/* Details Grid */}
                    <InfoCard label="City" value={data.city} icon={MapPin} />
                    <InfoCard label="Region" value={`${data.region} (${data.postal})`} icon={MapPin} />
                    <InfoCard label="Country Code" value={data.country_code} icon={Globe} />
                    <InfoCard label="Timezone" value={data.timezone} icon={Activity} />
                    <InfoCard label="Coordinates" value={`${data.latitude}, ${data.longitude}`} icon={MapPin} />
                    <InfoCard label="ASN" value={data.asn} icon={Network} />
                </div>
            )}
        </div>
    );
};

const InfoCard = ({ label, value, icon: Icon }: { label: string, value: string | number, icon: any }) => (
    <div className="bg-[var(--bg-secondary)] p-4 rounded-xl border border-[var(--border-subtle)] flex items-center gap-4">
        <div className="p-3 bg-[var(--bg-primary)] rounded-full text-[var(--text-muted)]">
            <Icon className="w-5 h-5" />
        </div>
        <div>
            <div className="text-xs font-bold text-[var(--text-muted)] uppercase">{label}</div>
            <div className="font-bold text-[var(--text-primary)]">{value || 'N/A'}</div>
        </div>
    </div>
);

// Helper to get flag emoji from ISO code
const getFlagEmoji = (countryCode: string) => {
    if(!countryCode) return '🌍';
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map(char =>  127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
}

export default IpAddressLookup;
