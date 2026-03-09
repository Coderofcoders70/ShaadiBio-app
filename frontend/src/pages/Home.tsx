import { Link } from 'react-router-dom';
import { Heart, Smartphone, Lock, Palette, ArrowRight } from 'lucide-react';

const Home = () => {
  return (
    <div className="flex flex-col">
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-b from-pink-50 to-white pt-20 pb-32 overflow-hidden">
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm mb-6 border border-pink-100">
            <Heart size={16} className="text-pink-600 fill-current" />
            <span className="text-sm font-bold text-gray-600 uppercase tracking-wider">Trusted by 1000+ Families</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 leading-tight">
            Create a Beautiful <br />
            <span className="bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent">Matrimonial Biodata</span>
          </h1>
          
          <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10 font-medium">
            Impress your future in-laws with a professional, elegant biodata. 
            Customize templates, add photos, and download in high resolution.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/create" 
              className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-black transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-2 group"
            >
              Start Creating - Free <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              to="/register" 
              className="bg-white text-gray-700 border border-gray-200 px-10 py-4 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all"
            >
              Join the Community
            </Link>
          </div>
        </div>

        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-pink-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl" />
      </section>

      {/* FEATURES SECTION */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">Why Choose ShaadiBio?</h2>
            <div className="h-1.5 w-20 bg-pink-600 mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="p-8 rounded-3xl bg-gray-50 border border-transparent hover:border-pink-100 hover:bg-white transition-all group">
              <div className="w-14 h-14 bg-pink-100 rounded-2xl flex items-center justify-center text-pink-600 mb-6 group-hover:scale-110 transition-transform">
                <Palette size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Modern Templates</h3>
              <p className="text-gray-500 leading-relaxed">Choose from Traditional or Modern designs and customize colors to suit your family's style.</p>
            </div>

            <div className="p-8 rounded-3xl bg-gray-50 border border-transparent hover:border-blue-100 hover:bg-white transition-all group">
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                <Lock size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Privacy First</h3>
              <p className="text-gray-500 leading-relaxed">Secure your biodata with a PDF password. Only share your details with who you trust.</p>
            </div>

            <div className="p-4 md:p-8 rounded-3xl bg-gray-50 border border-transparent hover:border-amber-100 hover:bg-white transition-all group">
              <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600 mb-6 group-hover:scale-110 transition-transform">
                <Smartphone size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Fast Generate</h3>
              <p className="text-gray-500 leading-relaxed">Create and edit your profile on the go from any device. It's fast, smooth, and simple.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;