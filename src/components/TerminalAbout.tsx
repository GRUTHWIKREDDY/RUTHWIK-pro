import { useState, useEffect, useRef } from 'react';
import { useInView } from 'motion/react';

export function TerminalAbout() {
  const [lines, setLines] = useState<string[]>([]);
  const [activeLine, setActiveLine] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    const script = [
      "> initializing_profile.sh ...",
      "[OK] Dependencies loaded.",
      "> EXECUTE: fetch --user 'Ruthwik Reddy'",
      "",
      "// PROFILE DATA",
      "Focus        : Constructing autonomous AI systems.",
      "Methodology  : Local models, robust orchestration.",
      "Experience   : AI/ML Engineering & Data Architecture.",
      "Objective    : Privacy-first, highly capable AI workflows.",
      "",
      "> _"
    ];

    let currentLine = 0;
    let currentChar = 0;
    let timeout: ReturnType<typeof setTimeout>;

    const typeLine = () => {
      if (currentLine >= script.length) return;

      if (currentChar < script[currentLine].length) {
        setActiveLine(currentLine);
        setLines(prev => {
          const newLines = [...prev];
          if (newLines[currentLine] === undefined) {
            newLines[currentLine] = "";
          }
          newLines[currentLine] = script[currentLine].substring(0, currentChar + 1);
          return newLines;
        });
        currentChar++;
        timeout = setTimeout(typeLine, Math.random() * 20 + 20); // Typing speed
      } else {
        currentLine++;
        setActiveLine(currentLine);
        currentChar = 0;
        timeout = setTimeout(typeLine, Math.random() * 200 + 100); // Delay between lines
      }
    };

    setLines([]);
    timeout = setTimeout(typeLine, 500);

    return () => clearTimeout(timeout);
  }, [isInView]);

  return (
    <div ref={ref} className="bg-[#0a0a0a] border border-cyber-green/30 rounded-lg shadow-[0_0_30px_rgba(0,255,157,0.05)] w-full text-left relative overflow-hidden pointer-events-auto flex flex-col h-[300px] md:h-[320px]">
      <div className="h-10 bg-[#050505] border-b border-cyber-green/20 flex items-center px-4 flex-shrink-0">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
        </div>
        <span className="text-[10px] text-neutral-500 ml-4 font-mono">bash ~ root@ruthwik</span>
      </div>
      
      <div className="p-6 md:p-8 font-mono text-sm md:text-base space-y-2 overflow-y-auto flex-grow text-shadow-glow">
        {lines.map((line, i) => {
          const l = line || '';
          return (
          <div 
            key={i} 
            className={`whitespace-pre-wrap ${
              l.startsWith('>') ? 'text-cyber-green' : 
              l.startsWith('[OK]') ? 'text-blue-400' : 
              l.startsWith('//') ? 'text-neutral-500' : 
              'text-white/90'
            }`}
          >
            {l.replace(/_$/, '')}
            {i === lines.length - 1 && activeLine < scriptLength(lines) && l.endsWith('_') && (
              <span className="inline-block w-2.5 h-5 bg-cyber-green ml-1 animate-pulse align-middle"></span>
            )}
            {i === lines.length - 1 && activeLine < 11 && !l.endsWith('_') && (
               <span className="inline-block w-2.5 h-5 bg-cyber-green ml-1 animate-pulse align-middle"></span>
            )}
          </div>
        )})}
        {activeLine >= 11 && (
           <div className="text-cyber-green">
             <span className="inline-block w-2.5 h-5 bg-cyber-green ml-1 animate-pulse align-middle"></span>
           </div>
        )}
      </div>
    </div>
  );
}

function scriptLength(arr: string[]): number {
    return arr.length;
}
