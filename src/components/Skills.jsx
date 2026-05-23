import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { skills } from '../data/portfolioData';

function SkillCard({ skill, index }) {
  const ref   = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="group border border-white/8 hover:border-gold/50 bg-dark2 hover:bg-dark3 transition-all duration-300 p-5 sm:p-7 flex flex-col gap-4 sm:gap-5 cursor-default">

      {/* Icon + number */}
      <div className="flex items-start justify-between">
        <span className="text-3xl sm:text-4xl">{skill.icon}</span>
        <span className="label-tag text-[10px] sm:text-[11px]">{String(index + 1).padStart(2, '0')}</span>
      </div>

      {/* Name */}
      <div className="flex flex-col gap-2 sm:gap-3">
        <h3 className="text-[14px] sm:text-[17px] font-black uppercase tracking-wide text-cream group-hover:text-gold transition-colors leading-snug">
          {skill.name}
        </h3>
        {/* Description */}
        <p className="text-[12px] sm:text-[14px] font-medium leading-relaxed" style={{ color: 'rgba(245,240,232,0.82)' }}>
          {skill.description}
        </p>
      </div>

      {/* Category */}
      <div className="mt-auto pt-3 border-t border-white/10">
        <span className="label-tag text-[10px] sm:text-[11px]">{skill.category}</span>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const ref   = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="bg-dark" ref={ref}>
      <div className="site-px border-b border-white/8 py-5 flex items-center justify-between">
        <span className="label-tag">02 — Keahlian</span>
        <span className="label-tag hidden md:block">Skills & Kompetensi</span>
      </div>

      <div className="site-px py-16 lg:py-24">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="display-title text-[11vw] md:text-[7vw] lg:text-[5.5vw]">
            SKILL &<br /><span className="text-gold">KOMPETENSI</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="body-text max-w-xs md:text-right">
            Keahlian yang dikembangkan selama menempuh pendidikan jurusan MPLB
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-px bg-white/5">
          {skills.map((skill, i) => (
            <SkillCard key={skill.id} skill={skill} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
