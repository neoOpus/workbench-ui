/**
 * Workbench UI — Monospace Terminal Log Panel Component
 * High-density streaming log console with level tags, tabs, and copy/clear controls.
 */

export class LogPanel {
  constructor(options = {}) {
    this.title = options.title || 'Logs';
    this.tabs = options.tabs || ['Both', 'Proxy', 'Upstream'];
    this.currentTab = options.initialTab || this.tabs[0];
    this.lines = options.initialLines || [];
    this.maxLines = options.maxLines || 500;
    this.dom = {};
  }

  mount(container) {
    const card = document.createElement('div');
    card.className = 'sl-card';

    const header = document.createElement('div');
    header.className = 'sl-log-header';

    const tabsWrap = document.createElement('div');
    tabsWrap.className = 'sl-log-tabs';
    this.tabs.forEach(tab => {
      const el = document.createElement('div');
      el.className = `sl-log-tab ${tab === this.currentTab ? 'active' : ''}`;
      el.textContent = tab;
      el.addEventListener('click', () => {
        tabsWrap.querySelectorAll('.sl-log-tab').forEach(t => t.classList.remove('active'));
        el.classList.add('active');
        this.currentTab = tab;
      });
      tabsWrap.appendChild(el);
    });

    const spacer = document.createElement('div');
    spacer.className = 'sl-card-header-spacer';

    const actions = document.createElement('div');
    actions.className = 'sl-topbar-actions';
    actions.innerHTML = `
      <button class="sl-btn" id="sl-log-clear">Clear</button>
      <button class="sl-btn sl-btn-primary" id="sl-log-copy">Copy Logs</button>
    `;

    header.append(tabsWrap, spacer, actions);

    const terminal = document.createElement('div');
    terminal.className = 'sl-terminal';
    terminal.id = 'sl-log-terminal';

    card.append(header, terminal);
    container.appendChild(card);

    this.dom = { card, header, tabsWrap, terminal, actions };
    this.attachEvents();
    this.renderLines();
    return this;
  }

  attachEvents() {
    this.dom.actions.querySelector('#sl-log-clear').addEventListener('click', () => this.clear());
    this.dom.actions.querySelector('#sl-log-copy').addEventListener('click', () => this.copyToClipboard());
  }

  append(line, level = 'info') {
    const timestamp = new Date().toLocaleTimeString();
    this.lines.push({ line, level, timestamp });
    if (this.lines.length > this.maxLines) this.lines.shift();
    this.renderLine({ line, level, timestamp });
  }

  renderLine(item) {
    if (!this.dom.terminal) return;
    const el = document.createElement('div');
    el.className = 'sl-log-line';
    el.innerHTML = `
      <span class="sl-log-time">[${item.timestamp}]</span>
      <span class="sl-log-level ${item.level}">${item.level.toUpperCase()}</span>
      <span>${item.line}</span>
    `;
    this.dom.terminal.appendChild(el);
    this.dom.terminal.scrollTop = this.dom.terminal.scrollHeight;
  }

  renderLines() {
    if (!this.dom.terminal) return;
    this.dom.terminal.innerHTML = '';
    this.lines.forEach(item => this.renderLine(item));
  }

  clear() {
    this.lines = [];
    if (this.dom.terminal) this.dom.terminal.innerHTML = '';
  }

  async copyToClipboard() {
    const raw = this.lines.map(l => `[${l.timestamp}] [${l.level.toUpperCase()}] ${l.line}`).join('\n');
    try {
      await navigator.clipboard.writeText(raw);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = raw;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
  }
}
