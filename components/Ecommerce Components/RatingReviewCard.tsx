"use client";

import { useState } from "react";

export interface RatingReviewCardProps {
  username?: string;
  review?: string;
  initialRating?: number;
}

export default function RatingReviewCard({
  username = "Ayla Rivera",
  review = "Great quality and super fast delivery. Worth the price.",
  initialRating = 4,
}: RatingReviewCardProps) {
  const [rating, setRating] = useState(initialRating);

  return (
    <div className="w-full max-w-sm rounded-2xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold">{username}</p>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button key={star} type="button" onClick={() => setRating(star)} className={`text-sm ${star <= rating ? "text-yellow-500" : "text-neutral-300 dark:text-neutral-700"}`}>
              ★
            </button>
          ))}
        </div>
      </div>
      <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">{review}</p>
    </div>
  );
}
