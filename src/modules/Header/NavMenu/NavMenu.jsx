'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import styles from './NavMenu.module.scss';

import Icon from '@/shared/Icon/Icon';
import ScrollButton from '@/shared/ScrollButton/ScrollButton';

function useIsMobile(breakpoint = 1154) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth < breakpoint);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [breakpoint]);

  return isMobile;
}

const links = [
  { id: 'home', key: 'home' },
  { id: 'works', key: 'works' },
  { id: 'about-me', key: 'aboutMe' },
  { id: 'services', key: 'services' },
];

const HEADER_OFFSET = 90;

export default function NavMenu({
  variant = 'header',
  isMobileMenuOpen = false,
  onCloseMenu = () => {},
  onToggleMenu = () => {},
}) {
  const { t, i18n } = useTranslation('header');
  const [locale, setLocale] = useState(i18n.language);
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);
  const [activeId, setActiveId] = useState('home');
  const isMobile = useIsMobile(1154);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (locale !== i18n.language) {
      onCloseMenu();
      setLocale(i18n.language);
    }
  }, [i18n.language, locale, onCloseMenu]);

  useEffect(() => {
    if (!isClient) return;

    const sections = links
      .filter(({ id }) => id !== 'home')
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isClient]);

  useEffect(() => {
    if (!isClient) return;

    const onScroll = () => {
      if (window.scrollY < 150) setActiveId('home');
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isClient]);

  const handleAnchorClick = (e, id) => {
    if (id === 'home') {
      const onHome =
        pathname === `/${i18n.language}` || pathname === `/${i18n.language}/`;
      if (onHome) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setActiveId('home');
      }
      onCloseMenu();
      return;
    }

    const el = typeof document !== 'undefined' && document.getElementById(id);
    if (el) {
      e.preventDefault();
      const y = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveId(id);
    }

    onCloseMenu();
  };

  const renderLinks = (styleVariant) => (
    <ul className={clsx(styles.navList, styles[styleVariant])}>
      {links.map(({ id, key }) => (
        <li
          key={key}
          className={clsx(styles.navItem, styles[styleVariant], {
            [styles.active]: activeId === id,
          })}
        >
          <Link
            href={
              id === 'home' ? `/${i18n.language}` : `/${i18n.language}#${id}`
            }
            className={clsx(styles.navLink, styles[styleVariant])}
            onClick={(e) => handleAnchorClick(e, id)}
          >
            {t(key)}
          </Link>
        </li>
      ))}
    </ul>
  );

  if (!isClient) return null;

  if (variant === 'header') {
    if (isMobile) {
      return (
        <div
          className={clsx(styles.mobileMenuItem, {
            [styles.openMenu]: isMobileMenuOpen,
          })}
        >
          {isMobileMenuOpen && (
            <div className={styles.mobileHeader}>
              <button onClick={onToggleMenu} className={styles.menuClose}>
                <Icon iconName="icon-close" className={styles.iconClose} />
              </button>
              <div className={styles.mobileContact}>
                <h3 className={styles.titleMobile}>{t('haveQuestions')}</h3>
                <ScrollButton
                  onClick={onCloseMenu}
                  targetId="feedback-form"
                  variant="variant1"
                >
                  {t('kontakt')}
                </ScrollButton>
              </div>
            </div>
          )}
          {renderLinks('header')}
        </div>
      );
    }

    return renderLinks('header');
  }

  return renderLinks('footer');
}
