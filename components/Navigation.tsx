import React from 'react';
import { Home, Search, PlusSquare, MessageCircle, User, Clapperboard, Glasses } from 'lucide-react';
import { ViewState } from '../types';

interface NavigationProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, setView }) => {
  const navItems = [
    { view: ViewState.FEED, icon: <Home size={24} />, label: 'Home' },
    { view: ViewState.REELS, icon: <Clapperboard size={24} />, label: 'Reels' },
    { view: ViewState.METAVERSE, icon: <Glasses size={28} />, label: 'Metaverse' },
    { view: ViewState.CREATE, icon: <PlusSquare size={26} />, label: 'Post' },
    { view: ViewState.CHAT, icon: <MessageCircle size={24} />, label: 'BudBot' },
    { view: ViewState.PROFILE, icon: <User size={24} />, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 w-full bg-black/95 backdrop-blur-md border-t border-emerald-900/50 pb-6 z-50">
      <div className="flex justify-around items-center h-16 px-1">
        {navItems.map((item) => (
          <button
            key={item.view}
            onClick={() => setView(item.view)}
            className={`flex flex-col items-center justify-center w-full h-full transition-all duration-200 active:scale-95 ${
              currentView === item.view 
                ? 'text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]' 
                : 'text-zinc-500 hover:text-emerald-200'
            }`}
          >
            {item.icon}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;