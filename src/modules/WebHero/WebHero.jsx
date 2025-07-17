import AnimationInitializer from '@/shared/AnimationInitializer/AnimationInitializer';
import s from './WebHero.module.scss';
import Container from '@/shared/container/Container';
import { initServerI18n } from '@/i18n/utils/serverI18n';
import ScrollButton from '@/shared/ScrollButton/ScrollButton';
export default async function WebHero({ locale }) {
  const { t } = await initServerI18n(locale, ['webHero']);

  return (
    <section className={s.section}>
      <div className={s.background}></div>
      <Container>
        <AnimationInitializer
          options={{
            duration: 800,
            easing: 'ease-in-out-bounce',
            offset: 20,
          }}
        />
        <div className={s.wrapper}>
          <div className={s.overlayText}>
            <div className={s.containerText}>
              <h1 className={s.title} data-aos="fade-up">
                {t('title')}
              </h1>
              <p
                className={s.description}
                data-aos="fade-up"
                data-aos-delay="500"
              >
                {t('description')}

                <span className={s.descriptionNext}>
                  {' '}
                  {t('descriptionNext')}
                </span>
              </p>

              <div className={s.containerButton}>
                <ScrollButton targetId="feedback-form" variant="variant2">
                  {t('contactButton')}
                </ScrollButton>

                <ScrollButton targetId="effective-web" variant="variant3">
                  {t('servicesButton')}
                </ScrollButton>
              </div>
            </div>
          </div>
        </div>
        <div className={s.containerImage}></div>
      </Container>
    </section>
  );
}
