import { useState } from 'react'

const NOTIFICATIONS = [
  { id: 1, type: 'document', icon: '📄', title: 'Document Requested', body: 'Your loan officer has requested an updated bank statement for Chase Checking.', time: '10 min ago', date: 'Today', read: false, link: '/documents', appNo: 'APP-2026-0421' },
  { id: 2, type: 'condition', icon: '✅', title: 'Condition Cleared', body: 'Employment verification condition has been cleared. Your application is progressing.', time: '1 hour ago', date: 'Today', read: false, link: '/apply', appNo: 'APP-2026-0421' },
  { id: 3, type: 'asset', icon: '❓', title: 'Asset Questioned', body: 'Coinbase - Bitcoin asset has been questioned. Upload a 90-day exchange statement.', time: '3 hours ago', date: 'Today', read: false, link: '/assets', appNo: 'APP-2026-0421' },
  { id: 4, type: 'rate', icon: '📈', title: 'Rate Lock Expiring Soon', body: 'Your rate lock of 6.875% expires in 5 days (Mar 29, 2026). Contact your loan officer.', time: '6 hours ago', date: 'Today', read: true, link: '/dashboard', appNo: 'APP-2026-0421' },
  { id: 5, type: 'payment', icon: '💳', title: 'Appraisal Fee Due', body: 'Your appraisal fee of $525 is due by Mar 27, 2026. Pay to continue processing.', time: 'Yesterday', date: 'This Week', read: true, link: '/closing', appNo: 'APP-2026-0421' },
  { id: 6, type: 'system', icon: '🔒', title: 'New Sign-In Detected', body: 'A new sign-in to your account was detected from Chrome on Windows.', time: '2 days ago', date: 'This Week', read: true, link: '/profile', appNo: null },
  { id: 7, type: 'condition', icon: '📋', title: 'New Conditions Added', body: '3 new underwriting conditions have been added to your file. Review required.', time: '3 days ago', date: 'This Week', read: true, link: '/apply', appNo: 'APP-2026-0421' },
  { id: 8, type: 'document', icon: '📄', title: 'Documents Received', body: 'Your 2024 W-2 documents have been successfully received and indexed.', time: '5 days ago', date: 'Earlier', read: true, link: '/documents', appNo: 'APP-2026-0421' },
  { id: 9, type: 'system', icon: '🎉', title: 'Application Submitted', body: 'Your loan application APP-2026-0421 has been received and is under review.', time: '1 week ago', date: 'Earlier', read: true, link: '/dashboard', appNo: 'APP-2026-0421' },
]

const TYPE_COLORS = {
  document:   '#60a5fa',
  condition:  '#4ade80',
  asset:      '#fb923c',
  rate:       '#a78bfa',
  payment:    '#facc15',
  system:     'var(--text-secondary)',
}

export default function NotificationsCenter() {
  const [notifications, setNotifications] = useState(NOTIFICATIONS)
  const [filter, setFilter] = useState('All')
  const [tab, setTab] = useState('inbox')

  const unreadCount = notifications.filter(n => !n.read).length

  const markAllRead = () => setNotifications(n => n.map(x => ({ ...x, read: true })))
  const markRead = id => setNotifications(n => n.map(x => x.id === id ? { ...x, read: true } : x))
  const deleteNotif = id => setNotifications(n => n.filter(x => x.id !== id))

  const typeFilters = ['All', 'document', 'condition', 'asset', 'rate', 'payment', 'system']
  const filtered = notifications.filter(n => filter === 'All' || n.type === filter)
  const grouped = ['Today', 'This Week', 'Earlier'].map(date => ({
    date,
    items: filtered.filter(n => n.date === date),
  })).filter(g => g.items.length > 0)

  return (
    <div style={{ maxWidth: 820, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800 }}>Notifications</h1>
          {unreadCount > 0 && (
            <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 4 }}>
              You have <span style={{ color: '#60a5fa', fontWeight: 700 }}>{unreadCount} unread</span> notifications
            </p>
          )}
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-ghost" style={{ fontSize: 13 }} onClick={markAllRead}>✅ Mark All Read</button>
          <button className="btn btn-ghost" style={{ fontSize: 13, color: '#f87171' }}>🗑 Clear All</button>
          <button className="btn btn-primary" style={{ fontSize: 13 }}>⚙️ Preferences</button>
        </div>
      </div>

      {/* Tabs */}
      <div className="tab-group" style={{ marginBottom: 18 }}>
        <button className={`tab-btn ${tab === 'inbox' ? 'active' : ''}`} onClick={() => setTab('inbox')}>
          Inbox {unreadCount > 0 && <span className="badge" style={{ background: '#3b82f6', color: '#fff', fontSize: 10, marginLeft: 6 }}>{unreadCount}</span>}
        </button>
        <button className={`tab-btn ${tab === 'prefs' ? 'active' : ''}`} onClick={() => setTab('prefs')}>Preferences</button>
      </div>

      {tab === 'inbox' && (
        <>
          {/* Type filter chips */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
            {typeFilters.map(t => (
              <button key={t} onClick={() => setFilter(t)}
                style={{ padding: '5px 14px', borderRadius: 20, border: `1px solid ${filter === t ? '#3b82f6' : 'var(--border)'}`, background: filter === t ? 'rgba(59,130,246,0.15)' : 'transparent', color: filter === t ? '#60a5fa' : 'var(--text-muted)', fontSize: 12, cursor: 'pointer', textTransform: t === 'All' ? 'none' : 'capitalize' }}>
                {t === 'All' ? 'All Types' : t}
              </button>
            ))}
          </div>

          {/* Notification groups */}
          {grouped.length === 0 && (
            <div className="card" style={{ textAlign: 'center', padding: 40, color: 'var(--text-muted)' }}>
              🎉 No notifications in this category.
            </div>
          )}
          {grouped.map(({ date, items }) => (
            <div key={date} style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>{date}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {items.map(n => (
                  <div key={n.id} onClick={() => markRead(n.id)}
                    style={{ display: 'flex', gap: 14, padding: '14px 16px', borderRadius: 10, background: !n.read ? 'rgba(59,130,246,0.06)' : 'var(--bg-elevated)', border: `1px solid ${!n.read ? 'rgba(59,130,246,0.15)' : 'var(--border)'}`, cursor: 'pointer', transition: 'background 0.15s' }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: `${TYPE_COLORS[n.type]}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>{n.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 3 }}>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                          <span style={{ fontWeight: !n.read ? 800 : 600, fontSize: 13 }}>{n.title}</span>
                          {!n.read && <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#3b82f6', display: 'inline-block' }} />}
                          {n.appNo && <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{n.appNo}</span>}
                        </div>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexShrink: 0 }}>
                          <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{n.time}</span>
                          <button onClick={e => { e.stopPropagation(); deleteNotif(n.id) }} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: 14, lineHeight: 1 }}>✕</button>
                        </div>
                      </div>
                      <div style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5 }}>{n.body}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </>
      )}

      {tab === 'prefs' && (
        <div className="card">
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 18 }}>Notification Preferences</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {[
              { label: 'Document Requests', sub: 'When a document is requested by your loan officer', email: true, sms: false, push: true },
              { label: 'Condition Updates', sub: 'When conditions on your application are added or cleared', email: true, sms: true, push: true },
              { label: 'Asset Verification', sub: 'When your assets are reviewed or questioned', email: true, sms: false, push: true },
              { label: 'Rate & Lock Alerts', sub: 'Rate lock expiration reminders and rate alerts', email: true, sms: true, push: false },
              { label: 'Payment Due Reminders', sub: 'Upcoming fee and payment reminders', email: true, sms: true, push: true },
              { label: 'Security Alerts', sub: 'New sign-ins and account security events', email: true, sms: true, push: true },
              { label: 'Marketing & Offers', sub: 'Special offers and promotional content', email: false, sms: false, push: false },
            ].map((row, i) => (
              <div key={row.label} style={{ display: 'grid', gridTemplateColumns: '1fr auto auto auto', gap: 24, alignItems: 'center', padding: '14px 0', borderBottom: '1px solid var(--border)' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>{row.label}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{row.sub}</div>
                </div>
                {['Email', 'SMS', 'In-App'].map((ch, j) => {
                  const key = ['email', 'sms', 'push'][j]
                  return (
                    <div key={ch} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{ch}</div>
                      <input type="checkbox" defaultChecked={row[key]} style={{ cursor: 'pointer', accentColor: '#3b82f6' }} />
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
          <div style={{ marginTop: 18 }}>
            <button className="btn btn-primary">Save Preferences</button>
          </div>
        </div>
      )}
    </div>
  )
}
