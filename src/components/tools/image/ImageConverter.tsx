import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { RefreshCw, Trash } from 'lucide-react';

interface ConversionItem {
  file: File;
  preview: string;
  status: 'pending' | 'converting' | 'done' | 'error';
  convertedBlob?: Blob;
  outputFormat: string;
}

const ImageConverter = () => {
  const [items, setItems] = useState<ConversionItem[]>([]);
  const [globalFormat, setGlobalFormat] = useState('image/webp');
  const [isProcessing, setIsProcessing] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newItems = acceptedFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      status: 'pending' as const,
      outputFormat: globalFormat
    }));
    setItems(prev => [...prev, ...newItems]);
  }, [globalFormat]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': []
    }
  });

  const convertFile = async (item: ConversionItem): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return reject('No canvas context');
        
        // Fill white background for transparent PNG to JPG conversion
        if (item.outputFormat === 'image/jpeg') {
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        
        ctx.drawImage(img, 0, 0);
        
        canvas.toBlob((blob) => {
          if (blob) resolve(blob);
          else reject('Conversion failed');
        }, item.outputFormat, 0.92);
      };
      img.onerror = reject;
      img.src = item.preview;
    });
  };

  const processConversions = async () => {
    setIsProcessing(true);
    const newItems = [...items];

    for (let i = 0; i < newItems.length; i++) {
      if (newItems[i].status === 'done') continue;
      
      newItems[i].status = 'converting';
      // Sync local format with global if pending
      newItems[i].outputFormat = globalFormat; 
      setItems([...newItems]);

      try {
        const blob = await convertFile(newItems[i]);
        newItems[i].convertedBlob = blob;
        newItems[i].status = 'done';
      } catch (err) {
        console.error(err);
        newItems[i].status = 'error';
      }
      setItems([...newItems]);
    }
    setIsProcessing(false);
  };

  const downloadItem = (item: ConversionItem) => {
    if (!item.convertedBlob) return;
    const link = document.createElement('a');
    link.href = URL.createObjectURL(item.convertedBlob);
    
    // Better extension handling
    let ext = item.outputFormat.split('/')[1] || 'webp';
    if (ext === 'jpeg') ext = 'jpg';
    
    // Better name handling
    const lastDotIndex = item.file.name.lastIndexOf('.');
    const baseName = lastDotIndex !== -1 
      ? item.file.name.substring(0, lastDotIndex) 
      : item.file.name;
      
    link.download = `${baseName}_vdesignu.${ext}`;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const removeIndex = (idx: number) => {
    setItems(prev => prev.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-8">
       {/* Upload Area */}
       <div 
        {...getRootProps()} 
        className={`border-3 border-dashed rounded-[2rem] p-12 text-center transition-all cursor-pointer
          ${isDragActive 
            ? 'border-[var(--accent-red)] bg-[var(--accent-red)]/5 scale-[0.99]' 
            : 'border-[var(--border-subtle)] hover:border-[var(--accent-red)] hover:bg-[var(--bg-card)]'
          }`}
      >
        <input {...getInputProps()} />
        <div className="w-20 h-20 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center mx-auto mb-6">
          <RefreshCw className="w-10 h-10 text-[var(--accent-red)]" />
        </div>
        <h3 className="text-2xl font-black uppercase tracking-tight text-[var(--text-primary)] mb-2">
          Convert Images
        </h3>
        <p className="text-[var(--text-secondary)]">
          Drop any image here to convert
        </p>
      </div>

      {/* Controls */}
      {items.length > 0 && (
        <div className="bg-[var(--bg-card)] rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 border border-[var(--border-subtle)]">
            <div className="flex items-center gap-4">
                <span className="font-bold uppercase tracking-wider text-sm">Convert to:</span>
                <select 
                    value={globalFormat}
                    onChange={(e) => setGlobalFormat(e.target.value)}
                    className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-lg px-4 py-2 font-bold focus:outline-none focus:border-[var(--accent-red)]"
                >
                    <option value="image/webp">WebP (Best for Web)</option>
                    <option value="image/png">PNG (Transparent)</option>
                    <option value="image/jpeg">JPG (Smallest)</option>
                </select>
            </div>
            <button
                onClick={processConversions}
                disabled={isProcessing}
                className="px-8 py-3 bg-[var(--accent-red)] text-white font-black uppercase tracking-wider rounded-xl hover:bg-black transition-all"
            >
                {isProcessing ? 'Converting...' : 'Convert All'}
            </button>
        </div>
      )}

      {/* List */}
      <div className="grid gap-4">
        {items.map((item, i) => (
             <div key={i} className="bg-[var(--bg-card)] p-4 rounded-xl border border-[var(--border-subtle)] flex items-center gap-4">
                <img src={item.preview} className="w-16 h-16 rounded-lg object-cover bg-gray-100" />
                <div className="flex-1">
                    <div className="font-bold truncate">{item.file.name}</div>
                    <div className="text-xs text-[var(--text-muted)] uppercase mt-1">
                        {item.file.type.split('/')[1]} → {item.outputFormat.split('/')[1]}
                    </div>
                </div>
                {item.status === 'done' && (
                    <button 
                        onClick={() => downloadItem(item)}
                        className="px-4 py-2 bg-[var(--bg-secondary)] hover:bg-[var(--accent-red)] hover:text-white rounded-lg font-bold text-sm transition-colors"
                    >
                        Download
                    </button>
                )}
                 <button 
                    onClick={() => removeIndex(i)}
                    className="p-2 hover:bg-red-100 text-[var(--text-muted)] hover:text-red-500 rounded-lg transition-colors"
                >
                    <Trash className="w-5 h-5" />
                </button>
             </div>
        ))}
      </div>
    </div>
  );
};

export default ImageConverter;
