// components/HorizontalScroll.tsx
'use client'

import { useRef, useEffect, useState } from "react";
import { motion, useTransform, useSpring, useMotionValue } from "framer-motion";

export default function HorizontalScroll({ projects }: { projects: any[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  
  const [constraints, setConstraints] = useState(0);

  const x = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 150, damping: 20, mass: 0.5 });

  useEffect(() => {
    const handleResize = () => {
      // Cek apakah elemen desktop ada (tidak hidden)
      if (trackRef.current && containerRef.current && window.innerWidth >= 768) {
        const totalWidth = trackRef.current.scrollWidth - containerRef.current.offsetWidth;
        setConstraints(totalWidth + 100);
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
      // Jika layar mobile, jangan jalankan logic ini
      if (window.innerWidth < 768) return;

      const currentX = x.get();
      let newX = currentX - evt.deltaY;
      
      if (newX > 0) newX = 0;
      if (newX < -constraints) newX = -constraints;

      const isAtStart = currentX >= 0 && evt.deltaY < 0;
      const isAtEnd = currentX <= -constraints && evt.deltaY > 0;

      if (isAtStart || isAtEnd) return; 

      evt.preventDefault();
      x.set(newX);
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [constraints, x]);

  return (
    <section 
      ref={containerRef} 
      className="relative h-[100vh] bg-[#0a0a0a] overflow-hidden border-t border-white/20"
    >
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
       {/* Decorative Header (Fixed Position inside section) */}
       <div className="absolute top-8 left-8 z-20 pointer-events-none mix-blend-difference text-white hidden md:block">
          <h2 className="font-syne text-5xl font-bold uppercase leading-none">
            Selected Works
          </h2>
          <div className="flex items-center gap-2 mt-2 font-mono text-xs text-[#0066F7]">
             <span className="animate-pulse">↔</span> SCROLL TO NAVIGATE
          </div>
       </div>

      <div ref={containerRef} className="hidden md:block h-[100vh] overflow-hidden relative">
        {/* TRACKER SLIDER (Bergerak berdasarkan nilai smoothX) */}
      <motion.div 
        ref={trackRef}
        style={{ x: smoothX }} // Framer Motion magic happens here
        className="flex h-full  items-center px-8 md:px-24 gap-12 w-max cursor-grab active:cursor-grabbing"
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
              <div className="w-[1px] h-32 bg-[#0066F7] mx-auto mb-6 group-hover:h-48 transition-all duration-500"></div>
              <h3 className="font-syne text-4xl text-white font-bold uppercase mb-2 group-hover:text-[#0066F7] transition-colors">
                 End of List
              </h3>
              <p className="font-mono text-gray-500 text-sm animate-bounce mt-4">
                 Scroll Down to Exit ↓
              </p>
            </div>
        </div>

      </motion.div>
      </div>
    </section>
  );
}

// Design Card (Tetap Bold & Indie)
function ProjectCard({ project, index }: { project: any, index: number }) {
  return (
    <div className="group relative w-[85vw] md:w-[600px] aspect-[16/10] flex-shrink-0 bg-[#111] border-2 border-white shadow-hard transition-all duration-300 hover:shadow-none hover:translate-x-2 hover:translate-y-2 flex flex-col">
      
      {/* Top Bar */}
      <div className="h-10 border-b-2 border-[white] bg-white flex items-center px-4 justify-between">
         <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#0066F7] border border-black"></div>
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
            <div className="flex h-full w-full items-center justify-center font-mono text-[#0066F7] text-xs">[NO SIGNAL]</div>
         )}
         
         {/* Center Text Hover */}
         <a href={project.link || "#"} target="_blank" className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
             <span className="font-syne text-6xl font-bold text-[#0066F7] uppercase tracking-tighter hover:scale-110 transition-transform">
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

function MobileCard({ project, index }: { project: any, index: number }) {
   return (
      <div className="w-full bg-secondary border border-white/20 overflow-hidden shadow-hard hover:shadow-none transition-all">
         
         {/* Mobile Header */}
         <div className="flex justify-between items-center px-4 py-3 border-b border-white/10 bg-black">
            <span className="font-syne text-lg font-bold text-white uppercase truncate max-w-[70%]">
               {project.title}
            </span>
            <span className="font-mono text-xs text-primary">No. {index + 1}</span>
         </div>

         {/* Mobile Image */}
         <div className="relative aspect-video w-full bg-gray-900">
             {project.imageUrl ? (
                <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover grayscale-0" />
             ) : (
                <div className="flex items-center justify-center h-full text-xs text-gray-500 font-mono">NO IMAGE</div>
             )}
         </div>

         {/* Mobile Content */}
         <div className="p-5">
            <p className="font-mono text-sm text-gray-400 mb-6 leading-relaxed">
               {project.description}
            </p>
            {project.link && (
               <a href={project.link} target="_blank" className="block w-full text-center py-3 border border-primary text-primary font-bold uppercase text-sm hover:bg-primary hover:text-black transition-colors">
                  View Project
               </a>
            )}
         </div>
      </div>
   )
}