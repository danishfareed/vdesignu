import React, { useState } from 'react';
import { Diff as DiffIcon } from 'lucide-react';
import * as Diff from 'diff';

export default function TextDiff() {
  const [original, setOriginal] = useState('');
  const [modified, setModified] = useState('');
  const [diffResult, setDiffResult] = useState<Diff.Change[] | null>(null);

  const compare = () => {
    // Character diff for precision, or could invoke other diff modes (words, lines)
    // Let's do Words for general purpose readability
    const diff = Diff.diffWords(original, modified);
    setDiffResult(diff);
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Inputs */}
      <div className="grid lg:grid-cols-2 gap-6 h-[400px]">
         <div className="flex flex-col gap-2 h-full">
            <label className="text-sm font-bold text-[var(--text-muted)] uppercase tracking-wider">Original Text</label>
            <textarea
              className="flex-1 w-full bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-4 font-mono text-sm resize-none focus:outline-none focus:border-[var(--accent-red)] transition-colors custom-scrollbar"
              placeholder="Paste original text..."
              value={original}
              onChange={(e) => setOriginal(e.target.value)}
            />
         </div>
         <div className="flex flex-col gap-2 h-full">
            <label className="text-sm font-bold text-[var(--text-muted)] uppercase tracking-wider">Modified Text</label>
            <textarea
              className="flex-1 w-full bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-4 font-mono text-sm resize-none focus:outline-none focus:border-[var(--accent-red)] transition-colors custom-scrollbar"
              placeholder="Paste modified text..."
              value={modified}
              onChange={(e) => setModified(e.target.value)}
            />
         </div>
      </div>

      {/* Action */}
      <div className="flex justify-center">
         <button 
           onClick={compare}
           className="flex items-center gap-2 px-8 py-4 bg-[var(--accent-red)] text-white hover:bg-black rounded-xl font-bold transition-all shadow-lg text-lg"
         >
           <DiffIcon size={20} /> Compare Differences
         </button>
      </div>

      {/* Output */}
      {diffResult && (
        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-6 font-mono text-sm leading-relaxed whitespace-pre-wrap">
           {diffResult.map((part, index) => {
             const color = part.added ? 'bg-green-200 dark:bg-green-900/30 text-green-800 dark:text-green-300' :
                           part.removed ? 'bg-red-200 dark:bg-red-900/30 text-red-800 dark:text-red-300' : 
                           'text-[var(--text-secondary)]';
             return (
               <span key={index} className={`${color} px-0.5 rounded`}>
                 {part.value}
               </span>
             )
           })}
        </div>
      )}
    </div>
  );
}
