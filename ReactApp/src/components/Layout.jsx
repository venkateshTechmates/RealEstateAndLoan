import { useState, useEffect } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import {
  Home, FileText, Wallet, BarChart2, FilePlus, FolderOpen, Search, Shield, CreditCard,
  Calculator, MessageSquare, Bell, User, Layers, Scale, CheckSquare, Package, Flag,
  Settings, ShieldCheck, Globe, RefreshCw, Building2, Building, Users, Briefcase,
  BookOpen, FileCheck, ClipboardList, Hammer, LogOut, ChevronRight, ChevronLeft,
  Palette, DollarSign, Menu, X,
} from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext.jsx'
import { useSessionGuard } from '../utils/session.js'
import FloatingChatbot from './FloatingChatbot.jsx'
import ThemePanel from './ThemePanel.jsx'

const NAV_GROUPS = {
  borrower: [
    { label: 'Dashboard', Icon: Home, to: '/dashboard' },
    { label: 'Apply for Loan', Icon: FileText, to: '/apply' },
    { label: 'My Assets', Icon: Wallet, to: '/assets' },
    { label: 'Asset Overview', Icon: BarChart2, to: '/assets/overview' },
    { label: 'Declare Assets', Icon: FilePlus, to: '/assets/declare' },
    { label: 'Documents', Icon: FolderOpen, to: '/documents' },
    { label: 'Property Search', Icon: Search, to: '/properties' },
    { label: 'Insurance', Icon: Shield, to: '/insurance' },
    { label: 'Loan Servicing', Icon: CreditCard, to: '/servicing' },
    { label: 'Transactions', Icon: DollarSign, to: '/transactions' },
    { label: 'Pre-Qual Calculator', Icon: Calculator, to: '/calculator' },
    { label: 'Messages', Icon: MessageSquare, to: '/messages' },
    { label: 'Notifications', Icon: Bell, to: '/notifications' },
    { label: 'Profile & Settings', Icon: User, to: '/profile' },
  ],
  lender: [
    { label: 'Loan Pipeline', Icon: Layers, to: '/pipeline' },
    { label: 'Underwriting', Icon: Scale, to: '/underwriting' },
    { label: 'Asset Verification', Icon: CheckSquare, to: '/asset-verification' },
    { label: 'Asset Queue', Icon: Package, to: '/asset-queue' },
    { label: 'Documents', Icon: FolderOpen, to: '/documents' },
    { label: 'Insurance', Icon: Shield, to: '/insurance' },
    { label: 'Closing', Icon: Flag, to: '/closing' },
    { label: 'Servicing', Icon: CreditCard, to: '/servicing' },
    { label: 'Transactions', Icon: DollarSign, to: '/transactions' },
    { label: 'Reports', Icon: BarChart2, to: '/reports' },
    { label: 'Compliance', Icon: ShieldCheck, to: '/compliance' },
    { label: 'Messages', Icon: MessageSquare, to: '/messages' },
    { label: 'Notifications', Icon: Bell, to: '/notifications' },
    { label: 'Admin', Icon: Settings, to: '/admin' },
  ],
  broker: [
    { label: 'Dashboard', Icon: Home, to: '/dashboard' },
    { label: 'Broker Portal', Icon: Briefcase, to: '/broker-dashboard' },
    { label: 'Loan Pipeline', Icon: Layers, to: '/pipeline' },
    { label: 'Submit Application', Icon: FilePlus, to: '/apply' },
    { label: 'Documents', Icon: FolderOpen, to: '/documents' },
    { label: 'Property Search', Icon: Search, to: '/properties' },
    { label: 'Insurance', Icon: Shield, to: '/insurance' },
    { label: 'Calculator', Icon: Calculator, to: '/calculator' },
    { label: 'Messages', Icon: MessageSquare, to: '/messages' },
    { label: 'Notifications', Icon: Bell, to: '/notifications' },
    { label: 'Profile & Settings', Icon: User, to: '/profile' },
  ],
  'super-admin': [
    { label: 'Platform Overview', Icon: Globe, to: '/super-admin' },
    { label: 'Tenant Management', Icon: Building2, to: '/tenant-management' },
    { label: 'Workflow Tracker', Icon: RefreshCw, to: '/workflow-tracker' },
    { label: 'All Organizations', Icon: Building2, to: '/admin' },
    { label: 'Reports', Icon: BarChart2, to: '/reports' },
    { label: 'Compliance', Icon: ShieldCheck, to: '/compliance' },
    { label: 'Notifications', Icon: Bell, to: '/notifications' },
    { label: 'Profile & Settings', Icon: User, to: '/profile' },
  ],
  'lender-admin': [
    { label: 'Lender Admin', Icon: Building, to: '/lender-admin' },
    { label: 'Workflow Tracker', Icon: RefreshCw, to: '/workflow-tracker' },
    { label: 'Loan Pipeline', Icon: Layers, to: '/pipeline' },
    { label: 'Underwriting', Icon: Scale, to: '/underwriting' },
    { label: 'Reports', Icon: BarChart2, to: '/reports' },
    { label: 'Transactions', Icon: DollarSign, to: '/transactions' },
    { label: 'Compliance', Icon: ShieldCheck, to: '/compliance' },
    { label: 'Messages', Icon: MessageSquare, to: '/messages' },
    { label: 'Notifications', Icon: Bell, to: '/notifications' },
    { label: 'Profile & Settings', Icon: User, to: '/profile' },
  ],
  'brokerage-admin': [
    { label: 'Brokerage Admin', Icon: Users, to: '/brokerage-admin' },
    { label: 'Workflow Tracker', Icon: RefreshCw, to: '/workflow-tracker' },
    { label: 'Broker Portal', Icon: Briefcase, to: '/broker-dashboard' },
    { label: 'Reports', Icon: BarChart2, to: '/reports' },
    { label: 'Messages', Icon: MessageSquare, to: '/messages' },
    { label: 'Notifications', Icon: Bell, to: '/notifications' },
    { label: 'Profile & Settings', Icon: User, to: '/profile' },
  ],
  'title-admin': [
    { label: 'Title Co Admin', Icon: BookOpen, to: '/title-admin' },
    { label: 'Workflow Tracker', Icon: RefreshCw, to: '/workflow-tracker' },
    { label: 'Title Agent View', Icon: FileCheck, to: '/title-agent' },
    { label: 'Closing', Icon: Flag, to: '/closing' },
    { label: 'Reports', Icon: BarChart2, to: '/reports' },
    { label: 'Messages', Icon: MessageSquare, to: '/messages' },
    { label: 'Notifications', Icon: Bell, to: '/notifications' },
  ],
  'title-agent': [
    { label: 'My Title Orders', Icon: FileCheck, to: '/title-agent' },
    { label: 'Workflow Tracker', Icon: RefreshCw, to: '/workflow-tracker' },
    { label: 'Closing', Icon: Flag, to: '/closing' },
    { label: 'Documents', Icon: FolderOpen, to: '/documents' },
    { label: 'Messages', Icon: MessageSquare, to: '/messages' },
    { label: 'Notifications', Icon: Bell, to: '/notifications' },
  ],
  'insurance-agent': [
    { label: 'Insurance Portal', Icon: Shield, to: '/insurance-portal' },
    { label: 'Workflow Tracker', Icon: RefreshCw, to: '/workflow-tracker' },
    { label: 'Insurance Mgmt', Icon: ClipboardList, to: '/insurance' },
    { label: 'Messages', Icon: MessageSquare, to: '/messages' },
    { label: 'Notifications', Icon: Bell, to: '/notifications' },
  ],
  builder: [
    { label: 'Builder Portal', Icon: Hammer, to: '/builder-portal' },
    { label: 'Workflow Tracker', Icon: RefreshCw, to: '/workflow-tracker' },
    { label: 'Property Search', Icon: Search, to: '/properties' },
    { label: 'Documents', Icon: FolderOpen, to: '/documents' },
    { label: 'Messages', Icon: MessageSquare, to: '/messages' },
    { label: 'Notifications', Icon: Bell, to: '/notifications' },
  ],
}

const ROLE_COLORS = {
  borrower: '#3b82f6',
  lender: '#8b5cf6',
  broker: '#10b981',
  'super-admin': '#f472b6',
  'lender-admin': '#60a5fa',
  'brokerage-admin': '#facc15',
  'title-admin': '#34d399',
  'title-agent': '#34d399',
  'insurance-agent': '#fb923c',
  builder: '#a78bfa',
}
const ROLE_LABELS = {
  borrower: 'Borrower',
  lender: 'Loan Officer',
  broker: 'Broker',
  'super-admin': 'Super Admin',
  'lender-admin': 'Lender Admin',
  'brokerage-admin': 'Brokerage Admin',
  'title-admin': 'Title Co Admin',
  'title-agent': 'Title Agent',
  'insurance-agent': 'Insurance Agent',
  builder: 'Builder',
}
const ROLE_NAMES = {
  borrower: 'John Doe',
  lender: 'Sarah Owen',
  broker: 'Michael B.',
  'super-admin': 'Admin User',
  'lender-admin': 'FNM Admin',
  'brokerage-admin': 'PRG Admin',
  'title-agent': 'Lisa Monroe',
  'title-admin': 'Premier Title',
  'insurance-agent': 'Kevin Hart',
  builder: 'Raj Patel',
}
const ROLE_INITIALS = {
  borrower: 'JD',
  lender: 'SO',
  broker: 'MB',
  'super-admin': 'SA',
  'lender-admin': 'LA',
  'brokerage-admin': 'BA',
  'title-agent': 'LM',
  'title-admin': 'TA',
  'insurance-agent': 'KH',
  builder: 'RP',
}

export default function Layout({ role, setRole, onLogout }) {
  const [collapsed, setCollapsed] = useState(false)
  const [showThemePanel, setShowThemePanel] = useState(false)
  const [sessionExpired, setSessionExpired] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768)
  const navigate = useNavigate()
  const nav = NAV_GROUPS[role] || NAV_GROUPS.lender
  const { theme, accent } = useTheme()

  useSessionGuard(() => setSessionExpired(true))

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    const handler = (e) => {
      setIsMobile(e.matches)
      if (!e.matches) setMobileOpen(false)
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // Close drawer when navigating on mobile
  useEffect(() => { if (isMobile) setMobileOpen(false) }, [navigate, isMobile])

  const t1 = theme.vars['--text-primary']
  const t2 = theme.vars['--text-secondary']
  const t3 = theme.vars['--text-muted']
  const bgEl = theme.vars['--bg-elevated']
  const border = theme.vars['--border']

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: theme.vars['--bg-base'] }}>

      {/* ── Mobile overlay backdrop ── */}
      {isMobile && (
        <div
          className={`sidebar-overlay${mobileOpen ? ' open' : ''}`}
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ── Sidebar wrapper (relative so edge-toggle can poke out) ── */}
      <div style={{
        position: isMobile ? 'fixed' : 'relative',
        top: isMobile ? 0 : undefined,
        left: isMobile ? 0 : undefined,
        bottom: isMobile ? 0 : undefined,
        zIndex: isMobile ? 200 : undefined,
        display: 'flex',
        flexShrink: 0,
        transform: isMobile ? (mobileOpen ? 'translateX(0)' : 'translateX(-100%)') : 'none',
        transition: 'transform 0.25s ease',
      }}>
        <aside style={{
          width: isMobile ? 260 : (collapsed ? 64 : 240),
          minWidth: isMobile ? 260 : (collapsed ? 64 : 240),
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
                onChange={e => {
                  const r = e.target.value
                  setRole(r)
                  const firstNav = NAV_GROUPS[r]?.[0]?.to || '/dashboard'
                  navigate(firstNav)
                }}
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
                <option value="super-admin">⭐ Super Admin</option>
                <option value="lender-admin">🏦 Lender Admin</option>
                <option value="brokerage-admin">🤝 Brokerage Admin</option>
                <option value="title-admin">📜 Title Co Admin</option>
                <option value="title-agent">🔍 Title Agent</option>
                <option value="insurance-agent">🛡️ Insurance Agent</option>
                <option value="builder">🏗️ Builder</option>
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
                <item.Icon size={16} style={{ flexShrink: 0, minWidth: 16 }} />
                {!collapsed && item.label}
              </NavLink>
            ))}
          </nav>

          {/* User footer */}
          <div style={{ padding: '12px 16px', borderTop: `1px solid ${theme.sidebarBorder}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 32, height: 32,
                background: `linear-gradient(135deg, ${ROLE_COLORS[role]}88, ${ROLE_COLORS[role]})`,
                borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, fontWeight: 700, color: '#fff', flexShrink: 0,
              }}>
                {ROLE_INITIALS[role] || 'U'}
              </div>
              {!collapsed && (
                <>
                  <div style={{ flex: 1, overflow: 'hidden' }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: t1 }}>
                      {ROLE_NAMES[role] || 'User'}
                    </div>
                    <div style={{ fontSize: 10, color: t3 }}>{ROLE_LABELS[role]}</div>
                  </div>
                  <button
                    onClick={onLogout}
                    title="Sign Out"
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: t3, padding: '4px 6px', borderRadius: 6, flexShrink: 0, display: 'flex', alignItems: 'center' }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#ef4444' }}
                    onMouseLeave={e => { e.currentTarget.style.color = t3 }}
                  ><LogOut size={16} /></button>
                </>
              )}
            </div>
            {collapsed && (
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: 6 }}>
                <button
                  onClick={onLogout}
                  title="Sign Out"
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: t3, padding: '4px', borderRadius: 6, display: 'flex', alignItems: 'center' }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#ef4444' }}
                  onMouseLeave={e => { e.currentTarget.style.color = t3 }}
                ><LogOut size={16} /></button>
              </div>
            )}
          </div>
        </aside>

        {/* ── Mobile close button inside drawer ── */}
        {isMobile && (
          <button
            onClick={() => setMobileOpen(false)}
            style={{
              position: 'absolute', top: 12, right: 12,
              background: bgEl, border: `1px solid ${border}`,
              borderRadius: '50%', width: 28, height: 28,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: t2, zIndex: 10,
            }}
          ><X size={14} /></button>
        )}

        {/* ── Edge toggle button (desktop only) ── */}
        {!isMobile && <button
          className="sidebar-edge-btn"
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
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>}
      </div>

      {/* ── Main content ── */}
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <TopBar role={role} accent={accent} theme={theme} onThemeClick={() => setShowThemePanel(p => !p)} onLogout={onLogout} onMobileToggle={() => setMobileOpen(o => !o)} isMobile={isMobile} />
        <main className="main-content" style={{ flex: 1, padding: '24px', overflowY: 'auto', maxWidth: 1400, width: '100%', margin: '0 auto', boxSizing: 'border-box' }}>
          <Outlet />
        </main>
      </div>

      {/* ── Theme panel slide-over ── */}
      {showThemePanel && <ThemePanel onClose={() => setShowThemePanel(false)} />}

      {/* ── Floating chatbot ── */}
      <FloatingChatbot />

      {/* ── Session expired modal ── */}
      {sessionExpired && (
        <div style={{
          position: 'fixed', inset: 0,
          background: 'rgba(0,0,0,0.65)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 9999,
        }}>
          <div style={{
            background: theme.vars['--bg-elevated'],
            border: `1px solid ${theme.vars['--border']}`,
            borderRadius: 16,
            padding: '32px 28px',
            maxWidth: 360,
            width: '90%',
            textAlign: 'center',
            boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
          }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>⏰</div>
            <h2 style={{ color: theme.vars['--text-primary'], marginBottom: 8, fontSize: 18, fontWeight: 700 }}>Session Expired</h2>
            <p style={{ color: theme.vars['--text-muted'], fontSize: 13, marginBottom: 24, lineHeight: 1.6 }}>
              Your session has expired after 5 minutes of inactivity. Please sign in again to continue.
            </p>
            <button
              onClick={onLogout}
              className="btn btn-primary"
              style={{ width: '100%', justifyContent: 'center', padding: '11px 0', fontSize: 14 }}
            >
              Sign In Again
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function TopBar({ role, accent, theme, onThemeClick, onLogout, onMobileToggle, isMobile }) {
  const navigate = useNavigate()
  const t3 = theme.vars['--text-muted']
  const bgEl = theme.vars['--bg-elevated']
  const border = theme.vars['--border']

  return (
    <div className="topbar" style={{
      height: 56,
      borderBottom: `1px solid ${theme.sidebarBorder}`,
      background: theme.topbar,
      display: 'flex',
      alignItems: 'center',
      padding: '0 24px',
      gap: 12,
      position: 'sticky',
      top: 0,
      zIndex: 10,
      flexShrink: 0,
    }}>
      {/* Hamburger – mobile only */}
      {isMobile && (
        <button className="hamburger-btn" onClick={onMobileToggle} title="Open menu">
          <Menu size={20} />
        </button>
      )}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10 }}>
        <div className="topbar-search" style={{
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
          flexShrink: 0,
        }}>
          <Search size={14} style={{ flexShrink: 0 }} />
          <span>Search applications, properties…</span>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <button onClick={onThemeClick} title="Appearance & Theme" className="btn-ghost" style={{ padding: '6px 8px', borderRadius: 8, display: 'flex', alignItems: 'center' }}><Palette size={18} /></button>
        <button className="btn-ghost" style={{ padding: '6px 8px', display: 'flex', alignItems: 'center' }} onClick={() => navigate('/notifications')}><Bell size={18} /></button>
        <button className="btn-ghost" style={{ padding: '6px 8px', display: 'flex', alignItems: 'center' }} onClick={() => navigate('/messages')}><MessageSquare size={18} /></button>
        <div style={{ width: 1, height: 24, background: border, margin: '0 4px' }} />
        <button
          onClick={onLogout}
          title="Sign Out"
          className="btn-ghost"
          style={{ fontSize: 16, padding: '6px 8px', borderRadius: 8, color: t3, display: 'flex', alignItems: 'center' }}
          onMouseEnter={e => { e.currentTarget.style.color = '#ef4444' }}
          onMouseLeave={e => { e.currentTarget.style.color = t3 }}
        ><LogOut size={16} /></button>
        <div style={{ width: 1, height: 24, background: border, margin: '0 4px' }} />
        <div style={{
          background: `linear-gradient(135deg, ${accent.color}, #0284c7)`,
          borderRadius: '50%',
          width: 32, height: 32,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 12, fontWeight: 700, color: '#fff', cursor: 'pointer',
        }}
          onClick={() => navigate('/profile')}
        >
          {role === 'borrower' ? 'JD' : role === 'lender' ? 'SO' : 'MB'}
        </div>
      </div>
    </div>
  )
}
