import React, { useState } from 'react';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Leaf, Camera, Music2, MapPin, Globe, Gift } from 'lucide-react';
import { MOCK_POSTS } from '../constants';
import Stories from './Stories';
import { ViewState, User, Story } from '../types';

interface FeedProps {
  setView: (view: ViewState) => void;
  onUserClick: (user: User) => void;
  currentUser: User;
  onViewStory: (story: Story) => void;
}

const Feed: React.FC<FeedProps> = ({ setView, onUserClick, currentUser, onViewStory }) => {
  const [activeTab, setActiveTab] = useState<'foryou' | 'following'>('foryou');
  const [giftedPosts, setGiftedPosts] = useState<Record<string, boolean>>({});

  // Simple filter logic for demo purposes
  // "Following" shows only a subset, "For You" shows everything including international content
  const displayPosts = activeTab === 'foryou' 
    ? MOCK_POSTS 
    : MOCK_POSTS.filter((_, i) => i % 2 === 0); // Mock filter

  const handleGift = (postId: string) => {
      // Simulate gifting
      setGiftedPosts(prev => ({ ...prev, [postId]: true }));
      // In real app, this would deduct balance
  };

  return (
    <div className="flex flex-col pb-20 bg-black min-h-screen">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-black/95 backdrop-blur-md border-b border-zinc-900">
            <div className="flex justify-between items-center px-4 py-3">
                <div className="flex items-center gap-3">
                    <Camera 
                    size={26} 
                    className="text-white hover:text-emerald-400 cursor-pointer transition-transform active:scale-95" 
                    onClick={() => setView(ViewState.CREATE)}
                    />
                    <div className="flex items-center gap-2">
                        <Leaf className="text-emerald-500" />
                        <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-green-600 bg-clip-text text-transparent font-tracking-tighter hidden sm:block">
                            Phenogram
                        </h1>
                    </div>
                </div>
                <div className="flex space-x-4">
                    <Heart size={24} className="text-white hover:text-emerald-400 cursor-pointer" />
                    <Send 
                        size={24} 
                        className="text-white hover:text-emerald-400 cursor-pointer -rotate-45" 
                        onClick={() => setView(ViewState.MESSAGES)}
                    />
                </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center text-sm font-semibold border-t border-zinc-900">
                <div 
                    onClick={() => setActiveTab('foryou')}
                    className={`flex-1 text-center py-3 cursor-pointer transition-colors ${activeTab === 'foryou' ? 'text-white border-b-2 border-emerald-500' : 'text-zinc-500 hover:text-zinc-300'}`}
                >
                    <span className="flex items-center justify-center gap-2">
                        For You <Globe size={14} />
                    </span>
                </div>
                <div 
                    onClick={() => setActiveTab('following')}
                    className={`flex-1 text-center py-3 cursor-pointer transition-colors ${activeTab === 'following' ? 'text-white border-b-2 border-emerald-500' : 'text-zinc-500 hover:text-zinc-300'}`}
                >
                    Following
                </div>
            </div>
        </div>

      {activeTab === 'following' && <Stories currentUser={currentUser} onViewStory={onViewStory} />}

      <div className="flex flex-col space-y-2 mt-2">
        {displayPosts.map((post) => (
          <div key={post.id} className="flex flex-col bg-zinc-950 pb-4 border-b border-zinc-900">
            {/* Post Header */}
            <div className="flex items-center justify-between p-3">
              <div className="flex flex-col">
                  <div 
                    className="flex items-center space-x-2 cursor-pointer group"
                    onClick={() => onUserClick(post.user)}
                  >
                    <img src={post.user.avatar} alt={post.user.username} className="w-8 h-8 rounded-full object-cover border border-transparent group-hover:border-emerald-500 transition-colors" />
                    <span className="font-semibold text-sm text-white flex items-center group-hover:text-emerald-400 transition-colors">
                        {post.user.username}
                        {post.user.isVerified && <span className="ml-1 text-emerald-400 text-xs">✔</span>}
                    </span>
                  </div>
                  <div className="flex flex-col ml-10 mt-0.5 space-y-0.5">
                     {post.location && (
                          <div className="flex items-center gap-1 text-xs text-white/80">
                              <MapPin size={10} />
                              <span>{post.location}</span>
                          </div>
                      )}
                      {post.song && (
                          <div className="flex items-center gap-1 text-xs text-zinc-400">
                              <Music2 size={10} />
                              <span>{post.song.title} • {post.song.artist}</span>
                          </div>
                      )}
                  </div>
              </div>
              <MoreHorizontal className="text-zinc-500 cursor-pointer" />
            </div>

            {/* Post Image */}
            <div className="w-full aspect-square bg-zinc-900 relative">
              <img src={post.imageUrl} alt="Post content" className="w-full h-full object-cover" loading="lazy" />
            </div>

            {/* Post Actions */}
            <div className="flex justify-between items-center px-3 pt-3 pb-2">
              <div className="flex space-x-4 items-center">
                <Heart 
                  size={26} 
                  className={`cursor-pointer transition-colors ${post.isLiked ? 'text-emerald-500 fill-emerald-500' : 'text-white hover:text-emerald-500'}`} 
                />
                <MessageCircle size={26} className="text-white hover:text-emerald-500 cursor-pointer" />
                <Send size={26} className="text-white hover:text-emerald-500 cursor-pointer -rotate-45" />
              </div>
              <div className="flex space-x-4 items-center">
                  <Gift 
                      size={24} 
                      className={`cursor-pointer transition-all active:scale-90 ${giftedPosts[post.id] ? 'text-pink-500 fill-pink-500' : 'text-white hover:text-pink-500'}`}
                      onClick={() => handleGift(post.id)}
                  />
                  <Bookmark size={26} className="text-white hover:text-emerald-500 cursor-pointer" />
              </div>
            </div>

            {/* Post Likes */}
            <div className="px-3">
              <span className="font-bold text-sm">{post.likes.toLocaleString()} likes</span>
            </div>

            {/* Post Caption */}
            <div className="px-3 pt-1">
              <p className="text-sm">
                <span 
                    className="font-bold mr-2 cursor-pointer hover:text-emerald-400"
                    onClick={() => onUserClick(post.user)}
                >
                    {post.user.username}
                </span>
                {post.caption}
              </p>
            </div>

            {/* Comments & Time */}
            <div className="px-3 pt-1">
              <p className="text-zinc-500 text-sm cursor-pointer">View all {post.comments} comments</p>
              <p className="text-zinc-600 text-xs mt-1 uppercase">{post.timestamp}</p>
            </div>
          </div>
        ))}
        
        {/* End of Feed Global Message */}
        <div className="py-8 text-center text-zinc-500">
            <Globe className="mx-auto mb-2 opacity-50" />
            <p className="text-sm">You're all caught up on global vibes.</p>
        </div>
      </div>
    </div>
  );
};

export default Feed;