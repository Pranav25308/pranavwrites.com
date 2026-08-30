// Global site-level settings defaults (DB overrides these via /api/settings)

export const DEFAULT_SETTINGS = {
  navbar: { about: true, blogs: true, movies: true, books: true, products: true, projects: true, contact: true },
  features: { chatbot: true },
  ads: { adsenseClientId: '' },
};

// Backwards-compatible alias
export const DUMMY_SETTINGS = DEFAULT_SETTINGS;
