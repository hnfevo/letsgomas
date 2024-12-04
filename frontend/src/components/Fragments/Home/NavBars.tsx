import { useState, FC } from "react";
import "../Home/NavBars.scss";
import Button from "../../Elements/Buttons/Buttons";
import Inputs from "../../Elements/Inputs/Inputs";
import searchIcon from "../../../assets/Icons/Icon_Search.png";
import { useNavigate } from "react-router-dom";

interface NavBarsProps {
  onSearchChange: (value: string) => void;
}

const NavBars: FC<NavBarsProps> = ({ onSearchChange }) => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState<string>("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value: string = e.target.value;
    setSearchValue(value);
    onSearchChange(value); 
  };

  return (
    <div className="nav-bar">
      <h2>LETSGOMAS</h2>
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
          placeholder="Cari"
          className="search-input"
          value={searchValue}
          onChange={handleSearchChange}
        />
      </div>
      <Button
        label="Ulasan"
        className="btn-review"
        onClick={() => navigate("/SearchPages")}
      />
    </div>
  );
};

export default NavBars;