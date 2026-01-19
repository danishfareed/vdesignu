import React, { useState } from 'react';
import { RefreshCw, Copy, Check } from 'lucide-react';

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);

  const generate = () => {
    let chars = '';
    if (includeLowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (includeUppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeNumbers) chars += '0123456789';
    if (includeSymbols) chars += '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    if (!chars) {
      setPassword('');
      return;
    }

    let pass = '';
    // Ensure at least one of each selected type
    const ensureChars = [];
    if (includeLowercase) ensureChars.push('abcdefghijklmnopqrstuvwxyz'[Math.floor(Math.random() * 26)]);
    if (includeUppercase) ensureChars.push('ABCDEFGHIJKLMNOPQRSTUVWXYZ'[Math.floor(Math.random() * 26)]);
    if (includeNumbers) ensureChars.push('0123456789'[Math.floor(Math.random() * 10)]);
    if (includeSymbols) ensureChars.push('!@#$%^&*()_+~`|}{[]:;?><,./-='[Math.floor(Math.random() * 29)]);

    for (let i = ensureChars.length; i < length; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    // Shuffle ensureChars into pass
    for (const char of ensureChars) {
      const pos = Math.floor(Math.random() * (pass.length + 1));
      pass = pass.slice(0, pos) + char + pass.slice(pos);
    }

    setPassword(pass);
    setCopied(false);
  };

  const copy = () => {
    if (password) {
      navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Initial generate
  React.useEffect(() => {
    generate();
  }, []);

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-8">
      {/* Result Box */}
      <div className="bg-[var(--bg-card)] p-8 rounded-2xl border border-[var(--border-subtle)] text-center shadow-sm">
         <div className="text-4xl lg:text-5xl font-mono break-all text-[var(--accent-red)] font-bold mb-6 min-h-[3rem]">
           {password}
         </div>
         <div className="flex justify-center gap-4">
            <button 
              onClick={generate}
              className="flex items-center gap-2 px-6 py-3 bg-[var(--bg-primary)] text-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] rounded-xl font-bold transition-all border border-[var(--border-subtle)]"
            >
              <RefreshCw size={20} /> Regenerate
            </button>
            <button 
              onClick={copy}
              className="flex items-center gap-2 px-6 py-3 bg-[var(--accent-red)] text-white hover:bg-black rounded-xl font-bold transition-all shadow-lg shadow-red-600/20"
            >
              {copied ? <Check size={20} /> : <Copy size={20} />}
              {copied ? 'Copied!' : 'Copy Securely'}
            </button>
         </div>
      </div>

      {/* Settings */}
      <div className="bg-[var(--bg-card)] p-8 rounded-2xl border border-[var(--border-subtle)]">
         <h3 className="text-sm font-black uppercase tracking-widest text-[var(--text-muted)] mb-6">Configuration</h3>
         
         <div className="space-y-6">
            <div className="flex flex-col gap-2">
               <div className="flex justify-between items-center">
                  <label className="font-bold text-[var(--text-primary)]">Length: {length}</label>
               </div>
               <input 
                 type="range" min="8" max="64" value={length} 
                 onChange={(e) => setLength(parseInt(e.target.value))}
                 className="w-full accent-[var(--accent-red)] h-2 bg-[var(--bg-primary)] rounded-lg appearance-none cursor-pointer"
               />
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
               {[
                 { label: 'Lowercase (a-z)', state: includeLowercase, set: setIncludeLowercase },
                 { label: 'Uppercase (A-Z)', state: includeUppercase, set: setIncludeUppercase },
                 { label: 'Numbers (0-9)', state: includeNumbers, set: setIncludeNumbers },
                 { label: 'Symbols (!@#)', state: includeSymbols, set: setIncludeSymbols },
               ].map((opt, i) => (
                 <label key={i} className="flex items-center gap-3 p-4 bg-[var(--bg-primary)] rounded-xl cursor-pointer border border-[var(--border-subtle)] hover:border-[var(--accent-red)] transition-colors select-none">
                    <input 
                      type="checkbox" 
                      checked={opt.state} 
                      onChange={(e) => opt.set(e.target.checked)}
                      className="w-5 h-5 accent-[var(--accent-red)] rounded"
                    />
                    <span className="font-bold text-sm text-[var(--text-secondary)]">{opt.label}</span>
                 </label>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
}
