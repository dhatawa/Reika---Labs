# Reika Labs — Official Website

**Research, Engineering, Innovation, Knowledge, Action.**

Website company profile single-page untuk Reika Labs: hero dengan simulasi air WebGL yang bereaksi terhadap cursor/sentuhan, section About dengan filosofi REIKA, Members, Products & Research (Smart Gate), dan Contact.

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
| Framework | **React 19 + Vite + TypeScript** | Single-page tanpa routing atau server → Vite lebih ringan dan cepat daripada Next.js. |
| Styling | **Tailwind CSS v4** | Design token di satu file (`src/styles/index.css`). |
| Animasi | **Motion** (Framer Motion) | Reveal, parallax, modal, menu mobile. Otomatis menghormati `prefers-reduced-motion`. |
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
│   ├── brand/reika-mark.svg     ← logo mark (SVG)
│   ├── favicon.svg
│   ├── og-image.jpg             ← gambar preview saat link dibagikan
│   └── robots.txt
├── src/
│   ├── content/
│   │   └── site.ts              ← SEMUA TEKS & DATA ADA DI SINI
│   ├── components/
│   │   ├── brand/Logo.tsx       ← logo (mark + wordmark)
│   │   ├── layout/              ← Navbar, Footer
│   │   ├── sections/            ← Hero, About, Members, Products, Contact
│   │   ├── members/             ← MemberPortrait (foto + placeholder)
│   │   ├── products/            ← SmartGateIllustration, ProjectModal
│   │   ├── water/               ← WaterCanvas (WebGL) + shaders
│   │   └── ui/                  ← Button, Reveal, WaveEdge, SectionLabel
│   ├── hooks/useActiveSection.ts
│   ├── styles/index.css         ← design tokens (warna, font) + CSS animasi
│   ├── App.tsx
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
- Mau pakai `.webp` atau `.png`? Ubah nama file di `src/content/site.ts` bagian `photo:`.
- Selama foto belum ada, website menampilkan placeholder elegan berisi inisial. Petunjuk nama file (*"Add photo → public/members/…"*) **hanya muncul saat `npm run dev`**, tidak muncul di website yang sudah di-deploy.

**Menambah anggota baru:** tambahkan objek baru di array `members.people` pada `src/content/site.ts`, lalu taruh fotonya di `public/members/`. Layout menyesuaikan otomatis.

---

## 5. Mengganti konten

Semua teks ada di **`src/content/site.ts`**. Komponen tidak perlu disentuh.

| Yang ingin diubah | Bagian di `site.ts` |
|---|---|
| Headline, deskripsi, tombol hero | `hero` |
| Deskripsi "What is Reika?" & 5 filosofi | `about` |
| Nama, posisi, deskripsi, foto anggota | `members.people` |
| Judul & deskripsi section produk | `products` |
| Detail Smart Gate (fitur, modal, status) | `smartGate` |
| Nomor WhatsApp, Instagram | `contact` |
| Teks copyright | `footer` |

### Mengaktifkan link Instagram

Saat ini link Instagram masih kosong (ditampilkan sebagai *"Link coming soon"*). Isi URL resminya:

```ts
instagram: {
  display: 'Reika Labs',
  href: 'https://www.instagram.com/USERNAME_ANDA/',
},
```

### Mengubah nomor WhatsApp

Format link: `https://wa.me/62xxxxxxxxxx` (kode negara 62, tanpa angka 0 di depan, tanpa spasi/tanda +).

### Menambah proyek riset baru

Untuk saat ini hanya ada satu proyek unggulan (Smart Gate). Untuk proyek kedua, salin objek `smartGate` menjadi objek baru dan duplikasi blok `<article>` di `src/components/sections/Products.tsx` (atau minta developer menjadikannya list).

### Status jujur proyek

Smart Gate sengaja ditampilkan sebagai **Research Project**: fitur dilabeli *"Proposed capabilities"*, ada catatan bahwa sistem belum beroperasi di lapangan, dan diagram diberi keterangan *"illustrative, not live data"*. Kalau nanti prototipe sudah berjalan, perbarui `status` dan `scopeNote` di `site.ts`.

---

## 6. Mengganti logo

Logo saat ini adalah mark SVG "tetes & riak" + wordmark **REIKA LABS**. Jika sudah ada logo resmi:

- **Cara cepat (SVG):** ganti isi `<svg>` di `src/components/brand/Logo.tsx` (`LogoMark`) dengan path logo Anda. Gunakan `currentColor` agar warnanya ikut tema.
- **Pakai file gambar:** simpan di `public/brand/`, lalu di `Logo.tsx` ganti `<LogoMark />` dengan `<img src={`${import.meta.env.BASE_URL}brand/logo.svg`} alt="" className="h-7 w-auto" />`.
- Ganti juga `public/favicon.svg` dan `public/brand/reika-mark.svg`.

---

## 7. Deployment ke Vercel

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

**Arah visual:** *Modern water-inspired technology* — laboratorium riset yang tenang, editorial, gelap–terang bergantian seperti permukaan dan kedalaman air.

### Warna (`src/styles/index.css` → `@theme`)

| Token | Hex | Peran |
|---|---|---|
| `midnight` | `#060d1c` | Latar hero, contact, footer |
| `abyss` | `#0a1730` | Latar members, panel proyek |
| `ocean` | `#0c2f55` | Deep Ocean Blue — kedalaman |
| `ocean-2` | `#12507e` | Aksen di latar terang, isi huruf REIKA |
| `aqua` | `#2fb6c9` | Aqua Blue — aksen sekunder |
| `cyan` | `#8ae7f2` | Cyan — aksen utama di latar gelap (dipakai hemat) |
| `foam` / `paper` | `#f3f6f7` / `#eef2f3` | Soft White — section terang |
| `ink` | `#0a1426` | Teks di latar terang |

Prinsip: biru terang hanya untuk aksen (satu kata di headline, label, garis). Section bergantian gelap ↔ terang agar tidak "biru semua".

### Tipografi

- **Tenor Sans** — display/headline. Selaras dengan font di deck presentasi REIKA sebelumnya, elegan dan tipis.
- **Manrope** — teks isi dan UI.
- **JetBrains Mono** — label kecil bergaya catatan laboratorium (`01 — About Reika`, `M—01`, `Fig. 01`).

### Motif air

| Elemen | Tempat |
|---|---|
| Simulasi permukaan air + riak cursor (WebGL) | Hero, Contact |
| Gelombang pemisah section yang bergerak pelan | Antar section |
| Huruf R-E-I-K-A terisi air saat di-hover | About |
| "Garis air" naik saat hover | Tombol, foto anggota |
| Logo: tetes + riak, berputar perlahan | Navbar, hero |

---

## 10. Performa & aksesibilitas

**Air WebGL (`src/components/water/WaterCanvas.tsx`):**
- Render di resolusi rendah (40–60%) — gambar air lembut sehingga tidak terlihat bedanya.
- Kualitas turun otomatis jika FPS < ±40; jika perangkat tetap berat, animasi berhenti di satu frame diam.
- Berhenti saat section tidak terlihat atau tab tidak aktif (hemat baterai).
- Perangkat tanpa WebGL → gradien CSS bergerak (fallback).
- `prefers-reduced-motion` → frame diam, tanpa riak, tanpa parallax.

**Aksesibilitas:**
- HTML semantik (`header`, `nav`, `main`, `section`, `article`, `figure`, `dialog`).
- Link "Skip to content", fokus keyboard terlihat jelas.
- Modal proyek: fokus terkunci di dalam, tutup dengan `Esc`, fokus kembali ke tombol.
- Teks alternatif pada foto dan diagram Smart Gate.
- Menu mobile bisa ditutup dengan `Esc`.

**Pengecekan yang sudah dilakukan:** build produksi tanpa error, navigasi menu (desktop & mobile), link WhatsApp, modal + focus trap, tidak ada horizontal scroll di mobile (390 px), mode reduced-motion, dan fallback tanpa WebGL.

---

© 2026 Reika Labs. Built with curiosity and innovation.
