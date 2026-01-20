// src/infrastructure/web/middlewares/validator.js
const { ValidationError } = require('../../../shared/errors/AppError');

/**
 * Middleware para validar el cuerpo de la petición
 */
const validateBody = (schema) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body, {
            abortEarly: false, // Obtener todos los errores
            stripUnknown: true // Remover campos no definidos
        });

        if (error) {
            // LOG DETALLADO DEL ERROR
            console.log('❌ Error de validación:', {
                body: req.body,
                errors: error.details.map(detail => ({
                    field: detail.path.join('.'),
                    message: detail.message,
                    type: detail.type
                }))
            });

            const errors = error.details.map(detail => ({
                field: detail.path.join('.'),
                message: detail.message
            }));

            // Crear error con detalles
            const validationError = new ValidationError('Error de validación en el cuerpo de la petición');
            validationError.details = errors;

            return next(validationError);
        }

        // Reemplazar req.body con el valor validado y sanitizado
        req.body = value;
        next();
    };
};

/**
 * Middleware para validar parámetros de ruta
 */
const validateParams = (schema) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.params);

        if (error) {
            console.log('❌ Error de validación en params:', error.details);
            return next(new ValidationError('Error de validación en los parámetros'));
        }

        req.params = value;
        next();
    };
};

/**
 * Middleware para validar query strings
 */
const validateQuery = (schema) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.query);

        if (error) {
            console.log('❌ Error de validación en query:', error.details);
            return next(new ValidationError('Error de validación en los parámetros de consulta'));
        }

        req.query = value;
        next();
    };
};

module.exports = {
    validateBody,
    validateParams,
    validateQuery
};