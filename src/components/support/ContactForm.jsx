import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const ContactForm = () => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Form gönderme işlemi burada yapılacak
        console.log('Form data:', formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-gray-700 mb-2">{t('support.contact.form.fullName')}</label>
                <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>
            <div>
                <label className="block text-gray-700 mb-2">{t('support.contact.form.email')}</label>
                <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>
            <div>
                <label className="block text-gray-700 mb-2">{t('support.contact.form.subject')}</label>
                <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>
            <div>
                <label className="block text-gray-700 mb-2">{t('support.contact.form.message')}</label>
                <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full p-2 border rounded h-32"
                    required
                />
            </div>
            <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
            >
                {t('support.contact.form.send')}
            </button>
        </form>
    );
};

export default ContactForm; 