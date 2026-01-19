import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';
import ToolShell, { type Action } from '../ToolShell';

export default function StringReverser() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const process = (mode: 'chars' | 'words') => {
    if (!input) return;
    if (mode === 'chars') {
      setOutput(input.split('').reverse().join(''));
    } else {
      setOutput(input.split(/\s+/).reverse().join(' '));
    }
  };

  const isPalindrome = () => {
    if (!input) return;
    const clean = input.toLowerCase().replace(/[^a-z0-9]/g, '');
    const reversed = clean.split('').reverse().join('');
    setOutput(clean === reversed ? "Yes, it's a palindrome!" : "No, it's not a palindrome.");
  };

  const actions: Action[] = [
    { label: 'Reverse Characters', onClick: () => process('chars'), icon: RefreshCw, variant: 'primary' },
    { label: 'Reverse Words', onClick: () => process('words'), variant: 'secondary' },
    { label: 'Check Palindrome', onClick: isPalindrome, variant: 'secondary' },
  ];

  return (
    <ToolShell
      inputLabel="Input Text"
      outputLabel="Result"
      inputValue={input}
      onInputChange={setInput}
      outputValue={output}
      actions={actions}
      inputPlaceholder="Type text to reverse..."
    />
  );
}
