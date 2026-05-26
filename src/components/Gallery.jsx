import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { galleryImages } from '../data/portfolioData';

// Import semua foto kegiatan dari assets
import imgKegiatan1 from '../assets/kegiatan/kegiatan1.jpg';
import imgKegiatan2 from '../assets/kegiatan/kegiatan2.jpg';
import imgKegiatan4 from '../assets/kegiatan/kegiatan4.jpg';
import imgKegiatan6 from '../assets/kegiatan/kegiatan6.jpg';
import imgKegiatan7 from '../assets/kegiatan/kegiatan7.jpg';
import imgKegiatan8 from '../assets/kegiatan/kegiatan8.jpg';
import imgKegiatan9 from '../assets/kegiatan/kegiatan9.jpg';
import imgKegiatan10 from '../assets/kegiatan/kegiatan10.JPG';

const kegiatanImages = {
  kegiatan1: imgKegiatan1,
  kegiatan2: imgKegiatan2,
  kegiatan4: imgKegiatan4,
  kegiatan6: imgKegiatan6,
  kegiatan7: imgKegiatan7,
  kegiatan8: imgKegiatan8,
  kegiatan9: imgKegiatan9,
  kegiatan10: imgKegiatan10,
};

function Lightbox({ image, onClose, onPrev, onNext }) {
  if (!image) return null;
  const imgSrc = kegiatanImages[image.imageKey];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-dark/95 backdrop-blur-md flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.94 }} transition={{ duration: 0.3 }}
          onClick={e => e.stopPropagation()}
          className="relative max-w-3xl w-full">
          <img src={imgSrc} alt={image.alt} className="w-full max-h-[80vh] object-contain" />
          <div className="flex items-center justify-between mt-4">
            <span className="text-cream text-[15px] font-bold uppercase tracking-wide">{image.caption}</span>
            <button onClick={onClose}
              className="text-[13px] font-bold uppercase tracking-widest hover:text-cream transition-colors"
              style={{ color: 'rgba(201,168,124,0.90)' }}>
              Tutup
            </button>
          </div>
          <button onClick={e => { e.stopPropagation(); onPrev(); }}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-14 w-11 h-11 border border-white/20 flex items-center justify-center text-cream/80 hover:text-cream hover:border-gold transition-all text-xl font-bold">←</button>
          <button onClick={e => { e.stopPropagation(); onNext(); }}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-14 w-11 h-11 border border-white/20 flex items-center justify-center text-cream/80 hover:text-cream hover:border-gold transition-all text-xl font-bold">→</button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function GalleryItem({ image, index, onClick, isFeature }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const imgSrc = kegiatanImages[image.imageKey];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.07 }}
      onClick={() => onClick(image)}
      className="group relative overflow-hidden cursor-pointer bg-dark3 w-full h-full">
      <img
        src={imgSrc}
        alt={image.alt}
        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/45 transition-all duration-400" />
      <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
        <span className="text-cream text-[14px] font-bold uppercase tracking-wide">{image.caption}</span>
      </div>
    </motion.div>
  );
}

export default function Gallery() {
  const [selected, setSelected] = useState(null);
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const idx  = galleryImages.findIndex(i => i.id === selected?.id);
  const prev = () => setSelected(galleryImages[(idx - 1 + galleryImages.length) % galleryImages.length]);
  const next = () => setSelected(galleryImages[(idx + 1) % galleryImages.length]);

  return (
    <section id="gallery" className="bg-dark2" ref={ref}>
      <div className="site-px border-b border-white/8 py-5 flex items-center justify-between">
        <span className="label-tag">05 — Galeri</span>
        <span className="label-tag hidden md:block">Dokumentasi Aktivitas</span>
      </div>

      <div className="site-px py-16 lg:py-24">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="display-title text-[11vw] md:text-[7vw] lg:text-[5.5vw]">
            GALERI<br /><span className="text-gold">AKTIVITAS</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="body-text max-w-xs md:text-right">
            Klik foto untuk melihat lebih besar
          </motion.p>
        </div>

        {/* Grid layout: foto pertama feature (lebar penuh), sisanya 3 kolom */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-white/5">
          {galleryImages.map((img, i) => (
            <div
              key={img.id}
              className={`${i === 0 ? 'col-span-2 md:col-span-3 aspect-[21/9]' : 'aspect-square'}`}>
              <GalleryItem image={img} index={i} onClick={setSelected} isFeature={i === 0} />
            </div>
          ))}
        </div>
      </div>

      {selected && (
        <Lightbox image={selected} onClose={() => setSelected(null)} onPrev={prev} onNext={next} />
      )}
    </section>
    
  );
}
