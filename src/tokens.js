/**
 * Workbench UI — Design System Tokens & Presets
 * Clean, sober, high-density theme definitions.
 */

export const THEME_PRESETS = Object.freeze({
  midnight: {
    id: 'midnight',
    name: 'Midnight (Default)',
    bg: '#0b0e14',
    railBg: '#080a0f',
    topBg: '#0d1117',
    cardBg: '#111622',
    rowBg: '#131926',
    rowHover: '#182030',
    border: '#1e2638',
    borderSubtle: '#182030',
    textPrimary: '#f0f4fc',
    textSecondary: '#8a96aa',
    textMuted: '#556277',
    accent: '#10b981',
    accentRgb: '16, 185, 129',
    accentFg: '#041f14'
  },
  obsidian: {
    id: 'obsidian',
    name: 'Obsidian Carbon',
    bg: '#050507',
    railBg: '#000000',
    topBg: '#09090c',
    cardBg: '#0d0d12',
    rowBg: '#101017',
    rowHover: '#161622',
    border: '#1a1a24',
    borderSubtle: '#14141c',
    textPrimary: '#f4f4f5',
    textSecondary: '#71717a',
    textMuted: '#52525b',
    accent: '#10b981',
    accentRgb: '16, 185, 129',
    accentFg: '#000000'
  },
  slate: {
    id: 'slate',
    name: 'Deep Slate',
    bg: '#0f172a',
    railBg: '#090d16',
    topBg: '#111c34',
    cardBg: '#16223f',
    rowBg: '#1a294c',
    rowHover: '#22345e',
    border: '#263b6b',
    borderSubtle: '#1e3058',
    textPrimary: '#f8fafc',
    textSecondary: '#94a3b8',
    textMuted: '#64748b',
    accent: '#38bdf8',
    accentRgb: '56, 189, 248',
    accentFg: '#082f49'
  },
  light: {
    id: 'light',
    name: 'Paper Light',
    bg: '#f8fafc',
    railBg: '#e2e8f0',
    topBg: '#ffffff',
    cardBg: '#ffffff',
    rowBg: '#f8fafc',
    rowHover: '#f1f5f9',
    border: '#cbd5e1',
    borderSubtle: '#e2e8f0',
    textPrimary: '#0f172a',
    textSecondary: '#475569',
    textMuted: '#94a3b8',
    accent: '#059669',
    accentRgb: '5, 150, 105',
    accentFg: '#ffffff'
  }
});

export const ACCENT_SWATCHES = Object.freeze([
  { id: 'emerald', label: 'Emerald', hex: '#10b981', rgb: '16, 185, 129' },
  { id: 'sky', label: 'Sky Blue', hex: '#38bdf8', rgb: '56, 189, 248' },
  { id: 'indigo', label: 'Indigo', hex: '#818cf8', rgb: '129, 140, 248' },
  { id: 'amber', label: 'Amber', hex: '#f59e0b', rgb: '245, 158, 11' },
  { id: 'rose', label: 'Rose', hex: '#f43f5e', rgb: '244, 63, 94' }
]);

export function generateCssVariables(theme = THEME_PRESETS.midnight, density = 'standard') {
  const densityPadding = density === 'compact' ? '10px 16px' : density === 'spacious' ? '22px 24px' : '16px 20px';

  return `
    --sl-bg: ${theme.bg};
    --sl-rail-bg: ${theme.railBg};
    --sl-top-bg: ${theme.topBg};
    --sl-card-bg: ${theme.cardBg};
    --sl-row-bg: ${theme.rowBg};
    --sl-row-hover: ${theme.rowHover};
    --sl-border: ${theme.border};
    --sl-border-subtle: ${theme.borderSubtle};
    --sl-text-primary: ${theme.textPrimary};
    --sl-text-secondary: ${theme.textSecondary};
    --sl-text-muted: ${theme.textMuted};
    --sl-accent: ${theme.accent};
    --sl-accent-rgb: ${theme.accentRgb};
    --sl-accent-fg: ${theme.accentFg};
    --sl-row-padding: ${densityPadding};
  `;
}
