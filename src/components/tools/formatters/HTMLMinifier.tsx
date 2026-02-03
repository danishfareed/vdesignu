import React, { useState } from 'react';
import { Minimize } from 'lucide-react';
import ToolShell, { type Action } from '../ToolShell';

export default function HTMLMinifier() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const minifyHTML = () => {
    if (!input.trim()) return;
    try {
      let minified = input
        .replace(/<!--[\s\S]*?-->/g, '') // Remove comments
        .replace(/>\s+</g, '><')         // Remove whitespace between tags
        .replace(/\s{2,}/g, ' ')         // Collapse multiple spaces to one
        .replace(/^\s+|\s+$/gm, '')      // Trim lines
        .replace(/\n/g, '');             // Remove newlines

      setOutput(minified);
      setError(null);
    } catch (err: any) {
      setError(err.message);
      setOutput('');
    }
  };

  const actions: Action[] = [
    { label: 'Minify HTML', onClick: minifyHTML, icon: Minimize, variant: 'primary' }
  ];

  return (
    <ToolShell
      inputLabel="Raw HTML"
      outputLabel="Minified HTML"
      inputValue={input}
      onInputChange={setInput}
      outputValue={output}
      error={error}
      actions={actions}
      inputPlaceholder='<html>\n  <body>\n    <!-- Comment -->\n    <h1>Hello</h1>\n  </body>\n</html>'
    />
  );
}
