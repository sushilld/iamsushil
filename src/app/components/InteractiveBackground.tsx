import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useTheme } from "next-themes";

export function InteractiveBackground() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <>
      {/* Main cursor follower */}
      <motion.div
        className={`fixed w-8 h-8 rounded-full pointer-events-none z-50 ${isDark ? "bg-blue-500/30 mix-blend-screen" : "bg-blue-600/20 mix-blend-multiply"}`}
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {/* Delayed follower 1 */}
      <motion.div
        className={`fixed w-12 h-12 rounded-full pointer-events-none z-40 ${isDark ? "bg-purple-500/20 mix-blend-screen" : "bg-purple-600/15 mix-blend-multiply"}`}
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
        }}
        transition={{ delay: 0.05 }}
      />

      {/* Glow effect */}
      <motion.div
        className={`fixed w-[40rem] h-[40rem] rounded-full bg-gradient-to-r ${isDark ? "from-blue-500/10 via-purple-500/10 to-cyan-500/10" : "from-blue-200/40 via-purple-200/40 to-cyan-200/40"} pointer-events-none z-20 blur-[100px]`}
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </>
  );
}

export function FloatingOrbs() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const orbs = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: Math.random() * 300 + 100,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 30 + 20,
    delay: Math.random() * 10,
  }));

  if (!mounted) return null;
  const isDark = resolvedTheme === "dark";

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          className={`absolute rounded-full blur-3xl ${isDark ? "bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-cyan-500/10 opacity-40" : "bg-gradient-to-br from-blue-200/60 via-purple-200/60 to-cyan-200/60 opacity-50"}`}
          style={{
            width: orb.size,
            height: orb.size,
            left: `${orb.x}%`,
            top: `${orb.y}%`,
          }}
          animate={{
            x: [0, 150, -150, 0],
            y: [0, -150, 150, 0],
            scale: [1, 1.3, 0.7, 1],
            rotate: [0, 90, 180, 360],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            delay: orb.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
