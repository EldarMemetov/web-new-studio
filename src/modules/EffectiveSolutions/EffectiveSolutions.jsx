import Container from '@/shared/container/Container';
import s from './EffectiveSolutions.module.scss';
import { ListEffectiveSolutions } from './ListEffectiveSolutions/ListEffectiveSolutions';
import { initServerI18n } from '@/i18n/utils/serverI18n';
export default async function EffectiveSolutions({ locale }) {
  const { t } = await initServerI18n(locale, ['effectiveSolutions']);
  const solutions = t('solutions', { returnObjects: true }) || [];

  return (
    <section className={s.section} id="effective-web">
      <Container>
        <div className={s.containerContent}>
          <h2 className={s.title}>
            <span className={s.spanTitle}>{t('spanTitle')}</span> {t('title')}
          </h2>
          <p className={s.description}>
            {t('descriptionBefore')}{' '}
            <span className={s.SpanDescription}>{t('SpanDescription')}</span>{' '}
            {t('descriptionAfter')}
          </p>

          <ListEffectiveSolutions items={solutions} />
        </div>
      </Container>
    </section>
  );
}
