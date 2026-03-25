import { useState, useRef, useEffect } from 'react'
import { useTheme } from '../contexts/ThemeContext.jsx'

const BOT_NAME = 'LoanBot AI'
const BOT_AVATAR = '🤖'

// Canned responses keyed by keyword patterns
const RESPONSES = [
  { match: /rate|interest|apr/i, reply: 'Current rates are around **6.875%** for a 30-yr conventional. Rates change daily — your loan officer locks your rate at time of application. Want me to open the Pre-Qual Calculator?' },
  { match: /document|upload|statement/i, reply: 'You can upload documents directly in the **Document Center**. Most lenders require the last 2 months of bank statements, 2 years of W-2s, and recent paystubs. Need help finding that section?' },
  { match: /asset|bank|plaid|verification/i, reply: 'Assets can be connected instantly via **Plaid** (fastest) or by manually uploading bank statements. Head to **My Assets** to get started. Verified assets speed up underwriting significantly.' },
  { match: /status|application|progress/i, reply: 'Your application **APP-2026-0421** is currently **In Review** with underwriting. 8 of 10 assets are verified. You have 1 open condition — check your **Dashboard** for details.' },
  { match: /credit|fico|score/i, reply: 'Your FICO score of **742** qualifies you for conventional financing. A 760+ score may get you a slightly better rate. Avoid opening new credit lines or large purchases before closing.' },
  { match: /down payment|downpayment/i, reply: 'Your current down payment is **$35,000 (7%)**. This covers conventional 5% minimums. With 20% down you would eliminate PMI (~$180/mo savings). The Pre-Qual Calculator can model different scenarios for you.' },
  { match: /close|closing|closing date/i, reply: 'Your estimated closing date is **April 18, 2026**. The Closing Disclosure will be ready 3 business days before. Review it carefully — it lists all final costs and fees.' },
  { match: /pmi|mortgage insurance/i, reply: 'PMI applies when LTV is above 80%. At your current LTV of **89.8%**, PMI is approximately **$182/month**. It automatically cancels when you reach 80% LTV through payments or appreciation.' },
  { match: /condition|underwriting/i, reply: 'You currently have **3 open conditions**: (1) Crypto asset statement, (2) Gift funds donor letter, (3) 2024 tax returns. Clearing them quickly will speed up your approval — visit the **Documents** section.' },
  { match: /help|what can you|hello|hi|hey/i, reply: `Hi there! I'm **${BOT_NAME}** 👋 I can help you with:\n\n• Application status and conditions\n• Document requirements\n• Rate and payment estimates\n• Asset verification steps\n• Closing process questions\n\nWhat would you like to know?` },
  { match: /thank|thanks/i, reply: "You're welcome! Is there anything else I can help you with? 😊" },
  { match: /lock|rate lock/i, reply: 'Your rate lock of **6.875%** expires on **March 29, 2026** — that\'s in 4 days. Contact your loan officer Sarah Johnson to discuss an extension if needed. Extensions typically cost 0.125–0.25 of a point.' },
]

const DEFAULT_REPLY = "I'm not sure about that specific question. I'd recommend reaching out to your loan officer Sarah Johnson directly at (555) 867-5309, or use the **Messages** section for a documented conversation. Is there anything else I can help with?"

const QUICK_REPLIES = [
  'What is my application status?',
  'What documents do I need?',
  'How do I verify my assets?',
  'When is my closing date?',
  'Explain my conditions',
]

function getReply(text) {
  for (const r of RESPONSES) {
    if (r.match.test(text)) return r.reply
  }
  return DEFAULT_REPLY
}

// Simple markdown-bold renderer
function renderText(text) {
  const parts = text.split(/\*\*(.*?)\*\*/g)
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i} style={{ color: 'inherit', fontWeight: 800 }}>{part}</strong> : part
  )
}

export default function FloatingChatbot() {
  const { theme, accent } = useTheme()
  const [open, setOpen] = useState(false)
  const [minimized, setMinimized] = useState(false)
  const [messages, setMessages] = useState([
    { id: 1, from: 'bot', text: `Hi! I'm **${BOT_NAME}** 👋 I can answer questions about your loan application, documents, rates, and more. How can I help you today?`, time: 'Now' },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [unread, setUnread] = useState(0)
  const inputRef = useRef(null)
  const bottomRef = useRef(null)

  useEffect(() => {
    if (open) { setUnread(0); setTimeout(() => inputRef.current?.focus(), 100) }
  }, [open])

  useEffect(() => {
    if (open && !minimized) bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open, minimized])

  const sendMessage = (text) => {
    const t = text || input.trim()
    if (!t) return
    setInput('')
    const now = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    setMessages(m => [...m, { id: Date.now(), from: 'user', text: t, time: now }])
    setTyping(true)
    setTimeout(() => {
      const reply = getReply(t)
      setMessages(m => [...m, { id: Date.now() + 1, from: 'bot', text: reply, time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) }])
      setTyping(false)
      if (!open) setUnread(u => u + 1)
    }, 900 + Math.random() * 600)
  }

  const isDark = !['light'].includes(theme.name)
  const panelBg = theme.sidebar
  const panelBorder = theme.sidebarBorder
  const msgBg = theme.vars['--bg-elevated']

  return (
    <>
      {/* Panel */}
      {open && (
        <div style={{
          position: 'fixed', bottom: 80, right: 24, zIndex: 9999,
          width: 360, height: minimized ? 0 : 520,
          background: panelBg, border: `1px solid ${panelBorder}`,
          borderRadius: 16, display: 'flex', flexDirection: 'column',
          boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
          transition: 'height 0.25s ease', overflow: 'hidden',
        }}>
          {/* Header */}
          <div style={{ padding: '14px 16px', borderBottom: `1px solid ${panelBorder}`, display: 'flex', gap: 10, alignItems: 'center', background: `linear-gradient(135deg, ${accent.color}22, ${accent.light}11)`, flexShrink: 0 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: `linear-gradient(135deg, ${accent.color}, ${accent.light})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>{BOT_AVATAR}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 800, fontSize: 13, color: theme.vars['--text-primary'] }}>{BOT_NAME}</div>
              <div style={{ fontSize: 11, color: '#4ade80', display: 'flex', alignItems: 'center', gap: 5 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', display: 'inline-block', boxShadow: '0 0 6px #4ade80' }} />
                Online — responds instantly
              </div>
            </div>
            <button onClick={() => setMinimized(m => !m)} style={{ background: 'none', border: 'none', color: theme.vars['--text-muted'], cursor: 'pointer', fontSize: 16, padding: '2px 6px' }}>
              {minimized ? '▲' : '▬'}
            </button>
            <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', color: theme.vars['--text-muted'], cursor: 'pointer', fontSize: 16, padding: '2px 6px' }}>✕</button>
          </div>

          {!minimized && (
            <>
              {/* Messages */}
              <div style={{ flex: 1, overflowY: 'auto', padding: '16px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {messages.map(m => (
                  <div key={m.id} style={{ display: 'flex', flexDirection: m.from === 'user' ? 'row-reverse' : 'row', gap: 8, alignItems: 'flex-end' }}>
                    {m.from === 'bot' && (
                      <div style={{ width: 26, height: 26, borderRadius: '50%', background: `${accent.color}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, flexShrink: 0 }}>{BOT_AVATAR}</div>
                    )}
                    <div style={{ maxWidth: '80%' }}>
                      <div style={{
                        background: m.from === 'user' ? `linear-gradient(135deg, ${accent.color}, ${accent.light})` : msgBg,
                        border: m.from === 'user' ? 'none' : `1px solid ${panelBorder}`,
                        borderRadius: m.from === 'user' ? '12px 12px 4px 12px' : '12px 12px 12px 4px',
                        padding: '9px 12px', fontSize: 12.5, lineHeight: 1.6,
                        color: m.from === 'user' ? '#fff' : theme.vars['--text-primary'],
                        whiteSpace: 'pre-wrap',
                      }}>
                        {renderText(m.text)}
                      </div>
                      <div style={{ fontSize: 10, color: theme.vars['--text-muted'], marginTop: 3, textAlign: m.from === 'user' ? 'right' : 'left' }}>{m.time}</div>
                    </div>
                  </div>
                ))}

                {typing && (
                  <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
                    <div style={{ width: 26, height: 26, borderRadius: '50%', background: `${accent.color}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13 }}>{BOT_AVATAR}</div>
                    <div style={{ background: msgBg, border: `1px solid ${panelBorder}`, borderRadius: '12px 12px 12px 4px', padding: '10px 14px', display: 'flex', gap: 4, alignItems: 'center' }}>
                      {[0, 1, 2].map(i => (
                        <span key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: theme.vars['--text-muted'], display: 'inline-block', animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite` }} />
                      ))}
                    </div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              {/* Quick replies */}
              <div style={{ padding: '6px 14px', borderTop: `1px solid ${panelBorder}`, display: 'flex', gap: 6, overflowX: 'auto', flexShrink: 0 }}>
                {QUICK_REPLIES.map(q => (
                  <button key={q} onClick={() => sendMessage(q)}
                    style={{ background: `${accent.color}15`, border: `1px solid ${accent.color}40`, borderRadius: 20, padding: '4px 10px', fontSize: 11, color: accent.light, cursor: 'pointer', whiteSpace: 'nowrap', transition: 'background 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.background = `${accent.color}30`}
                    onMouseLeave={e => e.currentTarget.style.background = `${accent.color}15`}>
                    {q}
                  </button>
                ))}
              </div>

              {/* Input */}
              <div style={{ padding: '10px 14px', borderTop: `1px solid ${panelBorder}`, display: 'flex', gap: 8, alignItems: 'center', flexShrink: 0 }}>
                <input ref={inputRef} value={input} onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                  placeholder="Ask about your loan…"
                  style={{ flex: 1, background: msgBg, border: `1px solid ${panelBorder}`, borderRadius: 10, padding: '8px 12px', fontSize: 12.5, color: theme.vars['--text-primary'], outline: 'none', width: 'auto' }} />
                <button onClick={() => sendMessage()} disabled={!input.trim()}
                  style={{ width: 34, height: 34, borderRadius: '50%', background: input.trim() ? `linear-gradient(135deg, ${accent.color}, ${accent.light})` : theme.vars['--bg-elevated'], border: 'none', cursor: input.trim() ? 'pointer' : 'default', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, transition: 'all 0.15s', flexShrink: 0 }}>
                  ➤
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* FAB trigger */}
      <button onClick={() => setOpen(o => !o)}
        style={{
          position: 'fixed', bottom: 24, right: 24, zIndex: 10000,
          width: 54, height: 54, borderRadius: '50%',
          background: `linear-gradient(135deg, ${accent.color}, ${accent.light})`,
          border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 24, boxShadow: `0 4px 20px ${accent.color}66`,
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.boxShadow = `0 6px 28px ${accent.color}88` }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = `0 4px 20px ${accent.color}66` }}
        title="Chat with LoanBot AI"
      >
        {open ? '✕' : '🤖'}
        {!open && unread > 0 && (
          <span style={{ position: 'absolute', top: 2, right: 2, width: 18, height: 18, borderRadius: '50%', background: '#f87171', fontSize: 10, fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #fff' }}>{unread}</span>
        )}
      </button>

      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-5px); }
        }
      `}</style>
    </>
  )
}
