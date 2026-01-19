import React from 'react';

const projects = [
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

const Card = ({ project, index }) => {
    return (
        <div
            className="sticky w-full max-w-[95%] sm:max-w-xl md:max-w-2xl mx-auto mb-8 md:mb-12 bg-[#f7f7f7] dark:bg-[#2a2a2a] border-2 md:border-4 border-[#535353] dark:border-[#f7f7f7]/30 p-4 sm:p-6 md:p-8 shadow-[4px_4px_0px_#535353] md:shadow-[8px_8px_0px_#535353] dark:shadow-[4px_4px_0px_#f7f7f7]/20"
            style={{ top: `calc(80px + ${index * 30}px)` }}
        >
            <div className="flex flex-col sm:flex-row justify-between items-start border-b-2 border-[#535353] dark:border-[#f7f7f7]/30 pb-3 md:pb-4 mb-3 md:mb-4 gap-2">
                <div className="flex-1">
                    <h2 className="font-['Press_Start_2P'] text-sm sm:text-base md:text-lg lg:text-xl text-[#535353] dark:text-[#f7f7f7] mb-2 break-words">{project.title}</h2>
                    <span className="font-['VT323'] text-xs sm:text-sm bg-[#535353]/10 dark:bg-[#f7f7f7]/10 px-2 py-1 text-[#535353] dark:text-[#f7f7f7]">{project.status}</span>
                </div>
                <span className="font-['VT323'] text-lg md:text-xl bg-[#535353] dark:bg-[#f7f7f7] text-[#f7f7f7] dark:text-[#535353] px-2">#{String(index + 1).padStart(2, '0')}</span>
            </div>

            <div className="mb-4 md:mb-6 font-['VT323'] text-xl md:text-2xl text-[#535353] dark:text-[#f7f7f7] opacity-80">
                {project.category}
            </div>

            <p className="font-sans text-[#535353] dark:text-[#f7f7f7]/80 mb-4 md:mb-6 leading-relaxed text-xs sm:text-sm md:text-base">
                {project.description}
            </p>

            <div className="flex gap-2 flex-wrap mb-4 md:mb-6">
                {project.tech.map(t => (
                    <span key={t} className="px-2 sm:px-3 py-1 border border-[#535353] dark:border-[#f7f7f7]/50 font-['VT323'] text-base md:text-lg text-[#535353] dark:text-[#f7f7f7] hover:bg-[#535353] dark:hover:bg-[#f7f7f7] hover:text-[#f7f7f7] dark:hover:text-[#535353] transition-none cursor-crosshair">
                        {t}
                    </span>
                ))}
            </div>

            <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-block bg-[#535353] dark:bg-[#f7f7f7] text-[#f7f7f7] dark:text-[#535353] font-['VT323'] text-lg md:text-xl px-4 md:px-6 py-2 hover:bg-[#333] dark:hover:bg-[#ddd] transition-colors">
                VIEW_SOURCE -&gt;
            </a>
        </div>
    )
}

const ScrollStack = () => {
    return (
        <div className="w-full relative py-10 md:py-20 px-2 sm:px-4 min-h-[120vh] md:min-h-[150vh]">
            <div className="sticky top-16 md:top-10 font-['Press_Start_2P'] text-center text-[#535353] dark:text-[#f7f7f7] mb-12 md:mb-20 text-[8px] sm:text-xs md:text-sm opacity-50 px-4">
                SCROLL_TO_DECRYPT_PROJECTS()
            </div>

            <div className="flex flex-col gap-6 md:gap-10">
                {projects.map((p, i) => (
                    <Card key={i} project={p} index={i} />
                ))}
            </div>
        </div>
    );
};

export default ScrollStack;
