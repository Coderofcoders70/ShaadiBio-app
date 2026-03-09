import { CheckCircle, LayoutDashboard, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const SuccessModal = ({ isOpen, onClose }: Props) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      
      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in duration-300">
        <div className="p-8 text-center">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500">
            <CheckCircle size={48} />
          </div>
          
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Saved Successfully!</h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Your matrimonial biodata has been securely saved to your profile. 
            You can now manage your versions or create a new one.
          </p>

          <div className="flex flex-col gap-3">
            <button 
              onClick={() => navigate('/dashboard')}
              className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-all shadow-lg shadow-slate-200"
            >
              <LayoutDashboard size={18} /> Go to Dashboard
            </button>
            
            <button 
              onClick={onClose}
              className="w-full bg-white text-pink-600 border border-pink-100 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-pink-50 transition-all"
            >
              Continue Editing <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;