import { useState } from 'react'

const TEAM = [
  { id: 'U01', name: 'Sarah Owen', role: 'Loan Officer', email: 'sarah.owen@firstnational.com', active: 14, funded: 8, pipeline: '$3.2M', status: 'Active', nmls: '1234567' },
  { id: 'U02', name: 'Rachel Kim', role: 'Loan Officer', email: 'rachel.kim@firstnational.com', active: 11, funded: 6, pipeline: '$2.8M', status: 'Active', nmls: '2345678' },
  { id: 'U03', name: 'Carlos Mendez', role: 'Loan Officer', email: 'carlos.m@firstnational.com', active: 9, funded: 5, pipeline: '$2.1M', status: 'Active', nmls: '3456789' },
  { id: 'U04', name: 'David Park', role: 'Underwriter', email: 'david.park@firstnational.com', active: 22, funded: 18, pipeline: '—', status: 'Active', nmls: '4567890' },
  { id: 'U05', name: 'Aisha Brown', role: 'Underwriter', email: 'aisha.b@firstnational.com', active: 19, funded: 14, pipeline: '—', status: 'Active', nmls: '5678901' },
  { id: 'U06', name: 'Janet Wu', role: 'Closer', email: 'janet.wu@firstnational.com', active: 8, funded: 7, pipeline: '—', status: 'Active', nmls: '6789012' },
]

const PRODUCTS = [
  { name: 'Conventional 30yr Fixed', minFICO: 620, maxLTV: '97%', minDown: '3%', maxDTI: '50%', status: 'Active', volume: '$210M' },
  { name: 'Conventional 15yr Fixed', minFICO: 620, maxLTV: '97%', minDown: '3%', maxDTI: '43%', status: 'Active', volume: '$88M' },
  { name: 'FHA 30yr Fixed', minFICO: 580, maxLTV: '96.5%', minDown: '3.5%', maxDTI: '57%', status: 'Active', volume: '$76M' },
  { name: 'VA 30yr Fixed', minFICO: '—', maxLTV: '100%', minDown: '0%', maxDTI: '50%', status: 'Active', volume: '$42M' },
  { name: 'Jumbo 30yr Fixed', minFICO: 700, maxLTV: '80%', minDown: '20%', maxDTI: '43%', status: 'Active', volume: '$38M' },
  { name: '5/1 ARM', minFICO: 640, maxLTV: '90%', minDown: '10%', maxDTI: '45%', status: 'Review', volume: '$15M' },
]

const RATE_SHEET = [
  { product: 'Conv 30yr', lock: '15-day', rate: '6.625%', points: '0.250', apr: '6.712%', updated: 'Today 8:02 AM' },
  { product: 'Conv 30yr', lock: '30-day', rate: '6.750%', points: '0.250', apr: '6.838%', updated: 'Today 8:02 AM' },
  { product: 'Conv 30yr', lock: '45-day', rate: '6.875%', points: '0.250', apr: '6.963%', updated: 'Today 8:02 AM' },
  { product: 'FHA 30yr', lock: '30-day', rate: '6.500%', points: '0.375', apr: '7.310%', updated: 'Today 8:02 AM' },
  { product: 'VA 30yr', lock: '30-day', rate: '6.125%', points: '0.000', apr: '6.192%', updated: 'Today 8:02 AM' },
  { product: 'Jumbo 30yr', lock: '30-day', rate: '7.125%', points: '0.500', apr: '7.215%', updated: 'Today 8:02 AM' },
]

const PIPELINE = [
  { stage: 'New Application', count: 23, color: '#60a5fa' },
  { stage: 'Processing', count: 41, color: '#fb923c' },
  { stage: 'Underwriting', count: 28, color: '#f472b6' },
  { stage: 'Conditional Approval', count: 17, color: '#facc15' },
  { stage: 'Clear to Close', count: 11, color: '#4ade80' },
  { stage: 'Closed / Funded', count: 156, color: '#a78bfa' },
]

export default function LenderAdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  const totalPipeline = PIPELINE.slice(0, 5).reduce((s, p) => s + p.count, 0)

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800 }}>Lender Admin — First National Mortgage</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 4 }}>Team management · Loan products · Rate sheets · Pipeline oversight</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-primary" style={{ fontSize: 13 }}>+ Add Team Member</button>
          <button className="btn" style={{ fontSize: 13, background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}>📊 Reports</button>
        </div>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 14, marginBottom: 20 }}>
        {[
          { label: 'Active Team', value: '6', sub: '3 LOs · 2 UWs · 1 Closer', color: '#60a5fa' },
          { label: 'Pipeline Loans', value: totalPipeline, sub: `$${(totalPipeline * 0.42).toFixed(1)}M est.`, color: '#a78bfa' },
          { label: 'Funded MTD', value: '22', sub: '$9.8M', color: '#4ade80' },
          { label: 'Avg Turn Time', value: '22d', sub: 'Target: 15d ⚠️', color: '#facc15' },
          { label: 'Pull-Through Rate', value: '71%', sub: 'Up from 68% last mo', color: '#34d399' },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
            <div className="stat-label">{s.label}</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="tab-group" style={{ marginBottom: 20 }}>
        {['overview', 'team', 'products', 'rates'].map(t => (
          <button key={t} className={`tab-btn${activeTab === t ? ' active' : ''}`} onClick={() => setActiveTab(t)} style={{ textTransform: 'capitalize' }}>{t}</button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {/* Pipeline by Stage */}
          <div className="card" style={{ padding: '20px' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 16 }}>Pipeline by Stage</div>
            {PIPELINE.map(p => (
              <div key={p.stage} style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                  <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{p.stage}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: p.color }}>{p.count}</span>
                </div>
                <div style={{ height: 6, borderRadius: 3, background: 'var(--border)', overflow: 'hidden' }}>
                  <div style={{ width: `${Math.min(100, (p.count / 50) * 100)}%`, height: '100%', background: p.color, borderRadius: 3 }} />
                </div>
              </div>
            ))}
          </div>

          {/* Team Performance */}
          <div className="card" style={{ padding: '20px' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 16 }}>Team Snapshot</div>
            {TEAM.map(m => (
              <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: m.role === 'Loan Officer' ? '#60a5fa33' : m.role === 'Underwriter' ? '#a78bfa33' : '#34d39933', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: m.role === 'Loan Officer' ? '#60a5fa' : m.role === 'Underwriter' ? '#a78bfa' : '#34d399' }}>
                  {m.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{m.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{m.role} · {m.active} active</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#4ade80' }}>{m.pipeline !== '—' ? m.pipeline : m.funded + ' funded'}</div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{m.pipeline !== '—' ? 'pipeline' : 'MTD'}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'team' && (
        <div className="card">
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr>
                {['Name', 'Role', 'NMLS ID', 'Active Loans', 'Funded MTD', 'Pipeline Value', 'Status'].map(h => (
                  <th key={h} style={{ padding: '10px 14px', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 600, borderBottom: '1px solid var(--border)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TEAM.map(m => (
                <tr key={m.id} style={{ borderBottom: '1px solid var(--border)' }} onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-elevated)'} onMouseLeave={e => e.currentTarget.style.background = ''}>
                  <td style={{ padding: '12px 14px' }}>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{m.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{m.email}</div>
                  </td>
                  <td style={{ padding: '12px 14px' }}>
                    <span style={{ padding: '3px 8px', borderRadius: 12, background: m.role === 'Loan Officer' ? '#60a5fa22' : m.role === 'Underwriter' ? '#a78bfa22' : '#34d39922', color: m.role === 'Loan Officer' ? '#60a5fa' : m.role === 'Underwriter' ? '#a78bfa' : '#34d399', fontSize: 11, fontWeight: 600 }}>{m.role}</span>
                  </td>
                  <td style={{ padding: '12px 14px', color: 'var(--text-secondary)', fontSize: 12 }}>{m.nmls}</td>
                  <td style={{ padding: '12px 14px', fontWeight: 700, color: 'var(--text-primary)' }}>{m.active}</td>
                  <td style={{ padding: '12px 14px', fontWeight: 700, color: '#4ade80' }}>{m.funded}</td>
                  <td style={{ padding: '12px 14px', fontWeight: 600, color: 'var(--text-primary)' }}>{m.pipeline}</td>
                  <td style={{ padding: '12px 14px' }}>
                    <span style={{ color: '#4ade80', fontSize: 12 }}>● {m.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'products' && (
        <div className="card">
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr>
                {['Product', 'Min FICO', 'Max LTV', 'Min Down', 'Max DTI', 'MTD Volume', 'Status'].map(h => (
                  <th key={h} style={{ padding: '10px 14px', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 600, borderBottom: '1px solid var(--border)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PRODUCTS.map(p => (
                <tr key={p.name} style={{ borderBottom: '1px solid var(--border)' }} onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-elevated)'} onMouseLeave={e => e.currentTarget.style.background = ''}>
                  <td style={{ padding: '12px 14px', fontWeight: 600, color: 'var(--text-primary)' }}>{p.name}</td>
                  <td style={{ padding: '12px 14px', color: 'var(--text-secondary)' }}>{p.minFICO}</td>
                  <td style={{ padding: '12px 14px', color: 'var(--text-secondary)' }}>{p.maxLTV}</td>
                  <td style={{ padding: '12px 14px', color: 'var(--text-secondary)' }}>{p.minDown}</td>
                  <td style={{ padding: '12px 14px', color: 'var(--text-secondary)' }}>{p.maxDTI}</td>
                  <td style={{ padding: '12px 14px', fontWeight: 700, color: '#4ade80' }}>{p.volume}</td>
                  <td style={{ padding: '12px 14px' }}>
                    <span style={{ padding: '3px 8px', borderRadius: 12, background: p.status === 'Active' ? '#4ade8022' : '#facc1522', color: p.status === 'Active' ? '#4ade80' : '#facc15', fontSize: 11, fontWeight: 600 }}>{p.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'rates' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Rate sheet last updated: Mar 25, 2026 at 8:02 AM · Daily market update</span>
            <button className="btn btn-primary" style={{ fontSize: 12 }}>↑ Upload New Rate Sheet</button>
          </div>
          <div className="card">
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr>
                  {['Product', 'Lock Period', 'Rate', 'Points', 'APR', 'Last Updated'].map(h => (
                    <th key={h} style={{ padding: '10px 14px', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 600, borderBottom: '1px solid var(--border)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {RATE_SHEET.map((r, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border)' }} onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-elevated)'} onMouseLeave={e => e.currentTarget.style.background = ''}>
                    <td style={{ padding: '12px 14px', fontWeight: 600, color: 'var(--text-primary)' }}>{r.product}</td>
                    <td style={{ padding: '12px 14px', color: 'var(--text-secondary)' }}>{r.lock}</td>
                    <td style={{ padding: '12px 14px', fontWeight: 700, color: '#60a5fa', fontSize: 14 }}>{r.rate}</td>
                    <td style={{ padding: '12px 14px', color: 'var(--text-secondary)' }}>{r.points}</td>
                    <td style={{ padding: '12px 14px', color: 'var(--text-secondary)' }}>{r.apr}</td>
                    <td style={{ padding: '12px 14px', color: 'var(--text-muted)', fontSize: 12 }}>{r.updated}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
