// Read configuration from window.APP_CONFIG set by config.js
const getApiBaseUrl = () => {
  return window.APP_CONFIG?.apiBaseUrl || 'http://localhost:8080';
};

export const api = {
  baseUrl: getApiBaseUrl(),
  
  // Helper to build full URL
  getUrl(path) {
    // Remove leading slash if present to avoid double slashes
    const cleanPath = path.startsWith('/') ? path.substring(1) : path;
    return `${this.baseUrl}/${cleanPath}`;
  },
  
  // Helper for GET requests
  async get(path) {
    const response = await fetch(this.getUrl(path));
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },
  
  // Helper for POST requests
  async post(path, data) {
    const response = await fetch(this.getUrl(path), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }
};

export default api;