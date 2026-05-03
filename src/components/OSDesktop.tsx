import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { Terminal, Folder, FileText, User, X, Maximize, Minus, Code, Cpu, Activity, Clock } from 'lucide-react';

type WindowData = {
  id: string;
  title: string;
  icon: any;
  content: React.ReactNode;
  isOpen: boolean;
  position: { x: number, y: number };
  zIndex: number;
};

export function OSDesktop({ onClose }: { onClose: () => void }) {
  const [windows, setWindows] = useState<WindowData[]>([
    {
      id: 'terminal',
      title: 'root@openclaw:~',
      icon: Terminal,
      isOpen: true,
      position: { x: 50, y: 50 },
      zIndex: 10,
      content: (
        <div className="font-mono text-xs text-cyber-green space-y-2">
          <p>OpenClaw OS v1.0.4 - Linux/amd64</p>
          <p>Login: root (console)</p>
          <br/>
          <p>SYSTEM BREACH DETECTED... OVERRIDING UI</p>
          <p>Initializing autonomous visual desktop...</p>
          <p>[OK] File system mounted.</p>
          <p>[OK] Window manager launched.</p>
          <p className="animate-pulse">_</p>
        </div>
      )
    },
    {
      id: 'projects',
      title: '~/Projects',
      icon: Folder,
      isOpen: false,
      position: { x: 100, y: 150 },
      zIndex: 1,
      content: (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="flex flex-col items-center gap-2 p-2 hover:bg-white/10 rounded cursor-pointer">
            <Cpu size={32} className="text-blue-400" />
            <span className="text-xs font-mono">OpenClaw</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-2 hover:bg-white/10 rounded cursor-pointer">
            <Code size={32} className="text-purple-400" />
            <span className="text-xs font-mono">Stockfish_AI</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-2 hover:bg-white/10 rounded cursor-pointer">
            <Activity size={32} className="text-red-400" />
            <span className="text-xs font-mono">GTNM_Data</span>
          </div>
        </div>
      )
    },
    {
      id: 'resume',
      title: 'resume.txt',
      icon: FileText,
      isOpen: false,
      position: { x: 200, y: 100 },
      zIndex: 2,
      content: (
        <div className="font-mono text-xs space-y-4 text-white/80 whitespace-pre-wrap">
          <h2 className="text-cyber-green text-sm font-bold">RUTHWIK REDDY</h2>
          <p>AI/ML Engineer & Data Architect.</p>
          <hr className="border-white/10" />
          <p className="text-blue-400"># EXPERIENCE</p>
          <p>&gt; TCS - AI Accelerator framework using OpenClaw architecture.</p>
          <p>&gt; Green Tamil Nadu Mission - Handled 1.1 Crore data points via GEE.</p>
          <p>&gt; TNHB GIS Architecture - Created data pipelines for housing boards.</p>
          <hr className="border-white/10" />
          <p className="text-purple-400"># SKILLS</p>
          <p>Python, MLX, LLMs, RAG, React, Docker, Linux, Node.js</p>
        </div>
      )
    },
    {
      id: 'contact',
      title: 'contact.sh',
      icon: User,
      isOpen: false,
      position: { x: 300, y: 200 },
      zIndex: 3,
      content: (
        <div className="font-mono text-xs text-white/80 space-y-2">
          <p className="text-cyber-purple">#!/bin/bash</p>
          <p>echo "Connect with me:"</p>
          <a href="mailto:ruthwik56789@gmail.com" className="block text-blue-400 hover:text-white transition-colors">&gt; Email: ruthwik56789@gmail.com</a>
          <a href="https://github.com/GRUTHWIKREDDY" target="_blank" className="block text-blue-400 hover:text-white transition-colors">&gt; GitHub: GRUTHWIKREDDY</a>
          <a href="https://www.linkedin.com/in/golkonda-ruthwik-reddy-b71595213/" target="_blank" className="block text-blue-400 hover:text-white transition-colors">&gt; LinkedIn: Ruthwik Reddy</a>
        </div>
      )
    }
  ]);

  const [maxZ, setMaxZ] = useState(10);
  const [time, setTime] = useState('00:00');

  setInterval(() => {
    const d = new Date();
    setTime(`${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`);
  }, 1000);

  const focusWindow = (id: string) => {
    setMaxZ(prev => prev + 1);
    setWindows(prev => prev.map(w => w.id === id ? { ...w, zIndex: maxZ + 1 } : w));
  };

  const toggleWindow = (id: string) => {
    setMaxZ(prev => prev + 1);
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isOpen: !w.isOpen, zIndex: !w.isOpen ? maxZ + 1 : w.zIndex } : w));
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[99999] bg-[#020202] text-white font-sans overflow-hidden pointer-events-auto selection:bg-cyber-green selection:text-black"
    >
      {/* Background Wallpaper */}
      <div className="absolute inset-0 bg-grid opacity-[0.02]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,157,0.05)_0%,transparent_100%)]" />

      {/* Desktop Icons */}
      <div className="absolute top-4 left-4 flex flex-col gap-6">
        {windows.map(w => (
          <div 
            key={w.id} 
            className="flex flex-col items-center gap-1 w-20 p-2 hover:bg-white/10 rounded cursor-pointer transition-colors"
            onDoubleClick={() => toggleWindow(w.id)}
            onClick={() => focusWindow(w.id)}
          >
            <w.icon size={32} className={w.isOpen ? 'text-cyber-green drop-shadow-[0_0_10px_rgba(0,255,157,0.8)]' : 'text-white/80'} />
            <span className="text-[10px] text-center font-mono bg-black/50 px-1 rounded truncate w-full shadow-sm">
              {w.title}
            </span>
          </div>
        ))}
        
        {/* Exit Icon */}
        <div 
          className="flex flex-col items-center gap-1 w-20 p-2 hover:bg-red-500/20 rounded cursor-pointer transition-colors mt-8"
          onDoubleClick={onClose}
        >
          <X size={32} className="text-red-500" />
          <span className="text-[10px] text-center font-mono bg-black/50 px-1 rounded truncate w-full">
            Exit_OS
          </span>
        </div>
      </div>

      {/* Windows */}
      <AnimatePresence>
        {windows.map(w => w.isOpen && (
          <motion.div
            key={w.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={`absolute bg-[#0a0a0a]/90 backdrop-blur-md border ${w.id === 'terminal' ? 'border-cyber-green/50' : 'border-white/10'} rounded shadow-2xl flex flex-col overflow-hidden min-w-[300px] min-h-[200px] max-w-[90vw] max-h-[80vh]`}
            style={{ zIndex: w.zIndex, left: w.position.x, top: w.position.y }}
            drag
            dragMomentum={false}
            onPointerDown={() => focusWindow(w.id)}
          >
            {/* Titlebar */}
            <div className={`h-8 ${w.id === 'terminal' ? 'bg-cyber-green/10' : 'bg-[#111]'} border-b ${w.id === 'terminal' ? 'border-cyber-green/20' : 'border-white/10'} flex items-center justify-between px-3 cursor-move select-none`}>
              <div className="flex items-center gap-2">
                <w.icon size={12} className={w.id === 'terminal' ? 'text-cyber-green' : 'text-neutral-400'} />
                <span className={`text-[10px] font-mono ${w.id === 'terminal' ? 'text-cyber-green' : 'text-neutral-400'}`}>{w.title}</span>
              </div>
              <div className="flex gap-2">
                <button className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 flex items-center justify-center group" onClick={() => toggleWindow(w.id)}>
                  <Minus size={8} className="opacity-0 group-hover:opacity-100 text-black" />
                </button>
                <button className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 flex items-center justify-center group">
                  <Maximize size={8} className="opacity-0 group-hover:opacity-100 text-black" />
                </button>
                <button className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 flex items-center justify-center group" onClick={() => toggleWindow(w.id)}>
                  <X size={8} className="opacity-0 group-hover:opacity-100 text-black" />
                </button>
              </div>
            </div>
            
            {/* Content area */}
            <div className="p-4 flex-1 overflow-auto">
              {w.content}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Taskbar */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-black/80 backdrop-blur-lg border-t border-white/10 flex items-center justify-between px-2 z-[999999]">
        <div className="flex items-center gap-1 h-full">
          <button className="px-3 h-full hover:bg-white/10 flex items-center gap-2 transition-colors">
            <Cpu size={14} className="text-cyber-green" />
            <span className="text-[10px] font-bold tracking-widest font-mono uppercase">Start</span>
          </button>
          <div className="w-px h-4 bg-white/20 mx-1" />
          {windows.map(w => w.isOpen && (
            <button 
              key={`task-${w.id}`}
              onClick={() => focusWindow(w.id)}
              className={`px-3 h-full flex items-center gap-2 border-b-2 ${w.zIndex === maxZ ? 'border-cyber-green bg-white/10 text-white' : 'border-transparent hover:bg-white/5 text-white/60'} transition-all max-w-[150px] truncate`}
            >
              <w.icon size={12} className={w.id === 'terminal' ? 'text-cyber-green' : 'text-[inherit]'} />
              <span className="text-[10px] font-mono truncate">{w.title}</span>
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4 px-2 h-full text-[10px] font-mono text-white/60">
          <div className="flex items-center gap-2">
            <Clock size={12} />
            <span>{time}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
