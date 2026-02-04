import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Navigation } from "@/app/components/Navigation";
import { FloatingOrbs } from "@/app/components/InteractiveBackground";
import { projects as initialProjects } from "@/app/data/portfolio";
import { ExternalLink, Github, Image as ImageIcon, Loader2 } from "lucide-react";
import { supabase } from "@/app/utils/supabase";

export default function Projects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data && data.length > 0) {
        setProjects(data);
      } else {
        setProjects(initialProjects);
      }
      setIsLoading(false);
    };
    loadProjects();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <FloatingOrbs />
      <Navigation />

      <div className="relative z-10 pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Projects
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              A showcase of my work in AI, ML, and Software Development
            </p>
          </motion.div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
              <p className="text-muted-foreground animate-pulse">Fetching projects...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group relative bg-card backdrop-blur-md border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all shadow-sm hover:shadow-lg"
                >
                  {/* Project Image Placeholder */}
                  <div className="relative h-48 bg-muted flex items-center justify-center overflow-hidden">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <ImageIcon className="w-16 h-16 text-muted-foreground opacity-20" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                  </div>

                  {/* Project Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech: string, idx: number) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-primary/5 border border-primary/10 rounded-md text-[10px] font-medium text-primary tracking-wide uppercase"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-4 mt-auto">
                      {(project.demo_link || project.demoLink) && (
                        <motion.a
                          href={project.demo_link || project.demoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center gap-1.5 text-sm font-semibold text-primary hover:opacity-80 transition-opacity"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Demo
                        </motion.a>
                      )}
                      {(project.github_link || project.githubLink) && (
                        <motion.a
                          href={project.github_link || project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Github className="w-4 h-4" />
                          Code
                        </motion.a>
                      )}
                    </div>
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 border-2 border-primary/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}