# Sofyan Library - Frontend

Frontend aplikasi **Sistem Perpustakaan Sofyan** yang dibangun menggunakan **Next.js 15 + TypeScript** dengan desain modern, responsif, dan mudah digunakan.

## 🚀 Fitur Utama
- Dashboard interaktif untuk memantau statistik anggota.
- Manajemen anggota (tambah, edit, hapus).
- Tampilan responsif (mobile & desktop).
- Integrasi API dari backend (Laravel).

## 🛠️ Teknologi
- [Next.js 15](https://nextjs.org/) - React Framework
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Axios](https://axios-http.com/) - HTTP Client
- [Lucide React](https://lucide.dev/) - Icon library

## ⚙️ Persiapan
Pastikan sudah menginstall:
- **Node.js** versi LTS (disarankan ≥ 18)
- **npm** atau **yarn**

## ▶️ Cara Menjalankan
1. Clone repository:
   ```bash
   git clone <repo-url>
   cd frontend

2.Install dependencies:

  npm install

3. Buat file .env.local dan isi:
  
  NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api

4. Jalankan server development:

  npm run dev

5.Buka di browser:

  http://localhost:3000


    📂 Struktur Direktori
    bash
    Copy
    Edit
    src/
    ├── app/              # Pages & layout utama
    ├── components/       # Reusable components
    ├── lib/              # API helper (axios)
    ├── styles/           # Global styles


🧑‍💻 Pengembangan

Gunakan npm run lint untuk cek kualitas kode.

Gunakan npm run build untuk production build.