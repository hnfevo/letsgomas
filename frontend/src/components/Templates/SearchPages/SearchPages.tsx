import IconBacks from "../../../assets/Icons/Icon_Back.png";
import searchIcon from "../../../assets/Icons/Icon_Search.png";
import Button from "../../Elements/Buttons/Buttons.jsx";
import Inputs from "../../Elements/Inputs/Inputs.jsx";
import Cards from "../../Elements/Cards/Cards.jsx";
import Header from "../../Fragments/Home/Headers.jsx";
import "./SearchPages.scss";
import { useState, FC } from "react";
import { useNavigate } from "react-router-dom";

interface Card {
  id: number;
  title: string;
  category: string;
  location: string;
  images: string[];
  mapLink: string;
}

const SearchPages: FC = () => {
  const [cards] = useState<Card[]>([
    {
      id: 1,
      title: "Lokawisata Baturaden",
      category: "Taman wisata",
      location: "Banyumas",
      images: [
        "https://via.placeholder.com/60",
        "https://via.placeholder.com/60",
        "https://via.placeholder.com/60",
        "https://via.placeholder.com/60",
      ],
      mapLink: "https://maps.app.goo.gl/YZSY8fv7oXQC5dWy9",
    },
    {
      id: 2,
      title: "Taman Nasional Baluran",
      category: "Taman wisata",
      location: "Situbondo",
      images: [
        "https://via.placeholder.com/60",
        "https://via.placeholder.com/60",
        "https://via.placeholder.com/60",
        "https://via.placeholder.com/60",
      ],
      mapLink: "https://maps.app.goo.gl/YZSY8fv7oXQC5dWy9",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const navigate = useNavigate();

  const filteredCards = cards.filter((card) =>
    card.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="header-2">
        <Button
          className="btn-back"
          label="Kembali"
          icon={<img src={IconBacks} alt="Back Icon" width={16} height={16} />}
          onClick={() => navigate("/")}
        />
        <Header />
      </div>

      <div className="s-content">
        <h2>
          Tulis ulasan, bantu wisatawan lain menikmati trip yang lebih
          menyengangkan
        </h2>
        <div className="search-bar">
          <img
            src={searchIcon}
            className="search-icon"
            alt="Search Icon"
            width={35}
            height={35}
          />
          <Inputs
            type="text"
            placeholder="Cari destinasi yang ingin Anda diulas"
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}  
          />
        </div>
        
        <div className="card-1" onClick={() => navigate("/ReviewPages")}>
          {filteredCards.length > 0 ? (
            filteredCards.map((card: Card) => (
              <Cards
                key={card.id}
                title={card.title}
                category={card.category}
                location={card.location}
                images={card.images}
                isSearchPage={true}
                isEditable={false} 
              />
            ))
          ) : (
            <p>Tidak ada tujuan yang cocok dengan pencarian Anda.</p> 
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPages;