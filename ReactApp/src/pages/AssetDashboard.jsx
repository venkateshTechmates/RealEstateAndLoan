import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ASSETS = [
  {
    id: 'A001', category: 'Cash & Deposits', type: 'Checking', institution: 'Chase Bank',
    name: 'Chase Checking', accountNo: '****1234', balance: 25000, status: 'Verified',
    verifiedDate: 'Mar 25, 2026', statementDate: 'Mar 15, 2026', fresh: true, purpose: ['Down Payment'],
  },
  {
    id: 'A002', category: 'Cash & Deposits', type: 'Savings', institution: 'Chase Bank',
    name: 'Chase Savings', accountNo: '****5678', balance: 85000, status: 'Verified',
    verifiedDate: 'Mar 25, 2026', statementDate: 'Mar 15, 2026', fresh: true, purpose: ['Reserves'],
  },
  {
    id: 'A003', category: 'Cash & Deposits', type: 'CD', institution: 'Marcus (Goldman)',
    name: 'Marcus CD', accountNo: '****9012', balance: 60000, status: 'Pending',
    verifiedDate: null, statementDate: null, maturity: 'Sep 15, 2026', fresh: false,
    purpose: ['Reserves'],
  },
  {
    id: 'A004', category: 'Investment Assets', type: 'Brokerage', institution: 'Vanguard',
    name: 'Vanguard S&P 500 ETF', accountNo: '****5678', balance: 65000, status: 'Verified',
    verifiedDate: 'Mar 24, 2026', trend30: 5.9, trend90: 12.1, risk: 'Moderate', purpose: ['Reserves'],
  },
  {
    id: 'A005', category: 'Investment Assets', type: 'Stock', institution: 'Fidelity',
    name: 'Apple Stock (AAPL)', accountNo: '****4321', balance: 25000, status: 'Verified',
    verifiedDate: 'Mar 24, 2026', trend30: -3.0, trend90: 8.2, risk: 'Moderate', purpose: ['Reserves'],
  },
  {
    id: 'A006', category: 'Investment Assets', type: '401k', institution: 'Vanguard',
    name: '401(k) Vanguard TR Fund', accountNo: '****KX29', balance: 185000, status: 'Verified',
    verifiedDate: 'Mar 22, 2026', risk: 'Low', vestedPct: 100, purpose: ['Reserves'],
  },
  {
    id: 'A007', category: 'Cryptocurrency', type: 'Crypto', institution: 'Coinbase',
    name: 'Coinbase - Bitcoin', accountNo: null, balance: 25000, status: 'Questioned',
    questionedDate: 'Mar 25, 2026', actionRequired: 'Upload 90-day exchange statement', purpose: [],
  },
  {
    id: 'A008', category: 'Gift Funds', type: 'Gift', institution: null,
    name: 'Parent Gift', accountNo: null, balance: 35000, status: 'Verified',
    verifiedDate: 'Mar 25, 2026', donor: 'Robert Doe', relationship: 'Parent', transfer: 'Wire',
    purpose: ['Down Payment'],
  },
]

const STATUS_META = {
  Verified:   { icon: '✅', color: '#4ade80', bg: 'rgba(74,222,128,0.12)' },
  Pending:    { icon: '⏳', color: '#facc15', bg: 'rgba(250,204,21,0.12)' },
  Questioned: { icon: '❓', color: '#fb923c', bg: 'rgba(251,146,60,0.12)' },
  Rejected:   { icon: '✗',  color: '#f87171', bg: 'rgba(248,113,113,0.12)' },
  'In Review':{ icon: '🔍', color: '#60a5fa', bg: 'rgba(96,165,250,0.12)' },
}

const CATEGORIES = ['Cash & Deposits', 'Investment Assets', 'Cryptocurrency', 'Gift Funds', 'Retirement', 'Real Estate', 'Business Assets']
const CAT_ICON = { 'Cash & Deposits': '💰', 'Investment Assets': '📈', 'Cryptocurrency': '₿', 'Gift Funds': '🎁', 'Retirement': '🏦', 'Real Estate': '🏠', 'Business Assets': '💼' }

export default function AssetDashboard() {
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState({})
  const [showAddModal, setShowAddModal] = useState(false)
  const [searchQ, setSearchQ] = useState('')

  const totalAssets = ASSETS.reduce((s, a) => s + a.balance, 0)
  const liquidAssets = ASSETS.filter(a => ['Cash & Deposits', 'Gift Funds'].includes(a.category)).reduce((s, a) => s + a.balance, 0)
  const downPmtRequired = 55000
  const downPmtCoverage = ((liquidAssets) / downPmtRequired).toFixed(1)

  const verifiedCount = ASSETS.filter(a => a.status === 'Verified').length
  const pendingCount  = ASSETS.filter(a => a.status === 'Pending').length
  const questionedCount = ASSETS.filter(a => a.status === 'Questioned').length
  const rejectedCount = ASSETS.filter(a => a.status === 'Rejected').length
  const totalCount = ASSETS.length

  const grouped = CATEGORIES.map(cat => ({
    cat,
    items: ASSETS.filter(a => a.category === cat && (searchQ === '' || a.name.toLowerCase().includes(searchQ.toLowerCase()) || a.institution?.toLowerCase().includes(searchQ.toLowerCase()))),
  })).filter(g => g.items.length > 0)

  const toggle = cat => setCollapsed(s => ({ ...s, [cat]: !s[cat] }))

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800 }}>My Assets</h1>
          <p style={{ color: '#64748b', fontSize: 13, marginTop: 4 }}>Application #: APP-2026-0421 &nbsp;·&nbsp; Status: <span style={{ color: '#60a5fa', fontWeight: 600 }}>In Review</span></p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-ghost" style={{ color: '#60a5fa' }}>🔄 Refresh</button>
          <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>+ Add Asset</button>
        </div>
      </div>

      {/* Summary stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 20 }}>
        {[
          { icon: '💰', label: 'TOTAL ASSETS', value: `$${(totalAssets / 1000).toFixed(0)}K`, sub: '▲ +5.9% vs last month', color: '#60a5fa' },
          { icon: '💵', label: 'LIQUID ASSETS', value: `$${(liquidAssets / 1000).toFixed(0)}K`, sub: '▲ +8.2% vs last month', color: '#4ade80' },
          { icon: '🎯', label: 'DOWN PAYMENT', value: `$${(downPmtRequired / 1000).toFixed(0)}K`, sub: `✅ ${downPmtCoverage}x coverage`, color: '#a78bfa' },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div style={{ fontSize: 26, marginBottom: 8 }}>{s.icon}</div>
            <div style={{ fontSize: 11, color: '#475569', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>{s.label}</div>
            <div style={{ fontSize: 26, fontWeight: 900, color: s.color, marginBottom: 4 }}>{s.value}</div>
            <div style={{ fontSize: 12, color: s.sub.startsWith('▲') ? '#4ade80' : '#64748b' }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Verification progress */}
      <div className="card" style={{ marginBottom: 20 }}>
        <div style={{ fontWeight: 700, marginBottom: 12 }}>Verification Progress</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#64748b', marginBottom: 6 }}>
          <span>Overall Progress</span>
          <span style={{ fontWeight: 700, color: '#4ade80' }}>{verifiedCount}/{totalCount} ({Math.round(verifiedCount / totalCount * 100)}%)</span>
        </div>
        <div style={{ height: 12, background: '#334155', borderRadius: 10, marginBottom: 14 }}>
          <div style={{ height: 12, borderRadius: 10, width: `${(verifiedCount / totalCount) * 100}%`, background: 'linear-gradient(90deg, #3b82f6, #4ade80)', transition: 'width 0.4s' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
          {[
            ['⏳ Pending', pendingCount, '#facc15'],
            ['✅ Verified', verifiedCount, '#4ade80'],
            ['❓ Questioned', questionedCount, '#fb923c'],
            ['✗ Rejected', rejectedCount, '#f87171'],
          ].map(([label, count, color]) => (
            <div key={label} style={{ textAlign: 'center', background: '#1e293b', borderRadius: 8, padding: '10px 4px', border: `1px solid ${color}33` }}>
              <div style={{ fontSize: 20, fontWeight: 800, color }}>{count}</div>
              <div style={{ fontSize: 11, color: '#64748b', marginTop: 3 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Search */}
      <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 10, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
        <span style={{ color: '#475569' }}>🔍</span>
        <input
          value={searchQ}
          onChange={e => setSearchQ(e.target.value)}
          placeholder="Search assets by name, institution…"
          style={{ background: 'none', border: 'none', outline: 'none', flex: 1, color: '#f1f5f9', fontSize: 13 }}
        />
        <button className="btn btn-ghost" style={{ fontSize: 12, color: '#64748b' }}>Filter ▼</button>
      </div>

      {/* Grouped asset list */}
      {grouped.map(({ cat, items }) => {
        const catTotal = items.reduce((s, a) => s + a.balance, 0)
        const catVerified = items.filter(a => a.status === 'Verified').length
        const isOpen = !collapsed[cat]

        return (
          <div key={cat} className="card" style={{ padding: 0, marginBottom: 14, overflow: 'hidden' }}>
            <button
              onClick={() => toggle(cat)}
              style={{
                width: '100%', background: 'none', border: 'none', cursor: 'pointer',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '14px 18px', color: '#f1f5f9',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 18 }}>{CAT_ICON[cat]}</span>
                <span style={{ fontWeight: 700, fontSize: 14 }}>{cat}</span>
                <span className="badge" style={{ background: '#334155', color: '#94a3b8', fontSize: 11 }}>{items.length}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 13 }}>
                <span style={{ color: '#94a3b8' }}>Total: <strong style={{ color: '#f1f5f9' }}>${catTotal.toLocaleString()}</strong></span>
                <span>
                  Status: <strong style={{ color: catVerified === items.length ? '#4ade80' : questionedCount > 0 ? '#fb923c' : '#facc15' }}>
                    {catVerified}/{items.length} ✅
                  </strong>
                </span>
                <span style={{ color: '#475569', fontSize: 14 }}>{isOpen ? '▲' : '▼'}</span>
              </div>
            </button>

            {isOpen && (
              <div style={{ borderTop: '1px solid #334155' }}>
                {items.map((asset, i) => (
                  <AssetRow key={asset.id} asset={asset} last={i === items.length - 1} onView={() => navigate(`/assets/detail/${asset.id}`)} />
                ))}
              </div>
            )}
          </div>
        )
      })}

      {/* Help section */}
      <div className="card" style={{ background: 'rgba(59,130,246,0.05)', border: '1px solid rgba(59,130,246,0.15)' }}>
        <div style={{ fontWeight: 700, marginBottom: 10, color: '#60a5fa' }}>Need Help?</div>
        <div style={{ display: 'flex', gap: 24, fontSize: 13, color: '#64748b' }}>
          <span>💬 <span style={{ color: '#60a5fa', cursor: 'pointer' }}>Chat with Support</span></span>
          <span>📞 1-800-555-1234</span>
          <span>📧 help@loanplatform.com</span>
        </div>
      </div>

      {showAddModal && <AddAssetModal onClose={() => setShowAddModal(false)} />}
    </div>
  )
}

function AssetRow({ asset: a, last, onView }) {
  const sm = STATUS_META[a.status] || STATUS_META.Pending
  return (
    <div style={{ padding: '16px 18px', borderBottom: last ? 'none' : '1px solid #1e293b', background: 'transparent' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <div style={{ width: 36, height: 36, borderRadius: 8, background: sm.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0, marginTop: 2 }}>
            {sm.icon}
          </div>
          <div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 3 }}>
              <span style={{ fontSize: 14, fontWeight: 700 }}>{a.name}</span>
              <span className="badge" style={{ background: sm.bg, color: sm.color, fontSize: 11 }}>{a.status}</span>
              {a.fresh && <span className="badge badge-green" style={{ fontSize: 10 }}>Fresh</span>}
            </div>
            <div style={{ fontSize: 12, color: '#64748b', display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              {a.accountNo && <span>Account: {a.accountNo}</span>}
              {a.statementDate && <span>Statement: {a.statementDate}</span>}
              {a.maturity && <span>Maturity: {a.maturity}</span>}
              {a.donor && <span>Donor: {a.donor} ({a.relationship})</span>}
              {a.trend30 !== undefined && (
                <span style={{ color: a.trend30 >= 0 ? '#4ade80' : '#f87171' }}>
                  📈 30-day: {a.trend30 >= 0 ? '+' : ''}{a.trend30}%
                </span>
              )}
            </div>
            {a.actionRequired && (
              <div style={{ marginTop: 8, background: 'rgba(251,146,60,0.1)', border: '1px solid rgba(251,146,60,0.2)', borderRadius: 8, padding: '8px 12px', fontSize: 13, color: '#fb923c' }}>
                ⚠️ Action Required: {a.actionRequired}
              </div>
            )}
          </div>
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: 16 }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: '#f1f5f9', marginBottom: 4 }}>${a.balance.toLocaleString()}</div>
          {a.verifiedDate && <div style={{ fontSize: 11, color: '#475569' }}>Verified: {a.verifiedDate}</div>}
          {a.questionedDate && <div style={{ fontSize: 11, color: '#fb923c' }}>Questioned: {a.questionedDate}</div>}
        </div>
      </div>
      <div style={{ marginTop: 10, display: 'flex', gap: 8, paddingLeft: 48 }}>
        <button className="btn btn-ghost" style={{ fontSize: 12, color: '#60a5fa' }} onClick={onView}>View Details</button>
        {a.status === 'Verified' && <button className="btn btn-ghost" style={{ fontSize: 12 }}>📥 Download Statement</button>}
        {a.status === 'Pending' && <button className="btn btn-secondary" style={{ fontSize: 12 }}>📎 Upload Statement</button>}
        {a.status === 'Questioned' && <button className="btn btn-primary" style={{ fontSize: 12 }}>📎 Upload Statement</button>}
        {a.status !== 'Verified' && <button className="btn btn-ghost" style={{ fontSize: 12 }}>✏️ Edit</button>}
        {a.status === 'Questioned' && <button className="btn btn-ghost" style={{ fontSize: 12 }}>💬 Contact Support</button>}
        {a.status !== 'Verified' && <button className="btn btn-ghost" style={{ fontSize: 12, color: '#f87171' }}>🗑 Delete</button>}
      </div>
    </div>
  )
}

const ASSET_TYPES = [
  { icon: '💰', label: 'Cash & Deposits' },
  { icon: '📈', label: 'Investment' },
  { icon: '🏦', label: 'Retirement' },
  { icon: '🏠', label: 'Real Estate' },
  { icon: '₿', label: 'Crypto' },
  { icon: '💼', label: 'Business' },
  { icon: '🎁', label: 'Gift Funds' },
  { icon: '🏭', label: 'Other' },
]

function AddAssetModal({ onClose }) {
  const [step, setStep] = useState(1)
  const [assetType, setAssetType] = useState(null)
  const [form, setForm] = useState({ institution: '', accountType: 'Checking', accountNo: '', holderName: 'John Doe', balance: '', statementDate: '', purposes: [] })
  const [verifyMethod, setVerifyMethod] = useState(null)

  const togglePurpose = p => setForm(f => ({
    ...f,
    purposes: f.purposes.includes(p) ? f.purposes.filter(x => x !== p) : [...f.purposes, p],
  }))

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 16, width: 640, maxHeight: '90vh', overflowY: 'auto', padding: 28 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div style={{ fontSize: 18, fontWeight: 800 }}>Add Asset</div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#64748b', fontSize: 22, cursor: 'pointer' }}>✕</button>
        </div>

        {/* Step indicators */}
        <div style={{ display: 'flex', gap: 0, marginBottom: 28 }}>
          {[1, 2, 3].map(s => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 26, height: 26, borderRadius: '50%', background: s <= step ? '#3b82f6' : '#334155', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: s <= step ? '#fff' : '#475569' }}>{s}</div>
                <span style={{ fontSize: 12, color: s === step ? '#f1f5f9' : '#475569' }}>
                  {s === 1 ? 'Select Type' : s === 2 ? 'Enter Details' : 'Verify'}
                </span>
              </div>
              {s < 3 && <div style={{ flex: 1, height: 2, background: s < step ? '#3b82f6' : '#334155', margin: '0 8px' }} />}
            </div>
          ))}
        </div>

        {/* Step 1: Asset type */}
        {step === 1 && (
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 14 }}>Select Asset Type</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 24 }}>
              {ASSET_TYPES.map(t => (
                <button key={t.label} onClick={() => setAssetType(t.label)} style={{ background: assetType === t.label ? 'rgba(59,130,246,0.2)' : '#263348', border: `2px solid ${assetType === t.label ? '#3b82f6' : '#334155'}`, borderRadius: 10, padding: 14, cursor: 'pointer', textAlign: 'center', transition: 'all 0.15s' }}>
                  <div style={{ fontSize: 28, marginBottom: 6 }}>{t.icon}</div>
                  <div style={{ fontSize: 12, color: assetType === t.label ? '#60a5fa' : '#94a3b8', fontWeight: assetType === t.label ? 700 : 400 }}>{t.label}</div>
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
              <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
              <button className="btn btn-primary" disabled={!assetType} onClick={() => setStep(2)} style={{ opacity: !assetType ? 0.5 : 1 }}>Continue →</button>
            </div>
          </div>
        )}

        {/* Step 2: Details */}
        {step === 2 && (
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 14 }}>Enter Asset Details <span style={{ color: '#475569', fontWeight: 400, fontSize: 12 }}>— {assetType}</span></div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div className="form-group">
                <label className="form-label">FINANCIAL INSTITUTION *</label>
                <input value={form.institution} onChange={e => setForm({ ...form, institution: e.target.value })} placeholder="e.g., Chase Bank" />
              </div>
              <div className="form-group">
                <label className="form-label">ACCOUNT NUMBER (last 4) *</label>
                <input value={form.accountNo} onChange={e => setForm({ ...form, accountNo: e.target.value })} placeholder="****1234" />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">ACCOUNT TYPE *</label>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                {['Checking', 'Savings', 'Money Market', 'Certificate of Deposit (CD)'].map(t => (
                  <label key={t} style={{ display: 'flex', gap: 8, alignItems: 'center', cursor: 'pointer', fontSize: 13 }}>
                    <input type="radio" name="acctType" checked={form.accountType === t} onChange={() => setForm({ ...form, accountType: t })} />
                    {t}
                  </label>
                ))}
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div className="form-group">
                <label className="form-label">ACCOUNT HOLDER NAME *</label>
                <input value={form.holderName} onChange={e => setForm({ ...form, holderName: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">CURRENT BALANCE *</label>
                <input value={form.balance} onChange={e => setForm({ ...form, balance: e.target.value })} placeholder="$25,000.00" />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">STATEMENT DATE *</label>
              <input type="date" value={form.statementDate} onChange={e => setForm({ ...form, statementDate: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">PURPOSE OF FUNDS (select all that apply) *</label>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                {['Down Payment', 'Reserves', 'Closing Costs', 'Other'].map(p => (
                  <label key={p} style={{ display: 'flex', gap: 8, alignItems: 'center', cursor: 'pointer', fontSize: 13 }}>
                    <input type="checkbox" checked={form.purposes.includes(p)} onChange={() => togglePurpose(p)} />
                    {p}
                  </label>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
              <button className="btn btn-ghost" onClick={() => setStep(1)}>← Back</button>
              <div style={{ display: 'flex', gap: 10 }}>
                <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
                <button className="btn btn-primary" onClick={() => setStep(3)}>Continue →</button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Verify */}
        {step === 3 && (
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 14 }}>Verify Asset</div>
            <div style={{ fontSize: 13, color: '#64748b', marginBottom: 16 }}>How would you like to verify this account?</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
              {[
                { id: 'plaid', icon: '🔌', title: 'Connect with Plaid (Recommended)', sub: 'Fastest way to verify — connects directly to your bank', badge: 'Recommended' },
                { id: 'upload', icon: '📎', title: 'Upload Bank Statement', sub: 'Upload PDF or image of your statement (last 3 months required)', badge: null },
                { id: 'manual', icon: '✍️', title: 'Enter Manually', sub: 'Enter details manually (requires processor review)', badge: null },
              ].map(m => (
                <button key={m.id} onClick={() => setVerifyMethod(m.id)} style={{ background: verifyMethod === m.id ? 'rgba(59,130,246,0.12)' : '#263348', border: `2px solid ${verifyMethod === m.id ? '#3b82f6' : '#334155'}`, borderRadius: 10, padding: 16, cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s' }}>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <span style={{ fontSize: 24 }}>{m.icon}</span>
                    <div>
                      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 3 }}>
                        <span style={{ fontSize: 13, fontWeight: 700, color: verifyMethod === m.id ? '#60a5fa' : '#f1f5f9' }}>{m.title}</span>
                        {m.badge && <span className="badge badge-green" style={{ fontSize: 10 }}>{m.badge}</span>}
                      </div>
                      <div style={{ fontSize: 12, color: '#64748b' }}>{m.sub}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
              <button className="btn btn-ghost" onClick={() => setStep(2)}>← Back</button>
              <div style={{ display: 'flex', gap: 10 }}>
                <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
                <button className="btn btn-primary" disabled={!verifyMethod} onClick={onClose} style={{ opacity: !verifyMethod ? 0.5 : 1 }}>
                  Add Asset →
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
