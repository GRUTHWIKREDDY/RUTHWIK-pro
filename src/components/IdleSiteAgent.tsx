import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, ScanSearch } from 'lucide-react';

const THOUGHTS = [
  "Scanning DOM tree...",
  "Analyzing portfolio components...",
  "Hmm, impressive tech stack.",
  "Indexing skills matrix.",
  "Evaluating project architecture.",
  "Awaiting user interaction.",
  "Extracting 'About' metrics...",
  "I am an autonomous observer."
];

export function IdleSiteAgent() {
  const [isIdle, setIsIdle] = useState(false);
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [thought, setThought] = useState("");

  useEffect(() => {
    let idleTimer: ReturnType<typeof setTimeout>;
    let moveInterval: ReturnType<typeof setInterval>;
    let thoughtInterval: ReturnType<typeof setInterval>;

    const resetIdle = () => {
      setIsIdle(false);
      clearTimeout(idleTimer);
      clearInterval(moveInterval);
      clearInterval(thoughtInterval);
      
      // Setup idle timeout
      idleTimer = setTimeout(() => {
        setIsIdle(true);
        startAutonomousBehavior();
      }, 10000); // 10 seconds of inactivity to wake up
    };

    const startAutonomousBehavior = () => {
      // Pick random initial position on screen
      setPosition({
        x: Math.random() * (window.innerWidth - 100) + 50,
        y: Math.random() * (window.innerHeight - 100) + 50
      });
      setThought("Waking up...");

      // Move periodically
      moveInterval = setInterval(() => {
        setPosition({
          x: Math.random() * (window.innerWidth - 200) + 100,
          y: Math.random() * (window.innerHeight - 200) + 100
        });
      }, 5000); // Move every 5 secs

      // Change thought periodically
      thoughtInterval = setInterval(() => {
        setThought(THOUGHTS[Math.floor(Math.random() * THOUGHTS.length)]);
      }, 4000);
    };

    // Listeners for user activity
    window.addEventListener('mousemove', resetIdle);
    window.addEventListener('keydown', resetIdle);
    window.addEventListener('scroll', resetIdle);

    resetIdle(); // Start initial timer

    return () => {
      window.removeEventListener('mousemove', resetIdle);
      window.removeEventListener('keydown', resetIdle);
      window.removeEventListener('scroll', resetIdle);
      clearTimeout(idleTimer);
      clearInterval(moveInterval);
      clearInterval(thoughtInterval);
    };
  }, []);

  return (
    <AnimatePresence>
      {isIdle && (
        <motion.div
          className="fixed z-[9999] pointer-events-none flex flex-col items-center"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ x: position.x, y: position.y, opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
        >
          {/* Tooltip / Speech Bubble */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={thought} // Re-animate on thought change
            className="mb-2 px-3 py-1.5 bg-[#0a0a0a] border border-cyber-green/40 shadow-[0_0_15px_rgba(0,255,157,0.15)] rounded text-[9px] font-mono text-cyber-green uppercase tracking-widest max-w-[150px] text-center"
          >
            {thought}
          </motion.div>
          
          {/* Agent Icon */}
          <div className="w-10 h-10 bg-[#050505] border border-white/20 rounded-full flex items-center justify-center relative shadow-[0_0_20px_rgba(0,0,0,0.8)]">
            <div className="absolute inset-0 bg-cyber-green/5 rounded-full animate-ping opacity-50"></div>
            <Bot size={16} className="text-white/80 relative z-10" />
            <ScanSearch size={10} className="text-cyber-green absolute bottom-1 right-1" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
