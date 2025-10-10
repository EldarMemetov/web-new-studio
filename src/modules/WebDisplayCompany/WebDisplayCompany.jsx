import Container from '@/shared/container/Container';
import s from './WebDisplayCompany.module.scss';
import Image from 'next/image';
import Particles from '@/shared/components/Particles/Particles';
import { initServerI18n } from '@/i18n/utils/serverI18n';

export default async function WebDisplayCompany({ locale }) {
  const { t } = await initServerI18n(locale, ['webDisplayCompany']);

  return (
    <section className={s.factsSection}>
      <Particles className={s.particles} />
      <Container>
        <div className={s.rays}>
          <span className={s.ray}></span>
          <span className={s.ray}></span>
          <span className={s.ray}></span>
        </div>
        <h2 className={s.title}>QVRIX</h2>

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
              <h3 className={s.number}>{t('imageLabel')}</h3>
              <p className={s.info}>{t('imageInfo')}</p>
            </li>
            <li className={s.item}>
              <h3 className={s.number}>{t('techLabel')}</h3>
              <p className={s.info}>{t('techInfo')}</p>
            </li>
            <li className={s.item}>
              <h3 className={s.number}>{t('brandLabel')}</h3>
              <p className={s.info}>{t('brandInfo')}</p>
            </li>
          </ul>
        </div>
      </Container>
    </section>
  );
}
