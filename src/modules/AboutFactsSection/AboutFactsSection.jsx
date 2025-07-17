import Container from '@/shared/container/Container';
import s from './AboutFactsSection.module.scss';
import Icon from '@/shared/Icon/Icon';
import { initServerI18n } from '@/i18n/utils/serverI18n';

export default async function AboutFactsSection({ locale }) {
  const { t } = await initServerI18n(locale, ['aboutFactsSection']);
  const facts = t('facts', { returnObjects: true }) || [];

  return (
    <section className={s.section}>
      <div className={s.background}></div>
      <Container>
        <div>
          <h2 className={s.title}>
            {t('title')} <span className={s.titleSpan}>{t('titleSpan')}</span>
          </h2>
          <p className={s.description}>
            {t('description')}
            <span className={s.descriptionSpan}>{t('descriptionSpan')}</span>
          </p>
          <ul className={s.list}>
            {facts.map((fact, index) => (
              <li className={s.item} key={index}>
                <div className={s.gradientIcon}>
                  <Icon iconName="icon-tick" className={s.icon} />
                </div>
                <div className={s.containerIconText}>
                  <h3 className={s.info}>{fact.title}</h3>
                  <p className={s.infoItem}>{fact.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
