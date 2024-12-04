import { useState, FC } from "react";
import Header from "../../Fragments/Home/Headers.jsx";
import NavBar from "../../Fragments/Home/NavBars.jsx";
import DestinationCards from "../../Fragments/Home/DestinationCards.jsx";
import "./HomePages.scss";

const HomePages: FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearchChange = (query: string): void => {
    setSearchQuery(query);
  };

  return (
    <div className="home-page">
      <div className="header-1">
        <h1 className="headline">LETSGOMAS</h1>
        <Header />
      </div>
      <div className="bar">
        <NavBar onSearchChange={handleSearchChange} />
        <h2>Objek Wisata di Banyumas</h2>
        <hr />
      </div>
      <DestinationCards searchQuery={searchQuery} />
    </div>
  );
};

export default HomePages;