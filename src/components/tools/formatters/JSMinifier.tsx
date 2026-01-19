import React, { useState } from 'react';
import { Minimize } from 'lucide-react';
import ToolShell, { type Action } from '../ToolShell';

export default function JSMinifier() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const minifyJS = () => {
    if (!input.trim()) return;
    try {
      // BASIC Minification only.
      // Warning: Regex-based JS minification is unsafe for complex code.
      // Ideally should use Terser/Esbuild but they are heavy for client-side.
      
      let minified = input
        .replace(/\/\*[\s\S]*?\*\//g, '') // Remove block comments
        .replace(/\/\/.*/g, '')           // Remove line comments (careful with URLs)
        .replace(/^\s+|\s+$/gm, '')      // Trim lines
        .replace(/\n+/g, ' ')            // Remove newlines (dangerous if semicolons missing)
        .replace(/\s*([=+\-\*\/\{\};,\(\)])\s*/g, '$1'); // Collapse space around operators

      setOutput(minified);
      setError(null);
    } catch (err: any) {
      setError(err.message);
      setOutput('');
    }
  };

  const actions: Action[] = [
    { label: 'Minify JS (Basic)', onClick: minifyJS, icon: Minimize, variant: 'primary' }
  ];

  return (
    <ToolShell
      inputLabel="Raw JavaScript"
      outputLabel="Minified JavaScript"
      inputValue={input}
      onInputChange={setInput}
      outputValue={output}
      error={error}
      actions={actions}
      inputPlaceholder='function hello() {\n  return "world";\n}'
    />
  );
}
