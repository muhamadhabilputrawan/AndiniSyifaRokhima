import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { personalInfo } from '../data/portfolioData';

const contacts = [
  {
    label: 'Email',
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    value: `+62 ${personalInfo.whatsapp.replace(/^0/, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')}`,
    href: `https://wa.me/62${personalInfo.whatsapp.replace(/^0/, '')}`,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    value: personalInfo.instagram,
    href: `https://instagram.com/${personalInfo.instagram.replace('@', '')}`,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    value: 'Andini Syifa Rokhima',
    href: `https://${personalInfo.linkedin}`,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.073a2.25 2.25 0 01-2.25 2.25h-12a2.25 2.25 0 01-2.25-2.25V6.75A2.25 2.25 0 016 4.5h4.5M15.75 3h4.5v4.5M10.5 13.5l9-9" />
      </svg>
    ),
  },
  {
    label: 'Lokasi',
    value: personalInfo.location,
    href: null,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
  },
];

/* ── Floating label input ── */
function FloatingField({ type = 'text', name, label, value, onChange, required, multiline }) {
  const [focused, setFocused] = useState(false);
  const filled = value.length > 0;
  const active = focused || filled;

  const baseClass = `
    w-full bg-transparent text-cream text-[17px] font-semibold outline-none
    transition-all duration-200 peer
    ${multiline ? 'resize-none pt-7 pb-3 min-h-[130px]' : 'pt-7 pb-3'}
  `;

  return (
    <div className="relative group">
      {/* Animated border bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
      <motion.div
        className="absolute bottom-0 left-0 h-px bg-gold"
        initial={false}
        animate={{ width: focused ? '100%' : '0%' }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Floating label */}
      <motion.label
        htmlFor={name}
        className="absolute left-0 font-medium pointer-events-none select-none"
        initial={false}
        animate={{
          top:      active ? '8px'  : '50%',
          y:        active ? '0%'   : '-50%',
          fontSize: active ? '11px' : '16px',
          color:    focused
            ? 'rgba(201,168,124,1)'
            : active
              ? 'rgba(201,168,124,0.7)'
              : 'rgba(245,240,232,0.5)',
          letterSpacing: active ? '0.2em' : '0.03em',
        }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        style={{ textTransform: active ? 'uppercase' : 'none' }}
      >
        {label}
      </motion.label>

      {multiline ? (
        <textarea
          id={name} name={name} value={value} onChange={onChange} required={required}
          rows={4}
          className={baseClass}
          style={{ caretColor: '#C9A87C', paddingTop: '28px' }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      ) : (
        <input
          id={name} type={type} name={name} value={value} onChange={onChange} required={required}
          className={baseClass}
          style={{ caretColor: '#C9A87C' }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      )}
    </div>
  );
}

/* ── Contact Form — Web3Forms ── */
function ContactForm() {
  const [form,   setForm]   = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus('sending');

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: '5d970e06-beca-4977-973a-fd452f6654db',
          from_name: form.name,
          name: form.name,
          email: form.email,
          message: form.message,
          subject: `Pesan dari ${form.name} — Portofolio Andini`,
          redirect: false,
          botcheck: '',
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus('sent');
        setForm({ name: '', email: '', message: '' });
      } else {
        console.error('Web3Forms response:', res.status, JSON.stringify(data));
        setStatus('error');
      }
    } catch (err) {
      console.error('Network error:', err.message);
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="flex flex-col gap-8">
        <FloatingField
          type="text" name="name" label="Nama Lengkap"
          value={form.name} onChange={handleChange} required
        />
        <FloatingField
          type="email" name="email" label="Alamat Email"
          value={form.email} onChange={handleChange} required
        />
        <FloatingField
          name="message" label="Tulis pesan Anda..."
          value={form.message} onChange={handleChange} required multiline
        />
      </div>

      <div className="mt-10 flex items-center gap-5">
        <motion.button
          type="submit"
          disabled={status === 'sending' || status === 'sent'}
          className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
          whileHover={{ scale: status === 'idle' || status === 'error' ? 1.02 : 1 }}
          whileTap={{ scale: status === 'idle' || status === 'error' ? 0.97 : 1 }}
        >
          <AnimatePresence mode="wait">
            {(status === 'idle' || status === 'error') && (
              <motion.span key="idle" className="flex items-center gap-3"
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                Kirim Pesan
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.span>
            )}
            {status === 'sending' && (
              <motion.span key="sending" className="flex items-center gap-3"
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                  className="inline-block w-4 h-4 border-2 border-dark/30 border-t-dark rounded-full"
                />
                Mengirim...
              </motion.span>
            )}
            {status === 'sent' && (
              <motion.span key="sent" className="flex items-center gap-3"
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                Terkirim
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        <AnimatePresence>
          {status === 'sent' && (
            <motion.p
              initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
              className="text-[14px] font-semibold text-gold"
            >
              Pesan terkirim!
            </motion.p>
          )}
          {status === 'error' && (
            <motion.p
              initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
              className="text-[14px] font-semibold text-red-400"
            >
              Gagal mengirim. Coba lagi.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}

/* ── Main Section ── */
export default function Contact() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="contact" className="bg-dark" ref={ref}>

      {/* Section header */}
      <div className="site-px border-b border-white/8 py-5 flex items-center justify-between">
        <span className="label-tag">06 — Kontak</span>
        <span className="label-tag hidden md:block opacity-50">Mari Terhubung</span>
      </div>

      <div className="site-px py-16 lg:py-24">

        {/* Heading */}
        <div className="mb-16 lg:mb-20">
          <div className="overflow-hidden mb-5">
            <motion.h2
              className="display-title text-[13vw] md:text-[8vw] lg:text-[6vw] leading-[0.88]"
              initial={{ y: '100%' }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            >
              MARI <span className="text-gold">TERHUBUNG</span>
            </motion.h2>
          </div>
          <motion.p
            className="body-text max-w-lg text-cream/60"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.25 }}
          >
            Saya terbuka untuk peluang magang, kolaborasi, atau sekadar berkenalan.
            Isi form atau hubungi langsung.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_420px] gap-16 lg:gap-24 items-start">

          {/* ── FORM ── */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {/* Form header */}
            <div className="flex items-center gap-4 mb-10">
              <span className="label-tag">Kirim Pesan</span>
              <div className="flex-1 h-px bg-white/8" />
            </div>

            <ContactForm />
          </motion.div>

          {/* ── CONTACT LIST ── */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35 }}
          >
            <div className="flex items-center gap-4 mb-10">
              <span className="label-tag">Kontak Langsung</span>
              <div className="flex-1 h-px bg-white/8" />
            </div>

            <div className="flex flex-col gap-3">
              {contacts.map((c, i) => (
                <motion.div
                  key={c.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.07 }}
                >
                  {c.href ? (
                    <a
                      href={c.href}
                      target={c.href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between p-4 border border-white/8 hover:border-gold/40 hover:bg-white/[0.03] transition-all duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-9 h-9 border border-white/10 group-hover:border-gold/40 flex items-center justify-center text-cream/40 group-hover:text-gold transition-all duration-300 flex-shrink-0">
                          {c.icon}
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-cream/40 group-hover:text-gold/70 transition-colors">
                            {c.label}
                          </span>
                          <span className="text-[15px] font-semibold text-cream/85 group-hover:text-cream transition-colors">
                            {c.value}
                          </span>
                        </div>
                      </div>
                      <motion.span
                        className="text-cream/20 group-hover:text-gold transition-colors"
                        initial={false}
                        whileGroupHover={{ x: 4 }}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </motion.span>
                    </a>
                  ) : (
                    <div className="flex items-center gap-4 p-4 border border-white/8">
                      <div className="w-9 h-9 border border-white/10 flex items-center justify-center text-cream/40 flex-shrink-0">
                        {c.icon}
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-cream/40">
                          {c.label}
                        </span>
                        <span className="text-[15px] font-semibold text-cream/85">
                          {c.value}
                        </span>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Availability badge */}
            <motion.div
              className="mt-6 p-4 border border-gold/20 bg-gold/[0.04]"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <div className="flex items-center gap-3">
                <motion.span
                  className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <p className="text-[14px] font-semibold text-cream/75 leading-relaxed">
                  Tersedia untuk peluang magang & kolaborasi — <span className="text-gold font-bold">2026</span>
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
