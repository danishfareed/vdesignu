import React, { useState } from 'react';
import { Lock, Unlock } from 'lucide-react';
import ToolShell, { type Action } from '../ToolShell';

export default function Base64Tool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const encode = () => {
    if (!input) return;
    try {
      // UTF-8 safe encoding
      const encoded = btoa(unescape(encodeURIComponent(input)));
      setOutput(encoded);
      setError(null);
    } catch (err: any) {
      setError("Encoding failed: " + err.message);
      setOutput('');
    }
  };

  const decode = () => {
    if (!input) return;
    try {
      // UTF-8 safe decoding
      const decoded = decodeURIComponent(escape(atob(input)));
      setOutput(decoded);
      setError(null);
    } catch (err: any) {
      setError("Invalid Base64 string: " + err.message);
      setOutput('');
    }
  };

  const actions: Action[] = [
    { label: 'Encode', onClick: encode, icon: Lock, variant: 'primary' },
    { label: 'Decode', onClick: decode, icon: Unlock, variant: 'secondary' }
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
      inputPlaceholder="Type text or paste Base64..."
    />
  );
}
