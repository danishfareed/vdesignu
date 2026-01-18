/**
 * LocalBusiness Schema Generator
 * Generates JSON-LD structured data for local businesses
 */
import { useState } from 'react';
import ToolOutput from '../ToolOutput';

interface OpeningHours {
  day: string;
  opens: string;
  closes: string;
  closed: boolean;
}

const defaultHours: OpeningHours[] = [
  { day: 'Monday', opens: '09:00', closes: '18:00', closed: false },
  { day: 'Tuesday', opens: '09:00', closes: '18:00', closed: false },
  { day: 'Wednesday', opens: '09:00', closes: '18:00', closed: false },
  { day: 'Thursday', opens: '09:00', closes: '18:00', closed: false },
  { day: 'Friday', opens: '09:00', closes: '18:00', closed: false },
  { day: 'Saturday', opens: '10:00', closes: '16:00', closed: false },
  { day: 'Sunday', opens: '10:00', closes: '16:00', closed: true },
];

export default function LocalBusinessSchema() {
  // Form state
  const [businessName, setBusinessName] = useState('');
  const [businessType, setBusinessType] = useState('LocalBusiness');
  const [description, setDescription] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [region, setRegion] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('AE');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [logo, setLogo] = useState('');
  const [image, setImage] = useState('');
  const [priceRange, setPriceRange] = useState('$$');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [hours, setHours] = useState<OpeningHours[]>(defaultHours);
  
  // Output state
  const [output, setOutput] = useState('');

  const businessTypes = [
    'LocalBusiness',
    'Restaurant',
    'Store',
    'MedicalBusiness',
    'LegalService',
    'FinancialService',
    'RealEstateAgent',
    'AutoRepair',
    'BeautySalon',
    'DaySpa',
    'Dentist',
    'Electrician',
    'FoodEstablishment',
    'GasStation',
    'GroceryStore',
    'HairSalon',
    'HealthClub',
    'Hotel',
    'InsuranceAgency',
    'Locksmith',
    'Notary',
    'Plumber',
    'ProfessionalService',
    'TravelAgency',
  ];

  const updateHours = (index: number, field: keyof OpeningHours, value: string | boolean) => {
    const newHours = [...hours];
    newHours[index] = { ...newHours[index], [field]: value };
    setHours(newHours);
  };

  const generateSchema = () => {
    const openingHours = hours
      .filter(h => !h.closed)
      .map(h => ({
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": h.day,
        "opens": h.opens,
        "closes": h.closes
      }));

    const schema: any = {
      "@context": "https://schema.org",
      "@type": businessType,
      "name": businessName,
    };

    if (description) schema.description = description;
    
    if (streetAddress || city) {
      schema.address = {
        "@type": "PostalAddress",
        "streetAddress": streetAddress,
        "addressLocality": city,
        "addressRegion": region,
        "postalCode": postalCode,
        "addressCountry": country
      };
    }

    if (phone) schema.telephone = phone;
    if (email) schema.email = email;
    if (website) schema.url = website;
    if (logo) schema.logo = logo;
    if (image) schema.image = image;
    if (priceRange) schema.priceRange = priceRange;
    
    if (latitude && longitude) {
      schema.geo = {
        "@type": "GeoCoordinates",
        "latitude": parseFloat(latitude),
        "longitude": parseFloat(longitude)
      };
    }

    if (openingHours.length > 0) {
      schema.openingHoursSpecification = openingHours;
    }

    setOutput(JSON.stringify(schema, null, 2));
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Input Form */}
      <div className="space-y-6">
        {/* Basic Info */}
        <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-3xl p-8">
          <h3 className="text-lg font-black uppercase tracking-tight text-[var(--text-primary)] mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-[var(--accent-red)] flex items-center justify-center text-white text-sm">1</span>
            Basic Information
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">
                Business Name *
              </label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="Your Business Name"
                className="w-full px-4 py-3 bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:border-[var(--accent-red)] focus:outline-none transition-colors"
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">
                Business Type
              </label>
              <select
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
                className="w-full px-4 py-3 bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] rounded-xl text-[var(--text-primary)] focus:border-[var(--accent-red)] focus:outline-none transition-colors cursor-pointer"
              >
                {businessTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description of your business..."
                rows={3}
                className="w-full px-4 py-3 bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:border-[var(--accent-red)] focus:outline-none transition-colors resize-none"
              />
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-3xl p-8">
          <h3 className="text-lg font-black uppercase tracking-tight text-[var(--text-primary)] mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-[var(--accent-red)] flex items-center justify-center text-white text-sm">2</span>
            Address & Location
          </h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">
                Street Address
              </label>
              <input
                type="text"
                value={streetAddress}
                onChange={(e) => setStreetAddress(e.target.value)}
                placeholder="123 Business Street"
                className="w-full px-4 py-3 bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:border-[var(--accent-red)] focus:outline-none transition-colors"
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">
                City
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Dubai"
                className="w-full px-4 py-3 bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:border-[var(--accent-red)] focus:outline-none transition-colors"
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">
                Region/State
              </label>
              <input
                type="text"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                placeholder="Dubai"
                className="w-full px-4 py-3 bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:border-[var(--accent-red)] focus:outline-none transition-colors"
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">
                Postal Code
              </label>
              <input
                type="text"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                placeholder="00000"
                className="w-full px-4 py-3 bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:border-[var(--accent-red)] focus:outline-none transition-colors"
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">
                Country Code
              </label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="AE"
                maxLength={2}
                className="w-full px-4 py-3 bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:border-[var(--accent-red)] focus:outline-none transition-colors uppercase"
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">
                Latitude
              </label>
              <input
                type="text"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                placeholder="25.2048"
                className="w-full px-4 py-3 bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:border-[var(--accent-red)] focus:outline-none transition-colors"
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">
                Longitude
              </label>
              <input
                type="text"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                placeholder="55.2708"
                className="w-full px-4 py-3 bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:border-[var(--accent-red)] focus:outline-none transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-3xl p-8">
          <h3 className="text-lg font-black uppercase tracking-tight text-[var(--text-primary)] mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-[var(--accent-red)] flex items-center justify-center text-white text-sm">3</span>
            Contact & Media
          </h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+971 4 123 4567"
                  className="w-full px-4 py-3 bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:border-[var(--accent-red)] focus:outline-none transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="info@business.com"
                  className="w-full px-4 py-3 bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:border-[var(--accent-red)] focus:outline-none transition-colors"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">
                Website URL
              </label>
              <input
                type="url"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="https://www.yourbusiness.com"
                className="w-full px-4 py-3 bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:border-[var(--accent-red)] focus:outline-none transition-colors"
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">
                Logo URL
              </label>
              <input
                type="url"
                value={logo}
                onChange={(e) => setLogo(e.target.value)}
                placeholder="https://www.yourbusiness.com/logo.png"
                className="w-full px-4 py-3 bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:border-[var(--accent-red)] focus:outline-none transition-colors"
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">
                Price Range
              </label>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full px-4 py-3 bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] rounded-xl text-[var(--text-primary)] focus:border-[var(--accent-red)] focus:outline-none transition-colors cursor-pointer"
              >
                <option value="$">$ (Inexpensive)</option>
                <option value="$$">$$ (Moderate)</option>
                <option value="$$$">$$$ (Expensive)</option>
                <option value="$$$$">$$$$ (Very Expensive)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Opening Hours */}
        <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-3xl p-8">
          <h3 className="text-lg font-black uppercase tracking-tight text-[var(--text-primary)] mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-[var(--accent-red)] flex items-center justify-center text-white text-sm">4</span>
            Opening Hours
          </h3>
          
          <div className="space-y-3">
            {hours.map((day, index) => (
              <div key={day.day} className="flex items-center gap-4">
                <div className="w-24 text-sm font-medium text-[var(--text-primary)]">{day.day}</div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={day.closed}
                    onChange={(e) => updateHours(index, 'closed', e.target.checked)}
                    className="w-4 h-4 rounded border-2 border-[var(--border-subtle)] text-[var(--accent-red)] focus:ring-[var(--accent-red)]"
                  />
                  <span className="text-xs text-[var(--text-muted)]">Closed</span>
                </label>
                {!day.closed && (
                  <>
                    <input
                      type="time"
                      value={day.opens}
                      onChange={(e) => updateHours(index, 'opens', e.target.value)}
                      className="px-3 py-2 bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] rounded-lg text-sm text-[var(--text-primary)] focus:border-[var(--accent-red)] focus:outline-none"
                    />
                    <span className="text-[var(--text-muted)]">to</span>
                    <input
                      type="time"
                      value={day.closes}
                      onChange={(e) => updateHours(index, 'closes', e.target.value)}
                      className="px-3 py-2 bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] rounded-lg text-sm text-[var(--text-primary)] focus:border-[var(--accent-red)] focus:outline-none"
                    />
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={generateSchema}
          disabled={!businessName}
          className="w-full py-5 bg-[var(--accent-red)] text-white font-black italic uppercase tracking-tighter text-xl rounded-2xl hover:bg-black transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-red-600/20"
        >
          Generate Schema
        </button>
      </div>

      {/* Output Panel */}
      <div className="lg:sticky lg:top-32 self-start">
        <ToolOutput 
          output={output} 
          language="json" 
          filename="localbusiness-schema"
          title="LocalBusiness JSON-LD"
        />
      </div>
    </div>
  );
}
