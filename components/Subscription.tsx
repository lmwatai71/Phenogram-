import React, { useState } from 'react';
import { Check, Star, X, Zap, Crown, Shield } from 'lucide-react';
import { User } from '../types';

interface SubscriptionProps {
  onClose: () => void;
  onSubscribe: () => void;
  currentUser: User;
}

const Subscription: React.FC<SubscriptionProps> = ({ onClose, onSubscribe, currentUser }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubscribe = () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      onSubscribe();
      setIsProcessing(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col animate-in fade-in slide-in-from-bottom duration-300 overflow-y-auto">
      {/* Background Gradient */}
      <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-emerald-900/40 via-black to-black z-0 pointer-events-none" />
      
      {/* Header */}
      <div className="relative z-10 flex justify-end p-4">
        <button onClick={onClose} className="p-2 bg-black/50 rounded-full text-white hover:text-emerald-400 transition-colors">
          <X size={24} />
        </button>
      </div>

      <div className="relative z-10 flex flex-col items-center px-6 pb-12">
        {/* Brand Icon */}
        <div className="w-20 h-20 bg-gradient-to-tr from-yellow-400 to-amber-600 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(234,179,8,0.3)] mb-6 rotate-3">
          <Crown size={40} className="text-white fill-white" />
        </div>

        <h1 className="text-3xl font-black text-white text-center tracking-tight mb-2">
          Pheno<span className="text-amber-400 italic">Plus+</span>
        </h1>
        <p className="text-zinc-400 text-center mb-8 max-w-xs">
          Elevate your status. Unlock exclusive features and support the culture.
        </p>

        {/* Benefits List */}
        <div className="w-full max-w-sm space-y-4 mb-10">
          <div className="flex items-center space-x-4 bg-zinc-900/50 p-4 rounded-xl border border-zinc-800">
            <div className="bg-amber-500/10 p-2 rounded-full">
              <Shield className="text-amber-500" size={20} />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">Verified Badge</h3>
              <p className="text-zinc-500 text-xs">Get the golden checkmark.</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 bg-zinc-900/50 p-4 rounded-xl border border-zinc-800">
            <div className="bg-emerald-500/10 p-2 rounded-full">
              <Zap className="text-emerald-500" size={20} />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">Unlimited BudBot</h3>
              <p className="text-zinc-500 text-xs">Deep search & strain analytics.</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 bg-zinc-900/50 p-4 rounded-xl border border-zinc-800">
            <div className="bg-purple-500/10 p-2 rounded-full">
              <Crown className="text-purple-500" size={20} />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">Metaverse Access</h3>
              <p className="text-zinc-500 text-xs">Unlock VIP rooms & events.</p>
            </div>
          </div>
        </div>

        {/* Billing Toggle */}
        <div className="flex items-center bg-zinc-900 p-1 rounded-lg mb-8 border border-zinc-800">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-6 py-2 rounded-md text-sm font-bold transition-all ${
              billingCycle === 'monthly' ? 'bg-zinc-800 text-white shadow-md' : 'text-zinc-500'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('yearly')}
            className={`px-6 py-2 rounded-md text-sm font-bold transition-all flex items-center gap-1 ${
              billingCycle === 'yearly' ? 'bg-zinc-800 text-white shadow-md' : 'text-zinc-500'
            }`}
          >
            Yearly <span className="text-[10px] text-emerald-400 ml-1">-20%</span>
          </button>
        </div>

        {/* Price & CTA */}
        <div className="text-center mb-6">
          <div className="flex items-end justify-center gap-1 mb-2">
            <span className="text-4xl font-black text-white">
              {billingCycle === 'monthly' ? '$4.20' : '$42.00'}
            </span>
            <span className="text-zinc-500 font-medium mb-1">
              /{billingCycle === 'monthly' ? 'mo' : 'yr'}
            </span>
          </div>
          <p className="text-xs text-zinc-500">Cancel anytime. Terms apply.</p>
        </div>

        <button
          onClick={handleSubscribe}
          disabled={isProcessing}
          className="w-full max-w-sm bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-black font-black py-4 rounded-xl shadow-lg shadow-amber-900/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed relative overflow-hidden"
        >
           {isProcessing ? (
               <>
                 <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></span>
                 <span>Processing...</span>
               </>
           ) : (
               <>
                 <Star className="fill-black" size={20} />
                 <span>UPGRADE TO PHENO+</span>
               </>
           )}
           {/* Shine effect */}
           <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 translate-x-[-150%] animate-[shimmer_2s_infinite]"></div>
        </button>
      </div>
    </div>
  );
};

export default Subscription;