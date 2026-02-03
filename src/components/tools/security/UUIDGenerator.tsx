import React, { useState } from 'react';
import { Fingerprint, Copy } from 'lucide-react';

export default function UUIDGenerator() {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState(1);
  const [copied, setCopied] = useState(false);

  const generate = () => {
    const newUuids = [];
    for (let i = 0; i < count; i++) {
      newUuids.push(crypto.randomUUID());
    }
    setUuids(newUuids);
    setCopied(false);
  };

  const copy = () => {
    if (uuids.length > 0) {
      navigator.clipboard.writeText(uuids.join('\n'));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  React.useEffect(() => {
    generate();
  }, []);

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-8">
      {/* Controls */}
      <div className="flex items-end gap-4">
        <div className="flex-1">
          <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-2 block">Quantity to Generate</label>
          <input 
            type="number" min="1" max="100" value={count} 
            onChange={(e) => setCount(Math.min(100, Math.max(1, parseInt(e.target.value) || 1)))}
            className="w-full bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-4 font-black text-xl text-[var(--text-primary)] focus:border-[var(--accent-red)] focus:outline-none"
          />
        </div>
        <button 
           onClick={generate}
           className="px-8 py-4 bg-[var(--accent-red)] text-white rounded-xl font-bold flex items-center gap-2 hover:bg-black transition-colors shadow-lg shadow-red-600/20"
        >
          <Fingerprint size={20} /> Generate
        </button>
      </div>

      {/* Results */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-[var(--border-subtle)] bg-[var(--bg-primary)]">
          <span className="text-xs font-black uppercase tracking-widest text-[var(--text-muted)]">Generated UUIDs (v4)</span>
          <button onClick={copy} className="text-[var(--accent-red)] text-xs font-bold hover:underline">
            {copied ? 'Copied!' : 'Copy All'}
          </button>
        </div>
        <div className="p-6 max-h-[500px] overflow-y-auto custom-scrollbar">
          {uuids.map((uuid, i) => (
            <div key={i} className="font-mono text-lg text-[var(--text-primary)] py-2 border-b border-[var(--border-subtle)] last:border-0 hover:bg-[var(--bg-primary)]/50 px-2 rounded cursor-pointer" onClick={() => navigator.clipboard.writeText(uuid)}>
              {uuid}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
