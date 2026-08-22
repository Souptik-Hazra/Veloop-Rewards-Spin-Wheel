import { API_CONFIG, getAuthHeaders } from '../config/api.config';

/**
 * Standardized HTTP API Client with error parsing, timeouts, and auth header injection.
 */
class ApiClient {
  constructor() {
    this.baseUrl = API_CONFIG.BASE_URL;
    this.timeout = API_CONFIG.TIMEOUT_MS;
  }

  /**
   * Universal fetch wrapper with timeout and error handling
   */
  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      ...getAuthHeaders(),
      ...(options.headers || {})
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), options.timeout || this.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        headers,
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      // Try to parse JSON response
      let data;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          if (typeof window !== 'undefined') {
            localStorage.removeItem('veloop_auth_token');
            sessionStorage.removeItem('veloop_auth_token');
            window.dispatchEvent(new CustomEvent('veloop:unauthorized', { detail: { status: response.status } }));
          }
        }

        let errorMessage = `Request failed with status ${response.status}`;
        if (data && typeof data === 'object' && data.message) {
          errorMessage = data.message;
        } else if (typeof data === 'string' && (data.includes('<!DOCTYPE') || data.includes('<html'))) {
          errorMessage = `Backend server gateway error (${response.status}). Please try again later.`;
        } else if (typeof data === 'string' && data.trim().length > 0) {
          errorMessage = data.trim();
        }

        const error = new Error(errorMessage);
        error.status = response.status;
        error.data = data;
        throw error;
      }

      return data;
    } catch (err) {
      clearTimeout(timeoutId);

      if (err.name === 'AbortError') {
        const timeoutError = new Error('Request timed out. Please check your connection.');
        timeoutError.isTimeout = true;
        throw timeoutError;
      }

      throw err;
    }
  }

  get(endpoint, params = {}, options = {}) {
    let queryString = '';
    const queryParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, value);
      }
    });

    const qs = queryParams.toString();
    if (qs) {
      queryString = `${endpoint.includes('?') ? '&' : '?'}${qs}`;
    }

    return this.request(`${endpoint}${queryString}`, {
      method: 'GET',
      ...options
    });
  }

  post(endpoint, body = {}, options = {}) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
      ...options
    });
  }

  put(endpoint, body = {}, options = {}) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
      ...options
    });
  }

  delete(endpoint, options = {}) {
    return this.request(endpoint, {
      method: 'DELETE',
      ...options
    });
  }
}

export const apiClient = new ApiClient();
