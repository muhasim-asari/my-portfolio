// context/LanguageContext.tsx
'use client'

import React, { createContext, useContext, useState } from 'react'

// 1. KAMUS KATA (DICTIONARY)
const dictionary = {
  id: {
    nav_home: "Beranda",
    nav_services: "Jasa & Cetak",
    nav_contact: "Kontak",
    hero_title: "Percetakan & Digital",
    hero_desc: "Kami mengubah piksel menjadi kertas dan kode menjadi uang.",
    calc_title: "Hitung MMT",
    calc_width: "Lebar (Meter)",
    calc_height: "Tinggi (Meter)",
    calc_material: "Bahan",
    calc_design: "Butuh Jasa Desain?",
    calc_result: "Estimasi Biaya",
    services_title: "Layanan Kami",
    btn_calc: "Hitung Sekarang",
  },
  en: {
    nav_home: "Home",
    nav_services: "Print & Services",
    nav_contact: "Contact",
    hero_title: "Printing & Digital",
    hero_desc: "We turn pixels into paper and code into cash.",
    calc_title: "MMT Calculator",
    calc_width: "Width (Meter)",
    calc_height: "Height (Meter)",
    calc_material: "Material",
    calc_design: "Need Design Service?",
    calc_result: "Estimated Cost",
    services_title: "Our Services",
    btn_calc: "Calculate Now",
  }
}

type Language = 'id' | 'en';
type LanguageContextType = {
  lang: Language;
  toggleLang: () => void;
  t: (key: keyof typeof dictionary['id']) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>('id');

  const toggleLang = () => {
    setLang(prev => prev === 'id' ? 'en' : 'id');
  }

  // Fungsi Translate (t)
  const t = (key: keyof typeof dictionary['id']) => {
    return dictionary[lang][key] || key;
  }

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}