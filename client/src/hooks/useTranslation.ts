"use client";

import { useState, useEffect } from 'react';
import en from '../../locales/en.json';
import is from '../../locales/is.json';

const translations = {
  en,
  is,
};

export const useTranslation = () => {
  // Use state to track if component is mounted (client-side)
  const [isClient, setIsClient] = useState(false);
  const [locale, setLocale] = useState<string>('en');

  useEffect(() => {
    // Set client flag and get saved language from localStorage
    setIsClient(true);
    if (typeof window !== 'undefined') {
      const savedLocale = localStorage.getItem('language') || 'en';
      setLocale(savedLocale);
    }
  }, []);

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[locale as keyof typeof translations] || translations.en;
    
    for (const k of keys) {
      value = value[k];
      if (value === undefined) {
        console.warn(`Translation key "${key}" not found for locale "${locale}"`);
        return key;
      }
    }
    
    return value;
  };

  const changeLanguage = (newLocale: string) => {
    setLocale(newLocale);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', newLocale);
    }
  };

  return {
    t,
    locale,
    changeLanguage,
    isClient, // Expose this so components can handle SSR
  };
};
