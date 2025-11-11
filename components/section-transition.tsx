"use client";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function SectionTransition({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={pathname}
                initial={{
                    opacity: 0,
                    y: 10,
                    filter: "blur(4px)",
                    scale: 0.98
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    scale: 1
                }}
                exit={{
                    opacity: 0,
                    y: -10,
                    filter: "blur(4px)",
                    scale: 0.98
                }}
                transition={{
                    duration: 0.25,
                    ease: [0.22, 1, 0.36, 1] // easeOutExpo
                }}
                className="w-full h-full"
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}
