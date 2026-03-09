/* src/components/Footer.tsx */
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8 mt-auto">
      <div className="container mx-auto px-6">
        {/* Adjusted Grid: Centered text and items on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 text-left md:text-center">
          
          {/* Brand Section */}
          <div className="flex flex-col md:items-center">
            <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-pink-600 mb-4 justify-start md:justify-center">
              <Heart fill="currentColor" /> ShaadiBio
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs md:mx-auto">
              Making the first step of your matrimonial journey professional, beautiful, and effortless.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col md:items-center">
            <h4 className="font-bold text-slate-800 mb-4 uppercase text-xs tracking-widest">Quick Links</h4>
            <ul className="space-y-3 text-sm text-gray-500 font-medium">
              <li><Link to="/about" className="hover:text-pink-600 transition-colors">About Our Mission</Link></li>
              <li><Link to="/contact" className="hover:text-pink-600 transition-colors">Contact Support</Link></li>
              <li><Link to="/create" className="hover:text-pink-600 transition-colors">Start Creating</Link></li>
            </ul>
          </div>

          {/* Legal Section */}
          <div className="flex flex-col md:items-center">
            <h4 className="font-bold text-slate-800 mb-4 uppercase text-xs tracking-widest">Legal & Privacy</h4>
            <ul className="space-y-3 text-sm text-gray-500 font-medium">
              <li className="hover:text-pink-600 cursor-pointer transition-colors">Privacy Policy</li>
              <li className="hover:text-pink-600 cursor-pointer transition-colors">Terms of Service</li>
              <li className="hover:text-pink-600 cursor-pointer transition-colors">Refund Policy</li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="text-center border-t border-gray-50 pt-8 mt-8">
          <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-bold">
            © 2026 ShaadiBio. Built with ❤️ for families everywhere.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;