'use client';

import s from './CookieNotice.module.scss';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const STORAGE_KEY = 'cookie_notice_acknowledged';

const translations = {
  en: {
    message:
      'This website uses only technically necessary cookies and local storage to remember language preferences and your privacy settings.',
    button: 'Got it',
    policyLinkText: 'Privacy Policy',
    policyLink: '/en/privacy-policy',
  },

  de: {
    message:
      'Diese Website verwendet ausschließlich technisch notwendige Cookies und lokalen Speicher, um Spracheinstellungen und Ihre Datenschutzeinstellungen zu speichern.',
    button: 'Verstanden',
    policyLinkText: 'Datenschutzerklärung',
    policyLink: '/de/privacy-policy',
  },
};

export default function CookieNotice() {
  const [visible, setVisible] = useState(false);

  const pathname = usePathname();
  const locale = pathname?.split('/')[1] || 'en';
  const t = translations[locale] || translations.en;

  useEffect(() => {
    const acknowledged = localStorage.getItem(STORAGE_KEY);

    if (!acknowledged) {
      setVisible(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem(STORAGE_KEY, 'true');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className={s.cookieNotice}
      role="dialog"
      aria-live="polite"
      aria-label={t.policyLinkText}
    >
      <p className={s.message}>
        {t.message}{' '}
        <Link
          href={t.policyLink}
          className={s.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t.policyLinkText}
        </Link>
        .
      </p>

      <div className={s.cookieButtons}>
        <button type="button" className={s.button} onClick={handleClose}>
          {t.button}
        </button>
      </div>
    </div>
  );
}
