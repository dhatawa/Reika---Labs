/**
 * ─────────────────────────────────────────────────────────────
 *  REIKA LABS — SITE CONTENT
 *  Semua teks, anggota, proyek, dan kontak ada di file ini.
 *  Ubah di sini; komponen akan mengikuti otomatis.
 * ─────────────────────────────────────────────────────────────
 */

export const site = {
  name: 'Reika Labs',
  acronym: 'Research, Engineering, Innovation, Knowledge, Action',
  motto: 'Curiosity drives research. Innovation creates impact.',
  year: 2026,
}

/* ── Navigation ─────────────────────────────────────────────── */
export const nav = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About Reika' },
  { id: 'members', label: 'Members' },
  { id: 'products', label: 'Products' },
] as const

/* ── Hero ───────────────────────────────────────────────────── */
export const hero = {
  eyebrow: 'Youth-driven innovation group · Bandung, Indonesia',
  headline: ['Turning Ideas', 'Into Real-World', 'Innovations.'],
  subheadline: 'Researching, engineering, and building innovative solutions for a better future.',
  description:
    'We are Reika Labs — a youth-driven innovation group exploring the intersection of research, engineering, and technology to create meaningful solutions.',
  primaryCta: { label: 'Explore Our Work', href: '#products' },
  secondaryCta: { label: 'Discover Reika', href: '#about' },
}

/* ── About ──────────────────────────────────────────────────── */
export const about = {
  index: '01',
  label: 'About Reika',
  title: 'What is Reika?',
  lead: 'Reika Labs is a collective of young minds driven by curiosity, research, and innovation.',
  body: [
    'We bring ideas together, explore emerging technologies, and turn what we learn into solutions people can actually use. Most of our work starts small — a question about a lake, a well, a neighbourhood — and grows through observation, prototyping, and honest testing.',
    'We are still early. That is the point: we treat every project as an experiment, collaborate across disciplines, and focus on problems that matter to communities and the environment around us.',
  ],
  pillars: [
    { letter: 'R', word: 'Research', text: 'Exploring problems through observation and research.' },
    { letter: 'E', word: 'Engineering', text: 'Turning concepts into practical systems.' },
    { letter: 'I', word: 'Innovation', text: 'Creating new approaches and solutions.' },
    { letter: 'K', word: 'Knowledge', text: 'Learning, sharing, and growing together.' },
    { letter: 'A', word: 'Action', text: 'Making ideas happen through real implementation.' },
  ],
}

/* ── Members ────────────────────────────────────────────────── */
/**
 * FOTO ANGGOTA
 * Taruh foto di folder  public/members/  dengan nama file persis seperti `photo`.
 * Rasio yang disarankan: 4:5 (portrait), minimal 1000 × 1250 px, format .jpg/.webp.
 * Jika file belum ada, website otomatis menampilkan placeholder.
 */
export type Member = {
  name: string
  role: string
  description: string
  photo: string
  initials: string
}

export const members = {
  index: '02',
  label: 'Members',
  title: 'Meet the People Behind Reika.',
  description: 'Driven by curiosity, united by innovation.',
  people: [
    {
      name: 'Dyka Hatawa',
      role: 'Chief Executive Officer (CEO)',
      description: "The person leading Reika Labs' vision, strategic direction, and innovation journey.",
      photo: 'members/dyka-hatawa.jpg',
      initials: 'DH',
    },
    {
      name: 'Reisya Putri Ramadhani',
      role: 'Co-Founder',
      description:
        'A core part of Reika Labs, contributing to the development and direction of our innovation initiatives.',
      photo: 'members/reisya-putri-ramadhani.jpg',
      initials: 'RP',
    },
  ] satisfies Member[],
}

/* ── Products & Research ────────────────────────────────────── */
export const products = {
  index: '03',
  label: 'Products & Research',
  title: 'Our Research & Innovations',
  description:
    'Every innovation begins with a question. We explore ideas, develop prototypes, and transform research into possibilities.',
}

export const smartGate = {
  name: 'Smart Gate',
  status: 'Research Project',
  categories: ['Research & Development', 'Internet of Things', 'Machine Learning', 'Water Management'],
  tagline: 'Intelligent Water Management for a Smarter Future.',
  description:
    'Smart Gate is an automated water gate system based on Internet of Things (IoT) and Machine Learning, designed to monitor and regulate water levels and turbidity in Situ Bugel.',
  scopeNote:
    'The capabilities below describe the proposed system design. Smart Gate is a research concept and is not yet operating in the field.',
  features: [
    'Real-Time Water Level Monitoring',
    'Water Turbidity Monitoring',
    'Automated Water Gate Control',
    'IoT-Based Monitoring',
    'Machine Learning Integration',
    'Intelligent Water Management',
  ],
  /** Tampil di modal "Explore Project". Hapus/ubah sesuai kebutuhan. */
  recognition: '3rd Place — Lake Innovation & Creation Competition, World Lake Day 2026 (University category).',
  detail: [
    {
      title: 'Background',
      body: [
        'Situ Bugel is a small retention lake (roughly 3,500 m² of surface area) that also serves local irrigation. Since its construction was completed in 2020, flooding around the lake has decreased noticeably.',
        'But the lake sits lower than the surrounding channels, so water and sediment cannot drain out by gravity alone. Over time, sediment builds up and the lake loses capacity.',
      ],
    },
    {
      title: 'Problem Statement',
      body: [
        'Gate operation and water-quality checks depend on manual observation. Rising water levels and increasing turbidity are often noticed late, which makes it harder to manage sedimentation and to respond before heavy rain.',
      ],
    },
    {
      title: 'Proposed Solution',
      body: [
        'An automated water gate that continuously reads water level and turbidity, sends readings to a monitoring platform, and opens or closes the gate based on rules and a machine-learning model trained on historical patterns.',
        'Residents and lake managers would be able to follow conditions through a simple web dashboard, with manual override kept in human hands.',
      ],
    },
    {
      title: 'Technology',
      body: [
        'Water level and turbidity sensors connected to an ESP32 microcontroller · gate actuator · IoT data pipeline to a cloud database · machine-learning model for level and turbidity prediction · web dashboard for monitoring and remote control.',
      ],
    },
    {
      title: 'Expected Impact',
      body: [
        'Earlier warning of high water and sediment-heavy inflow, more consistent gate operation, better data for lake maintenance, and a replicable approach for other small retention lakes facing the same sedimentation problem.',
      ],
    },
  ],
}

/* ── Contact ────────────────────────────────────────────────── */
export const contact = {
  index: '04',
  label: 'Contact',
  title: "Let's Collaborate",
  description: "Have an idea, a research opportunity, or a project in mind? Let's explore what's possible together.",
  whatsapp: {
    display: '+62 822 9561 7543',
    href: 'https://wa.me/6282295617543',
  },
  instagram: {
    display: 'Reika Labs',
    /**
     * TODO: ganti dengan URL Instagram resmi, contoh:
     * 'https://www.instagram.com/reikalabs/'
     * Selama masih null, tombol Instagram ditampilkan non-aktif.
     */
    href: null as string | null,
  },
}

/* ── Footer ─────────────────────────────────────────────────── */
export const footer = {
  copyright: `© ${site.year} Reika Labs. Built with curiosity and innovation.`,
}
