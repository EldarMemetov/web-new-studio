import Container from '@/shared/container/Container';
import { initServerI18n } from '@/i18n/utils/serverI18n';
import styles from './WhyMe.module.scss';

export default async function WhyMe({ locale }) {
  const { t } = await initServerI18n(locale, ['whyMe']);
  const features = t('features', { returnObjects: true }) || [];

  return (
    <section className={styles.section} id="why-me">
      <Container>
        <div className={styles.grid}>
          <div className={styles.left}>
            <h2 className={styles.title}>
              {t('titleBefore')}
              <span className={styles.titleHighlight}>
                {' '}
                {t('titleHighlight')}
              </span>
            </h2>
            <p className={styles.subtitle}>{t('subtitle')}</p>
          </div>
          <ul className={styles.list}>
            {features.map((feature, index) => (
              <li key={index} className={styles.item}>
                <span className={styles.itemIcon} aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 13l4 4L19 7"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <p className={styles.itemText}>{feature}</p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
