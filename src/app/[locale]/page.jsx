import dynamic from 'next/dynamic';

import { ReviewsSection } from '@/modules/GetReview/Components/ReviewsSection/ReviewsSection';
import { GetReviews } from '@/services/api';

import TextAnimation from '@/modules/TextAnimation/TextAnimation';
import FetchServices from '@/modules/FetchServices/FetchServices';

import GetBusinessSolutions from '@/modules/GetBusinessSolutions/GetBusinessSolutions';
import BrandTransformation from '@/modules/BrandTransformation/BrandTransformation';
import ToggleQuestions from '@/modules/ToggleQuestions/ToggleQuestions';
import s from './page.module.scss';

import HeroSection from '@/modules/HeroSection/HeroSection';
import DisplayCompanyFacts from '@/modules/DisplayCompanyFacts/DisplayCompanyFacts';
import FeedbackWrapper from '@/shared/FeedbackWrapper/FeedbackWrapper';
const ReviewsList = dynamic(
  () => import('@/modules/GetReview/Components/ReviewsList/ReviewsList')
);
const Portfolio = dynamic(() => import('@/modules/Portfolio/Portfolio'));
const IdeasHome = dynamic(() => import('@/modules/IdeasHome/IdeasHome'));
export default async function Home({ params: rawParams }) {
  const params = await rawParams;
  const availableLocales = ['en', 'ua', 'de'];
  const locale = availableLocales.includes(params?.locale)
    ? params.locale
    : 'en';
  const reviews = await GetReviews();

  return (
    <div className={s.container}>
      <HeroSection locale={locale} />
      <DisplayCompanyFacts locale={locale} />
      <FetchServices />
      <GetBusinessSolutions locale={locale} />
      <IdeasHome locale={locale} />
      <BrandTransformation locale={locale} />
      <TextAnimation locale={locale} />
      <Portfolio locale={locale} />
      <ReviewsSection initialReviews={reviews}>
        <ReviewsList />
      </ReviewsSection>
      <ToggleQuestions locale={locale} />
      <FeedbackWrapper />
    </div>
  );
}
