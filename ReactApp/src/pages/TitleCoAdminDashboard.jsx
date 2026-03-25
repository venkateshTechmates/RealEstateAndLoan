import { useState } from 'react'

const TITLE_AGENTS = [
  { id: 'A01', name: 'Lisa Monroe', email: 'lisa.m@premiertitle.com', orders: 8, completed: 42, revenue: '$41,200', speciality: 'Residential', status: 'Active' },
  { id: 'A02', name: 'Brandon Walsh', email: 'brandon.w@premiertitle.com', orders: 6, completed: 38, revenue: '$37,800', speciality: 'Residential', status: 'Active' },
  { id: 'A03', name: 'Nadia Osei', email: 'nadia.o@premiertitle.com', orders: 4, completed: 27, revenue: '$31,500', speciality: 'Commercial', status: 'Active' },
]

const TITLE_ORDERS = [
  { id: 'TO-2026-0089', lender: 'First National Mortgage', app: 'APP-2026-0421', borrower: 'Arjun Sharma', property: '4821 Maple Ridge Dr, Austin TX', assigned: 'Lisa Monroe', opened: 'Mar 14', due: 'Apr 10', status: 'In Progress', phase: 'Title Search' },
  { id: 'TO-2026-0088', lender: 'Metro Credit Union', app: 'APP-2026-0415', borrower: 'Patricia Nguyen', property: '2201 Oak St, Dallas TX', assigned: 'Brandon Walsh', opened: 'Mar 10', due: 'Apr 5', status: 'Commitment Issued', phase: 'Title Commitment' },
  { id: 'TO-2026-0087', lender: 'First National Mortgage', app: 'APP-2026-0399', borrower: 'Robert Kim', property: '8820 Pine Ave, Houston TX', assigned: 'Lisa Monroe', opened: 'Mar 5', due: 'Mar 28', status: 'Ready to Close', phase: 'Closing Ready' },
  { id: 'TO-2026-0082', lender: 'Coastal Lending', app: 'APP-2026-0367', borrower: 'Elena Vasquez', property: '445 Birch Ln, San Antonio TX', assigned: 'Nadia Osei', opened: 'Feb 28', due: 'Mar 25', status: 'Closed', phase: 'Post-Close Recording' },
  { id: 'TO-2026-0078', lender: 'FedLoan Direct', app: 'APP-2026-0342', borrower: 'Marcus Webb', property: '6610 Cedar Dr, Austin TX', assigned: 'Brandon Walsh', opened: 'Feb 20', due: 'Mar 20', status: 'Closed', phase: 'Deed Recorded' },
]

const TITLE_PRODUCTS = [
  { product: "Lender's Title Insurance", baseRate: '$3.75/$1K', avgPremium: '$1,818', count: 48, revenue: '$87,264' },
  { product: "Owner's Title Insurance", baseRate: '$5.00/$1K', avgPremium: '$2,425', count: 43, revenue: '$104,275' },
  { product: 'Title Search & Exam', baseRate: 'Flat $450', avgPremium: '$450', count: 48, revenue: '$21,600' },
  { product: 'Closing / Settlement Fee', baseRate: 'Flat $650', avgPremium: '$650', count: 48, revenue: '$31,200' },
  { product: 'Recording Fee', baseRate: 'Varies', avgPremium: '$215', count: 48, revenue: '$10,320' },
]

const STATUS_COLOR = { 'In Progress': '#60a5fa', 'Commitment Issued': '#a78bfa', 'Ready to Close': '#facc15', 'Closed': '#4ade80' }

export default function TitleCoAdminDashboard() {
  const [activeTab, setActiveTab] = useState('orders')

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800 }}>Title Co Admin — Premier Title Services</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 4 }}>Title order management · Agent performance · Products & revenue</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-primary" style={{ fontSize: 13 }}>+ New Title Order</button>
          <button className="btn" style={{ fontSize: 13, background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}>⬇ Export</button>
        </div>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 14, marginBottom: 20 }}>
        {[
          { label: 'Open Orders', value: '18', sub: '3 overdue', color: '#34d399' },
          { label: 'Closed MTD', value: '11', sub: '$28,600 revenue', color: '#4ade80' },
          { label: 'Active Agents', value: '3', sub: 'All available', color: '#60a5fa' },
          { label: 'Avg Turnaround', value: '8.4d', sub: 'SLA: 10 days ✅', color: '#4ade80' },
          { label: 'YTD Revenue', value: '$254K', sub: '+18% vs last yr', color: '#a78bfa' },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
            <div className="stat-label">{s.label}</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="tab-group" style={{ marginBottom: 20 }}>
        {['orders', 'agents', 'products'].map(t => (
          <button key={t} className={`tab-btn${activeTab === t ? ' active' : ''}`} onClick={() => setActiveTab(t)} style={{ textTransform: 'capitalize' }}>{t}</button>
        ))}
      </div>

      {activeTab === 'orders' && (
        <div className="card">
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr>
                {['Order ID', 'Application', 'Borrower', 'Property', 'Assigned Agent', 'Due Date', 'Phase', 'Status'].map(h => (
                  <th key={h} style={{ padding: '10px 14px', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 600, borderBottom: '1px solid var(--border)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TITLE_ORDERS.map(o => (
                <tr key={o.id} style={{ borderBottom: '1px solid var(--border)' }} onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-elevated)'} onMouseLeave={e => e.currentTarget.style.background = ''}>
                  <td style={{ padding: '12px 14px', color: '#34d399', fontWeight: 600, fontSize: 12 }}>{o.id}</td>
                  <td style={{ padding: '12px 14px', color: '#60a5fa', fontSize: 12 }}>{o.app}</td>
                  <td style={{ padding: '12px 14px', fontWeight: 600, color: 'var(--text-primary)' }}>{o.borrower}</td>
                  <td style={{ padding: '12px 14px', color: 'var(--text-secondary)', fontSize: 12, maxWidth: 180 }}>{o.property}</td>
                  <td style={{ padding: '12px 14px', color: 'var(--text-secondary)' }}>{o.assigned}</td>
                  <td style={{ padding: '12px 14px', color: 'var(--text-secondary)', fontSize: 12 }}>{o.due}</td>
                  <td style={{ padding: '12px 14px', color: 'var(--text-muted)', fontSize: 12 }}>{o.phase}</td>
                  <td style={{ padding: '12px 14px' }}>
                    <span style={{ padding: '3px 8px', borderRadius: 12, background: `${STATUS_COLOR[o.status]}22`, color: STATUS_COLOR[o.status], fontSize: 11, fontWeight: 600 }}>{o.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'agents' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {TITLE_AGENTS.map(a => (
            <div key={a.id} className="card" style={{ padding: '20px', borderTop: '3px solid #34d399' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#34d39933', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>📜</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>{a.name}</div>
                  <div style={{ fontSize: 11, color: '#34d399' }}>{a.speciality} Specialist</div>
                </div>
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 12 }}>{a.email}</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {[
                  { label: 'Open Orders', value: a.orders, color: '#60a5fa' },
                  { label: 'Closed YTD', value: a.completed, color: '#4ade80' },
                ].map(m => (
                  <div key={m.label} style={{ padding: '10px', background: 'var(--bg-elevated)', borderRadius: 8 }}>
                    <div style={{ fontSize: 20, fontWeight: 700, color: m.color }}>{m.value}</div>
                    <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{m.label}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 12, padding: '8px 12px', background: 'var(--bg-elevated)', borderRadius: 8, display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>YTD Revenue</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#34d399' }}>{a.revenue}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'products' && (
        <div className="card">
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr>
                {['Product', 'Base Rate', 'Avg Premium', 'Count (YTD)', 'Revenue (YTD)'].map(h => (
                  <th key={h} style={{ padding: '10px 14px', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 600, borderBottom: '1px solid var(--border)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TITLE_PRODUCTS.map(p => (
                <tr key={p.product} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '12px 14px', fontWeight: 600, color: 'var(--text-primary)' }}>{p.product}</td>
                  <td style={{ padding: '12px 14px', color: 'var(--text-secondary)' }}>{p.baseRate}</td>
                  <td style={{ padding: '12px 14px', fontWeight: 600, color: '#34d399' }}>{p.avgPremium}</td>
                  <td style={{ padding: '12px 14px', color: 'var(--text-secondary)' }}>{p.count}</td>
                  <td style={{ padding: '12px 14px', fontWeight: 700, color: '#4ade80' }}>{p.revenue}</td>
                </tr>
              ))}
              <tr style={{ background: 'var(--bg-elevated)' }}>
                <td style={{ padding: '12px 14px', fontWeight: 700, color: 'var(--text-primary)' }}>TOTAL</td>
                <td colSpan={3} />
                <td style={{ padding: '12px 14px', fontWeight: 700, color: '#4ade80', fontSize: 15 }}>$254,659</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
