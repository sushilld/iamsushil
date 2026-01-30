import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

const ADMIN_STORAGE_KEY = "is_portfolio_admin_active";

export const storage = {
  isAdmin: (): boolean => {
    return localStorage.getItem(ADMIN_STORAGE_KEY) === "true";
  },

  setAdmin: (status: boolean) => {
    localStorage.setItem(ADMIN_STORAGE_KEY, String(status));
  },

  // Projects
  getProjects: async <T>(initialData: T[]): Promise<T[]> => {
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("id", { ascending: true });

      if (error) throw error;
      return data && data.length > 0 ? data : initialData;
    } catch (err) {
      console.error("Failed to fetch projects from Supabase:", err);
      return initialData;
    }
  },

  saveProjects: async <T>(projects: T[]) => {
    try {
      // For Supabase, we usually upsert or replace. 
      // Given the current structure, we'll try to upsert the whole set or handle individually.
      // To keep it simple and match the previous logic of "saving the whole array":
      const { error } = await supabase
        .from("projects")
        .upsert(projects);

      if (error) throw error;
    } catch (err) {
      console.error("Failed to save projects to Supabase:", err);
    }
  },

  // Gallery
  getGallery: async (): Promise<any[]> => {
    try {
      const { data, error } = await supabase
        .from("gallery")
        .select("*")
        .order("id", { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (err) {
      console.error("Failed to fetch gallery from Supabase:", err);
      return [];
    }
  },

  saveGallery: async (images: any[]) => {
    try {
      const { error } = await supabase
        .from("gallery")
        .upsert(images);

      if (error) throw error;
    } catch (err) {
      console.error("Failed to save gallery to Supabase:", err);
    }
  },
};
