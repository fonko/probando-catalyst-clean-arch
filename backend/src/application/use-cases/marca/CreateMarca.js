// src/application/use-cases/marca/CreateMarca.js
const Marca = require('../../../domain/entities/Marca');
const { ValidationError } = require('../../../shared/errors/AppError');

class CreateMarca {
    constructor(marcaRepository) {
        this.marcaRepository = marcaRepository;
    }

    async execute(marcaData) {
        try {
            // Crear instancia de la entidad
            const marca = new Marca(marcaData);

            // Validar la entidad
            marca.validate();

            // Guardar en el repositorio
            const createdMarca = await this.marcaRepository.create(marca);

            return createdMarca;
        } catch (error) {
            if (error.message.includes('requerido') || error.message.includes('inválido')) {
                throw new ValidationError(error.message);
            }
            throw error;
        }
    }
}

module.exports = CreateMarca;