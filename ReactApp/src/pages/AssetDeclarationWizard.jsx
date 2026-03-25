import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ASSET_CATEGORIES = [
  { id: 'liquid', label: 'Liquid Assets', icon: '🏦', desc: 'Checking, Savings, Money Market, CDs, Cash' },
  { id: 'investment', label: 'Investment & Retirement', icon: '📈', desc: 'Stocks, Bonds, 401(k), IRA, Mutual Funds, Crypto' },
  { id: 'realestate', label: 'Real Estate Owned', icon: '🏘️', desc: 'Primary, Investment Properties, Land, Commercial' },
  { id: 'business', label: 'Business & Other', icon: '🏢', desc: 'Business ownership, Life insurance, Vehicles, Trusts' },
]

const ASSET_TYPES = {
  liquid: [
    { id: 'BA-001', label: 'Checking Account', icon: '🏦' },
    { id: 'BA-002', label: 'Savings Account', icon: '💳' },
    { id: 'BA-003', label: 'Money Market Account', icon: '📊' },
    { id: 'BA-004', label: 'Certificate of Deposit (CD)', icon: '🗂️' },
    { id: 'BA-005', label: 'Cash on Hand', icon: '💵' },
    { id: 'BA-006', label: 'Gift Funds', icon: '🎁' },
  ],
  investment: [
    { id: 'BA-010', label: 'Stocks / Equities', icon: '📈' },
    { id: 'BA-011', label: 'Bonds', icon: '📜' },
    { id: 'BA-012', label: 'Mutual Funds / ETFs', icon: '🧩' },
    { id: 'BA-013', label: '401(k) / 403(b)', icon: '🏅' },
    { id: 'BA-014', label: 'IRA / Roth IRA', icon: '🔐' },
    { id: 'BA-015', label: 'Pension Plan', icon: '🎖️' },
    { id: 'BA-016', label: 'Crypto Assets', icon: '₿' },
  ],
  realestate: [
    { id: 'BA-020', label: 'Primary Residence', icon: '🏠' },
    { id: 'BA-021', label: 'Investment Property', icon: '🏗️' },
    { id: 'BA-022', label: 'Vacant Land', icon: '🌿' },
    { id: 'BA-023', label: 'Commercial Property', icon: '🏢' },
  ],
  business: [
    { id: 'BA-030', label: 'Business Ownership', icon: '💼' },
    { id: 'BA-031', label: 'Life Insurance (CSV)', icon: '📋' },
    { id: 'BA-032', label: 'Receivables / Notes', icon: '📝' },
    { id: 'BA-033', label: 'Automobile / Vehicle', icon: '🚗' },
    { id: 'BA-034', label: 'Jewelry / Art / Collectibles', icon: '💎' },
    { id: 'BA-035', label: 'Trust Assets', icon: '⚖️' },
  ],
}

const ADDED_ASSETS = [
  { type: 'Checking Account', institution: 'Chase Bank', value: '$42,000', status: 'Verified', icon: '🏦' },
  { type: 'Savings Account', institution: 'Chase Bank', value: '$28,000', status: 'Verified', icon: '💳' },
  { type: '401(k)', institution: 'Vanguard', value: '$185,000', status: 'Pending', icon: '🏅' },
]

export default function AssetDeclarationWizard() {
  const [activeCategory, setActiveCategory] = useState('liquid')
  const [selectedType, setSelectedType] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const navigate = useNavigate()

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800 }}>Asset Declaration Wizard</h1>
          <p style={{ color: '#64748b', fontSize: 13, marginTop: 4 }}>Step 4 of 7 — Declare all assets for Application #APP-2026-001842</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-secondary btn-sm" onClick={() => navigate('/assets/overview')}>View Summary →</button>
          <button className="btn btn-primary btn-sm">Save Progress</button>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 24, padding: '14px 20px', background: '#1e293b', borderRadius: 10, border: '1px solid #334155' }}>
        {['Total Assets', 'Verified', 'Pending', 'Completion'].map((label, i) => {
          const vals = ['$255,000', '$70,000', '$185,000', '72%']
          const colors = ['#3b82f6', '#34d399', '#fbbf24', '#a78bfa']
          return (
            <div key={label} style={{ flex: 1, borderRight: i < 3 ? '1px solid #334155' : 'none', paddingRight: i < 3 ? 16 : 0 }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: colors[i] }}>{vals[i]}</div>
              <div style={{ fontSize: 11, color: '#64748b', marginTop: 2 }}>{label}</div>
            </div>
          )
        })}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 20 }}>
        {/* Sidebar category list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {ASSET_CATEGORIES.map(cat => (
            <div
              key={cat.id}
              onClick={() => { setActiveCategory(cat.id); setShowForm(false); setSelectedType(null) }}
              style={{
                padding: '14px 16px',
                background: activeCategory === cat.id ? 'rgba(59,130,246,0.1)' : '#1e293b',
                border: `1px solid ${activeCategory === cat.id ? '#3b82f6' : '#334155'}`,
                borderRadius: 10,
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 20 }}>{cat.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: activeCategory === cat.id ? '#f1f5f9' : '#94a3b8' }}>{cat.label}</div>
                  <div style={{ fontSize: 11, color: '#475569', marginTop: 2, lineHeight: 1.3 }}>{cat.desc}</div>
                </div>
              </div>
            </div>
          ))}

          {/* Added assets summary */}
          {ADDED_ASSETS.length > 0 && (
            <div style={{ marginTop: 8 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Added Assets</div>
              {ADDED_ASSETS.map((a, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', background: '#1e293b', borderRadius: 8, marginBottom: 6, border: '1px solid #334155' }}>
                  <span>{a.icon}</span>
                  <div style={{ flex: 1, overflow: 'hidden' }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: '#f1f5f9', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.institution}</div>
                    <div style={{ fontSize: 11, color: '#64748b' }}>{a.type}</div>
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 700 }}>{a.value}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Main area */}
        <div>
          {!showForm ? (
            <div className="card">
              <div style={{ marginBottom: 18 }}>
                <div style={{ fontSize: 16, fontWeight: 700 }}>
                  {ASSET_CATEGORIES.find(c => c.id === activeCategory)?.label}
                </div>
                <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>Select an asset type to add</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
                {ASSET_TYPES[activeCategory].map(type => (
                  <div
                    key={type.id}
                    onClick={() => { setSelectedType(type); setShowForm(true) }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 12,
                      padding: '14px 16px',
                      background: '#263348',
                      border: '1px solid #334155',
                      borderRadius: 10,
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#3b82f6'; e.currentTarget.style.background = 'rgba(59,130,246,0.07)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = '#334155'; e.currentTarget.style.background = '#263348' }}
                  >
                    <span style={{ fontSize: 24, flexShrink: 0 }}>{type.icon}</span>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#f1f5f9' }}>{type.label}</div>
                      <div style={{ fontSize: 10, color: '#475569', marginTop: 2 }}>{type.id}</div>
                    </div>
                    <span style={{ marginLeft: 'auto', color: '#334155', fontSize: 16 }}>+</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <AssetForm type={selectedType} category={activeCategory} onBack={() => setShowForm(false)} onSave={() => setShowForm(false)} />
          )}
        </div>
      </div>
    </div>
  )
}

function AssetForm({ type, category, onBack, onSave }) {
  const isCrypto = type?.id === 'BA-016'
  const isGift = type?.id === 'BA-006'
  const isRE = category === 'realestate'
  const is401k = type?.id === 'BA-013' || type?.id === 'BA-014'

  return (
    <div className="card">
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, paddingBottom: 16, borderBottom: '1px solid #334155' }}>
        <button className="btn btn-ghost btn-sm" onClick={onBack}>← Back</button>
        <span style={{ fontSize: 22 }}>{type?.icon}</span>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700 }}>{type?.label}</div>
          <div style={{ fontSize: 11, color: '#64748b' }}>Form {type?.id}</div>
        </div>
      </div>

      {isCrypto && (
        <div className="alert alert-warning" style={{ marginBottom: 16 }}>
          <span>⚠️</span>
          <span>Cryptocurrency assets are <strong>not eligible</strong> for down payment on conventional loans. They may be accepted on Non-QM products with additional documentation.</span>
        </div>
      )}

      <div className="form-row">
        {!isGift && !isRE && (
          <>
            <div className="form-group">
              <label className="form-label">INSTITUTION NAME *</label>
              <input placeholder={isCrypto ? 'e.g., Coinbase, Binance' : 'e.g., Chase Bank, Vanguard'} />
            </div>
            <div className="form-group">
              <label className="form-label">ACCOUNT NUMBER (LAST 4) *</label>
              <input placeholder="XXXX" maxLength={4} />
            </div>
          </>
        )}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">CURRENT VALUE / BALANCE *</label>
          <input type="number" placeholder="0.00" />
        </div>
        <div className="form-group">
          <label className="form-label">VALUE AS OF DATE *</label>
          <input type="date" defaultValue="2026-03-25" />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">OWNERSHIP TYPE</label>
          <select><option>Individual</option><option>Joint</option><option>Trust</option><option>Business</option></select>
        </div>
        <div className="form-group">
          <label className="form-label">CURRENCY</label>
          <select><option>USD</option><option>INR</option><option>CAD</option><option>GBP</option></select>
        </div>
      </div>

      {isCrypto && (
        <div className="form-row">
          <div className="form-group"><label className="form-label">EXCHANGE / WALLET</label><input placeholder="Coinbase" /></div>
          <div className="form-group"><label className="form-label">COIN TYPE</label>
            <select><option>Bitcoin (BTC)</option><option>Ethereum (ETH)</option><option>Other</option></select>
          </div>
        </div>
      )}
      {isGift && (
        <>
          <div className="form-row">
            <div className="form-group"><label className="form-label">DONOR NAME *</label><input placeholder="Robert Doe" /></div>
            <div className="form-group"><label className="form-label">RELATIONSHIP *</label>
              <select><option>Parent</option><option>Sibling</option><option>Grandparent</option><option>Domestic Partner</option></select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group"><label className="form-label">GIFT AMOUNT *</label><input type="number" placeholder="0.00" /></div>
            <div className="form-group"><label className="form-label">TRANSFER METHOD</label>
              <select><option>Wire</option><option>ACH</option><option>Check</option></select>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">FUNDS LOCATION</label>
            <select><option>In Borrower Account</option><option>Held by Donor</option><option>In Escrow</option></select>
          </div>
        </>
      )}
      {isRE && (
        <>
          <div className="form-group"><label className="form-label">PROPERTY ADDRESS *</label><input placeholder="123 Main St, City, ST 00000" /></div>
          <div className="form-row">
            <div className="form-group"><label className="form-label">MARKET VALUE *</label><input type="number" placeholder="0.00" /></div>
            <div className="form-group"><label className="form-label">MORTGAGE BALANCE</label><input type="number" placeholder="0.00" /></div>
          </div>
          <div className="form-row">
            <div className="form-group"><label className="form-label">MONTHLY RENTAL INCOME</label><input type="number" placeholder="0.00" /></div>
            <div className="form-group"><label className="form-label">PROPERTY TYPE</label>
              <select><option>Single Family</option><option>Condo</option><option>Multi-Family</option><option>Commercial</option></select>
            </div>
          </div>
        </>
      )}
      {is401k && (
        <div className="form-row">
          <div className="form-group"><label className="form-label">VESTED BALANCE *</label><input type="number" placeholder="0.00" /></div>
          <div className="form-group"><label className="form-label">LOAN AGAINST ACCOUNT</label><input type="number" placeholder="0.00 (if any)" /></div>
        </div>
      )}

      {/* Document upload */}
      <div style={{ marginTop: 16 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: '#94a3b8', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Supporting Documents</div>
        <DocUpload label={isGift ? 'Gift Letter (Required)' : 'Statement / Certificate (Required)'} required />
        {isGift && <DocUpload label="Donor Bank Statement (Required)" required />}
        {is401k && <DocUpload label="Most Recent Quarterly Statement (Required)" required />}
        {!isGift && !is401k && <DocUpload label="Additional Statement (Optional)" />}
      </div>

      <div style={{ marginTop: 20, display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
        <button className="btn btn-secondary" onClick={onBack}>Cancel</button>
        <button className="btn btn-primary" onClick={onSave}>✓ Save Asset</button>
      </div>
    </div>
  )
}

function DocUpload({ label, required }) {
  return (
    <div style={{
      border: `2px dashed ${required ? '#334155' : '#1e293b'}`,
      borderRadius: 8, padding: '14px 16px', marginBottom: 10,
      display: 'flex', alignItems: 'center', gap: 12,
      background: 'rgba(255,255,255,0.01)', cursor: 'pointer',
    }}>
      <span style={{ fontSize: 20 }}>📎</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: '#94a3b8' }}>{label}</div>
        <div style={{ fontSize: 11, color: '#475569' }}>Drag & drop or click to upload · PDF, JPG, PNG</div>
      </div>
      {required && <span className="badge badge-red" style={{ fontSize: 10 }}>Required</span>}
      <button className="btn btn-secondary btn-sm">Browse</button>
    </div>
  )
}
