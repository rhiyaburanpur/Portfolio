import React, { useState, useEffect, useRef } from 'react';

const projects = [
    {
        title: "KubeWhisper",
        category: "Cloud & DevOps / Applied AI",
        tech: ["Go", "Python", "FastAPI", "Kubernetes", "ChromaDB", "Gemini"],
        description: "Autonomic Kubernetes reliability agent built on the MAPE-K control loop. Detects pod failures in real-time, captures logs, retrieves documentation via RAG, and returns a root-cause diagnosis with a kubectl fix in under one minute.",
        status: "Research in Progress",
        link: "https://github.com/rhiyaburanpur/KubeWhisper"
    },
    {
        title: "VolunEra",
        category: "Community Platform",
        tech: ["Angular", "Firebase"],
        description: "Full-stack platform connecting volunteers and NGOs. Google Solution Challenge 2025.",
        status: "Under Development",
        link: "https://volunera-volnexus.web.app/"
    },
    {
        title: "KontoFlow",
        category: "Data Engineering",
        tech: ["Python", "SQLModel", "Pandas"],
        description: "Financial ETL pipeline that ingests bank statement PDFs, normalizes transaction data, and persists it to SQL.",
        status: "Active / Beta",
        link: "https://github.com/rhiyaburanpur/KontoFlow"
    },
    {
        title: "Go Distributed Crawler",
        category: "Systems Programming",
        tech: ["Go", "Redis", "PostgreSQL", "Docker"],
        description: "A high-performance, scalable, and fault-tolerant web crawler built with Go.",
        status: "Completed",
        link: "https://github.com/rhiyaburanpur/go-distributed-crawler"
    },
    {
        title: "PDF2Quiz",
        category: "AI Tool",
        tech: ["Python", "Hugging Face"],
        description: "Offline quiz generation tool transforming PDFs/DOCX into interactive quizzes using local AI.",
        status: "Under Development",
        link: "https://github.com/rhiyaburanpur/PDF2quiz"
    }
];

// Pixel Art SVG Icons (8-bit style)
const PixelArrowLeft = ({ className = "w-6 h-6" }) => (
    <svg viewBox="0 0 16 16" className={className} fill="currentColor" shapeRendering="crispEdges">
        <rect x="7" y="2" width="2" height="2" />
        <rect x="5" y="4" width="2" height="2" />
        <rect x="3" y="6" width="2" height="4" />
        <rect x="5" y="10" width="2" height="2" />
        <rect x="7" y="12" width="2" height="2" />
        <rect x="7" y="7" width="7" height="2" />
    </svg>
);

const PixelArrowRight = ({ className = "w-6 h-6" }) => (
    <svg viewBox="0 0 16 16" className={className} fill="currentColor" shapeRendering="crispEdges">
        <rect x="7" y="2" width="2" height="2" />
        <rect x="9" y="4" width="2" height="2" />
        <rect x="11" y="6" width="2" height="4" />
        <rect x="9" y="10" width="2" height="2" />
        <rect x="7" y="12" width="2" height="2" />
        <rect x="2" y="7" width="7" height="2" />
    </svg>
);

const Card = ({ project, index }) => {
    return (
        <div
            className="flex flex-col w-[min(640px,calc(100vw-48px))] h-auto bg-[#f7f7f7] dark:bg-[#2a2a2a] border-2 md:border-4 border-dashed border-[#555] dark:border-solid dark:border-[#f7f7f7]/30 p-6 shadow-[4px_4px_0px_#535353] md:shadow-[8px_8px_0px_#535353] dark:shadow-[4px_4px_0px_#f7f7f7]/20"
        >
            <div className="flex flex-col sm:flex-row justify-between items-start border-b-2 border-[#555] dark:border-[#f7f7f7]/30 pb-3 md:pb-4 mb-3 md:mb-4 gap-2">
                <div className="flex-1">
                    <h2 className="font-['Press_Start_2P'] text-sm sm:text-base md:text-lg lg:text-xl text-[#535353] dark:text-[#f7f7f7] mb-2 break-words">{project.title}</h2>
                    <span className="font-['VT323'] text-xs sm:text-sm bg-[#535353]/10 dark:bg-[#f7f7f7]/10 px-2 py-1 text-[#535353] dark:text-[#f7f7f7]">{project.status}</span>
                </div>
                <span className="font-['VT323'] text-lg md:text-xl bg-[#535353] dark:bg-[#f7f7f7] text-[#f7f7f7] dark:text-[#535353] px-2">#{String(index + 1).padStart(2, '0')}</span>
            </div>

            <div className="mb-4 md:mb-6 font-['VT323'] text-xl md:text-2xl text-[#535353] dark:text-[#f7f7f7] opacity-80">
                {project.category}
            </div>

            <p className="font-sans text-[#535353] dark:text-[#f7f7f7]/80 mb-4 leading-relaxed text-xs sm:text-sm md:text-base">
                {project.description}
            </p>

            <div className="flex gap-2 flex-wrap mb-4">
                {project.tech.map(t => (
                    <span key={t} className="px-2 sm:px-3 py-1 border border-[#555] dark:border-[#f7f7f7]/50 font-['VT323'] text-base md:text-lg text-[#535353] dark:text-[#f7f7f7] hover:bg-[#535353] dark:hover:bg-[#f7f7f7] hover:text-[#f7f7f7] dark:hover:text-[#535353] transition-none cursor-crosshair">
                        {t}
                    </span>
                ))}
            </div>

            <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-block self-start bg-[#535353] dark:bg-[#f7f7f7] text-[#f7f7f7] dark:text-[#535353] font-['VT323'] text-lg md:text-xl px-4 md:px-6 py-2 hover:bg-[#333] dark:hover:bg-[#ddd] transition-colors">
                VIEW_SOURCE -&gt;
            </a>
        </div>
    )
}

const ScrollStack = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const containerRef = useRef(null);
    const cardRefs = useRef([]);
    const visibleCards = useRef(new Set());

    const scrollLeft = () => {
        if (containerRef.current) {
            const cardWidth = containerRef.current.querySelector('[data-index]')?.clientWidth || 600;
            containerRef.current.scrollBy({ left: -(cardWidth + 16), behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (containerRef.current) {
            const cardWidth = containerRef.current.querySelector('[data-index]')?.clientWidth || 600;
            containerRef.current.scrollBy({ left: cardWidth + 16, behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                let changed = false;
                entries.forEach((entry) => {
                    const idx = Number(entry.target.dataset.index);
                    if (entry.isIntersecting) {
                        if (!visibleCards.current.has(idx)) {
                            visibleCards.current.add(idx);
                            changed = true;
                        }
                    } else {
                        if (visibleCards.current.has(idx)) {
                            visibleCards.current.delete(idx);
                            changed = true;
                        }
                    }
                });

                if (changed && visibleCards.current.size > 0) {
                    setActiveIndex(Math.min(...Array.from(visibleCards.current)));
                }
            },
            {
                root: containerRef.current,
                threshold: 0.5,
            }
        );

        const currentCards = cardRefs.current;
        currentCards.forEach((card) => {
            if (card) observer.observe(card);
        });

        return () => {
            observer.disconnect();
            visibleCards.current.clear();
        };
    }, []);

    return (
        <div className="w-full relative py-10 md:py-20 overflow-hidden">
            <div className="font-['Press_Start_2P'] text-center text-[#535353] dark:text-[#f7f7f7] mb-4 text-[8px] sm:text-xs md:text-sm opacity-50 px-4">
                SWIPE_OR_USE_ARROWS_TO_DECRYPT_PROJECTS()
            </div>

            <div className="relative max-w-[1400px] mx-auto">
                {/* Left 8-bit Pixel Arrow Button (Desktop / Laptop only) */}
                <button
                    onClick={scrollLeft}
                    disabled={activeIndex === 0}
                    aria-label="Previous project"
                    className="hidden md:flex absolute left-2 lg:left-6 top-1/2 -translate-y-1/2 z-20 items-center justify-center p-3 bg-[#f7f7f7] dark:bg-[#2a2a2a] border-2 md:border-3 border-[#535353] dark:border-[#f7f7f7]/40 text-[#535353] dark:text-[#f7f7f7] shadow-[4px_4px_0px_#535353] dark:shadow-[4px_4px_0px_#f7f7f7]/20 hover:bg-[#535353] hover:text-[#f7f7f7] dark:hover:bg-[#f7f7f7] dark:hover:text-[#2a2a2a] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_#535353] dark:active:shadow-[2px_2px_0px_#f7f7f7]/20 transition-all disabled:opacity-20 disabled:cursor-not-allowed disabled:shadow-none cursor-pointer"
                >
                    <PixelArrowLeft className="w-6 h-6 sm:w-7 sm:h-7" />
                </button>

                {/* Right 8-bit Pixel Arrow Button (Desktop / Laptop only) */}
                <button
                    onClick={scrollRight}
                    disabled={activeIndex === projects.length - 1}
                    aria-label="Next project"
                    className="hidden md:flex absolute right-2 lg:right-6 top-1/2 -translate-y-1/2 z-20 items-center justify-center p-3 bg-[#f7f7f7] dark:bg-[#2a2a2a] border-2 md:border-3 border-[#535353] dark:border-[#f7f7f7]/40 text-[#535353] dark:text-[#f7f7f7] shadow-[4px_4px_0px_#535353] dark:shadow-[4px_4px_0px_#f7f7f7]/20 hover:bg-[#535353] hover:text-[#f7f7f7] dark:hover:bg-[#f7f7f7] dark:hover:text-[#2a2a2a] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_#535353] dark:active:shadow-[2px_2px_0px_#f7f7f7]/20 transition-all disabled:opacity-20 disabled:cursor-not-allowed disabled:shadow-none cursor-pointer"
                >
                    <PixelArrowRight className="w-6 h-6 sm:w-7 sm:h-7" />
                </button>

                {/* Project cards scroll container */}
                <div
                    ref={containerRef}
                    className="flex flex-row overflow-x-auto snap-x snap-mandatory scroll-smooth px-[10px] md:px-[60px] lg:px-[80px] scroll-pl-[10px] md:scroll-pl-[60px] lg:scroll-pl-[80px] pb-8 gap-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] items-stretch"
                    style={{ WebkitOverflowScrolling: 'touch' }}
                >
                    {projects.map((p, i) => (
                        <div
                            key={i}
                            ref={el => cardRefs.current[i] = el}
                            data-index={i}
                            className="snap-start shrink-0 flex"
                        >
                            <Card project={p} index={i} />
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-center items-center gap-3 mt-4">
                {projects.map((_, i) => (
                    <div
                        key={i}
                        className={`w-2 h-2 transition-all duration-300 ${i === activeIndex
                            ? 'bg-[#535353] dark:bg-[#f7f7f7] border border-[#535353] dark:border-[#f7f7f7]'
                            : 'bg-transparent border border-dashed border-[#535353] dark:border-[#f7f7f7] opacity-40'
                            }`}
                        aria-label={`Project ${i + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default ScrollStack;




