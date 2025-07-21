import Container from '@/shared/container/Container';
import AnimatedCounter from '@/shared/components/AnimatedCounter/AnimatedCounter';
import s from './DisplayCompanyFacts.module.scss';
import Image from 'next/image';
import Particles from '@/shared/components/Particles/Particles';
import { initServerI18n } from '@/i18n/utils/serverI18n';

export default async function DisplayCompanyFacts({ locale }) {
  const { t } = await initServerI18n(locale, ['companyFacts']);
  return (
    <section className={s.factsSection}>
      <Particles className={s.particles} />
      <Container>
        <div className={s.rays}>
          <span className={s.ray}></span>
          <span className={s.ray}></span>
          <span className={s.ray}></span>
        </div>
        <h2 className={s.title}>DevMyst</h2>

        <div className={s.factsWrapper}>
          <Image
            id="magic-planet"
            src="/image/planet.png"
            alt="planet"
            width={1150}
            height={226}
            className={`${s.image} magic-planet`}
            priority
          />
          <div className={s.mobileImage}>
            <Image
              id="magic-planet"
              src="/image/planet.png"
              alt="planet"
              width={412}
              height={83}
              className={`${s.imageL} magic-planet`}
              priority
            />

            <ul className={s.factsList}>
              <li className={s.item}>
                <h3 className={s.number}>
                  <AnimatedCounter targetNumber={8} duration={1000} />+
                </h3>
                <p className={s.info}>{t('experience')}</p>
              </li>
              <li className={s.item}>
                <h3 className={s.number}>
                  <AnimatedCounter targetNumber={100} duration={1500} />+
                </h3>
                <p className={s.info}>{t('projects')}</p>
              </li>
              <li className={s.item}>
                <h3 className={s.number}>
                  <AnimatedCounter targetNumber={92} duration={1800} />%
                </h3>
                <p className={s.info}>{t('recommend')}</p>
              </li>
            </ul>

            <Image
              id="magic-planet"
              src="/image/planet.png"
              alt="planet"
              width={412}
              height={83}
              className={`${s.imageR} magic-planet`}
              priority
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
