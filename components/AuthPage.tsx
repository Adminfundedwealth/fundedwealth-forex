'use client'

import { FormEvent, useState } from 'react'
import { Apple, Eye, EyeOff, Globe2, LockKeyhole, Mail, UserRound } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import AuthShowcase from '@/components/AuthShowcase'
import { setAuthSession } from '@/lib/auth-session'

type AuthMode = 'login' | 'register'

export default function AuthPage({ mode }: { mode: AuthMode }) {
  const isLogin = mode === 'login'
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [acceptedTerms, setAcceptedTerms] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    const form = new FormData(event.currentTarget)
    const password = String(form.get('password') ?? '')
    const confirmation = String(form.get('confirmation') ?? '')
    if (!String(form.get('email') ?? '').trim()) return setError('Enter your email address.')
    if (password.length < 8) return setError('Your password must be at least 8 characters.')
    if (!isLogin && password !== confirmation) return setError('Passwords do not match.')
    if (!isLogin && !acceptedTerms) return setError('Accept the Terms & Conditions and Privacy Policy to continue.')
    setIsLoading(true)
    setAuthSession({ firstName: isLogin ? String(form.get('email') ?? '').split('@')[0] : String(form.get('firstName') ?? '').trim() || 'Trader', email: String(form.get('email') ?? '').trim() })
    window.setTimeout(() => router.push('/dashboard'), 450)
  }

  const handleProvider = (provider: string) => {
    setError('')
    setAuthSession({ firstName: 'Trader', email: `${provider.toLowerCase()}@demo.fundedwealth.com` })
    router.push('/dashboard')
  }

  return (
    <main className="auth-page">
      <div className="auth-brand-row"><Link href="/" className="auth-brand"><img src="/fundedwealth-mark.png" alt="FundedWealth Forex" /><span>FUNDEDWEALTH <i>FOREX</i></span></Link><span className="auth-secure-label"><LockKeyhole /> Secure access</span></div>
      <div className="auth-layout">
        <section className="auth-form-panel" aria-labelledby="auth-title">
          <div className="auth-form-inner">
            <div className="auth-kicker"><span /> {isLogin ? 'WELCOME BACK' : 'JOIN THE EDGE'}</div>
            <h1 id="auth-title">{isLogin ? 'Welcome Back' : 'Create Your Account'}</h1>
            <p className="auth-subtitle">{isLogin ? 'Welcome back! Please enter your details to continue.' : 'Start your journey with FundedWealth Forex.'}</p>
            <div className="auth-socials"><button type="button" onClick={() => handleProvider('Google')}><strong>G</strong> Google</button><button type="button" onClick={() => handleProvider('Apple')}><Apple /> Apple</button></div>
            <div className="auth-divider"><span /> OR CONTINUE WITH <span /></div>
            <form onSubmit={handleSubmit} noValidate>
              {!isLogin && <div className="auth-name-grid"><label><span>First Name</span><div className="auth-input"><UserRound /><input name="firstName" placeholder="Enter first name" autoComplete="given-name" /></div></label><label><span>Last Name</span><div className="auth-input"><UserRound /><input name="lastName" placeholder="Enter last name" autoComplete="family-name" /></div></label></div>}
              <label><span>Email</span><div className="auth-input"><Mail /><input name="email" type="email" placeholder="Enter your email" autoComplete="email" required /></div></label>
              {!isLogin && <label><span>Country / Phone Number</span><div className="auth-phone"><button type="button" aria-label="Choose country"><Globe2 /> +91 <span>⌄</span></button><input name="phone" type="tel" placeholder="Enter mobile number" autoComplete="tel" /></div></label>}
              <label><span>Password</span><div className="auth-input"><LockKeyhole /><input name="password" type={showPassword ? 'text' : 'password'} placeholder="Enter your password" autoComplete={isLogin ? 'current-password' : 'new-password'} required /><button type="button" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff /> : <Eye />}</button></div></label>
              {!isLogin && <label><span>Confirm Password</span><div className="auth-input"><LockKeyhole /><input name="confirmation" type={showConfirmation ? 'text' : 'password'} placeholder="Confirm your password" autoComplete="new-password" required /><button type="button" aria-label={showConfirmation ? 'Hide confirmation password' : 'Show confirmation password'} onClick={() => setShowConfirmation(!showConfirmation)}>{showConfirmation ? <EyeOff /> : <Eye />}</button></div></label>}
              {isLogin ? <div className="auth-options"><label className="auth-check"><input type="checkbox" name="remember" /> <span>Remember me</span></label><button type="button" className="auth-text-button" onClick={() => setError('Password recovery is not configured for this environment yet.')}>Forgot password?</button></div> : <label className="auth-check auth-terms"><input type="checkbox" checked={acceptedTerms} onChange={(event) => setAcceptedTerms(event.target.checked)} /> <span>I agree to the <Link href="/legal/terms-and-conditions">Terms &amp; Conditions</Link> and <Link href="/privacy-policy">Privacy Policy</Link></span></label>}
              {error && <p className="auth-error" role="alert">{error}</p>}
              <button className="auth-submit" type="submit" disabled={isLoading}>{isLoading ? 'Connecting...' : isLogin ? 'Sign In' : 'Create Account'}</button>
            </form>
            <p className="auth-switch">{isLogin ? "Don't have an account?" : 'Already have an account?'} <Link href={isLogin ? '/register' : '/login'}>{isLogin ? 'Sign Up' : 'Sign In'}</Link></p>
          </div>
        </section>
        <AuthShowcase />
      </div>
    </main>
  )
}
