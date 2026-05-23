import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { personalInfo } from '../data/portfolioData';
import aboutPhoto from '../assets/fotoscreen/fotoabout.jpg';

const traits = [
  { label: 'Disiplin',       desc: 'Tepat waktu & terstruktur' },
  { label: 'Tanggung Jawab', desc: 'Amanah & dapat diandalkan' },
  { label: 'Teamwork',       desc: 'Kolaboratif & komunikatif' },
  { label: 'Inisiatif',      desc: 'Proaktif & solutif' },
];

export default function About() {
  const ref   = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-120px' });

  return (
    <section id="about" className="bg-dark2" ref={ref}>
      <div className="site-px border-b border-white/8 py-5 flex items-center justify-between">
        <span className="label-tag">01 — Tentang Saya</span>
        <span className="label-tag hidden md:block">{personalInfo.school}</span>
      </div>

      <div className="site-px grid lg:grid-cols-2 gap-0">
        {/* Left */}
        <div className="py-16 lg:py-24 lg:pr-16 lg:border-r border-white/8 flex flex-col justify-between gap-14">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="display-title text-[11vw] md:text-[7vw] lg:text-[5.5vw] mb-10">
              TENTANG<br /><span className="text-gold">SAYA</span>
            </motion.h2>

            <div className="space-y-6">
              {personalInfo.about.map((p, i) => (
                <motion.p key={p}
                  initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                  className="body-text">
                  {p}
                </motion.p>
              ))}
            </div>
          </div>

          {/* Traits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-2 gap-px bg-white/8">
            {traits.map(t => (
              <div key={t.label} className="bg-dark2 p-6 hover:bg-dark3 transition-colors group">
                {/* Trait label — besar & jelas */}
                <div className="text-[16px] font-black text-cream group-hover:text-gold transition-colors mb-2 uppercase tracking-wide">
                  {t.label}
                </div>
                {/* Trait desc — jelas */}
                <div className="text-[14px] font-medium" style={{ color: 'rgba(245,240,232,0.80)' }}>
                  {t.desc}
                </div>
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.7 }}>
            <button onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary">
              Hubungi Saya
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </motion.div>
        </div>

        {/* Right: photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="relative lg:pl-16 py-16 lg:py-24 flex items-center">
          <div className="relative w-full max-w-md mx-auto lg:mx-0">
            <div className="absolute -top-3 -left-3 w-full h-full border border-gold/20" />
            <div className="relative overflow-hidden aspect-[3/4]">
              <img src={aboutPhoto}
                alt="Andini Syifa Rokhima"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                style={{ objectPosition: '50% 20%' }} />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/75 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-7">
                <div className="label-tag mb-2">{personalInfo.major}</div>
                <div className="text-cream font-black text-[20px] uppercase tracking-wide">{personalInfo.name}</div>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.7 }}
              className="absolute -right-4 top-12 bg-dark3 border border-white/15 p-5">
              <div className="label-tag mb-2">Kelas</div>
              <div className="text-cream text-[16px] font-black uppercase tracking-wide">MPLB</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
