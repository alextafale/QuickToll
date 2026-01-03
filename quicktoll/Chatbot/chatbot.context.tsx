import React, { createContext, useContext, useState } from 'react';
import { ChatMessage } from './Types/chatbot.types';
import { sendMessageToGemini } from './gemini.service';

interface ChatbotContextType {
  messages: ChatMessage[];
  sendMessage: (text: string) => Promise<void>;
}

const ChatbotContext = createContext<ChatbotContextType>(null as any);

export const ChatbotProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const sendMessage = async (text: string) => {
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text,
    };

    setMessages(prev => [...prev, userMsg]);

    const reply = await sendMessageToGemini(text);

    const botMsg: ChatMessage = {
      id: Date.now().toString() + '-bot',
      role: 'bot',
      text: reply,
    };

    setMessages(prev => [...prev, botMsg]);
  };

  return (
    <ChatbotContext.Provider value={{ messages, sendMessage }}>
      {children}
    </ChatbotContext.Provider>
  );
};

export const useChatbot = () => useContext(ChatbotContext);
