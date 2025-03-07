import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const location = useLocation();

    // Aktif link kontrolü için yardımcı fonksiyon
    const isActive = (path) => location.pathname === path;

    // Dil seçenekleri
    const languages = [
        { code: 'tr', name: 'Türkçe' },
        { code: 'en', name: 'English' },
        { code: 'fa', name: 'فارسی' }
    ];

    return (
        <nav className="bg-white shadow-md p-4">
            <div className="container mx-auto">
                <div className="flex items-center justify-between">
                    {/* Logo Bölümü */}
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="w-12 h-12 relative">
                            <img 
                                src="/logo.png" // Logo public klasöründe olmalı
                                alt="Van Tour Logo"
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                            Van Tour
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Link 
                            to="/" 
                            className={`px-3 py-2 rounded-md text-sm font-medium ${
                                isActive('/') 
                                    ? 'bg-blue-500 text-white' 
                                    : 'text-gray-700 hover:bg-blue-50'
                            }`}
                        >
                            Ana Sayfa
                        </Link>
                        
                        {/* Oteller Dropdown */}
                        <div className="relative group">
                            <Link 
                                to="/hotels" 
                                className={`px-3 py-2 rounded-md text-sm font-medium group-hover:bg-blue-50 ${
                                    isActive('/hotels') ? 'text-blue-600' : 'text-gray-700'
                                }`}
                            >
                                Oteller
                            </Link>
                            <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                <div className="py-1">
                                    <Link to="/hotels/luxury" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50">Lüks Oteller</Link>
                                    <Link to="/hotels/boutique" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50">Butik Oteller</Link>
                                    <Link to="/hotels/deals" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50">Fırsat Oteller</Link>
                                </div>
                            </div>
                        </div>

                        {/* Turlar Dropdown */}
                        <div className="relative group">
                            <Link 
                                to="/tours" 
                                className={`px-3 py-2 rounded-md text-sm font-medium group-hover:bg-blue-50 ${
                                    isActive('/tours') ? 'text-blue-600' : 'text-gray-700'
                                }`}
                            >
                                Turlar
                            </Link>
                            <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                <div className="py-1">
                                    <Link to="/tours/daily" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50">Günlük Turlar</Link>
                                    <Link to="/tours/cultural" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50">Kültür Turları</Link>
                                    <Link to="/tours/nature" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50">Doğa Turları</Link>
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
                            Turistik Yerler
                        </Link>

                        <Link 
                            to="/contact" 
                            className={`px-3 py-2 rounded-md text-sm font-medium ${
                                isActive('/contact') 
                                    ? 'bg-blue-500 text-white' 
                                    : 'text-gray-700 hover:bg-blue-50'
                            }`}
                        >
                            İletişim
                        </Link>

                        {/* Dil Seçimi */}
                        <div className="relative group">
                            <button className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-blue-50">
                                🌐 TR
                            </button>
                            <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                <div className="py-1">
                                    {languages.map((lang) => (
                                        <button
                                            key={lang.code}
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                                        >
                                            {lang.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Profil Dropdown */}
                        <div className="relative">
                            <button 
                                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-blue-50"
                            >
                              {/*  <img 
                                    src="/profile-placeholder.png" 
                                    alt="Profile" 
                                    className="h-8 w-8 rounded-full"
                                />*/}
                                <span className="ml-2">Hesabım</span>
                            </button>
                            {isProfileDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                    <div className="py-1">
                                        <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50">Profilim</Link>
                                        <Link to="/reservations" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50">Rezervasyonlarım</Link>
                                        <Link to="/favorites" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50">Favorilerim</Link>
                                        <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">Çıkış Yap</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
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

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-50">
                            Ana Sayfa
                        </Link>
                        <Link to="/hotels" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-50">
                            Oteller
                        </Link>
                        <Link to="/tours" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-50">
                            Turlar
                        </Link>
                        <Link to="/touristic-places" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-50">
                            Turistik Yerler
                        </Link>
                        <Link to="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-50">
                            İletişim
                        </Link>
                        <Link to="/profile" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-50">
                            Profilim
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar; 