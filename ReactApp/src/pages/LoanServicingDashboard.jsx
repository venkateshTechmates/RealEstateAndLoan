import { useState } from 'react'

const LOAN = {
  loanNo: 'SVC-2025-00482',
  borrower: 'Marcus Johnson',
  address: '789 Maple Dr, Austin TX 78750',
  originalBalance: 485000,
  currentBalance: 483215,
  rate: 6.875,
  payment: 3184,
  nextDue: 'Jul 1, 2025',
  origDate: 'May 8, 2025',
  maturity: 'Jun 1, 2055',
  escrowBalance: 6820,
  pmi: 142,
}

const PAYMENT_HISTORY = [
  { date: 'Jun 2025', due: 3184, paid: 3184, principal: 402, interest: 2782, escrow: 0, pmtType: 'Auto', status: 'Posted' },
  { date: 'Jul 2025', due: 3184, paid: 3184, principal: 404, interest: 2780, escrow: 0, pmtType: 'Auto', status: 'Posted' },
  { date: 'Aug 2025', due: 3184, paid: 3184, principal: 406, interest: 2778, escrow: 0, pmtType: 'Online', status: 'Posted' },
  { date: 'Sep 2025', due: 3184, paid: 3184, principal: 408, interest: 2776, escrow: 0, pmtType: 'Auto', status: 'Posted' },
  { date: 'Oct 2025', due: 3184, paid: 3184, principal: 410, interest: 2774, escrow: 0, pmtType: 'Auto', status: 'Posted' },
  { date: 'Nov 2025', due: 3326, paid: 3326, principal: 412, interest: 2772, escrow: 142, pmtType: 'Auto', status: 'Posted' },
  { date: 'Dec 2025', due: 3326, paid: 3326, principal: 414, interest: 2770, escrow: 142, pmtType: 'Auto', status: 'Posted' },
]

const ESCROW = {
  balance: 6820,
  monthlyContrib: 1022,
  projItems: [
    { label: "Homeowner's Insurance", annual: 2280, monthly: 190, nextDue: 'May 1, 2026', paid: false },
    { label: 'Property Tax (Spring)', annual: 4900, monthly: 408, nextDue: 'Apr 1, 2026', paid: false },
    { label: 'Property Tax (Fall)', annual: 4900, monthly: 408, nextDue: 'Oct 1, 2025', paid: true },
    { label: 'Flood Insurance', annual: 850, monthly: 71, nextDue: 'May 1, 2026', paid: false },
  ],
}

export default function LoanServicingDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [makePayAmt, setMakePayAmt] = useState('3326')
  const [payConfirm, setPayConfirm] = useState(false)
  const [payoffMonths, setPayoffMonths] = useState(0)

  const payoffBalance = LOAN.currentBalance * (1 + (LOAN.rate / 100 / 366) * 30) + 50 // 30 days interest + fee

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800 }}>Loan Servicing</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 4 }}>{LOAN.loanNo} · {LOAN.borrower} · {LOAN.address}</p>
        </div>
        <span className="badge badge-green" style={{ padding: '8px 14px', fontSize: 13 }}>● Current — Good Standing</span>
      </div>

      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 24 }}>
        {[
          { label: 'Current Balance', value: `$${LOAN.currentBalance.toLocaleString()}`, sub: `of $${LOAN.originalBalance.toLocaleString()} original`, color: '#60a5fa' },
          { label: 'Monthly Payment', value: `$${LOAN.payment.toLocaleString()}`, sub: 'P&I + PMI', color: '#a78bfa' },
          { label: 'Next Due Date', value: LOAN.nextDue, sub: 'No late fees', color: '#4ade80' },
          { label: 'Escrow Balance', value: `$${LOAN.escrowBalance.toLocaleString()}`, sub: `+$${ESCROW.monthlyContrib}/mo collected`, color: '#fb923c' },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
            <div className="stat-label">{s.label}</div>
            <div className="stat-sub">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="tab-group" style={{ marginBottom: 24 }}>
        {['overview', 'payments', 'escrow', 'payoff'].map(t => (
          <button key={t} className={`tab-btn${activeTab === t ? ' active' : ''}`} onClick={() => setActiveTab(t)}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <div className="card">
            <div style={{ fontWeight: 700, marginBottom: 14 }}>Loan Details</div>
            {[
              ['Loan Number', LOAN.loanNo],
              ['Original Balance', `$${LOAN.originalBalance.toLocaleString()}`],
              ['Current Balance', `$${LOAN.currentBalance.toLocaleString()}`],
              ['Interest Rate', `${LOAN.rate}% (Fixed)`],
              ['Loan Type', 'Conventional 30yr Fixed'],
              ['Origination Date', LOAN.origDate],
              ['Maturity Date', LOAN.maturity],
              ['Monthly P&I', `$${(LOAN.payment - LOAN.pmi).toLocaleString()}`],
              ['PMI Monthly', `$${LOAN.pmi}`],
              ['Escrow Monthly', `$${ESCROW.monthlyContrib}`],
              ['Total Monthly', `$${(LOAN.payment + ESCROW.monthlyContrib).toLocaleString()}`],
            ].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid var(--border)', fontSize: 13 }}>
                <span style={{ color: 'var(--text-muted)' }}>{k}</span>
                <span style={{ fontWeight: 600 }}>{v}</span>
              </div>
            ))}
          </div>
          <div>
            {/* Balance progress */}
            <div className="card" style={{ marginBottom: 16 }}>
              <div style={{ fontWeight: 700, marginBottom: 10 }}>Balance Paydown Progress</div>
              <div style={{ marginBottom: 6, fontSize: 12, color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between' }}>
                <span>Principal paid: ${(LOAN.originalBalance - LOAN.currentBalance).toLocaleString()}</span>
                <span>{(((LOAN.originalBalance - LOAN.currentBalance) / LOAN.originalBalance) * 100).toFixed(1)}%</span>
              </div>
              <div style={{ height: 12, background: 'var(--border)', borderRadius: 12 }}>
                <div style={{ height: 12, borderRadius: 12, width: `${((LOAN.originalBalance - LOAN.currentBalance) / LOAN.originalBalance) * 100}%`, background: 'linear-gradient(90deg, #3b82f6, #4ade80)' }} />
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 6 }}>Remaining: ${LOAN.currentBalance.toLocaleString()} · Est. payoff: {LOAN.maturity}</div>
            </div>

            {/* Quick pay */}
            <div className="card">
              <div style={{ fontWeight: 700, marginBottom: 14 }}>Make a Payment</div>
              <div className="form-group">
                <label className="form-label">PAYMENT AMOUNT</label>
                <input value={makePayAmt} onChange={e => setMakePayAmt(e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">PAYMENT DATE</label>
                <input type="date" defaultValue="2026-01-01" />
              </div>
              {payConfirm ? (
                <div className="alert alert-success" style={{ marginTop: 8 }}>
                  ✅ Payment of ${parseFloat(makePayAmt).toLocaleString()} scheduled for processing.
                </div>
              ) : (
                <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 4 }} onClick={() => setPayConfirm(true)}>
                  💳 Submit Payment
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'payments' && (
        <div className="card" style={{ padding: 0 }}>
          <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 700 }}>Payment History</span>
            <button className="btn btn-ghost" style={{ fontSize: 12, color: '#60a5fa' }}>⬇ Download Statement</button>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--bg-elevated)' }}>
                {['Date', 'Amount Paid', 'Principal', 'Interest', 'Escrow', 'Method', 'Status'].map(h => (
                  <th key={h} style={{ padding: '12px 14px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', borderBottom: '1px solid var(--border)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...PAYMENT_HISTORY].reverse().map((p, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '12px 14px', fontSize: 13, fontWeight: 600 }}>{p.date}</td>
                  <td style={{ padding: '12px 14px', fontSize: 13, fontWeight: 700 }}>${p.paid.toLocaleString()}</td>
                  <td style={{ padding: '12px 14px', fontSize: 13, color: '#4ade80' }}>${p.principal}</td>
                  <td style={{ padding: '12px 14px', fontSize: 13 }}>${p.interest.toLocaleString()}</td>
                  <td style={{ padding: '12px 14px', fontSize: 13, color: '#fb923c' }}>{p.escrow > 0 ? `$${p.escrow}` : '—'}</td>
                  <td style={{ padding: '12px 14px', fontSize: 12, color: 'var(--text-secondary)' }}>{p.pmtType}</td>
                  <td style={{ padding: '12px 14px' }}><span className="badge badge-green" style={{ fontSize: 11 }}>{p.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'escrow' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <div>
            <div className="card" style={{ marginBottom: 16 }}>
              <div style={{ fontWeight: 700, marginBottom: 14 }}>Escrow Account Summary</div>
              {[
                ['Current Escrow Balance', `$${ESCROW.balance.toLocaleString()}`],
                ['Monthly Contribution', `$${ESCROW.monthlyContrib}`],
                ['Annual Escrow Total', `$${(ESCROW.monthlyContrib * 12).toLocaleString()}`],
                ['Required Escrow Cushion', `$${(ESCROW.monthlyContrib * 2).toLocaleString()} (2 months)`],
                ['Surplus / (Shortage)', ESCROW.balance - ESCROW.monthlyContrib * 2 > 0 ? `+$${(ESCROW.balance - ESCROW.monthlyContrib * 2).toLocaleString()} surplus` : `Shortage`],
              ].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid var(--border)', fontSize: 13 }}>
                  <span style={{ color: 'var(--text-muted)' }}>{k}</span>
                  <span style={{ fontWeight: 700, color: v.includes('surplus') ? '#4ade80' : v.includes('Shortage') ? '#f87171' : 'var(--text-primary)' }}>{v}</span>
                </div>
              ))}
            </div>
            <div className="alert alert-success">
              <span>✅</span>
              <span>Escrow account is adequately funded per RESPA requirements.</span>
            </div>
          </div>

          <div className="card">
            <div style={{ fontWeight: 700, marginBottom: 14 }}>Escrow Disbursement Schedule</div>
            {ESCROW.projItems.map(item => (
              <div key={item.label} style={{ background: 'var(--bg-elevated)', borderRadius: 8, padding: 12, marginBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                  <div style={{ fontSize: 13, fontWeight: 700 }}>{item.label}</div>
                  {item.paid && <span className="badge badge-green" style={{ fontSize: 11 }}>Paid</span>}
                  {!item.paid && <span className="badge badge-orange" style={{ fontSize: 11 }}>Upcoming</span>}
                </div>
                <div style={{ display: 'flex', gap: 16, fontSize: 12, color: 'var(--text-muted)' }}>
                  <span>Annual: ${item.annual.toLocaleString()}</span>
                  <span>Monthly: ${item.monthly}/mo</span>
                  <span>Next due: {item.nextDue}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'payoff' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <div className="card">
            <div style={{ fontWeight: 700, marginBottom: 14 }}>Payoff Quote</div>
            <div className="form-group">
              <label className="form-label">ADDITIONAL MONTHS TO ADD</label>
              <input type="number" placeholder="0" min="0" max="60" value={payoffMonths} onChange={e => setPayoffMonths(parseInt(e.target.value) || 0)} />
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>Payoff quotes are valid for 30 days from generation date.</div>
            </div>
            <div style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: 10, padding: 16, marginTop: 8 }}>
              {[
                ['Current Principal Balance', `$${LOAN.currentBalance.toLocaleString()}`],
                ['Accrued Interest (30 days)', `$${Math.round((LOAN.currentBalance * LOAN.rate / 100 / 365) * 30).toLocaleString()}`],
                ['Payoff Fee', '$50.00'],
                ['TOTAL PAYOFF AMOUNT', `$${Math.round(payoffBalance + payoffMonths * LOAN.payment * 0.1).toLocaleString()}`],
                ['Good Through', 'June 7, 2026'],
              ].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid rgba(59,130,246,0.15)', fontSize: 13 }}>
                  <span style={{ color: 'var(--text-muted)' }}>{k}</span>
                  <span style={{ fontWeight: k === 'TOTAL PAYOFF AMOUNT' ? 800 : 600, fontSize: k === 'TOTAL PAYOFF AMOUNT' ? 15 : 13, color: k === 'TOTAL PAYOFF AMOUNT' ? '#60a5fa' : 'var(--text-primary)' }}>{v}</span>
                </div>
              ))}
            </div>
            <button className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center', marginTop: 16 }}>📄 Download Payoff Letter</button>
          </div>

          <div className="card">
            <div style={{ fontWeight: 700, marginBottom: 14 }}>PMI Removal Eligibility</div>
            <div style={{ marginBottom: 6, fontSize: 13, color: 'var(--text-muted)' }}>PMI is required until LTV reaches 80% based on original value</div>
            <div style={{ height: 12, background: 'var(--border)', borderRadius: 12, marginBottom: 6 }}>
              <div style={{ height: 12, width: `${((LOAN.originalBalance - LOAN.currentBalance) / (LOAN.originalBalance * 0.2)) * 100}%`, background: '#a78bfa', borderRadius: 12, maxWidth: '100%' }} />
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 20 }}>Progress to 80% LTV: {(((LOAN.originalBalance - LOAN.currentBalance) / (LOAN.originalBalance * 0.2)) * 100).toFixed(1)}% complete</div>
            {[
              ['Original Value (Appraised)', `$590,000`],
              ['80% Threshold Balance', `$${(590000 * 0.8).toLocaleString()}`],
              ['Current Balance', `$${LOAN.currentBalance.toLocaleString()}`],
              ['Balance Required to Remove PMI', `$${(LOAN.currentBalance - 590000 * 0.8).toLocaleString()}`],
              ['Est. PMI Removal Date', 'Feb 2044 (standard schedule)'],
            ].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid var(--border)', fontSize: 13 }}>
                <span style={{ color: 'var(--text-muted)' }}>{k}</span>
                <span style={{ fontWeight: 600 }}>{v}</span>
              </div>
            ))}
            <div className="alert alert-info" style={{ marginTop: 14, fontSize: 12, background: 'rgba(96,165,250,0.08)', border: '1px solid rgba(96,165,250,0.2)' }}>
              💡 Making extra principal payments accelerates PMI removal and reduces total interest paid.
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
