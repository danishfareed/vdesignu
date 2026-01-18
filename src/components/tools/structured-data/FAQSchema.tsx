/**
 * FAQ Schema Generator
 * Generates FAQPage JSON-LD structured data
 */
import { useState } from 'react';
import ToolOutput from '../ToolOutput';
import { Plus, Trash2, HelpCircle, GripVertical } from 'lucide-react';

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export default function FAQSchema() {
  const [faqs, setFaqs] = useState<FAQ[]>([
    { id: '1', question: '', answer: '' }
  ]);
  const [output, setOutput] = useState('');

  const addFAQ = () => {
    setFaqs([...faqs, { 
      id: Date.now().toString(), 
      question: '', 
      answer: '' 
    }]);
  };

  const removeFAQ = (id: string) => {
    if (faqs.length > 1) {
      setFaqs(faqs.filter(faq => faq.id !== id));
    }
  };

  const updateFAQ = (id: string, field: 'question' | 'answer', value: string) => {
    setFaqs(faqs.map(faq => 
      faq.id === id ? { ...faq, [field]: value } : faq
    ));
  };

  const generateSchema = () => {
    const validFaqs = faqs.filter(faq => faq.question.trim() && faq.answer.trim());
    
    if (validFaqs.length === 0) {
      setOutput('Please add at least one FAQ with both question and answer.');
      return;
    }

    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": validFaqs.map(faq => ({
        "@type": "Question",
        "name": faq.question.trim(),
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer.trim()
        }
      }))
    };

    setOutput(JSON.stringify(schema, null, 2));
  };

  const isValid = faqs.some(faq => faq.question.trim() && faq.answer.trim());

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Input Form */}
      <div className="space-y-6">
        <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-3xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-black uppercase tracking-tight text-[var(--text-primary)] flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-[var(--accent-red)]" />
              FAQ Items
            </h3>
            <span className="px-3 py-1 bg-[var(--accent-red)]/10 text-[var(--accent-red)] text-xs font-black rounded-lg">
              {faqs.filter(f => f.question && f.answer).length} Valid
            </span>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div 
                key={faq.id} 
                className="bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-2xl p-6 relative group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <GripVertical className="w-4 h-4 text-[var(--text-muted)]" />
                    <span className="text-xs font-black uppercase tracking-wider text-[var(--text-muted)]">
                      FAQ #{index + 1}
                    </span>
                  </div>
                  {faqs.length > 1 && (
                    <button
                      onClick={() => removeFAQ(faq.id)}
                      className="p-2 text-[var(--text-muted)] hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">
                      Question *
                    </label>
                    <input
                      type="text"
                      value={faq.question}
                      onChange={(e) => updateFAQ(faq.id, 'question', e.target.value)}
                      placeholder="What is your return policy?"
                      className="w-full px-4 py-3 bg-[var(--bg-secondary)] border-2 border-[var(--border-subtle)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:border-[var(--accent-red)] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">
                      Answer *
                    </label>
                    <textarea
                      value={faq.answer}
                      onChange={(e) => updateFAQ(faq.id, 'answer', e.target.value)}
                      placeholder="Our return policy allows returns within 30 days of purchase..."
                      rows={3}
                      className="w-full px-4 py-3 bg-[var(--bg-secondary)] border-2 border-[var(--border-subtle)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:border-[var(--accent-red)] focus:outline-none transition-colors resize-none"
                    />
                  </div>
                </div>

                {/* Validation indicator */}
                {faq.question && faq.answer && (
                  <div className="absolute top-4 right-14 w-3 h-3 rounded-full bg-green-500"></div>
                )}
              </div>
            ))}
          </div>

          {/* Add FAQ Button */}
          <button
            onClick={addFAQ}
            className="w-full mt-6 py-4 border-2 border-dashed border-[var(--border-subtle)] rounded-2xl text-[var(--text-muted)] font-bold uppercase tracking-wider text-sm hover:border-[var(--accent-red)] hover:text-[var(--accent-red)] transition-all flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Another FAQ
          </button>
        </div>

        {/* Generate Button */}
        <button
          onClick={generateSchema}
          disabled={!isValid}
          className="w-full py-5 bg-[var(--accent-red)] text-white font-black italic uppercase tracking-tighter text-xl rounded-2xl hover:bg-black transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-red-600/20"
        >
          Generate FAQ Schema
        </button>

        {/* Tips */}
        <div className="bg-[var(--accent-yellow)]/10 border border-[var(--accent-yellow)]/30 rounded-2xl p-6">
          <h4 className="font-black uppercase tracking-tight text-[var(--text-primary)] mb-3 flex items-center gap-2">
            <span className="text-[var(--accent-yellow)]">💡</span> Best Practices
          </h4>
          <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
            <li>• Keep questions concise and natural sounding</li>
            <li>• Provide detailed, helpful answers</li>
            <li>• Include keywords naturally in questions</li>
            <li>• Aim for 3-10 FAQs per page</li>
            <li>• Answers can include HTML formatting</li>
          </ul>
        </div>
      </div>

      {/* Output Panel */}
      <div className="lg:sticky lg:top-32 self-start">
        <ToolOutput 
          output={output} 
          language="json" 
          filename="faq-schema"
          title="FAQPage JSON-LD"
        />

        {/* Preview */}
        {output && !output.startsWith('Please') && (
          <div className="mt-6 bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-3xl p-6">
            <h4 className="text-sm font-black uppercase tracking-wider text-[var(--text-primary)] mb-4">
              SERP Preview
            </h4>
            <div className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
              <div className="space-y-3">
                {faqs.filter(f => f.question && f.answer).slice(0, 3).map((faq, i) => (
                  <div key={faq.id} className="border-b border-gray-100 dark:border-gray-800 pb-3 last:border-0">
                    <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-1">
                      {faq.question}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-gray-400 mt-3">
                * This is an approximation of how FAQs might appear in Google search results
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
