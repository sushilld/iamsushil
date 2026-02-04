"use client";

import { Link } from "react-router";
import { Github, Linkedin, Mail, Heart } from "lucide-react";
import { personalInfo } from "@/app/data/portfolio";

export function Footer() {
    const currentYear = new Date().getFullYear();

    const navLinks = [
        { label: "Home", href: "/" },
        { label: "Timeline", href: "/timeline" },
        { label: "Projects", href: "/projects" },
        { label: "Gallery", href: "/gallery" },
    ];

    const socialLinks = [
        { icon: <Github className="w-5 h-5" />, href: `https://${personalInfo.github}` },
        { icon: <Linkedin className="w-5 h-5" />, href: `https://${personalInfo.linkedin}` },
        { icon: <Mail className="w-5 h-5" />, href: `mailto:${personalInfo.email}` },
    ];

    return (
        <footer className="relative z-10 bg-card border-t border-border pt-16 pb-8 px-4 overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

            <div className="container mx-auto max-w-6xl">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand/About */}
                    <div className="lg:col-span-2 space-y-6">
                        <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                            Sushil Dhakal
                        </Link>
                        <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
                            Passionate AI & Machine Learning enthusiast and Software Developer dedicated to building
                            intelligent solutions that make a difference. Let's create something amazing together.
                        </p>
                        <div className="flex gap-4">
                            {socialLinks.map((link, i) => (
                                <a
                                    key={i}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
                                >
                                    {link.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-6">
                        <h4 className="text-sm font-bold uppercase tracking-wider">Navigation</h4>
                        <ul className="space-y-4">
                            {navLinks.map((link, i) => (
                                <li key={i}>
                                    <Link
                                        to={link.href}
                                        className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center group"
                                    >
                                        <span className="w-0 group-hover:w-4 h-[1px] bg-primary transition-all mr-0 group-hover:mr-2" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal/Other */}
                    <div className="space-y-6">
                        <h4 className="text-sm font-bold uppercase tracking-wider">Contact</h4>
                        <ul className="space-y-4 text-sm text-muted-foreground">
                            <li className="flex items-center gap-2 italic underline underline-offset-4 decoration-primary/30">
                                <Mail className="w-4 h-4" />
                                {personalInfo.email}
                            </li>
                            <li>{personalInfo.location[0]}</li>
                            <li>Available for freelance</li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
                    <p>© {currentYear} Sushil Dhakal. All rights reserved.</p>
                    <div className="flex items-center gap-1">
                        Built with <Heart className="w-3 h-3 text-red-500 fill-red-500 animate-pulse" /> using React, Tailwind & Framer Motion
                    </div>
                    <div className="flex gap-6">
                        <Link to="/admin" className="hover:text-primary transition-colors">Admin Portal</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
