import { motion, useScroll, useMotionValueEvent } from 'motion/react';
import { useState } from 'react';
import { Scene } from './components/Scene';
import { SmoothScroll } from './components/SmoothScroll';
import { CustomCursor } from './components/CustomCursor';
import { ClickEffect } from './components/ClickEffect';
import { ScrambleText } from './components/ScrambleText';
import { SpotlightGrid, SpotlightCard } from './components/SpotlightGrid';
import { TerminalAgent } from './components/TerminalAgent';
import { SkillsOrbit } from './components/SkillsOrbit';
import { TerminalAbout } from './components/TerminalAbout';
import { MagneticButton } from './components/MagneticButton';
import { AgenticTaskFeed } from './components/AgenticTaskFeed';
import { AgentWorkflowVisualizer } from './components/AgentWorkflowVisualizer';
import { IdleSiteAgent } from './components/IdleSiteAgent';
import { OSDesktop } from './components/OSDesktop';
import { Github, Linkedin, Mail, ExternalLink, Cpu, Terminal, Zap } from 'lucide-react';
import { AnimatePresence } from 'motion/react';

const Section = ({ children, className = "", id }: { children: React.ReactNode, className?: string, id?: string }) => (
  <section id={id} className={`min-h-screen w-full flex flex-col justify-center px-6 md:px-24 py-20 relative z-10 ${className}`}>
    {children}
  </section>
);

export default function App() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [osMode, setOsMode] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 150);
  });

  return (
    <SmoothScroll>
      <div className="relative bg-[#050505] text-[#ededed] font-sans selection:bg-cyber-green selection:text-black min-h-screen">
        <CustomCursor />
        <ClickEffect />
        <IdleSiteAgent />
        <AgenticTaskFeed />
        {/* Decorative Grid Background */}
        <div className="fixed inset-0 opacity-[0.03] pointer-events-none bg-grid z-0"></div>

        {/* Visual Accents (Crosshairs) */}
        <div className="fixed top-8 left-1/2 -translate-x-1/2 opacity-20 z-50 pointer-events-none">+</div>
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 opacity-20 z-50 pointer-events-none">+</div>
        <div className="fixed left-8 top-1/2 -translate-y-1/2 opacity-20 z-50 pointer-events-none">+</div>
        <div className="fixed right-8 top-1/2 -translate-y-1/2 opacity-20 z-50 pointer-events-none">+</div>

        <Scene />
        
        <AnimatePresence>
          {osMode && <OSDesktop onClose={() => setOsMode(false)} />}
        </AnimatePresence>

        {/* Navigation */}
        <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-8 pointer-events-none">
          <div className="flex items-center gap-4 pointer-events-auto">
            <div className="flex items-center space-x-2">
              <div className="w-2.5 h-2.5 bg-cyber-green rounded-full shadow-[0_0_8px_#00ff9d] animate-pulse"></div>
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold font-mono hidden sm:inline-block">System.Status: Active</span>
            </div>
            
            <button 
              onClick={() => setOsMode(true)}
              className="group flex flex-row items-center gap-2 px-3 py-1 bg-[#111] border border-cyber-green/40 hover:bg-cyber-green/10 transition-colors"
            >
              <Terminal size={12} className="text-cyber-green group-hover:animate-pulse" />
              <span className="text-[9px] uppercase tracking-widest font-mono text-cyber-green font-bold">Hack System</span>
            </button>
          </div>
          <div className="flex gap-8 md:gap-12 text-[11px] uppercase tracking-[0.2em] font-bold pointer-events-auto items-center">
            <a href="#about" className="hover:text-cyber-green transition-colors">About</a>
            <a href="#projects" className="hover:text-cyber-green transition-colors">Work</a>
            <a href="#contact" className="hover:text-cyber-green transition-colors">Connect</a>
            
            {/* Target placeholder in Nav */}
            <div className="w-10 h-10 md:w-14 md:h-14 relative flex-shrink-0">
               {isScrolled && (
                 <motion.img 
                   layoutId="profile-pic"
                   src="https://github.com/GRUTHWIKREDDY.png" 
                   alt="Ruthwik Reddy" 
                   className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 pointer-events-auto rounded-full border border-cyber-green/50 shadow-[0_0_15px_rgba(0,255,157,0.3)] origin-center z-[100]" 
                   transition={{ type: "spring", stiffness: 60, damping: 15, mass: 1 }}
                 />
               )}
            </div>
          </div>
        </nav>

        {/* Vertical Rails */}
        <div className="fixed left-8 bottom-32 hidden md:flex flex-col items-center space-y-8 opacity-40 z-20">
          <span className="rotate-180 text-[10px] uppercase tracking-[0.4em] font-medium whitespace-nowrap [writing-mode:vertical-rl]">
            AI / ML Engineering
          </span>
          <div className="w-px h-24 bg-white/20"></div>
        </div>

        {/* Hero Section */}
        <Section className="items-center text-center">
          <div className="relative">
            {/* Background Outlined Text */}
            <h1 className="text-[120px] md:text-[220px] font-black leading-[0.8] tracking-tighter opacity-[0.05] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none z-0">
              ENGINEER
            </h1>
            
            <motion.div
              className="relative z-10 flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="w-32 h-32 md:w-40 md:h-40 mb-8 relative">
                {!isScrolled && (
                  <motion.img 
                    layoutId="profile-pic"
                    src="https://github.com/GRUTHWIKREDDY.png" 
                    alt="Ruthwik Reddy" 
                    className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 pointer-events-auto rounded-full border border-cyber-green/30 shadow-[0_0_30px_rgba(0,255,157,0.15)] origin-center z-[100]" 
                    transition={{ type: "spring", stiffness: 60, damping: 15, mass: 1 }}
                  />
                )}
              </div>

              <h2 className="text-7xl md:text-[110px] font-black leading-[0.9] tracking-tighter uppercase whitespace-pre flex flex-col items-center">
                <span>RUTHWIK</span>
                <span className="text-outline">REDDY</span>
              </h2>
              
              <div className="mt-8 flex flex-col items-center space-y-6">
                <p className="text-lg text-neutral-400 font-light tracking-wide max-w-lg mx-auto">
                  Transforming complex workflows into <span className="text-white italic">autonomous systems</span>. Specialist in Local LLMs & AI Orchestration.
                </p>
                <div className="h-px w-20 bg-cyber-green"></div>
              </div>
            </motion.div>
          </div>
        </Section>

        {/* Mission Statement */}
        <Section id="about" className="bg-transparent pt-32 pb-16">
          <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-16">
            <div className="w-full lg:w-1/2 text-left">
              <h2 className="text-[10px] font-mono text-cyber-green uppercase tracking-[0.3em] font-bold mb-4">
                <ScrambleText text="01 // The Mission" />
              </h2>
              <p className="text-4xl md:text-6xl font-black leading-[1.1] tracking-tight uppercase">
                <ScrambleText text="Building" /> <br />
                <span className="text-outline"><ScrambleText text="systems" /></span><br />
                <ScrambleText text="that think." />
              </p>
            </div>
            
            <div className="w-full lg:w-1/2">
              <TerminalAbout />
            </div>
          </div>
        </Section>

        {/* Technical Arsenal (3D Space Reservation) */}
        <Section className="items-center justify-center pointer-events-none">
          <div className="w-full flex flex-col lg:flex-row items-center justify-between">
            <div className="max-w-xl mb-12 lg:mb-0 lg:mr-8 pointer-events-none z-20 relative">
              <h2 className="text-[10px] font-mono text-cyber-green uppercase tracking-[0.3em] font-bold mb-4">
                <ScrambleText text="02 // Technical Arsenal" />
              </h2>
              <h3 className="text-5xl md:text-8xl font-black tracking-tighter uppercase mb-8 relative z-20">
                <ScrambleText text="The" /><br /><ScrambleText text="Stack." />
              </h3>
              <p className="text-neutral-500 font-mono text-xs tracking-wider leading-loose uppercase mb-8">
                <ScrambleText text="Interactive Skill Graph  //  Drag to explore" duration={2} />
              </p>
            </div>
            
            <div className="w-full lg:w-1/2">
              <SkillsOrbit />
            </div>
          </div>
        </Section>

        {/* Projects / Experience Showcase */}
        <Section id="projects" className="py-24">
          <div className="mb-16">
            <h2 className="text-[10px] font-mono text-cyber-green uppercase tracking-[0.3em] font-bold">
              <ScrambleText text="03 // Work & Systems" />
            </h2>
            <h3 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mt-4">
              <ScrambleText text="Featured" /><br /><span className="text-outline"><ScrambleText text="Impact." /></span>
            </h3>
          </div>

          <div className="mb-24">
            <AgentWorkflowVisualizer />
          </div>

          <SpotlightGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]">
            {/* Project 1 */}
            <SpotlightCard className="md:col-span-2">
              <CardProject 
                number="01"
                status="Completed"
                title="OpenClaw Pipeline"
                tags={["MLX", "Python"]}
                description="Local AI orchestration with Qwen2.5-3B and emotional adapter logic for autonomous OS management."
              />
            </SpotlightCard>
            
            {/* Experience 1 */}
            <SpotlightCard className="md:col-span-1 row-span-2 border-white/5">
              <CardExperience 
                role="AI/ML Engineer"
                company="TCS"
                desc="Built the 'AI Accelerator'—agentic workflows via n8n/Make.com that optimized enterprise delivery systems."
              />
            </SpotlightCard>

            {/* Experience 2 */}
            <SpotlightCard className="md:col-span-1 border-white/5">
              <CardExperience 
                role="Data Architect"
                company="Green Tamil Nadu Mission"
                desc="Managed 1.1 Crore data points and mapped mangroves using Google Earth Engine for environmental scaling."
              />
            </SpotlightCard>

            {/* Project 2 */}
            <SpotlightCard className="md:col-span-1 lg:col-span-1 border-white/5">
              <CardProject 
                number="02"
                status="In Orbit"
                title="AI Chess Engine"
                tags={["Neural", "Stockfish"]}
                description="Neural network powered engine optimized for high-performance strategic analysis and reinforcement learning."
              />
            </SpotlightCard>
          </SpotlightGrid>
        </Section>

        {/* Contact / Footer */}
        <Section id="contact" className="min-h-[70vh] border-t border-white/5 bg-[#080808]/50 overflow-hidden">
          <div className="relative w-full h-full flex flex-col justify-between">
            <div>
              <h1 className="text-[80px] md:text-[180px] font-black leading-[0.8] tracking-[ -0.05em] uppercase opacity-[0.03] absolute -top-12 left-0 select-none">
                <ScrambleText text="CONNECT" />
              </h1>
              <h2 className="text-6xl md:text-[110px] font-black tracking-tighter mb-8 relative z-10">
                <ScrambleText text="LET'S" /><br /><span className="text-outline"><ScrambleText text="CONNECT." /></span>
              </h2>
              <div className="flex gap-4 relative z-10 pointer-events-auto">
                <MagneticButton href="https://github.com/GRUTHWIKREDDY" target="_blank" rel="noopener noreferrer" className="p-5 bg-neutral-900 border border-white/5 rounded-sm hover:border-cyber-green transition-all hover:shadow-[0_0_15px_rgba(0,255,157,0.2)] hover:text-cyber-green text-white">
                  <Github size={18} className="pointer-events-none" />
                </MagneticButton>
                <MagneticButton href="https://www.linkedin.com/in/golkonda-ruthwik-reddy-b71595213/" target="_blank" rel="noopener noreferrer" className="p-5 bg-neutral-900 border border-white/5 rounded-sm hover:border-cyber-purple transition-all hover:shadow-[0_0_15px_rgba(157,0,255,0.2)] hover:text-cyber-purple text-white">
                  <Linkedin size={18} className="pointer-events-none" />
                </MagneticButton>
                <MagneticButton href="mailto:ruthwik56789@gmail.com" className="p-5 bg-neutral-900 border border-white/5 rounded-sm hover:border-white transition-all hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] text-white">
                  <Mail size={18} className="pointer-events-none" />
                </MagneticButton>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between items-end border-t border-white/5 pt-12 mt-12 gap-12">
              <div className="flex gap-12">
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-gray-500 mb-1">Current Focus</span>
                  <span className="text-sm font-medium">Agentic Workflows & Enterprise Automation</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-gray-500 mb-1">Location</span>
                  <span className="text-sm font-medium uppercase font-mono tracking-tighter">HYD // IN</span>
                </div>
              </div>
              <div className="text-right font-mono text-[10px] text-neutral-600 uppercase tracking-widest">
                © 2026 G. RUTHWIK REDDY<br />
                ENGINEERED FOR THE FUTURE
              </div>
            </div>
          </div>
        </Section>
        
        <TerminalAgent />
      </div>
    </SmoothScroll>
  );
}

function CardProject({ number, status, title, tags, description }: { number: string, status: string, title: string, tags: string[], description: string }) {
  return (
    <div className="flex flex-col h-full relative group/inner">
      <div className="absolute top-0 right-0 text-[10px] font-mono text-white/20 uppercase transition-colors group-hover/inner:text-cyber-green/50">
        {number} / {status}
      </div>
      <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-cyber-green mb-3 flex-shrink-0">{title}</h3>
      <p className="text-sm leading-relaxed text-neutral-400 mb-8 font-light flex-grow">{description}</p>
      <div className="flex flex-wrap gap-2 mt-auto">
        {tags.map(t => (
          <span key={t} className="text-[9px] uppercase font-mono px-3 py-1 border border-white/10 rounded-full tracking-tighter text-neutral-500 group-hover/inner:border-cyber-green/30 group-hover/inner:text-cyber-green transition-colors">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function CardExperience({ role, company, desc }: { role: string, company: string, desc: string }) {
  return (
    <div className="flex flex-col h-full border-l border-cyber-purple/20 pl-6 relative">
      <div className="absolute left-[-1px] top-0 w-px h-full bg-gradient-to-b from-cyber-purple to-transparent opacity-0 group-hover/inner:opacity-100 transition-opacity duration-500"></div>
      <div className="text-[10px] font-mono text-cyber-purple/80 uppercase tracking-widest mb-2 font-bold">{company}</div>
      <div className="text-2xl font-black uppercase tracking-tight mb-4 italic text-white/90">{role}</div>
      <p className="text-sm text-neutral-500 font-light leading-relaxed mt-auto">{desc}</p>
    </div>
  );
}

