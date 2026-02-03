import React from 'react';
import type { Subdomain } from './types';
import { Network, Server, Globe, MoreVertical } from 'lucide-react';

export const DNSRecordsTable: React.FC<{ subdomains: Subdomain[] }> = ({ subdomains }) => {
  return (
    <div className="bg-[var(--bg-card)] rounded-xl border border-[var(--border-subtle)] overflow-hidden shadow-sm">
      <div className="p-4 border-b border-[var(--border-subtle)] flex justify-between items-center bg-[var(--bg-secondary)]/30">
        <h3 className="font-bold text-[var(--text-primary)] flex items-center gap-2">
           <Network className="w-4 h-4 text-blue-500" />
           A Records (Detailed View)
        </h3>
        <span className="text-xs text-[var(--text-muted)] font-mono">{subdomains.length} Records</span>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="bg-[var(--bg-secondary)] text-[var(--text-muted)] text-xs uppercase tracking-wider font-bold">
              <th className="p-4 border-b border-[var(--border-subtle)] w-1/3">Host</th>
              <th className="p-4 border-b border-[var(--border-subtle)] w-48">IP Address</th>
              <th className="p-4 border-b border-[var(--border-subtle)]">Tech / Status</th>
              <th className="p-4 border-b border-[var(--border-subtle)] w-24">Source</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-subtle)] font-mono text-xs">
            {subdomains.map((sub, i) => (
              <tr key={i} className="hover:bg-[var(--bg-secondary)]/50 transition-colors group">
                <td className="p-4">
                   <div className="font-bold text-[var(--text-primary)] mb-1">{sub.hostname}</div>
                </td>
                
                <td className="p-4">
                   <div className="text-blue-500">{sub.ip || 'Resolving...'}</div>
                </td>
                
                <td className="p-4">
                   <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                         <span className={`w-2 h-2 rounded-full ${sub.status === 'live' ? 'bg-green-500' : 'bg-[var(--accent-red)]'}`} />
                         <span className="text-[var(--text-secondary)]">{sub.status}</span>
                      </div>
                   </div>
                </td>
                
                <td className="p-4">
                   <div className="text-[var(--text-muted)]">{sub.source}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
