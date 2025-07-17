import { urlFor } from '@/lib/sanityClient';
import Link from 'next/link';
import Image from 'next/image';
import s from './SectionBlog.module.scss';
import Button from '@/shared/components/button/Button';
export default function SectionBlog({ posts = [], locale, readText }) {
  if (!posts.length) return <p>Нет постов</p>;

  return (
    <section className={s.section} id="blog">
      <div className={s.blogContainer}>
        {posts.map((post) => (
          <div className={s.cardWrapper} key={post._id}>
            <article className={s.BlogIdContainer}>
              {post.mainImage && (
                <Image
                  src={urlFor(post.mainImage).width(400).url()}
                  alt={post.title[locale]}
                  width={400}
                  height={300}
                  style={{ objectFit: 'cover' }}
                  className={s.image}
                />
              )}
              <h2 className={s.title}>{post.title[locale]}</h2>
              <p className={s.author}>{post.author}</p>
              <p className={s.data}>
                {post.publishedAt
                  ? new Date(post.publishedAt).toLocaleDateString('en-GB')
                  : '—'}
              </p>

              <Link href={`/${locale}/blog/${post.customId.current}`} passHref>
                <Button variant="variant12">{readText}</Button>
              </Link>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}
