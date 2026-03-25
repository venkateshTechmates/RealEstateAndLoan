import { useState } from 'react'

const BROKERS = [
  { id: 'B01', name: 'Michael Chen', email: 'michael.chen@pacificrealty.com', nmls: '7654321', active: 12, submitted: 48, funded: 31, commission: '$62,400', status: 'Active', ytdVolume: '$14.2M' },
  { id: 'B02', name: 'Diana Torres', email: 'diana.t@pacificrealty.com', nmls: '8765432', active: 9, submitted: 37, funded: 24, commission: '$48,000', status: 'Active', ytdVolume: '$11.1M' },
  { id: 'B03', name: 'James Park', email: 'james.p@pacificrealty.com', nmls: '9876543', active: 7, submitted: 29, funded: 18, commission: '$37,800', status: 'Active', ytdVolume: '$8.4M' },
  { id: 'B04', name: 'Fatima Al-Hassan', email: 'fatima.a@pacificrealty.com', nmls: '0987654', active: 11, submitted: 41, funded: 27, commission: '$55,620', status: 'Active', ytdVolume: '$12.8M' },
  { id: 'B05', name: 'Alex Rivera', email: 'alex.r@pacificrealty.com', nmls: '1098765', active: 4, submitted: 18, funded: 11, commission: '$22,440', status: 'Active', ytdVolume: '$5.1M' },
]

const LENDERS = [
  { name: 'First National Mortgage', type: 'Preferred', rate: '6.875%', products: 6, approvalRate: '78%', avgTurn: '22d', compensation: '2.00%', status: 'Active' },
  { name: 'Metro Credit Union', type: 'Preferred', rate: '6.750%', products: 4, approvalRate: '74%', avgTurn: '26d', compensation: '1.75%', status: 'Active' },
  { name: 'Coastal Lending Corp', type: 'Standard', rate: '7.125%', products: 8, approvalRate: '71%', avgTurn: '19d', compensation: '2.25%', status: 'Active' },
  { name: 'FedLoan Direct', type: 'Standard', rate: '6.500%', products: 3, approvalRate: '82%', avgTurn: '30d', compensation: '1.50%', status: 'Active' },
  { name: 'SunState Mortgage', type: 'Occasional', rate: '7.250%', products: 5, approvalRate: '68%', avgTurn: '24d', compensation: '2.50%', status: 'Review' },
]

const COMMISSIONS = [
  { broker: 'Michael Chen', loan: 'APP-2026-0421', borrower: 'Arjun Sharma', amount: '$485K', commission: '$9,700', status: 'Pending Funding', lender: 'First National', closeDate: 'Apr 15' },
  { broker: 'Diana Torres', loan: 'APP-2026-0387', borrower: 'Patricia Nguyen', amount: '$320K', commission: '$6,400', status: 'Funded - Pending Pay', lender: 'Metro CU', closeDate: 'Apr 2' },
  { broker: 'James Park', loan: 'APP-2026-0312', borrower: 'Robert Kim', amount: '$580K', commission: '$11,600', status: 'Paid', lender: 'Coastal Lending', closeDate: 'Mar 20' },
  { broker: 'Fatima Al-Hassan', loan: 'APP-2026-0298', borrower: 'Linda Walsh', amount: '$410K', commission: '$8,200', status: 'Paid', lender: 'First National', closeDate: 'Mar 15' },
  { broker: 'Michael Chen', loan: 'APP-2026-0276', borrower: 'Samuel Okafor', amount: '$275K', commission: '$5,500', status: 'Paid', lender: 'FedLoan Direct', closeDate: 'Mar 8' },
]

const STATUS_COLOR = { 'Pending Funding': '#facc15', 'Funded - Pending Pay': '#60a5fa', 'Paid': '#4ade80' }

export default function BrokerageAdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800 }}>Brokerage Admin — Pacific Realty Group</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 4 }}>Broker team management · Lender relationships · Commission tracking</p>
        </div>
        <button className="btn btn-primary" style={{ fontSize: 13 }}>+ Add Broker</button>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 14, marginBottom: 20 }}>
        {[
          { label: 'Active Brokers', value: '5', sub: 'NMLS licensed', color: '#facc15' },
          { label: 'Active Loans', value: '43', sub: 'Across all brokers', color: '#60a5fa' },
          { label: 'Funded YTD', value: '111', sub: '$51.6M volume', color: '#4ade80' },
          { label: 'Commissions YTD', value: '$226K', sub: 'Avg 2.01% per loan', color: '#fb923c' },
          { label: 'Lender Partners', value: '5', sub: '2 preferred', color: '#a78bfa' },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
            <div className="stat-label">{s.label}</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="tab-group" style={{ marginBottom: 20 }}>
        {['overview', 'brokers', 'lenders', 'commissions'].map(t => (
          <button key={t} className={`tab-btn${activeTab === t ? ' active' : ''}`} onClick={() => setActiveTab(t)} style={{ textTransform: 'capitalize' }}>{t}</button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div className="card" style={{ padding: '20px' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 16 }}>Broker Performance Ranking</div>
            {BROKERS.sort((a, b) => parseInt(b.commission) - parseInt(a.commission)).map((b, i) => (
              <div key={b.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: i === 0 ? '#facc1533' : 'var(--bg-elevated)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: i === 0 ? '#facc15' : 'var(--text-muted)' }}>
                  {i + 1}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{b.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{b.active} active · {b.funded} funded YTD</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#4ade80' }}>{b.commission}</div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>commission YTD</div>
                </div>
              </div>
            ))}
          </div>
          <div className="card" style={{ padding: '20px' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 16 }}>Lender Partner Summary</div>
            {LENDERS.map(l => (
              <div key={l.name} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{l.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{l.type} · {l.products} products · {l.avgTurn} turn</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#60a5fa' }}>{l.rate}</div>
                  <div style={{ fontSize: 10, color: '#4ade80' }}>{l.compensation} comp</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'brokers' && (
        <div className="card">
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr>
                {['Broker', 'NMLS ID', 'Active', 'Submitted YTD', 'Funded YTD', 'YTD Volume', 'Commission YTD', 'Status'].map(h => (
                  <th key={h} style={{ padding: '10px 14px', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 600, borderBottom: '1px solid var(--border)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {BROKERS.map(b => (
                <tr key={b.id} style={{ borderBottom: '1px solid var(--border)' }} onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-elevated)'} onMouseLeave={e => e.currentTarget.style.background = ''}>
                  <td style={{ padding: '12px 14px' }}>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{b.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{b.email}</div>
                  </td>
                  <td style={{ padding: '12px 14px', color: 'var(--text-secondary)', fontSize: 12 }}>{b.nmls}</td>
                  <td style={{ padding: '12px 14px', fontWeight: 700, color: 'var(--text-primary)' }}>{b.active}</td>
                  <td style={{ padding: '12px 14px', color: 'var(--text-secondary)' }}>{b.submitted}</td>
                  <td style={{ padding: '12px 14px', fontWeight: 700, color: '#4ade80' }}>{b.funded}</td>
                  <td style={{ padding: '12px 14px', fontWeight: 600, color: 'var(--text-primary)' }}>{b.ytdVolume}</td>
                  <td style={{ padding: '12px 14px', fontWeight: 700, color: '#facc15' }}>{b.commission}</td>
                  <td style={{ padding: '12px 14px' }}>
                    <span style={{ color: '#4ade80', fontSize: 12 }}>● {b.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'lenders' && (
        <div className="card">
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr>
                {['Lender', 'Partnership', 'Best Rate', 'Products', 'Approval Rate', 'Avg Turn', 'Broker Comp', 'Status'].map(h => (
                  <th key={h} style={{ padding: '10px 14px', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 600, borderBottom: '1px solid var(--border)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {LENDERS.map(l => (
                <tr key={l.name} style={{ borderBottom: '1px solid var(--border)' }} onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-elevated)'} onMouseLeave={e => e.currentTarget.style.background = ''}>
                  <td style={{ padding: '12px 14px', fontWeight: 600, color: 'var(--text-primary)' }}>{l.name}</td>
                  <td style={{ padding: '12px 14px' }}>
                    <span style={{ padding: '3px 8px', borderRadius: 12, background: l.type === 'Preferred' ? '#facc1522' : l.type === 'Standard' ? '#60a5fa22' : '#6b728022', color: l.type === 'Preferred' ? '#facc15' : l.type === 'Standard' ? '#60a5fa' : '#9ca3af', fontSize: 11, fontWeight: 600 }}>{l.type}</span>
                  </td>
                  <td style={{ padding: '12px 14px', fontWeight: 700, color: '#60a5fa' }}>{l.rate}</td>
                  <td style={{ padding: '12px 14px', color: 'var(--text-secondary)' }}>{l.products}</td>
                  <td style={{ padding: '12px 14px', fontWeight: 600, color: '#4ade80' }}>{l.approvalRate}</td>
                  <td style={{ padding: '12px 14px', color: 'var(--text-secondary)' }}>{l.avgTurn}</td>
                  <td style={{ padding: '12px 14px', fontWeight: 700, color: '#fb923c' }}>{l.compensation}</td>
                  <td style={{ padding: '12px 14px' }}>
                    <span style={{ padding: '3px 8px', borderRadius: 12, background: l.status === 'Active' ? '#4ade8022' : '#facc1522', color: l.status === 'Active' ? '#4ade80' : '#facc15', fontSize: 11, fontWeight: 600 }}>{l.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'commissions' && (
        <div>
          <div className="card" style={{ marginBottom: 16, padding: '14px 20px', display: 'flex', gap: 32 }}>
            {[
              { label: 'Pending Commission', value: '$16,100', color: '#facc15' },
              { label: 'Awaiting Payment', value: '$6,400', color: '#60a5fa' },
              { label: 'Paid This Month', value: '$25,300', color: '#4ade80' },
            ].map(s => (
              <div key={s.label}>
                <div style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>{s.label}</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: s.color }}>{s.value}</div>
              </div>
            ))}
          </div>
          <div className="card">
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr>
                  {['Broker', 'Loan ID', 'Borrower', 'Loan Amount', 'Commission', 'Lender', 'Close Date', 'Status'].map(h => (
                    <th key={h} style={{ padding: '10px 14px', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 600, borderBottom: '1px solid var(--border)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMMISSIONS.map((c, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border)' }} onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-elevated)'} onMouseLeave={e => e.currentTarget.style.background = ''}>
                    <td style={{ padding: '12px 14px', fontWeight: 600, color: 'var(--text-primary)' }}>{c.broker}</td>
                    <td style={{ padding: '12px 14px', color: '#60a5fa', fontSize: 12 }}>{c.loan}</td>
                    <td style={{ padding: '12px 14px', color: 'var(--text-secondary)' }}>{c.borrower}</td>
                    <td style={{ padding: '12px 14px', fontWeight: 600, color: 'var(--text-primary)' }}>{c.amount}</td>
                    <td style={{ padding: '12px 14px', fontWeight: 700, color: '#facc15' }}>{c.commission}</td>
                    <td style={{ padding: '12px 14px', color: 'var(--text-secondary)' }}>{c.lender}</td>
                    <td style={{ padding: '12px 14px', color: 'var(--text-secondary)' }}>{c.closeDate}</td>
                    <td style={{ padding: '12px 14px' }}>
                      <span style={{ padding: '3px 8px', borderRadius: 12, background: `${STATUS_COLOR[c.status]}22`, color: STATUS_COLOR[c.status], fontSize: 11, fontWeight: 600 }}>{c.status}</span>
                    </td>
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
