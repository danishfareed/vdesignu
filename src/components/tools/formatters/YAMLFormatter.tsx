import React, { useState } from 'react';
import { Maximize, Minimize, AlertCircle } from 'lucide-react';
import ToolShell, { type Action } from '../ToolShell';
import yaml from 'js-yaml';

export default function YAMLFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const formatYAML = () => {
    if (!input.trim()) return;
    try {
      const parsed = yaml.load(input);
      const formatted = yaml.dump(parsed, {
        indent: 2,
        lineWidth: -1,
        noRefs: true
      });
      setOutput(formatted);
      setError(null);
    } catch (err: any) {
      setError("Invalid YAML: " + err.message);
      setOutput('');
    }
  };

  const validateYAML = () => {
     if (!input.trim()) return;
    try {
      yaml.load(input);
      setOutput("YAML is valid! \u2705"); // Checkmark
      setError(null);
    } catch (err: any) {
       setError("Invalid YAML: " + err.message);
       setOutput('');
    }
  };

  // Minify YAML isn't really a standard concept (it's indentation based), 
  // but we can convert to JSON for minification if needed, or just standard dump.

  const actions: Action[] = [
    { label: 'Format / Beautify', onClick: formatYAML, icon: Maximize, variant: 'primary' },
    { label: 'Validate Only', onClick: validateYAML, icon: AlertCircle, variant: 'secondary' }
  ];

  return (
    <ToolShell
      inputLabel="Input YAML"
      outputLabel="Output"
      inputValue={input}
      onInputChange={setInput}
      outputValue={output}
      error={error}
      actions={actions}
      inputPlaceholder='- item 1\n- item 2'
    />
  );
}
