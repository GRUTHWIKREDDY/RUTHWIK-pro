import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { Terminal, Network, Zap, Database, Cpu, CheckCircle } from 'lucide-react';

const NODES = [
  { id: 'query', label: 'User Query', x: 10, y: 50, icon: Terminal, color: '#ffffff' },
  { id: 'planner', label: 'Planner Node', x: 35, y: 25, icon: Network, color: '#00ff9d' },
  { id: 'tools', label: 'Tool Engine', x: 35, y: 75, icon: Zap, color: '#ffb000' },
  { id: 'memory', label: 'Vector RAG', x: 65, y: 75, icon: Database, color: '#9d00ff' },
  { id: 'evaluator', label: 'Evaluator', x: 65, y: 25, icon: Cpu, color: '#00ff9d' },
  { id: 'output', label: 'Execution', x: 90, y: 50, icon: CheckCircle, color: '#ffffff' },
];

const EDGES = [
  { source: 'query', target: 'planner' },
  { source: 'planner', target: 'tools' },
  { source: 'planner', target: 'memory' },
  { source: 'tools', target: 'evaluator' },
  { source: 'memory', target: 'evaluator' },
  { source: 'evaluator', target: 'planner', reverse: true, dashed: true }, // self-correction loop
  { source: 'evaluator', target: 'output' },
];

export function AgentWorkflowVisualizer() {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [packetPos, setPacketPos] = useState({ pathIndex: 0, progress: 0 });

  useEffect(() => {
    // A simple animation loop that moves a conceptual "thought packet" through the graph
    const pathSequence = [
      { source: 'query', target: 'planner', node: 'query' },
      { source: 'planner', target: 'tools', node: 'planner' },
      { source: 'tools', target: 'evaluator', node: 'tools' },
      { source: 'evaluator', target: 'planner', node: 'evaluator' }, // feedback
      { source: 'planner', target: 'memory', node: 'planner' },
      { source: 'memory', target: 'evaluator', node: 'memory' },
      { source: 'evaluator', target: 'output', node: 'evaluator' },
      { source: 'output', target: 'query', node: 'output', hidden: true } // loop reset
    ];

    let currentIdx = 0;
    
    const interval = setInterval(() => {
      setActiveNode(pathSequence[currentIdx].node);
      currentIdx = (currentIdx + 1) % pathSequence.length;
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[400px] md:h-[500px] bg-[#050505] border border-white/5 rounded-xl overflow-hidden font-mono mt-12 group/wf shadow-[0_0_50px_rgba(0,0,0,0.5)]">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />

      {/* Connection Lines (SVG) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {EDGES.map((edge, i) => {
          const sourceNode = NODES.find(n => n.id === edge.source);
          const targetNode = NODES.find(n => n.id === edge.target);
          if (!sourceNode || !targetNode) return null;

          const sx = `${sourceNode.x}%`;
          const sy = `${sourceNode.y}%`;
          const tx = `${targetNode.x}%`;
          const ty = `${targetNode.y}%`;

          const isActive = activeNode === sourceNode.id || activeNode === targetNode.id;

          return (
            <polyline
              key={i}
              points={`${sx},${sy} ${tx},${ty}`}
              fill="none"
              stroke={isActive ? "rgba(0, 255, 157, 0.4)" : "rgba(255, 255, 255, 0.1)"}
              strokeWidth={isActive ? 2 : 1}
              strokeDasharray={edge.dashed ? "4 4" : "0"}
              className="transition-all duration-500"
            />
          );
        })}
      </svg>

      {/* Nodes */}
      {NODES.map((node) => {
        const isActive = activeNode === node.id;
        return (
          <motion.div
            key={node.id}
            className="absolute -ml-[40px] -mt-[40px] w-[80px] h-[80px] flex flex-col items-center justify-center cursor-crosshair z-10"
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
          >
            <motion.div
              className={`w-12 h-12 rounded-full border flex items-center justify-center mb-2 transition-all duration-300 relative ${
                isActive 
                  ? 'bg-[#0a0a0a] border-cyber-green shadow-[0_0_20px_rgba(0,255,157,0.4)] text-cyber-green scale-110' 
                  : 'bg-[#080808] border-white/10 text-neutral-500 hover:border-white/30'
              }`}
            >
              {isActive && (
                <div className="absolute inset-0 rounded-full border border-cyber-green/50 animate-ping opacity-20" />
              )}
              <node.icon size={18} />
            </motion.div>
            <span className={`text-[9px] uppercase tracking-widest px-2 py-1 rounded bg-black/50 backdrop-blur-sm border transition-colors ${
              isActive ? 'text-cyber-green border-cyber-green/30' : 'text-neutral-500 border-transparent'
            }`}>
              {node.label}
            </span>
          </motion.div>
        );
      })}

      <div className="absolute top-4 left-4 text-[10px] uppercase font-bold tracking-[0.2em] text-cyber-green/50 flex items-center">
        <Network size={12} className="mr-2" />
        Agentic Workflow Visualization
      </div>
    </div>
  );
}
