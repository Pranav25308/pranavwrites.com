// ==================== SETTINGS SERVICE ====================
// Handles site settings (navbar visibility, theme, etc.)

import { getCollection, COLLECTIONS } from '../lib/db';

const DEFAULT_SETTINGS = {
  navbar: {
    about: true,
    blogs: true,
    movies: true,
    books: true,
    products: true
  },
  theme: {
    primaryColor: 'blue',
    darkMode: false
  },
  site: {
    title: 'Portfolio',
    description: 'Personal Portfolio Website',
    logo: 'P'
  }
};

/**
 * Get all settings
 * @returns {Promise<Object>}
 */
export async function getSettings() {
  try {
    const collection = await getCollection(COLLECTIONS.SETTINGS);
    const settings = await collection.findOne({ type: 'main' });
    
    if (settings) {
      return settings;
    }
    
    // Return default settings if none exist
    return DEFAULT_SETTINGS;
  } catch (error) {
    console.error('Error fetching settings:', error);
    return DEFAULT_SETTINGS;
  }
}

/**
 * Get navbar settings specifically
 * @returns {Promise<Object>}
 */
export async function getNavbarSettings() {
  try {
    const settings = await getSettings();
    return settings.navbar || DEFAULT_SETTINGS.navbar;
  } catch (error) {
    console.error('Error fetching navbar settings:', error);
    return DEFAULT_SETTINGS.navbar;
  }
}

/**
 * Update settings
 * @param {Object} updateData - Settings to update
 * @returns {Promise<{success: boolean, settings?: Object}>}
 */
export async function updateSettings(updateData) {
  try {
    const collection = await getCollection(COLLECTIONS.SETTINGS);
    
    const update = {
      ...updateData,
      type: 'main',
      updatedAt: new Date().toISOString()
    };

    const result = await collection.findOneAndUpdate(
      { type: 'main' },
      { $set: update },
      { upsert: true, returnDocument: 'after' }
    );

    return { success: true, settings: result };
  } catch (error) {
    console.error('Error updating settings:', error);
    return { success: false, message: 'Failed to update settings' };
  }
}

/**
 * Update navbar settings specifically
 * @param {Object} navbarSettings - { about, blogs, movies, books, products }
 * @returns {Promise<{success: boolean}>}
 */
export async function updateNavbarSettings(navbarSettings) {
  try {
    const collection = await getCollection(COLLECTIONS.SETTINGS);
    
    const result = await collection.findOneAndUpdate(
      { type: 'main' },
      { 
        $set: { 
          navbar: navbarSettings,
          updatedAt: new Date().toISOString()
        } 
      },
      { upsert: true, returnDocument: 'after' }
    );

    return { success: true, settings: result };
  } catch (error) {
    console.error('Error updating navbar settings:', error);
    return { success: false, message: 'Failed to update navbar settings' };
  }
}

/**
 * Reset settings to default
 * @returns {Promise<{success: boolean}>}
 */
export async function resetSettings() {
  try {
    const collection = await getCollection(COLLECTIONS.SETTINGS);
    
    await collection.findOneAndUpdate(
      { type: 'main' },
      { $set: { ...DEFAULT_SETTINGS, type: 'main', updatedAt: new Date().toISOString() } },
      { upsert: true }
    );

    return { success: true, settings: DEFAULT_SETTINGS };
  } catch (error) {
    console.error('Error resetting settings:', error);
    return { success: false, message: 'Failed to reset settings' };
  }
}

/**
 * Get theme settings
 * @returns {Promise<Object>}
 */
export async function getThemeSettings() {
  try {
    const settings = await getSettings();
    return settings.theme || DEFAULT_SETTINGS.theme;
  } catch (error) {
    console.error('Error fetching theme settings:', error);
    return DEFAULT_SETTINGS.theme;
  }
}

/**
 * Update theme settings
 * @param {Object} themeSettings - { primaryColor, darkMode }
 * @returns {Promise<{success: boolean}>}
 */
export async function updateThemeSettings(themeSettings) {
  try {
    const collection = await getCollection(COLLECTIONS.SETTINGS);
    
    await collection.findOneAndUpdate(
      { type: 'main' },
      { 
        $set: { 
          theme: themeSettings,
          updatedAt: new Date().toISOString()
        } 
      },
      { upsert: true }
    );

    return { success: true };
  } catch (error) {
    console.error('Error updating theme settings:', error);
    return { success: false, message: 'Failed to update theme settings' };
  }
}

export default {
  getSettings,
  getNavbarSettings,
  updateSettings,
  updateNavbarSettings,
  resetSettings,
  getThemeSettings,
  updateThemeSettings,
  DEFAULT_SETTINGS
};
