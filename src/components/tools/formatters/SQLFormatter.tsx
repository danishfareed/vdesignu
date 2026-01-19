import React, { useState } from 'react';
import { Maximize } from 'lucide-react';
import ToolShell, { type Action } from '../ToolShell';
import { format } from 'sql-formatter';

export default function SQLFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const formatSQL = () => {
    if (!input.trim()) return;
    try {
      const formatted = format(input, {
        language: 'sql',
        tabWidth: 2,
        keywordCase: 'upper',
        linesBetweenQueries: 2
      });
      setOutput(formatted);
      setError(null);
    } catch (err: any) {
      setError("Invalid SQL: " + err.message);
      setOutput('');
    }
  };

  const actions: Action[] = [
    { label: 'Beautify', onClick: formatSQL, icon: Maximize, variant: 'primary' }
  ];

  return (
    <ToolShell
      inputLabel="Raw SQL"
      outputLabel="Formatted SQL"
      inputValue={input}
      onInputChange={setInput}
      outputValue={output}
      error={error}
      actions={actions}
      inputPlaceholder='SELECT * FROM users WHERE id = 1'
    />
  );
}
