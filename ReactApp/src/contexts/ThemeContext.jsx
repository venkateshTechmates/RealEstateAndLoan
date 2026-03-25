import { createContext, useContext, useState, useEffect, useCallback } from 'react'

export const THEMES = {
  dark: {
    name: 'dark', label: 'Dark', emoji: '🌑',
    preview: '#0f172a', previewCard: '#1e293b',
    sidebar: '#131e30', topbar: '#131e30',
    sidebarBorder: '#1e293b', navActive: 'rgba(59,130,246,0.1)',
    vars: {
      '--bg-base': '#0f172a', '--bg-surface': '#1e293b', '--bg-elevated': '#263348',
      '--border': '#334155', '--border-light': '#475569',
      '--text-primary': '#f1f5f9', '--text-secondary': '#94a3b8', '--text-muted': '#64748b',
    },
  },
  navy: {
    name: 'navy', label: 'Navy', emoji: '🌊',
    preview: '#061428', previewCard: '#0d2045',
    sidebar: '#040e20', topbar: '#040e20',
    sidebarBorder: '#112040', navActive: 'rgba(59,130,246,0.15)',
    vars: {
      '--bg-base': '#061428', '--bg-surface': '#0d2045', '--bg-elevated': '#152c5e',
      '--border': '#1a3562', '--border-light': '#2a4f88',
      '--text-primary': '#e8f0ff', '--text-secondary': '#7aaad8', '--text-muted': '#4a6a90',
    },
  },
  midnight: {
    name: 'midnight', label: 'Midnight', emoji: '🌌',
    preview: '#050508', previewCard: '#0e0e18',
    sidebar: '#060609', topbar: '#060609',
    sidebarBorder: '#141420', navActive: 'rgba(139,92,246,0.15)',
    vars: {
      '--bg-base': '#050508', '--bg-surface': '#0e0e18', '--bg-elevated': '#17172a',
      '--border': '#1e1e2e', '--border-light': '#282840',
      '--text-primary': '#f8f8ff', '--text-secondary': '#8888b8', '--text-muted': '#555570',
    },
  },
  slate: {
    name: 'slate', label: 'Slate', emoji: '🪨',
    preview: '#18202e', previewCard: '#222c40',
    sidebar: '#121a28', topbar: '#121a28',
    sidebarBorder: '#1e2a3e', navActive: 'rgba(96,165,250,0.12)',
    vars: {
      '--bg-base': '#18202e', '--bg-surface': '#222c40', '--bg-elevated': '#2c3852',
      '--border': '#384860', '--border-light': '#485878',
      '--text-primary': '#eef2ff', '--text-secondary': '#8aa0c0', '--text-muted': '#607090',
    },
  },
  light: {
    name: 'light', label: 'Light', emoji: '☀️',
    preview: '#f1f5f9', previewCard: '#ffffff',
    sidebar: '#ffffff', topbar: '#f8fafc',
    sidebarBorder: '#e2e8f0', navActive: 'rgba(59,130,246,0.08)',
    vars: {
      '--bg-base': '#f1f5f9', '--bg-surface': '#ffffff', '--bg-elevated': '#f8fafc',
      '--border': '#e2e8f0', '--border-light': '#cbd5e1',
      '--text-primary': '#0f172a', '--text-secondary': '#334155', '--text-muted': '#64748b',
    },
  },
}

export const ACCENT_COLORS = [
  { name: 'blue',   label: 'Blue',   color: '#3b82f6', light: '#60a5fa' },
  { name: 'purple', label: 'Purple', color: '#8b5cf6', light: '#a78bfa' },
  { name: 'teal',   label: 'Teal',   color: '#14b8a6', light: '#2dd4bf' },
  { name: 'green',  label: 'Green',  color: '#22c55e', light: '#4ade80' },
  { name: 'orange', label: 'Orange', color: '#f97316', light: '#fb923c' },
  { name: 'rose',   label: 'Rose',   color: '#f43f5e', light: '#fb7185' },
]

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const saved = () => {
    try { return JSON.parse(localStorage.getItem('rls-prefs') || '{}') } catch { return {} }
  }

  const [themeName, setThemeName] = useState(() => saved().theme || 'dark')
  const [accentName, setAccentName] = useState(() => saved().accent || 'blue')
  const [fontSize, setFontSize] = useState(() => saved().fontSize || 'normal')

  const theme = THEMES[themeName] || THEMES.dark
  const accent = ACCENT_COLORS.find(a => a.name === accentName) || ACCENT_COLORS[0]

  const applyVars = useCallback((t, a, fs) => {
    const root = document.documentElement
    const vars = { ...t.vars, '--blue': a.color, '--blue-light': a.light }
    Object.entries(vars).forEach(([k, v]) => root.style.setProperty(k, v))
    root.style.setProperty('font-size', fs === 'small' ? '13px' : fs === 'large' ? '15px' : '14px')
  }, [])

  useEffect(() => {
    applyVars(theme, accent, fontSize)
    localStorage.setItem('rls-prefs', JSON.stringify({ theme: themeName, accent: accentName, fontSize }))
  }, [themeName, accentName, fontSize, theme, accent, applyVars])

  return (
    <ThemeContext.Provider value={{ theme, themeName, setThemeName, accent, accentName, setAccentName, fontSize, setFontSize }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
