import React, { useState } from 'react';

const MobileBanner = () => {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 w-full z-50 lg:hidden bg-[#0a0a0a] border-t border-dashed border-[#535353]/40 px-4 py-2 flex justify-between items-center text-[#f7f7f7]/80 font-['VT323'] text-sm sm:text-base shadow-[0_-4px_10px_rgba(0,0,0,0.5)]">
            <span>&gt; Best experienced on desktop</span>
            <button
                onClick={() => setIsVisible(false)}
                className="ml-4 text-[#f7f7f7]/60 hover:text-[#f7f7f7] transition-colors focus:outline-none select-none"
                aria-label="Dismiss banner"
            >
                [X]
            </button>
        </div>
    );
};

export default MobileBanner;
