
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../constants';
import { dbService } from '../dbService';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    category: '' as any,
    subCategory: '',
    description: '',
    phone: '',
    whatsapp: '',
    operatingHours: '',
    locationLink: '',
    province: 'Kalimantan Barat',
    city: 'Sanggau',
    district: '',
    address: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate WhatsApp message to admin as well
    const waMsg = encodeURIComponent(
      `Halo Admin KonekLokal,\n\nSaya ingin mendaftarkan bisnis:\nNama: ${formData.name}\nKategori: ${formData.category}\nSub: ${formData.subCategory}\nWhatsApp: ${formData.whatsapp}\nWilayah: ${formData.city}, ${formData.district}`
    );
    
    dbService.saveBusiness({
      ...formData,
      id: Math.random().toString(36).substr(2, 9),
      tags: [],
      isEmergency: formData.category === 'DARURAT',
      isVerified: false,
      clickCount: 0,
      createdAt: Date.now()
    });

    alert('Terima kasih! Data Anda telah terkirim dan akan diverifikasi oleh tim kami.');
    window.open(`https://wa.me/6289684398391?text=${waMsg}`, '_blank');
    navigate('/');
  };

  const selectedCategory = CATEGORIES.find(c => c.name === formData.category);

  return (
    <div className="max-w-2xl mx-auto px-4 pb-20">
      <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Jadikan Bisnis Anda Lebih Dekat!</h1>
        <p className="text-gray-500 mb-8">Hanya butuh 3 menit untuk bergabung di direktori KonekLokal.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <section>
            <h3 className="text-lg font-bold text-red-600 mb-4 pb-2 border-b">1. Identitas Bisnis/Layanan</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Nama Bisnis/Jasa *</label>
                <input required type="text" className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200" placeholder="Contoh: Apotek Sehat" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Kategori Utama *</label>
                  <select required className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value as any, subCategory: ''})}>
                    <option value="">Pilih Kategori</option>
                    {CATEGORIES.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Sub-Kategori *</label>
                  <select required className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200" value={formData.subCategory} onChange={e => setFormData({...formData, subCategory: e.target.value})}>
                    <option value="">Pilih Sub</option>
                    {selectedCategory?.sub.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Deskripsi Singkat *</label>
                <textarea required maxLength={150} rows={3} className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200" placeholder="Maks 150 karakter..." value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-bold text-red-600 mb-4 pb-2 border-b">2. Informasi Kontak</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Nomor Telepon Utama *</label>
                <input required type="tel" className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200" placeholder="08..." value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value.replace(/\D/g, '')})} />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Nomor WhatsApp *</label>
                <input required type="tel" className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200" placeholder="628..." value={formData.whatsapp} onChange={e => setFormData({...formData, whatsapp: e.target.value.replace(/\D/g, '')})} />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Jam Operasional *</label>
                <input required type="text" className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200" placeholder="Contoh: 24 Jam atau 08.00 - 17.00" value={formData.operatingHours} onChange={e => setFormData({...formData, operatingHours: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Link Google Maps</label>
                <input type="url" className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200" placeholder="https://maps.app.goo.gl/..." value={formData.locationLink} onChange={e => setFormData({...formData, locationLink: e.target.value})} />
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-bold text-red-600 mb-4 pb-2 border-b">3. Wilayah Layanan</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Provinsi</label>
                <select className="w-full p-3 bg-gray-100 rounded-xl border border-gray-200" disabled><option>Kalimantan Barat</option></select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Kota/Kabupaten</label>
                <select className="w-full p-3 bg-gray-100 rounded-xl border border-gray-200" disabled><option>Sanggau</option></select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Kecamatan *</label>
                <input required type="text" className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200" placeholder="Contoh: Kapuas" value={formData.district} onChange={e => setFormData({...formData, district: e.target.value})} />
              </div>
            </div>
          </section>

          <button type="submit" className="w-full py-4 bg-red-600 text-white rounded-2xl font-bold text-lg shadow-xl hover:bg-red-700 transition transform active:scale-95">
            Daftar Sekarang
          </button>
        </form>
      </div>
    </div>
  );
}
