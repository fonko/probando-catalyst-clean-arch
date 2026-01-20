/**
 * SearchFilter - Componente para búsqueda y filtrado
 * Uso: const search = new SearchFilter('searchContainer', items, options);
 */
class SearchFilter {
  constructor(containerId, items, options = {}) {
    this.container = document.getElementById(containerId);
    if (!this.container) {
      console.error(`Container with id "${containerId}" not found`);
      return;
    }

    this.items = items;
    this.filteredItems = [...items];
    this.searchFields = options.searchFields || [];
    this.filters = options.filters || [];
    this.onSearch = options.onSearch || null;
    this.onFilter = options.onFilter || null;
    this.placeholder = options.placeholder || 'Buscar...';
    this.debounceTime = options.debounceTime || 300;

    this.activeFilter = 'all';
    this.searchTerm = '';
    this.debounceTimer = null;

    this.init();
  }

  init() {
    this.createStructure();
    this.attachEvents();
  }

  createStructure() {
    const filtersHTML = this.filters.map(filter => `
      <button class="filter-btn ${filter.id === 'all' ? 'active' : ''}" data-filter="${filter.id}">
        ${filter.label}
      </button>
    `).join('');

    this.container.innerHTML = `
      <div class="search-filter-bar">
        <div class="search-box">
          <svg class="icon search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          <input type="text" class="search-input" placeholder="${this.placeholder}">
        </div>
        ${filtersHTML}
      </div>
    `;

    this.searchInput = this.container.querySelector('.search-input');
    this.filterButtons = this.container.querySelectorAll('.filter-btn');
  }

  attachEvents() {
    // Search con debounce
    this.searchInput.addEventListener('input', (e) => {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = setTimeout(() => {
        this.searchTerm = e.target.value.toLowerCase();
        this.applyFilters();
      }, this.debounceTime);
    });

    // Filter buttons
    this.filterButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        this.setActiveFilter(e.target.dataset.filter);
      });
    });
  }

  setActiveFilter(filterId) {
    this.activeFilter = filterId;
    
    // Update button states
    this.filterButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.filter === filterId);
    });

    this.applyFilters();
  }

  applyFilters() {
    let results = [...this.items];

    // Apply search
    if (this.searchTerm) {
      results = results.filter(item => {
        return this.searchFields.some(field => {
          const value = this.getNestedProperty(item, field);
          return value && value.toString().toLowerCase().includes(this.searchTerm);
        });
      });
    }

    // Apply active filter
    if (this.activeFilter !== 'all') {
      const activeFilterConfig = this.filters.find(f => f.id === this.activeFilter);
      if (activeFilterConfig && activeFilterConfig.filterFn) {
        results = results.filter(activeFilterConfig.filterFn);
      }
    }

    this.filteredItems = results;

    // Callback
    if (this.onSearch) {
      this.onSearch(results, this.searchTerm, this.activeFilter);
    }

    return results;
  }

  updateItems(items) {
    this.items = items;
    this.applyFilters();
  }

  getResults() {
    return this.filteredItems;
  }

  reset() {
    this.searchInput.value = '';
    this.searchTerm = '';
    this.setActiveFilter('all');
  }

  getNestedProperty(obj, path) {
    return path.split('.').reduce((current, prop) => current?.[prop], obj);
  }

  destroy() {
    clearTimeout(this.debounceTimer);
    this.container.innerHTML = '';
  }
}

// Export para usar como módulo
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SearchFilter;
}
