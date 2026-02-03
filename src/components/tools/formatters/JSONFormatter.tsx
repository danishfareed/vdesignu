import React, { useState } from 'react';
import { Maximize, Minimize } from 'lucide-react';
import ToolShell, { type Action } from '../ToolShell';

export default function JSONFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const formatJSON = () => {
    if (!input.trim()) return;
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError(null);
    } catch (err: any) {
      setError(err.message);
      setOutput('');
    }
  };

  const minifyJSON = () => {
    if (!input.trim()) return;
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError(null);
    } catch (err: any) {
      setError(err.message);
      setOutput('');
    }
  };

  const actions: Action[] = [
    { label: 'Beautify', onClick: formatJSON, icon: Maximize, variant: 'primary' },
    { label: 'Minify', onClick: minifyJSON, icon: Minimize, variant: 'secondary' }
  ];

  return (
    <ToolShell
      inputLabel="Input JSON"
      outputLabel="Formatted JSON"
      inputValue={input}
      onInputChange={setInput}
      outputValue={output}
      error={error}
      actions={actions}
      inputPlaceholder='{"key": "value"}'
    />
  );
}
