import React from 'react';
import { User } from '../types';
import { Settings, ArrowLeft, MoreVertical, Grid, MapPin, Link as LinkIcon, Crown, ShieldCheck, DollarSign, Gift } from 'lucide-react';

interface ProfileProps {
  user: User;
  isCurrentUser: boolean;
  onBack?: () => void;
  onMessage?: () => void;
  onUpgrade?: () => void;
  onOpenEarnings?: () => void;
}

const Profile: React.FC<ProfileProps> = ({ user, isCurrentUser, onBack, onMessage, onUpgrade, onOpenEarnings }) => {
  // Deterministic "random" stats based on username length for consistency
  const postCount = user.username.length * 12 + 42;
  const followerCount = isCurrentUser ? "69k" : `${(user.username.length * 0.8).toFixed(1)}k`;
  const followingCount = user.username.length * 5 + 10;
  
  // Mock bio content
  const bio = isCurrentUser 
    ? "Connoisseur of fine herbs. 🌿\nOrganic grown only. California based. ☀️"
    : `Just here for the vibes and the terps. 💨\nCannabis Photographer | Grower\n${user.isVerified ? 'Certified Legend 🌟' : ''}`;

  return (
    <div className="min-h-screen bg-black text-white pb-24 animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-black/95 backdrop-blur-md border-b border-zinc-900 p-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          {onBack && (
            <button onClick={onBack} className="p-1 -ml-2 hover:bg-zinc-800 rounded-full transition-colors">
              <ArrowLeft size={24} />
            </button>
          )}
          <h1 className="text-lg font-bold flex items-center gap-1">
            {user.username}
            {user.isVerified && <span className="text-emerald-400 text-sm"><ShieldCheck size={16} className="fill-emerald-500/20" /></span>}
            {user.isPremium && !user.isVerified && <span className="text-amber-400 text-sm"><Crown size={16} className="fill-amber-500/20" /></span>}
          </h1>
        </div>
        {isCurrentUser ? (
          <Settings size={24} className="cursor-pointer hover:text-emerald-400 transition-colors" />
        ) : (
          <MoreVertical size={24} className="cursor-pointer hover:text-emerald-400 transition-colors" />
        )}
      </div>
      
      <div className="p-4 flex flex-col">
        {/* Top Section: Avatar & Stats */}
        <div className="flex items-center justify-between mb-6">
            <div className={`relative w-24 h-24 rounded-full p-[2px] ${user.isPremium ? 'bg-gradient-to-tr from-amber-300 via-yellow-500 to-amber-600' : (isCurrentUser || user.isVerified ? 'bg-gradient-to-tr from-emerald-400 to-green-600' : 'bg-zinc-800')}`}>
                <img 
                    src={user.avatar} 
                    className="w-full h-full rounded-full border-4 border-black object-cover" 
                    alt={user.username} 
                />
                {user.isPremium && (
                  <div className="absolute -bottom-1 -right-1 bg-amber-500 rounded-full p-1 border-4 border-black">
                     <Crown size={12} className="text-black fill-black" />
                  </div>
                )}
            </div>
            
            <div className="flex flex-1 justify-around ml-4">
                <div className="text-center cursor-pointer hover:opacity-80">
                    <div className="font-bold text-lg text-white">{postCount}</div>
                    <div className="text-xs text-zinc-400">Posts</div>
                </div>
                <div className="text-center cursor-pointer hover:opacity-80">
                    <div className="font-bold text-lg text-white">{followerCount}</div>
                    <div className="text-xs text-zinc-400">Followers</div>
                </div>
                <div className="text-center cursor-pointer hover:opacity-80">
                    <div className="font-bold text-lg text-white">{followingCount}</div>
                    <div className="text-xs text-zinc-400">Following</div>
                </div>
            </div>
        </div>

        {/* Bio Section */}
        <div className="mb-6">
            <h2 className="font-bold text-white text-lg flex items-center gap-2">
              {isCurrentUser ? 'Terp King' : user.username}
              {user.isPremium && <span className="bg-gradient-to-r from-amber-400 to-yellow-600 text-[10px] px-1.5 py-0.5 rounded text-black font-black tracking-tighter">PHENO+</span>}
              {user.isCreator && !user.isPremium && <span className="bg-zinc-800 text-zinc-300 text-[10px] px-1.5 py-0.5 rounded font-bold tracking-tight border border-zinc-700">CREATOR</span>}
            </h2>
            <p className="text-zinc-300 text-sm whitespace-pre-line mt-1 leading-relaxed">
                {bio}
            </p>
            {!isCurrentUser && (
                <div className="flex items-center gap-4 mt-2 text-sm text-emerald-500 font-medium">
                     <span className="flex items-center gap-1"><MapPin size={14} /> Los Angeles, CA</span>
                     <span className="flex items-center gap-1"><LinkIcon size={14} /> linktr.ee/pheno</span>
                </div>
            )}
        </div>

        {/* Creator Dashboard Button (Current User) */}
        {isCurrentUser && user.isCreator && onOpenEarnings && (
            <div className="mb-4">
                <button 
                    onClick={onOpenEarnings}
                    className="w-full bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-white py-3 rounded-xl flex items-center justify-between px-4 transition-all group"
                >
                    <div className="flex items-center gap-3">
                        <div className="bg-zinc-800 p-1.5 rounded-lg group-hover:bg-zinc-700 transition-colors">
                            <DollarSign size={20} className="text-emerald-400" />
                        </div>
                        <div className="text-left">
                            <p className="font-bold text-sm">Creator Dashboard</p>
                            <p className="text-zinc-500 text-xs">View earnings and insights</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="font-bold text-emerald-400">${user.balance?.toFixed(2) || '0.00'}</p>
                    </div>
                </button>
            </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 mb-8">
            {isCurrentUser ? (
                 <>
                   <button className="flex-1 bg-zinc-800 text-white font-semibold py-2 rounded-lg text-sm border border-zinc-700 hover:bg-zinc-700 transition-colors">
                      Edit Profile
                   </button>
                   {!user.isPremium && onUpgrade && (
                     <button 
                        onClick={onUpgrade}
                        className="flex-1 bg-gradient-to-r from-amber-500 to-yellow-600 text-black font-bold py-2 rounded-lg text-sm hover:brightness-110 transition-all flex items-center justify-center gap-1"
                      >
                        <Crown size={14} className="fill-black" /> Get Pheno+
                     </button>
                   )}
                 </>
            ) : (
                <>
                    <button className="flex-1 bg-emerald-600 text-white font-semibold py-2 rounded-lg text-sm hover:bg-emerald-500 transition-colors shadow-lg shadow-emerald-900/20">
                        Follow
                    </button>
                    <button 
                        onClick={onMessage}
                        className="flex-1 bg-zinc-800 text-white font-semibold py-2 rounded-lg text-sm border border-zinc-700 hover:bg-zinc-700 transition-colors"
                    >
                        Message
                    </button>
                    {user.isCreator && (
                        <button className="bg-zinc-800 text-pink-500 font-semibold px-4 rounded-lg text-sm border border-zinc-700 hover:bg-zinc-700 transition-colors flex items-center">
                            <Gift size={20} />
                        </button>
                    )}
                </>
            )}
             <button className="bg-zinc-800 p-2 rounded-lg border border-zinc-700 hover:bg-zinc-700 transition-colors">
                <div className="bg-zinc-400 w-5 h-5 rounded-sm flex items-center justify-center">
                    <div className="bg-zinc-800 w-2 h-2 rounded-full"></div>
                </div>
             </button>
        </div>
        
        {/* Tabs */}
        <div className="flex border-t border-zinc-800 mb-1">
            <div className="flex-1 flex justify-center py-3 border-b-2 border-emerald-500 text-emerald-500">
                <Grid size={24} />
            </div>
            <div className="flex-1 flex justify-center py-3 border-b-2 border-transparent text-zinc-600 hover:text-zinc-400 cursor-pointer">
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12h2"/><path d="M2 12h2"/><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>
            </div>
            <div className="flex-1 flex justify-center py-3 border-b-2 border-transparent text-zinc-600 hover:text-zinc-400 cursor-pointer">
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-3 gap-0.5 -mx-4">
            {[...Array(postCount > 15 ? 15 : postCount)].map((_, i) => (
                <div key={i} className="aspect-square bg-zinc-900 relative group cursor-pointer overflow-hidden">
                    <img 
                        src={`https://picsum.photos/id/${(user.id.charCodeAt(0) || 100) + i}/300/300`} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                        alt="Post" 
                        loading="lazy"
                    />
                    {i === 0 && (
                        <div className="absolute top-2 right-2 bg-emerald-500 rounded-full p-1 shadow-lg">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                        </div>
                    )}
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;