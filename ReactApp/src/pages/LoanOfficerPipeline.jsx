import { useState } from 'react'

const LOANS = [
  { id: 'LA-001', borrower: 'Marcus Johnson', co: 'Sarah Johnson', amount: 485000, type: 'Conventional 30yr', rate: 6.875, ltv: 82, dti: 38, fico: 742, status: 'Underwriting', officer: 'Rachel Kim', uw: 'David Park', daysOpen: 18, sla: 45, property: '789 Maple Dr, Austin TX', tasks: ['Appraisal ordered', 'Bank stmts verified'], flags: ['HOI expiring soon'] },
  { id: 'LA-002', borrower: 'Priya Patel', co: null, amount: 310000, type: 'FHA 30yr', rate: 6.625, ltv: 96.5, dti: 42, fico: 688, status: 'Verification', officer: 'Rachel Kim', uw: 'Unassigned', daysOpen: 7, sla: 45, property: '42 Oak Ave, Round Rock TX', tasks: ['Employment verify pending', 'Gift letter needed'], flags: ['High DTI watch', 'FHA upfront MIP due'] },
  { id: 'LA-003', borrower: 'James T. Williams', co: 'Amanda Williams', amount: 725000, type: 'Jumbo 30yr', rate: 7.125, ltv: 75, dti: 35, fico: 791, status: 'Closing', officer: 'Carlos Mendez', uw: 'Aisha Brown', daysOpen: 38, sla: 45, property: '42 Lakeside Dr, Lakeway TX', tasks: ['CD sent – 3 day countdown'], flags: ['Wire pending'] },
  { id: 'LA-004', borrower: 'Nguyen Thi Lan', co: null, amount: 245000, type: 'VA 30yr', rate: 6.25, ltv: 100, dti: 40, fico: 715, status: 'Submitted', officer: 'Carlos Mendez', uw: 'Unassigned', daysOpen: 2, sla: 45, property: '99 Freedom Way, Pflugerville TX', tasks: ['COE needed', 'Initial review pending'], flags: ['VA funding fee'] },
  { id: 'LA-005', borrower: 'Robert Chen', co: 'Lisa Chen', amount: 590000, type: 'Conventional 15yr', rate: 6.25, ltv: 68, dti: 29, fico: 810, status: 'Approved', officer: 'Rachel Kim', uw: 'David Park', daysOpen: 31, sla: 45, property: '567 Pine Ct, Round Rock TX', tasks: ['All conditions cleared'], flags: [] },
  { id: 'LA-006', borrower: 'Fatima Al-Hassan', co: null, amount: 360000, type: 'Conventional 30yr', rate: 6.875, ltv: 80, dti: 37, fico: 754, status: 'Verification', officer: 'Carlos Mendez', uw: 'Unassigned', daysOpen: 11, sla: 45, property: '88 River Oaks, Austin TX', tasks: ['Bank stmts pending 3 mo'], flags: [] },
]

const STATUS_ORDER = ['Submitted', 'Verification', 'Underwriting', 'Approved', 'Closing']
const STATUS_COLOR = { Submitted: '#60a5fa', Verification: '#facc15', Underwriting: '#fb923c', Approved: '#4ade80', Closing: '#a78bfa' }

const fmt = n => `$${(n / 1000).toFixed(0)}K`

export default function LoanOfficerPipeline() {
  const [view, setView] = useState('kanban')
  const [selectedLoan, setSelectedLoan] = useState(null)
  const [filterOfficer, setFilterOfficer] = useState('All')

  const officers = ['All', ...new Set(LOANS.map(l => l.officer))]
  const filtered = filterOfficer === 'All' ? LOANS : LOANS.filter(l => l.officer === filterOfficer)

  const totalVolume = filtered.reduce((s, l) => s + l.amount, 0)
  const avgDTI = (filtered.reduce((s, l) => s + l.dti, 0) / filtered.length).toFixed(1)
  const avgFICO = Math.round(filtered.reduce((s, l) => s + l.fico, 0) / filtered.length)

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800 }}>Loan Officer Pipeline</h1>
          <p style={{ color: '#64748b', fontSize: 13, marginTop: 4 }}>Active loan tracking · {filtered.length} loans · ${ (totalVolume / 1000000).toFixed(2) }M total volume</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <select value={filterOfficer} onChange={e => setFilterOfficer(e.target.value)} style={{ fontSize: 13, padding: '6px 10px', background: '#1e293b', border: '1px solid #334155', borderRadius: 8, color: '#f1f5f9' }}>
            {officers.map(o => <option key={o}>{o}</option>)}
          </select>
          <div className="tab-group">
            <button className={`tab-btn${view === 'kanban' ? ' active' : ''}`} onClick={() => setView('kanban')}>⊞ Kanban</button>
            <button className={`tab-btn${view === 'table' ? ' active' : ''}`} onClick={() => setView('table')}>☰ Table</button>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 24 }}>
        {[
          { label: 'Active Loans', value: filtered.length, sub: `${filtered.filter(l => l.flags.length > 0).length} flagged` },
          { label: 'Total Volume', value: `$${(totalVolume / 1000000).toFixed(2)}M`, sub: 'Pipeline value' },
          { label: 'Avg FICO Score', value: avgFICO, sub: 'Weighted avg' },
          { label: 'Avg DTI', value: `${avgDTI}%`, sub: 'Debt-to-income' },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
            <div className="stat-sub">{s.sub}</div>
          </div>
        ))}
      </div>

      {view === 'kanban' ? (
        <KanbanView loans={filtered} onSelect={setSelectedLoan} selectedId={selectedLoan?.id} />
      ) : (
        <TableView loans={filtered} onSelect={setSelectedLoan} selectedId={selectedLoan?.id} />
      )}

      {selectedLoan && (
        <LoanDetailPanel loan={selectedLoan} onClose={() => setSelectedLoan(null)} />
      )}
    </div>
  )
}

function KanbanView({ loans, onSelect, selectedId }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12, overflowX: 'auto' }}>
      {STATUS_ORDER.map(status => {
        const cols = loans.filter(l => l.status === status)
        return (
          <div key={status}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, padding: '0 4px' }}>
              <span style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', color: STATUS_COLOR[status] }}>{status}</span>
              <span className="badge" style={{ background: `${STATUS_COLOR[status]}22`, color: STATUS_COLOR[status] }}>{cols.length}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {cols.map(l => (
                <KanbanCard key={l.id} loan={l} selected={selectedId === l.id} onClick={() => onSelect(l)} />
              ))}
              {cols.length === 0 && (
                <div style={{ background: '#1e293b', border: '1px dashed #334155', borderRadius: 10, padding: 20, textAlign: 'center', color: '#475569', fontSize: 12 }}>No loans</div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

function KanbanCard({ loan: l, selected, onClick }) {
  const SLA_PCT = (l.daysOpen / l.sla) * 100
  const urgent = SLA_PCT > 80
  return (
    <div
      onClick={onClick}
      style={{
        background: '#1e293b',
        border: `1px solid ${selected ? '#3b82f6' : urgent ? '#ef4444' : '#334155'}`,
        borderRadius: 10, padding: 14, cursor: 'pointer',
        transition: 'border-color 0.15s'
      }}
    >
      <div style={{ fontSize: 12, fontWeight: 700, color: '#94a3b8', marginBottom: 4 }}>{l.id}</div>
      <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 6 }}>{l.borrower}</div>
      <div style={{ fontSize: 12, fontWeight: 700, color: '#f1f5f9', marginBottom: 8 }}>{fmt(l.amount)}</div>
      <div style={{ fontSize: 11, color: '#64748b', marginBottom: 8 }}>FICO {l.fico} · DTI {l.dti}% · LTV {l.ltv}%</div>
      <div style={{ background: '#2d3c55', borderRadius: 4, height: 3, marginBottom: 8 }}>
        <div style={{ height: 3, borderRadius: 4, width: `${Math.min(SLA_PCT, 100)}%`, background: urgent ? '#ef4444' : '#3b82f6', transition: 'width 0.3s' }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 10, color: urgent ? '#f87171' : '#475569' }}>Day {l.daysOpen}/{l.sla}</span>
        {l.flags.length > 0 && <span style={{ fontSize: 10, color: '#fb923c' }}>⚠ {l.flags.length}</span>}
      </div>
    </div>
  )
}

function TableView({ loans, onSelect, selectedId }) {
  return (
    <div className="card" style={{ padding: 0 }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#1e293b' }}>
            {['Loan ID', 'Borrower', 'Amount', 'Type', 'FICO', 'DTI', 'LTV', 'Status', 'Officer', 'SLA', 'Actions'].map(h => (
              <th key={h} style={{ padding: '12px 14px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#475569', textTransform: 'uppercase', borderBottom: '1px solid #334155' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loans.map(l => {
            const SLA_PCT = (l.daysOpen / l.sla) * 100
            return (
              <tr key={l.id} onClick={() => onSelect(l)} style={{ cursor: 'pointer', background: selectedId === l.id ? 'rgba(59,130,246,0.08)' : 'transparent', borderBottom: '1px solid #1e293b' }}>
                <td style={{ padding: '12px 14px', fontSize: 12, fontWeight: 700, color: '#60a5fa' }}>{l.id}</td>
                <td style={{ padding: '12px 14px', fontSize: 13 }}>{l.borrower}</td>
                <td style={{ padding: '12px 14px', fontSize: 13, fontWeight: 700 }}>{fmt(l.amount)}</td>
                <td style={{ padding: '12px 14px', fontSize: 12, color: '#94a3b8' }}>{l.type}</td>
                <td style={{ padding: '12px 14px', fontSize: 13 }}>{l.fico}</td>
                <td style={{ padding: '12px 14px', fontSize: 13, color: l.dti > 43 ? '#f87171' : '#f1f5f9' }}>{l.dti}%</td>
                <td style={{ padding: '12px 14px', fontSize: 13 }}>{l.ltv}%</td>
                <td style={{ padding: '12px 14px' }}>
                  <span className="badge" style={{ background: `${STATUS_COLOR[l.status]}22`, color: STATUS_COLOR[l.status], fontSize: 11 }}>{l.status}</span>
                </td>
                <td style={{ padding: '12px 14px', fontSize: 12, color: '#94a3b8' }}>{l.officer}</td>
                <td style={{ padding: '12px 14px' }}>
                  <div style={{ width: 60 }}>
                    <div style={{ fontSize: 10, color: SLA_PCT > 80 ? '#f87171' : '#64748b', marginBottom: 3 }}>Day {l.daysOpen}</div>
                    <div style={{ height: 3, background: '#334155', borderRadius: 4 }}>
                      <div style={{ height: 3, width: `${Math.min(SLA_PCT, 100)}%`, background: SLA_PCT > 80 ? '#ef4444' : '#3b82f6', borderRadius: 4 }} />
                    </div>
                  </div>
                </td>
                <td style={{ padding: '12px 14px' }}>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button className="btn btn-ghost" style={{ fontSize: 11, padding: '4px 8px' }}>View</button>
                    <button className="btn btn-secondary" style={{ fontSize: 11, padding: '4px 8px' }}>Assign</button>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

function LoanDetailPanel({ loan: l, onClose }) {
  return (
    <div style={{
      position: 'fixed', top: 0, right: 0, width: 400, height: '100vh', overflowY: 'auto',
      background: '#0f172a', borderLeft: '1px solid #334155', padding: 24, zIndex: 999,
      boxShadow: '-4px 0 24px rgba(0,0,0,0.5)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 13, color: '#64748b' }}>{l.id}</div>
          <div style={{ fontSize: 18, fontWeight: 800 }}>{l.borrower}</div>
        </div>
        <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#64748b', fontSize: 20, cursor: 'pointer' }}>×</button>
      </div>

      <span className="badge" style={{ background: `${STATUS_COLOR[l.status]}22`, color: STATUS_COLOR[l.status], marginBottom: 16, display: 'inline-block' }}>{l.status}</span>
      {l.flags.map(f => <span key={f} className="badge badge-orange" style={{ marginLeft: 6, marginBottom: 16 }}>⚠ {f}</span>)}

      <div style={{ background: '#1e293b', borderRadius: 10, padding: 14, marginBottom: 16 }}>
        {[
          ['Loan Amount', fmt(l.amount)],
          ['Loan Type', l.type],
          ['Interest Rate', `${l.rate}%`],
          ['LTV Ratio', `${l.ltv}%`],
          ['DTI Ratio', `${l.dti}%`],
          ['FICO Score', l.fico],
          ['Property', l.property],
          ['Loan Officer', l.officer],
          ['Underwriter', l.uw],
        ].map(([k, v]) => (
          <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #334155', fontSize: 13 }}>
            <span style={{ color: '#64748b' }}>{k}</span>
            <span style={{ fontWeight: 600 }}>{v}</span>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: 8 }}>Pending Tasks</div>
        {l.tasks.map(t => (
          <div key={t} style={{ display: 'flex', gap: 8, alignItems: 'center', padding: '6px 0', fontSize: 13 }}>
            <span style={{ color: '#facc15' }}>●</span> {t}
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <button className="btn btn-primary">📋 View Full Application</button>
        <button className="btn btn-secondary">👤 Assign Underwriter</button>
        <button className="btn btn-ghost" style={{ color: '#60a5fa' }}>📊 Order Credit Report</button>
        <button className="btn btn-ghost" style={{ color: '#f87171' }}>🚩 Add Flag / Note</button>
      </div>
    </div>
  )
}
