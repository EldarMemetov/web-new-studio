import Container from '@/shared/container/Container';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import { portableTextComponents } from '@/lib/portableTextComponents';
import { urlFor } from '@/lib/sanityClient';
import s from './BlogId.module.scss';
import Icon from '@/shared/Icon/Icon';
import Link from 'next/link';
import { initServerI18n } from '@/i18n/utils/serverI18n';
export default async function BlogId({ post, locale }) {
  const { t } = await initServerI18n(locale, ['BlogCategoryPage']);
  return (
    <article>
      <section className={s.hero}>
        <div className={s.heroImageWrapper}>
          <Image
            src={urlFor(post.mainImage).width(1600).height(600).url()}
            alt={post.title[locale]}
            fill
            priority
            style={{ objectFit: 'cover' }}
          />
          <div className={s.heroOverlay}>
            <Container>
              <h1 className={s.heroTitle}>{post.title[locale]}</h1>
            </Container>
          </div>
        </div>
      </section>

      <section className={s.section}>
        <Container>
          <div>
            <Link href={`/${locale}/blog#blog`} className={s.backLink}>
              <Icon iconName="icon-arrow" className={s.backIcon} />
              {t('next')}
            </Link>
          </div>
          <div className={s.article}>
            <PortableText
              value={post.body[locale]}
              components={portableTextComponents}
            />
          </div>
        </Container>
      </section>
    </article>
  );
}
