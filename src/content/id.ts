import type { LogoSegment, Member, NavGroup, NavLink, StageState } from './types'

/**
 * ─────────────────────────────────────────────────────────────
 *  REIKA LABS — KONTEN SITUS · BAHASA INDONESIA
 *  Struktur HARUS sama dengan en.ts (TypeScript akan memberi
 *  error jika ada bagian yang hilang). Saat mengubah teks,
 *  ubah di kedua file.
 *
 *  Kata R-E-I-K-A (Research, Engineering, Innovation, Knowledge,
 *  Action) sengaja tetap dalam bahasa Inggris karena merupakan
 *  kepanjangan nama Reika.
 * ─────────────────────────────────────────────────────────────
 */

export const site = {
  name: 'Reika Labs',
  acronym: 'Research, Engineering, Innovation, Knowledge, Action',
  year: 2026,
}

/* ── Hero ───────────────────────────────────────────────────── */
export const hero = {
  headline: 'Kami meneliti masalah air dan lingkungan, lalu membangun prototipe untuk mengatasinya',
  description:
    'Reika Labs adalah kelompok riset anak muda dari Bandung. Proyek pertama kami, Smart Gate, mengkaji pintu air otomatis untuk Situ Bugel dengan IoT dan machine learning.',
  primaryCta: { label: 'Lihat karya kami', to: '/products' },
  secondaryCta: { label: 'Kenali Reika', to: '/about' },
}

/* ── About ──────────────────────────────────────────────────── */
export const about = {
  label: 'Tentang Reika',
  title: 'Apa itu Reika?',
  lead: 'Reika Labs adalah kumpulan anak muda yang digerakkan oleh rasa ingin tahu, riset, dan inovasi.',
  body: [
    'Kami mengumpulkan ide, mengeksplorasi teknologi baru, dan mengubah apa yang kami pelajari menjadi solusi yang benar-benar bisa digunakan. Sebagian besar karya kami berawal dari hal kecil — pertanyaan tentang sebuah danau, sumur, atau lingkungan sekitar — lalu berkembang lewat observasi, pembuatan prototipe, dan pengujian yang jujur.',
    'Kami masih di tahap awal. Justru itu intinya: kami memperlakukan setiap proyek sebagai eksperimen, berkolaborasi lintas bidang, dan fokus pada masalah yang penting bagi masyarakat dan lingkungan di sekitar kami.',
  ],
  pillarsTitle: 'Lima kata di balik nama kami',
  pillars: [
    { letter: 'R', word: 'Research', text: 'Memahami masalah lewat observasi dan riset.' },
    { letter: 'E', word: 'Engineering', text: 'Mengubah konsep menjadi sistem yang nyata.' },
    { letter: 'I', word: 'Innovation', text: 'Menciptakan pendekatan dan solusi baru.' },
    { letter: 'K', word: 'Knowledge', text: 'Belajar, berbagi, dan tumbuh bersama.' },
    { letter: 'A', word: 'Action', text: 'Mewujudkan ide lewat implementasi nyata.' },
  ],
}

/* ── Members ────────────────────────────────────────────────── */
export const members = {
  label: 'Anggota',
  title: 'Kenali orang-orang di balik Reika',
  description: 'Digerakkan rasa ingin tahu, disatukan oleh inovasi',
  people: [
    {
      name: 'Dyka Hatawa',
      role: 'Chief Executive Officer',
      description: 'Memimpin visi, arah strategis, dan perjalanan inovasi Reika Labs.',
      photo: 'members/dyka-hatawa.jpg',
      initials: 'DH',
    },
    {
      name: 'Reisya Putri Ramadhani',
      role: 'Co-Founder',
      description: 'Bagian inti Reika Labs yang ikut mengembangkan dan mengarahkan inisiatif inovasi kami.',
      photo: 'members/reisya-putri-ramadhani.jpg',
      initials: 'RP',
    },
  ] satisfies Member[],
}

/* ── Products & Research ────────────────────────────────────── */
export const products = {
  label: 'Produk & riset',
  title: 'Riset & inovasi',
  description:
    'Setiap inovasi berawal dari sebuah pertanyaan. Kami mengeksplorasi ide, mengembangkan prototipe, dan mengubah riset menjadi kemungkinan.',
}

export const smartGate = {
  name: 'Smart Gate',
  status: 'Proyek riset',
  categories: ['Riset & pengembangan', 'Internet of Things', 'Machine learning', 'Pengelolaan air'],
  tagline: 'Pintu air yang membaca ketinggian dan kekeruhan air, lalu bertindak sebelum danau dipenuhi sedimen',
  description:
    'Smart Gate adalah sistem pintu air otomatis berbasis Internet of Things (IoT) dan machine learning, yang dirancang untuk memantau dan mengatur ketinggian serta kekeruhan air di Situ Bugel.',
  scopeNote:
    'Kemampuan ini menggambarkan rancangan yang diusulkan. Smart Gate masih berupa konsep riset dan belum beroperasi di lapangan.',
  featuresTitle: 'Kemampuan yang diusulkan',
  features: [
    'Pemantauan ketinggian air secara real-time',
    'Pemantauan kekeruhan air',
    'Kendali pintu air otomatis',
    'Pemantauan berbasis IoT',
    'Integrasi machine learning',
    'Pengelolaan air yang cerdas',
  ],
  recognition: 'Juara 3, Lomba Inovasi dan Kreasi Penyelamatan Danau, World Lake Day 2026 (kategori perguruan tinggi)',
  detail: [
    {
      title: 'Latar belakang',
      body: [
        'Situ Bugel adalah danau retensi kecil (luas permukaan sekitar 3.500 m²) yang juga dimanfaatkan untuk irigasi. Sejak pembangunannya selesai pada 2020, genangan di sekitar danau berkurang secara nyata.',
        'Namun, posisi danau lebih rendah dari saluran di sekitarnya, sehingga air dan sedimen tidak bisa mengalir keluar hanya dengan gravitasi. Lama-kelamaan sedimen menumpuk dan daya tampung danau berkurang.',
      ],
    },
    {
      title: 'Rumusan masalah',
      body: [
        'Pengoperasian pintu air dan pengecekan kualitas air masih bergantung pada pengamatan manual. Kenaikan muka air dan meningkatnya kekeruhan sering terlambat diketahui, sehingga sedimentasi sulit dikendalikan dan respons sebelum hujan deras menjadi terlambat.',
      ],
    },
    {
      title: 'Solusi yang diusulkan',
      body: [
        'Pintu air otomatis yang terus membaca ketinggian dan kekeruhan air, mengirim data ke platform pemantauan, lalu membuka atau menutup pintu berdasarkan aturan dan model machine learning yang dilatih dari pola historis.',
        'Warga dan pengelola danau dapat memantau kondisi lewat dasbor web sederhana, dengan kendali manual tetap berada di tangan manusia.',
      ],
    },
    {
      title: 'Teknologi',
      body: [
        'Sensor ketinggian dan kekeruhan air yang terhubung ke mikrokontroler ESP32, aktuator pintu air, alur data IoT ke basis data cloud, model machine learning untuk memprediksi ketinggian dan kekeruhan, serta dasbor web untuk pemantauan dan kendali jarak jauh.',
      ],
    },
    {
      title: 'Dampak yang diharapkan',
      body: [
        'Peringatan lebih dini saat air tinggi dan aliran masuk membawa banyak sedimen, pengoperasian pintu yang lebih konsisten, data yang lebih baik untuk perawatan danau, serta pendekatan yang dapat diterapkan di danau retensi kecil lain dengan masalah sedimentasi serupa.',
      ],
    },
  ],
}

export const reBoats = {
  name: 'RE-BOATS',
  status: 'Draf prototipe',
  categories: ['Kapal autonom', 'Pemantauan air', 'Pengumpulan sampah', 'Propulsi surya'],
  tagline: 'Konsep katamaran tenaga surya untuk pengumpulan sampah dan pemantauan air danau',
  description:
    'RE-BOATS adalah konsep katamaran autonom yang menggabungkan pengumpulan sampah permukaan, pemantauan kualitas air secara real-time, deteksi berbantuan AI, dan propulsi tenaga surya listrik.',
  scopeNote:
    'Proyek ini masih berada pada tahap prototipe dan visualisasi rekayasa. Model 3D merupakan konsep visual dan belum mewakili kapal yang beroperasi di lapangan.',
  featuresTitle: 'Modul rancangan',
  features: [
    'Platform katamaran dua lambung',
    'Saluran pengambil sampah permukaan',
    'Deteksi optik berbasis AI',
    'Sensor kualitas air',
    'Sistem tenaga surya',
    'Propulsi listrik',
  ],
  visualHref: '/re-boats.html',
  visualLabel: 'Buka visualisasi 3D',
}

/* ── Contact ────────────────────────────────────────────────── */
export const contact = {
  label: 'Kontak',
  title: 'Mari berkolaborasi',
  description: 'Punya ide, peluang riset, atau proyek? Mari jelajahi kemungkinannya bersama.',
  whatsapp: {
    display: '+62 822 9561 7543',
    href: 'https://wa.me/6282295617543',
  },
  instagram: {
    display: '@reika_team',
    href: 'https://www.instagram.com/reika_team/' as string | null,
  },
}

/* ── Footer ─────────────────────────────────────────────────── */
export const footer = {
  copyright: `© ${site.year} Reika Labs`,
}

/* ── Navigasi ───────────────────────────────────────────────── */
export const navigation: (NavLink | NavGroup)[] = [
  { kind: 'link', id: 'home', to: '/', label: 'Beranda' },
  {
    kind: 'group',
    id: 'about-menu',
    base: '/about',
    label: 'Tentang Reika',
    title: 'Siapa kami',
    description: 'Orang-orang, nama, dan cara berpikir di balik Reika Labs.',
    items: [
      { id: 'about', to: '/about', label: 'Tentang Reika', description: 'Siapa kami dan mengapa kami ada' },
      { id: 'meaning', to: '/about/meaning', label: 'Makna Reika', description: 'Research, Engineering, Innovation, Knowledge, Action' },
      { id: 'logo', to: '/about/logo', label: 'Filosofi logo', description: 'Makna huruf R berbentuk pita' },
      { id: 'vision', to: '/about/vision', label: 'Visi & misi', description: 'Arah tujuan dan cara kami bekerja' },
      { id: 'approach', to: '/about/approach', label: 'Pendekatan kami', description: 'Dari pertanyaan lokal ke solusi yang teruji' },
    ],
  },
  { kind: 'link', id: 'members', to: '/members', label: 'Anggota' },
  { kind: 'link', id: 'products', to: '/products', label: 'Produk' },
  {
    kind: 'group',
    id: 'activity-menu',
    base: '/activities',
    label: 'Kegiatan kami',
    title: 'Jurnal riset',
    description: 'Apa yang sedang dikerjakan Reika, disampaikan jujur tahap demi tahap.',
    items: [
      { id: 'current-research', to: '/activities/research', label: 'Riset saat ini', description: 'Masalah yang sedang kami pelajari' },
      { id: 'project-development', to: '/activities/projects', label: 'Pengembangan proyek', description: 'Posisi Smart Gate, tahap demi tahap' },
      { id: 'experiments', to: '/activities/experiments', label: 'Eksperimen & eksplorasi', description: 'Uji coba kecil dan ide yang sedang berjalan' },
      { id: 'achievements', to: '/activities/achievements', label: 'Pencapaian', description: 'Kompetisi dan penghargaan' },
      { id: 'future-direction', to: '/activities/future', label: 'Arah ke depan', description: 'Langkah Reika selanjutnya' },
    ],
  },
]

/* ── Filosofi logo ──────────────────────────────────────────── */
export const logoPhilosophy = {
  label: 'Filosofi logo',
  title: 'Satu pita, tanpa putus',
  intro:
    'Logo Reika adalah huruf R yang terbentuk dari satu pita tanpa putus. Logo ini membawa dua warna dan satu gagasan: alam dan air adalah satu kesatuan, sama seperti inovasi dan keberlanjutan.',
  official: [
    { term: 'Hijau', swatch: '#2ecdbb', text: 'Kecintaan kami pada alam dan lingkungan tempat kita hidup.' },
    { term: 'Biru', swatch: '#00b7f9', text: 'Kecintaan kami pada air, fokus dari sebagian besar riset kami.' },
    {
      term: 'Satu pita',
      swatch: null as string | null,
      text: 'Sebuah siklus yang terus berlanjut. Alam dan air tidak bisa dipisahkan, begitu pula inovasi dan keberlanjutan.',
    },
  ],
  readingTitle: 'Membaca lima lipatan',
  readingNote: 'Interpretasi usulan, menunggu konfirmasi dari tim Reika.',
  /** Ubah menjadi true di KEDUA file setelah tim menyetujui. */
  readingConfirmed: false,
  reading: [
    { segment: 'stem' as LogoSegment, value: 'Research', text: 'Garis tegak tempat semuanya bertumbuh: rasa ingin tahu dan eksplorasi.' },
    { segment: 'top' as LogoSegment, value: 'Engineering', text: 'Garis lurus dan terukur: struktur dan proses membangun.' },
    { segment: 'middle' as LogoSegment, value: 'Innovation', text: 'Lipatan yang berbalik arah: keberanian mencoba pendekatan baru.' },
    { segment: 'bottom' as LogoSegment, value: 'Knowledge', text: 'Garis yang mengalir keluar: pengetahuan yang dibagikan dan diwariskan.' },
    { segment: 'hook' as LogoSegment, value: 'Action', text: 'Pita yang naik dan menjangkau: gagasan yang diubah menjadi tindakan.' },
  ],
}

/* ── Visi & misi, pendekatan ────────────────────────────────── */
export const visionMission = {
  label: 'Visi & misi',
  vision:
    'Ide-ide kreatif dari peneliti muda yang menjadi solusi nyata dan bermanfaat bagi masyarakat dan lingkungan.',
  mission: [
    'Mempelajari masalah nyata di sekitar kita, dimulai dari observasi dan riset',
    'Mengubah hasil belajar menjadi prototipe rekayasa, lalu mengujinya secara jujur',
    'Membagikan temuan secara terbuka, termasuk yang tidak berhasil',
    'Bekerja bersama masyarakat, mentor, dan mitra, bukan sendirian',
  ],
  principles: [
    { term: 'Status yang jujur', text: 'Kami menyebutkan tahap sebuah proyek apa adanya. Konsep disebut konsep.' },
    { term: 'Mulai dari yang dekat', text: 'Kami memulai dari tempat yang bisa kami datangi: danau, sumur, lingkungan sekitar.' },
    { term: 'Berkelanjutan sejak awal', text: 'Alam dan air didahulukan dalam setiap keputusan rancangan.' },
  ],
}

export const approach = {
  label: 'Pendekatan kami',
  title: 'Dari pertanyaan lokal ke solusi yang teruji',
  steps: [
    { title: 'Bertanya', text: 'Mulai dari pertanyaan nyata tentang tempat yang kami kenal, seperti danau yang daya tampungnya terus berkurang.' },
    { title: 'Mengamati & meneliti', text: 'Datang ke lokasi, mengukur, membaca literatur, dan berbicara dengan orang yang mengalami masalahnya.' },
    { title: 'Merancang & membangun', text: 'Membuat rancangan sistem, memilih sensor dan perangkat keras, lalu membangun versi terkecil yang bisa diuji.' },
    { title: 'Menguji dengan jujur', text: 'Membandingkan hasil dengan harapan, dan mencatat kegagalan secermat keberhasilan.' },
    { title: 'Berbagi & bertindak', text: 'Mempublikasikan hasil belajar, mengikutkannya untuk dinilai, dan bergerak menuju implementasi nyata bersama mitra.' },
  ],
}

/* ── Kegiatan kami — jurnal riset ───────────────────────────── */
export const activity = {
  label: 'Kegiatan kami',
  title: 'Jurnal riset',
  intro:
    'Catatan apa adanya tentang yang sedang dikerjakan Reika. Jika sesuatu belum diperbarui, kami katakan begitu, bukan mengisinya dengan karangan.',
  notUpdated: 'Belum diperbarui',

  currentResearch: {
    project: 'Smart Gate',
    summary:
      'Mempelajari bagaimana pintu air otomatis dapat mengatur ketinggian dan kekeruhan air di Situ Bugel, danau retensi yang tidak bisa membuang sedimen secara gravitasi.',
    facts: [
      { term: 'Status proyek', value: 'Proyek riset, tahap konsep' },
      { term: 'Fokus riset', value: 'Ketinggian air, kekeruhan, dan sedimentasi di Situ Bugel' },
      { term: 'Teknologi', value: 'Internet of Things (sensor ESP32), machine learning, dasbor web' },
      { term: 'Tahap pengembangan', value: 'Konsep sistem terdokumentasi dalam karya tulis ilmiah' },
      { term: 'Pembaruan terakhir', value: null as string | null },
    ],
  },

  development: [
    {
      stage: 'Research',
      state: 'done' as StageState,
      title: 'Masalah telah dipelajari',
      text: 'Situ Bugel lebih rendah dari saluran di sekitarnya, sehingga air dan sedimen tidak bisa keluar secara gravitasi. Pengoperasian pintu dan pengecekan air masih manual.',
    },
    {
      stage: 'Engineering',
      state: 'current' as StageState,
      title: 'Sistem dirancang di atas kertas',
      text: 'Sensor ketinggian dan kekeruhan pada ESP32, aktuator pintu air, dan alur data ke cloud. Belum ada prototipe fisik yang dibangun.',
    },
    {
      stage: 'Innovation',
      state: 'current' as StageState,
      title: 'Model keputusan diusulkan',
      text: 'Keputusan pintu air dari aturan sederhana ditambah model machine learning yang dilatih dari pola historis ketinggian dan kekeruhan.',
    },
    {
      stage: 'Knowledge',
      state: 'done' as StageState,
      title: 'Didokumentasikan dan dinilai',
      text: 'Ditulis sebagai karya tulis ilmiah dan dipresentasikan di kompetisi World Lake Day 2026.',
    },
    {
      stage: 'Action',
      state: 'planned' as StageState,
      title: 'Implementasi di lapangan',
      text: 'Belum dimulai. Smart Gate belum beroperasi di Situ Bugel.',
    },
  ],

  experiments: [] as { title: string; date: string; text: string }[],

  achievements: [
    {
      year: '2026',
      title: 'Juara 3, Lomba Inovasi dan Kreasi Penyelamatan Danau',
      event: 'World Lake Day 2026, kategori perguruan tinggi',
      project: 'Smart Gate',
      published: true,
    },
    // Draf — aktifkan (published: true) di KEDUA file setelah dikonfirmasi tim:
    {
      year: '2026',
      title: 'Peringkat 5, EIT Water Hackathon Sofia',
      event: 'Partisipasi daring sebagai tim Reika',
      project: 'Bandkeeper',
      published: false,
    },
  ],

  futureDirection: [] as { title: string; text: string }[],
}

/* ── Teks antarmuka ─────────────────────────────────────────── */
export const ui = {
  skipToContent: 'Langsung ke konten',
  homeAria: 'Reika Labs, beranda',
  openMenu: 'Buka menu',
  closeMenu: 'Tutup menu',
  language: 'Bahasa',
  previous: 'Sebelumnya',
  next: 'Berikutnya',
  pagesInSection: 'Halaman di bagian ini',

  meaningLabel: 'Makna Reika',
  acronymNote: 'REIKA adalah singkatan dari: {acronym}.',
  logoTitle: 'Logo Reika Labs: huruf R yang terlipat dari satu pita',
  selectFold: 'Pilih sebuah kata untuk melihat lipatannya di logo.',
  vision: 'Visi',
  mission: 'Misi',
  principles: 'Prinsip',

  portraitAlt: 'Foto {name}, {role} di Reika Labs',
  photoSoon: 'Foto {name} segera hadir',

  diagramCaption: 'Diagram konsep sistem, ilustrasi dan bukan data langsung',
  exploreProject: 'Lihat proyek',
  show3dModel: 'Tampilkan model 3D',
  closeProject: 'Tutup detail proyek',
  recognition: 'Penghargaan',
  interestedTitle: 'Tertarik dengan riset ini?',
  interestedText: 'Kami terbuka untuk mentor, mitra, dan komunitas yang ingin mengembangkan Smart Gate bersama kami.',
  opensWhatsapp: '(membuka WhatsApp)',

  journalNav: 'Jurnal riset',
  projectDetails: 'Detail proyek',
  whyThisLake: 'Mengapa danau ini',
  stagesTitle: 'Tahap pengembangan',
  stagesLead: 'Smart Gate, dibaca tahap demi tahap. Buka sebuah tahap untuk detailnya.',
  stateDone: 'Selesai',
  stateCurrent: 'Berjalan',
  statePlanned: 'Belum dimulai',
  notUpdatedLong: 'Tim Reika akan menampilkannya di sini jika sudah ada hal nyata untuk dilaporkan.',
  experimentsLogTitle: 'Cara eksperimen dicatat',
  experimentsLogBefore:
    'Setiap catatan akan memuat tanggal, pertanyaan yang diuji, susunan percobaan, dan hasilnya, termasuk percobaan yang tidak berhasil. Lihat ',
  experimentsLogLink: 'pendekatan kami',
  experimentsLogAfter: ' untuk cara kami menjalankannya.',
  achievementsLead: 'Hanya penghargaan yang benar-benar telah kami terima.',
  projectLabel: 'Proyek',
  openStageTitle: 'Tahap yang belum dimulai di riset saat ini',

  insideReika: 'Isi Reika',
  directoryTitle: 'Kelompok riset yang terdokumentasi secara terbuka',
  directoryText: 'Kenali siapa kami, makna nama dan logo kami, serta posisi setiap proyek yang sebenarnya.',
  currentResearch: 'Riset saat ini',
  openJournal: 'Buka jurnal riset',
  meetMembers: 'Kenali anggota',
  seeProducts: 'Lihat produk & riset',

  notFoundGauge: 'level 0,00 m',
  notFoundTitle: 'Tidak ada yang terukur di sini',
  notFoundText: 'Halaman ini tidak ada atau sudah dipindahkan. Tautan di bawah akan membawa kembali ke bagian Reika yang tersedia.',
  notFoundPageTitle: 'Halaman tidak ditemukan',
  backHome: 'Kembali ke beranda',
}
