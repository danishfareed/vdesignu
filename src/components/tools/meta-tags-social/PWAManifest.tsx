/**
 * Web App Manifest Generator (PWA)
 * Generates site.webmanifest for progressive web apps
 */
import { useState, useEffect } from 'react';
import { Smartphone, Layout, Copy, Download, Info, Share2 } from 'lucide-react';
import ToolOutput from '../ToolOutput';

export default function PWAManifest() {
  const [formData, setFormData] = useState({
    name: 'VDESIGNU',
    shortName: 'VDESIGNU',
    description: 'The Ultimate SEO Tools Suite and Digital Agency',
    startUrl: '/',
    display: 'standalone',
    themeColor: '#E31E24',
    bgColor: '#ffffff'
  });

  const [output, setOutput] = useState('');

  useEffect(() => {
    const manifest = {
      "name": formData.name,
      "short_name": formData.shortName,
      "description": formData.description,
      "start_url": formData.startUrl,
      "display": formData.display,
      "background_color": formData.bgColor,
      "theme_color": formData.themeColor,
      "icons": [
        {
          "src": "/android-chrome-192x192.png",
          "sizes": "192x192",
          "type": "image/png"
        },
        {
          "src": "/android-chrome-512x512.png",
          "sizes": "512x512",
          "type": "image/png"
        }
      ]
    };

    setOutput(JSON.stringify(manifest, null, 2));
  }, [formData]);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Settings Panel */}
        <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] p-10 shadow-2xl">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-14 h-14 rounded-2xl bg-[var(--accent-red)] flex items-center justify-center text-white shadow-xl shadow-red-600/20">
              <Smartphone className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-black uppercase tracking-tight text-[var(--text-primary)]">App Experience</h3>
              <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Web Manifest (PWA)</p>
            </div>
          </div>

          <div className="space-y-6">
             <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3 ml-1">Full App Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl font-bold"
                />
             </div>

             <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3 ml-1">Short Name</label>
                   <input
                     type="text"
                     value={formData.shortName}
                     onChange={(e) => setFormData({...formData, shortName: e.target.value})}
                     className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl font-bold"
                   />
                </div>
                <div>
                   <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3 ml-1">Display Mode</label>
                   <select 
                     value={formData.display}
                     onChange={(e) => setFormData({...formData, display: e.target.value})}
                     className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl font-bold"
                   >
                      <option value="standalone">Standalone (App-like)</option>
                      <option value="minimal-ui">Minimal UI</option>
                      <option value="browser">Browser</option>
                      <option value="fullscreen">Fullscreen</option>
                   </select>
                </div>
             </div>

             <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3 ml-1">Theme Color</label>
                   <input
                     type="color"
                     value={formData.themeColor}
                     onChange={(e) => setFormData({...formData, themeColor: e.target.value})}
                     className="w-full h-12 bg-transparent p-0 border-none cursor-pointer"
                   />
                </div>
                <div>
                   <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3 ml-1">Background Color</label>
                   <input
                     type="color"
                     value={formData.bgColor}
                     onChange={(e) => setFormData({...formData, bgColor: e.target.value})}
                     className="w-full h-12 bg-transparent p-0 border-none cursor-pointer"
                   />
                </div>
             </div>
          </div>
        </div>

        {/* Output Panel */}
        <div className="space-y-8">
           <ToolOutput 
             output={output} 
             language="json" 
             title="site.webmanifest"
           />
           
           <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] p-8">
              <div className="flex items-center gap-3 mb-4 text-[var(--accent-red)]">
                 <Share2 className="w-5 h-5" />
                 <h4 className="text-[10px] font-black uppercase tracking-widest text-[var(--text-primary)]">Modern Web Advantage</h4>
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed italic">
                 Providing a web manifest allows users to "Install" your website like an app. This improves engagement and signals to Google that your site is a high-authority provider of a persistent user experience.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
