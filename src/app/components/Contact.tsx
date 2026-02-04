"use client";

import React from "react";
import { motion } from "motion/react";
import { Mail, MessageSquare, Send, Github, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { toast } from "sonner";

export function Contact() {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast.success("Message sent! I'll get back to you soon.");
    };

    const socialLinks = [
        { icon: <Github className="w-5 h-5" />, label: "GitHub", href: "https://github.com/sushilld" },
        { icon: <Linkedin className="w-5 h-5" />, label: "LinkedIn", href: "https://linkedin.com/in/sushilld" },
        { icon: <Twitter className="w-5 h-5" />, label: "Twitter", href: "https://twitter.com/sushilld" },
    ];

    return (
        <section id="contact" className="relative z-10 py-24 px-4 overflow-hidden">
            <div className="container mx-auto max-w-6xl">
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <div>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full mb-4 text-primary text-xs font-bold tracking-widest uppercase"
                            >
                                <MessageSquare className="w-3 h-3" />
                                Let's Talk
                            </motion.div>
                            <h2 className="text-4xl md:text-5xl font-bold mb-6">
                                Have a project in mind? <br />
                                <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                                    Let's bring it to life.
                                </span>
                            </h2>
                            <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
                                I'm currently available for freelance work and full-time opportunities.
                                Whether you have a question or just want to say hi, I'll try my best to get back to you!
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border group hover:border-primary/50 transition-colors">
                                <div className="p-3 bg-primary/10 rounded-lg text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Email Me</p>
                                    <p className="text-lg font-semibold">contact@sushildhakal.com</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                {socialLinks.map((link, i) => (
                                    <motion.a
                                        key={i}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.1, y: -2 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="p-3 bg-card border border-border rounded-lg text-muted-foreground hover:text-primary hover:border-primary transition-colors focus:ring-2 focus:ring-primary/20 outline-none"
                                        aria-label={link.label}
                                    >
                                        {link.icon}
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="p-8 md:p-10 rounded-3xl bg-card border border-border shadow-2xl relative"
                    >
                        <div className="absolute top-0 right-10 w-20 h-20 bg-primary/5 blur-3xl -z-10" />
                        <div className="absolute bottom-0 left-10 w-20 h-20 bg-blue-500/5 blur-3xl -z-10" />

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium ml-1">Full Name</label>
                                    <Input placeholder="John Doe" required className="bg-background/50 border-border focus:ring-2 focus:ring-primary/20" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium ml-1">Email Address</label>
                                    <Input type="email" placeholder="john@example.com" required className="bg-background/50 border-border focus:ring-2 focus:ring-primary/20" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium ml-1">Subject</label>
                                <Input placeholder="How can I help you?" required className="bg-background/50 border-border focus:ring-2 focus:ring-primary/20" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium ml-1">Your Message</label>
                                <Textarea
                                    placeholder="Tell me more about your project..."
                                    rows={5}
                                    required
                                    className="bg-background/50 border-border focus:ring-2 focus:ring-primary/20 resize-none"
                                />
                            </div>
                            <Button type="submit" size="lg" className="w-full group py-6 text-base font-bold shadow-xl shadow-primary/20">
                                Send Message
                                <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </Button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
