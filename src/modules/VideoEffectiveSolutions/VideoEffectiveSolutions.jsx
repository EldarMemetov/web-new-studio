import Container from '@/shared/container/Container';
import s from './VideoEffectiveSolutions.module.scss';
import { initServerI18n } from '@/i18n/utils/serverI18n';
import VideoEffectiveList from './VideoEffectiveList/VideoEffectiveList';

export default async function VideoEffectiveSolutions({ locale }) {
  const { t } = await initServerI18n(locale, ['videoEffectiveSolutions']);
  const solutions = t('solutions', { returnObjects: true }) || [];
  const genres = t('genres', { returnObjects: true }) || [];

  return (
    <section className={s.section} id="works">
      <Container>
        <div className={s.containerContent}>
          <h2 className={s.title}>
            <span className={s.spanTitle}>{t('spanTitle')}</span>
            {t('title')}
          </h2>
          <p className={s.description}>{t('description')}</p>

          <VideoEffectiveList items={solutions} />

          {genres.length > 0 && (
            <div className={s.genres}>
              <h3 className={s.genresTitle}>{t('genresTitle')}</h3>
              <ul className={s.genreList}>
                {genres.map((g) => (
                  <li key={g.id} className={s.genreChip}>
                    {g.label}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
