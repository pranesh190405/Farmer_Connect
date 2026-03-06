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

      {/* Hero Section with Video Background */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>

        {/* Background Video */}
        <video
          autoPlay muted loop playsInline
          suppressHydrationWarning
          style={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
            objectFit: 'cover', zIndex: 1
          }}
        >
          <source src="/hero_page.mp4" type="video/mp4" />
        </video>

        {/* Dark overlay for readability */}
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          background: 'linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.65) 100%)',
          zIndex: 2
        }} />

        <div className="max-w-7xl mx-auto px-6 relative" style={{ zIndex: 10, textAlign: 'center' }}>

          {/* Badge */}
          <div className="animate-fadeInDown" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)',
            padding: '0.5rem 1.25rem', borderRadius: '9999px',
            border: '1px solid rgba(255,255,255,0.2)', marginBottom: '2rem'
          }}>
            <span style={{ width: '8px', height: '8px', background: '#fbbf24', borderRadius: '50%', animation: 'pulseGlow 2s ease-in-out infinite', boxShadow: '0 0 8px rgba(251,191,36,0.6)' }} />
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'white' }} suppressHydrationWarning>{t('landing.hero.badge')}</span>
          </div>

          {/* Title */}
          <h1 className="animate-fadeInUp delay-1" style={{
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 800,
            color: 'white', letterSpacing: '-0.02em', lineHeight: 1.1,
            marginBottom: '1.5rem', textShadow: '0 2px 20px rgba(0,0,0,0.3)'
          }} suppressHydrationWarning>
            {t('landing.hero.titlePrefix')} <br className="hidden md:block" />
            <span style={{
              background: 'linear-gradient(135deg, #34d399, #fbbf24)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }} suppressHydrationWarning>
              {t('landing.hero.titleHighlight')}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="animate-fadeInUp delay-2" style={{
            fontSize: '1.25rem', color: 'rgba(255,255,255,0.85)', marginBottom: '3rem',
            maxWidth: '42rem', marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.6,
            textShadow: '0 1px 10px rgba(0,0,0,0.2)'
          }} suppressHydrationWarning>
            {t('app.tagline')}
          </p>

          {/* Single Get Started Button */}
          <div className="animate-fadeInUp delay-3">
            <Link href="/login" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.75rem',
              background: 'linear-gradient(135deg, #065f46, #10b981, #065f46)',
              backgroundSize: '200% 200%', animation: 'gradientShift 3s ease infinite',
              color: 'white', padding: '1.125rem 3rem', borderRadius: '14px',
              fontWeight: 700, fontSize: '1.25rem', textDecoration: 'none',
              boxShadow: '0 8px 40px rgba(6,95,70,0.4)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }} suppressHydrationWarning>
              Get Started
              <ArrowRight style={{ width: 22, height: 22 }} />
            </Link>
          </div>

          <div className="mt-8 animate-fade-in-up delay-[400ms]">
            <p className="text-gray-600 font-medium" suppressHydrationWarning>
              {t('auth.login.alreadyHaveAccount') || 'Already have an account?'} {' '}
              <Link href="/login" className="text-green-600 font-bold hover:underline hover:text-green-700 transition-colors inline-flex items-center gap-1" suppressHydrationWarning>
                {t('auth.login.loginButton') || 'Log In'}
                <ArrowRight className="w-4 h-4" />
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
