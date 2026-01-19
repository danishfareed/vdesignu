import React, { useState } from 'react';
import { Smartphone, Instagram, Linkedin, Twitter, Facebook, Youtube } from 'lucide-react';

const DATA = {
    'Instagram': {
        icon: Instagram,
        color: 'text-pink-500',
        sizes: [
            { name: 'Profile Picture', w: 320, h: 320, desc: 'Displayed as a circle. Upload square.' },
            { name: 'Feed Post (Square)', w: 1080, h: 1080, desc: 'The classic format. Aspect ratio 1:1.' },
            { name: 'Feed Post (Portrait)', w: 1080, h: 1350, desc: 'Occupies more screen space. Ratio 4:5.' },
            { name: 'Stories', w: 1080, h: 1920, desc: 'Full screen vertical. Ratio 9:16.' },
            { name: 'Reels', w: 1080, h: 1920, desc: 'Same dimensions as Stories. Avoid text at bottom.' },
        ]
    },
    'LinkedIn': {
        icon: Linkedin,
        color: 'text-blue-700',
        sizes: [
            { name: 'Profile Picture', w: 400, h: 400, desc: 'Professional headshot recommended.' },
            { name: 'Cover Photo', w: 1584, h: 396, desc: 'Banner at top of profile. Ratio 4:1.' },
            { name: 'Company Logo', w: 300, h: 300, desc: 'Logo for company pages.' },
            { name: 'Post Image', w: 1200, h: 627, desc: 'Standard link share image. Ratio 1.91:1.' },
            { name: 'Article Header', w: 2000, h: 600, desc: 'Cover for Pulse articles.' },
        ]
    },
    'Twitter / X': {
        icon: Twitter,
        color: 'text-black',
        sizes: [
            { name: 'Profile Picture', w: 400, h: 400, desc: 'Circular display.' },
            { name: 'Header Photo', w: 1500, h: 500, desc: 'Responsive header. Keep key info centered.' },
            { name: 'In-Stream Post', w: 1600, h: 900, desc: 'Standard single image. Ratio 16:9.' },
        ]
    },
    'Facebook': {
        icon: Facebook,
        color: 'text-blue-600',
        sizes: [
            { name: 'Profile Picture', w: 170, h: 170, desc: 'Displayed circular on ads/posts.' },
            { name: 'Cover Photo', w: 851, h: 315, desc: 'Page header. Mobile displays center 640x360.' },
            { name: 'Shared Image', w: 1200, h: 630, desc: 'Standard timeline post. Ratio 1.91:1.' },
            { name: 'Event Cover', w: 1920, h: 1005, desc: 'Cover for Facebook Events.' },
        ]
    },
    'YouTube': {
        icon: Youtube,
        color: 'text-red-600',
        sizes: [
            { name: 'Channel Icon', w: 800, h: 800, desc: 'Your channel avatar.' },
            { name: 'Channel Art (Banner)', w: 2560, h: 1440, desc: 'Safe area for text/logos: 1235x338 centered.' },
            { name: 'Video Thumbnail', w: 1280, h: 720, desc: 'The most important image. Ratio 16:9.' },
        ]
    }
};

const SocialMediaSizes = () => {
    const [activePlatform, setActivePlatform] = useState<keyof typeof DATA>('Instagram');

    return (
        <div className="space-y-8">
            {/* Sidebar / Tabs */}
            <div className="flex flex-wrap gap-4 justify-center">
                {Object.entries(DATA).map(([name, data]) => {
                    const Icon = data.icon;
                    return (
                        <button
                            key={name}
                            onClick={() => setActivePlatform(name as keyof typeof DATA)}
                            className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all
                                ${activePlatform === name 
                                    ? 'bg-black text-white shadow-lg scale-105' 
                                    : 'bg-[var(--bg-secondary)] text-[var(--text-muted)] hover:bg-[var(--bg-card)]'}`}
                        >
                            <Icon className={`w-5 h-5 ${activePlatform === name ? 'text-white' : data.color}`} />
                            {name}
                        </button>
                    )
                })}
            </div>

            {/* Content Table */}
            <div className="bg-[var(--bg-card)] rounded-3xl border border-[var(--border-subtle)] overflow-hidden">
                <div className="p-6 bg-[var(--bg-secondary)] border-b border-[var(--border-subtle)] flex items-center gap-3">
                     {React.createElement(DATA[activePlatform].icon, { className: `w-8 h-8 ${DATA[activePlatform].color}` })}
                     <h3 className="text-2xl font-black tracking-tight">{activePlatform} Size Guide</h3>
                </div>

                <div className="divide-y divide-[var(--border-subtle)]">
                    {DATA[activePlatform].sizes.map((item, idx) => (
                        <div key={idx} className="p-6 hover:bg-[var(--bg-secondary)] transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <h4 className="font-bold text-lg text-[var(--text-primary)]">{item.name}</h4>
                                <p className="text-sm text-[var(--text-secondary)]">{item.desc}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="text-right">
                                    <div className="font-mono font-bold text-xl">{item.w} x {item.h} px</div>
                                    <div className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">Dimensions</div>
                                </div>
                                <div className="hidden md:block w-px h-10 bg-[var(--border-subtle)]"></div>
                                <div className="w-16 h-16 bg-[var(--bg-secondary)] rounded-lg border border-[var(--border-subtle)] flex items-center justify-center relative overflow-hidden group">
                                     <div 
                                        className="bg-[var(--accent-red)] opacity-20 absolute"
                                        style={{
                                            width: item.w > item.h ? '80%' : `${(item.w/item.h)*50}%`,
                                            height: item.h > item.w ? '80%' : `${(item.h/item.w)*50}%`,
                                            aspectRatio: `${item.w}/${item.h}`
                                        }}
                                     ></div>
                                     <div className="z-10 text-[10px] font-bold opacity-50">{item.w}:{item.h}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-yellow-500/10 p-6 rounded-2xl border border-yellow-500/20 text-yellow-700 dark:text-yellow-400">
                <p className="font-bold text-sm">💡 Pro Tip:</p>
                <p className="text-sm mt-1">
                    Social media algorithms often compress images aggressively. 
                    We recommend exporting as <strong>JPG</strong> at <strong>80-90% quality</strong>, or using PNG for graphics with text to keep edges sharp. 
                    Use our <a href="/tools/image-tools/image-compressor" className="underline hover:text-black dark:hover:text-white">Image Compressor</a> to optimize before uploading.
                </p>
            </div>
        </div>
    );
};

export default SocialMediaSizes;
