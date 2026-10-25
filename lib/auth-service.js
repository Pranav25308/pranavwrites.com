// ==================== AUTH SERVICE ====================
// Handles authentication operations (login, logout, token verification)

import { createAdminToken, verifyAdminToken } from '@/lib/auth-server';

const ADMIN_CREDENTIALS = {
  username: process.env.ADMIN_USERNAME,
  password: process.env.ADMIN_PASSWORD
};

/**
 * Authenticate user with username and password
 * @param {string} username 
 * @param {string} password 
 * @returns {Promise<{success: boolean, token?: string, message?: string}>}
 */
export async function login(username, password) {
  try {
    if (
      ADMIN_CREDENTIALS.username &&
      ADMIN_CREDENTIALS.password &&
      username === ADMIN_CREDENTIALS.username &&
      password === ADMIN_CREDENTIALS.password
    ) {
      const token = createAdminToken(username);
      return {
        success: true,
        token,
        user: { username, role: 'admin' }
      };
    }

    return {
      success: false,
      message: 'Invalid credentials'
    };
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      message: 'Authentication failed'
    };
  }
}

/**
 * Verify if token is valid
 * @param {string} token 
 * @returns {Promise<boolean>}
 */
export async function verifyToken(token) {
  const result = verifyAdminToken(token);
  return result.valid;
}

/**
 * Logout user (invalidate token)
 * @param {string} token 
 * @returns {Promise<{success: boolean}>}
 */
export async function logout(token) {
  return { success: true };
}

export default {
  login,
  logout,
  verifyToken,
};
