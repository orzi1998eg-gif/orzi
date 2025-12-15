import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Order {
  id?: string;
  name: string;
  phone: string;
  governorate: string;
  area: string;
  full_address: string;
  bracelet_style: string;
  bracelet_image: string;
  created_at?: string;
  status?: string;
}
