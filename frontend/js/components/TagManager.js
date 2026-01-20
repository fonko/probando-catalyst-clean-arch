/**
 * TagManager - Componente para gestionar etiquetas/tags
 * Uso: const tagManager = new TagManager('tagsContainer', options);
 */
class TagManager {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    if (!this.container) {
      console.error(`Container with id "${containerId}" not found`);
      return;
    }

    this.tags = options.initialTags || [];
    this.maxTags = options.maxTags || null;
    this.allowDuplicates = options.allowDuplicates || false;
    this.onAdd = options.onAdd || null;
    this.onRemove = options.onRemove || null;
    this.placeholder = options.placeholder || 'Agregar etiqueta...';
    this.buttonText = options.buttonText || 'Agregar';

    this.init();
  }

  init() {
    this.createStructure();
    this.render();
    this.attachEvents();
  }

  createStructure() {
    this.container.innerHTML = `
      <div class="tags-input-group">
        <input type="text" class="form-control tag-input" placeholder="${this.placeholder}">
        <button type="button" class="btn-add tag-add-btn">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          ${this.buttonText}
        </button>
      </div>
      <div class="tags-list"></div>
    `;

    this.input = this.container.querySelector('.tag-input');
    this.addButton = this.container.querySelector('.tag-add-btn');
    this.tagsList = this.container.querySelector('.tags-list');
  }

  addTag(tag) {
    const trimmedTag = tag.trim();

    // Validaciones
    if (!trimmedTag) return false;
    
    if (!this.allowDuplicates && this.tags.includes(trimmedTag)) {
      this.showError('Esta etiqueta ya existe');
      return false;
    }

    if (this.maxTags && this.tags.length >= this.maxTags) {
      this.showError(`Máximo ${this.maxTags} etiquetas permitidas`);
      return false;
    }

    this.tags.push(trimmedTag);
    this.render();
    this.input.value = '';
    this.input.focus();

    if (this.onAdd) {
      this.onAdd(trimmedTag, this.tags);
    }

    return true;
  }

  removeTag(tag) {
    const index = this.tags.indexOf(tag);
    if (index > -1) {
      this.tags.splice(index, 1);
      this.render();

      if (this.onRemove) {
        this.onRemove(tag, this.tags);
      }
    }
  }

  getTags() {
    return [...this.tags];
  }

  setTags(tags) {
    this.tags = Array.isArray(tags) ? [...tags] : [];
    this.render();
  }

  clear() {
    this.tags = [];
    this.render();
  }

  render() {
    if (this.tags.length === 0) {
      this.tagsList.innerHTML = '';
      return;
    }

    const tagsHTML = this.tags.map(tag => `
      <span class="tag">
        ${this.escapeHtml(tag)}
        <button type="button" class="tag-remove" data-tag="${this.escapeHtml(tag)}">
          <svg style="width: 14px; height: 14px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </span>
    `).join('');

    this.tagsList.innerHTML = tagsHTML;
  }

  attachEvents() {
    // Agregar con botón
    this.addButton.addEventListener('click', () => {
      this.addTag(this.input.value);
    });

    // Agregar con Enter
    this.input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        this.addTag(this.input.value);
      }
    });

    // Remover tag
    this.tagsList.addEventListener('click', (e) => {
      if (e.target.classList.contains('tag-remove') || e.target.closest('.tag-remove')) {
        const button = e.target.closest('.tag-remove');
        const tag = button.dataset.tag;
        this.removeTag(tag);
      }
    });
  }

  showError(message) {
    // Agregar clase de error temporal
    this.input.classList.add('error');
    const originalPlaceholder = this.input.placeholder;
    this.input.placeholder = message;

    setTimeout(() => {
      this.input.classList.remove('error');
      this.input.placeholder = originalPlaceholder;
    }, 2000);
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  destroy() {
    this.container.innerHTML = '';
  }
}

// Export para usar como módulo
if (typeof module !== 'undefined' && module.exports) {
  module.exports = TagManager;
}
