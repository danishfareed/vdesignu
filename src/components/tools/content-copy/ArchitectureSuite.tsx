/**
 * Content Architecture & Structure Tools
 * Heading Optimizer and Dashboard Planning Wizard
 */
import { useState } from 'react';
import { Type, LayoutDashboard, FileText, CheckCircle, Info, Zap, Layout, ChevronRight, Copy } from 'lucide-react';
import ToolOutput from '../ToolOutput';

export default function ArchitectureSuite() {
  const [tool, setTool] = useState('headings');
  const [headings, setHeadings] = useState('H1: Ultimate Guide to Saudi SEO\nH2: Importance of Arabic Keywords\nH3: Geo-Targeting Riyadh\nH2: Technical Audit Checklist');
  const [output, setOutput] = useState('');

  const auditHeadings = () => {
    const lines = headings.split('\n');
    const structure = lines.map(line => {
      const type = line.split(':')[0].trim().toUpperCase();
      const content = line.split(':')[1]?.trim() || '';
      return { type, content };
    });

    let report = '// Heading Structure Audit\n';
    if (!structure.find(h => h.type === 'H1')) report += '!! Warning: Missing H1 Tag\n';
    
    structure.forEach((h, i) => {
      const indent = '  '.repeat(parseInt(h.type.replace('H', '')) || 1);
      report += `${indent}${h.type}: ${h.content}\n`;
    });

    setOutput(report);
  };

  const generatePlan = () => {
    setOutput('// Executive Dashboard Plan\n// 1. Organic Traffic (Month-over-Month)\n// 2. Conversion Rate by Channel (Search vs Social)\n// 3. Average Position for Top 10 Keywords\n// 4. Core Web Vitals Status (LCP, CLS)');
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Settings Panel */}
        <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] p-10 shadow-2xl">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-14 h-14 rounded-2xl bg-[var(--accent-red)] flex items-center justify-center text-white shadow-xl shadow-red-600/20">
               <Layout className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-black uppercase tracking-tight text-[var(--text-primary)]">Architecture Lab</h3>
              <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Structure & Planning</p>
            </div>
          </div>

          <div className="flex gap-4 p-2 bg-[var(--bg-primary)] rounded-2xl border border-[var(--border-subtle)] mb-8">
             {[
                { id: 'headings', icon: Type, label: 'Headings' },
                { id: 'wizard', icon: LayoutDashboard, label: 'Dashboard' }
             ].map((t) => (
                <button 
                  key={t.id}
                  onClick={() => setTool(t.id)}
                  className={`flex-1 py-3 px-6 rounded-xl text-[10px] font-black uppercase transition-all whitespace-nowrap ${tool === t.id ? 'bg-[var(--accent-red)] text-white shadow-lg' : 'text-[var(--text-muted)]'}`}
                >
                   <t.icon className="w-4 h-4 mx-auto mb-1" /> {t.label}
                </button>
             ))}
          </div>

          <div className="space-y-6">
             {tool === 'headings' ? (
                <>
                   <textarea
                     value={headings}
                     onChange={(e) => setHeadings(e.target.value)}
                     className="w-full px-5 py-3 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl text-xs font-mono"
                     rows={6}
                   />
                   <button 
                     onClick={auditHeadings}
                     className="w-full py-4 bg-[var(--accent-red)] text-white font-black uppercase rounded-2xl"
                   >
                      Validate Hierarchy
                   </button>
                </>
             ) : (
                <button 
                  onClick={generatePlan}
                  className="w-full py-4 bg-[var(--accent-red)] text-white font-black uppercase rounded-2xl"
                >
                   Generate Dashboard Brief
                </button>
             )}
          </div>
        </div>

        {/* Output Panel */}
        <div className="space-y-8">
           <ToolOutput 
             output={output} 
             language="text" 
             title={`${tool.toUpperCase()} Output`}
           />
           
           <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] p-8">
              <div className="flex items-center gap-3 mb-4 text-[var(--accent-red)]">
                 <Type className="w-5 h-5" />
                 <h4 className="text-[10px] font-black uppercase tracking-widest">Semantic Flow</h4>
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed italic">
                 Search engines use heading hierarchy to understand the "Intent" of your content. For VDESIGNU clients, we ensure a logical E-E-A-T flow that satisfies both algorithms and human readers in the MENA region.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
