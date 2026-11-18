# Reika Labs — Official Website

**Research, Engineering, Innovation, Knowledge, Action.**

Website multi-halaman untuk Reika Labs: hero dengan simulasi air WebGL yang bereaksi terhadap cursor/sentuhan, section About dengan filosofi REIKA, Members, Products & Research (Smart Gate), dan Contact.

---

## Daftar isi

1. [Tech stack](#1-tech-stack)
2. [Struktur folder](#2-struktur-folder)
3. [Instalasi & menjalankan secara lokal](#3-instalasi--menjalankan-secara-lokal)
4. [Mengganti foto anggota](#4-mengganti-foto-anggota)
5. [Mengganti konten](#5-mengganti-konten)
6. [Mengganti logo](#6-mengganti-logo)
7. [Deployment ke Vercel](#7-deployment-ke-vercel)
8. [Setelah deploy: SEO & social preview](#8-setelah-deploy-seo--social-preview)
9. [Design system](#9-design-system)
10. [Performa & aksesibilitas](#10-performa--aksesibilitas)

---

## 1. Tech stack

| Kebutuhan | Pilihan | Alasan |
|---|---|---|
| Framework | **React 19 + Vite + TypeScript** | Ringan dan cepat; tidak butuh server. |
| Routing | **React Router DOM 7** | 14 halaman dengan URL sendiri (lihat `src/router.tsx`). |
| Styling | **Tailwind CSS v4** | Design token di satu file (`src/styles/index.css`). |
| Animasi | **Motion** (Framer Motion) | Animasi masuk hero, modal, menu mobile. Otomatis menghormati `prefers-reduced-motion`. |
| Efek air | **WebGL murni (shader custom)** | Tanpa Three.js — satu shader fullscreen jauh lebih ringan (~0 KB library tambahan). |
| Ikon | **Lucide** | Hanya ikon fungsional (panah, menu, tutup). |
| Font | **Fontsource** (self-hosted) | Tenor Sans (display), Manrope (teks), JetBrains Mono (label). Tidak bergantung CDN Google Fonts. |

Tidak ada library lain. Tidak ada backend, database, atau formulir.

---

## 2. Struktur folder

```
reika-labs/
├── public/
│   ├── members/                 ← FOTO ANGGOTA DI SINI
│   │   └── README.md
│   ├── brand/                   ← logo resmi (PNG transparan)
│   ├── favicon-32.png, apple-touch-icon.png
│   ├── og-image.jpg             ← gambar preview saat link dibagikan
│   └── robots.txt
├── src/
│   ├── router.tsx               ← DAFTAR SEMUA HALAMAN (URL)
│   ├── pages/index.tsx          ← halaman-halaman (merangkai section)
│   ├── content/
│   │   ├── en.ts                ← SEMUA TEKS — English
│   │   ├── id.ts                ← SEMUA TEKS — Bahasa Indonesia
│   │   ├── types.ts             ← bentuk data bersama
│   │   └── site.ts              ← pintu masuk (useSite)
│   ├── i18n/LanguageProvider.tsx← pengganti bahasa ID / EN
│   ├── components/
│   │   ├── brand/               ← Logo (navbar) & LogoVector (logo interaktif)
│   │   ├── layout/              ← RootLayout, Navbar, NavDropdown, PageNav, Footer
│   │   ├── sections/            ← Hero, About/Meaning, LogoPhilosophy, VisionApproach,
│   │   │                          Members, Products, Activity, Contact
│   │   ├── members/             ← MemberPortrait (foto + placeholder)
│   │   ├── products/            ← SmartGateIllustration, ProjectModal
│   │   ├── water/               ← WaterCanvas (WebGL) + shaders
│   │   └── ui/                  ← Button, Gauge (garis ukur), WaveEdge
│   ├── hooks/useActiveSection.ts
│   ├── styles/index.css         ← design tokens (warna, font) + CSS animasi
│   └── main.tsx
├── index.html                   ← meta SEO, Open Graph, JSON-LD
├── package.json
└── vite.config.ts
```

---

## 3. Instalasi & menjalankan secara lokal

**Prasyarat:** Node.js **20.19+** atau **22+** (cek dengan `node -v`). Unduh di https://nodejs.org.

```bash
# 1. Masuk ke folder proyek
cd reika-labs

# 2. Install dependency (sekali saja)
npm install

# 3. Jalankan mode development
npm run dev
```

Buka alamat yang muncul di terminal (biasanya **http://localhost:5173**). Setiap perubahan file langsung terlihat di browser.

Perintah lain:

| Perintah | Fungsi |
|---|---|
| `npm run build` | Cek TypeScript + build produksi ke folder `dist/` |
| `npm run preview` | Menjalankan hasil build secara lokal (seperti di server asli) |
| `npm run typecheck` | Hanya cek error TypeScript |

> Mau tes dari HP di jaringan Wi-Fi yang sama? Jalankan `npm run dev -- --host`, lalu buka alamat "Network" yang muncul di terminal dari HP.

---

## 4. Mengganti foto anggota

1. Siapkan foto **portrait rasio 4:5** (contoh: 1000 × 1250 px atau 1200 × 1500 px). Wajah kira-kira di sepertiga atas.
2. Simpan dengan nama file **persis** seperti ini ke folder `public/members/`:

   | Anggota | Nama file |
   |---|---|
   | Dyka Hatawa | `public/members/dyka-hatawa.jpg` |
   | Reisya Putri Ramadhani | `public/members/reisya-putri-ramadhani.jpg` |

3. Refresh browser. Selesai — placeholder otomatis diganti foto.

Tips:
- Kompres dulu di https://squoosh.app (target < 250 KB per foto).
- Mau pakai `.webp` atau `.png`? Ubah nama file di `src/content/en.ts & id.ts` bagian `photo:`.
- Selama foto belum ada, website menampilkan placeholder elegan berisi inisial. Petunjuk nama file (*"Add photo → public/members/…"*) **hanya muncul saat `npm run dev`**, tidak muncul di website yang sudah di-deploy.

**Menambah anggota baru:** tambahkan objek baru di array `members.people` pada `src/content/en.ts & id.ts`, lalu taruh fotonya di `public/members/`. Layout menyesuaikan otomatis.

---

## 5. Mengganti konten

> **Dua bahasa.** Teks website ada di **dua file dengan struktur sama**:
> `src/content/en.ts` (English) dan `src/content/id.ts` (Bahasa Indonesia).
> Saat mengubah atau menambah teks, **ubah di kedua file**. Jika ada bagian yang lupa ditambahkan di salah satu file, `npm run build` akan menampilkan error TypeScript sehingga tidak ada teks yang hilang.
> Tabel di bawah menyebut nama bagian; letaknya sama di kedua file. Teks antarmuka kecil (tombol, label) ada di bagian `ui`.

Komponen tidak perlu disentuh.

| Yang ingin diubah | Bagian di `en.ts` & `id.ts` |
|---|---|
| Headline, deskripsi, tombol hero | `hero` |
| Deskripsi "What is Reika?" & 5 filosofi | `about` |
| Nama, posisi, deskripsi, foto anggota | `members.people` |
| Judul & deskripsi section produk | `products` |
| Detail Smart Gate (fitur, modal, status) | `smartGate` |
| Menu dropdown navbar & URL tiap halaman | `navigation` (+ daftar route di `src/router.tsx`) |
| Filosofi logo | `logoPhilosophy` |
| Visi, misi, prinsip | `visionMission` |
| Langkah kerja (Our approach) | `approach` |
| Research journal (status proyek, tahapan, eksperimen, pencapaian, rencana) | `activity` |
| Nomor WhatsApp, Instagram | `contact` |
| Teks copyright | `footer` |

### Mengubah link Instagram

Saat ini terhubung ke **@reika_team**. Jika username berubah, ubah di `contact.instagram`:

```ts
instagram: {
  display: '@reika_team',
  href: 'https://www.instagram.com/reika_team/',
},
```

### Mengubah nomor WhatsApp

Format link: `https://wa.me/62xxxxxxxxxx` (kode negara 62, tanpa angka 0 di depan, tanpa spasi/tanda +).

### Menambah proyek riset baru

Untuk saat ini hanya ada satu proyek unggulan (Smart Gate). Untuk proyek kedua, salin objek `smartGate` menjadi objek baru dan duplikasi blok `<article>` di `src/components/sections/Products.tsx` (atau minta developer menjadikannya list).

### Status jujur proyek

Smart Gate sengaja ditampilkan sebagai **Research project**: fitur dilabeli *"Proposed capabilities"*, ada catatan bahwa sistem belum beroperasi di lapangan, dan diagram diberi keterangan *"illustrative and not live data"*. Kalau nanti prototipe sudah berjalan, perbarui `status` dan `scopeNote` di `en.ts` dan `id.ts`.

---

### Menambah update di Research journal

Di `activity` (`src/content/en.ts & id.ts`):
- `currentResearch.facts` → isi `Latest update` (sekarang `null`).
- `experiments` → tambah `{ title, date, text }`.
- `futureDirection` → tambah `{ title, text }`.
- `achievements` → tambah entri; `published: false` = disembunyikan.

Bagian yang kosong otomatis tampil sebagai "Not updated yet". Jangan isi dengan tanggal atau kegiatan karangan.

Riwayat perubahan lengkap ada di `CHANGELOG.md`.

## 6. Mengganti logo

Logo resmi (huruf R berbentuk pita, teal → biru langit) ada di `public/brand/`:

| File | Dipakai untuk |
|---|---|
| `brand/reika-mark-128.png` | Navbar & footer (tampil 32 px) |
| `brand/reika-mark.png` | Versi 512 px — dokumentasi, gambar OG |
| `brand/reika-logo-full.png` | Versi resolusi penuh tanpa latar |
| `favicon-32.png`, `apple-touch-icon.png` | Ikon tab browser & ikon di layar HP |

Untuk mengganti logo, timpa file-file di atas dengan nama yang sama (PNG transparan, persegi). Nama "Reika Labs" di sebelah logo diatur di `src/components/brand/Logo.tsx`.

---

## 7. Deployment ke Vercel

> **Penting (multi-page):** semua URL seperti `/about/logo` harus diarahkan ke `index.html` oleh hosting. Ini sudah diatur di `vercel.json` (Vercel) dan `public/_redirects` (Netlify). Cloudflare Pages melakukannya otomatis. Tanpa ini, refresh di halaman internal akan menghasilkan 404.
>
> GitHub Pages tidak mendukung rewrite: build dengan `VITE_BASE=./ VITE_ROUTER=hash npm run build` (URL menjadi `/#/about/logo`).

### Opsi A — lewat GitHub (disarankan, auto-deploy setiap push)

1. Buat repository baru di GitHub, lalu upload proyek:
   ```bash
   git init
   git add .
   git commit -m "Reika Labs website"
   git branch -M main
   git remote add origin https://github.com/USERNAME/reika-labs.git
   git push -u origin main
   ```
2. Buka https://vercel.com → login dengan GitHub → **Add New… → Project**.
3. Pilih repository `reika-labs` → **Import**.
4. Vercel otomatis mendeteksi **Vite**. Pastikan:
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Klik **Deploy**. Dalam ±1 menit website online di `https://reika-labs.vercel.app` (atau nama serupa).

Setiap kali Anda `git push`, Vercel otomatis deploy ulang.

### Opsi B — Vercel CLI (tanpa GitHub)

```bash
npm i -g vercel
vercel          # deploy preview (ikuti pertanyaannya, semua default boleh)
vercel --prod   # deploy ke production
```

### Domain sendiri (opsional)

Vercel → Project → **Settings → Domains** → tambahkan domain (misal `reikalabs.id`) dan ikuti instruksi DNS.

---

## 8. Setelah deploy: SEO & social preview

Setelah tahu URL final (misal `https://reikalabs.vercel.app`), buka `index.html` dan:

1. Ubah `og:image` menjadi URL absolut — WhatsApp/Instagram/LinkedIn butuh URL lengkap:
   ```html
   <meta property="og:image" content="https://reikalabs.vercel.app/og-image.jpg" />
   ```
2. Tambahkan:
   ```html
   <link rel="canonical" href="https://reikalabs.vercel.app/" />
   <meta property="og:url" content="https://reikalabs.vercel.app/" />
   ```
3. Tambahkan `"url"` dan (kalau sudah ada) `"sameAs": ["https://www.instagram.com/…"]` di blok JSON-LD.
4. Daftarkan website di **Google Search Console**.

`public/og-image.jpg` bisa diganti dengan gambar Anda sendiri (ukuran 1200 × 630 px).

---

## 9. Design system

Website ini dirombak dengan pendekatan *unslop*: chrome (navigasi, tombol, teks) dibuat tenang, dan kekayaan visual dipusatkan di dua "momen" saja.

**Arah desain**
- **Produk:** kelompok riset mahasiswa dari Bandung yang mengubah masalah air dan lingkungan menjadi prototipe yang diuji
- **Karakter:** penasaran, teliti, membumi
- **Dunia:** riset lapangan di tepi danau — tiang ukur air, catatan lapangan, rumah sensor
- **Momen:** (1) permukaan air interaktif di hero, (2) diagram Smart Gate
- **Signature:** garis ukur ala *peilschaal* (tiang ukur ketinggian air) — di penanda section dan di diagram

### Warna (`src/styles/index.css` → `@theme`)

| Token | Hex | Peran |
|---|---|---|
| `paper` | `#f4f7f8` | Latar halaman |
| `surface` | `#ffffff` | Permukaan terangkat (kartu proyek) |
| `ink` / `ink-2` / `ink-3` | `#0b1722` / `#44566a` / `#5b6c7d` | Teks utama / sekunder / redup |
| `night` / `night-2` | `#07111c` / `#0d1b2a` | Hero & panel diagram |
| `mist` / `mist-2` / `mist-3` | `#f4f7f8` / `#c9d4de` / `#9fb0c0` | Teks di latar gelap |
| `sky` | `#00b7f9` | Aksen — biru langit dari logo, di latar gelap |
| `sky-ink` | `#006c99` | Aksen untuk teks & tombol di latar terang (kontras 5.4:1) |

Aturan: satu aksen saja, dipakai hemat (tombol utama, peran anggota, titik status). Tidak ada gradasi warna, glow, atau teks bergradasi. Gradasi hanya ada di logo.

### Tipografi
- **Tenor Sans** — judul besar
- **Manrope** — teks & UI, bobot 400/500 (600 hanya untuk judul kecil)
- **JetBrains Mono** — hanya angka kecil (nomor fitur) dan label diagram
- Semua label *sentence case*, tanpa huruf kapital berspasi lebar. Judul, label, dan tombol tanpa titik di akhir.

### Spasi & sudut
- Semua jarak kelipatan 4 px. Section: 96 px (mobile) / 128 px (desktop).
- Radius: tombol 10 px, kartu 20 px dengan isi 12 px (radius bertingkat), foto 16 px.

---

## 10. Performa & aksesibilitas

**Motion:** hanya satu animasi berulang, yaitu air di hero (beserta riak saat cursor bergerak/disentuh). Selain itu hanya ada satu animasi masuk saat halaman dibuka (headline, paragraf, tombol muncul bergantian), dan efek hover yang cepat (150 ms). Tidak ada parallax, elemen berputar, atau gelombang bergerak. Satu kurva easing: `cubic-bezier(0.22, 1, 0.36, 1)`.

**Air WebGL (`src/components/water/WaterCanvas.tsx`):**
- Render di resolusi rendah (40–60%) — gambar air lembut sehingga tidak terlihat bedanya.
- Kualitas turun otomatis jika FPS < ±40; jika perangkat tetap berat, animasi berhenti di satu frame diam.
- Berhenti saat hero tidak terlihat atau tab tidak aktif (hemat baterai).
- Perangkat tanpa WebGL → latar air diam (fallback CSS).
- `prefers-reduced-motion` → frame diam, tanpa riak, tanpa animasi masuk.

**Aksesibilitas:**
- HTML semantik (`header`, `nav`, `main`, `section`, `article`, `figure`, `dialog`).
- Link "Skip to content", fokus keyboard terlihat jelas.
- Modal proyek: fokus terkunci di dalam, tutup dengan `Esc`, fokus kembali ke tombol.
- Teks alternatif pada foto dan diagram Smart Gate.
- Menu mobile bisa ditutup dengan `Esc`.

**Pengecekan yang sudah dilakukan:** build produksi tanpa error, navigasi menu (desktop & mobile), link WhatsApp, modal + focus trap, tidak ada horizontal scroll di mobile (390 px), mode reduced-motion, dan fallback tanpa WebGL.

---

© 2026 Reika Labs. Built with curiosity and innovation.
