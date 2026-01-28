import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Minimize2, Maximize2, Terminal as TerminalIcon } from "lucide-react";
import { personalInfo, experiences, education, projects, achievements } from "@/app/data/portfolio";

interface TerminalLine {
  type: "input" | "output" | "error";
  content: string;
}

export function Terminal({ onClose }: { onClose: () => void }) {
  const [isMaximized, setIsMaximized] = useState(false);
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: "output", content: "Welcome to Sushil's Portfolio Terminal v1.0" },
    { type: "output", content: "Type 'help' to see available commands" },
    { type: "output", content: "" },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [lines]);

  const commands: Record<string, () => string[]> = {
    help: () => [
      "Available commands:",
      "  whoami       - Display personal information",
      "  about        - Show detailed about me",
      "  skills       - List my technical skills",
      "  experience   - Show work experience",
      "  education    - Display education details",
      "  projects     - List my projects",
      "  achievements - Show achievements",
      "  contact      - Get contact information",
      "  clear        - Clear the terminal",
      "  exit         - Close the terminal",
      "",
    ],
    whoami: () => [
      `Name: ${personalInfo.name}`,
      `Title: ${personalInfo.title}`,
      `Location: ${personalInfo.location.join(" | ")}`,
      `Email: ${personalInfo.email}`,
      `GitHub: ${personalInfo.github}`,
      `LinkedIn: ${personalInfo.linkedin}`,
      "",
    ],
    about: () => [
      personalInfo.objective,
      "",
      `Languages: ${personalInfo.languages.map((l) => `${l.name} (${l.level})`).join(", ")}`,
      "",
    ],
    skills: () => {
      const output: string[] = ["Technical Skills:", ""];
      Object.entries(personalInfo.skills).forEach(([category, skills]) => {
        output.push(`${category}:`);
        output.push(`  ${skills}`);
        output.push("");
      });
      return output;
    },
    experience: () => {
      const output: string[] = ["Work Experience:", ""];
      experiences.forEach((exp, index) => {
        output.push(`${index + 1}. ${exp.title} @ ${exp.company}`);
        output.push(`   ${exp.period} | ${exp.location}`);
        exp.description.forEach((desc) => {
          output.push(`   • ${desc}`);
        });
        output.push("");
      });
      return output;
    },
    education: () => {
      const output: string[] = ["Education:", ""];
      education.forEach((edu) => {
        output.push(`${edu.degree}`);
        output.push(`${edu.institution}, ${edu.location}`);
        output.push(`${edu.period} | Grade: ${edu.grade}`);
        output.push("");
      });
      return output;
    },
    projects: () => {
      const output: string[] = ["Projects:", ""];
      projects.forEach((project, index) => {
        output.push(`${index + 1}. ${project.title}`);
        output.push(`   ${project.description}`);
        output.push(`   Technologies: ${project.technologies.join(", ")}`);
        if (project.demoLink) output.push(`   Demo: ${project.demoLink}`);
        output.push("");
      });
      return output;
    },
    achievements: () => {
      const output: string[] = ["Achievements & Activities:", ""];
      achievements.forEach((ach, index) => {
        output.push(`${index + 1}. ${ach.title}`);
        output.push(`   ${ach.description}`);
        output.push("");
      });
      return output;
    },
    contact: () => [
      "Contact Information:",
      `Email: ${personalInfo.email}`,
      `Phone: ${personalInfo.phone.join(" | ")}`,
      `LinkedIn: https://${personalInfo.linkedin}`,
      `GitHub: https://${personalInfo.github}`,
      "",
    ],
    clear: () => [],
    exit: () => ["Goodbye! Closing terminal..."],
  };

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    
    setLines((prev) => [...prev, { type: "input", content: `$ ${cmd}` }]);

    if (trimmedCmd === "") {
      setLines((prev) => [...prev, { type: "output", content: "" }]);
      return;
    }

    if (trimmedCmd === "clear") {
      setLines([]);
      return;
    }

    if (trimmedCmd === "exit") {
      setLines((prev) => [...prev, { type: "output", content: "Goodbye! Closing terminal..." }]);
      setTimeout(onClose, 500);
      return;
    }

    if (commands[trimmedCmd]) {
      const output = commands[trimmedCmd]();
      output.forEach((line) => {
        setLines((prev) => [...prev, { type: "output", content: line }]);
      });
    } else {
      setLines((prev) => [
        ...prev,
        { type: "error", content: `Command not found: ${trimmedCmd}. Type 'help' for available commands.` },
        { type: "output", content: "" },
      ]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      setHistory((prev) => [...prev, input]);
      setHistoryIndex(-1);
      handleCommand(input);
      setInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= history.length) {
          setHistoryIndex(-1);
          setInput("");
        } else {
          setHistoryIndex(newIndex);
          setInput(history[newIndex]);
        }
      }
    }
  };

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      className={`fixed ${
        isMaximized
          ? "inset-4"
          : "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px]"
      } bg-black/95 backdrop-blur-xl border border-green-500/30 rounded-lg shadow-2xl z-50 flex flex-col overflow-hidden`}
      drag={!isMaximized}
      dragMomentum={false}
    >
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-900 border-b border-green-500/30">
        <div className="flex items-center gap-2">
          <TerminalIcon className="w-4 h-4 text-green-500" />
          <span className="text-sm text-green-500 font-mono">sushil@portfolio:~$</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMaximized(!isMaximized)}
            className="p-1 hover:bg-gray-800 rounded transition-colors"
          >
            {isMaximized ? (
              <Minimize2 className="w-4 h-4 text-gray-400" />
            ) : (
              <Maximize2 className="w-4 h-4 text-gray-400" />
            )}
          </button>
          <button
            onClick={onClose}
            className="p-1 hover:bg-red-500/20 rounded transition-colors"
          >
            <X className="w-4 h-4 text-gray-400 hover:text-red-500" />
          </button>
        </div>
      </div>

      {/* Terminal Output */}
      <div
        ref={outputRef}
        className="flex-1 overflow-y-auto p-4 font-mono text-sm"
        onClick={() => inputRef.current?.focus()}
      >
        {lines.map((line, index) => (
          <div
            key={index}
            className={`mb-1 ${
              line.type === "input"
                ? "text-green-400"
                : line.type === "error"
                ? "text-red-400"
                : "text-gray-300"
            }`}
          >
            {line.content}
          </div>
        ))}

        {/* Input Line */}
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <span className="text-green-500">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-green-400 caret-green-500"
            autoFocus
            spellCheck={false}
          />
        </form>
      </div>
    </motion.div>
  );
}
