'use client';

import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Container from '@/shared/container/Container';
import s from './Impressum.module.scss';

const SECTIONS = [
  { key: 'provider', type: 'address' },
  { key: 'contact', type: 'contact' },
  { key: 'tax', type: 'text', fields: ['note'] },
  { key: 'editorialResponsibility', type: 'text', fields: ['text'] },
  { key: 'responsibility', type: 'text', fields: ['text'] },
  { key: 'links', type: 'text', fields: ['text'] },
  { key: 'copyright', type: 'text', fields: ['text'] },
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

  const renderProvider = () => {
    const name = t('sections.provider.name');
    const business = t('sections.provider.business');
    const street = t('sections.provider.street');
    const postalCode = t('sections.provider.postalCode');
    const city = t('sections.provider.city');
    const country = t('sections.provider.country');

    return (
      <>
        {name && <p className={s.fieldText}>{name}</p>}
        {business && <p className={s.fieldText}>{business}</p>}
        {street && <p className={s.fieldText}>{street}</p>}
        {(postalCode || city) && (
          <p className={s.fieldText}>
            {[postalCode, city].filter(Boolean).join(' ')}
          </p>
        )}
        {country && <p className={s.fieldText}>{country}</p>}
      </>
    );
  };

  const renderContact = () => {
    const email = t('sections.contact.email');
    const phone = t('sections.contact.phone');

    return (
      <>
        {email && (
          <div className={s.field}>
            <span className={s.fieldLabel}>Email</span>
            <a href={`mailto:${email}`} className={s.fieldLink}>
              {email}
            </a>
          </div>
        )}
        {phone && (
          <div className={s.field}>
            <span className={s.fieldLabel}>Tel</span>
            <a
              href={`tel:${phone.replace(/\s+/g, '')}`}
              className={s.fieldLink}
            >
              {phone}
            </a>
          </div>
        )}
      </>
    );
  };

  const renderTextFields = (sectionKey, fields) =>
    fields.map((field) => {
      const value = t(`sections.${sectionKey}.${field}`);
      if (!value) return null;
      return (
        <p key={field} className={s.fieldText}>
          {value}
        </p>
      );
    });

  const renderBody = (section) => {
    if (section.type === 'address') return renderProvider();
    if (section.type === 'contact') return renderContact();
    return renderTextFields(section.key, section.fields);
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
              <div className={s.itemBody}>{renderBody(section)}</div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
