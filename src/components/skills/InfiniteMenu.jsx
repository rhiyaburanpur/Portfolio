import React from 'react';
import { motion } from 'framer-motion';

const skills = [
    "React 19", "Three.js", "R3F", "Vite", "Tailwind v4", "Go", "Python", "SQLModel", "Angular", "Firebase", "Systems"
];

const InfiniteMenu = () => {
    // Duplicate skills for seamless loop
    const loopSkills = [...skills, ...skills, ...skills];

    return (
        <div className="w-full py-20 overflow-hidden bg-[#535353] text-[#f7f7f7] relative">
            <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-[#535353] via-transparent to-[#535353]" />

            <div className="flex w-max">
                <motion.div
                    className="flex gap-12 px-4"
                    animate={{ x: [0, -1000] }} // Adjust based on width
                    transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
                >
                    {loopSkills.map((s, i) => (
                        <span key={i} className="font-['Press_Start_2P'] text-2xl md:text-3xl whitespace-nowrap opacity-80 hover:opacity-100 hover:text-[#00ff00] cursor-default transition-colors duration-0">
                            {s}
                        </span>
                    ))}
                </motion.div>
                <motion.div
                    className="flex gap-12 px-4"
                    animate={{ x: [0, -1000] }}
                    transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
                    aria-hidden="true"
                >
                    {loopSkills.map((s, i) => (
                        <span key={i} className="font-['Press_Start_2P'] text-2xl md:text-3xl whitespace-nowrap opacity-80 hover:opacity-100 hover:text-[#00ff00] cursor-default transition-colors duration-0">
                            {s}
                        </span>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default InfiniteMenu;
