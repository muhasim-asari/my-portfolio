// app/page.tsx
import Link from "next/link";
import { getProjects } from "./actions";
import FadeIn from "@/components/FadeIn";
import Marquee from "@/components/Marquee";
import ProjectSlider from "@/components/ProjectSlider";
import SnakeGame from "@/components/SnakeGame";

export default async function Home() {
  const allProjects = await getProjects();

  const featuredProjects = allProjects.filter((p) => p.featured);
  const regularProjects = allProjects.filter((p) => !p.featured);

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#ededed] relative overflow-hidden font-mono selection:bg-[#0066F7] selection:text-black">
      {/* NOISE OVERLAY */}
      <div className="fixed inset-0 z-50 pointer-events-none bg-noise opacity-40 mix-blend-overlay"></div>

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-40 px-6 md:px-12 py-2 md:py-6 flex justify-between items-center mix-blend-difference text-white">
        {/* LOGO IMAGE */}
        <Link href="/" className="relative group block">
          {/* Efek Glow Halus di belakang logo */}
          <div className="absolute inset-0 bg-primary/20 blur-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full scale-150"></div>

          <img
            src="/logo-muhammad.svg"
            alt="Muhammad Hasim Logo"
            className="relative z-10 h-14 md:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
        <div className="flex gap-4 items-center">
          <Link href="/services" className="block font-bold text-xs uppercase tracking-widest hover:text-primary transition-colors">
            Services
          </Link>
          <Link
            href="#contact"
            className="border-2 border-white px-6 py-2 rounded-full hover:bg-white hover:text-black transition-all font-bold text-sm uppercase"
          >
            Contact
          </Link>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* 1. BACKGROUND GLOW (Sumber cahaya misterius di tengah gelap) */}
        {/* Menggunakan warna variable --primary */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[600px] md:h-[600px] bg-primary rounded-full blur-[150px] opacity-20 animate-pulse duration-[5s]"></div>

        <div className="max-w-7xl mx-auto w-full px-4 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* 2. TEXT AREA (Kiri) */}
          <div className="lg:col-span-7 order-2 lg:order-1 relative z-20">
            <FadeIn direction="up" delay={0.1}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-[2px] bg-[#0066F7]"></div>
                <span className="text-primary font-bold tracking-[0.3em] text-xs uppercase">
                  Frontend Developer
                </span>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={0.2}>
              <h1 className="font-syne text-[13vw] lg:text-[9vw] leading-[0.85] font-extrabold uppercase text-white mix-blend-difference">
                Hasim <br />
                <span
                  className="text-transparent stroke-text"
                  style={{ WebkitTextStroke: "1px #0066F7" }}
                >
                  As'ari
                </span>
              </h1>
            </FadeIn>

            <FadeIn direction="up" delay={0.4}>
              <p className="mt-8 max-w-md text-gray-400 text-lg leading-relaxed border-l border-white/20 pl-6">
                Crafting immersive digital experiences. Behind every line of code lies a story I create as a Frontend Developer.
              </p>
            </FadeIn>

            <FadeIn direction="up" delay={0.6} className="mt-10">
              <Link
                href="#projects"
                className="group relative inline-flex items-center gap-4 text-xl font-bold uppercase tracking-widest text-white hover:text-primary transition-colors"
              >
                <span>Explore Works</span>
                <span className="text-3xl group-hover:translate-x-2 transition-transform">
                  →
                </span>
              </Link>
            </FadeIn>
          </div>

          {/* 3. HERO IMAGE MISTERIUS (Kanan) */}
          <div className="lg:col-span-5 order-1 lg:order-2 relative flex justify-center lg:justify-end">
            <FadeIn delay={0.3}>
              <div className="relative w-[80vw] h-[80vw] md:w-[450px] md:h-[550px]">
                {/* Frame Garis Tipis (Estetika UI) */}
                <div className="absolute inset-0 border border-white/10 translate-x-4 translate-y-4"></div>

                {/* Container Foto */}
                <div className="relative w-full h-full bg-[#111] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 ease-in-out group">
                  {/* FOTO ORANG */}
                  {/* Gunakan foto yang agak gelap/shadowy untuk hasil terbaik */}
                  <img
                    src="/profile.webp"
                    alt="Profile Mystery"
                    className="w-full h-full object-cover opacity-80 mix-blend-luminosity group-hover:scale-110 transition-transform duration-1000"
                  />

                  {/* Overlay Gradient (Supaya foto menyatu dengan background bawah) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent"></div>

                  {/* Efek Glitch/Overlay Warna Primary saat Hover */}
                  <div className="absolute inset-0 bg-primary mix-blend-overlay opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
                </div>

                {/* Elemen Dekorasi Melayang */}
                <div className="absolute -bottom-6 -left-6 bg-secondary border border-white/20 p-4 backdrop-blur-md shadow-2xl">
                  <p className="font-mono text-xs text-gray-400 mb-1">
                    CURRENT STATUS
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#0066F7] animate-ping"></span>
                    <span className="font-bold text-white tracking-wider text-sm">
                      OPEN TO WORK
                    </span>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-0 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 mix-blend-difference">
          <div className="w-[1px] h-12 bg-white"></div>
          <span className="text-[10px] uppercase tracking-widest text-white">
            Scroll
          </span>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="py-12 bg-[#0a0a0a]">
        <Marquee text="HTML5 & CSS3  ★  JAVASCRIPT (ES6+)  ★  REACT JS  ★  TAILWIND CSS  ★  NEXT.JS  ★  GIT & GITHUB  ★" />
      </div>

      {/* --- FEATURED PROJECTS (Tetap Vertikal/Besar agar menonjol) --- */}
      {featuredProjects.length > 0 && (
        <section className="py-20 bg-[#0066F7] text-black border-y-4 border-black">
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
                          src={
                            project.imageUrl ||
                            "https://via.placeholder.com/800x600"
                          }
                          alt={project.title}
                          className="w-full h-auto object-cover aspect-video grayscale hover:grayscale-0 transition-all duration-500"
                        />
                      </div>
                    </div>
                    <div className="w-full lg:w-2/5 space-y-6">
                      <div className="inline-block px-4 py-1 bg-black text-[#0066F7] font-bold uppercase text-xs tracking-widest rounded-full">
                        Highlight
                      </div>
                      <h3 className="font-syne text-5xl font-bold uppercase leading-none break-words">
                        {project.title}
                      </h3>
                      <p className="font-mono text-lg font-medium leading-relaxed opacity-80">
                        {project.description}
                      </p>
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          className="inline-flex items-center gap-2 border-b-2 border-black pb-1 font-bold text-xl hover:gap-4 transition-all"
                        >
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

      {/* --- HORIZONTAL SCROLL SLIDER (Gantikan Grid Regular Lama) --- */}
      {/* Container ID untuk navigasi */}
      <div id="projects">
        {regularProjects.length > 0 ? (
          // Panggil Component Slider di sini
          <ProjectSlider projects={regularProjects} />
        ) : (
          <div className="py-24 text-center border-t border-white/20">
            <p className="text-gray-500 font-mono">Archive Gallery Empty.</p>
          </div>
        )}
      </div>

      {/* --- PLAYGROUND SECTION --- */}
      <section className="py-24 px-4 bg-background border-t border-white/10 relative overflow-hidden">
         {/* Background Decoration */}
         <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary rounded-full blur-[150px] opacity-10 pointer-events-none"></div>

         <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            
            {/* Text Area */}
            <div className="text-left">
               <div className="text-left">
               <FadeIn direction="right">
                  <div className="inline-block px-3 py-1 bg-white text-black font-bold uppercase text-[10px] tracking-widest rounded-full mb-4">
                     Procrastination Zone
                  </div>
                  <h2 className="font-syne text-4xl md:text-6xl font-bold uppercase text-white mb-6">
                     Code not working? <br/>
                     <span className="text-primary">Play Snake.</span>
                  </h2>
                  <p className="font-mono text-gray-400 text-sm leading-relaxed mb-8 border-l-2 border-primary pl-4">
                     Forget about your bugs for a minute. Try to beat the high score instead. 
                     Warning: Highly addictive and not productive at all.
                  </p>
                  <div className="font-mono text-xs text-primary animate-pulse">
                     ↓ WASTE SOME TIME
                  </div>
               </FadeIn>
            </div>
            </div>

            {/* Game Area */}
            <FadeIn direction="left">
               <SnakeGame/>
            </FadeIn>

         </div>
      </section>

      {/* FOOTER */}
      <footer
        id="contact"
        className="py-24 px-4 text-center border-t border-white/20 relative bg-[#050505]"
      >
        <h2 className="font-syne text-4xl md:text-6xl font-bold mb-8 hover:text-[#0066F7] transition-colors cursor-pointer uppercase">
          Let's Collaborate
        </h2>
        <div className="flex flex-col gap-4 items-center mb-12">
          <a
            href="mailto:muhasim2asari@gmail.com"
            className="font-mono text-xl md:text-2xl border-b border-white pb-1 hover:border-[#0066F7] hover:text-{#0066F7} transition-colors"
          >
            muhasim2asari@gmail.com
          </a>
          <div className="flex gap-6 mt-4">
            <a
              href="https://github.com/muhasim-asari"
              target="_blank"
              className="text-gray-400 hover:text-white uppercase font-bold text-sm tracking-widest"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/muhasim-asari"
              target="_blank"
              className="text-gray-400 hover:text-white uppercase font-bold text-sm tracking-widest"
            >
              LinkedIn
            </a>
          </div>
        </div>
        <p className="mt-12 text-gray-600 text-sm font-mono">
          © {new Date().getFullYear()} Muhammad Hasim As'ari.
        </p>
      </footer>
    </main>
  );
}
