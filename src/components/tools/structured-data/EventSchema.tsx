/**
 * Event Schema JSON-LD Generator
 * Generates structured data for conferences, webinars, and live events
 */
import { useState } from 'react';
import { Calendar, Plus, Trash2, Copy, Download, MapPin, Globe, Info } from 'lucide-react';
import ToolOutput from '../ToolOutput';

export default function EventSchema() {
  const [formData, setFormData] = useState({
    name: '',
    startDate: '',
    endDate: '',
    eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    locationName: '',
    locationUrl: '',
    description: '',
    organizerName: 'VDesignU',
    organizerUrl: 'https://vdesignu.com',
    offersPrice: '',
    offersCurrency: 'AED'
  });

  const [output, setOutput] = useState('');

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateSchema = () => {
    const schema: any = {
      "@context": "https://schema.org",
      "@type": "Event",
      "name": formData.name || "Event Name",
      "startDate": formData.startDate,
      "endDate": formData.endDate,
      "eventAttendanceMode": formData.eventAttendanceMode,
      "eventStatus": formData.eventStatus,
      "description": formData.description,
      "organizer": {
        "@type": "Organization",
        "name": formData.organizerName,
        "url": formData.organizerUrl
      }
    };

    if (formData.eventAttendanceMode === 'https://schema.org/OnlineEventAttendanceMode') {
      schema.location = {
        "@type": "VirtualLocation",
        "url": formData.locationUrl || formData.organizerUrl
      };
    } else {
      schema.location = {
        "@type": "Place",
        "name": formData.locationName,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Street Address",
          "addressLocality": "City",
          "addressRegion": "Region",
          "postalCode": "00000",
          "addressCountry": "AE"
        }
      };
    }

    if (formData.offersPrice) {
      schema.offers = {
        "@type": "Offer",
        "price": formData.offersPrice,
        "priceCurrency": formData.offersCurrency,
        "url": formData.locationUrl,
        "availability": "https://schema.org/InStock",
        "validFrom": new Date().toISOString().split('T')[0]
      };
    }

    setOutput(JSON.stringify(schema, null, 2));
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Input Panel */}
        <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] p-10 shadow-2xl">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-14 h-14 rounded-2xl bg-[var(--accent-red)] flex items-center justify-center text-white shadow-xl shadow-red-600/20">
              <Calendar className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-black uppercase tracking-tight text-[var(--text-primary)]">Event Details</h3>
              <p className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest">Attendance & Ticketing</p>
            </div>
          </div>

          <div className="space-y-6">
             <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3 ml-1">Event Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  placeholder="e.g. Dubai SEO Summit 2024"
                  className="w-full px-6 py-4 bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] rounded-2xl text-[var(--text-primary)] font-bold focus:border-[var(--accent-red)] focus:outline-none transition-all"
                />
             </div>

             <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3 ml-1">Start Date/Time</label>
                   <input
                     type="datetime-local"
                     value={formData.startDate}
                     onChange={(e) => updateField('startDate', e.target.value)}
                     className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl text-[var(--text-primary)] font-bold focus:border-[var(--accent-red)] focus:outline-none"
                   />
                </div>
                <div>
                   <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3 ml-1">End Date/Time</label>
                   <input
                     type="datetime-local"
                     value={formData.endDate}
                     onChange={(e) => updateField('endDate', e.target.value)}
                     className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl text-[var(--text-primary)] font-bold focus:border-[var(--accent-red)] focus:outline-none"
                   />
                </div>
             </div>

             <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3 ml-1">Event Type</label>
                   <select
                     value={formData.eventAttendanceMode}
                     onChange={(e) => updateField('eventAttendanceMode', e.target.value)}
                     className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl text-[var(--text-primary)] font-bold focus:border-[var(--accent-red)] focus:outline-none"
                   >
                      <option value="https://schema.org/OnlineEventAttendanceMode">Online (Webinar)</option>
                      <option value="https://schema.org/OfflineEventAttendanceMode">In-Person (Physical)</option>
                      <option value="https://schema.org/MixedEventAttendanceMode">Hybrid (Mixed)</option>
                   </select>
                </div>
                <div>
                   <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3 ml-1">Event Status</label>
                   <select
                     value={formData.eventStatus}
                     onChange={(e) => updateField('eventStatus', e.target.value)}
                     className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl text-[var(--text-primary)] font-bold focus:border-[var(--accent-red)] focus:outline-none"
                   >
                      <option value="https://schema.org/EventScheduled">Scheduled</option>
                      <option value="https://schema.org/EventCancelled">Cancelled</option>
                      <option value="https://schema.org/EventMovedOnline">Moved Online</option>
                      <option value="https://schema.org/EventPostponed">Postponed</option>
                   </select>
                </div>
             </div>

             {formData.eventAttendanceMode !== 'https://schema.org/OnlineEventAttendanceMode' ? (
                <div>
                   <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3 ml-1">Venue Name</label>
                   <input
                     type="text"
                     value={formData.locationName}
                     onChange={(e) => updateField('locationName', e.target.value)}
                     placeholder="e.g. Dubai World Trade Centre"
                     className="w-full px-6 py-4 bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] rounded-2xl text-[var(--text-primary)] font-bold focus:border-[var(--accent-red)] focus:outline-none transition-all"
                   />
                </div>
             ) : (
                <div>
                   <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3 ml-1">Streaming/Webinar URL</label>
                   <input
                     type="url"
                     value={formData.locationUrl}
                     onChange={(e) => updateField('locationUrl', e.target.value)}
                     placeholder="https://zoom.us/j/..."
                     className="w-full px-6 py-4 bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] rounded-2xl text-[var(--text-primary)] font-bold focus:border-[var(--accent-red)] focus:outline-none transition-all"
                   />
                </div>
             )}

             <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3 ml-1">Price (numeric)</label>
                   <input
                     type="number"
                     value={formData.offersPrice}
                     onChange={(e) => updateField('offersPrice', e.target.value)}
                     placeholder="299"
                     className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl text-[var(--text-primary)] font-bold focus:border-[var(--accent-red)] focus:outline-none"
                   />
                </div>
                <div>
                   <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3 ml-1">Currency</label>
                   <select
                     value={formData.offersCurrency}
                     onChange={(e) => updateField('offersCurrency', e.target.value)}
                     className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl text-[var(--text-primary)] font-bold focus:border-[var(--accent-red)] focus:outline-none"
                   >
                      <option value="AED">AED</option>
                      <option value="SAR">SAR</option>
                      <option value="USD">USD</option>
                   </select>
                </div>
             </div>

             <button
                onClick={generateSchema}
                className="w-full py-6 bg-[var(--accent-red)] text-white font-black italic uppercase tracking-tighter text-2xl rounded-2xl hover:bg-black transition-all active:scale-[0.98] shadow-2xl shadow-red-600/20"
             >
                Generate Event Schema
             </button>
          </div>
        </div>

        {/* Output Panel */}
        <div className="space-y-8">
           <ToolOutput 
             output={output} 
             language="json" 
             title="Event Structured Data"
           />
           
           <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] p-8 space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-[var(--accent-red)] flex items-center gap-2">
                 <Info className="w-4 h-4" /> Live in Search
              </h4>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed italic">
                 Event schema makes your event eligible to appear in the <strong>Google Event Experience</strong>, a dedicated search result box that shows dates, locations, and direct links to tickets.
              </p>
              <div className="flex items-center gap-2 p-4 bg-yellow-50 dark:bg-yellow-900/10 rounded-xl border border-yellow-200 dark:border-yellow-900/30">
                 <MapPin className="w-4 h-4 text-yellow-600 flex-shrink-0" />
                 <p className="text-[10px] text-yellow-800 dark:text-yellow-200 font-bold uppercase tracking-tight">
                    GCC Tip: Uses standard ISO address formats.
                 </p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
