// js/utils.js

/**
 * Utilidades generales
 */
const Utils = {
    /**
     * Mostrar notificación de éxito
     */
    showSuccess(mensaje) {
        if (typeof Toastify !== 'undefined') {
            Toastify({
                text: mensaje,
                duration: CONFIG.TOAST_DURATION,
                gravity: "top",
                position: "right",
                style: {
                    background: "linear-gradient(to right, #10b981, #059669)",
                }
            }).showToast();
        } else {
            alert('✅ ' + mensaje);
        }
    },

    /**
     * Mostrar notificación de error
     */
    showError(mensaje) {
        if (typeof Toastify !== 'undefined') {
            Toastify({
                text: mensaje,
                duration: CONFIG.TOAST_DURATION * 2,
                gravity: "top",
                position: "right",
                style: {
                    background: "linear-gradient(to right, #ef4444, #dc2626)",
                }
            }).showToast();
        } else {
            alert('❌ ' + mensaje);
        }
    },

    /**
     * Mostrar/ocultar loader en un botón
     */
    toggleButtonLoader(button, isLoading, originalText = 'Guardar') {
        if (isLoading) {
            button.disabled = true;
            button.dataset.originalHtml = button.innerHTML;
            button.innerHTML = `
                <svg class="icon animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
                </svg>
                Cargando...
            `;
        } else {
            button.disabled = false;
            button.innerHTML = button.dataset.originalHtml || originalText;
        }
    },

    /**
     * Validar email
     */
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    /**
     * Validar teléfono
     */
    isValidPhone(phone) {
        const phoneRegex = /^\+?[0-9\s\-()]+$/;
        return phoneRegex.test(phone);
    },

    /**
     * Limpiar bordes de error en inputs
     */
    clearInputErrors(form) {
        form.querySelectorAll('.form-control').forEach(input => {
            input.style.borderColor = '';
        });
    },

    /**
     * Marcar input como inválido
     */
    markInputAsInvalid(input) {
        input.style.borderColor = '#ef4444';
        input.focus();
    },

    /**
     * Formatear fecha para mostrar
     */
    formatDate(dateString) {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },

    /**
     * Debounce para búsquedas
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    /**
     * Convertir FormData a objeto
     */
    formDataToObject(formData) {
        const obj = {};
        for (let [key, value] of formData.entries()) {
            if (value && value.trim && value.trim() !== '') {

                obj[key] = value;
            }
        }
        return obj;
    },

    /**
     * Agregar animación de spin
     */
    addSpinAnimation() {
        if (!document.getElementById('spin-animation')) {
            const style = document.createElement('style');
            style.id = 'spin-animation';
            style.textContent = `
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin {
                    animation: spin 1s linear infinite;
                }
            `;
            document.head.appendChild(style);
        }
    }
};

// Inicializar animaciones
Utils.addSpinAnimation();

// Hacer Utils disponible globalmente
window.Utils = Utils;