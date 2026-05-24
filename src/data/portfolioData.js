// ============================================================
// DATA PORTOFOLIO
// ============================================================

export const personalInfo = {
  name: "Andini Syifa Rokhima",
  nickname: "Andini",
  title: "Siswi SMK Wikrama Bogor Jurusan MPLB",
  tagline: "Siswi SMK Wikrama Bogor Jurusan MPLB yang aktif, disiplin, dan siap berkembang di dunia kerja profesional.",
  school: "SMK Wikrama Bogor",
  major: "Manajemen Perkantoran dan Layanan Bisnis",
  email: "andini.syifa02@gmail.com",
  whatsapp: "085217510696",
  instagram: "@dinaandiinn",
  linkedin: "www.linkedin.com/in/andini-syifa-rokhima-96a8b43ab",
  location: "Cicurug, Kab. Sukabumi, Jawa Barat",
  cvLink: "/CV Andini Syifa Rokhima .pdf",
  about: [
    "Halo, saya Andini Syifa Rokhima, siswi SMK Wikrama Bogor jurusan Manajemen Perkantoran dan Layanan Bisnis (MPLB). Saya memiliki minat dalam bidang administrasi perkantoran, khususnya pengelolaan dokumen, arsip digital, pengolahan data, serta korespondensi bisnis.",
    "Saya merupakan pribadi yang disiplin, bertanggung jawab, mudah beradaptasi, dan senang mempelajari hal baru. Saya juga terbiasa bekerja sama dalam tim maupun menyelesaikan tugas secara mandiri. Selama menjalani pendidikan, saya terus mengembangkan kemampuan komunikasi, administrasi, pelayanan pelanggan, serta keterampilan organisasi untuk mendukung kesiapan saya di dunia kerja.",
    "Bagi saya, setiap pengalaman adalah kesempatan untuk belajar, berkembang, dan menjadi pribadi yang lebih baik ke depannya.",
  ],
};

export const skills = [
  // Hard Skills
  {
    id: 1,
    name: "Administrasi Perkantoran",
    icon: "�",
    category: "Hard Skill",
    description: "Pengelolaan dokumen, surat menyurat, serta kearsipan manual dan digital",
  },
  {
    id: 2,
    name: "Keuangan",
    icon: "�",
    category: "Hard Skill",
    description: "Pencatatan pemasukan dan pengeluaran, pembuatan laporan keuangan, serta pengelolaan kas",
  },
  {
    id: 3,
    name: "Manajemen Logistik",
    icon: "�",
    category: "Hard Skill",
    description: "Sistem pengelolaan barang masuk dan keluar, serta penyusunan laporan persediaan barang",
  },
  {
    id: 4,
    name: "Customer Service",
    icon: "🎧",
    category: "Hard Skill",
    description: "Melakukan pelayanan prima serta membantu menyelesaikan keluhan pelanggan",
  },
  // Software
  {
    id: 5,
    name: "Microsoft Office",
    icon: "�️",
    category: "Software",
    description: "Microsoft Word, Microsoft Excel, serta Microsoft PowerPoint",
  },
  {
    id: 6,
    name: "Google Workspace",
    icon: "🌐",
    category: "Software",
    description: "Google Docs, Google Spreadsheet, Google Calendar, Google Slide, serta Google Meet",
  },
  // Soft Skills
  {
    id: 7,
    name: "Teamwork",
    icon: "🤝",
    category: "Soft Skill",
    description: "Kolaborasi tim, bertanggung jawab, dan kerja sama yang efektif",
  },
  {
    id: 8,
    name: "Time Management",
    icon: "�",
    category: "Soft Skill",
    description: "Mengatur waktu, deadline, dan pekerjaan agar lebih terorganisir",
  },
];

// Certificate images are imported in Certificates.jsx — urutan sesuai nomor file
export const certificates = [
  {
    id: 1,
    title: "Lomba Administrasi Perkantoran",
    issuer: "Kesatuan Bogor Olympic Festival",
    date: "2026",
    imageKey: "sertificate1",
    color: "#D4E8D5",
    description: "Kompetensi administrasi perkantoran dan manajemen dokumen",
  },
  {
    id: 2,
    title: "Typing Test Platinum",
    issuer: "Ratatype",
    date: "2026",
    imageKey: "sertificate2",
    color: "#E8E4D4",
    description: "Tes mengetik 10 jari kategori platinum dengan kecepatan dan akurasi tinggi",
  },
  {
    id: 3,
    title: "Accounting Fundamentals",
    issuer: "MySkill",
    date: "2025",
    imageKey: "sertificate3",
    color: "#E8D5C4",
    description: "Dasar-dasar akuntansi, pencatatan transaksi, serta konsep debit dan kredit",
  },
  {
    id: 4,
    title: "Pivot Table & Data Analysis",
    issuer: "MySkill",
    date: "2025",
    imageKey: "sertificate4",
    color: "#E8D4D4",
    description: "Pengolahan data menggunakan pivot table, ringkasan data, dan laporan otomatis",
  },
  {
    id: 5,
    title: "Lomba IT Poster Digital",
    issuer: "Dispora Cup — Kota Bogor",
    date: "2024",
    imageKey: "sertificate5",
    color: "#D5D4E8",
    description: "Perlombaan Pembuatan Poster Digital Di SMK Wikrama Bogor",
  },
  {
    id: 6,
    title: "Latihan Dasar Kepemimpinan 1",
    issuer: "SMK Wikrama Bogor",
    date: "2024",
    imageKey: "sertificate6",
    color: "#D4E8E4",
    description: "Latihan Dasar Kepemimpinan untuk pengembangan karakter dan organisasi",
  },
  {
    id: 7,
    title: "Latihan Dasar Kepemimpinan 2",
    issuer: "SMK Wikrama Bogor",
    date: "2024",
    imageKey: "sertificate7",
    color: "#E4D4E8",
    description: "LDK lanjutan — penghargaan peserta teraktif",
  },
  {
    id: 8,
    title: "Paradigma",
    issuer: "Forum OSIS Jawa Barat",
    date: "2025",
    imageKey: "sertificate8",
    color: "#D5D4E8",
    description: "Event Seminar Dari Forum OSIS Jawa Barat",
  },
];

export const experiences = [
  {
    id: 1,
    title: "Event Organizer",
    organization: "SMK Wikrama Bogor",
    period: "Juli 2024 – Sekarang",
    type: "TEFA",
    description: [
      "Menyusun konsep dan rundown acara",
      "Melakukan administrasi kegiatan secara terstruktur",
      "Berkoordinasi dengan berbagai pihak terkait untuk keberlangsungan acara",
    ],
    icon: "🎪",
  },
  {
    id: 2,
    title: "Praktik Teaching Factory (TEFA)",
    organization: "Agen BNI 46 — SMK Wikrama Bogor",
    period: "Juli 2024 – Sekarang",
    type: "TEFA",
    description: [
      "Melayani berbagai transaksi keuangan seperti transfer dan setor tunai",
      "Memberikan pelayanan prima kepada nasabah secara profesional",
      "Memastikan ketepatan dan keamanan transaksi sesuai prosedur",
    ],
    icon: "🏦",
  },
  {
    id: 3,
    title: "Competence Based Training (CBT)",
    organization: "Perpustakaan SMK Wikrama Bogor",
    period: "Juli 2024 – Sekarang",
    type: "TEFA",
    description: [
      "Memberikan label dan kode pada buku paket siswa",
      "Membantu digitalisasi administrasi perpustakaan",
      "Mengelola sistem peminjaman dan pengembalian buku secara tertib",
    ],
    icon: "📚",
  },
  {
    id: 4,
    title: "Lomba KBOF Office Administration",
    organization: "Institut Bisnis dan Informatika Kesatuan",
    period: "Januari 2026",
    type: "TEFA",
    description: [
      "Mengelola agenda kegiatan pimpinan dan korespondensi bisnis",
      "Mengelola kas kecil, buku kas, serta mengetik cepat dan menyusun notula",
      "Melakukan presentasi dalam Bahasa Inggris di hadapan juri",
    ],
    icon: "🏆",
  },
  {
    id: 5,
    title: "Olimpiade TIK Nasional",
    organization: "Tingkat Nasional",
    period: "Oktober 2025",
    type: "TEFA",
    description: [
      "Mengetik cepat 10 jari dengan kategori Platinum",
      "Berkompetisi dalam bidang Teknologi Informasi dan Komunikasi skala nasional",
      "Menerapkan kemampuan digital dan literasi teknologi secara kompetitif",
    ],
    icon: "💻",
  },
  {
    id: 6,
    title: "Kejuaraan Pencak Silat",
    organization: "Dispora Cup — Kota Bogor",
    period: "November 2025",
    type: "TEFA",
    description: [
      "Mendapatkan medali emas dalam kategori tanding usia pra-remaja",
      "Bertanding pada kategori pemula dan meraih prestasi terbaik",
      "Melatih kedisiplinan, mental juara, dan semangat sportivitas",
    ],
    icon: "🥋",
  },
  {
    id: 7,
    title: "Ketua Umum & Bendahara Umum OSIS",
    organization: "OSIS SMK Wikrama Bogor",
    period: "2023 – Sekarang",
    type: "TEFA",
    description: [
      "Bendahara Umum (2023–2024): mengelola keuangan, laporan keuangan, dan administrasi OSIS",
      "Ketua Umum (2024–Sekarang): memimpin organisasi dan memastikan program kerja berjalan",
      "Menyusun 13 RAB event sekolah dan laporan pertanggungjawaban selama 1 periode",
    ],
    icon: "🎓",
  },
  {
    id: 9,
    title: "Bendahara Wilayah 2 Forum OSIS",
    organization: "Forum OSIS Jawa Barat (Kota Bogor & Depok)",
    period: "Agustus 2024 – Sekarang",
    type: "TEFA",
    description: [
      "Mengelola administrasi dan keuangan kegiatan forum",
      "Menyusun laporan pertanggungjawaban dana",
      "Mengatur anggaran program kerja secara transparan dan sesuai perencanaan",
    ],
    icon: "🌐",
  },
];

// Gallery images are imported in Gallery.jsx using imageKey
export const galleryImages = [
  {
    id: 1,
    imageKey: "kegiatan1",
    alt: "Kegiatan 1",
    caption: "Serah Jabatan Bendahara Umum",
  },
  {
    id: 2,
    imageKey: "kegiatan2",
    alt: "Kegiatan 2",
    caption: "Kegiatan Forum OSIS Jawa Barat",
  },
  {
    id: 3,
    imageKey: "kegiatan3",
    alt: "Kegiatan 3",
    caption: "Penghargaan Lomba Silat",
  },
  {
    id: 4,
    imageKey: "kegiatan4",
    alt: "Kegiatan 4",
    caption: "Kegiatan TEFA",
  },
  {
    id: 5,
    imageKey: "kegiatan5",
    alt: "Kegiatan 5",
    caption: "Aktivitas Organisasi",
  },
  {
    id: 6,
    imageKey: "kegiatan7",
    alt: "Kegiatan 7",
    caption: "Juara Pencak Silat",
  },
  {
    id: 7,
    imageKey: "kegiatan8",
    alt: "Kegiatan 8",
    caption: "Praktik Administrasi",
  },
  {
    id: 8,
    imageKey: "kegiatan9",
    alt: "Kegiatan 9",
    caption: "Kegiatan TEFA",
  },
  {
    id: 9,
    imageKey: "kegiatan10",
    alt: "Kegiatan 10",
    caption: "Serah Jabatan Pengurus OSIS",
  },
  {
    id: 11,
    imageKey: "kegiatan5b",
    alt: "Kegiatan Sekolah",
    caption: "Kegiatan Forum OSIS Jawa Barat",
  },
];
