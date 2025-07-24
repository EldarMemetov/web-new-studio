import Container from '@/shared/container/Container';
import s from './HeroVideo.module.scss';
import ScrollButton from '@/shared/ScrollButton/ScrollButton';
import { initServerI18n } from '@/i18n/utils/serverI18n';

export default async function HeroVideo({ locale }) {
  const { t } = await initServerI18n(locale, ['heroVideo']);

  return (
    <section className={s.section}>
      <Container>
        <div className={s.containerVideoAndText}>
          <div className={s.videoWrapper}>
            <video
              className={s.video}
              src="/video/show.mp4"
              autoPlay
              loop
              muted
              playsInline
            />
            <div className={s.content}>
              <div>
                <h1 className={s.title}>{t('heroVideo.title')}</h1>
                <p className={s.description}>{t('heroVideo.description')}</p>
              </div>
              <div className={s.containerButton}>
                <ScrollButton targetId="feedback-form" variant="variant2">
                  {t('heroVideo.buttons.talk')}
                </ScrollButton>
                <ScrollButton targetId="ideas-home" variant="variant3">
                  {t('heroVideo.buttons.services')}
                </ScrollButton>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
