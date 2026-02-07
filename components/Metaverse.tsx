import React, { useState, useEffect } from 'react';
import { Wifi, Mic, MicOff, Users, Box, Hexagon, Zap, Globe, ArrowRight, Lock, Crown } from 'lucide-react';
import { MOCK_USERS } from '../constants';
import { User } from '../types';

interface MetaverseProps {
    currentUser?: User;
    onUpgrade?: () => void;
}

const Metaverse: React.FC<MetaverseProps> = ({ currentUser, onUpgrade }) => {
  const [connectionState, setConnectionState] = useState<'idle' | 'connecting' | 'connected'>('idle');
  const [activeRoom, setActiveRoom] = useState<string | null>(null);
  const [micOn, setMicOn] = useState(false);
  const [rotation, setRotation] = useState(0);

  // Rotate the "3D" room view
  useEffect(() => {
    if (activeRoom) {
      const interval = setInterval(() => {
        setRotation(prev => (prev + 0.2) % 360);
      }, 50);
      return () => clearInterval(interval);
    }
  }, [activeRoom]);

  const handleConnect = () => {
    setConnectionState('connecting');
    setTimeout(() => {
      setConnectionState('connected');
    }, 2500);
  };

  const handleJoinRoom = (room: any) => {
    if (room.isLocked && !currentUser?.isPremium) {
        if (onUpgrade) onUpgrade();
        return;
    }
    setActiveRoom(room.name);
    setMicOn(true);
  };

  const rooms = [
    { id: '1', name: 'Sativa Sanctuary', users: 128, vibe: 'Energetic', isLocked: false },
    { id: '2', name: 'Indica Lounge', users: 420, vibe: 'Chill', isLocked: false },
    { id: '3', name: 'Growers Guild VR', users: 64, vibe: 'Educational', isLocked: true },
    { id: '4', name: 'NFT Gallery', users: 12, vibe: 'Art', isLocked: true },
  ];

  if (activeRoom) {
    return (
      <div className="h-screen w-full bg-black overflow-hidden relative flex flex-col">
        {/* VR HUD Header */}
        <div className="absolute top-0 w-full z-20 p-4 flex justify-between items-start pointer-events-none">
          <div className="flex flex-col gap-1">
            <div className="bg-emerald-500/20 backdrop-blur-md border border-emerald-500/50 px-4 py-1 rounded-bl-xl rounded-tr-xl flex items-center gap-2 pointer-events-auto">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="font-mono text-emerald-400 text-xs tracking-widest uppercase">Live Connection</span>
            </div>
            <h1 className="text-white font-bold text-xl drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]">{activeRoom}</h1>
          </div>
          <button 
             onClick={() => setActiveRoom(null)}
             className="bg-red-500/20 hover:bg-red-500/40 border border-red-500 text-red-400 px-4 py-1 rounded-full text-xs font-mono uppercase transition-colors pointer-events-auto"
          >
            Disconnect
          </button>
        </div>

        {/* 3D Space Simulation */}
        <div className="flex-1 relative perspective-[1000px] overflow-hidden flex items-center justify-center bg-gradient-to-b from-black via-emerald-950/20 to-black">
          {/* Floor Grid */}
          <div className="absolute bottom-[-20%] w-[200%] h-[100%] origin-bottom transform-3d rotate-x-60 animate-grid-flow opacity-30 pointer-events-none"
               style={{
                   backgroundSize: '40px 40px',
                   backgroundImage: 'linear-gradient(to right, rgba(16, 185, 129, 0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(16, 185, 129, 0.3) 1px, transparent 1px)'
               }}>
          </div>

          {/* Floating Avatars Container */}
          <div 
            className="relative w-[300px] h-[300px] transform-3d transition-transform duration-100 ease-linear"
            style={{ transform: `rotateY(${rotation}deg)` }}
          >
             {MOCK_USERS.slice(0, 6).map((user, i) => {
                 const angle = (i / 6) * Math.PI * 2;
                 const x = Math.cos(angle) * 150;
                 const z = Math.sin(angle) * 150;
                 
                 return (
                     <div 
                        key={user.id}
                        className="absolute top-1/2 left-1/2 w-12 h-12 -ml-6 -mt-6 transform-3d"
                        style={{ transform: `translate3d(${x}px, 0, ${z}px) rotateY(${-rotation}deg)` }}
                     >
                        <div className="relative group">
                             <img 
                                src={user.avatar} 
                                className="w-full h-full rounded-full border-2 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]" 
                                alt={user.username}
                             />
                             <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black/50 text-white text-[10px] px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-emerald-500/30">
                                 {user.username}
                             </div>
                             {/* Voice Indicator */}
                             {i % 2 === 0 && (
                                 <div className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full p-0.5 animate-bounce">
                                     <Wifi size={8} className="text-black" />
                                 </div>
                             )}
                        </div>
                     </div>
                 )
             })}
             
             {/* Center Object */}
             <div className="absolute top-1/2 left-1/2 w-20 h-20 -ml-10 -mt-10 bg-emerald-500/10 rounded-full border border-emerald-400 flex items-center justify-center animate-pulse">
                <Box className="text-emerald-400 animate-spin-slow" size={32} />
             </div>
          </div>
        </div>

        {/* Controls */}
        <div className="h-32 bg-black/80 backdrop-blur-xl border-t border-emerald-900/50 p-4 flex items-center justify-center z-20 pb-8">
            <div className="flex gap-6">
                <button 
                    onClick={() => setMicOn(!micOn)}
                    className={`w-14 h-14 rounded-full flex items-center justify-center border transition-all ${micOn ? 'bg-emerald-500 border-emerald-400 text-black shadow-[0_0_20px_rgba(16,185,129,0.4)]' : 'bg-black border-zinc-700 text-zinc-400 hover:border-zinc-500'}`}
                >
                    {micOn ? <Mic size={24} /> : <MicOff size={24} />}
                </button>
                <button className="w-14 h-14 rounded-full bg-black border border-zinc-700 flex items-center justify-center text-zinc-400 hover:border-emerald-500 hover:text-emerald-500 transition-all">
                    <Users size={24} />
                </button>
                <button className="w-14 h-14 rounded-full bg-black border border-zinc-700 flex items-center justify-center text-zinc-400 hover:border-emerald-500 hover:text-emerald-500 transition-all">
                    <Hexagon size={24} />
                </button>
            </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-black flex flex-col relative overflow-hidden text-white font-mono">
      {/* Background FX */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900/20 via-black to-black z-0 pointer-events-none"></div>
      
      {/* Header */}
      <div className="relative z-10 p-6 flex flex-col items-center mt-8">
         <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl border border-emerald-500/50 flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(16,185,129,0.2)] rotate-45">
             <Globe className="text-emerald-400 -rotate-45" size={32} />
         </div>
         <h1 className="text-3xl font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-600 drop-shadow-sm">Phenoverse</h1>
         <p className="text-emerald-500/60 text-xs tracking-[0.2em] mt-2">VIRTUAL CANNABIS REALITY</p>
      </div>

      {connectionState === 'idle' && (
         <div className="flex-1 flex flex-col items-center justify-center p-8 z-10">
             <div className="text-center space-y-4 mb-12">
                 <p className="text-zinc-400 max-w-xs mx-auto leading-relaxed">
                     Connect your digital consciousness. Experience global sessions, virtual grow ops, and NFT galleries in real-time.
                 </p>
             </div>
             
             <button 
                onClick={handleConnect}
                className="group relative px-8 py-4 bg-transparent overflow-hidden rounded-none skew-x-[-10deg] border border-emerald-500 transition-all hover:bg-emerald-500/10"
             >
                 <div className="absolute inset-0 w-0 bg-emerald-500 transition-all duration-[250ms] ease-out group-hover:w-full opacity-20"></div>
                 <div className="flex items-center gap-2 skew-x-[10deg]">
                     <span className="font-bold tracking-widest">INITIALIZE LINK</span>
                     <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                 </div>
             </button>
         </div>
      )}

      {connectionState === 'connecting' && (
          <div className="flex-1 flex flex-col items-center justify-center z-10">
              <div className="w-64 h-2 bg-zinc-900 rounded-full overflow-hidden mb-4 border border-zinc-800">
                  <div className="h-full bg-emerald-500 animate-progress origin-left"></div>
              </div>
              <p className="text-emerald-500 text-xs animate-pulse">ESTABLISHING NEURAL HANDSHAKE...</p>
              
              <div className="mt-8 font-mono text-[10px] text-zinc-600 space-y-1 text-center">
                  <p>Resolving IPFS nodes...</p>
                  <p>Loading volumetric assets...</p>
                  <p>Synthesizing terpenes...</p>
              </div>
          </div>
      )}

      {connectionState === 'connected' && (
          <div className="flex-1 flex flex-col p-6 z-10 animate-in fade-in slide-in-from-bottom-8 duration-500">
              <div className="flex items-center justify-between mb-6">
                  <h2 className="text-sm font-bold text-zinc-400 uppercase tracking-wider">Active Sectors</h2>
                  <div className="flex items-center gap-2 text-emerald-500 text-xs">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                      {MOCK_USERS.length * 42} Online
                  </div>
              </div>

              <div className="grid grid-cols-1 gap-4 overflow-y-auto pb-24 no-scrollbar">
                  {rooms.map((room) => (
                      <div 
                        key={room.id}
                        onClick={() => handleJoinRoom(room)}
                        className={`group relative bg-zinc-900/50 border hover:border-emerald-500/50 p-4 rounded-xl cursor-pointer transition-all hover:bg-zinc-900 overflow-hidden ${room.isLocked && !currentUser?.isPremium ? 'border-amber-900/30 opacity-80' : 'border-zinc-800'}`}
                      >
                          <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/0 via-emerald-900/10 to-emerald-900/0 translate-x-[-100%] group-hover:animate-shimmer"></div>
                          
                          <div className="flex justify-between items-start mb-2">
                              <h3 className={`font-bold text-lg transition-colors flex items-center gap-2 ${room.isLocked && !currentUser?.isPremium ? 'text-zinc-500' : 'text-white group-hover:text-emerald-400'}`}>
                                {room.name}
                                {room.isLocked && !currentUser?.isPremium && <Lock size={14} className="text-amber-500" />}
                              </h3>
                              <div className="bg-black/40 px-2 py-1 rounded text-[10px] text-zinc-400 border border-zinc-800">
                                  {room.vibe}
                              </div>
                          </div>
                          
                          <div className="flex items-center justify-between text-xs text-zinc-500">
                              <div className="flex items-center gap-1">
                                  <Users size={12} />
                                  {room.users} Connected
                              </div>
                              <div className={`flex items-center gap-1 transition-colors ${room.isLocked && !currentUser?.isPremium ? 'text-amber-500' : 'group-hover:text-emerald-500'}`}>
                                  {room.isLocked && !currentUser?.isPremium ? (
                                    <>Pheno+ Only <Crown size={12} /></>
                                  ) : (
                                    <>Enter <Zap size={12} /></>
                                  )}
                              </div>
                          </div>
                      </div>
                  ))}
                  
                  {/* Promo Card */}
                  <div className="bg-gradient-to-br from-emerald-900/40 to-black border border-emerald-500/30 p-4 rounded-xl mt-2 text-center">
                      <p className="text-emerald-400 font-bold text-sm mb-1">Host a Private Sesh</p>
                      <p className="text-zinc-500 text-xs mb-3">Create a token-gated room for your crew.</p>
                      <button className="text-[10px] bg-emerald-500/20 text-emerald-400 px-3 py-1.5 rounded uppercase font-bold hover:bg-emerald-500/30 transition-colors">
                          Mint Key
                      </button>
                  </div>
              </div>
          </div>
      )}
      
      <style>{`
        @keyframes progress {
            0% { width: 0% }
            100% { width: 100% }
        }
        @keyframes shimmer {
            100% { transform: translateX(100%) }
        }
        .animate-progress {
            animation: progress 2.5s ease-in-out forwards;
        }
        .animate-shimmer {
            animation: shimmer 1.5s infinite;
        }
        .transform-3d {
            transform-style: preserve-3d;
        }
      `}</style>
    </div>
  );
};

export default Metaverse;