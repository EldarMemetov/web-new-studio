import React from 'react';
import s from './ItemPrivacyPolicy.module.scss';

export default function ItemPrivacyPolicy({ content }) {
  if (!content) return null;

  const points = Array.isArray(content.points) ? content.points : [];
  const subsections = Array.isArray(content.subsections)
    ? content.subsections
    : [];

  const hasPoints = points.length > 0;
  const hasSubsections = subsections.length > 0;

  if (!hasPoints && !hasSubsections) return null;

  return (
    <>
      {hasPoints && (
        <ul className={s.list}>
          {points.map((point, idx) => (
            <li key={idx} className={s.point}>
              {point}
            </li>
          ))}
        </ul>
      )}

      {hasSubsections && (
        <div className={s.subsections}>
          {subsections.map((sub, idx) => (
            <div key={idx} className={s.subsection}>
              {sub.title && <h3 className={s.subtitle}>{sub.title}</h3>}
              {sub.description && (
                <p className={s.point} style={{ marginBottom: 12 }}>
                  {sub.description}
                </p>
              )}
              <ItemPrivacyPolicy content={sub} />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
