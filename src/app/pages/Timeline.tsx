import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Navigation } from "@/app/components/Navigation";
import { FloatingOrbs } from "@/app/components/InteractiveBackground";
import { timelineEvents } from "@/app/data/portfolio";
import { Briefcase, GraduationCap, Trophy, MapPin, Calendar } from "lucide-react";

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const getIcon = (type: string) => {
    switch (type) {
      case "experience":
        return Briefcase;
      case "education":
        return GraduationCap;
      case "achievement":
        return Trophy;
      default:
        return Briefcase;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden transition-colors duration-300">
      <FloatingOrbs />
      <Navigation />

      <div ref={containerRef} className="relative z-10 pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-20"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              My Journey
            </h1>
            <p className="text-xl text-muted-foreground">
              A timeline of experiences, education, and achievements
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Progress Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2 hidden md:block">
              <motion.div
                style={{ height: lineHeight }}
                className="w-full bg-gradient-to-b from-blue-500 via-purple-500 to-cyan-500"
              />
            </div>

            {/* Timeline Items */}
            <div className="space-y-12">
              {timelineEvents.map((event: any, index: number) => {
                const Icon = getIcon(event.type);
                const isLeft = index % 2 === 0;

                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className={`relative flex ${isLeft ? "md:justify-start" : "md:justify-end"} justify-start`}
                  >
                    {/* Timeline Node */}
                    <div className="absolute left-1/2 top-8 w-4 h-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-background border-4 border-primary z-10 hidden md:block shadow-[0_0_10px_rgba(var(--primary),0.3)]" />

                    {/* Content Card */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className={`w-full md:w-5/12 ${isLeft ? "md:pr-12" : "md:pl-12"}`}
                    >
                      <div className="relative bg-card backdrop-blur-md border border-border rounded-xl p-6 hover:border-primary/50 transition-all shadow-sm hover:shadow-lg">
                        {/* Type Badge */}
                        <div
                          className={`absolute -top-3 ${isLeft ? "right-6" : "left-6"} flex items-center gap-2 px-3 py-1 bg-accent border border-border rounded-full shadow-sm`}
                        >
                          <Icon className="w-3 h-3 text-primary" />
                          <span className="text-[10px] font-bold text-primary uppercase tracking-wider">
                            {event.type}
                          </span>
                        </div>

                        {/* Content */}
                        <div className="mt-4">
                          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{event.title}</h3>

                          {event.company && (
                            <p className="text-muted-foreground font-medium mb-3">{event.company}</p>
                          )}

                          <div className="flex flex-wrap gap-4 text-xs text-muted-foreground/70 mb-4 bg-accent/50 p-2 rounded-lg">
                            {event.period && (
                              <span className="flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5 text-primary" />
                                {event.period}
                              </span>
                            )}
                            {event.location && (
                              <span className="flex items-center gap-1.5">
                                <MapPin className="w-3.5 h-3.5 text-primary" />
                                {event.location}
                              </span>
                            )}
                          </div>

                          {event.description && (
                            <div className="space-y-2 text-muted-foreground/80 text-sm">
                              {Array.isArray(event.description) ? (
                                <ul className="space-y-2">
                                  {event.description.slice(0, 3).map((desc: string, idx: number) => (
                                    <li key={idx} className="flex items-start gap-2 leading-relaxed">
                                      <span className="text-primary mt-1">•</span>
                                      <span>{desc}</span>
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                <p className="leading-relaxed">{event.description}</p>
                              )}
                            </div>
                          )}

                          {event.grade && (
                            <p className="text-primary font-bold text-sm mt-3 pt-3 border-t border-border/50">Grade: {event.grade}</p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* End Marker */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mt-12 flex justify-center"
          >
            <div className="flex items-center gap-2 px-6 py-2 bg-accent border border-border rounded-full shadow-inner">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Present Day</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}