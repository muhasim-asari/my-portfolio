// components/FadeIn.tsx
"use client"; // Wajib untuk framer-motion

import { motion } from "framer-motion";

export default function FadeIn({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
}) {
  // Arah animasi
  const directionOffset = {
    up: 40,
    down: -40,
    left: 40,
    right: -40,
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        x:
          direction === "left" || direction === "right"
            ? directionOffset[direction]
            : 0,
        y:
          direction === "up" || direction === "down"
            ? directionOffset[direction]
            : 0,
      }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-100px" }} // Animasi jalan saat elemen masuk layar
      transition={{ duration: 0.7, delay: delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
