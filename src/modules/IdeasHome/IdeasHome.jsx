import Container from '@/shared/container/Container';
import { initServerI18n } from '@/i18n/utils/serverI18n';
import IdeasList from './IdeasList/IdeasList';
import IdeasTogether from './IdeasTogether/IdeasTogether';
import styles from './IdeasHome.module.scss';

export default async function IdeasHome({ locale }) {
  const { t } = await initServerI18n(locale, ['ideasHome']);

  const together = {
    label: t('section.together.label'),
    title: t('section.together.title'),
    titleHighlight: t('section.together.titleHighlight'),
    description: t('section.together.description'),
    perks: t('section.together.perks', { returnObjects: true }),
  };

  return (
    <section className={styles.section} id="ideas-home">
      <Container>
        <div className={styles.contentContainer}>
          <p className={styles.eyebrow}>{t('section.eyebrow')}</p>
          <h2 className={styles.title}>
            {t('section.title')}
            <span className={styles.titleSpan}>{t('section.subTitle')}</span>
          </h2>
          <p className={styles.description}>{t('section.description')}</p>
          <IdeasList
            items={t('section.sections', { returnObjects: true }) || []}
          />
          <IdeasTogether data={together} />
        </div>
      </Container>
    </section>
  );
}
