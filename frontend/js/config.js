// js/config.js

/**
 * Configuración global de la aplicación
 */
const CONFIG = {
    // URL base del API
    API_BASE_URL: 'http://localhost:3000/api/v1',

    // Configuración de timeouts
    REQUEST_TIMEOUT: 30000, // 30 segundos

    // Configuración de notificaciones
    TOAST_DURATION: 3000,
    TOAST_POSITION: 'top-right',

    // Configuración de paginación
    DEFAULT_PAGE_SIZE: 10,

    // Mensajes
    MESSAGES: {
        SUCCESS: {
            MARCA_CREATED: 'Marca creada exitosamente',
            MARCA_UPDATED: 'Marca actualizada exitosamente',
            MARCA_DELETED: 'Marca eliminada exitosamente',
            TALENTO_CREATED: 'Talento creado exitosamente',
            TALENTO_UPDATED: 'Talento actualizado exitosamente',
            TALENTO_DELETED: 'Talento eliminado exitosamente'
        },
        ERROR: {
            GENERIC: 'Ha ocurrido un error. Por favor intenta de nuevo.',
            NETWORK: 'Error de conexión. Verifica tu conexión a internet.',
            VALIDATION: 'Por favor completa todos los campos requeridos',
            NOT_FOUND: 'Recurso no encontrado',
            DUPLICATE: 'Ya existe un registro con esos datos'
        }
    }
};

// Hacer CONFIG disponible globalmente
window.CONFIG = CONFIG;