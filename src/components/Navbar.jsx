import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const location = useLocation();
    const { t, i18n } = useTranslation();
    const [isLanguageOpen, setIsLanguageOpen] = useState(false);
    const { isAuthenticated, logout } = useAuth();

    const isUserAuthenticated = isAuthenticated();

    const isActive = (path) => location.pathname === path;

    const languages = [
        { code: 'tr', name: 'Türkçe', symbol: 'TR' },
        { code: 'en', name: 'English', symbol: 'EN' },
        { code: 'fa', name: 'فارسی', symbol: 'FA' }
    ];

    const changeLanguage = (languageCode) => {
        i18n.changeLanguage(languageCode);
        setIsLanguageOpen(false);
        localStorage.setItem('preferredLanguage', languageCode);
    };

    const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

    const handleLogout = () => {
        logout();
        setIsProfileDropdownOpen(false);
        navigate('/');
    };

    return (
        <nav className="bg-white shadow-md p-4">
            <div className="container mx-auto">
                <div className="flex items-center justify-between">
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="w-12 h-12 relative">
                            <img 
                                src="/logo.png"
                                alt="Van Tour Logo"
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                            RahVan
                        </span>
                    </Link>

                    <div className="hidden md:flex items-center space-x-4">
                        <Link 
                            to="/" 
                            className={`px-3 py-2 rounded-md text-sm font-medium ${
                                isActive('/') 
                                    ? 'bg-blue-500 text-white' 
                                    : 'text-gray-700 hover:bg-blue-50'
                            }`}
                        >
                            {t('nav.home')}
                        </Link>
                        <Link 
                            to="/hotels" 
                            className={`px-3 py-2 rounded-md text-sm font-medium ${
                                isActive('/hotels') 
                                    ? 'bg-blue-500 text-white' 
                                    : 'text-gray-700 hover:bg-blue-50'
                            }`}
                        >
                            {t('nav.hotels')}
                        </Link>
                        <Link 
                            to="/touristic-places" 
                            className={`px-3 py-2 rounded-md text-sm font-medium ${
                                isActive('/touristic-places') 
                                    ? 'bg-blue-500 text-white' 
                                    : 'text-gray-700 hover:bg-blue-50'
                            }`}
                        >
                            {t('nav.places')}
                        </Link>
                        <Link 
                            to="/contact" 
                            className={`px-3 py-2 rounded-md text-sm font-medium ${
                                isActive('/contact') 
                                    ? 'bg-blue-500 text-white' 
                                    : 'text-gray-700 hover:bg-blue-50'
                            }`}
                        >
                            {t('nav.contact')}
                        </Link>

                        <div className="relative">
                            <button
                                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                                className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100"
                            >
                                <span className="text-xl">🌐</span>
                                <svg
                                    className={`w-4 h-4 transition-transform ${isLanguageOpen ? 'rotate-180' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {isLanguageOpen && (
                                <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl z-50">
                                    {languages.map((language) => (
                                        <button
                                            key={language.code}
                                            onClick={() => changeLanguage(language.code)}
                                            className={`w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center justify-between ${
                                                currentLanguage.code === language.code ? 'bg-gray-50 text-blue-600' : ''
                                            }`}
                                        >
                                            <span>{language.name}</span>
                                            <span className="font-medium">{language.symbol}</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {isUserAuthenticated ? (
                            <div className="relative">
                                <button 
                                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                                    className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-blue-50"
                                >
                                    <span className="ml-2">{t('nav.account')}</span>
                                </button>
                                {isProfileDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                        <div className="py-1">
                                            <button 
                                                onClick={handleLogout}
                                                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                            >
                                                {t('nav.logout')}
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex space-x-2">
                                <Link 
                                    to="/login"
                                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-blue-50"
                                >
                                    {t('nav.login')}
                                </Link>
                                <Link 
                                    to="/register"
                                    className="px-3 py-2 rounded-md text-sm font-medium bg-blue-500 text-white hover:bg-blue-600"
                                >
                                    {t('nav.register')}
                                </Link>
                            </div>
                        )}
                    </div>

                    <button 
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden rounded-md p-2 text-gray-700 hover:bg-blue-50"
                    >
                        <svg 
                            className="h-6 w-6" 
                            fill="none" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="2" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                        >
                            {isMobileMenuOpen ? (
                                <path d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {isMobileMenuOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-50">
                            {t('nav.home')}
                        </Link>
                        <Link to="/hotels" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-50">
                            {t('nav.hotels')}
                        </Link>
                        <Link to="/touristic-places" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-50">
                            {t('nav.places')}
                        </Link>
                        <Link to="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-50">
                            {t('nav.contact')}
                        </Link>
                        
                        {/* Dil Seçici */}
                        <div className="px-3 py-2">
                            <div className="relative">
                                <button
                                    onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                                    className="w-full flex items-center justify-between px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-50"
                                >
                                    <span className="flex items-center">
                                        <span className="text-xl mr-2">🌐</span>
                                        {currentLanguage.name}
                                    </span>
                                    <svg
                                        className={`w-4 h-4 transition-transform ${isLanguageOpen ? 'rotate-180' : ''}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                {isLanguageOpen && (
                                    <div className="mt-2 py-2 w-full bg-white rounded-lg shadow-xl">
                                        {languages.map((language) => (
                                            <button
                                                key={language.code}
                                                onClick={() => changeLanguage(language.code)}
                                                className={`w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center justify-between ${
                                                    currentLanguage.code === language.code ? 'bg-gray-50 text-blue-600' : ''
                                                }`}
                                            >
                                                <span>{language.name}</span>
                                                <span className="font-medium">{language.symbol}</span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Kullanıcı Menüsü */}
                        {isUserAuthenticated ? (
                            <button 
                                onClick={handleLogout}
                                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
                            >
                                {t('nav.logout')}
                            </button>
                        ) : (
                            <div className="space-y-2">
                                <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-50">
                                    {t('nav.login')}
                                </Link>
                                <Link to="/register" className="block px-3 py-2 rounded-md text-base font-medium bg-blue-500 text-white hover:bg-blue-600">
                                    {t('nav.register')}
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar; 