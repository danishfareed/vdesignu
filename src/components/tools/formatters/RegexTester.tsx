import React, { useState, useMemo } from 'react';
import { Regex } from 'lucide-react';

// Custom lightweight shell for Regex (needs 2 inputs)
export default function RegexTester() {
  const [regexPattern, setRegexPattern] = useState('');
  const [regexFlags, setRegexFlags] = useState('g');
  const [testString, setTestString] = useState('');
  
  const matches = useMemo(() => {
    if (!regexPattern || !testString) return [];
    try {
      const regex = new RegExp(regexPattern, regexFlags);
      const output = [];
      let match;
      
      // If global, loop
      if (regex.global) {
        while ((match = regex.exec(testString)) !== null) {
          output.push({
            match: match[0],
            index: match.index,
            groups: match.groups
          });
          if (match.index === regex.lastIndex) regex.lastIndex++; // Avoid infinite loop
        }
      } else {
        match = regex.exec(testString);
        if (match) {
           output.push({
            match: match[0],
            index: match.index,
            groups: match.groups
          });
        }
      }
      return output;
    } catch (e) {
      return [];
    }
  }, [regexPattern, regexFlags, testString]);

  const error = useMemo(() => {
     try {
       new RegExp(regexPattern, regexFlags);
       return null;
     } catch (e: any) {
       return e.message;
     }
  }, [regexPattern, regexFlags]);

  return (
     <div className="flex flex-col gap-8">
      {/* Pattern Input */}
      <div className="bg-[var(--bg-card)] p-6 rounded-xl border border-[var(--border-subtle)]">
        <label className="text-sm font-bold text-[var(--text-muted)] uppercase tracking-wider mb-2 block">Regex Input</label>
        <div className="flex gap-4">
           <div className="flex-1 flex items-center bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-lg px-3 focus-within:border-[var(--accent-red)] transition-colors">
              <span className="text-[var(--text-muted)] font-mono text-lg select-none">/</span>
              <input 
                 className="flex-1 bg-transparent p-2 font-mono text-lg focus:outline-none text-[var(--text-primary)]"
                 value={regexPattern}
                 onChange={(e) => setRegexPattern(e.target.value)}
                 placeholder="pattern..."
              />
              <span className="text-[var(--text-muted)] font-mono text-lg select-none">/</span>
           </div>
           <input
              className="w-24 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-lg p-2 font-mono text-lg text-[var(--text-primary)] focus:border-[var(--accent-red)] focus:outline-none"
              value={regexFlags}
              onChange={(e) => setRegexFlags(e.target.value)}
              placeholder="gims"
           />
        </div>
        {error && <p className="text-red-500 text-xs mt-2 font-bold">{error}</p>}
      </div>

      <div className="grid lg:grid-cols-2 gap-6 h-[500px]">
        <div className="flex flex-col gap-2 h-full">
           <label className="text-sm font-bold text-[var(--text-muted)] uppercase tracking-wider">Test String</label>
           <textarea
             className="flex-1 w-full bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-4 font-mono text-sm resize-none focus:outline-none focus:border-[var(--accent-red)] transition-colors custom-scrollbar"
             placeholder="Paste text to test..."
             value={testString}
             onChange={(e) => setTestString(e.target.value)}
           />
        </div>

        <div className="flex flex-col gap-2 h-full">
           <label className="text-sm font-bold text-[var(--text-muted)] uppercase tracking-wider">Matches ({matches.length})</label>
           <div className="flex-1 w-full bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-4 overflow-auto custom-scrollbar font-mono text-sm leading-relaxed">
              {matches.length > 0 ? (
                matches.map((m, i) => (
                  <div key={i} className="mb-4 pb-4 border-b border-[var(--border-subtle)] last:border-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-[var(--accent-red)] text-white text-[10px] font-bold px-2 rounded">Match {i + 1}</span>
                      <span className="text-[var(--text-muted)] text-xs">Index: {m.index}</span>
                    </div>
                    <div className="bg-[var(--bg-primary)] p-2 rounded text-[var(--text-primary)] break-all border border-[var(--border-subtle)]">
                      {m.match}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-[var(--text-muted)] italic opacity-50">No matches found.</div>
              )}
           </div>
        </div>
      </div>
     </div>
  );
}
