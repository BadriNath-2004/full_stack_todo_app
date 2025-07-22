// src/components/LanguageSwitcher.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (lang: 'en' | 'hi') => {
    i18n.changeLanguage(lang);
    localStorage.setItem('lang', lang); // persist user preference
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={() => handleLanguageChange('en')}
        className={`px-2 py-1 border rounded ${
          i18n.language === 'en' ? 'text-blue-600 font-semibold' : 'text-gray-700'
        }`}
      >
        English
      </button>
      <button
        onClick={() => handleLanguageChange('hi')}
        className={`px-2 py-1 border rounded ${
          i18n.language === 'hi' ? 'text-blue-600 font-semibold' : 'text-gray-700'
        }`}
      >
        हिंदी
      </button>
    </div>
  );
};

export default LanguageSwitcher;
