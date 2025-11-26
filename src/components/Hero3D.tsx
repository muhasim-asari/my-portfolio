// components/Hero3D.tsx
"use client";
import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function Hero3D() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Membuat gerakan mouse terasa smooth (tidak patah-patah)
  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  // Kalkulasi rotasi berdasarkan posisi mouse
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    // Mengubah kordinat mouse menjadi nilai antara -0.5 sampai 0.5
    x.set((clientX - left) / width - 0.5);
    y.set((clientY - top) / height - 0.5);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-72 h-72 md:w-96 md:h-96 rounded-3xl cursor-pointer perspective-1000"
    >
      {/* Background Gradient Layer (Floating behind) */}
      <div
        style={{ transform: "translateZ(-50px)" }}
        className="absolute inset-4 rounded-3xl bg-gradient-to-tr from-cyan-500 to-purple-600 blur-2xl opacity-60 animate-pulse"
      />

      {/* Main Image Card */}
      <div
        style={{ transform: "translateZ(20px)" }}
        className="absolute inset-0 rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl bg-slate-800"
      >
        {/* GANTI GAMBAR DI SINI */}
        <img
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000"
          alt="Hero Profile"
          className="w-full h-full object-cover"
        />

        {/* Overlay reflection effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
      </div>
    </motion.div>
  );
}
