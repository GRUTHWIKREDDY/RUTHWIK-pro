import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Inner dot is snappy
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  
  // Outer ring has a bit of lag for that smooth futuristic feel
  const springConfigOuter = { damping: 20, stiffness: 150 };
  const cursorXSpringOuter = useSpring(cursorX, springConfigOuter);
  const cursorYSpringOuter = useSpring(cursorY, springConfigOuter);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a, button, input');
      setIsHovered(!!target);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      <style>{`
        * { cursor: none !important; }
      `}</style>
      <motion.div
        className="fixed top-0 left-0 bg-cyber-green rounded-full pointer-events-none z-[9999999] shadow-[0_0_10px_#00ff9d]"
        animate={{
          width: isHovered ? 4 : 8,
          height: isHovered ? 4 : 8,
          opacity: isHovered ? 0.5 : 1,
        }}
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          marginLeft: isHovered ? '-2px' : '-4px',
          marginTop: isHovered ? '-2px' : '-4px',
        }}
      />
      <motion.div
        className="fixed top-0 left-0 border border-cyber-green/50 rounded-full pointer-events-none z-[9999998]"
        animate={{
          width: isHovered ? 48 : 32,
          height: isHovered ? 48 : 32,
          backgroundColor: isHovered ? 'rgba(0, 255, 157, 0.1)' : 'transparent',
        }}
        style={{
          x: cursorXSpringOuter,
          y: cursorYSpringOuter,
          marginLeft: isHovered ? '-24px' : '-16px',
          marginTop: isHovered ? '-24px' : '-16px',
        }}
      />
    </>
  );
}
