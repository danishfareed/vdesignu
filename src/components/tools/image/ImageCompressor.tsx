import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, Download, X } from 'lucide-react';
import imageCompression from 'browser-image-compression';

interface CompressedImage {
  originalFile: File;
  compressedFile: File;
  previewUrl: string;
  originalSize: number;
  compressedSize: number;
  status: 'pending' | 'processing' | 'done' | 'error';
  compressionRatio: number;
}

const ImageCompressor = () => {
  const [images, setImages] = useState<CompressedImage[]>([]);
  const [quality, setQuality] = useState(0.8);
  const [isProcessing, setIsProcessing] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newImages = acceptedFiles.map(file => ({
      originalFile: file,
      compressedFile: file, // placeholder
      previewUrl: URL.createObjectURL(file), // Create preview from original initially
      originalSize: file.size,
      compressedSize: 0,
      status: 'pending' as const,
      compressionRatio: 0
    }));
    setImages(prev => [...prev, ...newImages]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/webp': []
    }
  });

  const compressImages = async () => {
    setIsProcessing(true);
    const updatedImages = [...images];

    for (let i = 0; i < updatedImages.length; i++) {
      if (updatedImages[i].status === 'done') continue;

      updatedImages[i].status = 'processing';
      setImages([...updatedImages]);

      try {
        const options = {
          maxSizeMB: 1, // Defaulting to 1MB logic for now, but quality controls effective size
          maxWidthOrHeight: 1920,
          useWebWorker: true,
          initialQuality: quality,
        };

        const compressedFile = await imageCompression(updatedImages[i].originalFile, options);
        
        updatedImages[i].compressedFile = compressedFile;
        updatedImages[i].compressedSize = compressedFile.size;
        updatedImages[i].status = 'done';
        updatedImages[i].compressionRatio = Math.round(((updatedImages[i].originalSize - compressedFile.size) / updatedImages[i].originalSize) * 100);
        
        // Update preview to show the compressed version? Or keep original? 
        // Keeping original preview is faster, but we should free memory of old blobs if we change it.
      } catch (error) {
        console.error('Compression ended:', error);
        updatedImages[i].status = 'error';
      }
      setImages([...updatedImages]);
    }
    setIsProcessing(false);
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const downloadImage = (image: CompressedImage) => {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(image.compressedFile);
    
    const mimeType = image.compressedFile.type;
    let extension = 'jpg';
    if (mimeType === 'image/png') extension = 'png';
    else if (mimeType === 'image/webp') extension = 'webp';
    else if (mimeType === 'image/jpeg') extension = 'jpg';
    else {
      extension = image.originalFile.name.split('.').pop() || 'jpg';
    }

    const lastDotIndex = image.originalFile.name.lastIndexOf('.');
    const baseName = lastDotIndex !== -1 
      ? image.originalFile.name.substring(0, lastDotIndex) 
      : image.originalFile.name;
      
    link.download = `${baseName}_vdesignu.${extension}`;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
          <UploadCloud className="w-10 h-10 text-[var(--accent-red)]" />
        </div>
        <h3 className="text-2xl font-black uppercase tracking-tight text-[var(--text-primary)] mb-2">
          Drop Images Here
        </h3>
        <p className="text-[var(--text-secondary)]">
          Supports JPG, PNG, WebP
        </p>
      </div>

      {/* Controls */}
      {images.length > 0 && (
        <div className="bg-[var(--bg-card)] rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 border border-[var(--border-subtle)]">
          <div className="flex-1 w-full space-y-2">
            <div className="flex justify-between text-sm font-bold uppercase tracking-wider">
              <span>Compression Quality</span>
              <span>{Math.round(quality * 100)}%</span>
            </div>
            <input 
              type="range" 
              min="0.1" 
              max="1" 
              step="0.1" 
              value={quality} 
              onChange={(e) => setQuality(parseFloat(e.target.value))}
              className="w-full h-2 bg-[var(--bg-secondary)] rounded-lg appearance-none cursor-pointer accent-[var(--accent-red)]"
            />
          </div>
          <button
            onClick={compressImages}
            disabled={isProcessing}
            className={`px-8 py-3 bg-[var(--accent-red)] text-white font-black uppercase tracking-wider rounded-xl hover:bg-black transition-all
              ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            {isProcessing ? 'Compressing...' : 'Compress All'}
          </button>
        </div>
      )}

      {/* Image List */}
      <div className="grid gap-4">
        {images.map((img, index) => (
          <div key={index} className="bg-[var(--bg-card)] p-4 rounded-xl border border-[var(--border-subtle)] flex items-center gap-4">
            <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-[var(--bg-secondary)]">
              <img src={img.previewUrl} alt="Preview" className="w-full h-full object-cover" />
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-[var(--text-primary)] truncate">{img.originalFile.name}</h4>
              <div className="flex items-center gap-4 mt-1 text-sm">
                <span className="text-[var(--text-muted)] line-through">{formatSize(img.originalSize)}</span>
                {img.compressedSize > 0 && (
                  <>
                    <span className="text-[var(--accent-red)] font-bold">{formatSize(img.compressedSize)}</span>
                    <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-bold">-{img.compressionRatio}%</span>
                  </>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              {img.status === 'done' && (
                <button 
                  onClick={() => downloadImage(img)}
                  className="p-2 hover:bg-[var(--bg-secondary)] rounded-lg text-[var(--accent-red)] transition-colors"
                  title="Download"
                >
                  <Download className="w-5 h-5" />
                </button>
              )}
              <button 
                onClick={() => removeImage(index)}
                className="p-2 hover:bg-[var(--bg-secondary)] rounded-lg text-[var(--text-muted)] transition-colors"
                title="Remove"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageCompressor;
