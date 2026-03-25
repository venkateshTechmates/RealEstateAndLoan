import { useState } from 'react'
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from 'recharts'

const PIPELINE_ITEMS = [
  { id: 'APP-2026-0418', borrower: 'Maria C.', property: '456 Oak Ave, Dallas TX', loanAmt: 385000, type: 'Conventional', ltv: 77, rate: '6.750%', stage: 'Processing', lastUpdate: '2 hours ago', daysOpen: 14 },
  { id: 'APP-2026-0415', borrower: 'Robert L.', property: '789 Elm St, Houston TX', loanAmt: 620000, type: 'Jumbo', ltv: 71, rate: '7.125%', stage: 'Underwriting', lastUpdate: '4 hours ago', daysOpen: 22 },
  { id: 'APP-2026-0409', borrower: 'James W.', property: '321 Maple Dr, San Antonio TX', loanAmt: 295000, type: 'FHA', ltv: 95, rate: '6.500%', stage: 'Approved', lastUpdate: 'Yesterday', daysOpen: 30 },
  { id: 'APP-2026-0403', borrower: 'David P.', property: '654 Pine St, Austin TX', loanAmt: 510000, type: 'Conventional', ltv: 80, rate: '6.875%', stage: 'Clear to Close', lastUpdate: 'Today', daysOpen: 38 },
  { id: 'APP-2026-0398', borrower: 'Emma T.', property: '987 Cedar Blvd, Austin TX', loanAmt: 440000, type: 'VA', ltv: 100, rate: '6.375%', stage: 'Closed', lastUpdate: 'Mar 20', daysOpen: 45 },
]

const CLIENTS = [
  { id: 1, name: 'Sarah & Michael Todd', email: 's.todd@email.com', phone: '555-210-3344', loans: 2, totalVol: 820000, status: 'Active', lastContact: 'Mar 24' },
  { id: 2, name: 'David Park', email: 'd.park@email.com', phone: '555-987-6534', loans: 1, totalVol: 510000, status: 'Active', lastContact: 'Mar 23' },
  { id: 3, name: 'Emma Thompson', email: 'e.thompson@email.com', phone: '555-321-7890', loans: 1, totalVol: 440000, status: 'Closed', lastContact: 'Mar 20' },
  { id: 4, name: 'Carlos & Ana Rivera', email: 'c.rivera@email.com', phone: '555-654-2211', loans: 3, totalVol: 1200000, status: 'Prospect', lastContact: 'Mar 18' },
]

const COMMISSION_DATA = [
  { month: 'Oct', earned: 8200 },
  { month: 'Nov', earned: 11500 },
  { month: 'Dec', earned: 6800 },
  { month: 'Jan', earned: 14200 },
  { month: 'Feb', earned: 18600 },
  { month: 'Mar', earned: 21400 },
]

const STAGE_META = {
  'Processing':     { color: '#60a5fa', bg: 'rgba(96,165,250,0.12)' },
  'Underwriting':   { color: '#a78bfa', bg: 'rgba(167,139,250,0.12)' },
  'Approved':       { color: '#4ade80', bg: 'rgba(74,222,128,0.12)' },
  'Clear to Close': { color: '#34d399', bg: 'rgba(52,211,153,0.12)' },
  'Closed':         { color: 'var(--text-secondary)', bg: 'rgba(148,163,184,0.12)' },
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 8, padding: '8px 14px' }}>
        <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 3 }}>{label}</div>
        <div style={{ fontSize: 14, fontWeight: 800, color: '#4ade80' }}>${payload[0].value.toLocaleString()}</div>
      </div>
    )
  }
  return null
}

export default function BrokerDashboard() {
  const [tab, setTab] = useState('pipeline')

  const totalVolume = PIPELINE_ITEMS.reduce((s, i) => s + i.loanAmt, 0)
  const approvalRate = Math.round(PIPELINE_ITEMS.filter(i => ['Approved', 'Clear to Close', 'Closed'].includes(i.stage)).length / PIPELINE_ITEMS.length * 100)
  const ytdCommission = COMMISSION_DATA.reduce((s, m) => s + m.earned, 0)
  const avgRate = (PIPELINE_ITEMS.reduce((s, i) => s + parseFloat(i.rate), 0) / PIPELINE_ITEMS.length).toFixed(3)

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800 }}>Broker Dashboard</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 4 }}>Overview of your submitted loans and compensation</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-ghost" style={{ fontSize: 13 }}>📊 Export Report</button>
          <button className="btn btn-primary" style={{ fontSize: 13 }}>+ Submit New Loan</button>
        </div>
      </div>

      {/* KPI cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 20 }}>
        {[
          { label: 'Active Pipeline Volume', value: `$${(totalVolume / 1000000).toFixed(2)}M`, trend: '+2 new this month', icon: '💰', color: '#60a5fa' },
          { label: 'Approval Rate (YTD)', value: `${approvalRate}%`, trend: '▲ +5% vs last quarter', icon: '✅', color: '#4ade80' },
          { label: 'YTD Commission', value: `$${(ytdCommission / 1000).toFixed(1)}K`, trend: '▲ 18% vs prior year', icon: '💵', color: '#a78bfa' },
          { label: 'Avg Rate Delivered', value: `${avgRate}%`, trend: '30-yr fixed avg', icon: '📈', color: '#facc15' },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div style={{ fontSize: 24, marginBottom: 8 }}>{s.icon}</div>
            <div style={{ fontSize: 22, fontWeight: 900, color: s.color, marginBottom: 3 }}>{s.value}</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 4 }}>{s.label}</div>
            <div style={{ fontSize: 12, color: '#4ade80' }}>{s.trend}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="tab-group" style={{ marginBottom: 16 }}>
        {[['pipeline', '📋 Loan Pipeline'], ['clients', '👥 My Clients'], ['compensation', '💵 Compensation']].map(([id, label]) => (
          <button key={id} className={`tab-btn ${tab === id ? 'active' : ''}`} onClick={() => setTab(id)}>{label}</button>
        ))}
      </div>

      {/* Pipeline Tab */}
      {tab === 'pipeline' && (
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: 'var(--bg-base)', borderBottom: '1px solid var(--border)' }}>
                {['App #', 'Borrower', 'Property', 'Loan Amount', 'Type', 'LTV', 'Rate', 'Stage', 'Days Open', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 700, fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PIPELINE_ITEMS.map(item => {
                const sm = STAGE_META[item.stage] || STAGE_META.Processing
                return (
                  <tr key={item.id} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '12px 12px', fontWeight: 700, color: '#60a5fa' }}>{item.id}</td>
                    <td style={{ padding: '12px 12px', fontWeight: 600 }}>{item.borrower}</td>
                    <td style={{ padding: '12px 12px', color: 'var(--text-secondary)', fontSize: 12, maxWidth: 160 }}>{item.property}</td>
                    <td style={{ padding: '12px 12px', fontWeight: 700 }}>${item.loanAmt.toLocaleString()}</td>
                    <td style={{ padding: '12px 12px' }}>
                      <span className="badge" style={{ background: 'var(--bg-elevated)', color: 'var(--text-secondary)', fontSize: 11 }}>{item.type}</span>
                    </td>
                    <td style={{ padding: '12px 12px', color: item.ltv >= 95 ? '#fb923c' : item.ltv >= 80 ? '#facc15' : '#4ade80', fontWeight: 700 }}>{item.ltv}%</td>
                    <td style={{ padding: '12px 12px', fontWeight: 700, color: 'var(--text-primary)' }}>{item.rate}</td>
                    <td style={{ padding: '12px 12px' }}>
                      <span className="badge" style={{ background: sm.bg, color: sm.color, fontSize: 11 }}>{item.stage}</span>
                    </td>
                    <td style={{ padding: '12px 12px', color: item.daysOpen > 30 ? '#f87171' : 'var(--text-muted)' }}>{item.daysOpen}d</td>
                    <td style={{ padding: '12px 12px' }}>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button className="btn btn-ghost" style={{ fontSize: 11, padding: '4px 8px', color: '#60a5fa' }}>View</button>
                        <button className="btn btn-ghost" style={{ fontSize: 11, padding: '4px 8px' }}>💬 Message</button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Clients Tab */}
      {tab === 'clients' && (
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 700 }}>Client Roster</span>
            <button className="btn btn-primary" style={{ fontSize: 13 }}>+ Add Client</button>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: 'var(--bg-base)', borderBottom: '1px solid var(--border)' }}>
                {['Client', 'Contact', 'Loans', 'Total Volume', 'Status', 'Last Contact', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 700, fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CLIENTS.map(c => (
                <tr key={c.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '14px 14px' }}>
                    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                      <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, #3b82f6, #a78bfa)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, color: '#fff' }}>
                        {c.name.split(' ')[0][0]}{c.name.split(' ').at(-1)[0]}
                      </div>
                      <span style={{ fontWeight: 700 }}>{c.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: '14px 14px' }}>
                    <div style={{ fontSize: 12, color: '#60a5fa' }}>{c.email}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{c.phone}</div>
                  </td>
                  <td style={{ padding: '14px 14px', fontWeight: 700, textAlign: 'center' }}>{c.loans}</td>
                  <td style={{ padding: '14px 14px', fontWeight: 700 }}>${c.totalVol.toLocaleString()}</td>
                  <td style={{ padding: '14px 14px' }}>
                    <span className={`badge ${c.status === 'Active' ? 'badge-green' : c.status === 'Closed' ? '' : 'badge-blue'}`}
                      style={{ fontSize: 11, background: c.status === 'Closed' ? 'rgba(148,163,184,0.12)' : c.status === 'Prospect' ? 'rgba(96,165,250,0.12)' : undefined, color: c.status === 'Closed' ? 'var(--text-muted)' : c.status === 'Prospect' ? '#60a5fa' : undefined }}>
                      {c.status}
                    </span>
                  </td>
                  <td style={{ padding: '14px 14px', color: 'var(--text-muted)' }}>{c.lastContact}</td>
                  <td style={{ padding: '14px 14px' }}>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button className="btn btn-ghost" style={{ fontSize: 11, padding: '4px 8px' }}>View</button>
                      <button className="btn btn-ghost" style={{ fontSize: 11, padding: '4px 8px' }}>💬</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Compensation Tab */}
      {tab === 'compensation' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div className="card">
            <div style={{ fontWeight: 700, marginBottom: 14 }}>Monthly Commission Earned</div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={COMMISSION_DATA} margin={{ top: 5, right: 10, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="month" stroke="var(--text-muted)" tick={{ fontSize: 11 }} />
                <YAxis stroke="var(--text-muted)" tick={{ fontSize: 11 }} tickFormatter={v => `$${v / 1000}K`} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="earned" name="Commission" fill="#4ade80" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="card">
            <div style={{ fontWeight: 700, marginBottom: 16 }}>Commission Summary</div>
            {[
              ['YTD Gross Commission', `$${(ytdCommission / 1000).toFixed(1)}K`, '#4ade80'],
              ['Mar 2026 Commission', `$21,400`, '#60a5fa'],
              ['Avg Per Loan', `$6,820`, 'var(--text-primary)'],
              ['Loans Closed YTD', '12', 'var(--text-primary)'],
              ['YTD Loan Volume', `$${(totalVolume * 2.4 / 1000000).toFixed(1)}M`, '#a78bfa'],
            ].map(([k, v, c]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--border)', fontSize: 13 }}>
                <span style={{ color: 'var(--text-muted)' }}>{k}</span>
                <span style={{ fontWeight: 800, color: c }}>{v}</span>
              </div>
            ))}
            <div style={{ marginTop: 16 }}>
              <button className="btn btn-ghost" style={{ fontSize: 13, color: '#60a5fa' }}>📥 Download Commission Statement</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
