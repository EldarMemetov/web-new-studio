import dynamic from 'next/dynamic';
import s from './webDevelopment.module.scss';
import ToggleQuestions from '@/modules/ToggleQuestions/ToggleQuestions';
import { initServerI18n } from '@/i18n/utils/serverI18n';
import WebWhyChoose from '@/modules/WebWhyChoose/WebWhyChoose';
import WebPortfolio from '@/modules/WebPortfolio/WebPortfolio';
import OrDevelopment from '@/modules/OrDevelopment/OrDevelopment';
import FeedbackWrapper from '@/shared/FeedbackWrapper/FeedbackWrapper';
import HeroSection from '@/modules/HeroSection/HeroSection';
import WebDisplayCompany from '@/modules/WebDisplayCompany/WebDisplayCompany';
const EffectiveSolutions = dynamic(
  () => import('@/modules/EffectiveSolutions/EffectiveSolutions')
);

export default async function WebDevelopment({ params: rawParams }) {
  const params = await rawParams;
  const availableLocales = ['en', 'ua', 'de'];
  const locale = availableLocales.includes(params?.locale)
    ? params.locale
    : 'en';
  const { t } = await initServerI18n(locale, ['webHero']);
  return (
    <div className={s.container}>
      <HeroSection
        title={t('title')}
        description={t('description')}
        subtitle={t('subtitle')}
        subtitleMobile={t('subtitleMobile')}
        linkPortfolio={t('linkPortfolio')}
        goToPortfolio={t('goToPortfolio') || 'Go to portfolio'}
        buttonText={t('button')}
      />
      <WebDisplayCompany locale={locale} />
      <EffectiveSolutions locale={locale} />
      <WebPortfolio locale={locale} />
      <WebWhyChoose locale={locale} />
      <OrDevelopment locale={locale} />
      <ToggleQuestions locale={locale} namespace="toggleQuestionsWebDev" />
      <FeedbackWrapper />
    </div>
  );
}
