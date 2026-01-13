import React, { useState, useEffect, useRef } from 'react';

const SplashScreen = ({ onComplete }) => {
    const [displayText, setDisplayText] = useState('');
    const [phase, setPhase] = useState(0);
    const [showEnter, setShowEnter] = useState(false);
    const [fadeOut, setFadeOut] = useState(false);
    const isAnimating = useRef(false);

    const texts = ['RHIYA_BURANPUR', 'HELLO', './PORTFOLIO.exe'];
    const typingSpeed = 80;
    const deletingSpeed = 40;
    const pauseBeforeDelete = 800;
    const pauseBeforeNext = 200;

    useEffect(() => {
        if (isAnimating.current) return;
        isAnimating.current = true;

        const runAnimation = async () => {
            for (let p = 0; p < texts.length; p++) {
                const target = texts[p];

                for (let i = 1; i <= target.length; i++) {
                    await new Promise(r => setTimeout(r, typingSpeed));
                    setDisplayText(target.substring(0, i));
                }

                if (p < texts.length - 1) {
                    await new Promise(r => setTimeout(r, pauseBeforeDelete));

                    for (let i = target.length; i >= 0; i--) {
                        await new Promise(r => setTimeout(r, deletingSpeed));
                        setDisplayText(target.substring(0, i));
                    }

                    await new Promise(r => setTimeout(r, pauseBeforeNext));
                }
            }

            await new Promise(r => setTimeout(r, pauseBeforeDelete));
            setShowEnter(true);
            await new Promise(r => setTimeout(r, 600));
            setFadeOut(true);
            await new Promise(r => setTimeout(r, 500));
            onComplete();
        };

        runAnimation();
    }, []);

    return (
        <div className={`fixed inset-0 z-[100] bg-[#f7f7f7] dark:bg-[#1a1a1a] flex items-center justify-center transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
            <div className="text-center">
                <h1 className="font-['Press_Start_2P'] text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[#535353] dark:text-[#f7f7f7] leading-tight">
                    <span>&gt; </span>
                    {displayText}
                    <span className="animate-[blink_1s_step-end_infinite]">_</span>
                    {showEnter && <span className="ml-2 text-[#535353]/60 dark:text-[#f7f7f7]/60">↵</span>}
                </h1>
            </div>
        </div>
    );
};

export default SplashScreen;
