'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import en from '@/i18n/en';
import ar from '@/i18n/ar';

const translations = { en, ar };

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    const [lang, setLang] = useState('en');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('sw-lang');
        if (saved === 'ar' || saved === 'en') {
            setLang(saved);
        }
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;
        localStorage.setItem('sw-lang', lang);
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    }, [lang, mounted]);

    const t = translations[lang];

    return (
        <LanguageContext.Provider value={{ lang, setLang, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
