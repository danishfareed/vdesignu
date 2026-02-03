import React, { useState } from 'react';
import { Sheet, Download } from 'lucide-react';
import ToolShell, { type Action } from '../ToolShell';
import Papa from 'papaparse';

export default function JSONToCSV() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const convert = () => {
    if (!input.trim()) return;
    try {
      const parsed = JSON.parse(input);
      if (!Array.isArray(parsed)) {
        throw new Error("Input must be a JSON array of objects.");
      }
      const csv = Papa.unparse(parsed);
      setOutput(csv);
      setError(null);
    } catch (err: any) {
      setError(err.message);
      setOutput('');
    }
  };

  const downloadCSV = () => {
    if (!output) return;
    const blob = new Blob([output], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'converted.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const actions: Action[] = [
    { label: 'Convert to CSV', onClick: convert, icon: Sheet, variant: 'primary' },
    { label: 'Download CSV', onClick: downloadCSV, icon: Download, variant: 'secondary' }
  ];

  return (
    <ToolShell
      inputLabel="Input JSON Array"
      outputLabel="CSV Output"
      inputValue={input}
      onInputChange={setInput}
      outputValue={output}
      error={error}
      actions={actions}
      inputPlaceholder='[{"name": "Alice", "age": 30}, {"name": "Bob", "age": 25}]'
    />
  );
}
