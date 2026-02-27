// ==================== ROLE SERVICE ====================
// Handles CRUD operations for typing animation roles

import { getCollection, COLLECTIONS } from '../lib/db';
import { v4 as uuidv4 } from 'uuid';

/**
 * Get all roles sorted by order
 * @returns {Promise<Array>}
 */
export async function getAllRoles() {
  try {
    const collection = await getCollection(COLLECTIONS.ROLES);
    const roles = await collection.find({}).sort({ order: 1 }).toArray();
    return roles;
  } catch (error) {
    console.error('Error fetching roles:', error);
    return [];
  }
}

/**
 * Get active roles only (for frontend display)
 * @returns {Promise<Array>}
 */
export async function getActiveRoles() {
  try {
    const collection = await getCollection(COLLECTIONS.ROLES);
    const roles = await collection
      .find({ active: { $ne: false } })
      .sort({ order: 1 })
      .toArray();
    return roles;
  } catch (error) {
    console.error('Error fetching active roles:', error);
    return [];
  }
}

/**
 * Get a single role by ID
 * @param {string} id 
 * @returns {Promise<Object|null>}
 */
export async function getRoleById(id) {
  try {
    const collection = await getCollection(COLLECTIONS.ROLES);
    const role = await collection.findOne({ id });
    return role;
  } catch (error) {
    console.error('Error fetching role:', error);
    return null;
  }
}

/**
 * Create a new role
 * @param {Object} roleData - { title, order, active }
 * @returns {Promise<{success: boolean, role?: Object}>}
 */
export async function createRole(roleData) {
  try {
    const collection = await getCollection(COLLECTIONS.ROLES);
    
    // Get the next order number if not provided
    let order = roleData.order;
    if (order === undefined) {
      const lastRole = await collection.find({}).sort({ order: -1 }).limit(1).toArray();
      order = lastRole.length > 0 ? lastRole[0].order + 1 : 1;
    }

    const newRole = {
      id: uuidv4(),
      title: roleData.title,
      order: order,
      active: roleData.active !== false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    await collection.insertOne(newRole);
    return { success: true, role: newRole };
  } catch (error) {
    console.error('Error creating role:', error);
    return { success: false, message: 'Failed to create role' };
  }
}

/**
 * Update an existing role
 * @param {string} id 
 * @param {Object} updateData - Fields to update
 * @returns {Promise<{success: boolean, role?: Object}>}
 */
export async function updateRole(id, updateData) {
  try {
    const collection = await getCollection(COLLECTIONS.ROLES);
    
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
      return { success: true, role: result };
    }
    return { success: false, message: 'Role not found' };
  } catch (error) {
    console.error('Error updating role:', error);
    return { success: false, message: 'Failed to update role' };
  }
}

/**
 * Delete a role
 * @param {string} id 
 * @returns {Promise<{success: boolean}>}
 */
export async function deleteRole(id) {
  try {
    const collection = await getCollection(COLLECTIONS.ROLES);
    const result = await collection.deleteOne({ id });
    
    if (result.deletedCount > 0) {
      return { success: true };
    }
    return { success: false, message: 'Role not found' };
  } catch (error) {
    console.error('Error deleting role:', error);
    return { success: false, message: 'Failed to delete role' };
  }
}

/**
 * Reorder roles
 * @param {Array} roleOrders - Array of { id, order }
 * @returns {Promise<{success: boolean}>}
 */
export async function reorderRoles(roleOrders) {
  try {
    const collection = await getCollection(COLLECTIONS.ROLES);
    
    const operations = roleOrders.map(({ id, order }) => ({
      updateOne: {
        filter: { id },
        update: { $set: { order, updatedAt: new Date().toISOString() } }
      }
    }));

    await collection.bulkWrite(operations);
    return { success: true };
  } catch (error) {
    console.error('Error reordering roles:', error);
    return { success: false, message: 'Failed to reorder roles' };
  }
}

/**
 * Toggle role active status
 * @param {string} id 
 * @returns {Promise<{success: boolean, role?: Object}>}
 */
export async function toggleRoleActive(id) {
  try {
    const collection = await getCollection(COLLECTIONS.ROLES);
    const role = await collection.findOne({ id });
    
    if (!role) {
      return { success: false, message: 'Role not found' };
    }

    return updateRole(id, { active: !role.active });
  } catch (error) {
    console.error('Error toggling role:', error);
    return { success: false, message: 'Failed to toggle role' };
  }
}

export default {
  getAllRoles,
  getActiveRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
  reorderRoles,
  toggleRoleActive
};
