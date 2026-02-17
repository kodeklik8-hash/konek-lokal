
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../constants';
import { dbService } from '../dbService';
import { Broadcast, Business } from '../types';

export default function Home() {
  const [search, setSearch] = useState('');
  const [broadcasts, setBroadcasts] = useState<Broadcast[]>([]);
  const [suggestions, setSuggestions] = useState<Business[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setBroadcasts(dbService.getBroadcasts());
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      // Find category first
      const foundCat = CATEGORIES.find(c => 
        c.name.toLowerCase().includes(search.toLowerCase()) || 
        c.sub.some(s => s.toLowerCase().includes(search.toLowerCase()))
      );
      if (foundCat) {
        navigate(`/category/${foundCat.name}?q=${search}`);
      } else {
        navigate(`/category/JASA LOKAL?q=${search}`);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 pb-20">
      {/* Broadcast Banner */}
      {broadcasts.length > 0 && (
        <div className="mb-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r shadow-sm">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-bold text-yellow-800">
                {broadcasts[0].title}
              </p>
              <p className="text-xs text-yellow-700 mt-1">
                {broadcasts[0].description} - <span className="italic font-medium">{broadcasts[0].source}</span>
              </p>
              {broadcasts[0].link && (
                <a href={broadcasts[0].link} target="_blank" rel="noreferrer" className="text-xs font-bold text-yellow-900 underline mt-1 inline-block">Baca selengkapnya</a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Hero Search */}
      <div className="text-center mt-8 mb-12">
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">Cari Layanan Lokal</h1>
        <p className="text-gray-600 mb-8 max-w-lg mx-auto">Butuh Damkar, Taksi, atau Tukang AC? Temukan semuanya dengan cepat di Konek LOKAL.</p>
        
        <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto group">
          <input
            type="text"
            className="w-full px-6 py-5 rounded-2xl shadow-2xl border-2 border-gray-100 focus:border-red-500 text-lg transition-all pr-16"
            placeholder="Cari Damkar, Taksi, atau Tukang AC..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit" className="absolute right-3 top-3 bottom-3 px-6 bg-red-600 text-white rounded-xl font-bold shadow-lg hover:bg-red-700 active:scale-95 transition">
            Cari
          </button>
        </form>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {CATEGORIES.map((cat, i) => (
          <Link
            key={i}
            to={`/category/${cat.name}`}
            className="group flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-red-200 transition-all transform hover:-translate-y-1"
          >
            <div className={`${cat.color} text-white p-4 rounded-2xl mb-4 group-hover:scale-110 transition-transform`}>
              {cat.icon}
            </div>
            <span className="font-bold text-center text-sm md:text-base text-gray-800">{cat.name}</span>
          </Link>
        ))}
      </div>

      <div className="mt-16 bg-red-600 rounded-3xl p-8 text-white flex flex-col md:flex-row items-center justify-between shadow-2xl overflow-hidden relative">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-2">Punya Bisnis atau Jasa?</h2>
          <p className="text-red-100 max-w-md mb-6">Jadikan usaha Anda lebih dekat dengan pelanggan. Daftar sekarang GRATIS untuk layanan darurat!</p>
          <Link to="/register" className="bg-white text-red-600 px-6 py-3 rounded-xl font-bold hover:bg-red-50 transition shadow-lg inline-block">Daftar Sekarang</Link>
        </div>
        <div className="absolute right-0 top-0 opacity-10 pointer-events-none transform translate-x-10 -translate-y-10">
          <svg className="w-64 h-64" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
        </div>
      </div>
    </div>
  );
}
