import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Footer from '../components/Footer';
import ChatBot from '../components/support/ChatBot';
import FAQ from '../components/support/FAQ';
import ContactForm from '../components/support/ContactForm';
import ContactInfo from '../components/support/ContactInfo';
import Layout from '../components/Layout';

const SupportPage = () => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState('chat');

    return (
        <Layout>
            <div className="bg-gray-100 min-h-screen">
                <div className="container mx-auto p-4">
                    <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">{t('support.title')}</h1>

                    {/* Tab Menüsü */}
                    <div className="bg-white rounded-lg shadow-md mb-4 sm:mb-6">
                        <div className="flex flex-col sm:flex-row border-b">
                            <button
                                className={`px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base ${
                                    activeTab === 'chat' 
                                    ? 'border-b-2 border-blue-500 text-blue-500' 
                                    : 'hover:bg-gray-50'
                                }`}
                                onClick={() => setActiveTab('chat')}
                            >
                                {t('support.tabs.liveSupport')}
                            </button>
                            <button
                                className={`px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base ${
                                    activeTab === 'faq' 
                                    ? 'border-b-2 border-blue-500 text-blue-500' 
                                    : 'hover:bg-gray-50'
                                }`}
                                onClick={() => setActiveTab('faq')}
                            >
                                {t('support.tabs.faq')}
                            </button>
                            <button
                                className={`px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base ${
                                    activeTab === 'contact' 
                                    ? 'border-b-2 border-blue-500 text-blue-500' 
                                    : 'hover:bg-gray-50'
                                }`}
                                onClick={() => setActiveTab('contact')}
                            >
                                {t('support.tabs.contactForm')}
                            </button>
                        </div>

                        {/* Tab İçerikleri */}
                        <div className="p-4 sm:p-6">
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