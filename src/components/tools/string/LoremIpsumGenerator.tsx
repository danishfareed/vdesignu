import React, { useState, useEffect } from 'react';
import { FileText } from 'lucide-react';
import ToolShell, { type Action } from '../ToolShell';

const LOREM_TEXT = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;

const LOREM_WORDS = LOREM_TEXT.toLowerCase().replace(/[^a-z ]/g, '').split(' ');

export default function LoremIpsumGenerator() {
  const [count, setCount] = useState(3);
  const [type, setType] = useState<'paragraphs' | 'words' | 'sentences'>('paragraphs');
  const [output, setOutput] = useState('');

  const generate = () => {
    let result: string[] = [];
    
    if (type === 'paragraphs') {
      for (let i = 0; i < count; i++) {
        result.push(LOREM_TEXT);
      }
      setOutput(result.join('\n\n'));
    } else if (type === 'sentences') {
       const sentences = LOREM_TEXT.split('. ');
       for (let i = 0; i < count; i++) {
         result.push(sentences[i % sentences.length] + '.');
       }
       setOutput(result.join(' '));
    } else {
       for (let i = 0; i < count; i++) {
         result.push(LOREM_WORDS[i % LOREM_WORDS.length]);
       }
       setOutput(result.join(' '));
    }
  };

  useEffect(() => {
    generate();
  }, [count, type]);

  const actions: Action[] = [
    { label: 'Generate', onClick: generate, icon: FileText, variant: 'primary' }
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* Controls */}
      <div className="bg-[var(--bg-card)] p-6 rounded-xl border border-[var(--border-subtle)] flex flex-wrap gap-6 items-end">
        <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">Count</label>
            <input 
              type="number" min="1" max="100" value={count}
              onChange={(e) => setCount(Math.max(1, parseInt(e.target.value)))}
              className="w-24 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-lg p-3 font-bold text-[var(--text-primary)] focus:border-[var(--accent-red)] focus:outline-none"
            />
        </div>
        <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">Type</label>
            <div className="flex bg-[var(--bg-primary)] rounded-lg p-1 border border-[var(--border-subtle)]">
                {['paragraphs', 'sentences', 'words'].map((t) => (
                    <button
                        key={t}
                        onClick={() => setType(t as any)}
                        className={`px-4 py-2 rounded-md text-sm font-bold capitalize transition-all ${type === t ? 'bg-[var(--bg-card)] text-[var(--accent-red)] shadow-sm' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
                    >
                        {t}
                    </button>
                ))}
            </div>
        </div>
      </div>

      <ToolShell
        inputLabel="" 
        outputLabel="Generated Text"
        inputValue="" // Unused
        onInputChange={() => {}} // Unused
        outputValue={output}
        actions={actions}
        // Hack to hide input area since this is generator only
        inputPlaceholder="" 
      />
      {/* CSS Hack to hide the input section of ToolShell since we repurposed it */}
      <style>{`
        .tool-shell-input-section { display: none !important; }
        .lg\\:grid-cols-2 { display: flex; flex-direction: column; } 
      `}</style>
    </div>
  );
}
