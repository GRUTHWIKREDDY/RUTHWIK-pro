import { motion } from 'motion/react';
import { Cpu, Database, Cloud, Terminal, Boxes, Network, Code, Layers } from 'lucide-react';

const SKILLS = [
  { name: 'Python', icon: Code },
  { name: 'Local LLMs', icon: Terminal },
  { name: 'RAG', icon: Database },
  { name: 'MLX', icon: Cpu },
  { name: 'Earth Engine', icon: Cloud },
  { name: 'PyTorch', icon: Network },
  { name: 'Agentic', icon: Boxes },
  { name: 'Stockfish', icon: Layers },
];

export function SkillsOrbit() {
  return (
    <div className="relative w-full h-[400px] md:h-[600px] flex items-center justify-center overflow-hidden">
      {/* Center Node */}
      <div className="absolute z-20 w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#0a0a0a] border border-cyber-green shadow-[0_0_30px_rgba(0,255,157,0.2)] flex items-center justify-center font-bold text-[10px] uppercase tracking-widest text-cyber-green flex-col gap-2">
        <Cpu size={24} className="text-cyber-green" />
        <span>CORE</span>
      </div>

      {/* Orbit Rings */}
      <div className="absolute z-0 w-[220px] h-[220px] md:w-[320px] md:h-[320px] rounded-full border border-white/5 border-dashed" />
      <div className="absolute z-0 w-[320px] h-[320px] md:w-[480px] md:h-[480px] rounded-full border border-white/5 border-dashed" />

      {/* Desktop Orbiting Nodes */}
      {SKILLS.map((skill, index) => {
        const radius = index % 2 === 0 ? 160 : 240; 
        const orbitDuration = index % 2 === 0 ? 30 : 45;
        const direction = index % 2 === 0 ? 1 : -1;
        const initialRotation = (360 / SKILLS.length) * index;

        return (
          <motion.div
            key={`desk-${skill.name}`}
            className="absolute z-10 hidden md:flex items-center justify-center"
            initial={{ rotate: initialRotation }}
            animate={{
              rotate: initialRotation + (360 * direction)
            }}
            transition={{
              duration: orbitDuration,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              width: radius * 2,
              height: radius * 2,
            }}
          >
            <motion.div 
              className="absolute -top-8 left-1/2 -ml-8 w-16 h-16 bg-[#050505] border border-white/10 rounded-full flex flex-col items-center justify-center cursor-pointer hover:border-cyber-green hover:bg-cyber-green/5 hover:shadow-[0_0_15px_rgba(0,255,157,0.3)] transition-all group pointer-events-auto"
              drag
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              dragElastic={0.2}
              whileDrag={{ scale: 1.1, cursor: "grabbing" }}
              animate={{
                rotate: -(initialRotation + (360 * direction)) // Counter-rotate so text stays upright
              }}
              transition={{
                duration: orbitDuration,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <skill.icon size={18} className="text-neutral-500 group-hover:text-cyber-green mb-1 transition-colors pointer-events-none" />
              <span className="text-[8px] uppercase font-mono text-neutral-400 group-hover:text-cyber-green text-center leading-tight pointer-events-none">
                {skill.name}
              </span>
            </motion.div>
          </motion.div>
        );
      })}

      {/* Mobile Orbiting Nodes */}
      {SKILLS.map((skill, index) => {
        const radius = index % 2 === 0 ? 110 : 160; 
        const orbitDuration = index % 2 === 0 ? 25 : 40;
        const direction = index % 2 === 0 ? 1 : -1;
        const initialRotation = (360 / SKILLS.length) * index;

        return (
          <motion.div
            key={`mob-${skill.name}`}
            className="absolute z-10 flex md:hidden items-center justify-center"
            initial={{ rotate: initialRotation }}
            animate={{
              rotate: initialRotation + (360 * direction)
            }}
            transition={{
              duration: orbitDuration,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              width: radius * 2,
              height: radius * 2,
            }}
          >
            <motion.div 
              className="absolute -top-7 left-1/2 -ml-7 w-14 h-14 bg-[#0a0a0a] border border-white/10 rounded-full flex flex-col items-center justify-center cursor-pointer hover:border-cyber-green hover:bg-cyber-green/5 hover:shadow-[0_0_15px_rgba(0,255,157,0.3)] transition-all group pointer-events-auto"
              drag
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              dragElastic={0.2}
              whileDrag={{ scale: 1.1, cursor: "grabbing" }}
              animate={{
                rotate: -(initialRotation + (360 * direction)) // Counter-rotate so text stays upright
              }}
              transition={{
                duration: orbitDuration,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <skill.icon size={14} className="text-neutral-500 group-hover:text-cyber-green mb-1 transition-colors pointer-events-none" />
              <span className="text-[7px] uppercase font-mono text-neutral-400 group-hover:text-cyber-green text-center leading-tight pointer-events-none">
                {skill.name}
              </span>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
