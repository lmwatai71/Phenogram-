import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Music2, Camera, Gift } from 'lucide-react';
import { MOCK_REELS } from '../constants';
import { ViewState, User } from '../types';

interface ReelsProps {
  setView: (view: ViewState) => void;
  onUserClick: (user: User) => void;
}

const Reels: React.FC<ReelsProps> = ({ setView, onUserClick }) => {
  const [giftedReels, setGiftedReels] = useState<Record<string, boolean>>({});

  const handleGift = (reelId: string) => {
      setGiftedReels(prev => ({ ...prev, [reelId]: true }));
  };

  return (
    <div className="h-screen w-full bg-black overflow-y-scroll snap-y snap-mandatory no-scrollbar pb-16">
        <div className="fixed top-4 left-4 z-20">
             <h2 className="text-xl font-bold drop-shadow-md text-white">Reels</h2>
        </div>
        <div className="fixed top-4 right-4 z-20">
             <Camera 
                className="text-white drop-shadow-md cursor-pointer transition-transform active:scale-95" 
                size={28} 
                onClick={() => setView(ViewState.CREATE)}
             />
        </div>

      {MOCK_REELS.map((reel) => (
        <div key={reel.id} className="relative w-full h-screen snap-start shrink-0">
          {/* Simulate Video with Image + Overlay */}
          <div className="absolute inset-0 bg-zinc-900">
             <img src={reel.imageUrl} alt="Reel" className="w-full h-full object-cover opacity-80" />
             <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80" />
          </div>
          
          {/* Overlay UI */}
          <div className="absolute bottom-20 left-0 w-full p-4 flex justify-between items-end">
            
            {/* Left Content (User info, caption) */}
            <div className="flex-1 mr-12 space-y-3">
              <div className="flex items-center space-x-2">
                <div 
                    className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => onUserClick(reel.user)}
                >
                    <img src={reel.user.avatar} alt={reel.user.username} className="w-10 h-10 rounded-full border border-white" />
                    <span className="font-bold text-white shadow-black drop-shadow-md">{reel.user.username}</span>
                </div>
                <button className="border border-white/50 text-white text-xs px-2 py-0.5 rounded backdrop-blur-sm">Follow</button>
              </div>
              <p className="text-white text-sm drop-shadow-md">{reel.caption}</p>
              
              {/* Music Ticker Simulation */}
              <div className="flex items-center text-white/90 text-sm space-x-2 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full w-max">
                <Music2 size={14} className="animate-spin-slow" />
                <div className="overflow-hidden w-32">
                    <span className="truncate block">
                        {reel.song ? `${reel.song.title} • ${reel.song.artist}` : `Original Audio - ${reel.user.username}`}
                    </span>
                </div>
              </div>
            </div>

            {/* Right Sidebar (Actions) */}
            <div className="flex flex-col items-center space-y-6">
              <div className="flex flex-col items-center space-y-1">
                <div className="p-2 bg-zinc-800/50 rounded-full backdrop-blur-sm hover:bg-zinc-700/50 transition cursor-pointer">
                    <Heart size={28} className={reel.isLiked ? 'text-emerald-500 fill-emerald-500' : 'text-white'} />
                </div>
                <span className="text-xs text-white font-medium shadow-black drop-shadow-md">{reel.likes > 1000 ? (reel.likes/1000).toFixed(1) + 'k' : reel.likes}</span>
              </div>

              <div className="flex flex-col items-center space-y-1">
                <div className="p-2 bg-zinc-800/50 rounded-full backdrop-blur-sm hover:bg-zinc-700/50 transition cursor-pointer">
                    <MessageCircle size={28} className="text-white" />
                </div>
                <span className="text-xs text-white font-medium shadow-black drop-shadow-md">{reel.comments}</span>
              </div>
              
              {/* Gift Action */}
              <div className="flex flex-col items-center space-y-1">
                <div 
                    className={`p-2 rounded-full backdrop-blur-sm transition cursor-pointer active:scale-95 ${giftedReels[reel.id] ? 'bg-pink-500/80 text-white' : 'bg-zinc-800/50 text-white hover:text-pink-400'}`}
                    onClick={() => handleGift(reel.id)}
                >
                    <Gift size={28} className={giftedReels[reel.id] ? 'fill-white' : ''} />
                </div>
                <span className="text-xs text-white font-medium shadow-black drop-shadow-md">Gift</span>
              </div>

              <div className="flex flex-col items-center space-y-1">
                 <div className="p-2 bg-zinc-800/50 rounded-full backdrop-blur-sm hover:bg-zinc-700/50 transition cursor-pointer">
                    <Share2 size={28} className="text-white" />
                 </div>
                <span className="text-xs text-white font-medium shadow-black drop-shadow-md">Share</span>
              </div>

              {/* Music Disc Animation */}
              <div className="mt-4 p-1 bg-zinc-800/80 rounded-full border border-zinc-600 animate-spin">
                 <img src={reel.song?.coverUrl || reel.user.avatar} className="w-8 h-8 rounded-full object-cover" alt="Music" />
              </div>

            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Reels;