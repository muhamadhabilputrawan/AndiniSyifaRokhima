import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { certificates } from '../data/portfolioData';

// Import sertifikat sesuai urutan nomor file
import imgSert1 from '../assets/sertficiate1_administrasion.png';
import imgSert2 from '../assets/sertificate2_rataype.jpg';
import imgSert3 from '../assets/sertificate3_accounting.jpg';
import imgSert4 from '../assets/sertificate4_pivotTable.jpg';
import imgSert5 from '../assets/sertificate5.jpeg';
import imgSert6 from '../assets/sertificate6_ldk1.png';
import imgSert7 from '../assets/sertificate7_ldk2.png';
import imgSert8 from '../assets/sertificate8_paradigma.png';

// Map imageKey → file, urutan sesuai nomor
const certImages = {
  sertificate1: imgSert1,
  sertificate2: imgSert2,
  sertificate3: imgSert3,
  sertificate4: imgSert4,
  sertificate5: imgSert5,
  sertificate6: imgSert6,
  sertificate7: imgSert7,
  sertificate8: imgSert8,
};

/* ── Modal ── */
function Modal({ cert, onClose }) {
  if (!cert) return null;
  const imgSrc = certImages[cert.imageKey];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-dark/92 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.96 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          onClick={e => e.stopPropagation()}
          className="bg-dark3 border border-white/15 w-full max-w-lg">

          {/* Nomor urut */}
          <div className="px-6 pt-5 pb-0 flex items-center justify-between">
            <span className="label-tag text-[10px]">Sertifikat #{String(cert.id).padStart(2, '0')}</span>
            <button
              onClick={onClose}
              className="text-cream/40 hover:text-cream transition-colors text-[20px] leading-none"
              aria-label="Tutup"
            >×</button>
          </div>

          {/* Image */}
          <div className="relative overflow-hidden mx-6 mt-4" style={{ borderBottom: `1px solid ${cert.color}44` }}>
            <img
              src={imgSrc}
              alt={cert.title}
              className="w-full object-contain max-h-64 sm:max-h-72"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark3/50 to-transparent pointer-events-none" />
          </div>

          {/* Details */}
          <div className="p-6 space-y-4">
            <div className="text-cream font-black text-[15px] sm:text-[17px] uppercase tracking-wide leading-snug">
              {cert.title}
            </div>
            {cert.description && (
              <p className="text-[13px] font-medium leading-relaxed" style={{ color: 'rgba(245,240,232,0.70)' }}>
                {cert.description}
              </p>
            )}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="flex flex-col gap-1">
                <span className="label-tag text-[9px]">Penerbit</span>
                <span className="text-cream text-[13px] font-bold uppercase tracking-wide leading-snug">{cert.issuer}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="label-tag text-[9px]">Tahun</span>
                <span className="text-cream text-[13px] font-bold uppercase tracking-wide">{cert.date}</span>
              </div>
            </div>
            <button onClick={onClose} className="btn-primary w-full justify-center mt-2">
              Tutup
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ── Card ── */
function CertCard({ cert, index, onClick }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const imgSrc = certImages[cert.imageKey];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      onClick={() => onClick(cert)}
      className="group cursor-pointer border border-white/8 hover:border-gold/50 transition-all duration-300 bg-dark2 hover:bg-dark3 flex flex-col">

      {/* Nomor urut bar */}
      <div className="h-[2px] w-full bg-white/10 group-hover:bg-gold transition-colors duration-300" />

      {/* Image */}
      <div className="relative overflow-hidden bg-dark3" style={{ aspectRatio: '4/3' }}>
        <img
          src={imgSrc}
          alt={cert.title}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Corner accents */}
        <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-white/20 group-hover:border-gold/40 transition-colors" />
        <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-white/20 group-hover:border-gold/40 transition-colors" />
        <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-white/20 group-hover:border-gold/40 transition-colors" />
        <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-white/20 group-hover:border-gold/40 transition-colors" />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/45 transition-all duration-300 flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[11px] font-bold uppercase tracking-widest border border-gold/60 text-gold px-3 py-1.5 bg-dark3/80">
            Lihat Detail
          </span>
        </div>
        {/* Nomor badge */}
        <div className="absolute top-3 left-3 bg-dark/70 border border-white/15 px-2 py-0.5">
          <span className="text-[10px] font-black text-cream/60 tracking-widest">
            {String(cert.id).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-4 border-t border-white/8 flex flex-col gap-2 flex-1 justify-between">
        <div className="text-cream text-[12px] sm:text-[13px] font-bold uppercase tracking-wide leading-snug line-clamp-2 group-hover:text-gold transition-colors">
          {cert.title}
        </div>
        <div className="flex items-center justify-between">
          <span className="label-tag text-[9px] sm:text-[10px] truncate max-w-[65%]">{cert.issuer}</span>
          <span className="label-tag text-[9px] sm:text-[10px]">{cert.date}</span>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Main Section ── */
export default function Certificates() {
  const [selected, setSelected] = useState(null);
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  // Pastikan urutan sesuai id (nomor file)
  const sorted = [...certificates].sort((a, b) => a.id - b.id);

  return (
    <section id="certificates" className="bg-dark2" ref={ref}>
      <div className="site-px border-b border-white/8 py-5 flex items-center justify-between">
        <span className="label-tag">03 — Sertifikat</span>
        <span className="label-tag hidden md:block">{certificates.length} Pencapaian</span>
      </div>

      <div className="site-px py-16 lg:py-24">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="display-title text-[11vw] md:text-[7vw] lg:text-[5.5vw]">
            SERTIFIKAT &<br /><span className="text-gold">PENGHARGAAN</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="body-text max-w-xs md:text-right">
            Klik pada sertifikat untuk melihat detail lengkap
          </motion.p>
        </div>

        {/* Grid — 1 kolom mobile, 2 tablet, 4 desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {sorted.map((cert, i) => (
            <CertCard key={cert.id} cert={cert} index={i} onClick={setSelected} />
          ))}
        </div>
      </div>

      {selected && <Modal cert={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
