import Footer from '@/modules/Footer/Footer';
import Impressum from '@/modules/Impressum/Impressum';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const title = locale === 'de' ? 'Impressum — QVRIX' : 'Legal Notice — QVRIX';

  return {
    title,
    alternates: {
      canonical: `https://qvrix.com/${locale}/impressum`,
      languages: {
        de: 'https://qvrix.com/de/impressum',
        en: 'https://qvrix.com/en/impressum',
      },
    },
    openGraph: {
      title,
      url: `https://qvrix.com/${locale}/impressum`,
    },
  };
}

export default async function ImpressumPage({ params: rawParams }) {
  const params = await rawParams;
  const availableLocales = ['en', 'de'];
  const locale = availableLocales.includes(params?.locale)
    ? params.locale
    : 'en';

  return (
    <div>
      <Impressum locale={locale} />
      <Footer />
    </div>
  );
}
