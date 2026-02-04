"use client";

import React from "react";
import { Outlet, Link, useLocation } from "react-router";
import {
    LayoutDashboard,
    FolderGit2,
    Image as ImageIcon,
    LogOut,
    Home,
    ChevronLeft,
    ChevronRight,
    Menu
} from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/app/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { storage } from "@/app/utils/storage";
import { useNavigate } from "react-router";

export function AdminLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
    const location = useLocation();
    const navigate = useNavigate();

    const menuItems = [
        { path: "/admin", label: "Dashboard", icon: LayoutDashboard },
        { path: "/admin/projects", label: "Projects", icon: FolderGit2 },
        { path: "/admin/gallery", label: "Gallery", icon: ImageIcon },
    ];

    const handleLogout = () => {
        storage.setAdmin(false);
        navigate("/");
    };

    return (
        <div className="min-h-screen bg-background text-foreground flex overflow-hidden">
            {/* Sidebar */}
            <motion.aside
                initial={false}
                animate={{ width: isSidebarOpen ? 260 : 80 }}
                className="relative z-20 bg-card border-r border-border flex flex-col transition-all duration-300 ease-in-out"
            >
                {/* Logo Section */}
                <div className="h-20 flex items-center px-6 border-b border-border mb-6">
                    <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                            <span className="text-primary-foreground font-bold italic">S</span>
                        </div>
                        {isSidebarOpen && (
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="font-bold text-xl tracking-tight"
                            >
                                Portfolio Admin
                            </motion.span>
                        )}
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 space-y-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;

                        return (
                            <Link key={item.path} to={item.path}>
                                <motion.div
                                    className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all group ${isActive
                                        ? "bg-primary text-primary-foreground shadow-lg"
                                        : "hover:bg-accent text-muted-foreground hover:text-foreground"
                                        }`}
                                    whileHover={{ x: 4 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Icon className={`w-5 h-5 shrink-0 ${isActive ? "" : "group-hover:text-primary"}`} />
                                    {isSidebarOpen && (
                                        <motion.span
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="font-medium truncate"
                                        >
                                            {item.label}
                                        </motion.span>
                                    )}
                                </motion.div>
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer actions */}
                <div className="p-4 border-t border-border space-y-4">
                    <Link to="/">
                        <div className="flex items-center gap-3 px-3 py-3 rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground transition-all">
                            <Home className="w-5 h-5 shrink-0" />
                            {isSidebarOpen && <span className="font-medium">View Site</span>}
                        </div>
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-destructive hover:bg-destructive/10 transition-all"
                    >
                        <LogOut className="w-5 h-5 shrink-0" />
                        {isSidebarOpen && <span className="font-medium">Logout</span>}
                    </button>
                </div>

                {/* Toggle Button */}
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="absolute -right-3 top-24 w-6 h-6 bg-primary rounded-full flex items-center justify-center border border-border shadow-md hover:scale-110 transition-transform hidden lg:flex"
                >
                    {isSidebarOpen ? <ChevronLeft className="w-4 h-4 text-primary-foreground" /> : <ChevronRight className="w-4 h-4 text-primary-foreground" />}
                </button>
            </motion.aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Header */}
                <header className="h-20 bg-card/50 backdrop-blur-sm border-b border-border flex items-center justify-between px-8 sticky top-0 z-10">
                    <div className="lg:hidden">
                        <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                            <Menu className="w-6 h-6" />
                        </Button>
                    </div>
                    <div className="flex-1 px-4">
                        <h2 className="text-lg font-semibold truncate">
                            {menuItems.find(item => item.path === location.pathname)?.label || "Dashboard"}
                        </h2>
                    </div>
                    <div className="flex items-center gap-4">
                        <ThemeToggle />
                        <div className="w-10 h-10 rounded-full bg-accent border border-border flex items-center justify-center overflow-hidden">
                            <img src="/assets/images/IMG_6869.jpg" alt="Admin" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </header>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-8">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>
    );
}
