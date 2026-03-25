import { useState } from 'react'

const CLOSING_DATE = 'May 8, 2025'
const CD_SENT = 'May 5, 2025'

const CHECKLIST = [
  { id: 'C01', category: 'Title', item: 'Title search completed', status: 'Complete', assignee: 'Old Republic Title', due: 'Apr 20' },
  { id: 'C02', category: 'Title', item: 'Title commitment issued', status: 'Complete', assignee: 'Old Republic Title', due: 'Apr 22' },
  { id: 'C03', category: 'Appraisal', item: 'Appraisal ordered and received', status: 'Complete', assignee: 'AMC – Premier', due: 'Apr 18' },
  { id: 'C04', category: 'Insurance', item: "Homeowner's insurance certificate received", status: 'Complete', assignee: 'Marcus Johnson', due: 'Apr 28' },
  { id: 'C05', category: 'Insurance', item: 'Flood insurance certificate received', status: 'In Progress', assignee: 'Marcus Johnson', due: 'May 3' },
  { id: 'C06', category: 'Documents', item: 'All UW conditions cleared', status: 'Complete', assignee: 'David Park (UW)', due: 'May 1' },
  { id: 'C07', category: 'Documents', item: 'Final loan approval issued (CTC)', status: 'Complete', assignee: 'David Park (UW)', due: 'May 1' },
  { id: 'C08', category: 'Closing', item: 'Closing Disclosure sent to borrower', status: 'Complete', assignee: 'Closer – Janet Wu', due: 'May 5' },
  { id: 'C09', category: 'Closing', item: '3-business-day waiting period', status: 'In Progress', assignee: 'System', due: 'May 8 (closing day)' },
  { id: 'C10', category: 'Closing', item: 'Borrower signs closing documents', status: 'Pending', assignee: 'Marcus & Sarah Johnson', due: 'May 8' },
  { id: 'C11', category: 'Wire', item: 'Borrower wire/cashier check confirmed', status: 'Pending', assignee: 'Marcus Johnson', due: 'May 8' },
  { id: 'C12', category: 'Wire', item: 'Lender funding wire initiated', status: 'Pending', assignee: 'Funding Dept', due: 'May 8' },
  { id: 'C13', category: 'Recording', item: 'Documents sent for county recording', status: 'Pending', assignee: 'Old Republic Title', due: 'May 9' },
  { id: 'C14', category: 'Recording', item: 'Recorded deed returned to borrower', status: 'Pending', assignee: 'Old Republic Title', due: 'May 16' },
]

const CD_LINE_ITEMS = [
  { section: 'A', label: 'Loan Origination Fee (0.5%)', borrower: 2425, seller: 0 },
  { section: 'B', label: 'Appraisal Fee', borrower: 650, seller: 0 },
  { section: 'B', label: 'Credit Report', borrower: 35, seller: 0 },
  { section: 'E', label: 'Owner Title Insurance', borrower: 0, seller: 1750 },
  { section: 'E', label: "Lender Title Insurance", borrower: 1420, seller: 0 },
  { section: 'E', label: 'Settlement Service Fee', borrower: 850, seller: 0 },
  { section: 'F', label: 'Recording Fees', borrower: 220, seller: 0 },
  { section: 'G', label: 'TX Transfer Tax', borrower: 0, seller: 540 },
  { section: 'Prepaids', label: "Homeowner's Insurance Premium (1yr)", borrower: 2280, seller: 0 },
  { section: 'Prepaids', label: 'Prepaid Interest (30 days)', borrower: 2780, seller: 0 },
  { section: 'Prepaids', label: 'HOI Escrow (3 months)', borrower: 570, seller: 0 },
  { section: 'Prepaids', label: 'Property Tax Escrow (5 months)', borrower: 4083, seller: 0 },
  { section: 'Credits', label: 'Earnest Money Deposit', borrower: -5000, seller: 0 },
  { section: 'Credits', label: 'Seller Credit (closing costs)', borrower: -3000, seller: 0 },
]

const STATUS_COLOR = { Complete: '#4ade80', 'In Progress': '#60a5fa', Pending: '#475569', Waived: '#94a3b8' }

export default function ClosingDisbursement() {
  const [activeTab, setActiveTab] = useState('checklist')
  const [wireInitiated, setWireInitiated] = useState(false)

  const completedItems = CHECKLIST.filter(c => c.status === 'Complete').length
  const totalItems = CHECKLIST.length
  const progressPct = Math.round((completedItems / totalItems) * 100)

  const borrowerTotal = CD_LINE_ITEMS.reduce((s, l) => s + l.borrower, 0) + 55000 // down payment
  const sellerTotal = CD_LINE_ITEMS.reduce((s, l) => s + l.seller, 0)

  // CD Countdown — 3 business days from May 5
  const cdDaysRemaining = 3 // mocked

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800 }}>Closing & Disbursement</h1>
          <p style={{ color: '#64748b', fontSize: 13, marginTop: 4 }}>Loan LA-001 · Marcus Johnson · Closing: <strong style={{ color: '#4ade80' }}>{CLOSING_DATE}</strong></p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          {!wireInitiated && <button className="btn btn-primary" onClick={() => setWireInitiated(true)} style={{ background: 'rgba(74,222,128,0.15)', borderColor: '#4ade80', color: '#4ade80' }}>💸 Initiate Funding Wire</button>}
          {wireInitiated && <span className="badge badge-green" style={{ padding: '8px 16px', fontSize: 13 }}>✓ Funding Wire Initiated</span>}
        </div>
      </div>

      {/* CD countdown banner */}
      <div style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.3)', borderRadius: 12, padding: 16, marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontWeight: 700, color: '#60a5fa', fontSize: 14 }}>Closing Disclosure 3-Day Waiting Period</div>
          <div style={{ fontSize: 13, color: '#94a3b8', marginTop: 4 }}>CD delivered: {CD_SENT} · Earliest closing: {CLOSING_DATE}</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 32, fontWeight: 900, color: '#60a5fa' }}>{cdDaysRemaining}</div>
          <div style={{ fontSize: 11, color: '#64748b', textTransform: 'uppercase' }}>Business Days Left</div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="card" style={{ padding: 16, marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
          <span style={{ fontWeight: 700 }}>Closing Progress</span>
          <span style={{ color: '#4ade80', fontWeight: 700 }}>{completedItems}/{totalItems} tasks complete</span>
        </div>
        <div style={{ height: 10, background: '#334155', borderRadius: 10 }}>
          <div style={{ height: 10, borderRadius: 10, width: `${progressPct}%`, background: 'linear-gradient(90deg, #3b82f6, #4ade80)', transition: 'width 0.4s' }} />
        </div>
        <div style={{ display: 'flex', gap: 20, marginTop: 12, fontSize: 12 }}>
          {['Complete', 'In Progress', 'Pending'].map(s => (
            <span key={s} style={{ display: 'flex', alignItems: 'center', gap: 6, color: STATUS_COLOR[s] }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: STATUS_COLOR[s] }} />
              {CHECKLIST.filter(c => c.status === s).length} {s}
            </span>
          ))}
        </div>
      </div>

      <div className="tab-group" style={{ marginBottom: 24 }}>
        {['checklist', 'cd-review', 'wire', 'title'].map(t => (
          <button key={t} className={`tab-btn${activeTab === t ? ' active' : ''}`} onClick={() => setActiveTab(t)}>
            {t === 'cd-review' ? 'CD Review' : t === 'wire' ? 'Wire / Funds' : t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === 'checklist' && (
        <div className="card" style={{ padding: 0 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#1e293b' }}>
                {['Category', 'Task', 'Assignee', 'Due Date', 'Status'].map(h => (
                  <th key={h} style={{ padding: '12px 14px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#475569', textTransform: 'uppercase', borderBottom: '1px solid #334155' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CHECKLIST.map(c => (
                <tr key={c.id} style={{ borderBottom: '1px solid #1e293b', opacity: c.status === 'Complete' ? 0.7 : 1 }}>
                  <td style={{ padding: '12px 14px' }}>
                    <span className="badge" style={{ background: '#334155', color: '#94a3b8', fontSize: 11 }}>{c.category}</span>
                  </td>
                  <td style={{ padding: '12px 14px', fontSize: 13 }}>
                    {c.status === 'Complete' && <span style={{ marginRight: 8, color: '#4ade80' }}>✓</span>}
                    {c.item}
                  </td>
                  <td style={{ padding: '12px 14px', fontSize: 12, color: '#64748b' }}>{c.assignee}</td>
                  <td style={{ padding: '12px 14px', fontSize: 12, color: '#64748b' }}>{c.due}</td>
                  <td style={{ padding: '12px 14px' }}>
                    <span className="badge" style={{ background: `${STATUS_COLOR[c.status]}22`, color: STATUS_COLOR[c.status], fontSize: 11 }}>{c.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'cd-review' && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 20 }}>
            {[
              { label: 'Loan Amount', value: '$485,000' },
              { label: 'Total Closing Costs (Borrower)', value: `$${(CD_LINE_ITEMS.filter(l => l.borrower > 0).reduce((s, l) => s + l.borrower, 0)).toLocaleString()}` },
              { label: 'Cash to Close (est.)', value: `$${borrowerTotal.toLocaleString()}` },
            ].map(s => (
              <div key={s.label} className="stat-card">
                <div style={{ fontSize: 18, fontWeight: 800 }}>{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="card" style={{ padding: 0 }}>
            <div style={{ padding: '14px 16px', borderBottom: '1px solid #334155', fontWeight: 700 }}>Closing Disclosure — Settlement Statement (Preview)</div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#1e293b' }}>
                  {['Sec', 'Description', 'Borrower', 'Seller'].map(h => (
                    <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontSize: 11, color: '#475569', borderBottom: '1px solid #334155' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr style={{ background: 'rgba(59,130,246,0.06)' }}>
                  <td style={{ padding: '10px 14px', fontSize: 12, fontWeight: 700, color: '#60a5fa' }}>—</td>
                  <td style={{ padding: '10px 14px', fontSize: 13, fontWeight: 700 }}>Down Payment (10%)</td>
                  <td style={{ padding: '10px 14px', fontSize: 13, fontWeight: 700 }}>$55,000</td>
                  <td style={{ padding: '10px 14px', fontSize: 13, color: '#475569' }}>—</td>
                </tr>
                {CD_LINE_ITEMS.map((l, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #1e293b' }}>
                    <td style={{ padding: '10px 14px', fontSize: 12, color: '#475569' }}>{l.section}</td>
                    <td style={{ padding: '10px 14px', fontSize: 13 }}>{l.label}</td>
                    <td style={{ padding: '10px 14px', fontSize: 13, color: l.borrower < 0 ? '#4ade80' : '#f1f5f9', fontWeight: l.borrower !== 0 ? 600 : 400 }}>
                      {l.borrower !== 0 ? `${l.borrower < 0 ? '-' : ''}$${Math.abs(l.borrower).toLocaleString()}` : '—'}
                    </td>
                    <td style={{ padding: '10px 14px', fontSize: 13, color: l.seller < 0 ? '#4ade80' : '#f1f5f9', fontWeight: l.seller !== 0 ? 600 : 400 }}>
                      {l.seller !== 0 ? `${l.seller < 0 ? '-' : ''}$${Math.abs(l.seller).toLocaleString()}` : '—'}
                    </td>
                  </tr>
                ))}
                <tr style={{ background: 'rgba(74,222,128,0.06)', borderTop: '2px solid #4ade80' }}>
                  <td colSpan={2} style={{ padding: '12px 14px', fontWeight: 800, fontSize: 14 }}>TOTAL CASH TO CLOSE</td>
                  <td style={{ padding: '12px 14px', fontWeight: 800, fontSize: 14, color: '#4ade80' }}>${borrowerTotal.toLocaleString()}</td>
                  <td style={{ padding: '12px 14px', fontWeight: 800, fontSize: 14, color: '#4ade80' }}>${sellerTotal.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'wire' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <div className="card">
            <div style={{ fontWeight: 700, marginBottom: 16 }}>Borrower Funds to Close</div>
            {[
              ['Required Cash to Close', `$${borrowerTotal.toLocaleString()}`],
              ['Earnest Money Applied', '-$5,000'],
              ['Net Due from Borrower', `$${(borrowerTotal - 5000).toLocaleString()}`],
              ['Payment Method', 'Incoming Wire / Cashier Check'],
              ['Wire Deadline', 'May 8, 2025 by 10:00 AM CT'],
            ].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #334155', fontSize: 13 }}>
                <span style={{ color: '#64748b' }}>{k}</span>
                <span style={{ fontWeight: 700 }}>{v}</span>
              </div>
            ))}
            <div className="alert alert-warning" style={{ marginTop: 14, fontSize: 12 }}>
              🔒 Borrower has received wiring instructions via secure encrypted email. Do not send wire instructions over unencrypted channels.
            </div>
          </div>

          <div className="card">
            <div style={{ fontWeight: 700, marginBottom: 16 }}>Lender Funding Wire</div>
            {[
              ['Loan Amount', '$485,000'],
              ['Funding Date', 'May 8, 2025'],
              ['Receiving Bank', 'Old Republic Title — Escrow'],
              ['Receiving Account', `****${8821}`],
              ['Wire Status', wireInitiated ? 'Initiated' : 'Pending'],
            ].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #334155', fontSize: 13 }}>
                <span style={{ color: '#64748b' }}>{k}</span>
                <span style={{ fontWeight: 700, color: k === 'Wire Status' ? (wireInitiated ? '#4ade80' : '#facc15') : '#f1f5f9' }}>{v}</span>
              </div>
            ))}
            {!wireInitiated ? (
              <button className="btn btn-primary" style={{ width: '100%', marginTop: 16, justifyContent: 'center' }} onClick={() => setWireInitiated(true)}>
                💸 Initiate Lender Funding Wire
              </button>
            ) : (
              <div className="alert alert-success" style={{ marginTop: 14 }}>
                <span>✅</span>
                <span>Funding wire of <strong>$485,000</strong> initiated. Expected arrival: 2–3 hours.</span>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'title' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <div className="card">
            <div style={{ fontWeight: 700, marginBottom: 14 }}>Title & Escrow Coordination</div>
            {[
              ['Title Company', 'Old Republic National Title Ins. Co.'],
              ['Settlement Agent', 'Janet Wu, CES'],
              ['Closing Location', '500 Capitol of TX Hwy, Austin TX'],
              ['Closing Scheduled', 'May 8, 2025 at 2:00 PM CT'],
              ['Vesting', 'Marcus T. Johnson and Sarah Johnson, as joint tenants'],
              ['Title Search Clear', '✓ Yes – no unacceptable liens'],
              ['Survey', 'Existing survey acceptable per lender review'],
            ].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid #334155', fontSize: 13 }}>
                <span style={{ color: '#64748b' }}>{k}</span>
                <span style={{ fontWeight: 600, maxWidth: 220, textAlign: 'right', color: v.startsWith('✓') ? '#4ade80' : '#f1f5f9' }}>{v}</span>
              </div>
            ))}
          </div>
          <div className="card">
            <div style={{ fontWeight: 700, marginBottom: 14 }}>Recording Status</div>
            <div className="steps" style={{ flexDirection: 'column', gap: 12 }}>
              {[
                { label: 'Title Commitment Issued', done: true, date: 'Apr 22' },
                { label: 'Lender Conditions Cleared', done: true, date: 'May 1' },
                { label: 'CD Delivered to Borrower', done: true, date: 'May 5' },
                { label: 'Closing Documents Signed', done: false, date: 'May 8 (pending)' },
                { label: 'Documents to County Recorder', done: false, date: 'May 9 (pending)' },
                { label: 'Recorded Deed Returned', done: false, date: 'May 16 (est.)' },
              ].map(s => (
                <div key={s.label} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <span style={{ width: 22, height: 22, borderRadius: '50%', background: s.done ? '#4ade80' : '#334155', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, flexShrink: 0, fontWeight: 700, color: s.done ? '#0f172a' : '#475569' }}>{s.done ? '✓' : '○'}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: s.done ? 600 : 400, color: s.done ? '#f1f5f9' : '#64748b' }}>{s.label}</div>
                    <div style={{ fontSize: 11, color: '#475569' }}>{s.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
