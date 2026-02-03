/**
 * Arabic SEO Power Pack
 * Sentiment, Citations, and GMB Posts
 */
import { useState } from 'react';
import { Languages, MapPin, Share2, Copy, Download, Info, Zap, Smile, MessageSquare } from 'lucide-react';
import ToolOutput from '../ToolOutput';

export default function ArabicPowerPack() {
  const [tool, setTool] = useState('sentiment');
  const [input, setInput] = useState('نحن نقدم أفضل خدمات التصميم في الرياض');
  const [output, setOutput] = useState('');

  const process = () => {
    if (tool === 'sentiment') {
      setOutput('Sentiment: Positive\nLevel: Professional (Modern Standard Arabic)\nSEO Impact: High Trust Signal');
    } else if (tool === 'citations') {
      setOutput('MENA Directory List:\n1. 24-7 Saudi Directory\n2. Dubai Business Page\n3. Qatar Yellow Pages\n4. Kuwait Industry Index');
    } else {
      setOutput('VDESIGNU GMB Post:\n\nنحن هنا لخدمتكم! 🚀\nنقدم أفضل حلول السيو في دبي والرياض.\n#سيو #دبي #الرياض #VDESIGNU');
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Settings Panel */}
        <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] p-10 shadow-2xl">
          <div className="flex items-center gap-4 mb-10 text-right" dir="rtl">
            <div className="w-14 h-14 rounded-2xl bg-[var(--accent-red)] flex items-center justify-center text-white shadow-xl shadow-red-600/20">
               <Languages className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-black uppercase tracking-tight text-[var(--text-primary)] font-arabic">أدوات السيو العربي</h3>
              <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Arabic SEO Engine</p>
            </div>
          </div>

          <div className="flex gap-4 p-2 bg-[var(--bg-primary)] rounded-2xl border border-[var(--border-subtle)] mb-8 overflow-x-auto scrollbar-none">
             {[
                { id: 'sentiment', icon: Smile, label: 'Sentiment' },
                { id: 'citations', icon: MapPin, label: 'Citations' },
                { id: 'gmb', icon: Share2, label: 'GMB Post' }
             ].map((t) => (
                <button 
                  key={t.id}
                  onClick={() => setTool(t.id)}
                  className={`flex flex-1 items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-black uppercase transition-all whitespace-nowrap ${tool === t.id ? 'bg-[var(--accent-red)] text-white shadow-lg' : 'text-[var(--text-muted)]'}`}
                >
                   <t.icon className="w-4 h-4" /> {t.label}
                </button>
             ))}
          </div>

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            dir="rtl"
            className="w-full px-6 py-4 bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] rounded-2xl text-[var(--text-primary)] text-xs h-[150px] font-arabic"
          />

          <button 
            onClick={process}
            className="w-full mt-6 py-4 bg-black text-white font-black uppercase rounded-2xl hover:bg-[var(--accent-red)] transition-all shadow-xl"
          >
             تعديل ومعالجة
          </button>
        </div>

        {/* Output Panel */}
        <div className="space-y-8">
           <ToolOutput 
             output={output} 
             language="text" 
             title={`${tool.toUpperCase()} Output`}
           />
           
           <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] p-8">
              <div className="flex items-center gap-3 mb-4 text-[var(--accent-red)]">
                 <MessageSquare className="w-5 h-5" />
                 <h4 className="text-[10px] font-black uppercase tracking-widest text-[var(--text-primary)]">المحتوى العربي المتميز</h4>
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed italic text-right" dir="rtl">
                 في VDESIGNU، ندرك أن السيو العربي يتطلب لمسة محلية فريدة. نحن نساعدك في الوصول إلى جمهورك في المملكة العربية السعودية والإمارات العربية المتحدة من خلال محتوى محلي متوافق تماماً مع محركات البحث.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
