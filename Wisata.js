class Wisata {
  constructor(wisataId, nama, lokasi, alamat, deskripsi, jamBuka, jamTutup, kontakInfo, gambar, rataRataRating = 0, jumlahUlasan = 0) {
    this.wisataId = wisataId;
    this.nama = nama;
    this.lokasi = lokasi;
    this.alamat = alamat;
    this.deskripsi = deskripsi;
    this.jamBuka = jamBuka;
    this.jamTutup = jamTutup;
    this.kontakInfo = kontakInfo;
    this.gambar = gambar;
    this.rataRataRating = rataRataRating;
    this.jumlahUlasan = jumlahUlasan;
  }

  getInfoWisata() {
    return {
      wisataId: this.wisataId,
      nama: this.nama,
      lokasi: this.lokasi,
      alamat: this.alamat,
      deskripsi: this.deskripsi,
      jamBuka: this.jamBuka,
      jamTutup: this.jamTutup,
      kontakInfo: this.kontakInfo,
      gambar: this.gambar,
      rataRataRating: this.rataRataRating,
      jumlahUlasan: this.jumlahUlasan,
    };
  }

  updateInfoWisata(data) {
    if (data.nama) this.nama = data.nama;
    if (data.lokasi) this.lokasi = data.lokasi;
    if (data.alamat) this.alamat = data.alamat;
    if (data.deskripsi) this.deskripsi = data.deskripsi;
    if (data.jamBuka) this.jamBuka = data.jamBuka;
    if (data.kontakInfo) this.kontakInfo = data.kontakInfo;
    if (data.gambar) this.gambar = data.gambar;
    if (data.rataRataRating) this.rataRataRating = data.rataRataRating;
    if (data.jumlahUlasan) this.jumlahUlasan = data.jumlahUlasan;
  }

  hitungRataRataRating(newRating) {
    const totalRating = this.rataRataRating * this.jumlahUlasan;
    this.jumlahUlasan += 1;
    this.rataRataRating = (totalRating + newRating) / this.jumlahUlasan;
  }
}

const wisata = new Wisata(
  '1RW341RED',
  'Curug Jenggala',
  { latitude: -8.4095, longitude: 115.1889 },
  'Jl. Pangeran Limboro, Dusun III Kalipagu, Ketenger, Kec. Baturaden, Kabupaten Banyumas, Jawa Tengah 53152',
  'Curug yang indah dan mempesona di Purwokerto.',
  '08:00',
  '17:00',
  '08123456789',
  ['http://example.com/image1.jpg', 'http://example.com/image2.jpg']
);

console.log(wisata.getInfoWisata());

wisata.updateInfoWisata({
  nama: 'Pantai Indah Baru',
  jamBuka: '10:00',
});
console.log(wisata.getInfoWisata());

wisata.hitungRataRataRating(5);
wisata.hitungRataRataRating(4);
console.log(wisata.getInfoWisata());
