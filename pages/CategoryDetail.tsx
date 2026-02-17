
import React, { useState, useEffect } from 'react';
// Added Link to the imports from react-router-dom
import { useParams, useSearchParams, useNavigate, Link } from 'react-router-dom';
import { CATEGORIES } from '../constants';
import { dbService } from '../dbService';
import { Business, CategoryType } from '../types';

export default function CategoryDetail() {
  const { catName } = useParams<{ catName: string }>();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const navigate = useNavigate();

  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [filtered, setFiltered] = useState<Business[]>([]);
  const [subFilter, setSubFilter] = useState('Semua');

  const category = CATEGORIES.find(c => c.name === catName);

  useEffect(() => {
    const data = dbService.getBusinesses().filter(b => b.category === catName);
    setBusinesses(data);
    
    let res = data;
    if (query) {
      res = res.filter(b => 
        b.name.toLowerCase().includes(query.toLowerCase()) ||
        b.description.toLowerCase().includes(query.toLowerCase()) ||
        b.tags.some(t => t.toLowerCase().includes(query.toLowerCase()))
      );
    }
    setFiltered(res);
  }, [catName, query]);

  const handleSubFilter = (sub: string) => {
    setSubFilter(sub);
    if (sub === 'Semua') {
      setFiltered(businesses);
    } else {
      setFiltered(businesses.filter(b => b.subCategory === sub));
    }
  };

  const handleCall = (b: Business) => {
    dbService.incrementClick(b.id);
    window.location.href = `tel:${b.phone}`;
  };

  const handleWA = (b: Business) => {
    dbService.incrementClick(b.id);
    const text = encodeURIComponent(`Halo ${b.name}, saya menemukan nomor Anda melalui Konek LOKAL.`);
    window.open(`https://wa.me/${b.whatsapp}?text=${text}`, '_blank');
  };

  const handleReport = (b: Business) => {
    if (window.confirm(`Laporkan nomor ${b.name} sebagai tidak aktif?`)) {
      dbService.addReport({
        businessId: b.id,
        businessName: b.name,
        reason: 'Nomor tidak aktif / salah'
      });
      alert('Terima kasih, laporan Anda telah diterima dan akan diverifikasi oleh admin.');
      navigate('/');
    }
  };

  const handleShare = (b: Business) => {
    const text = encodeURIComponent(`Info Kontak Penting: ${b.name}\n${b.description}\nTelepon: ${b.phone}\nLink: ${window.location.origin}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  if (!category) return <div>Category not found</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 pb-20">
      <div className={`mb-8 p-8 rounded-3xl ${category.color} text-white shadow-xl`}>
        <div className="flex items-center mb-4">
          <div className="bg-white/20 p-3 rounded-2xl mr-4">{category.icon}</div>
          <h1 className="text-3xl font-bold">{catName}</h1>
        </div>
        <p className="text-white/80">Menampilkan layanan terpercaya untuk kategori {catName}.</p>
      </div>

      {/* Sub Category Tabs */}
      <div className="flex overflow-x-auto pb-4 mb-8 space-x-2 scrollbar-hide">
        <button
          onClick={() => handleSubFilter('Semua')}
          className={`px-6 py-2 rounded-full whitespace-nowrap font-medium transition ${subFilter === 'Semua' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
        >
          Semua
        </button>
        {category.sub.map((sub, i) => (
          <button
            key={i}
            onClick={() => handleSubFilter(sub)}
            className={`px-6 py-2 rounded-full whitespace-nowrap font-medium transition ${subFilter === sub ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            {sub}
          </button>
        ))}
      </div>

      {/* Business List */}
      <div className="space-y-4">
        {filtered.length > 0 ? (
          filtered.map((b) => (
            <div key={b.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition">
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold flex items-center">
                    {b.name}
                    {b.isVerified && (
                      <span className="ml-2 text-blue-500">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                      </span>
                    )}
                  </h3>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-gray-100 px-2 py-1 rounded-full text-gray-500">{b.subCategory}</span>
                </div>
                <p className="text-gray-600 text-sm mb-4">{b.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-md">🕒 {b.operatingHours}</span>
                  <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-md">📍 {b.city}, {b.district}</span>
                </div>
                
                {/* Actions */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  <button onClick={() => handleCall(b)} className="flex items-center justify-center bg-gray-900 text-white px-4 py-3 rounded-xl font-bold text-sm hover:bg-black transition">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    Telepon
                  </button>
                  <button onClick={() => handleWA(b)} className="flex items-center justify-center bg-green-500 text-white px-4 py-3 rounded-xl font-bold text-sm hover:bg-green-600 transition">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.025 3.207l-.695 2.54 2.599-.682c.884.581 1.908.974 3.031.974 3.185 0 5.769-2.587 5.77-5.768 0-3.181-2.587-5.737-5.762-5.737zm3.377 8.272c-.14.393-.811.758-1.112.808-.287.047-.654.08-1.102-.066-.233-.076-.515-.173-1.11-.422-2.514-1.044-4.141-3.605-4.266-3.77-.126-.166-1.036-1.378-1.036-2.628 0-1.25.654-1.866.886-2.126.233-.26.515-.326.686-.326.171 0 .341.001.49.009.155.008.364-.058.57.442.213.517.731 1.78.794 1.912.063.132.105.287.017.462-.088.176-.132.302-.263.454-.131.152-.276.339-.393.454-.132.132-.271.276-.117.54.154.263.684 1.127 1.47 1.828.981.876 1.801 1.147 2.064 1.278.263.131.417.11.57-.066.154-.176.658-.773.834-1.038.176-.263.351-.22.593-.132.242.088 1.54.726 1.804.858.263.132.44.198.505.309.066.111.066.643-.074 1.036z" /></svg>
                    WhatsApp
                  </button>
                  <button onClick={() => handleShare(b)} className="flex items-center justify-center bg-blue-50 text-blue-600 px-4 py-3 rounded-xl font-bold text-sm hover:bg-blue-100 transition">
                    Bagikan
                  </button>
                  <button onClick={() => handleReport(b)} className="flex items-center justify-center bg-red-50 text-red-600 px-4 py-3 rounded-xl font-bold text-sm hover:bg-red-100 transition">
                    Lapor Off
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
            <p className="text-gray-500 mb-4">Maaf, layanan yang Anda cari belum tersedia.</p>
            <Link to="/register" className="text-red-600 font-bold underline">Bantu kami mendaftarkannya!</Link>
          </div>
        )}
      </div>
    </div>
  );
}
