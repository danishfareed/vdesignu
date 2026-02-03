import React, { useState } from 'react';
import { Type } from 'lucide-react';
import ToolShell, { type Action } from '../ToolShell';

export default function CaseConverter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const transforms = {
    upper: (s: string) => s.toUpperCase(),
    lower: (s: string) => s.toLowerCase(),
    title: (s: string) => s.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()),
    sentence: (s: string) => s.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, c => c.toUpperCase()),
    camel: (s: string) => s.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase()),
    snake: (s: string) => s.toLowerCase().replace(/\s+/g, '_'),
    kebab: (s: string) => s.toLowerCase().replace(/\s+/g, '-'),
    alternating: (s: string) => s.split('').map((c, i) => i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()).join(''),
  };

  const apply = (type: keyof typeof transforms) => {
    setOutput(transforms[type](input));
  };

  const actions: Action[] = [
    { label: 'UPPER CASE', onClick: () => apply('upper'), variant: 'secondary' },
    { label: 'lower case', onClick: () => apply('lower'), variant: 'secondary' },
    { label: 'Title Case', onClick: () => apply('title'), variant: 'secondary' },
    { label: 'Sentence case', onClick: () => apply('sentence'), variant: 'secondary' },
    { label: 'camelCase', onClick: () => apply('camel'), variant: 'secondary' },
    { label: 'snake_case', onClick: () => apply('snake'), variant: 'secondary' },
    { label: 'kebab-case', onClick: () => apply('kebab'), variant: 'secondary' },
    { label: 'aLtErNaTiNg', onClick: () => apply('alternating'), variant: 'secondary' },
  ];

  return (
    <ToolShell
      inputLabel="Input Text"
      outputLabel="Converted Text"
      inputValue={input}
      onInputChange={setInput}
      outputValue={output}
      actions={actions}
      inputPlaceholder="Type text to convert..."
    />
  );
}
