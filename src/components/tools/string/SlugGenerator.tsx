import React, { useState } from 'react';
import { Link2 } from 'lucide-react';
import ToolShell, { type Action } from '../ToolShell';

export default function SlugGenerator() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const generateSlug = () => {
    if (!input) return;
    const slug = input
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')           // Replace spaces with -
      .replace(/&/g, '-and-')         // Replace & with 'and'
      .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
      .replace(/\-\-+/g, '-');        // Replace multiple - with single -
    
    setOutput(slug);
  };

  const actions: Action[] = [
    { label: 'Generate Slug', onClick: generateSlug, icon: Link2, variant: 'primary' }
  ];

  return (
    <ToolShell
      inputLabel="Input Headline"
      outputLabel="SEO Friendly Slug"
      inputValue={input}
      onInputChange={setInput}
      outputValue={output}
      actions={actions}
      inputPlaceholder="Hello World! This is a Title"
    />
  );
}
