/**
 * Meta Robots Tag Builder
 * Configures search engine crawling and indexing instructions
 */
import { useState, useEffect } from 'react';
import { Eye, EyeOff, Bot, Copy, Download, Info, CheckSquare, Square } from 'lucide-react';
import ToolOutput from '../ToolOutput';

export default function MetaRobotsBuilder() {
  const [directives, setDirectives] = useState({
    index: true,
    follow: true,
    noarchive: false,
    nosnippet: false,
    noimageindex: false,
    notranslate: false,
    maxSnippet: '-1',
    maxImagePreview: 'large'
  });

  const [output, setOutput] = useState('');

  const toggle = (field: keyof typeof directives) => {
    setDirectives(prev => ({ ...prev, [field]: !prev[field] }));
  };

  useEffect(() => {
    const parts = [];
    if (!directives.index) parts.push('noindex');
    else parts.push('index');
    
    if (!directives.follow) parts.push('nofollow');
    else parts.push('follow');

    if (directives.noarchive) parts.push('noarchive');
    if (directives.nosnippet) parts.push('nosnippet');
    if (directives.noimageindex) parts.push('noimageindex');
    if (directives.notranslate) parts.push('notranslate');
    
    parts.push(`max-snippet:${directives.maxSnippet}`);
    parts.push(`max-image-preview:${directives.maxImagePreview}`);

    setOutput(`<meta name="robots" content="${parts.join(', ')}" />`);
  }, [directives]);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Settings Panel */}
        <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] p-10 shadow-2xl">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-14 h-14 rounded-2xl bg-[var(--accent-red)] flex items-center justify-center text-white shadow-xl shadow-red-600/20">
              <Bot className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-black uppercase tracking-tight text-[var(--text-primary)]">Crawler Governance</h3>
              <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Meta Robots Directives</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
             {[
               { id: 'index', label: 'Allow Indexing', icon: Eye, desc: 'Visible in search results' },
               { id: 'follow', label: 'Follow Links', icon: Eye, desc: 'Passes link equity' },
               { id: 'noarchive', label: 'No Archive', icon: EyeOff, desc: 'Do not show cached link' },
               { id: 'nosnippet', label: 'No Snippet', icon: EyeOff, desc: 'Do not show text snippets' },
               { id: 'noimageindex', label: 'No Image Index', icon: EyeOff, desc: 'Hide images from search' },
               { id: 'notranslate', label: 'No Translate', icon: EyeOff, desc: 'Disable Google Translate' }
             ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => toggle(item.id as any)}
                  className={`flex items-start gap-3 p-4 rounded-2xl border-2 transition-all text-left ${directives[item.id as keyof typeof directives] ? 'border-[var(--accent-red)] bg-[var(--accent-red)]/5' : 'border-[var(--border-subtle)] bg-[var(--bg-primary)] hover:border-[var(--accent-red)]/30'}`}
                >
                   <div className={`mt-1 ${directives[item.id as keyof typeof directives] ? 'text-[var(--accent-red)]' : 'text-[var(--text-muted)]'}`}>
                      {directives[item.id as keyof typeof directives] ? <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5" />}
                   </div>
                   <div>
                      <p className="text-[11px] font-black uppercase tracking-widest text-[var(--text-primary)]">{item.label}</p>
                      <p className="text-[9px] font-bold text-[var(--text-muted)] leading-tight mt-0.5">{item.desc}</p>
                   </div>
                </button>
             ))}
          </div>

          <div className="mt-8 pt-8 border-t border-[var(--border-subtle)] space-y-4">
             <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-2 ml-1">Max Snippet (Chars)</label>
                <select 
                  value={directives.maxSnippet}
                  onChange={(e) => setDirectives({ ...directives, maxSnippet: e.target.value })}
                  className="w-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl py-3 px-4 text-xs font-bold"
                >
                   <option value="-1">Unlimited (-1)</option>
                   <option value="0">None (0)</option>
                   <option value="50">Small (50)</option>
                   <option value="160">Standard (160)</option>
                </select>
             </div>
          </div>
        </div>

        {/* Output Panel */}
        <div className="space-y-8">
           <ToolOutput 
             output={output} 
             language="html" 
             title="Robot Meta Tag"
           />
           
           <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] p-8">
              <div className="flex items-center gap-3 mb-4 text-[var(--accent-red)]">
                 <Info className="w-5 h-5" />
                 <h4 className="text-[10px] font-black uppercase tracking-widest">Authority Tip</h4>
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed italic">
                 Use <code>noindex</code> sparingly on thin content or private landing pages to focus your domain's crawling energy where it matters most. For VDESIGNU clients, we usually recommend <code>index, follow</code> for all high-value cornerstone content.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
