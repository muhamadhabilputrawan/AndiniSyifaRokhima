import { personalInfo } from '../data/portfolioData';

const navLinks = [
  { label: 'Beranda', href: '#hero' },
  { label: 'Tentang Saya', href: '#about' },
  { label: 'Keahlian & Skill', href: '#skills' },
  { label: 'Sertifikat', href: '#certificates' },
  { label: 'Pengalaman TEFA', href: '#experience' },
  { label: 'Galeri Aktivitas', href: '#gallery' },
  { label: 'Kontak', href: '#contact' },
];

const socialLinks = [
  {
    label: 'Instagram',
    value: personalInfo.instagram,
    href: `https://instagram.com/${personalInfo.instagram.replace('@', '')}`,
  },
  {
    label: 'LinkedIn',
    value: 'Andini Syifa Rokhima',
    href: `https://${personalInfo.linkedin}`,
  },
  {
    label: 'WhatsApp',
    value: '+62 852-1751-0696',
    href: `https://wa.me/62${personalInfo.whatsapp.replace(/^0/, '')}`,
  },
  {
    label: 'Email',
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
  },
];

export default function Footer() {
  const go = href => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer className="bg-dark2 border-t border-white/8 relative">
      {/* ── Top Statement & CTA Banner ── */}
      <div className="site-px py-16 lg:py-20 border-b border-white/8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div>
            <span className="label-tag text-[11px] block mb-3">Portofolio Digital</span>
            <h2 className="display-title text-[8.5vw] md:text-[5vw] lg:text-[3.6vw] leading-[0.95]">
              TERIMA KASIH TELAH<br />
              <span className="text-gold">MENGUNJUNGI PORTOFOLIO.</span>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              onClick={() => go('#contact')}
              className="btn-primary text-center justify-center"
            >
              Hubungi Saya →
            </button>
            <a
              href={personalInfo.cvLink}
              download="CV Andini Syifa Rokhima.pdf"
              className="btn-ghost text-center justify-center"
            >
              Download CV
            </a>
          </div>
        </div>
      </div>

      {/* ── Main Multi-Column Section ── */}
      <div className="site-px py-16 lg:py-20 border-b border-white/8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
          {/* Col 1: Identity & Persona */}
          <div className="md:col-span-5 flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-gold flex-shrink-0" />
                <h3 className="text-cream text-[16px] font-black uppercase tracking-wider">
                  {personalInfo.name}
                </h3>
              </div>
              <span className="text-gold text-[11px] font-bold tracking-[0.2em] uppercase block pl-4.5">
                {personalInfo.school} • {personalInfo.major}
              </span>
            </div>

            <p className="text-[14px] text-cream/70 leading-relaxed max-w-sm">
              {personalInfo.tagline}
            </p>

            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 border border-white/10 bg-white/[0.03] w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-semibold text-cream/80 uppercase tracking-wider">
                Terbuka untuk Peluang Magang & Karier
              </span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 flex flex-col gap-4">
            <span className="text-gold text-[11px] font-black tracking-[0.24em] uppercase">
              Navigasi Halaman
            </span>
            <ul className="flex flex-col gap-2.5">
              {navLinks.map(l => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={e => { e.preventDefault(); go(l.href); }}
                    className="text-[13px] font-semibold uppercase tracking-wider text-cream/60 hover:text-gold hover:translate-x-1 inline-block transition-all duration-200"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Direct Connect & Social Media */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <span className="text-gold text-[11px] font-black tracking-[0.24em] uppercase">
              Kontak & Terhubung
            </span>
            <ul className="flex flex-col gap-3">
              {socialLinks.map(s => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={s.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between p-3 border border-white/8 hover:border-gold/40 bg-dark3/50 hover:bg-dark3 transition-all duration-200"
                  >
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold tracking-widest uppercase text-cream/40 group-hover:text-gold transition-colors">
                        {s.label}
                      </span>
                      <span className="text-[13px] font-medium text-cream/85 group-hover:text-cream transition-colors">
                        {s.value}
                      </span>
                    </div>
                    <span className="text-cream/30 group-hover:text-gold group-hover:translate-x-0.5 transition-all text-xs font-bold">
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="site-px py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-[12px] font-medium tracking-wide text-cream/50 text-center sm:text-left">
          © <span className="text-cream/85 font-bold">Portofolio Andini Syifa Rokhima</span>. All rights reserved.
        </p>

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="group inline-flex items-center gap-2.5 px-4 py-2 border border-white/15 hover:border-gold/60 bg-dark3 text-[11px] font-black tracking-widest uppercase text-cream hover:text-gold transition-all duration-200"
          aria-label="Kembali ke atas"
        >
          <span>Ke Atas</span>
          <span className="text-gold group-hover:-translate-y-0.5 transition-transform duration-200">
            ↑
          </span>
        </button>
      </div>
    </footer>
  );
}
