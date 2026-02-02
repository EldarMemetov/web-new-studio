import BrandTransformation from '@/modules/BrandTransformation/BrandTransformation';
import HeroAbout from '@/modules/HeroAbout/HeroAbout';
import WebWhyChoose from '@/modules/WebWhyChoose/WebWhyChoose';
import s from './about-us.module.scss';
import AboutFactsSection from '@/modules/AboutFactsSection/AboutFactsSection';

import ToggleQuestions from '@/modules/ToggleQuestions/ToggleQuestions';
import AboutSection from '@/modules/AboutSection/AboutSection';
import FeedbackWrapper from '@/shared/FeedbackWrapper/FeedbackWrapper';
import Footer from '@/modules/Footer/Footer';
// import OurTeam from '@/modules/OurTeam/OurTeam';
export default async function AboutUs({ params: rawParams }) {
  const params = await rawParams;
  const availableLocales = ['en', 'ua', 'de'];
  const locale = availableLocales.includes(params?.locale)
    ? params.locale
    : 'en';

  return (
    <div className={s.container}>
      <HeroAbout locale={locale} />
      {/* <OurTeam locale={locale} /> */}
      <AboutSection locale={locale} />
      <AboutFactsSection locale={locale} />
      <BrandTransformation
        locale={locale}
        namespace="aboutBrandTransformation"
      />
      <WebWhyChoose locale={locale} namespace="aboutWhyChoose" />
      <ToggleQuestions />
      <FeedbackWrapper />

      <Footer />
    </div>
  );
}
