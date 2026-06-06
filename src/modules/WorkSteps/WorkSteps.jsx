'use client';

import { useEffect, useRef } from 'react';
import { useTranslation } from 'next-i18next';
import Container from '@/shared/container/Container';
import s from './WorkSteps.module.scss';

export default function WorkSteps({ namespace = 'workStepsVideo' }) {
  const { t } = useTranslation(namespace);
  const steps = t('steps', { returnObjects: true }) || [];
  const refs = useRef([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add(s.in);
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.15 }
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const r = (i) => (el) => {
    refs.current[i] = el;
  };

  return (
    <section className={s.section}>
      <div className={s.aurora} aria-hidden="true" />

      <Container>
        <div className={s.header}>
          <p className={s.eyebrow} ref={r(0)}>
            <span className={s.eyebrowDot} />
            {t('eyebrow')}
          </p>
          <h2 className={s.h2} ref={r(1)}>
            {t('title')}
            <span>{t('titleSpan')}</span>
          </h2>
          <p className={s.desc} ref={r(2)}>
            {t('description')}
          </p>
        </div>

        <ul className={s.list}>
          {steps.map((step, i) => (
            <li
              key={i}
              className={s.item}
              ref={r(i + 3)}
              style={{ transitionDelay: `${0.1 * i}s` }}
            >
              <span className={s.bar} aria-hidden="true" />
              <span className={s.ghost} aria-hidden="true">
                {step.num}
              </span>

              <div className={s.head}>
                <span className={s.numTag}>{step.num}</span>
                <span className={s.divider} aria-hidden="true" />
                <h3 className={s.title}>{step.title}</h3>
              </div>

              <p className={s.text}>{step.description}</p>

              <span className={s.corner} aria-hidden="true" />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
