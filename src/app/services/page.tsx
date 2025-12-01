// app/services/page.tsx
'use client'

import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import MmtCalculator from "@/components/MmtCalculator";
import LanguageSwitch from "@/components/LanguageSwitch";
import { useLanguage } from "@/context/LanguageContext";
import ServiceShowcase from "@/components/ServiceShowcase";

export default function ServicesPage() {
  const { t, lang } = useLanguage();

  return (
    <main className="min-h-screen bg-background text-foreground relative overflow-hidden font-mono selection:bg-primary selection:bg-[#0066F7] selection:text-black pb-20">
      
      {/* Background Noise */}
      <div className="fixed inset-0 z-50 pointer-events-none bg-noise opacity-30 mix-blend-overlay"></div>
      
      {/* Tombol Ganti Bahasa Mengambang */}
      <LanguageSwitch />

      {/* NAVBAR SEDERHANA */}
      <nav className="fixed top-0 left-0 w-full z-40 px-6 py-6 flex justify-between items-center mix-blend-difference text-white">
        <Link href="/" className="font-syne font-extrabold text-xl hover:text-primary transition-colors">
          ← BACK
        </Link>
        <div className="font-bold text-xs tracking-widest uppercase border border-white px-3 py-1 rounded-full">
           {t('nav_services')}
        </div>
      </nav>

      {/* HEADER */}
      <section className="pt-32 px-4 text-center max-w-4xl mx-auto mb-20">
         <FadeIn>
            <h1 className="font-syne text-5xl md:text-8xl font-bold uppercase text-white mb-6">
               <span className="text-primary">{lang === 'id' ? "JASA" : "OUR"}</span> <br/>
               {lang === 'id' ? "& LAYANAN" : "SERVICES"}
            </h1>
            <p className="text-gray-400 max-w-lg mx-auto text-lg">
               {lang === 'id' 
                 ? "Solusi lengkap dari digital hingga cetak fisik. Kami kerjakan dengan hati dan kopi." 
                 : "Complete solutions from digital to physical print. Crafted with heart and coffee."}
            </p>
         </FadeIn>
      </section>

      {/* --- BAGIAN KONTEN UTAMA --- */}
      <div className="max-w-7xl mx-auto px-4">
         
         {/* 1. SERVICE SHOWCASE (Kiri-Kanan + Slider) */}
         <ServiceShowcase />

         {/* 2. PEMISAH (Divider) */}
         <div className="my-24 border-t border-dashed border-white/20"></div>

         {/* 3. KALKULATOR MMT (Dipisah di bawah agar fokus) */}
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
               <h2 className="font-syne text-4xl font-bold uppercase text-white mb-6">
                  {lang === 'id' ? "Hitung Biaya" : "Estimate Cost"}
               </h2>
               <p className="text-gray-400 mb-8 leading-relaxed">
                  {lang === 'id' 
                     ? "Gunakan kalkulator ini untuk mendapatkan perkiraan harga cetak MMT/Banner. Harga dapat berubah tergantung quantity dan kerumitan desain." 
                     : "Use this calculator to get an estimated price for MMT/Banner printing. Prices may vary depending on quantity and design complexity."}
               </p>
               {/* Info Box */}
               <div className="bg-white/5 border border-white/10 p-6">
                  <h4 className="text-primary font-bold uppercase text-sm mb-2">Notes:</h4>
                  <ul className="list-disc list-inside text-xs text-gray-400 space-y-1 font-mono">
                     <li>Harga per meter persegi (m²)</li>
                     <li>Minimal order 1 meter</li>
                     <li>File siap cetak lebih cepat diproses</li>
                  </ul>
               </div>
            </div>

            {/* Komponen Kalkulator */}
            <div className="relative">
               <MmtCalculator />
            </div>
         </div>

      </div>
    </main>
  )
}