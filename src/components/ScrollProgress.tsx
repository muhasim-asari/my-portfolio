// components/ScrollProgress.tsx
'use client'
import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  
  // useSpring membuat animasi bar-nya mulus (ada efek pegas/membal sedikit)
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-cyan-500 origin-left z-[100]"
      style={{ scaleX }}
    />
  );
}