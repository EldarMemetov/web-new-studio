import Image from 'next/image';
import Container from '@/shared/container/Container';
import s from './AboutMe.module.scss';
import { initServerI18n } from '@/i18n/utils/serverI18n';
import { FiMapPin } from 'react-icons/fi';

export default async function AboutMe({ locale }) {
  const { t } = await initServerI18n(locale, ['aboutMe']);
  const stats = t('stats', { returnObjects: true }) || [];
  const paragraphs = t('paragraphs', { returnObjects: true }) || [];

  return (
    <section className={s.section} id="about-me">
      <span className={s.aurora} aria-hidden="true" />
      <Container>
        <div className={s.grid}>
          {/* ФОТО */}
          <div className={s.photoWrap}>
            <span className={s.photoGlow} aria-hidden="true" />
            <div className={s.photoFrame}>
              <Image
                src="/image/eldar.jpg"
                alt={t('name')}
                width={560}
                height={700}
                className={s.photo}
                priority
              />
              <span className={s.location}>
                <FiMapPin className={s.locationIcon} />
                {t('location')}
              </span>
            </div>
          </div>

          {/* ТЕКСТ */}
          <div className={s.content}>
            <span className={s.eyebrow}>
              <span className={s.eyebrowDot} />
              {t('eyebrow')}
            </span>

            <h2 className={s.title}>
              {t('titleBefore')} <span>{t('name')}</span>
            </h2>

            {paragraphs.map((p, i) => (
              <p key={i} className={s.text}>
                {p}
              </p>
            ))}

            <ul className={s.stats}>
              {stats.map((st, i) => (
                <li key={i} className={s.statItem}>
                  <span className={s.statValue}>{st.value}</span>
                  <span className={s.statLabel}>{st.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
