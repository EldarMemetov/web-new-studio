'use client';

import React from 'react';
import s from './ServicesList.module.scss';
import { FiVideo, FiCode, FiLayers, FiPlus, FiStar } from 'react-icons/fi';

const ICON_MAP = {
  web: FiCode, // Website Development
  video: FiVideo, // Video Production
  complete: FiLayers, // Complete Brand Presence
};

export default function ServicesList({ items }) {
  if (!items?.length) return null;

  const featured = items.find((i) => i.featured) || items[items.length - 1];
  const base = items.filter((i) => i !== featured);
  const FeaturedIcon = ICON_MAP[featured.id] || FiLayers;

  return (
    <div className={s.flow}>
      {/* ВХОДЫ */}
      <div className={s.inputs}>
        {base.map((item, i) => {
          const Icon = ICON_MAP[item.id] || FiCode;
          return (
            <React.Fragment key={item.id}>
              {i > 0 && (
                <span className={s.plus} aria-hidden="true">
                  <FiPlus />
                </span>
              )}
              <div className={s.node}>
                <span className={s.nodeIcon}>
                  <Icon />
                </span>
                <h3 className={s.nodeTitle}>{item.title}</h3>
                <p className={s.nodeInfo}>{item.info}</p>
                {item.highlight && (
                  <span className={s.nodeTag}>{item.highlight}</span>
                )}
              </div>
            </React.Fragment>
          );
        })}
      </div>

      <span className={s.connector} aria-hidden="true">
        <span className={s.connectorDot} />
      </span>

      <div className={s.result}>
        <span className={s.resultGlow} aria-hidden="true" />
        <span className={s.resultBadge} aria-hidden="true">
          <FiStar />
        </span>

        <span className={s.resultIcon}>
          <FeaturedIcon />
        </span>
        <h3 className={s.resultTitle}>{featured.title}</h3>
        <p className={s.resultInfo}>{featured.info}</p>
        {featured.highlight && (
          <span className={s.resultTag}>{featured.highlight}</span>
        )}
      </div>
    </div>
  );
}
