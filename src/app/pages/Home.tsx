import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { supabase } from "@/app/utils/supabase";
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
  const [heroImage, setHeroImage] = useState<string>("/assets/images/IMG_20240913_131505.jpg");

  useEffect(() => {
    const fetchHeroImage = async () => {
      const { data, error } = await supabase
        .from("settings")
        .select("value")
        .eq("key", "hero_image")
        .single();
      if (!error && data?.value) {
        setHeroImage(data.value);
      }
    };
    fetchHeroImage();
  }, []);

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
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 pt-32 pb-12 overflow-hidden">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex-1 text-center lg:text-left order-2 lg:order-1"
            >
              {/* Greeting */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-8 shadow-sm backdrop-blur-sm"
              >
                <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                <span className="text-xs font-bold text-primary uppercase tracking-[0.2em]">Crafting Intelligent Solutions</span>
              </motion.div>

              {/* Name */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-6xl md:text-8xl lg:text-9xl font-black mb-6 tracking-tighter"
              >
                Sushil <br />
                <span className="bg-gradient-to-r from-primary via-blue-500 to-cyan-500 bg-clip-text text-transparent italic">
                  Dhakal
                </span>
              </motion.h1>

              {/* Title */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-center justify-center lg:justify-start gap-4 mb-8"
              >
                <div className="h-[1px] w-12 bg-primary hidden lg:block" />
                <p className="text-2xl md:text-3xl text-foreground/80 font-medium tracking-tight">
                  {personalInfo.title}
                </p>
              </motion.div>

              {/* Objective */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-lg md:text-xl text-muted-foreground max-w-xl lg:mx-0 mx-auto mb-12 leading-relaxed font-light"
              >
                {personalInfo.objective}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap items-center lg:justify-start justify-center gap-4"
              >
                <motion.button
                  onClick={openTerminal}
                  className="group flex items-center gap-3 px-8 py-4 bg-green-500/10 border border-green-500/20 rounded-2xl hover:bg-green-500/20 transition-all font-mono shadow-lg shadow-green-500/5"
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <TerminalIcon className="w-5 h-5 text-green-600 dark:text-green-500" />
                  <span className="text-green-600 dark:text-green-500 font-bold">Launch Console</span>
                </motion.button>

                <Link to="/projects">
                  <motion.button
                    className="group flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-2xl hover:opacity-90 transition-all shadow-xl shadow-primary/20 font-bold"
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>View Work</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Profile Image Section - Redesigned */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, duration: 1, ease: "circOut" }}
              className="relative order-1 lg:order-2"
            >
              {/* Main Image Container */}
              <div className="relative z-10 w-[300px] h-[400px] md:w-[400px] md:h-[500px] lg:w-[450px] lg:h-[600px] rounded-[2rem] overflow-hidden border-8 border-background shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-500 group">
                <img
                  src={heroImage}
                  alt={personalInfo.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />

                {/* Hover Details Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-primary/90 to-transparent backdrop-blur-sm">
                  <p className="text-primary-foreground font-bold text-lg mb-1">{personalInfo.name}</p>
                  <p className="text-primary-foreground/70 text-sm italic">{personalInfo.location[0]}</p>
                </div>
              </div>

              {/* Decorative Floating Elements */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-12 -right-12 w-40 h-40 bg-blue-500/20 blur-[80px] rounded-full -z-10"
              />
              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-12 -left-12 w-48 h-48 bg-purple-500/20 blur-[100px] rounded-full -z-10"
              />

              {/* Border Glow */}
              <div className="absolute -inset-2 bg-gradient-to-br from-primary/30 via-blue-500/30 to-cyan-500/30 blur-2xl rounded-[2.5rem] -z-20 opacity-50" />

              {/* Floating Badge */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="absolute -bottom-6 -right-6 md:-bottom-8 md:-right-8 z-20 bg-background/90 backdrop-blur-md border border-border p-4 md:p-6 rounded-3xl shadow-2xl flex items-center gap-4"
              >
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Briefcase className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                </div>
                <div>
                  <p className="text-[10px] md:text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Current Role</p>
                  <p className="text-sm md:text-lg font-black leading-tight text-foreground">AI / ML<br />Engineer</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, repeat: Infinity, repeatType: "reverse", duration: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer hidden lg:block"
          onClick={scrollToNext}
        >
          <div className="flex flex-col items-center gap-3 text-muted-foreground/60 hover:text-primary transition-colors">
            <span className="text-[10px] uppercase tracking-[0.4em] font-black">Explore</span>
            <div className="w-6 h-10 border border-current rounded-full flex items-start justify-center p-1.5">
              <motion.div
                animate={{ y: [0, 16, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-1 h-3 bg-primary rounded-full shadow-[0_0_5px_rgba(var(--primary),0.5)]"
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