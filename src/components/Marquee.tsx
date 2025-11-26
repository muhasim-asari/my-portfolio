// components/Marquee.tsx
export default function Marquee({ text }: { text: string }) {
  return (
    <div className="relative flex overflow-hidden bg-[#0066F7] py-3 border-y-2 border-black rotate-1 scale-105 z-20">
      <div className="animate-marquee whitespace-nowrap flex gap-8">
        {[...Array(10)].map((_, i) => (
          <span key={i} className="text-xl font-bold font-mono text-white uppercase tracking-tighter">
            {text} •
          </span>
        ))}
      </div>
    </div>
  );
}