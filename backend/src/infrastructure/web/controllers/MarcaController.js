// src/infrastructure/web/controllers/MarcaController.js
const { successResponse } = require('../../../shared/utils/response');

class MarcaController {
    constructor(createMarca, getMarcas, getMarcaById, updateMarca, deleteMarca) {
        this.createMarca = createMarca;
        this.getMarcas = getMarcas;
        this.getMarcaById = getMarcaById;
        this.updateMarca = updateMarca;
        this.deleteMarca = deleteMarca;
    }

    async create(req, res) {
        const marca = await this.createMarca.execute(req.body);
        return successResponse(res, marca, 'Marca creada exitosamente', 201);
    }

    async getAll(req, res) {
        const filters = {
            page: req.query.page,
            limit: req.query.limit,
            grupoId: req.query.grupoId,
            industria: req.query.industria,
            search: req.query.search
        };
        const result = await this.getMarcas.execute(filters);
        return successResponse(res, result);
    }

    async getById(req, res) {
        const marca = await this.getMarcaById.execute(req.params.id);
        return successResponse(res, marca);
    }

    async update(req, res) {
        const marca = await this.updateMarca.execute(req.params.id, req.body);
        return successResponse(res, marca, 'Marca actualizada exitosamente');
    }

    async delete(req, res) {
        await this.deleteMarca.execute(req.params.id);
        return successResponse(res, null, 'Marca eliminada exitosamente');
    }
}

module.exports = MarcaController;