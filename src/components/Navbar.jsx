import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { label: 'Tentang',    href: '#about' },
  { label: 'Keahlian',  href: '#skills' },
  { label: 'Sertifikat',href: '#certificates' },
  { label: 'Pengalaman',href: '#experience' },
  { label: 'Galeri',    href: '#gallery' },
  { label: 'Kontak',    href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const go = href => { setOpen(false); document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }); };

  return (
    <>
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-dark/92 backdrop-blur-md border-b border-white/5' : ''
        }`}
      >
        <div className="site-px flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#hero" onClick={e => { e.preventDefault(); go('#hero'); }}
            className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-full border border-gold/50 flex items-center justify-center group-hover:border-gold transition-colors">
              <span className="text-gold text-[11px] font-black tracking-wider">AS</span>
            </div>
            <span className="text-cream text-[13px] font-bold uppercase tracking-[0.2em]">Andini Syifa</span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map(l => (
              <a key={l.href} href={l.href}
                onClick={e => { e.preventDefault(); go(l.href); }}
                className="text-[12px] font-semibold uppercase tracking-[0.18em] text-cream/55 hover:text-cream transition-colors duration-200">
                {l.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:block">
            <motion.a href="#contact" onClick={e => { e.preventDefault(); go('#contact'); }}
              className="btn-primary py-3 px-6 text-[11px]"
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              Hubungi Saya
            </motion.a>
          </div>

          {/* Hamburger */}
          <button className="md:hidden flex flex-col gap-[5px] p-1" onClick={() => setOpen(!open)} aria-label="Menu">
            <motion.span animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }} className="block w-6 h-px bg-cream origin-center transition-all" />
            <motion.span animate={open ? { opacity: 0 } : { opacity: 1 }} className="block w-6 h-px bg-cream transition-all" />
            <motion.span animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} className="block w-6 h-px bg-cream origin-center transition-all" />
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-dark flex flex-col pt-20 site-px pb-10 md:hidden">
            <nav className="flex flex-col gap-1 mt-8">
              {links.map((l, i) => (
                <motion.a key={l.href} href={l.href}
                  onClick={e => { e.preventDefault(); go(l.href); }}
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="text-4xl font-black uppercase tracking-tight text-cream/80 hover:text-cream py-3 border-b border-white/5">
                  {l.label}
                </motion.a>
              ))}
            </nav>
            <motion.a href="#contact" onClick={e => { e.preventDefault(); go('#contact'); }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
              className="btn-primary mt-10 self-start">
              Hubungi Saya
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
