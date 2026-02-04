import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Home, Clock, FolderGit2, Image as ImageIcon, Github, Linkedin, Download, Terminal as TerminalIcon, Menu, X } from "lucide-react";
import { personalInfo } from "@/app/data/portfolio";
import { useTerminal } from "@/app/utils/TerminalContext";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/app/components/ui/button";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { openTerminal } = useTerminal();

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

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
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border transition-colors duration-300"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
            {personalInfo.name}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-2">
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
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                        }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </motion.div>
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute bottom-0 left-2 right-2 h-0.5 bg-primary"
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center gap-4 pl-4 border-l border-border">
              <motion.button
                onClick={openTerminal}
                className="p-2 bg-green-500/10 border border-green-500/30 rounded-lg text-green-600 dark:text-green-500 hover:bg-green-500/20 transition-all flex items-center gap-2"
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
                className="p-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-all flex items-center gap-2 shadow-sm"
                title="Download CV"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download className="w-4 h-4" />
                <span className="text-xs font-medium hidden lg:block">Download CV</span>
              </motion.a>

              <div className="ml-2 pl-4 border-l border-border">
                <ThemeToggle />
              </div>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-4">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border bg-background overflow-hidden"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                  >
                    <div
                      className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${isActive
                        ? "bg-primary text-primary-foreground shadow-lg"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
                        }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-base font-semibold">{item.label}</span>
                    </div>
                  </Link>
                );
              })}

              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border">
                <Button
                  onClick={openTerminal}
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2 border-green-500/30 text-green-600 dark:text-green-500 bg-green-500/5 hover:bg-green-500/10"
                >
                  <TerminalIcon className="w-4 h-4" />
                  <span className="text-sm font-mono">Terminal</span>
                </Button>
                <a
                  href="/assets/Sushil_Dhakal_RESUME.pdf"
                  download="Sushil_Dhakal_RESUME.pdf"
                  className="contents"
                >
                  <Button className="w-full flex items-center justify-center gap-2">
                    <Download className="w-4 h-4" />
                    <span className="text-sm">Resume</span>
                  </Button>
                </a>
              </div>

              <div className="flex items-center justify-center gap-8 pt-4">
                <a
                  href={`https://${personalInfo.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 text-muted-foreground hover:text-foreground hover:bg-accent rounded-full transition-all"
                >
                  <Github className="w-6 h-6" />
                </a>
                <a
                  href={`https://${personalInfo.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 text-muted-foreground hover:text-foreground hover:bg-accent rounded-full transition-all"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
