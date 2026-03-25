import { useState } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'

const NAV_GROUPS = {
  borrower: [
    { label: 'Dashboard', icon: '🏠', to: '/dashboard' },
    { label: 'Apply for Loan', icon: '📋', to: '/apply' },
    { label: 'My Assets', icon: '💰', to: '/assets/overview' },
    { label: 'Declare Assets', icon: '📝', to: '/assets/declare' },
    { label: 'Documents', icon: '📁', to: '/documents' },
    { label: 'Property Search', icon: '🔍', to: '/properties' },
    { label: 'Insurance', icon: '🛡️', to: '/insurance' },
    { label: 'Loan Servicing', icon: '💳', to: '/servicing' },
  ],
  lender: [
    { label: 'Loan Pipeline', icon: '📌', to: '/pipeline' },
    { label: 'Underwriting', icon: '⚖️', to: '/underwriting' },
    { label: 'Asset Verification', icon: '✅', to: '/asset-verification' },
    { label: 'Documents', icon: '📁', to: '/documents' },
    { label: 'Insurance', icon: '🛡️', to: '/insurance' },
    { label: 'Closing', icon: '🏁', to: '/closing' },
    { label: 'Servicing', icon: '💳', to: '/servicing' },
    { label: 'Admin', icon: '⚙️', to: '/admin' },
  ],
  broker: [
    { label: 'Dashboard', icon: '🏠', to: '/dashboard' },
    { label: 'Loan Pipeline', icon: '📌', to: '/pipeline' },
    { label: 'Submit Application', icon: '📋', to: '/apply' },
    { label: 'Documents', icon: '📁', to: '/documents' },
    { label: 'Property Search', icon: '🔍', to: '/properties' },
    { label: 'Insurance', icon: '🛡️', to: '/insurance' },
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
  const navigate = useNavigate()
  const nav = NAV_GROUPS[role] || NAV_GROUPS.borrower

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      {/* Sidebar */}
      <aside style={{
        width: collapsed ? 64 : 240,
        minWidth: collapsed ? 64 : 240,
        background: '#131e30',
        borderRight: '1px solid #1e293b',
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 0.2s ease',
        overflow: 'hidden',
      }}>
        {/* Logo */}
        <div style={{
          padding: '20px 16px 16px',
          borderBottom: '1px solid #1e293b',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}>
          <div style={{
            width: 32, height: 32,
            background: 'linear-gradient(135deg,#1e40af,#0284c7)',
            borderRadius: 8,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 16, flexShrink: 0,
          }}>🏦</div>
          {!collapsed && (
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#f1f5f9', lineHeight: 1.1 }}>RE Loan Suite</div>
              <div style={{ fontSize: 10, color: '#475569', marginTop: 2 }}>Enterprise Platform</div>
            </div>
          )}
          <button
            onClick={() => setCollapsed(c => !c)}
            style={{
              marginLeft: 'auto',
              background: 'none',
              color: '#475569',
              fontSize: 14,
              padding: '2px 4px',
              borderRadius: 4,
            }}
          >{collapsed ? '→' : '←'}</button>
        </div>

        {/* Role selector */}
        {!collapsed && (
          <div style={{ padding: '12px 14px', borderBottom: '1px solid #1e293b' }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: '#475569', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>Active Role</div>
            <select
              value={role}
              onChange={e => { setRole(e.target.value); navigate('/dashboard') }}
              style={{
                background: '#1e293b',
                border: '1px solid #334155',
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
                color: isActive ? '#f1f5f9' : '#64748b',
                background: isActive ? 'rgba(59,130,246,0.1)' : 'transparent',
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
        <div style={{ padding: '14px 16px', borderTop: '1px solid #1e293b', display: 'flex', alignItems: 'center', gap: 10 }}>
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
              <div style={{ fontSize: 12, fontWeight: 600, color: '#f1f5f9', truncate: true }}>
                {role === 'borrower' ? 'John Doe' : role === 'lender' ? 'Sarah Owen' : 'Michael B.'}
              </div>
              <div style={{ fontSize: 10, color: '#475569' }}>{ROLE_LABELS[role]}</div>
            </div>
          )}
        </div>
      </aside>

      {/* Main content */}
      <div style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
        <TopBar role={role} />
        <main style={{ flex: 1, padding: '24px', overflowY: 'auto', maxWidth: 1400, width: '100%', margin: '0 auto' }}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

function TopBar({ role }) {
  return (
    <div style={{
      height: 56,
      borderBottom: '1px solid #1e293b',
      background: '#131e30',
      display: 'flex',
      alignItems: 'center',
      padding: '0 24px',
      gap: 16,
      position: 'sticky',
      top: 0,
      zIndex: 10,
    }}>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          background: '#1e293b',
          border: '1px solid #334155',
          borderRadius: 8,
          padding: '6px 12px',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          color: '#475569',
          fontSize: 13,
          width: 280,
        }}>
          <span>🔍</span>
          <span>Search applications, properties…</span>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button className="btn-ghost" style={{ fontSize: 18, padding: '4px 8px' }}>🔔</button>
        <button className="btn-ghost" style={{ fontSize: 18, padding: '4px 8px' }}>💬</button>
        <div style={{ width: 1, height: 24, background: '#1e293b' }} />
        <div style={{
          background: 'linear-gradient(135deg,#1e40af,#0284c7)',
          borderRadius: '50%',
          width: 32, height: 32,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 12, fontWeight: 700, color: '#fff',
        }}>
          {role === 'borrower' ? 'JD' : role === 'lender' ? 'SO' : 'MB'}
        </div>
      </div>
    </div>
  )
}
