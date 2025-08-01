import Container from '@/shared/container/Container';
import s from './WebWhyChoose.module.scss';
import { initServerI18n } from '@/i18n/utils/serverI18n';
import ListWebWhyChoose from './ListWebWhyChoose/ListWebWhyChoose';

export default async function WebWhyChoose({
  locale,
  namespace = 'webWhyChoose',
}) {
  const { t } = await initServerI18n(locale, [namespace]);
  const features = t('features', { returnObjects: true }) || [];

  const descriptionBefore = t('descriptionBefore');
  const spanDescriptionOne = t('spanDescriptionOne');
  const descriptionMiddle = t('descriptionMiddle');
  const spanDescriptionTwo = t('spanDescriptionTwo');
  const descriptionAfter = t('descriptionAfter');

  const isRealTranslation = (value, key) =>
    value && value.trim() && value !== key;

  const hasDescription = [
    ['descriptionBefore', descriptionBefore],
    ['spanDescriptionOne', spanDescriptionOne],
    ['descriptionMiddle', descriptionMiddle],
    ['spanDescriptionTwo', spanDescriptionTwo],
    ['descriptionAfter', descriptionAfter],
  ].some(([key, value]) => isRealTranslation(value, key));

  return (
    <section className={s.section}>
      <Container>
        <div className={s.containerContent}>
          <div className={s.containerTitle}>
            <h2 className={s.title}>
              {t('title')} <span className={s.titleSpan}>{t('spanTitle')}</span>
            </h2>

            {hasDescription && (
              <p className={s.description}>
                {descriptionBefore}
                <span className={s.spanWeight}>{spanDescriptionOne}</span>
                {descriptionMiddle}
                <span className={s.spanWeight}>{spanDescriptionTwo}</span>
                <span className={s.spanDescription}>{descriptionAfter}</span>
              </p>
            )}
          </div>
          <ListWebWhyChoose items={features} />
        </div>
      </Container>
    </section>
  );
}
