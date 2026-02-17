
export type CategoryType = 'DARURAT' | 'KESEHATAN' | 'TRANSPORTASI' | 'JASA LOKAL' | 'BISNIS & KULINER' | 'INFO PENTING';

export interface Business {
  id: string;
  name: string;
  category: CategoryType;
  subCategory: string;
  description: string;
  phone: string;
  whatsapp: string;
  operatingHours: string;
  locationLink: string;
  province: string;
  city: string;
  district: string;
  address: string;
  tags: string[];
  isEmergency: boolean;
  isVerified: boolean;
  clickCount: number;
  createdAt: number;
}

export interface Report {
  id: string;
  businessId: string;
  businessName: string;
  reason: string;
  status: 'PENDING' | 'RESOLVED';
  createdAt: number;
}

export interface Broadcast {
  id: string;
  title: string;
  description: string;
  source: string;
  link: string;
  createdAt: number;
}
