import { Link, useLocation } from "react-router";
import { motion } from "motion/react";
import { Home, Clock, FolderGit2, Image as ImageIcon, Github, Linkedin, Mail, Download, Terminal as TerminalIcon } from "lucide-react";
import { personalInfo } from "@/app/data/portfolio";
import { useTerminal } from "@/app/utils/TerminalContext";

export function Navigation() {
  const location = useLocation();
  const { openTerminal } = useTerminal();

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/timeline", label: "Timeline", icon: Clock },
    { path: "/projects", label: "Projects", icon: FolderGit2 },
    { path: "/gallery", label: "Gallery", icon: ImageIcon },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl font-bold text-white hover:text-blue-400 transition-colors">
            {personalInfo.name}
          </Link>

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-6">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="relative group"
                  >
                    <motion.div
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${isActive
                        ? "text-blue-400"
                        : "text-gray-400 hover:text-white"
                        }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm">{item.label}</span>
                    </motion.div>
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400"
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center gap-4 pl-4 border-l border-white/10">
              <motion.button
                onClick={openTerminal}
                className="p-2 bg-green-500/10 border border-green-500/30 rounded-lg text-green-500 hover:bg-green-500/20 transition-all flex items-center gap-2"
                title="Open Terminal"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <TerminalIcon className="w-4 h-4" />
                <span className="text-xs font-mono hidden lg:block">Terminal</span>
              </motion.button>

              <motion.a
                href="/assets/Sushil_Dhakal_RESUME.pdf"
                download="Sushil_Dhakal_RESUME.pdf"
                className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all flex items-center gap-2"
                title="Download CV"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download className="w-4 h-4" />
                <span className="text-xs font-medium hidden lg:block">Download CV</span>
              </motion.a>

              <div className="flex items-center gap-3 ml-2">
                <motion.a
                  href={`https://${personalInfo.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Github className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href={`https://${personalInfo.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Linkedin className="w-5 h-5" />
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
