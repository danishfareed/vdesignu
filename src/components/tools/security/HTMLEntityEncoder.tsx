import React, { useState } from 'react';
import { Code, Type } from 'lucide-react';
import ToolShell, { type Action } from '../ToolShell';

export default function HTMLEntityEncoder() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const encode = () => {
    if (!input) return;
    try {
      const encoded = input.replace(/[\u00A0-\u9999<>\&]/g, (i) => {
         return '&#' + i.charCodeAt(0) + ';';
      });
      setOutput(encoded);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const decode = () => {
    if (!input) return;
    try {
      const txt = document.createElement('textarea');
      txt.innerHTML = input;
      setOutput(txt.value);
      setError(null);
    } catch (err: any) {
      setError("Invalid entities: " + err.message);
    }
  };

  const actions: Action[] = [
    { label: 'Encode to Entities', onClick: encode, icon: Code, variant: 'primary' },
    { label: 'Decode Entities', onClick: decode, icon: Type, variant: 'secondary' }
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
      inputPlaceholder="<script>alert('xss')</script>"
    />
  );
}
