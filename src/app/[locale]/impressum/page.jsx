import Footer from '@/modules/Footer/Footer';
import Impressum from '@/modules/Impressum/Impressum';

export default async function ImpressumPage({ params: rawParams }) {
  const params = await rawParams;
  const availableLocales = ['en', 'ua', 'de'];
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
