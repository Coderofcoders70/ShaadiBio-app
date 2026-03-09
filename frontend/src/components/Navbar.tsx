import { useState } from 'react';
import LogoutModal from './LogoutModal';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useBioStore } from '../store/useBioStore';
import {
  Heart, LogOut, User as UserIcon, ShieldCheck,
  Crown, Menu, X, LayoutDashboard, Activity, Home as HomeIcon, Info, Phone
} from 'lucide-react';

const Navbar = () => {
  const { user, setUser } = useBioStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  // Check if current path is part of the Admin Panel
  const isAdminPath = location.pathname.startsWith('/admin');

  const handleLogout = () => {
    setUser(null);
    navigate('/login');
    setIsMobileMenuOpen(false);
    setIsLogoutModalOpen(false);
  };

  // --- ADMIN SIDEBAR LAYOUT (Desktop & Mobile Drawer) ---
  if (user?.isAdmin && isAdminPath) {
    return (
      <>
        <LogoutModal
          isOpen={isLogoutModalOpen}
          onClose={() => setIsLogoutModalOpen(false)}
          onConfirm={handleLogout}
        />
        {/* Desktop Sidebar (Fixed Left) */}
        <aside className="hidden lg:flex flex-col w-64 h-screen bg-slate-900 text-white fixed left-0 top-0 z-50 p-6">
          <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-pink-500 mb-10">
            <Heart fill="currentColor" size={28} />
            <span className="tracking-tight text-white">ShaadiBio</span>
          </Link>

          <nav className="flex-1 space-y-2">
            <Link to="/admin" className="flex items-center space-x-3 p-3 rounded-xl bg-pink-600/10 text-pink-500 font-bold">
              <Activity size={20} />
              <span>Overview</span>
            </Link>
            <Link to="/dashboard" className="flex items-center space-x-3 p-3 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition">
              <LayoutDashboard size={20} />
              <span>Back to Dashboard</span>
            </Link>
          </nav>

          <div className="pt-6 border-t border-slate-800">
            <button onClick={() => setIsLogoutModalOpen(true)} className="flex items-center space-x-3 p-3 w-full text-gray-400 hover:text-red-400 transition">
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Mobile Admin Header (Horizontal but leads to sidebar/home) */}
        <nav className="lg:hidden bg-slate-900 text-white p-4 flex justify-between items-center sticky top-0 z-50">
          <Link to="/" className="flex items-center space-x-2 text-xl font-bold text-pink-500">
            <Heart fill="currentColor" />
            <span>ShaadiBio</span>
          </Link>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {isMobileMenuOpen && (
            <div className="absolute top-full left-0 w-full bg-slate-900 border-t border-slate-800 p-6 flex flex-col space-y-4 animate-in slide-in-from-top duration-300">
              <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)} className="font-bold text-pink-500">Admin Overview</Link>
              <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>Back to Dashboard</Link>
              <button onClick={() => setIsLogoutModalOpen(true)} className="text-left text-red-400">Logout</button>
            </div>
          )}
        </nav>
      </>
    );
  }

  // --- USER TOP NAVBAR (Responsive & Creative) ---
  return (
    <>
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
      />
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo with Creative Gradient */}
          <Link to="/" className="flex items-center space-x-2 text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent hover:scale-105 transition-transform">
            <Heart className="text-pink-600" fill="currentColor" />
            <span>ShaadiBio</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            {user ? (
              <>
                {user && !user.isPremium && (
                  <Link
                    to="/upgrade"
                    className="hidden lg:flex items-center gap-2 bg-amber-50 text-amber-700 px-4 py-2 rounded-full font-bold text-xs hover:bg-amber-100 transition border border-amber-200 shadow-sm"
                  >
                    <Crown size={14} className="fill-current" />
                    <span>Go Premium</span>
                  </Link>
                )}
                {user.isAdmin && (
                  <Link to="/admin" className="group flex items-center gap-2 text-blue-600 font-bold hover:bg-blue-50 px-4 py-2 rounded-full transition">
                    <ShieldCheck size={18} className="group-hover:rotate-12 transition-transform" />
                    <span>Admin Panel</span>
                  </Link>
                )}
                <Link to="/dashboard" className="text-gray-600 hover:text-pink-600 transition font-semibold">Dashboard</Link>

                <div className="flex items-center space-x-3 bg-white border border-gray-100 shadow-sm px-4 py-2 rounded-full group cursor-default">
                  <div className="bg-pink-100 p-1.5 rounded-full text-pink-600 group-hover:bg-pink-600 group-hover:text-white transition-colors">
                    <UserIcon size={14} />
                  </div>
                  <span className="font-bold text-gray-700">{user.name}</span>
                  {user.isPremium && <Crown size={16} className="text-yellow-500 fill-current animate-pulse" />}
                </div>

                <button onClick={() => setIsLogoutModalOpen(true)} className="p-2 text-gray-400 hover:text-red-500 transition-colors" title="Logout">
                  <LogOut size={22} />
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 hover:text-pink-600 font-bold transition">Login</Link>
                <Link to="/register" className="bg-gradient-to-r from-pink-600 to-rose-500 text-white px-8 py-2.5 rounded-full font-bold hover:shadow-lg hover:shadow-pink-200 transition-all active:scale-95">
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-gray-600 p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* DESKTOP SUB-NAV (Centered Icons) */}
        <div className="hidden md:flex bg-gray-50/50 border-b border-gray-100 justify-center py-2 space-x-12">
          <Link to="/" className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-pink-600 transition">
            <HomeIcon size={14} /> HOME
          </Link>
          <Link to="/about" className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-pink-600 transition">
            <Info size={14} /> ABOUT US
          </Link>
          <Link to="/contact" className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-pink-600 transition">
            <Phone size={14} /> CONTACT
          </Link>
        </div>

        {/* Mobile Menu Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-xl p-6 flex flex-col space-y-6 animate-in slide-in-from-top duration-300">
            <div className="grid grid-cols-1 gap-4">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 text-gray-700 font-bold"><HomeIcon size={20} className="text-pink-600" /> Home</Link>
              <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 text-gray-700 font-bold"><Info size={20} className="text-pink-600" /> About Us</Link>
              <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 text-gray-700 font-bold"><Phone size={20} className="text-pink-600" /> Contact</Link>
            </div>
            <hr />
            {user ? (
              <>
                <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold text-gray-700">My Dashboard</Link>
                {user.isAdmin && <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold text-blue-600">Admin Panel</Link>}
                <button onClick={() => setIsLogoutModalOpen(true)} className="text-left text-lg font-bold text-red-500 flex items-center gap-2">
                  <LogOut size={20} /> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold">Login</Link>
                <Link to="/register" onClick={() => setIsMobileMenuOpen(false)} className="bg-pink-600 text-white text-center py-4 rounded-2xl font-bold">Register Now</Link>
              </>
            )}
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;