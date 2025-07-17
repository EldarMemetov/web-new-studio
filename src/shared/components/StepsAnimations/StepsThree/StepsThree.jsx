'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import s from './StepsThree.module.scss';
import { WebText, WebTextDesktop } from '../../GetFullText/WebText';
import useIntersectionObserver from '@/shared/useIntersectionObserver/useIntersectionObserver';

function useIsDesktop(breakpoint = 1440) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const updateMedia = () => {
      setIsDesktop(window.innerWidth >= breakpoint);
    };

    updateMedia();
    window.addEventListener('resize', updateMedia);
    return () => window.removeEventListener('resize', updateMedia);
  }, [breakpoint]);

  return isDesktop;
}

export default function StepsThree() {
  const isDesktop = useIsDesktop();
  const fullText = isDesktop ? WebTextDesktop() : WebText();

  const [printedText, setPrintedText] = useState('');
  const textContainerRef = useRef(null);
  const textInnerRef = useRef(null);

  const lastOverflowRef = useRef(0);

  const isInView = useIntersectionObserver(textContainerRef, {
    threshold: 0.5,
  });

  useEffect(() => {
    if (!isInView) return;

    let index = 0;
    let typingInterval;

    function startTyping() {
      typingInterval = setInterval(() => {
        const next = fullText.slice(0, index + 1);
        setPrintedText(next);
        index++;

        const container = textContainerRef.current;
        const inner = textInnerRef.current;

        if (container && inner) {
          const overflow = inner.scrollHeight - container.clientHeight;
          if (overflow !== lastOverflowRef.current) {
            lastOverflowRef.current = overflow;
            inner.style.transform =
              overflow > 0 ? `translateY(-${overflow}px)` : 'translateY(0)';
          }
        }

        if (index === fullText.length) {
          clearInterval(typingInterval);
          setTimeout(() => {
            index = 0;
            setPrintedText('');
            if (inner) {
              inner.style.transform = 'translateY(0)';
              lastOverflowRef.current = 0;
            }
            startTyping();
          }, 1500);
        }
      }, 60);
    }

    startTyping();
    return () => clearInterval(typingInterval);
  }, [fullText, isInView]);

  return (
    <div className={s.container}>
      <div className={s.imgWrapper}>
        <Image
          src="/image/steps-three.png"
          alt="steps-three"
          className={s.imgThree}
          width={240}
          height={205}
        />
        <Image
          src="/image/steps-three-desktop.png"
          alt="steps-three"
          className={s.imgThreeDesktop}
          width={459}
          height={203}
        />
      </div>
      <div ref={textContainerRef} className={s.textContainer}>
        <div ref={textInnerRef} className={s.textWrapper}>
          <pre>{printedText}</pre>
        </div>
      </div>
    </div>
  );
}
