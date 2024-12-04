import IconBacks from "../../../assets/Icons/Icon_Back.png";
import Button from "../../Elements/Buttons/Buttons";
import TourRating from "../../Fragments/Review/TourRatings";
import ReviewForm from "../../Fragments/Review/ReviewForms";
import ReviewProfiles from "../../Fragments/Review/ReviewProfiles";
import "./ReviewPages.scss";
import { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

const ReviewPages: React.FC = () => {
  const [rating, setRating] = useState<number>(0); 
  const [reviewText, setReviewText] = useState<string>("");  
  const navigate = useNavigate();

  const handleRatingChange = (newRating: number): void => {
    setRating(newRating);  
  };

  const handleReviewChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    setReviewText(event.target.value);  
  };

  const isSubmitDisabled: boolean = rating === 0 || reviewText.trim() === ""; 
  const handleSubmit = (): void => {
    console.log("Ulasan dikirim");
    navigate("/ThankYouPages");  
  };

  return (
    <div className="review-page">
      <div className="review-page1">
        <Button
          label="Kembali"
          icon={<img src={IconBacks} alt="Back Icon" width={16} height={16} />}
          className="btn-back"
          onClick={() => navigate("/")}
        />
        <ReviewProfiles />
      </div>
      <line></line>
      <div className="review-page2">
        <TourRating 
          onRatingChange={handleRatingChange}
        />
        <ReviewForm 
          reviewText={reviewText} 
          onReviewChange={handleReviewChange}  
        />
        <Button
          label="Kirim"
          className="btn-send"
          onClick={handleSubmit}  
          disabled={isSubmitDisabled}  
        />
      </div>
    </div>
  );
};

export default ReviewPages;