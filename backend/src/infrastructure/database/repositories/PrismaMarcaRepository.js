// src/infrastructure/database/repositories/PrismaMarcaRepository.js
const IMarcaRepository = require('../../../domain/repositories/IMarcaRepository');
const Marca = require('../../../domain/entities/Marca');
const prisma = require('../prisma/client');

class PrismaMarcaRepository extends IMarcaRepository {
    async create(marca) {
        const data = await prisma.marca.create({
            data: {
                nombreEmpresa: marca.nombreEmpresa,
                titulo: marca.titulo,
                industria: marca.industria,
                numeroIdentificacionFiscal: marca.numeroIdentificacionFiscal,
                tipoContacto: marca.tipoContacto,
                idioma: marca.idioma,
                calle: marca.calle,
                calle2: marca.calle2,
                ciudad: marca.ciudad,
                estado: marca.estado,
                codigoPostal: marca.codigoPostal,
                pais: marca.pais,
                telefono: marca.telefono,
                movil: marca.movil,
                correoElectronico: marca.correoElectronico,
                sitioWeb: marca.sitioWeb,
                puestoTrabajo: marca.puestoTrabajo,
                firmaJefe: marca.firmaJefe,
                destinatarioContratos: marca.destinatarioContratos,
                destinatarioCotizaciones: marca.destinatarioCotizaciones,
                etiquetas: marca.etiquetas,
                grupoId: marca.grupoId
            },
            include: {
                grupo: true
            }
        });

        return this.toDomain(data);
    }

    async findById(id) {
        const data = await prisma.marca.findUnique({
            where: { id },
            include: {
                grupo: true,
                transacciones: true
            }
        });

        return data ? this.toDomain(data) : null;
    }

    async findAll(filters = {}) {
        const { skip, take, grupoId, industria, search } = filters;

        const where = {};

        if (grupoId) {
            where.grupoId = grupoId;
        }

        if (industria) {
            where.industria = industria;
        }

        if (search) {
            where.OR = [
                { nombreEmpresa: { contains: search, mode: 'insensitive' } },
                { correoElectronico: { contains: search, mode: 'insensitive' } }
            ];
        }

        const data = await prisma.marca.findMany({
            where,
            skip,
            take,
            include: {
                grupo: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return data.map(item => this.toDomain(item));
    }

    async update(id, marca) {
        const data = await prisma.marca.update({
            where: { id },
            data: {
                nombreEmpresa: marca.nombreEmpresa,
                titulo: marca.titulo,
                industria: marca.industria,
                numeroIdentificacionFiscal: marca.numeroIdentificacionFiscal,
                tipoContacto: marca.tipoContacto,
                idioma: marca.idioma,
                calle: marca.calle,
                calle2: marca.calle2,
                ciudad: marca.ciudad,
                estado: marca.estado,
                codigoPostal: marca.codigoPostal,
                pais: marca.pais,
                telefono: marca.telefono,
                movil: marca.movil,
                correoElectronico: marca.correoElectronico,
                sitioWeb: marca.sitioWeb,
                puestoTrabajo: marca.puestoTrabajo,
                firmaJefe: marca.firmaJefe,
                destinatarioContratos: marca.destinatarioContratos,
                destinatarioCotizaciones: marca.destinatarioCotizaciones,
                etiquetas: marca.etiquetas,
                grupoId: marca.grupoId
            },
            include: {
                grupo: true
            }
        });

        return this.toDomain(data);
    }

    async delete(id) {
        await prisma.marca.delete({
            where: { id }
        });
        return true;
    }

    async findByGrupo(grupoId) {
        const data = await prisma.marca.findMany({
            where: { grupoId },
            include: {
                grupo: true
            }
        });

        return data.map(item => this.toDomain(item));
    }

    toDomain(data) {
        return new Marca({
            id: data.id,
            nombreEmpresa: data.nombreEmpresa,
            titulo: data.titulo,
            industria: data.industria,
            numeroIdentificacionFiscal: data.numeroIdentificacionFiscal,
            tipoContacto: data.tipoContacto,
            idioma: data.idioma,
            calle: data.calle,
            calle2: data.calle2,
            ciudad: data.ciudad,
            estado: data.estado,
            codigoPostal: data.codigoPostal,
            pais: data.pais,
            telefono: data.telefono,
            movil: data.movil,
            correoElectronico: data.correoElectronico,
            sitioWeb: data.sitioWeb,
            puestoTrabajo: data.puestoTrabajo,
            firmaJefe: data.firmaJefe,
            destinatarioContratos: data.destinatarioContratos,
            destinatarioCotizaciones: data.destinatarioCotizaciones,
            etiquetas: data.etiquetas,
            grupoId: data.grupoId,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt
        });
    }
}

module.exports = PrismaMarcaRepository;