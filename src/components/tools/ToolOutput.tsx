/**
 * ToolOutput Component (React)
 * Displays tool output with copy and download functionality
 */
import { useState } from 'react';
import { Copy, Check, Download, Code } from 'lucide-react';

interface ToolOutputProps {
  output: string;
  language?: string;
  filename?: string;
  title?: string;
}

export default function ToolOutput({ 
  output, 
  language = 'json', 
  filename = 'output',
  title = 'Generated Output'
}: ToolOutputProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleDownload = () => {
    const extensions: Record<string, string> = {
      json: '.json',
      xml: '.xml',
      html: '.html',
      txt: '.txt',
      htaccess: '.htaccess',
      javascript: '.js',
      typescript: '.ts',
    };
    
    const ext = extensions[language] || '.txt';
    const blob = new Blob([output], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!output) {
    return (
      <div className="bg-[var(--bg-secondary)] border-2 border-dashed border-[var(--border-subtle)] rounded-3xl p-12 text-center">
        <Code className="w-12 h-12 text-[var(--text-muted)] mx-auto mb-4" />
        <p className="text-[var(--text-muted)] font-medium">
          Your generated code will appear here
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[var(--bg-secondary)] border-2 border-[var(--border-subtle)] rounded-3xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-subtle)] bg-[var(--bg-card)]">
        <div className="flex items-center gap-3">
          <Code className="w-5 h-5 text-[var(--accent-red)]" />
          <span className="text-sm font-black uppercase tracking-wider text-[var(--text-primary)]">
            {title}
          </span>
          <span className="px-2 py-0.5 bg-[var(--accent-red)]/10 text-[var(--accent-red)] text-[10px] font-black uppercase rounded">
            {language}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-lg text-xs font-black uppercase tracking-wider text-[var(--text-primary)] hover:border-[var(--accent-red)] hover:text-[var(--accent-red)] transition-all"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-green-500" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy
              </>
            )}
          </button>
          
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2 bg-[var(--accent-red)] text-white rounded-lg text-xs font-black uppercase tracking-wider hover:bg-black transition-all"
          >
            <Download className="w-4 h-4" />
            Download
          </button>
        </div>
      </div>
      
      {/* Code output */}
      <div className="p-6 overflow-x-auto">
        <pre className="text-sm text-[var(--text-primary)] font-mono whitespace-pre-wrap break-words">
          <code>{output}</code>
        </pre>
      </div>
    </div>
  );
}
