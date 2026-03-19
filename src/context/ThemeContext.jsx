import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {

    // try to read saved theme from localStorage (if any)
    const getInitialTheme = () => {
        return 'light';
    };

    const [theme, setTheme] = useState(getInitialTheme());

    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    };

    // when the theme changes, keep body/class updated and persist
    useEffect(() => {
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


