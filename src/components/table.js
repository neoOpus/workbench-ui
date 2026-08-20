/**
 * Workbench UI — High-Density Data Table / Row List Component
 * Inspired by high-density operational developer tools.
 */

export class DataTable {
  constructor(options = {}) {
    this.title = options.title || 'Items';
    this.items = options.items || [];
    this.onAction = options.onAction || (() => {});
    this.renderRow = options.renderRow || this.defaultRowRenderer;
    this.dom = {};
  }

  mount(container) {
    const card = document.createElement('div');
    card.className = 'sl-card';

    const header = document.createElement('div');
    header.className = 'sl-card-header';
    header.innerHTML = `
      <div class="sl-card-icon">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
      </div>
      <h2 class="sl-card-title">
        ${this.title} <span class="sl-card-title-meta">(${this.items.length})</span>
      </h2>
      <div class="sl-card-header-spacer"></div>
      <div class="sl-card-header-actions" id="sl-card-actions"></div>
    `;

    const list = document.createElement('div');
    list.className = 'sl-list';

    this.items.forEach(item => {
      const row = document.createElement('div');
      row.className = 'sl-row';
      row.innerHTML = this.renderRow(item);
      this.attachRowEvents(row, item);
      list.appendChild(row);
    });

    card.append(header, list);
    container.appendChild(card);
    this.dom = { card, header, list };
    return this;
  }

  defaultRowRenderer(item) {
    const statusClass = item.status === 'ready' ? 'ready' : item.status === 'starting' ? 'starting' : '';
    const statusLabel = (item.status || 'READY').toUpperCase();

    return `
      <div class="sl-row-status-dot ${statusClass}"></div>
      <div class="sl-row-main">
        <div class="sl-row-title">${item.title || item.name}</div>
        <div class="sl-row-sub">${item.subtitle || item.description || ''}</div>
      </div>
      <div class="sl-row-state-label ${statusClass}">${statusLabel}</div>
      <div class="sl-row-actions">
        ${item.pinned ? `
          <button class="sl-icon-btn sl-btn-pin active" data-action="pin" title="Unpin">
            <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          </button>
        ` : `
          <button class="sl-icon-btn sl-btn-pin" data-action="pin" title="Pin">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          </button>
        `}
        <button class="sl-icon-btn" data-action="open" title="Open Link">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
        <button class="sl-icon-btn" data-action="run" title="Execute / Install">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        </button>
      </div>
    `;
  }

  attachRowEvents(rowEl, item) {
    rowEl.querySelectorAll('[data-action]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const action = btn.dataset.action;
        this.onAction(action, item, btn);
      });
    });
  }

  updateItems(newItems) {
    this.items = newItems;
    if (this.dom.list) {
      this.dom.list.innerHTML = '';
      this.items.forEach(item => {
        const row = document.createElement('div');
        row.className = 'sl-row';
        row.innerHTML = this.renderRow(item);
        this.attachRowEvents(row, item);
        this.dom.list.appendChild(row);
      });
    }
  }
}
