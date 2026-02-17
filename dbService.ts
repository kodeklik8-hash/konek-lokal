
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Business, Report, Broadcast } from './types';

// Access environment variables
// Note: Vercel/Vite uses process.env or import.meta.env depending on the build tool.
// We check multiple common locations to ensure compatibility.
const supabaseUrl = process.env.VITE_SUPABASE_URL || (window as any).env?.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || (window as any).env?.VITE_SUPABASE_ANON_KEY;

// Initialize Supabase only if keys are present to avoid "supabaseUrl is required" error
export const supabase: SupabaseClient | null = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

if (!supabase) {
  console.warn("Konek LOKAL: Supabase configuration (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY) is missing. Application is running in offline-limited mode.");
}

export const dbService = {
  getBusinesses: async (): Promise<Business[]> => {
    if (!supabase) return [];
    
    const { data, error } = await supabase
      .from('businesses')
      .select('*')
      .order('name', { ascending: true });
    
    if (error) {
      console.error("Error fetching businesses:", error);
      return [];
    }
    
    return (data as any[]).map(b => ({
      ...b,
      subCategory: b.sub_category,
      operatingHours: b.operating_hours,
      locationLink: b.location_link,
      isEmergency: b.is_emergency,
      isVerified: b.is_verified,
      clickCount: b.click_count,
      createdAt: new Date(b.created_at).getTime()
    }));
  },
  
  saveBusiness: async (business: any) => {
    if (!supabase) throw new Error("Database not connected");

    const payload = {
      name: business.name,
      category: business.category,
      sub_category: business.subCategory,
      description: business.description,
      phone: business.phone,
      whatsapp: business.whatsapp,
      operating_hours: business.operatingHours,
      location_link: business.locationLink,
      province: business.province,
      city: business.city,
      district: business.district,
      address: business.address,
      tags: business.tags || [],
      is_emergency: business.isEmergency,
      is_verified: business.isVerified
    };

    const { error } = await supabase.from('businesses').insert([payload]);
    if (error) throw error;
  },

  deleteBusiness: async (id: string) => {
    if (!supabase) throw new Error("Database not connected");
    const { error } = await supabase.from('businesses').delete().eq('id', id);
    if (error) throw error;
  },

  getReports: async (): Promise<Report[]> => {
    if (!supabase) return [];
    const { data } = await supabase.from('reports').select('*').order('created_at', { ascending: false });
    return (data as any[] || []).map(r => ({
      ...r,
      businessId: r.business_id,
      businessName: r.business_name,
      createdAt: new Date(r.created_at).getTime()
    }));
  },

  addReport: async (report: any) => {
    if (!supabase) return;
    await supabase.from('reports').insert([{
      business_id: report.businessId,
      business_name: report.businessName,
      reason: report.reason
    }]);
  },

  resolveReport: async (id: string) => {
    if (!supabase) return;
    const { error } = await supabase.from('reports').update({ status: 'RESOLVED' }).eq('id', id);
    if (error) throw error;
  },

  getBroadcasts: async (): Promise<Broadcast[]> => {
    if (!supabase) return [];
    const { data } = await supabase.from('broadcasts').select('*').order('created_at', { ascending: false });
    return (data as any[] || []).map(b => ({
      ...b,
      createdAt: new Date(b.created_at).getTime()
    }));
  },

  addBroadcast: async (broadcast: any) => {
    if (!supabase) return;
    const { error } = await supabase.from('broadcasts').insert([broadcast]);
    if (error) throw error;
  },

  deleteBroadcast: async (id: string) => {
    if (!supabase) return;
    const { error } = await supabase.from('broadcasts').delete().eq('id', id);
    if (error) throw error;
  },

  incrementClick: async (id: string) => {
    if (!supabase) return;
    const { data } = await supabase.from('businesses').select('click_count').eq('id', id).single();
    if (data) {
      await supabase.from('businesses').update({ click_count: (data.click_count || 0) + 1 }).eq('id', id);
    }
  }
};
