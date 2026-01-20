// src/application/use-cases/marca/GetMarcas.js
class GetMarcas {
    constructor(marcaRepository) {
        this.marcaRepository = marcaRepository;
    }

    async execute(filters = {}) {
        const {
            page = 1,
            limit = 10,
            grupoId,
            industria,
            search
        } = filters;

        const queryFilters = {};

        if (grupoId) {
            queryFilters.grupoId = grupoId;
        }

        if (industria) {
            queryFilters.industria = industria;
        }

        if (search) {
            queryFilters.search = search;
        }

        const marcas = await this.marcaRepository.findAll({
            ...queryFilters,
            skip: (page - 1) * limit,
            take: limit
        });

        return {
            data: marcas,
            page: parseInt(page),
            limit: parseInt(limit),
            total: marcas.length
        };
    }
}

module.exports = GetMarcas;