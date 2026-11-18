# Changelog — Reika Labs website

## v2.1 — Dua bahasa: Indonesia (ID) & English (EN)

- **Tombol ID / EN** di navbar (desktop & mobile, juga di atas hero gelap).
- **Seluruh teks** tersedia dalam dua bahasa: menu, dropdown, semua halaman, modal Smart Gate, jurnal riset, halaman 404, teks alternatif foto, label aksesibilitas, dan judul tab browser.
- **Bahasa awal**: pilihan terakhir pengunjung (disimpan di browser) → bahasa browser (browser berbahasa Indonesia otomatis ID) → English.
- `<html lang>` ikut berganti (penting untuk pembaca layar & SEO).
- URL tetap sama di kedua bahasa (`/about/logo`), jadi tautan yang dibagikan tidak rusak.
- Kata R-E-I-K-A (Research, Engineering, …) sengaja tetap bahasa Inggris karena merupakan kepanjangan nama.

**File:** `src/content/en.ts` (English), `src/content/id.ts` (Indonesia, **baru**), `src/content/types.ts` (**baru**), `src/i18n/LanguageProvider.tsx` (**baru**), `src/components/layout/LanguageSwitch.tsx` (**baru**); semua komponen kini membaca teks lewat `useSite()`.

**Pengujian:** 29/29 tes bahasa (ganti bahasa, tersimpan setelah refresh, deteksi browser Indonesia, 14 halaman dalam Bahasa Indonesia tanpa overflow, navbar 1024 px tidak bertabrakan, mobile) + 46/46 tes routing diulang.


## v2.0 — Multi-page website (React Router)

Website diubah dari satu halaman panjang menjadi **14 halaman dengan URL sendiri**. Tidak ada konten yang hilang: semua section lama dipakai ulang sebagai halaman.

### Struktur routing
| URL | Halaman | Komponen yang dipakai ulang |
|---|---|---|
| `/` | Home (hero + direktori isi website + kontak) | `Hero`, `Contact` |
| `/about` | About Reika | `About` |
| `/about/meaning` | Meaning of Reika | `Meaning` |
| `/about/logo` | Logo philosophy | `LogoPhilosophy` |
| `/about/vision` | Vision & mission | `VisionMission` |
| `/about/approach` | Our approach | `Approach` |
| `/members` | Members | `Members` |
| `/products` | Products & research (+ modal Smart Gate) | `Products` |
| `/activities` | → dialihkan ke `/activities/research` | |
| `/activities/research` | Current research | `ResearchPage` |
| `/activities/projects` | Project development (+ diagram) | `ProjectsPage` |
| `/activities/experiments` | Experiments & exploration | `ExperimentsPage` |
| `/activities/achievements` | Achievements | `AchievementsPage` |
| `/activities/future` | Future direction | `FuturePage` |
| `*` | 404 "Nothing measured here" | `NotFoundPage` |

### Perubahan utama
- **React Router DOM 7** (`createBrowserRouter`) dengan nested routes dan dua layout bertingkat (`AboutLayout`, `ActivityLayout`).
- **Shared layout** (`RootLayout`): Navbar & Footer dirender sekali untuk semua halaman, transisi halaman fade 200 ms, `ScrollRestoration` (halaman baru dibuka dari atas, Back/Forward mengembalikan posisi scroll).
- **Navbar**: semua menu & submenu memakai `NavLink`; dropdown tertutup otomatis saat pindah halaman; indikator aktif mengikuti URL; navbar transparan hanya di atas hero Home.
- **Sub-navigasi**: tab sticky di halaman About; sidebar indeks di Research journal (tab di mobile); link *Previous / Next* di bawah setiap halaman grup.
- **Judul tab browser** per halaman (mis. "Logo philosophy · Reika Labs").
- **404 custom** dan **SPA rewrite** untuk deployment: `vercel.json` (Vercel) dan `public/_redirects` (Netlify). Cloudflare Pages otomatis.
- `base` Vite diubah ke `/` (wajib untuk URL bertingkat). Build preview statis: `VITE_BASE=./ VITE_ROUTER=hash npm run build`.

### File
**Baru:** `src/router.tsx`, `src/pages/index.tsx`, `src/components/layout/RootLayout.tsx`, `src/components/layout/PageNav.tsx`, `vercel.json`, `public/_redirects`
**Diubah:** `src/main.tsx`, `src/content/site.ts` (navigasi pakai `to`), `Navbar.tsx`, `NavDropdown.tsx`, `Activity.tsx` (dipecah jadi layout + 5 halaman), `Button.tsx` (`ButtonRoute`), `Hero.tsx`, heading utama section → `h1`, `vite.config.ts`, `index.html` (path aset absolut)
**Dihapus:** `src/App.tsx`, `src/hooks/useActiveSection.ts` (digantikan router)

### Pengujian
46/46 lolos (Playwright, Chrome): 14 route dimuat langsung (= tes refresh) di 1440 px & 390 px dengan tepat satu `h1`, tanpa overflow, tanpa gambar rusak, tanpa console error; redirect `/activities`; dropdown → URL berubah, dropdown tertutup, indikator aktif, judul tab; Back & Forward; refresh halaman internal; link Next membuka halaman dari atas; CTA hero; modal Smart Gate; logo interaktif; accordion mobile membuka grup aktif & menutup menu setelah navigasi.


## v1.2 — Navigasi dropdown, filosofi logo, research journal

### Fitur baru
- **Dropdown "About Reika"**: About Reika, Meaning of Reika, Logo philosophy, Vision & mission, Our approach.
- **Dropdown "What we're doing"**: Current research, Project development, Experiments & exploration, Achievements, Future direction.
- **Perilaku dropdown**: dibuka dengan klik (bukan hover), panel dua kolom (judul + deskripsi di kiri, menu di kanan), chevron berputar saat terbuka, tertutup dengan Escape / klik di luar / Tab keluar, navigasi keyboard (↓ ↑ Home End), hanya satu dropdown terbuka sekaligus. Di mobile dan tablet berubah menjadi accordion.
- **Indikator navigasi aktif**: garis aksen di bawah menu yang sesuai dengan section yang sedang dibaca.
- **Section Logo philosophy**: logo digambar ulang sebagai vektor (bentuk & warna sama). Makna resmi (hijau = alam, biru = air, satu pita = keberlanjutan) + "pembacaan lima lipatan" yang **ditandai sebagai interpretasi usulan**. Memilih kata (Research … Action) menyorot ruas logo yang sesuai.
- **Section Vision & mission** dan **Our approach** (lima langkah: Ask → Observe & research → Design & engineer → Test honestly → Share & act).
- **Section Research journal** (What we're doing): kartu status Smart Gate (status, fokus riset, teknologi, tahap, update terbaru), tahapan R-E-I-K-A dalam accordion dengan indikator level air, daftar pencapaian. Bagian yang belum ada datanya menampilkan "Not updated yet", tidak diisi karangan.
- Animasi *reveal* halus (fade + naik 8 px, sekali) hanya pada judul section. Mati otomatis saat *reduced motion*.

### File yang diubah / ditambah
| File | Perubahan |
|---|---|
| `src/content/site.ts` | Data menu dropdown, logo philosophy, vision & mission, approach, activity |
| `src/components/layout/Navbar.tsx` | Dropdown desktop, accordion mobile, indikator aktif |
| `src/components/layout/NavDropdown.tsx` | **Baru** — komponen dropdown aksesibel |
| `src/components/brand/LogoVector.tsx` | **Baru** — logo vektor dengan 5 ruas yang bisa disorot |
| `src/components/sections/About.tsx` | Dipecah menjadi `About` dan `Meaning` |
| `src/components/sections/LogoPhilosophy.tsx` | **Baru** |
| `src/components/sections/VisionApproach.tsx` | **Baru** — `VisionMission` dan `Approach` |
| `src/components/sections/Activity.tsx` | **Baru** — research journal |
| `src/components/ui/Reveal.tsx` | **Baru** — reveal judul section |
| `src/App.tsx` | Urutan section baru |

### Pengujian (Playwright, Chrome)
44 pengecekan lolos: buka/tutup dropdown (klik, Escape, klik luar), fokus kembali ke tombol, navigasi panah, panel tidak keluar layar di 1024 & 1440 px, klik menu menggulir ke section yang benar, accordion mobile di 820 & 390 px, tidak ada horizontal overflow, tidak ada teks < 12 px, tidak ada gambar rusak, semua anchor valid, modal Smart Gate tetap berjalan, tanpa console error, aman dengan *reduced motion*.

### Perlu konfirmasi tim Reika
1. **Pembacaan lima lipatan logo** — jika disetujui, ubah `readingConfirmed: true` di `site.ts` (label "Proposed interpretation" akan hilang).
2. **Vision, mission, principles, approach** — disusun dari identitas Reika di brief awal; mohon dicek kata per kata.
3. **Latest update Smart Gate** — masih `null` ("Not updated yet"). Isi dengan tanggal & isi update asli.
4. **Experiments & Future direction** — kosong. Isi array `experiments` / `futureDirection` bila ada.
5. **Achievement draf** — "5th place, EIT Water Hackathon Sofia" (proyek Bandkeeper) disiapkan dengan `published: false`. Aktifkan bila benar dan ingin ditampilkan.
6. **Status tahapan Smart Gate** (Done / In progress / Not started) — pastikan sesuai kondisi nyata.
