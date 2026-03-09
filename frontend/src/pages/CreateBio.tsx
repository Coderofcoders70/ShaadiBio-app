import api from '../api/axios';
import html2pdf from 'html2pdf.js';
import Cropper from 'react-easy-crop';
import { getCroppedImg } from '../utils/cropImage';
import { useBioStore } from '../store/useBioStore';
import { useRef, useState, useEffect } from 'react';
import SuccessModal from '../components/SuccessModal';
import BioDataTemplate from '../components/BioDataTemplate';
import RegistrationModal from '../components/RegistrationModal';
import { Link, useParams } from 'react-router-dom';
import {
  Save, FileText, ChevronRight, ChevronLeft, Upload,
  CheckCircle, GraduationCap, Star, Users, User as UserIcon,
  Eye, EyeOff, Settings, Lock, Crown
} from 'lucide-react';

const CreateBio = () => {
  const { id } = useParams();
  const { user, bioData, updateBioData, resetBioData, setProfilePhoto, activeTab, setActiveTab } = useBioStore();
  const [step, setStep] = useState(1);
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [isRegModalOpen, setIsRegModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [showCropper, setShowCropper] = useState(false);

  const componentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (id) {
      const fetchBioToEdit = async () => {
        try {
          const { data } = await api.get(`/biodata/${id}`);
          updateBioData('personal', data.personal);
          updateBioData('family', data.family);
          updateBioData('education', data.education);
          updateBioData('horoscope', data.horoscope);
          updateBioData('templateId', data.templateId);
          setProfilePhoto(data.profilePhoto);
        } catch (err) {
          console.error("Load failed", err);
        }
      };
      fetchBioToEdit();
    } else {
      resetBioData(); // Clear form for new creation
    }
  }, [id, updateBioData, setProfilePhoto, resetBioData]);

  const handleDownloadPDF = () => {

    if (!user) {
      setIsRegModalOpen(true);
      return;
    }

    const element = componentRef.current;
    if (!element) return;

    // Strict check for password existence
    const hasPassword = bioData.pdfPassword && bioData.pdfPassword.trim().length > 0;

    const opt = {
      margin: 0,
      filename: `${bioData.personal.fullName || 'User'}_Biodata.pdf`,
      image: { type: 'jpeg' as const, quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, letterRendering: true },
      jsPDF: {
        unit: 'in',
        format: 'letter',
        orientation: 'portrait' as const,
        encryption: hasPassword ? {
          userPassword: bioData.pdfPassword,
          ownerPassword: bioData.pdfPassword,
          userPermissions: ["print", "modify", "copy", "annot-forms"]
        } : undefined
      }
    };

    html2pdf().set(opt).from(element).save();
  };

  const handleDobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dob = e.target.value;
    const birthDate = new Date(dob);
    const ageDate = new Date(Date.now() - birthDate.getTime());
    const calculatedAge = Math.abs(ageDate.getUTCFullYear() - 1970);
    updateBioData('personal', { dob, age: calculatedAge });
  };

  // const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (!e.target.files?.[0]) return;
  //   setUploading(true);
  //   const formData = new FormData();
  //   formData.append('image', e.target.files[0]);
  //   try {
  //     const { data } = await api.post('/upload', formData);
  //     setProfilePhoto(data.url);
  //   } catch (err) {
  //     console.error(err);
  //     alert('Upload failed');
  //   } finally {
  //     setUploading(false);
  //   }
  // };

  const onCropComplete = (_activeArea: any, accomplishedAreaPixels: any) => {
    setCroppedAreaPixels(accomplishedAreaPixels);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImage(reader.result as string);
        setShowCropper(true);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleFinalUpload = async () => {
    if (!image || !croppedAreaPixels) return;
    setUploading(true);

    try {
      const croppedImageBlob = await getCroppedImg(image, croppedAreaPixels);
      const file = new File([croppedImageBlob], "profile.jpg", { type: "image/jpeg" });

      const formData = new FormData();
      formData.append('image', file);

      const { data } = await api.post('/upload', formData);
      setProfilePhoto(data.url); // Save to Zustand store
      setShowCropper(false);
    } catch (err) {
      console.error(err);
      alert("Cropping/Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const saveToBackend = async () => {

    if (!user) {
      setIsRegModalOpen(true);
      return;
    }

    try {
      await api.post('/biodata', bioData);
      setIsSuccessModalOpen(true);
    } catch (err) {
      console.error(err);
      alert('Save failed');
    }
  };

  return (
    <div className="relative min-h-screen pb-10 overflow-x-hidden bg-gray-50/50">
      <RegistrationModal
        isOpen={isRegModalOpen}
        onClose={() => setIsRegModalOpen(false)}
      />
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
      />
      {/* MOBILE TOGGLE TABS (Visible only on mobile/tablet) */}
      <div className="flex lg:hidden sticky top-0 z-30 bg-white border-b mb-6 shadow-sm w-full">
        <button
          onClick={() => setActiveTab('edit')}
          className={`flex-1 py-4 text-sm font-bold transition-all ${activeTab === 'edit' ? 'text-pink-600 border-b-2 border-pink-600 bg-pink-50' : 'text-gray-500'}`}
        >
          1. Edit Form
        </button>
        <button
          onClick={() => setActiveTab('preview')}
          className={`flex-1 py-4 text-sm font-bold transition-all ${activeTab === 'preview' ? 'text-pink-600 border-b-2 border-pink-600 bg-pink-50' : 'text-gray-500'}`}
        >
          2. View Preview
        </button>
      </div>

      <div className="container mx-auto px-3 sm:px-6">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* LEFT: FORM SECTION (Hidden on mobile if 'preview' is active) */}
          <div className={`w-full lg:w-1/2 bg-white p-4 md:p-8 rounded-2xl shadow-lg border border-gray-100 ${activeTab === 'edit' ? 'block' : 'hidden lg:block'}`}>

            {/* Step Indicator */}
            <div className="flex items-center justify-between mb-10 px-2 relative">
              {[1, 2, 3, 4, 5].map((s) => (
                <div key={s} className="flex items-center justify-between mb-10 px-1 relative">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${step >= s ? 'bg-pink-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                    {s}
                  </div>
                  {s < 5 && (
                    <div className={`absolute top-4 left-[50%] w-full h-[2px] -z-10 ${step > s ? 'bg-pink-600' : 'bg-gray-100'}`} />
                  )}
                  <span className="hidden sm:block text-[9px] ml-1 mt-2 font-black text-gray-400 uppercase tracking-tighter">Step {s}</span>
                </div>
              ))}
            </div>

            <div className="max-w-full overflow-hidden">
              {/* STEP 1: PERSONAL */}
              {step === 1 && (
                <div className="space-y-4 animate-in slide-in-from-left duration-300">
                  <h2 className="text-lg sm:text-xl font-bold flex items-center gap-2 text-gray-800"><UserIcon className="text-pink-600" /> Personal Details</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input type="text" placeholder="Full Name" className="input-field w-full" value={bioData.personal.fullName} onChange={(e) => updateBioData('personal', { fullName: e.target.value })} />
                    <select className="input-field overflow-hidden w-64 md:w-full" value={bioData.personal.gender} onChange={(e) => updateBioData('personal', { gender: e.target.value as any })}>
                      <option value="">Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                    <input type="date" className="input-field w-full" value={bioData.personal.dob ? bioData.personal.dob.split('T')[0] : ''} onChange={handleDobChange} />
                    <input type="text" placeholder="Height (e.g. 5'10'')" className="input-field w-full" value={bioData.personal.height} onChange={(e) => updateBioData('personal', { height: e.target.value })} />
                    <input type="text" placeholder="Religion" className="input-field w-full" value={bioData.personal.religion} onChange={(e) => updateBioData('personal', { religion: e.target.value })} />
                    <input type="text" placeholder="Caste" className="input-field w-full" value={bioData.personal.caste} onChange={(e) => updateBioData('personal', { caste: e.target.value })} />

                    {/* Phone Number with its own Toggle */}
                    <div className="relative">
                      <input type="text" placeholder="Phone Number" className="input-field pr-12" value={bioData.personal.phone} onChange={(e) => updateBioData('personal', { phone: e.target.value })} />
                      <button
                        onClick={() => updateBioData('privacy', { showContact: !bioData.privacy.showContact })}
                        className="absolute right-3 top-2.5 text-gray-400 hover:text-pink-600"
                      >
                        {bioData.privacy.showContact ? <Eye size={18} /> : <EyeOff size={18} className="text-pink-500" />}
                      </button>
                    </div>

                    {/* Email Address with its own Toggle */}
                    <div className="relative">
                      <input type="email" placeholder="Email Address" className="input-field pr-12" value={bioData.personal.email} onChange={(e) => updateBioData('personal', { email: e.target.value })} />
                      <button
                        onClick={() => updateBioData('privacy', { showEmail: !bioData.privacy.showEmail })}
                        className="absolute right-3 top-2.5 text-gray-400 hover:text-pink-600"
                      >
                        {bioData.privacy.showEmail ? <Eye size={18} /> : <EyeOff size={18} className="text-pink-500" />}
                      </button>
                    </div>
                  </div>

                  {showCropper && (
                    <div className="fixed inset-0 z-[100] bg-black/90 flex flex-col items-center justify-center p-4">
                      <div className="relative w-full max-w-xl h-[400px] bg-gray-900 rounded-2xl overflow-hidden">
                        <Cropper
                          image={image!}
                          crop={crop}
                          zoom={zoom}
                          aspect={1 / 1} // Circular or Square crop
                          onCropChange={setCrop}
                          onCropComplete={onCropComplete}
                          onZoomChange={setZoom}
                        />
                      </div>

                      <div className="mt-6 flex gap-4 w-full max-w-xl">
                        <button
                          onClick={() => setShowCropper(false)}
                          className="flex-1 py-3 bg-white/10 text-white rounded-xl font-bold hover:bg-white/20 transition"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleFinalUpload}
                          className="flex-1 py-3 bg-pink-600 text-white rounded-xl font-bold hover:bg-pink-700 transition"
                        >
                          Crop & Upload
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Profile Photo (FR-8) */}
                  <div className="p-4 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50">
                    <label className="block text-sm font-medium mb-2 text-gray-600 text-left">Profile Photo</label>
                    <input type="file" id="photo-upload" hidden onChange={handleFileChange} />
                    <label htmlFor="photo-upload" className="flex items-center justify-center gap-2 cursor-pointer bg-white border px-4 py-2 rounded-lg hover:shadow-sm transition-all">
                      {uploading ? <span className="animate-pulse">Uploading...</span> : <><Upload size={18} /> Choose Image</>}
                      {bioData.profilePhoto && <CheckCircle className="text-green-500" size={18} />}
                    </label>
                  </div>
                </div>
              )}

              {/* STEP 2: FAMILY */}
              {step === 2 && (
                <div className="space-y-4 animate-in slide-in-from-left duration-300">
                  <h2 className="text-xl font-bold flex items-center gap-2 text-gray-800"><Users className="text-pink-600" /> Family Details</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                    <input type="text" placeholder="Father's Name" className="input-field" value={bioData.family.fatherName} onChange={(e) => updateBioData('family', { fatherName: e.target.value })} />
                    <input type="text" placeholder="Father's Occupation" className="input-field" value={bioData.family.fatherOccupation} onChange={(e) => updateBioData('family', { fatherOccupation: e.target.value })} />
                    <input type="text" placeholder="Mother's Name" className="input-field" value={bioData.family.motherName} onChange={(e) => updateBioData('family', { motherName: e.target.value })} />
                    <input type="text" placeholder="Native Place" className="input-field" value={bioData.family.nativePlace} onChange={(e) => updateBioData('family', { nativePlace: e.target.value })} />
                    <input type="text" placeholder="Siblings" className="input-field col-span-full" value={bioData.family.siblings} onChange={(e) => updateBioData('family', { siblings: e.target.value })} />
                  </div>
                </div>
              )}

              {/* STEP 3: EDUCATION & WORK */}
              {step === 3 && (
                <div className="space-y-4 animate-in slide-in-from-left duration-300">
                  <h2 className="text-xl font-bold flex items-center gap-2 text-gray-800"><GraduationCap className="text-pink-600" /> Education & Career</h2>
                  <input type="text" placeholder="Education (e.g. B.Tech CS)" className="input-field" value={bioData.education.education} onChange={(e) => updateBioData('education', { education: e.target.value })} />
                  <input type="text" placeholder="Profession" className="input-field" value={bioData.education.profession} onChange={(e) => updateBioData('education', { profession: e.target.value })} />

                  {/* Privacy Control: Income (FR-16) */}
                  <div className="relative">
                    <input type="text" placeholder="Annual Income" className="input-field pr-12" value={bioData.education.annualIncome} onChange={(e) => updateBioData('education', { annualIncome: e.target.value })} />
                    <button
                      onClick={() => updateBioData('privacy', { showIncome: !bioData.privacy.showIncome })}
                      className="absolute right-3 top-2.5 text-gray-400 hover:text-pink-600"
                    >
                      {bioData.privacy.showIncome ? <Eye size={18} /> : <EyeOff size={18} className="text-pink-500" />}
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: HOROSCOPE DETAILS (RESTORING ALL FIELDS) */}
              {step === 4 && (
                <div className="space-y-4 animate-in slide-in-from-left duration-300">
                  <h2 className="text-xl font-bold flex items-center gap-2 text-gray-800"><Star className="text-pink-600" /> Horoscope Details</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" placeholder="Rashi" className="input-field" value={bioData.horoscope?.rashi} onChange={(e) => updateBioData('horoscope', { rashi: e.target.value })} />
                    <input type="text" placeholder="Nakshatra" className="input-field" value={bioData.horoscope?.nakshatra} onChange={(e) => updateBioData('horoscope', { nakshatra: e.target.value })} />
                    <input type="text" placeholder="Gothra" className="input-field" value={bioData.horoscope?.gothra} onChange={(e) => updateBioData('horoscope', { gothra: e.target.value })} />
                    <input type="text" placeholder="Place of Birth" className="input-field" value={bioData.horoscope?.placeOfBirth} onChange={(e) => updateBioData('horoscope', { placeOfBirth: e.target.value })} />
                    <div className="md:col-span-2">
                      <label className="text-xs text-gray-500 block mb-1">Time of Birth</label>
                      <input type="time" className="input-field" value={bioData.horoscope?.timeOfBirth} onChange={(e) => updateBioData('horoscope', { timeOfBirth: e.target.value })} />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 5: FINAL CUSTOMIZATION */}
              {step === 5 && (
                <div className="space-y-6 animate-in slide-in-from-left duration-300">
                  <h2 className="text-xl font-bold flex items-center gap-2 text-gray-800"><Settings className="text-pink-600" /> Final Customization</h2>

                  {/* Color Picker */}
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-left">
                    <label className="block text-sm font-bold mb-3 text-gray-700">Theme Color</label>
                    <div className="flex flex-wrap gap-3">
                      {['#db2777', '#2563eb', '#059669', '#7c3aed', '#ea580c'].map((color) => (
                        <button
                          key={color}
                          onClick={() => updateBioData('themeColor' as any, color)}
                          className={`w-8 h-8 rounded-full border-2 transition-transform ${bioData.themeColor === color ? 'border-slate-900 scale-110' : 'border-transparent'
                            }`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Font Selector */}
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-left">
                    <label className="block text-sm font-bold mb-3 text-gray-700">Font Style</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => updateBioData('fontStyle' as any, 'font-sans')}
                        className={`py-2 px-3 rounded-lg border text-sm ${bioData.fontStyle === 'font-sans' ? 'bg-slate-900 text-white' : 'bg-white'}`}
                      >
                        Modern Sans
                      </button>
                      <button
                        onClick={() => updateBioData('fontStyle' as any, 'font-serif')}
                        className={`py-2 px-3 rounded-lg border text-sm font-serif ${bioData.fontStyle === 'font-serif' ? 'bg-slate-900 text-white' : 'bg-white'}`}
                      >
                        Classic Serif
                      </button>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-left">
                    <label className="block text-sm font-bold mb-3 text-gray-700">Document Language</label>
                    <div className="flex gap-4">
                      <button onClick={() => updateBioData('language', 'en')} className={`flex-1 py-2 rounded-lg font-medium border ${bioData.language === 'en' ? 'bg-pink-600 text-white border-pink-600' : 'bg-white'}`}>English</button>
                      <button onClick={() => updateBioData('language', 'hi')} className={`flex-1 py-2 rounded-lg font-medium border ${bioData.language === 'hi' ? 'bg-pink-600 text-white border-pink-600' : 'bg-white'}`}>हिन्दी (Hindi)</button>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-left">
                    <label className="block text-sm font-bold mb-3 text-gray-700">Template Style</label>
                    <div className="flex gap-4">
                      <button onClick={() => updateBioData('templateId', 'modern')} className={`flex-1 py-2 rounded-lg border ${bioData.templateId === 'modern' ? 'bg-pink-50 border-pink-500 text-pink-700' : 'bg-white'}`}>Modern</button>
                      <button onClick={() => updateBioData('templateId', 'traditional')} className={`flex-1 py-2 rounded-lg border ${bioData.templateId === 'traditional' ? 'bg-orange-50 border-orange-500 text-orange-700' : 'bg-white'}`}>Traditional</button>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-left">
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                        <Lock size={16} className="text-pink-600" /> PDF Password Protection
                      </label>
                      {/* REPLACE THE CLEAR BUTTON WITH THIS LOGIC */}
                      {!user?.isPremium ? (
                        <Link to="/upgrade" className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md flex items-center gap-1 hover:bg-amber-100 transition">
                          <Crown size={10} className="fill-current" /> GO PREMIUM
                        </Link>
                      ) : (
                        bioData.pdfPassword && (
                          <button onClick={() => updateBioData('pdfPassword', '')} className="text-[10px] text-red-500 font-bold uppercase hover:underline">Clear</button>
                        )
                      )}
                    </div>

                    {/* UPDATE THE INPUT FIELD */}
                    <input
                      type="password"
                      disabled={!user?.isPremium}
                      placeholder={user?.isPremium ? "Set password to lock PDF" : "Upgrade to unlock this feature 🔒"}
                      className={`input-field ${!user?.isPremium ? 'bg-gray-100 border-gray-200 cursor-not-allowed opacity-70' : ''}`}
                      value={bioData.pdfPassword || ''}
                      onChange={(e) => updateBioData('pdfPassword', e.target.value)}
                    />

                    {!user?.isPremium && (
                      <p className="text-[10px] text-slate-400 mt-2 italic">Password protection is a premium security feature.</p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between mt-8">
              <button disabled={step === 1} onClick={() => setStep(step - 1)} className="btn-secondary flex items-center gap-2">
                <ChevronLeft size={20} /> Back
              </button>
              {step < 5 ? (
                <button onClick={() => setStep(step + 1)} className="btn-primary flex items-center gap-2">
                  Next <ChevronRight size={20} />
                </button>
              ) : (
                <button onClick={saveToBackend} className="btn-primary bg-green-600 hover:bg-green-700 flex items-center gap-2">
                  <Save size={20} /> Save Biodata
                </button>
              )}
            </div>
          </div>

          {/* RIGHT: LIVE PREVIEW (Hidden on mobile if 'edit' is active) */}
          <div className={`w-full lg:w-1/2 order-1 lg:order-2 ${activeTab === 'preview' ? 'block' : 'hidden lg:block'}`}>
            <div className="sticky top-6">
              <div className="bg-gray-800 text-white p-2 rounded-t-xl text-center text-xs font-mono uppercase tracking-[0.2em]">
                Real-time Preview
              </div>

              <div className={`bg-white shadow-2xl rounded-b-xl overflow-hidden border-x border-b transition-all duration-500 min-h-[700px] ${bioData.templateId === 'traditional' ? 'border-orange-200' : 'border-pink-100'}`}>
                <div ref={componentRef}>
                  <BioDataTemplate data={bioData} />
                </div>
              </div>

              <button
                onClick={handleDownloadPDF}
                className="mt-4 w-full bg-indigo-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition shadow-lg"
              >
                <FileText size={18} /> Download PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default CreateBio;