import React, { useState, useRef, useEffect } from 'react';

const TerminalContact = () => {
    const [history, setHistory] = useState([
        { type: 'system', text: '> TERMINAL v1.0 INITIALIZED' },
        { type: 'system', text: '> Type "help" for available commands' },
        { type: 'system', text: '' },
    ]);
    const [input, setInput] = useState('');
    const [contactStep, setContactStep] = useState(null); // null | 'name' | 'email' | 'message'
    const [contactData, setContactData] = useState({ name: '', email: '', message: '' });

    const inputRef = useRef(null);
    const historyEndRef = useRef(null);
    const audioContextRef = useRef(null);

    const PROMPT = 'rhiya@portfolio:~$ ';

    // Auto-scroll to bottom when history updates
    useEffect(() => {
        historyEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    // Focus input on click anywhere in terminal
    const focusInput = () => {
        inputRef.current?.focus();
    };

    // Play retro success sound using Web Audio API
    const playSuccessSound = () => {
        try {
            if (!audioContextRef.current) {
                audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
            }
            const ctx = audioContextRef.current;

            // Create a retro "Game Over" style sound sequence
            const playTone = (freq, start, duration) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'square';
                osc.frequency.value = freq;
                gain.gain.setValueAtTime(0.1, ctx.currentTime + start);
                gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + start + duration);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(ctx.currentTime + start);
                osc.stop(ctx.currentTime + start + duration);
            };

            // Victory jingle: ascending notes
            playTone(523, 0, 0.15);    // C5
            playTone(659, 0.15, 0.15); // E5
            playTone(784, 0.3, 0.15);  // G5
            playTone(1047, 0.45, 0.3); // C6
        } catch (e) {
            console.log('Audio not available');
        }
    };

    // Command handlers
    const commands = {
        help: () => [
            { type: 'output', text: '> AVAILABLE COMMANDS:' },
            { type: 'output', text: '  help    - Show this help message' },
            { type: 'output', text: '  ls      - List featured projects' },
            { type: 'output', text: '  about   - Display bio' },
            { type: 'output', text: '  contact - Send a message' },
            { type: 'output', text: '  clear   - Clear terminal' },
            { type: 'output', text: '' },
        ],

        ls: () => [
            { type: 'output', text: '> FEATURED_PROJECTS/' },
            { type: 'output', text: '  01. VolunEra    [PYTHON/AI]' },
            { type: 'output', text: '  02. KontoFlow   [PYTHON/CLOUD/SQLLITE]' },
            { type: 'output', text: '  03. Go-Distributed-Crawler   [GOLANG/DOCKER]' },
            { type: 'output', text: '  04. PDF2Quiz  [STREAMLIT/HUGGINGFACE]' },
            { type: 'output', text: '' },
        ],

        about: () => [
            { type: 'output', text: '> ABOUT_RHIYA.exe' },
            { type: 'output', text: '  --------------------------------' },
            { type: 'output', text: '  Systems | Cloud | AI Developer' },
            { type: 'output', text: '  Building performance-critical' },
            { type: 'output', text: '  tools and scalable platforms.' },
            { type: 'output', text: '  --------------------------------' },
            { type: 'output', text: '' },
        ],

        contact: () => {
            setContactStep('name');
            return [
                { type: 'system', text: '> INITIATING CONTACT SEQUENCE...' },
                { type: 'prompt', text: '> Enter your name:' },
            ];
        },

        clear: () => {
            setHistory([]);
            return [];
        },
    };

    // Handle contact flow steps
    const handleContactStep = (value) => {
        let newHistory = [];

        switch (contactStep) {
            case 'name':
                setContactData(prev => ({ ...prev, name: value }));
                newHistory = [
                    { type: 'input', text: value },
                    { type: 'prompt', text: '> Enter your email:' },
                ];
                setContactStep('email');
                break;

            case 'email':
                setContactData(prev => ({ ...prev, email: value }));
                newHistory = [
                    { type: 'input', text: value },
                    { type: 'prompt', text: '> Enter your message:' },
                ];
                setContactStep('message');
                break;

            case 'message':
                const finalData = { ...contactData, message: value };
                setContactData({ name: '', email: '', message: '' });

                // Log data (Firebase integration placeholder)
                console.log('Contact submission:', finalData);

                newHistory = [
                    { type: 'input', text: value },
                    { type: 'system', text: '> TRANSMITTING...' },
                    { type: 'success', text: '> MESSAGE SAVED TO HIGH SCORE BOARD' },
                    { type: 'success', text: '> ★★★ TRANSMISSION COMPLETE ★★★' },
                    { type: 'output', text: '' },
                ];
                setContactStep(null);

                // Play success sound after a brief delay
                setTimeout(playSuccessSound, 300);
                break;
        }

        return newHistory;
    };

    // Process command input
    const handleSubmit = (e) => {
        e.preventDefault();
        const trimmedInput = input.trim();

        if (!trimmedInput) return;

        let newEntries = [];

        // If in contact flow
        if (contactStep) {
            newEntries = handleContactStep(trimmedInput);
        } else {
            // Add user command to history
            newEntries.push({ type: 'command', text: `${PROMPT}${trimmedInput}` });

            const cmd = trimmedInput.toLowerCase();

            if (commands[cmd]) {
                const result = commands[cmd]();
                newEntries = [...newEntries, ...result];
            } else {
                newEntries.push({ type: 'error', text: `> Command not found: ${trimmedInput}` });
                newEntries.push({ type: 'output', text: '> Type "help" for available commands' });
                newEntries.push({ type: 'output', text: '' });
            }
        }

        setHistory(prev => [...prev, ...newEntries]);
        setInput('');
    };

    // Get color class based on entry type
    const getColorClass = (type) => {
        switch (type) {
            case 'error': return 'text-red-400';
            case 'success': return 'text-green-400';
            case 'system': return 'text-cyan-400';
            case 'prompt': return 'text-yellow-400';
            default: return 'text-[#F7F7F7]';
        }
    };

    // Get current prompt based on state
    const getCurrentPrompt = () => {
        if (contactStep === 'name') return '> name: ';
        if (contactStep === 'email') return '> email: ';
        if (contactStep === 'message') return '> message: ';
        return PROMPT;
    };

    return (
        <div className="relative w-full max-w-3xl mx-auto p-2 sm:p-4">
            {/* CRT Monitor Frame */}
            <div className="relative bg-[#1a1a1a] rounded-2xl p-3 sm:p-4 shadow-[0_0_40px_rgba(0,0,0,0.8),inset_0_0_20px_rgba(0,0,0,0.5)]">

                {/* Screen Bezel */}
                <div className="relative overflow-hidden rounded-lg">

                    {/* CRT Curved Screen Effect */}
                    <div
                        className="absolute inset-0 pointer-events-none z-20"
                        style={{
                            background: 'radial-gradient(ellipse at center, transparent 0%, transparent 60%, rgba(0,0,0,0.4) 100%)',
                        }}
                    />

                    {/* Scanlines Overlay */}
                    <div
                        className="absolute inset-0 pointer-events-none z-10 opacity-[0.03]"
                        style={{
                            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.8) 2px, rgba(0,0,0,0.8) 4px)',
                        }}
                    />

                    {/* Animated Scanline */}
                    <div
                        className="absolute left-0 w-full h-[4px] bg-white/5 pointer-events-none z-10 animate-[scanline_4s_linear_infinite]"
                    />

                    {/* Screen Glare */}
                    <div
                        className="absolute inset-0 pointer-events-none z-20 opacity-30"
                        style={{
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, transparent 100%)',
                        }}
                    />

                    {/* Terminal Content */}
                    <div
                        className="relative bg-[#535353] min-h-[350px] sm:min-h-[400px] p-3 sm:p-4 font-['Press_Start_2P'] text-[10px] sm:text-xs cursor-text overflow-hidden"
                        onClick={focusInput}
                    >
                        {/* Scrollable History */}
                        <div className="h-[280px] sm:h-[320px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#F7F7F7]/30 scrollbar-track-transparent pr-2">
                            {history.map((entry, index) => (
                                <div
                                    key={index}
                                    className={`${getColorClass(entry.type)} leading-relaxed whitespace-pre-wrap break-words`}
                                >
                                    {entry.text}
                                </div>
                            ))}
                            <div ref={historyEndRef} />
                        </div>

                        {/* Input Line */}
                        <form onSubmit={handleSubmit} className="flex items-center mt-2 border-t border-[#F7F7F7]/20 pt-2">
                            <span className="text-[#F7F7F7] flex-shrink-0">{getCurrentPrompt()}</span>
                            <div className="relative flex-1">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    className="w-full bg-transparent text-[#F7F7F7] outline-none border-none font-['Press_Start_2P'] text-[10px] sm:text-xs caret-transparent"
                                    autoFocus
                                    autoComplete="off"
                                    spellCheck="false"
                                />
                                {/* Blinking Block Cursor */}
                                <span
                                    className="absolute top-0 text-[#F7F7F7] animate-[blink_1s_step-end_infinite] pointer-events-none"
                                    style={{ left: `${input.length * 0.65}em` }}
                                >
                                    █
                                </span>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Monitor Base Indicator */}
                <div className="flex justify-center mt-3 gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e] animate-pulse" />
                    <div className="w-8 h-2 rounded-full bg-[#333]" />
                </div>
            </div>
        </div>
    );
};

export default TerminalContact;
