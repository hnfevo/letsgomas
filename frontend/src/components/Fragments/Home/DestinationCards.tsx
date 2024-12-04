import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cards from '../../Elements/Cards/Cards';

interface Card {
  id: number;
  title: string;
  rating: number;
  category: string;
  images: string[];
  mapLink: string;
  isEditable?: boolean;  
  isSearchPage: boolean;
  location: string;
}

interface DestinationCardsProps {
  searchQuery: string;
}

const DestinationCards: FC<DestinationCardsProps> = ({ searchQuery }) => {
  const [cards] = useState<Card[]>([
    {
      id: 1,
      title: 'Lokawisata Baturaden',
      rating: 4,
      category: 'Taman wisata',
      images: [
        'https://via.placeholder.com/60',
        'https://via.placeholder.com/60',
        'https://via.placeholder.com/60',
        'https://via.placeholder.com/60',
      ],
      mapLink: 'https://maps.app.goo.gl/YZSY8fv7oXQC5dWy9',
      isEditable: true,  
      isSearchPage: false,
      location: 'Baturaden, Indonesia',
    },
    {
      id: 2,
      title: 'Curug Jenggala',
      rating: 5,
      category: 'Air Terjun',
      images: [
        'https://via.placeholder.com/60',
        'https://via.placeholder.com/60',
        'https://via.placeholder.com/60',
        'https://via.placeholder.com/60',
      ],
      mapLink: 'https://maps.app.goo.gl/bKDMnBkFc8qQDNFm9',
      isEditable: false,  
      isSearchPage: false,
      location: 'Jenggala, Indonesia',
    },
    {
      id: 3,
      title: 'Curug Bayan',
      rating: 4,
      category: 'Air Terjun',
      images: [
        'https://via.placeholder.com/60',
        'https://via.placeholder.com/60',
        'https://via.placeholder.com/60',
        'https://via.placeholder.com/60',
      ],
      mapLink: 'https://maps.app.goo.gl/xr7aqHYaLJwH2CyA9',
      isEditable: true, 
      isSearchPage: false,
      location: 'Bayan, Indonesia',
    },
  ]);

  const filteredCards: Card[] = cards.filter((card) =>
    card.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const navigate = useNavigate();

  return (
    <div className="d-card">
      {filteredCards.length > 0 ? (
        filteredCards.map((card) => (
          <div
            key={card.id}
            onClick={() => navigate(`/DestinationPages/${card.id}`)}
          >
            <Cards
              title={card.title}
              rating={card.rating}
              isEditable={card.isEditable || false}
              category={card.category}
              images={card.images}
              mapLink={card.mapLink}
              isSearchPage={card.isSearchPage}
              location={card.location}
            />
          </div>
        ))
      ) : (
        <p className="no-cards">
          Tidak ada tujuan yang cocok dengan pencarian Anda.
        </p>
      )}
    </div>
  );
};

export default DestinationCards;