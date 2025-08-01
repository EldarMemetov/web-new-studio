import Container from '@/shared/container/Container';
import { initServerI18n } from '@/i18n/utils/serverI18n';
import ScrollButton from '@/shared/ScrollButton/ScrollButton';
import PortfolioItem from './PortfolioItem/PortfolioItem';
import s from './WebPortfolio.module.scss';
import Image from 'next/image';

export default async function PortfolioPage({ locale }) {
  const { t } = await initServerI18n(locale, ['webPortfolio']);
  const projects = t('projects', { returnObjects: true }) || {};

  return (
    <section className={s.section} id="portfolioSection">
      <div className={s.backgroundWrapper}>
        <Image
          src="/image/semicircles.png"
          alt="semicircles flipped background"
          fill
          priority
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
            transform: 'scaleY(-1)',
          }}
        />
      </div>

      <Container>
        <h2 className={s.title}>
          {t('title.prefix')}{' '}
          <span className={s.SpanTitle}>{t('title.span')}</span>
        </h2>

        <p className={s.descriptions}>
          {t('desc.part1')}{' '}
          <span className={s.SpanDescriptions}>{t('desc.span1')}</span>
          <span>{t('desc.span2')}</span>
        </p>

        <div className={s.portfolioContainer}>
          {Object.entries(projects).map(([id, project]) => (
            <PortfolioItem
              key={id}
              id={id}
              locale={locale}
              project={project}
              ctaLabel={t('buttons')}
            />
          ))}

          <ScrollButton variant="variant11" targetId="feedback-form">
            {t('buttonsGo')}
          </ScrollButton>
        </div>
      </Container>
    </section>
  );
}
