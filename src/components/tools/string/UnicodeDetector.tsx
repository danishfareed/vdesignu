import React, { useState } from 'react';
import { Info } from 'lucide-react';
import ToolShell, { type Action } from '../ToolShell';

export default function UnicodeDetector() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const analyze = () => {
    if (!input) return;
    const lines = input.split('').map(char => {
        const code = char.charCodeAt(0);
        const hex = code.toString(16).toUpperCase().padStart(4, '0');
        const entity = `&#${code};`;
        return `Char: ${char} | Dec: ${code} | Hex: U+${hex} | Entity: ${entity}`;
    });
    setOutput(lines.join('\n'));
  };

  const actions: Action[] = [
    { label: 'Analyze Characters', onClick: analyze, icon: Info, variant: 'primary' }
  ];

  return (
    <ToolShell
      inputLabel="Input Text"
      outputLabel="Unicode Information"
      inputValue={input}
      onInputChange={setInput}
      outputValue={output}
      actions={actions}
      inputPlaceholder="Type characters (e.g., emojis 😉)..."
    />
  );
}
