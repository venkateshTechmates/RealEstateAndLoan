import { useState } from 'react'

const PROPERTIES = [
  { id: 1, address: '789 Maple Drive, Austin, TX 78750', type: 'Single Family', beds: 4, baths: 3, sqft: 2850, price: 540000, status: 'Active - Pre-Approval', image: '🏡', zip: '78750', year: 2018, hoa: 0, tax: 9800 },
  { id: 2, address: '234 Cedar Lane, Austin, TX 78759', type: 'Single Family', beds: 3, baths: 2, sqft: 2100, price: 485000, status: 'Active', image: '🏠', zip: '78759', year: 2015, hoa: 0, tax: 8600 },
  { id: 3, address: '567 Pine Court, Round Rock, TX 78664', type: 'Townhouse', beds: 3, baths: 2.5, sqft: 1920, price: 415000, status: 'Active', image: '🏘️', zip: '78664', year: 2020, hoa: 240, tax: 7400 },
  { id: 4, address: '1012 Oak Blvd #4B, Austin, TX 78702', type: 'Condo', beds: 2, baths: 2, sqft: 1350, price: 360000, status: 'Active', image: '🏢', zip: '78702', year: 2019, hoa: 420, tax: 6400 },
  { id: 5, address: '42 Lakeside Drive, Lakeway, TX 78734', type: 'Single Family', beds: 5, baths: 4, sqft: 3800, price: 725000, status: 'Active', image: '🏡', zip: '78734', year: 2021, hoa: 150, tax: 13200 },
  { id: 6, address: '88 River Oaks Trail, Austin, TX 78748', type: 'Single Family', beds: 3, baths: 2, sqft: 1780, price: 459000, status: 'Active', image: '🏠', zip: '78748', year: 2012, hoa: 0, tax: 7800 },
]

const fmt = n => n >= 1000000 ? `$${(n / 1000000).toFixed(2)}M` : `$${(n / 1000).toFixed(0)}K`

export default function PropertySearch() {
  const [filters, setFilters] = useState({ type: 'All', minPrice: '', maxPrice: '', beds: 'Any', zip: '' })
  const [selected, setSelected] = useState(PROPERTIES[0])
  const [view, setView] = useState('grid')

  const filtered = PROPERTIES.filter(p => {
    if (filters.type !== 'All' && p.type !== filters.type) return false
    if (filters.minPrice && p.price < parseInt(filters.minPrice.replace(/,/g, ''))) return false
    if (filters.maxPrice && p.price > parseInt(filters.maxPrice.replace(/,/g, ''))) return false
    if (filters.beds !== 'Any' && p.beds < parseInt(filters.beds)) return false
    if (filters.zip && !p.zip.includes(filters.zip)) return false
    return true
  })

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800 }}>Property Search</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 4 }}>MLS-linked listings · Austin, TX metro area · {filtered.length} properties found</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <div className="tab-group">
            <button className={`tab-btn${view === 'grid' ? ' active' : ''}`} onClick={() => setView('grid')}>⊞ Grid</button>
            <button className={`tab-btn${view === 'list' ? ' active' : ''}`} onClick={() => setView('list')}>☰ List</button>
          </div>
        </div>
      </div>

      {/* Search & filters */}
      <div className="card" style={{ padding: '16px 20px', marginBottom: 20 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 160px 160px 140px 140px auto', gap: 12, alignItems: 'end' }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">ADDRESS / CITY / ZIP</label>
            <input placeholder="e.g., Austin TX or 78750" value={filters.zip} onChange={e => setFilters({ ...filters, zip: e.target.value })} />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">PROPERTY TYPE</label>
            <select value={filters.type} onChange={e => setFilters({ ...filters, type: e.target.value })}>
              <option>All</option><option>Single Family</option><option>Condo</option><option>Townhouse</option>
            </select>
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">MIN PRICE</label>
            <input placeholder="$300,000" value={filters.minPrice} onChange={e => setFilters({ ...filters, minPrice: e.target.value })} />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">MAX PRICE</label>
            <input placeholder="$800,000" value={filters.maxPrice} onChange={e => setFilters({ ...filters, maxPrice: e.target.value })} />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">MIN BEDS</label>
            <select value={filters.beds} onChange={e => setFilters({ ...filters, beds: e.target.value })}>
              <option>Any</option><option>2</option><option>3</option><option>4</option><option>5</option>
            </select>
          </div>
          <button className="btn btn-primary" style={{ height: 38, alignSelf: 'flex-end' }}>🔍 Search</button>
        </div>
      </div>

      {/* Pre-approval callout */}
      <div className="alert alert-success" style={{ marginBottom: 20 }}>
        <span>🎉</span>
        <div>
          <strong>Pre-Qualified for up to $520,000.</strong> Properties within your budget are highlighted. Rate lock expires Apr 30, 2026.
        </div>
      </div>

      <div className="resp-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 20 }}>
        {/* Property grid */}
        <div style={{ display: 'grid', gridTemplateColumns: view === 'grid' ? '1fr 1fr' : '1fr', gap: 16 }}>
          {filtered.map(p => (
            <PropertyCard key={p.id} property={p} selected={selected?.id === p.id} onClick={() => setSelected(p)} />
          ))}
        </div>

        {/* Detail panel */}
        {selected && <PropertyDetail property={selected} />}
      </div>
    </div>
  )
}

function PropertyCard({ property: p, selected, onClick }) {
  const inBudget = p.price <= 520000
  return (
    <div
      onClick={onClick}
      style={{
        cursor: 'pointer',
        background: 'var(--bg-elevated)',
        border: `1px solid ${selected ? '#3b82f6' : 'var(--border)'}`,
        borderRadius: 12,
        overflow: 'hidden',
        transition: 'all 0.15s',
        boxShadow: selected ? '0 0 0 1px #3b82f6' : 'none',
      }}
    >
      {/* Image placeholder */}
      <div style={{
        height: 140,
        background: 'linear-gradient(135deg, var(--bg-elevated), var(--bg-elevated))',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 56, position: 'relative',
      }}>
        {p.image}
        {inBudget && (
          <span className="badge badge-green" style={{ position: 'absolute', top: 10, left: 10, fontSize: 11 }}>✓ In Budget</span>
        )}
        {p.status.includes('Pre-Approval') && (
          <span className="badge badge-blue" style={{ position: 'absolute', top: 10, right: 10, fontSize: 11 }}>Linked</span>
        )}
      </div>
      <div style={{ padding: '14px 16px' }}>
        <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>{fmt(p.price)}</div>
        <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 10, lineHeight: 1.4 }}>{p.address}</div>
        <div style={{ display: 'flex', gap: 16, fontSize: 12, color: 'var(--text-muted)' }}>
          <span>🛏 {p.beds} bd</span>
          <span>🚿 {p.baths} ba</span>
          <span>📐 {p.sqft.toLocaleString()} sqft</span>
          <span>🏗 {p.year}</span>
        </div>
        {p.hoa > 0 && <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 6 }}>HOA: ${p.hoa}/mo</div>}
      </div>
    </div>
  )
}

function PropertyDetail({ property: p }) {
  const loanAmt = Math.round(p.price * 0.9)
  const monthlyPI = Math.round((loanAmt * (0.06875 / 12)) / (1 - Math.pow(1 + 0.06875 / 12, -360)))

  return (
    <div className="card">
      <div style={{ fontSize: 48, textAlign: 'center', marginBottom: 12 }}>{p.image}</div>
      <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>{fmt(p.price)}</div>
      <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 12 }}>{p.address}</div>
      <span className={`badge ${p.status.includes('Pre-Approval') ? 'badge-blue' : 'badge-green'}`}>{p.status}</span>

      <hr className="divider" />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
        {[['Beds', `${p.beds} Bedrooms`], ['Baths', `${p.baths} Bathrooms`], ['Sqft', `${p.sqft.toLocaleString()} sq ft`], ['Year Built', p.year], ['Property Type', p.type], ['HOA', p.hoa > 0 ? `$${p.hoa}/mo` : 'None']].map(([k, v]) => (
          <div key={k} style={{ background: 'var(--bg-elevated)', borderRadius: 8, padding: '8px 12px' }}>
            <div style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>{k}</div>
            <div style={{ fontSize: 13, fontWeight: 600, marginTop: 2 }}>{v}</div>
          </div>
        ))}
      </div>

      <div style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: 10, padding: 14, marginBottom: 16 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: '#60a5fa', marginBottom: 10, textTransform: 'uppercase' }}>Est. Loan Calculation (10% Down)</div>
        {[
          ['Loan Amount', `$${loanAmt.toLocaleString()}`],
          ['Interest Rate', '6.875%'],
          ['Monthly P&I', `$${monthlyPI.toLocaleString()}`],
          ['Est. Monthly Tax', `$${Math.round(p.tax / 12).toLocaleString()}`],
          ['Est. Total Payment', `~$${(monthlyPI + Math.round(p.tax / 12) + 120).toLocaleString()}/mo`],
        ].map(([k, v]) => (
          <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, padding: '4px 0', borderBottom: '1px solid rgba(59,130,246,0.1)' }}>
            <span style={{ color: 'var(--text-muted)' }}>{k}</span>
            <span style={{ fontWeight: 600, color: v.includes('~') ? '#60a5fa' : 'var(--text-primary)' }}>{v}</span>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <button className="btn btn-primary" style={{ justifyContent: 'center' }}>📎 Link to My Application</button>
        <button className="btn btn-secondary" style={{ justifyContent: 'center' }}>📅 Schedule Tour</button>
        <button className="btn btn-ghost" style={{ justifyContent: 'center', color: '#60a5fa', fontSize: 13 }}>🔍 View Full Listing →</button>
      </div>
    </div>
  )
}
