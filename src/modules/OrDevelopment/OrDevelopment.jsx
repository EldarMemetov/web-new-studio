import React from 'react';
import Container from '@/shared/container/Container';
import s from './OrDevelopment.module.scss';
import Button from '@/shared/components/button/Button';
import { initServerI18n } from '@/i18n/utils/serverI18n';
import ListOrDevelopment from './ListOrDevelopment/ListOrDevelopment';
import ScrollButton from '@/shared/ScrollButton/ScrollButton';
import Link from 'next/link';
import { LINKDATA } from '@/shared/constants';
export default async function OrDevelopment({ locale }) {
  const { t } = await initServerI18n(locale, ['OrDevelopment']);
  const constructorData = t('constructor', { returnObjects: true });
  const developmentData = t('development', { returnObjects: true });

  return (
    <section className={s.section}>
      <Container>
        <div>
          <h2 className={s.title}>
            {t('sectionTitle.before')}
            <span className={s.titleSpan}>{t('sectionTitle.highlight')}</span>
          </h2>
          <p className={s.description}>
            {t('introParagraph.text')}
            <span className={s.SpanDescription}>
              {t('introParagraph.textNext')}
            </span>
            <span>{t('introParagraph.textAnd')}</span>
          </p>
        </div>
        <div className={s.containerContent}>
          <div className={s.containerConstructor}>
            <ListOrDevelopment
              title={constructorData.title}
              list={constructorData.list}
              subList={constructorData.subList}
              titleClassName={s.constructorTitle}
              subListClassName={s.constructorSubList}
            />
          </div>
          <div className={s.divider} />

          <div className={s.containerDevelopment}>
            <ListOrDevelopment
              title={developmentData.title}
              list={developmentData.list}
              subList={developmentData.subList}
              titleClassName={s.developmentTitle}
              subListClassName={s.developmentSubList}
            />
          </div>
        </div>

        <div className={s.conclusionWrapper}>
          <h4 className={s.conclusion}>
            {t('conclusion.beforeOne')}
            <span className={s.spanConclusion}>
              {t('conclusion.beforeTwo')}
            </span>
            <br />
            <span>{t('conclusion.beforeThree')}</span>
            <span className={s.spanConclusion}>
              {t('conclusion.beforeFour')}
            </span>
          </h4>
          <div className={s.containerButton}>
            <ScrollButton targetId="feedback-form" variant="variant8">
              {t('buttons.0.textContact')}
            </ScrollButton>

            <Link href={`/${LINKDATA.Blog}`} passHref>
              <Button variant="variant9">{t('buttons.1.textBlog')}</Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
