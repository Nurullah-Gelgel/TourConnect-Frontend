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
        { code: 'tr', name: 'Türkçe' },
        { code: 'en', name: 'English' },
        { code: 'fa', name: 'فارسی' }
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
                            Rahvan
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
                        
                        <div className="relative group">
                            <Link 
                                to="/hotels" 
                                className={`px-3 py-2 rounded-md text-sm font-medium group-hover:bg-blue-50 ${
                                    isActive('/hotels') ? 'text-blue-600' : 'text-gray-700'
                                }`}
                            >
                                {t('nav.hotels')}
                            </Link>
                            <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                <div className="py-1">
                                    <Link to="/hotels/luxury" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50">
                                        {t('nav.hotelTypes.luxury')}
                            </Link>
                                    <Link to="/hotels/boutique" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50">
                                        {t('nav.hotelTypes.boutique')}
                                    </Link>
                                    <Link to="/hotels/deals" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50">
                                        {t('nav.hotelTypes.deals')}
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="relative group">
                            <Link 
                                to="/tours" 
                                className={`px-3 py-2 rounded-md text-sm font-medium group-hover:bg-blue-50 ${
                                    isActive('/tours') ? 'text-blue-600' : 'text-gray-700'
                                }`}
                            >
                                {t('nav.tours')}
                            </Link>
                            <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                <div className="py-1">
                                    <Link to="/tours/daily" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50">
                                        {t('nav.tourTypes.daily')}
                                    </Link>
                                    <Link to="/tours/cultural" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50">
                                        {t('nav.tourTypes.cultural')}
                                    </Link>
                                    <Link to="/tours/nature" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50">
                                        {t('nav.tourTypes.nature')}
                                    </Link>
                                </div>
                            </div>
                        </div>

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
                                <span>{currentLanguage.name}</span>
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
                                            className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
                                                currentLanguage.code === language.code ? 'bg-gray-50 text-blue-600' : ''
                                            }`}
                                        >
                                            {language.name}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {isUserAuthenticated && (
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
                                            <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50">
                                                {t('nav.profile')}
                                            </Link>
                                            <Link to="/reservations" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50">
                                                {t('nav.reservations')}
                                            </Link>
                                            <Link to="/favorites" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50">
                                                {t('nav.favorites')}
                                            </Link>
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
                        <Link to="/tours" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-50">
                            {t('nav.tours')}
                        </Link>
                        <Link to="/touristic-places" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-50">
                            {t('nav.places')}
                        </Link>
                        <Link to="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-50">
                            {t('nav.contact')}
                        </Link>
                        {isUserAuthenticated && (
                            <>
                                <Link to="/profile" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-50">
                                    {t('nav.profile')}
                                </Link>
                                <Link to="/reservations" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-50">
                                    {t('nav.reservations')}
                                </Link>
                                <Link to="/favorites" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-50">
                                    {t('nav.favorites')}
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar; 