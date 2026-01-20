/**
 * Modal - Componente para crear modales/diálogos
 * Uso: const modal = new Modal(options);
 */
class Modal {
  constructor(options = {}) {
    this.options = {
      title: options.title || '',
      content: options.content || '',
      size: options.size || 'medium', // small, medium, large, full
      showClose: options.showClose !== false,
      closeOnBackdrop: options.closeOnBackdrop !== false,
      closeOnEscape: options.closeOnEscape !== false,
      buttons: options.buttons || [],
      onOpen: options.onOpen || null,
      onClose: options.onClose || null,
      ...options
    };

    this.isOpen = false;
    this.modalElement = null;
    this.createModal();
  }

  createModal() {
    // Create overlay
    this.overlay = document.createElement('div');
    this.overlay.className = 'modal-overlay';
    
    // Create modal container
    const sizeClass = `modal-${this.options.size}`;
    
    this.modalElement = document.createElement('div');
    this.modalElement.className = `modal-content ${sizeClass}`;
    this.modalElement.innerHTML = `
      <div class="modal-header">
        <h2>${this.options.title}</h2>
        ${this.options.showClose ? `
          <button class="modal-close" aria-label="Cerrar">
            <svg style="width: 24px; height: 24px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        ` : ''}
      </div>
      <div class="modal-body">
        ${this.options.content}
      </div>
      ${this.options.buttons.length > 0 ? `
        <div class="modal-footer">
          ${this.createButtons()}
        </div>
      ` : ''}
    `;

    this.overlay.appendChild(this.modalElement);
    this.attachEvents();
  }

  createButtons() {
    return this.options.buttons.map((button, index) => {
      const btnClass = button.class || 'btn-secondary';
      return `
        <button class="${btnClass}" data-modal-btn="${index}">
          ${button.text}
        </button>
      `;
    }).join('');
  }

  attachEvents() {
    // Close button
    if (this.options.showClose) {
      const closeBtn = this.modalElement.querySelector('.modal-close');
      closeBtn?.addEventListener('click', () => this.close());
    }

    // Backdrop click
    if (this.options.closeOnBackdrop) {
      this.overlay.addEventListener('click', (e) => {
        if (e.target === this.overlay) {
          this.close();
        }
      });
    }

    // Custom buttons
    this.options.buttons.forEach((button, index) => {
      const btn = this.modalElement.querySelector(`[data-modal-btn="${index}"]`);
      btn?.addEventListener('click', () => {
        if (button.onClick) {
          button.onClick(this);
        }
        if (button.closeOnClick !== false) {
          this.close();
        }
      });
    });

    // Escape key
    if (this.options.closeOnEscape) {
      this.escapeHandler = (e) => {
        if (e.key === 'Escape' && this.isOpen) {
          this.close();
        }
      };
    }
  }

  open() {
    if (this.isOpen) return;

    document.body.appendChild(this.overlay);
    
    // Trigger reflow for animation
    this.overlay.offsetHeight;
    
    this.overlay.classList.add('active');
    this.isOpen = true;

    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    if (this.options.closeOnEscape) {
      document.addEventListener('keydown', this.escapeHandler);
    }

    if (this.options.onOpen) {
      this.options.onOpen(this);
    }
  }

  close() {
    if (!this.isOpen) return;

    this.overlay.classList.remove('active');
    
    setTimeout(() => {
      if (this.overlay.parentNode) {
        this.overlay.parentNode.removeChild(this.overlay);
      }
      this.isOpen = false;
      
      // Restore body scroll
      document.body.style.overflow = '';

      if (this.options.closeOnEscape) {
        document.removeEventListener('keydown', this.escapeHandler);
      }

      if (this.options.onClose) {
        this.options.onClose(this);
      }
    }, 300); // Match CSS transition time
  }

  setContent(content) {
    const bodyEl = this.modalElement.querySelector('.modal-body');
    if (bodyEl) {
      bodyEl.innerHTML = content;
    }
  }

  setTitle(title) {
    const titleEl = this.modalElement.querySelector('.modal-header h2');
    if (titleEl) {
      titleEl.textContent = title;
    }
  }

  getElement() {
    return this.modalElement;
  }

  destroy() {
    this.close();
    this.modalElement = null;
    this.overlay = null;
  }
}

// Métodos estáticos para modales comunes
Modal.confirm = function(title, message, onConfirm, onCancel) {
  return new Modal({
    title: title,
    content: `<p>${message}</p>`,
    size: 'small',
    buttons: [
      {
        text: 'Cancelar',
        class: 'btn-secondary',
        onClick: () => {
          if (onCancel) onCancel();
        }
      },
      {
        text: 'Confirmar',
        class: 'btn-primary',
        onClick: (modal) => {
          if (onConfirm) onConfirm();
        }
      }
    ]
  });
};

Modal.alert = function(title, message, onClose) {
  return new Modal({
    title: title,
    content: `<p>${message}</p>`,
    size: 'small',
    buttons: [
      {
        text: 'Aceptar',
        class: 'btn-primary',
        onClick: () => {
          if (onClose) onClose();
        }
      }
    ]
  });
};

// Export para usar como módulo
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Modal;
}
