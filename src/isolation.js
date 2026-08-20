/**
 * Workbench UI — Shadow DOM Isolation Layer
 * Mounts the workbench inside an encapsulated Shadow Root with CSS resets,
 * ensuring complete immunity from host page CSS, fonts, and layout distortions.
 */

import { generateCssVariables, THEME_PRESETS } from './tokens.js';

export function createIsolatedContainer(options = {}) {
  const hostId = options.hostId || 'workbench-ui-root';
  let hostEl = document.getElementById(hostId);

  if (!hostEl) {
    hostEl = document.createElement('div');
    hostEl.id = hostId;
    hostEl.style.cssText = `
      all: initial !important;
      position: fixed !important;
      inset: 0 !important;
      width: 100vw !important;
      height: 100vh !important;
      z-index: ${options.zIndex || 2147483640} !important;
      pointer-events: none !important;
      display: flex !important;
    `;
    (options.parent || document.body).appendChild(hostEl);
  }

  const shadow = hostEl.shadowRoot || hostEl.attachShadow({ mode: options.shadowMode || 'closed' });
  const theme = options.theme || THEME_PRESETS.midnight;
  const density = options.density || 'standard';

  const resetStyles = `
    :host {
      all: initial;
      display: flex;
      width: 100%;
      height: 100%;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      ${generateCssVariables(theme, density)}
    }
    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: inherit;
      color: inherit;
    }
  `;

  const styleEl = document.createElement('style');
  styleEl.textContent = resetStyles;
  shadow.appendChild(styleEl);

  const mountPoint = document.createElement('div');
  mountPoint.style.cssText = 'width: 100%; height: 100%; pointer-events: auto; display: flex;';
  shadow.appendChild(mountPoint);

  return {
    host: hostEl,
    shadow,
    mountPoint,
    setTheme(newTheme) {
      styleEl.textContent = `
        :host {
          all: initial;
          display: flex;
          width: 100%;
          height: 100%;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          ${generateCssVariables(newTheme, density)}
        }
        *, *::before, *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          font-family: inherit;
          color: inherit;
        }
      `;
    },
    destroy() {
      if (hostEl && hostEl.parentNode) {
        hostEl.parentNode.removeChild(hostEl);
      }
    }
  };
}
