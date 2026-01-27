// ==================== CONTACT SERVICE ====================
// Handles CRUD operations for contact form submissions

import { getCollection, COLLECTIONS } from '../lib/db';
import { v4 as uuidv4 } from 'uuid';

/**
 * Get all contact messages
 * @param {Object} options - { status, page, limit }
 * @returns {Promise<Array>}
 */
export async function getAllContacts(options = {}) {
  try {
    const collection = await getCollection(COLLECTIONS.CONTACTS);
    const { status, page = 1, limit = 20 } = options;
    
    const query = status ? { status } : {};
    const skip = (page - 1) * limit;
    
    const contacts = await collection
      .find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();
    
    return contacts;
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return [];
  }
}

/**
 * Get a single contact by ID
 * @param {string} id 
 * @returns {Promise<Object|null>}
 */
export async function getContactById(id) {
  try {
    const collection = await getCollection(COLLECTIONS.CONTACTS);
    const contact = await collection.findOne({ id });
    return contact;
  } catch (error) {
    console.error('Error fetching contact:', error);
    return null;
  }
}

/**
 * Create a new contact message (from contact form)
 * @param {Object} contactData - { name, email, subject, message }
 * @returns {Promise<{success: boolean, contact?: Object}>}
 */
export async function createContact(contactData) {
  try {
    const collection = await getCollection(COLLECTIONS.CONTACTS);
    
    const newContact = {
      id: uuidv4(),
      name: contactData.name,
      email: contactData.email,
      subject: contactData.subject,
      message: contactData.message,
      status: 'unread', // unread, read, replied
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    await collection.insertOne(newContact);
    return { success: true, contact: newContact };
  } catch (error) {
    console.error('Error creating contact:', error);
    return { success: false, message: 'Failed to submit contact form' };
  }
}

/**
 * Update contact status (mark as read, replied, etc.)
 * @param {string} id 
 * @param {Object} updateData - { status, notes }
 * @returns {Promise<{success: boolean, contact?: Object}>}
 */
export async function updateContact(id, updateData) {
  try {
    const collection = await getCollection(COLLECTIONS.CONTACTS);
    
    const update = {
      ...updateData,
      updatedAt: new Date().toISOString()
    };
    
    delete update.id;

    const result = await collection.findOneAndUpdate(
      { id },
      { $set: update },
      { returnDocument: 'after' }
    );

    if (result) {
      return { success: true, contact: result };
    }
    return { success: false, message: 'Contact not found' };
  } catch (error) {
    console.error('Error updating contact:', error);
    return { success: false, message: 'Failed to update contact' };
  }
}

/**
 * Delete a contact message
 * @param {string} id 
 * @returns {Promise<{success: boolean}>}
 */
export async function deleteContact(id) {
  try {
    const collection = await getCollection(COLLECTIONS.CONTACTS);
    const result = await collection.deleteOne({ id });
    
    if (result.deletedCount > 0) {
      return { success: true };
    }
    return { success: false, message: 'Contact not found' };
  } catch (error) {
    console.error('Error deleting contact:', error);
    return { success: false, message: 'Failed to delete contact' };
  }
}

/**
 * Mark contact as read
 * @param {string} id 
 * @returns {Promise<{success: boolean}>}
 */
export async function markAsRead(id) {
  return updateContact(id, { status: 'read' });
}

/**
 * Mark contact as replied
 * @param {string} id 
 * @returns {Promise<{success: boolean}>}
 */
export async function markAsReplied(id) {
  return updateContact(id, { status: 'replied' });
}

/**
 * Get unread contact count
 * @returns {Promise<number>}
 */
export async function getUnreadCount() {
  try {
    const collection = await getCollection(COLLECTIONS.CONTACTS);
    const count = await collection.countDocuments({ status: 'unread' });
    return count;
  } catch (error) {
    console.error('Error getting unread count:', error);
    return 0;
  }
}

export default {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
  markAsRead,
  markAsReplied,
  getUnreadCount
};
