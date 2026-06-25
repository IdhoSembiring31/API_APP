link EXPO :  https://snack.expo.dev/@idhosembiring3107/api-app

🛍️ Fitur
✅ Level 1 – Fitur Wajib (Core)
Fetch data dari REST API dengan async/await (menggunakan fetch)

useEffect dengan dependency array [] — fetch sekali saat mount

3 kondisi UI: Loading (Skeleton), Error (pesan + tombol retry), Success (daftar produk)

try / catch / finally — error handling lengkap, setLoading(false) di finally

FlatList dengan keyExtractor dan numColumns={2}

Kartu item menampilkan: gambar, judul, harga, rating (3+ field)

Tombol retry yang memanggil ulang fetch saat error

🚀 Level 2 – Fitur Pengembangan (Dipilih)
Pull‑to‑Refresh – tarik layar ke bawah untuk menyegarkan data (RefreshControl)

Search / Filter – TextInput untuk mencari produk berdasarkan judul (client‑side)

🌟 Level 3 – Tantangan Bonus (Opsional)
Favorit Lokal – tandai produk sebagai favorit, data tersimpan di AsyncStorage

Sorting – urutkan daftar berdasarkan harga (naik/turun) dan nama (A‑Z / Z‑A)

Skeleton Loading – placeholder abu‑abu menggantikan spinner saat loading

Animasi Fade‑In – setiap kartu muncul dengan efek memudar (Animated API)

Layar Detail – tap kartu untuk melihat detail produk dalam modal

📸 Screenshot
Ganti placeholder dengan screenshot asli dari Expo Go

UI HOME
<img width="575" height="1280" alt="image" src="https://github.com/user-attachments/assets/662c21db-aca7-4558-aa42-9dbea21df280" />

Loading (Skeleton)	
<img width="1220" height="2712" alt="image" src="https://github.com/user-attachments/assets/8371563f-d327-44f1-a20f-772513141e63" />
Search Feature
<img width="575" height="1280" alt="image" src="https://github.com/user-attachments/assets/0ff1f4bc-1e5c-4722-8696-dbc3a9ea45e0" />
Data tidak ditemukan
<img width="575" height="1280" alt="image" src="https://github.com/user-attachments/assets/4b19e5ae-0ec6-4d26-af0d-502363e6f4f9" />
Sectoin
<img width="575" height="1280" alt="image" src="https://github.com/user-attachments/assets/cf50d3ae-d286-421a-8eb8-85359fcb2158" />
favorite

<img width="575" height="1280" alt="image" src="https://github.com/user-attachments/assets/e5841738-1871-4ae1-8ea6-647bb7facc73" />

<img width="575" height="1280" alt="image" src="https://github.com/user-attachments/assets/a7f28382-4f0f-41ca-945c-539192654920" />






🧰 Tech Stack
React Native (Expo)

JavaScript (ES6+)

Fetch API — untuk request HTTP

AsyncStorage — penyimpanan lokal favorit

React Hooks — useState, useEffect, useRef

Animated API — animasi fade‑in

RefreshControl — pull‑to‑refresh

FlatList — render daftar produk

🔗 API yang Digunakan
FakeStore API — fakestoreapi.com

Endpoint: GET /products

Response: Array objek produk dengan field:

id (number)

title (string)

price (number)

description (string)

category (string)

image (string — URL gambar)

rating (object: { rate, count })

🚀 Cara Menjalankan
1. Prasyarat
Node.js (versi 14+)

Expo CLI (npm install -g expo-cli)

Smartphone dengan Expo Go (Android/iOS) atau emulator

2. Clone Repository
bash
git clone https://github.com/username/shop-catalog.git
cd shop-catalog
3. Instal Dependencies
bash
npm install
# atau
yarn install
4. Jalankan Aplikasi
bash
npx expo start
Scan QR Code dengan Expo Go atau tekan a untuk Android / i untuk iOS (emulator).

🌐 Link Expo Snack
https://snack.expo.dev/@username/shop-catalog-final

Ganti @username dengan username Snack Anda, atau gunakan link asli setelah deploy.

📁 Struktur Proyek
text
shop-catalog/
├── App.js                 # Komponen utama
├── app.json               # Konfigurasi Expo
├── package.json           # Dependencies
├── README.md              # Dokumentasi ini
└── screenshots/           # Folder screenshot (buat sendiri)
    ├── loading.png
    ├── success.png
    ├── error.png
    ├── favorite.png
    ├── sorting.png
    └── search.png
