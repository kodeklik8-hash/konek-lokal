
import { Business, Report, Broadcast, CategoryType } from './types';

const DB_KEY_BUSINESSES = 'koneklokal_businesses';
const DB_KEY_REPORTS = 'koneklokal_reports';
const DB_KEY_BROADCASTS = 'koneklokal_broadcasts';

const INITIAL_BUSINESSES: Business[] = [
  {
    id: '1',
    name: 'Damkar Sanggau',
    category: 'DARURAT',
    subCategory: 'Damkar',
    description: 'Layanan Pemadam Kebakaran Sanggau 24 Jam.',
    phone: '056421113',
    whatsapp: '6289684398391',
    operatingHours: '24 Jam',
    locationLink: '',
    province: 'Kalimantan Barat',
    city: 'Sanggau',
    district: 'Kapuas',
    address: 'Jl. Jend. Sudirman',
    tags: ['24 Jam', 'Gratis'],
    isEmergency: true,
    isVerified: true,
    clickCount: 0,
    createdAt: Date.now()
  },
  {
    id: '2',
    name: 'Polres Sanggau',
    category: 'DARURAT',
    subCategory: 'Polisi',
    description: 'Kepolisian Resor Sanggau melayani pengaduan masyarakat.',
    phone: '110',
    whatsapp: '6289684398391',
    operatingHours: '24 Jam',
    locationLink: '',
    province: 'Kalimantan Barat',
    city: 'Sanggau',
    district: 'Kapuas',
    address: 'Jl. Jend. Sudirman',
    tags: ['Polisi', 'Aman'],
    isEmergency: true,
    isVerified: true,
    clickCount: 0,
    createdAt: Date.now()
  }
];

export const dbService = {
  getBusinesses: (): Business[] => {
    const data = localStorage.getItem(DB_KEY_BUSINESSES);
    if (!data) {
      localStorage.setItem(DB_KEY_BUSINESSES, JSON.stringify(INITIAL_BUSINESSES));
      return INITIAL_BUSINESSES;
    }
    return JSON.parse(data);
  },
  
  saveBusiness: (business: Business) => {
    const businesses = dbService.getBusinesses();
    const index = businesses.findIndex(b => b.id === business.id);
    if (index >= 0) {
      businesses[index] = business;
    } else {
      businesses.push(business);
    }
    localStorage.setItem(DB_KEY_BUSINESSES, JSON.stringify(businesses));
  },

  deleteBusiness: (id: string) => {
    const businesses = dbService.getBusinesses().filter(b => b.id !== id);
    localStorage.setItem(DB_KEY_BUSINESSES, JSON.stringify(businesses));
  },

  getReports: (): Report[] => {
    const data = localStorage.getItem(DB_KEY_REPORTS);
    return data ? JSON.parse(data) : [];
  },

  addReport: (report: Omit<Report, 'id' | 'createdAt' | 'status'>) => {
    const reports = dbService.getReports();
    const newReport: Report = {
      ...report,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: Date.now(),
      status: 'PENDING'
    };
    reports.push(newReport);
    localStorage.setItem(DB_KEY_REPORTS, JSON.stringify(reports));
  },

  resolveReport: (id: string) => {
    const reports = dbService.getReports().filter(r => r.id !== id);
    localStorage.setItem(DB_KEY_REPORTS, JSON.stringify(reports));
  },

  getBroadcasts: (): Broadcast[] => {
    const data = localStorage.getItem(DB_KEY_BROADCASTS);
    return data ? JSON.parse(data) : [];
  },

  addBroadcast: (broadcast: Omit<Broadcast, 'id' | 'createdAt'>) => {
    const broadcasts = dbService.getBroadcasts();
    const newBroadcast: Broadcast = {
      ...broadcast,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: Date.now()
    };
    broadcasts.unshift(newBroadcast);
    localStorage.setItem(DB_KEY_BROADCASTS, JSON.stringify(broadcasts));
  },

  deleteBroadcast: (id: string) => {
    const broadcasts = dbService.getBroadcasts().filter(b => b.id !== id);
    localStorage.setItem(DB_KEY_BROADCASTS, JSON.stringify(broadcasts));
  },

  incrementClick: (id: string) => {
    const businesses = dbService.getBusinesses();
    const b = businesses.find(item => item.id === id);
    if (b) {
      b.clickCount = (b.clickCount || 0) + 1;
      localStorage.setItem(DB_KEY_BUSINESSES, JSON.stringify(businesses));
    }
  }
};
