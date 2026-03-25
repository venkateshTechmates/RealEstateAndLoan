import { useState, useMemo } from 'react'

const PROGRAMS = {
  Conventional: { name: 'Conventional', minDown: 3, minCredit: 620, maxDTI: 45, basePmiRate: 0.9, label: 'Conventional', color: '#3b82f6', desc: 'Best for strong credit and 20%+ down payment to avoid PMI' },
  FHA:          { name: 'FHA',           minDown: 3.5, minCredit: 580, maxDTI: 57, basePmiRate: 0.55, label: 'FHA',  color: '#4ade80', desc: 'Lower down payment & credit requirements; MIP required' },
  VA:           { name: 'VA',            minDown: 0, minCredit: 580, maxDTI: 60, basePmiRate: 0, label: 'VA',       color: '#a78bfa', desc: 'No down payment for eligible veterans; no monthly PMI' },
  Jumbo:        { name: 'Jumbo',         minDown: 10, minCredit: 720, maxDTI: 43, basePmiRate: 0, label: 'Jumbo',   color: '#f59e0b', desc: 'For loan amounts above $766,550; stricter requirements' },
}

function calcMonthlyPayment(principal, annualRate, termYears) {
  const r = annualRate / 100 / 12
  const n = termYears * 12
  if (r === 0) return principal / n
  return Math.round(principal * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1))
}

function getRateForProgram(prog, creditScore, ltv) {
  const base = prog === 'Conventional' ? 6.875 : prog === 'FHA' ? 6.625 : prog === 'VA' ? 6.375 : 7.125
  const creditAdj = creditScore >= 780 ? -0.375 : creditScore >= 740 ? -0.25 : creditScore >= 700 ? -0.125 : creditScore >= 660 ? 0 : 0.25
  const ltvAdj = ltv > 95 ? 0.5 : ltv > 90 ? 0.25 : ltv > 80 ? 0.125 : 0
  return Math.max(0, base + creditAdj + ltvAdj)
}

export default function PreQualCalculator() {
  const [form, setForm] = useState({
    annualIncome: 120000, monthlyDebts: 800, propertyValue: 500000,
    downPayment: 50000, creditScore: 740, loanTerm: 30,
  })

  const upd = (k, v) => setForm(f => ({ ...f, [k]: parseFloat(v) || 0 }))

  const results = useMemo(() => {
    const { annualIncome, monthlyDebts, propertyValue, downPayment, creditScore, loanTerm } = form
    const loanAmount = Math.max(0, propertyValue - downPayment)
    const ltv = Math.round(loanAmount / propertyValue * 100)
    const grossMonthly = annualIncome / 12
    const maxLoan = Math.round(grossMonthly * 0.45 * 12 * loanTerm / 15)

    return Object.entries(PROGRAMS).map(([key, prog]) => {
      const rate = getRateForProgram(key, creditScore, ltv)
      const monthly = calcMonthlyPayment(loanAmount, rate, loanTerm)
      const pmi = ltv > 80 && key !== 'VA' ? Math.round(loanAmount * prog.basePmiRate / 100 / 12) : 0
      const taxes = Math.round(propertyValue * 0.018 / 12)
      const insurance = Math.round(propertyValue * 0.0035 / 12)
      const totalMonthly = monthly + pmi + taxes + insurance
      const dti = grossMonthly > 0 ? Math.round((monthlyDebts + totalMonthly) / grossMonthly * 100) : 0
      const eligible = creditScore >= prog.minCredit && downPayment >= propertyValue * prog.minDown / 100 && dti <= prog.maxDTI
      return { key, ...prog, rate, loanAmount, ltv, monthly, pmi, taxes, insurance, totalMonthly, dti, eligible, maxLoan }
    })
  }, [form])

  const { annualIncome, monthlyDebts, propertyValue, downPayment, creditScore, loanTerm } = form
  const loanAmount = Math.max(0, propertyValue - downPayment)
  const ltv = Math.round(loanAmount / propertyValue * 100)
  const grossMonthly = annualIncome / 12
  const downPct = Math.round(downPayment / propertyValue * 100)

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800 }}>Pre-Qualification Calculator</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 4 }}>Estimate loan eligibility and monthly payments across programs</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: 20, alignItems: 'start' }}>
        {/* Input Panel */}
        <div className="card" style={{ position: 'sticky', top: 20 }}>
          <div style={{ fontWeight: 700, marginBottom: 16 }}>Loan Scenario</div>
          {[
            { label: 'Annual Gross Income', key: 'annualIncome', prefix: '$', min: 0, max: 2000000, step: 1000 },
            { label: 'Monthly Obligations', key: 'monthlyDebts', prefix: '$', min: 0, max: 20000, step: 100 },
            { label: 'Property Value', key: 'propertyValue', prefix: '$', min: 50000, max: 10000000, step: 5000 },
            { label: 'Down Payment', key: 'downPayment', prefix: '$', min: 0, max: 5000000, step: 1000 },
          ].map(f => (
            <div key={f.key} className="form-group">
              <label className="form-label" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{f.label.toUpperCase()}</span>
                <span style={{ color: '#60a5fa', fontWeight: 800 }}>{f.prefix}{form[f.key].toLocaleString()}</span>
              </label>
              <input type="range" min={f.min} max={f.max} step={f.step} value={form[f.key]}
                onChange={e => upd(f.key, e.target.value)}
                style={{ width: '100%', accentColor: '#3b82f6', cursor: 'pointer' }} />
            </div>
          ))}

          <div className="form-group">
            <label className="form-label" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>CREDIT SCORE ESTIMATE</span>
              <span style={{ color: creditScore >= 740 ? '#4ade80' : creditScore >= 680 ? '#facc15' : '#f87171', fontWeight: 800 }}>{creditScore}</span>
            </label>
            <input type="range" min={500} max={850} step={10} value={creditScore}
              onChange={e => upd('creditScore', e.target.value)}
              style={{ width: '100%', accentColor: '#3b82f6', cursor: 'pointer' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-muted)', marginTop: 3 }}>
              <span>Poor</span><span>Fair</span><span>Good</span><span>Excellent</span>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">LOAN TERM</label>
            <div style={{ display: 'flex', gap: 10 }}>
              {[10, 15, 20, 30].map(y => (
                <button key={y} onClick={() => upd('loanTerm', y)}
                  style={{ flex: 1, padding: '7px 0', borderRadius: 8, border: `1px solid ${loanTerm === y ? '#3b82f6' : 'var(--border)'}`, background: loanTerm === y ? 'rgba(59,130,246,0.15)' : 'transparent', color: loanTerm === y ? '#60a5fa' : 'var(--text-muted)', fontSize: 13, fontWeight: loanTerm === y ? 700 : 400, cursor: 'pointer' }}>
                  {y}yr
                </button>
              ))}
            </div>
          </div>

          {/* Quick summary */}
          <div style={{ background: 'var(--bg-base)', borderRadius: 10, padding: 14, marginTop: 4 }}>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8, fontWeight: 700 }}>LOAN SUMMARY</div>
            {[
              ['Loan Amount', `$${loanAmount.toLocaleString()}`],
              ['Down Payment', `$${downPayment.toLocaleString()} (${downPct}%)`],
              ['LTV Ratio', `${ltv}%`],
              ['Gross Monthly Income', `$${Math.round(grossMonthly).toLocaleString()}`],
            ].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, padding: '4px 0' }}>
                <span style={{ color: 'var(--text-muted)' }}>{k}</span>
                <span style={{ fontWeight: 700 }}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Results Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 2 }}>Program Comparison — {loanTerm}-Year Fixed</div>
          {results.map(r => (
            <div key={r.key} className="card" style={{ border: `1px solid ${r.eligible ? r.color + '40' : 'var(--border)'}`, opacity: r.eligible ? 1 : 0.6, position: 'relative' }}>
              {!r.eligible && (
                <div style={{ position: 'absolute', top: 12, right: 14, fontSize: 11, color: '#f87171', fontWeight: 700 }}>
                  ✗ Not Eligible
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <div style={{ width: 42, height: 42, borderRadius: 10, background: `${r.color}22`, border: `2px solid ${r.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, color: r.color }}>{r.label}</div>
                  <div>
                    <div style={{ fontWeight: 800, color: r.color, fontSize: 14 }}>{r.name} Loan</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{r.desc}</div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 22, fontWeight: 900, color: r.eligible ? r.color : 'var(--text-muted)' }}>{r.rate.toFixed(3)}%</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Est. Rate</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10 }}>
                {[
                  ['P&I', `$${r.monthly.toLocaleString()}`, 'var(--text-primary)'],
                  ['PMI/MIP', r.pmi > 0 ? `$${r.pmi}/mo` : 'None', r.pmi > 0 ? '#fb923c' : '#4ade80'],
                  ['Taxes/Ins', `$${(r.taxes + r.insurance).toLocaleString()}/mo`, 'var(--text-secondary)'],
                  ['Total Monthly', `$${r.totalMonthly.toLocaleString()}`, r.eligible ? r.color : '#f87171'],
                  ['Est. DTI', `${r.dti}%`, r.dti > r.maxDTI ? '#f87171' : r.dti > 40 ? '#facc15' : '#4ade80'],
                ].map(([label, value, color]) => (
                  <div key={label} style={{ background: 'var(--bg-elevated)', borderRadius: 8, padding: '10px 8px', textAlign: 'center' }}>
                    <div style={{ fontSize: 14, fontWeight: 800, color, marginBottom: 3 }}>{value}</div>
                    <div style={{ fontSize: 10, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
                  </div>
                ))}
              </div>

              {r.eligible && (
                <div style={{ marginTop: 12, display: 'flex', gap: 10, paddingTop: 12, borderTop: '1px solid var(--border)' }}>
                  <button className="btn btn-primary" style={{ fontSize: 13 }}>Apply for {r.name} Loan →</button>
                  <button className="btn btn-ghost" style={{ fontSize: 13 }}>Get Rate Quote</button>
                </div>
              )}

              {!r.eligible && (
                <div style={{ marginTop: 10 }}>
                  <div style={{ fontSize: 12, color: '#f87171', paddingTop: 10, borderTop: '1px solid var(--border)' }}>
                    Requirements: Min credit {r.minCredit} · Min down {r.minDown}% · Max DTI {r.maxDTI}%
                  </div>
                </div>
              )}
            </div>
          ))}

          <div className="card" style={{ background: 'rgba(59,130,246,0.05)', border: '1px solid rgba(59,130,246,0.15)' }}>
            <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
              ℹ️ Rate estimates are illustrative and based on current market conditions. Actual rates depend on full application review, appraisal, and lender guidelines. Taxes and insurance are estimated.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
