import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { galleryImages } from '../data/portfolioData';

// Import semua foto kegiatan dari assets
import imgKegiatan1 from '../assets/kegiatan/kegiatan1.jpg';
import imgKegiatan2 from '../assets/kegiatan/kegiatan2.jpg';
import imgKegiatan3 from '../assets/kegiatan/kegiatan3.jpg';
import imgKegiatan4 from '../assets/kegiatan/kegiatan4.jpg';
import imgKegiatan6 from '../assets/kegiatan/kegiatan6.jpg';
import imgKegiatan7 from '../assets/kegiatan/kegiatan7.jpg';
import imgKegiatan8 from '../assets/kegiatan/kegiatan8.jpg';
import imgKegiatan9 from '../assets/kegiatan/kegiatan9.jpg';
import imgKegiatan10 from '../assets/kegiatan/kegiatan10.JPG';

const kegiatanImages = {
  kegiatan1: imgKegiatan1,
  kegiatan2: imgKegiatan2,
  kegiatan3: imgKegiatan3,
  kegiatan4: imgKegiatan4,
  kegiatan6: imgKegiatan6,
  kegiatan7: imgKegiatan7,
  kegiatan8: imgKegiatan8,
  kegiatan9: imgKegiatan9,
  kegiatan10: imgKegiatan10,
};

/* ── Lightbox Modal ── */
function Lightbox({ image, images, onClose, onSelect }) {
  if (!image) return null;

  const currentIndex = images.findIndex((item) => item.id === image.id);
  const total = images.length;
  const currentItem = currentIndex >= 0 ? images[currentIndex] : image;
  const imgSrc = kegiatanImages[currentItem.imageKey];

  const goPrev = useCallback(() => {
    const prevIdx = (currentIndex - 1 + total) % total;
    onSelect(images[prevIdx]);
  }, [currentIndex, images, total, onSelect]);

  const goNext = useCallback(() => {
    const nextIdx = (currentIndex + 1) % total;
    onSelect(images[nextIdx]);
  }, [currentIndex, images, total, onSelect]);

  // Keyboard navigation & body scroll lock
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, goPrev, goNext]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-dark/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 md:p-8"
        role="dialog"
        aria-modal="true"
        aria-label="Tampilan penuh foto dokumentasi"
      >
        {/* Top bar */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex items-center justify-between pb-3 border-b border-white/10 w-full max-w-5xl mx-auto"
        >
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-gold/15 text-gold border border-gold/30 text-[11px] font-black uppercase tracking-widest">
              {currentItem.category}
            </span>
            <span className="text-white/40 text-[12px] font-bold tracking-widest uppercase">
              Foto {String(currentIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
          </div>

          <button
            onClick={onClose}
            className="group inline-flex items-center gap-2 px-3.5 py-1.5 border border-white/15 bg-white/[0.04] hover:bg-gold hover:text-dark hover:border-gold transition-colors duration-200 text-[11px] font-bold tracking-widest uppercase text-cream"
            aria-label="Tutup jendela galeri"
          >
            <span>Tutup</span>
            <span className="text-lg leading-none font-bold">✕</span>
          </button>
        </div>

        {/* Center: Image & Navigation */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative flex-1 flex items-center justify-center my-4 w-full max-w-5xl mx-auto overflow-hidden"
        >
          {/* Prev Button Desktop */}
          <button
            onClick={goPrev}
            className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-dark/85 hover:bg-gold hover:text-dark border border-white/20 hover:border-gold items-center justify-center text-cream transition-colors duration-200 text-xl font-bold shadow-lg"
            aria-label="Foto sebelumnya"
          >
            ←
          </button>

          {/* Main Image Container */}
          <div className="relative max-h-[64vh] sm:max-h-[68vh] md:max-h-[72vh] flex items-center justify-center">
            <img
              src={imgSrc}
              alt={currentItem.alt || currentItem.title}
              className="max-h-[64vh] sm:max-h-[68vh] md:max-h-[72vh] w-auto max-w-full object-contain rounded-sm border border-white/10 shadow-2xl"
              decoding="async"
            />
          </div>

          {/* Next Button Desktop */}
          <button
            onClick={goNext}
            className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-dark/85 hover:bg-gold hover:text-dark border border-white/20 hover:border-gold items-center justify-center text-cream transition-colors duration-200 text-xl font-bold shadow-lg"
            aria-label="Foto selanjutnya"
          >
            →
          </button>
        </div>

        {/* Bottom bar / Info & Mobile Controls */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-5xl mx-auto pt-3 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <div className="space-y-1">
            <span className="text-gold text-[11px] font-bold uppercase tracking-wider block">
              {currentItem.tag}
            </span>
            <h4 className="text-cream text-[15px] sm:text-[17px] font-black uppercase tracking-wide">
              {currentItem.title || currentItem.caption}
            </h4>
            <p className="text-[13px] text-cream/75 max-w-2xl leading-relaxed">
              {currentItem.caption}
            </p>
          </div>

          {/* Mobile navigation controls */}
          <div className="flex md:hidden items-center gap-2 self-end sm:self-auto">
            <button
              onClick={goPrev}
              className="px-4 py-2 border border-white/20 bg-dark2 text-cream text-[12px] font-bold tracking-widest uppercase hover:border-gold hover:text-gold transition-colors flex items-center gap-1.5"
            >
              ← Prev
            </button>
            <button
              onClick={goNext}
              className="px-4 py-2 border border-white/20 bg-dark2 text-cream text-[12px] font-bold tracking-widest uppercase hover:border-gold hover:text-gold transition-colors flex items-center gap-1.5"
            >
              Next →
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ── Individual Mosaic Tile (Interactive: Grayscale -> Bright + Text on hover/tap) ── */
function GalleryTile({ item, index, isActive, onClick }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const imgSrc = kegiatanImages[item.imageKey];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 15 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: (index % 3) * 0.07, ease: 'easeOut' }}
      onClick={() => onClick(item)}
      className={`group relative aspect-square overflow-hidden bg-dark3 border transition-all duration-300 cursor-pointer select-none ${
        isActive
          ? 'border-gold shadow-xl shadow-gold/15'
          : 'border-white/10 hover:border-gold/70'
      }`}
    >
      {/* Photo with smooth Grayscale -> Color ("terang") transition */}
      <img
        src={imgSrc}
        alt={item.alt || item.title}
        className={`w-full h-full object-cover transition-all duration-500 ease-out group-hover:scale-105 ${
          isActive
            ? 'grayscale-0 brightness-105 opacity-100 scale-105'
            : 'grayscale opacity-80 brightness-90 contrast-[1.05] group-hover:grayscale-0 group-hover:opacity-100 group-hover:brightness-105'
        }`}
        loading="lazy"
        decoding="async"
      />

      {/* Subtle idle index badge (fades out when hovered/active) */}
      <div
        className={`absolute top-2.5 right-2.5 px-2 py-0.5 bg-dark/80 text-cream/45 text-[10px] font-mono tracking-widest border border-white/10 transition-opacity duration-300 pointer-events-none z-10 ${
          isActive ? 'opacity-0' : 'group-hover:opacity-0'
        }`}
      >
        #{String(item.id).padStart(2, '0')}
      </div>

      {/* Dark Ambient Scrim (appears on hover or active tap) */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-dark/95 via-dark/55 to-transparent transition-opacity duration-300 pointer-events-none z-10 ${
          isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        }`}
      />

      {/* Editorial Content Overlay ("ada tulisannya") */}
      <div
        className={`absolute inset-0 p-3 sm:p-4 md:p-5 flex flex-col justify-between transition-all duration-300 pointer-events-none z-20 ${
          isActive
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0'
        }`}
      >
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2">
          <span className="px-2 py-0.5 bg-gold text-dark text-[9px] sm:text-[10px] font-black uppercase tracking-wider shadow-sm">
            {item.category}
          </span>
          <span className="px-2 py-0.5 bg-dark/85 text-gold border border-gold/40 text-[9px] sm:text-[10px] font-mono font-bold tracking-widest">
            #{String(item.id).padStart(2, '0')}
          </span>
        </div>

        {/* Bottom Details */}
        <div className="flex flex-col gap-1">
          <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.18em] text-gold drop-shadow-sm">
            {item.tag}
          </span>

          <h3 className="text-cream text-[13px] sm:text-[14px] md:text-[15px] font-bold uppercase tracking-wide leading-snug drop-shadow-md line-clamp-2">
            {item.title || item.caption}
          </h3>

          <p className="text-[11px] sm:text-[12px] text-cream/80 line-clamp-2 leading-relaxed drop-shadow hidden sm:block">
            {item.caption}
          </p>

          <div className="flex items-center gap-1.5 text-gold text-[10px] sm:text-[11px] font-bold uppercase tracking-widest mt-1">
            <span>Perbesar Foto</span>
            <span className="text-xs">↗</span>
          </div>
        </div>
      </div>

      {/* Decorative Gold Accent on active/hover */}
      <div
        className={`absolute top-0 inset-x-0 h-[2px] bg-gold transition-transform duration-300 origin-left z-30 pointer-events-none ${
          isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
        }`}
      />
    </motion.div>
  );
}

/* ── Main Gallery Section ── */
export default function Gallery() {
  const [selected, setSelected] = useState(null);
  const [activeId, setActiveId] = useState(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  // Handle tile interaction (support both desktop mouse hover and mobile tap)
  const handleTileClick = (item) => {
    // If desktop (mouse hover available) -> open Lightbox directly
    if (window.matchMedia && window.matchMedia('(hover: hover)').matches) {
      setSelected(item);
    } else {
      // On touch device: first tap activates (bright + shows text), second tap opens lightbox
      if (activeId === item.id) {
        setSelected(item);
      } else {
        setActiveId(item.id);
      }
    }
  };

  return (
    <section id="gallery" className="bg-dark2 relative border-t border-white/8" ref={ref}>
      {/* Top Section Tag */}
      <div className="site-px border-b border-white/8 py-5 flex items-center justify-between">
        <span className="label-tag">05 — Galeri Dokumentasi</span>
        <span className="label-tag hidden md:block">
          {galleryImages.length} Dokumentasi Terpilih
        </span>
      </div>

      <div className="site-px py-16 lg:py-24">
        {/* Title & Description */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 lg:mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="display-title text-[11vw] md:text-[7vw] lg:text-[5.5vw]"
          >
            GALERI<br />
            <span className="text-gold">AKTIVITAS</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-md md:text-right flex flex-col gap-2"
          >
            <p className="body-text text-[15px] sm:text-[16px] text-cream/80">
              Dokumentasi nyata kegiatan kepemimpinan organisasi, praktik kejuruan MPLB, dan prestasi kejuaraan.
            </p>
            <span className="text-[12px] font-bold uppercase tracking-widest text-gold/85">
              Sentuh atau arahkan kursor pada foto untuk melihat detail
            </span>
          </motion.div>
        </div>

        {/* 3x3 Mosaic Grid (Clean Square Tiles) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 lg:gap-3.5">
          {galleryImages.map((img, i) => (
            <GalleryTile
              key={img.id}
              item={img}
              index={i}
              isActive={activeId === img.id}
              onClick={handleTileClick}
            />
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selected && (
        <Lightbox
          image={selected}
          images={galleryImages}
          onClose={() => setSelected(null)}
          onSelect={setSelected}
        />
      )}
    </section>
  );
}
