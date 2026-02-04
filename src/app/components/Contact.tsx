import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, MessageSquare, Send, Github, Linkedin, CheckCircle2, Clock } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { toast } from "sonner";
import { personalInfo } from "@/app/data/portfolio";
import { supabase } from "@/app/utils/supabase";

export function Contact() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const [remainingTime, setRemainingTime] = useState(0);

    const checkRateLimit = () => {
        const lastSent = localStorage.getItem("last_contact_timestamp");
        if (lastSent) {
            const diff = Date.now() - parseInt(lastSent);
            const remaining = 60000 - diff;
            if (remaining > 0) {
                setRemainingTime(Math.ceil(remaining / 1000));
                return false;
            }
        }
        return true;
    };

    useEffect(() => {
        const timer = setInterval(() => {
            if (remainingTime > 0) {
                setRemainingTime(prev => prev - 1);
            }
        }, 1000);
        return () => clearInterval(timer);
    }, [remainingTime]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!checkRateLimit()) {
            toast.error(`Please wait ${remainingTime} seconds before sending another message.`);
            return;
        }

        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            subject: formData.get("subject") as string,
            message: formData.get("message") as string,
        };

        try {
            const { error } = await supabase.from("contacts").insert([data]);

            if (error) throw error;

            localStorage.setItem("last_contact_timestamp", Date.now().toString());
            setIsSent(true);
            toast.success("Message sent successfully!");
        } catch (error: any) {
            console.error("Error submitting form:", error);
            toast.error(error.message || "Failed to send message. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const socialLinks = [
        { icon: <Github className="w-5 h-5" />, label: "GitHub", href: `https://${personalInfo.github}` },
        { icon: <Linkedin className="w-5 h-5" />, label: "LinkedIn", href: `https://${personalInfo.linkedin}` },
    ];

    return (
        <section id="contact" className="relative z-10 py-24 px-4 overflow-hidden bg-background/50">
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
                            <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border group hover:border-primary/50 transition-colors shadow-sm">
                                <div className="p-3 bg-primary/10 rounded-lg text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors shadow-inner">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Email Me</p>
                                    <p className="text-lg font-semibold truncate leading-tight">{personalInfo.email}</p>
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
                                        className="p-3 bg-card border border-border rounded-lg text-muted-foreground hover:text-primary hover:border-primary transition-colors focus:ring-2 focus:ring-primary/20 outline-none shadow-sm"
                                        aria-label={link.label}
                                    >
                                        {link.icon}
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Form / Success State */}
                    <div className="relative">
                        <AnimatePresence mode="wait">
                            {isSent ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, y: -20 }}
                                    className="p-8 md:p-12 rounded-3xl bg-card border border-border shadow-2xl text-center space-y-6"
                                >
                                    <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <CheckCircle2 className="w-10 h-10 text-green-500" />
                                    </div>
                                    <h3 className="text-3xl font-bold">Message Sent!</h3>
                                    <p className="text-muted-foreground text-lg">
                                        Thank you for reaching out. I've received your message and will get back to you as soon as possible.
                                    </p>
                                    <Button
                                        onClick={() => setIsSent(false)}
                                        variant="outline"
                                        className="mt-4"
                                    >
                                        Send another message
                                    </Button>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="form"
                                    initial={{ opacity: 0, x: 30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -30 }}
                                    className="p-8 md:p-10 rounded-3xl bg-card border border-border shadow-2xl relative"
                                >
                                    <div className="absolute top-0 right-10 w-20 h-20 bg-primary/5 blur-3xl -z-10" />
                                    <div className="absolute bottom-0 left-10 w-20 h-20 bg-blue-500/5 blur-3xl -z-10" />

                                    {remainingTime > 0 && (
                                        <div className="mb-6 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center gap-3 text-amber-600 dark:text-amber-500 text-sm font-medium">
                                            <Clock className="w-4 h-4" />
                                            <span>Spam protection active. You can send another message in {remainingTime}s.</span>
                                        </div>
                                    )}

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium ml-1">Full Name</label>
                                                <Input name="name" placeholder="John Doe" required className="bg-background/50 border-border focus:ring-2 focus:ring-primary/20 h-12" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium ml-1">Email Address</label>
                                                <Input type="email" name="email" placeholder="john@example.com" required className="bg-background/50 border-border focus:ring-2 focus:ring-primary/20 h-12" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium ml-1">Subject</label>
                                            <Input name="subject" placeholder="How can I help you?" required className="bg-background/50 border-border focus:ring-2 focus:ring-primary/20 h-12" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium ml-1">Your Message</label>
                                            <Textarea
                                                name="message"
                                                placeholder="Tell me more about your project..."
                                                rows={5}
                                                required
                                                className="bg-background/50 border-border focus:ring-2 focus:ring-primary/20 resize-none"
                                            />
                                        </div>
                                        <Button
                                            type="submit"
                                            size="lg"
                                            disabled={isSubmitting || remainingTime > 0}
                                            className="w-full group py-6 text-base font-bold shadow-xl shadow-primary/20 transition-all active:scale-95"
                                        >
                                            {isSubmitting ? "Sending..." : "Send Message"}
                                            <Send className={`w-5 h-5 ml-2 transition-transform ${isSubmitting ? "animate-ping" : "group-hover:translate-x-1 group-hover:-translate-y-1"}`} />
                                        </Button>
                                    </form>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}
