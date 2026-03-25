import { useState } from 'react'

const QUOTE_REQUESTS = [
  {
    id: 'QR-2026-0089', app: 'APP-2026-0421', borrower: 'Arjun Sharma', loanAmt: '$436,500',
    dwelling: '$485,000', location: 'Austin, TX 78701', loanType: 'Conventional', lender: 'First National Mortgage',
    lo: 'Sarah Owen', requested: 'Mar 16, 2026', needed: 'Apr 1, 2026',
    types: ['HOI (HO-3)', 'Flood Zone Check'], status: 'New', priority: 'Normal',
  },
  {
    id: 'QR-2026-0081', app: 'APP-2026-0378', borrower: 'Diane Torres', loanAmt: '$312,000',
    dwelling: '$345,000', location: 'Houston, TX 77002', loanType: 'FHA', lender: 'Metro Credit Union',
    lo: 'James Turner', requested: 'Mar 12, 2026', needed: 'Mar 30, 2026',
    types: ['HOI (HO-3)', 'FHA MIP'], status: 'Quote Sent', priority: 'High',
  },
  {
    id: 'QR-2026-0074', app: 'APP-2026-0355', borrower: 'Carlos Mendez', loanAmt: '$388,000',
    dwelling: '$420,000', location: 'Dallas, TX 75201', loanType: 'VA', lender: 'First National Mortgage',
    lo: 'Rachel Lee', requested: 'Mar 8, 2026', needed: 'Mar 26, 2026',
    types: ['HOI (HO-3)'], status: 'Bound', priority: 'Normal',
  },
]

const ACTIVE_POLICIES = [
  { id: 'POL-2026-0312', insured: 'Robert Kim', app: 'APP-2026-0399', property: '8820 Pine Ave, Houston TX', type: 'HOI HO-3', carrier: 'SafeGuard Insurance', premium: '$1,840/yr', eff: 'Mar 28, 2026', exp: 'Mar 28, 2027', status: 'Active' },
  { id: 'POL-2025-1188', insured: 'Elena Vasquez', app: 'APP-2025-0890', property: '445 Birch Ln, San Antonio TX', type: 'HOI HO-3', carrier: 'SafeGuard Insurance', premium: '$1,620/yr', eff: 'Apr 2, 2025', exp: 'Apr 2, 2026', status: 'Renewal Due' },
  { id: 'POL-2025-0944', insured: 'Marcus Webb', app: 'APP-2025-0720', property: '6610 Cedar Dr, Austin TX', type: 'HOI HO-3 + Flood', carrier: 'SafeGuard Insurance + NFIP', premium: '$2,210/yr', eff: 'Feb 15, 2025', exp: 'Feb 15, 2026', status: 'Active' },
  { id: 'POL-2025-0811', insured: 'Patricia Nguyen', app: 'APP-2025-0654', property: '2201 Oak St, Dallas TX', type: 'HOI HO-3', carrier: 'SafeGuard Insurance', premium: '$1,440/yr', eff: 'Jan 20, 2025', exp: 'Jan 20, 2026', status: 'Renewal Due' },
]

const RENEWALS = [
  { policy: 'POL-2025-1188', insured: 'Elena Vasquez', exp: 'Apr 2, 2026', daysLeft: 9, premium: '$1,620', newPremium: '$1,705', increase: '+5.2%' },
  { policy: 'POL-2025-0811', insured: 'Patricia Nguyen', exp: 'Jan 20, 2026', daysLeft: -63, premium: '$1,440', newPremium: '$1,512', increase: '+5.0%' },
]

const STATUS_COLOR = { New: '#60a5fa', 'Quote Sent': '#facc15', Bound: '#4ade80', 'Active': '#4ade80', 'Renewal Due': '#fb923c' }

export default function InsuranceAgentPortal() {
  const [activeTab, setActiveTab] = useState('quotes')
  const [selectedRequest, setSelectedRequest] = useState(QUOTE_REQUESTS[0])

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800 }}>Insurance Agent Portal — Kevin Hart</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 4 }}>SafeGuard Insurance · Quote requests · Active policies · Renewals</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-primary" style={{ fontSize: 13 }}>+ New Quote</button>
          <button className="btn" style={{ fontSize: 13, background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}>📤 Bind Policy</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 20 }}>
        {[
          { label: 'Quote Requests', value: '3', sub: '1 new today', color: '#60a5fa' },
          { label: 'Active Policies', value: '12', sub: '$19,840 annual premium', color: '#4ade80' },
          { label: 'Renewals Due', value: '2', sub: '1 overdue', color: '#fb923c' },
          { label: 'Commission MTD', value: '$2,760', sub: 'On track for $5K month', color: '#a78bfa' },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
            <div className="stat-label">{s.label}</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="tab-group" style={{ marginBottom: 20 }}>
        {['quotes', 'policies', 'renewals'].map(t => (
          <button key={t} className={`tab-btn${activeTab === t ? ' active' : ''}`} onClick={() => setActiveTab(t)} style={{ textTransform: 'capitalize' }}>{t}</button>
        ))}
      </div>

      {activeTab === 'quotes' && (
        <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 16 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {QUOTE_REQUESTS.map(q => (
              <div key={q.id} className="card" style={{ cursor: 'pointer', borderLeft: `3px solid ${selectedRequest.id === q.id ? '#fb923c' : 'var(--border)'}`, padding: '14px 16px' }}
                onClick={() => setSelectedRequest(q)}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#fb923c' }}>{q.id}</span>
                  <span style={{ fontSize: 11, padding: '2px 6px', borderRadius: 8, background: `${STATUS_COLOR[q.status]}22`, color: STATUS_COLOR[q.status] }}>{q.status}</span>
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{q.borrower}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{q.location}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>Needed by: {q.needed}</div>
              </div>
            ))}
          </div>

          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>Quote Request — {selectedRequest.id}</div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>{selectedRequest.lender} · {selectedRequest.lo}</div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn btn-primary" style={{ fontSize: 12 }}>Generate Quote</button>
                <button className="btn" style={{ fontSize: 12, background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}>Bind Policy</button>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 20 }}>
              {[
                { label: 'Borrower', value: selectedRequest.borrower },
                { label: 'Loan Amount', value: selectedRequest.loanAmt },
                { label: 'Dwelling Value', value: selectedRequest.dwelling },
                { label: 'Location', value: selectedRequest.location },
                { label: 'Loan Type', value: selectedRequest.loanType },
                { label: 'Coverage Needed', value: selectedRequest.types.join(', ') },
              ].map(f => (
                <div key={f.label} style={{ padding: '10px 12px', background: 'var(--bg-elevated)', borderRadius: 8 }}>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{f.label}</div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)', marginTop: 4 }}>{f.value}</div>
                </div>
              ))}
            </div>

            <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: 12, fontSize: 14 }}>Coverage Options</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { type: 'HOI HO-3 Standard', dwelling: '$485,000', personal: '$97,000', liability: '$300,000', premium: '$1,788/yr', recommended: true },
                { type: 'HOI HO-3 Enhanced', dwelling: '$485,000', personal: '$145,500', liability: '$500,000', premium: '$2,045/yr', recommended: false },
                { type: 'HOI HO-5 Premium', dwelling: '$485,000', personal: '$145,500', liability: '$500,000', premium: '$2,380/yr', recommended: false },
              ].map(opt => (
                <div key={opt.type} style={{ padding: '12px 16px', background: 'var(--bg-elevated)', borderRadius: 8, border: opt.recommended ? '1px solid #fb923c44' : '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{opt.type}</span>
                      {opt.recommended && <span style={{ fontSize: 10, padding: '2px 6px', background: '#fb923c22', color: '#fb923c', borderRadius: 8 }}>Recommended</span>}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>Dwelling: {opt.dwelling} · Personal Property: {opt.personal} · Liability: {opt.liability}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: '#fb923c' }}>{opt.premium}</div>
                    <button className="btn btn-primary" style={{ fontSize: 11, marginTop: 4, padding: '3px 10px' }}>Select</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'policies' && (
        <div className="card">
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr>
                {['Policy #', 'Insured', 'Property', 'Coverage Type', 'Premium', 'Effective', 'Expires', 'Status'].map(h => (
                  <th key={h} style={{ padding: '10px 14px', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 600, borderBottom: '1px solid var(--border)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ACTIVE_POLICIES.map(p => (
                <tr key={p.id} style={{ borderBottom: '1px solid var(--border)' }} onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-elevated)'} onMouseLeave={e => e.currentTarget.style.background = ''}>
                  <td style={{ padding: '12px 14px', color: '#fb923c', fontWeight: 600, fontSize: 12 }}>{p.id}</td>
                  <td style={{ padding: '12px 14px', fontWeight: 600 }}>{p.insured}</td>
                  <td style={{ padding: '12px 14px', color: 'var(--text-muted)', fontSize: 12, maxWidth: 160 }}>{p.property}</td>
                  <td style={{ padding: '12px 14px', color: 'var(--text-secondary)', fontSize: 12 }}>{p.type}</td>
                  <td style={{ padding: '12px 14px', fontWeight: 600, color: '#4ade80' }}>{p.premium}</td>
                  <td style={{ padding: '12px 14px', color: 'var(--text-muted)', fontSize: 12 }}>{p.eff}</td>
                  <td style={{ padding: '12px 14px', color: 'var(--text-muted)', fontSize: 12 }}>{p.exp}</td>
                  <td style={{ padding: '12px 14px' }}>
                    <span style={{ padding: '3px 8px', borderRadius: 12, background: `${STATUS_COLOR[p.status]}22`, color: STATUS_COLOR[p.status], fontSize: 11, fontWeight: 600 }}>{p.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'renewals' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {RENEWALS.map(r => (
            <div key={r.policy} className="card" style={{ borderLeft: `3px solid ${r.daysLeft < 0 ? '#f87171' : '#fb923c'}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>{r.insured}</span>
                    <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 8, background: r.daysLeft < 0 ? '#f8717122' : '#fb923c22', color: r.daysLeft < 0 ? '#f87171' : '#fb923c', fontWeight: 600 }}>
                      {r.daysLeft < 0 ? `${Math.abs(r.daysLeft)}d OVERDUE` : `${r.daysLeft}d left`}
                    </span>
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>{r.policy} · Expires: {r.exp}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Current: {r.premium}/yr</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#fb923c' }}>Renewal: {r.newPremium}/yr <span style={{ fontSize: 11, color: '#fb923c' }}>({r.increase})</span></div>
                </div>
              </div>
              <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
                <button className="btn btn-primary" style={{ fontSize: 12 }}>Send Renewal Quote</button>
                <button className="btn" style={{ fontSize: 12, background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}>Contact Insured</button>
                {r.daysLeft < 0 && <button className="btn" style={{ fontSize: 12, background: '#f8717122', border: '1px solid #f8717144', color: '#f87171' }}>Mark Lapsed</button>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
