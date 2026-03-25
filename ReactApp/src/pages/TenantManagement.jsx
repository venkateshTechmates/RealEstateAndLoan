import { useState } from 'react'
import { Building2, Users, Globe, CheckCircle2, AlertCircle, Plus, LogIn, Settings, Edit2, Shield, BarChart2, RefreshCw } from 'lucide-react'

const TENANTS = [
  { id: 'firstbank',   name: 'First Bank',         type: 'Bank',         status: 'active', users: 245,  loans: 1234, volume: '$42.5M', sso: 'Azure AD',     mfa: true,  domain: 'firstbank.loanplatform.com',   color: '#1e40af', primaryColor: '#003366', secondaryColor: '#FF6600', features: ['assets','origination','underwriting','compliance','reporting'] },
  { id: 'chase',       name: 'Chase Bank',          type: 'Bank',         status: 'active', users: 567,  loans: 2891, volume: '$98.2M', sso: 'Azure AD',     mfa: true,  domain: 'chase.loanplatform.com',       color: '#0284c7', primaryColor: '#0052A5', secondaryColor: '#FFFFFF', features: ['assets','origination','underwriting','compliance','reporting'] },
  { id: 'navyfed',     name: 'Navy Federal CU',     type: 'Credit Union', status: 'active', users: 189,  loans: 876,  volume: '$31.4M', sso: 'None',         mfa: true,  domain: 'navyfederal.loanplatform.com', color: '#1e3a8a', primaryColor: '#1A3B6B', secondaryColor: '#C8A400', features: ['assets','origination','compliance','reporting'] },
  { id: 'loandepot',   name: 'LoanDepot',           type: 'Broker',       status: 'active', users: 78,   loans: 432,  volume: '$15.8M', sso: 'Okta',         mfa: true,  domain: 'loandepot.loanplatform.com',   color: '#6d28d9', primaryColor: '#6D28D9', secondaryColor: '#F4A500', features: ['origination','compliance','reporting'] },
  { id: 'firstam',     name: 'First American Title', type: 'Title',       status: 'active', users: 45,   loans: 654,  volume: 'N/A',    sso: 'Azure AD',     mfa: false, domain: 'firstam.loanplatform.com',     color: '#059669', primaryColor: '#006E4F', secondaryColor: '#C8202A', features: ['reporting'] },
  { id: 'abcmortgage', name: 'ABC Mortgage',        type: 'Lender',       status: 'trial',  users: 12,   loans: 23,   volume: '$2.1M',  sso: 'None',         mfa: false, domain: 'abcmortgage.loanplatform.com', color: '#f59e0b', primaryColor: '#F59E0B', secondaryColor: '#1F2937', features: ['origination'] },
]

const STATUS_BADGES = {
  active: <span className="badge badge-green">🟢 Active</span>,
  trial:  <span className="badge badge-yellow">🟡 Trial</span>,
  paused: <span className="badge badge-gray">⚪ Paused</span>,
}
const FEATURE_LABELS = { assets: 'Asset Management', origination: 'Loan Origination', underwriting: 'Underwriting', compliance: 'Compliance', reporting: 'Reporting' }
const ALL_FEATURES   = ['assets', 'origination', 'underwriting', 'compliance', 'reporting']

function StatCard({ label, value, sub, color }) {
  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{label}</div>
      <div style={{ fontSize: 26, fontWeight: 800, color: color || 'var(--text-primary)' }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{sub}</div>}
    </div>
  )
}

export default function TenantManagement() {
  const [selectedId, setSelectedId] = useState('firstbank')
  const [showConfig, setShowConfig] = useState(true)
  const [tenantFilter, setTenantFilter] = useState('all')

  const selected = TENANTS.find(t => t.id === selectedId) || TENANTS[0]
  const filtered = tenantFilter === 'all' ? TENANTS : TENANTS.filter(t => t.status === tenantFilter)

  const totalUsers  = TENANTS.reduce((s, t) => s + t.users, 0)
  const totalLoans  = TENANTS.reduce((s, t) => s + t.loans, 0)

  return (
    <div>
      {/* Page Header */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-primary)' }}>🏢 Tenant Management</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 4 }}>Platform-wide multi-tenant administration — manage organizations, branding, and configurations</p>
      </div>

      {/* KPI Stats */}
      <div className="grid-4" style={{ marginBottom: 24 }}>
        <StatCard label="Total Tenants" value={TENANTS.length} sub={`${TENANTS.filter(t => t.status === 'active').length} active`} color="var(--blue-light)" />
        <StatCard label="Active Users" value={totalUsers.toLocaleString()} sub="Across all organizations" />
        <StatCard label="Total Active Loans" value={totalLoans.toLocaleString()} sub="Portfolio-wide" color="#10b981" />
        <StatCard label="Platform Revenue" value="$189.8M" sub="Total loan volume MTD" color="#f59e0b" />
      </div>

      {/* Quick Actions */}
      <div className="card" style={{ marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: 14 }}>Quick Actions</div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button className="btn btn-primary btn-sm"><Plus size={13} /> Create New Tenant</button>
          <button className="btn btn-secondary btn-sm"><Settings size={13} /> Manage Branding</button>
          <button className="btn btn-secondary btn-sm"><Globe size={13} /> Configure Plans</button>
          <button className="btn btn-secondary btn-sm"><BarChart2 size={13} /> View Analytics</button>
        </div>
      </div>

      {/* Tenant Overview Table */}
      <div className="card" style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 10 }}>
          <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: 15 }}>Tenant Overview</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {['all', 'active', 'trial'].map(f => (
              <button key={f} onClick={() => setTenantFilter(f)} className={`btn btn-sm ${tenantFilter === f ? 'btn-primary' : 'btn-secondary'}`} style={{ textTransform: 'capitalize' }}>{f}</button>
            ))}
          </div>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Tenant Name</th>
                <th>Type</th>
                <th>Status</th>
                <th>Users</th>
                <th>Active Loans</th>
                <th>Volume</th>
                <th>SSO</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(t => (
                <tr key={t.id} style={{ cursor: 'pointer' }} onClick={() => { setSelectedId(t.id); setShowConfig(true) }}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 32, height: 32, borderRadius: 8, background: t.color + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', color: t.color, flexShrink: 0 }}>
                        <Building2 size={14} />
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: 13 }}>{t.name}</div>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{t.domain}</div>
                      </div>
                    </div>
                  </td>
                  <td><span style={{ fontSize: 12 }}>{t.type}</span></td>
                  <td>{STATUS_BADGES[t.status]}</td>
                  <td><span style={{ fontWeight: 600 }}>{t.users.toLocaleString()}</span></td>
                  <td><span style={{ fontWeight: 600 }}>{t.loans.toLocaleString()}</span></td>
                  <td><span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{t.volume}</span></td>
                  <td><span className="badge badge-blue" style={{ fontSize: 10 }}>{t.sso}</span></td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button className="btn btn-secondary btn-sm" onClick={e => { e.stopPropagation(); setSelectedId(t.id); setShowConfig(true) }}>
                        <Settings size={11} /> Manage
                      </button>
                      <button className="btn btn-secondary btn-sm" onClick={e => { e.stopPropagation(); window.location.hash = '/dashboard' }}>
                        <LogIn size={11} /> Login As
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tenant Configuration Panel */}
      {showConfig && (
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--text-primary)' }}>Tenant Configuration: {selected.name}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>Modify branding, authentication, and feature flags for this tenant</div>
            </div>
            <button onClick={() => setShowConfig(false)} className="btn btn-ghost btn-sm">✕ Close</button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20 }}>
            {/* Branding */}
            <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 10, padding: '16px' }}>
              <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--text-primary)', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 7 }}>
                <Settings size={14} /> Branding
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 6 }}>Logo</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: 8, background: selected.primaryColor + '22', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: selected.primaryColor, fontSize: 11, fontWeight: 700 }}>
                  {selected.name.substring(0, 2).toUpperCase()}
                </div>
                <button className="btn btn-secondary btn-sm"><Edit2 size={11} /> Change</button>
              </div>
              <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>Primary</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 10px', border: '1px solid var(--border)', borderRadius: 6, background: 'var(--bg-surface)' }}>
                    <div style={{ width: 14, height: 14, borderRadius: 3, background: selected.primaryColor }} />
                    <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--text-secondary)' }}>{selected.primaryColor}</span>
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>Secondary</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 10px', border: '1px solid var(--border)', borderRadius: 6, background: 'var(--bg-surface)' }}>
                    <div style={{ width: 14, height: 14, borderRadius: 3, background: selected.secondaryColor, border: '1px solid var(--border)' }} />
                    <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--text-secondary)' }}>{selected.secondaryColor}</span>
                  </div>
                </div>
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>Custom Domain</div>
              <div style={{ fontSize: 12, color: 'var(--blue-light)', fontFamily: 'monospace', padding: '6px 10px', border: '1px solid var(--border)', borderRadius: 6, background: 'var(--bg-surface)', wordBreak: 'break-all' }}>{selected.domain}</div>
            </div>

            {/* Authentication */}
            <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 10, padding: '16px' }}>
              <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--text-primary)', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 7 }}>
                <Shield size={14} /> Authentication
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>SSO Provider</div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', border: '1px solid var(--border)', borderRadius: 6, background: 'var(--bg-surface)', fontSize: 13 }}>
                    <span>{selected.sso}</span>
                    <button className="btn btn-ghost" style={{ padding: '2px 8px', fontSize: 11 }}>Configure</button>
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>MFA Required</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', border: '1px solid var(--border)', borderRadius: 6, background: 'var(--bg-surface)' }}>
                    {selected.mfa ? <CheckCircle2 size={14} style={{ color: '#10b981' }} /> : <AlertCircle size={14} style={{ color: '#f59e0b' }} />}
                    <span style={{ fontSize: 13 }}>{selected.mfa ? 'Enabled' : 'Disabled'}</span>
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>Session Timeout</div>
                  <select style={{ width: '100%', padding: '8px 12px', border: '1px solid var(--border)', borderRadius: 6, background: 'var(--bg-surface)', color: 'var(--text-primary)', fontSize: 13 }} defaultValue="30">
                    {['15', '30', '60', '120'].map(m => <option key={m} value={m}>{m} minutes</option>)}
                  </select>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>User Provisioning</div>
                  <div style={{ padding: '8px 12px', border: '1px solid var(--border)', borderRadius: 6, background: 'var(--bg-surface)', fontSize: 12, color: 'var(--text-secondary)' }}>
                    {selected.sso !== 'None' ? 'Auto-provision via SSO' : 'Manual invitation'}
                  </div>
                </div>
              </div>
            </div>

            {/* Feature Flags */}
            <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 10, padding: '16px' }}>
              <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--text-primary)', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 7 }}>
                <RefreshCw size={14} /> Features
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {ALL_FEATURES.map(feat => {
                  const enabled = selected.features.includes(feat)
                  return (
                    <label key={feat} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                      <div style={{ width: 18, height: 18, borderRadius: 4, background: enabled ? '#10b981' : 'var(--bg-surface)', border: `1px solid ${enabled ? '#10b981' : 'var(--border)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        {enabled && <CheckCircle2 size={11} color="#fff" />}
                      </div>
                      <span style={{ fontSize: 13, color: enabled ? 'var(--text-primary)' : 'var(--text-muted)' }}>{FEATURE_LABELS[feat]}</span>
                    </label>
                  )
                })}
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 18 }}>
                <button className="btn btn-primary btn-sm" style={{ flex: 1, justifyContent: 'center' }}>Save Changes</button>
                <button className="btn btn-secondary btn-sm" style={{ flex: 1, justifyContent: 'center' }}>Reset</button>
              </div>
            </div>
          </div>

          {/* Tenant Stats Row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginTop: 20, padding: '16px', background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 10 }}>
            {[
              { label: 'Total Users',   value: selected.users, icon: Users },
              { label: 'Active Loans',  value: selected.loans, icon: BarChart2 },
              { label: 'Loan Volume',   value: selected.volume, icon: Globe },
              { label: 'Plan',          value: selected.status === 'trial' ? 'Trial (30 days)' : 'Enterprise', icon: Shield },
            ].map(({ label, value, icon: Ic }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: selected.color + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', color: selected.color, flexShrink: 0 }}>
                  <Ic size={15} />
                </div>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{label}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>{typeof value === 'number' ? value.toLocaleString() : value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
