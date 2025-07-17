import Container from '@/shared/container/Container';
import ScrollButton from '@/shared/ScrollButton/ScrollButton';
import s from './HeroAbout.module.scss';
import Image from 'next/image';
import { initServerI18n } from '@/i18n/utils/serverI18n';

export default async function HeroAbout({ locale }) {
  const { t } = await initServerI18n(locale, ['heroAbout']);

  return (
    <section className={s.section}>
      <Container>
        <div className={s.containerContent}>
          <div className={s.containerHero}>
            <div>
              <h1 className={s.title}>{t('title')}</h1>
              <p className={s.description}>{t('description')}</p>
            </div>

            <div className={s.containerButton}>
              <ScrollButton targetId="feedback-form" variant="variant2">
                {t('talkButton')}
              </ScrollButton>

              <ScrollButton targetId="faq" variant="variant3">
                {t('servicesButton')}
              </ScrollButton>
            </div>
          </div>
          <div className={s.containerImage}>
            <Image
              src="/image/ball-sphere.png"
              alt="ball-sphere"
              width={500}
              height={500}
              className={s.image}
            />
            <div className={s.background}></div>
          </div>
        </div>
      </Container>
    </section>
  );
}
