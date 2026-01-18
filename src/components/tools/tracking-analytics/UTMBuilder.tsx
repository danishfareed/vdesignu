/**
 * UTM Builder Tool
 * Generates UTM-tagged URLs for campaign tracking
 */
import { useState } from 'react';
import ToolOutput from '../ToolOutput';
import { Link, Copy, Check } from 'lucide-react';

export default function UTMBuilder() {
  const [baseUrl, setBaseUrl] = useState('');
  const [source, setSource] = useState('');
  const [medium, setMedium] = useState('');
  const [campaign, setCampaign] = useState('');
  const [term, setTerm] = useState('');
  const [content, setContent] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const mediumOptions = [
    { value: 'cpc', label: 'CPC (Paid Search)' },
    { value: 'organic', label: 'Organic' },
    { value: 'social', label: 'Social' },
    { value: 'email', label: 'Email' },
    { value: 'affiliate', label: 'Affiliate' },
    { value: 'referral', label: 'Referral' },
    { value: 'display', label: 'Display' },
    { value: 'video', label: 'Video' },
    { value: 'banner', label: 'Banner' },
  ];

  const sourcePresets = [
    { value: 'google', label: 'Google' },
    { value: 'facebook', label: 'Facebook' },
    { value: 'instagram', label: 'Instagram' },
    { value: 'linkedin', label: 'LinkedIn' },
    { value: 'twitter', label: 'Twitter/X' },
    { value: 'youtube', label: 'YouTube' },
    { value: 'newsletter', label: 'Newsletter' },
    { value: 'bing', label: 'Bing' },
    { value: 'tiktok', label: 'TikTok' },
  ];

  const generateUrl = () => {
    if (!baseUrl || !source || !medium || !campaign) {
      return;
    }

    try {
      const url = new URL(baseUrl);
      
      // Add UTM parameters
      url.searchParams.set('utm_source', source.toLowerCase().replace(/\s+/g, '_'));
      url.searchParams.set('utm_medium', medium.toLowerCase().replace(/\s+/g, '_'));
      url.searchParams.set('utm_campaign', campaign.toLowerCase().replace(/\s+/g, '_'));
      
      if (term) {
        url.searchParams.set('utm_term', term.toLowerCase().replace(/\s+/g, '_'));
      }
      if (content) {
        url.searchParams.set('utm_content', content.toLowerCase().replace(/\s+/g, '_'));
      }

      setOutput(url.toString());
    } catch (e) {
      setOutput('Invalid URL. Please enter a valid URL including https://');
    }
  };

  const handleCopyUrl = async () => {
    if (output && !output.startsWith('Invalid')) {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const isValid = baseUrl && source && medium && campaign;

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Input Form */}
      <div className="space-y-6">
        {/* Base URL */}
        <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-3xl p-8">
          <h3 className="text-lg font-black uppercase tracking-tight text-[var(--text-primary)] mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-[var(--accent-red)] flex items-center justify-center text-white text-sm">1</span>
            Destination URL
          </h3>
          
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">
              Website URL *
            </label>
            <div className="relative">
              <Link className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
              <input
                type="url"
                value={baseUrl}
                onChange={(e) => setBaseUrl(e.target.value)}
                placeholder="https://www.yourwebsite.com/landing-page"
                className="w-full pl-12 pr-4 py-3 bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:border-[var(--accent-red)] focus:outline-none transition-colors"
              />
            </div>
            <p className="text-xs text-[var(--text-muted)] mt-2">
              Enter the full URL including https://
            </p>
          </div>
        </div>

        {/* Required Parameters */}
        <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-3xl p-8">
          <h3 className="text-lg font-black uppercase tracking-tight text-[var(--text-primary)] mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-[var(--accent-red)] flex items-center justify-center text-white text-sm">2</span>
            Required Parameters
          </h3>
          
          <div className="space-y-4">
            {/* Source */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">
                Campaign Source (utm_source) *
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {sourcePresets.map(preset => (
                  <button
                    key={preset.value}
                    onClick={() => setSource(preset.value)}
                    className={`px-3 py-1.5 text-xs font-bold uppercase rounded-lg border-2 transition-all ${
                      source === preset.value
                        ? 'border-[var(--accent-red)] bg-[var(--accent-red)] text-white'
                        : 'border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--accent-red)]'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
              <input
                type="text"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                placeholder="google, facebook, newsletter..."
                className="w-full px-4 py-3 bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:border-[var(--accent-red)] focus:outline-none transition-colors"
              />
            </div>
            
            {/* Medium */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">
                Campaign Medium (utm_medium) *
              </label>
              <select
                value={medium}
                onChange={(e) => setMedium(e.target.value)}
                className="w-full px-4 py-3 bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] rounded-xl text-[var(--text-primary)] focus:border-[var(--accent-red)] focus:outline-none transition-colors cursor-pointer"
              >
                <option value="">Select medium...</option>
                {mediumOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            
            {/* Campaign */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">
                Campaign Name (utm_campaign) *
              </label>
              <input
                type="text"
                value={campaign}
                onChange={(e) => setCampaign(e.target.value)}
                placeholder="spring_sale, product_launch, brand_awareness..."
                className="w-full px-4 py-3 bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:border-[var(--accent-red)] focus:outline-none transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Optional Parameters */}
        <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-3xl p-8">
          <h3 className="text-lg font-black uppercase tracking-tight text-[var(--text-primary)] mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-[var(--accent-yellow)] flex items-center justify-center text-black text-sm">3</span>
            Optional Parameters
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">
                Campaign Term (utm_term)
              </label>
              <input
                type="text"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                placeholder="paid keywords, target audience..."
                className="w-full px-4 py-3 bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:border-[var(--accent-red)] focus:outline-none transition-colors"
              />
              <p className="text-xs text-[var(--text-muted)] mt-1">
                Used for paid search keywords
              </p>
            </div>
            
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">
                Campaign Content (utm_content)
              </label>
              <input
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="banner_v1, sidebar_cta, header_button..."
                className="w-full px-4 py-3 bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:border-[var(--accent-red)] focus:outline-none transition-colors"
              />
              <p className="text-xs text-[var(--text-muted)] mt-1">
                Used to differentiate similar content or links
              </p>
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={generateUrl}
          disabled={!isValid}
          className="w-full py-5 bg-[var(--accent-red)] text-white font-black italic uppercase tracking-tighter text-xl rounded-2xl hover:bg-black transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-red-600/20"
        >
          Generate UTM URL
        </button>
      </div>

      {/* Output Panel */}
      <div className="lg:sticky lg:top-32 self-start space-y-6">
        {/* Quick Copy URL */}
        {output && !output.startsWith('Invalid') && (
          <div className="bg-[var(--bg-card)] border-2 border-[var(--accent-red)] rounded-3xl p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-black uppercase tracking-wider text-[var(--text-primary)]">
                Your UTM URL
              </span>
              <button
                onClick={handleCopyUrl}
                className="flex items-center gap-2 px-4 py-2 bg-[var(--accent-red)] text-white rounded-lg text-xs font-black uppercase hover:bg-black transition-all"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy URL
                  </>
                )}
              </button>
            </div>
            <p className="text-sm text-[var(--text-secondary)] break-all font-mono bg-[var(--bg-primary)] p-4 rounded-xl border border-[var(--border-subtle)]">
              {output}
            </p>
          </div>
        )}

        {/* Parameter Breakdown */}
        {output && !output.startsWith('Invalid') && (
          <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-3xl p-6">
            <h4 className="text-sm font-black uppercase tracking-wider text-[var(--text-primary)] mb-4">
              Parameter Breakdown
            </h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <span className="px-2 py-1 bg-[var(--accent-red)]/10 text-[var(--accent-red)] rounded font-mono text-xs">utm_source</span>
                <span className="text-[var(--text-secondary)]">{source}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="px-2 py-1 bg-[var(--accent-red)]/10 text-[var(--accent-red)] rounded font-mono text-xs">utm_medium</span>
                <span className="text-[var(--text-secondary)]">{medium}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="px-2 py-1 bg-[var(--accent-red)]/10 text-[var(--accent-red)] rounded font-mono text-xs">utm_campaign</span>
                <span className="text-[var(--text-secondary)]">{campaign}</span>
              </div>
              {term && (
                <div className="flex items-center gap-2 text-sm">
                  <span className="px-2 py-1 bg-[var(--accent-yellow)]/20 text-[var(--accent-yellow)] rounded font-mono text-xs">utm_term</span>
                  <span className="text-[var(--text-secondary)]">{term}</span>
                </div>
              )}
              {content && (
                <div className="flex items-center gap-2 text-sm">
                  <span className="px-2 py-1 bg-[var(--accent-yellow)]/20 text-[var(--accent-yellow)] rounded font-mono text-xs">utm_content</span>
                  <span className="text-[var(--text-secondary)]">{content}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!output && (
          <div className="bg-[var(--bg-secondary)] border-2 border-dashed border-[var(--border-subtle)] rounded-3xl p-12 text-center">
            <Link className="w-12 h-12 text-[var(--text-muted)] mx-auto mb-4" />
            <p className="text-[var(--text-muted)] font-medium">
              Your UTM URL will appear here
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
