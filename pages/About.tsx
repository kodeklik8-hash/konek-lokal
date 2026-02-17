
import React from 'react';

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 pb-20">
      <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-8 tracking-tight">Menghubungkan Harapan, Memudahkan Kehidupan Lokal.</h1>
        
        <div className="prose prose-red text-gray-700 space-y-6">
          <p className="text-lg leading-relaxed">
            Di era yang serba cepat ini, mencari informasi yang akurat dan responsif seringkali menjadi tantangan, terutama di saat-saat mendesak. <strong>KonekLokal</strong> hadir sebagai jembatan digital yang menghubungkan setiap warga dengan layanan penting di sekitar mereka.
          </p>
          
          <p className="text-lg leading-relaxed">
            Kami percaya bahwa akses terhadap nomor darurat, fasilitas kesehatan, dan layanan publik tidak boleh sulit. Begitu juga dengan dukungan terhadap ekonomi lokal—usaha kecil dan jasa di sekitar kita layak untuk ditemukan dengan mudah.
          </p>

          <div className="bg-red-50 p-6 rounded-2xl">
            <h2 className="text-xl font-bold text-red-800 mb-4">Mengapa KonekLokal?</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="bg-red-200 text-red-700 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1 mr-3 text-xs font-bold">1</span>
                <span><strong>Cepat & Ringan:</strong> Didesain khusus untuk akses mobile yang instan, bahkan saat koneksi internet Anda terbatas.</span>
              </li>
              <li className="flex items-start">
                <span className="bg-red-200 text-red-700 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1 mr-3 text-xs font-bold">2</span>
                <span><strong>Terpercaya:</strong> Informasi yang kami sajikan melalui proses verifikasi berkala untuk memastikan nomor yang Anda hubungi tetap aktif.</span>
              </li>
              <li className="flex items-start">
                <span className="bg-red-200 text-red-700 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1 mr-3 text-xs font-bold">3</span>
                <span><strong>Satu Pintu:</strong> Mulai dari mencari Ambulans di tengah malam, hingga mencari teknisi AC di pagi hari, semua ada di sini.</span>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Misi Kami</h2>
            <p className="text-lg leading-relaxed">
              Menjadikan setiap sudut kota lebih aman dan setiap bisnis lokal lebih berdaya melalui koneksi informasi yang tepat sasaran.
            </p>
          </div>

          <div className="pt-10 border-t border-gray-100 mt-12">
            <h2 className="text-xl font-bold mb-4">Kontak Kami</h2>
            <p className="text-gray-600 mb-2">Jika Anda ingin merubah data bisnis Anda, silakan hubungi:</p>
            <div className="flex flex-col space-y-2">
              <a href="https://wa.me/6289684398391" className="text-red-600 font-bold hover:underline">WhatsApp: +62 896-8439-8391</a>
              <a href="mailto:sosokinformasi.group@gmail.com" className="text-red-600 font-bold hover:underline">Email: sosokinformasi.group@gmail.com</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
