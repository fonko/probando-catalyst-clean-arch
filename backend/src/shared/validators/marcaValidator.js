// src/shared/validators/marcaValidator.js
const Joi = require('joi');

const createMarcaSchema = Joi.object({
    nombreEmpresa: Joi.string().required().min(2).max(255).messages({
        'string.empty': 'El nombre de la empresa es requerido',
        'string.min': 'El nombre debe tener al menos 2 caracteres',
        'string.max': 'El nombre no puede exceder 255 caracteres',
        'any.required': 'El nombre de la empresa es requerido'
    }),

    titulo: Joi.string().allow('', null).max(255),

    industria: Joi.string().valid(
        'cosmetica',
        'moda',
        'deportes',
        'tecnologia',
        'alimentos',
        'automotriz',
        'entretenimiento',
        'farmaceutica',
        'otro'
    ).allow('', null),

    numeroIdentificacionFiscal: Joi.string().allow('', null).max(50),

    tipoContacto: Joi.string().valid(
        'marca',
        'cliente_corporativo',
        'distribuidor',
        'subsidiaria'
    ).allow('', null),

    idioma: Joi.string().valid(
        'español',
        'ingles',
        'portugues',
        'frances'
    ).allow('', null),

    // Dirección
    calle: Joi.string().allow('', null).max(255),
    calle2: Joi.string().allow('', null).max(255),
    ciudad: Joi.string().allow('', null).max(100),
    estado: Joi.string().allow('', null).max(100),
    codigoPostal: Joi.string().allow('', null).max(20),
    pais: Joi.string().allow('', null).max(100),

    // Contacto
    telefono: Joi.string().required().pattern(/^\+?[0-9\s\-()]+$/).messages({
        'string.empty': 'El teléfono es requerido',
        'string.pattern.base': 'El teléfono tiene un formato inválido',
        'any.required': 'El teléfono es requerido'
    }),

    movil: Joi.string().allow('', null).pattern(/^\+?[0-9\s\-()]+$/),

    correoElectronico: Joi.string().email().required().messages({
        'string.empty': 'El correo electrónico es requerido',
        'string.email': 'El correo electrónico es inválido',
        'any.required': 'El correo electrónico es requerido'
    }),

    sitioWeb: Joi.string().uri().allow('', null),
    puestoTrabajo: Joi.string().allow('', null).max(100),
    firmaJefe: Joi.string().allow('', null).max(255),

    // Destinatarios especiales
    destinatarioContratos: Joi.string().email().allow('', null),
    destinatarioCotizaciones: Joi.string().email().allow('', null),

    // Etiquetas
    etiquetas: Joi.array().items(Joi.string()).default([]),

    // Grupo
    grupoId: Joi.string().allow('', null)
});

const updateMarcaSchema = Joi.object({
    nombreEmpresa: Joi.string().min(2).max(255),
    titulo: Joi.string().allow('', null).max(255),
    industria: Joi.string().valid(
        'cosmetica',
        'moda',
        'deportes',
        'tecnologia',
        'alimentos',
        'automotriz',
        'entretenimiento',
        'farmaceutica',
        'otro'
    ).allow('', null),
    numeroIdentificacionFiscal: Joi.string().allow('', null).max(50),
    tipoContacto: Joi.string().valid(
        'marca',
        'cliente_corporativo',
        'distribuidor',
        'subsidiaria'
    ).allow('', null),
    idioma: Joi.string().valid(
        'español',
        'ingles',
        'portugues',
        'frances'
    ).allow('', null),
    calle: Joi.string().allow('', null).max(255),
    calle2: Joi.string().allow('', null).max(255),
    ciudad: Joi.string().allow('', null).max(100),
    estado: Joi.string().allow('', null).max(100),
    codigoPostal: Joi.string().allow('', null).max(20),
    pais: Joi.string().allow('', null).max(100),
    telefono: Joi.string().pattern(/^\+?[0-9\s\-()]+$/),
    movil: Joi.string().allow('', null).pattern(/^\+?[0-9\s\-()]+$/),
    correoElectronico: Joi.string().email(),
    sitioWeb: Joi.string().uri().allow('', null),
    puestoTrabajo: Joi.string().allow('', null).max(100),
    firmaJefe: Joi.string().allow('', null).max(255),
    destinatarioContratos: Joi.string().email().allow('', null),
    destinatarioCotizaciones: Joi.string().email().allow('', null),
    etiquetas: Joi.array().items(Joi.string()),
    grupoId: Joi.string().allow('', null)
}).min(1); // Al menos un campo debe ser actualizado

const idParamSchema = Joi.object({
    id: Joi.string().pattern(/^c[a-z0-9]{24}$/).required().messages({
        'string.pattern.base': 'ID inválido',
        'any.required': 'ID es requerido'
    })
});

const queryFiltersSchema = Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10),
    grupoId: Joi.string().allow(''),
    industria: Joi.string().allow(''),
    search: Joi.string().allow('')
});

module.exports = {
    createMarcaSchema,
    updateMarcaSchema,
    idParamSchema,
    queryFiltersSchema
};