# Workbench UI

A sober, modular, token-driven application shell and UI component bootstrap for developer tools, web extension workbenches, and userscripts.

Designed for maximum information density, operational clarity, and complete host-CSS isolation.

---

## Key Characteristics

- **64px Navigation Rail**: Compact, single-authority navigation with system status beacon.
- **Data-Dense Row Lists**: Status dots with pulse/glow effects, multi-tier metadata, uppercase status badges, and inline actions.
- **Streaming Log Console**: Real-time terminal output with level tags (`[INFO]`, `[READY]`, `[DEBUG]`, `[WARN]`), subtabs, and copy/clear controls.
- **Complete CSS & DOM Isolation**: Built-in closed Shadow DOM mounting helper with full reset styles, immunizing the interface from host page CSS, fonts, and layout distortions.
- **Skinnable Design Tokens**: Zero-dependency CSS custom properties for palettes (Midnight, Obsidian, Slate, Light), accent colors, and density presets.

---

## Architecture & Modules

```
src/
├── index.js             # Public framework API
├── tokens.js            # Design tokens, theme presets, CSS variable generator
├── shell.js             # Reusable WorkbenchShell (Rail + Topbar + Workspace)
├── isolation.js         # Shadow DOM encapsulation engine
└── components/
    ├── table.js         # High-density DataTable component
    └── log-panel.js     # Monospace streaming LogPanel terminal
```

---

## Usage Example

```javascript
import { 
  createIsolatedContainer, 
  WorkbenchShell, 
  DataTable, 
  LogPanel, 
  THEME_PRESETS 
} from './src/index.js';

// 1. Create a Shadow DOM isolated container on any page
const container = createIsolatedContainer({
  theme: THEME_PRESETS.midnight,
  density: 'standard'
});

// 2. Instantiate the Workbench Shell
const shell = new WorkbenchShell({
  target: container.mountPoint,
  title: 'My Tool',
  subtitle: 'target.domain',
  views: [
    { id: 'items', label: 'Items' },
    { id: 'logs', label: 'Logs' }
  ]
}).mount();

// 3. Mount high-density tables and logs
const table = new DataTable({
  title: 'Active Tasks',
  items: [
    { id: '1', title: 'Task Alpha', subtitle: 'v1.2 · 800 ops', status: 'ready' }
  ]
}).mount(shell.dom.workspace);
```

---

## License

MIT © Anoir Ben Tanfous
