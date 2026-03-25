import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ORGS = [
  { id: 'firstbank',  name: 'First Bank',       abbr: 'FB',  color: '#1e40af', bg: 'rgba(30,64,175,0.12)',  members: '2,400+', region: 'National' },
  { id: 'chase',      name: 'Chase',             abbr: 'JP',  color: '#0284c7', bg: 'rgba(2,132,199,0.12)',  members: '12,000+', region: 'National' },
  { id: 'wellsfargo', name: 'Wells Fargo',        abbr: 'WF',  color: '#dc2626', bg: 'rgba(220,38,38,0.12)', members: '9,800+', region: 'National' },
  { id: 'citibank',   name: 'Citi Bank',          abbr: 'CB',  color: '#7c3aed', bg: 'rgba(124,58,237,0.12)', members: '6,500+', region: 'National' },
  { id: 'pnc',        name: 'PNC Bank',           abbr: 'PN',  color: '#f59e0b', bg: 'rgba(245,158,11,0.12)', members: '3,100+', region: 'Eastern US' },
  { id: 'truist',     name: 'Truist',             abbr: 'TR',  color: '#059669', bg: 'rgba(5,150,105,0.12)',  members: '4,200+', region: 'Southern US' },
  { id: 'usbank',     name: 'US Bank',            abbr: 'US',  color: '#0891b2', bg: 'rgba(8,145,178,0.12)', members: '5,600+', region: 'Midwest' },
  { id: 'bofA',       name: 'Bank of America',    abbr: 'BA',  color: '#e11d48', bg: 'rgba(225,29,72,0.12)', members: '15,000+', region: 'National' },
  { id: 'regions',    name: 'Regions Bank',       abbr: 'RG',  color: '#16a34a', bg: 'rgba(22,163,74,0.12)', members: '1,900+', region: 'Southern US' },
]

export default function OrgSelect() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [domain, setDomain] = useState('')
  const [hoveredId, setHoveredId] = useState(null)
  const [selectedId, setSelectedId] = useState(null)

  const filtered = ORGS.filter(o =>
    o.name.toLowerCase().includes(search.toLowerCase())
  )

  const handleSelect = (org) => {
    setSelectedId(org.id)
    setTimeout(() => navigate('/dashboard'), 340)
  }

  const handleDomainGo = (e) => {
    e.preventDefault()
    if (domain.trim()) navigate('/dashboard')
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg-base)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: '48px 24px 40px',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Ambient background blobs */}
      <div style={{ position: 'fixed', pointerEvents: 'none', inset: 0, zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 65%)' }} />
        <div style={{ position: 'absolute', bottom: '-5%', right: '-5%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 65%)' }} />
      </div>

      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 860 }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{
            width: 64, height: 64,
            background: 'linear-gradient(135deg, #1e40af, #0284c7)',
            borderRadius: 18,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 32, margin: '0 auto 18px',
            boxShadow: '0 8px 36px rgba(59,130,246,0.35)',
          }}>🏢</div>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>
            LoanPlatform Enterprise
          </h1>
          <p style={{ fontSize: 14, color: 'var(--text-muted)', marginTop: 6 }}>
            Welcome to the LoanPlatform Suite
          </p>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>
            Please select your organization to continue
          </p>
          <button onClick={() => navigate('/login')} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: 12, cursor: 'pointer', marginTop: 10, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            ← Back to login
          </button>
        </div>

        {/* Search */}
        <div style={{ marginBottom: 24, maxWidth: 400, margin: '0 auto 28px' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            background: 'var(--bg-surface)', border: '1px solid var(--border)',
            borderRadius: 10, padding: '9px 14px',
          }}>
            <span style={{ color: 'var(--text-muted)', fontSize: 16 }}>🔍</span>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search your organization…"
              style={{
                background: 'none', border: 'none', flex: 1,
                color: 'var(--text-primary)', fontSize: 13, padding: 0, width: '100%',
              }}
            />
            {search && (
              <button onClick={() => setSearch('')} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: 14, cursor: 'pointer', lineHeight: 1 }}>✕</button>
            )}
          </div>
        </div>

        {/* Org grid */}
        <div style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border)',
          borderRadius: 16,
          padding: 24,
          marginBottom: 20,
        }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--text-muted)', fontSize: 13 }}>
              No organizations found for "{search}"
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
              {filtered.map(org => {
                const isHov = hoveredId === org.id
                const isSel = selectedId === org.id
                return (
                  <button
                    key={org.id}
                    onClick={() => handleSelect(org)}
                    onMouseEnter={() => setHoveredId(org.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    style={{
                      background: isSel ? `${org.color}18` : isHov ? 'var(--bg-elevated)' : 'var(--bg-base)',
                      border: `1.5px solid ${isSel ? org.color : isHov ? org.color + '60' : 'var(--border)'}`,
                      borderRadius: 12,
                      padding: '18px 16px 16px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.18s ease',
                      transform: isSel ? 'scale(0.97)' : isHov ? 'translateY(-2px)' : 'none',
                      boxShadow: isHov ? `0 6px 20px ${org.color}25` : isSel ? `0 0 0 3px ${org.color}30` : 'none',
                    }}
                  >
                    {/* Logo + name row */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                      <div style={{
                        width: 40, height: 40, borderRadius: 10,
                        background: org.bg,
                        border: `1px solid ${org.color}40`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 13, fontWeight: 800, color: org.color,
                        flexShrink: 0,
                      }}>
                        {org.abbr}
                      </div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2 }}>{org.name}</div>
                        <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2 }}>{org.region}</div>
                      </div>
                    </div>

                    {/* Members count */}
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 12 }}>
                      <span style={{ color: org.color, fontWeight: 600 }}>{org.members}</span> members
                    </div>

                    {/* Continue button */}
                    <div style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      background: isSel || isHov ? org.color : 'transparent',
                      border: `1px solid ${isSel || isHov ? org.color : 'var(--border)'}`,
                      borderRadius: 7, padding: '6px 10px',
                      transition: 'all 0.18s',
                    }}>
                      <span style={{ fontSize: 11, fontWeight: 600, color: isSel || isHov ? '#fff' : 'var(--text-secondary)' }}>
                        {isSel ? 'Connecting…' : 'Continue'}
                      </span>
                      <span style={{ fontSize: 13, color: isSel || isHov ? '#fff' : 'var(--text-muted)' }}>
                        {isSel ? '⟳' : '→'}
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {/* Domain entry */}
        <div style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border)',
          borderRadius: 14,
          padding: '18px 20px',
          marginBottom: 24,
        }}>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 10, fontWeight: 500 }}>
            Or enter your organization domain:
          </div>
          <form onSubmit={handleDomainGo} style={{ display: 'flex', gap: 10 }}>
            <div style={{
              flex: 1, display: 'flex', alignItems: 'center',
              background: 'var(--bg-base)', border: '1px solid var(--border)',
              borderRadius: 8, padding: '9px 14px', gap: 8,
            }}>
              <span style={{ color: 'var(--text-muted)', fontSize: 14 }}>🌐</span>
              <input
                value={domain}
                onChange={e => setDomain(e.target.value)}
                placeholder="your-company.loanplatform.com"
                style={{
                  background: 'none', border: 'none', flex: 1,
                  color: 'var(--text-primary)', fontSize: 13, padding: 0,
                }}
              />
            </div>
            <button
              type="submit"
              disabled={!domain.trim()}
              style={{
                background: domain.trim() ? 'var(--blue, #3b82f6)' : 'var(--bg-elevated)',
                border: 'none', borderRadius: 8, padding: '9px 20px',
                fontSize: 13, fontWeight: 700,
                color: domain.trim() ? '#fff' : 'var(--text-muted)',
                cursor: domain.trim() ? 'pointer' : 'default',
                transition: 'all 0.15s', whiteSpace: 'nowrap',
              }}
            >
              Go →
            </button>
          </form>
        </div>

        {/* Footer */}
        <div style={{ textAlign: 'center' }}>
          <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Need help? </span>
          <a href="mailto:support@loanplatform.com" style={{ fontSize: 12, color: 'var(--blue, #3b82f6)', fontWeight: 600 }}>Contact Support</a>
          <div style={{ marginTop: 10, fontSize: 11, color: 'var(--text-muted)' }}>
            © 2026 LoanPlatform Enterprise · <a href="#" style={{ color: 'var(--text-muted)' }}>Privacy Policy</a> · <a href="#" style={{ color: 'var(--text-muted)' }}>Terms</a>
          </div>
        </div>

      </div>
    </div>
  )
}
