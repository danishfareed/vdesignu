/**
 * Google Review Link Generator
 * Generate direct review links and QR codes for Google Business Profile
 */
import { useState, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Star, Copy, Download, ExternalLink, CheckCircle, Search, MapPin, Globe } from 'lucide-react';

function extractPlaceId(input: string): string | null {
  // Check if it's already a valid Place ID (starts with ChIJ or GhIJ, usually ~27 chars)
  if (/^(ChIJ|GhIJ)[a-zA-Z0-9_-]{10,}$/.test(input.trim())) {
    return input.trim();
  }
  
  // Try to extract from Google Maps URL
  // Format: !1s0x...:0x...
  const hexMatch = input.match(/!1s(0x[0-9a-f]+:0x[0-9a-f]+)/i);
  if (hexMatch) {
    // This is a CID/Hex format, unfortunately we largely need Place ID for the best write-review URL.
    // However, we can try to extract basic Place ID if present in other params.
  }
  
  const placeIdMatch = input.match(/!1s(ChIJ[a-zA-Z0-9_-]+)/);
  if (placeIdMatch) return placeIdMatch[1];
  
  const placeIdParam = input.match(/place_id[=:]([A-Za-z0-9_-]+)/i);
  if (placeIdParam) return placeIdParam[1];
  
  return null;
}

function generateReviewUrl(placeId: string): string {
  return `https://search.google.com/local/writereview?placeid=${placeId}`;
}

export default function ReviewLinkGenerator() {
  const [activeTab, setActiveTab] = useState<'placeid' | 'business'>('business');
  const [input, setInput] = useState('');
  const [placeId, setPlaceId] = useState('');
  const [reviewUrl, setReviewUrl] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const qrRef = useRef<SVGSVGElement>(null);

  const handleGenerate = () => {
    setError('');
    setCopied(false);
    
    let pid = input.trim();
    
    // If user selected "Business Search" but entered a raw ID, just accept it
    const extracted = extractPlaceId(pid);
    
    if (extracted) {
      setPlaceId(extracted);
      setReviewUrl(generateReviewUrl(extracted));
    } else {
      setError('Invalid Place ID format. Please use the tool above to find your ID first.');
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(reviewUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadQR = () => {
    if (!qrRef.current) return;
    
    const svgData = new XMLSerializer().serializeToString(qrRef.current);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width + 100; // Add padding
      canvas.height = img.height + 100;
      if (ctx) {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 50, 50);
        
        const a = document.createElement("a");
        a.download = `google-review-qr-${placeId}.png`;
        a.href = canvas.toDataURL("image/png");
        a.click();
      }
    };
    
    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  return (
    <div className="max-w-5xl mx-auto">
      
      {/* Intro Text */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-[var(--text-primary)] mb-6">
          Google Review Link <span className="text-[var(--accent-red)]">&</span> ID Generator
        </h2>
        <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
          Looking for a simple way to share your Google Business Profile listing with customers? 
          With this free tool, you can generate a direct Google review link and QR code, 
          and find the Place ID used to identify your business.
        </p>
      </div>

      <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] overflow-hidden shadow-2xl mb-12">
        <div className="p-8 lg:p-12">
          
          <div className="grid lg:grid-cols-2 gap-16">
            {/* LEFT COLUMN: Input */}
            <div className="space-y-8">
              
              {/* Step 1: Find ID */}
              <div className="bg-[var(--bg-primary)] p-6 rounded-3xl border border-[var(--border-subtle)]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-[var(--text-primary)] text-[var(--bg-primary)] flex items-center justify-center font-black text-sm">1</div>
                  <h3 className="font-bold text-[var(--text-primary)] uppercase tracking-tight">Find Your Place ID</h3>
                </div>
                
                <p className="text-sm text-[var(--text-secondary)] mb-6 leading-relaxed">
                  Start by finding your official Google <strong>Place ID</strong> using the Google Developers tool below.
                </p>

                <div className="flex flex-col gap-3">
                    <a 
                      href="https://developers.google.com/maps/documentation/places/web-service/place-id" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 bg-white dark:bg-black/10 border border-[var(--border-subtle)] rounded-xl hover:border-[var(--accent-red)] transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <Search className="w-5 h-5 text-[var(--accent-red)]" />
                        <div className="text-left">
                          <div className="font-bold text-sm text-[var(--text-primary)]">Open Place ID Finder</div>
                          <div className="text-[11px] text-[var(--text-muted)]">Official Google Tool</div>
                        </div>
                      </div>
                      <ExternalLink className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--accent-red)] transition-colors" />
                    </a>
                </div>

   {/* SAB Warning Box */}
<div className="mt-6 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 p-4 rounded-xl">
  <h4 className="text-xs font-black uppercase tracking-wider text-gray-900 dark:text-amber-400 mb-2 flex items-center gap-2">
    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
    Hidden Address?
  </h4>
  <p className="text-[11px] text-gray-700 dark:text-amber-200 leading-relaxed">
    Please note: if the business has hidden its address in its Google Business Profile listing (Service Area Business), 
    you will not be able to generate Google links and IDs using the Place ID Finder. 
    <a href="#sab-guide" className="underline font-bold ml-1 hover:text-black dark:hover:text-amber-400">See manual method below</a>.
  </p>
</div>



              </div>

              {/* Step 2: Generate */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-[var(--text-primary)] text-[var(--bg-primary)] flex items-center justify-center font-black text-sm">2</div>
                  <h3 className="font-bold text-[var(--text-primary)] uppercase tracking-tight">Paste ID & Generate</h3>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Paste Place ID here (e.g. ChIJ...)"
                    className="w-full pl-6 pr-4 py-5 bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] rounded-2xl text-base focus:border-[var(--accent-red)] focus:outline-none transition-colors"
                  />
                  <div className="absolute right-2 top-2">
                    <button
                      onClick={handleGenerate}
                      disabled={!input}
                      className="h-10 px-6 bg-[var(--accent-red)] hover:bg-black text-white rounded-xl font-bold uppercase text-xs tracking-wide transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Generate
                    </button>
                  </div>
                </div>
                {error && <p className="text-red-500 text-xs mt-3 pl-2 font-medium flex items-center gap-1">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500"></span>
                  {error}
                </p>}
              </div>

            </div>

            {/* RIGHT COLUMN: Output */}
            <div className={`transition-all duration-500 ${reviewUrl ? 'opacity-100 translate-y-0' : 'opacity-50 translate-y-4 blur-[2px] pointer-events-none grayscale'}`}>
              <div className="space-y-8">
                
                {/* QR Display */}
                <div className="bg-white p-8 rounded-[2rem] shadow-xl text-center border-4 border-white">
                  <div className="mb-6 flex justify-center">
                    {reviewUrl ? (
                      <QRCodeSVG
                        value={reviewUrl}
                        size={220}
                        level="H"
                        includeMargin={true}
                        ref={qrRef}
                        imageSettings={{
                          src: "https://vdesignu.com/favicon.svg", // Optional favicon
                          x: undefined,
                          y: undefined,
                          height: 24,
                          width: 24,
                          excavate: true,
                        }}
                      />
                    ) : ( 
                      <div className="w-[220px] h-[220px] bg-gray-100/50 rounded-xl animate-pulse"></div> 
                    )}
                  </div>
                  <div className="flex gap-3 justify-center">
                    <button 
                      onClick={downloadQR}
                      className="flex items-center gap-2 px-5 py-2.5 bg-black text-white rounded-full text-xs font-bold uppercase tracking-wide hover:bg-[var(--accent-red)] transition-colors"
                    >
                      <Download className="w-4 h-4" /> Download PNG
                    </button>
                  </div>
                </div>

                {/* Link Display */}
                <div className="bg-[var(--bg-primary)] p-6 rounded-3xl border border-[var(--border-subtle)]">
                  <label className="block text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-3">
                    Direct Review Link
                  </label>
                  <div className="flex gap-2">
                    <input
                      readOnly
                      value={reviewUrl}
                      className="flex-1 px-4 py-3 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl text-sm font-mono text-[var(--text-secondary)] select-all"
                    />
                    <button
                      onClick={copyLink}
                      className="px-4 py-3 bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--accent-red)] text-[var(--text-primary)] rounded-xl transition-all"
                    >
                      {copied ? <CheckCircle className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Guide for SABs */}
      <div id="sab-guide" className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-[var(--bg-card)] p-8 rounded-[2.5rem] border border-[var(--border-subtle)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent-green)]/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
          <div className="flex items-center gap-4 mb-6">
             <div className="w-12 h-12 rounded-2xl bg-[var(--bg-secondary)] flex items-center justify-center">
              <MapPin className="w-6 h-6 text-[var(--accent-green)]" />
             </div>
             <div>
               <h3 className="text-xl font-black uppercase tracking-tight text-[var(--text-primary)]">Service Area Business?</h3>
               <p className="text-xs font-bold text-[var(--text-secondary)]">How to get links if address is hidden</p>
             </div>
          </div>
          <p className="text-sm text-[var(--text-secondary)] mb-4 leading-relaxed">
            Businesses with hidden addresses (SABs) won't show up in the Place ID finder. Here is how to find your link manually:
          </p>
          <ul className="space-y-3">
            {[
              "Search for your business on Google Maps directly.",
              "Click the 'Share' icon in your business profile.",
              "Copy the shortened URL (e.g. maps.app.goo.gl...).",
              "This link works perfectly for reviews!"
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                <span className="w-5 h-5 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center text-[10px] font-bold mt-0.5">{i+1}</span>
                {step}
              </li>
            ))}
          </ul>
        </div>

        {/* Why Google Links? */}
        <div className="bg-[var(--bg-card)] p-8 rounded-[2.5rem] border border-[var(--border-subtle)] relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent-red)]/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
           <div className="flex items-center gap-4 mb-6">
             <div className="w-12 h-12 rounded-2xl bg-[var(--bg-secondary)] flex items-center justify-center">
              <Globe className="w-6 h-6 text-[var(--accent-red)]" />
             </div>
             <div>
               <h3 className="text-xl font-black uppercase tracking-tight text-[var(--text-primary)]">Why use this tool?</h3>
               <p className="text-xs font-bold text-[var(--text-secondary)]">Best practices for local SEO</p>
             </div>
          </div>
          <div className="space-y-4">
            <div>
              <h4 className="font-bold text-[var(--text-primary)] text-sm mb-1">Mobile Optimized</h4>
              <p className="text-xs text-[var(--text-secondary)]">Generates deep links that open directly in the Google Maps app on iOS and Android.</p>
            </div>
            <div>
              <h4 className="font-bold text-[var(--text-primary)] text-sm mb-1">Print Ready QR</h4>
              <p className="text-xs text-[var(--text-secondary)]">High-resolution QR codes perfect for table tents, receipts, and business cards.</p>
            </div>
            <div>
               <h4 className="font-bold text-[var(--text-primary)] text-sm mb-1">Safe & Compliant</h4>
              <p className="text-xs text-[var(--text-secondary)]">Uses 100% compliant Google search URLs. Never buy reviews or incentivize feedback.</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
