import Container from '@/shared/container/Container';
import s from './HeroSection.module.scss';
import Icon from '@/shared/Icon/Icon';
import Link from 'next/link';
import ScrollButton from '@/shared/ScrollButton/ScrollButton';

export default function HeroSection({
  title,
  description,
  subtitle,
  subtitleMobile,
  linkPortfolio,
  goToPortfolio,
  buttonText,
}) {
  return (
    <section className={s.section}>
      <Container>
        <div className={s.containerContent}>
          <div className={s.containerIcon}>
            <span className={s.span}>{subtitle}</span>
            <span className={s.spanMobile}>{subtitleMobile}</span>
            <Link
              href={linkPortfolio}
              className={s.button}
              aria-label={goToPortfolio}
            >
              <Icon iconName="icon-arrow" className={s.icon} />
            </Link>
          </div>

          <h1 className={s.title}>{title}</h1>
          <p className={s.description}>{description}</p>

          <div className={s.buttonContainer}>
            <ScrollButton targetId="feedback-form" variant="variant3">
              {buttonText}
            </ScrollButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
