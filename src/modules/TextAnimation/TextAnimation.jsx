import s from './TextAnimation.module.scss';
import Container from '@/shared/container/Container';
import AnimationInitializer from '@/shared/AnimationInitializer/AnimationInitializer';
import { initServerI18n } from '@/i18n/utils/serverI18n';
export default async function TextAnimation({ locale }) {
  const { t } = await initServerI18n(locale, ['textAnimation']);

  <AnimationInitializer
    options={{
      duration: 1500,
      easing: 'ease-in-out-bounce',
      offset: 20,
    }}
  />;
  return (
    <section className={s.textAnimation}>
      <Container>
        <div>
          <div>
            <h2
              className={s.textInterested}
              data-aos="zoom-in-up"
              data-aos-delay="300"
            >
              {t('interested')}
            </h2>
          </div>
          <div>
            <h2 className={s.textGo} data-aos="zoom-in-up" data-aos-delay="500">
              {t('thenLets')}
            </h2>
          </div>
          <div
            className={s.containerWork}
            data-aos="zoom-in-up"
            data-aos-delay="700"
          >
            <h2
              className={s.textWork}
              data-aos="zoom-in-up"
              data-aos-delay="700"
            >
              {t('cooperate')}
            </h2>
          </div>
        </div>
      </Container>
    </section>
  );
}
