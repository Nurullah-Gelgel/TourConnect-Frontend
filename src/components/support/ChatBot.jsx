import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const ChatBot = () => {
    const { t } = useTranslation();
    const [messages, setMessages] = useState([
        { id: 1, text: t('support.chat.welcome'), isBot: true }
    ]);
    const [newMessage, setNewMessage] = useState('');

    const handleSend = (e) => {
        e.preventDefault();
        if (newMessage.trim()) {
            setMessages([...messages, { id: Date.now(), text: newMessage, isBot: false }]);
            setNewMessage('');
            setTimeout(() => {
                setMessages(prev => [...prev, {
                    id: Date.now(),
                    text: t('support.chat.autoReply'),
                    isBot: true
                }]);
            }, 1000);
        }
    };

    return (
        <div className="h-[500px] flex flex-col">
            <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                {messages.map(message => (
                    <div
                        key={message.id}
                        className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                    >
                        <div className={`max-w-[70%] p-3 rounded-lg ${
                            message.isBot ? 'bg-gray-100' : 'bg-blue-500 text-white'
                        }`}>
                            {message.text}
                        </div>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSend} className="flex gap-2">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder={t('support.chat.placeholder')}
                    className="flex-1 p-2 border rounded"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    {t('support.chat.send')}
                </button>
            </form>
        </div>
    );
};

export default ChatBot; 