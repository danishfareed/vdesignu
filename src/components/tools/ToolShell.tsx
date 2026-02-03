import React from 'react';
import { Copy, AlertCircle, Trash2 } from 'lucide-react';

export interface Action {
  label: string;
  onClick: () => void;
  icon?: any;
  variant?: 'primary' | 'secondary' | 'danger';
}

interface ToolShellProps {
  inputLabel?: string;
  outputLabel?: string;
  inputValue: string;
  onInputChange: (value: string) => void;
  outputValue: string;
  error?: string | null;
  actions: Action[];
  inputPlaceholder?: string;
  loading?: boolean;
}

export default function ToolShell({
  inputLabel = "Input",
  outputLabel = "Output",
  inputValue,
  onInputChange,
  outputValue,
  error,
  actions,
  inputPlaceholder = "Paste your content here...",
  loading = false,
}: ToolShellProps) {
  
  const copyToClipboard = () => {
    if (outputValue) {
      navigator.clipboard.writeText(outputValue);
    }
  };

  const clearInput = () => {
    onInputChange('');
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Controls */}
      <div className="flex flex-wrap gap-4 items-center justify-between bg-[var(--bg-card)] p-4 rounded-xl border border-[var(--border-subtle)]">
        <div className="flex gap-2 flex-wrap">
          {actions.map((action, idx) => {
            const Icon = action.icon;
            const btnClass = action.variant === 'danger'
              ? "text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10"
              : action.variant === 'secondary'
                ? "bg-[var(--bg-primary)] text-[var(--text-primary)] border border-[var(--border-subtle)] hover:bg-[var(--bg-card)]"
                : "bg-[var(--accent-red)] text-white hover:bg-black"; // Primary default

            return (
              <button 
                key={idx}
                onClick={action.onClick}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors font-bold text-sm ${btnClass}`}
              >
                {Icon && <Icon size={16} />}
                {action.label}
              </button>
            );
          })}
        </div>
        
        <div className="flex gap-2">
          <button 
             onClick={clearInput}
             className="flex items-center gap-2 px-4 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors font-medium text-sm"
          >
            <Trash2 size={16} />
            Clear
          </button>
        </div>
      </div>

      {/* Editor Area */}
      <div className="grid lg:grid-cols-2 gap-6 h-[600px]">
        {/* Input */}
        <div className="flex flex-col gap-2 h-full">
           <label className="text-sm font-bold text-[var(--text-muted)] uppercase tracking-wider">{inputLabel}</label>
           <textarea
             className="flex-1 w-full bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-4 font-mono text-sm resize-none focus:outline-none focus:border-[var(--accent-red)] transition-colors custom-scrollbar"
             placeholder={inputPlaceholder}
             value={inputValue}
             onChange={(e) => onInputChange(e.target.value)}
           />
        </div>

        {/* Output */}
        <div className="flex flex-col gap-2 h-full">
           <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-[var(--text-muted)] uppercase tracking-wider">
                {outputLabel}
              </label>
              {outputValue && (
                <button onClick={copyToClipboard} className="text-[var(--accent-red)] text-xs font-bold hover:underline flex items-center gap-1">
                  <Copy size={12} /> Copy Result
                </button>
              )}
           </div>
           
           <div className={`flex-1 w-full bg-[var(--bg-card)] border rounded-xl p-4 font-mono text-sm overflow-auto custom-scrollbar relative ${error ? 'border-red-500 bg-red-50/10' : 'border-[var(--border-subtle)]'}`}>
              {loading && (
                <div className="absolute inset-0 bg-white/50 dark:bg-black/50 flex items-center justify-center z-10 backdrop-blur-sm">
                  <div className="w-6 h-6 border-2 border-[var(--accent-red)] border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
              
              {error ? (
                <div className="flex items-start gap-3 text-red-500">
                  <AlertCircle className="shrink-0 mt-0.5" size={20} />
                  <div>
                    <h4 className="font-bold mb-1">Error</h4>
                    <p className="text-xs opacity-80">{error}</p>
                  </div>
                </div>
              ) : (
                <pre className="whitespace-pre-wrap break-all text-[var(--text-primary)]">{outputValue || <span className="text-[var(--text-muted)] opacity-50">Results will appear here...</span>}</pre>
              )}
           </div>
        </div>
      </div>
    </div>
  );
}
