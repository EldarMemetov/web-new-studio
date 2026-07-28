import Footer from '@/modules/Footer/Footer';
import PrivacyPolicy from '@/modules/PrivacyPolicy/PrivacyPolicy';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const title =
    locale === 'de' ? 'Datenschutz — QVRIX' : 'Privacy Policy — QVRIX';

  return {
    title,
    alternates: {
      canonical: `https://qvrix.com/${locale}/privacy-policy`,
      languages: {
        de: 'https://qvrix.com/de/privacy-policy',
        en: 'https://qvrix.com/en/privacy-policy',
      },
    },
    openGraph: {
      title,
      url: `https://qvrix.com/${locale}/privacy-policy`,
    },
  };
}

export default async function PrivacyPolicyPage({ params: rawParams }) {
  const params = await rawParams;
  const availableLocales = ['en', 'de'];
  const locale = availableLocales.includes(params?.locale)
    ? params.locale
    : 'en';

  return (
    <div>
      <PrivacyPolicy locale={locale} />
      <Footer />
    </div>
  );
}
