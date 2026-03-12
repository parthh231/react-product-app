import React from 'react'
import { createContext, useState } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {

    // try to read saved theme from localStorage (if any)
    const getInitialTheme = () => {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem('theme');
            if (stored === 'light' || stored === 'dark') return stored;
        }
        return 'light';
    };

    const [theme, setTheme] = useState(getInitialTheme());

    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    };

    // when the theme changes, keep body/class updated and persist
    React.useEffect(() => {
        if (typeof document !== 'undefined') {
            document.documentElement.className = theme;
        }
        if (typeof window !== 'undefined') {
            localStorage.setItem('theme', theme);
        }
    }, [theme]);

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    );
};


