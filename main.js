// const reviewCount = review_count (database)
// const ratings = rating (database)
// const averageRating = average_rating (database)

const calculateAverageRating = (ratings) => {
  const reviewCount = ratings.length;
  const totalRating = ratings.reduce((total, rating) => total + rating, 0);
  return totalRating / reviewCount;
};

const ratings = [1, 5, 5, 4, 3, 2, 4, 4, 5, 3];
const averageRating = calculateAverageRating(ratings);
console.log("Rating:", averageRating);


