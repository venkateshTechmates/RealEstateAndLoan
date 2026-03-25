import { useState } from 'react'

const POLICIES = [
  {
    id: 'INS-HOI',
    type: "Homeowner's Insurance",
    icon: '🏠',
    carrier: 'State Farm',
    policyNo: 'SF-48291-TX',
    premium: 2280,
    coverage: 590000,
    deductible: 5000,
    effective: '2025-05-01',
    expiry: '2026-05-01',
    status: 'Bound',
    required: true,
    daysUntilExpiry: 365,
    mortgagee: 'First National Mortgage · ISAOA ATIMA',
  },
  {
    id: 'INS-FLD',
    type: 'Flood Insurance',
    icon: '🌊',
    carrier: 'NFIP via Wright',
    policyNo: null,
    premium: 850,
    coverage: 250000,
    deductible: 2500,
    effective: null,
    expiry: null,
    status: 'Quote Only',
    required: true,
    daysUntilExpiry: null,
    mortgagee: 'First National Mortgage',
  },
  {
    id: 'INS-PMI',
    type: 'PMI (Private Mortgage Insurance)',
    icon: '🔐',
    carrier: 'Arch MI',
    policyNo: 'ARCH-221-4829',
    premium: 142,
    coverage: null,
    deductible: null,
    effective: '2025-05-01',
    expiry: 'Auto-cancelled at 80% LTV',
    status: 'Active',
    required: true,
    daysUntilExpiry: null,
    mortgagee: 'N/A',
  },
  {
    id: 'INS-TTL',
    type: "Title Insurance (Lender's)",
    icon: '📜',
    carrier: 'Old Republic Title',
    policyNo: 'ORT-TX-8821-2025',
    premium: 1420,
    coverage: 485000,
    deductible: 0,
    effective: '2025-05-01',
    expiry: 'Permanent (one-time)',
    status: 'Bound',
    required: true,
    daysUntilExpiry: null,
    mortgagee: 'First National Mortgage',
  },
]

const HOI_QUOTES = [
  { carrier: 'State Farm', logo: '🟥', annual: 2280, monthly: 190, rating: 'A++', deductible: 5000, dwelling: 590000, liability: 300000, selected: true },
  { carrier: 'Allstate', logo: '🟦', annual: 2480, monthly: 207, rating: 'A+', deductible: 5000, dwelling: 590000, liability: 300000, selected: false },
  { carrier: 'Farmers', logo: '🟩', annual: 2640, monthly: 220, rating: 'A', deductible: 2500, dwelling: 590000, liability: 300000, selected: false },
  { carrier: 'USAA', logo: '🟨', annual: 1980, monthly: 165, rating: 'A++', deductible: 5000, dwelling: 590000, liability: 300000, selected: false, note: 'Military only' },
]

const STATUS_COLOR = { Bound: '#4ade80', Active: '#4ade80', 'Quote Only': '#facc15', Pending: '#fb923c', Expired: '#f87171' }

export default function InsuranceManagement() {
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedPolicy, setSelectedPolicy] = useState(POLICIES[0])
  const [selectedQuote, setSelectedQuote] = useState(HOI_QUOTES[0])
  const [uploadingFor, setUploadingFor] = useState(null)

  const totalAnnual = POLICIES.reduce((s, p) => s + (Number.isFinite(p.premium) ? p.premium : 0), 0)
  const totalMonthly = Math.round(totalAnnual / 12)
  const pendingPolicies = POLICIES.filter(p => p.status === 'Quote Only' || p.status === 'Pending').length

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800 }}>Insurance Management</h1>
          <p style={{ color: '#64748b', fontSize: 13, marginTop: 4 }}>Loan LA-001 · Marcus Johnson · 789 Maple Dr, Austin TX</p>
        </div>
        <button className="btn btn-primary">+ Add Policy</button>
      </div>

      {pendingPolicies > 0 && (
        <div className="alert alert-warning" style={{ marginBottom: 20 }}>
          <span>⚠️</span>
          <span><strong>{pendingPolicies} insurance requirement{pendingPolicies > 1 ? 's' : ''} still pending.</strong> All policies must be bound prior to loan closing.</span>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 24 }}>
        {[
          { label: 'Required Policies', value: POLICIES.length, color: '#60a5fa' },
          { label: 'Bound / Active', value: POLICIES.filter(p => ['Bound', 'Active'].includes(p.status)).length, color: '#4ade80' },
          { label: 'Pending / Quotes', value: pendingPolicies, color: '#facc15' },
          { label: 'Annual Premium Total', value: `$${totalAnnual.toLocaleString()}`, color: '#a78bfa' },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="tab-group" style={{ marginBottom: 24 }}>
        {['overview', 'quotes', 'certificates', 'renewals'].map(t => (
          <button key={t} className={`tab-btn${activeTab === t ? ' active' : ''}`} onClick={() => setActiveTab(t)}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {POLICIES.map(p => (
              <div
                key={p.id}
                onClick={() => setSelectedPolicy(p)}
                style={{
                  background: '#1e293b',
                  border: `1px solid ${selectedPolicy?.id === p.id ? '#3b82f6' : '#334155'}`,
                  borderRadius: 12, padding: 16, cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <span style={{ fontSize: 24 }}>{p.icon}</span>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700 }}>{p.type}</div>
                      <div style={{ fontSize: 12, color: '#64748b' }}>{p.carrier}</div>
                    </div>
                  </div>
                  <span className="badge" style={{ background: `${STATUS_COLOR[p.status]}22`, color: STATUS_COLOR[p.status] }}>{p.status}</span>
                </div>
                <div style={{ display: 'flex', gap: 16, fontSize: 12, color: '#94a3b8' }}>
                  {p.premium && <span>💰 ${p.premium.toLocaleString()}/yr</span>}
                  {p.policyNo && <span>📋 {p.policyNo}</span>}
                  {p.expiry && <span>📅 Exp: {p.expiry}</span>}
                </div>
              </div>
            ))}
          </div>

          {selectedPolicy && (
            <div className="card">
              <div style={{ fontSize: 32, marginBottom: 10 }}>{selectedPolicy.icon}</div>
              <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 4 }}>{selectedPolicy.type}</div>
              <span className="badge" style={{ background: `${STATUS_COLOR[selectedPolicy.status]}22`, color: STATUS_COLOR[selectedPolicy.status], marginBottom: 16, display: 'inline-block' }}>{selectedPolicy.status}</span>

              <div style={{ marginBottom: 16 }}>
                {[
                  ['Carrier', selectedPolicy.carrier],
                  ['Policy Number', selectedPolicy.policyNo || 'Not yet assigned'],
                  ['Annual Premium', selectedPolicy.premium ? `$${selectedPolicy.premium.toLocaleString()}` : 'TBD'],
                  ['Monthly Escrow', selectedPolicy.premium ? `$${Math.round(selectedPolicy.premium / 12).toLocaleString()}` : 'TBD'],
                  ['Coverage Amount', selectedPolicy.coverage ? `$${selectedPolicy.coverage.toLocaleString()}` : 'N/A'],
                  ['Deductible', selectedPolicy.deductible != null ? `$${selectedPolicy.deductible.toLocaleString()}` : 'N/A'],
                  ['Effective Date', selectedPolicy.effective || 'Pending'],
                  ['Expiry / Term', typeof selectedPolicy.expiry === 'string' ? selectedPolicy.expiry : selectedPolicy.expiry || 'N/A'],
                  ['Mortgagee Clause', selectedPolicy.mortgagee],
                ].map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid #334155', fontSize: 13 }}>
                    <span style={{ color: '#64748b' }}>{k}</span>
                    <span style={{ fontWeight: 600, maxWidth: 200, textAlign: 'right' }}>{v}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {selectedPolicy.status === 'Quote Only' ? (
                  <button className="btn btn-primary">📎 Bind Policy</button>
                ) : (
                  <button className="btn btn-secondary">📄 View Certificate</button>
                )}
                <button className="btn btn-ghost" onClick={() => setUploadingFor(selectedPolicy.id)} style={{ color: '#60a5fa' }}>⬆ Upload Certificate</button>
              </div>

              {uploadingFor === selectedPolicy.id && (
                <div style={{ marginTop: 16, border: '2px dashed #334155', borderRadius: 10, padding: 20, textAlign: 'center', color: '#64748b', fontSize: 13 }}>
                  📁 Drop certificate PDF here or <span style={{ color: '#60a5fa', cursor: 'pointer' }}>browse files</span>
                  <div style={{ marginTop: 12, display: 'flex', gap: 8, justifyContent: 'center' }}>
                    <button className="btn btn-primary" style={{ fontSize: 12 }} onClick={() => setUploadingFor(null)}>Upload</button>
                    <button className="btn btn-ghost" style={{ fontSize: 12 }} onClick={() => setUploadingFor(null)}>Cancel</button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {activeTab === 'quotes' && (
        <div>
          <div style={{ fontWeight: 700, marginBottom: 16, fontSize: 15 }}>Homeowner's Insurance — Quote Comparison</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14, marginBottom: 24 }}>
            {HOI_QUOTES.map(q => (
              <div
                key={q.carrier}
                onClick={() => setSelectedQuote(q)}
                style={{
                  background: '#1e293b',
                  border: `2px solid ${selectedQuote?.carrier === q.carrier ? '#3b82f6' : '#334155'}`,
                  borderRadius: 12, padding: 18, cursor: 'pointer', position: 'relative'
                }}
              >
                {q.selected && <div style={{ position: 'absolute', top: 12, right: 12 }}><span className="badge badge-green" style={{ fontSize: 11 }}>Selected</span></div>}
                {q.note && <div style={{ position: 'absolute', top: 12, right: 12 }}><span className="badge" style={{ background: 'rgba(175,139,251,0.2)', color: '#a78bfa', fontSize: 11 }}>{q.note}</span></div>}
                <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
                  <span style={{ fontSize: 28 }}>{q.logo}</span>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 15 }}>{q.carrier}</div>
                    <div style={{ fontSize: 12, color: '#64748b' }}>Rating: {q.rating}</div>
                  </div>
                </div>
                <div style={{ fontSize: 22, fontWeight: 800, color: '#f1f5f9', marginBottom: 8 }}>${q.annual.toLocaleString()}<span style={{ fontSize: 14, color: '#64748b', fontWeight: 400 }}>/yr</span></div>
                <div style={{ fontSize: 13, color: '#94a3b8' }}>${q.monthly}/mo escrowed</div>
                <hr className="divider" />
                {[['Dwelling Coverage', `$${q.dwelling.toLocaleString()}`], ['Liability', `$${q.liability.toLocaleString()}`], ['Deductible', `$${q.deductible.toLocaleString()}`]].map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, padding: '4px 0' }}>
                    <span style={{ color: '#64748b' }}>{k}</span>
                    <span style={{ fontWeight: 600 }}>{v}</span>
                  </div>
                ))}
                <button className="btn btn-primary" style={{ width: '100%', marginTop: 14, justifyContent: 'center', fontSize: 13 }}>Select & Bind</button>
              </div>
            ))}
          </div>
          <div style={{ background: '#1e293b', borderRadius: 12, padding: 16 }}>
            <div style={{ fontWeight: 700, marginBottom: 10 }}>FEMA Flood Zone Check</div>
            <div style={{ display: 'flex', gap: 20, alignItems: 'center', fontSize: 13 }}>
              <div>Property: <strong>789 Maple Dr, Austin TX 78750</strong></div>
              <span className="badge badge-orange" style={{ fontSize: 12 }}>Zone AE – High Risk</span>
              <div style={{ color: '#64748b' }}>Flood insurance required by lender and GSE guidelines</div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'certificates' && (
        <div className="card" style={{ padding: 0 }}>
          <div style={{ padding: '14px 16px', borderBottom: '1px solid #334155', fontWeight: 700 }}>Insurance Certificates & Documents</div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#1e293b' }}>
                {['Policy Type', 'Carrier', 'Policy No.', 'Document', 'Uploaded', 'Status'].map(h => (
                  <th key={h} style={{ padding: '12px 14px', textAlign: 'left', fontSize: 11, color: '#475569', textTransform: 'uppercase', borderBottom: '1px solid #334155' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {POLICIES.map(p => (
                <tr key={p.id} style={{ borderBottom: '1px solid #1e293b' }}>
                  <td style={{ padding: '12px 14px', fontSize: 13 }}>{p.icon} {p.type}</td>
                  <td style={{ padding: '12px 14px', fontSize: 13, color: '#94a3b8' }}>{p.carrier}</td>
                  <td style={{ padding: '12px 14px', fontSize: 12, color: '#60a5fa' }}>{p.policyNo || '—'}</td>
                  <td style={{ padding: '12px 14px', fontSize: 13 }}>
                    {['Bound', 'Active'].includes(p.status) ? <span style={{ color: '#4ade80', cursor: 'pointer' }}>📄 view dec page</span> : <span style={{ color: '#475569' }}>—</span>}
                  </td>
                  <td style={{ padding: '12px 14px', fontSize: 12, color: '#64748b' }}>
                    {['Bound', 'Active'].includes(p.status) ? 'Apr 10, 2025' : '—'}
                  </td>
                  <td style={{ padding: '12px 14px' }}>
                    <span className="badge" style={{ background: `${STATUS_COLOR[p.status]}22`, color: STATUS_COLOR[p.status], fontSize: 11 }}>{p.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'renewals' && (
        <div>
          <div className="alert alert-warning" style={{ marginBottom: 20 }}>
            <span>🔔</span>
            <span>Renewal tracking active. Automated reminders will be sent 60 days before policy expiry.</span>
          </div>
          <div className="card">
            <div style={{ fontWeight: 700, marginBottom: 14 }}>Renewal Calendar</div>
            {[
              { policy: "Homeowner's Insurance", carrier: 'State Farm', renewal: 'May 1, 2026', daysOut: 365, status: 'On Track' },
              { policy: 'Flood Insurance', carrier: 'NFIP via Wright', renewal: 'May 1, 2026', daysOut: 365, status: 'Not Yet Bound' },
              { policy: "Title Insurance (Lender's)", carrier: 'Old Republic', renewal: 'Permanent', daysOut: null, status: 'No Renewal' },
              { policy: 'PMI', carrier: 'Arch MI', renewal: 'Auto-Cancel at 80% LTV', daysOut: null, status: 'Active' },
            ].map(r => (
              <div key={r.policy} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #334155' }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{r.policy}</div>
                  <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>{r.carrier} · Renewal: {r.renewal}</div>
                </div>
                <span className={`badge ${r.status === 'On Track' || r.status === 'Active' ? 'badge-green' : r.status === 'Not Yet Bound' ? 'badge-orange' : ''}`} style={{ background: r.status === 'No Renewal' ? '#334155' : undefined, color: r.status === 'No Renewal' ? '#64748b' : undefined }}>{r.status}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
