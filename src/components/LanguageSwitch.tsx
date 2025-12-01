// components/LanguageSwitch.tsx
'use client'
import { useLanguage } from "../context/LanguageContext";

export default function LanguageSwitch() {
  const { lang, toggleLang } = useLanguage()

  return (
    <button 
      onClick={toggleLang}
      className="fixed bottom-6 right-6 z-50 bg-black text-white w-12 h-12 rounded-full font-bold font-mono border-2 border-white shadow-hard hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all flex items-center justify-center uppercase"
    >
      {lang}
    </button>
  )
}