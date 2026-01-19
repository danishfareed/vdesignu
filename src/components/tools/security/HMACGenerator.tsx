import React, { useState, useEffect } from 'react';
import { Key } from 'lucide-react';
import ToolShell, { type Action } from '../ToolShell';
import CryptoJS from 'crypto-js';

export default function HMACGenerator() {
  const [input, setInput] = useState('');
  const [key, setKey] = useState('');
  const [output, setOutput] = useState('');
  const [algo, setAlgo] = useState('SHA256');

  const generateHMAC = () => {
    if (!input || !key) {
      setOutput('');
      return;
    }
    
    let hash: any;
    switch (algo) {
      case 'MD5': hash = CryptoJS.HmacMD5(input, key); break;
      case 'SHA1': hash = CryptoJS.HmacSHA1(input, key); break;
      case 'SHA256': hash = CryptoJS.HmacSHA256(input, key); break;
      case 'SHA512': hash = CryptoJS.HmacSHA512(input, key); break;
      default: hash = CryptoJS.HmacSHA256(input, key);
    }
    
    setOutput(hash.toString(CryptoJS.enc.Hex));
  };

   // Auto-generate
  useEffect(() => {
    generateHMAC();
  }, [input, key, algo]);


  // Custom render for ToolShell not fitting perfectly due to Key input
  // I will implement a custom view using ToolShell structure but adding the Key input manually above text input?
  // Or just use ToolShell and insert key input into the "controls" area? No, ToolShell is rigid.
  // I will reimplement simpler UI or modify ToolShell. 
  // Modifying ToolShell is best but for speed I will inline the UI here reusing the styles.
  
  return (
    <div className="flex flex-col gap-8">
       {/* Controls */}
      <div className="flex flex-wrap gap-4 items-center justify-between bg-[var(--bg-card)] p-6 rounded-xl border border-[var(--border-subtle)]">
         <div className="flex flex-col gap-2 w-full md:w-auto flex-1">
             <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">Secret Key</label>
             <input 
                className="bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-lg p-3 w-full focus:border-[var(--accent-red)] focus:outline-none text-[var(--text-primary)] font-mono text-sm"
                placeholder="Enter secret key..."
                value={key}
                onChange={(e) => setKey(e.target.value)}
             />
         </div>
         <div className="flex flex-col gap-2 w-full md:w-auto">
             <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">Algorithm</label>
             <select 
                className="bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-lg p-3 focus:border-[var(--accent-red)] focus:outline-none text-[var(--text-primary)] text-sm font-bold appearance-none cursor-pointer"
                value={algo}
                onChange={(e) => setAlgo(e.target.value)}
             >
                <option value="SHA256">SHA-256</option>
                <option value="SHA512">SHA-512</option>
                <option value="SHA1">SHA-1</option>
                <option value="MD5">MD5</option>
             </select>
         </div>
         <div className="w-full md:w-auto pt-6">
            <button className="flex items-center gap-2 px-6 py-3 bg-[var(--accent-red)] text-white rounded-lg font-bold text-sm w-full md:w-auto justify-center hover:bg-black transition-colors" onClick={generateHMAC}>
               <Key size={16} /> Generate HMAC
            </button>
         </div>
      </div>

       <div className="grid lg:grid-cols-2 gap-6 h-[400px]">
         <div className="flex flex-col gap-2 h-full">
           <label className="text-sm font-bold text-[var(--text-muted)] uppercase tracking-wider">Input Message</label>
           <textarea
             className="flex-1 w-full bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-4 font-mono text-sm resize-none focus:outline-none focus:border-[var(--accent-red)] transition-colors custom-scrollbar"
             placeholder="Message to sign..."
             value={input}
             onChange={(e) => setInput(e.target.value)}
           />
        </div>
        <div className="flex flex-col gap-2 h-full">
           <label className="text-sm font-bold text-[var(--text-muted)] uppercase tracking-wider">HMAC Output (Hex)</label>
           <textarea
             readOnly
             className="flex-1 w-full bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-4 font-mono text-sm resize-none focus:outline-none cursor-text custom-scrollbar"
             placeholder="HMAC will appear here..."
             value={output}
           />
        </div>
      </div>
    </div>
  );
}
