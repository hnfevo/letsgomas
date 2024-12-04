import HomePages from "../Templates/HomePages/HomePages";
import SearchPages from "../Templates/SearchPages/SearchPages";
import DestinationPages from "../Templates/DestinationPages/DestinationPages";
import ReviewPages from "../Templates/ReviewPages/ReviewPages";
import ThankYouPages from "../Templates/ThankYouPages/ThankYouPages";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FC } from 'react';

const MainPages: FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePages />} />
        <Route path="/SearchPages" element={<SearchPages />} />
        <Route path="/DestinationPages/:destinationId" element={<DestinationPages />} />
        <Route path="/ReviewPages" element={<ReviewPages />} />
        <Route path="/ThankYouPages" element={<ThankYouPages />} />
      </Routes>
    </Router>
  );
};

export default MainPages;