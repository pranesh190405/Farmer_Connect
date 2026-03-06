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
    <div className="min-h-screen flex flex-col font-sans" style={{ background: 'linear-gradient(180deg, #fefce8 0%, #fffef5 40%, #fefce8 100%)' }}>

      {/* Hero Section */}
      <section style={{ position: 'relative', paddingTop: '5rem', paddingBottom: '8rem', overflow: 'hidden' }}>

        {/* Animated Background Orbs — emerald + gold */}
        <div style={{
          position: 'absolute', top: '-80px', right: '-60px',
          width: '400px', height: '400px',
          background: 'radial-gradient(circle, rgba(6,95,70,0.1) 0%, transparent 70%)',
          borderRadius: '50%', filter: 'blur(60px)',
          animation: 'orbFloat1 15s ease-in-out infinite'
        }} />
        <div style={{
          position: 'absolute', bottom: '-100px', left: '-80px',
          width: '350px', height: '350px',
          background: 'radial-gradient(circle, rgba(217,119,6,0.1) 0%, transparent 70%)',
          borderRadius: '50%', filter: 'blur(60px)',
          animation: 'orbFloat2 18s ease-in-out infinite'
        }} />
        <div style={{
          position: 'absolute', top: '40%', left: '50%',
          width: '250px', height: '250px',
          background: 'radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%)',
          borderRadius: '50%', filter: 'blur(40px)',
          animation: 'orbFloat1 20s ease-in-out infinite reverse'
        }} />

        <div className="max-w-7xl mx-auto px-6 relative" style={{ zIndex: 10, textAlign: 'center' }}>

          {/* Badge */}
          <div className="animate-fadeInDown" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            background: 'rgba(255,254,245,0.92)', backdropFilter: 'blur(10px)',
            padding: '0.5rem 1.25rem', borderRadius: '9999px',
            boxShadow: '0 4px 20px rgba(28,25,23,0.05)',
            border: '1px solid rgba(231,229,228,0.5)', marginBottom: '2rem'
          }}>
            <span style={{ width: '8px', height: '8px', background: '#d97706', borderRadius: '50%', animation: 'pulseGlow 2s ease-in-out infinite', boxShadow: '0 0 8px rgba(217,119,6,0.4)' }} />
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1c1917' }} suppressHydrationWarning>{t('landing.hero.badge')}</span>
          </div>

          {/* Title */}
          <h1 className="animate-fadeInUp delay-1" style={{
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 800,
            color: '#1c1917', letterSpacing: '-0.02em', lineHeight: 1.1,
            marginBottom: '1.5rem'
          }} suppressHydrationWarning>
            {t('landing.hero.titlePrefix')} <br className="hidden md:block" />
            <span style={{
              background: 'linear-gradient(135deg, #065f46, #10b981, #047857)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }} suppressHydrationWarning>
              {t('landing.hero.titleHighlight')}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="animate-fadeInUp delay-2" style={{
            fontSize: '1.25rem', color: '#78716c', marginBottom: '2.5rem',
            maxWidth: '42rem', marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.6
          }} suppressHydrationWarning>
            {t('app.tagline')}
          </p>

          {/* CTA Buttons */}
          <div className="animate-fadeInUp delay-3" style={{
            display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center'
          }}>
            {/* Start Selling — emerald */}
            <Link href="/login?type=farmer" style={{
              position: 'relative', display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: 'linear-gradient(135deg, #065f46, #10b981, #065f46)',
              backgroundSize: '200% 200%', animation: 'gradientShift 3s ease infinite',
              color: 'white', padding: '1rem 2rem', borderRadius: '14px',
              fontWeight: 700, fontSize: '1.125rem', textDecoration: 'none',
              boxShadow: '0 8px 30px rgba(6,95,70,0.25)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', overflow: 'hidden'
            }} suppressHydrationWarning>
              {t('landing.buttons.startSelling')}
              <ArrowRight style={{ width: 20, height: 20 }} />
            </Link>

            {/* Start Buying — warm gold accent */}
            <Link href="/login?type=buyer" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: 'rgba(255,254,245,0.92)', backdropFilter: 'blur(10px)',
              color: '#1c1917', padding: '1rem 2rem', borderRadius: '14px',
              fontWeight: 700, fontSize: '1.125rem', textDecoration: 'none',
              border: '2px solid rgba(217,119,6,0.2)',
              boxShadow: '0 4px 20px rgba(28,25,23,0.05)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }} suppressHydrationWarning>
              {t('landing.buttons.startBuying')}
              <ShoppingBag style={{ width: 20, height: 20, color: '#d97706' }} />
            </Link>
          </div>

          {/* Login Prompt */}
          <div className="animate-fadeInUp delay-4" style={{ marginTop: '2rem' }}>
            <p style={{ color: '#78716c', fontWeight: 500 }} suppressHydrationWarning>
              {t('auth.login.alreadyHaveAccount') || 'Already have an account?'}{' '}
              <Link href="/login" style={{
                color: '#065f46', fontWeight: 700, textDecoration: 'none',
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
              background: 'rgba(255,254,245,0.85)', backdropFilter: 'blur(10px)',
              border: '1px solid rgba(231,229,228,0.5)',
              boxShadow: '0 4px 20px rgba(28,25,23,0.03)',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              overflow: 'hidden', cursor: 'default'
            }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 20px 50px rgba(6,95,70,0.1)';
                e.currentTarget.style.borderColor = 'rgba(6,95,70,0.2)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(28,25,23,0.03)';
                e.currentTarget.style.borderColor = 'rgba(231,229,228,0.5)';
              }}
            >
              <div style={{
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(251,191,36,0.06), transparent)',
                animation: 'shimmer 4s linear infinite', pointerEvents: 'none'
              }} />
              <div style={{
                width: '56px', height: '56px', borderRadius: '16px',
                background: 'linear-gradient(135deg, #ecfdf5, #d1fae5)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '1.5rem'
              }}>
                <Sprout style={{ width: 28, height: 28, color: '#065f46' }} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1c1917', marginBottom: '0.75rem' }} suppressHydrationWarning>{t('landing.features.fresh.title')}</h3>
              <p style={{ color: '#78716c', lineHeight: 1.7 }} suppressHydrationWarning>{t('landing.features.fresh.desc')}</p>
            </div>

            {/* Feature Card 2 */}
            <div className="animate-fadeInUp delay-2" style={{
              position: 'relative', padding: '2.5rem', borderRadius: '20px',
              background: 'rgba(255,254,245,0.85)', backdropFilter: 'blur(10px)',
              border: '1px solid rgba(231,229,228,0.5)',
              boxShadow: '0 4px 20px rgba(28,25,23,0.03)',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              overflow: 'hidden', cursor: 'default'
            }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 20px 50px rgba(6,95,70,0.1)';
                e.currentTarget.style.borderColor = 'rgba(6,95,70,0.2)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(28,25,23,0.03)';
                e.currentTarget.style.borderColor = 'rgba(231,229,228,0.5)';
              }}
            >
              <div style={{
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(251,191,36,0.06), transparent)',
                animation: 'shimmer 4s linear infinite 1s', pointerEvents: 'none'
              }} />
              <div style={{
                width: '56px', height: '56px', borderRadius: '16px',
                background: 'linear-gradient(135deg, #ecfdf5, #d1fae5)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '1.5rem'
              }}>
                <ShieldCheck style={{ width: 28, height: 28, color: '#065f46' }} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1c1917', marginBottom: '0.75rem' }} suppressHydrationWarning>{t('landing.features.quality.title')}</h3>
              <p style={{ color: '#78716c', lineHeight: 1.7 }} suppressHydrationWarning>{t('landing.features.quality.desc')}</p>
            </div>

            {/* Feature Card 3 */}
            <div className="animate-fadeInUp delay-3" style={{
              position: 'relative', padding: '2.5rem', borderRadius: '20px',
              background: 'rgba(255,254,245,0.85)', backdropFilter: 'blur(10px)',
              border: '1px solid rgba(231,229,228,0.5)',
              boxShadow: '0 4px 20px rgba(28,25,23,0.03)',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              overflow: 'hidden', cursor: 'default'
            }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 20px 50px rgba(6,95,70,0.1)';
                e.currentTarget.style.borderColor = 'rgba(6,95,70,0.2)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(28,25,23,0.03)';
                e.currentTarget.style.borderColor = 'rgba(231,229,228,0.5)';
              }}
            >
              <div style={{
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(251,191,36,0.06), transparent)',
                animation: 'shimmer 4s linear infinite 2s', pointerEvents: 'none'
              }} />
              <div style={{
                width: '56px', height: '56px', borderRadius: '16px',
                background: 'linear-gradient(135deg, #fef3c7, #fde68a)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '1.5rem'
              }}>
                <TrendingUp style={{ width: 28, height: 28, color: '#d97706' }} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1c1917', marginBottom: '0.75rem' }} suppressHydrationWarning>{t('landing.features.fair.title')}</h3>
              <p style={{ color: '#78716c', lineHeight: 1.7 }} suppressHydrationWarning>{t('landing.features.fair.desc')}</p>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        background: 'rgba(255,254,245,0.8)', backdropFilter: 'blur(10px)',
        borderTop: '1px solid rgba(231,229,228,0.5)', padding: '3rem 0'
      }}>
        <div className="max-w-7xl mx-auto px-6" style={{
          display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between',
          alignItems: 'center', gap: '1.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.5rem' }}>🌾</span>
            <span style={{ fontWeight: 700, color: '#1c1917' }} suppressHydrationWarning>{t('app.name')}</span>
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.875rem' }}>
            <Link href="/admin/login" style={{ color: '#78716c', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }} suppressHydrationWarning>{t('dashboard.adminConsole')}</Link>
            <Link href="/profile" style={{ color: '#78716c', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }} suppressHydrationWarning>{t('nav.profile')}</Link>
            <Link href="/market" style={{ color: '#78716c', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }} suppressHydrationWarning>{t('nav.market')}</Link>
          </div>
          <div style={{ fontSize: '0.875rem', color: '#a8a29e' }} suppressHydrationWarning>
            © 2026 {t('app.name')}
          </div>
        </div>
      </footer>
    </div>
  );
}
