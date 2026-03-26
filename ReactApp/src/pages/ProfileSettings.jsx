import { useState } from 'react'

const TABS = ['Profile', 'Security', 'Notifications', 'Connected Accounts', 'Preferences']

export default function ProfileSettings() {
  const [activeTab, setActiveTab] = useState('Profile')
  const [profileForm, setProfileForm] = useState({
    firstName: 'John', lastName: 'Doe', email: 'john.doe@email.com',
    phone: '(555) 123-4567', altPhone: '', address: '123 Main St', city: 'Austin',
    state: 'TX', zip: '78701', ssn: '***-**-6789', dob: '1985-04-15',
    maritalStatus: 'Married', citizenship: 'US Citizen',
  })
  const [pwForm, setPwForm] = useState({ current: '', newPw: '', confirm: '' })
  const [mfaEnabled, setMfaEnabled] = useState(true)
  const [saved, setSaved] = useState(false)

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2500) }

  return (
    <div style={{ maxWidth: 860, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800 }}>Account Settings</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 3 }}>Manage your profile, security, and preferences</p>
        </div>
        {saved && <div style={{ background: 'rgba(74,222,128,0.15)', border: '1px solid rgba(74,222,128,0.3)', borderRadius: 8, padding: '8px 16px', fontSize: 13, color: '#4ade80' }}>✅ Changes saved!</div>}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 20, alignItems: 'start' }}>
        {/* Side nav */}
        <div className="card" style={{ padding: 8 }}>
          {TABS.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              style={{ display: 'block', width: '100%', padding: '10px 14px', borderRadius: 8, border: 'none', background: activeTab === tab ? 'rgba(59,130,246,0.15)' : 'none', color: activeTab === tab ? '#60a5fa' : 'var(--text-secondary)', textAlign: 'left', cursor: 'pointer', fontSize: 13, fontWeight: activeTab === tab ? 700 : 400, transition: 'all 0.15s' }}>
              {tab}
            </button>
          ))}
        </div>

        {/* Content */}
        <div>
          {/* --- Profile --- */}
          {activeTab === 'Profile' && (
            <div className="card">
              {/* Avatar */}
              <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 24, paddingBottom: 24, borderBottom: '1px solid var(--border)' }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'linear-gradient(135deg, #3b82f6, #a78bfa)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 800, color: '#fff' }}>JD</div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 15 }}>{profileForm.firstName} {profileForm.lastName}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 8 }}>{profileForm.email}</div>
                  <button className="btn btn-ghost" style={{ fontSize: 12 }}>Change Photo</button>
                </div>
              </div>
              <div style={{ fontWeight: 700, marginBottom: 14 }}>Personal Information</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 20 }}>
                {[
                  ['FIRST NAME', 'firstName'], ['LAST NAME', 'lastName'],
                  ['EMAIL ADDRESS', 'email'], ['PHONE', 'phone'],
                  ['ALTERNATE PHONE', 'altPhone'], ['DATE OF BIRTH', 'dob'],
                ].map(([label, key]) => (
                  <div key={key} className="form-group">
                    <label className="form-label">{label}</label>
                    <input type={key === 'dob' ? 'date' : 'text'} value={profileForm[key]} onChange={e => setProfileForm({ ...profileForm, [key]: e.target.value })} />
                  </div>
                ))}
              </div>
              <div className="divider" />
              <div style={{ fontWeight: 700, marginBottom: 14, marginTop: 14 }}>Address</div>
              <div className="resp-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 14, marginBottom: 20 }}>
                {[['STREET ADDRESS', 'address'], ['CITY', 'city'], ['STATE', 'state']].map(([l, k]) => (
                  <div key={k} className="form-group">
                    <label className="form-label">{l}</label>
                    <input value={profileForm[k]} onChange={e => setProfileForm({ ...profileForm, [k]: e.target.value })} />
                  </div>
                ))}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, marginBottom: 20 }}>
                {[['ZIP CODE', 'zip'], ['MARITAL STATUS', 'maritalStatus'], ['CITIZENSHIP', 'citizenship']].map(([l, k]) => (
                  <div key={k} className="form-group">
                    <label className="form-label">{l}</label>
                    <input value={profileForm[k]} onChange={e => setProfileForm({ ...profileForm, [k]: e.target.value })} />
                  </div>
                ))}
              </div>
              <button className="btn btn-primary" onClick={handleSave}>Save Changes</button>
            </div>
          )}

          {/* --- Security --- */}
          {activeTab === 'Security' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Change password */}
              <div className="card">
                <div style={{ fontWeight: 700, marginBottom: 14 }}>Change Password</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 400 }}>
                  {[
                    ['CURRENT PASSWORD', 'current', 'Current password'],
                    ['NEW PASSWORD', 'newPw', 'Min 8 chars, include uppercase, number, symbol'],
                    ['CONFIRM NEW PASSWORD', 'confirm', 'Re-enter new password'],
                  ].map(([l, k, ph]) => (
                    <div key={k} className="form-group">
                      <label className="form-label">{l}</label>
                      <input type="password" value={pwForm[k]} placeholder={ph} onChange={e => setPwForm({ ...pwForm, [k]: e.target.value })} />
                    </div>
                  ))}
                  <button className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>Update Password</button>
                </div>
              </div>

              {/* MFA */}
              <div className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <div style={{ fontWeight: 700 }}>Multi-Factor Authentication (MFA)</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 12, color: mfaEnabled ? '#4ade80' : '#f87171', fontWeight: 700 }}>{mfaEnabled ? '🔒 Enabled' : '🔓 Disabled'}</span>
                    <button onClick={() => setMfaEnabled(!mfaEnabled)} className={`btn ${mfaEnabled ? 'btn-ghost' : 'btn-primary'}`} style={{ fontSize: 12 }}>
                      {mfaEnabled ? 'Disable MFA' : 'Enable MFA'}
                    </button>
                  </div>
                </div>
                <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 14 }}>Protect your account with an additional layer of security. We recommend keeping MFA enabled.</p>
                {mfaEnabled && (
                  <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                    {[
                      { icon: '📱', label: 'Authenticator App', sub: 'Google / Authy', active: true },
                      { icon: '💬', label: 'SMS Text Message', sub: '(555) ***-4567', active: false },
                      { icon: '📧', label: 'Email OTP', sub: 'john.***@email.com', active: false },
                    ].map(m => (
                      <div key={m.label} style={{ flex: 1, background: m.active ? 'rgba(59,130,246,0.1)' : 'var(--bg-elevated)', border: `1px solid ${m.active ? '#3b82f6' : 'var(--border)'}`, borderRadius: 10, padding: 12 }}>
                        <div style={{ fontSize: 22, marginBottom: 6 }}>{m.icon}</div>
                        <div style={{ fontSize: 13, fontWeight: 700 }}>{m.label}</div>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 8 }}>{m.sub}</div>
                        <button className="btn btn-ghost" style={{ fontSize: 11 }}>{m.active ? '✅ Configured' : 'Set Up'}</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Session history */}
              <div className="card">
                <div style={{ fontWeight: 700, marginBottom: 14 }}>Recent Sign-In Activity</div>
                {[
                  { device: 'Chrome on Windows', ip: '203.0.113.14', location: 'Austin, TX', time: 'Now (current session)', current: true },
                  { device: 'Safari on iPhone 15', ip: '203.0.113.22', location: 'Austin, TX', time: 'Mar 24, 2026 8:30 AM', current: false },
                  { device: 'Firefox on Mac', ip: '203.0.113.55', location: 'Austin, TX', time: 'Mar 22, 2026 6:00 PM', current: false },
                ].map((s, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--border)', fontSize: 13 }}>
                    <div>
                      <div style={{ fontWeight: 600 }}>{s.device} {s.current && <span className="badge badge-green" style={{ fontSize: 10 }}>Current</span>}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{s.location} · {s.ip}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{s.time}</div>
                    </div>
                    {!s.current && <button className="btn btn-ghost" style={{ fontSize: 12, color: '#f87171' }}>Revoke</button>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* --- Preferences --- */}
          {activeTab === 'Preferences' && (
            <div className="card">
              <div style={{ fontWeight: 700, marginBottom: 18 }}>Application Preferences</div>
              {[
                { label: 'Language', value: 'English (US)', type: 'select', opts: ['English (US)', 'Spanish', 'French', 'Chinese'] },
                { label: 'Time Zone', value: 'America/Chicago (CST)', type: 'select', opts: ['America/Chicago (CST)', 'America/New_York (EST)', 'America/Los_Angeles (PST)'] },
                { label: 'Date Format', value: 'MM/DD/YYYY', type: 'select', opts: ['MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD'] },
                { label: 'Currency Display', value: 'USD ($)', type: 'select', opts: ['USD ($)', 'EUR (€)'] },
              ].map(f => (
                <div key={f.label} className="form-group">
                  <label className="form-label">{f.label.toUpperCase()}</label>
                  <select style={{ background: 'var(--bg-base)', border: '1px solid var(--border)', borderRadius: 8, padding: '8px 12px', color: 'var(--text-primary)', fontSize: 13, width: '100%' }}>
                    {f.opts.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
              ))}
              <div style={{ marginTop: 6 }}>
                <button className="btn btn-primary" onClick={handleSave}>Save Preferences</button>
              </div>
            </div>
          )}

          {/* --- Connected Accounts --- */}
          {activeTab === 'Connected Accounts' && (
            <div className="card">
              <div style={{ fontWeight: 700, marginBottom: 6 }}>Connected Financial Accounts</div>
              <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 18 }}>Connect your bank accounts via Plaid for instant, secure verification.</p>
              {[
                { name: 'Chase Bank', sub: 'Checking ****1234, Savings ****5678', status: 'Connected', lastSync: 'Mar 25, 2026 9:00 AM', icon: '🏦' },
                { name: 'Vanguard', sub: 'Brokerage ****5678', status: 'Connected', lastSync: 'Mar 24, 2026 8:00 AM', icon: '📈' },
                { name: 'Marcus (Goldman)', sub: 'CD ****9012', status: 'Not Connected', lastSync: null, icon: '🏛' },
              ].map(acc => (
                <div key={acc.name} style={{ display: 'flex', gap: 14, alignItems: 'center', padding: '14px 0', borderBottom: '1px solid var(--border)' }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--bg-elevated)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{acc.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 13 }}>{acc.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{acc.sub}</div>
                    {acc.lastSync && <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Last synced: {acc.lastSync}</div>}
                  </div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <span className={`badge ${acc.status === 'Connected' ? 'badge-green' : ''}`} style={{ fontSize: 11, background: acc.status === 'Connected' ? undefined : 'rgba(100,116,139,0.15)', color: acc.status === 'Connected' ? undefined : 'var(--text-muted)' }}>{acc.status}</span>
                    {acc.status === 'Connected' ? (
                      <button className="btn btn-ghost" style={{ fontSize: 12 }}>🔄 Refresh</button>
                    ) : (
                      <button className="btn btn-primary" style={{ fontSize: 12 }}>🔌 Connect Plaid</button>
                    )}
                    {acc.status === 'Connected' && <button className="btn btn-ghost" style={{ fontSize: 12, color: '#f87171' }}>Disconnect</button>}
                  </div>
                </div>
              ))}
              <div style={{ marginTop: 18 }}>
                <button className="btn btn-secondary">+ Connect New Account</button>
              </div>
            </div>
          )}

          {/* --- Notifications preferences --- */}
          {activeTab === 'Notifications' && (
            <div className="card">
              <div style={{ fontWeight: 700, marginBottom: 6 }}>Notification Preferences</div>
              <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 18 }}>Control how and when you receive alerts about your loan application.</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto auto', gap: 16, alignItems: 'center', marginBottom: 10 }}>
                {['', 'Email', 'SMS', 'In-App'].map((h, i) => (
                  <div key={i} style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', textAlign: i > 0 ? 'center' : 'left' }}>{h}</div>
                ))}
              </div>
              {[
                { label: 'Status Updates', email: true, sms: true, app: true },
                { label: 'Document Requests', email: true, sms: false, app: true },
                { label: 'Condition Changes', email: true, sms: true, app: true },
                { label: 'Asset Verification', email: true, sms: false, app: true },
                { label: 'Rate Lock Alerts', email: true, sms: true, app: false },
                { label: 'Payment Reminders', email: true, sms: true, app: true },
                { label: 'Security Alerts', email: true, sms: true, app: true },
              ].map(row => (
                <div key={row.label} style={{ display: 'grid', gridTemplateColumns: '1fr auto auto auto', gap: 16, alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                  <span style={{ fontSize: 13 }}>{row.label}</span>
                  {['email', 'sms', 'app'].map(ch => (
                    <div key={ch} style={{ textAlign: 'center' }}>
                      <input type="checkbox" defaultChecked={row[ch]} style={{ accentColor: '#3b82f6', cursor: 'pointer' }} />
                    </div>
                  ))}
                </div>
              ))}
              <div style={{ marginTop: 16 }}>
                <button className="btn btn-primary" onClick={handleSave}>Save Preferences</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
