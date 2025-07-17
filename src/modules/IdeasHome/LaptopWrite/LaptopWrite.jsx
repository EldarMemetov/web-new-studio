'use client';

import s from './LaptopWrite.module.scss';
import Icon from '@/shared/Icon/Icon';
import { useState, useEffect, useRef } from 'react';
import { GetFullText } from '@/shared/components/GetFullText/GetFullText';

export default function LaptopWrite({ className = '' }) {
  const fullText = GetFullText();
  const [printedText, setPrintedText] = useState('');
  const codeTextRef = useRef(null);
  const textWrapperRef = useRef(null);
  const lastOverflowRef = useRef(null);

  useEffect(() => {
    let index = 0;
    let typingInterval;

    function startTyping() {
      typingInterval = setInterval(() => {
        const next = fullText.slice(0, index + 1);
        setPrintedText(next);
        index++;

        const container = codeTextRef.current;
        const inner = textWrapperRef.current;

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
            if (textWrapperRef.current) {
              textWrapperRef.current.style.transform = 'translateY(0)';
              lastOverflowRef.current = null;
            }
            startTyping();
          }, 1500);
        }
      }, 60);
    }

    startTyping();
    return () => clearInterval(typingInterval);
  }, [fullText]);

  const combinedClassName = `${s.imageWrapper} ${className || ''}`;

  return (
    <div className={combinedClassName}>
      <Icon iconName="icon-laptop" className={s.monitorImg} />
      <div className={s.screenWrapper} ref={codeTextRef}>
        <div className={s.textWrapper} ref={textWrapperRef}>
          <pre>{printedText}</pre>
        </div>
      </div>
    </div>
  );
}
