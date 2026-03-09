import { Send } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ContactSuccessModal = ({ isOpen, onClose }: Props) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in duration-300">
        <div className="p-8 text-center">
          <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6 text-indigo-600">
            <Send size={36} className="translate-x-1 -translate-y-1" />
          </div>
          
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Message Sent!</h2>
          <p className="text-gray-500 mb-8 text-sm leading-relaxed">
            Thank you for reaching out to ShaadiBio. Our support team has received your message 
            and will get back to you within 24 hours.
          </p>

          <button 
            onClick={onClose}
            className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-black transition-all shadow-lg"
          >
            Got it, thanks!
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactSuccessModal;