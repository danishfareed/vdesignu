import React, { useState } from 'react';
import { ListX } from 'lucide-react';
import ToolShell, { type Action } from '../ToolShell';

export default function RemoveDuplicateLines() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [stats, setStats] = useState('');

  const process = () => {
    if (!input) return;
    const lines = input.split('\n');
    const unique = [...new Set(lines)]; // Basic dedup
    // Remove empty lines if desired? Let's keep empty lines but dedup multiple empties
    
    setOutput(unique.join('\n'));
    setStats(`Removed ${lines.length - unique.length} duplicate lines.`);
  };

  const actions: Action[] = [
    { label: 'Remove Duplicates', onClick: process, icon: ListX, variant: 'primary' }
  ];

  return (
    <div className="flex flex-col gap-2">
      <ToolShell
        inputLabel="Input List"
        outputLabel="Cleaned List"
        inputValue={input}
        onInputChange={setInput}
        outputValue={output}
        actions={actions}
        inputPlaceholder={'Apple\nBanana\nApple\nOrange\nBanana'}
      />
      {stats && <div className="text-center font-bold text-[var(--accent-red)]">{stats}</div>}
    </div>
  );
}
