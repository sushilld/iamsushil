import React, { useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router";
import { Terminal as TerminalIcon, ArrowRight, Sparkles } from "lucide-react";
import { Navigation } from "@/app/components/Navigation";
import { InteractiveBackground, FloatingOrbs } from "@/app/components/InteractiveBackground";
import { Terminal } from "@/app/components/Terminal";
import { personalInfo } from "@/app/data/portfolio";

export default function Home() {
  const [showTerminal, setShowTerminal] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white relative overflow-hidden">
      <FloatingOrbs />
      <InteractiveBackground />
      <Navigation />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col lg:flex-row items-center justify-between gap-12"
          >
            {/* Profile Image Section */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="relative group"
            >
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden border-2 border-white/10 group-hover:border-blue-500/50 transition-all duration-500">
                <img
                  src="https://media.licdn.com/dms/image/v2/D4D03AQE_YV_P-H-vHA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1718274382583?e=1743638400&v=beta&t=H-O-h-h-h-h"
                  alt={personalInfo.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Decorative Elements */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-blue-500/50 rounded-tl-lg" />
              <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-purple-500/50 rounded-br-lg" />
            </motion.div>

            <div className="flex-1 text-center lg:text-left">
              {/* Greeting */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full mb-8"
              >
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-blue-400">Welcome to my digital space</span>
              </motion.div>

              {/* Name */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
              >
                {personalInfo.name}
              </motion.h1>

              {/* Title */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl md:text-2xl lg:text-3xl text-gray-400 mb-8 font-light"
              >
                {personalInfo.title}
              </motion.p>

              {/* Objective */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-lg text-gray-500 max-w-2xl lg:mx-0 mx-auto mb-12 leading-relaxed"
              >
                {personalInfo.objective}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap items-center lg:justify-start justify-center gap-4 mb-16"
              >
                <motion.button
                  onClick={() => setShowTerminal(true)}
                  className="group flex items-center gap-2 px-6 py-3 bg-green-500/10 border border-green-500/30 rounded-lg hover:bg-green-500/20 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <TerminalIcon className="w-5 h-5 text-green-400" />
                  <span className="text-green-400 font-mono">Open Terminal</span>
                </motion.button>

                <Link to="/projects">
                  <motion.button
                    className="group flex items-center gap-2 px-6 py-3 bg-blue-500 rounded-lg hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/25"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>View Projects</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </Link>

                <Link to="/gallery">
                  <motion.button
                    className="group flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all font-medium"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>View Gallery</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Tech Stack Showcase */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <p className="text-sm text-gray-600 mb-4 text-center">Tech Stack</p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {[
                "Python",
                "Machine Learning",
                "Deep Learning",
                "Computer Vision",
                "NLP",
                "Django",
                "FastAPI",
                "Docker",
                "Kubernetes",
                "AWS",
                "TensorFlow",
                "PyTorch",
              ].map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.05 }}
                  className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-gray-400 hover:border-blue-500/50 hover:text-blue-400 transition-all"
                  whileHover={{ scale: 1.1 }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, repeat: Infinity, repeatType: "reverse", duration: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1 h-2 bg-white/40 rounded-full"
            />
          </div>
        </motion.div>
      </div>

      {/* Terminal Modal */}
      {showTerminal && <Terminal onClose={() => setShowTerminal(false)} />}

      {/* Backdrop for terminal */}
      {showTerminal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setShowTerminal(false)}
        />
      )}
    </div>
  );
}