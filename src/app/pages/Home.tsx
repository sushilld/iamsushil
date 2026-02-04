import { motion } from "motion/react";
import { Link } from "react-router";
import { Terminal as TerminalIcon, ArrowRight, Sparkles, Briefcase, GraduationCap } from "lucide-react";
import { Navigation } from "@/app/components/Navigation";
import { InteractiveBackground, FloatingOrbs } from "@/app/components/InteractiveBackground";
import { personalInfo, experiences, education } from "@/app/data/portfolio";
import { useTerminal } from "@/app/utils/TerminalContext";
import { Contact } from "@/app/components/Contact";
import { Footer } from "@/app/components/Footer";

export default function Home() {
  const { openTerminal } = useTerminal();

  const scrollToNext = () => {
    const nextSection = document.getElementById("experience-section");
    nextSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative transition-colors duration-300">
      <FloatingOrbs />
      <InteractiveBackground />
      <Navigation />

      {/* Hero Section */}
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
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden border-2 border-border group-hover:border-primary/50 transition-all duration-500 shadow-2xl">
                <img
                  src="/assets/images/IMG_20240913_131505.jpg"
                  alt={personalInfo.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Decorative Elements */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-blue-500/20 blur-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-primary/50 rounded-tl-lg" />
              <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-primary/50 rounded-br-lg" />
            </motion.div>

            <div className="flex-1 text-center lg:text-left">
              {/* Greeting */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full mb-8 shadow-sm"
              >
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary uppercase tracking-wider">Welcome to my digital space</span>
              </motion.div>

              {/* Name */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent leading-[1.1]"
              >
                {personalInfo.name}
              </motion.h1>

              {/* Title */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-8 font-light"
              >
                {personalInfo.title}
              </motion.p>

              {/* Objective */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-lg text-muted-foreground/80 max-w-2xl lg:mx-0 mx-auto mb-12 leading-relaxed"
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
                  onClick={openTerminal}
                  className="group flex items-center gap-2 px-6 py-3 bg-green-500/10 border border-green-500/30 rounded-lg hover:bg-green-500/20 transition-all font-mono"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <TerminalIcon className="w-5 h-5 text-green-500" />
                  <span className="text-green-500">Open Terminal</span>
                </motion.button>

                <Link to="/projects">
                  <motion.button
                    className="group flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 font-semibold"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>View Projects</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </Link>

                <Link to="/gallery">
                  <motion.button
                    className="group flex items-center gap-2 px-6 py-3 bg-white/5 border border-border rounded-lg hover:bg-accent transition-all font-medium"
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
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, repeat: Infinity, repeatType: "reverse", duration: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer hidden md:block"
          onClick={scrollToNext}
        >
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <span className="text-[10px] uppercase tracking-widest font-bold">Scroll</span>
            <div className="w-6 h-10 border-2 border-border rounded-full flex items-start justify-center p-2">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="w-1 h-2 bg-primary/60 rounded-full"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Experience Section */}
      <section id="experience-section" className="relative z-10 py-24 px-4 mt-20">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-12"
          >
            <div className="p-3 bg-primary/10 border border-primary/30 rounded-xl shadow-lg">
              <Briefcase className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-4xl font-bold tracking-tight">Experience</h2>
          </motion.div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative pl-8 border-l-2 border-border hover:border-primary/50 transition-colors group"
              >
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-background border-2 border-primary shadow-[0_0_10px_rgba(var(--primary),0.5)]" />
                <div className="mb-4">
                  <span className="text-sm text-primary font-mono mb-1 block">{exp.period}</span>
                  <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">{exp.title}</h3>
                  <p className="text-lg text-muted-foreground/80">{exp.company}</p>
                </div>
                <ul className="space-y-3 text-muted-foreground/70">
                  {exp.description.slice(0, 3).map((item, i) => (
                    <li key={i} className="flex gap-3 text-sm leading-relaxed">
                      <span className="text-primary mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                  {exp.description.length > 3 && (
                    <li className="text-xs text-primary mt-2 font-medium italic">Read more in timeline...</li>
                  )}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="relative z-10 py-24 px-4 bg-accent/30 backdrop-blur-sm mt-20 border-y border-border">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-12"
          >
            <div className="p-3 bg-purple-500/10 border border-purple-500/30 rounded-xl shadow-lg">
              <GraduationCap className="w-8 h-8 text-purple-400" />
            </div>
            <h2 className="text-4xl font-bold tracking-tight">Education</h2>
          </motion.div>

          <div className="grid gap-8">
            {education.map((edu) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 rounded-3xl bg-card border border-border hover:border-purple-500/50 transition-all shadow-sm hover:shadow-xl"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-1">{edu.degree}</h3>
                    <p className="text-purple-400 text-lg mb-2 font-medium">{edu.institution}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50" />
                      {edu.location}
                    </p>
                  </div>
                  <div className="md:text-right flex flex-col items-start md:items-end gap-2">
                    <span className="px-4 py-1 bg-purple-500/10 border border-purple-500/30 rounded-full text-sm text-purple-400 font-bold whitespace-nowrap">{edu.period}</span>
                    <p className="text-lg font-bold text-muted-foreground">{edu.grade}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <Contact />

      {/* Footer */}
      <Footer />
    </div>
  );
}