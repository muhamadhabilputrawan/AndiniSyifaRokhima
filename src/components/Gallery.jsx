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

  const currentIndex = images.findIndex(item => item.id === image.id);
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
          onClick={e => e.stopPropagation()}
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
          onClick={e => e.stopPropagation()}
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
          onClick={e => e.stopPropagation()}
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

/* ── Individual Gallery Item Card ── */
function GalleryCard({ item, index, onClick }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const imgSrc = kegiatanImages[item.imageKey];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: (index % 3) * 0.08, ease: 'easeOut' }}
      onClick={() => onClick(item)}
      className="group relative flex flex-col bg-dark3 border border-white/10 hover:border-gold/60 transition-colors duration-300 cursor-pointer overflow-hidden shadow-md"
    >
      {/* Top Gold Line Accent */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left z-20 pointer-events-none" />

      {/* Decorative Corner Accents */}
      <div className="absolute top-2.5 left-2.5 w-3 h-3 border-t border-l border-white/25 group-hover:border-gold/70 transition-colors z-20 pointer-events-none" />
      <div className="absolute top-2.5 right-2.5 w-3 h-3 border-t border-r border-white/25 group-hover:border-gold/70 transition-colors z-20 pointer-events-none" />
      <div className="absolute bottom-2.5 left-2.5 w-3 h-3 border-b border-l border-white/25 group-hover:border-gold/70 transition-colors z-20 pointer-events-none" />
      <div className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b border-r border-white/25 group-hover:border-gold/70 transition-colors z-20 pointer-events-none" />

      {/* Image Container with 4:3 Proportion */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-dark">
        <img
          src={imgSrc}
          alt={item.alt || item.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
          decoding="async"
        />

        {/* Ambient Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/45 to-transparent opacity-85 group-hover:opacity-75 transition-opacity duration-300" />

        {/* Badges in Top Bar */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10 pointer-events-none">
          <span className="px-2.5 py-1 text-[10px] font-black tracking-widest text-gold bg-dark/85 border border-white/15">
            #{String(item.id).padStart(2, '0')}
          </span>
          <span className="px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase text-cream/90 bg-dark/85 border border-white/15">
            {item.category}
          </span>
        </div>

        {/* Hover Zoom Pill */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
          <div className="px-4 py-2 bg-dark/90 border border-gold/70 text-gold text-[11px] font-bold uppercase tracking-widest flex items-center gap-2 shadow-xl translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
            <span>Perbesar Foto</span>
            <span className="text-sm">↗</span>
          </div>
        </div>

        {/* Bottom Content Area (Without Year) */}
        <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 flex flex-col gap-1 z-10">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gold">
            {item.tag}
          </span>

          <h3 className="text-cream text-[14px] sm:text-[15px] font-bold uppercase tracking-wide leading-snug group-hover:text-gold transition-colors duration-200 line-clamp-1">
            {item.title || item.caption}
          </h3>

          <p className="text-[12px] font-medium text-cream/70 line-clamp-1 group-hover:text-cream/90 transition-colors duration-200">
            {item.caption}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Main Gallery Section ── */
export default function Gallery() {
  const [selected, setSelected] = useState(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

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
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 lg:mb-16">
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
              Dokumentasi nyata kegiatan kepemimpinan organisasi, praktik kejuruan MPLB, dan dedikasi pembelajaran.
            </p>
            <span className="text-[12px] font-bold uppercase tracking-widest text-gold/75">
              Klik foto untuk melihat resolusi penuh & detail kegiatan
            </span>
          </motion.div>
        </div>

        {/* Gallery Grid: 1 col on mobile, 2 cols on tablet, 3 cols on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-7">
          {galleryImages.map((img, i) => (
            <GalleryCard
              key={img.id}
              item={img}
              index={i}
              onClick={setSelected}
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
