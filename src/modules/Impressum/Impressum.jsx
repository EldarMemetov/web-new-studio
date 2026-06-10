'use client';

import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Container from '@/shared/container/Container';
import s from './Impressum.module.scss';

const SECTIONS = [
  { key: 'provider', fields: ['name', 'business', 'address', 'country'] },
  { key: 'contact', fields: ['email', 'phone'] },
  { key: 'tax', fields: ['number', 'note'] },
  { key: 'responsibility', fields: ['text'] },
  { key: 'links', fields: ['text'] },
  { key: 'copyright', fields: ['text'] },
];

export default function Impressum() {
  const { t } = useTranslation(['impressum']);
  const cardsRef = useRef([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add(s.visible);
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );
    cardsRef.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const renderField = (sectionKey, field) => {
    const value = t(`sections.${sectionKey}.${field}`);

    if (sectionKey === 'contact' && field === 'email') {
      return (
        <div key={field} className={s.field}>
          <span className={s.fieldLabel}>Email</span>
          <a href={`mailto:${value}`} className={s.fieldLink}>
            {value}
          </a>
        </div>
      );
    }
    if (sectionKey === 'contact' && field === 'phone') {
      return (
        <div key={field} className={s.field}>
          <span className={s.fieldLabel}>Tel</span>
          <a href={`tel:${value.replace(/\s+/g, '')}`} className={s.fieldLink}>
            {value}
          </a>
        </div>
      );
    }
    return (
      <p key={field} className={s.fieldText}>
        {value}
      </p>
    );
  };

  return (
    <section className={s.section} id="impressum">
      <Container>
        <header className={s.header}>
          <p className={s.eyebrow}>Legal · §5 TMG</p>
          <h1 className={s.title}>{t('title')}</h1>
          <div className={s.divider} />
        </header>

        <div className={s.list}>
          {SECTIONS.map((section, i) => (
            <article
              key={section.key}
              ref={(el) => (cardsRef.current[i] = el)}
              className={s.item}
              style={{ '--delay': `${i * 80}ms` }}
            >
              <h2 className={s.itemTitle}>
                {t(`sections.${section.key}.title`)}
              </h2>
              <div className={s.itemBody}>
                {section.fields.map((field) => renderField(section.key, field))}
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
