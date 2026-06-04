import Container from '@/shared/container/Container';
import s from './AboutSection.module.scss';
import { initServerI18n } from '@/i18n/utils/serverI18n';
import AboutAnimated from './AboutAnimated/AboutAnimated';

export default async function AboutSection({ locale }) {
  const { t } = await initServerI18n(locale, ['aboutSection']);

  const data = {
    eyebrow: t('eyebrow'),
    projectName: t('projectName'),
    projectSubtitle: t('projectSubtitle'),
    quote: t('quote'),
    paragraph1: t('paragraph1'),
    paragraph2: t('paragraph2'),
    badge: t('badge'),
    tags: t('tags', { returnObjects: true }),
    stats: t('stats', { returnObjects: true }),
  };

  return (
    <section id="about" className={s.section}>
      <Container>
        <AboutAnimated data={data} />
      </Container>
    </section>
  );
}
