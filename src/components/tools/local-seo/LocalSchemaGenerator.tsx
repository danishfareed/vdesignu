/**
 * LocalBusiness Schema Generator
 * Generate Google-compliant JSON-LD structured data
 */
import { useState } from 'react';
import { Code2, Copy, Download, ExternalLink, CheckCircle, Plus, Trash2, Clock } from 'lucide-react';

const BUSINESS_TYPES = [
  'LocalBusiness',
  'Restaurant',
  'Store',
  'MedicalBusiness',
  'LegalService',
  'FinancialService',
  'RealEstateAgent',
  'HomeAndConstructionBusiness',
  'ProfessionalService',
  'AutomotiveBusiness',
  'BeautySalon',
  'DaySpa',
  'Dentist',
  'Electrician',
  'GasStation',
  'GroceryStore',
  'HairSalon',
  'HealthClub',
  'Hotel',
  'InsuranceAgency',
  'Plumber',
  'TravelAgency',
  'VeterinaryCare'
];

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

interface OpeningHour {
  day: string;
  closed: boolean;
  opens: string;
  closes: string;
}

interface FormData {
  businessType: string;
  name: string;
  description: string;
  url: string;
  phone: string;
  email: string;
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  latitude: string;
  longitude: string;
  priceRange: string;
  logo: string;
  image: string;
  facebook: string;
  instagram: string;
  twitter: string;
  linkedin: string;
  openingHours: OpeningHour[];
}

export default function LocalSchemaGenerator() {
  const [formData, setFormData] = useState<FormData>({
    businessType: 'LocalBusiness',
    name: '',
    description: '',
    url: '',
    phone: '',
    email: '',
    streetAddress: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'AE',
    latitude: '',
    longitude: '',
    priceRange: '$$',
    logo: '',
    image: '',
    facebook: '',
    instagram: '',
    twitter: '',
    linkedin: '',
    openingHours: DAYS.map(day => ({
      day,
      closed: day === 'Friday' || day === 'Saturday',
      opens: '09:00',
      closes: '18:00'
    }))
  });

  const [copied, setCopied] = useState(false);

  const updateField = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateHours = (index: number, field: keyof OpeningHour, value: any) => {
    const newHours = [...formData.openingHours];
    newHours[index] = { ...newHours[index], [field]: value };
    setFormData(prev => ({ ...prev, openingHours: newHours }));
  };

  const setAllWeekdays = () => {
    const newHours = formData.openingHours.map(h => ({
      ...h,
      closed: h.day === 'Saturday' || h.day === 'Sunday',
      opens: '09:00',
      closes: '18:00'
    }));
    setFormData(prev => ({ ...prev, openingHours: newHours }));
  };

  const generateSchema = (): object => {
    const schema: any = {
      '@context': 'https://schema.org',
      '@type': formData.businessType,
      name: formData.name || 'Your Business Name',
      description: formData.description || undefined,
      url: formData.url || undefined,
      telephone: formData.phone || undefined,
      email: formData.email || undefined,
      priceRange: formData.priceRange || undefined,
      logo: formData.logo || undefined,
      image: formData.image || undefined
    };

    // Address
    if (formData.streetAddress || formData.city) {
      schema.address = {
        '@type': 'PostalAddress',
        streetAddress: formData.streetAddress || undefined,
        addressLocality: formData.city || undefined,
        addressRegion: formData.state || undefined,
        postalCode: formData.postalCode || undefined,
        addressCountry: formData.country || 'AE'
      };
    }

    // Geo coordinates
    if (formData.latitude && formData.longitude) {
      schema.geo = {
        '@type': 'GeoCoordinates',
        latitude: parseFloat(formData.latitude),
        longitude: parseFloat(formData.longitude)
      };
    }

    // Opening hours
    const openHours = formData.openingHours.filter(h => !h.closed);
    if (openHours.length > 0) {
      schema.openingHoursSpecification = openHours.map(h => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: h.day,
        opens: h.opens,
        closes: h.closes
      }));
    }

    // Social profiles
    const sameAs = [formData.facebook, formData.instagram, formData.twitter, formData.linkedin].filter(Boolean);
    if (sameAs.length > 0) {
      schema.sameAs = sameAs;
    }

    // Remove undefined values
    const cleanSchema = JSON.parse(JSON.stringify(schema));
    return cleanSchema;
  };

  const schemaJSON = JSON.stringify(generateSchema(), null, 2);

  const copySchema = () => {
    const fullCode = `<script type="application/ld+json">\n${schemaJSON}\n</script>`;
    navigator.clipboard.writeText(fullCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadSchema = () => {
    const blob = new Blob([schemaJSON], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'localbusiness-schema.json';
    a.click();
  };

  const validateInGoogle = () => {
    const testUrl = `https://search.google.com/test/rich-results?code=${encodeURIComponent(`<script type="application/ld+json">${schemaJSON}</script>`)}`;
    window.open(testUrl, '_blank');
  };

  // Format opening hours for display
  const formatHoursDisplay = () => {
    const grouped: { [key: string]: string[] } = {};
    formData.openingHours.forEach(h => {
      const key = h.closed ? 'Closed' : `${h.opens} - ${h.closes}`;
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(h.day.slice(0, 3));
    });
    
    return Object.entries(grouped).map(([time, days]) => `${days.join(', ')}: ${time}`).join(' | ');
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] p-8 lg:p-12 shadow-2xl mb-12">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-16 h-16 rounded-2xl bg-[var(--accent-red)] flex items-center justify-center text-white shadow-xl">
            <Code2 className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-black uppercase tracking-tight text-[var(--text-primary)]">LocalBusiness Schema Generator</h2>
            <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">JSON-LD Structured Data</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <div className="space-y-8">
            {/* Business Basics */}
            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-[var(--accent-red)]">Business Information</h3>
              
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-2">Business Type *</label>
                <select
                  value={formData.businessType}
                  onChange={(e) => updateField('businessType', e.target.value)}
                  className="w-full px-4 py-3 bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] rounded-xl text-sm"
                >
                  {BUSINESS_TYPES.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-2">Business Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  placeholder="Your Business Name"
                  className="w-full px-4 py-3 bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => updateField('description', e.target.value)}
                  placeholder="Brief description of your business..."
                  rows={3}
                  maxLength={750}
                  className="w-full px-4 py-3 bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] rounded-xl text-sm resize-none"
                />
                <p className="text-[10px] text-[var(--text-muted)] mt-1">{formData.description.length}/750 characters</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-2">Website URL</label>
                  <input
                    type="url"
                    value={formData.url}
                    onChange={(e) => updateField('url', e.target.value)}
                    placeholder="https://..."
                    className="w-full px-4 py-3 bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-2">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    placeholder="+971-4-1234567"
                    className="w-full px-4 py-3 bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] rounded-xl text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-[var(--accent-red)]">Location</h3>
              
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-2">Street Address</label>
                <input
                  type="text"
                  value={formData.streetAddress}
                  onChange={(e) => updateField('streetAddress', e.target.value)}
                  placeholder="123 Business Street"
                  className="w-full px-4 py-3 bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] rounded-xl text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-2">City</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => updateField('city', e.target.value)}
                    placeholder="Dubai"
                    className="w-full px-4 py-3 bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-2">State/Region</label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => updateField('state', e.target.value)}
                    placeholder="Dubai"
                    className="w-full px-4 py-3 bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] rounded-xl text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-2">Latitude</label>
                  <input
                    type="text"
                    value={formData.latitude}
                    onChange={(e) => updateField('latitude', e.target.value)}
                    placeholder="25.2048"
                    className="w-full px-4 py-3 bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-2">Longitude</label>
                  <input
                    type="text"
                    value={formData.longitude}
                    onChange={(e) => updateField('longitude', e.target.value)}
                    placeholder="55.2708"
                    className="w-full px-4 py-3 bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] rounded-xl text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-black uppercase tracking-widest text-[var(--accent-red)]">Opening Hours</h3>
                <button
                  onClick={setAllWeekdays}
                  className="text-[10px] font-bold text-[var(--accent-red)] hover:underline"
                >
                  Set Mon-Fri 9-6
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                {formData.openingHours.map((hour, index) => (
                  <div key={hour.day} className="flex items-center gap-2 p-2 bg-[var(--bg-primary)] rounded-xl border border-[var(--border-subtle)]">
                    <span className="text-[10px] font-bold w-8">{hour.day.slice(0, 3)}</span>
                    <label className="flex items-center gap-1">
                      <input
                        type="checkbox"
                        checked={hour.closed}
                        onChange={(e) => updateHours(index, 'closed', e.target.checked)}
                        className="rounded"
                      />
                      <span className="text-[9px] text-[var(--text-muted)]">Closed</span>
                    </label>
                    {!hour.closed && (
                      <>
                        <input
                          type="time"
                          value={hour.opens}
                          onChange={(e) => updateHours(index, 'opens', e.target.value)}
                          className="px-1 py-0.5 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded text-[10px] w-20"
                        />
                        <span className="text-[10px]">-</span>
                        <input
                          type="time"
                          value={hour.closes}
                          onChange={(e) => updateHours(index, 'closes', e.target.value)}
                          className="px-1 py-0.5 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded text-[10px] w-20"
                        />
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="space-y-6">
            <div className="sticky top-6">
              {/* Actions */}
              <div className="flex gap-3 mb-4">
                <button
                  onClick={copySchema}
                  className="flex-1 py-3 bg-[var(--accent-red)] text-white font-bold rounded-xl hover:bg-black transition-all flex items-center justify-center gap-2"
                >
                  {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied!' : 'Copy Schema'}
                </button>
                <button
                  onClick={downloadSchema}
                  className="px-4 py-3 bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] rounded-xl hover:border-[var(--accent-red)] transition-all"
                >
                  <Download className="w-4 h-4" />
                </button>
                <button
                  onClick={validateInGoogle}
                  className="px-4 py-3 bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] rounded-xl hover:border-[var(--accent-red)] transition-all"
                  title="Validate in Google"
                >
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>

              {/* Code Preview */}
              <div className="bg-gray-900 rounded-2xl p-6 overflow-auto max-h-[400px]">
                <pre className="text-green-400 text-xs font-mono whitespace-pre-wrap">
                  <span className="text-gray-500">&lt;script type="application/ld+json"&gt;</span>
                  {'\n'}
                  {schemaJSON}
                  {'\n'}
                  <span className="text-gray-500">&lt;/script&gt;</span>
                </pre>
              </div>

              {/* Human Readable Preview */}
              <div className="mt-6 p-6 bg-[var(--bg-primary)] rounded-2xl border border-[var(--border-subtle)]">
                <h4 className="text-xs font-black uppercase tracking-widest text-[var(--text-muted)] mb-4">Preview</h4>
                <div className="space-y-2 text-sm">
                  <p><strong>Type:</strong> {formData.businessType}</p>
                  <p><strong>Name:</strong> {formData.name || '—'}</p>
                  <p><strong>Phone:</strong> {formData.phone || '—'}</p>
                  <p><strong>Address:</strong> {formData.streetAddress ? `${formData.streetAddress}, ${formData.city}` : '—'}</p>
                  <p><strong>Hours:</strong> {formatHoursDisplay()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
