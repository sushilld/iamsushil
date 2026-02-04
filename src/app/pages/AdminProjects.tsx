"use client";

import { useState, useEffect } from "react";
import {
    Plus,
    Trash2,
    ExternalLink,
    Github,
    Image as ImageIcon,
    Pencil,
    X,
    Loader2
} from "lucide-react";
import { supabase } from "@/app/utils/supabase";
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
    const [newImageFile, setNewImageFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

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
            const { data, error } = await supabase
                .from("projects")
                .select("*")
                .order("created_at", { ascending: false });

            if (!error && data) {
                setProjects(data);
            }
            setIsLoading(false);
        };
        loadProjects();
    }, []);

    const handleImageUpload = async (file: File) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `projects/${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('portfolio-assets')
            .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
            .from('portfolio-assets')
            .getPublicUrl(filePath);

        return publicUrl;
    };

    const handleSave = async () => {
        if (!formData.title || !formData.description) {
            toast.error("Title and Description are required");
            return;
        }

        setIsLoading(true);
        try {
            let imageUrl = formData.image;
            if (newImageFile) {
                imageUrl = await handleImageUpload(newImageFile);
            }

            const projectData = {
                title: formData.title,
                description: formData.description,
                technologies: formData.technologies,
                image: imageUrl,
                demo_link: formData.demoLink,
                github_link: formData.githubLink,
            };

            if (editingProject) {
                const { error } = await supabase
                    .from("projects")
                    .update(projectData)
                    .eq("id", editingProject.id);
                if (error) throw error;
                toast.success("Project updated successfully");
            } else {
                const { error } = await supabase
                    .from("projects")
                    .insert([projectData]);
                if (error) throw error;
                toast.success("Project added successfully");
            }

            // Refresh project list
            const { data } = await supabase.from("projects").select("*").order("created_at", { ascending: false });
            if (data) setProjects(data);
            handleCloseDialog();
        } catch (error: any) {
            console.error("Save error:", error);
            toast.error(error.message || "Failed to save project");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (window.confirm("Are you sure you want to delete this project?")) {
            try {
                const { error } = await supabase.from("projects").delete().eq("id", id);
                if (error) throw error;
                setProjects(projects.filter(p => p.id !== id));
                toast.info("Project removed");
            } catch (error: any) {
                toast.error(error.message || "Failed to delete project");
            }
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
        setNewImageFile(null);
        setPreviewUrl(null);
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
                            <label className="text-sm font-medium">Project Image</label>
                            <div className="flex gap-4 items-start">
                                <div className="w-24 h-24 rounded-lg bg-accent border-2 border-dashed border-border flex items-center justify-center overflow-hidden shrink-0 relative group">
                                    {(previewUrl || formData.image) ? (
                                        <img src={previewUrl || formData.image || ""} alt="" className="w-full h-full object-cover" />
                                    ) : (
                                        <ImageIcon className="w-6 h-6 text-muted-foreground" />
                                    )}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                setNewImageFile(file);
                                                setPreviewUrl(URL.createObjectURL(file));
                                            }
                                        }}
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                    />
                                </div>
                                <div className="flex-1 space-y-1">
                                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Click to upload</p>
                                    <p className="text-[10px] text-muted-foreground leading-relaxed">
                                        Best aspect ratio 16:9 or 4:3. <br />
                                        Max size 5MB.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end gap-3 pt-4 border-t border-border bg-card sticky bottom-0">
                        <Button variant="outline" onClick={handleCloseDialog} disabled={isLoading}>Cancel</Button>
                        <Button onClick={handleSave} disabled={isLoading}>
                            {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                            {editingProject ? "Update Project" : "Add Project"}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
