import React, { useEffect, useState } from 'react';
import { Story } from '../types';
import { X, Heart, Send, MoreHorizontal, Music2 } from 'lucide-react';

interface StoryViewerProps {
  story: Story;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

const StoryViewer: React.FC<StoryViewerProps> = ({ story, onClose, onNext, onPrev }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Reset progress when story changes
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          onNext(); // Auto advance
          return 100;
        }
        return prev + 1; // Updates every 30ms, reaches 100 in ~3s
      });
    }, 30);

    return () => clearInterval(interval);
  }, [story, onNext]);

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
            src={story.imageUrl} 
            alt="Story" 
            className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60"></div>
      </div>

      {/* Progress Bar */}
      <div className="relative z-10 pt-2 px-2 flex gap-1">
        <div className="h-0.5 bg-white/30 flex-1 rounded-full overflow-hidden">
             <div className="h-full bg-white transition-all ease-linear duration-30" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-3">
             <img src={story.user.avatar} className="w-8 h-8 rounded-full border border-white/50" alt={story.user.username} />
             <span className="font-bold text-white text-sm">{story.user.username}</span>
             <span className="text-white/60 text-xs">2h</span>
        </div>
        <div className="flex items-center gap-4">
             <MoreHorizontal className="text-white" size={24} />
             <X className="text-white cursor-pointer" size={28} onClick={onClose} />
        </div>
      </div>

      {/* Tap Areas for Navigation */}
      <div className="absolute inset-0 flex mt-20 mb-20 z-0">
          <div className="flex-1 h-full" onClick={onPrev}></div>
          <div className="flex-1 h-full" onClick={onNext}></div>
      </div>

      {/* Footer Content */}
      <div className="mt-auto relative z-10 p-4 pb-8 space-y-4">
         {story.song && (
             <div className="self-center flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full w-max mx-auto mb-4">
                 <Music2 size={14} className="text-white" />
                 <span className="text-white text-xs font-medium">{story.song.title} • {story.song.artist}</span>
             </div>
         )}

         <div className="flex items-center gap-4">
             <div className="flex-1 bg-transparent border border-white/50 rounded-full h-12 px-4 flex items-center">
                 <input 
                    type="text" 
                    placeholder={`Send message to ${story.user.username}...`}
                    className="bg-transparent text-white placeholder-white/70 outline-none w-full text-sm"
                 />
             </div>
             <Heart size={28} className="text-white" />
             <Send size={28} className="text-white -rotate-45" />
         </div>
      </div>
    </div>
  );
};

export default StoryViewer;