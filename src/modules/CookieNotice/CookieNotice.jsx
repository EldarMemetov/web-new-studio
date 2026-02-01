'use client';

import s from './CookieNotice.module.scss';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const translations = {
  ua: {
    message:
      'Цей сайт використовує технічні cookie для збереження мовних налаштувань та забезпечення функціональності. Виберіть, які cookies ви дозволяєте.',
    necessary: 'Необхідні (завжди увімкнено)',
    analytics: 'Аналітика',
    marketing: 'Маркетинг',
    accept: 'Зберегти вибір',
    declineAll: 'Відхилити всі',
    policyLinkText: 'Політика конфіденційності',
    policyLink: '/ua/privacy-policy',
  },
  en: {
    message:
      'This website uses technical cookies to remember language preferences and enable core functionality. Choose which cookies you allow.',
    necessary: 'Necessary (always enabled)',
    analytics: 'Analytics',
    marketing: 'Marketing',
    accept: 'Save preferences',
    declineAll: 'Decline all',
    policyLinkText: 'Privacy Policy',
    policyLink: '/en/privacy-policy',
  },
  de: {
    message:
      'Diese Website verwendet technische Cookies, um Spracheinstellungen zu speichern und die Funktionalität zu gewährleisten. Wählen Sie, welche Cookies Sie erlauben.',
    necessary: 'Notwendig (immer aktiviert)',
    analytics: 'Analytics',
    marketing: 'Marketing',
    accept: 'Auswahl speichern',
    declineAll: 'Alle ablehnen',
    policyLinkText: 'Datenschutzerklärung',
    policyLink: '/de/privacy-policy',
  },
};

export default function CookieNotice() {
  const [visible, setVisible] = useState(false);
  const [consent, setConsent] = useState({
    analytics: false,
    marketing: false,
  });
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] || 'en';
  const t = translations[locale] || translations.en;

  useEffect(() => {
    const cookieConsent = JSON.parse(
      localStorage.getItem('cookie_notice_consent') || '{}'
    );
    if (!cookieConsent.accepted) {
      setVisible(true);
      setConsent({
        analytics: cookieConsent.analytics || false,
        marketing: cookieConsent.marketing || false,
      });
    }
  }, []);

  const saveConsent = () => {
    localStorage.setItem(
      'cookie_notice_consent',
      JSON.stringify({ accepted: true, ...consent })
    );
    setVisible(false);

    if (consent.analytics) {
      console.log('Analytics scripts enabled');
    }
    if (consent.marketing) {
      console.log('Marketing scripts enabled');
    }
  };

  const declineAll = () => {
    localStorage.setItem(
      'cookie_notice_consent',
      JSON.stringify({ accepted: true, analytics: false, marketing: false })
    );
    setConsent({ analytics: false, marketing: false });
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className={s.cookieNotice}>
      <span>
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
      </span>
      <div className={s.cookieOptions}>
        <label>
          <input type="checkbox" checked disabled /> {t.necessary}
        </label>
        <label>
          <input
            type="checkbox"
            checked={consent.analytics}
            onChange={(e) =>
              setConsent((prev) => ({ ...prev, analytics: e.target.checked }))
            }
          />{' '}
          {t.analytics}
        </label>
        <label>
          <input
            type="checkbox"
            checked={consent.marketing}
            onChange={(e) =>
              setConsent((prev) => ({ ...prev, marketing: e.target.checked }))
            }
          />{' '}
          {t.marketing}
        </label>
      </div>
      <div className={s.cookieButtons}>
        <button className={s.button} onClick={saveConsent}>
          {t.accept}
        </button>
        <button className={s.button} onClick={declineAll}>
          {t.declineAll}
        </button>
      </div>
    </div>
  );
}
