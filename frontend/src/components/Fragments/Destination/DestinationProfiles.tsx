import { FC } from 'react';
import StarRating from "../../Elements/Ratings/StarRatings";
import "./DestinationProfiles.scss";

interface Destination {
  title: string;
  rating: number;
  images: string[];
  description: string;
}

interface DestinationProfilesProps {
  destination: Destination;
}

const DestinationProfiles: FC<DestinationProfilesProps> = ({ destination }) => {
  return (
    <div className="destination-profiles">
      <p className="destination-title">{destination.title || "Loading title..."}</p>
      <div className="destination-rating">
        <StarRating
          size={30}
          initialRating={destination.rating || 0}
          isEditable={false}
        />
      </div>
      <div className="scrollable-container">
        <div className="image-container">
          {destination.images && destination.images.length > 0 ? (
            destination.images.map((image: string, index: number) => (
              <img
                key={index}
                alt={`${destination.title} ${index + 1}`}
                src={image}
                className="destination-image"
              />
            ))
          ) : (
            <p className="loading">Loading images...</p>
          )}
        </div>
      </div>
      <p className="destination-description">
        {destination.description || "No description available"}
      </p>
    </div>
  );
};

export default DestinationProfiles;