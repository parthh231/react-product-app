import React, { useEffect, useState } from 'react'

const useLocalStorage = (key, initialValue) => {

    const [value, setValue] = useState(() => {
        try {
            const storedValue = localStorage.getItem(key);
            if (storedValue) {
                return JSON.parse(storedValue);
            }
        } catch (error) {
            console.error('Error parsing localStorage value:', error);
        }
        return initialValue;
    });

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error('Error saving to localStorage:', error);
        }
    }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
