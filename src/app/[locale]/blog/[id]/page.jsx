import BlogId from '@/modules/BlogId/BlogId';
import { client } from '@/lib/sanityClient';
import { postBySlugQuery } from '@/lib/queries';
import s from './idBlog.module.scss';
import FeedbackWrapper from '@/shared/FeedbackWrapper/FeedbackWrapper';
export const dynamic = 'force-static';
export const revalidate = 60;
export async function generateStaticParams() {
  const posts = await client.fetch(`*[_type == "post"]{ customId }`);
  const locales = ['en', 'ua', 'de'];
  return posts.flatMap((post) =>
    locales.map((locale) => ({ id: post.customId.current, locale }))
  );
}

export default async function BlogIdPageId({ params }) {
  const { locale, id } = await params;

  const post = await client.fetch(postBySlugQuery, { id });

  if (!post) return <div>Пост не найден</div>;

  return (
    <div className={s.container}>
      <BlogId post={post} locale={locale} />
      <FeedbackWrapper />
    </div>
  );
}
