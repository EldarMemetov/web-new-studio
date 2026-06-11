import dynamic from 'next/dynamic';

import FetchServices from '@/modules/FetchServices/FetchServices';

import GetBusinessSolutions from '@/modules/GetBusinessSolutions/GetBusinessSolutions';
import BrandTransformation from '@/modules/BrandTransformation/BrandTransformation';
import ToggleQuestions from '@/modules/ToggleQuestions/ToggleQuestions';
import s from './page.module.scss';
import Footer from '@/modules/Footer/Footer';
import HeroSection from '@/modules/HeroSection/HeroSection';
import DisplayCompanyFacts from '@/modules/DisplayCompanyFacts/DisplayCompanyFacts';
import FeedbackWrapper from '@/shared/FeedbackWrapper/FeedbackWrapper';

const Portfolio = dynamic(() => import('@/modules/Portfolio/Portfolio'));
const IdeasHome = dynamic(() => import('@/modules/IdeasHome/IdeasHome'));
export default async function Home({ params: rawParams }) {
  const params = await rawParams;
  const availableLocales = ['en', 'ua', 'de'];
  const locale = availableLocales.includes(params?.locale)
    ? params.locale
    : 'en';

  return (
    <div className={s.container}>
      <HeroSection locale={locale} />
      <DisplayCompanyFacts locale={locale} />
      <FetchServices />
      <IdeasHome locale={locale} />
      <Portfolio locale={locale} />
      <GetBusinessSolutions locale={locale} />
      <BrandTransformation locale={locale} />
      <ToggleQuestions locale={locale} />
      <FeedbackWrapper />
      <Footer />
    </div>
  );
}
