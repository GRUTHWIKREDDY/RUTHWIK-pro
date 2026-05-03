import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal as TerminalIcon, X } from 'lucide-react';

type Message = {
  id: string;
  sender: 'user' | 'agent' | 'system';
  text: string;
  isTyping?: boolean;
  isFinal?: boolean;
};

const RESPONSES: Record<string, string> = {
  "skills": "Scanning capabilities... Detected: Local LLMs, RAG Pipelines, Agentic Workflows, Python, MLX, Google Earth Engine.",
  "experience": "Querying history... TCS (AI/ML Engineer) - Built 'AI Accelerator', Green Tamil Nadu Mission (Data Architect) - Managed 1.1 Crore data points.",
  "projects": "Accessing portfolio... \n1. OpenClaw Pipeline (Local AI orchestration) \n2. AI Chess Engine (Neural network Stockfish integration).",
  "hello": "System initialized. Send 'skills', 'experience', or 'projects' to query my data bank. Or say 'who are you'.",
  "hi": "System initialized. Send 'skills', 'experience', or 'projects' to query my data bank. Or say 'who are you'.",
  "hey": "System initialized. Send 'skills', 'experience', or 'projects' to query my data bank. Or say 'who are you'.",
  "bye": "Session terminating... Just kidding, I'm always online. Have a good one!",
  "thanks": "You're welcome. Acknowledgment logged.",
  "thank you": "You're welcome. Acknowledgment logged.",
  "how are you": "All systems nominal. CPU at 2%. Ready for queries.",
  "who are you": "I am the digital proxy for Ruthwik Reddy. I specialize in autonomous systems and local AI orchestration.",
  "help": "Available commands:\n- skills\n- experience\n- projects\n- who are you\n- hello",
  "default": "Command not recognized. Try: 'help' for a list of valid commands."
};

export function TerminalAgent() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{ id: 'initial', sender: 'agent', text: "Wake up, user. I am Ruthwik's AI proxy. How can I assist?", isTyping: true, isFinal: true }]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(true);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const query = input.trim().toLowerCase();
    const newUserMsg: Message = { id: Date.now().toString(), sender: 'user', text: input.trim() };
    setMessages(prev => [...prev, newUserMsg]);
    setInput("");
    setIsTyping(true);

    let replyText = RESPONSES["default"];
    for (const key in RESPONSES) {
      if (query.includes(key)) {
        replyText = RESPONSES[key];
        break;
      }
    }

    setTimeout(() => {
      const id1 = Date.now().toString();
      setMessages(prev => [...prev, { id: id1, sender: 'system', text: "<Retrieving context from resume vectors...>", isTyping: true }]);
      
      setTimeout(() => {
        const id2 = (Date.now() + 1).toString();
        setMessages(prev => [...prev, { id: id2, sender: 'system', text: "[OK] Context matched. Synthesizing response...", isTyping: true }]);
        
        setTimeout(() => {
          const id3 = (Date.now() + 2).toString();
          setMessages(prev => [...prev, { id: id3, sender: 'agent', text: replyText, isTyping: true, isFinal: true }]);
        }, 1200);
      }, 1500);
    }, 500);
  };

  const completeTyping = (id: string, isFinal?: boolean) => {
    setMessages(prev => prev.map(msg => msg.id === id ? { ...msg, isTyping: false } : msg));
    if (isFinal) {
      setIsTyping(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-[100] w-14 h-14 bg-[#0a0a0a] border border-cyber-green/50 rounded-full flex items-center justify-center text-cyber-green shadow-[0_0_20px_rgba(0,255,157,0.2)] hover:shadow-[0_0_30px_rgba(0,255,157,0.4)] transition-all group pointer-events-auto"
          >
            <div className="absolute top-2 right-2 w-2.5 h-2.5 bg-cyber-green rounded-full animate-pulse shadow-[0_0_8px_#00ff9d]" />
            <TerminalIcon size={24} className="group-hover:scale-110 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[100] w-[calc(100vw-3rem)] sm:w-[400px] h-[500px] max-h-[80vh] bg-[#050505]/95 border border-cyber-green/30 rounded-lg shadow-2xl flex flex-col overflow-hidden pointer-events-auto backdrop-blur-xl"
          >
            {/* Header */}
            <div className="h-10 bg-[#0a0a0a] border-b border-cyber-green/20 flex items-center justify-between px-4 flex-shrink-0">
              <div className="flex items-center space-x-2">
                <TerminalIcon size={14} className="text-cyber-green" />
                <span className="text-[10px] uppercase font-mono text-cyber-green tracking-widest font-bold">Proxy_Agent.exe</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-neutral-500 hover:text-white transition-colors"
                title="Close Terminal"
              >
                <X size={16} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 p-4 overflow-y-auto font-mono text-sm space-y-6">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  <span className={`text-[9px] uppercase tracking-widest mb-1 opacity-50 ${msg.sender === 'user' ? 'text-white' : msg.sender === 'system' ? 'text-blue-400' : 'text-cyber-green'}`}>
                    {msg.sender === 'user' ? 'Guest' : msg.sender === 'system' ? 'System' : 'Proxy_Agent'}
                  </span>
                  <div className={`max-w-[85%] ${msg.sender === 'user' ? 'text-white/90' : msg.sender === 'system' ? 'text-blue-400' : 'text-cyber-green'}`}>
                    {msg.isTyping ? (
                      <Typewriter text={msg.text} onComplete={() => completeTyping(msg.id, msg.isFinal)} />
                    ) : (
                      <span className="whitespace-pre-wrap leading-relaxed">{msg.text}</span>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-cyber-green/10 bg-[#0a0a0a]/50 flex-shrink-0">
              <form onSubmit={handleSend} className="flex items-center">
                <span className="text-cyber-green mr-2 font-mono">{'>'}</span>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isTyping}
                  placeholder={isTyping ? "Processing..." : "Type a command (e.g., 'skills')..."}
                  className="w-full bg-transparent border-none outline-none text-white font-mono text-sm placeholder:text-neutral-700 disabled:opacity-50"
                  autoFocus
                />
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Typewriter({ text, onComplete }: { text: string, onComplete: () => void }) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 20); // Faster typewriter effect
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        onComplete();
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, onComplete]);

  return (
    <span>
      {displayText}
      <span className="animate-pulse bg-cyber-green w-2 h-4 inline-block ml-1 align-middle opacity-80" />
    </span>
  );
}
