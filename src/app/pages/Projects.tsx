import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Navigation } from "@/app/components/Navigation";
import { FloatingOrbs } from "@/app/components/InteractiveBackground";
import { projects as initialProjects } from "@/app/data/portfolio";
import { ExternalLink, Github, Plus, X, Image as ImageIcon, Lock, LogOut } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { Button } from "@/app/components/ui/button";
import { storage } from "@/app/utils/storage";
import { toast } from "sonner";

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image: string | null;
  demoLink: string | null;
  githubLink: string | null;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [password, setPassword] = useState("");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newProject, setNewProject] = useState<Partial<Project>>({
    title: "",
    description: "",
    technologies: [],
    image: null,
    demoLink: null,
    githubLink: null,
  });
  const [techInput, setTechInput] = useState("");

  useEffect(() => {
    const loadProjects = async () => {
      setProjects(await storage.getProjects(initialProjects));
    };
    loadProjects();
    setIsAdmin(storage.isAdmin());
  }, []);

  const handleLogin = () => {
    // In a real app, this would be a secure backend check.
    // For this demonstration, we use a simple hardcoded "password".
    if (password === "admin123") {
      storage.setAdmin(true);
      setIsAdmin(true);
      setShowLoginDialog(false);
      setPassword("");
      toast.success("Welcome back, Admin!");
    } else {
      toast.error("Invalid password");
    }
  };

  const handleLogout = () => {
    storage.setAdmin(false);
    setIsAdmin(false);
    toast.info("Logged out from Admin mode");
  };

  const handleAddProject = async () => {
    if (newProject.title && newProject.description) {
      const project: Project = {
        id: Date.now(), // More reliable ID for local persistence
        title: newProject.title,
        description: newProject.description,
        technologies: newProject.technologies || [],
        image: newProject.image || null,
        demoLink: newProject.demoLink || null,
        githubLink: newProject.githubLink || null,
      };
      const updatedProjects = [...projects, project];
      setProjects(updatedProjects);
      await storage.saveProjects(updatedProjects);
      setNewProject({
        title: "",
        description: "",
        technologies: [],
        image: null,
        demoLink: null,
        githubLink: null,
      });
      setTechInput("");
      setShowAddDialog(false);
      toast.success("Project added successfully!");
    }
  };

  const addTechnology = () => {
    if (techInput.trim() && newProject.technologies) {
      setNewProject({
        ...newProject,
        technologies: [...newProject.technologies, techInput.trim()],
      });
      setTechInput("");
    }
  };

  const removeTechnology = (index: number) => {
    if (newProject.technologies) {
      setNewProject({
        ...newProject,
        technologies: newProject.technologies.filter((_, i) => i !== index),
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white relative overflow-hidden">
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
            <p className="text-xl text-gray-400 mb-8">
              A showcase of my work in AI, ML, and Software Development
            </p>

            <div className="flex items-center justify-center gap-4 mb-8">
              {isAdmin ? (
                <>
                  <motion.button
                    onClick={() => setShowAddDialog(true)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                    Add New Project
                  </motion.button>
                  <motion.button
                    onClick={handleLogout}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-red-500/20 border border-red-500/50 text-red-500 rounded-lg hover:bg-red-500/30 transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    Logout
                  </motion.button>
                </>
              ) : (
                <motion.button
                  onClick={() => setShowLoginDialog(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <Lock className="w-5 h-5" />
                  Admin Login
                </motion.button>
              )}
            </div>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-all"
              >
                {/* Project Image Placeholder */}
                <div className="relative h-48 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-cyan-500/20 flex items-center justify-center">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ImageIcon className="w-16 h-16 text-white/20" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-gray-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-3">
                    {project.demoLink && (
                      <motion.a
                        href={project.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Demo
                      </motion.a>
                    )}
                    {project.githubLink && (
                      <motion.a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="flex items-center gap-1 text-sm text-gray-400 hover:text-white"
                      >
                        <Github className="w-4 h-4" />
                        Code
                      </motion.a>
                    )}
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Project Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="bg-gray-900 border-white/20 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Add New Project</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Project Title</label>
              <Input
                value={newProject.title || ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewProject({ ...newProject, title: e.target.value })}
                placeholder="Enter project title"
                className="bg-white/5 border-white/10 text-white"
              />
            </div>

            <div>
              <label className="text-sm text-gray-400 mb-2 block">Description</label>
              <Textarea
                value={newProject.description || ""}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewProject({ ...newProject, description: e.target.value })}
                placeholder="Describe your project"
                rows={4}
                className="bg-white/5 border-white/10 text-white"
              />
            </div>

            <div>
              <label className="text-sm text-gray-400 mb-2 block">Technologies</label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={techInput}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTechInput(e.target.value)}
                  onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && (e.preventDefault(), addTechnology())}
                  placeholder="Add technology"
                  className="bg-white/5 border-white/10 text-white flex-1"
                />
                <Button
                  onClick={addTechnology}
                  type="button"
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {newProject.technologies?.map((tech, idx) => (
                  <span
                    key={idx}
                    className="flex items-center gap-1 px-2 py-1 bg-blue-500/20 border border-blue-500/50 rounded text-sm"
                  >
                    {tech}
                    <button onClick={() => removeTechnology(idx)} className="hover:text-red-400">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-400 mb-2 block">Image URL (optional)</label>
              <Input
                value={newProject.image || ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewProject({ ...newProject, image: e.target.value })}
                placeholder="https://example.com/image.jpg"
                className="bg-white/5 border-white/10 text-white"
              />
            </div>

            <div>
              <label className="text-sm text-gray-400 mb-2 block">Demo Link (optional)</label>
              <Input
                value={newProject.demoLink || ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewProject({ ...newProject, demoLink: e.target.value })}
                placeholder="https://demo.com"
                className="bg-white/5 border-white/10 text-white"
              />
            </div>

            <div>
              <label className="text-sm text-gray-400 mb-2 block">GitHub Link (optional)</label>
              <Input
                value={newProject.githubLink || ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewProject({ ...newProject, githubLink: e.target.value })}
                placeholder="https://github.com/username/repo"
                className="bg-white/5 border-white/10 text-white"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                onClick={handleAddProject}
                className="flex-1 bg-blue-500 hover:bg-blue-600"
              >
                Add Project
              </Button>
              <Button
                onClick={() => setShowAddDialog(false)}
                variant="outline"
                className="flex-1 border-white/20 hover:bg-white/5"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Login Dialog */}
      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent className="bg-gray-900 border-white/20 text-white max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Admin Access</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Admin Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && handleLogin()}
                placeholder="Enter password"
                className="bg-white/5 border-white/10 text-white"
              />
            </div>
            <Button
              onClick={handleLogin}
              className="w-full bg-blue-500 hover:bg-blue-600"
            >
              Login
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}