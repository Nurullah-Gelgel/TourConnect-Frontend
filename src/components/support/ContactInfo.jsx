import React from 'react';
import { useTranslation } from 'react-i18next';

const ContactInfo = () => {
    const { t } = useTranslation();

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">{t('support.contact.info.title')}</h2>
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <h3 className="font-semibold mb-2">{t('support.contact.info.address.title')}</h3>
                    <p>{t('support.contact.info.address.line1')}</p>
                    <p>{t('support.contact.info.address.line2')}</p>
                </div>
                <div>
                    <h3 className="font-semibold mb-2">{t('support.contact.info.contact.title')}</h3>
                    <p>{t('support.contact.info.contact.phone')}: +90 (432) 123 45 67</p>
                    <p>{t('support.contact.info.contact.email')}: info@vantur.com</p>
                </div>
                <div>
                    <h3 className="font-semibold mb-2">{t('support.contact.info.workingHours.title')}</h3>
                    <p>{t('support.contact.info.workingHours.weekdays')}</p>
                    <p>{t('support.contact.info.workingHours.saturday')}</p>
                </div>
                <div>
                    <h3 className="font-semibold mb-2">{t('support.contact.info.socialMedia.title')}</h3>
                    <div className="flex space-x-4">
                        <a href="#" className="text-blue-500 hover:text-blue-600">Facebook</a>
                        <a href="#" className="text-blue-500 hover:text-blue-600">Twitter</a>
                        <a href="#" className="text-blue-500 hover:text-blue-600">Instagram</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactInfo; 