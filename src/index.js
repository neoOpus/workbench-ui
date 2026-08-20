/**
 * Workbench UI — Main Entry Point
 * Modular, token-driven application shell and UI component bootstrap.
 */

export { THEME_PRESETS, ACCENT_SWATCHES, generateCssVariables } from './tokens.js';
export { WorkbenchShell } from './shell.js';
export { DataTable } from './components/table.js';
export { LogPanel } from './components/log-panel.js';
export { createIsolatedContainer } from './isolation.js';
