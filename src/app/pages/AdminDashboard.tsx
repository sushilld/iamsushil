"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
    FolderGit2,
    Image as ImageIcon,
    ArrowUpRight,
    Eye,
    Clock,
    Upload,
    Save,
    Image as ImageDefault,
    Trash2,
    Loader2
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/app/utils/supabase";

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        projects: 0,
        gallery: 0,
    });
    const [heroImage, setHeroImage] = useState<string>("/assets/images/IMG_20240913_131505.jpg");
    const [newImage, setNewImage] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    useEffect(() => {
        const loadInitialData = async () => {
            // Fetch live counts
            const { count: projectCount } = await supabase
                .from("projects")
                .select("*", { count: 'exact', head: true });

            const { count: galleryCount } = await supabase
                .from("gallery")
                .select("*", { count: 'exact', head: true });

            setStats({
                projects: projectCount || 0,
                gallery: galleryCount || 0,
            });

            // Load hero image from settings
            const { data, error } = await supabase
                .from("settings")
                .select("value")
                .eq("key", "hero_image")
                .single();

            if (!error && data?.value) {
                setHeroImage(data.value);
            }
        };
        loadInitialData();
    }, []);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setNewImage(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleUploadHero = async () => {
        if (!newImage) return;
        setIsUploading(true);

        try {
            const fileExt = newImage.name.split('.').pop();
            const fileName = `hero-${Math.random()}.${fileExt}`;
            const filePath = `uploads/${fileName}`;

            // 1. Upload to Supabase Storage
            const { error: uploadError } = await supabase.storage
                .from('portfolio-assets')
                .upload(filePath, newImage);

            if (uploadError) throw uploadError;

            // 2. Get Public URL
            const { data: { publicUrl } } = supabase.storage
                .from('portfolio-assets')
                .getPublicUrl(filePath);

            // 3. Update Settings Table
            const { error: updateError } = await supabase
                .from('settings')
                .upsert({ key: 'hero_image', value: publicUrl });

            if (updateError) throw updateError;

            setHeroImage(publicUrl);
            setNewImage(null);
            setPreviewUrl(null);
            toast.success("Hero image updated successfully!");
        } catch (error: any) {
            console.error("Upload error:", error);
            toast.error(error.message || "Failed to update hero image.");
        } finally {
            setIsUploading(false);
        }
    };

    const cards = [
        { label: "Total Projects", value: stats.projects, icon: FolderGit2, color: "text-blue-500", bg: "bg-blue-500/10" },
        { label: "Gallery Photos", value: stats.gallery, icon: ImageIcon, color: "text-purple-500", bg: "bg-purple-500/10" },
        { label: "Total Visits", value: "1.2k", icon: Eye, color: "text-green-500", bg: "bg-green-500/10" },
        { label: "Hours Worked", value: "320", icon: Clock, color: "text-orange-500", bg: "bg-orange-500/10" },
    ];

    return (
        <div className="space-y-8 pb-12 text-foreground">
            <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                    Welcome back, Sushil!
                </h1>
                <p className="text-muted-foreground mt-2">Here's what's happening with your portfolio today.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card, index) => (
                    <motion.div
                        key={card.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-6 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-start justify-between">
                            <div className={`p-3 rounded-xl ${card.bg}`}>
                                <card.icon className={`w-6 h-6 ${card.color}`} />
                            </div>
                            <span className="flex items-center gap-1 text-xs font-medium text-green-500 bg-green-500/10 px-2 py-1 rounded-full">
                                +12% <ArrowUpRight className="w-3 h-3" />
                            </span>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-muted-foreground text-sm font-medium">{card.label}</h3>
                            <p className="text-3xl font-bold mt-1">{card.value}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Hero Image Manager */}
                <div className="lg:col-span-2 p-8 rounded-3xl bg-card border border-border shadow-sm space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold">Hero Image Manager</h3>
                        <ImageDefault className="w-5 h-5 text-muted-foreground" />
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 items-start">
                        <div className="space-y-4">
                            <p className="text-sm font-medium text-muted-foreground italic">Current Image Preview</p>
                            <div className="relative group aspect-[4/5] rounded-2xl overflow-hidden border-2 border-border shadow-lg">
                                <img
                                    src={previewUrl || heroImage}
                                    alt="Hero Preview"
                                    className="w-full h-full object-cover"
                                />
                                {isUploading && (
                                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex flex-col items-center justify-center text-white gap-3">
                                        <Loader2 className="w-8 h-8 animate-spin" />
                                        <span className="text-sm font-bold">Uploading...</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="relative p-6 rounded-2xl bg-accent/50 border border-dashed border-border flex flex-col items-center justify-center text-center space-y-4 group hover:border-primary/50 transition-colors">
                                <div className="p-4 bg-primary/10 rounded-full text-primary">
                                    <Upload className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="font-bold">Choose New Image</p>
                                    <p className="text-xs text-muted-foreground mt-1">PNG, JPG or WEBP (Max 5MB)</p>
                                </div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                />
                            </div>

                            {newImage && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-4 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-between"
                                >
                                    <div className="flex items-center gap-3 overflow-hidden">
                                        <div className="w-10 h-10 rounded-lg bg-primary/20 shrink-0 flex items-center justify-center">
                                            <ImageIcon className="w-5 h-5 text-primary" />
                                        </div>
                                        <div className="overflow-hidden">
                                            <p className="text-xs font-bold truncate max-w-[150px]">{newImage.name}</p>
                                            <p className="text-[10px] text-muted-foreground">Ready to upload</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => { setNewImage(null); setPreviewUrl(null); }}
                                        className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </motion.div>
                            )}

                            <Button
                                onClick={handleUploadHero}
                                disabled={!newImage || isUploading}
                                className="w-full h-14 rounded-2xl bg-primary text-primary-foreground font-bold shadow-xl shadow-primary/20 flex items-center justify-center gap-2"
                            >
                                <Save className="w-5 h-5" />
                                Update Hero Image
                            </Button>

                            <p className="text-xs text-muted-foreground leading-relaxed">
                                Tip: For best results, use a portrait-oriented image with at least 800x1000px resolution.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="p-8 rounded-3xl bg-card border border-border shadow-sm h-fit">
                    <h3 className="text-xl font-bold mb-6">Quick Actions</h3>
                    <div className="grid grid-cols-1 gap-4">
                        <button className="p-6 rounded-2xl bg-accent hover:bg-primary hover:text-primary-foreground transition-all flex items-center gap-4 group">
                            <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-white/20">
                                <FolderGit2 className="w-6 h-6 text-primary group-hover:text-white" />
                            </div>
                            <span className="text-sm font-bold uppercase tracking-wider">New Project</span>
                        </button>
                        <button className="p-6 rounded-2xl bg-accent hover:bg-purple-600 hover:text-white transition-all flex items-center gap-4 group">
                            <div className="p-3 bg-purple-500/10 rounded-xl group-hover:bg-white/20">
                                <ImageIcon className="w-6 h-6 text-purple-500 group-hover:text-white" />
                            </div>
                            <span className="text-sm font-bold uppercase tracking-wider">Add Photo</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
