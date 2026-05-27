import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Globe, MessageSquare, Cpu } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AISolarAssistant() {
  const [input, setInput] = useState('');
  const [chatLang, setChatLang] = useState('EN');
  const messagesEndRef = useRef(null);

  const [chatMessages, setChatMessages] = useState([
    { text: "Hello! I am SolarKart AI. How can I help you today?", sender: "bot", time: "10:00 AM" }
  ]);

  const handleSend = () => {
    if (!input.trim()) return;
    const text = input;
    setInput('');
    
    const newMessage = { text, sender: 'user', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setChatMessages(prev => [...prev, newMessage]);
    
    // Simulate AI response
    setTimeout(() => {
      setChatMessages(prev => [...prev, {
        text: chatLang === 'EN' 
          ? "I am analyzing your request. Since I am a mock assistant, I cannot provide real data, but your solar system is running perfectly!"
          : "मैं आपके अनुरोध का विश्लेषण कर रहा हूँ। चूँकि मैं एक मॉक असिस्टेंट हूँ, मैं वास्तविक डेटा नहीं दे सकता, लेकिन आपका सोलर सिस्टम पूरी तरह से काम कर रहा है!",
        sender: 'bot',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 1000);
  };

  const handleSuggestClick = (q) => {
    setInput(q);
  };

  const handleMicClick = () => {
    toast.success('Voice typing requires browser audio permissions. Microphone listening simulated.');
    setInput(chatLang === 'EN' ? 'Check panel cleaning schedule' : 'पैनल सफाई कार्यक्रम की जांच करें');
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const suggestQs = chatLang === 'EN' ? [
    'My generation is low',
    'When should I clean my panel?',
    'How much money did I save?',
    'When is my next maintenance?',
    'What is inverter fault 402?'
  ] : [
    'उत्पादन कम है',
    'पैनल कब साफ करना चाहिए?',
    'बचत की जांच करें',
    'अगला रखरखाव कब है?',
    'इन्वर्टर त्रुटि कोड 402 क्या है?'
  ];

  return (
    <div className="p-0 sm:p-2 md:p-6 space-y-2 md:space-y-6 flex flex-col h-full min-h-0">
      <div className="flex flex-col h-full bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        
        {/* Chat header */}
        <div className="bg-indigo-900 text-white p-3 md:p-4 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-800 flex items-center justify-center border border-indigo-700 shadow-inner">
              <Cpu size={20} className="text-indigo-300" />
            </div>
            <div>
              <h4 className="text-sm md:text-base font-bold m-0">SolarKart AI Assistant</h4>
              <span className="text-[10px] md:text-xs text-indigo-300 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-400"></span> Active Response Agent
              </span>
            </div>
          </div>
          
          {/* Lang switch */}
          <button
            className="flex items-center gap-2 px-3 py-1.5 text-xs md:text-sm font-semibold bg-white/10 hover:bg-white/20 transition-colors rounded-lg border border-white/10"
            onClick={() => setChatLang(prev => prev === 'EN' ? 'HI' : 'EN')}
          >
            <Globe size={14} />
            {chatLang === 'EN' ? '🇬🇧 English' : '🇮🇳 हिंदी'}
          </button>
        </div>

        {/* Messages area */}
        <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4 bg-slate-50">
          {chatMessages.map((msg, index) => (
            <div
              key={index}
              className={`flex flex-col gap-1 max-w-[85%] md:max-w-[70%] ${msg.sender === 'user' ? 'self-end' : 'self-start'}`}
            >
              <div 
                className={`p-3 md:p-4 text-sm shadow-sm ${
                  msg.sender === 'user' 
                    ? 'bg-indigo-600 text-white rounded-2xl rounded-tr-sm' 
                    : 'bg-white text-gray-800 border border-gray-200 rounded-2xl rounded-tl-sm'
                }`}
              >
                {msg.text}
              </div>
              <span className={`text-[10px] text-gray-500 px-1 ${msg.sender === 'user' ? 'self-end' : 'self-start'}`}>
                {msg.time}
              </span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestions tags */}
        <div className="p-3 bg-white border-t border-gray-100 flex gap-2 overflow-x-auto scrollbar-none shrink-0">
          {suggestQs.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSuggestClick(q)}
              className="px-4 py-2 bg-indigo-50 border border-indigo-100 hover:bg-indigo-100 hover:border-indigo-200 transition-colors rounded-full text-xs font-bold text-indigo-700 whitespace-nowrap shrink-0"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Inputs controls */}
        <div className="p-3 bg-white border-t border-gray-200 flex gap-2 md:gap-3 items-center shrink-0">
          <button
            onClick={handleMicClick}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors shrink-0"
            title="Voice Command"
          >
            <Mic size={20} />
          </button>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={chatLang === 'EN' ? 'Ask AI about solar systems...' : 'सौर प्रणालियों के बारे में पूछें...'}
            className="flex-1 h-10 md:h-12 rounded-full border border-gray-300 bg-gray-50 px-4 md:px-6 text-sm outline-none focus:border-indigo-500 focus:bg-white transition-all shadow-inner"
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />

          <button
            onClick={handleSend}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center transition-all active:scale-95 shadow-md shadow-indigo-200 shrink-0"
            title="Send"
          >
            <Send size={18} className="ml-1" />
          </button>
        </div>

        {/* Business Whatsapp helper */}
        <div className="bg-emerald-50 p-2 text-center text-[10px] md:text-xs text-emerald-800 flex items-center justify-center gap-2 border-t border-emerald-100 shrink-0">
          <MessageSquare size={14} />
          <span>Need a human agent?</span>
          <a
            href="https://wa.me/919988776655"
            target="_blank"
            rel="noreferrer"
            className="font-bold text-emerald-700 hover:text-emerald-900 hover:underline"
          >
            Contact Whatsapp Support
          </a>
        </div>
      </div>
    </div>
  );
}
