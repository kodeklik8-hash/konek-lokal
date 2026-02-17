
import React from 'react';
import { CategoryType } from './types';

export const CATEGORIES: { name: CategoryType; icon: React.ReactNode; color: string; sub: string[] }[] = [
  {
    name: 'DARURAT',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    color: 'bg-red-500',
    sub: ['Damkar', 'Polisi', 'Basarnas', 'Call Center']
  },
  {
    name: 'KESEHATAN',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    color: 'bg-green-500',
    sub: ['UGD 24 Jam', 'Ambulans', 'Apotek', 'Klinik']
  },
  {
    name: 'TRANSPORTASI',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
    color: 'bg-blue-500',
    sub: ['Nomor Taksi', 'Agen Bus', 'Rental Mobil']
  },
  {
    name: 'JASA LOKAL',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    color: 'bg-yellow-500',
    sub: ['Sedot WC', 'Tukang Ledeng', 'Service AC', 'Sol Sepatu']
  },
  {
    name: 'BISNIS & KULINER',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    color: 'bg-orange-500',
    sub: ['Restoran', 'UMKM Lokal', 'Bengkel', 'Laundry']
  },
  {
    name: 'INFO PENTING',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: 'bg-purple-500',
    sub: ['PLN', 'PDAM', 'Jadwal Sholat', 'Cuaca']
  }
];

export const PARTNERS = [
  { name: 'Kabar Kalbar', link: 'https://www.facebook.com/share/1SJT5HsaMk/' },
  { name: 'Daily Kalbar', link: 'https://www.facebook.com/share/14VeXjAKaH3/' },
  { name: 'Pontianak Terek', link: 'https://www.facebook.com/share/181wPxF4fp/' },
  { name: 'Sanggau Informasi', link: 'https://www.facebook.com/share/1BFyBsnZmx/' },
  { name: 'Landak Pusat Informasi', link: 'https://www.facebook.com/share/1Ak4mBLn4r/' },
  { name: 'Pinyuh Berbagi', link: 'https://www.facebook.com/share/182cGipthA/' },
  { name: 'Sambas Informasi', link: 'https://www.facebook.com/share/1CMxFYpChJ/' },
  { name: 'Sosok Informasi', link: 'https://www.facebook.com/share/1CNcbT8sh5/' },
  { name: 'Website Sosok Informasi', link: 'https://sosokinformasi.com/' }
];
