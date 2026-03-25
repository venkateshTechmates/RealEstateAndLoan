import { useState } from 'react'

const DECLARED = [
  { id: 'BA-001', form: 'LA-001', category: 'Liquid', type: 'Checking Account', institution: 'Chase Bank', accountNo: '****4821', declared: 48200, verified: null, status: 'Pending' },
  { id: 'BA-002', form: 'LA-001', category: 'Liquid', type: 'Savings Account', institution: 'Chase Bank', accountNo: '****2210', declared: 82500, verified: null, status: 'Pending' },
  { id: 'BA-003', form: 'LA-004', category: 'Liquid', type: 'Money Market', institution: 'Fidelity', accountNo: '****8832', declared: 35000, verified: 34890, status: 'Verified' },
  { id: 'BA-010', form: 'LA-003', category: 'Investment', type: '401(k)', institution: 'Vanguard', accountNo: '****KX29', declared: 185000, verified: 183220, status: 'Verified' },
  { id: 'BA-015', form: 'LA-005', category: 'Investment', type: 'Brokerage Account', institution: 'Schwab', accountNo: '****7714', declared: 94000, verified: null, status: 'Pending' },
  { id: 'BA-022', form: 'LA-006', category: 'Real Estate', type: 'Primary Residence', institution: 'N/A', accountNo: 'N/A', declared: 520000, verified: 510000, status: 'Verified' },
  { id: 'BA-030', form: 'LA-007', category: 'Business', type: 'Business Checking', institution: 'Wells Fargo', accountNo: '****0033', declared: 27000, verified: null, status: 'Under Review' },
]

const HAIRCUTS = {
  Conventional: { Checking: 1.0, Savings: 1.0, 'Money Market': 1.0, '401(k)': 0.6, 'Brokerage Account': 0.7, 'Primary Residence': 0, 'Business Checking': 0.5 },
  FHA: { Checking: 1.0, Savings: 1.0, 'Money Market': 1.0, '401(k)': 0.6, 'Brokerage Account': 0.0, 'Primary Residence': 0, 'Business Checking': 0.0 },
  VA: { Checking: 1.0, Savings: 1.0, 'Money Market': 1.0, '401(k)': 0.6, 'Brokerage Account': 0.7, 'Primary Residence': 0, 'Business Checking': 0.0 },
}

const STATUS_COLOR = { Verified: '#4ade80', Pending: '#facc15', 'Under Review': '#fb923c', Failed: '#f87171' }
const CATEGORY_COLOR = { Liquid: '#60a5fa', Investment: '#a78bfa', 'Real Estate': '#4ade80', Business: '#fb923c' }

export default function AssetVerificationLender() {
  const [assets, setAssets] = useState(DECLARED)
  const [program, setProgram] = useState('Conventional')
  const [selected, setSelected] = useState(null)
  const [verifyVal, setVerifyVal] = useState('')
  const [filterCat, setFilterCat] = useState('All')
  const [plaidConnected, setPlaidConnected] = useState(false)

  const filtered = filterCat === 'All' ? assets : assets.filter(a => a.category === filterCat)

  const totalDeclared = assets.reduce((s, a) => s + a.declared, 0)
  const totalVerified = assets.filter(a => a.verified !== null).reduce((s, a) => s + (a.verified || 0), 0)
  const pendingCount = assets.filter(a => a.status === 'Pending').length

  const haircutAssets = assets.map(a => {
    const hc = HAIRCUTS[program][a.type] ?? 0.5
    const base = a.verified !== null ? a.verified : a.declared
    return { ...a, haircut: hc, eligible: Math.round(base * hc) }
  })
  const totalEligible = haircutAssets.reduce((s, a) => s + a.eligible, 0)

  const saveVerify = () => {
    const val = parseFloat(verifyVal.replace(/,/g, ''))
    if (!val || !selected) return
    const variance = Math.abs((val - selected.declared) / selected.declared)
    setAssets(prev => prev.map(a => a.id === selected.id ? {
      ...a, verified: val, status: variance >= 0.05 ? 'Failed' : 'Verified'
    } : a))
    setSelected(null)
    setVerifyVal('')
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800 }}>Asset Verification — Lender View</h1>
          <p style={{ color: '#64748b', fontSize: 13, marginTop: 4 }}>Forms LA-001 through LA-008 · Loan LA-001 · Marcus Johnson</p>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <select value={program} onChange={e => setProgram(e.target.value)} style={{ fontSize: 13, padding: '6px 10px', background: '#1e293b', border: '1px solid #334155', borderRadius: 8, color: '#f1f5f9' }}>
            <option>Conventional</option><option>FHA</option><option>VA</option>
          </select>
          <button onClick={() => setPlaidConnected(true)} className={`btn ${plaidConnected ? 'btn-secondary' : 'btn-primary'}`} style={{ background: plaidConnected ? 'rgba(74,222,128,0.15)' : undefined, borderColor: plaidConnected ? '#4ade80' : undefined, color: plaidConnected ? '#4ade80' : undefined }}>
            {plaidConnected ? '✓ Plaid Connected' : '🔗 Connect via Plaid'}
          </button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 24 }}>
        {[
          { label: 'Total Declared', value: `$${(totalDeclared / 1000).toFixed(0)}K`, color: '#60a5fa' },
          { label: 'Total Verified', value: `$${(totalVerified / 1000).toFixed(0)}K`, color: '#4ade80' },
          { label: 'Eligible (Haircut)', value: `$${(totalEligible / 1000).toFixed(0)}K`, color: '#a78bfa' },
          { label: 'Pending Review', value: pendingCount, color: '#facc15' },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {plaidConnected && (
        <div className="alert alert-success" style={{ marginBottom: 20 }}>
          <span>🔗</span>
          <span>Plaid connection established. Chase and Fidelity accounts are pulling live balance data. Accounts auto-verified within 2 minutes.</span>
        </div>
      )}

      {/* Category filter */}
      <div className="tab-group" style={{ marginBottom: 20 }}>
        {['All', 'Liquid', 'Investment', 'Real Estate', 'Business'].map(c => (
          <button key={c} className={`tab-btn${filterCat === c ? ' active' : ''}`} onClick={() => setFilterCat(c)} style={{ color: c !== 'All' ? CATEGORY_COLOR[c] : undefined }}>{c}</button>
        ))}
      </div>

      {/* Asset table */}
      <div className="card" style={{ padding: 0, marginBottom: 20 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#1e293b' }}>
              {['Form', 'Category', 'Type', 'Institution', 'Declared', 'Verified', 'Variance', 'Haircut', 'Eligible', 'Status', 'Action'].map(h => (
                <th key={h} style={{ padding: '12px 14px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#475569', textTransform: 'uppercase', borderBottom: '1px solid #334155' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(a => {
              const hc = HAIRCUTS[program][a.type] ?? 0.5
              const base = a.verified !== null ? a.verified : a.declared
              const eligible = Math.round(base * hc)
              const variance = a.verified !== null ? ((a.verified - a.declared) / a.declared * 100).toFixed(1) : null
              const varHigh = variance !== null && Math.abs(parseFloat(variance)) >= 5
              return (
                <tr key={a.id} style={{ borderBottom: '1px solid #1e293b', background: selected?.id === a.id ? 'rgba(59,130,246,0.06)' : 'transparent' }}>
                  <td style={{ padding: '10px 14px', fontSize: 12, color: '#60a5fa', fontWeight: 700 }}>{a.form}</td>
                  <td style={{ padding: '10px 14px' }}><span className="badge" style={{ background: `${CATEGORY_COLOR[a.category]}22`, color: CATEGORY_COLOR[a.category], fontSize: 11 }}>{a.category}</span></td>
                  <td style={{ padding: '10px 14px', fontSize: 13 }}>{a.type}</td>
                  <td style={{ padding: '10px 14px', fontSize: 12, color: '#94a3b8' }}>{a.institution}</td>
                  <td style={{ padding: '10px 14px', fontSize: 13, fontWeight: 600 }}>${a.declared.toLocaleString()}</td>
                  <td style={{ padding: '10px 14px', fontSize: 13, color: a.verified !== null ? '#4ade80' : '#475569' }}>{a.verified !== null ? `$${a.verified.toLocaleString()}` : '—'}</td>
                  <td style={{ padding: '10px 14px', fontSize: 13, fontWeight: 700, color: varHigh ? '#f87171' : '#4ade80' }}>
                    {variance !== null ? `${parseFloat(variance) > 0 ? '+' : ''}${variance}%${varHigh ? ' ⚠' : ''}` : '—'}
                  </td>
                  <td style={{ padding: '10px 14px', fontSize: 13, color: '#94a3b8' }}>{Math.round(hc * 100)}%</td>
                  <td style={{ padding: '10px 14px', fontSize: 13, fontWeight: 700 }}>${eligible.toLocaleString()}</td>
                  <td style={{ padding: '10px 14px' }}>
                    <span className="badge" style={{ background: `${STATUS_COLOR[a.status]}22`, color: STATUS_COLOR[a.status], fontSize: 11 }}>{a.status}</span>
                  </td>
                  <td style={{ padding: '10px 14px' }}>
                    {a.status === 'Pending' && (
                      <button className="btn btn-secondary" style={{ fontSize: 11, padding: '4px 8px' }} onClick={() => { setSelected(a); setVerifyVal('') }}>Verify</button>
                    )}
                    {a.status === 'Under Review' && (
                      <button className="btn" style={{ fontSize: 11, padding: '4px 8px', background: 'rgba(251,146,60,0.1)', borderColor: '#fb923c', color: '#fb923c' }} onClick={() => { setSelected(a); setVerifyVal('') }}>Review</button>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Reserve adequacy */}
      <div className="card">
        <div style={{ fontWeight: 700, marginBottom: 14 }}>Reserve Adequacy — {program} Program</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <div>
            {[
              ['Total Eligible Assets', `$${totalEligible.toLocaleString()}`],
              ['Funds to Close (est.)', '$62,400'],
              ['Available After Close', `$${(totalEligible - 62400).toLocaleString()}`],
              ['Required Reserves', `$${(485000 * 0.02).toLocaleString()} (2 mos PITIA)`],
            ].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid #334155', fontSize: 13 }}>
                <span style={{ color: '#64748b' }}>{k}</span>
                <span style={{ fontWeight: 700 }}>{v}</span>
              </div>
            ))}
          </div>
          <div>
            {totalEligible - 62400 >= 485000 * 0.02 ? (
              <div className="alert alert-success">
                <span>✅</span>
                <div>
                  <strong>Reserves MEET requirements.</strong>
                  <div style={{ fontSize: 12, marginTop: 4 }}>Post-close reserves of ${(totalEligible - 62400).toLocaleString()} exceed the required ${(485000 * 0.02).toLocaleString()} minimum for {program} loans.</div>
                </div>
              </div>
            ) : (
              <div className="alert alert-error">
                <span>⛔</span>
                <div>
                  <strong>Reserves INSUFFICIENT.</strong>
                  <div style={{ fontSize: 12, marginTop: 4 }}>Post-close reserves below required minimum. Additional assets needed or loan program exception required.</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Verify modal */}
      {selected && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999 }} onClick={() => setSelected(null)}>
          <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 14, padding: 28, width: 420 }} onClick={e => e.stopPropagation()}>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>Verify Asset</div>
            <div style={{ fontSize: 13, color: '#64748b', marginBottom: 20 }}>{selected.type} · {selected.institution}</div>
            <div className="form-group">
              <label className="form-label">DECLARED AMOUNT</label>
              <input value={`$${selected.declared.toLocaleString()}`} disabled style={{ color: '#64748b' }} />
            </div>
            <div className="form-group">
              <label className="form-label">VERIFIED AMOUNT (from statement)</label>
              <input placeholder="e.g., 48,150" value={verifyVal} onChange={e => setVerifyVal(e.target.value)} autoFocus />
            </div>
            {verifyVal && (() => {
              const val = parseFloat(verifyVal.replace(/,/g, ''))
              const variance = val ? Math.abs((val - selected.declared) / selected.declared * 100).toFixed(1) : null
              return variance !== null ? (
                <div className={`alert ${parseFloat(variance) >= 5 ? 'alert-error' : 'alert-success'}`} style={{ marginBottom: 16 }}>
                  {parseFloat(variance) >= 5 ? `⚠ Variance ${variance}% exceeds 5% threshold — will flag as Failed` : `✓ Within acceptable variance (${variance}%)`}
                </div>
              ) : null
            })()}
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
              <button className="btn btn-ghost" onClick={() => setSelected(null)}>Cancel</button>
              <button className="btn btn-primary" onClick={saveVerify}>Save Verification</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
