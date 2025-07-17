import { gsap } from 'gsap';

export function handleHoverAnimation(rocketEl, smokeEl) {
  const tl = gsap.timeline();

  tl.to(rocketEl, {
    x: '+=5',
    duration: 0.05,
    repeat: 5,
    yoyo: true,
    ease: 'power1.inOut',
  });

  tl.to(rocketEl, {
    y: -20,
    duration: 0.3,
    ease: 'power1.out',
  }).to(rocketEl, {
    y: 0,
    duration: 0.3,
    ease: 'power1.inOut',
  });

  tl.to(
    smokeEl,
    {
      opacity: 0.3,
      duration: 0.2,
      ease: 'power1.inOut',
    },
    0
  ).to(
    smokeEl,
    {
      opacity: 0,
      duration: 0.4,
      ease: 'power1.out',
    },
    '+=0.2'
  );
}

export function handleSubmitAnimation(
  rocketEl,
  smokeEl,
  message,
  resetForm,
  setSubmissionStatus,
  setModalVisible
) {
  const tl = gsap.timeline();

  tl.to(rocketEl, {
    x: '+=5',
    duration: 0.05,
    repeat: 5,
    yoyo: true,
    ease: 'power1.inOut',
  });

  tl.to(
    smokeEl,
    {
      opacity: 0.6,
      duration: 0.3,
      ease: 'power1.inOut',
    },
    '<'
  );

  tl.to(rocketEl, {
    y: -300,
    opacity: 0,
    duration: 1.2,
    ease: 'power2.in',
  });

  tl.to(
    smokeEl,
    {
      opacity: 0,
      duration: 0.4,
      ease: 'power1.out',
    },
    '-=0.8'
  );

  tl.add(() => {
    setSubmissionStatus({ type: 'success', message });

    setModalVisible(true);

    resetForm();

    gsap.set(rocketEl, { y: 0, opacity: 1 });
  });
}
