import { useState, useEffect, FC } from 'react';

interface StarRatingProps {
  initialRating?: number;
  maxRating?: number;
  size?: number;
  isEditable?: boolean;
  onRatingChange?: (rating: number) => void;
  className?: string;
}

const StarRating: FC<StarRatingProps> = ({
  initialRating = 0,
  maxRating = 5,
  size = 20,
  isEditable = false,
  onRatingChange,
}) => {
  const [hovered, setHovered] = useState<number>(0);
  const [selectedRating, setSelectedRating] = useState<number>(initialRating);

  useEffect(() => {
    console.log("Initial Rating in StarRating:", initialRating); 
    setSelectedRating(initialRating);
  }, [initialRating]);

  const handleClick = (rating: number): void => {
    if (isEditable) {
      setSelectedRating(rating);
      if (onRatingChange) {
        onRatingChange(rating);
      }
    }
  };

  const handleMouseEnter = (rating: number): void => {
    if (isEditable) {
      setHovered(rating);
    }
  };

  const handleMouseLeave = (): void => {
    if (isEditable) {
      setHovered(0);
    }
  };

  return (
    <div>
      {Array.from({ length: maxRating }, (_, i) => i + 1).map((star) => (
        <span
          key={star}
          style={{
            fontSize: `${size}px`,
            color: star <= (hovered || selectedRating) ? "#FFD700" : "#dcdcdc",
            cursor: isEditable ? "pointer" : "default",
          }}
          onClick={() => handleClick(star)}
          onMouseEnter={() => handleMouseEnter(star)}
          onMouseLeave={handleMouseLeave}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;