halo kawan kawan

<img src="./markdowncustom/assets/me.jpg" alt="anggap-saja-saya">


# 📝 Fullstack Minimalist Tasklist (Go + React)

Aplikasi Tasklist *fullstack* dengan desain antarmuka *brutalist-minimalist* (terinspirasi dari *tracklist* musik). Dibangun menggunakan performa tinggi dari **Go (Golang)** di sisi *backend* dan reaktivitas modern dari **React + Vite** di sisi *frontend*.

---

## 🛠️ Tech Stack & Ekosistem

Project ini menggunakan standar industri modern. Berikut penjelasan kenapa alat-alat ini dipilih:

### Backend (Golang)
* **Go (Golang):** Bahasa kompilasi yang super cepat dan efisien. Sangat ideal untuk membangun REST API dengan latensi rendah.
* **Gin (`gin-gonic/gin`):** Framework web HTTP untuk Go. Dipilih karena *routing*-nya sangat cepat dan *syntax*-nya mudah dibaca (mirip Express.js di Node.js).
* **GORM (`gorm.io/gorm`):** ORM (*Object-Relational Mapping*) terbaik di Go. Memungkinkan kita berinteraksi dengan database menggunakan objek Go (Struct) tanpa harus menulis *query* SQL manual.
* **PostgreSQL:** Database relasional kelas enterprise yang tangguh.
* **Google UUID:** Digunakan untuk menghasilkan *Primary Key* berupa *string* acak (UUID v4) ketimbang angka berurutan, demi keamanan dan skalabilitas.

### Frontend (React)
* **React + Vite:** Kombinasi *framework* UI dan *build-tool* tercepat saat ini. Vite menggantikan Create React App (CRA) karena waktu *startup* dan *Hot Module Replacement* (HMR) yang instan.
* **TypeScript:** Memberikan *Type Safety* (pengecekan tipe data). Mencegah *error* konyol seperti *typo* nama variabel sebelum aplikasi dijalankan.
* **Tailwind CSS v4:** Framework CSS *Utility-first*. Mengubah cara *styling* menjadi lebih cepat tanpa perlu berpindah ke file `.css` terpisah.
* **Axios:** HTTP Client untuk melakukan *request* ke API Backend Go dengan format yang lebih rapi dibanding `fetch` bawaan.
* **TanStack React Query:** *Library* revolusioner untuk *Data Fetching* dan *State Management*. (Penjelasan detail di bawah).

---

## 🧠 Konsep Krusial: TanStack React Query

Di *frontend*, kita tidak menggunakan `useEffect` dan `useState` manual untuk mengambil data. Kita menggunakan **React Query**. Kenapa? Karena React Query mengurus *caching*, *loading state*, dan sinkronisasi data secara otomatis.



Ada dua *Hooks* utama yang **wajib dipahami** perbedaannya:

### 1. `useQuery` (Buat BACA Data)
Digunakan HANYA untuk mengambil data dari server (metode `GET`).
* **Sifat:** Dia akan ngambil data, menyimpannya di memori browser (*cache*), dan memberikan status otomatis seperti `isLoading`, `isError`, dan `data`.
* **Contoh di aplikasi:** Mengambil daftar Task saat web pertama kali dibuka.

### 2. `useMutation` (Buat NGOTAK-NGATIK Data)
Digunakan untuk aksi yang MENGUBAH data di server (metode `POST`, `PATCH`, `PUT`, `DELETE`).
* **Sifat:** Tidak berjalan otomatis, melainkan harus di-trigger (misal: saat tombol ditekan).
* **Magic-nya (`invalidateQueries`):** Setelah `useMutation` sukses menambah/menghapus data, kita bisa memanggil `queryClient.invalidateQueries`. Ini adalah perintah yang bilang ke React Query: *"Woy, data di cache udah basi nih, tolong fetch ulang diam-diam di background!"*. Inilah yang membuat UI kita otomatis ter-*update* tanpa perlu *refresh* halaman.

---

## 📂 Anatomi Kode & Struktur Folder

### Backend (`/backend`)
* `main.go`: Jantung aplikasi. Tempat menginisialisasi database, mendaftarkan *routes*, mengatur CORS, dan menjalankan server di port 8080.
* `config/setup.go`: Mengurus koneksi ke PostgreSQL menggunakan data dari file `.env`.
* `models/task.go`: Mendefinisikan cetakan/skema data `Task`. Dilengkapi *hook* `BeforeCreate` untuk men-*generate* UUID secara otomatis.
* `controllers/taskController.go`: Berisi logika CRUD (*Create, Read, Update, Delete*). Menerima *request* dari React, memprosesnya dengan GORM, dan membalas dengan JSON.
* `routes/routes.go`: Peta jalan API. Menghubungkan URL (seperti `/api/tasks`) dengan fungsi di *controller*.

### Frontend (`/frontend`)
* `src/lib/api.ts`: Tempat mengisolasi semua fungsi Axios. Mengubah *endpoint* API menjadi fungsi JavaScript biasa yang mudah dipanggil.
* `src/App.tsx`: Layar utama aplikasi. Tempat menginisialisasi React Query dan menggabungkan komponen-komponen UI.
* `src/components/TaskInput.tsx`: Komponen khusus untuk menangani form input penambahan data.
* `src/components/TaskItem.tsx`: Komponen khusus untuk merender satu baris *task*, mengatur tampilan efek coret, dan tombol tersembunyi (*hover*).

---

## 🚀 Cara Menjalankan Aplikasi Lokal

### 1. Setup Database
1. Buka PostgreSQL (via DataGrip atau pgAdmin).
2. Buat database baru bernama `tasklist_db`.

### 2. Jalankan Backend
1. Buka terminal, masuk ke folder `backend`: `cd backend`
2. Buat file `.env` dan isi kredensial database:
   ```env
   DB_HOST=localhost
   DB_USER=nama_user_postgree_kamu
   DB_PASSWORD=password_postgree_kamu(kalo gak ada kosongin aja)
   DB_NAME=tasklist_db
   DB_PORT=5432
   PORT=8080
