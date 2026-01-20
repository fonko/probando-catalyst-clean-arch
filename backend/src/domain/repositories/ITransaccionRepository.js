// src/domain/repositories/ITransaccionRepository.js
class ITransaccionRepository {
    async create(transaccion) {
        throw new Error('Method not implemented');
    }

    async findById(id) {
        throw new Error('Method not implemented');
    }

    async findAll(filters) {
        throw new Error('Method not implemented');
    }

    async update(id, transaccion) {
        throw new Error('Method not implemented');
    }

    async delete(id) {
        throw new Error('Method not implemented');
    }

    async findByCodigo(codigo) {
        throw new Error('Method not implemented');
    }

    async findByEstado(estado) {
        throw new Error('Method not implemented');
    }

    async addCotizacion(transaccionId, cotizacion) {
        throw new Error('Method not implemented');
    }
}

module.exports = ITransaccionRepository;