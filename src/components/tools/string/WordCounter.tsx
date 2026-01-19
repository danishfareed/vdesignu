import React, { useState, useEffect } from 'react';
import { Type } from 'lucide-react';
import ToolShell, { type Action } from '../ToolShell';

export default function WordCounter() {
  const [input, setInput] = useState('');
  const [stats, setStats] = useState({
    words: 0,
    chars: 0,
    charsNoSpace: 0,
    sentences: 0,
    paragraphs: 0,
    readTime: '0 min'
  });

  useEffect(() => {
    const text = input.trim();
    if (!text) {
      setStats({ words: 0, chars: 0, charsNoSpace: 0, sentences: 0, paragraphs: 0, readTime: '0 min' });
      return;
    }

    const words = text.split(/\s+/).filter(w => w.length > 0).length;
    const chars = text.length;
    const charsNoSpace = text.replace(/\s/g, '').length;
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    const paragraphs = text.split(/\n+/).filter(p => p.trim().length > 0).length;
    const readTime = Math.ceil(words / 200) + ' min';

    setStats({ words, chars, charsNoSpace, sentences, paragraphs, readTime });
  }, [input]);

  const actions: Action[] = [
    { label: 'Copy Stats', onClick: () => {
        const statsText = `Words: ${stats.words}\nCharacters: ${stats.chars}\nSentences: ${stats.sentences}\nReading Time: ${stats.readTime}`;
        navigator.clipboard.writeText(statsText);
    }, icon: Type, variant: 'secondary' }
  ];

  const StatBox = ({ label, value }: { label: string, value: string | number }) => (
    <div className="bg-[var(--bg-primary)] p-4 rounded-xl border border-[var(--border-subtle)] text-center">
      <div className="text-2xl font-black text-[var(--accent-red)] mb-1">{value}</div>
      <div className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">{label}</div>
    </div>
  );

  return (
    <div className="flex flex-col gap-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatBox label="Words" value={stats.words} />
        <StatBox label="Characters" value={stats.chars} />
        <StatBox label="No Spaces" value={stats.charsNoSpace} />
        <StatBox label="Sentences" value={stats.sentences} />
        <StatBox label="Paragraphs" value={stats.paragraphs} />
        <StatBox label="Read Time" value={stats.readTime} />
      </div>

      <ToolShell
        inputLabel="Start typing or paste text..."
        outputLabel="Processed Text (Unchanged)"
        inputValue={input}
        onInputChange={setInput}
        outputValue={input} // Just echoing back for now, or could hide output 
        actions={actions}
        inputPlaceholder="Type something..."
      />
    </div>
  );
}
