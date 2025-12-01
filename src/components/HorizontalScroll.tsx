// components/HorizontalScroll.tsx
'use client'

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function HorizontalScroll({ projects }: { projects: any[] }) {
  const targetRef = useRef<HTMLDivElement | null>(null);

  // 1. Tentukan tinggi scroll area
  // Rumus: 100vh (untuk view awal) + (40vh * jumlah project)
  // Semakin banyak project, semakin panjang track scroll ke bawahnya
  const dynamicHeight = `${100 + (projects.length * 60)}vh`;

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // 2. Transformasi: Scroll Bawah (Y) -> Gerak Samping (X)
  // "0%" = Awal
  // "-100% + 100vw" = Geser ke kiri sampai ujung kanan konten menyentuh ujung kanan layar
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "calc(-100% + 100vw)"]);

  return (
    <section className="relative bg-background border-t border-white/10">
      
      {/* =========================================
          1. TAMPILAN MOBILE (Vertical List)
          Tetap scroll ke bawah biasa di HP
         ========================================= */}
      <div className="block md:hidden py-16 px-4">
         <div className="mb-12">
            <h2 className="font-syne text-4xl font-bold uppercase text-white mb-2">
               Selected Works
            </h2>
            <div className="w-12 h-1 bg-primary"></div>
         </div>

         <div className="flex flex-col gap-12">
            {projects.map((project, idx) => (
               <MobileCard key={project.id} project={project} index={idx} />
            ))}
         </div>
      </div>


      {/* =========================================
          2. TAMPILAN DESKTOP (Sticky Horizontal)
          Menggunakan tinggi dinamis agar scroll terasa natural
         ========================================= */}
      <div 
        ref={targetRef} 
        style={{ height: dynamicHeight }} 
        className="hidden md:block relative bg-[#0a0a0a]"
      >
         
         {/* Container STICKY: Diam di layar saat user scroll area tinggi */}
         <div className="sticky top-0 flex h-screen items-center overflow-hidden">
            
            {/* Header Text (Fixed Position absolute to sticky container) */}
            <div className="absolute top-8 left-8 z-20 pointer-events-none mix-blend-difference text-white">
               <h2 className="font-syne text-5xl font-bold uppercase leading-none">
                 Selected <span className="text-primary">Works</span>
               </h2>
               <div className="flex items-center gap-2 mt-2 font-mono text-xs text-primary/80">
                  <span className="animate-pulse">↓</span> SCROLL DOWN TO SLIDE
               </div>
            </div>

            {/* TRACKER SLIDER (Bergerak ke samping saat di-scroll ke bawah) */}
            <motion.div style={{ x }} className="flex h-full items-center px-24 gap-12 w-max">
               
               {/* Spacer Awal */}
               <div className="min-w-[20vw] h-full flex items-end pb-24 border-r border-dashed border-white/10 mr-8">
                  <span className="font-mono text-gray-500 -rotate-90 origin-bottom-left translate-x-4 block text-xs tracking-widest">
                     START
                  </span>
               </div>

               {projects.map((project, idx) => (
                 <DesktopCard key={project.id} project={project} index={idx} />
               ))}

               {/* Spacer Akhir (Fin) */}
               <div className="flex items-center justify-center min-w-[400px] h-full border-l border-dashed border-white/10 ml-8">
                   <div className="text-center group">
                     <div className="w-[1px] h-32 bg-primary mx-auto mb-6 group-hover:h-48 transition-all duration-500"></div>
                     <h3 className="font-syne text-4xl text-white font-bold uppercase group-hover:text-primary transition-colors">
                        Fin.
                     </h3>
                     <p className="font-mono text-xs text-gray-500 mt-4 animate-bounce">
                        Keep Scrolling for Footer ↓
                     </p>
                   </div>
               </div>
            </motion.div>

         </div>
      </div>

    </section>
  );
}

// --- DESKTOP CARD ---
function DesktopCard({ project, index }: { project: any, index: number }) {
  return (
    <div className="group relative w-[600px] aspect-[16/10] flex-shrink-0 bg-secondary border border-white/20 hover:border-primary transition-all duration-300 hover:translate-y-[-10px] flex flex-col shadow-lg">
      
      {/* Top Bar */}
      <div className="h-10 border-b border-white/10 bg-black/50 flex items-center px-4 justify-between backdrop-blur-sm">
         <div className="flex gap-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
         </div>
         <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-gray-400">
            PRJ_{index + 1}
         </span>
      </div>

      {/* Image Area */}
      <div className="relative flex-1 overflow-hidden bg-black">
         {project.imageUrl && (
            <img 
               src={project.imageUrl} 
               alt={project.title} 
               className="h-full w-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transform group-hover:scale-110 transition-all duration-700" 
            />
         )}
         <a href={project.link || "#"} target="_blank" className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
             <div className="border border-primary px-6 py-2 bg-black rotate-12 group-hover:rotate-0 transition-transform">
                <span className="font-syne text-2xl font-bold text-primary uppercase">View Project</span>
             </div>
         </a>
      </div>

      {/* Info Area */}
      <div className="p-6 bg-secondary border-t border-white/10">
         <h3 className="font-syne text-2xl font-bold text-white uppercase truncate mb-2">{project.title}</h3>
         <p className="font-mono text-xs text-gray-400 line-clamp-2">{project.description}</p>
      </div>
    </div>
  );
}

// --- MOBILE CARD ---
function MobileCard({ project, index }: { project: any; index: number }) {
   return (
      <a 
        href={project.link || "#"}
        target="_blank"
        className="block w-full bg-[#111] border-2 border-white shadow-hard mb-4 active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-100"
      >
         <div className="h-10 border-b-2 border-white bg-white flex items-center px-4 justify-between">
            <div className="flex gap-2">
               <div className="w-3 h-3 rounded-full bg-primary border border-black"></div>
               <div className="w-3 h-3 rounded-full bg-white border border-black"></div>
            </div>
            <span className="font-mono text-xs font-bold uppercase text-black">PRJ_{index + 1}</span>
         </div>

         <div className="relative aspect-video w-full bg-gray-900 border-b-2 border-white">
             {project.imageUrl ? (
                <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
             ) : (
                <div className="flex items-center justify-center h-full text-xs text-primary font-mono">[NO SIGNAL]</div>
             )}
         </div>

         <div className="p-6 bg-black relative">
            <div className="absolute top-4 right-4 text-primary font-bold text-xl">↗</div>
            <h3 className="font-syne text-2xl font-bold text-white uppercase leading-tight mb-2 pr-6">
               {project.title}
            </h3>
            <p className="font-mono text-xs text-gray-400 leading-relaxed line-clamp-3">
               {project.description}
            </p>
         </div>
      </a>
   )
}