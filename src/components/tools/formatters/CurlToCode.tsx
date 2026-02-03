import React, { useState } from 'react';
import { Code2 } from 'lucide-react';
import ToolShell, { type Action } from '../ToolShell';

export default function CurlToCode() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const parseCurl = (curl: string) => {
    try {
      // Very basic parser for "curl 'url' -H '...' -d '...'"
      // Real robust parsing requires a complex tokenizer, but this covers 80% of cases.
      
      let url = '';
      let method = 'GET';
      const headers: Record<string, string> = {};
      let data = null;

      // Extract URL
      const urlMatch = curl.match(/curl\s+['"]?([^'"\s]+)['"]?/);
      if (urlMatch) {
         url = urlMatch[1];
      } else {
         throw new Error("Could not find URL in cURL command.");
      }

      // Extract Headers
      const headerMatches = curl.matchAll(/-H\s+['"]([^'"]+)['"]/g);
      for (const match of headerMatches) {
        const [key, value] = match[1].split(/:\s(.+)/);
        if (key && value) headers[key] = value;
      }

      // Extract Data
      const dataMatch = curl.match(/(-d|--data-raw)\s+['"](.+)['"]/);
      if (dataMatch) {
        data = dataMatch[2];
        method = 'POST'; // Default to POST if data present
      }

      // Extract Method
      const methodMatch = curl.match(/-X\s+([A-Z]+)/);
      if (methodMatch) {
        method = methodMatch[1];
      }

      // Generate Fetch Code
      let code = `fetch('${url}', {\n`;
      code += `  method: '${method}',\n`;
      
      if (Object.keys(headers).length > 0) {
        code += `  headers: {\n`;
        Object.entries(headers).forEach(([k, v]) => {
          code += `    '${k}': '${v}',\n`;
        });
        code += `  },\n`;
      }

      if (data) {
        code += `  body: JSON.stringify(${data}),\n`;
      }

      code += `})`;
      setOutput(code);
      setError(null);

    } catch (err: any) {
      setError("Failed to parse cURL: " + err.message);
      setOutput('');
    }
  };

  const actions: Action[] = [
    { label: 'Convert to JavaScript (Fetch)', onClick: () => parseCurl(input), icon: Code2, variant: 'primary' }
  ];

  return (
    <ToolShell
      inputLabel="cURL Command"
      outputLabel="JavaScript Fetch Code"
      inputValue={input}
      onInputChange={setInput}
      outputValue={output}
      error={error}
      actions={actions}
      inputPlaceholder="curl 'https://api.example.com/data' -H 'Authorization: Bearer 123'"
    />
  );
}
