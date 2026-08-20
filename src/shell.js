/**
 * Workbench UI — Application Shell Component
 * Encapsulates Left Navigation Rail, Header Topbar, Workspace View Switching, and Statusbar.
 */

export class WorkbenchShell {
  constructor(options = {}) {
    this.target = options.target || document.body;
    this.title = options.title || 'Workbench';
    this.subtitle = options.subtitle || '';
    this.views = options.views || [];
    this.currentView = options.initialView || (this.views[0]?.id || 'discover');
    this.onViewChange = options.onViewChange || (() => {});
    this.onAction = options.onAction || (() => {});
    this.actions = options.actions || [];
    this.dom = {};
  }

  mount() {
    const root = document.createElement('div');
    root.className = 'sl-app';

    // Left Rail
    const rail = document.createElement('aside');
    rail.className = 'sl-rail';

    const brand = document.createElement('div');
    brand.className = 'sl-rail-brand';
    brand.innerHTML = '<div class="sl-status-dot-indicator" title="System Ready"></div>';

    const nav = document.createElement('nav');
    nav.className = 'sl-rail-nav';

    this.views.forEach(v => {
      const btn = document.createElement('button');
      btn.className = `sl-rail-btn ${v.id === this.currentView ? 'active' : ''}`;
      btn.dataset.view = v.id;
      btn.title = v.label || v.id;
      btn.innerHTML = v.iconSvg || '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>';
      btn.addEventListener('click', () => this.switchView(v.id));
      nav.appendChild(btn);
    });

    const railSpacer = document.createElement('div');
    railSpacer.className = 'sl-rail-spacer';

    const railFoot = document.createElement('div');
    railFoot.className = 'sl-rail-footer';
    railFoot.innerHTML = `
      <button class="sl-rail-btn" id="sl-quick-theme" title="Toggle Theme">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
      <button class="sl-rail-btn" data-view="settings" title="Settings">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
      </button>
    `;

    rail.append(brand, nav, railSpacer, railFoot);

    // Shell
    const shell = document.createElement('div');
    shell.className = 'sl-shell';

    // Topbar
    const topbar = document.createElement('header');
    topbar.className = 'sl-topbar';
    topbar.innerHTML = `
      <div class="sl-topbar-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18M3 9h6"/></svg>
      </div>
      <h1 class="sl-topbar-title" id="sl-topbar-title">
        ${this.title} <span id="sl-topbar-sub">${this.subtitle}</span>
      </h1>
      <div class="sl-topbar-spacer"></div>
      <div class="sl-topbar-actions" id="sl-topbar-actions"></div>
    `;

    // Workspace
    const workspace = document.createElement('main');
    workspace.className = 'sl-workspace';
    workspace.id = 'sl-workspace';

    shell.append(topbar, workspace);
    root.append(rail, shell);
    this.target.appendChild(root);

    this.dom = { root, rail, nav, topbar, workspace };
    return this;
  }

  switchView(viewId) {
    this.currentView = viewId;
    this.dom.nav.querySelectorAll('.sl-rail-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.view === viewId);
    });
    this.onViewChange(viewId);
  }

  setSubtitle(text) {
    const el = this.dom.topbar.querySelector('#sl-topbar-sub');
    if (el) el.textContent = text;
  }
}
