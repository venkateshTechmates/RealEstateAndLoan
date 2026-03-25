import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login({ setRole }) {
  const [tab, setTab] = useState('login')
  const [form, setForm] = useState({ email: '', password: '', role: 'borrower', mfa: '' })
  const [step, setStep] = useState(1)
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    if (step === 1) { setStep(2); return }
    setRole(form.role)
    navigate('/dashboard')
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg,#0f172a 0%,#1e3a5f 50%,#0f172a 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
    }}>
      {/* Background decoration */}
      <div style={{
        position: 'fixed', top: '10%', right: '10%',
        width: 400, height: 400,
        background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ width: '100%', maxWidth: 420 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            width: 56, height: 56,
            background: 'linear-gradient(135deg,#1e40af,#0284c7)',
            borderRadius: 14,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 28, margin: '0 auto 14px',
            boxShadow: '0 8px 32px rgba(59,130,246,0.3)',
          }}>🏦</div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: '#f1f5f9' }}>RE Loan Suite</h1>
          <p style={{ color: '#64748b', fontSize: 13, marginTop: 4 }}>Enterprise Real Estate & Loan Platform</p>
        </div>

        {/* Card */}
        <div className="card" style={{ padding: '28px 32px' }}>
          {/* Tabs */}
          <div className="tab-group" style={{ marginBottom: 24 }}>
            <button className={`tab-btn${tab === 'login' ? ' active' : ''}`} onClick={() => setTab('login')} style={{ flex: 1 }}>Sign In</button>
            <button className={`tab-btn${tab === 'register' ? ' active' : ''}`} onClick={() => setTab('register')} style={{ flex: 1 }}>Register</button>
          </div>

          {tab === 'login' ? (
            <form onSubmit={handleLogin}>
              {step === 1 ? (
                <>
                  <div className="form-group">
                    <label className="form-label">EMAIL ADDRESS</label>
                    <input type="email" placeholder="john.doe@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">PASSWORD</label>
                    <input type="password" placeholder="••••••••" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">SIGN IN AS</label>
                    <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
                      <option value="borrower">🏠 Borrower / Applicant</option>
                      <option value="lender">🏦 Loan Officer / Underwriter</option>
                      <option value="broker">🤝 Broker</option>
                    </select>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
                    <a href="#" style={{ fontSize: 12, color: '#60a5fa' }}>Forgot password?</a>
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '11px 0', fontSize: 14 }}>
                    Continue →
                  </button>

                  {/* Demo quick access */}
                  <div style={{ marginTop: 20 }}>
                    <div style={{ textAlign: 'center', fontSize: 11, color: '#475569', marginBottom: 10, position: 'relative' }}>
                      <span style={{ background: 'var(--bg-surface)', padding: '0 10px', position: 'relative', zIndex: 1 }}>Quick Demo Access</span>
                      <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 1, background: '#334155', zIndex: 0 }} />
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      {['borrower','lender','broker'].map(r => (
                        <button key={r} type="button" className="btn btn-secondary btn-sm" style={{ flex: 1, justifyContent: 'center', fontSize: 11 }}
                          onClick={() => { setRole(r); navigate('/dashboard') }}>
                          {r === 'borrower' ? '🏠' : r === 'lender' ? '🏦' : '🤝'} {r.charAt(0).toUpperCase() + r.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div style={{ textAlign: 'center', marginBottom: 20 }}>
                    <div style={{ fontSize: 32, marginBottom: 8 }}>📱</div>
                    <div style={{ fontWeight: 600, color: '#f1f5f9' }}>Two-Factor Authentication</div>
                    <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>Enter the 6-digit code sent to +1 (xxx) xxx-7890</div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">VERIFICATION CODE</label>
                    <input type="text" placeholder="000000" maxLength={6} style={{ textAlign: 'center', letterSpacing: '0.4em', fontSize: 20, fontWeight: 700 }} value={form.mfa} onChange={e => setForm({ ...form, mfa: e.target.value })} />
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '11px 0', fontSize: 14 }}>
                    Verify & Sign In
                  </button>
                  <button type="button" style={{ width: '100%', marginTop: 10, background: 'none', color: '#64748b', fontSize: 12, padding: 8 }} onClick={() => setStep(1)}>← Back</button>
                </>
              )}
            </form>
          ) : (
            <RegisterForm onSuccess={() => setTab('login')} />
          )}
        </div>

        <p style={{ textAlign: 'center', color: '#475569', fontSize: 11, marginTop: 20 }}>
          Protected by enterprise-grade security · SOC 2 Type II · ISO 27001
        </p>
      </div>
    </div>
  )
}

function RegisterForm({ onSuccess }) {
  return (
    <form onSubmit={e => { e.preventDefault(); onSuccess() }}>
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">FIRST NAME</label>
          <input placeholder="John" />
        </div>
        <div className="form-group">
          <label className="form-label">LAST NAME</label>
          <input placeholder="Doe" />
        </div>
      </div>
      <div className="form-group">
        <label className="form-label">EMAIL ADDRESS</label>
        <input type="email" placeholder="john.doe@example.com" />
      </div>
      <div className="form-group">
        <label className="form-label">PHONE NUMBER</label>
        <input placeholder="+1 (555) 000-0000" />
      </div>
      <div className="form-group">
        <label className="form-label">I AM REGISTERING AS</label>
        <select>
          <option>Borrower / Home Buyer</option>
          <option>Co-Applicant</option>
          <option>Broker</option>
        </select>
      </div>
      <div className="form-group">
        <label className="form-label">PASSWORD</label>
        <input type="password" placeholder="Min 8 chars, 1 uppercase, 1 number" />
      </div>
      <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '11px 0', fontSize: 14 }}>
        Create Account
      </button>
    </form>
  )
}
