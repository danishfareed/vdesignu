import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Search, X, ChevronRight } from 'lucide-react';
import { tools, type Tool } from '../../data/tools-data';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  const filteredTools = useMemo(() => {
    if (!query) return [];
    const lowerQuery = query.toLowerCase();
    return tools.filter(tool => 
      tool.name.toLowerCase().includes(lowerQuery) || 
      tool.description.toLowerCase().includes(lowerQuery) ||
      tool.keywords.some(k => k.toLowerCase().includes(lowerQuery))
    ).slice(0, 8); // Top 8 results
  }, [query]);

  return (
    <div className="relative w-full mb-6 z-50" ref={wrapperRef}>
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-[var(--text-muted)] group-focus-within:text-[var(--accent-red)] transition-colors" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-10 py-2.5 border-2 border-[var(--border-subtle)] rounded-xl leading-5 bg-[var(--bg-card)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-red)] focus:ring-4 focus:ring-[var(--accent-red)]/5 sm:text-sm transition-all duration-200"
          placeholder="Search tools..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
        />
        {query && (
          <button
            onClick={() => {
                setQuery('');
                setIsOpen(false);
            }}
            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-[var(--text-muted)] hover:text-[var(--text-primary)]"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {isOpen && query && filteredTools.length > 0 && (
        <div className="absolute mt-2 w-full bg-[var(--bg-card)] shadow-2xl rounded-xl border border-[var(--border-subtle)] overflow-hidden animate-in fade-in slide-in-from-top-1 duration-200">
           <div className="max-h-80 overflow-y-auto custom-scrollbar">
              {filteredTools.map((tool) => (
                <a 
                  key={tool.id} 
                  href={`/tools/${tool.categoryId}/${tool.slug}`}
                  className="block p-3 hover:bg-[var(--bg-secondary)] border-b border-[var(--border-subtle)] last:border-0 transition-colors group"
                >
                  <div className="flex items-start">
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-red)] transition-colors truncate">
                        {tool.name}
                      </div>
                      <div className="text-xs text-[var(--text-secondary)] mt-0.5 truncate">
                        {tool.shortDescription}
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-[var(--text-muted)] mt-1 opacity-0 group-hover:opacity-100 transform translate-x-[-5px] group-hover:translate-x-0 transition-all" />
                  </div>
                </a>
              ))}
           </div>
           <div className="bg-[var(--bg-secondary)] p-2 text-[10px] text-center text-[var(--text-muted)] font-mono border-t border-[var(--border-subtle)]">
             {filteredTools.length} results found
           </div>
        </div>
      )}
      
      {isOpen && query && filteredTools.length === 0 && (
          <div className="absolute mt-2 w-full bg-[var(--bg-card)] shadow-xl rounded-xl border border-[var(--border-subtle)] p-4 text-center">
             <p className="text-sm text-[var(--text-secondary)]">No tools found matching "{query}"</p>
          </div>
      )}
    </div>
  );
};

export default SearchBar;
