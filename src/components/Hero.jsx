import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { personalInfo } from '../data/portfolioData';
import heroPhoto from '../assets/fotoscreen/fotohero.jpg';

/* ─────────────────────────────────────────
   Typing cursor hook
───────────────────────────────────────── */
function useTyping(text, speed = 36, startDelay = 1600) {
  const [out, setOut] = useState('');
  const [done, setDone] = useState(false);
  useEffect(() => {
    let i = 0;
    setOut(''); setDone(false);
    const t = setTimeout(() => {
      const iv = setInterval(() => {
        i++;
        setOut(text.slice(0, i));
        if (i >= text.length) { clearInterval(iv); setDone(true); }
      }, speed);
      return () => clearInterval(iv);
    }, startDelay);
    return () => clearTimeout(t);
  }, [text, speed, startDelay]);
  return { out, done };
}

/* ─────────────────────────────────────────
   Word-by-word reveal (lebih clean dari letter)
───────────────────────────────────────── */
function RevealWords({ text, delay = 0, className = '' }) {
  const words = text.split(' ');
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden mr-[0.22em] last:mr-0">
          <motion.span
            className="inline-block"
            initial={{ y: '105%' }}
            animate={{ y: 0 }}
            transition={{
              duration: 0.7,
              delay: delay + i * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* ─────────────────────────────────────────
   Fade-up utility
───────────────────────────────────────── */
function FadeUp({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   Main Hero
───────────────────────────────────────── */
export default function Hero() {
  const ref = useRef(null);
  const go = href => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  const { out, done } = useTyping(personalInfo.tagline, 36, 1600);

  // Parallax scroll pada foto
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);

  return (
    <section ref={ref} id="hero" className="relative bg-dark overflow-hidden">

      {/* ══════════════════════════════════════
          DESKTOP  lg+  — split layout
      ══════════════════════════════════════ */}
      <div className="hidden lg:grid lg:grid-cols-[1fr_42%] min-h-screen">

        {/* ── LEFT PANEL ── */}
        <div className="relative flex flex-col justify-between px-16 xl:px-24 py-10 z-10">

          {/* Subtle noise texture overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")' }}
          />

          {/* TOP — label bar */}
          <motion.div
            className="flex items-center justify-between pt-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div className="flex items-center gap-3">
              <motion.span
                className="block w-8 h-px bg-gold/50"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                style={{ transformOrigin: 'left' }}
              />
              <span className="label-tag text-[12px]">Portofolio — 2026</span>
            </div>
            <span className="label-tag text-[12px] opacity-60">{personalInfo.major}</span>
          </motion.div>

          {/* MIDDLE — nama + badge */}
          <div className="flex flex-col gap-8">
            {/* School pill */}
            <FadeUp delay={0.45}>
              <div className="inline-flex items-center gap-2.5 border border-gold/25 px-5 py-2.5 w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                <span className="text-[12px] font-bold tracking-[0.26em] uppercase text-gold/90">
                  {personalInfo.school}
                </span>
              </div>
            </FadeUp>

            {/* Big name */}
            <div className="flex flex-col leading-[0.88]">
              {['Andini', 'Syifa', 'Rokhima'].map((word, i) => (
                <div key={word} className="overflow-hidden">
                  <motion.span
                    className="display-title block text-[8.8vw] xl:text-[8.2vw] 2xl:text-[7.6vw]"
                    initial={{ y: '105%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, delay: 0.55 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {word}
                  </motion.span>
                </div>
              ))}
            </div>

            {/* Horizontal rule with year */}
            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              style={{ transformOrigin: 'left' }}
            >
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-white/25">2026</span>
            </motion.div>
          </div>

          {/* BOTTOM — tagline + CTA */}
          <div className="flex flex-col gap-10 pb-14">
            {/* Tagline typing */}
            <FadeUp delay={1.0}>
              <div className="min-h-[3rem] max-w-[360px]">
                <p className="text-[16px] font-medium leading-[1.85] text-cream/80">
                  {out}
                  {!done && (
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.45, repeat: Infinity, repeatType: 'reverse' }}
                      className="inline-block w-[1.5px] h-[1.1em] bg-gold/80 align-middle ml-[3px]"
                    />
                  )}
                </p>
              </div>
            </FadeUp>

            {/* Buttons */}
            <div className="flex items-center gap-4">
              <motion.button
                onClick={() => go('#certificates')}
                className="btn-primary"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 1.7 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Lihat Portofolio
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.button>
              <motion.a
                href={personalInfo.cvLink}
                download="CV Andini Syifa Rokhima.pdf"
                className="btn-ghost"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 1.85 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Download CV
              </motion.a>
            </div>

            {/* Social row */}
            <motion.div
              className="flex items-center gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 2.0 }}
            >
              {[
                { label: 'Instagram', val: personalInfo.instagram },
                { label: 'Email', val: personalInfo.email },
              ].map(s => (
                <div key={s.label} className="flex flex-col gap-0.5">
                  <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-white/25">{s.label}</span>
                  <span className="text-[12px] font-medium text-cream/55">{s.val}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* ── RIGHT PANEL — foto ── */}
        <div className="relative overflow-hidden">

          {/* Foto dengan parallax */}
          <motion.div
            className="absolute inset-0"
            style={{ y: imgY }}
          >
            <motion.img
              src={heroPhoto}
              alt="Andini Syifa Rokhima"
              className="w-full h-[115%] object-cover"
              style={{ objectPosition: '50% 5%' }}
              initial={{ scale: 1.12, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            />
          </motion.div>

          {/* Gradient blend kiri — menyatu ke panel kiri */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(to right, #0D0B09 0%, rgba(13,11,9,0.55) 28%, transparent 55%)' }}
          />
          {/* Gradient bawah */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(to top, rgba(13,11,9,0.7) 0%, transparent 35%)' }}
          />
          {/* Gradient atas */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, rgba(13,11,9,0.5) 0%, transparent 25%)' }}
          />

          {/* Gold accent — garis kiri */}
          <motion.div
            className="absolute left-0 inset-y-0 w-[1px]"
            style={{ background: 'linear-gradient(to bottom, transparent 5%, rgba(201,168,124,0.45) 30%, rgba(201,168,124,0.45) 70%, transparent 95%)' }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.4, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Info badge — bawah kiri foto */}
          <motion.div
            className="absolute bottom-10 left-8 z-10 flex flex-col gap-1"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 1.5 }}
          >
    
          </motion.div>

          {/* Number counter — kanan atas */}
          <motion.div
            className="absolute top-10 right-8 z-10 flex flex-col items-end gap-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.3 }}
          >
            <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-white/20">Angkatan</span>
            <span className="text-[28px] font-black text-white/15 leading-none tracking-tight">2026</span>
          </motion.div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          MOBILE / TABLET  < lg
      ══════════════════════════════════════ */}
      <div className="lg:hidden relative min-h-screen flex flex-col">

        {/* Background foto — full screen overlay */}
        <div className="absolute inset-0">
          <motion.img
            src={heroPhoto}
            alt="Andini Syifa Rokhima"
            className="w-full h-full object-cover"
            style={{ objectPosition: '50% 35%' }}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.8, ease: 'easeOut' }}
          />
          {/* Gradient: transparan di tengah (wajah terlihat), gelap di atas dan bawah */}
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to bottom, rgba(13,11,9,0.65) 0%, rgba(13,11,9,0.1) 30%, rgba(13,11,9,0.15) 55%, rgba(13,11,9,0.92) 80%, rgba(13,11,9,1) 100%)' }}
          />
        </div>

        {/* Top bar */}
        <motion.div
          className="relative z-10 px-6 sm:px-10 pt-14 flex items-center justify-between"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <span className="label-tag text-[10px]">Portofolio — 2026</span>
          <span className="label-tag text-[10px] opacity-60">{personalInfo.major}</span>
        </motion.div>

        {/* Content — di bawah, di atas gradient gelap */}
        <div className="relative z-10 px-6 sm:px-10 flex-1 flex flex-col justify-end pb-12">

          {/* School badge */}
          <FadeUp delay={0.45}>
            <div className="inline-flex items-center gap-2 border border-gold/25 px-4 py-2 mb-6 w-fit">
              <span className="w-1 h-1 rounded-full bg-gold" />
              <span className="text-[11px] font-bold tracking-[0.24em] uppercase text-gold/85">
                {personalInfo.school}
              </span>
            </div>
          </FadeUp>

          {/* Nama */}
          <div className="flex flex-col leading-[0.88] mb-6">
            {['Andini', 'Syifa', 'Rokhima'].map((word, i) => (
              <div key={word} className="overflow-hidden">
                <motion.span
                  className="display-title block text-[15vw] sm:text-[11vw]"
                  initial={{ y: '105%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.75, delay: 0.5 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                >
                  {word}
                </motion.span>
              </div>
            ))}
          </div>

          {/* Divider */}
          <motion.div
            className="h-px bg-white/15 mb-5"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, delay: 1.0, transformOrigin: 'left' }}
          />

          {/* Tagline */}
          <FadeUp delay={1.0}>
            <div className="min-h-[2.4rem] mb-6">
              <p className="text-[13px] font-medium leading-[1.8] text-cream/70 max-w-[300px]">
                {out}
                {!done && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.45, repeat: Infinity, repeatType: 'reverse' }}
                    className="inline-block w-[1.5px] h-[1.1em] bg-gold/80 align-middle ml-[3px]"
                  />
                )}
              </p>
            </div>
          </FadeUp>

          {/* Buttons */}
          <div className="flex items-center gap-3 flex-wrap">
            <motion.button
              onClick={() => go('#certificates')}
              className="btn-primary text-[12px] px-7 py-3.5"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.6 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              Lihat Portofolio
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.button>
            <motion.a
              href={personalInfo.cvLink}
              download="CV Andini Syifa Rokhima.pdf"
              className="btn-ghost text-[12px] px-7 py-3.5"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.75 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              Download CV
            </motion.a>
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className="absolute bottom-7 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4 }}
        onClick={() => go('#about')}
      >
        <span className="label-tag text-[9px] tracking-[0.3em] opacity-40">Scroll</span>
        <motion.div
          className="w-px h-9 bg-gradient-to-b from-gold/50 to-transparent"
          animate={{ scaleY: [1, 0.4, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
}
