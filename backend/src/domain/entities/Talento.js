// src/domain/entities/Talento.js
class Talento {
    constructor({
        id,
        nombreCompleto,
        fechaNacimiento,
        genero,
        nacionalidad,
        documentoIdentidad,
        tipoDocumento,
        direccionCalle,
        direccionApto,
        ciudad,
        departamento,
        codigoPostal,
        pais,
        telefonoPrincipal,
        telefonoAlternativo,
        emailPersonal,
        emailAlternativo,
        sitioWebPersonal,
        linkedin,
        esTalentoIndependiente,
        nombreArtistico,
        especialidad,
        anosExperiencia,
        tarifaBase,
        biografia,
        razonSocial,
        rutFiscal,
        tipoContribuyente,
        monedaFacturacion,
        direccionFiscal,
        ciudadFiscal,
        codigoPostalFiscal,
        paisFiscal,
        banco,
        numeroCuenta,
        tipoCuenta,
        swift,
        titularCuenta,
        paypal,
        traackrId,
        instagram,
        tiktok,
        youtube,
        twitch,
        podcast,
        facebook,
        createdAt,
        updatedAt
    }) {
        this.id = id;
        this.nombreCompleto = nombreCompleto;
        this.fechaNacimiento = fechaNacimiento;
        this.genero = genero;
        this.nacionalidad = nacionalidad;
        this.documentoIdentidad = documentoIdentidad;
        this.tipoDocumento = tipoDocumento;
        this.direccionCalle = direccionCalle;
        this.direccionApto = direccionApto;
        this.ciudad = ciudad;
        this.departamento = departamento;
        this.codigoPostal = codigoPostal;
        this.pais = pais;
        this.telefonoPrincipal = telefonoPrincipal;
        this.telefonoAlternativo = telefonoAlternativo;
        this.emailPersonal = emailPersonal;
        this.emailAlternativo = emailAlternativo;
        this.sitioWebPersonal = sitioWebPersonal;
        this.linkedin = linkedin;
        this.esTalentoIndependiente = esTalentoIndependiente || false;
        this.nombreArtistico = nombreArtistico;
        this.especialidad = especialidad;
        this.anosExperiencia = anosExperiencia;
        this.tarifaBase = tarifaBase;
        this.biografia = biografia;
        this.razonSocial = razonSocial;
        this.rutFiscal = rutFiscal;
        this.tipoContribuyente = tipoContribuyente;
        this.monedaFacturacion = monedaFacturacion;
        this.direccionFiscal = direccionFiscal;
        this.ciudadFiscal = ciudadFiscal;
        this.codigoPostalFiscal = codigoPostalFiscal;
        this.paisFiscal = paisFiscal;
        this.banco = banco;
        this.numeroCuenta = numeroCuenta;
        this.tipoCuenta = tipoCuenta;
        this.swift = swift;
        this.titularCuenta = titularCuenta;
        this.paypal = paypal;
        this.traackrId = traackrId;
        this.instagram = instagram;
        this.tiktok = tiktok;
        this.youtube = youtube;
        this.twitch = twitch;
        this.podcast = podcast;
        this.facebook = facebook;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    validate() {
        if (!this.nombreCompleto || this.nombreCompleto.trim() === '') {
            throw new Error('El nombre completo es requerido');
        }
        if (!this.documentoIdentidad || this.documentoIdentidad.trim() === '') {
            throw new Error('El documento de identidad es requerido');
        }
        if (!this.telefonoPrincipal || this.telefonoPrincipal.trim() === '') {
            throw new Error('El teléfono principal es requerido');
        }
        if (!this.emailPersonal || !this.isValidEmail(this.emailPersonal)) {
            throw new Error('El correo electrónico personal es inválido');
        }

        if (this.esTalentoIndependiente && !this.especialidad) {
            throw new Error('La especialidad es requerida para talentos independientes');
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
            nombreCompleto: this.nombreCompleto,
            fechaNacimiento: this.fechaNacimiento,
            genero: this.genero,
            nacionalidad: this.nacionalidad,
            documentoIdentidad: this.documentoIdentidad,
            tipoDocumento: this.tipoDocumento,
            direccionPersonal: {
                calle: this.direccionCalle,
                apto: this.direccionApto,
                ciudad: this.ciudad,
                departamento: this.departamento,
                codigoPostal: this.codigoPostal,
                pais: this.pais
            },
            contactoPersonal: {
                telefonoPrincipal: this.telefonoPrincipal,
                telefonoAlternativo: this.telefonoAlternativo,
                emailPersonal: this.emailPersonal,
                emailAlternativo: this.emailAlternativo,
                sitioWebPersonal: this.sitioWebPersonal,
                linkedin: this.linkedin
            },
            informacionProfesional: this.esTalentoIndependiente ? {
                nombreArtistico: this.nombreArtistico,
                especialidad: this.especialidad,
                anosExperiencia: this.anosExperiencia,
                tarifaBase: this.tarifaBase,
                biografia: this.biografia
            } : null,
            facturacion: this.esTalentoIndependiente ? {
                razonSocial: this.razonSocial,
                rutFiscal: this.rutFiscal,
                tipoContribuyente: this.tipoContribuyente,
                monedaFacturacion: this.monedaFacturacion,
                direccionFiscal: this.direccionFiscal,
                ciudadFiscal: this.ciudadFiscal,
                codigoPostalFiscal: this.codigoPostalFiscal,
                paisFiscal: this.paisFiscal
            } : null,
            datosBancarios: this.esTalentoIndependiente ? {
                banco: this.banco,
                numeroCuenta: this.numeroCuenta,
                tipoCuenta: this.tipoCuenta,
                swift: this.swift,
                titularCuenta: this.titularCuenta,
                paypal: this.paypal
            } : null,
            redesSociales: {
                traackrId: this.traackrId,
                instagram: this.instagram,
                tiktok: this.tiktok,
                youtube: this.youtube,
                twitch: this.twitch,
                podcast: this.podcast,
                facebook: this.facebook
            },
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
}

module.exports = Talento;