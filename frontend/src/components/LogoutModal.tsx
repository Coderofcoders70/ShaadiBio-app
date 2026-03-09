import { LogOut, X } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const LogoutModal = ({ isOpen, onClose, onConfirm }: Props) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
      {/* Backdrop with Blur */}
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      
      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in duration-300">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X size={20} />
        </button>

        <div className="p-8 text-center">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-600">
            <LogOut size={32} />
          </div>
          
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Logout?</h2>
          <p className="text-gray-500 mb-8 text-sm">
            Are you sure you want to log out of your ShaadiBio account? You can always log back in anytime.
          </p>

          <div className="flex flex-col gap-3">
            <button 
              onClick={onConfirm}
              className="w-full bg-pink-600 text-white py-3.5 rounded-xl font-bold hover:bg-pink-800 transition-all shadow-lg shadow-slate-200"
            >
              Yes, Logout
            </button>
            
            <button 
              onClick={onClose}
              className="w-full bg-white text-gray-500 border border-gray-100 py-3.5 rounded-xl font-bold hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;