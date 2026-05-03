import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Activity } from 'lucide-react';

const LOGS = [
  "[Orchestrator] Idle. Awaiting constraints.",
  "[Memory_Manager] Compacting vector space...",
  "[Tool_Engine] Waking up isolated sandbox.",
  "[Agent_Core] Re-evaluating past action rewards.",
  "[Network] Pinging external Earth Engine APIs...",
  "[Observation] User navigating portfolio structure.",
  "[Planner] Generating multi-step execution graph.",
  "[RAG_Node] Searching vector embeddings for context.",
  "[Evaluator] Output validated against system prompt.",
  "[Action] Updating internal belief states."
];

export function AgenticTaskFeed() {
  const [activeLogs, setActiveLogs] = useState<{id: number, text: string}[]>([]);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    // Initial log
    setActiveLogs([{ id: 0, text: "[System] Agentic Core initialized." }]);
    setCounter(1);

    const interval = setInterval(() => {
      const nextLog = LOGS[Math.floor(Math.random() * LOGS.length)];
      setCounter(c => c + 1);
      setActiveLogs(prev => {
        // use Date.now() + Math.random() or just rely on a unique ID mechanism 
        // to avoid duplicate keys when React strict mode runs things twice.
        // Or simply calculate the next ID from prev.length/last item.
        const nextId = prev.length > 0 ? prev[prev.length - 1].id + 1 : 1;
        const newLogs = [...prev, { id: nextId, text: nextLog }];
        if (newLogs.length > 4) newLogs.shift();
        return newLogs;
      });
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-24 left-8 z-[40] hidden xl:flex flex-col w-64 pointer-events-none opacity-60 mix-blend-screen mix-blend-lighten">
      <div className="flex items-center text-cyber-green text-[9px] font-mono mb-3 tracking-widest uppercase font-bold border-b border-cyber-green/20 pb-1">
        <Activity size={10} className="mr-2 animate-pulse" />
        Agentic_Core / Live_Feed
      </div>
      <div className="space-y-2">
        <AnimatePresence>
          {activeLogs.map((log) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, filter: "blur(4px)" }}
              transition={{ duration: 0.5 }}
              className="text-[9px] font-mono text-neutral-400 leading-tight"
            >
              <span className="text-cyber-purple/70 mr-1">{'>'}</span>
              {log.text}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
