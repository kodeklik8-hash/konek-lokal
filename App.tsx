
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { CATEGORIES, PARTNERS } from './constants';
import { Business, CategoryType } from './types';
import { dbService } from './dbService';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import CategoryDetail from './pages/CategoryDetail';
import Register from './pages/Register';
import Admin from './pages/Admin';

// Components
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [time, setTime] = useState(new Date().toLocaleString('id-ID'));

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date().toLocaleString('id-ID')), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <nav className="glass-effect fixed top-0 w-full z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex flex-col">
            <span className="text-2xl font-bold text-red-600 tracking-tighter">Konek LOKAL</span>
            <span className="text-[10px] uppercase font-semibold text-gray-500">Cepat Tanggap, Cepat Terhubung</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-red-600 font-medium">Home</Link>
            <Link to="/about" className="text-gray-700 hover:text-red-600 font-medium">Tentang</Link>
            <Link to="/register" className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition">Daftar Bisnis</Link>
            <div className="text-sm font-mono text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{time}</div>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-gray-600 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 py-4 px-4 space-y-4 shadow-xl">
          <Link to="/" onClick={() => setIsOpen(false)} className="block text-gray-700 font-medium">Home</Link>
          <Link to="/about" onClick={() => setIsOpen(false)} className="block text-gray-700 font-medium">Tentang</Link>
          <Link to="/register" onClick={() => setIsOpen(false)} className="block bg-red-600 text-white px-4 py-2 rounded-lg font-medium text-center">Daftar Bisnis</Link>
          <div className="text-center text-sm font-mono text-gray-500 py-2 border-t border-gray-100">{time}</div>
        </div>
      )}
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-gray-100 mt-12 py-10 border-t border-gray-200">
    <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div>
        <h3 className="text-xl font-bold text-red-600 mb-4">Konek LOKAL</h3>
        <p className="text-gray-600 text-sm">
          Menghubungkan warga dengan layanan darurat dan bisnis lokal terpercaya. 
          Satu pintu untuk segala kebutuhan Anda.
        </p>
      </div>
      <div>
        <h4 className="font-bold mb-4">Media Partners</h4>
        <div className="grid grid-cols-1 gap-2">
          {PARTNERS.map((p, i) => (
            <div key={i} className="flex justify-between items-center bg-white p-2 rounded border border-gray-200 text-xs">
              <span>{p.name}</span>
              <a href={p.link} target="_blank" rel="noreferrer" className="text-blue-600 font-bold">Follow</a>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h4 className="font-bold mb-4">Link Penting</h4>
        <ul className="text-sm space-y-2">
          <li><Link to="/about" className="text-gray-600 hover:text-red-600">Tentang Kami</Link></li>
          <li><Link to="/register" className="text-gray-600 hover:text-red-600">Daftarkan Bisnis</Link></li>
          <li><Link to="/admin" className="text-gray-400 hover:text-red-600">Admin Login</Link></li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-4 mt-8 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
      <p>Konek LOKAL - Dibuat oleh <strong>Sosok Informasi</strong></p>
      <p>©{new Date().getFullYear()} - Hak cipta dilindungi undang-undang</p>
    </div>
  </footer>
);

const FloatingSOS = () => (
  <Link to="/category/DARURAT" className="fixed bottom-6 right-6 z-[60] emergency-button bg-red-600 text-white flex items-center px-4 py-3 rounded-full shadow-2xl font-bold hover:bg-red-700 transition transform active:scale-95">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
    NOMOR DARURAT
  </Link>
);

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/category/:catName" element={<CategoryDetail />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <Footer />
        <FloatingSOS />
      </div>
    </Router>
  );
}
