import React, { useMemo } from 'react';
import { Globe, Server, Activity, Map as MapIcon, Shield } from 'lucide-react';
import type { ExtendedScanResult } from './types';
import InteractiveWorldMap from './InteractiveWorldMap';

export const DomainDashboard: React.FC<{ result: ExtendedScanResult }> = ({ result }) => {
  
  // Aggregate data (Memoized)
  const locations = useMemo(() => {
    const locs: Record<string, number> = {};
    
    // 1. Add Main Domain Location
    if (result.ipInfo?.country) {
        locs[result.ipInfo.country] = 1;
    }
    
    // 2. Add Subdomain Locations (if available in future, or mock logic for "whole network" visualization request)
    // Since we don't have per-subdomain geo in current scan logic (rate limits), we will simulate distribution 
    // based on main location or show just the main one.
    // However, user asked for "hosting/networks means... all... their providers and flags".
    // For now, we display what we have. If we have 50 subdomains on the same IP, count should be higher.
    
    // Check if subdomains share the main IP
    if (result.ipInfo?.ip && result.subdomains) {
        let count = 0;
        result.subdomains.forEach(sub => {
            if (sub.ip === result.ipInfo?.ip) count++;
        });
        if (result.ipInfo.country) {
            locs[result.ipInfo.country] = (locs[result.ipInfo.country] || 0) + count;
        }
    }
    
    return locs;
  }, [result]);

  const serverCounts = useMemo(() => {
    // Determine counts from tech stack or headers
    const counts: Record<string, number> = {};
    const combined = [...(result.techStack || []), ...(result.advancedTech || [])];
    
    combined.forEach(t => {
        if (t.category === 'Web Server' || t.category === 'CDN' || t.category === 'Paas' || t.category === 'Reverse Proxy') {
            counts[t.name] = (counts[t.name] || 0) + 1;
        }
    });

    // Fallback if empty to WAF or Server Header
    if (Object.keys(counts).length === 0) {
        if (result.waf) counts[result.waf] = 1;
    }
    
    const arr = Object.entries(counts).map(([name, value]) => ({ name, value }));
    return arr.length > 0 ? arr : [{ name: 'Unknown Network', value: 1 }];
  }, [result]);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Top Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
         <div className="bg-[var(--bg-card)] p-4 rounded-xl border border-[var(--border-subtle)] flex flex-col justify-between h-32 relative overflow-hidden group shadow-sm hover:shadow-md transition-all">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-[var(--accent-red)]">
               <Globe className="w-16 h-16" />
            </div>
            <span className="text-[var(--text-muted)] text-xs uppercase tracking-wider font-bold z-10">Subdomains</span>
            <span className="text-4xl font-black text-[var(--text-primary)] z-10">{result.subdomains.length}</span>
            <div className="flex items-center text-green-500 text-xs font-mono z-10">
               <Activity className="w-3 h-3 mr-1" /> Live: {result.subdomains.filter(s => s.status === 'live').length}
            </div>
         </div>
         
         <div className="bg-[var(--bg-card)] p-4 rounded-xl border border-[var(--border-subtle)] flex flex-col justify-between h-32 relative overflow-hidden group shadow-sm hover:shadow-md transition-all">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-[var(--accent-red)]">
               <Shield className="w-16 h-16" />
            </div>
            <span className="text-[var(--text-muted)] text-xs uppercase tracking-wider font-bold z-10">Security</span>
            <span className={`text-4xl font-black z-10 ${result.vulnerabilities.length > 0 ? 'text-[var(--accent-red)]' : 'text-green-500'}`}>
              {result.vulnerabilities.length > 0 ? 'FAIL' : 'PASS'}
            </span>
            <div className="flex items-center text-[var(--text-muted)] text-xs font-mono z-10">
               Vulns: {result.vulnerabilities.length}
            </div>
         </div>

         <div className="bg-[var(--bg-card)] p-4 rounded-xl border border-[var(--border-subtle)] flex flex-col justify-between h-32 relative overflow-hidden group shadow-sm hover:shadow-md transition-all">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-[var(--accent-red)]">
               <Server className="w-16 h-16" />
            </div>
            <span className="text-[var(--text-muted)] text-xs uppercase tracking-wider font-bold z-10">Stack</span>
            <span className="text-4xl font-black text-[var(--accent-red)] z-10">
              {(result.techStack?.length || 0) + (result.advancedTech?.length || 0)}
            </span>
            <div className="flex items-center text-[var(--text-muted)] text-xs font-mono z-10">
               Technologies
            </div>
         </div>

         <div className="bg-[var(--bg-card)] p-4 rounded-xl border border-[var(--border-subtle)] flex flex-col justify-between h-32 relative overflow-hidden group shadow-sm hover:shadow-md transition-all">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-[var(--accent-red)]">
               <MapIcon className="w-16 h-16" />
            </div>
            <span className="text-[var(--text-muted)] text-xs uppercase tracking-wider font-bold z-10">Locations</span>
            <span className="text-4xl font-black text-[var(--accent-red)] z-10">
               {Object.keys(locations).length || 1}
            </span>
            <div className="flex items-center text-[var(--text-muted)] text-xs font-mono z-10">
               Countries
            </div>
         </div>
      </div>

      {/* Main Visuals Row */}
      <div className="grid lg:grid-cols-3 gap-6">
         
         {/* World Map Section - Takes 2 cols now for better visibility */}
         <div className="lg:col-span-2 bg-[var(--bg-card)] rounded-xl border border-[var(--border-subtle)] p-5 shadow-sm">
            <h3 className="text-sm font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-4 flex items-center gap-2">
               <Globe className="w-4 h-4 text-blue-500" />
               System Locations (Global Infrastructure)
            </h3>
            {/* Interactive Map */}
            <div className="h-[400px] w-full">
                <InteractiveWorldMap locations={locations} />
            </div>
         </div>

         {/* Hosting / Networks Stats - Takes 1 col */}
         <div className="lg:col-span-1 bg-[var(--bg-card)] rounded-xl border border-[var(--border-subtle)] p-5 shadow-sm">
             <h3 className="text-sm font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-4 flex items-center gap-2">
               <Server className="w-4 h-4 text-purple-500" />
               Hosting & Networks
            </h3>
            <div className="space-y-4 pt-2">
               {serverCounts.map((item, i) => (
                  <div key={i} className="group">
                     <div className="flex justify-between text-xs mb-1">
                        <span className="text-[var(--text-secondary)] font-mono">{item.name}</span>
                        <span className="text-[var(--text-primary)] font-bold">{item.value}</span>
                     </div>
                     <div className="w-full bg-[var(--bg-secondary)] rounded-full h-2 overflow-hidden">
                        <div 
                           className="bg-purple-500 h-full rounded-full transition-all duration-1000" 
                           style={{ width: `${Math.min((item.value / 20) * 100, 100)}%` }}
                        />
                     </div>
                  </div>
               ))}
            </div>
            
            <div className="mt-8 p-4 bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-subtle)]">
                <div className="text-xs font-bold text-[var(--text-primary)] mb-2 uppercase tracking-wide">Network Summary</div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="text-[var(--text-muted)]">Total IPs:</div>
                    <div className="text-right font-mono text-[var(--text-primary)]">{Object.keys(locations).length > 0 ? Object.values(locations).reduce((a,b)=>a+b,0) : 1}</div>
                    <div className="text-[var(--text-muted)]">Providers:</div>
                    <div className="text-right font-mono text-[var(--text-primary)]">{serverCounts.length}</div>
                    <div className="text-[var(--text-muted)]">DNS Zone:</div>
                    <div className="text-right font-mono text-[var(--text-primary)]">{result.dnsRecords.length} records</div>
                </div>
            </div>
         </div>
      </div>
    </div>
  );
};
