import React, { useState } from 'react';
import { User } from '../types';
import { Leaf, ArrowRight, Upload, Camera } from 'lucide-react';
import { MOCK_USERS } from '../constants';

interface AuthProps {
  onLogin: (user: User) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate network delay
    setTimeout(() => {
      if (!username || !password) {
        setError('Please fill in all fields');
        setIsLoading(false);
        return;
      }

      if (isLogin) {
        // Mock Login Logic
        const existingUser = MOCK_USERS.find(u => u.username.toLowerCase() === username.toLowerCase());
        if (existingUser) {
          onLogin(existingUser);
        } else {
            // Allow login as anyone for demo purposes if not strictly in mock list, 
            // but normally this would fail. For this "social platform" demo, 
            // we'll create a session for them.
           onLogin({
               id: 'session-' + Date.now(),
               username: username,
               avatar: `https://ui-avatars.com/api/?name=${username}&background=059669&color=fff&bold=true`
           });
        }
      } else {
        // Sign Up Logic
        const newUser: User = {
          id: 'user-' + Date.now(),
          username: username,
          avatar: avatarPreview || `https://ui-avatars.com/api/?name=${username}&background=059669&color=fff&bold=true`,
          isVerified: false
        };
        onLogin(newUser);
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-[-20%] left-[-20%] w-[140%] h-[140%] bg-emerald-900/20 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="w-full max-w-md z-10 flex flex-col items-center">
        {/* Logo */}
        <div className="mb-10 flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="w-20 h-20 bg-gradient-to-tr from-emerald-500 to-green-700 rounded-3xl flex items-center justify-center shadow-2xl shadow-emerald-900/50 mb-4 rotate-3">
                <Leaf size={40} className="text-white drop-shadow-md" />
            </div>
            <h1 className="text-4xl font-black text-white tracking-tighter">Phenogram</h1>
            <p className="text-emerald-400 font-medium tracking-wide text-sm mt-1">THE CANNABIS SOCIAL NETWORK</p>
        </div>

        {/* Form Card */}
        <div className="w-full bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 p-8 rounded-3xl shadow-2xl animate-in fade-in zoom-in duration-500 delay-100">
            <div className="flex space-x-4 mb-8 bg-zinc-950/50 p-1 rounded-xl">
                <button 
                    onClick={() => setIsLogin(true)}
                    className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${isLogin ? 'bg-zinc-800 text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-300'}`}
                >
                    Log In
                </button>
                <button 
                    onClick={() => setIsLogin(false)}
                    className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${!isLogin ? 'bg-zinc-800 text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-300'}`}
                >
                    Sign Up
                </button>
            </div>

            <form onSubmit={handleAuth} className="space-y-4">
                {/* Avatar Upload for Sign Up */}
                {!isLogin && (
                    <div className="flex justify-center mb-6">
                        <label className="relative cursor-pointer group">
                            <div className="w-24 h-24 rounded-full bg-zinc-800 border-2 border-dashed border-zinc-600 flex items-center justify-center overflow-hidden group-hover:border-emerald-500 transition-colors">
                                {avatarPreview ? (
                                    <img src={avatarPreview} alt="Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <Camera className="text-zinc-500 group-hover:text-emerald-500 transition-colors" />
                                )}
                            </div>
                            <div className="absolute bottom-0 right-0 bg-emerald-500 p-1.5 rounded-full border-2 border-zinc-900 text-white shadow-lg">
                                <Upload size={12} />
                            </div>
                            <input type="file" className="hidden" accept="image/*" onChange={handleAvatarChange} />
                        </label>
                    </div>
                )}

                <div className="space-y-1">
                    <label className="text-xs font-bold text-zinc-400 ml-1 uppercase">Username</label>
                    <input 
                        type="text" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-800 focus:border-emerald-500 text-white rounded-xl px-4 py-3 outline-none transition-colors"
                        placeholder="Enter your username"
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-bold text-zinc-400 ml-1 uppercase">Password</label>
                    <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-800 focus:border-emerald-500 text-white rounded-xl px-4 py-3 outline-none transition-colors"
                        placeholder="••••••••"
                    />
                </div>

                {error && <p className="text-red-400 text-xs text-center font-medium">{error}</p>}

                <button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-emerald-900/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <>
                            {isLogin ? 'Enter Phenogram' : 'Create Account'}
                            <ArrowRight size={18} />
                        </>
                    )}
                </button>
            </form>
            
            <div className="mt-6 text-center">
                 <p className="text-zinc-500 text-xs">
                    By continuing, you agree to our Terms of Service.
                    <br/>Must be 21+ to join. 🌿
                 </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;