'use client';

import { useState, useEffect, useRef } from 'react';
import SectionBlog from '../SectionBlog/SectionBlog';
import s from './BlogCategoryPage.module.scss';
import Container from '@/shared/container/Container';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import Icon from '@/shared/Icon/Icon';
export default function BlogCategoryPage({
  initialPosts,
  initialCategory,
  locale,
}) {
  const [category, setCategory] = useState(initialCategory);
  const [posts, setPosts] = useState(initialPosts);
  const { t } = useTranslation('BlogCategoryPage');
  const cache = useRef({ [initialCategory]: initialPosts });

  useEffect(() => {
    if (cache.current[category]) {
      setPosts(cache.current[category]);
      return;
    }

    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/posts?category=${category}`);
        if (!res.ok) throw new Error('Ошибка при загрузке');

        const data = await res.json();
        cache.current[category] = data;
        setPosts(data);
      } catch (error) {
        console.error(error);
        setPosts([]);
      }
    };

    fetchPosts();
  }, [category]);

  return (
    <section className={s.section}>
      <Container>
        <div className={s.contentContainer}>
          <div className={s.containerButton}>
            <div className={s.iconContainer}>
              <Icon iconName="icon-filter" className={s.icon} />
            </div>
            <div className={s.buttonItem}>
              <button
                onClick={() => setCategory('web')}
                className={clsx(s.button, category === 'web' && s.buttonActive)}
              >
                {t('web')}
              </button>
            </div>

            <div className={s.buttonItem}>
              <button
                onClick={() => setCategory('video')}
                className={clsx(
                  s.button,
                  category === 'video' && s.buttonActive
                )}
              >
                {t('video')}
              </button>
            </div>
          </div>

          <SectionBlog posts={posts} locale={locale} readText={t('read')} />
        </div>
      </Container>
    </section>
  );
}
