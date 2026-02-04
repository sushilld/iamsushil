import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Navigation } from "@/app/components/Navigation";
import { FloatingOrbs } from "@/app/components/InteractiveBackground";
import { Image as ImageIcon, Loader2 } from "lucide-react";
import { Dialog, DialogContent } from "@/app/components/ui/dialog";
import { supabase } from "@/app/utils/supabase";

interface GalleryImage {
    id: number;
    url: string;
    caption: string;
}

export default function Gallery() {
    const [images, setImages] = useState<GalleryImage[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

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
                            Gallery
                        </h1>
                        <p className="text-xl text-muted-foreground mb-8">
                            A collection of moments captured through my lens
                        </p>
                    </motion.div>

                    {/* Gallery Grid */}
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-20 gap-4">
                            <Loader2 className="w-10 h-10 animate-spin text-primary" />
                            <p className="text-muted-foreground animate-pulse">Opening gallery...</p>
                        </div>
                    ) : (
                        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                            <AnimatePresence>
                                {images.map((img, index) => (
                                    <motion.div
                                        key={img.id}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="relative group break-inside-avoid rounded-xl overflow-hidden cursor-pointer border border-border bg-card"
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
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    )}

                    {!isLoading && images.length === 0 && (
                        <div className="text-center py-20 text-muted-foreground">
                            <ImageIcon className="w-16 h-16 mx-auto mb-4 opacity-20" />
                            <p>No images in the gallery yet.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Image Preview Dialog */}
            <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
                <DialogContent className="bg-black/95 border-none text-white max-w-5xl p-0 overflow-hidden">
                    {selectedImage && (
                        <div className="relative flex flex-col items-center">
                            <img
                                src={selectedImage.url}
                                alt={selectedImage.caption}
                                className="w-full h-auto max-h-[85vh] object-contain"
                            />
                            <div className="p-6 w-full bg-gradient-to-t from-black to-transparent absolute bottom-0">
                                <p className="text-xl font-medium">{selectedImage.caption}</p>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}

