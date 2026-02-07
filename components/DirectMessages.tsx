import React, { useState, useEffect, useRef } from 'react';
import { User } from '../types';
import { ArrowLeft, Search, Phone, Video, Info, Send, Camera, Mic, Image as ImageIcon } from 'lucide-react';
import { MOCK_USERS } from '../constants';

interface DirectMessagesProps {
  currentUser: User;
  initialTargetUser: User | null;
  onBack: () => void;
}

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
}

const DirectMessages: React.FC<DirectMessagesProps> = ({ currentUser, initialTargetUser, onBack }) => {
  const [activeUser, setActiveUser] = useState<User | null>(initialTargetUser);
  const [inputText, setInputText] = useState('');
  
  // Mock conversation history state
  // In a real app, this would come from a backend
  const [history, setHistory] = useState<Record<string, Message[]>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize some mock messages
  useEffect(() => {
    const initialHistory: Record<string, Message[]> = {};
    MOCK_USERS.forEach(user => {
      // Don't create history for self
      if (user.id === currentUser.id) return;

      initialHistory[user.id] = [
        {
          id: `msg-${user.id}-1`,
          senderId: user.id,
          text: `Yo ${currentUser.username}, check out this new strain I found! 🔥`,
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24) // 1 day ago
        },
        {
          id: `msg-${user.id}-2`,
          senderId: currentUser.id,
          text: "That looks fire! What's the terp profile like?",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2) // 2 hours ago
        }
      ];
    });
    setHistory(initialHistory);
  }, [currentUser]);

  // Scroll to bottom when opening chat or sending message
  useEffect(() => {
    if (activeUser) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeUser, history]);

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputText.trim() || !activeUser) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: currentUser.id,
      text: inputText,
      timestamp: new Date()
    };

    setHistory(prev => {
        const userHistory = prev[activeUser.id] || [];
        return {
            ...prev,
            [activeUser.id]: [...userHistory, newMessage]
        };
    });
    setInputText('');

    // Simulate reply
    setTimeout(() => {
      const reply: Message = {
        id: (Date.now() + 1).toString(),
        senderId: activeUser.id,
        text: "Bet. Pull up later? 💨",
        timestamp: new Date()
      };
      setHistory(prev => {
          const userHistory = prev[activeUser.id] || [];
          return {
              ...prev,
              [activeUser.id]: [...userHistory, reply]
          };
      });
    }, 2000);
  };

  const handleBack = () => {
      if (activeUser) {
          // If in chat, go back to list
          setActiveUser(null);
      } else {
          // If in list, go back to previous screen (App)
          onBack();
      }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // --- Render User List ---
  if (!activeUser) {
    return (
      <div className="flex flex-col h-screen bg-black text-white pb-6 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center px-4 py-3 border-b border-zinc-900 bg-black/95 backdrop-blur">
          <ArrowLeft size={24} className="cursor-pointer mr-4" onClick={onBack} />
          <h1 className="text-xl font-bold flex-1">Messages</h1>
          <Camera size={24} className="cursor-pointer hover:text-emerald-400" />
        </div>

        {/* Search */}
        <div className="p-4">
          <div className="bg-zinc-900 rounded-xl flex items-center px-3 py-2">
            <Search size={18} className="text-zinc-500 mr-2" />
            <input 
              type="text" 
              placeholder="Search" 
              className="bg-transparent border-none outline-none text-white w-full placeholder-zinc-500"
            />
          </div>
        </div>

        {/* Messages List */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-4 pb-2 flex justify-between items-center">
             <h2 className="font-bold text-md">Messages</h2>
             <span className="text-emerald-500 text-sm font-semibold cursor-pointer">Requests</span>
          </div>
          {MOCK_USERS.filter(u => u.id !== currentUser.id).map(user => {
            const userMessages = history[user.id] || [];
            const lastMessage = userMessages[userMessages.length - 1];
            
            return (
              <div 
                key={user.id} 
                className="flex items-center px-4 py-3 hover:bg-zinc-900/50 cursor-pointer active:bg-zinc-900 transition-colors"
                onClick={() => setActiveUser(user)}
              >
                <div className="relative">
                  <img src={user.avatar} className="w-14 h-14 rounded-full object-cover border border-zinc-800" alt={user.username} />
                  {user.isVerified && <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-black rounded-full"></div>}
                </div>
                <div className="ml-3 flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-semibold text-white truncate text-sm">
                      {user.username}
                      {user.isVerified && <span className="text-emerald-400 ml-1 text-xs">✔</span>}
                    </h3>
                    {lastMessage && (
                      <span className="text-xs text-zinc-500 whitespace-nowrap ml-2">
                        {formatTime(lastMessage.timestamp)}
                      </span>
                    )}
                  </div>
                  <p className={`text-sm truncate mt-0.5 ${lastMessage?.senderId !== currentUser.id && lastMessage ? 'text-white font-medium' : 'text-zinc-500'}`}>
                    {lastMessage?.senderId === currentUser.id ? `You: ${lastMessage.text}` : lastMessage?.text || "Start a conversation"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // --- Render Active Chat ---
  const currentMessages = history[activeUser.id] || [];

  return (
    <div className="flex flex-col h-screen bg-black text-white pb-6 animate-in slide-in-from-right duration-300">
        {/* Chat Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-900 bg-black/95 backdrop-blur z-10 sticky top-0">
            <div className="flex items-center gap-3">
                <ArrowLeft size={24} className="cursor-pointer" onClick={handleBack} />
                <div className="flex items-center gap-2 cursor-pointer">
                    <img src={activeUser.avatar} className="w-8 h-8 rounded-full border border-zinc-800" alt={activeUser.username} />
                    <div className="flex flex-col">
                        <span className="font-bold text-sm flex items-center">
                            {activeUser.username}
                            {activeUser.isVerified && <span className="text-emerald-400 ml-1 text-xs">✔</span>}
                        </span>
                        <span className="text-xs text-zinc-500">Active now</span>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-4 text-white">
                <Phone size={24} className="cursor-pointer hover:text-emerald-400" />
                <Video size={24} className="cursor-pointer hover:text-emerald-400" />
                <Info size={24} className="cursor-pointer hover:text-emerald-400" />
            </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black">
             {/* Timestamp separator example */}
             <div className="flex justify-center my-4">
                <span className="text-xs text-zinc-500">Today</span>
             </div>

             {currentMessages.map((msg) => {
                 const isMe = msg.senderId === currentUser.id;
                 return (
                     <div key={msg.id} className={`flex w-full ${isMe ? 'justify-end' : 'justify-start'}`}>
                         <div className={`flex max-w-[70%] items-end gap-2 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                            {!isMe && (
                                <img src={activeUser.avatar} className="w-6 h-6 rounded-full self-end mb-1" alt={activeUser.username} />
                            )}
                            <div
                                className={`px-4 py-2 rounded-2xl text-sm break-words ${
                                isMe
                                    ? 'bg-emerald-600 text-white rounded-br-sm'
                                    : 'bg-zinc-800 text-white rounded-bl-sm'
                                }`}
                            >
                                {msg.text}
                            </div>
                         </div>
                     </div>
                 );
             })}
             <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-3 bg-black border-t border-zinc-900 flex items-center gap-3">
            <div className="bg-zinc-900 p-2 rounded-full cursor-pointer text-emerald-500">
                <Camera size={20} />
            </div>
            <div className="flex-1 bg-zinc-900 rounded-full flex items-center px-4 py-2 border border-zinc-800 focus-within:border-emerald-500 transition-colors">
                <input 
                    type="text" 
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Message..."
                    className="flex-1 bg-transparent outline-none text-white text-sm"
                />
                <div className="flex items-center gap-2 text-white">
                     {inputText.length > 0 ? (
                         <span onClick={handleSendMessage} className="text-emerald-500 font-bold text-sm cursor-pointer">Send</span>
                     ) : (
                         <>
                            <Mic size={20} className="cursor-pointer hover:text-zinc-300" />
                            <ImageIcon size={20} className="cursor-pointer hover:text-zinc-300" />
                         </>
                     )}
                </div>
            </div>
        </div>
    </div>
  );
};

export default DirectMessages;