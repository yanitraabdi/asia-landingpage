# Panduan Deploy Landing Page PMB 2027

Kepada Tim IT Institut Asia Malang,

berikut panduan pemasangan landing page Penerimaan Mahasiswa Baru 2027. Halaman ini berupa situs statis (HTML, CSS, JavaScript, gambar, dan font), sehingga tidak memerlukan PHP, database, maupun proses build. File cukup diunggah ke server.

## 1. File yang Diunggah

```
index.html
styles.css
script.js
assets/      (gambar dan font, sekitar 2,9 MB)
```

Folder `.claude/` dan file panduan ini tidak perlu diunggah.

Mohon struktur folder tidak diubah, karena seluruh path mengarah secara relatif ke folder `assets/`. File dapat diletakkan di root domain maupun di sub-folder.

## 2. Cara Pemasangan

### cPanel / Shared Hosting

1. Buka File Manager, lalu masuk ke `public_html` atau folder subdomain yang digunakan.
2. Kompres keempat item di atas menjadi satu file zip, unggah, lalu pilih Extract.
3. Pastikan SSL sudah aktif melalui menu Let's Encrypt atau SSL/TLS.

### VPS dengan Nginx

Salin file ke server:

```bash
rsync -avz --exclude '.claude' --exclude 'PANDUAN-DEPLOY.md' ./ user@server:/var/www/pmb-asia/
```

Contoh konfigurasi (sesuaikan `server_name` dengan domain yang digunakan):

```nginx
server {
    listen 80;
    server_name pmb.contoh-domain.ac.id;
    root /var/www/pmb-asia;
    index index.html;

    gzip on;
    gzip_types text/css application/javascript;

    location /assets/ {
        expires 30d;
    }
}
```

Aktifkan konfigurasi dan pasang SSL:

```bash
sudo ln -s /etc/nginx/sites-available/pmb-asia /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d pmb.contoh-domain.ac.id
```

### VPS dengan Apache

Salin file ke `DocumentRoot`, kemudian pasang SSL dengan `sudo certbot --apache`. Apabila font tidak tampil, tambahkan baris berikut pada file `.htaccess`:

```apache
AddType font/woff2 .woff2
```

### Cloudflare Pages / Netlify

Gunakan opsi upload manual (drag and drop folder). Build command dikosongkan, kemudian hubungkan domain yang akan digunakan.

## 3. Penyesuaian Setelah Pemasangan

Pada `index.html` terdapat baris berikut:

```html
<meta property="og:image" content="assets/hero-najwa-shihab.jpg">
```

Mohon diganti dengan URL lengkap, misalnya `https://pmb.contoh-domain.ac.id/assets/hero-najwa-shihab.jpg`. Tanpa perubahan ini, gambar pratinjau tidak akan muncul saat tautan dibagikan melalui WhatsApp atau Facebook.

## 4. Pengecekan Sebelum Publikasi

Mohon dicek melalui laptop dan ponsel:

- Halaman dapat dibuka melalui https dan seluruh gambar tampil.
- Font yang tampil adalah Albert Sans. Jika masih font standar, periksa pengaturan `.woff2` di atas.
- Teks berjalan berwarna kuning (nama program studi) bergerak.
- Tombol ← dan → pada bagian Kegiatan Kampus dan Fasilitas Kampus dapat menggeser foto.
- Detail program studi terbuka saat namanya diklik.
- Setelah halaman di-scroll, tombol WhatsApp muncul di bagian bawah layar.
- Tombol WhatsApp mengarah ke `s.id/asia-yohanes`, dan tombol "Minta info Biaya Kuliah" mengarah ke Google Form.

## 5. Pembaruan Konten

Teks dan tautan dapat diubah langsung di `index.html`. Untuk mengganti foto, timpa file di folder `assets/` dengan nama file yang sama. Jika foto lama masih tampil, hapus cache browser, atau lakukan purge cache apabila menggunakan Cloudflare.

Sebagai catatan, gambar saat ini belum dikompres. Kompresi menggunakan TinyPNG atau Squoosh akan membuat halaman lebih cepat dimuat di ponsel.

Terima kasih.
