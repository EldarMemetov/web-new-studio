import BlogCategoryPage from '@/modules/BlogCategoryPage/BlogCategoryPage';
import dynamic from 'next/dynamic';
import { client } from '@/lib/sanityClient';
import { postsByCategoryQuery } from '@/lib/queries';
import HeroBlog from '@/modules/HeroBlog/HeroBlog';

import s from './blog.module.scss';
const FeedbackForm = dynamic(
  () => import('@/modules/FeedbackForm/FeedbackForm')
);
export default async function BlogPage({ params: rawParams }) {
  const params = await rawParams;
  const locale = ['en', 'ua', 'de'].includes(params?.locale)
    ? params.locale
    : 'en';

  const defaultCategory = 'web';
  const posts = await client.fetch(postsByCategoryQuery, {
    category: defaultCategory,
  });

  return (
    <div className={s.container}>
      <HeroBlog locale={locale} />
      <BlogCategoryPage
        initialPosts={posts}
        initialCategory={defaultCategory}
        locale={locale}
      />
      <FeedbackForm />
    </div>
  );
}
