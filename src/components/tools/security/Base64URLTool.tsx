import React, { useState } from 'react';
import { Lock, Unlock } from 'lucide-react';
import ToolShell, { type Action } from '../ToolShell';

export default function Base64URLTool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const encode = () => {
    if (!input) return;
    try {
      // Base64 encode first
      const base64 = btoa(unescape(encodeURIComponent(input)));
      // Convert to Base64URL: + -> -, / -> _, remove =
      const base64url = base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
      setOutput(base64url);
      setError(null);
    } catch (err: any) {
      setError("Encoding failed: " + err.message);
      setOutput('');
    }
  };

  const decode = () => {
    if (!input) return;
    try {
      let base64 = input.replace(/-/g, '+').replace(/_/g, '/');
      // Pad with =
      while (base64.length % 4) {
        base64 += '=';
      }
      
      const decoded = decodeURIComponent(escape(atob(base64)));
      setOutput(decoded);
      setError(null);
    } catch (err: any) {
      setError("Invalid Base64URL string: " + err.message);
      setOutput('');
    }
  };

  const actions: Action[] = [
    { label: 'Encode Base64URL', onClick: encode, icon: Lock, variant: 'primary' },
    { label: 'Decode Base64URL', onClick: decode, icon: Unlock, variant: 'secondary' }
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
      inputPlaceholder="Type text..."
    />
  );
}
