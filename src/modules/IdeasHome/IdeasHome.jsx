import Container from '@/shared/container/Container';
import { initServerI18n } from '@/i18n/utils/serverI18n';
import IdeasList from './IdeasList/IdeasList';
import styles from './IdeasHome.module.scss';
import ClientButton from './ClientButton/ClientButton';
import Image from 'next/image';
export default async function IdeasHome({ locale }) {
  const { t } = await initServerI18n(locale, ['ideasHome', 'ideasModal']);
  const modalContent = {
    title: t('ideasModal:title'),
    subtitle: t('ideasModal:subtitle'),
    subtitleHighlight: t('ideasModal:subtitleHighlight'),
    list: t('ideasModal:list', { returnObjects: true }),
    ctaTitle: t('ideasModal:ctaTitle'),
    ctaSubtitle: t('ideasModal:ctaSubtitle'),
    ctaButton: t('ideasModal:ctaButton'),
  };

  return (
    <section className={styles.section} id="ideas-home">
      <Container>
        <div className={styles.contentContainer}>
          <div className={styles.contentText}>
            <h2 className={styles.title}>
              {t('section.title')}
              <span className={styles.titleSpan}>{t('section.subTitle')}</span>
            </h2>
            <h3 className={styles.description}>{t('section.description')}</h3>
          </div>
          <IdeasList
            items={t('section.sections', { returnObjects: true }) || []}
          />
          <ClientButton
            buttonText={t('section.buttonText')}
            modalContent={modalContent}
          />
        </div>
        <div className={styles.backgroundWrapper}>
          <Image
            src="/image/circles.png"
            alt="circles"
            fill
            priority
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>
      </Container>
    </section>
  );
}
