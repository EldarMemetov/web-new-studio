'use client';
import { useLanguageChanger } from '../../../i18n/utils/LanguageChanger';
import styles from './LanguageSwitcher.module.scss';

const LANGUAGES = ['en', 'de'];

const LanguageSwitcher = () => {
  const { handleChangeLanguage, currentLocale } = useLanguageChanger();

  return (
    <div
      className={styles.languageSwitcher}
      role="group"
      aria-label="Language switcher"
    >
      {LANGUAGES.map((lang) => (
        <button
          key={lang}
          type="button"
          className={`${styles.languageOption} ${
            currentLocale === lang ? styles.active : ''
          }`}
          aria-pressed={currentLocale === lang}
          onClick={() => handleChangeLanguage(lang)}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
