import Image from 'next/image';
import Link from 'next/link';
import Button from '@/shared/components/button/Button';
import s from './PortfolioItem.module.scss';

export default function PortfolioItem({ id, locale, project, ctaLabel }) {
  if (!project || !project.image1) return null;
  return (
    <div className={s.imageWrapper}>
      <Image
        src={project.image1}
        alt={project.title}
        className={s.portfolioImage}
        width={1062}
        height={640}
      />

      <div className={s.overlay}>
        <Link href={`/${locale}/web-development/${id}`}>
          <Button variant="variant10">{ctaLabel}</Button>
        </Link>
      </div>
    </div>
  );
}
