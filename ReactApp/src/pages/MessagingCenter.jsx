import { useState, useRef, useEffect } from 'react'

const CONTACTS = [
  { id: 1, name: 'Sarah Johnson', role: 'Loan Officer', initials: 'SJ', color: '#3b82f6', lastMsg: 'Please upload your updated bank statement.', lastTime: '10:32 AM', unread: 2, online: true, appNo: 'APP-2026-0421' },
  { id: 2, name: 'Mike Torres', role: 'Underwriter', initials: 'MT', color: '#a78bfa', lastMsg: 'Employment verification has been completed.', lastTime: '9:15 AM', unread: 0, online: true, appNo: 'APP-2026-0421' },
  { id: 3, name: 'Lisa Chen', role: 'Processor', initials: 'LC', color: '#4ade80', lastMsg: 'Closing disclosure is ready for review.', lastTime: 'Yesterday', unread: 1, online: false, appNo: 'APP-2026-0421' },
  { id: 4, name: 'Tom Bailey', role: 'Loan Officer', initials: 'TB', color: '#f59e0b', lastMsg: 'Your rate lock expires in 5 days.', lastTime: 'Yesterday', unread: 0, online: false, appNo: 'APP-2026-0418' },
  { id: 5, name: 'Support Team', role: 'Customer Support', initials: 'ST', color: '#64748b', lastMsg: 'How can we help you today?', lastTime: 'Mar 22', unread: 0, online: true, appNo: null },
]

const MESSAGES = {
  1: [
    { id: 1, from: 'them', text: 'Hi John, I am reviewing your application APP-2026-0421.', time: '9:00 AM', date: 'Today' },
    { id: 2, from: 'them', text: 'I noticed your Coinbase Bitcoin asset was flagged. Could you provide a 90-day exchange statement?', time: '9:02 AM', date: 'Today' },
    { id: 3, from: 'me', text: 'Of course, I will upload that today. Is PDF format acceptable?', time: '9:20 AM', date: 'Today' },
    { id: 4, from: 'them', text: 'Yes, PDF is great! Make sure it shows the full 90-day transaction history and current balance.', time: '9:22 AM', date: 'Today' },
    { id: 5, from: 'me', text: 'Got it. I will upload it through the documents portal. Should I tag it as Asset Verification?', time: '10:10 AM', date: 'Today' },
    { id: 6, from: 'them', text: 'Please upload your updated bank statement.', time: '10:32 AM', date: 'Today', isDoc: false },
  ],
  2: [
    { id: 1, from: 'them', text: 'Your employment verification is complete. W-2s and paystubs match employer records.', time: '9:15 AM', date: 'Today' },
    { id: 2, from: 'me', text: 'Great news! When can I expect the underwriting decision?', time: '9:45 AM', date: 'Today' },
    { id: 3, from: 'them', text: 'We are targeting a decision within the next 2 business days.', time: '9:47 AM', date: 'Today' },
  ],
  3: [
    { id: 1, from: 'them', text: 'Hi John, the Closing Disclosure is ready for your review. Please sign within 3 business days.', time: '4:00 PM', date: 'Yesterday' },
    { id: 2, from: 'me', text: 'I received it. I will review it tonight. Quick question — is the escrow amount locked in?', time: '6:20 PM', date: 'Yesterday' },
    { id: 3, from: 'them', text: 'Closing disclosure is ready for review.', time: '6:30 PM', date: 'Yesterday' },
  ],
  4: [
    { id: 1, from: 'them', text: 'Your rate lock of 6.875% expires on Mar 29, 2026. Please contact us about an extension if needed.', time: '10:00 AM', date: 'Yesterday' },
  ],
  5: [
    { id: 1, from: 'them', text: 'Hello! How can we help you today?', time: 'Mar 22', date: 'Mar 22' },
  ],
}

export default function MessagingCenter() {
  const [activeContact, setActiveContact] = useState(CONTACTS[0])
  const [messages, setMessages] = useState(MESSAGES)
  const [draftText, setDraftText] = useState('')
  const [showCompose, setShowCompose] = useState(false)
  const [contacts] = useState(CONTACTS)
  const [searchQ, setSearchQ] = useState('')
  const messagesEndRef = useRef(null)

  const currentMessages = messages[activeContact.id] || []
  const filteredContacts = contacts.filter(c =>
    !searchQ || c.name.toLowerCase().includes(searchQ.toLowerCase()) || c.role.toLowerCase().includes(searchQ.toLowerCase())
  )

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [activeContact.id, messages])

  const sendMessage = () => {
    if (!draftText.trim()) return
    const newMsg = { id: Date.now(), from: 'me', text: draftText.trim(), time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }), date: 'Today' }
    setMessages(m => ({ ...m, [activeContact.id]: [...(m[activeContact.id] || []), newMsg] }))
    setDraftText('')
  }

  const handleKeyDown = e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() }
  }

  // Group messages by date
  const groupedMsgs = currentMessages.reduce((acc, m) => {
    const key = m.date
    if (!acc[key]) acc[key] = []
    acc[key].push(m)
    return acc
  }, {})

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', height: 'calc(100vh - 120px)', gap: 0, borderRadius: 12, overflow: 'hidden', border: '1px solid #334155' }}>
      {/* Left: Contacts list */}
      <div style={{ background: '#1e293b', borderRight: '1px solid #334155', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div style={{ padding: '16px 14px', borderBottom: '1px solid #334155', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontWeight: 800, fontSize: 14 }}>Messages</div>
          <div style={{ display: 'flex', gap: 6 }}>
            <button className="btn btn-ghost" style={{ fontSize: 11, padding: '4px 8px' }} onClick={() => setShowCompose(true)}>+ New</button>
          </div>
        </div>
        {/* Search */}
        <div style={{ padding: '10px 14px', borderBottom: '1px solid #334155' }}>
          <div style={{ background: '#0f172a', borderRadius: 8, padding: '7px 12px', display: 'flex', gap: 8, alignItems: 'center' }}>
            <span style={{ color: '#475569', fontSize: 13 }}>🔍</span>
            <input value={searchQ} onChange={e => setSearchQ(e.target.value)} placeholder="Search conversations…"
              style={{ background: 'none', border: 'none', outline: 'none', fontSize: 12, color: '#f1f5f9', width: '100%' }} />
          </div>
        </div>
        {/* Contact list */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {filteredContacts.map(c => (
            <button key={c.id} onClick={() => setActiveContact(c)}
              style={{ display: 'flex', width: '100%', gap: 12, padding: '14px 16px', borderBottom: '1px solid #1a2030', background: activeContact.id === c.id ? 'rgba(59,130,246,0.1)' : 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', borderLeft: activeContact.id === c.id ? `3px solid #3b82f6` : '3px solid transparent' }}>
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: c.color + '33', border: `2px solid ${c.color}66`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, color: c.color }}>{c.initials}</div>
                {c.online && <div style={{ position: 'absolute', bottom: 1, right: 1, width: 10, height: 10, borderRadius: '50%', background: '#4ade80', border: '2px solid #1e293b' }} />}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                  <span style={{ fontWeight: 700, fontSize: 13, color: activeContact.id === c.id ? '#60a5fa' : '#f1f5f9' }}>{c.name}</span>
                  <span style={{ fontSize: 11, color: '#475569', flexShrink: 0 }}>{c.lastTime}</span>
                </div>
                <div style={{ fontSize: 11, color: '#475569', marginBottom: 1 }}>{c.role} {c.appNo && `· ${c.appNo}`}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 12, color: '#64748b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>{c.lastMsg}</span>
                  {c.unread > 0 && (
                    <span style={{ background: '#3b82f6', color: '#fff', fontSize: 10, fontWeight: 800, borderRadius: 10, padding: '1px 6px', marginLeft: 6, flexShrink: 0 }}>{c.unread}</span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Right: Message thread */}
      <div style={{ background: '#0f172a', display: 'flex', flexDirection: 'column' }}>
        {/* Thread header */}
        <div style={{ padding: '14px 20px', borderBottom: '1px solid #334155', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#1e293b' }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{ width: 38, height: 38, borderRadius: '50%', background: activeContact.color + '33', border: `2px solid ${activeContact.color}66`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, color: activeContact.color }}>{activeContact.initials}</div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 14 }}>{activeContact.name}</div>
              <div style={{ fontSize: 11, color: '#4ade80' }}>{activeContact.online ? '● Online' : '○ Offline'} · {activeContact.role}</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {activeContact.appNo && <span style={{ fontSize: 12, color: '#475569' }}>{activeContact.appNo}</span>}
            <button className="btn btn-ghost" style={{ fontSize: 12 }}>⋯</button>
          </div>
        </div>

        {/* Messages area */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 0 }}>
          {Object.entries(groupedMsgs).map(([date, msgs]) => (
            <div key={date}>
              <div style={{ textAlign: 'center', margin: '14px 0 18px', position: 'relative' }}>
                <span style={{ background: '#1e293b', padding: '4px 14px', borderRadius: 20, fontSize: 11, color: '#475569', border: '1px solid #334155', position: 'relative', zIndex: 1 }}>{date}</span>
                <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 1, background: '#1e293b', zIndex: 0 }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {msgs.map(m => (
                  <div key={m.id} style={{ display: 'flex', flexDirection: m.from === 'me' ? 'row-reverse' : 'row', gap: 10, alignItems: 'flex-end' }}>
                    {m.from !== 'me' && (
                      <div style={{ width: 28, height: 28, borderRadius: '50%', background: activeContact.color + '33', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 800, color: activeContact.color, flexShrink: 0 }}>{activeContact.initials}</div>
                    )}
                    <div style={{ maxWidth: '68%' }}>
                      <div style={{ background: m.from === 'me' ? '#1d4ed8' : '#1e293b', border: `1px solid ${m.from === 'me' ? '#2563eb' : '#334155'}`, borderRadius: m.from === 'me' ? '16px 16px 4px 16px' : '16px 16px 16px 4px', padding: '10px 14px', fontSize: 13, lineHeight: 1.5, color: '#f1f5f9' }}>
                        {m.text}
                        {m.isDoc && <div style={{ marginTop: 8, padding: '8px 10px', background: 'rgba(255,255,255,0.06)', borderRadius: 8, fontSize: 12, color: '#60a5fa', display: 'flex', gap: 6 }}>📎 bank_statement.pdf</div>}
                      </div>
                      <div style={{ fontSize: 10, color: '#334155', marginTop: 3, textAlign: m.from === 'me' ? 'right' : 'left' }}>{m.time} {m.from === 'me' && '✓✓'}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div style={{ padding: '14px 20px', borderTop: '1px solid #334155', background: '#1e293b' }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end' }}>
            <div style={{ flex: 1, background: '#0f172a', border: '1px solid #334155', borderRadius: 12, padding: '10px 14px', display: 'flex', gap: 10, alignItems: 'center' }}>
              <textarea value={draftText} onChange={e => setDraftText(e.target.value)} onKeyDown={handleKeyDown}
                placeholder="Type a message… (Enter to send, Shift+Enter for new line)"
                rows={1}
                style={{ flex: 1, background: 'none', border: 'none', outline: 'none', resize: 'none', color: '#f1f5f9', fontSize: 13, fontFamily: 'inherit', lineHeight: 1.5 }} />
              <button className="btn btn-ghost" style={{ fontSize: 16, padding: '2px 6px', color: '#475569' }}>📎</button>
            </div>
            <button className="btn btn-primary" style={{ padding: '10px 16px', borderRadius: 12 }} onClick={sendMessage} disabled={!draftText.trim()}>
              Send
            </button>
          </div>
          <div style={{ fontSize: 11, color: '#334155', marginTop: 6, textAlign: 'center' }}>
            Messages are logged for compliance purposes
          </div>
        </div>
      </div>

      {/* Compose Modal */}
      {showCompose && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 14, width: 520, padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
              <div style={{ fontWeight: 800 }}>New Message</div>
              <button onClick={() => setShowCompose(false)} style={{ background: 'none', border: 'none', color: '#64748b', fontSize: 18, cursor: 'pointer' }}>✕</button>
            </div>
            <div className="form-group">
              <label className="form-label">TO</label>
              <select style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: 8, padding: '8px 12px', color: '#f1f5f9', fontSize: 13, width: '100%' }}>
                {CONTACTS.map(c => <option key={c.id}>{c.name} — {c.role}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">SUBJECT (OPTIONAL)</label>
              <input placeholder="e.g., Question about document requirements" />
            </div>
            <div className="form-group">
              <label className="form-label">MESSAGE</label>
              <textarea rows={5} placeholder="Type your message here…" style={{ width: '100%', background: '#0f172a', border: '1px solid #334155', borderRadius: 8, padding: 10, color: '#f1f5f9', fontSize: 13, resize: 'none', boxSizing: 'border-box' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 6 }}>
              <button className="btn btn-ghost" onClick={() => setShowCompose(false)}>Cancel</button>
              <button className="btn btn-ghost" style={{ color: '#60a5fa' }}>📎 Attach</button>
              <button className="btn btn-primary" onClick={() => setShowCompose(false)}>Send Message</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
