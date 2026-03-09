import { useEffect, useState } from 'react';
import api from '../api/axios';
import { Users, Activity, FileText, Crown, Loader2, Trash2 } from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'stats' | 'users'>('stats');

  useEffect(() => {
    if (activeTab === 'users') {
      const fetchUsers = async () => {
        const { data } = await api.get('/admin/users');
        setUsers(data);
      };
      fetchUsers();
    }
  }, [activeTab]);

  const handleToggle = async (id: string, field: 'isPremium' | 'isAdmin', value: boolean) => {
    try {
      await api.put(`/admin/users/${id}`, { [field]: !value });
      setUsers(users.map(u => u._id === id ? { ...u, [field]: !value } : u));
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/admin/stats');
        if (response.data) {
          setStats(response.data);
        }
      } catch (err: any) {
        console.error("Admin Fetch Error:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen lg:pl-64">
      <Loader2 className="animate-spin text-pink-600" size={48} />
    </div>
  );

  if (!stats) return (
    <div className="text-center mt-20 font-bold text-red-500 lg:pl-64">
      Access Denied: Admin Privileges Required
    </div>
  );

  return (
    /* The lg:pl-64 matches the sidebar width (w-64) 
      This pushes the content to the right only on large screens 
    */
    <div className="lg:pl-64 min-h-screen bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-left">

        {/* Header Section */}
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Admin Overview</h1>
          <p className="text-slate-500 mt-2 font-medium">Real-time system-wide statistics and user activity.</p>
        </div>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Total Users Card */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex items-center justify-between group hover:shadow-md transition-shadow">
            <div>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Total Users</p>
              <p className="text-3xl font-black text-slate-800">{stats.totalUsers}</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-2xl text-blue-600 group-hover:scale-110 transition-transform">
              <Users size={28} />
            </div>
          </div>

          {/* Total Biodatas Card */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex items-center justify-between group hover:shadow-md transition-shadow">
            <div>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Total Biodatas</p>
              <p className="text-3xl font-black text-slate-800">{stats.totalBioDatas}</p>
            </div>
            <div className="p-4 bg-pink-50 rounded-2xl text-pink-600 group-hover:scale-110 transition-transform">
              <FileText size={28} />
            </div>
          </div>

          {/* Premium Users Card */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex items-center justify-between group hover:shadow-md transition-shadow">
            <div>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Premium Users</p>
              <p className="text-3xl font-black text-slate-800">{stats.premiumUsers}</p>
            </div>
            <div className="p-4 bg-amber-50 rounded-2xl text-amber-500 group-hover:scale-110 transition-transform">
              <Crown size={28} />
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('stats')}
            className={`px-6 py-2 rounded-xl font-bold ${activeTab === 'stats' ? 'bg-slate-900 text-white' : 'bg-white text-gray-500 border'}`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-6 py-2 rounded-xl font-bold ${activeTab === 'users' ? 'bg-slate-900 text-white' : 'bg-white text-gray-500 border'}`}
          >
            Manage Users
          </button>
        </div>

        {activeTab === 'users' && (
          <div className="bg-white rounded-3xl shadow-sm border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-500 uppercase text-[10px] tracking-widest">
                  <tr>
                    <th className="p-4 text-left">User</th>
                    <th className="p-4 text-left">Status</th>
                    {/* HIDE ON MOBILE, SHOW ON DESKTOP */}
                    <th className="p-4 text-center hidden md:table-cell">Admin</th>
                    <th className="p-4 text-center hidden md:table-cell">Premium</th>
                    <th className="p-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {users.map(u => (
                    <tr key={u._id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4">
                        <div className="max-w-[120px] sm:max-w-none">
                          <p className="font-bold text-slate-800 truncate">{u.name}</p>
                          <p className="text-[10px] text-gray-400 truncate">{u.email}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-md text-[9px] font-bold uppercase ${u.isPremium ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-500'}`}>
                          {u.isPremium ? 'Premium' : 'Free'}
                        </span>
                      </td>
                      {/* HIDE ON MOBILE, SHOW ON DESKTOP */}
                      <td className="p-4 text-center hidden md:table-cell">
                        <input
                          type="checkbox"
                          checked={u.isAdmin}
                          onChange={() => handleToggle(u._id, 'isAdmin', u.isAdmin)}
                          className="w-4 h-4 accent-slate-900 cursor-pointer"
                        />
                      </td>
                      <td className="p-4 text-center hidden md:table-cell">
                        <input
                          type="checkbox"
                          checked={u.isPremium}
                          onChange={() => handleToggle(u._id, 'isPremium', u.isPremium)}
                          className="w-4 h-4 accent-amber-500 cursor-pointer"
                        />
                      </td>
                      <td className="p-4 text-center">
                        <button
                          className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition"
                          onClick={() => {/* Add delete logic here if needed */ }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Recent Activity Section */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-pink-600 rounded-lg text-white">
                <Activity size={16} />
              </div>
              <h2 className="font-bold text-slate-800">Recent Activity Feed</h2>
            </div>
          </div>

          {/* MOBILE VIEW: Card List (Stacks columns into rows) */}
          <div className="md:hidden divide-y divide-slate-100">
            {stats.recentActivity.map((act: any) => (
              <div key={act._id} className="p-5 space-y-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">
                      {act.userId?.name?.charAt(0) || '?'}
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">User</p>
                      <p className="font-bold text-slate-700 text-sm">{act.userId?.name || 'Deleted User'}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Date</p>
                    <p className="text-xs text-slate-500">{new Date(act.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Version Name</p>
                  <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold bg-indigo-50 text-indigo-700">
                    {act.versionName || 'Untitled Version'}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* DESKTOP VIEW: Standard Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-slate-400 border-b border-slate-50">
                  <th className="px-8 py-4 text-left font-bold uppercase tracking-wider">User</th>
                  <th className="px-8 py-4 text-left font-bold uppercase tracking-wider">Profile Version</th>
                  <th className="px-8 py-4 text-left font-bold uppercase tracking-wider">Created Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {stats.recentActivity.map((act: any) => (
                  <tr key={act._id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">
                          {act.userId?.name?.charAt(0) || '?'}
                        </div>
                        <span className="font-semibold text-slate-700">{act.userId?.name || 'Deleted User'}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700">
                        {act.versionName || 'Untitled Version'}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-slate-500 font-medium">
                      {new Date(act.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {stats.recentActivity.length === 0 && (
            <div className="p-10 text-center text-slate-400 italic">No recent activity found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;