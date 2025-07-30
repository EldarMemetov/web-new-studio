'use client';

import Container from '@/shared/container/Container';
import s from './Footer.module.scss';
import Logo from '@/shared/Logo/Logo';
import NavMenu from '../Header/NavMenu/NavMenu';
import { SocialLinks } from '../Header/SocialLinks/SocialLinks';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t, i18n } = useTranslation(['footer']);
  const locale = i18n.language;
  const currentYear = new Date().getFullYear();

  return (
    <footer className={s.footer}>
      <Container>
        <div className={s.wrapper}>
          <div className={s.logo}>
            <Logo variant="footer" />
          </div>
          <NavMenu variant="footer" locale={locale} />
          <div className={s.social}>
            <SocialLinks />
          </div>
          <div className={s.bottom}>
            <p className={s.rights}>
              {t('rights').replace('{year}', currentYear)}
            </p>
            <Link href={`/${locale}/privacy-policy`} className={s.privacyLink}>
              {t('privacy')}
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
