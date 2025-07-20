import PortfolioId from '@/modules/PortfolioId/PortfolioId';
import { initServerI18n } from '@/i18n/utils/serverI18n';
import FeedbackForm from '@/modules/FeedbackForm/FeedbackForm';
import s from './idPortfolio.module.scss';
export async function generateMetadata({ params: rawParams }) {
  const params = await rawParams;
  const availableLocales = ['en', 'ua', 'de'];
  const locale = availableLocales.includes(params?.locale)
    ? params.locale
    : 'en';
  const id = params?.id;

  const { t } = await initServerI18n(locale, ['webPortfolio']);
  const project = t('projects', { returnObjects: true });
  const projectID = project[id];
  if (!projectID) return {};

  return {
    title: projectID.title,
    description: projectID.description || '',
  };
}

export async function generateStaticParams() {
  const locales = ['en', 'ua', 'de'];
  const paths = await Promise.all(
    locales.map(async (locale) => {
      const { t } = await initServerI18n(locale, ['webPortfolio']);
      const projects = t('projects', { returnObjects: true });

      return Object.keys(projects).map((id) => ({ locale, id }));
    })
  );
  return paths.flat();
}

export default async function PortfolioItemPage({ params: rawParams }) {
  const params = await rawParams;

  const availableLocales = ['en', 'ua', 'de'];
  const locale = availableLocales.includes(params?.locale)
    ? params.locale
    : 'en';
  const id = params?.id;
  return (
    <div className={s.container}>
      <PortfolioId locale={locale} id={id} />
      <FeedbackForm />
    </div>
  );
}
