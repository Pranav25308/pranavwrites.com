import { MongoClient } from 'mongodb';

const MONGO_URL = process.env.MONGO_URL;
const DB_NAME = process.env.DB_NAME;

let client;
let clientPromise;

/**
 * Get or initialize MongoDB client promise
 * In development, use a global variable to preserve connection across HMR.
 */
function getClientPromise() {
  if (!MONGO_URL) {
    throw new Error('MONGO_URL environment variable is missing');
  }

  if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClientPromise) {
      client = new MongoClient(MONGO_URL);
      global._mongoClientPromise = client.connect();
    }
    return global._mongoClientPromise;
  }

  if (!clientPromise) {
    client = new MongoClient(MONGO_URL);
    clientPromise = client.connect();
  }
  return clientPromise;
}

/**
 * Connect to MongoDB database
 * @returns {Promise<Db>} MongoDB database instance
 */
export async function connectToDatabase() {
  if (!DB_NAME) {
    throw new Error('DB_NAME environment variable is missing');
  }

  const connectedClient = await getClientPromise();
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
  return Boolean(client);
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
