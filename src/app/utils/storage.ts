/**
 * Simple storage utility for portfolio data persistence
 */

const API_BASE = "http://localhost:3001/api";

const STORAGE_KEYS = {
  IS_ADMIN: "portfolio_is_admin",
};

export const storage = {
  getProjects: async <T>(initialData: T[]): Promise<T[]> => {
    try {
      const response = await fetch(`${API_BASE}/projects`);
      const data = await response.json();
      return data && data.length > 0 ? data : initialData;
    } catch (err) {
      console.error("Failed to fetch projects:", err);
      return initialData;
    }
  },

  saveProjects: async <T>(projects: T[]) => {
    try {
      await fetch(`${API_BASE}/projects`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projects),
      });
    } catch (err) {
      console.error("Failed to save projects:", err);
    }
  },

  getGallery: async <T>(): Promise<T[]> => {
    try {
      const response = await fetch(`${API_BASE}/gallery`);
      const data = await response.json();
      return data || [];
    } catch (err) {
      console.error("Failed to fetch gallery:", err);
      return [];
    }
  },

  saveGallery: async <T>(images: T[]) => {
    try {
      await fetch(`${API_BASE}/gallery`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(images),
      });
    } catch (err) {
      console.error("Failed to save gallery:", err);
    }
  },

  isAdmin: (): boolean => {
    return localStorage.getItem(STORAGE_KEYS.IS_ADMIN) === "true";
  },

  setAdmin: (isAdmin: boolean) => {
    if (isAdmin) {
      localStorage.setItem(STORAGE_KEYS.IS_ADMIN, "true");
    } else {
      localStorage.removeItem(STORAGE_KEYS.IS_ADMIN);
    }
  },
};
