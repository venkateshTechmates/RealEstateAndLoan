import { useEffect, useCallback, useRef } from 'react'

const SESSION_KEY = 'rls-session-token'
const SESSION_EXPIRY = 'rls-session-expiry'
const SESSION_TTL = 5 * 60 * 1000 // 5 minutes

export function createSession() {
  const token = crypto.randomUUID()
  const expiry = Date.now() + SESSION_TTL
  sessionStorage.setItem(SESSION_KEY, token)
  sessionStorage.setItem(SESSION_EXPIRY, String(expiry))
  return token
}

export function clearSession() {
  sessionStorage.removeItem(SESSION_KEY)
  sessionStorage.removeItem(SESSION_EXPIRY)
}

export function isSessionValid() {
  const token = sessionStorage.getItem(SESSION_KEY)
  const expiry = sessionStorage.getItem(SESSION_EXPIRY)
  if (!token || !expiry) return false
  return Date.now() < Number(expiry)
}

export function refreshSession() {
  if (sessionStorage.getItem(SESSION_KEY)) {
    sessionStorage.setItem(SESSION_EXPIRY, String(Date.now() + SESSION_TTL))
  }
}

export function getSessionTimeLeft() {
  const expiry = sessionStorage.getItem(SESSION_EXPIRY)
  if (!expiry) return 0
  return Math.max(0, Number(expiry) - Date.now())
}

/** Hook: resets 5-min timer on any user activity; calls onExpire when time runs out */
export function useSessionGuard(onExpire) {
  const timerRef = useRef(null)

  const reset = useCallback(() => {
    if (!sessionStorage.getItem(SESSION_KEY)) return
    refreshSession()
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      clearSession()
      onExpire()
    }, SESSION_TTL)
  }, [onExpire])

  useEffect(() => {
    if (!isSessionValid()) {
      clearSession()
      onExpire()
      return
    }

    // Start timer for remaining time
    const remaining = getSessionTimeLeft()
    timerRef.current = setTimeout(() => {
      clearSession()
      onExpire()
    }, remaining)

    // Reset on any user activity
    const events = ['mousedown', 'keydown', 'scroll', 'touchstart', 'click']
    events.forEach(e => window.addEventListener(e, reset, { passive: true }))

    return () => {
      clearTimeout(timerRef.current)
      events.forEach(e => window.removeEventListener(e, reset))
    }
  }, [onExpire, reset])
}
