import { handleError } from '@/utils/errorHandler';

export const sendFeedback = async (data) => {
  try {
    const res = await fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Server error');
    }

    return await res.json();
  } catch (error) {
    throw handleError(error);
  }
};
