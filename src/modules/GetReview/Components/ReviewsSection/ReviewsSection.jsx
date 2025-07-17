"use client";
import React, { createContext, useContext, useState } from "react";

const ReviewsContext = createContext();

export function ReviewsSection({ initialReviews = [], children } = {}) {
  const [reviews, setReviews] = useState(initialReviews);

  const addReview = (newReview) => {
    setReviews((prevReviews) => [newReview, ...prevReviews]);
  };

  return (
    <ReviewsContext.Provider value={{ reviews, addReview }}>
      {children}
    </ReviewsContext.Provider>
  );
}

export function useReviews() {
  const context = useContext(ReviewsContext);
  if (!context) {
    throw new Error("useReviews must be used within a ReviewsProvider");
  }
  return context;
}
