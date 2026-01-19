import React, { useState, useCallback, useRef } from 'react';
import ReactCrop, { type Crop, type PixelCrop, centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, Crop as CropIcon, Download, RotateCw } from 'lucide-react';

function centerAspectCrop(mediaWidth: number, mediaHeight: number, aspect: number) {
  return centerCrop(
    makeAspectCrop(
      { unit: '%', width: 90 },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  );
}

const ImageCropper = () => {
    const [imgSrc, setImgSrc] = useState('');
    const [crop, setCrop] = useState<Crop>();
    const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
    const [aspect, setAspect] = useState<number | undefined>(undefined);
    const imgRef = useRef<HTMLImageElement>(null);
    const [rotation, setRotation] = useState(0);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles && acceptedFiles.length > 0) {
            setCrop(undefined); // Reset crop
            const reader = new FileReader();
            reader.addEventListener('load', () => setImgSrc(reader.result?.toString() || ''));
            reader.readAsDataURL(acceptedFiles[0]);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': [] },
        multiple: false
    });

    const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
        if (aspect) {
            const { width, height } = e.currentTarget;
            setCrop(centerAspectCrop(width, height, aspect));
        }
    };

    const handleAspectChange = (value: number | undefined) => {
        setAspect(value);
        if (imgRef.current && value) {
             const { width, height } = imgRef.current;
             setCrop(centerAspectCrop(width, height, value));
        } else if (imgRef.current) {
             // Free crop
             setCrop(undefined);
        }
    };
    
    const rotateImage = () => {
        setRotation(prev => (prev + 90) % 360);
    };

    const getCroppedImg = async () => {
        if (!completedCrop || !imgRef.current) return;
        
        const image = imgRef.current;
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        
        // This implementation handles simple cropping. Rotation support requires more complex canvas transforms.
        // For MVP we handle cropping of the visible image.
        
        const pixelRatio = window.devicePixelRatio;
        canvas.width = completedCrop.width * scaleX * pixelRatio;
        canvas.height = completedCrop.height * scaleY * pixelRatio;
        
        ctx.scale(pixelRatio, pixelRatio);
        ctx.imageSmoothingQuality = 'high';
        
        const cropX = completedCrop.x * scaleX;
        const cropY = completedCrop.y * scaleY;
        const cropWidth = completedCrop.width * scaleX;
        const cropHeight = completedCrop.height * scaleY;
        
        ctx.drawImage(
          image,
          cropX,
          cropY,
          cropWidth,
          cropHeight,
          0,
          0,
          cropWidth,
          cropHeight,
        );
        
        canvas.toBlob((blob) => {
            if (!blob) return;
            const previewUrl = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = previewUrl;
            link.download = `cropped-image.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }, 'image/png');
    };

    return (
        <div className="space-y-8">
            {!imgSrc ? (
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
                   Drop an Image to Crop
                 </h3>
                 <p className="text-[var(--text-secondary)]">
                   JPG, PNG, WebP supported
                 </p>
               </div>
            ) : (
                <div className="space-y-6">
                     <div className="bg-[var(--bg-card)] rounded-2xl p-6 border border-[var(--border-subtle)] flex flex-wrap gap-4 items-center justify-between">
                         <div className="flex gap-2">
                             {[undefined, 1/1, 16/9, 4/3, 2/1].map((ratio) => (
                                 <button
                                     key={String(ratio)}
                                     onClick={() => handleAspectChange(ratio)}
                                     className={`px-4 py-2 rounded-lg text-sm font-bold uppercase transition-colors
                                         ${aspect === ratio 
                                            ? 'bg-[var(--accent-red)] text-white' 
                                            : 'bg-[var(--bg-secondary)] text-[var(--text-primary)] hover:bg-[var(--border-subtle)]'
                                         }`}
                                 >
                                     {ratio === undefined ? 'Free' : ratio === 1 ? 'Square' : ratio === 16/9 ? '16:9' : ratio === 4/3 ? '4:3' : '2:1'}
                                 </button>
                             ))}
                         </div>

                        <div className="flex gap-2">
                            <button
                                onClick={() => setImgSrc('')}
                                className="px-6 py-2 bg-[var(--bg-secondary)] rounded-lg font-bold hover:bg-gray-200"
                            >
                                New Image
                            </button>
                             <button
                                onClick={getCroppedImg}
                                className="px-6 py-2 bg-[var(--accent-red)] text-white rounded-lg font-bold flex items-center gap-2 hover:bg-black"
                            >
                                <Download className="w-4 h-4" /> Download Crop
                            </button>
                        </div>
                     </div>

                    <div className="bg-[var(--bg-card)] p-4 rounded-xl border border-[var(--border-subtle)] overflow-hidden flex justify-center">
                        <ReactCrop 
                            crop={crop} 
                            onChange={(_, percentCrop) => setCrop(percentCrop)} 
                            onComplete={(c) => setCompletedCrop(c)}
                            aspect={aspect}
                            className="max-h-[70vh]"
                        >
                            <img ref={imgRef} alt="Crop me" src={imgSrc} onLoad={onImageLoad} style={{ maxHeight: '70vh' }} />
                        </ReactCrop>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageCropper;
