/**
 * GCC Multi-Country VAT Calculator
 * Calculates VAT for UAE, KSA, Bahrain, and Oman with different rates
 */
import { useState } from 'react';
import { Calculator, Globe, DollarSign, ArrowRight } from 'lucide-react';

const GCC_VAT_RATES = [
  { country: 'UAE', rate: 5, currency: 'AED', flag: '🇦🇪' },
  { country: 'Saudi Arabia', rate: 15, currency: 'SAR', flag: '🇸🇦' },
  { country: 'Bahrain', rate: 10, currency: 'BHD', flag: '🇧🇭' },
  { country: 'Oman', rate: 5, currency: 'OMR', flag: '🇴🇲' },
  { country: 'Qatar', rate: 0, currency: 'QAR', flag: '🇶🇦' },
  { country: 'Kuwait', rate: 0, currency: 'KWD', flag: '🇰🇼' }
];

export default function GCCMultiVATCalculator() {
  const [amount, setAmount] = useState<number>(1000);
  const [selectedCountry, setSelectedCountry] = useState('UAE');
  const [isInclusive, setIsInclusive] = useState(false);

  const getCountryData = () => GCC_VAT_RATES.find(c => c.country === selectedCountry) || GCC_VAT_RATES[0];

  const calculateVAT = () => {
    const { rate, currency } = getCountryData();
    if (isInclusive) {
      const netAmount = amount / (1 + rate / 100);
      const vatAmount = amount - netAmount;
      return { netAmount, vatAmount, total: amount, currency, rate };
    } else {
      const vatAmount = amount * (rate / 100);
      const total = amount + vatAmount;
      return { netAmount: amount, vatAmount, total, currency, rate };
    }
  };

  const result = calculateVAT();
  const countryData = getCountryData();

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Calculator Panel */}
        <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] p-10 shadow-2xl">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-14 h-14 rounded-2xl bg-[var(--accent-red)] flex items-center justify-center text-white shadow-xl">
              <Globe className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-black uppercase tracking-tight text-[var(--text-primary)]">GCC VAT Calculator</h3>
              <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Multi-Country Tax Engine</p>
            </div>
          </div>

          {/* Country Selection */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            {GCC_VAT_RATES.map((country) => (
              <button
                key={country.country}
                onClick={() => setSelectedCountry(country.country)}
                className={`p-4 rounded-2xl border-2 transition-all ${
                  selectedCountry === country.country
                    ? 'bg-[var(--accent-red)] border-[var(--accent-red)] text-white'
                    : 'bg-[var(--bg-primary)] border-[var(--border-subtle)] text-[var(--text-primary)]'
                }`}
              >
                <div className="text-2xl mb-1">{country.flag}</div>
                <div className="text-[10px] font-black uppercase">{country.country}</div>
                <div className="text-xs font-bold opacity-75">{country.rate}% VAT</div>
              </button>
            ))}
          </div>

          {/* Amount Input */}
          <div className="space-y-6">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-2">
                Amount ({countryData.currency})
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                className="w-full px-6 py-4 bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] rounded-2xl text-2xl font-black text-[var(--text-primary)]"
              />
            </div>

            {/* Inclusive/Exclusive Toggle */}
            <div className="flex gap-4">
              <button
                onClick={() => setIsInclusive(false)}
                className={`flex-1 py-4 rounded-2xl font-black uppercase text-sm transition-all ${
                  !isInclusive
                    ? 'bg-[var(--accent-red)] text-white'
                    : 'bg-[var(--bg-primary)] text-[var(--text-muted)] border border-[var(--border-subtle)]'
                }`}
              >
                VAT Exclusive
              </button>
              <button
                onClick={() => setIsInclusive(true)}
                className={`flex-1 py-4 rounded-2xl font-black uppercase text-sm transition-all ${
                  isInclusive
                    ? 'bg-[var(--accent-red)] text-white'
                    : 'bg-[var(--bg-primary)] text-[var(--text-muted)] border border-[var(--border-subtle)]'
                }`}
              >
                VAT Inclusive
              </button>
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="space-y-8">
          <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] p-10">
            <h4 className="text-xs font-black uppercase tracking-widest text-[var(--text-muted)] mb-8">Calculation Results</h4>
            
            <div className="space-y-6">
              <div className="flex justify-between items-center p-4 bg-[var(--bg-primary)] rounded-2xl">
                <span className="text-sm text-[var(--text-muted)]">Net Amount</span>
                <span className="text-xl font-black text-[var(--text-primary)]">
                  {result.currency} {result.netAmount.toFixed(2)}
                </span>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-[var(--bg-primary)] rounded-2xl">
                <span className="text-sm text-[var(--text-muted)]">VAT ({result.rate}%)</span>
                <span className="text-xl font-black text-[var(--accent-red)]">
                  {result.currency} {result.vatAmount.toFixed(2)}
                </span>
              </div>
              
              <div className="flex justify-between items-center p-6 bg-[var(--accent-red)] rounded-2xl text-white">
                <span className="text-sm font-bold">Total Amount</span>
                <span className="text-3xl font-black">
                  {result.currency} {result.total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] p-8">
            <h4 className="text-xs font-black uppercase tracking-widest text-[var(--text-primary)] mb-4">
              {countryData.flag} {selectedCountry} VAT Info
            </h4>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              {selectedCountry === 'Saudi Arabia' 
                ? 'KSA increased VAT to 15% in July 2020. All businesses with annual revenue above SAR 375,000 must register.'
                : selectedCountry === 'Bahrain'
                ? 'Bahrain doubled VAT from 5% to 10% in January 2022. Registration threshold is BHD 37,500.'
                : selectedCountry === 'Qatar' || selectedCountry === 'Kuwait'
                ? 'This country has not yet implemented VAT. Check for updates on future implementation.'
                : 'Standard VAT rate applies to most goods and services. Some items may be zero-rated or exempt.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
