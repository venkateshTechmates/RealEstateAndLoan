import { useState } from 'react'

const ORGS = [
  { id: 'O001', name: 'First National Mortgage', type: 'Lender', status: 'Active', users: 42, loans: 1847, volume: '$425M', region: 'US', since: 'Jan 2024', health: 'Healthy' },
  { id: 'O002', name: 'Pacific Realty Group', type: 'Brokerage', status: 'Active', users: 18, loans: 634, volume: '$142M', region: 'US', since: 'Mar 2024', health: 'Healthy' },
  { id: 'O003', name: 'Premier Title Services', type: 'Title Co', status: 'Active', users: 11, loans: 512, volume: '$118M', region: 'US', since: 'Jan 2024', health: 'Healthy' },
  { id: 'O004', name: 'SafeGuard Insurance', type: 'Insurance', status: 'Active', users: 9, loans: 489, volume: '$112M', region: 'US', since: 'Feb 2024', health: 'Healthy' },
  { id: 'O005', name: 'Greenfield Developments', type: 'Builder', status: 'Active', users: 6, loans: 87, volume: '$38M', region: 'US', since: 'Jun 2024', health: 'Healthy' },
  { id: 'O006', name: 'Metro Credit Union', type: 'Lender', status: 'Active', users: 29, loans: 923, volume: '$198M', region: 'US', since: 'Apr 2024', health: 'Warning' },
  { id: 'O007', name: 'Sunrise Mortgage Brokers', type: 'Brokerage', status: 'Inactive', users: 5, loans: 112, volume: '$24M', region: 'US', since: 'Aug 2024', health: 'Inactive' },
  { id: 'O008', name: 'Bharat Home Finance', type: 'Lender', status: 'Active', users: 34, loans: 2104, volume: '$180M', region: 'India', since: 'Sep 2024', health: 'Healthy' },
]

const TYPE_COLORS = { Lender: '#60a5fa', Brokerage: '#facc15', 'Title Co': '#34d399', Insurance: '#fb923c', Builder: '#a78bfa' }
const HEALTH_COLORS = { Healthy: '#4ade80', Warning: '#facc15', Inactive: '#6b7280' }

const PLATFORM_STATS = [
  { label: 'Total Organizations', value: '8', sub: '6 active', color: '#60a5fa' },
  { label: 'Total Users', value: '154', sub: '+12 this month', color: '#a78bfa' },
  { label: 'Platform Loan Volume', value: '$1.24B', sub: 'YTD 2026', color: '#4ade80' },
  { label: 'Active Loans', value: '6,708', sub: 'Across all orgs', color: '#f472b6' },
  { label: 'Avg Processing Time', value: '22 days', sub: 'Target: 15 days', color: '#fb923c' },
  { label: 'Platform Uptime', value: '99.97%', sub: 'Last 30 days', color: '#34d399' },
]

const RECENT_ACTIVITY = [
  { time: '5 min ago', action: 'New application submitted', org: 'First National Mortgage', user: 'Arjun Sharma (Borrower)', type: 'info' },
  { time: '18 min ago', action: 'Lender Admin created new user', org: 'Metro Credit Union', user: 'Rachel Kim → Loan Officer', type: 'info' },
  { time: '42 min ago', action: 'Rate sheet updated', org: 'First National Mortgage', user: 'Sarah Owen (LO)', type: 'info' },
  { time: '1 hr ago', action: 'Title order completed', org: 'Premier Title Services', user: 'Lisa Monroe (Title Agent)', type: 'success' },
  { time: '2 hrs ago', action: 'Compliance alert: Missing HMDA data', org: 'Metro Credit Union', user: 'System', type: 'warning' },
  { time: '3 hrs ago', action: 'New brokerage org onboarded', org: 'Sunrise Mortgage Brokers', user: 'Super Admin', type: 'info' },
]

const COMPLIANCE_STATUS = [
  { rule: 'HMDA Reporting', status: 'Compliant', orgs: '7/8', color: '#4ade80' },
  { rule: 'TRID Disclosure Timing', status: 'Compliant', orgs: '8/8', color: '#4ade80' },
  { rule: 'ECOA / Fair Lending', status: 'Review Needed', orgs: '6/8', color: '#facc15' },
  { rule: 'BSA/AML Checks', status: 'Compliant', orgs: '8/8', color: '#4ade80' },
  { rule: 'SOC 2 Type II', status: 'Certified', orgs: 'Platform', color: '#4ade80' },
  { rule: 'Data Encryption (AES-256)', status: 'Active', orgs: 'Platform', color: '#4ade80' },
]

export default function SuperAdminDashboard() {
  const [activeTab, setActiveTab] = useState('orgs')
  const [filterType, setFilterType] = useState('All')

  const filteredOrgs = filterType === 'All' ? ORGS : ORGS.filter(o => o.type === filterType)

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800 }}>Super Admin Dashboard</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 4 }}>Platform-wide management · All organizations · All regions</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-primary" style={{ fontSize: 13 }}>+ Onboard Org</button>
          <button className="btn" style={{ fontSize: 13, background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}>⬇ Export Report</button>
        </div>
      </div>

      {/* Platform KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 14, marginBottom: 24 }}>
        {PLATFORM_STATS.map(s => (
          <div key={s.label} className="stat-card">
            <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
            <div className="stat-label">{s.label}</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="tab-group" style={{ marginBottom: 20 }}>
        {['orgs', 'activity', 'compliance'].map(t => (
          <button key={t} className={`tab-btn${activeTab === t ? ' active' : ''}`} onClick={() => setActiveTab(t)} style={{ textTransform: 'capitalize' }}>{t}</button>
        ))}
      </div>

      {activeTab === 'orgs' && (
        <>
          {/* Type filter */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            {['All', 'Lender', 'Brokerage', 'Title Co', 'Insurance', 'Builder'].map(t => (
              <button key={t} onClick={() => setFilterType(t)} style={{
                padding: '5px 12px', borderRadius: 20, border: '1px solid var(--border)', cursor: 'pointer', fontSize: 12,
                background: filterType === t ? 'var(--accent)' : 'var(--bg-elevated)',
                color: filterType === t ? '#fff' : 'var(--text-secondary)',
                fontWeight: filterType === t ? 600 : 400,
              }}>{t}</button>
            ))}
          </div>

          <div className="card">
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr>
                  {['Organization', 'Type', 'Status', 'Region', 'Users', 'Active Loans', 'Volume', 'Health', 'Actions'].map(h => (
                    <th key={h} style={{ padding: '10px 14px', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 600, borderBottom: '1px solid var(--border)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredOrgs.map(org => (
                  <tr key={org.id} style={{ borderBottom: '1px solid var(--border)' }} onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-elevated)'} onMouseLeave={e => e.currentTarget.style.background = ''}>
                    <td style={{ padding: '12px 14px' }}>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{org.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Since {org.since}</div>
                    </td>
                    <td style={{ padding: '12px 14px' }}>
                      <span style={{ padding: '3px 8px', borderRadius: 12, background: `${TYPE_COLORS[org.type]}22`, color: TYPE_COLORS[org.type], fontSize: 11, fontWeight: 600 }}>{org.type}</span>
                    </td>
                    <td style={{ padding: '12px 14px' }}>
                      <span style={{ color: org.status === 'Active' ? '#4ade80' : '#6b7280', fontSize: 12 }}>● {org.status}</span>
                    </td>
                    <td style={{ padding: '12px 14px', color: 'var(--text-secondary)', fontSize: 12 }}>{org.region}</td>
                    <td style={{ padding: '12px 14px', color: 'var(--text-primary)', fontWeight: 600 }}>{org.users}</td>
                    <td style={{ padding: '12px 14px', color: 'var(--text-primary)', fontWeight: 600 }}>{org.loans.toLocaleString()}</td>
                    <td style={{ padding: '12px 14px', color: 'var(--text-primary)', fontWeight: 600 }}>{org.volume}</td>
                    <td style={{ padding: '12px 14px' }}>
                      <span style={{ color: HEALTH_COLORS[org.health], fontSize: 12 }}>● {org.health}</span>
                    </td>
                    <td style={{ padding: '12px 14px' }}>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button className="btn" style={{ padding: '4px 10px', fontSize: 11, background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}>View</button>
                        <button className="btn" style={{ padding: '4px 10px', fontSize: 11, background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}>Manage</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {activeTab === 'activity' && (
        <div className="card" style={{ padding: '20px' }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 16 }}>Platform Activity Feed</div>
          {RECENT_ACTIVITY.map((a, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: a.type === 'warning' ? '#facc15' : a.type === 'success' ? '#4ade80' : '#60a5fa', marginTop: 5, flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, color: 'var(--text-primary)', fontWeight: 500 }}>{a.action}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 3 }}>{a.org} · {a.user}</div>
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', flexShrink: 0 }}>{a.time}</div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'compliance' && (
        <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 16 }}>
          <div className="card" style={{ padding: '20px' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 16 }}>Compliance Status — All Organizations</div>
            {COMPLIANCE_STATUS.map(c => (
              <div key={c.rule} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                <span style={{ fontSize: 16 }}>{c.color === '#4ade80' ? '✅' : '⚠️'}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{c.rule}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Coverage: {c.orgs}</div>
                </div>
                <span style={{ padding: '3px 10px', borderRadius: 12, background: `${c.color}22`, color: c.color, fontSize: 11, fontWeight: 700 }}>{c.status}</span>
              </div>
            ))}
          </div>
          <div className="card" style={{ padding: '20px' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 16 }}>Org Type Distribution</div>
            {[
              { type: 'Lenders', count: 3, pct: 37, color: '#60a5fa' },
              { type: 'Brokerages', count: 2, pct: 25, color: '#facc15' },
              { type: 'Title Companies', count: 1, pct: 13, color: '#34d399' },
              { type: 'Insurance', count: 1, pct: 13, color: '#fb923c' },
              { type: 'Builders', count: 1, pct: 12, color: '#a78bfa' },
            ].map(d => (
              <div key={d.type} style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{d.type}</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)' }}>{d.count} ({d.pct}%)</span>
                </div>
                <div style={{ height: 6, borderRadius: 3, background: 'var(--border)', overflow: 'hidden' }}>
                  <div style={{ width: `${d.pct}%`, height: '100%', background: d.color, borderRadius: 3 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
