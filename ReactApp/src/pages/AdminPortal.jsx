import { useState } from 'react'

const USERS = [
  { id: 'U001', name: 'Rachel Kim', email: 'rachel.kim@firstnational.com', role: 'Loan Officer', status: 'Active', lastLogin: '2 hours ago', loans: 14 },
  { id: 'U002', name: 'Carlos Mendez', email: 'carlos.mendez@firstnational.com', role: 'Loan Officer', status: 'Active', lastLogin: '1 day ago', loans: 9 },
  { id: 'U003', name: 'David Park', email: 'david.park@firstnational.com', role: 'Underwriter', status: 'Active', lastLogin: '4 hours ago', loans: 7 },
  { id: 'U004', name: 'Aisha Brown', email: 'aisha.brown@firstnational.com', role: 'Underwriter', status: 'Active', lastLogin: '10 hours ago', loans: 5 },
  { id: 'U005', name: 'Janet Wu', email: 'janet.wu@firstnational.com', role: 'Closer', status: 'Active', lastLogin: '3 hours ago', loans: 3 },
  { id: 'U006', name: 'Tom Richards', email: 'tom.r@firstnational.com', role: 'Broker', status: 'Inactive', lastLogin: '30 days ago', loans: 0 },
  { id: 'U007', name: 'Marcus Johnson', email: 'marcus.j@email.com', role: 'Borrower', status: 'Active', lastLogin: '1 hour ago', loans: 1 },
  { id: 'U008', name: 'Priya Patel', email: 'priya.p@email.com', role: 'Borrower', status: 'Active', lastLogin: '2 days ago', loans: 1 },
]

const AUDIT_LOG = [
  { id: 'AL-001', timestamp: '2025-04-11 14:32:01', user: 'David Park', action: 'Condition Cleared', resource: 'Loan LA-001 · C-04 Title Commitment', ip: '10.0.1.42' },
  { id: 'AL-002', timestamp: '2025-04-11 13:18:55', user: 'Rachel Kim', action: 'Status Updated', resource: 'Loan LA-001 → Underwriting', ip: '10.0.1.31' },
  { id: 'AL-003', timestamp: '2025-04-11 11:02:10', user: 'Marcus Johnson', action: 'Document Uploaded', resource: 'Bank Statement Mar 2025 (LA-001)', ip: '71.91.12.44' },
  { id: 'AL-004', timestamp: '2025-04-10 16:45:00', user: 'System', action: 'DU Run Completed', resource: 'Loan LA-001 · Result: Eligible/Approve', ip: '10.0.0.1' },
  { id: 'AL-005', timestamp: '2025-04-10 09:12:33', user: 'Carlos Mendez', action: 'Loan Created', resource: 'Loan LA-004 · Nguyen Thi Lan', ip: '10.0.1.33' },
  { id: 'AL-006', timestamp: '2025-04-09 15:38:22', user: 'Rachel Kim', action: 'Rate Lock Applied', resource: 'Loan LA-001 · 6.875% 30yr Conv · 45-day lock', ip: '10.0.1.31' },
  { id: 'AL-007', timestamp: '2025-04-09 12:00:00', user: 'System', action: 'Annual Escrow Analysis', resource: 'Loan SVC-2025-00482 · No shortage detected', ip: '10.0.0.1' },
]

const ROLE_COLOR = { 'Loan Officer': '#60a5fa', Underwriter: '#a78bfa', Closer: '#fb923c', Broker: '#facc15', Borrower: '#4ade80', Admin: '#f87171' }

export default function AdminPortal() {
  const [activeTab, setActiveTab] = useState('users')
  const [users, setUsers] = useState(USERS)
  const [selectedUser, setSelectedUser] = useState(null)
  const [filterRole, setFilterRole] = useState('All')
  const [showAddUser, setShowAddUser] = useState(false)
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'Loan Officer' })

  const filteredUsers = filterRole === 'All' ? users : users.filter(u => u.role === filterRole)

  const toggleUserStatus = (id) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: u.status === 'Active' ? 'Inactive' : 'Active' } : u))
  }

  const addUser = () => {
    if (!newUser.name || !newUser.email) return
    setUsers(prev => [...prev, { ...newUser, id: `U${String(prev.length + 1).padStart(3, '0')}`, status: 'Active', lastLogin: 'Never', loans: 0 }])
    setNewUser({ name: '', email: '', role: 'Loan Officer' })
    setShowAddUser(false)
  }

  const systemHealth = [
    { service: 'Core API Gateway', uptime: '99.98%', latency: '42ms', status: 'Operational' },
    { service: 'DU/DO Integration', uptime: '99.95%', latency: '380ms', status: 'Operational' },
    { service: 'Plaid Asset Verification', uptime: '99.90%', latency: '620ms', status: 'Operational' },
    { service: 'OCR Document Processing', uptime: '99.85%', latency: '1.2s', status: 'Degraded' },
    { service: 'eSign (DocuSign)', uptime: '100.00%', latency: '210ms', status: 'Operational' },
    { service: 'Document Storage (S3)', uptime: '99.99%', latency: '18ms', status: 'Operational' },
    { service: 'Notification Service (Email + SMS)', uptime: '99.92%', latency: '95ms', status: 'Operational' },
    { service: 'Authentication (SSO/MFA)', uptime: '100.00%', latency: '30ms', status: 'Operational' },
  ]

  const HEALTH_COLOR = { Operational: '#4ade80', Degraded: '#facc15', Down: '#f87171' }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800 }}>Admin Portal</h1>
          <p style={{ color: '#64748b', fontSize: 13, marginTop: 4 }}>First National Mortgage · System Administration</p>
        </div>
        <span className="badge badge-green" style={{ padding: '8px 14px', fontSize: 13 }}>● All Systems Operational</span>
      </div>

      {/* Top stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 24 }}>
        {[
          { label: 'Total Users', value: users.length, sub: `${users.filter(u => u.status === 'Active').length} active`, color: '#60a5fa' },
          { label: 'Active Loans', value: 6, sub: '$2.72M pipeline', color: '#4ade80' },
          { label: 'System Uptime', value: '99.96%', sub: 'Last 30 days', color: '#a78bfa' },
          { label: 'Audit Events', value: AUDIT_LOG.length, sub: 'Last 7 days', color: '#fb923c' },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
            <div className="stat-label">{s.label}</div>
            <div className="stat-sub">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="tab-group" style={{ marginBottom: 24 }}>
        {['users', 'audit', 'system', 'compliance', 'settings'].map(t => (
          <button key={t} className={`tab-btn${activeTab === t ? ' active' : ''}`} onClick={() => setActiveTab(t)}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === 'users' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div style={{ display: 'flex', gap: 10 }}>
              {['All', 'Loan Officer', 'Underwriter', 'Closer', 'Broker', 'Borrower'].map(r => (
                <button key={r} className={`tab-btn${filterRole === r ? ' active' : ''}`} onClick={() => setFilterRole(r)} style={{ fontSize: 12 }}>{r}</button>
              ))}
            </div>
            <button className="btn btn-primary" onClick={() => setShowAddUser(true)}>+ Add User</button>
          </div>

          {showAddUser && (
            <div className="card" style={{ marginBottom: 16, background: 'rgba(59,130,246,0.05)', border: '1px solid rgba(59,130,246,0.2)' }}>
              <div style={{ fontWeight: 700, marginBottom: 14 }}>Add New User</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: 12, alignItems: 'end' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">FULL NAME</label>
                  <input value={newUser.name} onChange={e => setNewUser({ ...newUser, name: e.target.value })} placeholder="e.g., John Smith" />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">EMAIL</label>
                  <input value={newUser.email} onChange={e => setNewUser({ ...newUser, email: e.target.value })} placeholder="user@company.com" type="email" />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">ROLE</label>
                  <select value={newUser.role} onChange={e => setNewUser({ ...newUser, role: e.target.value })}>
                    {['Loan Officer', 'Underwriter', 'Closer', 'Broker', 'Borrower', 'Admin'].map(r => <option key={r}>{r}</option>)}
                  </select>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button className="btn btn-primary" onClick={addUser}>Create</button>
                  <button className="btn btn-ghost" onClick={() => setShowAddUser(false)}>Cancel</button>
                </div>
              </div>
            </div>
          )}

          <div className="card" style={{ padding: 0 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#1e293b' }}>
                  {['User', 'Email', 'Role', 'Loans', 'Last Login', 'Status', 'Actions'].map(h => (
                    <th key={h} style={{ padding: '12px 14px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#475569', textTransform: 'uppercase', borderBottom: '1px solid #334155' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map(u => (
                  <tr key={u.id} style={{ borderBottom: '1px solid #1e293b', opacity: u.status === 'Inactive' ? 0.6 : 1 }}>
                    <td style={{ padding: '12px 14px' }}>
                      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                        <div style={{ width: 34, height: 34, borderRadius: '50%', background: `${ROLE_COLOR[u.role]}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: ROLE_COLOR[u.role], fontSize: 13 }}>
                          {u.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 700 }}>{u.name}</div>
                          <div style={{ fontSize: 11, color: '#475569' }}>{u.id}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '12px 14px', fontSize: 12, color: '#94a3b8' }}>{u.email}</td>
                    <td style={{ padding: '12px 14px' }}>
                      <span className="badge" style={{ background: `${ROLE_COLOR[u.role]}22`, color: ROLE_COLOR[u.role], fontSize: 11 }}>{u.role}</span>
                    </td>
                    <td style={{ padding: '12px 14px', fontSize: 13 }}>{u.loans}</td>
                    <td style={{ padding: '12px 14px', fontSize: 12, color: '#64748b' }}>{u.lastLogin}</td>
                    <td style={{ padding: '12px 14px' }}>
                      <span className={`badge ${u.status === 'Active' ? 'badge-green' : ''}`} style={u.status !== 'Active' ? { background: '#334155', color: '#64748b', fontSize: 11 } : { fontSize: 11 }}>{u.status}</span>
                    </td>
                    <td style={{ padding: '12px 14px' }}>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button className="btn btn-ghost" style={{ fontSize: 11, padding: '4px 8px' }} onClick={() => setSelectedUser(u)}>Edit</button>
                        <button className="btn" onClick={() => toggleUserStatus(u.id)} style={{ fontSize: 11, padding: '4px 8px', background: u.status === 'Active' ? 'rgba(239,68,68,0.1)' : 'rgba(74,222,128,0.1)', borderColor: u.status === 'Active' ? '#ef4444' : '#4ade80', color: u.status === 'Active' ? '#f87171' : '#4ade80' }}>
                          {u.status === 'Active' ? 'Disable' : 'Enable'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'audit' && (
        <div>
          <div className="card" style={{ padding: 0 }}>
            <div style={{ padding: '14px 16px', borderBottom: '1px solid #334155', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 700 }}>Audit Log — Last 7 Days</span>
              <button className="btn btn-ghost" style={{ fontSize: 12, color: '#60a5fa' }}>⬇ Export CSV</button>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#1e293b' }}>
                  {['Event ID', 'Timestamp', 'User', 'Action', 'Resource / Details', 'IP Address'].map(h => (
                    <th key={h} style={{ padding: '12px 14px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#475569', textTransform: 'uppercase', borderBottom: '1px solid #334155' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {AUDIT_LOG.map(l => (
                  <tr key={l.id} style={{ borderBottom: '1px solid #1e293b' }}>
                    <td style={{ padding: '12px 14px', fontSize: 12, color: '#60a5fa', fontWeight: 700 }}>{l.id}</td>
                    <td style={{ padding: '12px 14px', fontSize: 12, color: '#64748b', fontFamily: 'monospace' }}>{l.timestamp}</td>
                    <td style={{ padding: '12px 14px', fontSize: 13, fontWeight: 600 }}>{l.user}</td>
                    <td style={{ padding: '12px 14px' }}>
                      <span className="badge" style={{ background: '#334155', color: '#94a3b8', fontSize: 11 }}>{l.action}</span>
                    </td>
                    <td style={{ padding: '12px 14px', fontSize: 12, color: '#94a3b8' }}>{l.resource}</td>
                    <td style={{ padding: '12px 14px', fontSize: 12, color: '#475569', fontFamily: 'monospace' }}>{l.ip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'system' && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 20 }}>
            {[
              { label: 'Avg Response Time', value: '280ms', color: '#4ade80' },
              { label: 'Requests/Hour', value: '14,820', color: '#60a5fa' },
              { label: 'Error Rate', value: '0.04%', color: '#facc15' },
            ].map(s => (
              <div key={s.label} className="stat-card">
                <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="card" style={{ padding: 0 }}>
            <div style={{ padding: '14px 16px', borderBottom: '1px solid #334155', fontWeight: 700 }}>Service Health Monitor</div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#1e293b' }}>
                  {['Service', 'Uptime (30d)', 'Avg Latency', 'Status'].map(h => (
                    <th key={h} style={{ padding: '12px 14px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#475569', textTransform: 'uppercase', borderBottom: '1px solid #334155' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {systemHealth.map(s => (
                  <tr key={s.service} style={{ borderBottom: '1px solid #1e293b' }}>
                    <td style={{ padding: '12px 14px', fontSize: 13, fontWeight: 600 }}>{s.service}</td>
                    <td style={{ padding: '12px 14px', fontSize: 13 }}>{s.uptime}</td>
                    <td style={{ padding: '12px 14px', fontSize: 13, color: '#94a3b8' }}>{s.latency}</td>
                    <td style={{ padding: '12px 14px' }}>
                      <span className="badge" style={{ background: `${HEALTH_COLOR[s.status]}22`, color: HEALTH_COLOR[s.status], fontSize: 11 }}>
                        ● {s.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'compliance' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <div className="card">
            <div style={{ fontWeight: 700, marginBottom: 14 }}>Regulatory Compliance</div>
            {[
              ['HMDA Reporting', '2025 Q1 submitted', 'Complete'],
              ['RESPA Compliance', 'GFE/CD within tolerances', 'Pass'],
              ['TRID – 3-Day CD Rule', 'All loans compliant', 'Pass'],
              ['Fair Lending (ECOA)', 'No adverse action violations', 'Pass'],
              ['CRA Assessment', 'CRA rating: Satisfactory', 'Pass'],
              ['SOX Controls', 'IT general controls reviewed', 'Pass'],
              ['AML/BSA Monitoring', 'No suspicious activity flagged', 'Pass'],
              ['GDPR/CCPA Data Rights', 'Opt-out workflow active', 'Pass'],
            ].map(([k, v, status]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #334155', fontSize: 13 }}>
                <div>
                  <div style={{ fontWeight: 600 }}>{k}</div>
                  <div style={{ fontSize: 11, color: '#64748b', marginTop: 2 }}>{v}</div>
                </div>
                <span className={`badge ${status === 'Pass' || status === 'Complete' ? 'badge-green' : 'badge-red'}`} style={{ fontSize: 11 }}>{status}</span>
              </div>
            ))}
          </div>
          <div className="card">
            <div style={{ fontWeight: 700, marginBottom: 14 }}>Compliance Reports</div>
            {[
              { label: 'Q1 2025 HMDA LAR Export', date: 'Apr 1, 2025', format: 'CSV' },
              { label: 'Annual Fair Lending Analysis', date: 'Jan 15, 2025', format: 'PDF' },
              { label: 'CRA Small Business Lending Report', date: 'Mar 31, 2025', format: 'PDF' },
              { label: 'SOX IT Controls Audit Report', date: 'Feb 28, 2025', format: 'PDF' },
              { label: 'Vendor Risk Assessment – Q1', date: 'Mar 15, 2025', format: 'PDF' },
            ].map(r => (
              <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #334155' }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{r.label}</div>
                  <div style={{ fontSize: 11, color: '#64748b', marginTop: 2 }}>{r.date} · {r.format}</div>
                </div>
                <button className="btn btn-ghost" style={{ fontSize: 12, color: '#60a5fa' }}>⬇ Download</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <div className="card">
            <div style={{ fontWeight: 700, marginBottom: 14 }}>Organization Settings</div>
            {[
              ['Institution Name', 'First National Mortgage'],
              ['NMLS ID', '12345'],
              ['State License', 'TX-RMLO-12345'],
              ['FHA Lender ID', 'FHA-12345-TX'],
              ['FNMA Seller/Servicer', '1234567-0000'],
              ['FHLMC Seller No.', '987654-00'],
              ['Default Loan Program', 'Conventional 30yr Fixed'],
              ['Rate Lock Period', '45 days (default)'],
            ].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid #334155', fontSize: 13 }}>
                <span style={{ color: '#64748b' }}>{k}</span>
                <span style={{ fontWeight: 600 }}>{v}</span>
              </div>
            ))}
          </div>
          <div className="card">
            <div style={{ fontWeight: 700, marginBottom: 14 }}>System Configuration</div>
            {[
              { label: 'MFA Required for All Users', defaultOn: true },
              { label: 'Auto-Lock on Inactivity (30 min)', defaultOn: true },
              { label: 'Plaid Real-Time Asset Verification', defaultOn: true },
              { label: 'OCR Auto-Processing', defaultOn: true },
              { label: 'SMS Notifications', defaultOn: false },
              { label: 'Borrower Portal Self-Service EOD Stmts', defaultOn: true },
              { label: 'Rate Alerts Push Notifications', defaultOn: false },
            ].map(s => {
              const [on, setOn] = useState(s.defaultOn)
              return (
                <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #334155' }}>
                  <span style={{ fontSize: 13 }}>{s.label}</span>
                  <button
                    onClick={() => setOn(!on)}
                    style={{ width: 44, height: 24, borderRadius: 12, background: on ? '#3b82f6' : '#334155', border: 'none', cursor: 'pointer', position: 'relative', transition: 'background 0.2s' }}
                  >
                    <span style={{ position: 'absolute', left: on ? 22 : 2, top: 2, width: 20, height: 20, borderRadius: '50%', background: '#fff', transition: 'left 0.2s' }} />
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
