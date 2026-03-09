import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Contact from './pages/Contact';
import Upgrade from './pages/Upgrade';
import Register from './pages/Register';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import CreateBio from './pages/CreateBio';
import Dashboard from './pages/Dashboard';
import { useBioStore } from './store/useBioStore';
import AdminDashboard from './pages/AdminDashboard';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  const { user } = useBioStore();

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
            <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />

            <Route path="/admin" element={user?.isAdmin ? <AdminDashboard /> : <Navigate to="/dashboard" />} />
        
            <Route path="/create" element={<CreateBio />} />
            <Route path="/edit/:id" element={user ? <CreateBio /> : <Navigate to="/login" />} />
            <Route path="/upgrade" element={user ? <Upgrade /> : <Navigate to="/login" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;