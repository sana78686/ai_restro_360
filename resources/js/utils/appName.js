/**
 * Utility to get the dynamic app name from the backend
 * Caches the result to avoid repeated API calls
 */

let cachedAppName = null;
let appNamePromise = null;

/**
 * Get the app name (cached)
 * @returns {Promise<string>}
 */
export async function getAppName() {
  // Return cached value if available
  if (cachedAppName) {
    return cachedAppName;
  }

  // Return existing promise if already fetching
  if (appNamePromise) {
    return appNamePromise;
  }

  // Fetch from API
  appNamePromise = fetchAppNameFromAPI();

  try {
    cachedAppName = await appNamePromise;
    return cachedAppName;
  } catch (error) {
    console.error('Error fetching app name:', error);
    // Return fallback
    return import.meta.env.VITE_APP_NAME || 'AiRestro360';
  } finally {
    appNamePromise = null;
  }
}

/**
 * Fetch app name from API
 * @returns {Promise<string>}
 */
async function fetchAppNameFromAPI() {
  try {
    const axios = window.axios || (await import('axios')).default;
    
    // Determine if we're in tenant context
    const host = window.location.host;
    const mainDomain = window.MAIN_DOMAIN || 'localhost:8000';
    const isTenant = host && host !== mainDomain;
    
    // Use appropriate endpoint based on context
    const endpoint = isTenant ? '/tenant/app-name' : '/app-name';
    
    try {
      const response = await axios.get(endpoint);
      
      if (response.data?.success && response.data?.data?.app_name) {
        return response.data.data.app_name;
      }
    } catch (error) {
      // If tenant endpoint fails, try main endpoint as fallback
      if (isTenant && (error.response?.status === 404 || error.response?.status === 401)) {
        try {
          const fallbackResponse = await axios.get('/app-name');
          if (fallbackResponse.data?.success && fallbackResponse.data?.data?.app_name) {
            return fallbackResponse.data.data.app_name;
          }
        } catch (fallbackError) {
          console.error('Both endpoints failed:', fallbackError);
        }
      }
      throw error;
    }
    
    // Fallback
    return import.meta.env.VITE_APP_NAME || 'AiRestro360';
  } catch (error) {
    console.error('Failed to fetch app name from API:', error);
    // Return fallback
    return import.meta.env.VITE_APP_NAME || 'AiRestro360';
  }
}

/**
 * Clear the cached app name (useful when tenant changes)
 */
export function clearAppNameCache() {
  cachedAppName = null;
  appNamePromise = null;
}

/**
 * Get app name synchronously (returns cached value or fallback)
 * Use this when you can't wait for async fetch
 * @returns {string}
 */
export function getAppNameSync() {
  return cachedAppName || import.meta.env.VITE_APP_NAME || 'AiRestro360';
}

