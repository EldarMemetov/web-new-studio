import BlogId from '@/modules/BlogId/BlogId';
import { client } from '@/lib/sanityClient';
import { postBySlugQuery } from '@/lib/queries';

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
    <main>
      <BlogId post={post} locale={locale} />
    </main>
  );
}
