import { AlertTriangle, Trash2, X } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
}

const DeleteModal = ({ isOpen, onClose, onConfirm, loading }: Props) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      
      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in duration-300">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X size={24} />
        </button>

        <div className="p-8 text-center">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 text-red-500">
            <AlertTriangle size={40} />
          </div>
          
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Delete Profile?</h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Are you sure you want to delete this profile version? This action cannot be undone and all data for this version will be lost.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <button 
              onClick={onClose}
              className="flex-1 bg-gray-100 text-gray-700 py-3.5 rounded-xl font-bold hover:bg-gray-200 transition-all"
            >
              Cancel
            </button>
            
            <button 
              onClick={onConfirm}
              disabled={loading}
              className="flex-1 bg-red-600 text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-red-700 transition-all shadow-lg shadow-red-100 disabled:opacity-50"
            >
              {loading ? "Deleting..." : <><Trash2 size={18} /> Delete Now</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;