// Simple axios-like API wrapper for consistency with tests
const api = {
  get: async (url, config) => {
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...config?.headers,
      },
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw { response: { data: error } };
    }
    
    return { data: await response.json() };
  },

  post: async (url, data, config) => {
    const response = await fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...config?.headers,
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw { response: { data: error } };
    }
    
    return { data: await response.json() };
  },

  put: async (url, data, config) => {
    const response = await fetch(url, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...config?.headers,
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw { response: { data: error } };
    }
    
    return { data: await response.json() };
  },

  delete: async (url, config) => {
    const response = await fetch(url, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...config?.headers,
      },
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw { response: { data: error } };
    }
    
    return { data: await response.json() };
  },
};

export default api;
