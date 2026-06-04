'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import s from '../AboutSection.module.scss';

export default function AboutAnimated({ data }) {
  const refs = useRef([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add(s.in);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const addRef = (i) => (el) => {
    refs.current[i] = el;
  };

  return (
    <div className={s.wrap}>
      <p className={s.eyebrow} ref={addRef(0)}>
        {data.eyebrow}
      </p>
      <h2 className={s.h2} ref={addRef(1)}>
        {data.projectName.split(' ')[0]}{' '}
        <span>{data.projectName.split(' ').slice(1).join(' ')}</span>
      </h2>
      <p className={s.subtitle} ref={addRef(2)}>
        {data.projectSubtitle}
      </p>

      <div className={s.grid}>
        <div className={s.imgWrap} ref={addRef(3)}>
          <div className={s.imgInner}>
            <Image
              src="/image/eldar.jpg"
              alt="QVRIX"
              fill
              className={s.image}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className={s.imgGlow} />
          </div>
          <div className={s.badge}>
            <span className={s.badgeDot} />
            <span className={s.badgeText}>{data.badge}</span>
          </div>
        </div>

        <div className={s.textSide} ref={addRef(4)}>
          <h3 className={s.quote}>{data.quote}</h3>
          <p className={s.p}>{data.paragraph1}</p>
          <p className={s.p}>{data.paragraph2}</p>

          <div className={s.tags}>
            {data.tags.map((tag, i) => (
              <span key={i} className={s.tag}>
                {tag}
              </span>
            ))}
          </div>

          <div className={s.stats}>
            {data.stats.map((stat, i) => (
              <div
                key={i}
                className={s.stat}
                ref={addRef(5 + i)}
                style={{ transitionDelay: `${0.1 * i}s` }}
              >
                <div className={s.statN}>{stat.value}</div>
                <div className={s.statL}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
