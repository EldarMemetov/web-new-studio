import '../globals.scss';
import initTranslations from '@/i18n/utils/i18n';
import TranslationsProvider from '@/i18n/utils/TranslationsProvider';
import ErrorBoundaryWithTranslation from '@/shared/components/ErrorBoundary/ErrorBoundaryWithTranslation/ErrorBoundaryWithTranslation';
import Header from '@/modules/Header/Header';
import { NAMESPACES } from '@/shared/constants';
import i18nConfig from '../../../i18nConfig';
import { dir } from 'i18next';
import SvgSpriteLoader from '@/shared/constants/SvgSpriteLoader/SvgSpriteLoader';
import CookieNotice from '@/modules/CookieNotice/CookieNotice';
import { Manrope, Inter } from 'next/font/google';
import clsx from 'clsx';

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-manrope',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '600'],
  display: 'swap',
  variable: '--font-inter',
});

const metadataDict = {
  en: {
    title: 'QVRIX — Web Development & Video Production',
    description:
      'QVRIX is your personal digital project for web development and video production. I create modern websites and professional videos to grow your business.',
  },
  de: {
    title: 'QVRIX — Webentwicklung & Videoproduktion',
    description:
      'QVRIX ist Ihr persönliches Digitalprojekt für Webentwicklung und Videoproduktion. Ich erstelle moderne Websites und professionelle Videos für Ihr Unternehmen.',
  },
};

export async function generateMetadata({ params }) {
  const { locale } = await Promise.resolve(params);
  const meta = metadataDict[locale] || metadataDict.en;

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `https://qvrix.com/${locale}`,
      languages: {
        de: 'https://qvrix.com/de',
        en: 'https://qvrix.com/en',
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `https://qvrix.com/${locale}`,
      siteName: 'QVRIX',
      locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
    },
    icons: {
      icon: '/favicon.ico',
    },
  };
}

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}

export default async function Layout({ children, params }) {
  const awaitedParams = await Promise.resolve(params);
  const { locale } = awaitedParams;
  const langMap = { en: 'en', de: 'de' };
  const htmlLang = langMap[locale] || 'de';
  const { resources } = await initTranslations(locale, NAMESPACES);

  return (
    <html lang={htmlLang} dir={dir(locale)}>
      <body
        suppressHydrationWarning={true}
        className={clsx(manrope.variable, inter.variable)}
      >
        <SvgSpriteLoader />
        <TranslationsProvider
          namespaces={NAMESPACES}
          locale={locale}
          resources={resources}
        >
          <ErrorBoundaryWithTranslation>
            <Header />

            <main>{children}</main>
            <CookieNotice />
          </ErrorBoundaryWithTranslation>
        </TranslationsProvider>
      </body>
    </html>
  );
}
