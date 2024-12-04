import { FC } from 'react';
import "./Headers.scss";

const Header: FC = () => {
  return (
    <header>
      <div className="header-text">
        <q>Banyumas, Pesona Alam yang Tiada Duanya</q>
        <p>
          Temukan pesona keindahan alam dan kekayaan budaya Banyumas, yang
          menyimpan beragam destinasi wisata memukau
        </p>
      </div>
      <div className="header-image">
        <img className="h-image" src={''} alt="h-image" />
      </div>
    </header>
  );
};

export default Header;