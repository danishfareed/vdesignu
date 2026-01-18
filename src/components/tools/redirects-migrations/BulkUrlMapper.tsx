/**
 * Bulk URL Mapper
 * Maps old URLs to new URLs for migration rules
 * Generates CSV and Redirect Configs
 */
import { useState } from 'react';
import { FileText, Plus, Trash2, Copy, Download, Info, ArrowRight, Table } from 'lucide-react';
import ToolOutput from '../ToolOutput';

export default function BulkUrlMapper() {
  const [mapping, setMapping] = useState([
    { oldPath: '/about-us', newUrl: 'https://vdesignu.com/about' },
    { oldPath: '/contact-us', newUrl: 'https://vdesignu.com/contact' }
  ]);

  const [output, setOutput] = useState('');

  const addRow = () => {
    setMapping([...mapping, { oldPath: '', newUrl: '' }]);
  };

  const removeRow = (index: number) => {
    setMapping(mapping.filter((_, i) => i !== index));
  };

  const updateRow = (index: number, field: string, value: string) => {
    const newMapping = [...mapping];
    (newMapping[index] as any)[field] = value;
    setMapping(newMapping);
  };

  const generateCSV = () => {
    let csv = 'Old Path,New URL\n';
    mapping.forEach(row => {
      if (row.oldPath && row.newUrl) {
        csv += `"${row.oldPath}","${row.newUrl}"\n`;
      }
    });
    setOutput(csv);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-12 gap-8">
        {/* Mapping Panel */}
        <div className="lg:col-span-7 bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[3rem] p-10 shadow-2xl">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-14 h-14 rounded-2xl bg-[var(--accent-red)] flex items-center justify-center text-white shadow-xl shadow-red-600/20">
              <Table className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-black uppercase tracking-tight text-[var(--text-primary)]">URL Mapping</h3>
              <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Bulk Migration Engine</p>
            </div>
          </div>

          <div className="space-y-3">
             {mapping.map((row, index) => (
                <div key={index} className="flex gap-2 items-center">
                   <input
                     type="text"
                     value={row.oldPath}
                     onChange={(e) => updateRow(index, 'oldPath', e.target.value)}
                     placeholder="/old-path"
                     className="w-1/2 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl py-2 px-4 text-xs font-bold"
                   />
                   <ArrowRight className="w-4 h-4 text-[var(--text-muted)] flex-shrink-0" />
                   <input
                     type="url"
                     value={row.newUrl}
                     onChange={(e) => updateRow(index, 'newUrl', e.target.value)}
                     placeholder="https://vdesignu.com/new"
                     className="flex-1 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl py-2 px-4 text-xs"
                   />
                   <button onClick={() => removeRow(index)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                      <Trash2 className="w-4 h-4" />
                   </button>
                </div>
             ))}
          </div>

          <div className="flex gap-4 mt-8">
             <button 
               onClick={addRow}
               className="flex-1 py-4 border-2 border-dashed border-[var(--border-subtle)] rounded-2xl text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] hover:border-[var(--accent-red)] transition-all flex items-center justify-center gap-2"
             >
                <Plus className="w-4 h-4" /> Add Row
             </button>
             <button 
               onClick={generateCSV}
               className="flex-1 py-4 bg-[var(--accent-red)] text-white text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-black transition-all shadow-xl"
             >
                Generate CSV
             </button>
          </div>
        </div>

        {/* Output Panel */}
        <div className="lg:col-span-12 xl:col-span-5 space-y-8">
           <ToolOutput 
             output={output} 
             language="text" 
             title="Migration CSV"
           />
           
           <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-[2.5rem] p-8">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-[var(--text-primary)] mb-4 flex items-center gap-2">
                 <FileText className="w-4 h-4 text-[var(--accent-red)]" /> Import Instructions
              </h4>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed italic">
                 Download this CSV to use with professional migration plugins like Redirection (WordPress) or import it into your custom CMS router. For VDESIGNU enterprise clients, this mapping is the first step in any successful site relaunch.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
