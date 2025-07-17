import Container from '@/shared/container/Container';
import s from './VideoEffectiveSolutions.module.scss';
import { initServerI18n } from '@/i18n/utils/serverI18n';
import VideoEffectiveList from './VideoEffectiveList/VideoEffectiveList';
export default async function VideoEffectiveSolutions({ locale }) {
  const { t } = await initServerI18n(locale, ['videoEffectiveSolutions']);
  const solutions = t('solutions', { returnObjects: true }) || [];
  return (
    <section className={s.section} id="effective-video">
      <Container>
        <div className={s.containerContent}>
          <h2 className={s.title}>
            <span className={s.spanTitle}>{t('spanTitle')}</span>
            {t('title')}
          </h2>
          <p className={s.description}>{t('description')}</p>
          <VideoEffectiveList items={solutions} />
        </div>
      </Container>
    </section>
  );
}
