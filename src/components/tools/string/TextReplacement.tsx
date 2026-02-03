import React, { useState } from 'react';
import { Replace } from 'lucide-react';
import ToolShell, { type Action } from '../ToolShell';

export default function TextReplacement() {
  const [input, setInput] = useState('');
  const [find, setFind] = useState('');
  const [replace, setReplace] = useState('');
  const [useRegex, setUseRegex] = useState(false);
  const [output, setOutput] = useState('');

  const process = () => {
    if (!input || !find) return;
    try {
      if (useRegex) {
        const regex = new RegExp(find, 'g');
        setOutput(input.replace(regex, replace));
      } else {
        setOutput(input.split(find).join(replace));
      }
    } catch (e: any) {
        setOutput("Error: " + e.message);
    }
  };

  const actions: Action[] = [
    { label: 'Replace All', onClick: process, icon: Replace, variant: 'primary' }
  ];

  return (
    <div className="flex flex-col gap-6">
       <div className="bg-[var(--bg-card)] p-6 rounded-xl border border-[var(--border-subtle)] flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-[200px]">
             <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1 block">Find</label>
             <input 
               className="w-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-lg p-3 text-sm focus:border-[var(--accent-red)] focus:outline-none"
               value={find}
               onChange={(e) => setFind(e.target.value)}
               placeholder="Text to find..."
             />
          </div>
          <div className="flex-1 min-w-[200px]">
             <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1 block">Replace With</label>
             <input 
               className="w-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-lg p-3 text-sm focus:border-[var(--accent-red)] focus:outline-none"
               value={replace}
               onChange={(e) => setReplace(e.target.value)}
               placeholder="Replacement..."
             />
          </div>
          <div className="flex items-center pb-3">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input type="checkbox" checked={useRegex} onChange={(e) => setUseRegex(e.target.checked)} className="w-5 h-5 accent-[var(--accent-red)] rounded" />
                  <span className="text-sm font-bold text-[var(--text-primary)]">Use Regex</span>
              </label>
          </div>
       </div>

       <ToolShell
        inputLabel="Input Text"
        outputLabel="Result"
        inputValue={input}
        onInputChange={setInput}
        outputValue={output}
        actions={actions}
        inputPlaceholder="Original text goes here..."
      />
    </div>
  );
}
