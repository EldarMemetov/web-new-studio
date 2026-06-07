import Container from '@/shared/container/Container';
import s from './Portfolio.module.scss';
import { initServerI18n } from '@/i18n/utils/serverI18n';
import LinkButton from '@/shared/components/LinkButton/LinkButton';
import { ROUTES } from '@/shared/constants';
import dynamic from 'next/dynamic';
import Icon from '@/shared/Icon/Icon';

const VideoShowcase = dynamic(() => import('./VideoShowcase/VideoShowcase'));
const WebShowcase = dynamic(() => import('./WebShowcase/WebShowcase'));

export default async function Portfolio({ locale }) {
  const { t: tPortfolio } = await initServerI18n(locale, ['portfolio']);
  const { t: tWeb } = await initServerI18n(locale, ['webPortfolio']);
  const projects = tWeb('projects', { returnObjects: true }) || {};
  const projectsEntries = Object.entries(projects);

  return (
    <section className={s.section} id="portfolio">
      <Container>
        <div className={s.header}>
          <h2 className={s.title}>
            <span className={s.titleAccent}>{tPortfolio('title')}</span>
            {tPortfolio('nextTitle')}
          </h2>
        </div>

        {/* ВІДЕО БЛОК */}
        <div className={s.block}>
          <div className={s.blockTop}>
            <div className={s.blockMeta}>
              <span className={s.blockNum}>01</span>
              <h3 className={s.blockTitle}>{tPortfolio('videoLabel')}</h3>
              <p className={s.blockDesc}>{tPortfolio('videoDescription')}</p>
            </div>
            <LinkButton path={`/${ROUTES.VIDEOGRAPHY}`} className={s.blockBtn}>
              {tPortfolio('videoButton')}
              <Icon iconName="icon-arrow" className={s.btnIcon} />
            </LinkButton>
          </div>
          <div className={s.blockMedia}>
            <VideoShowcase />
          </div>
        </div>

        {/* ВЕБ БЛОК */}
        <div className={s.block}>
          <div className={s.blockTop}>
            <div className={s.blockMeta}>
              <span className={s.blockNum}>02</span>
              <h3 className={s.blockTitle}>{tPortfolio('webLabel')}</h3>
              <p className={s.blockDesc}>{tPortfolio('webDescription')}</p>
            </div>
            <LinkButton path={`/${ROUTES.DEVELOPMENT}`} className={s.blockBtn}>
              {tPortfolio('webButton')}
              <Icon iconName="icon-arrow" className={s.btnIcon} />
            </LinkButton>
          </div>
          <div className={s.blockMedia}>
            <WebShowcase
              locale={locale}
              projects={projectsEntries}
              ctaLabel={tWeb('buttons')}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
