import { useState } from 'react'

const DOCUMENTS = [
  { id: 1, name: '2025 W-2 — TechCorp Inc.', category: 'Income', status: 'Verified', size: '1.2 MB', uploaded: 'Mar 14', icon: '📄', expires: null },
  { id: 2, name: '2024 W-2 — TechCorp Inc.', category: 'Income', status: 'Verified', size: '1.1 MB', uploaded: 'Mar 14', icon: '📄', expires: null },
  { id: 3, name: 'Feb 2026 Pay Stub', category: 'Income', status: 'Verified', size: '0.5 MB', uploaded: 'Mar 15', icon: '📄', expires: null },
  { id: 4, name: 'Chase Bank Statement — Jan 2026', category: 'Assets', status: 'Verified', size: '2.4 MB', uploaded: 'Mar 16', icon: '🏦', expires: 'May 14' },
  { id: 5, name: 'Chase Bank Statement — Feb 2026', category: 'Assets', status: 'Verified', size: '2.1 MB', uploaded: 'Mar 16', icon: '🏦', expires: 'May 15' },
  { id: 6, name: 'Vanguard 401(k) Statement', category: 'Assets', status: 'Pending Review', size: '0.8 MB', uploaded: 'Mar 18', icon: '📊', expires: 'Jun 18' },
  { id: 7, name: 'Gift Letter — Robert Doe', category: 'Assets', status: 'Verified', size: '0.3 MB', uploaded: 'Mar 19', icon: '🎁', expires: null },
  { id: 8, name: 'Purchase Agreement — 789 Maple Dr', category: 'Property', status: 'Verified', size: '3.5 MB', uploaded: 'Mar 10', icon: '🏠', expires: null },
  { id: 9, name: 'Property Appraisal Report', category: 'Property', status: 'Approved', size: '4.8 MB', uploaded: 'Mar 20', icon: '📋', expires: 'Jun 20' },
  { id: 10, name: 'Initial Disclosure Package', category: 'Loan', status: 'E-Sign Required', size: '1.9 MB', uploaded: 'Mar 22', icon: '✍️', expires: 'Mar 28' },
  { id: 11, name: "Driver's License (Front + Back)", category: 'Identity', status: 'Verified', size: '0.6 MB', uploaded: 'Mar 12', icon: '🪪', expires: 'Aug 30' },
  { id: 12, name: '2024 Federal Tax Return (1040)', category: 'Income', status: 'Pending Review', size: '2.2 MB', uploaded: 'Mar 20', icon: '📄', expires: null },
]

const STATUS_COLORS = {
  'Verified': 'badge-green',
  'Approved': 'badge-green',
  'Pending Review': 'badge-yellow',
  'E-Sign Required': 'badge-blue',
  'Rejected': 'badge-red',
  'Expired': 'badge-red',
}

const CATEGORIES = ['All', 'Income', 'Assets', 'Property', 'Identity', 'Loan', 'Insurance', 'Compliance']

export default function DocumentCenter() {
  const [category, setCategory] = useState('All')
  const [dragging, setDragging] = useState(false)
  const [selectedDoc, setSelectedDoc] = useState(null)

  const filtered = category === 'All' ? DOCUMENTS : DOCUMENTS.filter(d => d.category === category)

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800 }}>Document Center</h1>
          <p style={{ color: '#64748b', fontSize: 13, marginTop: 4 }}>Application #APP-2026-001842 · {DOCUMENTS.length} documents · 1 requires action</p>
        </div>
        <button className="btn btn-primary">+ Upload Document</button>
      </div>

      {/* Stats row */}
      <div className="grid-4" style={{ marginBottom: 20 }}>
        {[
          { label: 'Total Documents', value: DOCUMENTS.length, icon: '📁', color: '#3b82f6' },
          { label: 'Verified / Approved', value: DOCUMENTS.filter(d => d.status === 'Verified' || d.status === 'Approved').length, icon: '✅', color: '#10b981' },
          { label: 'Pending Review', value: DOCUMENTS.filter(d => d.status === 'Pending Review').length, icon: '⏳', color: '#f59e0b' },
          { label: 'Action Required', value: DOCUMENTS.filter(d => d.status === 'E-Sign Required').length, icon: '✍️', color: '#ef4444' },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 22 }}>{s.icon}</span>
              <div>
                <div style={{ fontSize: 28, fontWeight: 800, color: s.color }}>{s.value}</div>
                <div style={{ fontSize: 11, color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{s.label}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* E-sign alert */}
      <div className="alert alert-info" style={{ marginBottom: 20 }}>
        <span>✍️</span>
        <div>
          <strong>E-Signature Required:</strong> "Initial Disclosure Package" must be signed by <strong>Mar 28, 2026</strong>.{' '}
          <button className="btn btn-primary btn-sm" style={{ marginLeft: 8 }}>Sign Now →</button>
        </div>
      </div>

      {/* Upload zone */}
      <div
        onDragOver={e => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={e => { e.preventDefault(); setDragging(false) }}
        style={{
          border: `2px dashed ${dragging ? '#3b82f6' : '#334155'}`,
          borderRadius: 12,
          padding: '28px 20px',
          textAlign: 'center',
          marginBottom: 20,
          background: dragging ? 'rgba(59,130,246,0.05)' : 'rgba(30,41,59,0.5)',
          transition: 'all 0.15s',
          cursor: 'pointer',
        }}
      >
        <div style={{ fontSize: 32, marginBottom: 8 }}>📤</div>
        <div style={{ fontWeight: 600, color: '#f1f5f9' }}>Drag & Drop Documents Here</div>
        <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>PDF, JPG, PNG, TIFF — Max 25 MB per file · OCR extraction automatic</div>
        <button className="btn btn-secondary btn-sm" style={{ marginTop: 12 }}>Browse Files</button>
      </div>

      {/* Category filter */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
        {CATEGORIES.map(c => (
          <button key={c} onClick={() => setCategory(c)} className={`btn btn-sm ${category === c ? 'btn-primary' : 'btn-secondary'}`}>{c}</button>
        ))}
      </div>

      {/* Document table */}
      <div className="card" style={{ padding: 0 }}>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Document</th>
                <th>Category</th>
                <th>Status</th>
                <th>Uploaded</th>
                <th>Size</th>
                <th>Expires</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(doc => (
                <tr key={doc.id} style={{ cursor: 'pointer' }} onClick={() => setSelectedDoc(doc)}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ fontSize: 20 }}>{doc.icon}</span>
                      <span style={{ fontWeight: 600, color: '#f1f5f9' }}>{doc.name}</span>
                    </div>
                  </td>
                  <td><span className="badge badge-gray">{doc.category}</span></td>
                  <td><span className={`badge ${STATUS_COLORS[doc.status] || 'badge-gray'}`}>{doc.status}</span></td>
                  <td>Mar {doc.uploaded}, 2026</td>
                  <td>{doc.size}</td>
                  <td style={{ color: doc.expires && doc.expires === 'Mar 28' ? '#f87171' : '#94a3b8' }}>
                    {doc.expires ? <><span>⏰</span> {doc.expires}</> : '—'}
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button className="btn btn-ghost btn-sm" onClick={e => { e.stopPropagation() }}>👁 View</button>
                      <button className="btn btn-ghost btn-sm" onClick={e => { e.stopPropagation() }}>⬇ Download</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Document detail panel */}
      {selectedDoc && (
        <div style={{
          position: 'fixed', right: 0, top: 0, bottom: 0, width: 360,
          background: '#131e30', borderLeft: '1px solid #334155',
          padding: '24px 20px', zIndex: 100, overflowY: 'auto',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <div style={{ fontWeight: 700, fontSize: 15 }}>Document Details</div>
            <button className="btn btn-ghost btn-sm" onClick={() => setSelectedDoc(null)}>✕</button>
          </div>
          <div style={{ fontSize: 32, marginBottom: 12 }}>{selectedDoc.icon}</div>
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>{selectedDoc.name}</div>
          <span className={`badge ${STATUS_COLORS[selectedDoc.status] || 'badge-gray'}`}>{selectedDoc.status}</span>
          <div style={{ marginTop: 20 }}>
            {[['Category', selectedDoc.category], ['File Size', selectedDoc.size], ['Uploaded', `Mar ${selectedDoc.uploaded}, 2026`], ['Expires', selectedDoc.expires || 'No expiry']].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #1e293b', fontSize: 13 }}>
                <span style={{ color: '#64748b' }}>{k}</span>
                <span style={{ fontWeight: 500 }}>{v}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <button className="btn btn-primary" style={{ justifyContent: 'center' }}>👁 Preview Document</button>
            <button className="btn btn-secondary" style={{ justifyContent: 'center' }}>⬇ Download</button>
            {selectedDoc.status === 'E-Sign Required' && (
              <button className="btn btn-success" style={{ justifyContent: 'center' }}>✍️ Sign Electronically</button>
            )}
            <button className="btn btn-ghost" style={{ justifyContent: 'center', color: '#f87171' }}>🗑 Replace Document</button>
          </div>
          <div style={{ marginTop: 20 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#475569', marginBottom: 10 }}>OCR EXTRACTED DATA</div>
            <div style={{ background: '#1e293b', borderRadius: 8, padding: 12, fontSize: 12, color: '#64748b' }}>
              {selectedDoc.category === 'Income' ? 'Employer: TechCorp Inc. | Wages: $145,000 | Tax Withheld: $32,480' :
               selectedDoc.category === 'Assets' ? 'Account: XXXX1234 | Balance: $42,000 | As of: 03/25/2026' :
               'Data extracted. Click to review fields.'}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
