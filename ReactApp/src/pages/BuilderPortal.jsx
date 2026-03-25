import { useState } from 'react'

const PROJECTS = [
  {
    id: 'PROJ-001', name: 'Maple Ridge Heights', location: 'Cedar Park, TX (Travis County)',
    type: 'Single-Family', totalUnits: 42, available: 12, underContract: 18, closed: 12,
    priceRange: '$385K – $520K', startDate: 'Jan 2025', estCompletion: 'Dec 2026',
    status: 'Active', phase: 'Phase 2 of 3', builder: 'Raj Patel',
  },
  {
    id: 'PROJ-002', name: 'River Oaks Estates', location: 'Round Rock, TX (Williamson County)',
    type: 'Single-Family', totalUnits: 28, available: 6, underContract: 8, closed: 14,
    priceRange: '$420K – $635K', startDate: 'Mar 2024', estCompletion: 'Jun 2026',
    status: 'Active', phase: 'Phase 3 of 3', builder: 'Raj Patel',
  },
  {
    id: 'PROJ-003', name: 'Sunset Townhomes', location: 'Pflugerville, TX (Travis County)',
    type: 'Townhome', totalUnits: 20, available: 20, underContract: 0, closed: 0,
    priceRange: '$295K – $365K', startDate: 'Jul 2026', estCompletion: 'Dec 2027',
    status: 'Pre-Sale', phase: 'Planning', builder: 'Raj Patel',
  },
]

const BUYER_PIPELINE = [
  { name: 'Arjun Sharma', app: 'APP-2026-0421', project: 'Maple Ridge Heights', unit: 'Lot 24 – Plan B3', price: '$485,000', lender: 'First National Mortgage', lo: 'Sarah Owen', preApproval: '$510,000', preApprovalDate: 'Feb 28, 2026', stage: 'In Underwriting', contingency: 'Financing' },
  { name: 'Jennifer Ross', app: 'APP-2026-0418', project: 'River Oaks Estates', unit: 'Lot 9 – Plan A2', price: '$442,000', lender: 'Coastal Lending', lo: 'Mark Torres', preApproval: '$460,000', preApprovalDate: 'Mar 1, 2026', stage: 'Clear to Close', contingency: 'None' },
  { name: 'David & Cathy Park', app: 'APP-2026-0403', project: 'Maple Ridge Heights', unit: 'Lot 31 – Plan C1', price: '$502,000', lender: 'FedLoan Direct', lo: 'Amy Chen', preApproval: '$525,000', preApprovalDate: 'Feb 20, 2026', stage: 'Closing Scheduled', contingency: 'None' },
  { name: 'Omar Hassan', app: '', project: 'Maple Ridge Heights', unit: 'Lot 18 – Plan B2', price: '$476,000', lender: 'TBD', lo: '—', preApproval: 'Needed', preApprovalDate: '—', stage: 'Pre-Qual Needed', contingency: 'Pre-Approval' },
]

const DRAW_SCHEDULE = [
  { phase: 'Land & Site Prep', pct: '10%', amount: '$485,000', released: '$485,000', date: 'Feb 15, 2026', status: 'Released' },
  { phase: 'Foundation', pct: '15%', amount: '$727,500', released: '$727,500', date: 'Mar 1, 2026', status: 'Released' },
  { phase: 'Framing', pct: '20%', amount: '$970,000', released: '$970,000', date: 'Mar 20, 2026', status: 'Released' },
  { phase: 'Mechanical / Rough-in', pct: '20%', amount: '$970,000', released: '—', date: 'Apr 10, 2026', status: 'Requested' },
  { phase: 'Insulation / Drywall', pct: '15%', amount: '$727,500', released: '—', date: 'May 5, 2026', status: 'Scheduled' },
  { phase: 'Trim / Fixtures', pct: '10%', amount: '$485,000', released: '—', date: 'Jun 1, 2026', status: 'Scheduled' },
  { phase: 'Final / CO', pct: '10%', amount: '$485,000', released: '—', date: 'Jul 1, 2026', status: 'Scheduled' },
]

const STAGE_COLOR = { 'In Underwriting': '#60a5fa', 'Clear to Close': '#facc15', 'Closing Scheduled': '#a78bfa', 'Pre-Qual Needed': '#fb923c' }

export default function BuilderPortal() {
  const [activeTab, setActiveTab] = useState('projects')
  const [selectedProject, setSelectedProject] = useState(PROJECTS[0])

  const totalUnits = PROJECTS.reduce((s, p) => s + p.totalUnits, 0)
  const totalUnderContract = PROJECTS.reduce((s, p) => s + p.underContract, 0)
  const totalClosed = PROJECTS.reduce((s, p) => s + p.closed, 0)

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800 }}>Builder Portal — Raj Patel</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 4 }}>Greenfield Developments · Projects · Buyer pipeline · Construction draws</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-primary" style={{ fontSize: 13 }}>+ New Project</button>
          <button className="btn" style={{ fontSize: 13, background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}>📤 Export</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 14, marginBottom: 20 }}>
        {[
          { label: 'Active Projects', value: '2', sub: '1 pre-sale', color: '#a78bfa' },
          { label: 'Total Units', value: totalUnits, sub: 'Across 3 projects', color: '#60a5fa' },
          { label: 'Under Contract', value: totalUnderContract, sub: '29% of inventory', color: '#facc15' },
          { label: 'Closed (YTD)', value: totalClosed, sub: '$12.8M revenue', color: '#4ade80' },
          { label: 'Draw Requested', value: '$970K', sub: 'Maple Ridge Phase 4', color: '#fb923c' },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
            <div className="stat-label">{s.label}</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="tab-group" style={{ marginBottom: 20 }}>
        {['projects', 'buyers', 'draws'].map(t => (
          <button key={t} className={`tab-btn${activeTab === t ? ' active' : ''}`} onClick={() => setActiveTab(t)} style={{ textTransform: 'capitalize' }}>{t}</button>
        ))}
      </div>

      {activeTab === 'projects' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
          {PROJECTS.map(p => {
            const pctSold = Math.round(((p.underContract + p.closed) / p.totalUnits) * 100)
            return (
              <div key={p.id} className="card" style={{ borderTop: `3px solid ${p.status === 'Active' ? '#a78bfa' : '#60a5fa'}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#a78bfa' }}>🏗️ {p.id}</span>
                  <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 8, background: p.status === 'Active' ? '#a78bfa22' : '#60a5fa22', color: p.status === 'Active' ? '#a78bfa' : '#60a5fa' }}>{p.status}</span>
                </div>
                <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 2 }}>{p.name}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 12 }}>{p.location} · {p.type}</div>

                <div style={{ marginBottom: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 4 }}>
                    <span style={{ color: 'var(--text-muted)' }}>Sales Progress</span>
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{pctSold}% sold/contracted</span>
                  </div>
                  <div style={{ height: 6, background: 'var(--border)', borderRadius: 3, overflow: 'hidden' }}>
                    <div style={{ width: `${pctSold}%`, height: '100%', background: '#a78bfa', borderRadius: 3 }} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 12 }}>
                  {[
                    { label: 'Available', value: p.available, color: '#60a5fa' },
                    { label: 'Under Contract', value: p.underContract, color: '#facc15' },
                    { label: 'Closed', value: p.closed, color: '#4ade80' },
                  ].map(m => (
                    <div key={m.label} style={{ padding: '8px', background: 'var(--bg-elevated)', borderRadius: 6, textAlign: 'center' }}>
                      <div style={{ fontSize: 18, fontWeight: 700, color: m.color }}>{m.value}</div>
                      <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{m.label}</div>
                    </div>
                  ))}
                </div>

                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{p.priceRange} · {p.phase}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Est. Completion: {p.estCompletion}</div>
              </div>
            )
          })}
        </div>
      )}

      {activeTab === 'buyers' && (
        <div className="card">
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr>
                {['Buyer', 'Application', 'Project / Unit', 'Price', 'Pre-Approval', 'Lender / LO', 'Stage', 'Contingency'].map(h => (
                  <th key={h} style={{ padding: '10px 14px', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 600, borderBottom: '1px solid var(--border)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {BUYER_PIPELINE.map(b => (
                <tr key={b.name} style={{ borderBottom: '1px solid var(--border)' }} onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-elevated)'} onMouseLeave={e => e.currentTarget.style.background = ''}>
                  <td style={{ padding: '12px 14px', fontWeight: 700, color: 'var(--text-primary)' }}>{b.name}</td>
                  <td style={{ padding: '12px 14px', color: '#60a5fa', fontSize: 12 }}>{b.app || '—'}</td>
                  <td style={{ padding: '12px 14px' }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)' }}>{b.project}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{b.unit}</div>
                  </td>
                  <td style={{ padding: '12px 14px', fontWeight: 600, color: '#4ade80' }}>{b.price}</td>
                  <td style={{ padding: '12px 14px' }}>
                    <div style={{ fontSize: 12, fontWeight: 600 }}>{b.preApproval}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{b.preApprovalDate}</div>
                  </td>
                  <td style={{ padding: '12px 14px', fontSize: 12, color: 'var(--text-secondary)' }}>
                    <div>{b.lender}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{b.lo}</div>
                  </td>
                  <td style={{ padding: '12px 14px' }}>
                    <span style={{ padding: '3px 8px', borderRadius: 10, background: `${(STAGE_COLOR[b.stage] || '#60a5fa')}22`, color: STAGE_COLOR[b.stage] || '#60a5fa', fontSize: 11, fontWeight: 600 }}>{b.stage}</span>
                  </td>
                  <td style={{ padding: '12px 14px', fontSize: 12, color: b.contingency !== 'None' ? '#fb923c' : '#4ade80' }}>{b.contingency}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'draws' && (
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--text-primary)' }}>Construction Draw Schedule — Maple Ridge Heights</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>Construction Loan: $4,850,000 · Lender: First National Mortgage Construction</div>
            </div>
            <button className="btn btn-primary" style={{ fontSize: 12 }}>Submit Draw Request</button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 20 }}>
            {[
              { label: 'Total Loan', value: '$4,850,000', color: '#60a5fa' },
              { label: 'Released', value: '$2,182,500', color: '#4ade80' },
              { label: 'Remaining', value: '$2,667,500', color: '#a78bfa' },
            ].map(m => (
              <div key={m.label} style={{ padding: '12px 16px', background: 'var(--bg-elevated)', borderRadius: 8, textAlign: 'center' }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: m.color }}>{m.value}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{m.label}</div>
              </div>
            ))}
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr>
                {['Phase', '% of Loan', 'Draw Amount', 'Amount Released', 'Expected Date', 'Status'].map(h => (
                  <th key={h} style={{ padding: '10px 14px', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 600, borderBottom: '1px solid var(--border)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {DRAW_SCHEDULE.map(d => (
                <tr key={d.phase} style={{ borderBottom: '1px solid var(--border)', background: d.status === 'Requested' ? '#fb923c08' : '' }}>
                  <td style={{ padding: '12px 14px', fontWeight: 600, color: 'var(--text-primary)' }}>{d.phase}</td>
                  <td style={{ padding: '12px 14px', color: 'var(--text-secondary)' }}>{d.pct}</td>
                  <td style={{ padding: '12px 14px', color: 'var(--text-secondary)' }}>{d.amount}</td>
                  <td style={{ padding: '12px 14px', fontWeight: 600, color: d.released !== '—' ? '#4ade80' : 'var(--text-muted)' }}>{d.released}</td>
                  <td style={{ padding: '12px 14px', color: 'var(--text-muted)', fontSize: 12 }}>{d.date}</td>
                  <td style={{ padding: '12px 14px' }}>
                    <span style={{ padding: '3px 8px', borderRadius: 10, fontSize: 11, fontWeight: 600,
                      background: d.status === 'Released' ? '#4ade8022' : d.status === 'Requested' ? '#fb923c22' : '#60a5fa22',
                      color: d.status === 'Released' ? '#4ade80' : d.status === 'Requested' ? '#fb923c' : '#60a5fa' }}>{d.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
