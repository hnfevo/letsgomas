import { useState, useEffect, FC } from "react";
import "./ReviewProfiles.scss";

interface ReviewProfileData {
  title: string;
  imageUrl: string;
}

const ReviewProfiles: FC = () => {
  const [data, setData] = useState<ReviewProfileData>({
    title: "",
    imageUrl: "",
  });

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const data: ReviewProfileData[] = [
          {
            title: "Lokawisata Baturaden",
            imageUrl: "https://via.placeholder.com/60"
          },
        ];
        const firstItem: ReviewProfileData = data[0];
        setData({
          title: firstItem.title,
          imageUrl: firstItem.imageUrl,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="review-profiles">
      <h2>Beri tahu kami tentang kunjungan Anda.</h2>
      {data.imageUrl ? (
        <img
          src={data.imageUrl}
          alt={data.title}
          className="review-image"
        />
      ) : (
        <p className="loading">Loading image...</p>
      )}
      <p className="review-title">{data.title || "Loading title..."}</p>
    </div>
  );
};

export default ReviewProfiles;