// src/shared/utils/response.js

/**
 * Respuesta exitosa estándar
 */
const successResponse = (res, data, message = 'Operación exitosa', statusCode = 200) => {
    return res.status(statusCode).json({
        success: true,
        message,
        data
    });
};

module.exports = {
    successResponse
};
