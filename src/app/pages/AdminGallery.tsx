"use client";

import { useState, useEffect } from "react";
import {
    Plus,
    Trash2,
    Image as ImageIcon,
    X,
    Upload,
    Loader2
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/app/components/ui/dialog";
import { toast } from "sonner";
import { supabase } from "@/app/utils/supabase";

interface GalleryImage {
    id: number;
    url: string;
    caption: string;
}

export default function AdminGallery() {
    const [images, setImages] = useState<GalleryImage[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [showAddDialog, setShowAddDialog] = useState(false);
    const [newImageFile, setNewImageFile] = useState<File | null>(null);
    const [caption, setCaption] = useState("");
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    useEffect(() => {
        const loadGallery = async () => {
            setIsLoading(true);
            const { data, error } = await supabase
                .from("gallery")
                .select("*")
                .order("created_at", { ascending: false });

            if (!error && data) {
                setImages(data);
            }
            setIsLoading(false);
        };
        loadGallery();
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setNewImageFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSave = async () => {
        if (!newImageFile) {
            toast.error("Please select an image to upload");
            return;
        }

        setIsSaving(true);
        try {
            const fileExt = newImageFile.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `gallery/${fileName}`;

            // 1. Upload to Storage
            const { error: uploadError } = await supabase.storage
                .from('portfolio-assets')
                .upload(filePath, newImageFile);

            if (uploadError) throw uploadError;

            // 2. Get Public URL
            const { data: { publicUrl } } = supabase.storage
                .from('portfolio-assets')
                .getPublicUrl(filePath);

            // 3. Save to Table
            const { error } = await supabase
                .from("gallery")
                .insert([{ url: publicUrl, caption: caption || "Photography" }]);

            if (error) throw error;

            // Refresh
            const { data } = await supabase.from("gallery").select("*").order("created_at", { ascending: false });
            if (data) setImages(data);

            setNewImageFile(null);
            setCaption("");
            setPreviewUrl(null);
            setShowAddDialog(false);
            toast.success("Image added to gallery");
        } catch (error: any) {
            console.error("Gallery save error:", error);
            toast.error(error.message || "Failed to upload image.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (window.confirm("Delete this image from gallery?")) {
            try {
                const { error } = await supabase.from("gallery").delete().eq("id", id);
                if (error) throw error;
                setImages(images.filter(img => img.id !== id));
                toast.info("Image removed");
            } catch (error: any) {
                toast.error(error.message || "Failed to delete image.");
            }
        }
    };

    return (
        <div className="space-y-6 text-foreground pb-12">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Gallery Manager</h1>
                    <p className="text-muted-foreground text-sm">Organize and curate your photography collection.</p>
                </div>
                <Button onClick={() => setShowAddDialog(true)} className="flex items-center gap-2">
                    <Plus className="w-4 h-4" /> Add Image
                </Button>
            </div>

            {isLoading ? (
                <div className="p-12 text-center text-muted-foreground italic">Loading gallery...</div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {images.map((img) => (
                        <div key={img.id} className="relative group aspect-square rounded-xl overflow-hidden border border-border bg-card">
                            <img src={img.url} alt={img.caption} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                                <p className="text-white text-xs font-medium truncate mb-2">{img.caption}</p>
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    className="w-full h-8"
                                    onClick={() => handleDelete(img.id)}
                                >
                                    <Trash2 className="w-3 h-3 mr-2" /> Delete
                                </Button>
                            </div>
                        </div>
                    ))}
                    {images.length === 0 && (
                        <div className="col-span-full py-24 text-center border-2 border-dashed border-border rounded-[2rem] bg-accent/20">
                            <ImageIcon className="w-16 h-16 mx-auto mb-4 text-muted-foreground/30" />
                            <p className="text-muted-foreground font-bold">No images in your gallery yet.</p>
                            <Button variant="outline" className="mt-6 rounded-xl" onClick={() => setShowAddDialog(true)}>Upload your first photo</Button>
                        </div>
                    )}
                </div>
            )}

            <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Add to Gallery</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6 py-4">
                        <div className="grid gap-2">
                            <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground ml-1">Upload Photo</label>
                            <div className="relative p-8 rounded-2xl bg-accent/50 border-2 border-dashed border-border flex flex-col items-center justify-center text-center space-y-4 group hover:border-primary/50 transition-colors">
                                <div className="p-4 bg-primary/10 rounded-full text-primary">
                                    <Upload className="w-6 h-6" />
                                </div>
                                <div className="space-y-1">
                                    <p className="font-bold">Choose Image</p>
                                    <p className="text-xs text-muted-foreground">JPG, PNG or WEBP (Max 5MB)</p>
                                </div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                />
                            </div>
                        </div>

                        {previewUrl && (
                            <div className="rounded-2xl overflow-hidden border border-border aspect-square relative group">
                                <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                                <button
                                    onClick={() => { setNewImageFile(null); setPreviewUrl(null); }}
                                    className="absolute top-2 right-2 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        )}

                        <div className="grid gap-2">
                            <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground ml-1">Caption</label>
                            <Input
                                value={caption}
                                onChange={e => setCaption(e.target.value)}
                                placeholder="Mountain hike 2024..."
                                className="h-12 bg-background/50"
                            />
                        </div>

                        <Button onClick={handleSave} disabled={!newImageFile || isSaving} className="w-full h-14 rounded-2xl font-bold shadow-xl shadow-primary/20">
                            {isSaving ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <><Upload className="w-4 h-4 mr-2" /> Upload to Gallery</>
                            )}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
