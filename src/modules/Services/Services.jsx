import Container from '@/shared/container/Container';
import s from './Services.module.scss';
import { initServerI18n } from '@/i18n/utils/serverI18n';
import ServicesList from './ServicesList/ServicesList';

export default async function Services({ locale }) {
  const { t } = await initServerI18n(locale, ['services']);
  const solutions = t('solutions', { returnObjects: true }) || [];
  const genres = t('genres', { returnObjects: true }) || [];

  return (
    <section className={s.section} id="services">
      <span className={s.aurora} aria-hidden="true" />
      <Container>
        <div className={s.head}>
          <span className={s.eyebrow}>
            <span className={s.eyebrowDot} />
            {t('eyebrow')}
          </span>
          <h2 className={s.title}>
            <span className={s.spanTitle}>{t('spanTitle')}</span>
            {t('title')}
          </h2>
          <p className={s.description}>{t('description')}</p>
        </div>

        <ServicesList items={solutions} />

        {genres.length > 0 && (
          <div className={s.genres}>
            <div className={s.genresHead}>
              <h3 className={s.genresTitle}>{t('genresTitle')}</h3>
              <p className={s.genresSubtitle}>{t('genresSubtitle')}</p>
            </div>
            <ul className={s.genreList}>
              {genres.map((g) => (
                <li key={g.id} className={s.genreChip}>
                  <span className={s.genreChipDot} />
                  {g.label}
                </li>
              ))}
            </ul>
          </div>
        )}
      </Container>
    </section>
  );
}
