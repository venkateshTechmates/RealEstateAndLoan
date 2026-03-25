import { useTheme, THEMES, ACCENT_COLORS } from '../contexts/ThemeContext.jsx'

const FONT_SIZES = [
  { name: 'small', label: 'Compact', sub: '13px' },
  { name: 'normal', label: 'Normal', sub: '14px' },
  { name: 'large', label: 'Large', sub: '15px' },
]

export default function ThemePanel({ onClose }) {
  const { theme, themeName, setThemeName, accent, accentName, setAccentName, fontSize, setFontSize } = useTheme()

  const border = theme.vars['--border']
  const text1 = theme.vars['--text-primary']
  const text2 = theme.vars['--text-secondary']
  const text3 = theme.vars['--text-muted']
  const bgBase = theme.vars['--bg-base']
  const bgSurface = theme.vars['--bg-surface']
  const bgEl = theme.vars['--bg-elevated']

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 500, display: 'flex', justifyContent: 'flex-end' }} onClick={e => e.currentTarget === e.target && onClose()}>
      <div style={{ width: 360, height: '100%', background: theme.sidebar, borderLeft: `1px solid ${theme.sidebarBorder}`, display: 'flex', flexDirection: 'column', boxShadow: '-8px 0 40px rgba(0,0,0,0.4)', animation: 'slideInRight 0.22s ease' }}>
        {/* Header */}
        <div style={{ padding: '20px 20px 16px', borderBottom: `1px solid ${theme.sidebarBorder}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontWeight: 800, fontSize: 15, color: text1 }}>🎨 Appearance</div>
            <div style={{ fontSize: 12, color: text3, marginTop: 3 }}>Customize your workspace theme</div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: text3, cursor: 'pointer', fontSize: 18, padding: '2px 6px' }}>✕</button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: 20 }}>p
          {/* Theme selection */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: text3, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Background Theme</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {Object.values(THEMES).map(t => (
                <button key={t.name} onClick={() => setThemeName(t.name)}
                  style={{
                    background: t.preview, border: `2px solid ${themeName === t.name ? accent.color : 'transparent'}`,
                    borderRadius: 12, padding: 12, cursor: 'pointer', textAlign: 'left',
                    transition: 'all 0.15s', position: 'relative', overflow: 'hidden',
                    boxShadow: themeName === t.name ? `0 0 0 1px ${accent.color}40` : 'none',
                  }}>
                  {/* Mini preview */}
                  <div style={{ display: 'flex', gap: 5, marginBottom: 10 }}>
                    <div style={{ width: 28, height: 40, borderRadius: 6, background: t.sidebar, border: `1px solid ${t.sidebarBorder}` }}>
                      {[0,1,2,3].map(i => <div key={i} style={{ height: 3, background: t.vars['--border'], borderRadius: 2, margin: '6px 4px 0' }} />)}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ height: 10, background: t.topbar, borderRadius: 4, marginBottom: 4, border: `1px solid ${t.sidebarBorder}` }} />
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                        {[0,1,2,3].map(i => <div key={i} style={{ height: 12, background: t.vars['--bg-surface'], borderRadius: 3, border: `1px solid ${t.vars['--border']}` }} />)}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: 14 }}>{t.emoji}</span>
                    <span style={{ fontSize: 12, fontWeight: themeName === t.name ? 700 : 400, color: themeName === t.name ? '#fff' : '#94a3b8' }}>{t.label}</span>
                    {themeName === t.name && <span style={{ marginLeft: 'auto', fontSize: 14, color: accent.color }}>✓</span>}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Accent color */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: text3, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Accent Color</div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {ACCENT_COLORS.map(a => (
                <button key={a.name} onClick={() => setAccentName(a.name)} title={a.label}
                  style={{
                    width: 36, height: 36, borderRadius: '50%',
                    background: `linear-gradient(135deg, ${a.color}, ${a.light})`,
                    border: `3px solid ${accentName === a.name ? '#fff' : 'transparent'}`,
                    cursor: 'pointer', transition: 'transform 0.15s, border 0.15s',
                    boxShadow: accentName === a.name ? `0 0 0 2px ${a.color}, 0 4px 12px ${a.color}60` : 'none',
                    position: 'relative',
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.15)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                  {accentName === a.name && <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 14, fontWeight: 800 }}>✓</span>}
                </button>
              ))}
            </div>
            <div style={{ marginTop: 8, fontSize: 12, color: text3 }}>
              Selected: <strong style={{ color: accent.color }}>{accent.label}</strong>
            </div>
          </div>

          {/* Font size */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: text3, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Text Size</div>
            <div style={{ display: 'flex', gap: 8 }}>
              {FONT_SIZES.map(f => (
                <button key={f.name} onClick={() => setFontSize(f.name)}
                  style={{
                    flex: 1, padding: '10px 8px', borderRadius: 10, cursor: 'pointer',
                    background: fontSize === f.name ? `${accent.color}20` : bgEl,
                    border: `1.5px solid ${fontSize === f.name ? accent.color : border}`,
                    color: fontSize === f.name ? accent.light : text2,
                    textAlign: 'center', transition: 'all 0.15s',
                  }}>
                  <div style={{ fontSize: 13, fontWeight: 700 }}>{f.label}</div>
                  <div style={{ fontSize: 11, color: text3, marginTop: 2 }}>{f.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Sidebar width hint */}
          <div style={{ background: bgEl, border: `1px solid ${border}`, borderRadius: 12, padding: 14, marginBottom: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: text1, marginBottom: 6 }}>💡 Sidebar Width</div>
            <div style={{ fontSize: 12, color: text3, lineHeight: 1.6 }}>
              Use the <strong style={{ color: accent.light }}>‹ ›</strong> button on the right edge of the sidebar to collapse or expand navigation. Collapsed mode shows only icons.
            </div>
          </div>

          {/* Preview */}
          <div style={{ background: bgEl, border: `1px solid ${border}`, borderRadius: 12, padding: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: text3, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>Live Preview</div>
            <div style={{ background: bgSurface, border: `1px solid ${border}`, borderRadius: 10, padding: 12, marginBottom: 8 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: text1, marginBottom: 4 }}>Card Title</div>
              <div style={{ fontSize: 11, color: text3 }}>Secondary text example</div>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              <div style={{ background: accent.color, borderRadius: 6, padding: '6px 12px', fontSize: 11, fontWeight: 700, color: '#fff' }}>Primary Button</div>
              <div style={{ background: bgEl, border: `1px solid ${border}`, borderRadius: 6, padding: '6px 12px', fontSize: 11, color: text2 }}>Secondary</div>
              <div style={{ background: `${accent.color}20`, border: `1px solid ${accent.color}50`, borderRadius: 12, padding: '3px 8px', fontSize: 11, color: accent.light }}>Badge</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: '14px 20px', borderTop: `1px solid ${theme.sidebarBorder}`, display: 'flex', gap: 10 }}>
          <button onClick={() => { setThemeName('dark'); setAccentName('blue'); setFontSize('normal') }}
            style={{ flex: 1, padding: '9px', borderRadius: 8, background: bgEl, border: `1px solid ${border}`, color: text3, fontSize: 12, cursor: 'pointer' }}>
            ↺ Reset to Default
          </button>
          <button onClick={onClose}
            style={{ flex: 1, padding: '9px', borderRadius: 8, background: accent.color, border: 'none', color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
            ✓ Apply & Close
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(40px); opacity: 0; }
          to   { transform: translateX(0);   opacity: 1; }
        }
      `}</style>
    </div>
  )
}
