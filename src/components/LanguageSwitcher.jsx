import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div className="flex items-center space-x-2">
            <button
                onClick={() => changeLanguage('tr')}
                className={`px-2 py-1 rounded ${
                    i18n.language === 'tr' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-200 text-gray-700'
                }`}
            >
                TR
            </button>
            <button
                onClick={() => changeLanguage('en')}
                className={`px-2 py-1 rounded ${
                    i18n.language === 'en' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-200 text-gray-700'
                }`}
            >
                EN
            </button>
        </div>
    );
};

export default LanguageSwitcher; 