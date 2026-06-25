# 🛍️ ShopCatalog — Aplikasi Katalog Produk E-Commerce

Aplikasi **ShopCatalog** adalah katalog produk e‑commerce yang dibangun dengan **React Native (Expo)**. Aplikasi ini mengambil data produk dari **FakeStore API**, menampilkannya dalam bentuk kartu dengan berbagai fitur interaktif seperti pencarian, penyortiran, penandaan favorit, pull‑to‑refresh, dan animasi halus. Dibuat sebagai tugas akhir praktikum Pemrograman Mobile.

<p align="center">
  <img src="https://github.com/user-attachments/assets/662c21db-aca7-4558-aa42-9dbea21df280" width="250" alt="Home UI" />
</p>

---

## 📋 Daftar Isi
- [✨ Fitur](#-fitur)
- [📸 Screenshot](#-screenshot)
- [🧰 Tech Stack](#-tech-stack)
- [🔗 API](#-api)
- [🚀 Cara Menjalankan](#-cara-menjalankan)
- [🌐 Link Expo Snack](#-link-expo-snack)
- [📁 Struktur Proyek](#-struktur-proyek)

---

## ✨ Fitur

### ✅ Level 1 – Fitur Wajib (Core)
- [x] **Fetch data** dari REST API dengan `async/await` (menggunakan `fetch`)
- [x] **`useEffect`** dengan dependency array `[]` — fetch sekali saat mount
- [x] **3 kondisi UI**: Loading (Skeleton), Error (pesan + tombol retry), Success (daftar produk)
- [x] **`try / catch / finally`** — error handling lengkap, `setLoading(false)` di `finally`
- [x] **FlatList** dengan `keyExtractor` dan `numColumns={2}`
- [x] **Kartu item** menampilkan: gambar, judul, harga, rating (3+ field)
- [x] **Tombol retry** yang memanggil ulang fetch saat error

### 🚀 Level 2 – Fitur Pengembangan (Dipilih)
- [x] **Pull‑to‑Refresh** – tarik layar ke bawah untuk menyegarkan data (RefreshControl)
- [x] **Search / Filter** – TextInput untuk mencari produk berdasarkan judul (client‑side)

### 🌟 Level 3 – Tantangan Bonus (Opsional)
- [x] **Favorit Lokal** – tandai produk sebagai favorit, data tersimpan di AsyncStorage
- [x] **Sorting** – urutkan daftar berdasarkan harga (naik/turun) dan nama (A‑Z / Z‑A)
- [x] **Skeleton Loading** – placeholder abu‑abu menggantikan spinner saat loading
- [x] **Animasi Fade‑In** – setiap kartu muncul dengan efek memudar (Animated API)
- [x] **Layar Detail** – tap kartu untuk melihat detail produk dalam modal

---

## 📸 Screenshot

Berikut tampilan aplikasi dari **Expo Go**:

| Loading (Skeleton) | Home (Success) |
|--------------------|----------------|
| <img src="https://github.com/user-attachments/assets/8371563f-d327-44f1-a20f-772513141e63" width="250" alt="Loading Skeleton" /> | <img src="https://github.com/user-attachments/assets/662c21db-aca7-4558-aa42-9dbea21df280" width="250" alt="Home" /> |

| Search / Filter | Data Tidak Ditemukan (Empty State) |
|-----------------|-----------------------------------|
| <img src="https://github.com/user-attachments/assets/0ff1f4bc-1e5c-4722-8696-dbc3a9ea45e0" width="250" alt="Search" /> | <img src="https://github.com/user-attachments/assets/4b19e5ae-0ec6-4d26-af0d-502363e6f4f9" width="250" alt="Empty" /> |

| Sorting (Section) | Favorit – Semua Produk |
|-------------------|------------------------|
| <img src="https://github.com/user-attachments/assets/cf50d3ae-d286-421a-8eb8-85359fcb2158" width="250" alt="Sorting" /> | <img src="https://github.com/user-attachments/assets/e5841738-1871-4ae1-8ea6-647bb7facc73" width="250" alt="Favorites all" /> |

| Favorit – Hanya Favorit | Detail Produk (Modal) |
|------------------------|-----------------------|
| <img src="https://github.com/user-attachments/assets/a7f28382-4f0f-41ca-945c-539192654920" width="250" alt="Favorites only" /> | <img width="250" height="1280" alt="image" src="https://github.com/user-attachments/assets/a9b59dd2-d82b-470e-99b9-bb7e158cae5c" />
 |

---

## 🧰 Tech Stack

| Teknologi | Kegunaan |
|-----------|----------|
| **React Native (Expo)** | Framework utama aplikasi |
| **JavaScript (ES6+)** | Bahasa pemrograman |
| **Fetch API** | HTTP request ke server |
| **AsyncStorage** | Penyimpanan lokal favorit |
| **React Hooks** (`useState`, `useEffect`, `useRef`) | Manajemen state & efek |
| **Animated API** | Animasi fade‑in pada kartu |
| **RefreshControl** | Pull‑to‑refresh |
| **FlatList** | Render daftar produk efisien |

---

## 🔗 API yang Digunakan

**FakeStore API** — [fakestoreapi.com](https://fakestoreapi.com/products)

- **Endpoint:** `GET /products`
- **Response:** Array objek produk dengan field:
  - `id` (number)
  - `title` (string)
  - `price` (number)
  - `description` (string)
  - `category` (string)
  - `image` (string — URL gambar)
  - `rating` (object: `{ rate, count }`)

---

## 🚀 Cara Menjalankan

### 1. Prasyarat
- Node.js (versi 14+)
- Expo CLI (`npm install -g expo-cli`)
- Smartphone dengan **Expo Go** (Android/iOS) atau emulator

### 2. Clone Repository
```bash
git clone https://github.com/username/shop-catalog.git
cd shop-catalog
