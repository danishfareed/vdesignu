/**
 * Advanced Schema & Site Asset Suite
 * Video, Review, Breadcrumbs Schema and PWA Manifest
 */
import { useState, useEffect } from 'react';
import { Video, Star, ChevronRight, Smartphone, Image, Copy, Download, Info, Zap, Layout } from 'lucide-react';
import ToolOutput from '../ToolOutput';

export default function AdvancedAssetSuite() {
  const [tool, setTool] = useState('video');
  const [output, setOutput] = useState('');

  useEffect(() => {
    if (tool === 'video') {
      setOutput('{\n  "@context": "https://schema.org",\n  "@type": "VideoObject",\n  "name": "How to Master SEO in Riyadh",\n  "description": "Expert guide by VDESIGNU for the Saudi market.",\n  "thumbnailUrl": "https://vdesignu.com/thumb.jpg",\n  "uploadDate": "2026-01-18"\n}');
    } else if (tool === 'breadcrumbs') {
      setOutput('{\n  "@context": "https://schema.org",\n  "@type": "BreadcrumbList",\n  "itemListElement": [{\n    "@type": "ListItem",\n    "position": 1,\n    "name": "Home",\n    "item": "https://vdesignu.com/"\n  }]\n}');
    } else if (tool === 'manifest') {
      setOutput('{\n  "name": "VDESIGNU SEO Suite",\n  "short_name": "VDESIGNU",\n  "start_url": "/index.html",\n  "display": "standalone",\n  "background_color": "#ffffff",\n  "theme_color": "#ff0000"\n}');
    } else {
      setOutput('<!-- Favicon Snippets -->\n<link rel="icon" type="image/png" sizes="32x32" href="/fav-32.png">\n<link rel="apple-touch-icon" href="/apple-icon.png">');
    }
  }, [tool]);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Settings Panel */}
        <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] p-10 shadow-2xl">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-14 h-14 rounded-2xl bg-[var(--accent-red)] flex items-center justify-center text-white shadow-xl shadow-red-600/20">
               <Layout className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-black uppercase tracking-tight text-[var(--text-primary)]">Asset Lab</h3>
              <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Digital Infrastructure</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             {[
                { id: 'video', icon: Video, label: 'Video' },
                { id: 'review', icon: Star, label: 'Reviews' },
                { id: 'breadcrumbs', icon: ChevronRight, label: 'Breadcrumbs' },
                { id: 'manifest', icon: Smartphone, label: 'PWA' }
             ].map((t) => (
                <button 
                  key={t.id}
                  onClick={() => setTool(t.id)}
                  className={`flex flex-col items-center gap-2 py-4 rounded-xl border-2 transition-all ${tool === t.id ? 'border-[var(--accent-red)] bg-[var(--accent-red)]/5 text-[var(--accent-red)] shadow-lg' : 'border-[var(--border-subtle)] text-[var(--text-muted)]'}`}
                >
                   <t.icon className="w-5 h-5" />
                   <span className="text-[9px] font-black uppercase tracking-widest">{t.label}</span>
                </button>
             ))}
          </div>

          <div className="mt-8 p-6 bg-[var(--bg-primary)] rounded-2xl border border-[var(--border-subtle)]">
             <p className="text-[10px] text-[var(--text-muted)] italic leading-relaxed">
                Modern search presence goes beyond text. Video carousels, star ratings, and PWA installs are the conversion drivers of the modern web. VDESIGNU ensures your infrastructure is 100% compliant with the latest Schema.org standards.
             </p>
          </div>
        </div>

        {/* Output Panel */}
        <div className="space-y-8">
           <ToolOutput 
             output={output} 
             language={tool === 'manifest' ? 'json' : 'html'} 
             title={`${tool.toUpperCase()} Asset Code`}
           />
           
           <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] p-8">
              <div className="flex items-center gap-3 mb-4 text-[var(--accent-red)]">
                 <Zap className="w-5 h-5" />
                 <h4 className="text-[10px] font-black uppercase tracking-widest">SERP Domination</h4>
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed italic">
                 For our partners in Riyadh and Dubai, these "Extra" signals are often what tip the scale in highly competitive niches. Star ratings and breadcrumbs improve CTR, while a PWA manifest signals technical maturity to search algorithms.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
