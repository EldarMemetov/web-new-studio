import Container from '@/shared/container/Container';
import s from './Hero.module.scss';
import ScrollButton from '@/shared/ScrollButton/ScrollButton';
import { initServerI18n } from '@/i18n/utils/serverI18n';

export default async function Hero({ locale }) {
  const { t } = await initServerI18n(locale, ['hero']);

  return (
    <section className={s.section}>
      <div className={s.cinemaWrapper}>
        <div className={s.bgImage}>
          <video
            className={s.bgVideo}
            src="/video/show.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
        </div>

        <div className={s.bgOverlay} />
        <div className={s.grain} />
        <div className={s.scanlines} />
        <div className={s.vignette} />

        <div className={s.frameCornerTL} />
        <div className={s.frameCornerTR} />
        <div className={s.frameCornerBL} />
        <div className={s.frameCornerBR} />

        <div className={s.topBar}>
          <div className={s.timecode}>{t('heroVideo.timecode')}</div>
          <div className={s.rec}>
            <span className={s.recDot} />
            <span className={s.recText}>{t('heroVideo.rec')}</span>
          </div>
          <div className={s.studioLabel}>{t('heroVideo.studioLabel')}</div>
        </div>

        <Container>
          <div className={s.content}>
            <div className={s.genre}>
              <span className={s.genreDot} />
              {t('heroVideo.genre')}
              <span className={s.genreLine} />
            </div>

            <h1 className={s.title}>{t('heroVideo.title')}</h1>
            <p className={s.description}>{t('heroVideo.description')}</p>

            <div className={s.containerButton}>
              <ScrollButton targetId="feedback-form" variant="variant2">
                {t('heroVideo.buttons.talk')}
              </ScrollButton>
              <ScrollButton targetId="video" variant="variant3">
                {t('heroVideo.buttons.services')}
              </ScrollButton>
            </div>
          </div>
        </Container>

        <div className={s.metaBar}>
          <span>{locale === 'de' ? 'DE' : 'EN'}</span>
          <span className={s.metaDot}>·</span>
          <span>{t('heroVideo.metaYear')}</span>
          <span className={s.metaDot}>·</span>
          <span className={s.metaHide}>{t('heroVideo.metaCity')}</span>
          <span className={`${s.metaDot} ${s.metaHide}`}>·</span>
          <span>{t('heroVideo.metaFormat')}</span>
          <span className={s.metaDot}>·</span>
          <span>{t('heroVideo.metaColour')}</span>
        </div>
      </div>
    </section>
  );
}
