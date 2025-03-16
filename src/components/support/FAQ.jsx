import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const FAQ = () => {
    const { t } = useTranslation();
    const faqs = [
        {
            question: t('support.faq.reservation.question'),
            answer: t('support.faq.reservation.answer')
        },
        {
            question: t('support.faq.cancellation.question'),
            answer: t('support.faq.cancellation.answer')
        },
        {
            question: t('support.faq.payment.question'),
            answer: t('support.faq.payment.answer')
        }
    ];

    const [openIndex, setOpenIndex] = useState(null);

    return (
        <div className="space-y-4">
            {faqs.map((faq, index) => (
                <div key={index} className="border rounded">
                    <button
                        className="w-full p-4 text-left font-semibold flex justify-between items-center"
                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    >
                        {faq.question}
                        <span>{openIndex === index ? '−' : '+'}</span>
                    </button>
                    {openIndex === index && (
                        <div className="p-4 bg-gray-50">
                            {faq.answer}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default FAQ; 