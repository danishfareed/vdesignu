/**
 * Arabic Transliteration Tool
 * Converts between Arabic script and Latin transliteration
 */
import { useState } from 'react';
import { Languages, ArrowLeftRight, Copy, RefreshCw } from 'lucide-react';

// Simple transliteration map (for demonstration - a full implementation would use a proper library)
const ARABIC_TO_LATIN: { [key: string]: string } = {
  'ا': 'a', 'أ': 'a', 'إ': 'i', 'آ': 'aa',
  'ب': 'b', 'ت': 't', 'ث': 'th', 'ج': 'j',
  'ح': 'h', 'خ': 'kh', 'د': 'd', 'ذ': 'dh',
  'ر': 'r', 'ز': 'z', 'س': 's', 'ش': 'sh',
  'ص': 's', 'ض': 'd', 'ط': 't', 'ظ': 'z',
  'ع': "'", 'غ': 'gh', 'ف': 'f', 'ق': 'q',
  'ك': 'k', 'ل': 'l', 'م': 'm', 'ن': 'n',
  'ه': 'h', 'و': 'w', 'ي': 'y', 'ى': 'a',
  'ة': 'a', 'ء': "'", ' ': ' ',
  'ـ': '', 'َ': 'a', 'ُ': 'u', 'ِ': 'i',
  'ً': 'an', 'ٌ': 'un', 'ٍ': 'in',
  'ّ': '', 'ْ': ''
};

export default function ArabicTransliterator() {
  const [arabicInput, setArabicInput] = useState('');
  const [latinOutput, setLatinOutput] = useState('');
  const [mode, setMode] = useState<'ar-to-en' | 'en-to-ar'>('ar-to-en');

  const transliterate = () => {
    if (mode === 'ar-to-en') {
      // Arabic to Latin transliteration
      let result = '';
      for (const char of arabicInput) {
        result += ARABIC_TO_LATIN[char] || char;
      }
      setLatinOutput(result);
    } else {
      // For en-to-ar, we'll show a simplified example
      setLatinOutput('Note: English to Arabic conversion requires more complex processing. Showing phonetic interpretation.');
    }
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(latinOutput);
  };

  const swapMode = () => {
    setMode(mode === 'ar-to-en' ? 'en-to-ar' : 'ar-to-en');
    setArabicInput('');
    setLatinOutput('');
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Input Panel */}
        <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] p-10 shadow-2xl">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-14 h-14 rounded-2xl bg-[var(--accent-red)] flex items-center justify-center text-white shadow-xl">
              <Languages className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-black uppercase tracking-tight text-[var(--text-primary)]">Arabic Transliterator</h3>
              <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Script Conversion Tool</p>
            </div>
          </div>

          {/* Mode Toggle */}
          <button
            onClick={swapMode}
            className="w-full mb-6 p-4 bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] rounded-2xl flex items-center justify-center gap-4 hover:border-[var(--accent-red)] transition-all"
          >
            <span className={`font-bold ${mode === 'ar-to-en' ? 'text-[var(--accent-red)]' : 'text-[var(--text-muted)]'}`}>العربية</span>
            <ArrowLeftRight className="w-5 h-5 text-[var(--text-muted)]" />
            <span className={`font-bold ${mode === 'en-to-ar' ? 'text-[var(--accent-red)]' : 'text-[var(--text-muted)]'}`}>English</span>
          </button>

          <div className="space-y-6">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-2">
                {mode === 'ar-to-en' ? 'Arabic Text' : 'English Text'}
              </label>
              <textarea
                value={arabicInput}
                onChange={(e) => setArabicInput(e.target.value)}
                dir={mode === 'ar-to-en' ? 'rtl' : 'ltr'}
                placeholder={mode === 'ar-to-en' ? 'اكتب النص العربي هنا...' : 'Type English text here...'}
                className="w-full px-5 py-4 bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] rounded-2xl text-lg h-40 resize-none"
              />
            </div>

            <button
              onClick={transliterate}
              className="w-full py-4 bg-[var(--accent-red)] text-white font-black uppercase rounded-2xl hover:bg-black transition-all shadow-xl"
            >
              Transliterate
            </button>
          </div>
        </div>

        {/* Output Panel */}
        <div className="space-y-8">
          <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] p-8">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-xs font-black uppercase tracking-widest text-[var(--text-primary)]">Transliteration Result</h4>
              <button
                onClick={copyOutput}
                className="flex items-center gap-2 px-4 py-2 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl text-[10px] font-bold hover:bg-[var(--accent-red)] hover:text-white transition-all"
              >
                <Copy className="w-3 h-3" /> Copy
              </button>
            </div>
            
            <div className="p-6 bg-[var(--bg-primary)] rounded-2xl border border-[var(--border-subtle)] min-h-40">
              <p className="text-xl text-[var(--text-primary)]">
                {latinOutput || 'Enter text and click Transliterate'}
              </p>
            </div>
          </div>

          {/* Examples */}
          <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] p-8">
            <h4 className="text-xs font-black uppercase tracking-widest text-[var(--text-primary)] mb-4">Common Examples</h4>
            <div className="space-y-3">
              {[
                { ar: 'محمد', en: 'Muhammad' },
                { ar: 'الرياض', en: 'Riyadh' },
                { ar: 'دبي', en: 'Dubai' },
                { ar: 'السعودية', en: 'Saudi Arabia' }
              ].map((example, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-[var(--bg-primary)] rounded-xl">
                  <span className="font-arabic text-lg" dir="rtl">{example.ar}</span>
                  <span className="text-[var(--text-muted)]">→</span>
                  <span className="font-bold text-[var(--text-primary)]">{example.en}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
