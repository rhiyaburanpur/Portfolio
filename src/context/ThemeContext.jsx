import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext({
    darkMode: false,
    toggleDarkMode: () => { }
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        // Check for saved preference
        const saved = localStorage.getItem('darkMode');
        if (saved !== null) {
            setDarkMode(saved === 'true');
        }
    }, []);

    useEffect(() => {
        // Apply theme to document
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('darkMode', darkMode.toString());
    }, [darkMode]);

    const toggleDarkMode = () => setDarkMode(prev => !prev);

    return (
        <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
};
