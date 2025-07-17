import Container from '@/shared/container/Container';
import s from './HeroSection.module.scss';
import Icon from '@/shared/Icon/Icon';
import Link from 'next/link';

import { initServerI18n } from '@/i18n/utils/serverI18n';
import ScrollButton from '@/shared/ScrollButton/ScrollButton';
export default async function HeroSection({ locale }) {
  const { t } = await initServerI18n(locale, ['heroSection']);

  return (
    <section className={s.section}>
      <Container>
        <div className={s.containerContent}>
          <div className={s.containerIcon}>
            <span className={s.span}>{t('subtitle')}</span>
            <span className={s.spanMobile}>{t('subtitleMobile')}</span>
            <Link href="/#portfolio" passHref>
              <button className={s.button} type="button">
                <Icon iconName="icon-arrow" className={s.icon} />
              </button>
            </Link>
          </div>
          <h1 className={s.title}>{t('title')}</h1>
          <p className={s.description}>{t('description')}</p>

          <div className={s.buttonContainer}>
            <ScrollButton targetId="feedback-form" variant="variant3">
              {t('button')}
            </ScrollButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
