// ==================== ANALYTICS SERVICE ====================
// Handles page view tracking and analytics data

import { getCollection, COLLECTIONS } from '../lib/db';
import { v4 as uuidv4 } from 'uuid';

/**
 * Track a page view
 * @param {string} page - Page name (home, about, blogs, etc.)
 * @param {Object} metadata - Additional data (userAgent, referrer, etc.)
 * @returns {Promise<{success: boolean}>}
 */
export async function trackPageView(page, metadata = {}) {
  try {
    const collection = await getCollection(COLLECTIONS.ANALYTICS);
    
    const pageView = {
      id: uuidv4(),
      type: 'pageview',
      page: page,
      timestamp: new Date().toISOString(),
      date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
      userAgent: metadata.userAgent || '',
      referrer: metadata.referrer || '',
      ip: metadata.ip || ''
    };

    await collection.insertOne(pageView);
    return { success: true };
  } catch (error) {
    console.error('Error tracking page view:', error);
    return { success: false };
  }
}

/**
 * Get analytics summary
 * @param {Object} options - { startDate, endDate }
 * @returns {Promise<Object>}
 */
export async function getAnalyticsSummary(options = {}) {
  try {
    const collection = await getCollection(COLLECTIONS.ANALYTICS);
    const { startDate, endDate } = options;
    
    let dateFilter = {};
    if (startDate || endDate) {
      dateFilter.date = {};
      if (startDate) dateFilter.date.$gte = startDate;
      if (endDate) dateFilter.date.$lte = endDate;
    }

    // Total views
    const totalViews = await collection.countDocuments({ 
      type: 'pageview',
      ...dateFilter 
    });

    // Views by page
    const pageViewsAgg = await collection.aggregate([
      { $match: { type: 'pageview', ...dateFilter } },
      { $group: { _id: '$page', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]).toArray();

    const pageViews = {};
    const topPages = [];
    pageViewsAgg.forEach(item => {
      pageViews[item._id] = item.count;
      topPages.push({ page: item._id, views: item.count });
    });

    // Unique visitors (simplified - by unique IPs or sessions)
    const uniqueVisitors = await collection.distinct('ip', { 
      type: 'pageview',
      ...dateFilter 
    });

    return {
      totalVisits: totalViews,
      uniqueVisitors: uniqueVisitors.length || Math.floor(totalViews * 0.6), // Fallback estimate
      pageViews,
      topPages: topPages.slice(0, 5)
    };
  } catch (error) {
    console.error('Error fetching analytics summary:', error);
    return {
      totalVisits: 0,
      uniqueVisitors: 0,
      pageViews: {},
      topPages: []
    };
  }
}

/**
 * Get page views for a specific page
 * @param {string} page 
 * @returns {Promise<number>}
 */
export async function getPageViews(page) {
  try {
    const collection = await getCollection(COLLECTIONS.ANALYTICS);
    const count = await collection.countDocuments({ type: 'pageview', page });
    return count;
  } catch (error) {
    console.error('Error fetching page views:', error);
    return 0;
  }
}

/**
 * Get views over time (for charts)
 * @param {number} days - Number of days to look back
 * @returns {Promise<Array>}
 */
export async function getViewsOverTime(days = 30) {
  try {
    const collection = await getCollection(COLLECTIONS.ANALYTICS);
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    
    const result = await collection.aggregate([
      { 
        $match: { 
          type: 'pageview',
          timestamp: { $gte: startDate.toISOString() }
        } 
      },
      { 
        $group: { 
          _id: '$date', 
          count: { $sum: 1 } 
        } 
      },
      { $sort: { _id: 1 } }
    ]).toArray();

    return result.map(item => ({
      date: item._id,
      views: item.count
    }));
  } catch (error) {
    console.error('Error fetching views over time:', error);
    return [];
  }
}

/**
 * Get most popular pages
 * @param {number} limit 
 * @returns {Promise<Array>}
 */
export async function getMostPopularPages(limit = 10) {
  try {
    const collection = await getCollection(COLLECTIONS.ANALYTICS);
    
    const result = await collection.aggregate([
      { $match: { type: 'pageview' } },
      { $group: { _id: '$page', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: limit }
    ]).toArray();

    return result.map(item => ({
      page: item._id,
      views: item.count
    }));
  } catch (error) {
    console.error('Error fetching popular pages:', error);
    return [];
  }
}

/**
 * Clear old analytics data (data retention)
 * @param {number} daysToKeep - Keep data for this many days
 * @returns {Promise<{success: boolean, deleted: number}>}
 */
export async function clearOldAnalytics(daysToKeep = 90) {
  try {
    const collection = await getCollection(COLLECTIONS.ANALYTICS);
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);
    
    const result = await collection.deleteMany({
      timestamp: { $lt: cutoffDate.toISOString() }
    });

    return { success: true, deleted: result.deletedCount };
  } catch (error) {
    console.error('Error clearing old analytics:', error);
    return { success: false, deleted: 0 };
  }
}

export default {
  trackPageView,
  getAnalyticsSummary,
  getPageViews,
  getViewsOverTime,
  getMostPopularPages,
  clearOldAnalytics
};
