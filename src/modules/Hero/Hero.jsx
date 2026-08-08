import Container from '@/shared/container/Container';
import s from './Hero.module.scss';
import ScrollButton from '@/shared/ScrollButton/ScrollButton';
import LiveTimecode from './LiveTimecode';
import { initServerI18n } from '@/i18n/utils/serverI18n';
import { FiPlay, FiArrowRight } from 'react-icons/fi';

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

const HERO_VIDEO = `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/f_auto:video,q_auto,w_1920/show_gpmgzx.mp4`;
const HERO_POSTER = `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/so_0,f_auto,q_auto,w_1600,c_fill/show_gpmgzx.jpg`;

export default async function Hero({ locale }) {
  const { t } = await initServerI18n(locale, ['hero']);

  return (
    <section className={s.section}>
      <div className={s.cinemaWrapper}>
        <div className={s.bgImage}>
          <video
            className={s.bgVideo}
            src={HERO_VIDEO}
            poster={HERO_POSTER}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            fetchPriority="high"
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
          <LiveTimecode initialSeconds={1} />
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
              <span className={s.ctaWrap}>
                <ScrollButton targetId="works" variant="variant2">
                  <span className={s.buttonContent}>
                    <FiPlay className={s.buttonIcon} aria-hidden="true" />
                    {t('heroVideo.buttons.talk')}
                  </span>
                </ScrollButton>
              </span>
              <span className={s.ctaWrap}>
                <ScrollButton targetId="feedback-form" variant="variant3">
                  <span className={s.buttonContent}>
                    {t('heroVideo.buttons.services')}
                    <FiArrowRight className={s.buttonIcon} aria-hidden="true" />
                  </span>
                </ScrollButton>
              </span>
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
