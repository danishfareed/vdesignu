/**
 * Specialized Social Meta Generators
 * optimized for LinkedIn, Pinterest, and Instagram
 */
import { useState, useEffect } from 'react';
import { Share2, Linkedin, Pin, Instagram, CheckCircle, Info, Hash, ArrowRight } from 'lucide-react';
import ToolOutput from '../ToolOutput';

export default function AdvancedSocialMeta() {
  const [platform, setPlatform] = useState('linkedin');
  const [data, setData] = useState({
    title: 'VDESIGNU | Premium SEO & Digital Growth',
    description: 'Empowering GCC brands with data-driven SEO strategies and technical excellence.',
    url: 'https://vdesignu.com',
    image: 'https://vdesignu.com/og-image.jpg',
    author: 'VDESIGNU',
    category: 'Marketing'
  });

  const [output, setOutput] = useState('');

  useEffect(() => {
    let tags = '';
    if (platform === 'linkedin') {
      tags = `<meta property="og:title" content="${data.title}" />\n<meta property="og:image" content="${data.image}" />\n<meta property="og:description" content="${data.description}" />\n<meta property="og:url" content="${data.url}" />`;
    } else if (platform === 'pinterest') {
      tags = `<meta name="pinterest" content="nopin" description="This image is not pinnable" />\n<!-- Rich Pins -->\n<meta property="og:type" content="article" />\n<meta property="og:title" content="${data.title}" />\n<meta property="og:description" content="${data.description}" />\n<meta property="og:site_name" content="VDESIGNU" />`;
    } else {
      tags = `<meta property="og:type" content="website" />\n<meta property="og:title" content="${data.title}" />\n<meta property="og:description" content="${data.description}" />\n<meta property="og:image" content="${data.image}" />`;
    }
    setOutput(tags);
  }, [platform, data]);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Settings Panel */}
        <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] p-10 shadow-2xl">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-14 h-14 rounded-2xl bg-[var(--accent-red)] flex items-center justify-center text-white shadow-xl shadow-red-600/20">
              <Share2 className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-black uppercase tracking-tight text-[var(--text-primary)]">Social Authority</h3>
              <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Platform Specific Meta</p>
            </div>
          </div>

          <div className="flex gap-4 p-2 bg-[var(--bg-primary)] rounded-2xl border border-[var(--border-subtle)] mb-8 overflow-x-auto scrollbar-none">
             {[
                { id: 'linkedin', icon: Linkedin, label: 'LinkedIn' },
                { id: 'pinterest', icon: Pin, label: 'Pinterest' },
                { id: 'instagram', icon: Instagram, label: 'Instagram' }
             ].map((p) => (
                <button 
                  key={p.id}
                  onClick={() => setPlatform(p.id)}
                  className={`flex items-center gap-2 py-3 px-6 rounded-xl text-[10px] font-black uppercase transition-all whitespace-nowrap ${platform === p.id ? 'bg-[var(--accent-red)] text-white shadow-lg' : 'text-[var(--text-muted)]'}`}
                >
                   <p.icon className="w-4 h-4" /> {p.label}
                </button>
             ))}
          </div>

          <div className="space-y-6">
             {['title', 'description', 'url', 'image'].map((field) => (
                <div key={field}>
                   <label className="block text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-2 ml-1">{field}</label>
                   {field === 'description' ? (
                      <textarea
                        value={(data as any)[field]}
                        onChange={(e) => setData({ ...data, [field]: e.target.value })}
                        className="w-full px-5 py-3 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl text-xs"
                        rows={3}
                      />
                   ) : (
                      <input
                        type="text"
                        value={(data as any)[field]}
                        onChange={(e) => setData({ ...data, [field]: e.target.value })}
                        className="w-full px-5 py-3 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl text-xs"
                      />
                   )}
                </div>
             ))}
          </div>
        </div>

        {/* Output Panel */}
        <div className="space-y-8">
           <ToolOutput 
             output={output} 
             language="html" 
             title={`${platform.toUpperCase()} Meta Tags`}
           />
           
           <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] p-8">
              <div className="flex items-center gap-3 mb-4 text-[var(--accent-red)]">
                 <Hash className="w-5 h-5" />
                 <h4 className="text-[10px] font-black uppercase tracking-widest">Viral Signals</h4>
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed italic">
                 LinkedIn and Pinterest have unique caching and parsing mechanisms. VDESIGNU ensures your professional content is rendered perfectly, maximizing CTR and social authority in the professional GCC landscape.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
