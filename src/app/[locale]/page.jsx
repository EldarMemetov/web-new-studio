import ToggleQuestions from '@/modules/ToggleQuestions/ToggleQuestions';
import s from './page.module.scss';
import Footer from '@/modules/Footer/Footer';

import Hero from '@/modules/Hero/Hero';
import Stats from '@/modules/Stats/Stats';
import Works from '@/modules/Works/Works';
import AboutMe from '@/modules/AboutMe/AboutMe';
import WhyMe from '@/modules/WhyMe/WhyMe';
import FeedbackForm from '@/modules/FeedbackForm/FeedbackForm';
import VideoEffectiveSolutions from '@/modules/VideoEffectiveSolutions/VideoEffectiveSolutions';
import WorkSteps from '@/modules/WorkSteps/WorkSteps';

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
      <Works locale={locale} />
      <AboutMe locale={locale} />
      <VideoEffectiveSolutions locale={locale} />
      <WhyMe locale={locale} />
      <WorkSteps locale={locale} />
      <ToggleQuestions locale={locale} />
      <FeedbackForm />
      <Footer />
    </div>
  );
}
