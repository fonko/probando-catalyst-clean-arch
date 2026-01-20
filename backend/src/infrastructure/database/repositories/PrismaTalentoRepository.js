// src/infrastructure/database/repositories/PrismaTalentoRepository.js
const ITalentoRepository = require('../../../domain/repositories/ITalentoRepository');
const Talento = require('../../../domain/entities/Talento');
const prisma = require('../prisma/client');

class PrismaTalentoRepository extends ITalentoRepository {
    async create(talento) {
        const data = await prisma.talento.create({
            data: {
                nombreCompleto: talento.nombreCompleto,
                fechaNacimiento: talento.fechaNacimiento,
                genero: talento.genero,
                nacionalidad: talento.nacionalidad,
                documentoIdentidad: talento.documentoIdentidad,
                tipoDocumento: talento.tipoDocumento,
                direccionCalle: talento.direccionCalle,
                direccionApto: talento.direccionApto,
                ciudad: talento.ciudad,
                departamento: talento.departamento,
                codigoPostal: talento.codigoPostal,
                pais: talento.pais,
                telefonoPrincipal: talento.telefonoPrincipal,
                telefonoAlternativo: talento.telefonoAlternativo,
                emailPersonal: talento.emailPersonal,
                emailAlternativo: talento.emailAlternativo,
                sitioWebPersonal: talento.sitioWebPersonal,
                linkedin: talento.linkedin,
                esTalentoIndependiente: talento.esTalentoIndependiente,
                nombreArtistico: talento.nombreArtistico,
                especialidad: talento.especialidad,
                anosExperiencia: talento.anosExperiencia,
                tarifaBase: talento.tarifaBase,
                biografia: talento.biografia,
                razonSocial: talento.razonSocial,
                rutFiscal: talento.rutFiscal,
                tipoContribuyente: talento.tipoContribuyente,
                monedaFacturacion: talento.monedaFacturacion,
                direccionFiscal: talento.direccionFiscal,
                ciudadFiscal: talento.ciudadFiscal,
                codigoPostalFiscal: talento.codigoPostalFiscal,
                paisFiscal: talento.paisFiscal,
                banco: talento.banco,
                numeroCuenta: talento.numeroCuenta,
                tipoCuenta: talento.tipoCuenta,
                swift: talento.swift,
                titularCuenta: talento.titularCuenta,
                paypal: talento.paypal,
                traackrId: talento.traackrId,
                instagram: talento.instagram,
                tiktok: talento.tiktok,
                youtube: talento.youtube,
                twitch: talento.twitch,
                podcast: talento.podcast,
                facebook: talento.facebook
            }
        });

        return this.toDomain(data);
    }

    async findById(id) {
        const data = await prisma.talento.findUnique({
            where: { id },
            include: {
                agencias: {
                    include: {
                        agencia: true
                    }
                }
            }
        });

        return data ? this.toDomain(data) : null;
    }

    async findAll(filters = {}) {
        const { skip, take, especialidad, search } = filters;

        const where = {};

        if (especialidad) {
            where.especialidad = especialidad;
        }

        if (search) {
            where.OR = [
                { nombreCompleto: { contains: search, mode: 'insensitive' } },
                { emailPersonal: { contains: search, mode: 'insensitive' } },
                { nombreArtistico: { contains: search, mode: 'insensitive' } }
            ];
        }

        const data = await prisma.talento.findMany({
            where,
            skip,
            take,
            include: {
                agencias: {
                    include: {
                        agencia: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return data.map(item => this.toDomain(item));
    }

    async update(id, talento) {
        const data = await prisma.talento.update({
            where: { id },
            data: {
                nombreCompleto: talento.nombreCompleto,
                fechaNacimiento: talento.fechaNacimiento,
                genero: talento.genero,
                nacionalidad: talento.nacionalidad,
                documentoIdentidad: talento.documentoIdentidad,
                tipoDocumento: talento.tipoDocumento,
                direccionCalle: talento.direccionCalle,
                direccionApto: talento.direccionApto,
                ciudad: talento.ciudad,
                departamento: talento.departamento,
                codigoPostal: talento.codigoPostal,
                pais: talento.pais,
                telefonoPrincipal: talento.telefonoPrincipal,
                telefonoAlternativo: talento.telefonoAlternativo,
                emailPersonal: talento.emailPersonal,
                emailAlternativo: talento.emailAlternativo,
                sitioWebPersonal: talento.sitioWebPersonal,
                linkedin: talento.linkedin,
                esTalentoIndependiente: talento.esTalentoIndependiente,
                nombreArtistico: talento.nombreArtistico,
                especialidad: talento.especialidad,
                anosExperiencia: talento.anosExperiencia,
                tarifaBase: talento.tarifaBase,
                biografia: talento.biografia,
                razonSocial: talento.razonSocial,
                rutFiscal: talento.rutFiscal,
                tipoContribuyente: talento.tipoContribuyente,
                monedaFacturacion: talento.monedaFacturacion,
                direccionFiscal: talento.direccionFiscal,
                ciudadFiscal: talento.ciudadFiscal,
                codigoPostalFiscal: talento.codigoPostalFiscal,
                paisFiscal: talento.paisFiscal,
                banco: talento.banco,
                numeroCuenta: talento.numeroCuenta,
                tipoCuenta: talento.tipoCuenta,
                swift: talento.swift,
                titularCuenta: talento.titularCuenta,
                paypal: talento.paypal,
                traackrId: talento.traackrId,
                instagram: talento.instagram,
                tiktok: talento.tiktok,
                youtube: talento.youtube,
                twitch: talento.twitch,
                podcast: talento.podcast,
                facebook: talento.facebook
            }
        });

        return this.toDomain(data);
    }

    async delete(id) {
        await prisma.talento.delete({
            where: { id }
        });
        return true;
    }

    async findByDocumento(documento) {
        const data = await prisma.talento.findUnique({
            where: { documentoIdentidad: documento }
        });

        return data ? this.toDomain(data) : null;
    }

    async findByEmail(email) {
        const data = await prisma.talento.findUnique({
            where: { emailPersonal: email }
        });

        return data ? this.toDomain(data) : null;
    }

    toDomain(data) {
        return new Talento({
            id: data.id,
            nombreCompleto: data.nombreCompleto,
            fechaNacimiento: data.fechaNacimiento,
            genero: data.genero,
            nacionalidad: data.nacionalidad,
            documentoIdentidad: data.documentoIdentidad,
            tipoDocumento: data.tipoDocumento,
            direccionCalle: data.direccionCalle,
            direccionApto: data.direccionApto,
            ciudad: data.ciudad,
            departamento: data.departamento,
            codigoPostal: data.codigoPostal,
            pais: data.pais,
            telefonoPrincipal: data.telefonoPrincipal,
            telefonoAlternativo: data.telefonoAlternativo,
            emailPersonal: data.emailPersonal,
            emailAlternativo: data.emailAlternativo,
            sitioWebPersonal: data.sitioWebPersonal,
            linkedin: data.linkedin,
            esTalentoIndependiente: data.esTalentoIndependiente,
            nombreArtistico: data.nombreArtistico,
            especialidad: data.especialidad,
            anosExperiencia: data.anosExperiencia,
            tarifaBase: data.tarifaBase,
            biografia: data.biografia,
            razonSocial: data.razonSocial,
            rutFiscal: data.rutFiscal,
            tipoContribuyente: data.tipoContribuyente,
            monedaFacturacion: data.monedaFacturacion,
            direccionFiscal: data.direccionFiscal,
            ciudadFiscal: data.ciudadFiscal,
            codigoPostalFiscal: data.codigoPostalFiscal,
            paisFiscal: data.paisFiscal,
            banco: data.banco,
            numeroCuenta: data.numeroCuenta,
            tipoCuenta: data.tipoCuenta,
            swift: data.swift,
            titularCuenta: data.titularCuenta,
            paypal: data.paypal,
            traackrId: data.traackrId,
            instagram: data.instagram,
            tiktok: data.tiktok,
            youtube: data.youtube,
            twitch: data.twitch,
            podcast: data.podcast,
            facebook: data.facebook,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt
        });
    }
}

module.exports = PrismaTalentoRepository;