import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Navigation } from "@/app/components/Navigation";
import { FloatingOrbs } from "@/app/components/InteractiveBackground";
import { Plus, X, Image as ImageIcon, Lock, LogOut } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { storage } from "@/app/utils/storage";
import { toast } from "sonner";

interface GalleryImage {
    id: number;
    url: string;
    caption: string;
}

export default function Gallery() {
    const [images, setImages] = useState<GalleryImage[]>([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [showLoginDialog, setShowLoginDialog] = useState(false);
    const [password, setPassword] = useState("");
    const [showAddDialog, setShowAddDialog] = useState(false);
    const [newImage, setNewImage] = useState({ url: "", caption: "" });
    const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

    useEffect(() => {
        setImages(storage.getGallery());
        setIsAdmin(storage.isAdmin());
    }, []);

    const handleLogin = () => {
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

    const handleAddImage = () => {
        if (newImage.url) {
            const img: GalleryImage = {
                id: Date.now(),
                url: newImage.url,
                caption: newImage.caption || "A beautiful click",
            };
            const updatedImages = [img, ...images];
            setImages(updatedImages);
            storage.saveGallery(updatedImages);
            setNewImage({ url: "", caption: "" });
            setShowAddDialog(false);
            toast.success("Image added to gallery!");
        }
    };

    const removeImage = (id: number) => {
        const updatedImages = images.filter((img) => img.id !== id);
        setImages(updatedImages);
        storage.saveGallery(updatedImages);
        toast.info("Image removed");
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
                            Gallery
                        </h1>
                        <p className="text-xl text-gray-400 mb-8">
                            A collection of moments captured through my lens
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
                                        Upload Image
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

                    {/* Gallery Grid */}
                    <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                        <AnimatePresence>
                            {images.map((img, index) => (
                                <motion.div
                                    key={img.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="relative group break-inside-avoid rounded-xl overflow-hidden cursor-pointer"
                                    onClick={() => setSelectedImage(img)}
                                >
                                    <img
                                        src={img.url}
                                        alt={img.caption}
                                        className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                                        <p className="text-white font-medium">{img.caption}</p>
                                    </div>

                                    {isAdmin && (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                removeImage(img.id);
                                            }}
                                            className="absolute top-2 right-2 p-2 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    )}
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {images.length === 0 && (
                        <div className="text-center py-20 text-gray-500">
                            <ImageIcon className="w-16 h-16 mx-auto mb-4 opacity-20" />
                            <p>No images in the gallery yet.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Add Image Dialog */}
            <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
                <DialogContent className="bg-gray-900 border-white/20 text-white max-w-md">
                    <DialogHeader>
                        <DialogTitle>Upload New Image</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 mt-4">
                        <div>
                            <label className="text-sm text-gray-400 mb-2 block">Image URL</label>
                            <Input
                                value={newImage.url}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewImage({ ...newImage, url: e.target.value })}
                                placeholder="https://images.unsplash.com/..."
                                className="bg-white/5 border-white/10"
                            />
                        </div>
                        <div>
                            <label className="text-sm text-gray-400 mb-2 block">Caption</label>
                            <Input
                                value={newImage.caption}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewImage({ ...newImage, caption: e.target.value })}
                                placeholder="A brief description"
                                className="bg-white/5 border-white/10"
                            />
                        </div>
                        <Button
                            onClick={handleAddImage}
                            className="w-full bg-blue-500 hover:bg-blue-600"
                        >
                            Add to Gallery
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Image Preview Dialog */}
            <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
                <DialogContent className="bg-black/90 border-none text-white max-w-5xl p-0 overflow-hidden">
                    {selectedImage && (
                        <div className="relative">
                            <img
                                src={selectedImage.url}
                                alt={selectedImage.caption}
                                className="w-full h-auto max-h-[85vh] object-contain"
                            />
                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
                                <p className="text-xl font-medium">{selectedImage.caption}</p>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {/* Admin Login Dialog */}
            <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
                <DialogContent className="bg-gray-900 border-white/20 text-white max-w-sm">
                    <DialogHeader>
                        <DialogTitle>Admin Access</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 mt-4">
                        <div>
                            <label className="text-sm text-gray-400 mb-2 block">Password</label>
                            <Input
                                type="password"
                                value={password}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                                onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && handleLogin()}
                                className="bg-white/5 border-white/10"
                            />
                        </div>
                        <Button onClick={handleLogin} className="w-full bg-blue-500">
                            Login
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
