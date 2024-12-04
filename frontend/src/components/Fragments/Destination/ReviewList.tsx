import Avatar from "../../Elements/Avatars/Avatars";
import StarRating from "../../Elements/Ratings/StarRatings";
import "./ReviewList.scss";
import { useState, useEffect, FC } from "react";

interface Review {
  avatar: string;
  name: string;
  role: string;
  time: string;
  rating: number;
  text: string;
}

interface ReviewListProps {
  reviews: Review[];
}

const ReviewList: FC<ReviewListProps> = ({ reviews }) => { 
  const [ulasan, setUlasan] = useState<Review[]>([]);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        setUlasan(reviews);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [reviews]); 

  return (
    <div className="review-list">
      {ulasan.length > 0 ? (
        ulasan.map((review: Review, index: number) => (
          <div key={index}>
            <div className="review-card">
              <Avatar
                avatar={review.avatar}
                name={review.name}
                role={review.role}
              />
              <div className="review-result">
                <StarRating
                  className="review-star"
                  size={20}
                  initialRating={review.rating}
                  isEditable={false}
                ></StarRating>
              </div>
              <p className="review-text">{review.text}</p>
            </div>
            {index < ulasan.length - 1 && <hr className="review-separator" />}
          </div>
        ))
      ) : (
        <p className="loading">Loading reviews...</p>
      )}
    </div>
  );
};

export default ReviewList;