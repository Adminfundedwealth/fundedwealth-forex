export const AUTH_SESSION_KEY = 'fundedwealth-forex-auth'

export type AuthSession = {
  firstName: string
  email: string
}

export function getAuthSession(): AuthSession | null {
  if (typeof window === 'undefined') return null
  try {
    const value = window.localStorage.getItem(AUTH_SESSION_KEY)
    return value ? JSON.parse(value) as AuthSession : null
  } catch {
    return null
  }
}

export function setAuthSession(session: AuthSession) {
  window.localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session))
}

export function clearAuthSession() {
  window.localStorage.removeItem(AUTH_SESSION_KEY)
}
