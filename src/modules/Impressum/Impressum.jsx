'use client';

import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Container from '@/shared/container/Container';
import s from './Impressum.module.scss';

const SECTIONS = [
  { key: 'provider', type: 'address' },
  { key: 'contact', type: 'contact' },
  { key: 'media', type: 'text', fields: ['country', 'authority'] },
  { key: 'responsibility', type: 'text', fields: ['text', 'law'] },
  { key: 'privacy', type: 'privacy' },
  { key: 'copyright', type: 'text', fields: ['text'] },
  { key: 'social', type: 'social' },
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
            <span className={s.fieldLabel}>E-Mail</span>
            <a href={`mailto:${email}`} className={s.fieldLink}>
              {email}
            </a>
          </div>
        )}

        {phone && (
          <div className={s.field}>
            <span className={s.fieldLabel}>Tel.</span>
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

  const renderPrivacy = () => {
    const text = t('sections.privacy.text');
    const url = t('sections.privacy.url');

    return (
      <>
        {text && <p className={s.fieldText}>{text}</p>}
        {url && (
          <a
            href={url}
            className={s.fieldLink}
            target="_blank"
            rel="noreferrer"
          >
            {url}
          </a>
        )}
      </>
    );
  };

  const renderSocial = () => {
    const intro = t('sections.social.intro');
    const instagramUrl = t('sections.social.instagramUrl');

    return (
      <>
        {intro && <p className={s.fieldText}>{intro}</p>}
        {instagramUrl && (
          <div className={s.field}>
            <span className={s.fieldLabel}>Instagram</span>
            <a
              href={instagramUrl}
              className={s.fieldLink}
              target="_blank"
              rel="noreferrer"
            >
              {instagramUrl}
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
    if (section.type === 'privacy') return renderPrivacy();
    if (section.type === 'social') return renderSocial();

    return renderTextFields(section.key, section.fields);
  };

  const credit = t('credit');

  return (
    <section className={s.section} id="impressum">
      <Container>
        <header className={s.header}>
          <p className={s.eyebrow}>Legal · § 5 DDG</p>

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

        {credit && <p className={s.credit}>{credit}</p>}
      </Container>
    </section>
  );
}
