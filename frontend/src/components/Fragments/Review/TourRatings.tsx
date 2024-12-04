import StarRating from "../../Elements/Ratings/StarRatings.jsx";
import './TourRatings.scss';
import { FC } from 'react';

interface TourRatingsProps {
  onRatingChange: (rating: number) => void;
}

const TourRatings: FC<TourRatingsProps> = ({ onRatingChange }) => {
  return (
    <div className="tour-ratings">
      <h2>Berikan penilaian tentang pengalaman Anda</h2>
      <StarRating
        className="tour-star"
        size={75}
        isEditable={true}
        onRatingChange={onRatingChange} 
      />
    </div>
  );
};

export default TourRatings;