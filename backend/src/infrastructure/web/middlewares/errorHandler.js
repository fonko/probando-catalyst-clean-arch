// src/infrastructure/web/middlewares/errorHandler.js
const { AppError, NotFoundError, ValidationError, UnauthorizedError } = require('../../../shared/errors/AppError');

/**
 * Middleware global para manejo de errores
 * 
 */
const errorHandler = (err, req, res, next) => {
    // src/infrastructure/web/middlewares/errorHandler.js
    const errorHandler = (err, req, res, next) => {
        // Log del error para debugging
        if (process.env.NODE_ENV === 'development') {
            console.error('❌ Error capturado:', {
                name: err.name,
                message: err.message,
                code: err.code,
                meta: err.meta,
                details: err.details,
                url: req.originalUrl,
                method: req.method
            });
        } else {
            console.error('❌ Error:', err.message);
        }

        // Si es un error operacional conocido (AppError)
        if (err instanceof AppError) {
            return res.status(err.statusCode).json({
                success: false,
                error: {
                    message: err.message,
                    type: err.constructor.name,
                    ...(err.details && { details: err.details }),
                    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
                }
            });
        }

        // ... resto del código igual
    };

    // Manejo de errores de Prisma
    if (err.code) {
        return handlePrismaError(err, res);
    }

    if (err.name === 'ValidationError') {
        return res.status(400).json({
            success: false,
            error: {
                message: 'Error de validación',
                details: err.errors || err.message
            }
        });
    }

    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({
            success: false,
            error: {
                message: 'JSON inválido en el cuerpo de la petición',
                details: err.message
            }
        });
    }

    if (err.status === 404) {
        return res.status(404).json({
            success: false,
            error: {
                message: 'Ruta no encontrada',
                path: req.originalUrl
            }
        });
    }

    return res.status(500).json({
        success: false,
        error: {
            message: process.env.NODE_ENV === 'production'
                ? 'Error interno del servidor'
                : err.message,
            ...(process.env.NODE_ENV === 'development' && {
                stack: err.stack,
                details: err
            })
        }
    });
};

/**
 * Manejo específico para Prisma
 */
const handlePrismaError = (err, res) => {
    console.log('🔍 Manejando error de Prisma:', err.code);
    const errorMap = {
        // Error de registro único duplicado
        'P2002': {
            status: 409,
            message: formatDuplicateError(err)
        },
        'P2025': {
            status: 404,
            message: 'Registro no encontrado'
        },
        'P2003': {
            status: 400,
            message: 'Error de relación: el registro relacionado no existe'
        },
        'P2014': {
            status: 400,
            message: 'No se puede eliminar porque tiene registros relacionados'
        },
        'P1001': {
            status: 503,
            message: 'No se puede conectar a la base de datos'
        },
        'P1008': {
            status: 503,
            message: 'Timeout de conexión a la base de datos'
        },
        'P1000': {
            status: 500,
            message: 'Error de autenticación con la base de datos'
        }
    };

    const errorInfo = errorMap[err.code] || {
        status: 500,
        message: 'Error de base de datos'
    };

    return res.status(errorInfo.status).json({
        success: false,
        error: {
            message: errorInfo.message,
            code: err.code,
            ...(process.env.NODE_ENV === 'development' && {
                meta: err.meta,
                details: err.message
            })
        }
    });
};


/**
 * Formatear mensaje de error para duplicados
 * TODO: Expandir según modelos y camposq relevantes
 */
const formatDuplicateError = (err) => {
    // Verificar si meta y target existen
    if (!err.meta || !err.meta.target) {
        return 'Ya existe un registro con esos datos';
    }

    const target = err.meta.target;

    // Mapeo a mensajes amigables
    const fieldMessages = {
        'marcas_correoElectronico_key': 'Ya existe una marca con ese correo electrónico',
        'marcas_numeroIdentificacionFiscal_key': 'Ya existe una marca con ese número de identificación fiscal',
        'talentos_documentoIdentidad_key': 'Ya existe un talento con ese documento de identidad',
        'talentos_emailPersonal_key': 'Ya existe un talento con ese correo electrónico',
        'agencias_numeroIdentificacionFiscal_key': 'Ya existe una agencia con ese número de identificación fiscal',
        'transacciones_codigo_key': 'Ya existe una transacción con ese código',
        // TODO: Agregar más según modelos
        'correoElectronico': 'Ya existe un registro con ese correo electrónico',
        'documentoIdentidad': 'Ya existe un registro con ese documento de identidad',
        'emailPersonal': 'Ya existe un registro con ese email',
        'numeroIdentificacionFiscal': 'Ya existe un registro con ese número de identificación fiscal',
        'codigo': 'Ya existe un registro con ese código'
    };

    // Si target array
    if (Array.isArray(target)) {
        // Buscar  por nombre completo del constraint
        const constraintKey = target.join('_');
        if (fieldMessages[constraintKey]) {
            return fieldMessages[constraintKey];
        }

        // Buscar por cada campo individual
        for (const field of target) {
            if (fieldMessages[field]) {
                return fieldMessages[field];
            }
        }

        // Mensaje genérico con los campos
        const fieldNames = target.join(', ');
        return `Ya existe un registro con ese ${fieldNames}`;
    }

    if (typeof target === 'string') {
        // Buscar mensaje por el constraint completo
        if (fieldMessages[target]) {
            return fieldMessages[target];
        }

        const parts = target.split('_');

        // Si el constraint termina en "_key", el campo está antes
        if (parts.length > 1 && parts[parts.length - 1] === 'key') {
            const fieldName = parts[parts.length - 2];
            if (fieldMessages[fieldName]) {
                return fieldMessages[fieldName];
            }
            return `Ya existe un registro con ese ${fieldName}`;
        }

        // Si es solo el nombre del campo
        if (fieldMessages[target]) {
            return fieldMessages[target];
        }

        return `Ya existe un registro con ese ${target}`;
    }

    // Fallback genérico
    return 'Ya existe un registro con esos datos';
};

/**
 * Middleware para capturar rutas no encontradas (404)
 * 
 */
const notFoundHandler = (req, res, next) => {
    const error = new NotFoundError(`Ruta no encontrada: ${req.method} ${req.originalUrl}`);
    next(error);
};

/**
 * Wrapper para async/await en controladores
 *
 */
const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};

module.exports = errorHandler;
module.exports.notFoundHandler = notFoundHandler;
module.exports.asyncHandler = asyncHandler;