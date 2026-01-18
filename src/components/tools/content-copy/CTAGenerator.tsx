/**
 * CTA (Call-to-Action) Generator
 * Generates compelling CTA copy for buttons and conversion elements
 */
import { useState } from 'react';
import { MousePointerClick, Sparkles, Copy, CheckCircle } from 'lucide-react';

const CTA_TEMPLATES = {
  signup: [
    'Get Started Free',
    'Start Your Free Trial',
    'Join {count}+ Happy Users',
    'Create Your Account',
    'Sign Up Now - It\'s Free',
    'Start Saving Today'
  ],
  purchase: [
    'Buy Now',
    'Add to Cart',
    'Get Instant Access',
    'Claim Your {discount}% Discount',
    'Order Now - Limited Stock',
    'Secure Your Order'
  ],
  contact: [
    'Get a Free Quote',
    'Schedule a Call',
    'Talk to an Expert',
    'Request a Demo',
    'Book Your Consultation',
    'Contact Us Today'
  ],
  download: [
    'Download Free Guide',
    'Get Your Free Copy',
    'Download Now',
    'Access Free Resource',
    'Grab Your Free Template',
    'Download PDF'
  ],
  subscribe: [
    'Subscribe Now',
    'Join Our Newsletter',
    'Get Weekly Updates',
    'Stay Informed',
    'Never Miss an Update',
    'Subscribe for Free'
  ]
};

const URGENCY_PHRASES = [
  'Limited Time Offer',
  'Only {count} Left',
  'Offer Ends Soon',
  'Today Only',
  '{hours} Hours Left',
  'Don\'t Miss Out'
];

export default function CTAGenerator() {
  const [ctaType, setCTAType] = useState('signup');
  const [brandVoice, setBrandVoice] = useState('professional');
  const [includeUrgency, setIncludeUrgency] = useState(false);
  const [customValues, setCustomValues] = useState({ count: '1000', discount: '20', hours: '24' });
  const [generatedCTAs, setGeneratedCTAs] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const generateCTAs = () => {
    const templates = CTA_TEMPLATES[ctaType as keyof typeof CTA_TEMPLATES];
    
    let ctas = templates.map(template => 
      template
        .replace('{count}', customValues.count)
        .replace('{discount}', customValues.discount)
        .replace('{hours}', customValues.hours)
    );

    // Add urgency variations
    if (includeUrgency) {
      const urgency = URGENCY_PHRASES.map(phrase =>
        phrase
          .replace('{count}', customValues.count)
          .replace('{hours}', customValues.hours)
      );
      
      ctas = ctas.flatMap(cta => [
        cta,
        `${cta} - ${urgency[0]}`,
        `${urgency[3]}: ${cta}`
      ]).slice(0, 15);
    }

    setGeneratedCTAs(ctas);
  };

  const copyCTA = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Input Panel */}
        <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] p-10 shadow-2xl">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-14 h-14 rounded-2xl bg-[var(--accent-red)] flex items-center justify-center text-white shadow-xl">
              <MousePointerClick className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-black uppercase tracking-tight text-[var(--text-primary)]">CTA Generator</h3>
              <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Call-to-Action Copy</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* CTA Type */}
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-2">CTA Type</label>
              <div className="grid grid-cols-3 gap-2">
                {Object.keys(CTA_TEMPLATES).map((type) => (
                  <button
                    key={type}
                    onClick={() => setCTAType(type)}
                    className={`py-3 rounded-xl text-[10px] font-black uppercase transition-all ${
                      ctaType === type
                        ? 'bg-[var(--accent-red)] text-white'
                        : 'bg-[var(--bg-primary)] text-[var(--text-muted)] border border-[var(--border-subtle)]'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Values */}
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-2">User Count</label>
                <input
                  type="text"
                  value={customValues.count}
                  onChange={(e) => setCustomValues({ ...customValues, count: e.target.value })}
                  className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl text-sm"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-2">Discount %</label>
                <input
                  type="text"
                  value={customValues.discount}
                  onChange={(e) => setCustomValues({ ...customValues, discount: e.target.value })}
                  className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl text-sm"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-2">Hours Left</label>
                <input
                  type="text"
                  value={customValues.hours}
                  onChange={(e) => setCustomValues({ ...customValues, hours: e.target.value })}
                  className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl text-sm"
                />
              </div>
            </div>

            {/* Urgency Toggle */}
            <div className="flex items-center justify-between p-4 bg-[var(--bg-primary)] rounded-xl border border-[var(--border-subtle)]">
              <span className="text-sm font-bold text-[var(--text-primary)]">Add Urgency Elements</span>
              <button
                onClick={() => setIncludeUrgency(!includeUrgency)}
                className={`w-12 h-6 rounded-full transition-all ${includeUrgency ? 'bg-[var(--accent-red)]' : 'bg-gray-300'}`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-all ${includeUrgency ? 'translate-x-6' : 'translate-x-0.5'}`} />
              </button>
            </div>

            <button
              onClick={generateCTAs}
              className="w-full py-4 bg-[var(--accent-red)] text-white font-black uppercase rounded-2xl hover:bg-black transition-all shadow-xl flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5" /> Generate CTAs
            </button>
          </div>
        </div>

        {/* Output Panel */}
        <div className="space-y-4">
          <h4 className="text-xs font-black uppercase tracking-widest text-[var(--text-muted)]">Generated CTAs ({generatedCTAs.length})</h4>
          
          {generatedCTAs.length === 0 && (
            <div className="bg-[var(--bg-card)] border-2 border-dashed border-[var(--border-subtle)] rounded-2xl p-8 text-center">
              <p className="text-[var(--text-muted)] text-sm">Select options and click Generate CTAs</p>
            </div>
          )}

          <div className="grid gap-3">
            {generatedCTAs.map((cta, index) => (
              <div key={index} className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-xl p-4 flex items-center justify-between hover:border-[var(--accent-red)] transition-all">
                <div className="flex items-center gap-3">
                  <div className="px-4 py-2 bg-[var(--accent-red)] text-white rounded-lg text-sm font-bold">
                    {cta}
                  </div>
                </div>
                <button
                  onClick={() => copyCTA(cta, index)}
                  className="p-2 bg-[var(--bg-primary)] rounded-lg hover:bg-[var(--accent-red)] hover:text-white transition-all"
                >
                  {copiedIndex === index ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
