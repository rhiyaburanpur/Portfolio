import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dock, DockIcon } from '../ui/Dock';
import { Brain, Database, Server, Code } from 'lucide-react';

// Skill categories data
const skillCategories = [
    {
        id: 'ai',
        title: 'AI & GENERATIVE AI',
        icon: Brain,
        skills: [
            'LLMs & Transformers',
            'Prompt Engineering',
            'NLP & Sentiment Analysis',
            'Deep Learning / ANNs',
        ],
    },
    {
        id: 'data',
        title: 'DATA ENGINEERING',
        icon: Database,
        skills: [
            'Apache Spark',
            'Oracle SQL & PL/SQL',
            'Tableau & Excel',
            'Data Analysis (Python)',
        ],
    },
    {
        id: 'backend',
        title: 'SYSTEMS & BACKEND',
        icon: Server,
        skills: [
            'Go (Golang) & Concurrency',
            'Docker & DevOps',
            'Redis & Caching',
            'Cloud Operations',
        ],
    },
    {
        id: 'web',
        title: 'CORE & WEB',
        icon: Code,
        skills: [
            'Python & Scripting',
            'React 19 & Tailwind',
            'Git & Vercel',
            'Quantum Comp. Concepts',
        ],
    },
];

const SkillDock = () => {
    const [activeCategory, setActiveCategory] = useState('ai');

    const currentCategory = skillCategories.find((cat) => cat.id === activeCategory);

    return (
        <div className="w-full min-h-[60vh] flex flex-col items-center justify-between py-8 px-4">
            {/* Category Display Area */}
            <div className="flex-1 w-full max-w-4xl flex flex-col items-center justify-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeCategory}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="text-center"
                    >
                        {/* Category Title */}
                        <h2 className="font-['Press_Start_2P'] text-lg md:text-xl lg:text-2xl text-[#f7f7f7] mb-8">
                            &gt; {currentCategory?.title}
                            <span className="animate-[cursor-blink_1s_ease-out_infinite]">_</span>
                        </h2>

                        {/* Skills Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-2xl mx-auto">
                            {currentCategory?.skills.map((skill, index) => (
                                <motion.div
                                    key={skill}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="font-['VT323'] text-xl md:text-2xl text-[#f7f7f7]/90 text-left flex items-center gap-2"
                                >
                                    <span className="text-[#00ff00]">▸</span>
                                    {skill}
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Dock Navigation */}
            <div className="mt-8">
                <Dock>
                    {skillCategories.map((category) => {
                        const IconComponent = category.icon;
                        return (
                            <DockIcon
                                key={category.id}
                                isActive={activeCategory === category.id}
                                onClick={() => setActiveCategory(category.id)}
                                title={category.title}
                            >
                                <IconComponent className="w-full h-full" strokeWidth={1.5} />
                            </DockIcon>
                        );
                    })}
                </Dock>
            </div>

            {/* Hint text */}
            <p className="font-['VT323'] text-sm text-[#f7f7f7]/50 mt-4">
                HOVER_TO_MAGNIFY() | CLICK_TO_SELECT()
            </p>
        </div>
    );
};

export default SkillDock;
