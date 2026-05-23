import { motion } from 'framer-motion';
import { personalInfo } from '../data/portfolioData';

const links = [
  { label: 'Beranda',    href: '#hero' },
  { label: 'Tentang',    href: '#about' },
  { label: 'Keahlian',  href: '#skills' },
  { label: 'Sertifikat',href: '#certificates' },
  { label: 'Pengalaman',href: '#experience' },
  { label: 'Galeri',    href: '#gallery' },
  { label: 'Kontak',    href: '#contact' },
];

export default function Footer() {
  const go = href => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer className="bg-dark2 border-t border-white/8">
      {/* Closing statement */}
      <div className="site-px py-20 lg:py-28 border-b border-white/8">
        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="display-title text-[8vw] md:text-[5vw] lg:text-[4vw] leading-tight"
          style={{ color: 'rgba(245,240,232,0.18)' }}>
          TERIMA KASIH TELAH<br />
          MENGUNJUNGI<br />
          <span style={{ color: 'rgba(201,168,124,0.40)' }}>PORTOFOLIO SAYA.</span>
        </motion.p>
      </div>

      {/* Bottom bar */}
      <div className="site-px py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
        {/* Brand */}
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center flex-shrink-0">
            <span className="text-gold text-[12px] font-black">AS</span>
          </div>
          <div>
            <div className="text-cream text-[16px] font-black uppercase tracking-widest">{personalInfo.name}</div>
            <div className="label-tag mt-1.5">{personalInfo.major}</div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex flex-wrap gap-x-7 gap-y-3">
          {links.map(l => (
            <a key={l.href} href={l.href}
              onClick={e => { e.preventDefault(); go(l.href); }}
              className="text-[14px] font-bold uppercase tracking-[0.18em] transition-colors hover:text-cream"
              style={{ color: 'rgba(245,240,232,0.60)' }}>
              {l.label}
            </a>
          ))}
        </nav>

        {/* Back to top */}
        <motion.button
          onClick={() => globalThis.scrollTo({ top: 0, behavior: 'smooth' })}
          className="btn-gold" whileHover={{ y: -2 }}>
          Ke Atas ↑
        </motion.button>
      </div>

      <div className="site-px pb-8">
        <p className="text-[13px] font-semibold uppercase tracking-widest" style={{ color: 'rgba(245,240,232,0.35)' }}>
          © 2026 {personalInfo.name} — Portofolio MPLB
        </p>
      </div>
    </footer>
  );
}
