/**
 * FormValidator - Componente para validación de formularios
 * Uso: const validator = new FormValidator('myForm', rules, options);
 */
class FormValidator {
  constructor(formId, rules = {}, options = {}) {
    this.form = document.getElementById(formId);
    if (!this.form) {
      console.error(`Form with id "${formId}" not found`);
      return;
    }

    this.rules = rules;
    this.errors = {};
    this.options = {
      showErrors: options.showErrors !== false,
      errorClass: options.errorClass || 'error',
      errorMessageClass: options.errorMessageClass || 'error-message',
      validateOnBlur: options.validateOnBlur !== false,
      validateOnInput: options.validateOnInput || false,
      onSubmit: options.onSubmit || null,
      onValidate: options.onValidate || null,
      ...options
    };

    this.init();
  }

  init() {
    this.attachEvents();
  }

  attachEvents() {
    // Submit
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      if (this.validate()) {
        if (this.options.onSubmit) {
          const formData = this.getFormData();
          this.options.onSubmit(formData, e);
        }
      }
    });

    // Validate on blur
    if (this.options.validateOnBlur) {
      this.form.addEventListener('blur', (e) => {
        if (e.target.matches('input, select, textarea')) {
          this.validateField(e.target);
        }
      }, true);
    }

    // Validate on input
    if (this.options.validateOnInput) {
      this.form.addEventListener('input', (e) => {
        if (e.target.matches('input, select, textarea')) {
          this.validateField(e.target);
        }
      });
    }
  }

  validate() {
    this.errors = {};
    let isValid = true;

    for (const [fieldName, fieldRules] of Object.entries(this.rules)) {
      const field = this.form.elements[fieldName];
      if (!field) continue;

      const fieldValid = this.validateField(field, fieldRules);
      if (!fieldValid) {
        isValid = false;
      }
    }

    if (this.options.onValidate) {
      this.options.onValidate(isValid, this.errors);
    }

    return isValid;
  }

  validateField(field, fieldRules = null) {
    const fieldName = field.name;
    const rules = fieldRules || this.rules[fieldName];
    
    if (!rules) return true;

    const value = field.value.trim();
    let isValid = true;

    // Clear previous error
    this.clearFieldError(field);

    // Required
    if (rules.required && !value) {
      this.setFieldError(field, rules.requiredMessage || 'Este campo es requerido');
      isValid = false;
    }

    // Min length
    if (isValid && rules.minLength && value.length < rules.minLength) {
      this.setFieldError(field, rules.minLengthMessage || `Mínimo ${rules.minLength} caracteres`);
      isValid = false;
    }

    // Max length
    if (isValid && rules.maxLength && value.length > rules.maxLength) {
      this.setFieldError(field, rules.maxLengthMessage || `Máximo ${rules.maxLength} caracteres`);
      isValid = false;
    }

    // Email
    if (isValid && rules.email && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        this.setFieldError(field, rules.emailMessage || 'Email inválido');
        isValid = false;
      }
    }

    // Phone
    if (isValid && rules.phone && value) {
      const phoneRegex = /^[\d\s\-\+\(\)]+$/;
      if (!phoneRegex.test(value)) {
        this.setFieldError(field, rules.phoneMessage || 'Teléfono inválido');
        isValid = false;
      }
    }

    // URL
    if (isValid && rules.url && value) {
      const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
      if (!urlRegex.test(value)) {
        this.setFieldError(field, rules.urlMessage || 'URL inválida');
        isValid = false;
      }
    }

    // Pattern
    if (isValid && rules.pattern && value) {
      const regex = new RegExp(rules.pattern);
      if (!regex.test(value)) {
        this.setFieldError(field, rules.patternMessage || 'Formato inválido');
        isValid = false;
      }
    }

    // Custom validator
    if (isValid && rules.custom && typeof rules.custom === 'function') {
      const customResult = rules.custom(value, this.getFormData());
      if (customResult !== true) {
        this.setFieldError(field, customResult || 'Valor inválido');
        isValid = false;
      }
    }

    return isValid;
  }

  setFieldError(field, message) {
    const fieldName = field.name;
    this.errors[fieldName] = message;

    if (this.options.showErrors) {
      field.classList.add(this.options.errorClass);
      
      // Create error message element
      const errorEl = document.createElement('div');
      errorEl.className = this.options.errorMessageClass;
      errorEl.textContent = message;
      errorEl.style.color = 'var(--danger, #ef4444)';
      errorEl.style.fontSize = '0.875rem';
      errorEl.style.marginTop = '0.25rem';
      
      field.parentNode.appendChild(errorEl);
    }
  }

  clearFieldError(field) {
    const fieldName = field.name;
    delete this.errors[fieldName];

    if (this.options.showErrors) {
      field.classList.remove(this.options.errorClass);
      
      const errorEl = field.parentNode.querySelector(`.${this.options.errorMessageClass}`);
      if (errorEl) {
        errorEl.remove();
      }
    }
  }

  clearAllErrors() {
    this.errors = {};
    const fields = this.form.querySelectorAll('input, select, textarea');
    fields.forEach(field => this.clearFieldError(field));
  }

  getFormData() {
    const formData = new FormData(this.form);
    const data = {};
    
    for (const [key, value] of formData.entries()) {
      // Handle multiple values (checkboxes, multi-select)
      if (data[key]) {
        if (Array.isArray(data[key])) {
          data[key].push(value);
        } else {
          data[key] = [data[key], value];
        }
      } else {
        data[key] = value;
      }
    }
    
    return data;
  }

  setFormData(data) {
    for (const [key, value] of Object.entries(data)) {
      const field = this.form.elements[key];
      if (field) {
        if (field.type === 'checkbox') {
          field.checked = !!value;
        } else if (field.type === 'radio') {
          const radio = this.form.querySelector(`input[name="${key}"][value="${value}"]`);
          if (radio) radio.checked = true;
        } else {
          field.value = value;
        }
      }
    }
  }

  reset() {
    this.form.reset();
    this.clearAllErrors();
  }

  destroy() {
    this.clearAllErrors();
  }
}

// Export para usar como módulo
if (typeof module !== 'undefined' && module.exports) {
  module.exports = FormValidator;
}
