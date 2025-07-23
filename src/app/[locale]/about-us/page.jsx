import BrandTransformation from '@/modules/BrandTransformation/BrandTransformation';
import HeroAbout from '@/modules/HeroAbout/HeroAbout';
import WebWhyChoose from '@/modules/WebWhyChoose/WebWhyChoose';
import s from './about-us.module.scss';
import AboutFactsSection from '@/modules/AboutFactsSection/AboutFactsSection';
import dynamic from 'next/dynamic';
import ToggleQuestions from '@/modules/ToggleQuestions/ToggleQuestions';
import AboutSection from '@/modules/AboutSection/AboutSection';
const FeedbackForm = dynamic(
  () => import('@/modules/FeedbackForm/FeedbackForm')
);
export default async function AboutUs({ params: rawParams }) {
  const params = await rawParams;
  const availableLocales = ['en', 'ua', 'de'];
  const locale = availableLocales.includes(params?.locale)
    ? params.locale
    : 'en';

  return (
    <div className={s.container}>
      <HeroAbout locale={locale} />
      <AboutSection locale={locale} />
      <AboutFactsSection locale={locale} />
      <BrandTransformation
        locale={locale}
        namespace="aboutBrandTransformation"
      />
      <WebWhyChoose locale={locale} namespace="aboutWhyChoose" />
      <ToggleQuestions />
      <FeedbackForm />
    </div>
  );
}
