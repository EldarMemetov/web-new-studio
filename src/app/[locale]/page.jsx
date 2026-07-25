import ToggleQuestions from '@/modules/ToggleQuestions/ToggleQuestions';
import s from './page.module.scss';
import Footer from '@/modules/Footer/Footer';

import Hero from '@/modules/Hero/Hero';
import Stats from '@/modules/Stats/Stats';
import AboutMe from '@/modules/AboutMe/AboutMe';
import WhyMe from '@/modules/WhyMe/WhyMe';
import FeedbackForm from '@/modules/FeedbackForm/FeedbackForm';
import VideoEffectiveSolutions from '@/modules/VideoEffectiveSolutions/VideoEffectiveSolutions';
import WorkSteps from '@/modules/WorkSteps/WorkSteps';
import Services from '@/modules/Services/Services';

export default async function Home({ params: rawParams }) {
  const params = await rawParams;
  const availableLocales = ['en', 'de'];
  const locale = availableLocales.includes(params?.locale)
    ? params.locale
    : 'en';

  return (
    <div className={s.container}>
      <Hero locale={locale} />
      <Stats locale={locale} />
      <VideoEffectiveSolutions locale={locale} />
      <AboutMe locale={locale} />
      <Services locale={locale} />
      <WhyMe locale={locale} />
      <WorkSteps locale={locale} />
      <ToggleQuestions locale={locale} />
      <FeedbackForm />
      <Footer />
    </div>
  );
}
