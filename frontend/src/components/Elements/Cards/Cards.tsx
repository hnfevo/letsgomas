import { FC } from 'react';
import Button from "../Buttons/Buttons";
import StarRating from "../Ratings/StarRatings";
import "./Cards.scss";

interface CardsProps {
  title: string;
  category: string;
  images: string[];
  mapLink?: string;
  rating?: number;
  isEditable: boolean;
  isSearchPage: boolean;
  location: string;
}

const Cards: FC<CardsProps> = ({
  title,
  category,
  images,
  mapLink,
  rating,
  isEditable,
  isSearchPage,
  location,
}) => {
  const GetRoute = (): void => {
    if (mapLink) {
      window.open(mapLink, "_blank");
    } else {
      alert("Link peta tidak tersedia");
    }
  };

  return (
    <div className={`card ${isSearchPage ? "search-page" : ""}`}>
      <div className="card-info">
        <h3>{title}</h3>
        {!isSearchPage && rating !== undefined && (
          <div className="rating">
            <StarRating
              initialRating={rating}
              maxRating={5}
              size={30}
              isEditable={isEditable}
            />
          </div>
        )}
        <p>{isSearchPage ? location : category}</p>
        {!isSearchPage && (
          <Button
            label="Dapatkan Rute"
            className="btn-route1"
            onClick={GetRoute}
          />
        )}
      </div>
      <div className="card-right">
        <div className="image-gallery">
          {isSearchPage ? (
            <img src={images[0]} alt={`${title} 1`} />
          ) : (
            images.map((image: string, index: number) => (
              <img key={index} src={image} alt={`${title} ${index}`} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Cards;