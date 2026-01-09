import React, { useEffect, useRef } from 'react';
import ChromeDinoAssets from './ChromeDinoAssets';
import { initDinoGame } from './dino-logic';
import './dino-game.css';

const ChromeDinoGame = () => {
    const wrapperRef = useRef(null);
    const initializedRef = useRef(false);

    useEffect(() => {
        if (!wrapperRef.current || initializedRef.current) return;

        // Initialize the game engine
        let runnerInstance = null;
        // Increased timeout to ensure DOM and Assets are fully ready
        const timer = setTimeout(() => {
            runnerInstance = initDinoGame('#dino-game-root .interstitial-wrapper');
            window.dinoRunner = runnerInstance; // Expose for debugging
            initializedRef.current = true;
        }, 500);

        return () => {
            clearTimeout(timer);
            if (runnerInstance && runnerInstance.destroy) {
                runnerInstance.destroy();
            }
            if (window.dinoRunner === runnerInstance) window.dinoRunner = null;
            initializedRef.current = false;
        };
    }, []);

    const handleWrapperClick = () => {
        // Fallback manual trigger for start/jump if focus logic fails
        if (window.dinoRunner && window.dinoRunner.onKeyDown) {
            // Simulate Space press for jump/start
            const e = { keyCode: 32, type: 'keydown', target: document.body, preventDefault: () => { } };
            window.dinoRunner.onKeyDown(e);
        }
    };

    return (
        <div
            id="dino-game-root"
            className="w-full h-full relative bg-[#f7f7f7] overflow-hidden"
            tabIndex={0}
            onClick={handleWrapperClick}
            style={{ outline: 'none', cursor: 'pointer', zIndex: 10 }}
        >
            {/* The wrapper expected by the game engine */}
            <div className="interstitial-wrapper" ref={wrapperRef} style={{ maxWidth: '100%', margin: '0', height: '100%' }}>
            </div>

            {/* Hidden Assets */}
            <div style={{ display: 'none' }}>
                <ChromeDinoAssets />
            </div>
        </div>
    );
};

export default ChromeDinoGame;
