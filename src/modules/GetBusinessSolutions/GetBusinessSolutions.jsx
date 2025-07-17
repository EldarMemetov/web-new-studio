import Container from '@/shared/container/Container';
import { initServerI18n } from '@/i18n/utils/serverI18n';
import List from './List/List';
import styles from './GetBusinessSolutions.module.scss';

export default async function GetBusinessSolutions({ locale }) {
  const { t } = await initServerI18n(locale, ['getBusinessSolutions']);

  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.background}></div>
        <div className={styles.contentContainer}>
          <h2 className={styles.newTitle}>
            {t('titleStart')}
            <span className={styles.spanNewTitle}>{t('titleHighlight')}</span>
          </h2>

          <List items={t('items', { returnObjects: true }) || []} />
        </div>
      </Container>
    </section>
  );
}
