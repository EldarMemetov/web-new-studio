import Container from '@/shared/container/Container';
import styles from './BrandTransformation.module.scss';
import { initServerI18n } from '@/i18n/utils/serverI18n';
import ListBrand from './ListBrand/ListBrand';

export default async function BrandTransformation({
  locale,
  namespace = 'brandTransformation',
}) {
  const { t } = await initServerI18n(locale, [namespace]);

  const description = t('description');

  return (
    <section className={styles.section}>
      <Container>
        <div>
          <h2 className={styles.title}>
            {t('titleStart')}
            <span className={styles.titleAnd}>{t('titleHighlight')}</span>
          </h2>

          {description?.trim() && (
            <p className={styles.description}>{description}</p>
          )}

          <ListBrand items={t('items', { returnObjects: true }) || []} />
        </div>
      </Container>
    </section>
  );
}
