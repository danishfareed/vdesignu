/**
 * VideoObject Schema JSON-LD Generator
 * Optimized for Google Video search and Rich Snippets
 */
import { useState } from 'react';
import { Video, Plus, Trash2, Copy, Download, Info, PlayCircle, Clock } from 'lucide-react';
import ToolOutput from '../ToolOutput';

export default function VideoSchema() {
  const [formData, setFormData] = useState({
    name: 'How to Master SEO in 2024',
    description: 'A comprehensive guide to technical and on-page SEO strategies...',
    thumbnailUrl: 'https://vdesignu.com/images/video-thumb.jpg',
    uploadDate: '2024-01-20',
    duration: 'PT15M30S',
    contentUrl: 'https://vdesignu.com/videos/seo-guide.mp4',
    embedUrl: 'https://www.youtube.com/embed/xyz123',
    publisherName: 'VDESIGNU',
    publisherLogo: 'https://vdesignu.com/logo.png'
  });

  const [output, setOutput] = useState('');

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateSchema = () => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      "name": formData.name,
      "description": formData.description,
      "thumbnailUrl": [formData.thumbnailUrl],
      "uploadDate": formData.uploadDate,
      "duration": formData.duration,
      "contentUrl": formData.contentUrl,
      "embedUrl": formData.embedUrl,
      "publisher": {
        "@type": "Organization",
        "name": formData.publisherName,
        "logo": {
          "@type": "ImageObject",
          "url": formData.publisherLogo
        }
      }
    };

    setOutput(JSON.stringify(schema, null, 2));
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Input Panel */}
        <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] p-10 shadow-2xl">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-14 h-14 rounded-2xl bg-[var(--accent-red)] flex items-center justify-center text-white shadow-xl shadow-red-600/20">
              <Video className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-black uppercase tracking-tight text-[var(--text-primary)]">Video Presence</h3>
              <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Rich Snippet Generator</p>
            </div>
          </div>

          <div className="space-y-4">
             <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3 ml-1">Video Title</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  className="w-full px-6 py-4 bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] rounded-2xl text-[var(--text-primary)] font-bold focus:border-[var(--accent-red)] focus:outline-none transition-all"
                />
             </div>

             <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3 ml-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => updateField('description', e.target.value)}
                  className="w-full px-6 py-4 bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] rounded-2xl text-[var(--text-primary)] font-bold focus:border-[var(--accent-red)] focus:outline-none transition-all"
                  rows={2}
                />
             </div>

             <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3 ml-1">Upload Date</label>
                   <input
                     type="date"
                     value={formData.uploadDate}
                     onChange={(e) => updateField('uploadDate', e.target.value)}
                     className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl text-xs"
                   />
                </div>
                <div>
                   <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3 ml-1">Duration (ISO 8601)</label>
                   <input
                     type="text"
                     value={formData.duration}
                     onChange={(e) => updateField('duration', e.target.value)}
                     placeholder="PT10M30S"
                     className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl text-xs font-bold"
                   />
                </div>
             </div>

             <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3 ml-1">Thumbnail URL</label>
                <input
                  type="url"
                  value={formData.thumbnailUrl}
                  onChange={(e) => updateField('thumbnailUrl', e.target.value)}
                  className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl text-xs"
                />
             </div>

             <button
                onClick={generateSchema}
                className="w-full py-6 mt-6 bg-[var(--accent-red)] text-white font-black italic uppercase tracking-tighter text-2xl rounded-2xl hover:bg-black transition-all active:scale-[0.98] shadow-2xl shadow-red-600/20"
             >
                Generate Video Schema
             </button>
          </div>
        </div>

        {/* Output Panel */}
        <div className="space-y-8">
           <ToolOutput 
             output={output} 
             language="json" 
             title="VideoObject JSON-LD"
           />
           
           <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] p-8">
              <div className="flex items-center gap-3 mb-4 text-[var(--accent-yellow)]">
                 <PlayCircle className="w-5 h-5" />
                 <h4 className="text-[10px] font-black uppercase tracking-widest text-[var(--text-primary)]">Why Video Schema?</h4>
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed italic">
                 Video Schema allows your content to appear in Google's Video carousel and earn "Key Moments" badges. For businesses in Riyadh and Dubai, video content combined with proper structured data is a primary driver of mobile search engagement.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
