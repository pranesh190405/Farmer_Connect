'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { ArrowRight, ShoppingBag, Sprout, ShieldCheck, TrendingUp, LogIn } from 'lucide-react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { isAuthenticated, user, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isLoading && isAuthenticated && user) {
      if (user.type === 'farmer') router.push('/farmer/dashboard');
      else if (user.type === 'buyer') router.push('/buyer/dashboard');
      else if (user.type === 'admin') router.push('/admin/dashboard');
    }
  }, [isAuthenticated, user, isLoading, router]);

  return (
    <div className="min-h-screen flex flex-col font-sans" style={{ background: 'linear-gradient(180deg, #f0fdf4 0%, #ffffff 50%, #f0fdf4 100%)' }}>

      {/* Hero Section */}
      <section style={{ position: 'relative', paddingTop: '5rem', paddingBottom: '8rem', overflow: 'hidden' }}>

        {/* Animated Background Orbs */}
        <div style={{
          position: 'absolute', top: '-80px', right: '-60px',
          width: '400px', height: '400px',
          background: 'radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%)',
          borderRadius: '50%', filter: 'blur(60px)',
          animation: 'orbFloat1 15s ease-in-out infinite'
        }} />
        <div style={{
          position: 'absolute', bottom: '-100px', left: '-80px',
          width: '350px', height: '350px',
          background: 'radial-gradient(circle, rgba(234,179,8,0.12) 0%, transparent 70%)',
          borderRadius: '50%', filter: 'blur(60px)',
          animation: 'orbFloat2 18s ease-in-out infinite'
        }} />
        <div style={{
          position: 'absolute', top: '40%', left: '50%',
          width: '250px', height: '250px',
          background: 'radial-gradient(circle, rgba(5,150,105,0.08) 0%, transparent 70%)',
          borderRadius: '50%', filter: 'blur(40px)',
          animation: 'orbFloat1 20s ease-in-out infinite reverse'
        }} />

        <div className="max-w-7xl mx-auto px-6 relative" style={{ zIndex: 10, textAlign: 'center' }}>

          {/* Badge */}
          <div className="animate-fadeInDown" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)',
            padding: '0.5rem 1.25rem', borderRadius: '9999px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
            border: '1px solid rgba(16,185,129,0.15)', marginBottom: '2rem'
          }}>
            <span style={{ width: '8px', height: '8px', background: '#10b981', borderRadius: '50%', animation: 'pulseGlow 2s ease-in-out infinite' }} />
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151' }} suppressHydrationWarning>{t('landing.hero.badge')}</span>
          </div>

          {/* Title */}
          <h1 className="animate-fadeInUp delay-1" style={{
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 800,
            color: '#111827', letterSpacing: '-0.02em', lineHeight: 1.1,
            marginBottom: '1.5rem'
          }} suppressHydrationWarning>
            {t('landing.hero.titlePrefix')} <br className="hidden md:block" />
            <span style={{
              background: 'linear-gradient(135deg, #10b981, #059669, #047857)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }} suppressHydrationWarning>
              {t('landing.hero.titleHighlight')}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="animate-fadeInUp delay-2" style={{
            fontSize: '1.25rem', color: '#6b7280', marginBottom: '2.5rem',
            maxWidth: '42rem', marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.6
          }} suppressHydrationWarning>
            {t('app.tagline')}
          </p>

          {/* CTA Buttons */}
          <div className="animate-fadeInUp delay-3" style={{
            display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center'
          }}>
            {/* Start Selling */}
            <Link href="/farmer/register" style={{
              position: 'relative', display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: 'linear-gradient(135deg, #10b981, #059669, #10b981)',
              backgroundSize: '200% 200%', animation: 'gradientShift 3s ease infinite',
              color: 'white', padding: '1rem 2rem', borderRadius: '14px',
              fontWeight: 700, fontSize: '1.125rem', textDecoration: 'none',
              boxShadow: '0 8px 30px rgba(16,185,129,0.3)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', overflow: 'hidden'
            }} suppressHydrationWarning>
              {t('landing.buttons.startSelling')}
              <ArrowRight style={{ width: 20, height: 20 }} />
            </Link>

            {/* Start Buying */}
            <Link href="/buyer/register" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)',
              color: '#111827', padding: '1rem 2rem', borderRadius: '14px',
              fontWeight: 700, fontSize: '1.125rem', textDecoration: 'none',
              border: '1px solid rgba(229,231,235,0.8)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }} suppressHydrationWarning>
              {t('landing.buttons.startBuying')}
              <ShoppingBag style={{ width: 20, height: 20, color: '#6b7280' }} />
            </Link>
          </div>

          {/* Login Prompt */}
          <div className="animate-fadeInUp delay-4" style={{ marginTop: '2rem' }}>
            <p style={{ color: '#6b7280', fontWeight: 500 }} suppressHydrationWarning>
              {t('auth.login.alreadyHaveAccount') || 'Already have an account?'}{' '}
              <Link href="/login" style={{
                color: '#059669', fontWeight: 700, textDecoration: 'none',
                display: 'inline-flex', alignItems: 'center', gap: '4px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }} suppressHydrationWarning>
                <LogIn style={{ width: 16, height: 16 }} />
                {t('auth.login.loginButton') || 'Log In'}
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section style={{ padding: '6rem 0' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem'
          }}>

            {/* Feature Card 1 */}
            <div className="animate-fadeInUp delay-1" style={{
              position: 'relative', padding: '2.5rem', borderRadius: '20px',
              background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(10px)',
              border: '1px solid rgba(229,231,235,0.6)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              overflow: 'hidden', cursor: 'default'
            }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 20px 50px rgba(16,185,129,0.12)';
                e.currentTarget.style.borderColor = 'rgba(16,185,129,0.3)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.04)';
                e.currentTarget.style.borderColor = 'rgba(229,231,235,0.6)';
              }}
            >
              {/* Shimmer overlay */}
              <div style={{
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                animation: 'shimmer 4s linear infinite', pointerEvents: 'none', opacity: 0.5
              }} />
              <div style={{
                width: '56px', height: '56px', borderRadius: '16px',
                background: 'linear-gradient(135deg, #ecfdf5, #d1fae5)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '1.5rem', transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
              }}>
                <Sprout style={{ width: 28, height: 28, color: '#10b981' }} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', marginBottom: '0.75rem' }} suppressHydrationWarning>{t('landing.features.fresh.title')}</h3>
              <p style={{ color: '#6b7280', lineHeight: 1.7 }} suppressHydrationWarning>{t('landing.features.fresh.desc')}</p>
            </div>

            {/* Feature Card 2 */}
            <div className="animate-fadeInUp delay-2" style={{
              position: 'relative', padding: '2.5rem', borderRadius: '20px',
              background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(10px)',
              border: '1px solid rgba(229,231,235,0.6)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              overflow: 'hidden', cursor: 'default'
            }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 20px 50px rgba(16,185,129,0.12)';
                e.currentTarget.style.borderColor = 'rgba(16,185,129,0.3)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.04)';
                e.currentTarget.style.borderColor = 'rgba(229,231,235,0.6)';
              }}
            >
              <div style={{
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                animation: 'shimmer 4s linear infinite 1s', pointerEvents: 'none', opacity: 0.5
              }} />
              <div style={{
                width: '56px', height: '56px', borderRadius: '16px',
                background: 'linear-gradient(135deg, #ecfdf5, #d1fae5)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '1.5rem', transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
              }}>
                <ShieldCheck style={{ width: 28, height: 28, color: '#10b981' }} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', marginBottom: '0.75rem' }} suppressHydrationWarning>{t('landing.features.quality.title')}</h3>
              <p style={{ color: '#6b7280', lineHeight: 1.7 }} suppressHydrationWarning>{t('landing.features.quality.desc')}</p>
            </div>

            {/* Feature Card 3 */}
            <div className="animate-fadeInUp delay-3" style={{
              position: 'relative', padding: '2.5rem', borderRadius: '20px',
              background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(10px)',
              border: '1px solid rgba(229,231,235,0.6)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              overflow: 'hidden', cursor: 'default'
            }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 20px 50px rgba(16,185,129,0.12)';
                e.currentTarget.style.borderColor = 'rgba(16,185,129,0.3)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.04)';
                e.currentTarget.style.borderColor = 'rgba(229,231,235,0.6)';
              }}
            >
              <div style={{
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                animation: 'shimmer 4s linear infinite 2s', pointerEvents: 'none', opacity: 0.5
              }} />
              <div style={{
                width: '56px', height: '56px', borderRadius: '16px',
                background: 'linear-gradient(135deg, #ecfdf5, #d1fae5)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '1.5rem', transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
              }}>
                <TrendingUp style={{ width: 28, height: 28, color: '#10b981' }} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', marginBottom: '0.75rem' }} suppressHydrationWarning>{t('landing.features.fair.title')}</h3>
              <p style={{ color: '#6b7280', lineHeight: 1.7 }} suppressHydrationWarning>{t('landing.features.fair.desc')}</p>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(10px)',
        borderTop: '1px solid rgba(229,231,235,0.5)', padding: '3rem 0'
      }}>
        <div className="max-w-7xl mx-auto px-6" style={{
          display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between',
          alignItems: 'center', gap: '1.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.5rem' }}>🌾</span>
            <span style={{ fontWeight: 700, color: '#111827' }} suppressHydrationWarning>{t('app.name')}</span>
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.875rem' }}>
            <Link href="/admin/login" style={{ color: '#6b7280', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }} suppressHydrationWarning>{t('dashboard.adminConsole')}</Link>
            <Link href="/profile" style={{ color: '#6b7280', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }} suppressHydrationWarning>{t('nav.profile')}</Link>
            <Link href="/market" style={{ color: '#6b7280', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }} suppressHydrationWarning>{t('nav.market')}</Link>
          </div>
          <div style={{ fontSize: '0.875rem', color: '#9ca3af' }} suppressHydrationWarning>
            © 2026 {t('app.name')}
          </div>
        </div>
      </footer>
    </div>
  );
}
