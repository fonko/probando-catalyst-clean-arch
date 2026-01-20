// src/domain/entities/Marca.js
class Marca {
    constructor({
        id,
        nombreEmpresa,
        titulo,
        industria,
        numeroIdentificacionFiscal,
        tipoContacto,
        idioma,
        calle,
        calle2,
        ciudad,
        estado,
        codigoPostal,
        pais,
        telefono,
        movil,
        correoElectronico,
        sitioWeb,
        puestoTrabajo,
        firmaJefe,
        destinatarioContratos,
        destinatarioCotizaciones,
        etiquetas,
        grupoId,
        createdAt,
        updatedAt
    }) {
        this.id = id;
        this.nombreEmpresa = nombreEmpresa;
        this.titulo = titulo;
        this.industria = industria;
        this.numeroIdentificacionFiscal = numeroIdentificacionFiscal;
        this.tipoContacto = tipoContacto;
        this.idioma = idioma;
        this.calle = calle;
        this.calle2 = calle2;
        this.ciudad = ciudad;
        this.estado = estado;
        this.codigoPostal = codigoPostal;
        this.pais = pais;
        this.telefono = telefono;
        this.movil = movil;
        this.correoElectronico = correoElectronico;
        this.sitioWeb = sitioWeb;
        this.puestoTrabajo = puestoTrabajo;
        this.firmaJefe = firmaJefe;
        this.destinatarioContratos = destinatarioContratos;
        this.destinatarioCotizaciones = destinatarioCotizaciones;
        this.etiquetas = etiquetas || [];
        this.grupoId = grupoId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    validate() {
        if (!this.nombreEmpresa || this.nombreEmpresa.trim() === '') {
            throw new Error('El nombre de la empresa es requerido');
        }
        if (!this.telefono || this.telefono.trim() === '') {
            throw new Error('El teléfono es requerido');
        }
        if (!this.correoElectronico || !this.isValidEmail(this.correoElectronico)) {
            throw new Error('El correo electrónico es inválido');
        }
        return true;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    toJSON() {
        return {
            id: this.id,
            nombreEmpresa: this.nombreEmpresa,
            titulo: this.titulo,
            industria: this.industria,
            numeroIdentificacionFiscal: this.numeroIdentificacionFiscal,
            tipoContacto: this.tipoContacto,
            idioma: this.idioma,
            direccion: {
                calle: this.calle,
                calle2: this.calle2,
                ciudad: this.ciudad,
                estado: this.estado,
                codigoPostal: this.codigoPostal,
                pais: this.pais
            },
            contacto: {
                telefono: this.telefono,
                movil: this.movil,
                correoElectronico: this.correoElectronico,
                sitioWeb: this.sitioWeb,
                puestoTrabajo: this.puestoTrabajo,
                firmaJefe: this.firmaJefe
            },
            destinatarios: {
                contratos: this.destinatarioContratos,
                cotizaciones: this.destinatarioCotizaciones
            },
            etiquetas: this.etiquetas,
            grupoId: this.grupoId,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
}

module.exports = Marca;