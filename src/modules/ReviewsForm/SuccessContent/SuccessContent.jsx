'use client';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import Button from '@/shared/components/button/Button';
import s from './SuccessContent.module.scss';
import Image from 'next/image';
import Link from 'next/link';

export default function SuccessContent({ onClose }) {
  const { t } = useTranslation('successContent');
  const canvasRef = useRef(null);

  useEffect(() => {
    const myCanvas = canvasRef.current;
    if (!myCanvas) return;

    myCanvas.width = window.innerWidth;
    myCanvas.height = window.innerHeight;
    const myConfetti = confetti.create(myCanvas, { resize: true });

    myConfetti({
      particleCount: 150,
      spread: 80,
      origin: { x: 0.5, y: 0.3 },
    });

    let repeatCount = 0;
    const interval = setInterval(() => {
      if (repeatCount >= 3) {
        clearInterval(interval);
        return;
      }
      myConfetti({
        particleCount: 80,
        spread: 100,
        origin: { x: Math.random(), y: Math.random() * 0.5 },
      });
      repeatCount++;
    }, 400);
  }, []);

  return (
    <div className={s.containerContent}>
      <canvas ref={canvasRef} className={s.confettiCanvas} />
      <div className={s.iconWrapper}>
        <Image
          src="/image/rocket-yes.png"
          alt="rocket-yes"
          width={563}
          height={586}
          className={s.image}
        />
      </div>

      <h2 className={s.title}>{t('reviewAcceptedTitle')}</h2>
      <h3 className={s.subtitle}>{t('reviewAcceptedSubtitle')}</h3>

      <Link href="/" className={s.button} onClick={onClose}>
        <Button as="div" variant="variant5">
          {t('backToHome')}
        </Button>
      </Link>
    </div>
  );
}
