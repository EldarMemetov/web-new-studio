import Container from '@/shared/container/Container';
import s from './Portfolio.module.scss';
import Icon from '@/shared/Icon/Icon';
import { initServerI18n } from '@/i18n/utils/serverI18n';
import AnimationInitializer from '@/shared/AnimationInitializer/AnimationInitializer';
import LinkButton from '@/shared/components/LinkButton/LinkButton';
import { ROUTES } from '@/shared/constants';
import PortfolioItem from '../WebPortfolio/PortfolioItem/PortfolioItem';

export default async function Portfolio({ locale }) {
  const { t: tPortfolio } = await initServerI18n(locale, ['portfolio']);
  const { t: tWeb } = await initServerI18n(locale, ['webPortfolio']);
  const projects = tWeb('projects', { returnObjects: true }) || {};
  const projectsEntries = Object.entries(projects).slice(0, 2);

  return (
    <section className={s.section} id="portfolio">
      <Container>
        <AnimationInitializer
          options={{
            duration: 1200,
            easing: 'ease-in-out',
            offset: 50,
          }}
        />
        <div className={s.text}>
          <h2 className={s.title} data-aos="fade-up">
            <span className={s.titleAccent}>{tPortfolio('title')}</span>{' '}
            {tPortfolio('nextTitle')}
          </h2>
          <h3 className={s.subtitle} data-aos="fade-up" data-aos-delay="200">
            {tPortfolio('subtitle')}
          </h3>
        </div>

        <div className={s.containerVideo} data-aos="zoom-in">
          <div className={s.videoWrapper}>
            <h4 className={s.textInfo}>{tPortfolio('videoLabel')}</h4>

            <LinkButton
              path={`/${ROUTES.VIDEOGRAPHY}`}
              className={s.button}
              aria-label={tPortfolio('button')}
            >
              {tPortfolio('button')}
              <Icon iconName="icon-arrow" className={s.icon} />
            </LinkButton>
          </div>
        </div>

        <div
          className={s.containerImage}
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <div className={s.containerImg}>
            <h4 className={s.textInfoDesktop}>{tPortfolio('webLabel')}</h4>
            {projectsEntries.map(([id, project]) => (
              <PortfolioItem
                key={id}
                id={id}
                locale={locale}
                project={project}
                ctaLabel={tWeb('buttons')}
              />
            ))}
            <LinkButton
              path={`/${ROUTES.DEVELOPMENT}`}
              className={s.buttonDesktop}
              aria-label={tPortfolio('button')}
            >
              {tPortfolio('button')}
              <Icon iconName="icon-arrow" className={s.icon} />
            </LinkButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
