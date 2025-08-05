import HeroVideo from '@/modules/HeroVideo/HeroVideo';
import s from './videography.module.scss';
import ToggleQuestions from '@/modules/ToggleQuestions/ToggleQuestions';
import VideoPortfolio from '@/modules/VideoPortfolio/VideoPortfolio';
import WebWhyChoose from '@/modules/WebWhyChoose/WebWhyChoose';
import VideoEffectiveSolutions from '@/modules/VideoEffectiveSolutions/VideoEffectiveSolutions';
import FeedbackWrapper from '@/shared/FeedbackWrapper/FeedbackWrapper';
import Footer from '@/modules/Footer/Footer';

export default async function Videography({ params: rawParams }) {
  const params = await rawParams;
  const availableLocales = ['en', 'ua', 'de'];
  const locale = availableLocales.includes(params?.locale)
    ? params.locale
    : 'en';

  return (
    <div className={s.container}>
      <HeroVideo locale={locale} />
      <VideoEffectiveSolutions locale={locale} />
      <VideoPortfolio />
      <WebWhyChoose locale={locale} namespace="videoWhyChoose" />
      <ToggleQuestions locale={locale} namespace="videoFaq" />
      <FeedbackWrapper />
      <Footer />
    </div>
  );
}
