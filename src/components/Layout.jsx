import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-cyan-50 to-blue-50">
            <div className="sticky top-0 z-50 shadow-md bg-white/95 backdrop-blur-sm">
                <Navbar />
            </div>
            <main className="flex-grow">
                {children}
            </main>
            <div className="shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
                <Footer />
            </div>
        </div>
    );
};

export default Layout;