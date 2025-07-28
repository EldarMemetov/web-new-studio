import Container from '@/shared/container/Container';
import AnimatedCounter from '@/shared/components/AnimatedCounter/AnimatedCounter';
import s from './WebDisplayCompany.module.scss';
import Image from 'next/image';
import Particles from '@/shared/components/Particles/Particles';
import { initServerI18n } from '@/i18n/utils/serverI18n';

export default async function WebDisplayCompany({ locale }) {
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
            src="/image/web.png"
            alt="web"
            width={1150}
            height={226}
            className={`${s.image} magic-planet`}
            priority
          />

          <ul className={s.factsList}>
            <li className={s.item}>
              <h3 className={s.number}>Імідж</h3>
              <p className={s.info}>що викликає довіру</p>
            </li>
            <li className={s.item}>
              <h3 className={s.number}>Технології</h3>
              <p className={s.info}>що працюють швидко</p>
            </li>
            <li className={s.item}>
              <h3 className={s.number}>Бренд</h3>
              <p className={s.info}>що впізнають</p>
            </li>
          </ul>
        </div>
      </Container>
    </section>
  );
}
