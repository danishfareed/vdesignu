/**
 * Favicon & App Icon Generator
 * Generates meta tags for all modern browsers and devices
 */
import { useState, useEffect } from 'react';
import { Layout, Smartphone, Landmark, Copy, Download, Info, Image as ImageIcon } from 'lucide-react';
import ToolOutput from '../ToolOutput';

export default function FaviconGenerator() {
  const [baseUrl, setBaseUrl] = useState('https://vdesignu.com');
  const [themeColor, setThemeColor] = useState('#E31E24');
  const [appName, setAppName] = useState('VDESIGNU');

  const [output, setOutput] = useState('');

  useEffect(() => {
    let result = '<!-- Favicon and App Icons -->\n';
    result += `<link rel="shortcut icon" href="${baseUrl}/favicon.ico" />\n`;
    result += `<link rel="icon" type="image/png" sizes="32x32" href="${baseUrl}/favicon-32x32.png" />\n`;
    result += `<link rel="icon" type="image/png" sizes="16x16" href="${baseUrl}/favicon-16x16.png" />\n`;
    result += `<link rel="apple-touch-icon" sizes="180x180" href="${baseUrl}/apple-touch-icon.png" />\n`;
    result += `<link rel="manifest" href="${baseUrl}/site.webmanifest" />\n`;
    result += `<meta name="theme-color" content="${themeColor}" />\n`;
    result += `<meta name="apple-mobile-web-app-title" content="${appName}" />\n`;
    result += `<meta name="application-name" content="${appName}" />\n`;
    result += `<meta name="msapplication-TileColor" content="${themeColor}" />`;

    setOutput(result);
  }, [baseUrl, themeColor, appName]);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Settings Panel */}
        <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] p-10 shadow-2xl">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-14 h-14 rounded-2xl bg-[var(--accent-red)] flex items-center justify-center text-white shadow-xl shadow-red-600/20">
              <Landmark className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-black uppercase tracking-tight text-[var(--text-primary)]">Brand Identity</h3>
              <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Favicon & App Icons</p>
            </div>
          </div>

          <div className="space-y-6">
             <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3 ml-1">Icons Root URL</label>
                <input
                  type="url"
                  value={baseUrl}
                  onChange={(e) => setBaseUrl(e.target.value)}
                  placeholder="https://vdesignu.com"
                  className="w-full px-6 py-4 bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] rounded-2xl text-[var(--text-primary)] font-bold focus:border-[var(--accent-red)] focus:outline-none transition-all"
                />
             </div>

             <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3 ml-1">App Name</label>
                   <input
                     type="text"
                     value={appName}
                     onChange={(e) => setAppName(e.target.value)}
                     className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl text-[var(--text-primary)] font-bold"
                   />
                </div>
                <div>
                   <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3 ml-1">Theme Color</label>
                   <div className="flex gap-2">
                      <input
                        type="color"
                        value={themeColor}
                        onChange={(e) => setThemeColor(e.target.value)}
                        className="w-12 h-12 bg-transparent border-none p-0 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={themeColor}
                        onChange={(e) => setThemeColor(e.target.value)}
                        className="flex-1 px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl text-xs font-mono uppercase"
                      />
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* Output Panel */}
        <div className="space-y-8">
           <ToolOutput 
             output={output} 
             language="html" 
             title="App Icons Header Tags"
           />
           
           <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] p-8">
              <div className="flex items-center gap-3 mb-4 text-[var(--accent-yellow)]">
                 <Smartphone className="w-5 h-5" />
                 <h4 className="text-[10px] font-black uppercase tracking-widest text-[var(--text-primary)]">Mobile Visibility Guide</h4>
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed italic">
                 Favicons are no longer just 16x16 pixel files. To ensure your brand looks sharp on iPhones and Android devices, you must provide a manifest and high-resolution apple-touch-icons. VDESIGNU recommends uploading these files to your site root for maximum compatibility.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
