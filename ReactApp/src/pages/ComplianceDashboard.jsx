import { useState } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar, Legend,
} from 'recharts'

/* ─── Static data ─────────────────────────────────────────────────────── */

const MODULES = [
  {
    id: 'trid', name: 'TRID', full: 'TILA-RESPA Integrated Disclosure',
    score: 94, status: 'Compliant', findings: 1, lastReview: 'Mar 18, 2026',
    nextReview: 'Jun 18, 2026', regulator: 'CFPB', color: '#10b981',
    items: ['Loan Estimate delivery ≤3 days', 'Closing Disclosure delivery ≤3 days', 'CD waiting period enforced', 'Tolerance limits tracked'],
    passAll: [true, true, true, false],
  },
  {
    id: 'respa', name: 'RESPA', full: 'Real Estate Settlement Procedures Act',
    score: 97, status: 'Compliant', findings: 0, lastReview: 'Mar 10, 2026',
    nextReview: 'Jun 10, 2026', regulator: 'CFPB', color: '#10b981',
    items: ['Section 8 kickback prohibition', 'Settlement service fee disclosure', 'Escrow account limits', 'Transfer servicing notice'],
    passAll: [true, true, true, true],
  },
  {
    id: 'ecoa', name: 'ECOA', full: 'Equal Credit Opportunity Act',
    score: 88, status: 'Watch', findings: 2, lastReview: 'Feb 28, 2026',
    nextReview: 'May 28, 2026', regulator: 'CFPB / Fed', color: '#f59e0b',
    items: ['Adverse action notices ≤30 days', 'Non-discrimination monitoring', 'FICO model fairness review', 'Joint applicant rights'],
    passAll: [true, false, false, true],
  },
  {
    id: 'hmda', name: 'HMDA', full: 'Home Mortgage Disclosure Act',
    score: 91, status: 'Compliant', findings: 1, lastReview: 'Mar 01, 2026',
    nextReview: 'Apr 01, 2026', regulator: 'CFPB', color: '#10b981',
    items: ['LAR submission on schedule', 'Data accuracy ≥99%', 'Rate spread threshold checks', 'Denial reason completeness'],
    passAll: [true, true, false, true],
  },
  {
    id: 'cra', name: 'CRA', full: 'Community Reinvestment Act',
    score: 78, status: 'Needs Attention', findings: 3, lastReview: 'Jan 15, 2026',
    nextReview: 'Apr 15, 2026', regulator: 'OCC / FDIC', color: '#ef4444',
    items: ['LMI lending target 25%', 'Assessment area coverage', 'Community development loans', 'Public file maintenance'],
    passAll: [false, true, false, false],
  },
  {
    id: 'bsa', name: 'BSA / AML', full: 'Bank Secrecy Act / Anti-Money Laundering',
    score: 96, status: 'Compliant', findings: 0, lastReview: 'Mar 20, 2026',
    nextReview: 'Jun 20, 2026', regulator: 'FinCEN / FDIC', color: '#10b981',
    items: ['SAR filing timeliness', 'CDD / KYC procedures', 'CTR reporting', 'OFAC screening active'],
    passAll: [true, true, true, true],
  },
]

const FINDINGS = [
  { id: 'F-001', reg: 'TRID', severity: 'Medium', title: 'CD re-issued without tolerance re-set on 3 loans', assigned: 'Sarah Owen', due: 'Apr 05, 2026', status: 'In Remediation' },
  { id: 'F-002', reg: 'ECOA', severity: 'High', title: 'Adverse action notice delayed >30 days (2 cases)', assigned: 'Mike Torres', due: 'Mar 30, 2026', status: 'Overdue' },
  { id: 'F-003', reg: 'ECOA', severity: 'Medium', title: 'FICO model demographic parity gap flagged', assigned: 'Risk Team', due: 'Apr 30, 2026', status: 'Open' },
  { id: 'F-004', reg: 'HMDA', severity: 'Low', title: 'Rate spread field blank on 4 originated loans (LAR)', assigned: 'Compliance', due: 'Apr 15, 2026', status: 'Open' },
  { id: 'F-005', reg: 'CRA', severity: 'High', title: 'LMI loan origination below 25% target YTD', assigned: 'LO Team', due: 'Jun 30, 2026', status: 'Open' },
  { id: 'F-006', reg: 'CRA', severity: 'Medium', title: 'Community development loan documentation incomplete', assigned: 'CRA Officer', due: 'Apr 20, 2026', status: 'In Remediation' },
  { id: 'F-007', reg: 'CRA', severity: 'Low', title: 'Public file missing Q4 2025 annual report insert', assigned: 'Admin', due: 'Mar 31, 2026', status: 'Overdue' },
]

const CALENDAR = [
  { date: 'Mar 31, 2026', event: 'HMDA LAR Q1 submission deadline', type: 'Filing', urgency: 'high' },
  { date: 'Apr 01, 2026', event: 'HMDA Semi-Annual LAR review', type: 'Review', urgency: 'high' },
  { date: 'Apr 05, 2026', event: 'TRID F-001 remediation deadline', type: 'Remediation', urgency: 'medium' },
  { date: 'Apr 15, 2026', event: 'CRA Assessment Area report due', type: 'Filing', urgency: 'medium' },
  { date: 'Apr 30, 2026', event: 'ECOA Annual Reg B Training', type: 'Training', urgency: 'low' },
  { date: 'May 01, 2026', event: 'CFPB Exam Prep — Pre-review self-assessment', type: 'Exam', urgency: 'high' },
  { date: 'May 28, 2026', event: 'ECOA FICO model fair lending review', type: 'Review', urgency: 'medium' },
  { date: 'Jun 10, 2026', event: 'RESPA scheduled compliance review', type: 'Review', urgency: 'low' },
  { date: 'Jun 30, 2026', event: 'CRA LMI target mid-year checkpoint', type: 'Review', urgency: 'medium' },
]

const AUDIT_LOG = [
  { ts: 'Mar 25, 2026 10:42', user: 'Sarah Owen', action: 'Reviewed TRID finding F-001 and updated status to In Remediation', module: 'TRID' },
  { ts: 'Mar 24, 2026 16:15', user: 'Compliance Bot', action: 'HMDA rate-spread check flagged 4 incomplete LAR records', module: 'HMDA' },
  { ts: 'Mar 23, 2026 09:30', user: 'Mike Torres', action: 'Adverse action finding F-002 escalated to High severity', module: 'ECOA' },
  { ts: 'Mar 22, 2026 14:00', user: 'Admin User', action: 'CRA annual performance targets reviewed — overall rating: Needs Improvement', module: 'CRA' },
  { ts: 'Mar 20, 2026 11:55', user: 'Compliance Bot', action: 'BSA/AML OFAC screening passed for all 38 new applications', module: 'BSA/AML' },
  { ts: 'Mar 19, 2026 08:22', user: 'Risk Team', action: 'Quarterly FICO fairness report generated and forwarded to legal', module: 'ECOA' },
  { ts: 'Mar 18, 2026 15:40', user: 'Sarah Owen', action: 'TRID compliance review completed — Q1 2026', module: 'TRID' },
  { ts: 'Mar 15, 2026 10:10', user: 'Compliance Bot', action: 'HMDA data accuracy check: 99.2% accuracy — threshold met', module: 'HMDA' },
  { ts: 'Mar 10, 2026 09:00', user: 'CRA Officer', action: 'RESPA Section 8 annual audit completed — no violations', module: 'RESPA' },
  { ts: 'Mar 01, 2026 08:30', user: 'Compliance Bot', action: 'HMDA LAR 2025 annual submission confirmed — accepted by CFPB', module: 'HMDA' },
]

const SCORE_TREND = [
  { month: 'Oct', score: 82 },
  { month: 'Nov', score: 85 },
  { month: 'Dec', score: 84 },
  { month: 'Jan', score: 87 },
  { month: 'Feb', score: 89 },
  { month: 'Mar', score: 91 },
]

const EXAM_AREAS = [
  { name: 'Document Retention', readiness: 95 },
  { name: 'Fair Lending Policies', readiness: 82 },
  { name: 'LO Training Records', readiness: 88 },
  { name: 'Adverse Action Logs', readiness: 74 },
  { name: 'Escrow Analysis', readiness: 96 },
  { name: 'HMDA Data Accuracy', readiness: 91 },
]

/* ─── Helpers ─────────────────────────────────────────────────────────── */

const overallScore = Math.round(MODULES.reduce((s, m) => s + m.score, 0) / MODULES.length)
const openFindings = FINDINGS.length
const overdueFindings = FINDINGS.filter(f => f.status === 'Overdue').length
const upcomingExams = CALENDAR.filter(c => c.type === 'Exam').length

function scoreColor(n) {
  return n >= 90 ? '#10b981' : n >= 80 ? '#f59e0b' : '#ef4444'
}

function severityBadge(s) {
  const map = { High: 'badge-red', Medium: 'badge-yellow', Low: 'badge-gray' }
  return map[s] || 'badge-gray'
}

function statusBadge(s) {
  const map = {
    'Compliant': 'badge-green', 'Watch': 'badge-yellow',
    'Needs Attention': 'badge-red', 'Overdue': 'badge-red',
    'In Remediation': 'badge-blue', 'Open': 'badge-gray',
  }
  return map[s] || 'badge-gray'
}

function calendarBadge(t) {
  const map = { Filing: 'badge-blue', Review: 'badge-purple', Remediation: 'badge-yellow', Training: 'badge-cyan', Exam: 'badge-red' }
  return map[t] || 'badge-gray'
}

function moduleBadge(name) {
  const map = {
    TRID: 'badge-blue', RESPA: 'badge-green', ECOA: 'badge-yellow',
    HMDA: 'badge-blue', CRA: 'badge-red', 'BSA/AML': 'badge-purple', 'BSA / AML': 'badge-purple',
  }
  return map[name] || 'badge-gray'
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 8, padding: '8px 14px' }}>
      <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 4 }}>{label}</div>
      {payload.map(p => (
        <div key={p.name} style={{ fontSize: 13, fontWeight: 600, color: p.color || '#3b82f6' }}>
          Score: {p.value}%
        </div>
      ))}
    </div>
  )
}

/* ─── Component ──────────────────────────────────────────────────────── */

export default function ComplianceDashboard() {
  const [activeModule, setActiveModule] = useState(null)
  const [findingsFilter, setFindingsFilter] = useState('All')

  const filteredFindings = findingsFilter === 'All'
    ? FINDINGS
    : FINDINGS.filter(f => f.reg === findingsFilter || f.status === findingsFilter)

  return (
    <div>
      {/* ── Page header ────────────────────────────────────────────── */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-primary)' }}>Compliance & Regulatory</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 4 }}>
              TRID · RESPA · ECOA · HMDA · CRA · BSA/AML — Real-time compliance monitoring
            </p>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="btn btn-secondary btn-sm">⬇ Export Report</button>
            <button className="btn btn-primary btn-sm">+ New Finding</button>
          </div>
        </div>
      </div>

      {/* ── Alert: overdue findings ─────────────────────────────────── */}
      {overdueFindings > 0 && (
        <div className="alert alert-warning" style={{ marginBottom: 20 }}>
          <span>⚠️</span>
          <div>
            <strong>{overdueFindings} overdue finding{overdueFindings > 1 ? 's' : ''}</strong> require immediate action to avoid regulatory exposure.{' '}
            <button style={{ border: 'none', background: 'none', color: '#fbbf24', fontWeight: 600, textDecoration: 'underline', cursor: 'pointer', padding: 0 }}
              onClick={() => setFindingsFilter('Overdue')}>View overdue →</button>
          </div>
        </div>
      )}

      {/* ── KPI row ─────────────────────────────────────────────────── */}
      <div className="grid-4" style={{ marginBottom: 24 }}>
        <StatCard
          label="Overall Score"
          value={`${overallScore}%`}
          sub="Across 6 regulations"
          color={scoreColor(overallScore)}
          icon="🛡️"
          trend="+2% vs last quarter"
          trendUp
        />
        <StatCard
          label="Open Findings"
          value={openFindings}
          sub={`${overdueFindings} overdue`}
          color={overdueFindings > 0 ? '#ef4444' : '#f59e0b'}
          icon="🔍"
        />
        <StatCard
          label="Upcoming Exams"
          value={upcomingExams}
          sub="Next: May 01, 2026"
          color="#8b5cf6"
          icon="📋"
        />
        <StatCard
          label="HMDA Filings"
          value="Q1 Due"
          sub="Deadline: Mar 31, 2026"
          color="#f59e0b"
          icon="📄"
          urgent
        />
      </div>

      {/* ── Row 1: Module scores + Score trend ─────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20, marginBottom: 20 }}>

        {/* Compliance module grid */}
        <div className="card">
          <div className="section-header" style={{ marginBottom: 16 }}>
            <div>
              <div className="section-title">Compliance Modules</div>
              <div className="section-sub">Click a module to see checklist details</div>
            </div>
            <span className="badge badge-blue">6 Active</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {MODULES.map(m => (
              <div
                key={m.id}
                onClick={() => setActiveModule(activeModule?.id === m.id ? null : m)}
                style={{
                  background: 'var(--bg-elevated)',
                  border: `1px solid ${activeModule?.id === m.id ? m.color : 'var(--border)'}`,
                  borderRadius: 10,
                  padding: 14,
                  cursor: 'pointer',
                  transition: 'border-color 0.15s',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-primary)' }}>{m.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{m.regulator}</div>
                  </div>
                  <span className={`badge ${statusBadge(m.status)}`}>{m.status}</span>
                </div>

                {/* Score bar */}
                <div style={{ marginBottom: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Score</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: m.color }}>{m.score}%</span>
                  </div>
                  <div style={{ height: 5, background: 'var(--border)', borderRadius: 3, overflow: 'hidden' }}>
                    <div style={{ width: `${m.score}%`, height: '100%', background: m.color, borderRadius: 3, transition: 'width 0.4s' }} />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-muted)' }}>
                  <span>{m.findings} finding{m.findings !== 1 ? 's' : ''}</span>
                  <span>Next: {m.nextReview}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Module checklist detail (expanded) */}
          {activeModule && (
            <div style={{
              marginTop: 16, background: 'var(--bg-base)', border: `1px solid ${activeModule.color}40`,
              borderRadius: 10, padding: 16,
            }}>
              <div style={{ fontWeight: 700, marginBottom: 4, color: 'var(--text-primary)' }}>
                {activeModule.name} — {activeModule.full}
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 12 }}>
                Last reviewed: {activeModule.lastReview} · Regulator: {activeModule.regulator}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {activeModule.items.map((item, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    fontSize: 13, color: activeModule.passAll[i] ? 'var(--text-primary)' : 'var(--text-secondary)',
                  }}>
                    <span style={{
                      width: 18, height: 18, borderRadius: '50%', flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 11,
                      background: activeModule.passAll[i] ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)',
                      color: activeModule.passAll[i] ? '#10b981' : '#ef4444',
                    }}>
                      {activeModule.passAll[i] ? '✓' : '✗'}
                    </span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Score trend chart */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="section-header" style={{ marginBottom: 16 }}>
            <div>
              <div className="section-title">Score Trend</div>
              <div className="section-sub">6-month overall</div>
            </div>
          </div>
          <div style={{ flex: 1, minHeight: 180 }}>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={SCORE_TREND} barSize={28}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                <YAxis domain={[70, 100]} tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="score" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Overall score ring */}
          <div style={{
            marginTop: 16, padding: '12px 16px',
            background: 'var(--bg-elevated)', borderRadius: 10,
            display: 'flex', alignItems: 'center', gap: 14,
          }}>
            <div style={{
              width: 56, height: 56, borderRadius: '50%', flexShrink: 0,
              background: `conic-gradient(${scoreColor(overallScore)} ${overallScore * 3.6}deg, var(--border) 0deg)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative',
            }}>
              <div style={{
                width: 42, height: 42, borderRadius: '50%',
                background: 'var(--bg-elevated)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 800, fontSize: 13, color: scoreColor(overallScore),
              }}>
                {overallScore}
              </div>
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-primary)' }}>Overall Health</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
                {overallScore >= 90 ? 'Strong compliance posture' : overallScore >= 80 ? 'Moderate — action needed' : 'Critical — immediate remediation'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Row 2: Findings table + Regulatory calendar ─────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20, marginBottom: 20 }}>

        {/* Findings */}
        <div className="card">
          <div className="section-header" style={{ marginBottom: 12 }}>
            <div>
              <div className="section-title">Active Findings</div>
              <div className="section-sub">{openFindings} open · {overdueFindings} overdue</div>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              {['All', 'Overdue', 'High'].map(f => (
                <button
                  key={f}
                  onClick={() => setFindingsFilter(f)}
                  className={`btn btn-sm ${findingsFilter === f ? 'btn-primary' : 'btn-secondary'}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Regulation</th>
                  <th>Finding</th>
                  <th>Severity</th>
                  <th>Assigned To</th>
                  <th>Due Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredFindings.map(f => (
                  <tr key={f.id}>
                    <td style={{ fontFamily: 'monospace', fontSize: 12, color: 'var(--text-muted)' }}>{f.id}</td>
                    <td><span className={`badge ${moduleBadge(f.reg)}`}>{f.reg}</span></td>
                    <td style={{ maxWidth: 280 }}>
                      <div style={{ fontSize: 13, color: 'var(--text-primary)', lineHeight: 1.4 }}>{f.title}</div>
                    </td>
                    <td><span className={`badge ${severityBadge(f.severity)}`}>{f.severity}</span></td>
                    <td style={{ color: 'var(--text-secondary)', fontSize: 12 }}>{f.assigned}</td>
                    <td style={{ color: f.status === 'Overdue' ? '#ef4444' : 'var(--text-secondary)', fontSize: 12, fontWeight: f.status === 'Overdue' ? 600 : 400 }}>
                      {f.due}
                    </td>
                    <td><span className={`badge ${statusBadge(f.status)}`}>{f.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Regulatory calendar */}
        <div className="card">
          <div className="section-header" style={{ marginBottom: 12 }}>
            <div className="section-title">Regulatory Calendar</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 380, overflowY: 'auto' }}>
            {CALENDAR.map((c, i) => (
              <div key={i} style={{
                display: 'flex', gap: 10,
                padding: '10px 12px',
                background: c.urgency === 'high' ? 'rgba(239,68,68,0.06)' : 'var(--bg-elevated)',
                border: `1px solid ${c.urgency === 'high' ? 'rgba(239,68,68,0.2)' : 'var(--border)'}`,
                borderRadius: 8,
              }}>
                <div style={{ flexShrink: 0, textAlign: 'center', minWidth: 46 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: c.urgency === 'high' ? '#ef4444' : 'var(--text-muted)', letterSpacing: '0.04em' }}>
                    {c.date.split(',')[0].toUpperCase().slice(0, 6)}
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.1 }}>
                    {c.date.match(/\d+/)?.[0]}
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.3, marginBottom: 4 }}>
                    {c.event}
                  </div>
                  <span className={`badge ${calendarBadge(c.type)}`}>{c.type}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Row 3: Exam readiness + Audit log ───────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: 20 }}>

        {/* Exam readiness */}
        <div className="card">
          <div className="section-header" style={{ marginBottom: 16 }}>
            <div>
              <div className="section-title">Exam Readiness</div>
              <div className="section-sub">CFPB review estimated May 2026</div>
            </div>
            <span className="badge badge-purple">6 Areas</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {EXAM_AREAS.map((a, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                  <span style={{ fontSize: 13, color: 'var(--text-primary)' }}>{a.name}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: scoreColor(a.readiness) }}>{a.readiness}%</span>
                </div>
                <div style={{ height: 6, background: 'var(--border)', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{
                    width: `${a.readiness}%`, height: '100%',
                    background: scoreColor(a.readiness),
                    borderRadius: 3, transition: 'width 0.4s',
                  }} />
                </div>
              </div>
            ))}
          </div>

          <div style={{
            marginTop: 16, padding: '12px 14px',
            background: 'rgba(139,92,246,0.08)',
            border: '1px solid rgba(139,92,246,0.25)',
            borderRadius: 8,
            fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5,
          }}>
            💡 Focus on <strong style={{ color: 'var(--text-primary)' }}>Adverse Action Logs</strong> (74%) and{' '}
            <strong style={{ color: 'var(--text-primary)' }}>LO Training Records</strong> (88%) before the May exam.
          </div>
        </div>

        {/* Audit trail */}
        <div className="card">
          <div className="section-header" style={{ marginBottom: 12 }}>
            <div>
              <div className="section-title">Compliance Audit Trail</div>
              <div className="section-sub">Last 10 recorded actions</div>
            </div>
            <button className="btn btn-secondary btn-sm">View All Logs</button>
          </div>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>Module</th>
                  <th>User</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {AUDIT_LOG.map((l, i) => (
                  <tr key={i}>
                    <td style={{ fontFamily: 'monospace', fontSize: 11, whiteSpace: 'nowrap', color: 'var(--text-muted)' }}>{l.ts}</td>
                    <td><span className={`badge ${moduleBadge(l.module)}`}>{l.module}</span></td>
                    <td style={{ fontSize: 12, color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
                      {l.user === 'Compliance Bot' ? (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                          <span style={{ fontSize: 11 }}>🤖</span> {l.user}
                        </span>
                      ) : l.user}
                    </td>
                    <td style={{ fontSize: 12, color: 'var(--text-primary)', lineHeight: 1.4 }}>{l.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Sub-components ──────────────────────────────────────────────────── */

function StatCard({ icon, label, value, sub, color, trend, trendUp, urgent }) {
  return (
    <div className="card" style={{ position: 'relative', overflow: 'hidden' }}>
      {urgent && (
        <div style={{
          position: 'absolute', top: 0, right: 0, left: 0, height: 3,
          background: 'linear-gradient(90deg, #f59e0b, #ef4444)',
        }} />
      )}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
        <div style={{
          width: 38, height: 38, borderRadius: 9,
          background: `${color}22`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18
        }}>{icon}</div>
        {trend && (
          <span style={{ fontSize: 11, color: trendUp ? '#10b981' : '#ef4444', fontWeight: 600 }}>
            {trendUp ? '↑' : '↓'} {trend}
          </span>
        )}
      </div>
      <div style={{ fontSize: 26, fontWeight: 800, color, lineHeight: 1, marginBottom: 4 }}>{value}</div>
      <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)' }}>{label}</div>
      {sub && <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 3 }}>{sub}</div>}
    </div>
  )
}
