import { useState } from "react";

export default function useBibleSettings() {
    const [font, setFont] = useState<string>(() => {
        return localStorage.getItem('biblify__settings__font') || 'Inter';
    });
    const [theme, setTheme] = useState<string>(() => {
        return localStorage.getItem('biblify__settings__theme') || 'light';
    });

    const updateFont = (newFont: string) => {
        localStorage.setItem('biblify__settings__font', newFont);
        setFont(newFont);
    };

    const updateTheme = (newTheme: string) => {
        localStorage.setItem('biblify__settings__theme', newTheme);
        setTheme(newTheme);
    };

    return { font, setFont: updateFont, theme, setTheme: updateTheme };
}
