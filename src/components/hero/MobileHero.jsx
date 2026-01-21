import React from 'react';

const MobileHero = () => {
    return (
        <section id="hero-mobile" className="w-full min-h-[85vh] flex flex-col items-center justify-center relative border-b-2 border-dashed border-[#535353]/20 dark:border-[#f7f7f7]/20 pt-16 px-6 lg:hidden">
            <div className="text-center space-y-6 max-w-lg">
                {/* Title */}
                <h1 className="font-['Press_Start_2P'] text-xl sm:text-2xl text-[#535353] dark:text-[#f7f7f7] leading-tight">
                    &gt; RHIYA_BURANPUR<span className="animate-pulse">_</span>
                </h1>

                {/* Subtitle */}
                <div className="font-['VT323'] text-2xl sm:text-3xl text-[#535353] dark:text-[#f7f7f7] opacity-80">
                    <p>Systems | Cloud | AI</p>
                </div>

                {/* Bio Description */}
                <p className="font-sans text-sm sm:text-base text-[#535353] dark:text-[#f7f7f7]/80 leading-relaxed">
                    Building scalable distributed systems and intelligent AI solutions.
                    Currently optimizing algorithms and exploring cloud native technologies.
                </p>

                {/* Simple Visual Element */}
                <div className="py-8">
                    <div className="w-24 h-24 mx-auto border-4 border-[#535353] dark:border-[#f7f7f7] border-dashed rounded-full flex items-center justify-center">
                        <span className="font-['VT323'] text-xl">INIT</span>
                    </div>
                </div>

                <div className="text-xs opacity-60 font-['Press_Start_2P'] animate-bounce mt-8">
                    SCROLL_DOWN()
                </div>
            </div>
        </section>
    );
};

export default MobileHero;
