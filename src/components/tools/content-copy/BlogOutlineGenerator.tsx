/**
 * Blog Post Outline Generator
 * Creates structured blog outlines with headings and sections
 */
import { useState } from 'react';
import { ListTree, Sparkles, Copy, Plus, Trash2 } from 'lucide-react';

export default function BlogOutlineGenerator() {
  const [topic, setTopic] = useState('');
  const [targetKeyword, setTargetKeyword] = useState('');
  const [wordCount, setWordCount] = useState('1500');
  const [outline, setOutline] = useState<{
    title: string;
    introduction: string;
    sections: { heading: string; points: string[] }[];
    conclusion: string;
  } | null>(null);

  const generateOutline = () => {
    const keyword = targetKeyword || topic;
    
    setOutline({
      title: `The Complete Guide to ${topic}: Everything You Need to Know in ${new Date().getFullYear()}`,
      introduction: `Start with a hook about ${topic}. Explain why this matters to your audience. Preview what readers will learn. Include your target keyword "${keyword}" naturally.`,
      sections: [
        {
          heading: `What is ${topic}?`,
          points: [
            `Define ${topic} clearly for beginners`,
            'Explain the core concepts and terminology',
            'Provide real-world examples',
            `Include statistics about ${topic} (cite sources)`
          ]
        },
        {
          heading: `Why ${topic} Matters for Your Business`,
          points: [
            'List 3-5 key benefits',
            'Include case studies or success stories',
            `Connect ${topic} to ROI and business outcomes`,
            'Address common misconceptions'
          ]
        },
        {
          heading: `How to Get Started with ${topic}`,
          points: [
            'Step 1: [First action item]',
            'Step 2: [Second action item]',
            'Step 3: [Third action item]',
            'Provide tools and resources needed',
            'Include estimated time/cost for each step'
          ]
        },
        {
          heading: `${topic} Best Practices`,
          points: [
            'Best practice #1 with explanation',
            'Best practice #2 with explanation',
            'Best practice #3 with explanation',
            'Common mistakes to avoid',
            'Pro tips from experts'
          ]
        },
        {
          heading: `${topic} Tools and Resources`,
          points: [
            'Tool #1: [Name] - Brief description and link',
            'Tool #2: [Name] - Brief description and link',
            'Tool #3: [Name] - Brief description and link',
            'Free vs paid options comparison'
          ]
        },
        {
          heading: `FAQ: Common Questions About ${topic}`,
          points: [
            `What is the best way to ${topic.toLowerCase()}?`,
            `How long does it take to see results from ${topic.toLowerCase()}?`,
            `What are the costs associated with ${topic.toLowerCase()}?`,
            `Is ${topic.toLowerCase()} suitable for small businesses?`
          ]
        }
      ],
      conclusion: `Summarize the key takeaways about ${topic}. Include a clear call-to-action. Reinforce the main benefit. End with a thought-provoking question or next step.`
    });
  };

  const copyOutline = () => {
    if (!outline) return;
    
    let text = `# ${outline.title}\n\n`;
    text += `## Introduction\n${outline.introduction}\n\n`;
    
    outline.sections.forEach((section, i) => {
      text += `## ${section.heading}\n`;
      section.points.forEach(point => {
        text += `- ${point}\n`;
      });
      text += '\n';
    });
    
    text += `## Conclusion\n${outline.conclusion}`;
    
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Input Panel */}
        <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] p-10 shadow-2xl">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-14 h-14 rounded-2xl bg-[var(--accent-red)] flex items-center justify-center text-white shadow-xl">
              <ListTree className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-black uppercase tracking-tight text-[var(--text-primary)]">Blog Outline Generator</h3>
              <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Content Structure Tool</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-2">Blog Topic</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., SEO for Ecommerce, Content Marketing"
                className="w-full px-5 py-4 bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] rounded-2xl text-sm"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-2">Target Keyword</label>
              <input
                type="text"
                value={targetKeyword}
                onChange={(e) => setTargetKeyword(e.target.value)}
                placeholder="Main keyword to optimize for"
                className="w-full px-5 py-4 bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] rounded-2xl text-sm"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-2">Target Word Count</label>
              <select
                value={wordCount}
                onChange={(e) => setWordCount(e.target.value)}
                className="w-full px-5 py-4 bg-[var(--bg-primary)] border-2 border-[var(--border-subtle)] rounded-2xl text-sm"
              >
                <option value="800">800 words (Short)</option>
                <option value="1500">1,500 words (Standard)</option>
                <option value="2500">2,500 words (Long-form)</option>
                <option value="4000">4,000+ words (Pillar Content)</option>
              </select>
            </div>

            <button
              onClick={generateOutline}
              disabled={!topic}
              className="w-full py-4 bg-[var(--accent-red)] text-white font-black uppercase rounded-2xl hover:bg-black transition-all shadow-xl flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Sparkles className="w-5 h-5" /> Generate Outline
            </button>
          </div>
        </div>

        {/* Output Panel */}
        <div className="space-y-6">
          {!outline && (
            <div className="bg-[var(--bg-card)] border-2 border-dashed border-[var(--border-subtle)] rounded-2xl p-8 text-center">
              <p className="text-[var(--text-muted)] text-sm">Enter a topic to generate your blog outline</p>
            </div>
          )}

          {outline && (
            <>
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-black uppercase tracking-widest text-[var(--text-muted)]">Generated Outline</h4>
                <button
                  onClick={copyOutline}
                  className="flex items-center gap-2 px-4 py-2 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl text-[10px] font-bold hover:bg-[var(--accent-red)] hover:text-white transition-all"
                >
                  <Copy className="w-3 h-3" /> Copy as Markdown
                </button>
              </div>

              <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-2xl p-6">
                <h2 className="text-lg font-black text-[var(--text-primary)] mb-4">{outline.title}</h2>
                
                <div className="space-y-4">
                  <div className="p-4 bg-[var(--bg-primary)] rounded-xl">
                    <h3 className="text-xs font-black uppercase text-[var(--accent-red)] mb-2">Introduction</h3>
                    <p className="text-xs text-[var(--text-secondary)] italic">{outline.introduction}</p>
                  </div>

                  {outline.sections.map((section, i) => (
                    <div key={i} className="p-4 bg-[var(--bg-primary)] rounded-xl">
                      <h3 className="text-sm font-black text-[var(--text-primary)] mb-3">{section.heading}</h3>
                      <ul className="space-y-1">
                        {section.points.map((point, j) => (
                          <li key={j} className="text-xs text-[var(--text-secondary)] flex items-start gap-2">
                            <span className="text-[var(--accent-red)]">•</span>
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}

                  <div className="p-4 bg-[var(--bg-primary)] rounded-xl">
                    <h3 className="text-xs font-black uppercase text-[var(--accent-red)] mb-2">Conclusion</h3>
                    <p className="text-xs text-[var(--text-secondary)] italic">{outline.conclusion}</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
