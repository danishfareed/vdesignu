/**
 * Local SERP Checker
 * Check Google search results from any location worldwide
 * Uses Google's uule parameter for geo-location targeting
 */
import { useState } from 'react';
import { Search, Globe, MapPin, Languages, ExternalLink, RefreshCw } from 'lucide-react';

const COUNTRIES = [
  { code: 'us', name: 'United States', flag: '🇺🇸' },
  { code: 'gb', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'ca', name: 'Canada', flag: '🇨🇦' },
  { code: 'au', name: 'Australia', flag: '🇦🇺' },
  { code: 'ae', name: 'United Arab Emirates', flag: '🇦🇪' },
  { code: 'sa', name: 'Saudi Arabia', flag: '🇸🇦' },
  { code: 'de', name: 'Germany', flag: '🇩🇪' },
  { code: 'fr', name: 'France', flag: '🇫🇷' },
  { code: 'es', name: 'Spain', flag: '🇪🇸' },
  { code: 'it', name: 'Italy', flag: '🇮🇹' },
  { code: 'nl', name: 'Netherlands', flag: '🇳🇱' },
  { code: 'in', name: 'India', flag: '🇮🇳' },
  { code: 'jp', name: 'Japan', flag: '🇯🇵' },
  { code: 'br', name: 'Brazil', flag: '🇧🇷' },
  { code: 'mx', name: 'Mexico', flag: '🇲🇽' },
  { code: 'sg', name: 'Singapore', flag: '🇸🇬' },
  { code: 'pk', name: 'Pakistan', flag: '🇵🇰' },
  { code: 'eg', name: 'Egypt', flag: '🇪🇬' },
  { code: 'qa', name: 'Qatar', flag: '🇶🇦' },
  { code: 'kw', name: 'Kuwait', flag: '🇰🇼' },
  { code: 'bh', name: 'Bahrain', flag: '🇧🇭' },
  { code: 'om', name: 'Oman', flag: '🇴🇲' }
];

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'ar', name: 'Arabic' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'nl', name: 'Dutch' },
  { code: 'ja', name: 'Japanese' },
  { code: 'zh', name: 'Chinese' },
  { code: 'hi', name: 'Hindi' },
  { code: 'ur', name: 'Urdu' }
];

/**
 * Generate Google's uule parameter for geo-location targeting
 * Format: w+CAIQICI + base64(location_string_lowercase)
 * 
 * Examples:
 * "chicago" → "w+CAIQICIHY2hpY2Fnbw"
 * "new york" → "w+CAIQICIIbmV3IHlvcms"
 * "dubai" → "w+CAIQICIFZHViYWk"
 */
function generateUULE(location: string): string {
  if (!location || location.trim() === '') {
    return '';
  }
  
  // Google's uule format:
  // Fixed prefix: "w+CAIQICI"
  // Followed by: base64(location_string_lowercase)
  const prefix = 'w+CAIQICI';
  const normalizedLocation = location.toLowerCase().trim();
  
  try {
    const encoded = btoa(normalizedLocation);
    return prefix + encoded;
  } catch (error) {
    console.error('Failed to encode location:', error);
    return '';
  }
}

/**
 * Generate SERP check URLs for multiple pages
 */
function generateSERPUrls(
  searchTerm: string,
  location: string,
  country: string,
  language: string,
  engine: 'google' | 'google-maps',
  numPages: number = 10
): string[] {
  if (!searchTerm.trim()) {
    return [];
  }
  
  const urls: string[] = [];
  const uule = generateUULE(location);
  
  // For Google Maps, use different URL format
  if (engine === 'google-maps') {
    const baseUrl = 'https://www.google.com/maps/search/';
    const searchQuery = location 
      ? `${searchTerm} ${location}` 
      : searchTerm;
    
    // Google Maps doesn't paginate the same way
    urls.push(`${baseUrl}${encodeURIComponent(searchQuery)}?gl=${country.toLowerCase()}&hl=${language}`);
    return urls;
  }
  
  // For Google Search, generate 10 pages
  const baseUrl = 'https://www.google.com/search';
  
  for (let page = 1; page <= numPages; page++) {
    const params = new URLSearchParams();
    
    // Core parameters
    params.set('q', searchTerm);
    params.set('gl', country.toLowerCase());  // country code
    params.set('hl', language);               // language
    params.set('gws_rd', 'cr');  // disable Google redirects
    params.set('pws', '0');      // disable personalized web search
    
    // Add location encoding if provided
    if (uule) {
      params.set('uule', uule);
    }
    
    // Pagination (10 results per page)
    // Page 1 = start 0 (omit parameter)
    // Page 2 = start 10
    // Page 3 = start 20, etc.
    const startIndex = (page - 1) * 10;
    if (startIndex > 0) {
      params.set('start', startIndex.toString());
    }
    
    urls.push(`${baseUrl}?${params.toString()}`);
  }
  
  return urls;
}

export default function SERPChecker() {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [country, setCountry] = useState('us');
  const [language, setLanguage] = useState('en');
  const [engine, setEngine] = useState<'google' | 'google-maps'>('google');
  const [results, setResults] = useState<string[]>([]);
  const [searchParams, setSearchParams] = useState<{term: string, location: string, country: string, language: string, engine: string} | null>(null);
  const [error, setError] = useState('');

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setError('Please enter a search term');
      return;
    }
    setError('');
    
    const urls = generateSERPUrls(searchTerm, location, country, language, engine, 10);
    
    setResults(urls);
    setSearchParams({
      term: searchTerm,
      location: location || 'Not specified',
      country: COUNTRIES.find(c => c.code === country)?.name || country,
      language: LANGUAGES.find(l => l.code === language)?.name || language,
      engine: engine === 'google-maps' ? 'Google Maps' : 'Google Search'
    });
  };

  const resetSearch = () => {
    setSearchTerm('');
    setLocation('');
    setCountry('us');
    setLanguage('en');
    setEngine('google');
    setResults([]);
    setSearchParams(null);
    setError('');
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Tool Interface */}
      <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] p-8 lg:p-12 shadow-2xl mb-12">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-16 h-16 rounded-2xl bg-[var(--accent-red)] flex items-center justify-center text-white shadow-xl">
            <Search className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-black uppercase tracking-tight text-[var(--text-primary)]">Local SERP Checker</h2>
            <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">View Google Results From Any Location</p>
          </div>
        </div>

        {!results.length ? (
          <div className="space-y-6">
            {/* Search Term */}
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-2">
                Search Term *
              </label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Enter your search term (e.g., 'plumber near me', 'best pizza restaurant')"
                  className="w-full pl-12 pr-5 py-4 bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] rounded-2xl text-sm focus:border-[var(--accent-red)] transition-all"
                />
              </div>
              {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
            </div>

            {/* Location */}
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-2">
                Location (Optional)
              </label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter a location (e.g., Chicago, IL; 90219 CA; Dubai, UAE)"
                  className="w-full pl-12 pr-5 py-4 bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] rounded-2xl text-sm focus:border-[var(--accent-red)] transition-all"
                />
              </div>
              <p className="text-[10px] text-[var(--text-muted)] mt-1">Leave blank to search without specific location targeting</p>
            </div>

            {/* Country & Language */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-2">
                  Country
                </label>
                <div className="relative">
                  <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full pl-12 pr-5 py-4 bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] rounded-2xl text-sm appearance-none cursor-pointer"
                  >
                    {COUNTRIES.map((c) => (
                      <option key={c.code} value={c.code}>{c.flag} {c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-2">
                  Language
                </label>
                <div className="relative">
                  <Languages className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full pl-12 pr-5 py-4 bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] rounded-2xl text-sm appearance-none cursor-pointer"
                  >
                    {LANGUAGES.map((l) => (
                      <option key={l.code} value={l.code}>{l.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Search Engine Toggle */}
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-3">
                Search Engine
              </label>
              <div className="flex gap-4">
                <button
                  onClick={() => setEngine('google')}
                  className={`flex-1 p-4 rounded-2xl border-2 transition-all flex items-center justify-center gap-3 ${
                    engine === 'google' 
                      ? 'bg-[var(--accent-red)] border-[var(--accent-red)] text-white' 
                      : 'bg-[var(--bg-primary)] border-[var(--border-subtle)] text-[var(--text-primary)]'
                  }`}
                >
                  <Search className="w-5 h-5" />
                  <span className="font-bold">Google Search</span>
                </button>
                <button
                  onClick={() => setEngine('google-maps')}
                  className={`flex-1 p-4 rounded-2xl border-2 transition-all flex items-center justify-center gap-3 ${
                    engine === 'google-maps' 
                      ? 'bg-[var(--accent-red)] border-[var(--accent-red)] text-white' 
                      : 'bg-[var(--bg-primary)] border-[var(--border-subtle)] text-[var(--text-primary)]'
                  }`}
                >
                  <MapPin className="w-5 h-5" />
                  <span className="font-bold">Google Maps</span>
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSearch}
              className="w-full py-5 bg-[var(--accent-red)] text-white font-black uppercase text-lg rounded-2xl hover:bg-black transition-all shadow-xl flex items-center justify-center gap-3"
            >
              <Search className="w-6 h-6" />
              Check Search Results
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Summary Panel */}
            <div className="bg-[var(--bg-primary)] rounded-2xl p-6 border border-[var(--border-subtle)]">
              <h3 className="text-xs font-black uppercase tracking-widest text-[var(--accent-red)] mb-4">Your Localized Search Results</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <span className="text-[10px] text-[var(--text-muted)] uppercase">Search Term</span>
                  <p className="font-bold text-[var(--text-primary)]">{searchParams?.term}</p>
                </div>
                <div>
                  <span className="text-[10px] text-[var(--text-muted)] uppercase">Location</span>
                  <p className="font-bold text-[var(--text-primary)]">{searchParams?.location}</p>
                </div>
                <div>
                  <span className="text-[10px] text-[var(--text-muted)] uppercase">Country / Language</span>
                  <p className="font-bold text-[var(--text-primary)]">{searchParams?.country} / {searchParams?.language}</p>
                </div>
                <div>
                  <span className="text-[10px] text-[var(--text-muted)] uppercase">Engine</span>
                  <p className="font-bold text-[var(--text-primary)]">{searchParams?.engine}</p>
                </div>
              </div>
            </div>

            {/* Results Grid */}
            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-[var(--text-muted)] mb-4">Click to View Results</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {results.map((url, index) => (
                  <a
                    key={index}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] rounded-2xl p-6 text-center hover:border-[var(--accent-red)] hover:bg-[var(--accent-red)] transition-all"
                  >
                    <div className="text-3xl font-black text-[var(--text-primary)] group-hover:text-white mb-1">
                      {index + 1}
                    </div>
                    <div className="text-[10px] font-bold text-[var(--text-muted)] group-hover:text-white/80 uppercase flex items-center justify-center gap-1">
                      Page {index + 1}
                      <ExternalLink className="w-3 h-3" />
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Search Again Button */}
            <button
              onClick={resetSearch}
              className="w-full py-4 bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] text-[var(--text-primary)] font-black uppercase rounded-2xl hover:border-[var(--accent-red)] transition-all flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-5 h-5" />
              Search Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
