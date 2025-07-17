'use client';
import { useEffect, useRef, useState } from 'react';

export default function AnimatedCounter({ targetNumber, duration = 1000 }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef();
  const startTimeRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          requestAnimationFrame(animate);
          setHasAnimated(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [hasAnimated]);

  const animate = (timestamp) => {
    if (!startTimeRef.current) startTimeRef.current = timestamp;

    const progress = timestamp - startTimeRef.current;
    const progressRatio = Math.min(progress / duration, 1);
    const currentValue = Math.floor(progressRatio * targetNumber);

    setCount(currentValue);

    if (progress < duration) {
      requestAnimationFrame(animate);
    } else {
      setCount(targetNumber);
    }
  };

  return <span ref={ref}>{count}</span>;
}
