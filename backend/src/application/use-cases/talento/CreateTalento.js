// src/application/use-cases/talento/CreateTalento.js
const Talento = require('../../../domain/entities/Talento');
const { ValidationError } = require('../../../shared/errors/AppError');

class CreateTalento {
    constructor(talentoRepository) {
        this.talentoRepository = talentoRepository;
    }

    async execute(talentoData) {
        try {
            // Verificar si ya existe un talento con ese documento o email
            const existingByDoc = await this.talentoRepository.findByDocumento(talentoData.documentoIdentidad);
            if (existingByDoc) {
                throw new ValidationError('Ya existe un talento con ese documento de identidad');
            }

            const existingByEmail = await this.talentoRepository.findByEmail(talentoData.emailPersonal);
            if (existingByEmail) {
                throw new ValidationError('Ya existe un talento con ese correo electrónico');
            }

            // Crear instancia de la entidad
            const talento = new Talento(talentoData);

            // Validar la entidad
            talento.validate();

            // Guardar en el repositorio
            const createdTalento = await this.talentoRepository.create(talento);

            return createdTalento;
        } catch (error) {
            if (error.message.includes('requerido') || error.message.includes('inválido')) {
                throw new ValidationError(error.message);
            }
            throw error;
        }
    }
}

module.exports = CreateTalento;