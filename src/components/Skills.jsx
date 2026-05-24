import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { skills } from '../data/portfolioData';

const hardSkills = skills.filter(s => s.category === 'Hard Skill');
const softSkills = skills.filter(s => s.category === 'Soft Skill');

function SkillCard({ skill, index, globalIndex }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group border border-white/8 hover:border-gold/50 bg-dark2 hover:bg-dark3 transition-all duration-300 p-5 sm:p-6 flex flex-col gap-4 cursor-default">

      {/* Icon + number */}
      <div className="flex items-start justify-between">
        <span className="text-3xl">{skill.icon}</span>
        <span className="label-tag text-[10px]">{String(globalIndex + 1).padStart(2, '0')}</span>
      </div>

      {/* Name + description */}
      <div className="flex flex-col gap-2 flex-1">
        <h3 className="text-[14px] sm:text-[16px] font-black uppercase tracking-wide text-cream group-hover:text-gold transition-colors leading-snug">
          {skill.name}
        </h3>
        <p className="text-[12px] sm:text-[13px] font-medium leading-relaxed" style={{ color: 'rgba(245,240,232,0.75)' }}>
          {skill.description}
        </p>
      </div>

      {/* Category badge */}
      <div className="pt-3 border-t border-white/10">
        <span className={`text-[10px] font-black tracking-[0.22em] uppercase px-2.5 py-1 ${
          skill.category === 'Hard Skill'
            ? 'bg-sky-950 text-sky-300 border border-sky-700'
            : 'bg-amber-950 text-amber-300 border border-amber-700'
        }`}>
          {skill.category}
        </span>
      </div>
    </motion.div>
  );
}

function SkillGroup({ title, subtitle, items, startIndex, inView, delayBase = 0 }) {
  return (
    <div>
      {/* Group header */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: delayBase }}
        className="flex items-center gap-4 mb-6">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-black tracking-[0.3em] uppercase text-gold/60">{subtitle}</span>
          <h3 className="text-[18px] sm:text-[22px] font-black uppercase tracking-wide text-cream">{title}</h3>
        </div>
        <div className="flex-1 h-px bg-white/8" />
        <span className="label-tag text-[10px]">{items.length} Skills</span>
      </motion.div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
        {items.map((skill, i) => (
          <SkillCard key={skill.id} skill={skill} index={i} globalIndex={startIndex + i} />
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="bg-dark" ref={ref}>
      <div className="site-px border-b border-white/8 py-5 flex items-center justify-between">
        <span className="label-tag">02 — Keahlian</span>
        <span className="label-tag hidden md:block">Skills & Kompetensi</span>
      </div>

      <div className="site-px py-16 lg:py-24">

        {/* Section heading */}
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

        {/* Hard Skills */}
        <SkillGroup
          title="Hard Skills"
          subtitle="Keahlian Teknis"
          items={hardSkills}
          startIndex={0}
          inView={inView}
          delayBase={0.2}
        />

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="my-10 h-px bg-white/8"
        />

        {/* Soft Skills */}
        <SkillGroup
          title="Soft Skills"
          subtitle="Kemampuan Interpersonal"
          items={softSkills}
          startIndex={hardSkills.length}
          inView={inView}
          delayBase={0.4}
        />
      </div>
    </section>
  );
}
