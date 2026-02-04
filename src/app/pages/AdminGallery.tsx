"use client";

import React, { useState, useEffect } from "react";
import {
    Plus,
    Trash2,
    Image as ImageIcon,
    X,
    Upload
} from "lucide-react";
import { storage } from "@/app/utils/storage";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/app/components/ui/dialog";
import { toast } from "sonner";

interface GalleryImage {
    id: number;
    url: string;
    caption: string;
}

export default function AdminGallery() {
    const [images, setImages] = useState<GalleryImage[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showAddDialog, setShowAddDialog] = useState(false);
    const [newImage, setNewImage] = useState({ url: "", caption: "" });

    useEffect(() => {
        const loadGallery = async () => {
            setIsLoading(true);
            const data = await storage.getGallery();
            setImages(data);
            setIsLoading(false);
        };
        loadGallery();
    }, []);

    const handleSave = async () => {
        if (!newImage.url) {
            toast.error("Image URL is required");
            return;
        }

        const img: GalleryImage = {
            id: Date.now(),
            url: newImage.url,
            caption: newImage.caption || "A beautiful click",
        };

        const updatedImages = [img, ...images];
        setImages(updatedImages);
        await storage.saveGallery(updatedImages);

        setNewImage({ url: "", caption: "" });
        setShowAddDialog(false);
        toast.success("Image added to gallery");
    };

    const handleDelete = async (id: number) => {
        if (window.confirm("Delete this image from gallery?")) {
            const updatedImages = images.filter(img => img.id !== id);
            setImages(updatedImages);
            await storage.saveGallery(updatedImages);
            toast.info("Image removed");
        }
    };

    return (
        <div className="space-y-6">
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
                        <div className="col-span-full py-20 text-center border-2 border-dashed border-border rounded-xl">
                            <ImageIcon className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-20" />
                            <p className="text-muted-foreground">No images in your gallery yet.</p>
                            <Button variant="ghost" className="mt-4" onClick={() => setShowAddDialog(true)}>Upload your first photo</Button>
                        </div>
                    )}
                </div>
            )}

            <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Add to Gallery</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="grid gap-2">
                            <label className="text-sm font-medium text-muted-foreground">Image URL</label>
                            <Input
                                value={newImage.url}
                                onChange={e => setNewImage({ ...newImage, url: e.target.value })}
                                placeholder="https://images.unsplash.com/..."
                            />
                        </div>
                        <div className="grid gap-2">
                            <label className="text-sm font-medium text-muted-foreground">Caption</label>
                            <Input
                                value={newImage.caption}
                                onChange={e => setNewImage({ ...newImage, caption: e.target.value })}
                                placeholder="A brief description"
                            />
                        </div>

                        {newImage.url && (
                            <div className="mt-2 rounded-lg overflow-hidden border border-border aspect-video">
                                <img src={newImage.url} alt="Preview" className="w-full h-full object-cover" />
                            </div>
                        )}

                        <Button onClick={handleSave} className="w-full mt-4">
                            <Upload className="w-4 h-4 mr-2" /> Upload to Gallery
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
