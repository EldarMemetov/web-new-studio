import Container from '@/shared/container/Container';
import ScrollButton from '@/shared/ScrollButton/ScrollButton';
import s from './HeroBlog.module.scss';
import { initServerI18n } from '@/i18n/utils/serverI18n';
export default async function HeroBlog({ locale }) {
  const { t } = await initServerI18n(locale, ['heroBlog']);
  return (
    <section className={s.section}>
      <div className={s.background}></div>
      <Container>
        <div className={s.contentContainer}>
          <h1 className={s.title}>{t('heroBlog.title')}</h1>
          <p className={s.description}>{t('heroBlog.description')}</p>
          <div className={s.containerButton}>
            <ScrollButton targetId="feedback-form" variant="variant2">
              {t('heroBlog.buttons.talk')}
            </ScrollButton>
            <ScrollButton targetId="blog" variant="variant3">
              {t('heroBlog.buttons.read')}
            </ScrollButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
