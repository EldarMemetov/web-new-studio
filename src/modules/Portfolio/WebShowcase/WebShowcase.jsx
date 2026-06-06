'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/shared/components/button/Button';
import s from './WebShowcase.module.scss';

const INTERVAL = 3000;

export default function WebShowcase({ locale, projects = [], ctaLabel }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = projects.length;

  useEffect(() => {
    if (paused || total <= 1) return;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % total);
    }, INTERVAL);
    return () => clearInterval(id);
  }, [paused, total]);

  if (!total) return null;

  return (
    <div
      className={s.frame}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      data-paused={paused ? 'true' : 'false'}
    >
      <span className={s.cornerTL} aria-hidden="true" />
      <span className={s.cornerTR} aria-hidden="true" />
      <span className={s.cornerBL} aria-hidden="true" />
      <span className={s.cornerBR} aria-hidden="true" />

      <div className={s.stage}>
        {projects.map(([id, project], i) => {
          if (!project || !project.image1) return null;
          return (
            <div
              key={id}
              className={`${s.slide} ${i === active ? s.active : ''}`}
              aria-hidden={i !== active}
            >
              <Image
                src={project.image1}
                alt={project.title || ''}
                className={s.image}
                width={1224}
                height={720}
                priority={i === 0}
              />
              <span className={s.gradient} aria-hidden="true" />

              <div className={s.meta}>
                <span className={s.metaIndex}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                {project.title && (
                  <h5 className={s.metaTitle}>{project.title}</h5>
                )}
              </div>

              <div className={s.overlay}>
                <Link
                  href={`/${locale}/web-development/${id}`}
                  className={s.ctaLink}
                >
                  <Button variant="variant10">{ctaLabel}</Button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      <div className={s.progress} aria-hidden="true">
        <div className={s.progressBar} key={`bar-${active}-${paused}`} />
      </div>

      <div className={s.dots} role="tablist" aria-label="Web projects">
        {projects.map(([id], i) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={i === active}
            className={`${s.dot} ${i === active ? s.dotActive : ''}`}
            onClick={() => setActive(i)}
            aria-label={`Project ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
