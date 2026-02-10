'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { ArrowRight, ShoppingBag, Sprout, ShieldCheck, TrendingUp } from 'lucide-react';
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
    <div className="min-h-screen flex flex-col font-sans">

      {/* Hero Section */}
      <section className="relative bg-green-50 pt-20 pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-green-100 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-yellow-100 rounded-full blur-3xl opacity-50"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm mb-8 animate-fade-in-up">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-sm font-medium text-gray-600" suppressHydrationWarning>{t('landing.hero.badge')}</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-6 animate-fade-in-up delay-100" suppressHydrationWarning>
            {t('landing.hero.titlePrefix')} <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500" suppressHydrationWarning>
              {t('landing.hero.titleHighlight')}
            </span>
          </h1>

          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto animate-fade-in-up delay-200" suppressHydrationWarning>
            {t('app.tagline')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-300">
            <Link href="/farmer/register" className="group bg-green-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-700 transition-all shadow-lg hover:shadow-green-200 flex items-center justify-center gap-2" suppressHydrationWarning>
              {t('landing.buttons.startSelling')}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/buyer/register" className="group bg-white text-gray-900 border border-gray-200 px-8 py-4 rounded-xl font-bold text-lg hover:border-green-200 hover:bg-green-50 transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2" suppressHydrationWarning>
              {t('landing.buttons.startBuying')}
              <ShoppingBag className="w-5 h-5 text-gray-400 group-hover:text-green-600 transition-colors" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="p-8 rounded-3xl bg-gray-50 border border-gray-100 hover:border-green-100 transition-colors group">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform duration-500">
                <Sprout className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3" suppressHydrationWarning>{t('landing.features.fresh.title')}</h3>
              <p className="text-gray-500 leading-relaxed" suppressHydrationWarning>{t('landing.features.fresh.desc')}</p>
            </div>
            <div className="p-8 rounded-3xl bg-gray-50 border border-gray-100 hover:border-green-100 transition-colors group">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform duration-500">
                <ShieldCheck className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3" suppressHydrationWarning>{t('landing.features.quality.title')}</h3>
              <p className="text-gray-500 leading-relaxed" suppressHydrationWarning>{t('landing.features.quality.desc')}</p>
            </div>
            <div className="p-8 rounded-3xl bg-gray-50 border border-gray-100 hover:border-green-100 transition-colors group">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform duration-500">
                <TrendingUp className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3" suppressHydrationWarning>{t('landing.features.fair.title')}</h3>
              <p className="text-gray-500 leading-relaxed" suppressHydrationWarning>{t('landing.features.fair.desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer / Quick Links */}
      <footer className="bg-white border-t py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌾</span>
            <span className="font-bold text-gray-900" suppressHydrationWarning>{t('app.name')}</span>
          </div>
          <div className="flex gap-6 text-sm text-gray-500 font-medium">
            <Link href="/admin/login" className="hover:text-green-600 transition-colors" suppressHydrationWarning>{t('dashboard.adminConsole')}</Link>
            <Link href="/profile" className="hover:text-green-600 transition-colors" suppressHydrationWarning>{t('nav.profile')}</Link>
            <Link href="/market" className="hover:text-green-600 transition-colors" suppressHydrationWarning>{t('nav.market')}</Link>
          </div>
          <div className="text-sm text-gray-400" suppressHydrationWarning>
            © 2026 {t('app.name')}
          </div>
        </div>
      </footer>
    </div>
  );
}
