import Container from '@/shared/container/Container';
import { initServerI18n } from '@/i18n/utils/serverI18n';
import ToggleList from './ToggleList/ToggleList';
import styles from './ToggleQuestions.module.scss';
import Image from 'next/image';

export default async function ToggleQuestions({ locale }) {
  const { t } = await initServerI18n(locale, ['videoFaq']);
  const faqItems = t('faq', { returnObjects: true }) || [];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <section className={styles.section} id="faq">
      <script
        type="application/ld+json"

        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Container>
        <div className={styles.backgroundWrapper}>
          <Image
            src="/image/semicircles.png"
            alt="semicircles background"
            fill
            priority
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>
        <div className={styles.contentSize}>
          <h2 className={styles.title}>
            {t('titleBefore')}
            <span className={styles.titleAnd}>
              {' '}
              {t('titleHighlight')} <br />
            </span>
            {t('titleAfter')}
          </h2>

          <div className={styles.containerContent}>
            <p className={styles.description}>{t('description')}</p>
            <ToggleList items={faqItems} />
          </div>
        </div>
      </Container>
    </section>
  );
}
