// components/MmtCalculator.tsx
'use client'

import { useState } from 'react'
import { useLanguage } from "@/context/LanguageContext"

export default function MmtCalculator() {
  const { t } = useLanguage();
  
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [material, setMaterial] = useState<number>(12000); // Default 12rb
  const [useDesign, setUseDesign] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    // Rumus: Luas * Harga + Desain
    // Desain Fee misal: 25.000
    const designFee = useDesign ? 25000 : 0;
    const printCost = (width * height) * material;
    setTotal(printCost + designFee);
  }

  return (
    <div className="bg-secondary border-2 border-white shadow-hard p-6 max-w-md w-full relative group">
      {/* Label Sticker */}
      <div className="absolute -top-3 -right-3 bg-primary text-black px-3 py-1 font-bold text-xs transform rotate-3 border border-black">
         AUTO-MATH
      </div>

      <h3 className="font-syne text-2xl font-bold uppercase text-white mb-6 border-b border-white/20 pb-2">
        {t('calc_title')}
      </h3>

      <form onSubmit={calculate} className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] uppercase font-bold text-gray-400">{t('calc_width')}</label>
            <input 
              type="number" step="0.1" required
              className="w-full bg-black border border-white p-2 text-white font-mono focus:border-primary outline-none"
              onChange={(e) => setWidth(parseFloat(e.target.value))}
            />
          </div>
          <div>
            <label className="text-[10px] uppercase font-bold text-gray-400">{t('calc_height')}</label>
            <input 
              type="number" step="0.1" required
              className="w-full bg-black border border-white p-2 text-white font-mono focus:border-primary outline-none"
              onChange={(e) => setHeight(parseFloat(e.target.value))}
            />
          </div>
        </div>

        <div>
            <label className="text-[10px] uppercase font-bold text-gray-400">{t('calc_material')}</label>
            <select 
              className="w-full bg-black border border-white p-2 text-white font-mono focus:border-primary outline-none"
              onChange={(e) => setMaterial(parseInt(e.target.value))}
            >
              <option value={12000}>Flexi Standard 280gr (Rp 12.000/m)</option>
              <option value={18000}>Flexi High Res 340gr (Rp 18.000/m)</option>
              <option value={25000}>Flexi Korcin 440gr (Rp 25.000/m)</option>
            </select>
        </div>

        <div className="flex items-center gap-2 p-2 bg-black/50 border border-dashed border-white/30 cursor-pointer" onClick={() => setUseDesign(!useDesign)}>
           <div className={`w-4 h-4 border border-white ${useDesign ? 'bg-primary' : 'bg-transparent'}`}></div>
           <span className="text-xs font-bold text-white uppercase select-none">{t('calc_design')} (+25k)</span>
        </div>

        <button className="bg-white text-black font-bold uppercase py-3 hover:bg-primary transition-colors border-2 border-transparent hover:border-white">
          {t('btn_calc')}
        </button>
      </form>

      {/* Result Display */}
      <div className="mt-6 pt-4 border-t-2 border-dashed border-white/30 text-center">
         <p className="text-xs text-gray-500 uppercase mb-1">{t('calc_result')}</p>
         <p className="font-syne text-4xl font-bold text-primary">
            Rp {total.toLocaleString('id-ID')}
         </p>
      </div>
    </div>
  )
}