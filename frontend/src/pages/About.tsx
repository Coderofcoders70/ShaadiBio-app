import { Heart, ShieldCheck, Zap, Globe } from 'lucide-react';

const About = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="bg-pink-50 py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">Our Mission</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto px-6">
          We believe everyone deserves a beautiful beginning. ShaadiBio was created to help families 
          present their stories with elegance, privacy, and simplicity.
        </p>
      </section>

      {/* Values Section */}
      <section className="py-20 container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {[
            { 
              icon: <Zap className="text-pink-600" />, 
              title: "Fast & Effortless", 
              desc: "Generate high-quality printable PDFs in under 5 seconds." 
            },
            { 
              icon: <ShieldCheck className="text-blue-600" />, 
              title: "Privacy First", 
              desc: "Control your data with privacy toggles and password-protected downloads." 
            },
            { 
              icon: <Globe className="text-green-600" />, 
              title: "Multi-Language", 
              desc: "Create biodatas in English, Hindi, and more to suit your heritage." 
            },
            { 
              icon: <Heart className="text-rose-500" />, 
              title: "Elegant Designs", 
              desc: "Modern and traditional templates designed to make a lasting impression." 
            }
          ].map((v, i) => (
            <div key={i} className="text-center p-6">
              <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                {v.icon}
              </div>
              <h3 className="font-bold text-slate-800 mb-2">{v.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-slate-900 text-white text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6">Built for Modern Families</h2>
          <p className="text-slate-400 max-w-3xl mx-auto leading-relaxed">
            As a standalone SaaS web application, ShaadiBio follows a modern client-server architecture 
            to ensure your data remains secure and your experience remains smooth across all devices.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;