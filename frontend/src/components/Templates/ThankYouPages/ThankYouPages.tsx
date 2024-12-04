import IconBacks from "../../../assets/Icons/Icon_Back.png";
import Button from "../../Elements/Buttons/Buttons.js";
import "./ThankYouPages.scss";
import { useNavigate } from "react-router-dom";
import { FC } from 'react';

const ThankYouPages: FC = () => {
  const navigate: (to: string) => void = useNavigate();

  return (
    <div className="thank-you">
      <div className="thank">
        <h1>Terima Kasih Atas Ulasan Anda!</h1>
        <p>
          Semoga pengalaman Anda mengunjungi situs kami dapat membantu Anda
          merencanakan perjalanan yang menyenangkan. Jangan ragu untuk kembali
          mengunjungi website kami, dan kami siap membantu Anda dalam setiap
          rencana liburan ke destinasi wisata yang Anda impikan
        </p>
      </div>
      <Button
        label="Kembali"
        icon={<img src={IconBacks} alt="Back Icon" width={16} height={16} />}
        className="btn-back"
        onClick={() => navigate("/")} // This is correct
      />
    </div>
  );
};

export default ThankYouPages;