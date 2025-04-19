import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaEnvelope, FaPhone } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-[#1a1f2d] text-white mt-auto py-3">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-12">
                    {/* Sol: Logo ve Telif Hakkı */}
                    <div className="flex items-center space-x-2">
                        <img 
                            src="/logo.png" 
                            alt="Van Tour Logo" 
                            className="w-8 h-8 object-contain"
                        />
                        <span className="text-sm text-gray-300">
                            © {new Date().getFullYear()} RahVan Tour    
                        </span>
                    </div>

                    {/* Orta: Hızlı Linkler */}
                    <div className="flex space-x-6 text-xs">
                        {/*<Link to="/about" className="text-gray-300 hover:text-[#00A9FF] transition-colors duration-200">
                            Hakkımızda
                        </Link>
                        <Link to="/privacy" className="text-gray-300 hover:text-[#00A9FF] transition-colors duration-200">
                            Gizlilik
                        </Link>
                        <Link to="/terms" className="text-gray-300 hover:text-[#00A9FF] transition-colors duration-200">
                            Kullanım Şartları
                        </Link>
                        <Link to="/hotels" className="text-gray-300 hover:text-[#00A9FF] transition-colors duration-200">
                            Oteller
                        </Link>
                        <Link to="/tours" className="text-gray-300 hover:text-[#00A9FF] transition-colors duration-200">
                            Turlar
                        </Link> */}
                    </div>

                    {/* Sağ: İletişim ve Sosyal Medya */}
                    <div className="flex items-center space-x-4">
                        {/* İletişim */}
                        <span className="flex items-center text-xs text-gray-300">
                            <FaEnvelope className="w-3 h-3 mr-1 text-[#00A9FF]" />
                            info@rahvantour.com
                        </span>
                        
                        {/* Sosyal Medya */}
                        <div className="flex items-center space-x-2">
                            {/*<a 
                                href="https://facebook.com" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="w-6 h-6 flex items-center justify-center rounded-full bg-[#2a3142] hover:bg-[#00A9FF] transition-colors duration-200"
                            >
                                <FaFacebookF className="w-3 h-3" />
                            </a>
                            <a 
                                href="https://twitter.com" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="w-6 h-6 flex items-center justify-center rounded-full bg-[#2a3142] hover:bg-[#00A9FF] transition-colors duration-200"
                            >
                                <FaTwitter className="w-3 h-3" />
                            </a>
                            <a 
                                href="https://instagram.com" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="w-6 h-6 flex items-center justify-center rounded-full bg-[#2a3142] hover:bg-[#00A9FF] transition-colors duration-200"
                            >
                                <FaInstagram className="w-3 h-3" />
                            </a>*/}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;