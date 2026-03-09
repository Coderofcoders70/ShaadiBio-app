import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useBioStore } from '../store/useBioStore';
import { Check, Crown, Loader2, Sparkles } from 'lucide-react';

const Upgrade = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { user, setUser } = useBioStore();
  const navigate = useNavigate();

  const handleMockPayment = async () => {
    setIsProcessing(true);
    
    // Simulate a 2-second bank redirect delay
    setTimeout(async () => {
      try {
        const { data } = await api.post('/payments/mock-success');
        
        // Update local store with new premium status
        if (user) {
          setUser({ ...user, isPremium: true });
        }
        
        alert(data.message);
        navigate('/dashboard');
      } catch (err) {
        alert("Payment simulation failed");
      } finally {
        setIsProcessing(false);
      }
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-center">
      <div className="mb-10">
        <div className="inline-block p-3 bg-yellow-50 rounded-2xl text-yellow-500 mb-4">
          <Crown size={40} className="fill-current" />
        </div>
        <h1 className="text-4xl font-black text-gray-800 tracking-tight">Go Premium</h1>
        <p className="text-gray-500 mt-2">Unlock the full power of ShaadiBio</p>
      </div>

      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden max-w-md mx-auto">
        <div className="p-8 bg-gradient-to-br from-pink-600 to-rose-500 text-white">
          <p className="uppercase font-bold tracking-widest text-xs opacity-80">Lifetime Access</p>
          <div className="mt-4 flex justify-center items-baseline">
            <span className="text-5xl font-black">₹499</span>
            <span className="ml-2 text-xl opacity-80 line-through">₹999</span>
          </div>
        </div>

        <div className="p-8 space-y-4">
          {[
            "Remove 'Made with ShaadiBio' Watermark",
            "Password Protect your PDF files",
            "Unlimited Profile Versions",
            "Priority Template Support"
          ].map((feature, i) => (
            <div key={i} className="flex items-center gap-3 text-left">
              <div className="bg-green-100 text-green-600 p-1 rounded-full"><Check size={14} /></div>
              <span className="text-gray-600 font-medium">{feature}</span>
            </div>
          ))}

          <button
            onClick={handleMockPayment}
            disabled={isProcessing}
            className="w-full mt-8 bg-slate-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-all active:scale-95 disabled:opacity-50"
          >
            {isProcessing ? (
              <><Loader2 className="animate-spin" size={20} /> Processing Payment...</>
            ) : (
              <><Sparkles size={20} /> Pay Now (Mock)</>
            )}
          </button>
          <p className="text-[10px] text-gray-400 mt-4">Safe & Secure Mock Transaction</p>
        </div>
      </div>
    </div>
  );
};

export default Upgrade;