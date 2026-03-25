import { useState } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useTheme } from '../contexts/ThemeContext.jsx'
import FloatingChatbot from './FloatingChatbot.jsx'
import ThemePanel from './ThemePanel.jsx'

const NAV_GROUPS = {
  borrower: [
    { label: 'Dashboard', icon: '🏠', to: '/dashboard' },
    { label: 'Apply for Loan', icon: '📋', to: '/apply' },
    { label: 'My Assets', icon: '💰', to: '/assets' },
    { label: 'Asset Overview', icon: '📊', to: '/assets/overview' },
    { label: 'Declare Assets', icon: '📝', to: '/assets/declare' },
    { label: 'Documents', icon: '📁', to: '/documents' },
    { label: 'Property Search', icon: '🔍', to: '/properties' },
    { label: 'Insurance', icon: '🛡️', to: '/insurance' },
    { label: 'Loan Servicing', icon: '💳', to: '/servicing' },
    { label: 'Pre-Qual Calculator', icon: '🧮', to: '/calculator' },
    { label: 'Messages', icon: '💬', to: '/messages' },
    { label: 'Notifications', icon: '🔔', to: '/notifications' },
    { label: 'Profile & Settings', icon: '👤', to: '/profile' },
  ],
  lender: [
    { label: 'Loan Pipeline', icon: '📌', to: '/pipeline' },
    { label: 'Underwriting', icon: '⚖️', to: '/underwriting' },
    { label: 'Asset Verification', icon: '✅', to: '/asset-verification' },
    { label: 'Asset Queue', icon: '📦', to: '/asset-queue' },
    { label: 'Documents', icon: '📁', to: '/documents' },
    { label: 'Insurance', icon: '🛡️', to: '/insurance' },
    { label: 'Closing', icon: '🏁', to: '/closing' },
    { label: 'Servicing', icon: '💳', to: '/servicing' },
    { label: 'Reports', icon: '📈', to: '/reports' },
    { label: 'Messages', icon: '💬', to: '/messages' },
    { label: 'Notifications', icon: '🔔', to: '/notifications' },
    { label: 'Admin', icon: '⚙️', to: '/admin' },
  ],
  broker: [
    { label: 'Dashboard', icon: '🏠', to: '/dashboard' },
    { label: 'Broker Portal', icon: '🤝', to: '/broker-dashboard' },
    { label: 'Loan Pipeline', icon: '📌', to: '/pipeline' },
    { label: 'Submit Application', icon: '📋', to: '/apply' },
    { label: 'Documents', icon: '📁', to: '/documents' },
    { label: 'Property Search', icon: '🔍', to: '/properties' },
    { label: 'Insurance', icon: '🛡️', to: '/insurance' },
    { label: 'Calculator', icon: '🧮', to: '/calculator' },
    { label: 'Messages', icon: '💬', to: '/messages' },
    { label: 'Notifications', icon: '🔔', to: '/notifications' },
    { label: 'Profile & Settings', icon: '👤', to: '/profile' },
  ],
}

const ROLE_COLORS = {
  borrower: '#3b82f6',
  lender: '#8b5cf6',
  broker: '#10b981',
}
const ROLE_LABELS = { borrower: 'Borrower', lender: 'Loan Officer', broker: 'Broker' }

export default function Layout({ role, setRole }) {
  const [collapsed, setCollapsed] = useState(false)
  const [showThemePanel, setShowThemePanel] = useState(false)
  const navigate = useNavigate()
  const nav = NAV_GROUPS[role] || NAV_GROUPS.borrower
  const { theme, accent } = useTheme()

  const t1 = theme.vars['--text-primary']
  const t2 = theme.vars['--text-secondary']
  const t3 = theme.vars['--text-muted']
  const bgEl = theme.vars['--bg-elevated']
  const border = theme.vars['--border']

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: theme.vars['--bg-base'] }}>

      {/* ── Sidebar wrapper (relative so edge-toggle can poke out) ── */}
      <div style={{ position: 'relative', display: 'flex', flexShrink: 0 }}>
        <aside style={{
          width: collapsed ? 64 : 240,
          minWidth: collapsed ? 64 : 240,
          background: theme.sidebar,
          borderRight: `1px solid ${theme.sidebarBorder}`,
          display: 'flex',
          flexDirection: 'column',
          transition: 'width 0.22s ease',
          overflow: 'hidden',
        }}>
          {/* Logo */}
          <div style={{
            padding: '20px 16px 16px',
            borderBottom: `1px solid ${theme.sidebarBorder}`,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}>
            <div style={{
              width: 32, height: 32,
              background: `linear-gradient(135deg, ${accent.color}, #0284c7)`,
              borderRadius: 8,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 16, flexShrink: 0,
            }}>🏦</div>
            {!collapsed && (
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: t1, lineHeight: 1.1 }}>RE Loan Suite</div>
                <div style={{ fontSize: 10, color: t3, marginTop: 2 }}>Enterprise Platform</div>
              </div>
            )}
          </div>

          {/* Role selector */}
          {!collapsed && (
            <div style={{ padding: '12px 14px', borderBottom: `1px solid ${theme.sidebarBorder}` }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: t3, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>Active Role</div>
              <select
                value={role}
                onChange={e => { setRole(e.target.value); navigate('/dashboard') }}
                style={{
                  background: bgEl,
                  border: `1px solid ${border}`,
                  color: ROLE_COLORS[role],
                  fontSize: 12,
                  fontWeight: 600,
                  borderRadius: 6,
                  padding: '5px 8px',
                  width: '100%',
                }}
              >
                <option value="borrower">🏠 Borrower / Applicant</option>
                <option value="lender">🏦 Loan Officer / UW</option>
                <option value="broker">🤝 Broker</option>
              </select>
            </div>
          )}

          {/* Navigation */}
          <nav style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}>
            {nav.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: collapsed ? '10px 16px' : '9px 16px',
                  fontSize: 13,
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? t1 : t3,
                  background: isActive ? theme.navActive : 'transparent',
                  borderRight: isActive ? `3px solid ${ROLE_COLORS[role]}` : '3px solid transparent',
                  textDecoration: 'none',
                  transition: 'all 0.1s',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                })}
              >
                <span style={{ fontSize: 16, flexShrink: 0 }}>{item.icon}</span>
                {!collapsed && item.label}
              </NavLink>
            ))}
          </nav>

          {/* User footer */}
          <div style={{ padding: '14px 16px', borderTop: `1px solid ${theme.sidebarBorder}`, display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 32, height: 32,
              background: `linear-gradient(135deg, ${ROLE_COLORS[role]}88, ${ROLE_COLORS[role]})`,
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 13, fontWeight: 700, color: '#fff', flexShrink: 0,
            }}>
              {role === 'borrower' ? 'JD' : role === 'lender' ? 'SO' : 'MB'}
            </div>
            {!collapsed && (
              <div style={{ overflow: 'hidden' }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: t1 }}>
                  {role === 'borrower' ? 'John Doe' : role === 'lender' ? 'Sarah Owen' : 'Michael B.'}
                </div>
                <div style={{ fontSize: 10, color: t3 }}>{ROLE_LABELS[role]}</div>
              </div>
            )}
          </div>
        </aside>

        {/* ── Edge toggle button ── */}
        <button
          onClick={() => setCollapsed(c => !c)}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          style={{
            position: 'absolute',
            right: -13,
            top: '50%',
            transform: 'translateY(-50%)',
            width: 26,
            height: 26,
            borderRadius: '50%',
            background: bgEl,
            border: `2px solid ${border}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: 13,
            color: t2,
            zIndex: 50,
            boxShadow: '0 2px 10px rgba(0,0,0,0.35)',
            transition: 'background 0.15s, color 0.15s',
            padding: 0,
          }}
          onMouseEnter={e => { e.currentTarget.style.background = accent.color; e.currentTarget.style.color = '#fff' }}
          onMouseLeave={e => { e.currentTarget.style.background = bgEl; e.currentTarget.style.color = t2 }}
        >
          {collapsed ? '›' : '‹'}
        </button>
      </div>

      {/* ── Main content ── */}
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <TopBar role={role} accent={accent} theme={theme} onThemeClick={() => setShowThemePanel(p => !p)} />
        <main style={{ flex: 1, padding: '24px', overflowY: 'auto', maxWidth: 1400, width: '100%', margin: '0 auto', boxSizing: 'border-box' }}>
          <Outlet />
        </main>
      </div>

      {/* ── Theme panel slide-over ── */}
      {showThemePanel && <ThemePanel onClose={() => setShowThemePanel(false)} />}

      {/* ── Floating chatbot ── */}
      <FloatingChatbot />
    </div>
  )
}

function TopBar({ role, accent, theme, onThemeClick }) {
  const navigate = useNavigate()
  const t3 = theme.vars['--text-muted']
  const bgEl = theme.vars['--bg-elevated']
  const border = theme.vars['--border']

  return (
    <div style={{
      height: 56,
      borderBottom: `1px solid ${theme.sidebarBorder}`,
      background: theme.topbar,
      display: 'flex',
      alignItems: 'center',
      padding: '0 24px',
      gap: 16,
      position: 'sticky',
      top: 0,
      zIndex: 10,
      flexShrink: 0,
    }}>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          background: bgEl,
          border: `1px solid ${border}`,
          borderRadius: 8,
          padding: '6px 12px',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          color: t3,
          fontSize: 13,
          width: 280,
        }}>
          <span>🔍</span>
          <span>Search applications, properties…</span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        {/* Theme toggle */}
        <button
          onClick={onThemeClick}
          title="Appearance & Theme"
          className="btn-ghost"
          style={{ fontSize: 18, padding: '6px 8px', borderRadius: 8 }}
        >🎨</button>

        {/* Notifications */}
        <button className="btn-ghost" style={{ fontSize: 18, padding: '6px 8px' }} onClick={() => navigate('/notifications')}>🔔</button>

        {/* Messages */}
        <button className="btn-ghost" style={{ fontSize: 18, padding: '6px 8px' }} onClick={() => navigate('/messages')}>💬</button>

        <div style={{ width: 1, height: 24, background: border, margin: '0 4px' }} />

        {/* Avatar */}
        <div style={{
          background: `linear-gradient(135deg, ${accent.color}, #0284c7)`,
          borderRadius: '50%',
          width: 32, height: 32,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 12, fontWeight: 700, color: '#fff',
          cursor: 'pointer',
        }}
          onClick={() => navigate('/profile')}
        >
          {role === 'borrower' ? 'JD' : role === 'lender' ? 'SO' : 'MB'}
        </div>
      </div>
    </div>
  )
}
