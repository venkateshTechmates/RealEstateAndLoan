import { useState } from 'react'

const QUEUE_ITEMS = [
  { id: 'AQ-001', appNo: 'APP-2026-0421', borrower: 'John Doe', assetType: 'Brokerage', institution: 'Vanguard', amount: 65000, priority: 'High', sla: '2h', assignedTo: 'Sarah J.', status: 'In Review', submitted: 'Mar 24 9:12 AM', aging: '4h' },
  { id: 'AQ-002', appNo: 'APP-2026-0418', borrower: 'Maria C.', assetType: 'Checking', institution: 'Wells Fargo', amount: 42000, priority: 'Medium', sla: '24h', assignedTo: 'Mike T.', status: 'Pending', submitted: 'Mar 24 8:30 AM', aging: '5h' },
  { id: 'AQ-003', appNo: 'APP-2026-0415', borrower: 'Robert L.', assetType: 'Crypto', institution: 'Coinbase', amount: 28000, priority: 'High', sla: '2h', assignedTo: 'Sarah J.', status: 'Questioned', submitted: 'Mar 23 4:00 PM', aging: '18h' },
  { id: 'AQ-004', appNo: 'APP-2026-0412', borrower: 'Linda H.', assetType: 'Savings', institution: 'Bank of America', amount: 95000, priority: 'Low', sla: '48h', assignedTo: 'Tom B.', status: 'Pending', submitted: 'Mar 23 2:45 PM', aging: '20h' },
  { id: 'AQ-005', appNo: 'APP-2026-0409', borrower: 'James W.', assetType: 'Gift Funds', institution: 'Wire Transfer', amount: 35000, priority: 'Medium', sla: '24h', assignedTo: 'Sarah J.', status: 'Verified', submitted: 'Mar 22 11:00 AM', aging: '2d' },
  { id: 'AQ-006', appNo: 'APP-2026-0407', borrower: 'Karen S.', assetType: '401k', institution: 'Fidelity', amount: 120000, priority: 'Low', sla: '48h', assignedTo: 'Mike T.', status: 'Verified', submitted: 'Mar 22 9:30 AM', aging: '2d' },
  { id: 'AQ-007', appNo: 'APP-2026-0403', borrower: 'David P.', assetType: 'Checking', institution: 'Chase', amount: 18500, priority: 'High', sla: '2h', assignedTo: 'Unassigned', status: 'Pending', submitted: 'Mar 24 10:00 AM', aging: '3h' },
  { id: 'AQ-008', appNo: 'APP-2026-0401', borrower: 'Emma T.', assetType: 'Stock', institution: 'Schwab', amount: 55000, priority: 'Medium', sla: '24h', assignedTo: 'Tom B.', status: 'In Review', submitted: 'Mar 23 1:15 PM', aging: '22h' },
]

const STATUS_META = {
  'In Review': { color: '#60a5fa', bg: 'rgba(96,165,250,0.12)' },
  Pending:    { color: '#facc15', bg: 'rgba(250,204,21,0.12)' },
  Questioned: { color: '#fb923c', bg: 'rgba(251,146,60,0.12)' },
  Verified:   { color: '#4ade80', bg: 'rgba(74,222,128,0.12)' },
  Rejected:   { color: '#f87171', bg: 'rgba(248,113,113,0.12)' },
}

const PRIORITY_META = {
  High:   { color: '#f87171', bg: 'rgba(248,113,113,0.12)' },
  Medium: { color: '#facc15', bg: 'rgba(250,204,21,0.12)' },
  Low:    { color: '#4ade80', bg: 'rgba(74,222,128,0.12)' },
}

export default function LenderAssetQueue() {
  const [filterStatus, setFilterStatus] = useState('All')
  const [filterPriority, setFilterPriority] = useState('All')
  const [filterType, setFilterType] = useState('All')
  const [searchQ, setSearchQ] = useState('')
  const [selected, setSelected] = useState([])
  const [activeItem, setActiveItem] = useState(null)

  const filtered = QUEUE_ITEMS.filter(i => {
    if (filterStatus !== 'All' && i.status !== filterStatus) return false
    if (filterPriority !== 'All' && i.priority !== filterPriority) return false
    if (filterType !== 'All' && i.assetType !== filterType) return false
    if (searchQ && !i.borrower.toLowerCase().includes(searchQ.toLowerCase()) && !i.appNo.toLowerCase().includes(searchQ.toLowerCase())) return false
    return true
  })

  const totalCount = QUEUE_ITEMS.length
  const pendingCount = QUEUE_ITEMS.filter(i => i.status === 'Pending').length
  const reviewCount = QUEUE_ITEMS.filter(i => i.status === 'In Review').length
  const questionedCount = QUEUE_ITEMS.filter(i => i.status === 'Questioned').length
  const verifiedCount = QUEUE_ITEMS.filter(i => i.status === 'Verified').length

  const toggleSelect = id => setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id])
  const selectAll = () => setSelected(filtered.map(i => i.id))
  const clearAll = () => setSelected([])

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800 }}>Asset Verification Queue</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 4 }}>Review and verify borrower-submitted assets</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-ghost" style={{ fontSize: 13 }}>📊 Export Report</button>
          <button className="btn btn-primary" style={{ fontSize: 13 }}>⚙️ Queue Settings</button>
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12, marginBottom: 20 }}>
        {[
          { label: 'Total Assets', value: totalCount, trend: '+3 today', trendUp: true, icon: '📋', color: '#60a5fa' },
          { label: 'Pending Review', value: pendingCount, trend: '+2 today', trendUp: false, icon: '⏳', color: '#facc15' },
          { label: 'In Review', value: reviewCount, trend: '-1 today', trendUp: true, icon: '🔍', color: '#60a5fa' },
          { label: 'Questioned', value: questionedCount, trend: '+1 today', trendUp: false, icon: '❓', color: '#fb923c' },
          { label: 'Verified', value: verifiedCount, trend: '+4 today', trendUp: true, icon: '✅', color: '#4ade80' },
        ].map(s => (
          <div key={s.label} className="stat-card" style={{ padding: '14px 16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <span style={{ fontSize: 20 }}>{s.icon}</span>
              <span style={{ fontSize: 11, color: s.trendUp ? '#4ade80' : '#f87171', fontWeight: 600 }}>{s.trend}</span>
            </div>
            <div style={{ fontSize: 26, fontWeight: 900, color: s.color, marginBottom: 2 }}>{s.value}</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filter bar */}
      <div className="card" style={{ padding: '12px 16px', marginBottom: 16 }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 600 }}>Filters:</span>
          {[
            { label: 'Status', value: filterStatus, set: setFilterStatus, opts: ['All', 'Pending', 'In Review', 'Questioned', 'Verified', 'Rejected'] },
            { label: 'Priority', value: filterPriority, set: setFilterPriority, opts: ['All', 'High', 'Medium', 'Low'] },
            { label: 'Asset Type', value: filterType, set: setFilterType, opts: ['All', 'Checking', 'Savings', 'Brokerage', 'Crypto', 'Gift Funds', '401k', 'Stock'] },
          ].map(f => (
            <select key={f.label} value={f.value} onChange={e => f.set(e.target.value)}
              style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 8, padding: '6px 10px', fontSize: 12, color: 'var(--text-primary)', cursor: 'pointer' }}>
              {f.opts.map(o => <option key={o} value={o}>{f.label}: {o}</option>)}
            </select>
          ))}
          <div style={{ flex: 1 }} />
          <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 8, padding: '6px 10px', display: 'flex', alignItems: 'center', gap: 6, minWidth: 200 }}>
            <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>🔍</span>
            <input value={searchQ} onChange={e => setSearchQ(e.target.value)} placeholder="Search borrower, app #..."
              style={{ background: 'none', border: 'none', outline: 'none', color: 'var(--text-primary)', fontSize: 12, width: '100%' }} />
          </div>
          {(filterStatus !== 'All' || filterPriority !== 'All' || filterType !== 'All' || searchQ) && (
            <button className="btn btn-ghost" style={{ fontSize: 12, color: '#f87171' }}
              onClick={() => { setFilterStatus('All'); setFilterPriority('All'); setFilterType('All'); setSearchQ('') }}>
              ✕ Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Bulk actions */}
      {selected.length > 0 && (
        <div style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: 10, padding: '10px 16px', marginBottom: 12, display: 'flex', gap: 12, alignItems: 'center' }}>
          <span style={{ fontSize: 13, color: '#60a5fa', fontWeight: 700 }}>{selected.length} item(s) selected</span>
          <button className="btn btn-primary" style={{ fontSize: 12 }}>✅ Approve All</button>
          <button className="btn btn-secondary" style={{ fontSize: 12 }}>↩ Assign To</button>
          <button className="btn btn-ghost" style={{ fontSize: 12, color: '#fb923c' }}>❓ Question All</button>
          <button className="btn btn-ghost" style={{ fontSize: 12, color: 'var(--text-muted)' }} onClick={clearAll}>✕ Clear Selection</button>
        </div>
      )}

      {/* Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ background: 'var(--bg-base)', borderBottom: '1px solid var(--border)' }}>
              <th style={{ padding: '10px 14px', textAlign: 'left', width: 36 }}>
                <input type="checkbox" onChange={e => e.target.checked ? selectAll() : clearAll()} checked={selected.length === filtered.length && filtered.length > 0} />
              </th>
              {['App #', 'Borrower', 'Asset Type', 'Institution', 'Amount', 'Priority', 'Assigned To', 'SLA', 'Status', 'Actions'].map(h => (
                <th key={h} style={{ padding: '10px 10px', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 700, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((item, i) => {
              const sm = STATUS_META[item.status] || STATUS_META.Pending
              const pm = PRIORITY_META[item.priority]
              return (
                <tr key={item.id} style={{ borderBottom: '1px solid var(--border)', background: selected.includes(item.id) ? 'rgba(59,130,246,0.06)' : 'transparent' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                  onMouseLeave={e => e.currentTarget.style.background = selected.includes(item.id) ? 'rgba(59,130,246,0.06)' : 'transparent'}>
                  <td style={{ padding: '12px 14px' }}>
                    <input type="checkbox" checked={selected.includes(item.id)} onChange={() => toggleSelect(item.id)} />
                  </td>
                  <td style={{ padding: '12px 10px' }}>
                    <div style={{ fontWeight: 700, color: '#60a5fa' }}>{item.appNo}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{item.submitted}</div>
                  </td>
                  <td style={{ padding: '12px 10px' }}>
                    <div style={{ fontWeight: 600 }}>{item.borrower}</div>
                  </td>
                  <td style={{ padding: '12px 10px' }}>
                    <span className="badge" style={{ background: 'var(--bg-elevated)', color: 'var(--text-secondary)', fontSize: 11 }}>{item.assetType}</span>
                  </td>
                  <td style={{ padding: '12px 10px', color: 'var(--text-secondary)' }}>{item.institution}</td>
                  <td style={{ padding: '12px 10px', fontWeight: 700, color: 'var(--text-primary)' }}>${item.amount.toLocaleString()}</td>
                  <td style={{ padding: '12px 10px' }}>
                    <span className="badge" style={{ background: pm.bg, color: pm.color, fontSize: 11 }}>{item.priority}</span>
                  </td>
                  <td style={{ padding: '12px 10px', color: item.assignedTo === 'Unassigned' ? '#f87171' : 'var(--text-secondary)', fontSize: 12 }}>{item.assignedTo}</td>
                  <td style={{ padding: '12px 10px' }}>
                    <div style={{ fontSize: 12, color: item.priority === 'High' ? '#f87171' : 'var(--text-muted)' }}>SLA: {item.sla}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Aging: {item.aging}</div>
                  </td>
                  <td style={{ padding: '12px 10px' }}>
                    <span className="badge" style={{ background: sm.bg, color: sm.color, fontSize: 11 }}>{item.status}</span>
                  </td>
                  <td style={{ padding: '12px 10px' }}>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button className="btn btn-ghost" style={{ fontSize: 11, padding: '4px 8px', color: '#60a5fa' }} onClick={() => setActiveItem(item)}>Review</button>
                      {item.status === 'Pending' && <button className="btn btn-ghost" style={{ fontSize: 11, padding: '4px 8px', color: '#4ade80' }}>✓ Approve</button>}
                      {item.status !== 'Questioned' && <button className="btn btn-ghost" style={{ fontSize: 11, padding: '4px 8px', color: '#fb923c' }}>? Question</button>}
                    </div>
                  </td>
                </tr>
              )
            })}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={11} style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)' }}>No assets match the current filters.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: 10, fontSize: 12, color: 'var(--text-muted)', textAlign: 'right' }}>
        Showing {filtered.length} of {QUEUE_ITEMS.length} items
      </div>

      {/* Asset Detail Side Panel */}
      {activeItem && (
        <div style={{ position: 'fixed', right: 0, top: 0, bottom: 0, width: 400, background: 'var(--bg-elevated)', borderLeft: '1px solid var(--border)', zIndex: 200, overflowY: 'auto', padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <div style={{ fontWeight: 800, fontSize: 15 }}>Review Asset</div>
            <button onClick={() => setActiveItem(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: 20, cursor: 'pointer' }}>✕</button>
          </div>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 17, fontWeight: 800, marginBottom: 2 }}>{activeItem.borrower}</div>
            <div style={{ color: '#60a5fa', fontSize: 13 }}>{activeItem.appNo}</div>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, marginBottom: 20 }}>
            <tbody>
              {[
                ['Asset Type', activeItem.assetType],
                ['Institution', activeItem.institution],
                ['Amount', `$${activeItem.amount.toLocaleString()}`],
                ['Priority', activeItem.priority],
                ['SLA Remaining', activeItem.sla],
                ['Aging', activeItem.aging],
                ['Assigned To', activeItem.assignedTo],
                ['Current Status', activeItem.status],
              ].map(([k, v]) => (
                <tr key={k} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '9px 0', color: 'var(--text-muted)' }}>{k}</td>
                  <td style={{ padding: '9px 0', fontWeight: 600 }}>{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ fontWeight: 700, marginBottom: 10 }}>Add Note</div>
          <textarea rows={3} placeholder="Enter verification notes..." style={{ width: '100%', background: 'var(--bg-base)', border: '1px solid var(--border)', borderRadius: 8, padding: 10, color: 'var(--text-primary)', fontSize: 13, resize: 'none', marginBottom: 14, boxSizing: 'border-box' }} />
          <div style={{ display: 'flex', gap: 8, flexDirection: 'column' }}>
            <button className="btn btn-primary" style={{ width: '100%' }}>✅ Approve Asset</button>
            <button className="btn btn-ghost" style={{ width: '100%', color: '#fb923c' }}>❓ Question — Request More Info</button>
            <button className="btn btn-ghost" style={{ width: '100%', color: '#f87171' }}>✗ Reject Asset</button>
            <button className="btn btn-ghost" style={{ width: '100%', color: 'var(--text-muted)' }} onClick={() => setActiveItem(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  )
}
