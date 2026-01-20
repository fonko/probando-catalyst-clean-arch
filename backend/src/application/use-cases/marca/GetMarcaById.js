// src/application/use-cases/marca/GetMarcaById.js
const { NotFoundError } = require('../../../shared/errors/AppError');

class GetMarcaById {
    constructor(marcaRepository) {
        this.marcaRepository = marcaRepository;
    }

    async execute(id) {
        const marca = await this.marcaRepository.findById(id);

        if (!marca) {
            throw new NotFoundError('Marca no encontrada');
        }

        return marca;
    }
}

module.exports = GetMarcaById;