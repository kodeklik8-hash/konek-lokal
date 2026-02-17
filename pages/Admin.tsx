
import React, { useState, useEffect } from 'react';
import { dbService } from '../dbService';
import { Business, Report, Broadcast, CategoryType } from '../types';
import { CATEGORIES } from '../constants';

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [tab, setTab] = useState<'BUSINESS' | 'REPORTS' | 'BROADCAST'>('BUSINESS');

  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [broadcasts, setBroadcasts] = useState<Broadcast[]>([]);

  // Fix: dbService methods return Promises, so they must be awaited
  useEffect(() => {
    if (isLoggedIn) {
      const fetchData = async () => {
        setBusinesses(await dbService.getBusinesses());
        setReports(await dbService.getReports());
        setBroadcasts(await dbService.getBroadcasts());
      };
      fetchData();
    }
  }, [isLoggedIn]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'adminlokal') {
      setIsLoggedIn(true);
    } else {
      alert('Login Gagal!');
    }
  };

  const handleAddBroadcast = async (e: React.FormEvent) => {
    e.preventDefault();
    const target = e.target as any;
    await dbService.addBroadcast({
      title: target.title.value,
      description: target.desc.value,
      source: target.source.value,
      link: target.link.value
    });
    setBroadcasts(await dbService.getBroadcasts());
    target.reset();
    alert('Broadcast ditambahkan!');
  };

  // Fix: deleteBusiness now exists in dbService and is awaited
  const deleteBusiness = async (id: string) => {
    if (window.confirm('Hapus data ini?')) {
      await dbService.deleteBusiness(id);
      setBusinesses(await dbService.getBusinesses());
    }
  };

  // Fix: resolveReport now exists in dbService and is awaited
  const resolveReport = async (id: string) => {
    await dbService.resolveReport(id);
    setReports(await dbService.getReports());
  };

  if (!isLoggedIn) {
    return (
      <div className="max-w-md mx-auto mt-20 px-4">
        <div className="bg-white p-8 rounded-3xl shadow-2xl">
          <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="text"
              className="w-full p-4 bg-gray-50 rounded-xl border"
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            <input
              type="password"
              className="w-full p-4 bg-gray-50 rounded-xl border"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <button className="w-full py-4 bg-red-600 text-white rounded-xl font-bold">Login</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 pb-20">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button onClick={() => setIsLoggedIn(false)} className="text-gray-500 font-bold">Logout</button>
      </div>

      <div className="flex space-x-4 mb-8">
        <button onClick={() => setTab('BUSINESS')} className={`px-6 py-2 rounded-full font-bold transition ${tab === 'BUSINESS' ? 'bg-red-600 text-white' : 'bg-white border'}`}>Data Bisnis ({businesses.length})</button>
        <button onClick={() => setTab('REPORTS')} className={`px-6 py-2 rounded-full font-bold transition ${tab === 'REPORTS' ? 'bg-red-600 text-white' : 'bg-white border'}`}>Laporan ({reports.length})</button>
        <button onClick={() => setTab('BROADCAST')} className={`px-6 py-2 rounded-full font-bold transition ${tab === 'BROADCAST' ? 'bg-red-600 text-white' : 'bg-white border'}`}>Broadcast Info</button>
      </div>

      {tab === 'BUSINESS' && (
        <div className="bg-white rounded-3xl overflow-hidden shadow-xl border">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 border-b">Nama</th>
                <th className="p-4 border-b">Kategori</th>
                <th className="p-4 border-b">Kontak</th>
                <th className="p-4 border-b">Hits</th>
                <th className="p-4 border-b">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {businesses.map(b => (
                <tr key={b.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    <div className="font-bold">{b.name}</div>
                    <div className="text-xs text-gray-500">{b.district}</div>
                  </td>
                  <td className="p-4">
                    <span className="text-xs font-bold px-2 py-1 bg-gray-100 rounded-full">{b.subCategory}</span>
                  </td>
                  <td className="p-4">
                    <div className="text-sm font-mono">{b.phone}</div>
                  </td>
                  <td className="p-4 text-center font-bold text-red-600">{b.clickCount || 0}</td>
                  <td className="p-4">
                    <button onClick={() => deleteBusiness(b.id)} className="text-red-500 font-bold hover:underline">Hapus</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'REPORTS' && (
        <div className="space-y-4">
          {reports.length === 0 && <p className="text-center py-10 bg-white rounded-3xl">Tidak ada laporan masuk.</p>}
          {reports.map(r => (
            <div key={r.id} className="bg-white p-6 rounded-2xl border-l-4 border-red-500 shadow-sm flex justify-between items-center">
              <div>
                <h4 className="font-bold text-lg">{r.businessName}</h4>
                <p className="text-red-600 font-medium">{r.reason}</p>
                <p className="text-xs text-gray-400 mt-1">{new Date(r.createdAt).toLocaleString()}</p>
              </div>
              <button onClick={() => resolveReport(r.id)} className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-bold">Tandai Selesai</button>
            </div>
          ))}
        </div>
      )}

      {tab === 'BROADCAST' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-3xl shadow-xl border">
            <h3 className="text-xl font-bold mb-6">Tambah Broadcast Baru</h3>
            <form onSubmit={handleAddBroadcast} className="space-y-4">
              <input name="title" required placeholder="Judul Berita" className="w-full p-4 bg-gray-50 border rounded-xl" />
              <textarea name="desc" required placeholder="Deskripsi Berita" rows={4} className="w-full p-4 bg-gray-50 border rounded-xl" />
              <input name="source" required placeholder="Sumber (Misal: Sanggau Informasi)" className="w-full p-4 bg-gray-50 border rounded-xl" />
              <input name="link" placeholder="Link Berita (Opsional)" className="w-full p-4 bg-gray-50 border rounded-xl" />
              <button type="submit" className="w-full py-4 bg-red-600 text-white font-bold rounded-xl shadow-lg">Posting Broadcast</button>
            </form>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold">Daftar Broadcast Aktif</h3>
            {broadcasts.map(b => (
              <div key={b.id} className="bg-white p-6 rounded-2xl border shadow-sm flex justify-between items-start">
                <div>
                  <h4 className="font-bold">{b.title}</h4>
                  <p className="text-xs text-gray-500 mt-1">{b.source}</p>
                </div>
                {/* Fix: deleteBroadcast now exists in dbService and is awaited */}
                <button onClick={async () => {
                  if (window.confirm('Hapus broadcast ini?')) {
                    await dbService.deleteBroadcast(b.id);
                    setBroadcasts(await dbService.getBroadcasts());
                  }
                }} className="text-red-500 text-xs font-bold">Hapus</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
