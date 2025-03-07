import React, { useState } from 'react';

const ChatBot = () => {
    const [messages, setMessages] = useState([
        { id: 1, text: "Merhaba! Size nasıl yardımcı olabilirim?", isBot: true }
    ]);
    const [newMessage, setNewMessage] = useState('');

    const handleSend = (e) => {
        e.preventDefault();
        if (newMessage.trim()) {
            setMessages([...messages, { id: Date.now(), text: newMessage, isBot: false }]);
            setNewMessage('');
            // Bot yanıtı simülasyonu
            setTimeout(() => {
                setMessages(prev => [...prev, {
                    id: Date.now(),
                    text: "Mesajınız alındı. En kısa sürede size yardımcı olacağız.",
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
                    placeholder="Mesajınızı yazın..."
                    className="flex-1 p-2 border rounded"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Gönder
                </button>
            </form>
        </div>
    );
};

export default ChatBot; 