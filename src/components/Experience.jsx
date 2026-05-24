import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { experiences } from '../data/portfolioData';

const expMeta = {
  1: { badge: 'TEFA',  bg: 'bg-sky-950',     text: 'text-sky-300',     border: 'border-sky-700'   },
  2: { badge: 'CBT',   bg: 'bg-violet-950',  text: 'text-violet-300',  border: 'border-violet-700'},
  3: { badge: 'TEFA',  bg: 'bg-rose-950',    text: 'text-rose-300',    border: 'border-rose-700'  },
  4: { badge: 'KBOF',   bg: 'bg-cyan-950',    text: 'text-cyan-300',    border: 'border-cyan-700'  },
  5: { badge: 'TIK', bg: 'bg-red-950',     text: 'text-red-300',     border: 'border-red-700'   },
  6: { badge: 'DISpora', bg: 'bg-indigo-950',  text: 'text-indigo-300',  border: 'border-indigo-700'},
  7: { badge: 'OSIS',  bg: 'bg-emerald-950', text: 'text-emerald-300', border: 'border-emerald-700'},
  9: { badge: 'FORUM OSIS ', bg: 'bg-indigo-950',  text: 'text-indigo-300',  border: 'border-indigo-700'},
};

function ExpCard({ exp, index }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const meta   = expMeta[exp.id] || expMeta[1];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col bg-dark2 border border-white/8 hover:border-gold/40 transition-all duration-400 overflow-hidden">

      {/* Gold top bar */}
      <div className="h-[2px] w-full bg-gold" />

      <div className="p-4 sm:p-7 flex flex-col gap-4 sm:gap-6 flex-1">
        {/* Row 1: badge + period */}
        <div className="flex items-center justify-between gap-2">
          <div className={`inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 border ${meta.bg} ${meta.border}`}>
            <span className={`text-[11px] sm:text-[13px] font-black tracking-[0.2em] uppercase ${meta.text}`}>
              {meta.badge}
            </span>
          </div>
          <span className="text-[10px] sm:text-[13px] font-bold tracking-wider uppercase text-right" style={{ color: 'rgba(245,240,232,0.75)' }}>
            {exp.period}
          </span>
        </div>

        {/* Row 2: icon + title */}
        <div className="flex items-start gap-3 sm:gap-4">
          <div className={`w-9 h-9 sm:w-12 sm:h-12 flex items-center justify-center text-xl sm:text-2xl flex-shrink-0 border ${meta.border} ${meta.bg}`}>
            {exp.icon}
          </div>
          <div>
            <h3 className="text-cream font-black text-[13px] sm:text-[17px] uppercase tracking-wide leading-tight group-hover:text-gold transition-colors duration-300">
              {exp.title}
            </h3>
            <p className={`text-[11px] sm:text-[13px] font-bold tracking-wider uppercase mt-1 sm:mt-2 ${meta.text}`}>
              {exp.organization}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10" />

        {/* Row 3: type + bullets */}
        <div className="flex flex-col gap-3 sm:gap-4 flex-1">
          <span className="text-[10px] sm:text-[12px] font-bold uppercase tracking-[0.22em]" style={{ color: 'rgba(245,240,232,0.50)' }}>
            {exp.type}
          </span>
          <ul className="space-y-2 sm:space-y-3">
            {exp.description.map(item => (
              <li key={item} className="flex items-start gap-2 sm:gap-3">
                <span className="w-3 sm:w-4 h-[2px] bg-gold mt-[9px] flex-shrink-0" />
                <span className="text-[12px] sm:text-[14px] font-medium leading-relaxed" style={{ color: 'rgba(245,240,232,0.82)' }}>
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="experience" className="bg-dark" ref={ref}>
      <div className="site-px border-b border-white/8 py-5 flex items-center justify-between">
        <span className="label-tag">04 — Pengalaman</span>
        <span className="label-tag hidden md:block">{experiences.length} Aktivitas</span>
      </div>

      <div className="site-px py-16 lg:py-24">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="display-title text-[11vw] md:text-[7vw] lg:text-[5.5vw]">
            PENGALAMAN &<br /><span className="text-gold">AKTIVITAS</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="body-text max-w-xs md:text-right">
            Perjalanan belajar dan pengalaman yang membentuk kompetensi saya
          </motion.p>
        </div>

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mb-10">
          <div className="inline-flex items-center gap-3 border border-gold/40 bg-gold/10 px-5 py-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            <span className="text-[12px] font-black tracking-[0.28em] uppercase text-gold">TEFA</span>
            <span className="text-[11px] font-bold text-gold/60 ml-1">({experiences.length} Kegiatan)</span>
          </div>
        </motion.div>

        {/* Cards — 1 kolom di mobile, 2 kolom di desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {experiences.map((exp, i) => (
            <ExpCard key={exp.id} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
