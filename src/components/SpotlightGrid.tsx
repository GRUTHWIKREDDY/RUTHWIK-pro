import { useRef } from 'react';

export function SpotlightGrid({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const items = containerRef.current.getElementsByClassName('spotlight-item');
    for (const item of items) {
      const rect = item.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      (item as HTMLElement).style.setProperty('--mouse-x', `${x}px`);
      (item as HTMLElement).style.setProperty('--mouse-y', `${y}px`);
    }
  };

  return (
    <div 
      ref={containerRef} 
      onMouseMove={handleMouseMove} 
      className={`group/grid ${className}`}
    >
      {children}
    </div>
  );
}

export function SpotlightCard({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`spotlight-item relative bg-[#050505] overflow-hidden rounded-xl ${className}`}>
      {/* The spotlight glow behind the inner container to simulate a glowing border */}
      <div 
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover/grid:opacity-100 z-0"
        style={{
          background: "radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(0, 255, 157, 0.3), transparent 40%)",
        }}
      />
      {/* Inner card background blocking out center and leaving 1px for the glowing border */}
      <div className="absolute inset-[1px] bg-[#0a0a0a] rounded-[11px] z-10 transition-colors duration-300 group-hover/grid:bg-[#0a0a0a]/90 backdrop-blur-3xl" />
      
      {/* Subtle inner spotlight for content */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/grid:opacity-100 z-20 mix-blend-screen"
        style={{
          background: "radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(0, 255, 157, 0.04), transparent 40%)",
        }}
      />
      
      <div className="relative z-30 h-full p-8 flex flex-col">
        {children}
      </div>
    </div>
  );
}
