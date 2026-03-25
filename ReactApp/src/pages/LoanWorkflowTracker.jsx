import { useState } from 'react'

const LOAN = {
  id: 'APP-2026-0421',
  borrower: 'Arjun Sharma',
  coapplicant: 'Priya Sharma',
  property: '4821 Maple Ridge Dr, Austin TX 78701',
  amount: '$485,000',
  type: 'Conventional 30yr Fixed',
  rate: '6.875%',
  officer: 'Sarah Owen',
  underwriter: 'David Park',
  broker: 'Michael Chen',
  title: 'Lisa Monroe',
  insurance: 'Kevin Hart',
  started: 'Mar 1, 2026',
  target: 'Apr 15, 2026',
}

const STAGES = [
  {
    id: 'pre-qual',
    phase: 1,
    name: 'Pre-Qualification',
    icon: '🎯',
    color: '#60a5fa',
    status: 'done',
    date: 'Mar 1–2',
    roles: ['Borrower', 'Broker'],
    steps: [
      { label: 'Pre-qual inquiry submitted', done: true, role: 'Borrower', date: 'Mar 1' },
      { label: 'Soft credit pull (FICO 742)', done: true, role: 'System', date: 'Mar 1' },
      { label: 'Pre-qual letter issued ($485K)', done: true, role: 'Loan Officer', date: 'Mar 2' },
    ],
    docs: ['Pre-qual letter'],
  },
  {
    id: 'application',
    phase: 2,
    name: 'Application',
    icon: '📋',
    color: '#a78bfa',
    status: 'done',
    date: 'Mar 5–6',
    roles: ['Borrower', 'Co-Applicant', 'Broker'],
    steps: [
      { label: 'Uniform Residential Loan App (1003) completed', done: true, role: 'Borrower', date: 'Mar 5' },
      { label: 'Co-applicant (Priya) added & consented', done: true, role: 'Co-Applicant', date: 'Mar 5' },
      { label: 'Initial disclosures delivered & signed', done: true, role: 'Borrower', date: 'Mar 5' },
      { label: 'Intent to proceed confirmed', done: true, role: 'Borrower', date: 'Mar 6' },
      { label: 'Broker submitted to First National Mortgage', done: true, role: 'Broker', date: 'Mar 6' },
    ],
    docs: ['1003', 'LE (Loan Estimate)', 'Intent to Proceed'],
  },
  {
    id: 'processing',
    phase: 3,
    name: 'Processing',
    icon: '⚙️',
    color: '#fb923c',
    status: 'active',
    date: 'Mar 7–18',
    roles: ['Loan Officer', 'Processor'],
    steps: [
      { label: 'Document checklist sent to Borrower', done: true, role: 'Loan Officer', date: 'Mar 7' },
      { label: 'Tri-merge credit report pulled', done: true, role: 'System', date: 'Mar 8' },
      { label: 'W-2, pay stubs, tax returns received', done: true, role: 'Borrower', date: 'Mar 10' },
      { label: 'Asset declaration wizard completed', done: true, role: 'Borrower', date: 'Mar 12' },
      { label: 'Bank accounts verified via Plaid', done: true, role: 'System (Plaid)', date: 'Mar 13' },
      { label: 'Income calculated: $14,200/mo qualifying', done: true, role: 'Processor', date: 'Mar 14' },
      { label: 'Appraisal ordered — CoreLogic AVM: $498K', done: false, role: 'Loan Officer', date: 'In Progress' },
      { label: 'Employment verified (The Work Number)', done: false, role: 'System', date: 'Pending' },
    ],
    docs: ['Bank Statements (3mo)', 'W-2 (2yr)', 'Pay Stubs', 'Tax Returns', 'Asset Declaration'],
  },
  {
    id: 'underwriting',
    phase: 4,
    name: 'Underwriting',
    icon: '⚖️',
    color: '#f472b6',
    status: 'pending',
    date: 'Est. Mar 19–22',
    roles: ['Underwriter'],
    steps: [
      { label: 'DU / LP submission', done: false, role: 'Underwriter', date: '' },
      { label: 'AUS result: Approve/Eligible', done: false, role: 'System (DU)', date: '' },
      { label: 'Full UW file review', done: false, role: 'David Park', date: '' },
      { label: 'Conditions issued (target: < 5)', done: false, role: 'Underwriter', date: '' },
      { label: 'Conditional approval issued', done: false, role: 'Underwriter', date: '' },
    ],
    docs: ['UW Decision Letter', 'Condition List'],
  },
  {
    id: 'conditions',
    phase: 5,
    name: 'Condition Clearing',
    icon: '✅',
    color: '#4ade80',
    status: 'pending',
    date: 'Est. Mar 23–Apr 2',
    roles: ['Borrower', 'Loan Officer', 'Underwriter'],
    steps: [
      { label: 'Conditions sent to Borrower', done: false, role: 'Loan Officer', date: '' },
      { label: 'Borrower provides additional docs/LOEs', done: false, role: 'Borrower', date: '' },
      { label: 'Insurance quote received & policy bound', done: false, role: 'Kevin Hart (Insurance)', date: '' },
      { label: 'Title order placed with Premier Title', done: false, role: 'Loan Officer', date: '' },
      { label: 'Title search completed', done: false, role: 'Lisa Monroe (Title)', date: '' },
      { label: 'Title commitment issued', done: false, role: 'Lisa Monroe (Title)', date: '' },
      { label: 'All conditions cleared by UW', done: false, role: 'Underwriter', date: '' },
    ],
    docs: ['HOI Policy', 'Title Commitment', 'VOE', 'LOEs'],
  },
  {
    id: 'ctc',
    phase: 6,
    name: 'Clear to Close',
    icon: '🏁',
    color: '#facc15',
    status: 'pending',
    date: 'Est. Apr 3–7',
    roles: ['Loan Officer', 'Title Agent', 'Underwriter'],
    steps: [
      { label: 'Closing Disclosure (CD) generated', done: false, role: 'Loan Officer', date: '' },
      { label: 'CD delivered to Borrower (3-day waiting period)', done: false, role: 'System', date: '' },
      { label: 'Closing scheduled with Premier Title Services', done: false, role: 'Lisa Monroe (Title)', date: '' },
      { label: 'Final cash-to-close confirmed with Borrower', done: false, role: 'Loan Officer', date: '' },
      { label: 'Wire instructions sent', done: false, role: 'Title Agent', date: '' },
    ],
    docs: ['Closing Disclosure', 'ALTA Statement', 'Closing Instructions'],
  },
  {
    id: 'closing',
    phase: 7,
    name: 'Closing & Funding',
    icon: '🔑',
    color: '#34d399',
    status: 'pending',
    date: 'Est. Apr 10–12',
    roles: ['Borrower', 'Title Agent', 'Lender'],
    steps: [
      { label: 'Closing appointment at title office', done: false, role: 'Borrower + Lisa Monroe', date: '' },
      { label: 'Loan documents signed (Note, Deed of Trust)', done: false, role: 'Borrower', date: '' },
      { label: 'Down payment wire confirmed', done: false, role: 'Borrower', date: '' },
      { label: 'Lender funds wire to escrow ($485K)', done: false, role: 'First National Mortgage', date: '' },
      { label: 'Deed recorded at county', done: false, role: 'Title Agent', date: '' },
      { label: 'Keys handed to Borrower 🎉', done: false, role: 'Title Agent', date: '' },
    ],
    docs: ['Promissory Note', 'Deed of Trust', 'Final CD', 'Wire Confirmation'],
  },
  {
    id: 'servicing',
    phase: 8,
    name: 'Servicing',
    icon: '💳',
    color: '#818cf8',
    status: 'pending',
    date: 'Est. May 2026+',
    roles: ['Servicer', 'Borrower'],
    steps: [
      { label: 'Loan onboarded to servicing', done: false, role: 'System', date: '' },
      { label: 'Welcome package sent to Borrower', done: false, role: 'Servicer', date: '' },
      { label: 'First payment due (Jun 1, 2026)', done: false, role: 'Borrower', date: 'Jun 1' },
      { label: 'Escrow account funded (taxes + insurance)', done: false, role: 'Servicer', date: '' },
      { label: 'Annual escrow analysis (Mar 2027)', done: false, role: 'Servicer', date: '' },
    ],
    docs: ['Welcome Letter', 'Payment Schedule', 'Escrow Statement'],
  },
]

const PARTICIPANTS = [
  { role: 'Borrower', name: 'Arjun Sharma', org: 'Applicant', color: '#60a5fa', icon: '🏠' },
  { role: 'Co-Applicant', name: 'Priya Sharma', org: 'Applicant', color: '#93c5fd', icon: '👤' },
  { role: 'Broker', name: 'Michael Chen', org: 'Pacific Realty Group', color: '#facc15', icon: '🤝' },
  { role: 'Loan Officer', name: 'Sarah Owen', org: 'First National Mortgage', color: '#a78bfa', icon: '🏦' },
  { role: 'Underwriter', name: 'David Park', org: 'First National Mortgage', color: '#f472b6', icon: '⚖️' },
  { role: 'Title Agent', name: 'Lisa Monroe', org: 'Premier Title Services', color: '#34d399', icon: '📜' },
  { role: 'Insurance Agent', name: 'Kevin Hart', org: 'SafeGuard Insurance', color: '#fb923c', icon: '🛡️' },
  { role: 'Builder', name: 'Raj Patel', org: 'Greenfield Developments', color: '#4ade80', icon: '🏗️' },
]

const DOCS_MATRIX = [
  { doc: '1003 Application', borrower: '✅', broker: '✅', lo: '👁️', uw: '👁️', title: '—', ins: '—' },
  { doc: 'W-2 / Tax Returns (2yr)', borrower: '✅', broker: '—', lo: '✅', uw: '👁️', title: '—', ins: '—' },
  { doc: 'Bank Statements (3mo)', borrower: '✅', broker: '—', lo: '✅', uw: '👁️', title: '—', ins: '—' },
  { doc: 'Appraisal Report', borrower: '👁️', broker: '—', lo: '✅', uw: '✅', title: '👁️', ins: '—' },
  { doc: 'Title Commitment', borrower: '👁️', broker: '—', lo: '👁️', uw: '✅', title: '✅', ins: '—' },
  { doc: 'HOI Policy', borrower: '✅', broker: '—', lo: '👁️', uw: '✅', title: '👁️', ins: '✅' },
  { doc: 'Closing Disclosure', borrower: '✅', broker: '—', lo: '✅', uw: '—', title: '✅', ins: '—' },
  { doc: 'Promissory Note', borrower: '✅', broker: '—', lo: '—', uw: '—', title: '✅', ins: '—' },
]

const STATUS_COLORS = { done: '#4ade80', active: '#facc15', pending: '#475569' }
const STATUS_LABELS = { done: 'Complete', active: 'In Progress', pending: 'Not Started' }

export default function LoanWorkflowTracker() {
  const [selectedStage, setSelectedStage] = useState('processing')
  const [activeTab, setActiveTab] = useState('workflow')

  const stage = STAGES.find(s => s.id === selectedStage)
  const completedStages = STAGES.filter(s => s.status === 'done').length
  const progress = Math.round((completedStages / STAGES.length) * 100)

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800 }}>Loan Workflow Tracker</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 4 }}>
            End-to-end origination pipeline · {LOAN.id} · {LOAN.borrower} + {LOAN.coapplicant}
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <span className="badge badge-yellow" style={{ padding: '7px 12px' }}>⚙️ Processing</span>
          <span className="badge" style={{ padding: '7px 12px', background: 'var(--bg-elevated)', color: 'var(--text-muted)' }}>
            Target Close: Apr 15, 2026
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="tab-group" style={{ marginBottom: 20 }}>
        {['workflow', 'participants', 'documents'].map(t => (
          <button key={t} className={`tab-btn${activeTab === t ? ' active' : ''}`} onClick={() => setActiveTab(t)} style={{ textTransform: 'capitalize' }}>{t}</button>
        ))}
      </div>

      {activeTab === 'workflow' && (
        <>
          {/* Loan Summary Bar */}
          <div className="card" style={{ marginBottom: 20, padding: '16px 20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 16 }}>
              {[
                { label: 'Loan Amount', value: LOAN.amount },
                { label: 'Loan Type', value: LOAN.type },
                { label: 'Rate', value: LOAN.rate },
                { label: 'Loan Officer', value: LOAN.officer },
                { label: 'Property', value: '4821 Maple Ridge, Austin TX', small: true },
                { label: 'Progress', value: `${progress}% (${completedStages}/${STAGES.length})` },
              ].map(f => (
                <div key={f.label}>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>{f.label}</div>
                  <div style={{ fontSize: f.small ? 11 : 13, fontWeight: 600, color: 'var(--text-primary)' }}>{f.value}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 12 }}>
              <div style={{ height: 6, borderRadius: 3, background: 'var(--border)', overflow: 'hidden' }}>
                <div style={{ width: `${progress}%`, height: '100%', background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)', borderRadius: 3, transition: 'width 0.4s' }} />
              </div>
            </div>
          </div>

          {/* Stage Pipeline */}
          <div className="card" style={{ marginBottom: 20, padding: '20px', overflowX: 'auto' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 14 }}>Pipeline Stages</div>
            <div style={{ display: 'flex', gap: 0, minWidth: 800 }}>
              {STAGES.map((s, i) => (
                <div key={s.id} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  {/* Connector + Node */}
                  <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                    {i > 0 && <div style={{ flex: 1, height: 2, background: s.status === 'done' ? s.color : 'var(--border)' }} />}
                    <button
                      onClick={() => setSelectedStage(s.id)}
                      style={{
                        width: 40, height: 40, borderRadius: '50%', border: `3px solid ${selectedStage === s.id ? '#fff' : s.color}`,
                        background: s.status === 'done' ? s.color : s.status === 'active' ? `${s.color}33` : 'var(--bg-elevated)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 16, cursor: 'pointer', flexShrink: 0,
                        boxShadow: selectedStage === s.id ? `0 0 0 3px ${s.color}66` : 'none',
                        transition: 'all 0.15s',
                      }}
                    >{s.icon}</button>
                    {i < STAGES.length - 1 && <div style={{ flex: 1, height: 2, background: s.status === 'done' ? STAGES[i + 1].color : 'var(--border)' }} />}
                  </div>
                  {/* Label */}
                  <div style={{ marginTop: 8, textAlign: 'center', width: '100%', padding: '0 2px' }}>
                    <div style={{ fontSize: 10, fontWeight: selectedStage === s.id ? 700 : 500, color: selectedStage === s.id ? s.color : 'var(--text-secondary)', lineHeight: 1.3 }}>{s.name}</div>
                    <div style={{ fontSize: 9, color: STATUS_COLORS[s.status], marginTop: 2 }}>{STATUS_LABELS[s.status]}</div>
                    {s.date && <div style={{ fontSize: 9, color: 'var(--text-muted)', marginTop: 1 }}>{s.date}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Stage Detail */}
          {stage && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 16 }}>
              {/* Steps */}
              <div className="card" style={{ padding: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                  <span style={{ fontSize: 22 }}>{stage.icon}</span>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>Phase {stage.phase}: {stage.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
                      Participants: {stage.roles.join(' · ')}
                    </div>
                  </div>
                  <span style={{ marginLeft: 'auto', padding: '4px 10px', borderRadius: 20, background: `${STATUS_COLORS[stage.status]}22`, color: STATUS_COLORS[stage.status], fontSize: 11, fontWeight: 700 }}>
                    {STATUS_LABELS[stage.status]}
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {stage.steps.map((step, i) => (
                    <div key={i} style={{
                      display: 'flex', alignItems: 'flex-start', gap: 12,
                      padding: '10px 12px', borderRadius: 8,
                      background: step.done ? 'var(--bg-elevated)' : !step.date && !step.done ? 'transparent' : `rgba(250,204,21,0.08)`,
                      border: `1px solid ${step.done ? 'transparent' : step.date === 'In Progress' ? '#facc15' : 'var(--border)'}`,
                    }}>
                      <div style={{
                        width: 22, height: 22, borderRadius: '50%', flexShrink: 0, marginTop: 1,
                        background: step.done ? '#4ade80' : step.date === 'In Progress' ? '#facc15' : 'var(--border)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11,
                      }}>
                        {step.done ? '✓' : step.date === 'In Progress' ? '⋯' : i + 1}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, color: step.done ? 'var(--text-secondary)' : 'var(--text-primary)', fontWeight: step.date === 'In Progress' ? 600 : 400 }}>{step.label}</div>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>
                          {step.role} {step.date && `· ${step.date}`}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stage Info Panel */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div className="card" style={{ padding: '16px' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>Required Documents</div>
                  {stage.docs.map(d => (
                    <div key={d} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', borderBottom: '1px solid var(--border)', fontSize: 13 }}>
                      <span style={{ color: '#60a5fa' }}>📄</span>
                      <span style={{ color: 'var(--text-secondary)' }}>{d}</span>
                    </div>
                  ))}
                </div>

                <div className="card" style={{ padding: '16px' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>Role Owners</div>
                  {stage.roles.map(r => {
                    const p = PARTICIPANTS.find(x => x.role === r || x.role.startsWith(r.split(' ')[0]))
                    return (
                      <div key={r} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', borderBottom: '1px solid var(--border)' }}>
                        <div style={{ width: 28, height: 28, borderRadius: '50%', background: p ? `${p.color}33` : 'var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>
                          {p ? p.icon : '👤'}
                        </div>
                        <div>
                          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)' }}>{p ? p.name : r}</div>
                          <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{r}{p ? ` · ${p.org}` : ''}</div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="card" style={{ padding: '16px' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>Stage Navigation</div>
                  {STAGES.map(s => (
                    <button key={s.id} onClick={() => setSelectedStage(s.id)} style={{
                      width: '100%', display: 'flex', alignItems: 'center', gap: 8, padding: '6px 8px', borderRadius: 6, border: 'none',
                      background: selectedStage === s.id ? `${s.color}22` : 'transparent', cursor: 'pointer',
                      color: selectedStage === s.id ? s.color : 'var(--text-secondary)', textAlign: 'left', fontSize: 12, marginBottom: 2,
                    }}>
                      <span>{s.icon}</span>
                      <span style={{ flex: 1 }}>Phase {s.phase}: {s.name}</span>
                      <span style={{ width: 8, height: 8, borderRadius: '50%', background: STATUS_COLORS[s.status], flexShrink: 0 }} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {activeTab === 'participants' && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 20 }}>
            {PARTICIPANTS.map(p => (
              <div key={p.role} className="card" style={{ padding: '18px', borderTop: `3px solid ${p.color}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: `${p.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{p.icon}</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>{p.name}</div>
                    <div style={{ fontSize: 11, color: p.color, fontWeight: 600 }}>{p.role}</div>
                  </div>
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{p.org}</div>
                <div style={{ marginTop: 10, padding: '8px 10px', background: 'var(--bg-elevated)', borderRadius: 6, fontSize: 11, color: 'var(--text-muted)' }}>
                  Active in {STAGES.filter(s => s.roles.some(r => r.includes(p.role.split(' ')[0]))).length} of {STAGES.length} phases
                </div>
              </div>
            ))}
          </div>

          {/* Role Responsibility Matrix */}
          <div className="card" style={{ padding: '20px' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 16 }}>Role × Stage Responsibility Matrix</div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                <thead>
                  <tr>
                    <th style={{ padding: '8px 12px', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 600, borderBottom: '1px solid var(--border)', width: 180 }}>Stage</th>
                    {PARTICIPANTS.map(p => (
                      <th key={p.role} style={{ padding: '8px 10px', textAlign: 'center', color: p.color, fontWeight: 600, borderBottom: '1px solid var(--border)', minWidth: 90 }}>
                        {p.icon} {p.role.split(' ')[0]}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {STAGES.map(s => (
                    <tr key={s.id} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '8px 12px', color: 'var(--text-secondary)', fontWeight: 500 }}>{s.icon} {s.name}</td>
                      {PARTICIPANTS.map(p => {
                        const active = s.roles.some(r => r.toLowerCase().includes(p.role.toLowerCase().split(' ')[0]) ||
                          p.role.toLowerCase().includes(r.toLowerCase().split(' ')[0]))
                        return (
                          <td key={p.role} style={{ padding: '8px 10px', textAlign: 'center' }}>
                            {active ? (
                              <span style={{ color: p.color, fontSize: 15 }}>●</span>
                            ) : (
                              <span style={{ color: 'var(--border)', fontSize: 12 }}>—</span>
                            )}
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'documents' && (
        <div className="card" style={{ padding: '20px' }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 16 }}>Document Access Matrix</div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 16 }}>
            ✅ = Submit/Upload &nbsp;&nbsp; 👁️ = View Only &nbsp;&nbsp; — = No Access
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
            <thead>
              <tr>
                <th style={{ padding: '8px 12px', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 600, borderBottom: '1px solid var(--border)' }}>Document</th>
                {['Borrower 🏠', 'Broker 🤝', 'LO 🏦', 'UW ⚖️', 'Title 📜', 'Insurance 🛡️'].map(r => (
                  <th key={r} style={{ padding: '8px 12px', textAlign: 'center', color: 'var(--text-muted)', fontWeight: 600, borderBottom: '1px solid var(--border)' }}>{r}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {DOCS_MATRIX.map(row => (
                <tr key={row.doc} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px 12px', color: 'var(--text-secondary)', fontWeight: 500 }}>📄 {row.doc}</td>
                  {[row.borrower, row.broker, row.lo, row.uw, row.title, row.ins].map((v, i) => (
                    <td key={i} style={{ padding: '10px 12px', textAlign: 'center', fontSize: 15, color: v === '✅' ? '#4ade80' : v === '👁️' ? '#60a5fa' : '#475569' }}>{v}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
