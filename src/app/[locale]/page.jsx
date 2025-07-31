import dynamic from 'next/dynamic';
import { ReviewsSection } from '@/modules/GetReview/Components/ReviewsSection/ReviewsSection';
import { GetReviews } from '@/services/api';
import FetchServices from '@/modules/FetchServices/FetchServices';
import GetBusinessSolutions from '@/modules/GetBusinessSolutions/GetBusinessSolutions';
import BrandTransformation from '@/modules/BrandTransformation/BrandTransformation';
import ToggleQuestions from '@/modules/ToggleQuestions/ToggleQuestions';
import DisplayCompanyFacts from '@/modules/DisplayCompanyFacts/DisplayCompanyFacts';
import FeedbackWrapper from '@/shared/FeedbackWrapper/FeedbackWrapper';
import HeroSection from '@/modules/HeroSection/HeroSection';
import s from './page.module.scss';

import { initServerI18n } from '@/i18n/utils/serverI18n';

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

  const { t } = await initServerI18n(locale, ['heroSection']);

  const reviews = await GetReviews();

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
      <DisplayCompanyFacts locale={locale} />
      <FetchServices />
      <GetBusinessSolutions locale={locale} />
      <IdeasHome locale={locale} />
      <BrandTransformation locale={locale} />
      <Portfolio locale={locale} />
      <ReviewsSection initialReviews={reviews}>
        <ReviewsList />
      </ReviewsSection>
      <ToggleQuestions locale={locale} />
      <FeedbackWrapper />
    </div>
  );
}
