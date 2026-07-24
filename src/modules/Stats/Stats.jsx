import Container from '@/shared/container/Container';
import { initServerI18n } from '@/i18n/utils/serverI18n';
import StatsGrid from './StatsGrid';
import s from './Stats.module.scss';

export default async function Stats({ locale }) {
  const { t } = await initServerI18n(locale, ['stats']);
  const items = t('items', { returnObjects: true }) || [];

  return (
    <section id="stats" className={s.section}>
      <Container>
        <div className={s.head}>
          <p className={s.eyebrow}>{t('eyebrow')}</p>
          <h2 className={s.title}>
            {t('titleBefore')}
            <span className={s.titleHighlight}> {t('titleHighlight')}</span>
          </h2>
        </div>

        <StatsGrid items={items} />
      </Container>
    </section>
  );
}
