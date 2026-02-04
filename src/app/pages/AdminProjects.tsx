"use client";

import React, { useState, useEffect } from "react";
import {
    Plus,
    Trash2,
    ExternalLink,
    Github,
    Image as ImageIcon,
    Pencil,
    X
} from "lucide-react";
import { motion } from "motion/react";
import { storage } from "@/app/utils/storage";
import { projects as initialProjects } from "@/app/data/portfolio";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/app/components/ui/dialog";
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

export default function AdminProjects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showAddDialog, setShowAddDialog] = useState(false);
    const [editingProject, setEditingProject] = useState<Project | null>(null);

    const [formData, setFormData] = useState<Partial<Project>>({
        title: "",
        description: "",
        technologies: [],
        image: "",
        demoLink: "",
        githubLink: "",
    });
    const [techInput, setTechInput] = useState("");

    useEffect(() => {
        const loadProjects = async () => {
            setIsLoading(true);
            const data = await storage.getProjects(initialProjects);
            setProjects(data);
            setIsLoading(false);
        };
        loadProjects();
    }, []);

    const handleSave = async () => {
        if (!formData.title || !formData.description) {
            toast.error("Title and Description are required");
            return;
        }

        let updatedProjects;
        if (editingProject) {
            updatedProjects = projects.map(p => p.id === editingProject.id ? { ...p, ...formData } as Project : p);
            toast.success("Project updated successfully");
        } else {
            const newProject = {
                ...formData,
                id: Date.now(),
                technologies: formData.technologies || [],
            } as Project;
            updatedProjects = [...projects, newProject];
            toast.success("Project added successfully");
        }

        setProjects(updatedProjects);
        await storage.saveProjects(updatedProjects);
        handleCloseDialog();
    };

    const handleDelete = async (id: number) => {
        if (window.confirm("Are you sure you want to delete this project?")) {
            const updatedProjects = projects.filter(p => p.id !== id);
            setProjects(updatedProjects);
            await storage.saveProjects(updatedProjects);
            toast.info("Project removed");
        }
    };

    const handleOpenEdit = (project: Project) => {
        setEditingProject(project);
        setFormData(project);
        setShowAddDialog(true);
    };

    const handleCloseDialog = () => {
        setShowAddDialog(false);
        setEditingProject(null);
        setFormData({
            title: "",
            description: "",
            technologies: [],
            image: "",
            demoLink: "",
            githubLink: "",
        });
        setTechInput("");
    };

    const addTech = () => {
        if (techInput.trim()) {
            setFormData({
                ...formData,
                technologies: [...(formData.technologies || []), techInput.trim()]
            });
            setTechInput("");
        }
    };

    const removeTech = (index: number) => {
        setFormData({
            ...formData,
            technologies: formData.technologies?.filter((_, i) => i !== index)
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Manage Projects</h1>
                    <p className="text-muted-foreground text-sm">Add, edit, or remove projects from your portfolio showcase.</p>
                </div>
                <Button onClick={() => setShowAddDialog(true)} className="flex items-center gap-2">
                    <Plus className="w-4 h-4" /> Add Project
                </Button>
            </div>

            <div className="bg-card border border-border rounded-2xl overflow-hidden">
                {isLoading ? (
                    <div className="p-12 text-center text-muted-foreground italic">Loading projects...</div>
                ) : projects.length === 0 ? (
                    <div className="p-12 text-center text-muted-foreground italic">No projects found.</div>
                ) : (
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-muted/50 border-b border-border">
                                <th className="p-4 font-semibold text-sm">Project</th>
                                <th className="p-4 font-semibold text-sm">Technologies</th>
                                <th className="p-4 font-semibold text-sm">Links</th>
                                <th className="p-4 font-semibold text-sm text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map((project) => (
                                <tr key={project.id} className="border-b border-border hover:bg-muted/30 transition-colors group">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center shrink-0 overflow-hidden">
                                                {project.image ? (
                                                    <img src={project.image} alt="" className="w-full h-full object-cover" />
                                                ) : (
                                                    <ImageIcon className="w-6 h-6 text-muted-foreground" />
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-bold text-sm">{project.title}</p>
                                                <p className="text-xs text-muted-foreground line-clamp-1 max-w-[200px]">{project.description}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex flex-wrap gap-1">
                                            {project.technologies.slice(0, 3).map((tech, i) => (
                                                <span key={i} className="px-2 py-0.5 bg-accent rounded text-[10px] font-medium">
                                                    {tech}
                                                </span>
                                            ))}
                                            {project.technologies.length > 3 && (
                                                <span className="text-[10px] text-muted-foreground">+{project.technologies.length - 3}</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            {project.demoLink && <ExternalLink className="w-4 h-4 text-primary" />}
                                            {project.githubLink && <Github className="w-4 h-4 text-muted-foreground" />}
                                        </div>
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Button variant="ghost" size="icon" onClick={() => handleOpenEdit(project)}>
                                                <Pencil className="w-4 h-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" onClick={() => handleDelete(project.id)} className="text-destructive hover:text-destructive">
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            <Dialog open={showAddDialog} onOpenChange={handleCloseDialog}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>{editingProject ? "Edit Project" : "Add New Project"}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="grid gap-2">
                            <label className="text-sm font-medium">Project Title</label>
                            <Input
                                value={formData.title}
                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                                placeholder="Awesome Project Name"
                            />
                        </div>
                        <div className="grid gap-2">
                            <label className="text-sm font-medium">Description</label>
                            <Textarea
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                                placeholder="What did you build?"
                                rows={3}
                            />
                        </div>
                        <div className="grid gap-2">
                            <label className="text-sm font-medium">Technologies</label>
                            <div className="flex gap-2">
                                <Input
                                    value={techInput}
                                    onChange={e => setTechInput(e.target.value)}
                                    onKeyPress={e => e.key === "Enter" && addTech()}
                                    placeholder="React, Tailwind, etc."
                                />
                                <Button onClick={addTech} type="button">Add</Button>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {formData.technologies?.map((tech, i) => (
                                    <span key={i} className="flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary border border-primary/20 rounded text-xs px-3">
                                        {tech}
                                        <button onClick={() => removeTech(i)} className="hover:text-destructive"><X className="w-3 h-3" /></button>
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <label className="text-sm font-medium">Demo Link</label>
                                <Input value={formData.demoLink || ""} onChange={e => setFormData({ ...formData, demoLink: e.target.value })} placeholder="https://..." />
                            </div>
                            <div className="grid gap-2">
                                <label className="text-sm font-medium">Github Link</label>
                                <Input value={formData.githubLink || ""} onChange={e => setFormData({ ...formData, githubLink: e.target.value })} placeholder="https://..." />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <label className="text-sm font-medium">Image URL</label>
                            <Input value={formData.image || ""} onChange={e => setFormData({ ...formData, image: e.target.value })} placeholder="https://..." />
                        </div>
                    </div>
                    <div className="flex justify-end gap-3">
                        <Button variant="outline" onClick={handleCloseDialog}>Cancel</Button>
                        <Button onClick={handleSave}>Save Changes</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
