// src/application/use-cases/transaccion/CreateTransaccion.js
const Transaccion = require('../../../domain/entities/Transaccion');
const { ValidationError, NotFoundError } = require('../../../shared/errors/AppError');

class CreateTransaccion {
    constructor(transaccionRepository, talentoRepository, marcaRepository) {
        this.transaccionRepository = transaccionRepository;
        this.talentoRepository = talentoRepository;
        this.marcaRepository = marcaRepository;
    }

    async execute(transaccionData) {
        try {
            // Verificar que el talento existe
            const talento = await this.talentoRepository.findById(transaccionData.talentoId);
            if (!talento) {
                throw new NotFoundError('Talento no encontrado');
            }

            // Verificar que la marca existe (si se proporcionó)
            if (transaccionData.marcaId) {
                const marca = await this.marcaRepository.findById(transaccionData.marcaId);
                if (!marca) {
                    throw new NotFoundError('Marca no encontrada');
                }
            }

            // Generar código único
            const year = new Date().getFullYear();
            const count = await this.transaccionRepository.findAll({ year });
            const codigo = `TRX-${year}-${String(count.length + 1).padStart(3, '0')}`;

            // Crear instancia de la entidad
            const transaccion = new Transaccion({
                ...transaccionData,
                codigo
            });

            // Validar la entidad
            transaccion.validate();

            // Guardar en el repositorio
            const createdTransaccion = await this.transaccionRepository.create(transaccion);

            return createdTransaccion;
        } catch (error) {
            if (error.message.includes('requerido') || error.message.includes('inválido')) {
                throw new ValidationError(error.message);
            }
            throw error;
        }
    }
}

module.exports = CreateTransaccion;