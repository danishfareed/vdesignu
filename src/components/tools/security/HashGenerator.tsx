import React, { useState, useEffect } from 'react';
import { Hash } from 'lucide-react';
import ToolShell, { type Action } from '../ToolShell';
import CryptoJS from 'crypto-js';

interface Props {
  algorithm: 'MD5' | 'SHA1' | 'SHA256' | 'SHA512' | 'SHA224' | 'SHA384' | 'RIPEMD160';
}

export default function HashGenerator({ algorithm }: Props) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const generateHash = () => {
    if (!input) {
      setOutput('');
      return;
    }
    
    let hash: any;
    switch (algorithm) {
      case 'MD5': hash = CryptoJS.MD5(input); break;
      case 'SHA1': hash = CryptoJS.SHA1(input); break;
      case 'SHA256': hash = CryptoJS.SHA256(input); break;
      case 'SHA512': hash = CryptoJS.SHA512(input); break;
      case 'SHA224': hash = CryptoJS.SHA224(input); break;
      case 'SHA384': hash = CryptoJS.SHA384(input); break;
      case 'RIPEMD160': hash = CryptoJS.RIPEMD160(input); break;
      default: hash = CryptoJS.SHA256(input);
    }
    
    setOutput(hash.toString(CryptoJS.enc.Hex));
  };

  // Auto-generate on input change for smooth UX
  useEffect(() => {
    generateHash();
  }, [input, algorithm]);

  const actions: Action[] = [
    { label: `Generate ${algorithm}`, onClick: generateHash, icon: Hash, variant: 'primary' }
  ];

  return (
    <ToolShell
      inputLabel="Input Text"
      outputLabel={`${algorithm} Hash`}
      inputValue={input}
      onInputChange={setInput}
      outputValue={output}
      actions={actions}
      inputPlaceholder="Type text to hash..."
    />
  );
}
