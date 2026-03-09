import { X, LogIn, UserPlus, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const RegistrationModal = ({ isOpen, onClose }: Props) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      
      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in duration-300">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X size={24} />
        </button>

        <div className="p-8 text-center">
          <div className="w-16 h-16 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-6 text-pink-600">
            <Heart fill="currentColor" size={32} />
          </div>
          
          <h2 className="text-2xl font-bold text-slate-900 mb-2">You're almost there!</h2>
          <p className="text-gray-500 mb-8">
            To download your high-resolution PDF and save this version for future edits, 
            please create a free account in seconds.
          </p>

          <div className="space-y-3">
            <button 
              onClick={() => navigate('/register')}
              className="w-full bg-pink-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-pink-700 transition shadow-lg shadow-pink-100"
            >
              <UserPlus size={18} /> Create Free Account
            </button>
            
            <button 
              onClick={() => navigate('/login')}
              className="w-full bg-white text-slate-700 border border-gray-200 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-50 transition"
            >
              <LogIn size={18} /> I already have an account
            </button>
          </div>

          <p className="mt-6 text-[11px] text-gray-400 uppercase tracking-widest font-bold">
            Join 1,000+ happy families today
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationModal;