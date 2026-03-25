import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Building2, Users, FileText, Home, UserCog, ArrowRight, ChevronLeft,
  Lock, Eye, EyeOff, Search, Smartphone, Key, Phone, RefreshCw,
  AlertCircle, CheckCircle2, Shield, Globe, Mail, Anchor,
} from 'lucide-react'

const TENANTS = [
  { id: 'firstbank',     name: 'First Bank',            type: 'bank',         color: '#1e40af', abbr: 'FB', tagline: 'Loan Management Portal',        phone: '1-800-555-0123', email: 'support@firstbank.com',      sso: ['Microsoft', 'Okta', 'Google'] },
  { id: 'chase',         name: 'Chase',                 type: 'bank',         color: '#0284c7', abbr: 'JP', tagline: 'Professional Banking Portal',     phone: '1-800-555-2479', email: 'support@chase.com',          sso: ['Microsoft', 'Okta'] },
  { id: 'wellsfargo',    name: 'Wells Fargo',            type: 'bank',         color: '#dc2626', abbr: 'WF', tagline: 'Enterprise Loan Platform',        phone: '1-800-555-1234', email: 'support@wellsfargo.com',     sso: ['Microsoft', 'Google'] },
  { id: 'navyfederal',   name: 'Navy Federal CU',        type: 'credit-union', color: '#1e3a8a', abbr: 'NF', tagline: 'Member Services Portal',          phone: '1-888-842-6328', email: 'support@navyfederal.org',    sso: [] },
  { id: 'citibank',      name: 'Citi Bank',              type: 'bank',         color: '#7c3aed', abbr: 'CB', tagline: 'Loan Processing Platform',        phone: '1-800-555-3330', email: 'support@citi.com',           sso: ['Microsoft', 'Okta', 'Google'] },
  { id: 'pnc',           name: 'PNC Bank',               type: 'bank',         color: '#f59e0b', abbr: 'PN', tagline: 'Commercial Banking Portal',       phone: '1-800-555-7780', email: 'support@pnc.com',            sso: ['Microsoft'] },
  { id: 'loandepot',     name: 'LoanDepot',              type: 'broker',       color: '#6d28d9', abbr: 'LD', tagline: 'Broker Access Portal',            phone: '1-800-555-6789', email: 'broker@loandepot.com',       sso: [] },
  { id: 'firstamerican', name: 'First American Title',   type: 'title',        color: '#059669', abbr: 'FA', tagline: 'Title Professional Portal',       phone: '1-800-555-4321', email: 'title@firstam.com',          sso: ['Microsoft'] },
  { id: 'borrower',      name: 'Borrower Portal',        type: 'borrower',     color: '#0891b2', abbr: 'BP', tagline: 'Your Home Loan Journey',          phone: '1-800-555-1234', email: 'help@loanplatform.com',      sso: ['Google'] },
  { id: 'abcmortgage',   name: 'ABC Mortgage',           type: 'admin',        color: '#f59e0b', abbr: 'AM', tagline: 'Administrator Portal',            phone: 'N/A',            email: 'admin@abcmortgage.com',      sso: [] },
  { id: 'truist',        name: 'Truist',                 type: 'bank',         color: '#10b981', abbr: 'TR', tagline: 'Banking Services Portal',         phone: '1-800-555-8874', email: 'support@truist.com',         sso: ['Microsoft', 'Okta'] },
]

const TYPE_ICONS    = { bank: Building2, 'credit-union': Anchor, broker: Users, title: FileText, borrower: Home, admin: UserCog }
const TYPE_LABELS   = { bank: 'Bank', 'credit-union': 'Credit Union', broker: 'Broker Portal', title: 'Title Company', borrower: 'Borrower Portal', admin: 'Admin Portal' }
const OFFICES       = ['Austin, TX', 'New York, NY', 'Chicago, IL', 'Los Angeles, CA', 'Dallas, TX', 'Phoenix, AZ', 'Seattle, WA', 'Miami, FL', 'Atlanta, GA']
const SSO_COLORS    = { Microsoft: '#0078d4', Okta: '#007dc1', Google: '#4285f4' }
const SSO_ICONS     = { Microsoft: '⊞', Okta: '🔑', Google: '🌐' }

const pgStyle = {
  minHeight: '100vh',
  background: 'linear-gradient(135deg,var(--bg-base) 0%,var(--bg-elevated) 50%,var(--bg-base) 100%)',
  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
  padding: '40px 24px', position: 'relative', overflow: 'hidden',
}
const cardStyle = { background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 16, padding: '32px', width: '100%', position: 'relative' }
const inputStyle = { width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--bg-elevated)', color: 'var(--text-primary)', fontSize: 14, boxSizing: 'border-box' }
const labelStyle  = { fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', letterSpacing: '0.04em', marginBottom: 5, display: 'block' }

function AmbientBlobs() {
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
      <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 65%)' }} />
      <div style={{ position: 'absolute', bottom: '-5%', right: '-5%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 65%)' }} />
    </div>
  )
}

export default function MultiTenantLogin() {
  const nav = useNavigate()
  const [view, setView]       = useState('select')  // select | login | mfa | sso | reset | reset-sent
  const [tenant, setTenant]   = useState(null)
  const [search, setSearch]   = useState('')
  const [domain, setDomain]   = useState('')
  const [form, setForm]       = useState({ email: '', password: '', memberId: '', brokerId: '', username: '', officeLocation: 'Austin, TX', adminUsername: '' })
  const [showPw, setShowPw]   = useState(false)
  const [remember, setRemember] = useState(false)
  const [mfaCode, setMfaCode] = useState('')
  const [ssoProvider, setSsoProvider] = useState('')
  const [ssoEmail, setSsoEmail] = useState('')

  const filtered   = TENANTS.filter(t => t.name.toLowerCase().includes(search.toLowerCase()))
  const TenantIcon = tenant ? (TYPE_ICONS[tenant.type] || Building2) : Building2

  const selectTenant = (t) => { setTenant(t); setForm({ ...form, email: '', password: '' }); setView('login') }
  const handleLogin  = (e) => { e.preventDefault(); setView('mfa') }
  const handleMfa    = (e) => { e.preventDefault(); nav('/dashboard') }
  const handleSso    = (provider) => { setSsoProvider(provider); setSsoEmail(form.email || 'user@' + (tenant?.id || 'org') + '.com'); setView('sso') }
  const handleSsoContinue = (e) => { e.preventDefault(); nav('/dashboard') }
  const handleReset       = (e) => { e.preventDefault(); setView('reset-sent') }
  const handleDomain = (e) => {
    e.preventDefault()
    if (domain.trim()) { setTenant({ ...TENANTS[0], name: domain.replace('.loanplatform.com', ''), tagline: 'Custom Domain Portal', type: 'bank' }); setView('login') }
  }
  const f = (key, val) => setForm(prev => ({ ...prev, [key]: val }))

  // ─────────────────────────────── SELECT SCREEN ────────────────────────────────
  if (view === 'select') return (
    <div style={pgStyle}>
      <AmbientBlobs />
      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 960 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ width: 64, height: 64, background: 'linear-gradient(135deg,#1e40af,#0284c7)', borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', boxShadow: '0 8px 32px rgba(59,130,246,0.28)', fontSize: 28 }}>🏢</div>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>LoanPlatform Enterprise</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 14, marginTop: 6 }}>Welcome to the LoanPlatform Suite</p>
          <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 2 }}>Please select your organization to continue</p>
        </div>

        {/* Search */}
        <div style={{ position: 'relative', maxWidth: 420, margin: '0 auto 28px' }}>
          <Search size={15} style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search organizations..." style={{ ...inputStyle, paddingLeft: 38 }} />
        </div>

        {/* Tenant Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
          {filtered.map(t => {
            const Ic = TYPE_ICONS[t.type] || Building2
            return (
              <div key={t.id} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '22px 20px', cursor: 'pointer', transition: 'border-color 0.15s' }} onClick={() => selectTenant(t)}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: t.color + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', color: t.color, flexShrink: 0 }}>
                    <Ic size={20} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-primary)' }}>{t.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{TYPE_LABELS[t.type]}</div>
                  </div>
                </div>
                <button className="btn btn-secondary btn-sm" style={{ width: '100%', justifyContent: 'center', fontSize: 12 }} onClick={e => { e.stopPropagation(); selectTenant(t) }}>
                  Continue <ArrowRight size={12} />
                </button>
              </div>
            )
          })}
        </div>

        {/* Domain Entry */}
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '20px 24px', marginBottom: 20 }}>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 12, fontWeight: 500 }}>Or enter your organization domain:</div>
          <form onSubmit={handleDomain} style={{ display: 'flex', gap: 10 }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <Globe size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
              <input value={domain} onChange={e => setDomain(e.target.value)} placeholder="your-company.loanplatform.com" style={{ ...inputStyle, paddingLeft: 34 }} />
            </div>
            <button type="submit" className="btn btn-primary">Go <ArrowRight size={13} /></button>
          </form>
        </div>

        <div style={{ textAlign: 'center', fontSize: 12, color: 'var(--text-muted)' }}>
          Need help?&ensp;<a href="#" style={{ color: 'var(--blue-light)' }}>Contact Support</a>
          &ensp;|&ensp;
          <button onClick={() => nav('/login')} style={{ background: 'none', border: 'none', color: 'var(--blue-light)', fontSize: 12, cursor: 'pointer', padding: 0 }}>← Back to Login</button>
        </div>
      </div>
    </div>
  )

  // ─────────────────────────────── LOGIN SCREEN ────────────────────────────────
  if (view === 'login') {
    const accentBg = tenant.color + '18'
    const isBorrower = tenant.type === 'borrower'

    const LoginFormFields = () => {
      switch (tenant.type) {
        case 'credit-union': return (
          <>
            <div className="form-group">
              <label style={labelStyle}>MEMBER NUMBER</label>
              <input type="text" placeholder="123456789" value={form.memberId} onChange={e => f('memberId', e.target.value)} style={inputStyle} required />
            </div>
          </>
        )
        case 'broker': return (
          <>
            <div className="form-group">
              <label style={labelStyle}>BROKER ID</label>
              <input type="text" placeholder="BRK-12345" value={form.brokerId} onChange={e => f('brokerId', e.target.value)} style={inputStyle} required />
            </div>
            <div className="form-group">
              <label style={labelStyle}>USERNAME</label>
              <input type="text" placeholder="michael.broker@loandepot.com" value={form.username} onChange={e => f('username', e.target.value)} style={inputStyle} required />
            </div>
          </>
        )
        case 'title': return (
          <div className="form-group">
            <label style={labelStyle}>EMAIL ADDRESS</label>
            <input type="email" placeholder="lisa.title@firstam.com" value={form.email} onChange={e => f('email', e.target.value)} style={inputStyle} required />
          </div>
        )
        case 'admin': return (
          <>
            <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 12, color: 'var(--text-secondary)' }}>
              <strong style={{ color: 'var(--text-primary)' }}>Tenant:</strong> {tenant.name}&ensp;
              <span style={{ color: 'var(--text-muted)' }}>(ID: tenant_{tenant.id})</span>
            </div>
            <div className="form-group">
              <label style={labelStyle}>ADMIN USERNAME</label>
              <input type="text" placeholder={`admin@${tenant.id}.com`} value={form.adminUsername} onChange={e => f('adminUsername', e.target.value)} style={inputStyle} required />
            </div>
          </>
        )
        default: return (
          <div className="form-group">
            <label style={labelStyle}>EMAIL ADDRESS</label>
            <input type="email" placeholder={`user@${tenant.id}.com`} value={form.email} onChange={e => f('email', e.target.value)} style={inputStyle} required />
          </div>
        )
      }
    }

    const PasswordField = () => (
      <div className="form-group">
        <label style={labelStyle}>PASSWORD</label>
        <div style={{ position: 'relative' }}>
          <input type={showPw ? 'text' : 'password'} placeholder="••••••••••••••••••" value={form.password} onChange={e => f('password', e.target.value)} style={{ ...inputStyle, paddingRight: 44 }} required />
          <button type="button" onClick={() => setShowPw(s => !s)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 0 }}>
            {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>
    )

    const ActionRow = ({ label = 'Sign In →' }) => (
      <>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-secondary)', cursor: 'pointer' }}>
            <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} /> Remember me
          </label>
          <button type="button" onClick={() => setView('reset')} style={{ background: 'none', border: 'none', color: 'var(--blue-light)', fontSize: 13, cursor: 'pointer', padding: 0 }}>Forgot Password?</button>
        </div>
        <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '12px 0', fontSize: 14 }}>{label}</button>
      </>
    )

    const SsoButtons = () => tenant.sso.length > 0 && (
      <>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '20px 0 12px' }}>
          <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
          <span style={{ fontSize: 11, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>Or continue with SSO</span>
          <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {tenant.sso.map(provider => (
            <button key={provider} type="button" onClick={() => handleSso(provider)}
              style={{ flex: 1, padding: '9px 12px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--bg-elevated)', color: 'var(--text-primary)', cursor: 'pointer', fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              <Lock size={12} style={{ color: SSO_COLORS[provider] }} /> {provider}
            </button>
          ))}
        </div>
      </>
    )

    if (isBorrower) return (
      <div style={pgStyle}>
        <AmbientBlobs />
        <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 900 }}>
          <div style={{ display: 'flex', gap: 0, background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
            {/* Left: form */}
            <div style={{ flex: '0 0 400px', padding: '36px 32px', borderRight: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: tenant.color + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', color: tenant.color }}>
                  <Home size={16} />
                </div>
                <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>LoanPlatform</span>
              </div>
              <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 24, marginTop: 16 }}>🔐 Sign In to Your Account</h2>
              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <label style={labelStyle}>EMAIL ADDRESS</label>
                  <input type="email" placeholder="john.doe@email.com" value={form.email} onChange={e => f('email', e.target.value)} style={inputStyle} required />
                </div>
                <PasswordField />
                <ActionRow label="Sign In" />
                <SsoButtons />
              </form>
              <div style={{ marginTop: 20, padding: '14px', background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12, color: 'var(--text-secondary)', textAlign: 'center' }}>
                Don't have an account?&ensp;<button type="button" onClick={() => nav('/apply')} style={{ background: 'none', border: 'none', color: 'var(--blue-light)', fontSize: 12, cursor: 'pointer', fontWeight: 600, padding: 0 }}>Start Your Application →</button>
              </div>
            </div>
            {/* Right: feature highlights */}
            <div style={{ flex: 1, padding: '36px 32px', background: 'linear-gradient(135deg, rgba(8,145,178,0.08) 0%, transparent 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 8 }}>🏠 Your Home Loan Journey</div>
              <div style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 24 }}>Starts Here</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
                {['Track your application status', 'Upload documents securely', 'Verify your assets quickly', 'Communicate with your loan officer', 'Get real-time updates'].map(feat => (
                  <div key={feat} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: 'var(--text-secondary)' }}>
                    <CheckCircle2 size={16} style={{ color: '#10b981', flexShrink: 0 }} /> {feat}
                  </div>
                ))}
              </div>
              <div style={{ padding: '14px', background: 'rgba(8,145,178,0.08)', border: '1px solid rgba(8,145,178,0.2)', borderRadius: 10, fontSize: 12, color: 'var(--text-secondary)' }}>
                ⚡ <strong>Quick Tip:</strong> Use Plaid to verify bank accounts in just 2 minutes!
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: 16, fontSize: 12, color: 'var(--text-muted)' }}>
            🔒 Secured by Bank-Level Encryption &ensp;|&ensp; <a href="#" style={{ color: 'var(--blue-light)' }}>Chat with Support</a> &ensp;|&ensp; <a href="#" style={{ color: 'var(--blue-light)' }}>Call 1-800-555-1234</a>
          </div>
        </div>
      </div>
    )

    return (
      <div style={pgStyle}>
        <AmbientBlobs />
        <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 480 }}>
          {/* Tenant brand banner */}
          <div style={{ background: accentBg, border: `1px solid ${tenant.color}33`, borderRadius: '14px 14px 0 0', padding: '16px 24px', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: tenant.color + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', color: tenant.color }}>
              <TenantIcon size={18} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--text-primary)' }}>{tenant.name}</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{tenant.tagline}</div>
            </div>
          </div>

          <div style={{ ...cardStyle, borderRadius: '0 0 14px 14px', borderTop: 'none' }}>
            <h2 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 24, textAlign: 'center' }}>
              {tenant.type === 'credit-union' ? '⚓ Welcome to ' : tenant.type === 'broker' ? '🔑 Broker Portal Access' : tenant.type === 'title' ? '📑 Title Professional Portal' : tenant.type === 'admin' ? '🔐 Administrator Portal' : '🔐 Sign in to'} {['bank','credit-union'].includes(tenant.type) ? tenant.name : ''}
            </h2>
            <form onSubmit={handleLogin}>
              <LoginFormFields />
              <PasswordField />

              {/* Office location for title */}
              {tenant.type === 'title' && (
                <div className="form-group">
                  <label style={labelStyle}>OFFICE LOCATION</label>
                  <select value={form.officeLocation} onChange={e => f('officeLocation', e.target.value)} style={inputStyle}>
                    {OFFICES.map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
              )}

              <ActionRow label={tenant.type === 'broker' ? 'Access Broker Portal →' : tenant.type === 'admin' ? 'Admin Sign In →' : 'Sign In →'} />
              <SsoButtons />
            </form>

            {/* Type-specific notices */}
            {tenant.type === 'credit-union' && (
              <div style={{ marginTop: 16, padding: '12px 14px', background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: 8, fontSize: 12, color: 'var(--text-secondary)' }}>
                🔐 <strong>Two-Factor Authentication</strong> — After sign in, we'll send a verification code to your registered phone.
              </div>
            )}
            {tenant.type === 'broker' && (
              <div style={{ marginTop: 16, padding: '12px 14px', background: 'rgba(109,40,217,0.08)', border: '1px solid rgba(109,40,217,0.2)', borderRadius: 8, fontSize: 12, color: 'var(--text-secondary)' }}>
                💡 <strong>Quick Tip:</strong> As a broker, you can submit applications, track commissions, and manage your borrowers.
              </div>
            )}
            {tenant.type === 'title' && (
              <div style={{ marginTop: 16, padding: '12px 14px', background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 8, fontSize: 12, color: 'var(--text-secondary)' }}>
                🔐 <strong>Secure Access Notice:</strong> This system is for authorized title professionals only.
              </div>
            )}
            {tenant.type === 'admin' && (
              <div style={{ marginTop: 16, padding: '14px', background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12, color: 'var(--text-secondary)' }}>
                <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8 }}>🔧 Admin Features:</div>
                {['Manage users and roles', 'Configure loan products', 'View organization analytics', 'Set up integrations', 'Configure white-label branding'].map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 5 }}>
                    <CheckCircle2 size={11} style={{ color: '#10b981', flexShrink: 0 }} /> {f}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Support footer */}
          <div style={{ marginTop: 14, padding: '12px 18px', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 10, fontSize: 11, color: 'var(--text-muted)', textAlign: 'center' }}>
            Need help? Contact {tenant.name} Support: {tenant.phone} &ensp;|&ensp; <a href="#" style={{ color: 'var(--blue-light)' }}>{tenant.email}</a>
          </div>

          <div style={{ textAlign: 'center', marginTop: 12 }}>
            <button onClick={() => setView('select')} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: 12, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 5 }}>
              <ChevronLeft size={13} /> Back to organization selection
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ─────────────────────────────── MFA SCREEN ──────────────────────────────────
  if (view === 'mfa') return (
    <div style={pgStyle}>
      <AmbientBlobs />
      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 480 }}>
        <div style={cardStyle}>
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <div style={{ width: 56, height: 56, background: 'linear-gradient(135deg,#1e40af,#0284c7)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', boxShadow: '0 8px 28px rgba(59,130,246,0.3)' }}>
              <Lock size={24} color="#fff" />
            </div>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-primary)' }}>🔒 Verify Your Identity</h2>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 8 }}>We've sent a verification code to your registered device</p>
          </div>

          <form onSubmit={handleMfa}>
            <div className="form-group">
              <label style={labelStyle}>ENTER 6-DIGIT CODE</label>
              <input type="text" maxLength={6} placeholder="000000" value={mfaCode} onChange={e => setMfaCode(e.target.value.replace(/\D/g, ''))} style={{ ...inputStyle, textAlign: 'center', letterSpacing: '0.6em', fontSize: 26, fontWeight: 700, padding: '16px' }} />
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 6 }}>
                Code sent to: {form.email || `user@${tenant?.id}.com`}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
              <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: 'center', padding: '12px 0' }}>Verify</button>
              <button type="button" className="btn btn-secondary" style={{ flex: 1, justifyContent: 'center', padding: '12px 0' }}>
                <RefreshCw size={13} /> Resend Code
              </button>
            </div>
            <button type="button" className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center', fontSize: 12 }}>Try Another Method</button>
          </form>

          <div style={{ marginTop: 20, padding: '14px', background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 8 }}>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 600, marginBottom: 10 }}>Other verification methods:</div>
            <div style={{ display: 'flex', gap: 10 }}>
              {[{ icon: Smartphone, label: 'Authenticator App' }, { icon: Key, label: 'Security Key' }, { icon: Phone, label: 'Phone Call' }].map(({ icon: Ic, label }) => (
                <button key={label} type="button" className="btn btn-secondary btn-sm" style={{ flex: 1, justifyContent: 'center', fontSize: 11 }}>
                  <Ic size={12} /> {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ marginTop: 12, padding: '10px 16px', background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.25)', borderRadius: 8, fontSize: 12, color: '#fbbf24', display: 'flex', alignItems: 'center', gap: 8 }}>
          <AlertCircle size={14} style={{ flexShrink: 0 }} />
          Didn't receive a code? Check your spam folder or contact your organization's IT support.
        </div>

        <div style={{ textAlign: 'center', marginTop: 12 }}>
          <button onClick={() => setView('login')} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: 12, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 5 }}>
            <ChevronLeft size={13} /> Back to Sign In
          </button>
        </div>
      </div>
    </div>
  )

  // ─────────────────────────────── SSO SCREEN ──────────────────────────────────
  if (view === 'sso') {
    const providerColor = SSO_COLORS[ssoProvider] || '#0078d4'
    return (
      <div style={pgStyle}>
        <AmbientBlobs />
        <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 480 }}>
          <div style={cardStyle}>
            <div style={{ textAlign: 'center', marginBottom: 8 }}>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 16 }}>🔐 Single Sign-On — {ssoProvider}</div>
            </div>
            {/* Simulated SSO modal */}
            <div style={{ background: '#fff', borderRadius: 12, padding: '32px 28px', border: '1px solid #e5e7eb', maxWidth: 360, margin: '0 auto' }}>
              <div style={{ color: providerColor, fontWeight: 800, fontSize: 18, marginBottom: 4 }}>{ssoProvider === 'Microsoft' ? 'Microsoft' : ssoProvider}</div>
              <div style={{ color: '#374151', fontSize: 13, marginBottom: 20 }}>
                {ssoProvider === 'Microsoft' ? 'Azure AD' : ssoProvider === 'Okta' ? 'Okta Identity' : 'Google Workspace'}
              </div>
              <div style={{ fontWeight: 600, fontSize: 15, color: '#111827', marginBottom: 20 }}>Sign in to LoanPlatform</div>
              <form onSubmit={handleSsoContinue}>
                <input value={ssoEmail} onChange={e => setSsoEmail(e.target.value)} type="email" style={{ width: '100%', padding: '10px 12px', borderRadius: 6, border: '1px solid #d1d5db', fontSize: 14, color: '#111827', marginBottom: 14, boxSizing: 'border-box' }} />
                <button type="submit" style={{ width: '100%', padding: '10px', borderRadius: 6, background: providerColor, color: '#fff', fontWeight: 600, fontSize: 14, border: 'none', cursor: 'pointer', marginBottom: 10 }}>
                  Next →
                </button>
                <button type="button" style={{ width: '100%', padding: '8px', background: 'none', border: '1px solid #d1d5db', borderRadius: 6, fontSize: 12, color: '#374151', cursor: 'pointer' }}>
                  Sign in with a different {ssoProvider} account
                </button>
              </form>
              <div style={{ marginTop: 16, paddingTop: 14, borderTop: '1px solid #e5e7eb', fontSize: 11, color: '#6b7280', display: 'flex', alignItems: 'center', gap: 6 }}>
                <Lock size={11} style={{ color: providerColor }} />
                Secured by {ssoProvider} — Enterprise-grade security
              </div>
            </div>
          </div>
          <div style={{ marginTop: 12, padding: '10px 16px', background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.15)', borderRadius: 8, fontSize: 12, color: 'var(--text-muted)', textAlign: 'center' }}>
            ℹ️ Your organization uses {ssoProvider} for authentication. You'll be redirected to your corporate login.
          </div>
          <div style={{ textAlign: 'center', marginTop: 12 }}>
            <button onClick={() => setView('login')} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: 12, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 5 }}>
              <ChevronLeft size={13} /> Back to Sign In
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ─────────────────────────── PASSWORD RESET ──────────────────────────────────
  if (view === 'reset') return (
    <div style={pgStyle}>
      <AmbientBlobs />
      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 460 }}>
        <div style={cardStyle}>
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <div style={{ width: 56, height: 56, background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.25)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <Lock size={24} style={{ color: 'var(--blue-light)' }} />
            </div>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-primary)' }}>🔒 Forgot Password?</h2>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 8 }}>Enter your email address and we'll send you a link to reset your password.</p>
          </div>
          <form onSubmit={handleReset}>
            <div className="form-group">
              <label style={labelStyle}>EMAIL ADDRESS</label>
              <div style={{ position: 'relative' }}>
                <Mail size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
                <input type="email" placeholder="your-email@company.com" value={form.email} onChange={e => f('email', e.target.value)} style={{ ...inputStyle, paddingLeft: 36 }} required />
              </div>
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '12px 0', marginTop: 4 }}>Send Reset Link →</button>
          </form>
          <div style={{ textAlign: 'center', marginTop: 16 }}>
            <button onClick={() => setView('login')} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: 12, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 5 }}>
              <ChevronLeft size={13} /> Back to Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  // ─────────────────────────── RESET EMAIL SENT ────────────────────────────────
  if (view === 'reset-sent') return (
    <div style={pgStyle}>
      <AmbientBlobs />
      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 460 }}>
        <div style={cardStyle}>
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <div style={{ width: 56, height: 56, background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <CheckCircle2 size={26} style={{ color: '#10b981' }} />
            </div>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-primary)' }}>✉️ Password Reset Email Sent</h2>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 8 }}>We've sent a password reset link to:</p>
            <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', marginTop: 8 }}>{form.email || 'your email address'}</div>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 8 }}>Please check your inbox and follow the instructions to reset your password.</p>
          </div>
          <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 10, padding: '16px', marginBottom: 20, fontSize: 12, color: 'var(--text-secondary)' }}>
            <div style={{ fontWeight: 600, marginBottom: 8 }}>Didn't receive the email?</div>
            {['Check your spam folder', 'Wait a few minutes and try again'].map(tip => (
              <div key={tip} style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 5 }}>
                <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--text-muted)', flexShrink: 0 }} /> {tip}
              </div>
            ))}
            <button type="button" className="btn btn-secondary btn-sm" style={{ marginTop: 12 }}>Resend Email</button>
          </div>
          <button onClick={() => setView('login')} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '12px 0' }}>Return to Sign In</button>
        </div>
      </div>
    </div>
  )

  return null
}
