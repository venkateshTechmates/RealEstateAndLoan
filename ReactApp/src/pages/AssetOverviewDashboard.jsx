import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, Legend } from 'recharts'

const TREND_DATA = [
  { month: 'Apr', total: 780, liquid: 108, investment: 390, retirement: 282 },
  { month: 'May', total: 795, liquid: 112, investment: 400, retirement: 283 },
  { month: 'Jun', total: 802, liquid: 110, investment: 408, retirement: 284 },
  { month: 'Jul', total: 788, liquid: 105, investment: 396, retirement: 287 },
  { month: 'Aug', total: 815, liquid: 115, investment: 412, retirement: 288 },
  { month: 'Sep', total: 828, liquid: 118, investment: 420, retirement: 290 },
  { month: 'Oct', total: 820, liquid: 114, investment: 416, retirement: 290 },
  { month: 'Nov', total: 830, liquid: 116, investment: 424, retirement: 290 },
  { month: 'Dec', total: 845, liquid: 120, investment: 430, retirement: 295 },
  { month: 'Jan', total: 832, liquid: 117, investment: 422, retirement: 293 },
  { month: 'Feb', total: 838, liquid: 119, investment: 425, retirement: 294 },
  { month: 'Mar', total: 842, liquid: 124, investment: 418, retirement: 300 },
]

const PIE_DATA = [
  { name: 'Liquid',      value: 124, color: '#3b82f6' },
  { name: 'Investments', value: 418, color: '#8b5cf6' },
  { name: 'Retirement',  value: 300, color: '#10b981' },
  { name: 'Real Estate', value: 300, color: '#f59e0b' },
  { name: 'Other',       value: 21,  color: '#64748b' },
]

const ASSET_LIST = [
  { name: 'Chase Checking', type: 'Cash', value: '$42,000', change: '+1.2%', trend: 'up', status: 'Verified', icon: '🏦' },
  { name: 'Chase Savings', type: 'Cash', value: '$28,000', change: '+0.8%', trend: 'up', status: 'Verified', icon: '💳' },
  { name: 'Chase MMKT', type: 'Cash', value: '$54,200', change: '+0.5%', trend: 'up', status: 'Verified', icon: '📊' },
  { name: 'Vanguard S&P 500 ETF', type: 'Investment', value: '$65,000', change: '+5.9%', trend: 'up', status: 'Verified', icon: '📈' },
  { name: 'Apple Stock (AAPL)', type: 'Investment', value: '$22,000', change: '+3.2%', trend: 'up', status: 'Verified', icon: '📱' },
  { name: 'Fidelity Bonds', type: 'Investment', value: '$18,000', change: '-0.4%', trend: 'down', status: 'Verified', icon: '📜' },
  { name: 'Vanguard 401(k)', type: 'Retirement', value: '$185,000', change: '+4.1%', trend: 'up', status: 'Pending', icon: '🏅' },
  { name: 'Roth IRA', type: 'Retirement', value: '$85,000', change: '+3.8%', trend: 'up', status: 'Verified', icon: '🔐' },
  { name: 'Coinbase BTC', type: 'Crypto', value: '$25,000', change: '-15%', trend: 'down', status: 'Questioned', icon: '₿', flagged: true },
  { name: 'Gift Funds', type: 'Gift', value: '$35,000', change: '—', trend: 'flat', status: 'Verified', icon: '🎁' },
]

const CUSTOM_TOOLTIP = ({ active, payload, label }) => {
  if (!active || !payload) return null
  return (
    <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 8, padding: '10px 14px', fontSize: 12 }}>
      <div style={{ fontWeight: 600, marginBottom: 6, color: '#f1f5f9' }}>{label}</div>
      {payload.map(p => (
        <div key={p.name} style={{ color: p.color, marginBottom: 2 }}>{p.name}: <strong>${p.value}K</strong></div>
      ))}
    </div>
  )
}

export default function AssetOverviewDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [filter, setFilter] = useState('All')

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800 }}>Asset Overview & Trends</h1>
          <p style={{ color: '#64748b', fontSize: 13, marginTop: 4 }}>Application #APP-2026-001842 · Last refreshed: Mar 25, 2026 9:00 AM</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-secondary btn-sm">🔄 Refresh Valuations</button>
          <button className="btn btn-primary btn-sm">+ Add Asset</button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid-4" style={{ marginBottom: 20 }}>
        {[
          { label: 'Total Assets', value: '$842,500', change: '+3.2%', color: '#3b82f6', icon: '💰' },
          { label: 'Liquid Assets', value: '$124,200', change: '+1.1%', color: '#10b981', icon: '💧' },
          { label: 'Investment Assets', value: '$418,300', change: '+5.4%', color: '#8b5cf6', icon: '📈' },
          { label: 'Reserve Coverage', value: '3.65×', change: 'Required: 2 months', color: '#f59e0b', icon: '🛡️' },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 20 }}>{s.icon}</span>
              <span className={`badge ${s.label === 'Reserve Coverage' ? 'badge-green' : 'badge-blue'}`}>{s.change}</span>
            </div>
            <div style={{ fontSize: 22, fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 11, color: '#64748b', marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Flag banner */}
      <div className="alert alert-warning" style={{ marginBottom: 20 }}>
        <span>⚠️</span>
        <div>
          <strong>2 Flags Require Attention:</strong> Bitcoin asset shows high volatility (−15% in 30 days) and has been excluded from reserves.&nbsp;
          40% of assets concentrated at Chase Bank.
          <button className="btn btn-ghost btn-sm" style={{ marginLeft: 8, color: '#fbbf24', fontSize: 11 }}>View Flags →</button>
        </div>
      </div>

      {/* Tabs */}
      <div className="tab-group" style={{ marginBottom: 20 }}>
        {['overview', 'trends', 'reserves', 'list'].map(t => (
          <button key={t} className={`tab-btn${activeTab === t ? ' active' : ''}`} onClick={() => setActiveTab(t)} style={{ textTransform: 'capitalize' }}>{t === 'list' ? 'Asset List' : t === 'reserves' ? 'Reserve Calc' : t.charAt(0).toUpperCase() + t.slice(1)}</button>
        ))}
      </div>

      {activeTab === 'overview' && <OverviewTab />}
      {activeTab === 'trends' && <TrendsTab />}
      {activeTab === 'reserves' && <ReservesTab />}
      {activeTab === 'list' && <ListTab filter={filter} setFilter={setFilter} />}
    </div>
  )
}

function OverviewTab() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20 }}>
      {/* 12-month trend chart */}
      <div className="card">
        <div className="section-header">
          <div className="section-title">Portfolio Value — 12 Months</div>
          <div style={{ display: 'flex', gap: 16, fontSize: 11 }}>
            {[['Total', '#3b82f6'], ['Liquid', '#10b981'], ['Investment', '#8b5cf6'], ['Retirement', '#f59e0b']].map(([n, c]) => (
              <span key={n} style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#94a3b8' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: c, display: 'inline-block' }} />{n}
              </span>
            ))}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={TREND_DATA} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
            <XAxis dataKey="month" tick={{ fill: '#475569', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#475569', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v}K`} />
            <Tooltip content={<CUSTOM_TOOLTIP />} />
            <Line type="monotone" dataKey="total" stroke="#3b82f6" strokeWidth={2} dot={false} name="Total" />
            <Line type="monotone" dataKey="liquid" stroke="#10b981" strokeWidth={1.5} dot={false} name="Liquid" strokeDasharray="4 2" />
            <Line type="monotone" dataKey="investment" stroke="#8b5cf6" strokeWidth={1.5} dot={false} name="Investment" />
            <Line type="monotone" dataKey="retirement" stroke="#f59e0b" strokeWidth={1.5} dot={false} name="Retirement" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Pie chart */}
      <div className="card">
        <div className="section-title" style={{ marginBottom: 14 }}>Asset Breakdown</div>
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie data={PIE_DATA} cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={2} dataKey="value">
              {PIE_DATA.map((entry, i) => <Cell key={i} fill={entry.color} />)}
            </Pie>
            <Tooltip formatter={(v) => [`$${v}K`, '']} />
          </PieChart>
        </ResponsiveContainer>
        <div style={{ marginTop: 8 }}>
          {PIE_DATA.map(d => (
            <div key={d.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '5px 0', fontSize: 12, borderBottom: '1px solid #1e293b' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: d.color }} />
                <span style={{ color: '#94a3b8' }}>{d.name}</span>
              </div>
              <div>
                <span style={{ fontWeight: 600 }}>${d.value}K</span>
                <span style={{ color: '#475569', marginLeft: 6 }}>{Math.round(d.value / 11.63)}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function TrendsTab() {
  return (
    <div className="card">
      <div className="section-title" style={{ marginBottom: 16 }}>30-Day Asset Value Changes</div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={[
          { name: 'Checking', value: 1.2, fill: '#3b82f6' },
          { name: 'Savings', value: 0.8, fill: '#3b82f6' },
          { name: 'Vanguard ETF', value: 5.9, fill: '#8b5cf6' },
          { name: 'AAPL', value: 3.2, fill: '#8b5cf6' },
          { name: 'Bonds', value: -0.4, fill: '#ef4444' },
          { name: '401(k)', value: 4.1, fill: '#10b981' },
          { name: 'Roth IRA', value: 3.8, fill: '#10b981' },
          { name: 'Bitcoin', value: -15.0, fill: '#ef4444' },
        ]} margin={{ top: 5, right: 10, left: -5, bottom: 30 }}>
          <XAxis dataKey="name" tick={{ fill: '#475569', fontSize: 10 }} angle={-30} textAnchor="end" interval={0} />
          <YAxis tick={{ fill: '#475569', fontSize: 11 }} tickFormatter={v => `${v}%`} />
          <Tooltip formatter={(v) => [`${v}%`, '30-Day Change']} contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 8 }} />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {[
              { fill: '#3b82f6' }, { fill: '#3b82f6' }, { fill: '#8b5cf6' }, { fill: '#8b5cf6' },
              { fill: '#ef4444' }, { fill: '#10b981' }, { fill: '#10b981' }, { fill: '#ef4444' },
            ].map((entry, i) => <Cell key={i} fill={entry.fill} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
        {[['7-Day Avg Change', '+1.4%', 'green'], ['30-Day Avg', '+2.1%', 'green'], ['Volatility Score', '8.5 / 20', 'yellow'], ['Risk Score', '65 / 100', 'yellow']].map(([k, v, c]) => (
          <div key={k} style={{ textAlign: 'center', padding: 12, background: '#263348', borderRadius: 8 }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: c === 'green' ? '#34d399' : '#fbbf24' }}>{v}</div>
            <div style={{ fontSize: 11, color: '#64748b', marginTop: 4 }}>{k}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ReservesTab() {
  return (
    <div className="card">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div className="section-title">Reserve Adequacy Calculation</div>
        <span className="badge badge-green">✅ Requirements Met</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
        <div style={{ padding: 16, background: '#263348', borderRadius: 10, border: '1px solid #334155' }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: '#34d399' }}>$67,200</div>
          <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>Total Eligible Assets for Reserves</div>
          <div className="progress-bar" style={{ marginTop: 10 }}>
            <div className="progress-fill" style={{ width: '78%', background: '#10b981' }} />
          </div>
        </div>
        <div style={{ padding: 16, background: '#263348', borderRadius: 10, border: '1px solid #334155' }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: '#fbbf24' }}>$18,400</div>
          <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>Required Reserves (2 months PITI)</div>
          <div style={{ fontSize: 11, color: '#475569', marginTop: 6 }}>Monthly PITI: $4,020 × 2 = $8,040 <br /> (Conventional: 0-6 months depending on LTV)</div>
        </div>
      </div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Asset Type</th><th>Declared Value</th><th>Haircut</th><th>Eligible Value</th><th>Status</th></tr></thead>
          <tbody>
            {[
              ['Checking / Savings', '$70,000', 'None', '$70,000', 'green', 'Included'],
              ['Money Market', '$54,200', 'None', '$54,200', 'green', 'Included'],
              ['Stocks (Vanguard ETF)', '$65,000', '30%', '$45,500', 'purple', 'Included'],
              ['Bonds (Fidelity)', '$18,000', '10%', '$16,200', 'purple', 'Included'],
              ['401(k) — Vanguard', '$185,000', '40%', '$111,000', 'yellow', 'Included'],
              ['Roth IRA', '$85,000', '20%', '$68,000', 'yellow', 'Included'],
              ['Bitcoin', '$25,000', '100%', '$0', 'red', 'Excluded'],
              ['Gift Funds', '$35,000', 'None', '$0', 'gray', 'Not for Reserves'],
            ].map(([type, declared, haircut, eligible, color, status]) => (
              <tr key={type}>
                <td style={{ fontWeight: 500 }}>{type}</td>
                <td>{declared}</td>
                <td style={{ color: haircut === 'None' ? '#34d399' : '#fbbf24' }}>{haircut}</td>
                <td style={{ fontWeight: 700 }}>{eligible}</td>
                <td><span className={`badge badge-${color}`}>{status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ marginTop: 16, padding: 16, background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 8, display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 13, color: '#94a3b8' }}>Total Eligible Reserves</span>
        <span style={{ fontSize: 18, fontWeight: 800, color: '#34d399' }}>$364,900 &nbsp;·&nbsp; 3.65× covered</span>
      </div>
    </div>
  )
}

function ListTab({ filter, setFilter }) {
  const types = ['All', 'Cash', 'Investment', 'Retirement', 'Crypto', 'Gift']
  const filtered = filter === 'All' ? ASSET_LIST : ASSET_LIST.filter(a => a.type === filter)
  return (
    <div className="card">
      <div className="section-header" style={{ marginBottom: 16 }}>
        <div className="section-title">All Assets ({ASSET_LIST.length})</div>
        <div style={{ display: 'flex', gap: 8 }}>
          {types.map(t => (
            <button key={t} onClick={() => setFilter(t)} className={`btn ${filter === t ? 'btn-primary' : 'btn-ghost'} btn-sm`}>{t}</button>
          ))}
        </div>
      </div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Asset</th><th>Type</th><th>Current Value</th><th>30-Day Change</th><th>Verification</th><th></th></tr></thead>
          <tbody>
            {filtered.map((a, i) => (
              <tr key={i}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span>{a.icon}</span>
                    <div>
                      <div style={{ fontWeight: 600 }}>{a.name}</div>
                      {a.flagged && <span className="badge badge-red" style={{ fontSize: 10, marginTop: 2 }}>⚠ Flagged</span>}
                    </div>
                  </div>
                </td>
                <td><span className="badge badge-gray">{a.type}</span></td>
                <td style={{ fontWeight: 700 }}>{a.value}</td>
                <td style={{ color: a.trend === 'up' ? '#34d399' : a.trend === 'down' ? '#f87171' : '#64748b', fontWeight: 600 }}>
                  {a.trend === 'up' ? '▲' : a.trend === 'down' ? '▼' : '—'} {a.change}
                </td>
                <td>
                  <span className={`badge ${a.status === 'Verified' ? 'badge-green' : a.status === 'Pending' ? 'badge-yellow' : 'badge-red'}`}>
                    {a.status}
                  </span>
                </td>
                <td><button className="btn btn-ghost btn-sm">View</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
