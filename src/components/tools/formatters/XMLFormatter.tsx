import React, { useState } from 'react';
import { Maximize, Minimize } from 'lucide-react';
import ToolShell, { type Action } from '../ToolShell';
import format from 'xml-formatter';

export default function XMLFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const formatXML = () => {
    if (!input.trim()) return;
    try {
      const formatted = format(input, {
        indentation: '  ',
        filter: (node) => node.type !== 'Comment',
        collapseContent: true,
        lineSeparator: '\n'
      });
      setOutput(formatted);
      setError(null);
    } catch (err: any) {
      setError("Invalid XML: " + err.message);
      setOutput('');
    }
  };

  const minifyXML = () => {
    if (!input.trim()) return;
    try {
      // Basic minification: remove whitespace between tags
      const minified = format(input, {
        indentation: '',
        lineSeparator: '',
        collapseContent: true
      });
      setOutput(minified);
      setError(null);
    } catch (err: any) {
      setError("Invalid XML: " + err.message);
      setOutput('');
    }
  };

  const actions: Action[] = [
    { label: 'Beautify', onClick: formatXML, icon: Maximize, variant: 'primary' },
    { label: 'Minify', onClick: minifyXML, icon: Minimize, variant: 'secondary' }
  ];

  return (
    <ToolShell
      inputLabel="Input XML"
      outputLabel="Formatted XML"
      inputValue={input}
      onInputChange={setInput}
      outputValue={output}
      error={error}
      actions={actions}
      inputPlaceholder='<root><child>value</child></root>'
    />
  );
}
