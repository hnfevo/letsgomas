class Ulasan {
  constructor(ulasanId, userId, wisataId, rating, ulasan, tanggalBuat) {
    this.ulasanId = ulasanId;
    this.userId = userId;
    this.wisataId = wisataId;
    this.rating = rating;
    this.ulasan = ulasan;
    this.tanggalBuat = tanggalBuat;
  }

  getInfoUlasan() {
    return {
      ulasanId: this.ulasanId,
      userId: this.userId,
      wisataId: this.wisataId,
      rating: this.rating,
      ulasan: this.ulasan,
      tanggalBuat: this.tanggalBuat,
    };
  }

  updateUlasan(newText) {
    this.ulasan = newText;
  }

  updateRating(newRating) {
    if (newRating >= 1 && newRating <= 5) {
      this.rating = newRating;
    } else {
      console.log('Rating harus antara 1 hingga 5.');
    }
  }
}

const review = new Ulasan('1FU318HQ', 'user_1', 'place_1', 4, 'Tempatnya sangat indah dan bersih.', new Date('2024-10-29'));

console.log(review.getInfoUlasan());

review.updateUlasan('Tempatnya sangat indah, bersih, dan nyaman.');
console.log(review.getInfoUlasan());

review.updateRating(5);
console.log(review.getInfoUlasan());
