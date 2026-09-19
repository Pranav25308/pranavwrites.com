// // ==================== DATABASE CONNECTION ====================
// // This file handles MongoDB database connection
// // Make sure MONGO_URL is set in your .env file

// import { MongoClient } from 'mongodb';

// const MONGO_URL = process.env.MONGO_URL;
// const DB_NAME = process.env.DB_NAME || 'pranavWrites';

// if (!MONGO_URL && process.env.NODE_ENV !== 'test') {
//   console.warn('Warning: MONGO_URL is not defined in environment variables');
// }

// let client;
// let clientPromise;

// if (process.env.NODE_ENV === 'development') {
//   if (!global._mongoClientPromise) {
//     client = new MongoClient(MONGO_URL);
//     global._mongoClientPromise = client.connect();
//   }
//   clientPromise = global._mongoClientPromise;
// } else {
//   if (!global._mongoClientPromise) {
//     client = new MongoClient(MONGO_URL);
//     global._mongoClientPromise = client.connect();
//   }
//   clientPromise = global._mongoClientPromise;
// }

// /**
//  * Connect to MongoDB database
//  * @returns {Promise<Db>} MongoDB database instance
//  */
// export async function connectToDatabase() {
//   if (!MONGO_URL) {
//     throw new Error('MONGO_URL environment variable is missing');
//   }
//   const connectedClient = await clientPromise;
//   return connectedClient.db(DB_NAME);
// }

// /**
//  * Get a specific collection from the database
//  * @param {string} collectionName - Name of the collection
//  * @returns {Promise<Collection>} MongoDB collection
//  */
// export async function getCollection(collectionName) {
//   const database = await connectToDatabase();
//   return database.collection(collectionName);
// }

// /**
//  * Close the database connection
//  */
// export async function closeConnection() {
//   if (client) {
//     await client.close();
//     client = null;
//     db = null;
//     console.log('MongoDB connection closed');
//   }
// }

// /**
//  * Check if database is connected
//  * @returns {boolean}
//  */
// export function isConnected() {
//   return client !== null && db !== null;
// }

// // Collection names as constants
// export const COLLECTIONS = {
//   REVIEWS: 'reviews',
//   CONTACTS: 'contacts',
//   ROLES: 'roles',
//   SETTINGS: 'settings',
//   ANALYTICS: 'analytics',
//   USERS: 'users',
//   ABOUT: 'about'
// };

// export default {
//   connectToDatabase,
//   getCollection,
//   closeConnection,
//   isConnected,
//   COLLECTIONS
// };


// ==================== DATABASE CONNECTION ====================
// This file handles MongoDB database connection.
// Required environment variables:
// - MONGO_URL
// - DB_NAME

import { MongoClient } from 'mongodb';

const MONGO_URL = process.env.MONGO_URL;
const DB_NAME = process.env.DB_NAME;

if (process.env.NODE_ENV !== 'test') {
  if (!MONGO_URL) {
    throw new Error('MONGO_URL environment variable is missing');
  }

  if (!DB_NAME) {
    throw new Error('DB_NAME environment variable is missing');
  }
}

let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(MONGO_URL);
  global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

/**
 * Connect to MongoDB database
 * @returns {Promise<Db>} MongoDB database instance
 */
export async function connectToDatabase() {
  if (!MONGO_URL) {
    throw new Error('MONGO_URL environment variable is missing');
  }

  if (!DB_NAME) {
    throw new Error('DB_NAME environment variable is missing');
  }

  const connectedClient = await clientPromise;
  return connectedClient.db(DB_NAME);
}

/**
 * Get a specific collection from the database
 * @param {string} collectionName - Name of the collection
 * @returns {Promise<Collection>} MongoDB collection
 */
export async function getCollection(collectionName) {
  const database = await connectToDatabase();
  return database.collection(collectionName);
}

/**
 * Close the database connection
 */
export async function closeConnection() {
  if (client) {
    await client.close();
    client = null;
    global._mongoClientPromise = null;
    clientPromise = null;
    console.log('MongoDB connection closed');
  }
}

/**
 * Check if database is connected
 * @returns {boolean}
 */
export function isConnected() {
  return client !== null;
}

// Collection names as constants
export const COLLECTIONS = {
  REVIEWS: 'reviews',
  CONTACTS: 'contacts',
  ROLES: 'roles',
  SETTINGS: 'settings',
  ANALYTICS: 'analytics',
  USERS: 'users',
  ABOUT: 'about'
};

export default {
  connectToDatabase,
  getCollection,
  closeConnection,
  isConnected,
  COLLECTIONS
};