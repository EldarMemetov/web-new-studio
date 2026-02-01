'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { GetReviews } from '@/services/api';

const ReviewsContext = createContext();

export function ReviewsSection({ initialReviews = [], children }) {
  const [reviews, setReviews] = useState(initialReviews);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await GetReviews();
        setReviews(data);
      } catch (err) {
        console.error('Ошибка получения отзывов', err);
      }
    };
    fetchReviews();
  }, []);

  const addReview = (newReview) => setReviews((prev) => [newReview, ...prev]);
  const updateReview = (updated) =>
    setReviews((prev) =>
      prev.map((r) => (r._id === updated._id ? updated : r))
    );

  return (
    <ReviewsContext.Provider value={{ reviews, addReview, updateReview }}>
      {children}
    </ReviewsContext.Provider>
  );
}

export function useReviews() {
  const context = useContext(ReviewsContext);
  if (!context)
    throw new Error('useReviews must be used within a ReviewsProvider');
  return context;
}
