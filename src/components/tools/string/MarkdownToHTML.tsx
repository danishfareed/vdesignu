import React, { useState, useEffect } from 'react';
import { FileCode, Eye } from 'lucide-react';
import { marked } from 'marked';

export default function MarkdownToHTML() {
  const [markdown, setMarkdown] = useState('');
  const [html, setHtml] = useState('');

  useEffect(() => {
    try {
      if (!markdown) {
        setHtml('');
        return;
      }
      // marked is a synchronous call usually, returns string or Promise. 
      // In newer versions it might be promise, but usually sync for simple string.
      // Let's handle both.
      const result = marked.parse(markdown);
      if (result instanceof Promise) {
         result.then(h => setHtml(h));
      } else {
         setHtml(result);
      }
    } catch (e) {
      console.error(e);
    }
  }, [markdown]);

  return (
    <div className="flex flex-col gap-8">
      <div className="grid lg:grid-cols-2 gap-6 h-[600px]">
         {/* Input */}
         <div className="flex flex-col gap-2 h-full">
            <label className="text-sm font-bold text-[var(--text-muted)] uppercase tracking-wider flex items-center gap-2">
               <FileCode size={14} /> Markdown Input
            </label>
            <textarea
              className="flex-1 w-full bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-4 font-mono text-sm resize-none focus:outline-none focus:border-[var(--accent-red)] transition-colors custom-scrollbar"
              placeholder="# Hello World\n\n**Bold text** and *italic*."
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
            />
         </div>

         {/* Preview / HTML Output */}
         <div className="flex flex-col gap-2 h-full">
            <label className="text-sm font-bold text-[var(--text-muted)] uppercase tracking-wider flex items-center gap-2">
               <Eye size={14} /> HTML Preview
            </label>
            <div className="flex-1 w-full bg-white text-black border border-[var(--border-subtle)] rounded-xl p-6 overflow-auto custom-scrollbar prose prose-sm max-w-none">
                <div dangerouslySetInnerHTML={{ __html: html }} />
            </div>
            {/* Raw HTML View option could be added here, but Preview is better default */}
            <div className="mt-2 bg-[var(--bg-card)] p-4 rounded-xl border border-[var(--border-subtle)] font-mono text-xs text-[var(--text-secondary)] overflow-x-auto">
               {html}
            </div>
         </div>
      </div>
    </div>
  );
}
