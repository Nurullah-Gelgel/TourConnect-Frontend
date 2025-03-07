import React, { useState } from 'react';

const FAQ = () => {
    const faqs = [
        {
            question: "Rezervasyon nasıl yapabilirim?",
            answer: "Otel veya tur sayfasından istediğiniz tarihleri seçerek rezervasyon yapabilirsiniz."
        },
        {
            question: "Rezervasyon iptal politikası nedir?",
            answer: "Rezervasyonunuzu 24 saat öncesine kadar ücretsiz iptal edebilirsiniz."
        },
        {
            question: "Ödeme seçenekleri nelerdir?",
            answer: "Kredi kartı ve banka havalesi ile ödeme yapabilirsiniz."
        },
        // Daha fazla SSS eklenebilir
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