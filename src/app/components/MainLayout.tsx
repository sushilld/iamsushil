import React from "react";
import { Outlet } from "react-router";
import { TerminalProvider, useTerminal } from "@/app/utils/TerminalContext";
import { Terminal } from "@/app/components/Terminal";
import { motion, AnimatePresence } from "motion/react";

function TerminalWrapper() {
    const { isOpen, closeTerminal } = useTerminal();
    return (
        <>
            <AnimatePresence>
                {isOpen && <Terminal onClose={closeTerminal} />}
            </AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                    onClick={closeTerminal}
                />
            )}
        </>
    );
}

export function MainLayout() {
    return (
        <TerminalProvider>
            <Outlet />
            <TerminalWrapper />
        </TerminalProvider>
    );
}
