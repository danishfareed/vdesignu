import React, { useState } from 'react';
import { FileJson, Download } from 'lucide-react';
import ToolShell, { type Action } from '../ToolShell';
import Papa from 'papaparse';

export default function CSVToJSON() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const convert = () => {
    if (!input.trim()) return;
    try {
      const result = Papa.parse(input, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true
      });
      
      if (result.errors.length > 0) {
        throw new Error(result.errors[0].message);
      }
      
      setOutput(JSON.stringify(result.data, null, 2));
      setError(null);
    } catch (err: any) {
      setError(err.message);
      setOutput('');
    }
  };

  const downloadJSON = () => {
    if (!output) return;
    const blob = new Blob([output], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'converted.json';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const actions: Action[] = [
    { label: 'Convert to JSON', onClick: convert, icon: FileJson, variant: 'primary' },
    { label: 'Download JSON', onClick: downloadJSON, icon: Download, variant: 'secondary' }
  ];

  return (
    <ToolShell
      inputLabel="Input CSV"
      outputLabel="JSON Output"
      inputValue={input}
      onInputChange={setInput}
      outputValue={output}
      error={error}
      actions={actions}
      inputPlaceholder='Name,Age\nAlice,30\nBob,25'
    />
  );
}
