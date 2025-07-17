import Container from '@/shared/container/Container';
import Image from 'next/image';
import Link from 'next/link';
import { initServerI18n } from '@/i18n/utils/serverI18n';
import s from './PortfolioId.module.scss';
import Icon from '@/shared/Icon/Icon';

export default async function PortfolioId({ locale, id }) {
  const { t } = await initServerI18n(locale, ['webPortfolio']);
  const projects = t('projects', { returnObjects: true }) || {};
  const ui = t('ui', { returnObjects: true }) || {};
  const project = projects[id];

  if (!project) {
    return (
      <section className={s.section}>
        <Container>
          <h1 className={s.title}>{ui.projectNotFound}</h1>
        </Container>
      </section>
    );
  }

  return (
    <section className={s.section}>
      <Image
        src={project.image1.src}
        alt={project.title}
        width={project.image1.width}
        height={project.image1.height}
        className={s.imageBack}
      />
      <div className={s.background}></div>
      <Container>
        <Link
          href={`/${locale}/web-development#portfolioSection`}
          className={s.backLink}
        >
          <Icon iconName="icon-arrow" className={s.backIcon} />
          {ui.backLink}
        </Link>

        <h1 className={s.title}>{project.title}</h1>
        <p className={s.description}>{project.description}</p>

        {project.features && (
          <div className={s.featuresSection}>
            <h2 className={s.title}>{ui.featuresTitle}</h2>
            <ul className={s.featuresList}>
              {project.features.map((feature, index) => (
                <li key={index} className={s.featuresItem}>
                  <p className={s.featureText}>{feature}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {project.technologies && (
          <div className={s.technologiesSection}>
            <h2 className={s.title}>{ui.technologies}</h2>
            <ul className={s.technologiesList}>
              {project.technologies.map((tech, index) => (
                <li key={index} className={s.technologiesItem}>
                  <p className={s.listItem}>{tech}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className={s.imagesWrapper}>
          <Image
            src={project.image2.src}
            alt={project.title}
            width={project.image2.width}
            height={project.image2.height}
            className={`${s.image} ${project.image2.className}`}
          />
          <Image
            src={project.image3.src}
            alt={project.title}
            width={project.image3.width}
            height={project.image3.height}
            className={`${s.imageMobile} ${project.image3.className}`}
          />
        </div>

        {project.liveUrl && (
          <Link
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={s.buttonLink}
          >
            {ui.goToSite}
            <Icon iconName="icon-arrow" className={s.iconLink} />
          </Link>
        )}
      </Container>
    </section>
  );
}
