import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';

const Layout = ({ children }) => {
    const { darkMode, toggleDarkMode } = useTheme();
    const [showCRT, setShowCRT] = useState(false);

    // Delay CRT effect to reduce initial flash
    useEffect(() => {
        const timer = setTimeout(() => setShowCRT(true), 500);
        return () => clearTimeout(timer);
    }, []);

    const bgColor = darkMode ? 'bg-[#1a1a1a]' : 'bg-[#f7f7f7]';
    const textColor = darkMode ? 'text-[#f7f7f7]' : 'text-[#535353]';

    return (
        <div className={`relative min-h-screen w-full overflow-hidden selection:bg-[#535353] selection:text-[#f7f7f7] ${bgColor} ${textColor} transition-colors duration-500`}>
            {/* CRT Overlay Effect - Delayed & Slower */}
            {showCRT && (
                <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden h-full w-full opacity-0 animate-[fadeIn_1s_ease-in-out_forwards]">
                    <div className={`absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.05)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_2px,3px_100%] pointer-events-none ${darkMode ? 'opacity-30' : 'opacity-100'}`} />
                    <div className={`absolute inset-0 ${darkMode ? 'bg-black' : 'bg-white'} opacity-[0.01] mix-blend-overlay pointer-events-none`} style={{ animation: 'flicker 8s linear infinite' }} />
                </div>
            )}

            {/* Dark Mode Toggle */}
            <button
                onClick={toggleDarkMode}
                className={`fixed top-6 right-6 z-40 p-2 border-2 ${darkMode ? 'border-[#f7f7f7] text-[#f7f7f7]' : 'border-[#535353] text-[#535353]'} font-['Press_Start_2P'] text-xs hover:bg-[#535353] hover:text-[#f7f7f7] transition-none shadow-[2px_2px_0px_currentColor] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]`}
            >
                {darkMode ? 'LIGHT' : 'DARK'}
            </button>

            {/* Main Content */}
            <main className="relative z-10 flex flex-col items-center w-full max-w-[7000px] mx-auto px-2 md:px-0">
                {children}
            </main>

            {/* Background Layer */}
            <div id="canvas-container" className={`fixed inset-0 z-0 ${bgColor} transition-colors duration-500`} />
        </div>
    );
};

export default Layout;
