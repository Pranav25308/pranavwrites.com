'use client';

/**
 * Returns standard authorization headers using the token stored in localStorage.
 * @param {Record<string, string>} extraHeaders
 * @returns {Record<string, string>}
 */
export function getAuthHeaders(extraHeaders = {}) {
  if (typeof window === 'undefined') {
    return { ...extraHeaders };
  }
  const token = localStorage.getItem('adminToken');
  return {
    ...extraHeaders,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}
