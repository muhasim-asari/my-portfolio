// components/PageLoader.tsx
'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulasi loading selama 2 detik (atau sampai window load)
    // Kamu bisa sesuaikan waktunya
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black overflow-hidden"
          exit={{ opacity: 0 }} // Container fade out di akhir
          transition={{ duration: 0.5, delay: 0.4 }} // Tunggu lingkaran membesar dulu baru fade out
        >
          
          {/* 1. LINGKARAN BACKGROUND (YANG AKAN MEMBESAR) */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ 
               scale: 1, 
               opacity: 1,
               rotate: 360 // Sedikit rotasi biar dinamis
            }}
            exit={{ 
               scale: 100, // MEMBESAR JADI RAKSASA (Zoom Effect)
            }}
            transition={{ 
               duration: 0.8, 
               ease: [0.76, 0, 0.24, 1] // Easing curve yang smooth
            }}
            className="absolute w-24 h-24 bg-primary rounded-full"
          />

          {/* 2. LOGO DI TENGAH */}
          <motion.div
             initial={{ opacity: 0, scale: 0.8 }}
             animate={{ opacity: 1, scale: 1 }}
             exit={{ opacity: 0, scale: 0.5 }}
             transition={{ duration: 0.5 }}
             className="relative z-10"
          >
             <img 
               src="/logo-muhammad.svg" 
               alt="Logo" 
               className="w-50 h-50 object-contain"
             />
          </motion.div>

          <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="absolute bottom-10 font-mono text-[10px] text-white uppercase tracking-widest animate-pulse"
          >
             Initializing System...
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  )
}