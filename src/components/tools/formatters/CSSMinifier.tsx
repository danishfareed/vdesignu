import React, { useState } from 'react';
import { Minimize } from 'lucide-react';
import ToolShell, { type Action } from '../ToolShell';

export default function CSSMinifier() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const minifyCSS = () => {
    if (!input.trim()) return;
    try {
      let minified = input
        .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
        .replace(/\s+/g, ' ')            // Collapse whitespace
        .replace(/\s*([\{,;:\}])\s*/g, '$1') // Remove space around separators
        .replace(/;}/g, '}')             // Remove last semicolon
        .trim();

      setOutput(minified);
      setError(null);
    } catch (err: any) {
      setError(err.message);
      setOutput('');
    }
  };

  const actions: Action[] = [
    { label: 'Minify CSS', onClick: minifyCSS, icon: Minimize, variant: 'primary' }
  ];

  return (
    <ToolShell
      inputLabel="Raw CSS"
      outputLabel="Minified CSS"
      inputValue={input}
      onInputChange={setInput}
      outputValue={output}
      error={error}
      actions={actions}
      inputPlaceholder='body {\n  color: red;\n  background: #fff;\n}'
    />
  );
}
