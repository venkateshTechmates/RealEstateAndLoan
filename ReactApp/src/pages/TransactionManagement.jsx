import { useState } from 'react'
import {
  DollarSign, CreditCard, Send, ArrowDownLeft, Calendar, Clock, CheckCircle2,
  AlertCircle, Download, RefreshCw, TrendingUp, FileText, Wallet, BarChart2,
  Plus, Search, ChevronDown, ArrowUpRight, ChevronLeft, ChevronRight, Pencil,
} from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Legend,
} from 'recharts'

// ─── Static Demo Data ────────────────────────────────────────────────────────
const PAYMENT_HISTORY = [
  { month: 'Oct', mortgage: 2450, insurance: 125, tax: 0 },
  { month: 'Nov', mortgage: 2450, insurance: 125, tax: 0 },
  { month: 'Dec', mortgage: 2450, insurance: 125, tax: 3750 },
  { month: 'Jan', mortgage: 2450, insurance: 125, tax: 0 },
  { month: 'Feb', mortgage: 2450, insurance: 125, tax: 0 },
  { month: 'Mar', mortgage: 2450, insurance: 125, tax: 0 },
  { month: 'Apr', mortgage: 2450, insurance: 125, tax: 0 },
]
const LENDER_TREND = [
  { month: 'Jan', payments: 980, wires: 650, failed: 18 },
  { month: 'Feb', payments: 1050, wires: 700, failed: 22 },
  { month: 'Mar', payments: 1245, wires: 850, failed: 12.5 },
]
const UPCOMING = [
  { date: 'Apr 1, 2026',  type: 'Mortgage',     desc: 'Monthly Payment',          amount: '$2,450.00',  status: 'due',     statusLabel: '⏳ Due' },
  { date: 'Apr 15, 2026', type: 'Insurance',     desc: "Homeowner's Insurance",    amount: '$125.00',    status: 'upcoming', statusLabel: '📅 Upcoming' },
  { date: 'May 1, 2026',  type: 'Mortgage',     desc: 'Monthly Payment',          amount: '$2,450.00',  status: 'upcoming', statusLabel: '📅 Upcoming' },
  { date: 'Jun 1, 2026',  type: 'Mortgage',     desc: 'Monthly Payment',          amount: '$2,450.00',  status: 'upcoming', statusLabel: '📅 Upcoming' },
  { date: 'Jun 30, 2026', type: 'Property Tax', desc: 'Semi-Annual Property Tax', amount: '$1,875.00',  status: 'upcoming', statusLabel: '📅 Upcoming' },
]
const RECENT = [
  { date: 'Mar 1, 2026',  type: 'Mortgage',     desc: 'Monthly Payment',     amount: '$2,450.00',  status: '✅ Paid' },
  { date: 'Feb 15, 2026', type: 'Insurance',     desc: "Homeowner's Ins.",    amount: '$125.00',    status: '✅ Paid' },
  { date: 'Feb 1, 2026',  type: 'Mortgage',     desc: 'Monthly Payment',     amount: '$2,450.00',  status: '✅ Paid' },
  { date: 'Jan 1, 2026',  type: 'Mortgage',     desc: 'Monthly Payment',     amount: '$2,450.00',  status: '✅ Paid' },
  { date: 'Dec 15, 2025', type: 'Property Tax', desc: 'Annual Property Tax', amount: '$3,750.00',  status: '✅ Paid' },
]
const WIRE_HISTORY = [
  { date: 'Mar 20, 2026', recipient: 'First American Title', amount: '$35,000.00', status: '✅ Completed', ref: 'CL-2026-0421' },
  { date: 'Mar 15, 2026', recipient: 'ABC Title',            amount: '$25,000.00', status: '✅ Completed', ref: 'CL-2026-0418' },
  { date: 'Mar 10, 2026', recipient: 'Seller - Jane Doe',   amount: '$50,000.00', status: '⏳ Processing', ref: 'Purchase Deposit' },
  { date: 'Mar 5, 2026',  recipient: 'IRS',                  amount: '$3,750.00',  status: '✅ Completed', ref: 'Property Tax' },
]
const ESCROW_HISTORY = [
  { date: 'Dec 15, 2025', payee: 'County Tax Office',   type: 'Property Tax',  amount: '$3,750.00', status: '✅ Paid' },
  { date: 'Jun 15, 2025', payee: 'County Tax Office',   type: 'Property Tax',  amount: '$3,750.00', status: '✅ Paid' },
  { date: 'Mar 1, 2025',  payee: 'State Farm Insurance', type: "Homeowner's", amount: '$1,500.00', status: '✅ Paid' },
  { date: 'Mar 1, 2024',  payee: 'State Farm Insurance', type: "Homeowner's", amount: '$1,450.00', status: '✅ Paid' },
]
const ESCROW_UPCOMING = [
  { date: 'Jun 15, 2026', payee: 'County Tax Office',   type: 'Property Tax',  amount: '$3,875.00', status: '📅 Due' },
  { date: 'Mar 1, 2027',  payee: 'State Farm Insurance', type: "Homeowner's", amount: '$1,550.00', status: '📅 Future' },
]
const TXN_HISTORY = [
  { date: 'Mar 25, 2026', txnId: 'TXN-987654321', type: 'Payment',    desc: 'Online Payment',    debit: '$2,450.00', credit: '—', balance: '$383,400' },
  { date: 'Mar 1, 2026',  txnId: 'TXN-987654320', type: 'Payment',    desc: 'AutoPay',           debit: '$2,450.00', credit: '—', balance: '$385,850' },
  { date: 'Feb 15, 2026', txnId: 'TXN-987654319', type: 'Escrow',     desc: 'Insurance Payment', debit: '$125.00',   credit: '—', balance: '$388,300' },
  { date: 'Feb 1, 2026',  txnId: 'TXN-987654318', type: 'Payment',    desc: 'Online Payment',    debit: '$2,450.00', credit: '—', balance: '$388,425' },
  { date: 'Jan 15, 2026', txnId: 'TXN-987654317', type: 'Adjustment', desc: 'Escrow Adj.',       debit: '—',         credit: '$50.00', balance: '$390,875' },
  { date: 'Jan 1, 2026',  txnId: 'TXN-987654316', type: 'Payment',    desc: 'AutoPay',           debit: '$2,450.00', credit: '—', balance: '$390,825' },
  { date: 'Dec 15, 2025', txnId: 'TXN-987654315', type: 'Escrow',     desc: 'Property Tax',      debit: '$3,750.00', credit: '—', balance: '$393,275' },
  { date: 'Dec 1, 2025',  txnId: 'TXN-987654314', type: 'Payment',    desc: 'Online Payment',    debit: '$2,450.00', credit: '—', balance: '$397,025' },
]
const PENDING_WIRES = [
  { id: 'WIR-001', borrower: 'John Doe',    amount: '$35,000.00', recipient: 'First American', purpose: 'Down Payment',   status: 'pending', alert: false },
  { id: 'WIR-002', borrower: 'Jane Smith',  amount: '$50,000.00', recipient: 'ABC Title',       purpose: 'Closing Cost',   status: 'pending', alert: false },
  { id: 'WIR-003', borrower: 'Robert Lee',  amount: '$25,000.00', recipient: 'Seller - Jones',  purpose: 'Earnest Money',  status: 'review',  alert: true },
]
const FAILED_PAYMENTS = [
  { date: 'Mar 24, 2026', borrower: 'John Doe',   amount: '$2,450.00', method: 'Chase ****1234',  reason: 'Insufficient Funds' },
  { date: 'Mar 23, 2026', borrower: 'Maria Garcia', amount: '$3,200.00', method: 'Amex ****9012',  reason: 'Card Expired' },
]
const WIRE_TEMPLATES = ['First American Title', 'ABC Title', 'IRS – Property Tax', 'County Tax Office']
const STATEMENTS = {
  2026: ['Jan', 'Feb', 'Mar', null, null, null, null, null, null, null, null, null],
  2025: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  2024: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
}

// ─── Sub-components ──────────────────────────────────────────────────────────
function StatCard({ label, value, sub, color, icon: Icon }) {
  return (
    <div className="card">
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 }}>
        <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{label}</div>
        {Icon && <Icon size={16} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />}
      </div>
      <div style={{ fontSize: 24, fontWeight: 800, color: color || 'var(--text-primary)', marginBottom: 4 }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{sub}</div>}
    </div>
  )
}

const TABS = [
  { id: 'overview',  label: '📊 Overview' },
  { id: 'payment',   label: '💳 Make Payment' },
  { id: 'wire',      label: '💸 Wire Transfer' },
  { id: 'escrow',    label: '🏦 Escrow' },
  { id: 'scheduled', label: '📅 Scheduled & AutoPay' },
  { id: 'history',   label: '🗂 History' },
  { id: 'monitor',   label: '🔍 Lender Monitor' },
]

// ─── Main Component ──────────────────────────────────────────────────────────
export default function TransactionManagement() {
  const [tab, setTab]             = useState('overview')
  const [payStep, setPayStep]     = useState('form')    // form | preview | confirmed
  const [payMethod, setPayMethod] = useState('wells')
  const [payAmount, setPayAmount] = useState('minimum')
  const [customAmt, setCustomAmt] = useState('2450.00')
  const [payDate, setPayDate]     = useState('schedule')
  const [autopay, setAutopay]     = useState(true)
  const [histFilter, setHistFilter] = useState('all')
  const [wireRecipient, setWireRecipient] = useState('First American Title')
  const [wireAmt, setWireAmt] = useState('35000.00')
  const [wirePurpose, setWirePurpose] = useState('Down Payment for Property at 123 Main St')

  const Section = ({ title, children, action }) => (
    <div className="card" style={{ marginBottom: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-primary)' }}>{title}</div>
        {action}
      </div>
      {children}
    </div>
  )

  // ── OVERVIEW TAB ──────────────────────────────────────────────────────────
  const OverviewTab = () => (
    <>
      <div className="grid-4" style={{ marginBottom: 20 }}>
        <StatCard label="Current Balance"  value="$385,250"  sub="▼ $2,450 next payment pending" color="var(--text-primary)" icon={DollarSign} />
        <StatCard label="Next Payment"     value="$2,450"    sub="Due: Apr 1, 2026"              color="var(--blue-light)"  icon={Calendar} />
        <StatCard label="Total Paid"       value="$12,250"   sub="YTD: $8,400"                   color="#10b981"            icon={CheckCircle2} />
        <StatCard label="Payment Due"      value="Apr 1"     sub="In 7 days"                     color="#f59e0b"            icon={Clock} />
      </div>

      <Section title="Quick Actions" action={null}>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {[
            { label: '💳 Make a Payment',    onClick: () => setTab('payment') },
            { label: '💸 Wire Transfer',      onClick: () => setTab('wire') },
            { label: '🏦 Set Up AutoPay',     onClick: () => setTab('scheduled') },
            { label: '📊 View Statement',    onClick: () => setTab('history') },
            { label: '📝 Escrow Analysis',   onClick: () => setTab('escrow') },
          ].map(({ label, onClick }) => (
            <button key={label} onClick={onClick} className="btn btn-secondary btn-sm">{label}</button>
          ))}
        </div>
      </Section>

      <Section title="Upcoming Transactions">
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>Date</th><th>Type</th><th>Description</th><th>Amount</th><th>Status</th><th>Action</th></tr>
            </thead>
            <tbody>
              {UPCOMING.map((r, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 600 }}>{r.date}</td>
                  <td><span className={`badge ${r.type === 'Property Tax' ? 'badge-orange' : r.type === 'Insurance' ? 'badge-blue' : 'badge-purple'}`}>{r.type}</span></td>
                  <td>{r.desc}</td>
                  <td style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{r.amount}</td>
                  <td>{r.statusLabel}</td>
                  <td>
                    {r.status === 'due'
                      ? <button className="btn btn-primary btn-sm" onClick={() => setTab('payment')}>Pay Now</button>
                      : <button className="btn btn-secondary btn-sm" onClick={() => setTab('scheduled')}>Schedule</button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Recent Transactions">
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>Date</th><th>Type</th><th>Description</th><th>Amount</th><th>Status</th><th>Receipt</th></tr>
            </thead>
            <tbody>
              {RECENT.map((r, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 600 }}>{r.date}</td>
                  <td><span className={`badge ${r.type === 'Property Tax' ? 'badge-orange' : r.type === 'Insurance' ? 'badge-blue' : 'badge-purple'}`}>{r.type}</span></td>
                  <td>{r.desc}</td>
                  <td style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{r.amount}</td>
                  <td>{r.status}</td>
                  <td><button className="btn btn-ghost btn-sm"><Download size={12} /> Download</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Payment History">
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={PAYMENT_HISTORY} margin={{ top: 4, right: 16, left: 0, bottom: 0 }} barSize={10}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} tickFormatter={v => `$${v}`} />
            <Tooltip formatter={(v, n) => [`$${v.toLocaleString()}`, n.charAt(0).toUpperCase() + n.slice(1)]} contentStyle={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12 }} />
            <Legend wrapperStyle={{ fontSize: 11, color: 'var(--text-muted)' }} />
            <Bar dataKey="mortgage"  fill="#3b82f6" name="Mortgage"  radius={[3, 3, 0, 0]} />
            <Bar dataKey="insurance" fill="#10b981" name="Insurance" radius={[3, 3, 0, 0]} />
            <Bar dataKey="tax"       fill="#f59e0b" name="Tax"       radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Section>
    </>
  )

  // ── MAKE PAYMENT TAB ──────────────────────────────────────────────────────
  const PaymentTab = () => {
    if (payStep === 'confirmed') return (
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        <div style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: 12, padding: '24px', textAlign: 'center', marginBottom: 20 }}>
          <CheckCircle2 size={40} style={{ color: '#10b981', margin: '0 auto 12px' }} />
          <div style={{ fontSize: 20, fontWeight: 800, color: '#10b981', marginBottom: 6 }}>✅ Payment Successful!</div>
          <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>Your payment has been processed successfully.</div>
        </div>
        <div className="card" style={{ marginBottom: 16 }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-primary)', marginBottom: 16 }}>Payment Receipt</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
            {[
              ['Receipt Number', 'RCPT-20260325-001234'],
              ['Date', 'Mar 25, 2026  14:32:15'],
              ['Loan Number', 'LN-12345678'],
              ['Transaction ID', 'TXN-987654321'],
              ['Authorization Code', 'AUTH-ABCD1234'],
              ['Payment Method', 'Wells Fargo Savings ****5678'],
            ].map(([k, v]) => (
              <div key={k}>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 3 }}>{k}</div>
                <div style={{ fontSize: 13, color: 'var(--text-primary)', fontFamily: k === 'Transaction ID' || k === 'Authorization Code' ? 'monospace' : undefined }}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 8, padding: '14px' }}>
            <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--text-primary)', marginBottom: 10 }}>Payment Breakdown</div>
            {[['Principal', '$1,850.00'], ['Interest', '$600.00'], ['Escrow (Tax/Insurance)', '$0.00'], ['Late Fee', '$0.00']].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--text-secondary)', marginBottom: 6 }}>
                <span>{k}</span><span>{v}</span>
              </div>
            ))}
            <div style={{ height: 1, background: 'var(--border)', margin: '10px 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: 14, color: 'var(--text-primary)' }}>
              <span>Total</span><span>$2,450.00</span>
            </div>
            <div style={{ marginTop: 10, fontSize: 13, color: '#10b981', fontWeight: 600 }}>Updated Loan Balance: $383,400.00</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button className="btn btn-secondary btn-sm"><Download size={13} /> Download Receipt</button>
          <button className="btn btn-secondary btn-sm">📧 Email Receipt</button>
          <button className="btn btn-secondary btn-sm" onClick={() => setTab('scheduled')}>📅 Schedule Next</button>
          <button className="btn btn-primary" onClick={() => { setPayStep('form'); setTab('overview') }}>🏠 Return to Dashboard</button>
        </div>
      </div>
    )

    if (payStep === 'preview') return (
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        <div className="card">
          <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--text-primary)', marginBottom: 20 }}>Payment Preview</div>
          {[['Payment Amount', customAmt ? `$${customAmt}` : '$2,450.00'], ['Payment Date', 'Apr 1, 2026'], ['Payment Method', 'Wells Fargo Savings ****5678'], ['Principal Allocation', '$1,850.00'], ['Interest Allocation', '$600.00']].map(([k, v]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--border)', fontSize: 14 }}>
              <span style={{ color: 'var(--text-muted)' }}>{k}</span><span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{v}</span>
            </div>
          ))}
          <div style={{ marginTop: 16, padding: '12px', background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 8, fontSize: 12, color: 'var(--text-secondary)', display: 'flex', gap: 8 }}>
            <AlertCircle size={14} style={{ color: '#f59e0b', flexShrink: 0, marginTop: 1 }} /> Please confirm the details above before submitting.
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
            <button className="btn btn-secondary" onClick={() => setPayStep('form')} style={{ flex: 1, justifyContent: 'center' }}>← Edit</button>
            <button className="btn btn-primary" onClick={() => setPayStep('confirmed')} style={{ flex: 1, justifyContent: 'center' }}>Confirm & Submit →</button>
          </div>
        </div>
      </div>
    )

    return (
      <div style={{ maxWidth: 620, margin: '0 auto' }}>
        <div className="card" style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 2 }}>LOAN NUMBER</div>
          <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>LN-12345678 &ensp;|&ensp; Balance: $385,250.00 &ensp;|&ensp; Rate: 4.25%</div>
        </div>

        <div className="card" style={{ marginBottom: 16 }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-primary)', marginBottom: 12 }}>Payment Amount</div>
          {[{ id: 'minimum', label: 'Minimum Payment', value: '$2,450.00' }, { id: 'custom', label: 'Custom Amount', value: null }, { id: 'payoff', label: 'Payoff Balance', value: '$385,250.00' }].map(opt => (
            <label key={opt.id} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, cursor: 'pointer', padding: '10px 14px', borderRadius: 8, border: `1px solid ${payAmount === opt.id ? 'var(--blue)' : 'var(--border)'}`, background: payAmount === opt.id ? 'rgba(59,130,246,0.05)' : 'var(--bg-elevated)' }}>
              <input type="radio" name="amt" checked={payAmount === opt.id} onChange={() => setPayAmount(opt.id)} style={{ accentColor: 'var(--blue)' }} />
              <span style={{ fontSize: 13, color: 'var(--text-primary)', fontWeight: 500 }}>{opt.label}</span>
              {opt.value && <span style={{ marginLeft: 'auto', fontWeight: 700, color: 'var(--text-primary)' }}>{opt.value}</span>}
              {!opt.value && payAmount === 'custom' && (
                <input type="number" value={customAmt} onChange={e => setCustomAmt(e.target.value)} style={{ marginLeft: 'auto', width: 120, padding: '4px 8px', borderRadius: 6, border: '1px solid var(--border)', background: 'var(--bg-surface)', color: 'var(--text-primary)', fontSize: 13, textAlign: 'right' }} onClick={e => e.stopPropagation()} />
              )}
            </label>
          ))}
        </div>

        <div className="card" style={{ marginBottom: 16 }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-primary)', marginBottom: 12 }}>Payment Date</div>
          {[{ id: 'today', label: 'Today (Mar 25, 2026)' }, { id: 'schedule', label: 'Schedule for: Apr 1, 2026' }].map(opt => (
            <label key={opt.id} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, cursor: 'pointer' }}>
              <input type="radio" name="date" checked={payDate === opt.id} onChange={() => setPayDate(opt.id)} style={{ accentColor: 'var(--blue)' }} />
              <span style={{ fontSize: 13, color: 'var(--text-primary)' }}>{opt.label}</span>
            </label>
          ))}
        </div>

        <div className="card" style={{ marginBottom: 16 }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-primary)', marginBottom: 12 }}>Payment Method</div>
          {[{ id: 'chase', name: 'Chase Checking ****1234', balance: '$25,000.00' }, { id: 'wells', name: 'Wells Fargo Savings ****5678', balance: '$85,000.00' }, { id: 'amex', name: 'American Express ****9012', balance: 'Limit: $15,000' }].map(m => (
            <label key={m.id} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, cursor: 'pointer', padding: '10px 14px', borderRadius: 8, border: `1px solid ${payMethod === m.id ? 'var(--blue)' : 'var(--border)'}`, background: payMethod === m.id ? 'rgba(59,130,246,0.05)' : 'var(--bg-elevated)' }}>
              <input type="radio" name="method" checked={payMethod === m.id} onChange={() => setPayMethod(m.id)} style={{ accentColor: 'var(--blue)' }} />
              <span style={{ flex: 1, fontSize: 13, color: 'var(--text-primary)', fontWeight: 500 }}>{m.name}</span>
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Balance: {m.balance}</span>
            </label>
          ))}
          <button className="btn btn-ghost btn-sm" style={{ marginTop: 6 }}><Plus size={12} /> Add New Payment Method</button>
        </div>

        <div className="card" style={{ marginBottom: 16 }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-primary)', marginBottom: 12 }}>Payment Summary</div>
          {[['Principal', '$1,850.00'], ['Interest', '$600.00'], ['Escrow (Tax/Ins)', '$0.00']].map(([k, v]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--text-secondary)', marginBottom: 8 }}>
              <span>{k}</span><span>{v}</span>
            </div>
          ))}
          <div style={{ height: 1, background: 'var(--border)', margin: '10px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: 16, color: 'var(--text-primary)' }}>
            <span>Total</span><span>$2,450.00</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-secondary" onClick={() => setTab('overview')} style={{ flex: 1, justifyContent: 'center' }}>Cancel</button>
          <button className="btn btn-secondary" onClick={() => setPayStep('preview')} style={{ flex: 1, justifyContent: 'center' }}>Preview Payment</button>
          <button className="btn btn-primary" onClick={() => setPayStep('confirmed')} style={{ flex: 1, justifyContent: 'center' }}>Make Payment →</button>
        </div>
      </div>
    )
  }

  // ── WIRE TRANSFER TAB ─────────────────────────────────────────────────────
  const WireTab = () => (
    <>
      <div className="grid-3" style={{ marginBottom: 20 }}>
        {[{ label: 'Daily Limit', total: '$50,000', used: '$25,000', remaining: '$25,000', pct: 50 }, { label: 'Weekly Limit', total: '$100,000', used: '$25,000', remaining: '$75,000', pct: 25 }, { label: 'Monthly Limit', total: '$250,000', used: '$100,000', remaining: '$150,000', pct: 40 }].map(lim => (
          <div key={lim.label} className="card">
            <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 6 }}>{lim.label}</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 2 }}>{lim.total}</div>
            <div style={{ height: 6, background: 'var(--bg-elevated)', borderRadius: 3, marginBottom: 8, overflow: 'hidden' }}>
              <div style={{ width: `${lim.pct}%`, height: '100%', background: lim.pct > 70 ? '#ef4444' : '#3b82f6', borderRadius: 3 }} />
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Remaining: <span style={{ color: '#10b981', fontWeight: 700 }}>{lim.remaining}</span></div>
          </div>
        ))}
      </div>

      <div className="card" style={{ marginBottom: 20 }}>
        <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--text-primary)', marginBottom: 16 }}>Initiate Wire Transfer</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
          <div>
            <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--text-secondary)', marginBottom: 10 }}>Recipient Information</div>
            {[{ label: 'Recipient Name', placeholder: 'First American Title', key: 'name' }, { label: 'Account Number', placeholder: 'Account #', key: 'acct' }, { label: 'Routing Number', placeholder: 'Routing #', key: 'routing' }, { label: 'Bank Name', placeholder: 'Bank Name', key: 'bank' }].map(fi => (
              <div className="form-group" key={fi.key}>
                <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', letterSpacing: '0.04em', marginBottom: 4, display: 'block' }}>{fi.label.toUpperCase()}</label>
                <input type="text" placeholder={fi.placeholder} style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--bg-elevated)', color: 'var(--text-primary)', fontSize: 13, boxSizing: 'border-box' }} defaultValue={fi.key === 'name' ? wireRecipient : ''} />
              </div>
            ))}
            <div style={{ display: 'flex', gap: 8 }}>
              {['Individual', 'Business', 'Trust'].map(t => (
                <label key={t} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'var(--text-secondary)', cursor: 'pointer' }}>
                  <input type="radio" name="recType" defaultChecked={t === 'Business'} style={{ accentColor: 'var(--blue)' }} /> {t}
                </label>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--text-secondary)', marginBottom: 10 }}>Wire Details</div>
            {[{ label: 'Amount ($)', val: wireAmt, setter: setWireAmt, type: 'number' }, { label: 'Purpose', val: wirePurpose, setter: setWirePurpose, type: 'text' }, { label: 'Reference Number', val: 'Closing: CL-2026-0421', setter: null, type: 'text' }].map(fi => (
              <div className="form-group" key={fi.label}>
                <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', letterSpacing: '0.04em', marginBottom: 4, display: 'block' }}>{fi.label.toUpperCase()}</label>
                <input type={fi.type} defaultValue={fi.val} style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--bg-elevated)', color: 'var(--text-primary)', fontSize: 13, boxSizing: 'border-box' }} />
              </div>
            ))}
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Funding Source</div>
            {[{ id: 'chase', name: 'Chase Checking ****1234', avail: '$25,000' }, { id: 'wells', name: 'Wells Fargo Savings ****5678', avail: '$85,000' }].map(s => (
              <label key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, cursor: 'pointer', fontSize: 13, color: 'var(--text-secondary)' }}>
                <input type="radio" name="wireSrc" defaultChecked={s.id === 'chase'} style={{ accentColor: 'var(--blue)' }} />
                {s.name} &ensp;<span style={{ color: 'var(--text-muted)', fontSize: 11 }}>Avail: {s.avail}</span>
              </label>
            ))}
          </div>
        </div>
        <div style={{ padding: '12px 14px', background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.25)', borderRadius: 8, fontSize: 12, color: '#fbbf24', display: 'flex', gap: 8, marginBottom: 16 }}>
          <AlertCircle size={14} style={{ flexShrink: 0, marginTop: 1 }} />
          Wire transfers are final and cannot be reversed. Please verify all information before submitting.
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>Cancel</button>
          <button className="btn btn-primary" style={{ flex: 2, justifyContent: 'center' }}>Review & Send →</button>
        </div>
      </div>

      <Section title="Recent Wire Transfers">
        <div className="table-wrap">
          <table>
            <thead><tr><th>Date</th><th>Recipient</th><th>Amount</th><th>Status</th><th>Reference</th><th>Receipt</th></tr></thead>
            <tbody>
              {WIRE_HISTORY.map((w, i) => (
                <tr key={i}>
                  <td>{w.date}</td><td style={{ fontWeight: 600 }}>{w.recipient}</td>
                  <td style={{ fontWeight: 800, color: 'var(--text-primary)' }}>{w.amount}</td>
                  <td>{w.status}</td><td><span style={{ fontFamily: 'monospace', fontSize: 12 }}>{w.ref}</span></td>
                  <td><button className="btn btn-ghost btn-sm"><Download size={12} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Saved Wire Templates">
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {WIRE_TEMPLATES.map(t => <button key={t} className="btn btn-secondary btn-sm">{t}</button>)}
          <button className="btn btn-ghost btn-sm"><Plus size={12} /> Add New Template</button>
        </div>
      </Section>
    </>
  )

  // ── ESCROW TAB ────────────────────────────────────────────────────────────
  const EscrowTab = () => (
    <>
      <div className="grid-4" style={{ marginBottom: 20 }}>
        <StatCard label="Escrow Balance"       value="$3,250"    sub="Current balance" icon={DollarSign} />
        <StatCard label="Monthly Contribution" value="$250"      sub="Added each month" icon={ArrowDownLeft} />
        <StatCard label="Annual Disbursements" value="$4,500"    sub="This year" icon={ArrowUpRight} />
        <StatCard label="Shortage / Surplus"   value="-$250"     sub="Shortage — see analysis" color="#ef4444" icon={AlertCircle} />
      </div>

      <Section title="Escrow Analysis — Annual Statement">
        <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 8, padding: '16px', marginBottom: 8, fontSize: 13 }}>
          <div style={{ color: 'var(--text-muted)', marginBottom: 10, fontWeight: 600 }}>Period: Apr 1, 2025 – Mar 31, 2026</div>
          {[['Beginning Balance', '$2,500.00'], ['+ Monthly Deposits (12 × $250)', '+$3,000.00'], ['− Disbursements', '−$4,500.00']].map(([k, v]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, color: 'var(--text-secondary)' }}>
              <span>{k}</span><span style={{ fontWeight: 600 }}>{v}</span>
            </div>
          ))}
          <div style={{ height: 1, background: 'var(--border)', margin: '10px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: 15, color: 'var(--text-primary)', marginBottom: 6 }}>
            <span>Ending Balance</span><span>$1,000.00</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--text-muted)' }}>
            <span>Required Minimum</span><span>$1,250.00</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#ef4444', fontWeight: 600, marginTop: 4 }}>
            <span>Shortage</span><span>−$250.00</span>
          </div>
        </div>
      </Section>

      <Section title="Disbursement History">
        <div className="table-wrap">
          <table>
            <thead><tr><th>Date</th><th>Payee</th><th>Type</th><th>Amount</th><th>Status</th><th>Receipt</th></tr></thead>
            <tbody>
              {ESCROW_HISTORY.map((r, i) => (
                <tr key={i}><td>{r.date}</td><td style={{ fontWeight: 600 }}>{r.payee}</td><td>{r.type}</td>
                  <td style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{r.amount}</td><td>{r.status}</td>
                  <td><button className="btn btn-ghost btn-sm"><Download size={12} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Upcoming Escrow Disbursements">
        <div className="table-wrap">
          <table>
            <thead><tr><th>Date</th><th>Payee</th><th>Type</th><th>Estimated Amt</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {ESCROW_UPCOMING.map((r, i) => (
                <tr key={i}><td style={{ fontWeight: 600 }}>{r.date}</td><td>{r.payee}</td><td>{r.type}</td>
                  <td style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{r.amount}</td><td>{r.status}</td>
                  <td><button className="btn btn-ghost btn-sm">View Details</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <div className="card">
        <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-primary)', marginBottom: 12 }}>Escrow Options</div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button className="btn btn-primary btn-sm">Pay Shortage ($250)</button>
          <button className="btn btn-secondary btn-sm">Request Escrow Analysis</button>
          <button className="btn btn-secondary btn-sm">Update Insurance Info</button>
          <button className="btn btn-secondary btn-sm"><Download size={13} /> View Full Statement</button>
        </div>
      </div>
    </>
  )

  // ── SCHEDULED & AUTOPAY TAB ───────────────────────────────────────────────
  const ScheduledTab = () => (
    <>
      <div className="card" style={{ marginBottom: 20, padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: autopay ? '#10b981' : '#6b7280' }} />
          <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-primary)' }}>{autopay ? 'AutoPay Enabled' : 'AutoPay Disabled'}</span>
          {autopay && <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>via Chase Checking ****1234 — Next: Apr 1, 2026</span>}
        </div>
        <button onClick={() => setAutopay(a => !a)} className={`btn btn-sm ${autopay ? 'btn-danger' : 'btn-success'}`}>
          {autopay ? 'Disable AutoPay' : 'Enable AutoPay'}
        </button>
      </div>

      <Section title="Upcoming AutoPay Schedule">
        <div className="table-wrap">
          <table>
            <thead><tr><th>Date</th><th>Type</th><th>Description</th><th>Amount</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {[
                { date: 'Apr 1, 2026', type: 'Mortgage', desc: 'Monthly Payment (AutoPay)', amt: '$2,450.00', status: '⏳ Ready' },
                { date: 'May 1, 2026', type: 'Mortgage', desc: 'Monthly Payment (AutoPay)', amt: '$2,450.00', status: '📅 Future' },
                { date: 'Jun 1, 2026', type: 'Mortgage', desc: 'Monthly Payment (AutoPay)', amt: '$2,450.00', status: '📅 Future' },
                { date: 'Jun 15, 2026', type: 'Property Tax', desc: 'Escrow Disbursement', amt: '$1,875.00', status: '📅 Future' },
                { date: 'Jul 1, 2026', type: 'Mortgage', desc: 'Monthly Payment (AutoPay)', amt: '$2,450.00', status: '📅 Future' },
              ].map((r, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 600 }}>{r.date}</td>
                  <td><span className={`badge ${r.type === 'Property Tax' ? 'badge-orange' : 'badge-purple'}`}>{r.type}</span></td>
                  <td>{r.desc}</td>
                  <td style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{r.amt}</td>
                  <td>{r.status}</td>
                  <td><button className="btn btn-ghost btn-sm"><Pencil size={11} /> Edit</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="One-Time Scheduled Payments" action={<button className="btn btn-primary btn-sm"><Plus size={12} /> Schedule New</button>}>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Date</th><th>Type</th><th>Description</th><th>Amount</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {[{ date: 'Mar 30, 2026', type: 'Principal', desc: 'Extra Principal Payment', amt: '$500.00', status: '⏳ Pending' },
                { date: 'Apr 15, 2026', type: 'Insurance', desc: "Homeowner's Insurance", amt: '$125.00', status: '📅 Future' }].map((r, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 600 }}>{r.date}</td>
                  <td><span className={`badge ${r.type === 'Insurance' ? 'badge-blue' : 'badge-green'}`}>{r.type}</span></td>
                  <td>{r.desc}</td>
                  <td style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{r.amt}</td>
                  <td>{r.status}</td>
                  <td><button className="btn btn-ghost btn-sm">Edit</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="AutoPay Settings">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 8 }}>Payment Method</div>
            <div style={{ padding: '10px 14px', background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 13, display: 'flex', justifyContent: 'space-between' }}>
              <span>Chase Checking ****1234</span>
              <button className="btn btn-ghost btn-sm" style={{ padding: '2px 8px' }}>Change</button>
            </div>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 8, marginTop: 14 }}>Payment Date</div>
            {['1st of each month', '15th of each month', 'Custom date'].map((d, i) => (
              <label key={d} style={{ display: 'flex', gap: 8, marginBottom: 6, cursor: 'pointer', fontSize: 13, color: 'var(--text-secondary)', alignItems: 'center' }}>
                <input type="radio" name="autopayDate" defaultChecked={i === 0} style={{ accentColor: 'var(--blue)' }} /> {d}
              </label>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 8 }}>Payment Amount</div>
            {['Full Payment ($2,450.00)', 'Minimum Payment', 'Fixed Amount'].map((a, i) => (
              <label key={a} style={{ display: 'flex', gap: 8, marginBottom: 6, cursor: 'pointer', fontSize: 13, color: 'var(--text-secondary)', alignItems: 'center' }}>
                <input type="radio" name="autopayAmt" defaultChecked={i === 0} style={{ accentColor: 'var(--blue)' }} /> {a}
              </label>
            ))}
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 8, marginTop: 14 }}>If Payment Fails</div>
            <label style={{ display: 'flex', gap: 8, marginBottom: 6, cursor: 'pointer', fontSize: 13, color: 'var(--text-secondary)', alignItems: 'center' }}>
              <input type="radio" name="failover" defaultChecked style={{ accentColor: 'var(--blue)' }} /> Try Wells Fargo Savings ****5678
            </label>
            <label style={{ display: 'flex', gap: 8, cursor: 'pointer', fontSize: 13, color: 'var(--text-secondary)', alignItems: 'center' }}>
              <input type="radio" name="failover" style={{ accentColor: 'var(--blue)' }} /> Send notification only
            </label>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
          <button className="btn btn-primary">Save Settings</button>
          <button className="btn btn-danger btn-sm" onClick={() => setAutopay(false)}>Cancel AutoPay</button>
        </div>
      </Section>
    </>
  )

  // ── HISTORY TAB ───────────────────────────────────────────────────────────
  const HistoryTab = () => (
    <>
      <Section title="Transaction History" action={<button className="btn btn-secondary btn-sm"><Download size={13} /> Export</button>}>
        <div style={{ display: 'flex', gap: 10, marginBottom: 14, flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: 8 }}>
            {['all', 'Payment', 'Escrow', 'Adjustment'].map(f => (
              <button key={f} onClick={() => setHistFilter(f)} className={`btn btn-sm ${histFilter === f ? 'btn-primary' : 'btn-secondary'}`} style={{ textTransform: 'capitalize' }}>{f === 'all' ? 'All' : f}</button>
            ))}
          </div>
          <div style={{ marginLeft: 'auto', position: 'relative' }}>
            <Search size={13} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input placeholder="Search transactions..." style={{ paddingLeft: 30, padding: '7px 12px 7px 30px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--bg-elevated)', color: 'var(--text-primary)', fontSize: 12 }} />
          </div>
        </div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Date</th><th>Transaction ID</th><th>Type</th><th>Description</th><th>Debit</th><th>Credit</th><th>Balance</th></tr></thead>
            <tbody>
              {TXN_HISTORY.filter(r => histFilter === 'all' || r.type === histFilter).map((r, i) => (
                <tr key={i}>
                  <td>{r.date}</td>
                  <td><span style={{ fontFamily: 'monospace', fontSize: 11, color: 'var(--text-muted)' }}>{r.txnId}</span></td>
                  <td><span className={`badge ${r.type === 'Escrow' ? 'badge-orange' : r.type === 'Adjustment' ? 'badge-green' : 'badge-blue'}`}>{r.type}</span></td>
                  <td>{r.desc}</td>
                  <td style={{ color: '#ef4444', fontWeight: 600 }}>{r.debit}</td>
                  <td style={{ color: '#10b981', fontWeight: 600 }}>{r.credit}</td>
                  <td style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{r.balance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 14, flexWrap: 'wrap', gap: 8 }}>
          <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Showing 1–8 of 145 transactions</span>
          <div style={{ display: 'flex', gap: 6 }}>
            <button className="btn btn-secondary btn-sm"><ChevronLeft size={12} /> Prev</button>
            {[1,2,3].map(p => <button key={p} className={`btn btn-sm ${p === 1 ? 'btn-primary' : 'btn-secondary'}`}>{p}</button>)}
            <span style={{ fontSize: 13, color: 'var(--text-muted)', padding: '6px 4px' }}>...</span>
            <button className="btn btn-secondary btn-sm">19</button>
            <button className="btn btn-secondary btn-sm">Next <ChevronRight size={12} /></button>
          </div>
        </div>
      </Section>

      <Section title="Monthly Statements">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Year</th>
                {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map(m => <th key={m}>{m}</th>)}
              </tr>
            </thead>
            <tbody>
              {Object.entries(STATEMENTS).map(([year, months]) => (
                <tr key={year}>
                  <td style={{ fontWeight: 700 }}>{year}</td>
                  {months.map((m, i) => (
                    <td key={i}>{m ? <button className="btn btn-ghost btn-sm" style={{ padding: '3px 8px', fontSize: 11 }}><FileText size={10} /> PDF</button> : <span style={{ color: 'var(--text-muted)', fontSize: 11 }}>—</span>}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
          <button className="btn btn-secondary btn-sm"><Download size={13} /> Download Annual Statement</button>
          <button className="btn btn-secondary btn-sm">Request Tax Statement (1098)</button>
        </div>
      </Section>
    </>
  )

  // ── LENDER MONITOR TAB ────────────────────────────────────────────────────
  const MonitorTab = () => (
    <>
      <div className="grid-4" style={{ marginBottom: 20 }}>
        <StatCard label="Total Payments MTD"  value="$1.245M"  sub="▲ +12% vs last month" color="#10b981"  icon={TrendingUp} />
        <StatCard label="Wires Processed MTD" value="$850K"    sub="▲ +8% vs last month"  color="var(--blue-light)" icon={Send} />
        <StatCard label="Pending Wires"        value="$125K"    sub="3 pending approvals"  color="#f59e0b"  icon={Clock} />
        <StatCard label="Failed Payments"      value="$12.5K"   sub="▼ -20% vs last month" color="#ef4444"  icon={AlertCircle} />
      </div>

      <Section title="Pending Wires — Requires Approval" action={<button className="btn btn-primary btn-sm">Approve All</button>}>
        {PENDING_WIRES.find(w => w.alert) && (
          <div style={{ padding: '10px 14px', background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.25)', borderRadius: 8, fontSize: 12, color: '#fbbf24', display: 'flex', gap: 8, marginBottom: 12 }}>
            <AlertCircle size={14} style={{ flexShrink: 0 }} />
            WIR-003 requires additional review: Unusual recipient pattern detected
          </div>
        )}
        <div className="table-wrap">
          <table>
            <thead><tr><th>Request ID</th><th>Borrower</th><th>Amount</th><th>Recipient</th><th>Purpose</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {PENDING_WIRES.map((w, i) => (
                <tr key={i}>
                  <td><span style={{ fontFamily: 'monospace', fontWeight: 600 }}>{w.id}</span></td>
                  <td style={{ fontWeight: 600 }}>{w.borrower}</td>
                  <td style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{w.amount}</td>
                  <td>{w.recipient}</td><td>{w.purpose}</td>
                  <td>{w.status === 'review' ? <span className="badge badge-yellow">⚠️ Review</span> : <span className="badge badge-blue">⏳ Pending</span>}</td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      {w.status === 'pending' ? <button className="btn btn-success btn-sm">Approve</button> : <button className="btn btn-yellow btn-sm" style={{ background: 'rgba(245,158,11,0.15)', color: '#f59e0b', border: '1px solid rgba(245,158,11,0.3)' }}>Review</button>}
                      <button className="btn btn-danger btn-sm">Decline</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Failed Payments">
        <div className="table-wrap">
          <table>
            <thead><tr><th>Date</th><th>Borrower</th><th>Amount</th><th>Payment Method</th><th>Reason</th><th>Action</th></tr></thead>
            <tbody>
              {FAILED_PAYMENTS.map((f, i) => (
                <tr key={i}>
                  <td>{f.date}</td><td style={{ fontWeight: 600 }}>{f.borrower}</td>
                  <td style={{ fontWeight: 700, color: '#ef4444' }}>{f.amount}</td>
                  <td>{f.method}</td>
                  <td><span className="badge badge-red">{f.reason}</span></td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button className="btn btn-secondary btn-sm">Notify</button>
                      <button className="btn btn-primary btn-sm">{f.reason === 'Card Expired' ? 'Update' : 'Retry'}</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Payment Trends">
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={LENDER_TREND} margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} tickFormatter={v => `$${v}K`} />
            <Tooltip formatter={(v, n) => [`$${v}K`, n.charAt(0).toUpperCase() + n.slice(1)]} contentStyle={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12 }} />
            <Legend wrapperStyle={{ fontSize: 11, color: 'var(--text-muted)' }} />
            <Line type="monotone" dataKey="payments" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} name="Payments" />
            <Line type="monotone" dataKey="wires"    stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} name="Wires" />
            <Line type="monotone" dataKey="failed"   stroke="#ef4444" strokeWidth={2} dot={{ r: 4 }} name="Failed" />
          </LineChart>
        </ResponsiveContainer>
      </Section>
    </>
  )

  const TAB_CONTENT = { overview: <OverviewTab />, payment: <PaymentTab />, wire: <WireTab />, escrow: <EscrowTab />, scheduled: <ScheduledTab />, history: <HistoryTab />, monitor: <MonitorTab /> }

  return (
    <div>
      {/* Page Header */}
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-primary)' }}>💰 Transactions & Payments</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 4 }}>Manage payments, wire transfers, escrow accounts, and transaction history</p>
      </div>

      {/* Tab Bar */}
      <div style={{ display: 'flex', gap: 2, marginBottom: 24, overflowX: 'auto', paddingBottom: 2 }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => { setTab(t.id); if (t.id !== 'payment') setPayStep('form') }}
            style={{ padding: '9px 16px', borderRadius: 8, fontWeight: 600, fontSize: 12, whiteSpace: 'nowrap', border: 'none', cursor: 'pointer', background: tab === t.id ? 'var(--blue)' : 'var(--bg-elevated)', color: tab === t.id ? '#fff' : 'var(--text-secondary)', transition: 'all 0.15s' }}>
            {t.label}
          </button>
        ))}
      </div>

      {TAB_CONTENT[tab] || null}
    </div>
  )
}


