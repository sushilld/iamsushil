"use client";

import React from "react";
import { motion } from "motion/react";
import {
    FolderGit2,
    Image as ImageIcon,
    ArrowUpRight,
    Users,
    Eye,
    Clock
} from "lucide-react";
import { storage } from "@/app/utils/storage";

export default function AdminDashboard() {
    const [stats, setStats] = React.useState({
        projects: 0,
        gallery: 0,
    });

    React.useEffect(() => {
        const loadStats = async () => {
            const projects = await storage.getProjects([]);
            const gallery = await storage.getGallery();
            setStats({
                projects: projects.length,
                gallery: gallery.length,
            });
        };
        loadStats();
    }, []);

    const cards = [
        { label: "Total Projects", value: stats.projects, icon: FolderGit2, color: "text-blue-500", bg: "bg-blue-500/10" },
        { label: "Gallery Photos", value: stats.gallery, icon: ImageIcon, color: "text-purple-500", bg: "bg-purple-500/10" },
        { label: "Total Visits", value: "1.2k", icon: Eye, color: "text-green-500", bg: "bg-green-500/10" },
        { label: "Hours Worked", value: "320", icon: Clock, color: "text-orange-500", bg: "bg-orange-500/10" },
    ];

    return (
        <div className="space-y-8">
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="p-8 rounded-2xl bg-card border border-border shadow-sm">
                    <h3 className="text-xl font-bold mb-6">Recent Activity</h3>
                    <div className="space-y-6">
                        {[1, 2, 3].map((_, i) => (
                            <div key={i} className="flex items-center gap-4">
                                <div className="w-2 h-2 rounded-full bg-primary" />
                                <div className="flex-1">
                                    <p className="text-sm font-medium">Updated "Multi-Class Object Detection" project</p>
                                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-8 rounded-2xl bg-card border border-border shadow-sm">
                    <h3 className="text-xl font-bold mb-6">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <button className="p-4 rounded-xl bg-accent hover:bg-accent/80 transition-colors flex flex-col items-center gap-2">
                            <FolderGit2 className="w-6 h-6 text-primary" />
                            <span className="text-sm font-medium">Add Project</span>
                        </button>
                        <button className="p-4 rounded-xl bg-accent hover:bg-accent/80 transition-colors flex flex-col items-center gap-2">
                            <ImageIcon className="w-6 h-6 text-primary" />
                            <span className="text-sm font-medium">Upload Photo</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
