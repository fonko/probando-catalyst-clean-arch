// js/marcas/nueva-marca.js

/**
 * Gestión de etiquetas
 */
const TagManager = {
    etiquetas: [],

    init() {
        const input = document.getElementById('nuevaEtiqueta');
        if (!input) return;

        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.agregar();
            }
        });
    },

    agregar() {
        const input = document.getElementById('nuevaEtiqueta');
        const etiqueta = input.value.trim();

        if (etiqueta && !this.etiquetas.includes(etiqueta)) {
            this.etiquetas.push(etiqueta);
            input.value = '';
            this.renderizar();
        }
    },

    eliminar(etiqueta) {
        this.etiquetas = this.etiquetas.filter(e => e !== etiqueta);
        this.renderizar();
    },

    renderizar() {
        const tagsList = document.getElementById('tagsList');
        if (!tagsList) return;

        tagsList.innerHTML = '';

        this.etiquetas.forEach(etiqueta => {
            const tagElement = document.createElement('span');
            tagElement.className = 'tag';
            tagElement.innerHTML = `
                ${etiqueta}
                <button type="button" class="tag-remove" onclick="TagManager.eliminar('${etiqueta}')">
                    <svg style="width: 14px; height: 14px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            `;
            tagsList.appendChild(tagElement);
        });
    },

    getEtiquetas() {
        return this.etiquetas;
    }
};

/**
 * Formulario de nueva marca
 */
const FormNuevaMarca = {
    form: null,
    submitBtn: null,

    init() {
        this.form = document.getElementById('marcaForm');
        if (!this.form) {
            console.error('Formulario no encontrado');
            return;
        }

        this.submitBtn = this.form.querySelector('button[type="submit"]');
        this.setupEventListeners();
        TagManager.init();
    },

    setupEventListeners() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    },

    async handleSubmit(e) {
        e.preventDefault();

        // Limpiar errores previos
        Utils.clearInputErrors(this.form);

        // Validar formulario
        if (!this.validate()) {
            return;
        }

        // Recopilar datos
        const formData = new FormData(this.form);
        const datos = Utils.formDataToObject(formData);
        console.log('📝 Datos del formulario:', datos);
        // Agregar etiquetas
        datos.etiquetas = TagManager.getEtiquetas();

        // Convertir grupoId vacío a null
        if (!datos.grupoId || datos.grupoId === '') {
            datos.grupoId = null;
        }

        const dataFormateada = { nombreEmpresa: datos.nombre_empresa, telefono: datos.telefono, correoElectronico: datos.correo_electronico, sitioWeb: datos.sitio_web, etiquetas: datos.etiquetas };
        console.log('📤 Enviando datos:', dataFormateada);

        // Mostrar loader
        Utils.toggleButtonLoader(this.submitBtn, true);

        try {
            // Enviar al backend
            const resultado = await API.marcas.create(dataFormateada);

            console.log('✅ Respuesta:', resultado);

            // Mostrar mensaje de éxito
            Utils.showSuccess(CONFIG.MESSAGES.SUCCESS.MARCA_CREATED);

            // Redirigir después de 1 segundo
            setTimeout(() => {
                window.location.href = 'marcas.html';
            }, 1000);

        } catch (error) {
            console.error('❌ Error:', error);
            Utils.showError(error.message || CONFIG.MESSAGES.ERROR.GENERIC);
        } finally {
            Utils.toggleButtonLoader(this.submitBtn, false);
        }
    },

    validate() {
        const nombreEmpresa = this.form.querySelector('input[name="nombre_empresa"]');
        const telefono = this.form.querySelector('input[name="telefono"]');
        const correoElectronico = this.form.querySelector('input[name="correo_electronico"]');
        console.log('Validando formulario...', nombreEmpresa);
        // Validar nombre de empresa
        if (!nombreEmpresa.value.trim()) {
            Utils.showError('El nombre de la empresa es requerido');
            Utils.markInputAsInvalid(nombreEmpresa);
            return false;
        }

        // Validar teléfono
        if (!telefono.value.trim()) {
            Utils.showError('El teléfono es requerido');
            Utils.markInputAsInvalid(telefono);
            return false;
        }

        if (!Utils.isValidPhone(telefono.value)) {
            Utils.showError('El teléfono tiene un formato inválido');
            Utils.markInputAsInvalid(telefono);
            return false;
        }

        // Validar email
        if (!correoElectronico.value.trim()) {
            Utils.showError('El correo electrónico es requerido');
            Utils.markInputAsInvalid(correoElectronico);
            return false;
        }

        if (!Utils.isValidEmail(correoElectronico.value)) {
            Utils.showError('El correo electrónico es inválido');
            Utils.markInputAsInvalid(correoElectronico);
            return false;
        }

        return true;
    }
};

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    FormNuevaMarca.init();
});

// Exponer globalmente para onclick en HTML
window.agregarEtiqueta = () => TagManager.agregar();
window.TagManager = TagManager;