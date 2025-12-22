// components/ServiceShowcase.tsx
'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'

type PortfolioItem = {
  id: number;
  src: string;
  alt: string;
}

type ServiceItem = {
  id: string;
  titleEn: string;
  titleId: string;
  descEn: string;
  descId: string;
  tags: string[];
  portfolio: PortfolioItem[];
}

const SERVICES_DATA: ServiceItem[] = [
  {
    id: '01',
    titleId: 'Cetak MMT & Banner',
    titleEn: 'MMT & Banner Print',
    descId: 'Cetak spanduk ukuran besar dengan kualitas tajam. Tahan cuaca outdoor.',
    descEn: 'Large format printing with sharp quality. Weatherproof for outdoor use.',
    tags: ['Flexi 280gr', 'Flexi 440gr', 'X-Banner', 'Spanduk'],
    portfolio: [
      { id: 1, src: 'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?q=80&w=800', alt: 'Banner' },
      { id: 2, src: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800', alt: 'Backdrop' },
      { id: 3, src: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=800', alt: 'Roll Banner' },
      { id: 4, src: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800', alt: 'Billboard' },
    ]
  },
  {
    id: '02',
    titleId: 'Desain & Branding',
    titleEn: 'Design & Branding',
    descId: 'Desain logo, brosur, dan identitas visual yang profesional.',
    descEn: 'brochures, and professional visual identity.',
    tags: ['Brochure', 'Company Profile', 'Packaging'],
    portfolio: [
      { id: 5, src: 'https://images.unsplash.com/photo-1626785774573-4b799314347d?q=80&w=800', alt: 'Logo' },
      { id: 6, src: 'https://images.unsplash.com/photo-1586717791821-3f44a5638d48?q=80&w=800', alt: 'Brochure' },
      { id: 7, src: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800', alt: 'Social Media' },
    ]
  },
  {
    id: '03',
    titleId: 'Web Development',
    titleEn: 'Web Development',
    descId: 'Website landing page dan toko online yang cepat.',
    descEn: 'Fast landing pages and online stores.',
    tags: ['Landing Page', 'Next.js', 'SEO', 'E-Commerce'],
    portfolio: [
      { id: 8, src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800', alt: 'Web Corp' },
      { id: 9, src: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800', alt: 'Online Shop' },
    ]
  }
];

export default function ServiceShowcase() {
  const { lang } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section className="py-12">
      <div className="flex flex-col gap-32">
        {SERVICES_DATA.map((service, index) => {
          const isEven = index % 2 === 0;

          return (
            <div 
              key={service.id} 
              className={`flex flex-col lg:flex-row gap-8 lg:gap-16 items-start ${isEven ? '' : 'lg:flex-row-reverse'}`}
            >
              
              {/* BAGIAN TEKS */}
              <div className="w-full lg:w-1/2 space-y-6">
                 <div className="flex items-center gap-3 mb-2">
                    <span className="font-mono text-4xl font-bold text-[#0066F7] stroke-text">
                       {service.id}
                    </span>
                    <div className="h-[2px] w-20 bg-primary"></div>
                 </div>

                 <h2 className="font-syne text-4xl md:text-5xl font-bold text-white uppercase leading-none">
                    {lang === 'id' ? service.titleId : service.titleEn}
                 </h2>

                 <p className="font-mono text-gray-400 text-sm leading-relaxed border-l-2 border-white/20 pl-4">
                    {lang === 'id' ? service.descId : service.descEn}
                 </p>

                 <div className="flex flex-wrap gap-2 pt-4">
                    {service.tags.map(tag => (
                       <span key={tag} className="px-3 py-1 border border-white/30 rounded-full text-[10px] uppercase tracking-widest text-primary hover:bg-primary hover:text-black transition-colors cursor-default">
                          {tag}
                       </span>
                    ))}
                 </div>
              </div>

              {/* BAGIAN SLIDER PORTFOLIO (YANG DIUPDATE) */}
              <div className="w-full lg:w-1/2 relative">
                 <div className={`absolute inset-0 border-2 border-dashed border-white/20 translate-x-4 translate-y-4 -z-10 ${isEven ? '-rotate-2' : 'rotate-2'}`}></div>

                 <div className="bg-[#111] border-2 border-white shadow-hard p-4">
                    <div className="flex items-center justify-between mb-4 border-b border-white/20 pb-2">
                       <span className="text-xs font-bold uppercase text-white">Project Gallery</span>
                       <span className="text-[10px] font-mono text-primary animate-pulse">DRAG TO SLIDE ↔</span>
                    </div>

                    {/* --- DI SINI PERUBAHANNYA: KITA PANGGIL COMPONENT BARU --- */}
                    <PortfolioSlider 
                      items={service.portfolio} 
                      onImageClick={setSelectedImage} 
                    />

                 </div>
              </div>

            </div>
          )
        })}
      </div>

      {/* MODAL POPUP */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div 
               initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }}
               className="relative max-w-5xl w-full max-h-[90vh]"
               onClick={(e) => e.stopPropagation()}
            >
               <button 
                 onClick={() => setSelectedImage(null)}
                 className="absolute -top-10 right-0 text-white hover:text-primary font-bold uppercase text-sm"
               >
                 [CLOSE X]
               </button>
               <img src={selectedImage} alt="Full Preview" className="w-full h-full object-contain border-2 border-white shadow-hard" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

// --- SUB COMPONENT BARU: PORTFOLIO SLIDER (DRAGGABLE) ---
function PortfolioSlider({ items, onImageClick }: { items: PortfolioItem[], onImageClick: (src: string) => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  // Hitung batas drag (lebar konten total - lebar container)
  useEffect(() => {
    if(containerRef.current) {
      // scrollWidth = panjang total konten, offsetWidth = lebar layar yang terlihat
      setWidth(containerRef.current.scrollWidth - containerRef.current.offsetWidth);
    }
  }, [items]);

  return (
    // Outer div: Jendela (overflow hidden)
    <motion.div ref={containerRef} className="overflow-hidden cursor-grab active:cursor-grabbing">
      
      {/* Inner div: Track panjang yang bisa di-drag */}
      <motion.div 
        drag="x" 
        dragConstraints={{ right: 0, left: -width }}
        className="flex gap-4 w-max"
      >
        {items.map((item) => (
          <div 
            key={item.id} 
            className="w-[250px] aspect-[4/3] relative group"
            onPointerUp={(e) => {
               onImageClick(item.src)
            }}
          >
              <img 
                src={item.src} 
                alt={item.alt} 
                loading="lazy"
                fetchPriority="low"
                decoding="async"
                className="w-full h-full object-cover border border-white/20 group-hover:grayscale-0 grayscale transition-all duration-500 pointer-events-none" // pointer-events-none penting biar gambar ga ke-drag browser
              />
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                <div className="bg-black text-primary text-xs font-bold px-2 py-1 uppercase">View</div>
              </div>
          </div>
        ))}
      </motion.div>
    </motion.div>
  )
}