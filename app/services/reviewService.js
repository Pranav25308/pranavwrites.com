// ==================== REVIEW SERVICE ====================
// Handles CRUD operations for reviews (blogs, movies, books, products)

import { getCollection, COLLECTIONS } from '../lib/db';
import { v4 as uuidv4 } from 'uuid';

/**
 * Get all reviews
 * @param {string} type - Optional filter by type (blog, movie, book, product)
 * @returns {Promise<Array>}
 */
export async function getAllReviews(type = null) {
  try {
    const collection = await getCollection(COLLECTIONS.REVIEWS);
    const query = type ? { type } : {};
    const reviews = await collection.find(query).sort({ createdAt: -1 }).toArray();
    return reviews;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return [];
  }
}

/**
 * Get a single review by ID
 * @param {string} id 
 * @returns {Promise<Object|null>}
 */
export async function getReviewById(id) {
  try {
    const collection = await getCollection(COLLECTIONS.REVIEWS);
    const review = await collection.findOne({ id });
    return review;
  } catch (error) {
    console.error('Error fetching review:', error);
    return null;
  }
}

/**
 * Create a new review
 * @param {Object} reviewData - { type, title, description, image }
 * @returns {Promise<{success: boolean, review?: Object}>}
 */
export async function createReview(reviewData) {
  try {
    const collection = await getCollection(COLLECTIONS.REVIEWS);
    
    const newReview = {
      id: uuidv4(),
      type: reviewData.type,
      title: reviewData.title,
      description: reviewData.description,
      image: reviewData.image || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    await collection.insertOne(newReview);
    return { success: true, review: newReview };
  } catch (error) {
    console.error('Error creating review:', error);
    return { success: false, message: 'Failed to create review' };
  }
}

/**
 * Update an existing review
 * @param {string} id 
 * @param {Object} updateData - Fields to update
 * @returns {Promise<{success: boolean, review?: Object}>}
 */
export async function updateReview(id, updateData) {
  try {
    const collection = await getCollection(COLLECTIONS.REVIEWS);
    
    const update = {
      ...updateData,
      updatedAt: new Date().toISOString()
    };
    
    // Remove id from update data if present
    delete update.id;

    const result = await collection.findOneAndUpdate(
      { id },
      { $set: update },
      { returnDocument: 'after' }
    );

    if (result) {
      return { success: true, review: result };
    }
    return { success: false, message: 'Review not found' };
  } catch (error) {
    console.error('Error updating review:', error);
    return { success: false, message: 'Failed to update review' };
  }
}

/**
 * Delete a review
 * @param {string} id 
 * @returns {Promise<{success: boolean}>}
 */
export async function deleteReview(id) {
  try {
    const collection = await getCollection(COLLECTIONS.REVIEWS);
    const result = await collection.deleteOne({ id });
    
    if (result.deletedCount > 0) {
      return { success: true };
    }
    return { success: false, message: 'Review not found' };
  } catch (error) {
    console.error('Error deleting review:', error);
    return { success: false, message: 'Failed to delete review' };
  }
}

/**
 * Get reviews by type with pagination
 * @param {string} type 
 * @param {number} page 
 * @param {number} limit 
 * @returns {Promise<{reviews: Array, total: number, page: number, totalPages: number}>}
 */
export async function getReviewsByType(type, page = 1, limit = 10) {
  try {
    const collection = await getCollection(COLLECTIONS.REVIEWS);
    const skip = (page - 1) * limit;
    
    const [reviews, total] = await Promise.all([
      collection.find({ type }).sort({ createdAt: -1 }).skip(skip).limit(limit).toArray(),
      collection.countDocuments({ type })
    ]);

    return {
      reviews,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    };
  } catch (error) {
    console.error('Error fetching reviews by type:', error);
    return { reviews: [], total: 0, page: 1, totalPages: 0 };
  }
}

/**
 * Search reviews by title or description
 * @param {string} query 
 * @returns {Promise<Array>}
 */
export async function searchReviews(query) {
  try {
    const collection = await getCollection(COLLECTIONS.REVIEWS);
    const reviews = await collection.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } }
      ]
    }).toArray();
    return reviews;
  } catch (error) {
    console.error('Error searching reviews:', error);
    return [];
  }
}

export default {
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
  getReviewsByType,
  searchReviews
};
