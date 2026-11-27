import type { LogoSegment, Member, NavGroup, NavLink, StageState } from './types'

/**
 * ─────────────────────────────────────────────────────────────
 *  REIKA LABS — SITE CONTENT · ENGLISH
 *  Versi Bahasa Indonesia ada di id.ts dengan struktur yang SAMA.
 *  Saat mengubah teks, ubah di kedua file.
 *  Semua teks, anggota, proyek, dan kontak ada di file ini.
 *  Ubah di sini; komponen akan mengikuti otomatis.
 *
 *  Gaya penulisan: sentence case, tanpa titik di akhir judul,
 *  label, dan tombol. Paragraf panjang tetap memakai titik.
 * ─────────────────────────────────────────────────────────────
 */

export const site = {
  name: 'Reika Labs',
  acronym: 'Research, Engineering, Innovation, Knowledge, Action',
  year: 2026,
}

/* ── Hero ───────────────────────────────────────────────────── */
export const hero = {
  headline: 'We research water and environmental problems, then build prototypes to solve them',
  description:
    'Reika Labs is a youth-driven research group from Bandung. Our first project, Smart Gate, explores an automated water gate for Situ Bugel using IoT and machine learning.',
  primaryCta: { label: 'Explore our work', to: '/products' },
  secondaryCta: { label: 'Discover Reika', to: '/about' },
}

/* ── About ──────────────────────────────────────────────────── */
export const about = {
  label: 'About Reika',
  title: 'What is Reika?',
  lead: 'Reika Labs is a collective of young minds driven by curiosity, research, and innovation.',
  body: [
    'We bring ideas together, explore emerging technologies, and turn what we learn into solutions people can actually use. Most of our work starts small — a question about a lake, a well, a neighbourhood — and grows through observation, prototyping, and honest testing.',
    'We are still early. That is the point: we treat every project as an experiment, collaborate across disciplines, and focus on problems that matter to communities and the environment around us.',
  ],
  pillarsTitle: 'Five words behind the name',
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
export const members = {
  label: 'Members',
  title: 'Meet the people behind Reika',
  description: 'Driven by curiosity, united by innovation',
  people: [
    {
      name: 'Dyka Hatawa',
      role: 'Chief Executive Officer',
      description: "Leads Reika Labs' vision, strategic direction, and innovation journey.",
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
  label: 'Products & research',
  title: 'Research & innovations',
  description:
    'Every innovation begins with a question. We explore ideas, develop prototypes, and transform research into possibilities.',
}

export const smartGate = {
  name: 'Smart Gate',
  status: 'Research project',
  categories: ['Research & development', 'Internet of Things', 'Machine learning', 'Water management'],
  tagline: 'A water gate that reads level and turbidity, and responds before the lake fills with sediment',
  description:
    'Smart Gate is an automated water gate system based on Internet of Things (IoT) and machine learning, designed to monitor and regulate water levels and turbidity in Situ Bugel.',
  scopeNote:
    'These capabilities describe the proposed design. Smart Gate is a research concept and is not yet operating in the field.',
  featuresTitle: 'Proposed capabilities',
  features: [
    'Real-time water level monitoring',
    'Water turbidity monitoring',
    'Automated water gate control',
    'IoT-based monitoring',
    'Machine learning integration',
    'Intelligent water management',
  ],
  /** Tampil di modal "Explore project". Hapus/ubah sesuai kebutuhan. */
  recognition: '3rd place, Lake Innovation & Creation Competition, World Lake Day 2026 (university category)',
  detail: [
    {
      title: 'Background',
      body: [
        'Situ Bugel is a small retention lake (roughly 3,500 m² of surface area) that also serves local irrigation. Since its construction was completed in 2020, flooding around the lake has decreased noticeably.',
        'But the lake sits lower than the surrounding channels, so water and sediment cannot drain out by gravity alone. Over time, sediment builds up and the lake loses capacity.',
      ],
    },
    {
      title: 'Problem statement',
      body: [
        'Gate operation and water-quality checks depend on manual observation. Rising water levels and increasing turbidity are often noticed late, which makes it harder to manage sedimentation and to respond before heavy rain.',
      ],
    },
    {
      title: 'Proposed solution',
      body: [
        'An automated water gate that continuously reads water level and turbidity, sends readings to a monitoring platform, and opens or closes the gate based on rules and a machine-learning model trained on historical patterns.',
        'Residents and lake managers would be able to follow conditions through a simple web dashboard, with manual override kept in human hands.',
      ],
    },
    {
      title: 'Technology',
      body: [
        'Water level and turbidity sensors connected to an ESP32 microcontroller, a gate actuator, an IoT data pipeline to a cloud database, a machine-learning model for level and turbidity prediction, and a web dashboard for monitoring and remote control.',
      ],
    },
    {
      title: 'Expected impact',
      body: [
        'Earlier warning of high water and sediment-heavy inflow, more consistent gate operation, better data for lake maintenance, and a replicable approach for other small retention lakes facing the same sedimentation problem.',
      ],
    },
  ],
}

export const reBoats = {
  name: 'RE-BOATS',
  status: 'Draft prototype',
  categories: ['Autonomous vessel', 'Water monitoring', 'Waste collection', 'Solar propulsion'],
  tagline: 'A solar-electric catamaran concept for waste collection and lake water monitoring',
  description:
    'RE-BOATS is an autonomous catamaran concept that combines surface waste collection, real-time water-quality monitoring, AI-assisted detection, and solar-electric propulsion.',
  scopeNote:
    'This project is still at the prototype and engineering-visualization stage. The 3D model is a visual concept and does not represent a vessel operating in the field.',
  featuresTitle: 'Design modules',
  features: [
    'Twin-hull catamaran platform',
    'Surface waste intake',
    'AI optical detection',
    'Water-quality sensor suite',
    'Solar power system',
    'Electric propulsion',
  ],
  visualHref: '/re-boats.html',
  visualLabel: 'Open 3D visualization',
}

/* ── Contact ────────────────────────────────────────────────── */
export const contact = {
  label: 'Contact',
  title: "Let's collaborate",
  description: "Have an idea, a research opportunity, or a project in mind? Let's explore what's possible together.",
  whatsapp: {
    display: '+62 822 9561 7543',
    href: 'https://wa.me/6282295617543',
  },
  instagram: {
    display: '@reika_team',
    /** Ganti jika username Instagram berubah. Isi null untuk menyembunyikan link. */
    href: 'https://www.instagram.com/reika_team/' as string | null,
  },
}

/* ── Footer ─────────────────────────────────────────────────── */
export const footer = {
  copyright: `© ${site.year} Reika Labs`,
}

/* ═════════════════════════════════════════════════════════════
   NAVIGATION — setiap menu & submenu adalah halaman (route) sendiri.
   `to` = URL halaman. `title` dipakai untuk judul tab browser.
   ═════════════════════════════════════════════════════════════ */

export const navigation: (NavLink | NavGroup)[] = [
  { kind: 'link', id: 'home', to: '/', label: 'Home' },
  {
    kind: 'group',
    id: 'about-menu',
    base: '/about',
    label: 'About Reika',
    title: 'Who we are',
    description: 'The people, the name, and the thinking behind Reika Labs.',
    items: [
      { id: 'about', to: '/about', label: 'About Reika', description: 'Who we are and why we exist' },
      { id: 'meaning', to: '/about/meaning', label: 'Meaning of Reika', description: 'Research, Engineering, Innovation, Knowledge, Action' },
      { id: 'logo', to: '/about/logo', label: 'Logo philosophy', description: 'What the ribbon R stands for' },
      { id: 'vision', to: '/about/vision', label: 'Vision & mission', description: 'Where we are heading and how we work' },
      { id: 'approach', to: '/about/approach', label: 'Our approach', description: 'From a local question to a tested solution' },
    ],
  },
  { kind: 'link', id: 'members', to: '/members', label: 'Members' },
  { kind: 'link', id: 'products', to: '/products', label: 'Products' },
  {
    kind: 'group',
    id: 'activity-menu',
    base: '/activities',
    label: "What we're doing",
    title: 'Research journal',
    description: 'What Reika is working on now, stated honestly, stage by stage.',
    items: [
      { id: 'current-research', to: '/activities/research', label: 'Current research', description: 'Problems we are studying right now' },
      { id: 'project-development', to: '/activities/projects', label: 'Project development', description: 'Where Smart Gate stands, stage by stage' },
      { id: 'experiments', to: '/activities/experiments', label: 'Experiments & exploration', description: 'Small tests and ideas in progress' },
      { id: 'achievements', to: '/activities/achievements', label: 'Achievements', description: 'Competitions and recognition' },
      { id: 'future-direction', to: '/activities/future', label: 'Future direction', description: 'What comes next for Reika' },
    ],
  },
]


/* ═════════════════════════════════════════════════════════════
   LOGO PHILOSOPHY
   `official` = makna yang sudah disampaikan tim Reika.
   `reading`  = interpretasi visual yang DIUSULKAN — tandai
                confirmed: true setelah disetujui tim.
   ═════════════════════════════════════════════════════════════ */

export const logoPhilosophy = {
  label: 'Logo philosophy',
  title: 'One ribbon, never broken',
  intro:
    'The Reika mark is the letter R, folded from a single ribbon that never breaks. It carries two colours and one idea: nature and water belong together, just like innovation and sustainability.',
  official: [
    { term: 'Green', swatch: '#2ecdbb', text: 'Our love for nature and the environment we live in.' },
    { term: 'Blue', swatch: '#00b7f9', text: 'Our love for water, the focus of most of our research.' },
    { term: 'One ribbon', swatch: null as string | null, text: 'A continuous cycle. Nature and water cannot be separated, and neither can innovation and sustainability.' },
  ],
  readingTitle: 'A reading of the five folds',
  readingNote: 'Proposed interpretation, awaiting confirmation from the Reika team.',
  /** Set to true once the team agrees with the five-fold reading below. */
  readingConfirmed: false,
  reading: [
    { segment: 'stem' as LogoSegment, value: 'Research', text: 'The upright stroke everything grows from: curiosity and exploration.' },
    { segment: 'top' as LogoSegment, value: 'Engineering', text: 'A straight, measured line: structure and the process of building.' },
    { segment: 'middle' as LogoSegment, value: 'Innovation', text: 'The fold that turns back the other way: the nerve to try a new approach.' },
    { segment: 'bottom' as LogoSegment, value: 'Knowledge', text: 'The stroke that carries outward: knowledge exchanged and passed on.' },
    { segment: 'hook' as LogoSegment, value: 'Action', text: 'The ribbon rises and reaches out: ideas turned into action.' },
  ],
}

/* ═════════════════════════════════════════════════════════════
   VISION & MISSION, APPROACH
   Disusun dari identitas Reika di brief awal. Mohon dikonfirmasi tim.
   ═════════════════════════════════════════════════════════════ */
export const visionMission = {
  label: 'Vision & mission',
  vision:
    'Creative ideas from young researchers that become real, useful solutions for communities and the environment.',
  mission: [
    'Study real problems around us, starting from observation and research',
    'Turn what we learn into engineered prototypes, and test them honestly',
    'Share our findings openly, including what did not work',
    'Work with communities, mentors, and partners instead of alone',
  ],
  principles: [
    { term: 'Honest status', text: 'We say what stage a project is at. A concept is called a concept.' },
    { term: 'Local first', text: 'We start with places we can visit: a lake, a well, a neighbourhood.' },
    { term: 'Sustainable by default', text: 'Nature and water come first in every design decision.' },
  ],
}

export const approach = {
  label: 'Our approach',
  title: 'From a local question to a tested solution',
  steps: [
    { title: 'Ask', text: 'Start from a concrete question about a place we know, like a lake that keeps losing capacity.' },
    { title: 'Observe & research', text: 'Visit, measure, read the literature, and talk to the people who live with the problem.' },
    { title: 'Design & engineer', text: 'Sketch a system, choose the sensors and hardware, and build the smallest version that can be tested.' },
    { title: 'Test honestly', text: 'Compare results with what we expected, and write down what failed as carefully as what worked.' },
    { title: 'Share & act', text: 'Publish what we learned, enter it for review, and move toward real implementation with partners.' },
  ],
}

/* ═════════════════════════════════════════════════════════════
   WHAT WE'RE DOING — RESEARCH JOURNAL
   Jangan isi dengan aktivitas atau tanggal karangan.
   Entri dengan `published: false` tidak ditampilkan.
   ═════════════════════════════════════════════════════════════ */

export const activity = {
  label: "What we're doing",
  title: 'Research journal',
  intro:
    'A plain record of what Reika is working on. If something has not been updated yet, we say so instead of filling the gap.',
  notUpdated: 'Not updated yet',

  currentResearch: {
    project: 'Smart Gate',
    summary:
      'Studying how an automated water gate could manage water level and turbidity in Situ Bugel, a retention lake that cannot drain sediment by gravity.',
    facts: [
      { term: 'Project status', value: 'Research project, concept stage' },
      { term: 'Research focus', value: 'Water level, turbidity, and sedimentation in Situ Bugel' },
      { term: 'Technology used', value: 'Internet of Things (ESP32 sensors), machine learning, web dashboard' },
      { term: 'Development stage', value: 'System concept documented in a scientific paper' },
      /** Ganti `null` dengan tanggal & isi update terbaru, mis. 'Nov 2026 — ...' */
      { term: 'Latest update', value: null as string | null },
    ],
  },

  /** Smart Gate, stage by stage, mapped to R-E-I-K-A. */
  development: [
    {
      stage: 'Research',
      state: 'done' as StageState,
      title: 'Problem studied',
      text: 'Situ Bugel sits lower than its surrounding channels, so water and sediment cannot leave by gravity. Gate operation and water checks are manual.',
    },
    {
      stage: 'Engineering',
      state: 'current' as StageState,
      title: 'System designed on paper',
      text: 'Level and turbidity sensors on an ESP32, a gate actuator, and a cloud data pipeline. No physical prototype has been built yet.',
    },
    {
      stage: 'Innovation',
      state: 'current' as StageState,
      title: 'Decision model proposed',
      text: 'Gate decisions from simple rules plus a machine-learning model trained on historical level and turbidity patterns.',
    },
    {
      stage: 'Knowledge',
      state: 'done' as StageState,
      title: 'Documented and reviewed',
      text: 'Written up as a scientific paper and presented at the World Lake Day 2026 competition.',
    },
    {
      stage: 'Action',
      state: 'planned' as StageState,
      title: 'Field implementation',
      text: 'Not started. Smart Gate is not operating at Situ Bugel.',
    },
  ],

  experiments: [] as { title: string; date: string; text: string }[],

  achievements: [
    {
      year: '2026',
      title: '3rd place, Lake Innovation & Creation Competition',
      event: 'World Lake Day 2026, university category',
      project: 'Smart Gate',
      published: true,
    },
    // Draf — aktifkan (published: true) setelah dikonfirmasi tim:
    {
      year: '2026',
      title: '5th place, EIT Water Hackathon Sofia',
      event: 'Remote participation as team Reika',
      project: 'Bandkeeper',
      published: false,
    },
  ],

  futureDirection: [] as { title: string; text: string }[],
}

/* ═════════════════════════════════════════════════════════════
   UI — short interface strings used inside components.
   {name}-style placeholders are filled in by fmt().
   ═════════════════════════════════════════════════════════════ */
export const ui = {
  skipToContent: 'Skip to content',
  homeAria: 'Reika Labs, home',
  openMenu: 'Open menu',
  closeMenu: 'Close menu',
  language: 'Language',
  previous: 'Previous',
  next: 'Next',
  pagesInSection: 'Pages in this section',

  meaningLabel: 'Meaning of Reika',
  acronymNote: 'REIKA is an acronym: {acronym}.',
  logoTitle: 'Reika Labs logo: the letter R folded from a single ribbon',
  selectFold: 'Select a word to see its fold in the logo.',
  vision: 'Vision',
  mission: 'Mission',
  principles: 'Principles',

  portraitAlt: 'Portrait of {name}, {role} at Reika Labs',
  photoSoon: 'Photo of {name} coming soon',

  diagramCaption: 'Conceptual system diagram, illustrative and not live data',
  exploreProject: 'Explore project',
  closeProject: 'Close project details',
  recognition: 'Recognition',
  interestedTitle: 'Interested in this research?',
  interestedText: 'We are open to mentors, partners, and communities who want to explore Smart Gate with us.',
  opensWhatsapp: '(opens WhatsApp)',

  journalNav: 'Research journal',
  projectDetails: 'Project details',
  whyThisLake: 'Why this lake',
  stagesTitle: 'Development stages',
  stagesLead: 'Smart Gate, read stage by stage. Open a stage for details.',
  stateDone: 'Done',
  stateCurrent: 'In progress',
  statePlanned: 'Not started',
  notUpdatedLong: 'The Reika team will publish it here when there is something real to report.',
  experimentsLogTitle: 'How experiments are logged',
  experimentsLogBefore:
    'Each entry will record the date, the question being tested, the setup, and the result, including tests that did not work. See ',
  experimentsLogLink: 'our approach',
  experimentsLogAfter: ' for how we run them.',
  achievementsLead: 'Only recognition we have actually received.',
  projectLabel: 'Project',
  openStageTitle: 'Open stage in current research',

  insideReika: 'Inside Reika',
  directoryTitle: 'A research group, documented in the open',
  directoryText: 'Read who we are, what our name and logo stand for, and where each project actually stands.',
  currentResearch: 'Current research',
  openJournal: 'Open research journal',
  meetMembers: 'Meet the members',
  seeProducts: 'See products & research',

  notFoundGauge: 'level 0.00 m',
  notFoundTitle: 'Nothing measured here',
  notFoundText: 'This page does not exist, or it has moved. The links below lead back to the parts of Reika that do.',
  notFoundPageTitle: 'Page not found',
  backHome: 'Back to home',
}
