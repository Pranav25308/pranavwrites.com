// ==================== AUTH SERVICE ====================
// Handles authentication operations (login, logout, token verification)

import { getCollection, COLLECTIONS } from '../lib/db';
import { v4 as uuidv4 } from 'uuid';

// Hardcoded admin credentials (change in production)
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin'
};

/**
 * Authenticate user with username and password
 * @param {string} username 
 * @param {string} password 
 * @returns {Promise<{success: boolean, token?: string, message?: string}>}
 */
export async function login(username, password) {
  try {
    // Check against hardcoded credentials (for demo)
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      const token = uuidv4();
      return {
        success: true,
        token: token,
        user: { username, role: 'admin' }
      };
    }

    // Optional: Check against database users
    // const usersCollection = await getCollection(COLLECTIONS.USERS);
    // const user = await usersCollection.findOne({ username, password });
    // if (user) {
    //   return { success: true, token: uuidv4(), user };
    // }

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
  // For demo, any non-empty token is valid
  // In production, implement proper JWT verification
  return token && token.length > 0;
}

/**
 * Logout user (invalidate token)
 * @param {string} token 
 * @returns {Promise<{success: boolean}>}
 */
export async function logout(token) {
  // In production, add token to blacklist or delete from sessions
  return { success: true };
}

/**
 * Create a new user (admin only)
 * @param {Object} userData - { username, password, role }
 * @returns {Promise<{success: boolean, user?: Object}>}
 */
export async function createUser(userData) {
  try {
    const usersCollection = await getCollection(COLLECTIONS.USERS);
    
    // Check if user already exists
    const existingUser = await usersCollection.findOne({ username: userData.username });
    if (existingUser) {
      return { success: false, message: 'User already exists' };
    }

    const newUser = {
      id: uuidv4(),
      ...userData,
      createdAt: new Date().toISOString()
    };

    await usersCollection.insertOne(newUser);
    return { success: true, user: newUser };
  } catch (error) {
    console.error('Create user error:', error);
    return { success: false, message: 'Failed to create user' };
  }
}

export default {
  login,
  logout,
  verifyToken,
  createUser
};
