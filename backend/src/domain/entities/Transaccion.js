// src/domain/entities/Transaccion.js
class Transaccion {
    constructor({
        id,
        codigo,
        tipo,
        estado,
        nombreCampana,
        correoCampana,
        telefonoCampana,
        responsableCampana,
        fechaImplementacion,
        marcaId,
        talentoId,
        valorEstimado,
        createdAt,
        updatedAt
    }) {
        this.id = id;
        this.codigo = codigo;
        this.tipo = tipo;
        this.estado = estado || 'borrador';
        this.nombreCampana = nombreCampana;
        this.correoCampana = correoCampana;
        this.telefonoCampana = telefonoCampana;
        this.responsableCampana = responsableCampana;
        this.fechaImplementacion = fechaImplementacion;
        this.marcaId = marcaId;
        this.talentoId = talentoId;
        this.valorEstimado = valorEstimado;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    static ESTADOS = {
        BORRADOR: 'borrador',
        COTIZACION_ENVIADA: 'cotizacion_enviada',
        PENDIENTE_FIRMA: 'pendiente_firma',
        COMPLETADO: 'completado'
    };

    static TIPOS = {
        MULTIMARCA_MONOTALENTO: 'multimarca_monotalento',
        MONOMARCA_MONOTALENTO: 'monomarca_monotalento',
        MULTIMARCA_MULTITALENTO: 'multimarca_multitalento',
        MONOMARCA_MULTITALENTO: 'monomarca_multitalento'
    };

    validate() {
        if (!this.nombreCampana || this.nombreCampana.trim() === '') {
            throw new Error('El nombre de la campaña es requerido');
        }
        if (!this.correoCampana || !this.isValidEmail(this.correoCampana)) {
            throw new Error('El correo de la campaña es inválido');
        }
        if (!this.responsableCampana || this.responsableCampana.trim() === '') {
            throw new Error('El responsable de la campaña es requerido');
        }
        if (!this.talentoId) {
            throw new Error('El talento es requerido');
        }
        if (!Object.values(Transaccion.ESTADOS).includes(this.estado)) {
            throw new Error('Estado de transacción inválido');
        }
        return true;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    puedeEditarse() {
        return this.estado === Transaccion.ESTADOS.BORRADOR;
    }

    puedeEnviarse() {
        return this.estado === Transaccion.ESTADOS.BORRADOR ||
            this.estado === Transaccion.ESTADOS.COTIZACION_ENVIADA;
    }

    cambiarEstado(nuevoEstado) {
        const estadosValidos = Object.values(Transaccion.ESTADOS);
        if (!estadosValidos.includes(nuevoEstado)) {
            throw new Error('Estado inválido');
        }
        this.estado = nuevoEstado;
        this.updatedAt = new Date();
    }

    toJSON() {
        return {
            id: this.id,
            codigo: this.codigo,
            tipo: this.tipo,
            estado: this.estado,
            campana: {
                nombre: this.nombreCampana,
                correo: this.correoCampana,
                telefono: this.telefonoCampana,
                responsable: this.responsableCampana,
                fechaImplementacion: this.fechaImplementacion
            },
            marcaId: this.marcaId,
            talentoId: this.talentoId,
            valorEstimado: this.valorEstimado,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
}

module.exports = Transaccion;