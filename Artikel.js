class Artikel {
  constructor(artikelId, judul, konten, tanggalBuat, penulis, gambar) {
    this.artikelId = artikelId;
    this.judul = judul;
    this.konten = konten;
    this.tanggalBuat = tanggalBuat;
    this.penulis = penulis;
    this.gambar = gambar;
  }

  getArtikel() {
    return {
      artikelId: this.artikelId,
      judul: this.judul,
      konten: this.konten,
      tanggalBuat: this.tanggalBuat,
      penulis: this.penulis,
      gambar: this.gambar,
    };
  }

  updateArtikel(data) {
    if (data.judul) this.judul = data.judul;
    if (data.konten) this.konten = data.konten;
    if (data.penulis) this.penulis = data.penulis;
    if (data.gambar) this.gambar = data.gambar;
  }
}

const artikel = new Artikel(
  '1HAUD23',
  'Menikmati Keindahan Pantai',
  'Pantai adalah tempat yang sangat indah untuk bersantai dan menikmati keindahan alam. Di pantai, kita bisa melakukan banyak hal, mulai dari berenang, bermain pasir, hingga menikmati pemandangan laut.',
  new Date('2024-10-29'),
  'John Doe',
  ['http://example.com/image1.jpg', 'http://example.com/image2.jpg']
);

console.log(artikel.getArtikel());

artikel.updateArtikel({ judul: 'Menikmati Keindahan Pantai di Bali' });
console.log(artikel.getArtikel());
