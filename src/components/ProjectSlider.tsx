// components/HorizontalScroll.tsx
'use client'

import { useRef, useEffect, useState } from "react";
import { motion, useTransform, useSpring, useMotionValue } from "framer-motion";

export default function HorizontalScroll({ projects }: { projects: any[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  
  // State untuk menyimpan batas maksimal scroll (total lebar konten - lebar layar)
  const [constraints, setConstraints] = useState(0);

  // Motion Value untuk posisi X (Horizontal)
  const x = useMotionValue(0);
  
  // Spring membuat scroll terasa smooth (ada efek membal dikit biar enak)
  const smoothX = useSpring(x, { stiffness: 150, damping: 20, mass: 0.5 });

  // Hitung lebar konten saat komponen di-load atau resize
  useEffect(() => {
    const handleResize = () => {
      if (trackRef.current && containerRef.current) {
        // Rumus: Total Panjang Track - Lebar Layar Browser
        // Kita tambah sedikit buffer (+ 100) biar spacer akhir kelihatan jelas
        const totalWidth = trackRef.current.scrollWidth - containerRef.current.offsetWidth;
        setConstraints(totalWidth);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [projects]);

  // Logic Utama: Menangani Scroll Mouse
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (evt: WheelEvent) => {
      // Ambil posisi X saat ini (nilai negatif karena geser ke kiri)
      const currentX = x.get();
      
      // Hitung target posisi berikutnya berdasarkan scroll user
      // (evt.deltaY adalah seberapa cepat user scroll roda mouse)
      let newX = currentX - evt.deltaY;

      // BATAS KIRI (Awal): Tidak boleh lebih dari 0
      if (newX > 0) {
        newX = 0;
      }
      
      // BATAS KANAN (Akhir): Tidak boleh lebih kecil dari -constraints
      if (newX < -constraints) {
        newX = -constraints;
      }

      // LOGIKA EXIT:
      // Cek apakah kita sudah mentok di ujung kiri atau ujung kanan?
      const isAtStart = currentX >= 0 && evt.deltaY < 0; // Mau scroll ke atas di posisi awal
      const isAtEnd = currentX <= -constraints && evt.deltaY > 0; // Mau scroll ke bawah di posisi akhir

      if (isAtStart || isAtEnd) {
        // JIKA SUDAH MENTOK: Jangan preventDefault(). 
        // Biarkan browser melakukan tugasnya (Scroll halaman ke atas/bawah)
        return; 
      }

      // JIKA BELUM MENTOK: Bajak scroll untuk geser slider
      evt.preventDefault();
      x.set(newX);
    };

    // { passive: false } wajib biar bisa preventDefault
    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [constraints, x]); // Dependency penting

  return (
    <section 
      ref={containerRef} 
      className="relative h-[100vh] bg-[#0a0a0a] overflow-hidden border-t border-white/20"
    >
       {/* Decorative Header (Fixed Position inside section) */}
       <div className="absolute top-8 left-8 z-20 pointer-events-none mix-blend-difference text-white hidden md:block">
          <h2 className="font-syne text-5xl font-bold uppercase leading-none">
            Selected Works
          </h2>
          <div className="flex items-center gap-2 mt-2 font-mono text-xs text-lime-400">
             <span className="animate-pulse">↔</span> SCROLL TO NAVIGATE
          </div>
       </div>

      {/* TRACKER SLIDER (Bergerak berdasarkan nilai smoothX) */}
      <motion.div 
        ref={trackRef}
        style={{ x: smoothX }} // Framer Motion magic happens here
        className="flex h-full items-center px-8 md:px-24 gap-12 w-max cursor-grab active:cursor-grabbing"
      >
        
        {/* Spacer Awal */}
        <div className="min-w-[15vw] md:min-w-[25vw] h-full flex items-end pb-24 border-r border-dashed border-white/10 mr-12">
           <span className="font-mono text-gray-600 -rotate-90 origin-bottom-left translate-x-4 block text-xs">
              START_GALLERY
           </span>
        </div>

        {/* Project Cards */}
        {projects.map((project, idx) => (
          <ProjectCard key={project.id} project={project} index={idx} />
        ))}

        {/* END CARD (Spacer Akhir) */}
        <div className="flex items-center justify-center min-w-[400px] h-full relative">
            <div className="text-center group cursor-default">
              <div className="w-[1px] h-32 bg-lime-400 mx-auto mb-6 group-hover:h-48 transition-all duration-500"></div>
              <h3 className="font-syne text-4xl text-white font-bold uppercase mb-2 group-hover:text-lime-400 transition-colors">
                 End of List
              </h3>
              <p className="font-mono text-gray-500 text-sm animate-bounce mt-4">
                 Scroll Down to Exit ↓
              </p>
            </div>
        </div>

      </motion.div>
    </section>
  );
}

// Design Card (Tetap Bold & Indie)
function ProjectCard({ project, index }: { project: any, index: number }) {
  return (
    <div className="group relative w-[85vw] md:w-[600px] aspect-[16/10] flex-shrink-0 bg-[#111] border-2 border-white shadow-hard transition-all duration-300 hover:shadow-none hover:translate-x-2 hover:translate-y-2 flex flex-col">
      
      {/* Top Bar */}
      <div className="h-10 border-b-2 border-white bg-white flex items-center px-4 justify-between">
         <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-lime-500 border border-black"></div>
            <div className="w-3 h-3 rounded-full bg-white border border-black"></div>
         </div>
         <span className="font-mono text-xs font-bold uppercase tracking-widest text-black">
            PRJ_{index + 1}
         </span>
      </div>

      {/* Image Area */}
      <div className="relative flex-1 overflow-hidden bg-gray-900">
         {project.imageUrl ? (
            <img 
              src={project.imageUrl} 
              alt={project.title} 
              className="h-full w-full object-cover grayscale group-hover:grayscale-0 transform group-hover:scale-110 transition-all duration-700" 
            />
         ) : (
            <div className="flex h-full w-full items-center justify-center font-mono text-lime-400 text-xs">[NO SIGNAL]</div>
         )}
         
         {/* Center Text Hover */}
         <a href={project.link || "#"} target="_blank" className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
             <span className="font-syne text-6xl font-bold text-lime-400 uppercase tracking-tighter hover:scale-110 transition-transform">
                OPEN
             </span>
         </a>
      </div>

      {/* Info Area */}
      <div className="p-6 border-t-2 border-white bg-black">
         <h3 className="font-syne text-3xl font-bold text-white uppercase truncate">{project.title}</h3>
         <p className="font-mono text-xs text-gray-400 line-clamp-1 mt-1">{project.description}</p>
      </div>
    </div>
  );
}