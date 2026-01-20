// src/application/use-cases/marca/UpdateMarca.js
const Marca = require('../../../domain/entities/Marca');
const { NotFoundError, ValidationError } = require('../../../shared/errors/AppError');

class UpdateMarca {
    constructor(marcaRepository) {
        this.marcaRepository = marcaRepository;
    }

    async execute(id, marcaData) {
        // Verificar que existe
        const existingMarca = await this.marcaRepository.findById(id);

        if (!existingMarca) {
            throw new NotFoundError('Marca no encontrada');
        }

        try {
            // Crear nueva instancia con datos actualizados
            const marca = new Marca({
                ...existingMarca,
                ...marcaData,
                id,
                updatedAt: new Date()
            });

            // Validar
            marca.validate();

            // Actualizar
            const updatedMarca = await this.marcaRepository.update(id, marca);

            return updatedMarca;
        } catch (error) {
            if (error.message.includes('requerido') || error.message.includes('inválido')) {
                throw new ValidationError(error.message);
            }
            throw error;
        }
    }
}

module.exports = UpdateMarca;