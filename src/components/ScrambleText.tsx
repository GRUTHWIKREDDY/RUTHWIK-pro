import { useState, useEffect, useRef } from 'react';
import { useInView } from 'motion/react';

const CHARS = '!<>-_\\\\/[]{}—=+*^?#________';

interface ScrambleTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
}

export function ScrambleText({ text, className = "", delay = 0, duration = 1 }: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let timeout: ReturnType<typeof setTimeout>;
    let frame: number;
    let iteration = 0;

    const startAnimation = () => {
      const animate = () => {
        setDisplayText((prev) => {
          return text
            .split('')
            .map((char, index) => {
              if (index < iteration) {
                return text[index];
              }
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join('');
        });

        // 60 frames per second over `duration` seconds
        // total frames = duration * 60
        // step per frame = text.length / total frames
        const totalFrames = duration * 60;
        const step = text.length / totalFrames;

        if (iteration >= text.length) {
          cancelAnimationFrame(frame);
          setDisplayText(text);
        } else {
          iteration += step;
          frame = requestAnimationFrame(animate);
        }
      };
      animate();
    };

    // Scramble fully initially before delay finishes
    setDisplayText(
      text.split('').map(() => CHARS[Math.floor(Math.random() * CHARS.length)]).join('')
    );

    timeout = setTimeout(startAnimation, delay * 1000);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(frame);
    };
  }, [isInView, text, delay, duration]);

  return (
    <span ref={ref} className={className}>
      {displayText}
    </span>
  );
}
