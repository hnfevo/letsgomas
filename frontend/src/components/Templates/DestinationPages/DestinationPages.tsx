import IconBacks from "../../../assets/Icons/Icon_Back.png";
import IconMaps from "../../../assets/Icons/Icon_Maps.png";
import IconUp from "../../../assets/Icons/Icon_Up.png";
import IconDown from "../../../assets/Icons/Icon_Down.png";
import Button from "../../Elements/Buttons/Buttons";
import DestinationProfiles from "../../Fragments/Destination/DestinationProfiles";
import ReviewList from "../../Fragments/Destination/ReviewList";
import "./DestinationPages.scss";
import { useState, useEffect, FC } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Review {
  id: number;
  avatar: string;
  name: string;
  role: string;
  time: string;
  rating: number;
  text: string;
}

interface Destination {
  id: string;
  title: string;
  rating: number;
  images: string[];
  description: string;
  reviews: Review[];
}

const DestinationPages: FC = () => {
  const [destination, setDestination] = useState<Destination | null>(null);
  const [showReviews, setShowReviews] = useState<boolean>(false);

  const navigate = useNavigate();
  const { destinationId } = useParams<{ destinationId: string }>(); 

  useEffect(() => {
    const destinations: Destination[] = [
      {
        id: "1",
        title: "Lokawisata Baturaden",
        rating: 4,
        images: [
          "https://via.placeholder.com/150",
          "https://via.placeholder.com/150",
          "https://via.placeholder.com/150",
          "https://via.placeholder.com/150",
        ],
        description: "Lokawisata Baturaden adalah salah satu destinasi wisata alam populer yang terletak di lereng Gunung Slamet.",
        reviews: [
          {
            id: 1,
            avatar: "https://via.placeholder.com/50",
            name: "Janjang Purwoko",
            role: "Pengunjung Lokal",
            time: "1 bulan lalu",
            rating: 4,
            text: "Baturaden mudah diakses dari Purwokerto, hanya sekitar 15 km dari pusat kota. Selain itu, fasilitas pendukung seperti area parkir, mushola, dan tempat makan cukup memadai.",
          },
          {
            id: 2,
            avatar: "https://via.placeholder.com/50",
            name: "Fakhri Aiman",
            role: "Pengunjung Lokal",
            time: "2 bulan lalu",
            rating: 5,
            text: "Lokawisata Baturaden menawarkan berbagai fasilitas dan wahana, mulai dari kebun bunga hingga wahana edukasi seperti Teater Alam.",
          },
        ],
      },
      {
        id: "2",
        title: "Curug Jenggala",
        rating: 5,
        images: [
          "https://via.placeholder.com/150",
          "https://via.placeholder.com/150",
          "https://via.placeholder.com/150",
          "https://via.placeholder.com/150",
        ],
        description: "Curug Jenggala menawarkan keindahan air terjun dengan suasana yang sejuk dan asri.",
        reviews: [
          {
            id: 1,
            avatar: "https://via.placeholder.com/50",
            name: "Adiansyah",
            role: "Pengunjung Lokal",
            time: "2 bulan lalu",
            rating: 5,
            text: "Curug Jenggala menawarkan pemandangan yang menakjubkan dengan udara segar dan lingkungan yang asri.",
          },
        ],
      },
      {
        id: "3",
        title: "Curug Bayan",
        rating: 4,
        images: [
          "https://via.placeholder.com/150",
          "https://via.placeholder.com/150",
          "https://via.placeholder.com/150",
          "https://via.placeholder.com/150",
        ],
        description: "Curug Bayan adalah destinasi wisata alam dengan pemandangan air terjun yang memukau.",
        reviews: [
          {
            id: 1,
            avatar: "https://via.placeholder.com/50",
            name: "Taufik",
            role: "Pengunjung Lokal",
            time: "1 bulan lalu",
            rating: 4,
            text: "Air terjun Curug Bayan sangat memukau, namun akses menuju ke sana bisa sedikit sulit.",
          },
        ],
      },
    ];

    const selectedDestination = destinations.find(
      (dest) => dest.id === destinationId
    );
    setDestination(selectedDestination || null);
  }, [destinationId]);

  const toggleReviews = (): void => {
    setShowReviews(!showReviews);
  };

  if (!destination) {
    return <p>Loading destination...</p>;
  }

  return (
    <div className="destination-page">
      <Button
        label="Kembali"
        icon={<img src={IconBacks} alt="Back Icon" width={16} height={16} />}
        className="btn-back"
        onClick={() => navigate("/")}
      />
      <DestinationProfiles destination={destination} />
      <div className="destination-bottom">
        <div className="btn-destination">
          <Button
            label={showReviews ? "Tampilkan Ulasan" : "Tampilkan Ulasan"}
            icon={
              <img
                src={showReviews ? IconDown : IconUp}
                alt={showReviews ? "Hide Icon" : "Show Icon"}
                width={22}
                height={17}
                className="toggle-reviews"
              />
            }
            iconPosition="right"
            className="btn-show"
            onClick={toggleReviews}
          />
          <Button
            label="Dapatkan Rute"
            icon={<img src={IconMaps} alt="Maps Icon" width={31} height={32} />}
            className="btn-route2"
          />
        </div>
        {showReviews && <ReviewList reviews={destination.reviews} />}
      </div>
    </div>
  );
};

export default DestinationPages;