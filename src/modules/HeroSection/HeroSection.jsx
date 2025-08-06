'use client';
import Container from '@/shared/container/Container';
import s from './HeroSection.module.scss';
import Icon from '@/shared/Icon/Icon';
import Link from 'next/link';
import ScrollButton from '@/shared/ScrollButton/ScrollButton';

export default function HeroSection({ texts }) {
  return (
    <section className={s.section}>
      <Container>
        <div className={s.containerContent}>
          <div className={s.containerIcon}>
            <span className={s.span}>{texts.subtitle}</span>
            <span className={s.spanMobile}>{texts.subtitleMobile}</span>
            <Link
              href={texts.linkPortfolio}
              className={s.button}
              aria-label={texts.goToPortfolio}
            >
              <Icon iconName="icon-arrow" className={s.icon} />
            </Link>
          </div>
          <h1 className={s.title}>{texts.title}</h1>
          <p className={s.description}>{texts.description}</p>

          <div className={s.buttonContainer}>
            <ScrollButton targetId="feedback-form" variant="variant3">
              {texts.button}
            </ScrollButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
