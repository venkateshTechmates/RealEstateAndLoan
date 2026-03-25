import { useState } from 'react'

const LOAN = {
  id: 'LA-001',
  borrower: 'Marcus Johnson',
  co: 'Sarah Johnson',
  amount: 485000,
  type: 'Conventional 30yr',
  rate: 6.875,
  ltv: 82,
  dti: 38,
  fico: 742,
  property: '789 Maple Dr, Austin TX',
  appraised: 590000,
  purchasePrice: 540000,
  downPmt: 55000,
  income: 12800,
  debts: 4864,
}

const DU_FINDINGS = [
  { code: 'EA-I', label: 'Eligible/Approve', severity: 'pass', description: 'Loan casefile is eligible and has been recommended for approval.' },
  { code: 'MSG-0051', label: 'Credit Score Check', severity: 'pass', description: 'Representative credit score 742 meets minimum 620 for 80%+ LTV conventional.' },
  { code: 'MSG-1006', label: 'DTI Ratio Watch', severity: 'warn', description: 'Total DTI ratio 38% is within guidelines but approaches the 45% DU limit.' },
  { code: 'MSG-0244', label: 'Asset Verification', severity: 'warn', description: 'Assets verified; however two-month bank statements required for all accounts.' },
  { code: 'MSG-0006', label: 'Employment Verification', severity: 'pass', description: 'VOE complete. Two-year history documented.' },
  { code: 'MSG-9000', label: 'Appraisal Required', severity: 'info', description: 'Full appraisal required for loan amounts > $150,000.' },
]

const CONDITIONS = [
  { id: 'C-01', text: 'Provide 2 months complete bank statements – all pages, all accounts', category: 'Asset', status: 'Open', priority: 'Prior to Docs' },
  { id: 'C-02', text: 'Signed IRS Form 4506-C – borrower and co-borrower', category: 'Income', status: 'Open', priority: 'Prior to Docs' },
  { id: 'C-03', text: 'Homeowner\'s insurance binder with sufficient coverage', category: 'Insurance', status: 'Open', priority: 'Prior to Closing' },
  { id: 'C-04', text: 'Title commitment showing no unacceptable liens', category: 'Title', status: 'Received', priority: 'Prior to Closing' },
  { id: 'C-05', text: 'Letter of explanation for credit inquiry dated 02/14/2025', category: 'Credit', status: 'Waived', priority: 'Prior to Docs' },
  { id: 'C-06', text: 'Appraisal showing value >= $590,000', category: 'Appraisal', status: 'Received', priority: 'Prior to Docs' },
]

const CONDITION_COLOR = { Open: '#f87171', Received: '#4ade80', Waived: '#94a3b8', Cleared: '#4ade80' }
const SEV_COLOR = { pass: '#4ade80', warn: '#facc15', fail: '#f87171', info: '#60a5fa' }

export default function UnderwriterReview() {
  const [conditions, setConditions] = useState(CONDITIONS)
  const [activeTab, setActiveTab] = useState('overview')
  const [decision, setDecision] = useState(null)
  const [newCond, setNewCond] = useState('')

  const openCount = conditions.filter(c => c.status === 'Open').length

  const toggleStatus = (id) => {
    setConditions(prev => prev.map(c =>
      c.id === id ? { ...c, status: c.status === 'Open' ? 'Received' : c.status === 'Received' ? 'Cleared' : c.status } : c
    ))
  }

  const addCondition = () => {
    if (!newCond.trim()) return
    setConditions(prev => [...prev, { id: `C-0${prev.length + 1}`, text: newCond, category: 'Other', status: 'Open', priority: 'Prior to Docs' }])
    setNewCond('')
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800 }}>Underwriter Review</h1>
          <div style={{ display: 'flex', gap: 12, marginTop: 6 }}>
            <span style={{ color: '#64748b', fontSize: 13 }}>Loan: <strong style={{ color: '#60a5fa' }}>{LOAN.id}</strong></span>
            <span style={{ color: '#64748b', fontSize: 13 }}>Borrower: <strong>{LOAN.borrower}</strong></span>
            <span className="badge badge-orange">⚠ {openCount} Open Conditions</span>
          </div>
        </div>
        {decision ? (
          <div className={`badge ${decision === 'Approve' ? 'badge-green' : decision === 'Deny' ? 'badge-red' : 'badge-orange'}`} style={{ fontSize: 14, padding: '8px 16px' }}>
            Decision: {decision}
          </div>
        ) : (
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="btn btn-secondary" onClick={() => setDecision('Approve with Conditions')} style={{ background: 'rgba(251,146,60,0.15)', borderColor: '#fb923c', color: '#fb923c' }}>Conditional Approve</button>
            <button className="btn btn-primary" onClick={() => setDecision('Approve')} disabled={openCount > 0} style={{ opacity: openCount > 0 ? 0.5 : 1 }}>✓ Approve</button>
            <button className="btn" onClick={() => setDecision('Deny')} style={{ background: 'rgba(239,68,68,0.1)', borderColor: '#ef4444', color: '#ef4444' }}>✕ Deny</button>
          </div>
        )}
      </div>

      <div className="tab-group" style={{ marginBottom: 24 }}>
        {['overview', 'credit', 'findings', 'conditions', 'income', 'appraisal'].map(t => (
          <button key={t} className={`tab-btn${activeTab === t ? ' active' : ''}`} onClick={() => setActiveTab(t)}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && <OverviewTab loan={LOAN} openCount={openCount} />}
      {activeTab === 'credit' && <CreditTab loan={LOAN} />}
      {activeTab === 'findings' && <FindingsTab findings={DU_FINDINGS} />}
      {activeTab === 'conditions' && <ConditionsTab conditions={conditions} onToggle={toggleStatus} newCond={newCond} setNewCond={setNewCond} onAdd={addCondition} />}
      {activeTab === 'income' && <IncomeTab loan={LOAN} />}
      {activeTab === 'appraisal' && <AppraisalTab loan={LOAN} />}
    </div>
  )
}

function RiskBar({ label, value, max, threshold, fmt: fmtFn }) {
  const pct = Math.min((value / max) * 100, 100)
  const atRisk = value > threshold
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ fontSize: 13, color: '#94a3b8' }}>{label}</span>
        <span style={{ fontSize: 14, fontWeight: 700, color: atRisk ? '#f87171' : '#4ade80' }}>{fmtFn ? fmtFn(value) : value}</span>
      </div>
      <div style={{ height: 8, background: '#334155', borderRadius: 8 }}>
        <div style={{ height: 8, borderRadius: 8, width: `${pct}%`, background: atRisk ? '#ef4444' : '#3b82f6', transition: 'width 0.4s' }} />
      </div>
      <div style={{ fontSize: 11, color: '#475569', marginTop: 3 }}>Guideline max: {fmtFn ? fmtFn(threshold) : threshold}</div>
    </div>
  )
}

function OverviewTab({ loan: l, openCount }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
      <div className="card">
        <div style={{ fontWeight: 700, marginBottom: 16 }}>Loan Summary</div>
        {[
          ['Loan Amount', `$${l.amount.toLocaleString()}`],
          ['Purchase Price', `$${l.purchasePrice.toLocaleString()}`],
          ['Appraised Value', `$${l.appraised.toLocaleString()}`],
          ['Down Payment', `$${l.downPmt.toLocaleString()} (${((l.downPmt / l.purchasePrice) * 100).toFixed(1)}%)`],
          ['Loan Type', l.type],
          ['Note Rate', `${l.rate}%`],
          ['Property', l.property],
        ].map(([k, v]) => (
          <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid #334155', fontSize: 13 }}>
            <span style={{ color: '#64748b' }}>{k}</span>
            <span style={{ fontWeight: 600 }}>{v}</span>
          </div>
        ))}
      </div>

      <div className="card">
        <div style={{ fontWeight: 700, marginBottom: 16 }}>Risk Scoring</div>
        <RiskBar label="LTV Ratio" value={l.ltv} max={100} threshold={97} fmtFn={v => `${v}%`} />
        <RiskBar label="DTI Ratio" value={l.dti} max={60} threshold={43} fmtFn={v => `${v}%`} />
        <div style={{ marginBottom: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontSize: 13, color: '#94a3b8' }}>FICO Score</span>
            <span style={{ fontSize: 14, fontWeight: 700, color: '#4ade80' }}>{l.fico}</span>
          </div>
          <div style={{ height: 8, background: '#334155', borderRadius: 8 }}>
            <div style={{ height: 8, borderRadius: 8, width: `${((l.fico - 300) / 550) * 100}%`, background: l.fico >= 740 ? '#4ade80' : l.fico >= 680 ? '#facc15' : '#ef4444' }} />
          </div>
          <div style={{ fontSize: 11, color: '#475569', marginTop: 3 }}>Min required: 620 (Conv)</div>
        </div>

        <div style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: 10, padding: 14, marginTop: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#60a5fa', marginBottom: 8 }}>DU RECOMMENDATION</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#4ade80' }}>Eligible / Approve</div>
          <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>Automated underwriting passed all primary checks</div>
        </div>
      </div>

      <div className="card">
        <div style={{ fontWeight: 700, marginBottom: 12 }}>Condition Summary</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          {[['Open', '#f87171'], ['Received', '#facc15'], ['Cleared/Waived', '#4ade80']].map(([label, color]) => {
            const count = CONDITIONS.filter(c => label === 'Cleared/Waived' ? ['Cleared', 'Waived'].includes(c.status) : c.status === label).length
            return (
              <div key={label} style={{ background: '#1e293b', borderRadius: 8, padding: 12, textAlign: 'center', border: `1px solid ${color}33` }}>
                <div style={{ fontSize: 24, fontWeight: 800, color }}>{count}</div>
                <div style={{ fontSize: 11, color: '#64748b', marginTop: 4 }}>{label}</div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="card">
        <div style={{ fontWeight: 700, marginBottom: 12 }}>Borrowers</div>
        {[{ name: 'Marcus Johnson', role: 'Primary Borrower', fico: 742, income: '$128,000/yr', score: 'Eligible' },
          { name: 'Sarah Johnson', role: 'Co-Borrower', fico: 728, income: '$25,600/yr', score: 'Eligible' }].map(b => (
          <div key={b.name} style={{ background: '#1e293b', borderRadius: 8, padding: 12, marginBottom: 10 }}>
            <div style={{ fontWeight: 700, marginBottom: 4 }}>{b.name}</div>
            <div style={{ fontSize: 12, color: '#64748b', marginBottom: 6 }}>{b.role}</div>
            <div style={{ display: 'flex', gap: 16, fontSize: 12 }}>
              <span>FICO: <strong>{b.fico}</strong></span>
              <span>Income: <strong>{b.income}</strong></span>
              <span className="badge badge-green" style={{ fontSize: 11 }}>{b.score}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function CreditTab({ loan: l }) {
  const tradelines = [
    { creditor: 'Chase Visa', type: 'Rev', limit: 15000, balance: 2800, monthly: 56, rate: '21.99%', status: 'Current', opened: '2017' },
    { creditor: 'Toyota Financial', type: 'Inst', limit: 38000, balance: 19400, monthly: 642, rate: '4.99%', status: 'Current', opened: '2022' },
    { creditor: 'Wells Fargo HELOC', type: 'Rev', limit: 50000, balance: 0, monthly: 0, rate: 'Prime+1', status: 'Current', opened: '2020' },
    { creditor: 'BofA Credit Card', type: 'Rev', limit: 8000, balance: 1200, monthly: 24, rate: '19.99%', status: 'Current', opened: '2015' },
    { creditor: 'Dept of Education', type: 'Inst', limit: 45000, balance: 31000, monthly: 315, rate: '5.50%', status: 'Current', opened: '2012' },
  ]
  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 20 }}>
        {[{ label: 'FICO Score', value: l.fico, color: '#4ade80' }, { label: 'Active Tradelines', value: tradelines.length, color: '#60a5fa' }, { label: 'Monthly Debt', value: `$${tradelines.reduce((s, t) => s + t.monthly, 0).toLocaleString()}`, color: '#fb923c' }, { label: 'Credit Inquiries', value: 2, color: '#94a3b8' }].map(s => (
          <div key={s.label} className="stat-card">
            <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="card" style={{ padding: 0 }}>
        <div style={{ padding: '14px 16px', borderBottom: '1px solid #334155', fontWeight: 700 }}>Credit Tradelines</div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#1e293b' }}>
              {['Creditor', 'Type', 'Limit', 'Balance', 'Monthly Pmt', 'Rate', 'Status', 'Opened'].map(h => (
                <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontSize: 11, color: '#475569', textTransform: 'uppercase', borderBottom: '1px solid #334155' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tradelines.map(t => (
              <tr key={t.creditor} style={{ borderBottom: '1px solid #1e293b' }}>
                <td style={{ padding: '10px 14px', fontSize: 13, fontWeight: 600 }}>{t.creditor}</td>
                <td style={{ padding: '10px 14px', fontSize: 12 }}><span className="badge" style={{ background: '#334155', color: '#94a3b8' }}>{t.type}</span></td>
                <td style={{ padding: '10px 14px', fontSize: 13 }}>${t.limit.toLocaleString()}</td>
                <td style={{ padding: '10px 14px', fontSize: 13 }}>${t.balance.toLocaleString()}</td>
                <td style={{ padding: '10px 14px', fontSize: 13 }}>${t.monthly}/mo</td>
                <td style={{ padding: '10px 14px', fontSize: 12, color: '#94a3b8' }}>{t.rate}</td>
                <td style={{ padding: '10px 14px' }}><span className="badge badge-green" style={{ fontSize: 11 }}>{t.status}</span></td>
                <td style={{ padding: '10px 14px', fontSize: 12, color: '#64748b' }}>{t.opened}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function FindingsTab({ findings }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.2)', borderRadius: 10, padding: 14, marginBottom: 4 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#4ade80', marginBottom: 4 }}>DU FINDINGS SUMMARY</div>
        <div style={{ fontSize: 12, color: '#94a3b8' }}>Desktop Underwriter run: April 10, 2025 · Version: DU 11.0 · Case #: DU-4829-2025</div>
      </div>
      {findings.map(f => (
        <div key={f.code} style={{ background: '#1e293b', border: `1px solid ${SEV_COLOR[f.severity]}33`, borderRadius: 10, padding: 14, display: 'flex', gap: 14, alignItems: 'flex-start' }}>
          <span style={{ width: 16, height: 16, background: SEV_COLOR[f.severity], borderRadius: '50%', flexShrink: 0, marginTop: 3 }} />
          <div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 4 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#64748b' }}>{f.code}</span>
              <span style={{ fontSize: 13, fontWeight: 700 }}>{f.label}</span>
            </div>
            <div style={{ fontSize: 13, color: '#94a3b8' }}>{f.description}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

function ConditionsTab({ conditions, onToggle, newCond, setNewCond, onAdd }) {
  return (
    <div>
      <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        <input placeholder="Add new underwriting condition..." value={newCond} onChange={e => setNewCond(e.target.value)} onKeyDown={e => e.key === 'Enter' && onAdd()} style={{ flex: 1 }} />
        <button className="btn btn-primary" onClick={onAdd}>+ Add</button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {conditions.map(c => (
          <div key={c.id} style={{ background: '#1e293b', border: `1px solid ${CONDITION_COLOR[c.status]}33`, borderRadius: 10, padding: 14, display: 'flex', gap: 14, alignItems: 'center' }}>
            <div style={{ flexShrink: 0 }}>
              <button onClick={() => onToggle(c.id)} style={{ width: 22, height: 22, borderRadius: '50%', background: CONDITION_COLOR[c.status], border: 'none', cursor: 'pointer', color: '#fff', fontSize: 12 }}>
                {c.status === 'Open' ? ' ' : c.status === 'Received' ? '→' : '✓'}
              </button>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, marginBottom: 4 }}>{c.text}</div>
              <div style={{ display: 'flex', gap: 8 }}>
                <span className="badge" style={{ background: '#334155', color: '#94a3b8', fontSize: 11 }}>{c.category}</span>
                <span className="badge" style={{ background: '#334155', color: '#94a3b8', fontSize: 11 }}>{c.priority}</span>
              </div>
            </div>
            <span className="badge" style={{ background: `${CONDITION_COLOR[c.status]}22`, color: CONDITION_COLOR[c.status], fontSize: 12 }}>{c.status}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function IncomeTab({ loan: l }) {
  const sources = [
    { source: 'Marcus – Base Salary (W2)', gross: 128000, monthly: 10667, verified: true, doc: 'W2 2023-2024, VOE' },
    { source: 'Sarah – Part-time Wages', gross: 25600, monthly: 2133, verified: true, doc: 'W2 2023-2024' },
  ]
  const totalMonthly = sources.reduce((s, i) => s + i.monthly, 0)
  const dtiCalc = ((l.debts / totalMonthly) * 100).toFixed(1)
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
      <div>
        {sources.map(s => (
          <div key={s.source} className="card" style={{ marginBottom: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{s.source}</div>
              <span className="badge badge-green" style={{ fontSize: 11 }}>{s.verified ? '✓ Verified' : 'Pending'}</span>
            </div>
            {[['Annual Gross', `$${s.gross.toLocaleString()}`], ['Monthly', `$${s.monthly.toLocaleString()}`], ['Documentation', s.doc]].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, padding: '5px 0', borderBottom: '1px solid #334155' }}>
                <span style={{ color: '#64748b' }}>{k}</span>
                <span style={{ fontWeight: 600 }}>{v}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="card">
        <div style={{ fontWeight: 700, marginBottom: 14 }}>DTI Analysis</div>
        {[['Total Monthly Income', `$${totalMonthly.toLocaleString()}`], ['PITIA (New Housing)', `$${(l.amount * 0.006875).toFixed(0).toLocaleString()}`], ['Other Monthly Debts', `$${(l.debts - Math.round(l.amount * 0.006875)).toLocaleString()}`], ['Total Monthly Debts', `$${l.debts.toLocaleString()}`], ['Front-End DTI', `${((Math.round(l.amount * 0.006875) / totalMonthly) * 100).toFixed(1)}%`], ['Back-End DTI', `${dtiCalc}%`]].map(([k, v]) => (
          <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #334155', fontSize: 13 }}>
            <span style={{ color: '#64748b' }}>{k}</span>
            <span style={{ fontWeight: 700 }}>{v}</span>
          </div>
        ))}
        <div className="alert alert-success" style={{ marginTop: 14, fontSize: 12 }}>
          DTI of {dtiCalc}% is within DU guidelines (max 45%)
        </div>
      </div>
    </div>
  )
}

function AppraisalTab({ loan: l }) {
  const comps = [
    { address: '801 Maple Dr, Austin TX', sqft: 2780, price: 575000, adj: 0, adjPrice: 575000, date: 'Feb 2025' },
    { address: '422 Cedar Ln, Austin TX', sqft: 2710, price: 555000, adj: 8000, adjPrice: 563000, date: 'Jan 2025' },
    { address: '15 Birch Blvd, Austin TX', sqft: 2990, price: 620000, adj: -18000, adjPrice: 602000, date: 'Mar 2025' },
  ]
  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 20 }}>
        {[['Appraised Value', `$${l.appraised.toLocaleString()}`, '#4ade80'], ['Purchase Price', `$${l.purchasePrice.toLocaleString()}`, '#60a5fa'], ['Effective LTV', `${l.ltv}%`, '#fb923c'], ['Value Difference', `+$${(l.appraised - l.purchasePrice).toLocaleString()}`, '#4ade80']].map(([label, val, color]) => (
          <div key={label} className="stat-card">
            <div className="stat-value" style={{ color }}>{val}</div>
            <div className="stat-label">{label}</div>
          </div>
        ))}
      </div>
      <div className="card">
        <div style={{ fontWeight: 700, marginBottom: 14 }}>Comparable Sales (Sales Comparison Grid)</div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {['Address', 'Sqft', 'Sale Price', 'Net Adj.', 'Adj. Price', 'Date'].map(h => (
                <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontSize: 11, color: '#475569', borderBottom: '1px solid #334155' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comps.map(c => (
              <tr key={c.address} style={{ borderBottom: '1px solid #1e293b' }}>
                <td style={{ padding: '10px 14px', fontSize: 13 }}>{c.address}</td>
                <td style={{ padding: '10px 14px', fontSize: 13 }}>{c.sqft.toLocaleString()}</td>
                <td style={{ padding: '10px 14px', fontSize: 13 }}>${c.price.toLocaleString()}</td>
                <td style={{ padding: '10px 14px', fontSize: 13, color: c.adj > 0 ? '#4ade80' : c.adj < 0 ? '#f87171' : '#64748b' }}>{c.adj !== 0 ? `${c.adj > 0 ? '+' : ''}$${c.adj.toLocaleString()}` : '—'}</td>
                <td style={{ padding: '10px 14px', fontSize: 13, fontWeight: 700 }}>${c.adjPrice.toLocaleString()}</td>
                <td style={{ padding: '10px 14px', fontSize: 12, color: '#64748b' }}>{c.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="alert alert-success" style={{ marginTop: 16 }}>
          <span>✅</span>
          <span>Appraised value of <strong>$590,000</strong> supports the purchase price. No value concerns. Condition satisfied.</span>
        </div>
      </div>
    </div>
  )
}
