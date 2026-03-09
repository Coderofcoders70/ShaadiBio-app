import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import html2pdf from 'html2pdf.js';
import { useBioStore } from '../store/useBioStore';
import DeleteModal from '../components/DeleteModal';
import BioDataTemplate from '../components/BioDataTemplate';
import { Plus, Edit3, FileText, Loader2, Download, Trash2, Crown } from 'lucide-react';

const Dashboard = () => {
  const { user, bioData, updateBioData, setProfilePhoto } = useBioStore();
  const [versions, setVersions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const componentRef = useRef<HTMLDivElement>(null);

  const fetchVersions = async () => {
    try {
      const { data } = await api.get('/biodata/all');
      setVersions(data);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVersions();
  }, []);

  const handleClone = async (id: string) => {
    try {
      await api.post(`/biodata/clone/${id}`);
      fetchVersions();
    } catch (err) {
      console.error(err);
      alert("Cloning failed");
    }
  };

  const handleDeleteTrigger = (id: string) => {
    setIdToDelete(id);
    setIsDeleteModalOpen(true);
  };

  // Triggered when user confirms inside the DeleteModal
  const handleConfirmDelete = async () => {
    if (!idToDelete) return;

    setIsDeleting(true);
    try {
      await api.delete(`/biodata/${idToDelete}`);
      setVersions(prev => prev.filter(v => v._id !== idToDelete));
      setIsDeleteModalOpen(false);
      setIdToDelete(null);
    } catch (err) {
      console.error(err);
      alert("Failed to delete profile");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDownloadSpecificPDF = (v: any) => {
    // Load specific version data into store for the template
    updateBioData('personal', v.personal);
    updateBioData('family', v.family);
    updateBioData('education', v.education);
    updateBioData('horoscope', v.horoscope);
    updateBioData('templateId', v.templateId);
    updateBioData('pdfPassword' as any, v.pdfPassword);
    setProfilePhoto(v.profilePhoto);

    setTimeout(() => {
      const element = componentRef.current;
      if (!element) return;
      const hasPassword = v.pdfPassword && v.pdfPassword.trim().length > 0;
      const opt = {
        margin: 0,
        filename: `${v.personal?.fullName || 'User'}_Biodata.pdf`,
        image: { type: 'jpeg' as const, quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, letterRendering: true },
        jsPDF: {
          unit: 'in', format: 'letter', orientation: 'portrait' as const,
          encryption: hasPassword ? {
            userPassword: v.pdfPassword,
            ownerPassword: v.pdfPassword,
            userPermissions: ["print", "modify", "copy", "annot-forms"]
          } : undefined
        }
      };
      html2pdf().set(opt).from(element).save();
    }, 150);
  };

  if (loading) return <div className="flex justify-center mt-20"><Loader2 className="animate-spin text-pink-600" size={48} /></div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        loading={isDeleting}
      />
      <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4 text-left">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Welcome, {user?.name}!</h1>
          <p className="text-gray-500">Manage your matrimonial profiles and versions.</p>
        </div>
        <Link to="/create" className="bg-pink-600 text-white px-8 py-3 rounded-full flex items-center space-x-2 hover:bg-pink-700 transition shadow-md">
          <Plus size={20} />
          <span className="font-bold">New Profile</span>
        </Link>
      </div>

      {user && !user.isPremium && (
        <div className="mb-10 p-6 rounded-3xl bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-xl border border-slate-800">
          <div className="relative z-10 text-left">
            <h2 className="text-xl font-bold flex items-center gap-2 mb-1">
              Upgrade to Premium <Crown className="text-amber-400 fill-current" size={20} />
            </h2>
            <p className="text-slate-400 text-sm max-w-md">
              Remove watermarks, secure PDFs with passwords, and create unlimited versions.
            </p>
          </div>
          <Link
            to="/upgrade"
            className="relative z-10 bg-amber-500 hover:bg-amber-400 text-slate-900 px-6 py-2.5 rounded-xl font-bold transition-all whitespace-nowrap text-sm shadow-lg shadow-amber-500/20"
          >
            Unlock All Features
          </Link>
          <Crown className="absolute -right-12 -bottom-12 text-white/5 w-48 h-48 rotate-12" />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {versions.map((v) => (
          <div key={v._id} className="relative bg-white p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 border-t-4 border-t-pink-600 flex flex-col justify-between text-left">

            {/* DELETE BUTTON (Restyled for visibility) */}
            <button
              onClick={() => handleDeleteTrigger(v._id)}
              className="absolute top-4 right-4 p-2 bg-gray-50 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
              title="Delete Profile"
            >
              <Trash2 size={18} />
            </button>

            <div>
              <div className="flex items-center space-x-4 mb-6">
                <div className="bg-pink-50 p-3 rounded-2xl text-pink-600">
                  <FileText size={24} />
                </div>
                <div className="max-w-[150px]">
                  <h3 className="font-bold text-lg truncate">{v.versionName || "Untitled"}</h3>
                  <p className="text-[11px] text-gray-400 uppercase font-bold tracking-wider">
                    {new Date(v.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex gap-2">
                <Link to={`/edit/${v._id}`} className="flex-1 bg-gray-50 text-gray-700 text-center py-2.5 rounded-xl font-bold hover:bg-gray-100 transition flex items-center justify-center space-x-1">
                  <Edit3 size={16} />
                  <span>Edit</span>
                </Link>

                <button onClick={() => handleClone(v._id)} className="flex-1 bg-indigo-50 text-indigo-600 text-center py-2.5 rounded-xl font-bold hover:bg-indigo-100 transition">
                  Clone
                </button>
              </div>

              <button onClick={() => handleDownloadSpecificPDF(v)} className="w-full bg-pink-600 text-white py-3 rounded-xl font-bold hover:bg-pink-700 transition flex items-center justify-center space-x-2 shadow-sm">
                <Download size={18} />
                <span>Download PDF</span>
              </button>
            </div>
          </div>
        ))}

        {versions.length === 0 && (
          <div className="col-span-full bg-white border-2 border-dashed border-gray-200 rounded-3xl p-16 text-center">
            <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="text-gray-300" size={32} />
            </div>
            <p className="text-gray-500 mb-6 font-medium">You haven't created any biodata versions yet.</p>
            <Link to="/create" className="text-pink-600 font-bold hover:text-pink-700 transition">Start creating your first profile →</Link>
          </div>
        )}
      </div>

      {/* HIDDEN PREVIEW FOR PDF GENERATION */}
      <div className="hidden">
        <div ref={componentRef}>
          <BioDataTemplate data={bioData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;