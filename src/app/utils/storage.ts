/**
 * Simple storage utility for portfolio data persistence
 */

const STORAGE_KEYS = {
  PROJECTS: "portfolio_projects",
  GALLERY: "portfolio_gallery",
  IS_ADMIN: "portfolio_is_admin",
};

export const storage = {
  getProjects: <T>(initialData: T[]): T[] => {
    const saved = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    return saved ? JSON.parse(saved) : initialData;
  },

  saveProjects: <T>(projects: T[]) => {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
  },

  getGallery: <T>(): T[] => {
    const saved = localStorage.getItem(STORAGE_KEYS.GALLERY);
    return saved ? JSON.parse(saved) : [];
  },

  saveGallery: <T>(images: T[]) => {
    localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(images));
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
