import { useNavigate } from 'react-router-dom'

const STATUS_STEPS = [
  { label: 'Application Submitted', date: 'Mar 10, 2026', done: true },
  { label: 'Documents Verified', date: 'Mar 14, 2026', done: true },
  { label: 'Credit Pull Completed', date: 'Mar 15, 2026', done: true },
  { label: 'Asset Verification', date: 'Mar 18, 2026', done: true },
  { label: 'Underwriting Review', date: 'Mar 22, 2026', done: false, active: true },
  { label: 'Conditional Approval', date: 'Pending', done: false },
  { label: 'Clear to Close', date: 'Pending', done: false },
  { label: 'Closing', date: 'Apr 15, 2026 (Target)', done: false },
]

const TASKS = [
  { id: 1, text: 'Upload 2025 W-2 (John)', urgency: 'high', icon: '📄' },
  { id: 2, text: 'Sign Initial Disclosures', urgency: 'high', icon: '✍️' },
  { id: 3, text: 'Provide source of funds for $12,000 deposit', urgency: 'medium', icon: '💬' },
  { id: 4, text: 'Confirm homeowner\'s insurance quote', urgency: 'low', icon: '🛡️' },
]

const MESSAGES = [
  { from: 'Sarah Owen (LO)', msg: 'We need your 2025 W-2 to continue processing.', time: '2h ago', unread: true },
  { from: 'Lisa Park (Title)', msg: 'Title search is complete. No issues found.', time: 'Yesterday', unread: false },
  { from: 'System', msg: 'Your application status has been updated.', time: 'Mar 22', unread: false },
]

export default function BorrowerDashboard() {
  const navigate = useNavigate()

  return (
    <div>
      <PageHeader
        title="Welcome back, John 👋"
        sub="Application #APP-2026-001842 · 30-Year Fixed · $485,000"
        actions={
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="btn btn-secondary btn-sm" onClick={() => navigate('/documents')}>Upload Docs</button>
            <button className="btn btn-primary btn-sm" onClick={() => navigate('/apply')}>Continue Application</button>
          </div>
        }
      />

      {/* Alert bar */}
      <div className="alert alert-warning" style={{ marginBottom: 20 }}>
        <span>⚠️</span>
        <div>
          <strong>Action Required:</strong> 2 items need your attention before underwriting can proceed.{' '}
          <a href="#tasks" style={{ color: '#fbbf24', fontWeight: 600, textDecoration: 'underline' }}>View tasks →</a>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid-4" style={{ marginBottom: 24 }}>
        <StatCard icon="💰" label="Loan Amount" value="$485,000" sub="30-Year Fixed" color="#3b82f6" />
        <StatCard icon="📊" label="Interest Rate" value="6.875%" sub="Locked until Apr 30" color="#8b5cf6" />
        <StatCard icon="🏠" label="Property Value" value="$540,000" sub="LTV: 89.8%" color="#10b981" />
        <StatCard icon="✅" label="App Progress" value="78%" sub="5 of 7 steps complete" color="#f59e0b" isProgress />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 20 }}>
        {/* Left column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Application timeline */}
          <div className="card">
            <div className="section-header">
              <div>
                <div className="section-title">Application Timeline</div>
                <div className="section-sub">Track your loan progress</div>
              </div>
              <span className="badge badge-yellow">In Progress</span>
            </div>
            <div style={{ display: 'flex', gap: 0, overflowX: 'auto', paddingBottom: 8 }}>
              {STATUS_STEPS.map((s, i) => (
                <div key={i} style={{ flex: 1, minWidth: 80, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                  {i < STATUS_STEPS.length - 1 && (
                    <div style={{
                      position: 'absolute', top: 14, left: '50%', right: '-50%',
                      height: 2, background: s.done ? '#3b82f6' : 'var(--border)', zIndex: 0,
                    }} />
                  )}
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%',
                    background: s.done ? '#3b82f6' : s.active ? '#1e40af' : 'var(--bg-elevated)',
                    border: s.active ? '2px solid #3b82f6' : `2px solid ${s.done ? '#3b82f6' : 'var(--border)'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 11, color: s.done ? '#fff' : s.active ? '#60a5fa' : 'var(--text-muted)',
                    fontWeight: 700, zIndex: 1, position: 'relative',
                  }}>
                    {s.done ? '✓' : i + 1}
                  </div>
                  <div style={{ fontSize: 10, fontWeight: s.active ? 600 : 400, color: s.done ? 'var(--text-primary)' : s.active ? '#60a5fa' : 'var(--text-muted)', marginTop: 6, textAlign: 'center', lineHeight: 1.3 }}>{s.label}</div>
                  <div style={{ fontSize: 9, color: 'var(--text-muted)', marginTop: 2 }}>{s.date}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Pending tasks */}
          <div className="card" id="tasks">
            <div className="section-header">
              <div>
                <div className="section-title">Pending Tasks</div>
                <div className="section-sub">Complete these to keep your loan on track</div>
              </div>
              <span className="badge badge-red">2 Urgent</span>
            </div>
            {TASKS.map(t => (
              <div key={t.id} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '12px 14px', background: 'var(--bg-elevated)', borderRadius: 8, marginBottom: 8,
                border: `1px solid ${t.urgency === 'high' ? 'rgba(239,68,68,0.3)' : t.urgency === 'medium' ? 'rgba(245,158,11,0.2)' : 'var(--border)'}`,
              }}>
                <span style={{ fontSize: 18 }}>{t.icon}</span>
                <div style={{ flex: 1, fontSize: 13, color: 'var(--text-primary)' }}>{t.text}</div>
                <span className={`badge badge-${t.urgency === 'high' ? 'red' : t.urgency === 'medium' ? 'yellow' : 'gray'}`}>
                  {t.urgency}
                </span>
                <button className="btn btn-primary btn-sm">Action</button>
              </div>
            ))}
          </div>

          {/* Quick actions */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
            {[
              { label: 'Upload Doc', icon: '📤', to: '/documents', color: '#3b82f6' },
              { label: 'My Assets', icon: '💰', to: '/assets/overview', color: '#8b5cf6' },
              { label: 'Insurance', icon: '🛡️', to: '/insurance', color: '#10b981' },
              { label: 'E-Sign Docs', icon: '✍️', to: '/documents', color: '#f59e0b' },
            ].map(a => (
              <QuickActionCard key={a.label} {...a} />
            ))}
          </div>
        </div>

        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Loan snapshot */}
          <div className="card">
            <div className="section-title" style={{ marginBottom: 14 }}>Loan Snapshot</div>
            {[
              ['Loan Type', 'Conventional 30-Yr Fixed'],
              ['Purchase Price', '$540,000'],
              ['Down Payment', '$55,000 (10.19%)'],
              ['Loan Amount', '$485,000'],
              ['Interest Rate', '6.875%'],
              ['Monthly P&I', '$3,187.42'],
              ['Est. Total Payment', '$4,020/mo'],
              ['Estimated Closing', 'Apr 15, 2026'],
            ].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid var(--border)', fontSize: 13 }}>
                <span style={{ color: 'var(--text-muted)' }}>{k}</span>
                <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{v}</span>
              </div>
            ))}
          </div>

          {/* Messages */}
          <div className="card">
            <div className="section-header">
              <div className="section-title">Messages</div>
              <span className="badge badge-blue">1 New</span>
            </div>
            {MESSAGES.map((m, i) => (
              <div key={i} style={{
                display: 'flex', gap: 10, padding: '10px 0',
                borderBottom: i < MESSAGES.length - 1 ? '1px solid var(--border)' : 'none',
              }}>
                <div style={{
                  width: 32, height: 32,
                  background: m.unread ? 'rgba(59,130,246,0.2)' : 'var(--bg-elevated)',
                  borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 13, fontWeight: 700, color: '#60a5fa', flexShrink: 0,
                }}>
                  {m.from.charAt(0)}
                </div>
                <div style={{ flex: 1, overflow: 'hidden' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: m.unread ? 'var(--text-primary)' : 'var(--text-secondary)' }}>{m.from}</span>
                    <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{m.time}</span>
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{m.msg}</div>
                </div>
                {m.unread && <div className="status-dot dot-blue" style={{ marginTop: 4 }} />}
              </div>
            ))}
            <button className="btn btn-secondary btn-sm" style={{ width: '100%', justifyContent: 'center', marginTop: 10 }}>View All Messages</button>
          </div>

          {/* Co-applicant */}
          <div className="card">
            <div className="section-title" style={{ marginBottom: 12 }}>Co-Applicants</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(139,92,246,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#a78bfa' }}>PD</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>Priya Doe</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Co-Applicant · Spouse</div>
              </div>
              <span className="badge badge-green" style={{ marginLeft: 'auto' }}>Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function PageHeader({ title, sub, actions }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24 }}>
      <div>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-primary)' }}>{title}</h1>
        {sub && <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 4 }}>{sub}</p>}
      </div>
      {actions}
    </div>
  )
}

function StatCard({ icon, label, value, sub, color, isProgress }) {
  return (
    <div className="stat-card">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
        <span style={{ fontSize: 22 }}>{icon}</span>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: color, boxShadow: `0 0 8px ${color}88` }} />
      </div>
      {isProgress ? (
        <>
          <div style={{ fontSize: 24, fontWeight: 800, color }}>{value}</div>
          <div className="progress-bar" style={{ margin: '8px 0' }}>
            <div className="progress-fill" style={{ width: value, background: color }} />
          </div>
        </>
      ) : (
        <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-primary)' }}>{value}</div>
      )}
      <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: 4 }}>{label}</div>
      {sub && <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{sub}</div>}
    </div>
  )
}

function QuickActionCard({ label, icon, to, color }) {
  const navigate = useNavigate()
  return (
    <div
      className="card"
      style={{ padding: '16px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.15s' }}
      onClick={() => navigate(to)}
      onMouseEnter={e => e.currentTarget.style.borderColor = color}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
    >
      <div style={{ fontSize: 24, marginBottom: 8 }}>{icon}</div>
      <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)' }}>{label}</div>
    </div>
  )
}
