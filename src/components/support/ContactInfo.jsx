import React from 'react';

const ContactInfo = () => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">İletişim Bilgileri</h2>
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <h3 className="font-semibold mb-2">Adres</h3>
                    <p>Van Merkez, Cumhuriyet Caddesi No:123</p>
                    <p>65100 Van/Türkiye</p>
                </div>
                <div>
                    <h3 className="font-semibold mb-2">İletişim</h3>
                    <p>Telefon: +90 (432) 123 45 67</p>
                    <p>E-posta: info@vantur.com</p>
                </div>
                <div>
                    <h3 className="font-semibold mb-2">Çalışma Saatleri</h3>
                    <p>Pazartesi - Cuma: 09:00 - 18:00</p>
                    <p>Cumartesi: 09:00 - 13:00</p>
                </div>
                <div>
                    <h3 className="font-semibold mb-2">Sosyal Medya</h3>
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