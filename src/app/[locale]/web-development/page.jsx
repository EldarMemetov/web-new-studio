import dynamic from 'next/dynamic';
import s from './webDevelopment.module.scss';
import ToggleQuestions from '@/modules/ToggleQuestions/ToggleQuestions';

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

  return (
    <div className={s.container}>
      <HeroSection locale={locale} namespace="webHero" />
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
