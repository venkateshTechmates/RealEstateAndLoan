import { useState } from 'react'
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts'

const VOLUME_DATA = [
  { month: 'Oct', conventional: 8, fha: 3, va: 2, jumbo: 1 },
  { month: 'Nov', conventional: 11, fha: 5, va: 3, jumbo: 2 },
  { month: 'Dec', conventional: 7, fha: 2, va: 1, jumbo: 1 },
  { month: 'Jan', conventional: 14, fha: 6, va: 4, jumbo: 3 },
  { month: 'Feb', conventional: 18, fha: 7, va: 5, jumbo: 4 },
  { month: 'Mar', conventional: 22, fha: 9, va: 6, jumbo: 5 },
]

const PIPELINE_DATA = [
  { name: 'Applications', value: 124, color: '#3b82f6' },
  { name: 'Pre-Qualified', value: 98, color: '#60a5fa' },
  { name: 'Processing', value: 67, color: '#a78bfa' },
  { name: 'Underwriting', value: 45, color: '#f59e0b' },
  { name: 'Approved', value: 38, color: '#4ade80' },
  { name: 'Closed', value: 29, color: '#34d399' },
]

const RATE_TREND = [
  { month: 'Oct 25', conventional: 7.45, fha: 7.15, va: 6.90 },
  { month: 'Nov 25', conventional: 7.20, fha: 6.95, va: 6.75 },
  { month: 'Dec 25', conventional: 7.10, fha: 6.85, va: 6.65 },
  { month: 'Jan 26', conventional: 7.05, fha: 6.80, va: 6.58 },
  { month: 'Feb 26', conventional: 6.95, fha: 6.72, va: 6.50 },
  { month: 'Mar 26', conventional: 6.875, fha: 6.625, va: 6.375 },
]

const REPORTS = [
  { id: 1, name: 'HMDA Annual Report (2025)', type: 'Compliance', date: 'Mar 01, 2026', size: '2.4 MB', status: 'Ready' },
  { id: 2, name: 'Loan Volume Summary — Q1 2026', type: 'Operations', date: 'Mar 31, 2026', size: '856 KB', status: 'Ready' },
  { id: 3, name: 'Pipeline Aging Report — Mar 2026', type: 'Pipeline', date: 'Mar 25, 2026', size: '320 KB', status: 'Ready' },
  { id: 4, name: 'CRA Analysis Report', type: 'Compliance', date: 'Mar 15, 2026', size: '1.1 MB', status: 'Ready' },
  { id: 5, name: 'Denial Reason Analysis — Q1 2026', type: 'Analytics', date: 'Mar 31, 2026', size: '—', status: 'Generating' },
  { id: 6, name: 'Underwriter Performance Report', type: 'Operations', date: 'Mar 25, 2026', size: '412 KB', status: 'Ready' },
]

const PIE_COLORS = ['#3b82f6', '#4ade80', '#f59e0b', '#a78bfa', '#34d399', '#60a5fa']

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 8, padding: '8px 14px' }}>
        <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 4 }}>{label}</div>
        {payload.map(p => (
          <div key={p.dataKey} style={{ fontSize: 13, color: p.color, fontWeight: 700 }}>
            {p.name}: {typeof p.value === 'number' && p.value < 20 ? `${p.value}%` : p.value}
          </div>
        ))}
      </div>
    )
  }
  return null
}

export default function ReportsDashboard() {
  const [dateRange, setDateRange] = useState('Q1 2026')
  const [activeChart, setActiveChart] = useState('volume')

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800 }}>Reports & Analytics</h1>
          <p style={{ color: '#64748b', fontSize: 13, marginTop: 4 }}>Insights and compliance reporting for loan operations</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <select value={dateRange} onChange={e => setDateRange(e.target.value)}
            style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 8, padding: '8px 12px', color: '#f1f5f9', fontSize: 13 }}>
            {['Q1 2026', 'Q4 2025', 'Q3 2025', 'YTD 2026', 'Last 12 months'].map(r => <option key={r}>{r}</option>)}
          </select>
          <button className="btn btn-primary" style={{ fontSize: 13 }}>📥 Export All</button>
        </div>
      </div>

      {/* KPI Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 20 }}>
        {[
          { label: 'Total Originations', value: '$48.2M', trend: '▲ 12% vs Q4 2025', up: true, icon: '💰' },
          { label: 'Loans Closed', value: '29', trend: '▲ 8% vs Q4 2025', up: true, icon: '✅' },
          { label: 'Avg Loan Amount', value: '$482K', trend: '▲ 3.2% vs Q4 2025', up: true, icon: '📊' },
          { label: 'Avg Time to Close', value: '28 days', trend: '▼ 2 days faster', up: true, icon: '⏱' },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div style={{ fontSize: 24, marginBottom: 8 }}>{s.icon}</div>
            <div style={{ fontSize: 24, fontWeight: 900, color: '#f1f5f9', marginBottom: 3 }}>{s.value}</div>
            <div style={{ fontSize: 11, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 4 }}>{s.label}</div>
            <div style={{ fontSize: 12, color: '#4ade80' }}>{s.trend}</div>
          </div>
        ))}
      </div>

      {/* Chart tabs */}
      <div className="tab-group" style={{ marginBottom: 16 }}>
        {[['volume', '📊 Loan Volume'], ['pipeline', '📉 Pipeline Funnel'], ['rates', '📈 Rate Trends']].map(([id, label]) => (
          <button key={id} className={`tab-btn ${activeChart === id ? 'active' : ''}`} onClick={() => setActiveChart(id)}>{label}</button>
        ))}
      </div>

      {/* Charts */}
      <div className="card" style={{ marginBottom: 16 }}>
        {activeChart === 'volume' && (
          <>
            <div style={{ fontWeight: 700, marginBottom: 14 }}>Loan Volume by Product Type — Last 6 Months</div>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={VOLUME_DATA} margin={{ top: 5, right: 10, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="month" stroke="#475569" tick={{ fontSize: 11 }} />
                <YAxis stroke="#475569" tick={{ fontSize: 11 }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="conventional" name="Conventional" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="fha" name="FHA" fill="#a78bfa" radius={[4, 4, 0, 0]} />
                <Bar dataKey="va" name="VA" fill="#4ade80" radius={[4, 4, 0, 0]} />
                <Bar dataKey="jumbo" name="Jumbo" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </>
        )}
        {activeChart === 'pipeline' && (
          <>
            <div style={{ fontWeight: 700, marginBottom: 14 }}>Pipeline Funnel — Q1 2026</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, alignItems: 'center' }}>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie data={PIPELINE_DATA} cx="50%" cy="50%" innerRadius={70} outerRadius={110} paddingAngle={3} dataKey="value">
                    {PIPELINE_DATA.map((entry, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                  </Pie>
                  <Tooltip formatter={(val, name) => [`${val} loans`, name]} />
                </PieChart>
              </ResponsiveContainer>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {PIPELINE_DATA.map((d, i) => (
                  <div key={d.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                      <div style={{ width: 12, height: 12, borderRadius: 3, background: PIE_COLORS[i] }} />
                      <span style={{ fontSize: 13 }}>{d.name}</span>
                    </div>
                    <div style={{ display: 'flex', gap: 14 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: PIE_COLORS[i] }}>{d.value}</span>
                      <span style={{ fontSize: 12, color: '#475569' }}>{Math.round(d.value / PIPELINE_DATA[0].value * 100)}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
        {activeChart === 'rates' && (
          <>
            <div style={{ fontWeight: 700, marginBottom: 14 }}>Average Rate by Program — Last 6 Months</div>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={RATE_TREND} margin={{ top: 5, right: 10, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="month" stroke="#475569" tick={{ fontSize: 11 }} />
                <YAxis stroke="#475569" tick={{ fontSize: 11 }} domain={[6, 8]} tickFormatter={v => `${v}%`} />
                <Tooltip formatter={v => `${v}%`} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Line type="monotone" dataKey="conventional" name="Conventional" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="fha" name="FHA" stroke="#a78bfa" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="va" name="VA" stroke="#4ade80" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </>
        )}
      </div>

      {/* Pre-built Reports */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <div style={{ fontWeight: 700 }}>Pre-Built Reports</div>
          <button className="btn btn-secondary" style={{ fontSize: 13 }}>+ Schedule Report</button>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #334155' }}>
              {['Report Name', 'Type', 'Generated', 'Size', 'Status', 'Actions'].map(h => (
                <th key={h} style={{ padding: '8px 10px', textAlign: 'left', fontWeight: 700, fontSize: 11, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {REPORTS.map(r => (
              <tr key={r.id} style={{ borderBottom: '1px solid #1e293b' }}>
                <td style={{ padding: '12px 10px', fontWeight: 600 }}>{r.name}</td>
                <td style={{ padding: '12px 10px' }}>
                  <span className="badge" style={{ background: '#1e293b', color: '#94a3b8', fontSize: 11 }}>{r.type}</span>
                </td>
                <td style={{ padding: '12px 10px', color: '#64748b' }}>{r.date}</td>
                <td style={{ padding: '12px 10px', color: '#64748b' }}>{r.size}</td>
                <td style={{ padding: '12px 10px' }}>
                  <span className={`badge ${r.status === 'Ready' ? 'badge-green' : ''}`} style={{ fontSize: 11, background: r.status === 'Generating' ? 'rgba(250,204,21,0.12)' : undefined, color: r.status === 'Generating' ? '#facc15' : undefined }}>
                    {r.status === 'Generating' ? '⏳ Generating…' : '✅ Ready'}
                  </span>
                </td>
                <td style={{ padding: '12px 10px' }}>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {r.status === 'Ready' && <button className="btn btn-ghost" style={{ fontSize: 12 }}>📥 Download</button>}
                    <button className="btn btn-ghost" style={{ fontSize: 12 }}>👁 Preview</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
