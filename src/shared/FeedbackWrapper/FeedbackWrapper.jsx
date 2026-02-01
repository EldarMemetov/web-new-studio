'use client';

import dynamic from 'next/dynamic';

const FeedbackForm = dynamic(
  () => import('@/modules/FeedbackForm/FeedbackForm'),
  { ssr: false }
);

export default function FeedbackWrapper() {
  return <FeedbackForm />;
}
