import { useParams, useNavigate } from 'react-router-dom'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'

const ASSET_DETAILS = {
  A004: {
    id: 'A004', name: 'Vanguard S&P 500 ETF', type: 'Brokerage Account', accountNo: '****5678',
    status: 'Verified', institution: 'Vanguard', balance: 65000, balanceDate: 'Mar 15, 2026',
    ownership: 'John Doe (100%)', securities: 'VFIAX — Vanguard 500 Index Fund', risk: 'Moderate',
    verifiedBy: 'Sarah Johnson', verifiedDate: 'Mar 24, 2026',
    trend30: 5.9, trend90: 12.1,
    riskScore: 35, haircut: 10, riskAdjusted: 58500,
    volatility: '8.5%', liquidity: 'High', concentration: 'Low',
    history: [
      { date: 'Mar 24, 2026', event: 'Verification complete', actor: 'Sarah Johnson (Underwriter)', note: 'All documents reviewed and approved' },
      { date: 'Mar 23, 2026', event: 'Documents uploaded', actor: 'John Doe (Borrower)', note: 'Uploaded Q1 2026 Vanguard brokerage statement' },
      { date: 'Mar 21, 2026', event: 'Plaid connection established', actor: 'System', note: 'Read-only access connected via Plaid' },
      { date: 'Mar 20, 2026', event: 'Asset added', actor: 'John Doe (Borrower)', note: 'Asset submitted for verification' },
    ],
    trendData: [
      { date: 'Jan 05', value: 52000 },
      { date: 'Jan 19', value: 53500 },
      { date: 'Feb 02', value: 51000 },
      { date: 'Feb 16', value: 56000 },
      { date: 'Mar 02', value: 58500 },
      { date: 'Mar 16', value: 61000 },
      { date: 'Mar 25', value: 65000 },
    ],
  },
  A005: {
    id: 'A005', name: 'Apple Stock (AAPL)', type: 'Brokerage Account', accountNo: '****4321',
    status: 'Verified', institution: 'Fidelity', balance: 25000, balanceDate: 'Mar 15, 2026',
    ownership: 'John Doe (100%)', securities: 'AAPL — Apple Inc. (150 shares @ $166.67)', risk: 'Moderate',
    verifiedBy: 'Sarah Johnson', verifiedDate: 'Mar 24, 2026',
    trend30: -3.0, trend90: 8.2,
    riskScore: 52, haircut: 15, riskAdjusted: 21250,
    volatility: '18.2%', liquidity: 'High', concentration: 'Medium',
    history: [
      { date: 'Mar 24, 2026', event: 'Verification complete', actor: 'Sarah Johnson (Underwriter)', note: 'Approved — equity account meets guidelines' },
      { date: 'Mar 22, 2026', event: 'Documents uploaded', actor: 'John Doe (Borrower)', note: 'Uploaded Fidelity Q1 statement' },
      { date: 'Mar 20, 2026', event: 'Asset added', actor: 'John Doe (Borrower)', note: 'Asset submitted for verification' },
    ],
    trendData: [
      { date: 'Jan 05', value: 19000 },
      { date: 'Jan 19', value: 22000 },
      { date: 'Feb 02', value: 23100 },
      { date: 'Feb 16', value: 26500 },
      { date: 'Mar 02', value: 27200 },
      { date: 'Mar 16', value: 24800 },
      { date: 'Mar 25', value: 25000 },
    ],
  },
}

const STATUS_META = {
  Verified:   { icon: '✅', color: '#4ade80', bg: 'rgba(74,222,128,0.12)' },
  Pending:    { icon: '⏳', color: '#facc15', bg: 'rgba(250,204,21,0.12)' },
  Questioned: { icon: '❓', color: '#fb923c', bg: 'rgba(251,146,60,0.12)' },
  Rejected:   { icon: '✗',  color: '#f87171', bg: 'rgba(248,113,113,0.12)' },
}

const FALLBACK = {
  id: '?', name: 'Unknown Asset', type: 'N/A', status: 'Pending', institution: 'N/A',
  balance: 0, ownership: 'N/A', riskScore: 0, haircut: 0, riskAdjusted: 0,
  volatility: 'N/A', liquidity: 'N/A', concentration: 'N/A', trend30: 0, trend90: 0,
  trendData: [], history: [], accountNo: 'N/A', balanceDate: 'N/A', securities: 'N/A',
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 8, padding: '8px 14px' }}>
        <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 4 }}>{label}</div>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#60a5fa' }}>${payload[0].value.toLocaleString()}</div>
      </div>
    )
  }
  return null
}

export default function AssetDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const a = ASSET_DETAILS[id] || FALLBACK
  const sm = STATUS_META[a.status] || STATUS_META.Pending
  const riskColor = a.riskScore < 35 ? '#4ade80' : a.riskScore < 65 ? '#facc15' : '#f87171'
  const riskLabel = a.riskScore < 35 ? 'Low Risk' : a.riskScore < 65 ? 'Moderate Risk' : 'High Risk'
  const haircutAmount = Math.round(a.balance * a.haircut / 100)

  return (
    <div>
      {/* Back link + header */}
      <div style={{ marginBottom: 6 }}>
        <button onClick={() => navigate('/assets')} style={{ background: 'none', border: 'none', color: '#60a5fa', cursor: 'pointer', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6, padding: 0, marginBottom: 16 }}>
          ← Back to My Assets
        </button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: sm.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{sm.icon}</div>
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 800, marginBottom: 3 }}>{a.name}</h1>
            <div style={{ fontSize: 12, color: '#64748b', display: 'flex', gap: 14 }}>
              <span>{a.type}</span>
              <span>{a.accountNo}</span>
              <span className="badge" style={{ background: sm.bg, color: sm.color, fontSize: 11 }}>{a.status}</span>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-ghost" style={{ fontSize: 13 }}>✏️ Edit Asset</button>
          <button className="btn btn-secondary" style={{ fontSize: 13 }}>📎 Upload New Statement</button>
          <button className="btn btn-primary" style={{ fontSize: 13 }}>🔍 Request Review</button>
          <button className="btn btn-ghost" style={{ fontSize: 13, color: '#f87171' }}>🗑 Delete</button>
        </div>
      </div>

      {/* Two-column: Details + Chart */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 16, marginBottom: 16 }}>
        {/* Asset Details */}
        <div className="card">
          <div style={{ fontWeight: 700, marginBottom: 14 }}>Asset Details</div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <tbody>
              {[
                ['Current Value', `$${a.balance.toLocaleString()}`],
                ['Statement Date', a.balanceDate],
                ['Financial Institution', a.institution],
                ['Account Type', a.type],
                ['Account Ownership', a.ownership],
                ['Holdings / Securities', a.securities],
                ['Verification Status', a.status],
                a.verifiedBy ? ['Verified By', `${a.verifiedBy} · ${a.verifiedDate}`] : null,
              ].filter(Boolean).map(([k, v]) => (
                <tr key={k} style={{ borderBottom: '1px solid #1e293b' }}>
                  <td style={{ padding: '9px 0', color: '#64748b', width: '45%' }}>{k}</td>
                  <td style={{ padding: '9px 0', fontWeight: 600, color: '#f1f5f9' }}>{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ marginTop: 16 }}>
            <button className="btn btn-ghost" style={{ fontSize: 12 }}>📥 Download Statement</button>
          </div>
        </div>

        {/* Value Trend Chart */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div style={{ fontWeight: 700 }}>Value Trend — 90 Day</div>
            <div style={{ display: 'flex', gap: 14, fontSize: 12 }}>
              <span style={{ color: '#64748b' }}>Current: <strong style={{ color: '#f1f5f9' }}>${a.balance.toLocaleString()}</strong></span>
              <span>30-day: <strong style={{ color: a.trend30 >= 0 ? '#4ade80' : '#f87171' }}>{a.trend30 >= 0 ? '+' : ''}{a.trend30}%</strong></span>
              <span>90-day: <strong style={{ color: a.trend90 >= 0 ? '#4ade80' : '#f87171' }}>{a.trend90 >= 0 ? '+' : ''}{a.trend90}%</strong></span>
            </div>
          </div>
          {a.trendData.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={a.trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="date" stroke="#475569" tick={{ fontSize: 11 }} />
                <YAxis stroke="#475569" tick={{ fontSize: 11 }} tickFormatter={v => `$${(v / 1000).toFixed(0)}K`} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 4, fill: '#3b82f6' }} activeDot={{ r: 6 }} />
                <ReferenceLine y={a.trendData[0]?.value} stroke="#475569" strokeDasharray="3 3" />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#475569' }}>No trend data available</div>
          )}
        </div>
      </div>

      {/* Risk Assessment */}
      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ fontWeight: 700, marginBottom: 14 }}>Risk Assessment</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 24, alignItems: 'start' }}>
          {/* Score circle */}
          <div style={{ textAlign: 'center', minWidth: 120 }}>
            <div style={{ width: 80, height: 80, borderRadius: '50%', border: `5px solid ${riskColor}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}>
              <div style={{ fontSize: 20, fontWeight: 900, color: riskColor }}>{a.riskScore}</div>
              <div style={{ fontSize: 9, color: '#64748b' }}>/ 100</div>
            </div>
            <div style={{ fontSize: 12, fontWeight: 700, color: riskColor }}>{riskLabel}</div>
          </div>
          {/* Risk details */}
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 16 }}>
              {[
                ['Haircut', `${a.haircut}%`, 'Amount deducted to account for market risk'],
                ['Risk-Adjusted Value', `$${a.riskAdjusted.toLocaleString()}`, `Balance ($${a.balance.toLocaleString()}) - Haircut ($${haircutAmount.toLocaleString()})`],
                ['Eligible for Qualifying', 'Yes', 'Asset meets all eligibility requirements'],
              ].map(([k, v, desc]) => (
                <div key={k} style={{ background: '#1e293b', borderRadius: 10, padding: 12 }}>
                  <div style={{ fontSize: 12, fontWeight: 800, color: '#f1f5f9', marginBottom: 4 }}>{v}</div>
                  <div style={{ fontSize: 11, color: '#60a5fa', fontWeight: 600, marginBottom: 4 }}>{k}</div>
                  <div style={{ fontSize: 11, color: '#476577' }}>{desc}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
              {[
                ['Volatility', a.volatility, a.volatility === 'High' ? '#f87171' : a.volatility === 'N/A' ? '#475569' : '#4ade80'],
                ['Liquidity', a.liquidity, a.liquidity === 'High' ? '#4ade80' : '#facc15'],
                ['Concentration Risk', a.concentration, a.concentration === 'Low' ? '#4ade80' : a.concentration === 'Medium' ? '#facc15' : '#f87171'],
              ].map(([k, v, color]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13, padding: '6px 0', borderBottom: '1px solid #1e293b' }}>
                  <span style={{ color: '#64748b' }}>{k}</span>
                  <span style={{ fontWeight: 700, color }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Verification History */}
      <div className="card">
        <div style={{ fontWeight: 700, marginBottom: 14 }}>Verification History</div>
        <div style={{ position: 'relative', paddingLeft: 24 }}>
          <div style={{ position: 'absolute', left: 8, top: 0, bottom: 0, width: 2, background: '#334155' }} />
          {a.history.map((h, i) => (
            <div key={i} style={{ position: 'relative', marginBottom: i < a.history.length - 1 ? 24 : 0 }}>
              <div style={{ position: 'absolute', left: -20, top: 3, width: 10, height: 10, borderRadius: '50%', background: '#3b82f6', border: '2px solid #1e293b' }} />
              <div style={{ fontSize: 12, color: '#64748b', marginBottom: 3 }}>{h.date}</div>
              <div style={{ fontWeight: 700, fontSize: 13, color: '#f1f5f9', marginBottom: 2 }}>{h.event}</div>
              <div style={{ fontSize: 12, color: '#60a5fa', marginBottom: 3 }}>{h.actor}</div>
              {h.note && <div style={{ fontSize: 12, color: '#64748b' }}>{h.note}</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
