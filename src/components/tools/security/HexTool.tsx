import React, { useState } from 'react';
import { Binary, Type } from 'lucide-react';
import ToolShell, { type Action } from '../ToolShell';

export default function HexTool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const toHex = () => {
    if (!input) return;
    try {
      let hex = '';
      for (let i = 0; i < input.length; i++) {
        hex += input.charCodeAt(i).toString(16).padStart(2, '0');
      }
      setOutput(hex);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const fromHex = () => {
    if (!input) return;
    try {
      const hex = input.replace(/\s+/g, '');
      if (hex.length % 2 !== 0) throw new Error("Invalid hex length");
      
      let str = '';
      for (let i = 0; i < hex.length; i += 2) {
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
      }
      setOutput(str);
      setError(null);
    } catch (err: any) {
      setError("Invalid Hex string: " + err.message);
    }
  };

  const actions: Action[] = [
    { label: 'Text to Hex', onClick: toHex, icon: Binary, variant: 'primary' },
    { label: 'Hex to Text', onClick: fromHex, icon: Type, variant: 'secondary' }
  ];

  return (
    <ToolShell
      inputLabel="Input"
      outputLabel="Result"
      inputValue={input}
      onInputChange={setInput}
      outputValue={output}
      error={error}
      actions={actions}
      inputPlaceholder="Input text or hex..."
    />
  );
}
