import { useState } from 'react'

const MY_ORDERS = [
  {
    id: 'TO-2026-0089', app: 'APP-2026-0421', borrower: 'Arjun Sharma', coborrower: 'Priya Sharma',
    property: '4821 Maple Ridge Dr, Austin TX 78701', salePrice: '$485,000', lender: 'First National Mortgage',
    loanOfficer: 'Sarah Owen', opened: 'Mar 14, 2026', closingTarget: 'Apr 10, 2026',
    searchStatus: 'In Progress', commitmentStatus: 'Pending', phase: 'Title Search', priority: 'Normal',
    exceptions: ['Seller mortgage lien (pending payoff)', 'HOA dues verify needed'],
    notes: 'Plat confirmed. Abstracting county records 2004–present. No easement issues found yet.',
  },
  {
    id: 'TO-2026-0088', app: 'APP-2026-0415', borrower: 'Patricia Nguyen', coborrower: '—',
    property: '2201 Oak St, Dallas TX 75201', salePrice: '$310,000', lender: 'Metro Credit Union',
    loanOfficer: 'James Turner', opened: 'Mar 10, 2026', closingTarget: 'Apr 5, 2026',
    searchStatus: 'Complete', commitmentStatus: 'Issued', phase: 'Title Commitment',
    exceptions: [],
    notes: 'Commitment issued Mar 22. Waiting on seller to clear existing lien.',
  },
  {
    id: 'TO-2026-0087', app: 'APP-2026-0399', borrower: 'Robert Kim', coborrower: 'Min-Ji Kim',
    property: '8820 Pine Ave, Houston TX 77001', salePrice: '$395,000', lender: 'First National Mortgage',
    loanOfficer: 'Sarah Owen', opened: 'Mar 5, 2026', closingTarget: 'Mar 28, 2026',
    searchStatus: 'Complete', commitmentStatus: 'Cleared', phase: 'Closing Ready',
    exceptions: [],
    notes: 'All exceptions cleared. CD signed. Ready to schedule closing.',
  },
]

const CHECKLIST = [
  { id: 1, label: 'Property legal description verified', done: true },
  { id: 2, label: 'Chain of title abstracted (30 yr)', done: true },
  { id: 3, label: 'Tax lien search complete', done: true },
  { id: 4, label: 'HOA/condo lien search', done: false },
  { id: 5, label: 'IRS / state tax lien check', done: true },
  { id: 6, label: 'Court judgment search', done: false },
  { id: 7, label: 'Vesting deed confirmed', done: true },
  { id: 8, label: 'Survey reviewed (if applicable)', done: false },
  { id: 9, label: 'Commitment draft prepared', done: false },
]

const CLOSINGS_TODAY = [
  { time: '9:00 AM', borrower: 'Robert Kim', app: 'APP-2026-0399', property: '8820 Pine Ave, Houston TX', type: 'Purchase', docs: 'Ready' },
  { time: '2:30 PM', borrower: 'Elena Vasquez', app: 'APP-2026-0367', property: '445 Birch Ln, San Antonio TX', type: 'Refi', docs: 'In Review' },
]

export default function TitleAgentPortal() {
  const [activeTab, setActiveTab] = useState('orders')
  const [selectedOrder, setSelectedOrder] = useState(MY_ORDERS[0])
  const [checklist, setChecklist] = useState(CHECKLIST)

  const toggle = (id) => setChecklist(c => c.map(i => i.id === id ? { ...i, done: !i.done } : i))

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800 }}>Title Agent Portal — Lisa Monroe</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 4 }}>Premier Title Services · My orders, searches, commitments & closings</p>
        </div>
        <div style={{ padding: '6px 12px', background: '#34d39922', borderRadius: 8, color: '#34d399', fontSize: 13, fontWeight: 600 }}>
          🟢 Available
        </div>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 20 }}>
        {[
          { label: 'Open Orders', value: '3', sub: '1 due this week', color: '#34d399' },
          { label: 'Closings Today', value: '2', sub: '9:00 AM & 2:30 PM', color: '#facc15' },
          { label: 'Completed MTD', value: '7', sub: 'Avg 8.1d turnaround', color: '#4ade80' },
          { label: 'Revenue MTD', value: '$14,200', sub: '+12% vs last month', color: '#a78bfa' },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
            <div className="stat-label">{s.label}</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="tab-group" style={{ marginBottom: 20 }}>
        {['orders', 'search', 'closings'].map(t => (
          <button key={t} className={`tab-btn${activeTab === t ? ' active' : ''}`} onClick={() => setActiveTab(t)} style={{ textTransform: 'capitalize' }}>{t}</button>
        ))}
      </div>

      {activeTab === 'orders' && (
        <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: 16 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {MY_ORDERS.map(o => (
              <div key={o.id} className="card" style={{ cursor: 'pointer', borderLeft: `3px solid ${selectedOrder.id === o.id ? '#34d399' : 'var(--border)'}`, padding: '14px 16px' }}
                onClick={() => setSelectedOrder(o)}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#34d399' }}>{o.id}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginTop: 2 }}>{o.borrower}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{o.property}</div>
                <div style={{ marginTop: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 11, padding: '2px 6px', borderRadius: 8, background: '#34d39922', color: '#34d399' }}>{o.phase}</span>
                  <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Close: {o.closingTarget}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>{selectedOrder.id}</div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>{selectedOrder.lender} · LO: {selectedOrder.loanOfficer}</div>
              </div>
              <button className="btn btn-primary" style={{ fontSize: 12 }}>Upload Document</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 20 }}>
              {[
                { label: 'Borrower', value: `${selectedOrder.borrower} / ${selectedOrder.coborrower}` },
                { label: 'Property', value: selectedOrder.property },
                { label: 'Sale Price', value: selectedOrder.salePrice },
                { label: 'Opened', value: selectedOrder.opened },
                { label: 'Closing Target', value: selectedOrder.closingTarget },
                { label: 'Phase', value: selectedOrder.phase },
              ].map(f => (
                <div key={f.label} style={{ padding: '10px 12px', background: 'var(--bg-elevated)', borderRadius: 8 }}>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{f.label}</div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)', marginTop: 4 }}>{f.value}</div>
                </div>
              ))}
            </div>

            {selectedOrder.exceptions.length > 0 && (
              <div style={{ padding: '12px 16px', background: '#fb923c15', borderRadius: 8, border: '1px solid #fb923c33', marginBottom: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#fb923c', marginBottom: 8 }}>⚠ Title Exceptions</div>
                {selectedOrder.exceptions.map(ex => <div key={ex} style={{ fontSize: 12, color: 'var(--text-secondary)', paddingLeft: 8, marginBottom: 4 }}>• {ex}</div>)}
              </div>
            )}

            <div style={{ padding: '10px 14px', background: 'var(--bg-elevated)', borderRadius: 8 }}>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>Agent Notes</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{selectedOrder.notes}</div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'search' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div className="card">
            <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: 16 }}>Title Search Checklist — APP-2026-0421</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {checklist.map(item => (
                <div key={item.id} onClick={() => toggle(item.id)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: 'var(--bg-elevated)', borderRadius: 8, borderLeft: `3px solid ${item.done ? '#4ade80' : 'var(--border)'}` }}>
                  <div style={{ width: 18, height: 18, borderRadius: 4, border: `2px solid ${item.done ? '#4ade80' : 'var(--border)'}`, background: item.done ? '#4ade80' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {item.done && <span style={{ fontSize: 10, color: '#000', fontWeight: 900 }}>✓</span>}
                  </div>
                  <span style={{ fontSize: 13, color: item.done ? 'var(--text-muted)' : 'var(--text-primary)', textDecoration: item.done ? 'line-through' : 'none' }}>{item.label}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 16, padding: '10px 14px', background: 'var(--bg-elevated)', borderRadius: 8, display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Progress</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#4ade80' }}>{checklist.filter(i => i.done).length} / {checklist.length} items complete</span>
            </div>
          </div>

          <div className="card">
            <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: 16 }}>Title Commitment Preview</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { section: 'Schedule A', label: 'Effective Date & Amount', value: 'Apr 10, 2026 · $485,000', done: false },
                { section: 'Schedule A', label: 'Proposed Insured (Lender)', value: 'First National Mortgage & Successors', done: false },
                { section: 'Schedule A', label: 'Proposed Insured (Owner)', value: 'Arjun Sharma and Priya Sharma', done: false },
                { section: 'Schedule B-I', label: 'Requirements', value: '3 items pending', done: false },
                { section: 'Schedule B-II', label: 'Exceptions', value: '2 standard + 2 specific', done: false },
              ].map(s => (
                <div key={s.label} style={{ padding: '10px 12px', background: 'var(--bg-elevated)', borderRadius: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                    <span style={{ fontSize: 10, color: '#34d399', fontWeight: 600, textTransform: 'uppercase' }}>{s.section}</span>
                    <span style={{ fontSize: 10, padding: '2px 6px', background: '#60a5fa22', color: '#60a5fa', borderRadius: 8 }}>Draft</span>
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)' }}>{s.label}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{s.value}</div>
                </div>
              ))}
              <button className="btn btn-primary" style={{ marginTop: 4, width: '100%' }}>Issue Commitment Draft</button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'closings' && (
        <div className="card">
          <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: 16 }}>Today's Closing Schedule — {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
          {CLOSINGS_TODAY.map(c => (
            <div key={c.app} style={{ padding: '16px', background: 'var(--bg-elevated)', borderRadius: 10, marginBottom: 12, borderLeft: '3px solid #34d399' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: '#34d399' }}>{c.time}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginTop: 2 }}>{c.borrower}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{c.property}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: 12, padding: '4px 10px', background: c.docs === 'Ready' ? '#4ade8022' : '#fb923c22', color: c.docs === 'Ready' ? '#4ade80' : '#fb923c', borderRadius: 12, fontWeight: 600 }}>
                    Docs: {c.docs}
                  </span>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 6 }}>{c.type} Closing · {c.app}</div>
                </div>
              </div>
              <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
                <button className="btn btn-primary" style={{ fontSize: 12 }}>View Closing Package</button>
                <button className="btn" style={{ fontSize: 12, background: 'var(--bg-base)', border: '1px solid var(--border)' }}>Send Wire Instructions</button>
                <button className="btn" style={{ fontSize: 12, background: 'var(--bg-base)', border: '1px solid var(--border)' }}>Record Deed</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
