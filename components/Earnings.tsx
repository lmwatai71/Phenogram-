import React, { useState } from 'react';
import { ArrowLeft, DollarSign, TrendingUp, CreditCard, Gift, Users, ChevronRight, Activity, CheckCircle } from 'lucide-react';
import { User } from '../types';

interface EarningsProps {
  currentUser: User;
  onBack: () => void;
}

const Earnings: React.FC<EarningsProps> = ({ currentUser, onBack }) => {
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'year'>('month');
  const [cashOutStatus, setCashOutStatus] = useState<'idle' | 'processing' | 'success'>('idle');

  // Mock Data
  const transactions = [
    { id: 1, type: 'Gift', user: 'green_goddess', amount: 4.20, time: '2h ago', icon: <Gift size={16} className="text-pink-500" /> },
    { id: 2, type: 'Subscription Share', user: 'Pheno+', amount: 15.00, time: '1d ago', icon: <Users size={16} className="text-emerald-500" /> },
    { id: 3, type: 'Gift', user: 'dank_daily', amount: 10.00, time: '2d ago', icon: <Gift size={16} className="text-pink-500" /> },
    { id: 4, type: 'Creator Fund', user: 'Phenogram', amount: 45.30, time: '1w ago', icon: <Activity size={16} className="text-blue-500" /> },
  ];

  const handleCashOut = () => {
      setCashOutStatus('processing');
      setTimeout(() => {
          setCashOutStatus('success');
          setTimeout(() => setCashOutStatus('idle'), 3000);
      }, 1500);
  };

  return (
    <div className="min-h-screen bg-black text-white pb-8 animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-black/95 backdrop-blur-md border-b border-zinc-900 p-4 flex items-center">
        <button onClick={onBack} className="p-1 -ml-2 hover:bg-zinc-800 rounded-full transition-colors mr-2">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-bold">Creator Studio</h1>
      </div>

      <div className="p-4 space-y-6">
        {/* Balance Card */}
        <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl p-6 border border-zinc-700 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <DollarSign size={100} className="text-white" />
            </div>
            <p className="text-zinc-400 text-sm font-medium mb-1">Total Balance</p>
            <h2 className="text-4xl font-black text-white mb-4 tracking-tight">
                ${(currentUser.balance || 0).toFixed(2)}
            </h2>
            
            <button 
                onClick={handleCashOut}
                disabled={cashOutStatus !== 'idle'}
                className={`w-full font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg ${
                    cashOutStatus === 'success' 
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50' 
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-900/20'
                }`}
            >
                {cashOutStatus === 'idle' && (
                    <>
                        <CreditCard size={18} />
                        Cash Out
                    </>
                )}
                {cashOutStatus === 'processing' && (
                    <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Processing...
                    </>
                )}
                {cashOutStatus === 'success' && (
                    <>
                        <CheckCircle size={18} />
                        Sent to Wallet
                    </>
                )}
            </button>
        </div>

        {/* Analytics Summary */}
        <div className="grid grid-cols-2 gap-3">
             <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800">
                <div className="flex items-center gap-2 text-emerald-400 mb-2">
                    <TrendingUp size={16} />
                    <span className="text-xs font-bold uppercase">Revenue</span>
                </div>
                <p className="text-xl font-bold">+$124.50</p>
                <p className="text-zinc-500 text-xs mt-1">Last 30 days</p>
             </div>
             <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800">
                <div className="flex items-center gap-2 text-pink-400 mb-2">
                    <Gift size={16} />
                    <span className="text-xs font-bold uppercase">Tips</span>
                </div>
                <p className="text-xl font-bold">32</p>
                <p className="text-zinc-500 text-xs mt-1">Received</p>
             </div>
        </div>

        {/* Chart Placeholder */}
        <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-sm">Earnings History</h3>
                <div className="flex bg-zinc-800 rounded-lg p-0.5">
                    {(['week', 'month', 'year'] as const).map(t => (
                        <button 
                            key={t}
                            onClick={() => setTimeframe(t)}
                            className={`px-3 py-1 text-xs rounded-md capitalize transition-all ${timeframe === t ? 'bg-zinc-700 text-white shadow-sm' : 'text-zinc-500'}`}
                        >
                            {t}
                        </button>
                    ))}
                </div>
            </div>
            
            <div className="h-32 flex items-end justify-between gap-2">
                {[40, 65, 30, 80, 50, 90, 75].map((h, i) => (
                    <div key={i} className="w-full bg-zinc-800 rounded-t-sm relative group">
                         <div 
                            className="absolute bottom-0 left-0 w-full bg-emerald-500/80 rounded-t-sm transition-all duration-500 group-hover:bg-emerald-400" 
                            style={{ height: `${h}%` }}
                         ></div>
                    </div>
                ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-zinc-600 font-mono">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
            </div>
        </div>

        {/* Recent Transactions */}
        <div>
            <h3 className="font-bold text-md mb-3 px-1">Recent Activity</h3>
            <div className="space-y-1">
                {transactions.map(tx => (
                    <div key={tx.id} className="flex items-center justify-between p-3 bg-zinc-900/50 rounded-xl hover:bg-zinc-900 border border-transparent hover:border-zinc-800 transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center">
                                {tx.icon}
                            </div>
                            <div>
                                <p className="font-semibold text-sm">{tx.type}</p>
                                <p className="text-zinc-500 text-xs">{tx.user} • {tx.time}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="font-bold text-emerald-400">+${tx.amount.toFixed(2)}</p>
                        </div>
                    </div>
                ))}
            </div>
            <button className="w-full text-center text-zinc-500 text-sm mt-4 hover:text-white transition-colors">
                View All Transactions
            </button>
        </div>
      </div>
    </div>
  );
};

export default Earnings;