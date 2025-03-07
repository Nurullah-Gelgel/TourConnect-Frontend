import React, { useState } from 'react';
import Footer from '../components/Footer';
import ChatBot from '../components/support/ChatBot';
import FAQ from '../components/support/FAQ';
import ContactForm from '../components/support/ContactForm';
import ContactInfo from '../components/support/ContactInfo';
import Layout from '../components/Layout';
const SupportPage = () => {
    const [activeTab, setActiveTab] = useState('chat');


    return (
        <Layout>
        <div className="bg-gray-100 min-h-screen">
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-6">Destek ve İletişim</h1>

                {/* Tab Menüsü */}
                <div className="bg-white rounded-lg shadow-md mb-6">
                    <div className="flex border-b">
                        <button
                            className={`px-6 py-3 ${activeTab === 'chat' ? 'border-b-2 border-blue-500 text-blue-500' : ''}`}
                            onClick={() => setActiveTab('chat')}
                        >
                            Canlı Destek
                        </button>
                        <button
                            className={`px-6 py-3 ${activeTab === 'faq' ? 'border-b-2 border-blue-500 text-blue-500' : ''}`}
                            onClick={() => setActiveTab('faq')}
                        >
                            Sıkça Sorulan Sorular
                        </button>
                        <button
                            className={`px-6 py-3 ${activeTab === 'contact' ? 'border-b-2 border-blue-500 text-blue-500' : ''}`}
                            onClick={() => setActiveTab('contact')}
                        >
                            İletişim Formu
                        </button>
                    </div>

                    {/* Tab İçerikleri */}
                    <div className="p-6">
                        {activeTab === 'chat' && <ChatBot />}
                        {activeTab === 'faq' && <FAQ />}
                        {activeTab === 'contact' && <ContactForm />}
                    </div>
                </div>

                {/* İletişim Bilgileri */}
                <ContactInfo />
            </div>
            
        </div>
        </Layout>
    );
};

export default SupportPage; 