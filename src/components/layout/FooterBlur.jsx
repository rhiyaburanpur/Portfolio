import React from 'react';

const FooterBlur = () => {
    return (
        <footer className="w-full relative py-20 text-center bg-[#f7f7f7] overflow-hidden">
            {/* Horizon Line / Fog */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-[#f7f7f7] z-10 pointer-events-none" />

            {/* Pixel Pattern simulating ground/noise */}
            <div className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(45deg, #535353 25%, transparent 25%, transparent 75%, #535353 75%, #535353), linear-gradient(45deg, #535353 25%, transparent 25%, transparent 75%, #535353 75%, #535353)`,
                    backgroundSize: '4px 4px',
                    backgroundPosition: '0 0, 2px 2px'
                }}
            />

            <div className="relative z-20 flex flex-col items-center gap-4">
                <div className="font-['Press_Start_2P'] text-[#535353] text-sm animate-pulse">
                    GAME OVER
                </div>
                <p className="font-['VT323'] text-[#535353] opacity-60">
                    © 2026 Rhiya Buranpur. High Score: ∞
                </p>
            </div>
        </footer>
    );
};

export default FooterBlur;
