import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        localStorage.setItem('preferredLanguage', lng);
    };

    return (
        <div className="flex items-center space-x-2">
            <button
                onClick={() => changeLanguage('fa')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all duration-200 ${
                    i18n.language === 'fa' 
                        ? 'bg-[#00A9FF] text-white shadow-md' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                dir="rtl"
            >
                فارسی
            </button>
            <button
                onClick={() => changeLanguage('tr')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all duration-200 ${
                    i18n.language === 'tr' 
                        ? 'bg-[#00A9FF] text-white shadow-md' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
                Türkçe
            </button>
            <button
                onClick={() => changeLanguage('en')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all duration-200 ${
                    i18n.language === 'en' 
                        ? 'bg-[#00A9FF] text-white shadow-md' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
                English
            </button>
        </div>
    );
};

export default LanguageSwitcher; 