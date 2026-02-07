import React from 'react';
import { MOCK_STORIES } from '../constants';
import { Plus } from 'lucide-react';
import { User, Story } from '../types';

interface StoriesProps {
  currentUser: User;
  onViewStory: (story: Story) => void;
}

const Stories: React.FC<StoriesProps> = ({ currentUser, onViewStory }) => {
  return (
    <div className="w-full overflow-x-auto no-scrollbar py-4 border-b border-zinc-900 bg-black">
      <div className="flex space-x-4 px-4">
        {/* User's Add Story Bubble */}
        <div className="flex flex-col items-center space-y-1 flex-shrink-0 cursor-pointer group">
          <div className="relative w-16 h-16">
            <img 
              src={currentUser.avatar} 
              alt="My Story" 
              className="w-full h-full rounded-full border-2 border-zinc-800 p-0.5 object-cover opacity-80 group-hover:opacity-100 transition-opacity" 
            />
            <div className="absolute bottom-0 right-0 bg-emerald-500 rounded-full p-1 border-2 border-black text-white group-hover:bg-emerald-400 transition-colors">
              <Plus size={12} strokeWidth={4} />
            </div>
          </div>
          <span className="text-xs text-zinc-400 truncate w-16 text-center group-hover:text-zinc-200">Your Story</span>
        </div>

        {/* Other Users' Stories */}
        {MOCK_STORIES.map((story) => (
          <div 
            key={story.id} 
            className="flex flex-col items-center space-y-1 flex-shrink-0 cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => onViewStory(story)}
          >
            <div className={`w-16 h-16 rounded-full p-[2px] ${story.isViewed ? 'bg-zinc-700' : 'bg-gradient-to-tr from-emerald-400 to-green-600'}`}>
              <img 
                src={story.user.avatar} 
                alt={story.user.username} 
                className="w-full h-full rounded-full border-2 border-black object-cover" 
              />
            </div>
            <span className="text-xs text-white truncate w-16 text-center">{story.user.username}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stories;