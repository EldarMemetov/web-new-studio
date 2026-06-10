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
  const items = t('items', { returnObjects: true }) || [];

  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.inner}>
          <div className={styles.header}>
            <span className={styles.eyebrow}>
              <span className={styles.eyebrowDot} aria-hidden="true" />
              brand · identity · trust
            </span>

            <h2 className={styles.title}>
              {t('titleStart')}
              <span className={styles.titleAnd}>{t('titleHighlight')}</span>
            </h2>

            {description?.trim() && (
              <p className={styles.description}>{description}</p>
            )}

            <span className={styles.headerLine} aria-hidden="true" />
          </div>

          <ListBrand items={items} />
        </div>
      </Container>
    </section>
  );
}
