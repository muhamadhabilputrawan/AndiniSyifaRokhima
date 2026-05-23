import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { certificates } from '../data/portfolioData';

// Import semua gambar sertifikat dari assets
import imgAccounting from '../assets/accounting-fundamentals MySkill_page-0001.jpg';
import imgAdministrasion from '../assets/administrasion.png';
import imgParadigma from '../assets/paradigma.png';
import imgPivotTable from '../assets/pivotTable.jpg';
import imgRataype from '../assets/rataype.jpg';
import imgLdk1 from '../assets/ldk1.png';
import imgLdk2 from '../assets/ldk2.png';

const certImages = {
  accounting: imgAccounting,
  administrasion: imgAdministrasion,
  paradigma: imgParadigma,
  pivotTable: imgPivotTable,
  rataype: imgRataype,
  ldk1: imgLdk1,
  ldk2: imgLdk2,
};

function Modal({ cert, onClose }) {
  if (!cert) return null;
  const imgSrc = certImages[cert.imageKey];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-dark/92 backdrop-blur-md flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.96 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          onClick={e => e.stopPropagation()}
          className="bg-dark3 border border-white/15 max-w-lg w-full">

          {/* Image */}
          <div className="relative overflow-hidden" style={{ borderBottom: `1px solid ${cert.color}44` }}>
            <img
              src={imgSrc}
              alt={cert.title}
              className="w-full object-contain max-h-72"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark3/60 to-transparent pointer-events-none" />
          </div>

          {/* Details */}
          <div className="p-8 space-y-5">
            <div className="text-cream font-black text-[17px] uppercase tracking-wide leading-snug">
              {cert.title}
            </div>
            {cert.description && (
              <p className="body-text text-[14px]">{cert.description}</p>
            )}
            <div className="flex items-start gap-5">
              <span className="label-tag w-20 pt-1 flex-shrink-0">Penerbit</span>
              <span className="text-cream text-[15px] font-bold uppercase tracking-wide leading-snug">{cert.issuer}</span>
            </div>
            <div className="flex items-start gap-5">
              <span className="label-tag w-20 pt-1 flex-shrink-0">Tanggal</span>
              <span className="text-cream text-[15px] font-bold uppercase tracking-wide">{cert.date}</span>
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

function CertCard({ cert, index, onClick }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const imgSrc = certImages[cert.imageKey];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      onClick={() => onClick(cert)}
      className="group cursor-pointer border border-white/8 hover:border-gold/50 transition-all duration-300 bg-dark2 hover:bg-dark3 flex flex-col">

      {/* Image */}
      <div className="relative overflow-hidden bg-dark3" style={{ aspectRatio: '4/3' }}>
        <img
          src={imgSrc}
          alt={cert.title}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Corner accents */}
        <div className="absolute top-2 left-2 w-5 h-5 border-t border-l border-white/20" />
        <div className="absolute top-2 right-2 w-5 h-5 border-t border-r border-white/20" />
        <div className="absolute bottom-2 left-2 w-5 h-5 border-b border-l border-white/20" />
        <div className="absolute bottom-2 right-2 w-5 h-5 border-b border-r border-white/20" />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/40 transition-all duration-300 flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[12px] font-bold uppercase tracking-widest border border-gold/60 text-gold px-4 py-2 bg-dark3/80">
            Lihat Detail
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-5 border-t border-white/8 space-y-2 flex-1 flex flex-col justify-between">
        <div className="text-cream text-[13px] font-bold uppercase tracking-wide leading-snug line-clamp-2 group-hover:text-gold transition-colors">
          {cert.title}
        </div>
        <div className="flex items-center justify-between mt-1">
          <span className="label-tag text-[10px]">{cert.issuer}</span>
          <span className="label-tag text-[10px]">{cert.date}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Certificates() {
  const [selected, setSelected] = useState(null);
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

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

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px bg-white/5">
          {certificates.map((cert, i) => (
            <CertCard key={cert.id} cert={cert} index={i} onClick={setSelected} />
          ))}
        </div>
      </div>

      {selected && <Modal cert={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
