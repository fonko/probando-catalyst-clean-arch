// js/api.js

/**
 * Cliente API para comunicación con el backend
 */
const API = {
  /**
   * Realizar petición HTTP
   */
  async request(endpoint, options = {}) {
    const url = `${CONFIG.API_BASE_URL}${endpoint}`;

    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
      }
    };

    const config = { ...defaultOptions, ...options };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw {
          status: response.status,
          message: data.error?.message || CONFIG.MESSAGES.ERROR.GENERIC,
          data: data
        };
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);

      // Error de red
      if (!error.status) {
        throw {
          status: 0,
          message: CONFIG.MESSAGES.ERROR.NETWORK
        };
      }

      throw error;
    }
  },

  /**
   * MARCAS
   */
  marcas: {
    // Obtener todas las marcas
    async getAll(params = {}) {
      const queryString = new URLSearchParams(params).toString();
      const endpoint = `/marcas${queryString ? '?' + queryString : ''}`;
      return await API.request(endpoint);
    },

    // Obtener una marca por ID
    async getById(id) {
      return await API.request(`/marcas/${id}`);
    },

    // Crear marca
    async create(data) {
      return await API.request('/marcas', {
        method: 'POST',
        body: JSON.stringify(data)
      });
    },

    // Actualizar marca
    async update(id, data) {
      return await API.request(`/marcas/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
      });
    },

    // Eliminar marca
    async delete(id) {
      return await API.request(`/marcas/${id}`, {
        method: 'DELETE'
      });
    }
  },

  /**
   * TALENTOS
   */
  talentos: {
    async getAll(params = {}) {
      const queryString = new URLSearchParams(params).toString();
      const endpoint = `/talentos${queryString ? '?' + queryString : ''}`;
      return await API.request(endpoint);
    },

    async getById(id) {
      return await API.request(`/talentos/${id}`);
    },

    async create(data) {
      return await API.request('/talentos', {
        method: 'POST',
        body: JSON.stringify(data)
      });
    },

    async update(id, data) {
      return await API.request(`/talentos/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
      });
    },

    async delete(id) {
      return await API.request(`/talentos/${id}`, {
        method: 'DELETE'
      });
    }
  },

  /**
   * AGENCIAS
   */
  agencias: {
    async getAll(params = {}) {
      const queryString = new URLSearchParams(params).toString();
      const endpoint = `/agencias${queryString ? '?' + queryString : ''}`;
      return await API.request(endpoint);
    },

    async getById(id) {
      return await API.request(`/agencias/${id}`);
    },

    async create(data) {
      return await API.request('/agencias', {
        method: 'POST',
        body: JSON.stringify(data)
      });
    },

    async update(id, data) {
      return await API.request(`/agencias/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
      });
    },

    async delete(id) {
      return await API.request(`/agencias/${id}`, {
        method: 'DELETE'
      });
    }
  },

  /**
   * TRANSACCIONES
   */
  transacciones: {
    async getAll(params = {}) {
      const queryString = new URLSearchParams(params).toString();
      const endpoint = `/transacciones${queryString ? '?' + queryString : ''}`;
      return await API.request(endpoint);
    },

    async getById(id) {
      return await API.request(`/transacciones/${id}`);
    },

    async create(data) {
      return await API.request('/transacciones', {
        method: 'POST',
        body: JSON.stringify(data)
      });
    },

    async update(id, data) {
      return await API.request(`/transacciones/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
      });
    },

    async delete(id) {
      return await API.request(`/transacciones/${id}`, {
        method: 'DELETE'
      });
    }
  },

  /**
   * GRUPOS DE MARCAS
   */
  gruposMarcas: {
    async getAll() {
      return await API.request('/grupos-marcas');
    }
  }
};

// Hacer API disponible globalmente
window.API = API;