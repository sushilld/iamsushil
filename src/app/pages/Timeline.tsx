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

  const getColor = (type: string) => {
    switch (type) {
      case "experience":
        return "blue";
      case "education":
        return "purple";
      case "achievement":
        return "yellow";
      default:
        return "blue";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white relative overflow-hidden">
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
            <p className="text-xl text-gray-400">
              A timeline of experiences, education, and achievements
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Progress Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-white/10 -translate-x-1/2 hidden md:block">
              <motion.div
                style={{ height: lineHeight }}
                className="w-full bg-gradient-to-b from-blue-500 via-purple-500 to-cyan-500"
              />
            </div>

            {/* Timeline Items */}
            <div className="space-y-12">
              {timelineEvents.map((event, index) => {
                const Icon = getIcon(event.type);
                const color = getColor(event.type);
                const isLeft = index % 2 === 0;

                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className={`relative flex ${
                      isLeft ? "md:justify-start" : "md:justify-end"
                    } justify-start`}
                  >
                    {/* Timeline Node */}
                    <div className="absolute left-1/2 top-8 w-4 h-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white border-4 border-gray-900 z-10 hidden md:block" />

                    {/* Content Card */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className={`w-full md:w-5/12 ${
                        isLeft ? "md:pr-12" : "md:pl-12"
                      }`}
                    >
                      <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all">
                        {/* Type Badge */}
                        <div
                          className={`absolute -top-3 ${
                            isLeft ? "right-6" : "left-6"
                          } flex items-center gap-2 px-3 py-1 bg-${color}-500/20 border border-${color}-500/50 rounded-full`}
                        >
                          <Icon className={`w-4 h-4 text-${color}-400`} />
                          <span className={`text-xs text-${color}-400 capitalize`}>
                            {event.type}
                          </span>
                        </div>

                        {/* Content */}
                        <div className="mt-4">
                          <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                          
                          {event.company && (
                            <p className="text-gray-400 mb-2">{event.company}</p>
                          )}

                          <div className="flex flex-wrap gap-3 text-sm text-gray-500 mb-4">
                            {event.period && (
                              <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {event.period}
                              </span>
                            )}
                            {event.location && (
                              <span className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {event.location}
                              </span>
                            )}
                          </div>

                          {event.description && Array.isArray(event.description) && (
                            <ul className="space-y-2 text-gray-400 text-sm">
                              {event.description.slice(0, 3).map((desc, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <span className="text-blue-400 mt-1">•</span>
                                  <span>{desc}</span>
                                </li>
                              ))}
                            </ul>
                          )}

                          {event.description && typeof event.description === "string" && (
                            <p className="text-gray-400 text-sm">{event.description}</p>
                          )}

                          {event.grade && (
                            <p className="text-blue-400 text-sm mt-2">Grade: {event.grade}</p>
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
            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 border border-white/10 rounded-full">
              <span className="text-sm text-gray-400">Present Day</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}