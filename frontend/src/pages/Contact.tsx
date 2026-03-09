import { useState } from 'react';
import { Mail, MessageSquare, MapPin, Send } from 'lucide-react';
import ContactSuccessModal from '../components/ContactSuccessModal';

const Contact = () => {

  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '', email: '', subject: 'General Inquiry', message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Replace with your Google Apps Script URL
      const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbysWiER7hBKsI2weCzMBd6IUU_2GIeWJrVzbQkk5skjS6W60HOlvyv6TfUcfB2CqQwb/exec";

      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Essential for Google Scripts
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      setLoading(false);
      setIsModalOpen(true); // Open the creative modal
      setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' }); // Reset form
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20 overflow-hidden">
      <ContactSuccessModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">

          {/* Info Side */}
          <div className="bg-slate-900 p-12 text-white md:w-2/5">
            <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
            <p className="text-slate-400 mb-10">
              Have questions about premium features or need help with your biodata? Our team is here to help.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/10 rounded-xl"><Mail size={20} /></div>
                <span>support@shaadibio.com</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/10 rounded-xl"><MessageSquare size={20} /></div>
                <span>Live Chat (Coming Soon)</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/10 rounded-xl"><MapPin size={20} /></div>
                <span>Remote-First Team</span>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="p-12 md:w-3/5">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                  <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required className="w-full p-4 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-pink-500 outline-none transition-all" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                  <input type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })} required className="w-full p-4 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-pink-500 outline-none transition-all" placeholder="john@example.com" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Subject</label>
                <select value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} className="w-full p-4 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-pink-500 outline-none transition-all">
                  <option>General Inquiry</option>
                  <option>Premium Subscription Issue</option>
                  <option>PDF Download Help</option>
                  <option>Feature Request</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
                <textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} rows={5} required className="w-full p-4 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-pink-500 outline-none transition-all" placeholder="How can we help you?"></textarea>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-pink-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg"
              >
                {loading ? "Sending..." : <><Send size={18} /> Send Message</>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;