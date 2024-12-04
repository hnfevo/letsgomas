import React, { FC } from 'react';
import './ReviewForms.scss';

interface ReviewFormsProps {
  reviewText: string;
  onReviewChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const ReviewForms: FC<ReviewFormsProps> = ({ reviewText, onReviewChange }) => {
  return (
    <div className="review-form">
      <h2>Tulis Ulasan</h2>
      <textarea
        maxLength={280}
        className="review-input"
        placeholder="Bagikan detail pengalaman Anda sendiri di tempat ini"
        value={reviewText}
        onChange={onReviewChange}
      />
    </div>
  );
};

export default ReviewForms;