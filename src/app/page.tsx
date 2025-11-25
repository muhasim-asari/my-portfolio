// app/page.tsx
import Link from "next/link";
import { getProjects } from "./actions";
import FadeIn from "../components/FadeIn";
import Marquee from "../components/Marquee";

export default async function Home() {
  const allProjects = await getProjects();
  
  // Pisahkan project Featured dan Regular
  const featuredProjects = allProjects.filter(p => p.featured);
  const regularProjects = allProjects.filter(p => !p.featured);

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#ededed] relative overflow-hidden font-mono selection:bg-lime-400 selection:text-black">
      
      {/* NOISE OVERLAY */}
      <div className="fixed inset-0 z-50 pointer-events-none bg-noise opacity-40 mix-blend-overlay"></div>

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-40 px-6 py-6 flex justify-between items-center mix-blend-difference text-white">
        <div className="font-syne font-extrabold text-2xl tracking-tighter hover:text-lime-400 cursor-pointer transition-colors uppercase">
          ASIM<span className="text-lime-400">.</span>DEV
        </div>
        <div className="flex gap-4 items-center">
            <Link href="#contact" className="hidden md:block font-bold text-sm uppercase hover:text-lime-400 transition-colors">Contact</Link>
            <Link href="/admin" className="border-2 border-white px-6 py-2 rounded-full hover:bg-white hover:text-black transition-all font-bold text-sm uppercase">
            Menu
            </Link>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex flex-col justify-center px-4 pt-20">
        
        {/* Dekorasi Abstrak */}
        <div className="absolute top-20 right-10 w-32 h-32 border-2 border-dashed border-white/20 rounded-full animate-spin-slow duration-[10s]"></div>
        
        <div className="max-w-7xl mx-auto w-full z-10">
          <FadeIn direction="up" delay={0.1}>
            <p className="text-lime-400 font-bold mb-4 tracking-widest uppercase text-sm border-l-2 border-lime-400 pl-4">
              Frontend Web Developer
            </p>
          </FadeIn>
          
          <FadeIn direction="up" delay={0.2}>
            {/* Nama Besar */}
            <h1 className="font-syne text-[12vw] xl:text-[14vw] leading-[0.8] font-extrabold uppercase text-white mix-blend-difference">
              MUH. ASIM <br />
              <span className="text-transparent stroke-text hover:text-lime-400 transition-all duration-500" style={{ WebkitTextStroke: '2px white' }}>
                AS'ARI
              </span>
            </h1>
          </FadeIn>

          <div className="mt-12 flex flex-col md:flex-row gap-8 items-start md:items-center">
             <FadeIn delay={0.4}>
                <p className="max-w-xl text-gray-400 text-lg leading-relaxed">
                   Seorang pengembang web yang antusias membangun situs web yang responsif dan ramah pengguna. 
                   Spesialis dalam ekosistem JavaScript modern.
                </p>
             </FadeIn>
             
             <FadeIn delay={0.5}>
                <div className="relative group">
                   <div className="absolute inset-0 bg-lime-400 translate-x-2 translate-y-2 rounded-none transition-transform group-hover:translate-x-1 group-hover:translate-y-1"></div>
                   <Link 
                      href="#projects"
                      className="relative block border-2 border-white bg-black px-8 py-4 text-xl font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors"
                   >
                      Lihat Karya
                   </Link>
                </div>
             </FadeIn>
          </div>
        </div>

        {/* Sticker Tahun */}
        <div className="absolute bottom-10 right-10 rotate-12 hidden md:block">
           <div className="bg-white text-black p-4 font-bold text-center border-2 border-black shadow-hard transform hover:scale-110 transition-transform cursor-pointer">
              WEB DEV <br/> EXPERT
           </div>
        </div>
      </section>

      {/* MARQUEE SKILLS (Disesuaikan dengan skill kamu) */}
      <div className="py-12 bg-[#0a0a0a]">
        <Marquee text="HTML5 & CSS3  ★  JAVASCRIPT (ES6+)  ★  REACT JS  ★  TAILWIND CSS  ★  NEXT.JS  ★  GIT & GITHUB  ★" />
      </div>

      {/* --- FEATURED PROJECTS --- */}
      {featuredProjects.length > 0 && (
        <section className="py-20 bg-lime-400 text-black border-y-4 border-black">
          <div className="max-w-7xl mx-auto px-4">
             <h2 className="font-syne text-5xl md:text-7xl font-bold uppercase mb-12 tracking-tighter">
                Featured
             </h2>
             
             <div className="space-y-24">
               {featuredProjects.map((project, idx) => (
                 <FadeIn key={project.id} direction="up">
                   <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center border-b-2 border-black/20 pb-12 last:border-0">
                      <div className="w-full lg:w-3/5">
                        <div className="relative border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] bg-white hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-300">
                          <img 
                            src={project.imageUrl || 'https://via.placeholder.com/800x600'} 
                            alt={project.title} 
                            className="w-full h-auto object-cover aspect-video grayscale hover:grayscale-0 transition-all duration-500"
                          />
                        </div>
                      </div>
                      <div className="w-full lg:w-2/5 space-y-6">
                        <div className="inline-block px-4 py-1 bg-black text-lime-400 font-bold uppercase text-xs tracking-widest rounded-full">
                           Highlight
                        </div>
                        <h3 className="font-syne text-5xl font-bold uppercase leading-none break-words">
                           {project.title}
                        </h3>
                        <p className="font-mono text-lg font-medium leading-relaxed opacity-80">
                           {project.description}
                        </p>
                        {project.link && (
                          <a href={project.link} target="_blank" className="inline-flex items-center gap-2 border-b-2 border-black pb-1 font-bold text-xl hover:gap-4 transition-all">
                             Visit Site <span className="text-2xl">→</span>
                          </a>
                        )}
                      </div>
                   </div>
                 </FadeIn>
               ))}
             </div>
          </div>
        </section>
      )}

      {/* --- OTHER PROJECTS --- */}
      <section id="projects" className="py-24 px-4 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-16 border-b-4 border-white pb-4">
            <h2 className="font-syne text-4xl md:text-6xl font-bold uppercase text-white">
              Portfolio
            </h2>
            <span className="text-lime-400 font-mono text-xl mb-2">({regularProjects.length})</span>
          </div>

          {allProjects.length === 0 ? (
             <div className="text-center border-2 border-dashed border-white/20 p-20">
                <p className="text-gray-500 mb-4">Belum ada project yang ditambahkan.</p>
                <Link href="/admin" className="text-lime-400 hover:underline">Masuk ke Admin untuk tambah project &rarr;</Link>
             </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularProjects.map((project, idx) => (
                <FadeIn key={project.id} delay={idx * 0.1}>
                    <div className="group relative block">
                    <div className="relative border-2 border-white bg-[#111] shadow-hard shadow-white transition-all duration-200 group-hover:shadow-none group-hover:translate-x-[6px] group-hover:translate-y-[6px]">
                        <div className="aspect-video w-full overflow-hidden border-b-2 border-white bg-gray-800 relative grayscale group-hover:grayscale-0 transition-all duration-500">
                            {project.imageUrl && <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />}
                            {/* Overlay Hover */}
                            <div className="absolute inset-0 bg-lime-400/90 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <span className="text-black font-syne font-bold text-xl uppercase">Lihat Detail</span>
                            </div>
                        </div>
                        <div className="p-6">
                            <h3 className="font-syne text-2xl font-bold uppercase text-white mb-2">{project.title}</h3>
                            <p className="text-gray-400 text-sm line-clamp-3 mb-4 font-mono">{project.description}</p>
                            {project.link && <a href={project.link} target="_blank" className="text-lime-400 text-xs font-bold uppercase hover:underline">Live Demo &rarr;</a>}
                        </div>
                    </div>
                    </div>
                </FadeIn>
                ))}
            </div>
          )}
        </div>
      </section>

      {/* FOOTER / CONTACT */}
      <footer id="contact" className="py-24 px-4 text-center border-t border-white/20 relative bg-[#050505]">
         <h2 className="font-syne text-4xl md:text-6xl font-bold mb-8 hover:text-lime-400 transition-colors cursor-pointer uppercase">
            Let's Collaborate
         </h2>
         <div className="flex flex-col gap-4 items-center mb-12">
            <a href="mailto:muhasimasari@gmail.com" className="font-mono text-xl md:text-2xl border-b border-white pb-1 hover:border-lime-400 hover:text-lime-400 transition-colors">
                muhasimasari@gmail.com
            </a>
            <div className="flex gap-6 mt-4">
                <a href="https://github.com/muhasim-asari" target="_blank" className="text-gray-400 hover:text-white uppercase font-bold text-sm tracking-widest">GitHub</a>
                <a href="https://linkedin.com/" target="_blank" className="text-gray-400 hover:text-white uppercase font-bold text-sm tracking-widest">LinkedIn</a>
            </div>
         </div>
         <p className="mt-12 text-gray-600 text-sm font-mono">© {new Date().getFullYear()} Muh. Asim As'ari.</p>
      </footer>
    </main>
  );
}