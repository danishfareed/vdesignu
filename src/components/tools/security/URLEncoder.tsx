import React, { useState } from 'react';
import { Link, Lock } from 'lucide-react';
import ToolShell, { type Action } from '../ToolShell';

export default function URLEncoder() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const encode = () => {
    if (!input) return;
    try {
      const encoded = encodeURIComponent(input);
      setOutput(encoded);
      setError(null);
    } catch (err: any) {
      setError(err.message);
      setOutput('');
    }
  };

  const decode = () => {
    if (!input) return;
    try {
      const decoded = decodeURIComponent(input);
      setOutput(decoded);
      setError(null);
    } catch (err: any) {
      setError("Invalid URL encoding: " + err.message);
      setOutput('');
    }
  };

  const actions: Action[] = [
    { label: 'Encode URL', onClick: encode, icon: Lock, variant: 'primary' },
    { label: 'Decode URL', onClick: decode, icon: Link, variant: 'secondary' }
  ];

  return (
    <ToolShell
      inputLabel="Input Text"
      outputLabel="Result"
      inputValue={input}
      onInputChange={setInput}
      outputValue={output}
      error={error}
      actions={actions}
      inputPlaceholder="https://example.com/search?q=hello world"
    />
  );
}
