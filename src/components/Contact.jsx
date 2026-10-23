import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { personalInfo } from '../data/portfolioData';

const directContacts = [
  {
    label: 'Email Resmi',
    sublabel: 'Respon Cepat via Inbox',
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
    badge: 'Email',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    sublabel: 'Pesan Singkat & Diskusi',
    value: '+62 852-1751-0696',
    href: `https://wa.me/62${personalInfo.whatsapp.replace(/^0/, '')}`,
    badge: 'Chat',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    sublabel: 'Jaringan Profesional',
    value: 'Andini Syifa Rokhima',
    href: `https://${personalInfo.linkedin}`,
    badge: 'Profil',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.073a2.25 2.25 0 01-2.25 2.25h-12a2.25 2.25 0 01-2.25-2.25V6.75A2.25 2.25 0 016 4.5h4.5M15.75 3h4.5v4.5M10.5 13.5l9-9" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    sublabel: 'Aktivitas & Keseharian',
    value: personalInfo.instagram,
    href: `https://instagram.com/${personalInfo.instagram.replace('@', '')}`,
    badge: 'Sosial',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
      </svg>
    ),
  },
  {
    label: 'Domisili',
    sublabel: 'Jawa Barat, Indonesia',
    value: personalInfo.location,
    href: null,
    badge: 'Lokasi',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
  },
];

/* ── Contact Form Component ── */
function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
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
    <div className="relative bg-dark2 border border-white/10 p-6 sm:p-8 lg:p-10 shadow-2xl">
      {/* Top Gold Line Accent */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gold" />

      {/* Subtle Corner Accents */}
      <div className="absolute top-2.5 left-2.5 w-3 h-3 border-t border-l border-white/20 pointer-events-none" />
      <div className="absolute top-2.5 right-2.5 w-3 h-3 border-t border-r border-white/20 pointer-events-none" />
      <div className="absolute bottom-2.5 left-2.5 w-3 h-3 border-b border-l border-white/20 pointer-events-none" />
      <div className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b border-r border-white/20 pointer-events-none" />

      {/* Form Header */}
      <div className="mb-8">
        <span className="label-tag text-[11px] block mb-2">Formulir Pesan</span>
        <h3 className="text-cream text-[20px] sm:text-[22px] font-black uppercase tracking-wide">
          Kirimkan Pesan Anda
        </h3>
        <p className="text-[13px] text-cream/70 mt-1">
          Silakan tinggalkan pesan atau pertanyaan Anda di bawah ini.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        {/* Name Input */}
        <div>
          <label htmlFor="contact-name" className="block text-[12px] font-bold uppercase tracking-wider text-cream/80 mb-2">
            Nama Lengkap <span className="text-gold">*</span>
          </label>
          <input
            id="contact-name"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Masukkan nama Anda"
            required
            className="w-full bg-dark3 border border-white/15 px-4 py-3.5 text-cream placeholder-cream/35 text-[14px] font-medium outline-none focus:border-gold focus:bg-dark transition-colors duration-200"
          />
        </div>

        {/* Email Input */}
        <div>
          <label htmlFor="contact-email" className="block text-[12px] font-bold uppercase tracking-wider text-cream/80 mb-2">
            Alamat Email <span className="text-gold">*</span>
          </label>
          <input
            id="contact-email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="contoh@email.com"
            required
            className="w-full bg-dark3 border border-white/15 px-4 py-3.5 text-cream placeholder-cream/35 text-[14px] font-medium outline-none focus:border-gold focus:bg-dark transition-colors duration-200"
          />
        </div>

        {/* Message Input */}
        <div>
          <label htmlFor="contact-message" className="block text-[12px] font-bold uppercase tracking-wider text-cream/80 mb-2">
            Isi Pesan <span className="text-gold">*</span>
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            value={form.message}
            onChange={handleChange}
            placeholder="Tuliskan pesan, penawaran magang, atau pertanyaan Anda..."
            required
            className="w-full bg-dark3 border border-white/15 px-4 py-3.5 text-cream placeholder-cream/35 text-[14px] font-medium outline-none focus:border-gold focus:bg-dark transition-colors duration-200 resize-none"
          />
        </div>

        {/* Submit Button & Status Message */}
        <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-4">
          <button
            type="submit"
            disabled={status === 'sending' || status === 'sent'}
            className="btn-primary w-full sm:w-auto justify-center disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {status === 'sending' ? (
              <span className="flex items-center gap-2">
                <span className="inline-block w-4 h-4 border-2 border-dark/30 border-t-dark rounded-full animate-spin" />
                Mengirim Pesan...
              </span>
            ) : status === 'sent' ? (
              <span className="flex items-center gap-2">
                <span>✓</span>
                Pesan Terkirim
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <span>Kirim Pesan</span>
                <span className="text-base font-bold">→</span>
              </span>
            )}
          </button>

          <AnimatePresence>
            {status === 'sent' && (
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="text-[13px] font-bold text-gold"
              >
                Pesan Anda berhasil dikirimkan! Terima kasih.
              </motion.p>
            )}
            {status === 'error' && (
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="text-[13px] font-bold text-red-400"
              >
                Gagal mengirim pesan. Silakan coba beberapa saat lagi.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </form>
    </div>
  );
}

/* ── Main Contact Section ── */
export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="contact" className="bg-dark relative border-t border-white/8" ref={ref}>
      {/* Top Section Tag */}
      <div className="site-px border-b border-white/8 py-5 flex items-center justify-between">
        <span className="label-tag">06 — Kontak & Komunikasi</span>
        <span className="label-tag hidden md:block">Mari Terhubung</span>
      </div>

      <div className="site-px py-16 lg:py-24">
        {/* Header Heading */}
        <div className="mb-14 lg:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="display-title text-[11vw] md:text-[7vw] lg:text-[5.5vw] leading-[0.9]"
          >
            MARI <span className="text-gold">TERHUBUNG</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="body-text text-cream/70 max-w-xl mt-4"
          >
            Saya terbuka untuk peluang Praktik Kerja Lapangan (PKL), magang industri, proyek administrasi, atau sekadar berdiskusi.
          </motion.p>
        </div>

        {/* Cohesive 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* ── LEFT: FORMULIR PESAN (7 Columns) ── */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          {/* ── RIGHT: KONTAK LANGSUNG (5 Columns) ── */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* Availability Status Badge (Without Year) */}
            <div className="p-4 border border-gold/40 bg-gold/[0.06] flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
              <div>
                <span className="text-gold text-[10px] font-black uppercase tracking-widest block">
                  Status Ketersediaan
                </span>
                <p className="text-[13px] font-bold text-cream mt-0.5">
                  Terbuka untuk Peluang Magang & Kolaborasi Profesional
                </p>
              </div>
            </div>

            {/* Direct Contact Cards List */}
            <div className="space-y-3">
              {directContacts.map((c) => (
                <div key={c.label}>
                  {c.href ? (
                    <a
                      href={c.href}
                      target={c.href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between p-4 bg-dark2 border border-white/10 hover:border-gold/60 hover:bg-dark3 transition-all duration-300 shadow-md"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 border border-white/15 group-hover:border-gold flex items-center justify-center text-cream/60 group-hover:text-gold bg-dark3 transition-colors duration-300 flex-shrink-0">
                          {c.icon}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black tracking-widest uppercase text-gold">
                              {c.label}
                            </span>
                            <span className="text-white/20 text-[10px]">•</span>
                            <span className="text-[10px] text-cream/45 uppercase tracking-wider">
                              {c.sublabel}
                            </span>
                          </div>
                          <span className="text-[14px] font-bold text-cream group-hover:text-cream transition-colors block mt-0.5">
                            {c.value}
                          </span>
                        </div>
                      </div>

                      <span className="text-cream/30 group-hover:text-gold group-hover:translate-x-1 transition-all text-sm font-bold pl-2">
                        ↗
                      </span>
                    </a>
                  ) : (
                    <div className="flex items-center justify-between p-4 bg-dark2 border border-white/10">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 border border-white/15 flex items-center justify-center text-cream/60 bg-dark3 flex-shrink-0">
                          {c.icon}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black tracking-widest uppercase text-gold">
                              {c.label}
                            </span>
                            <span className="text-white/20 text-[10px]">•</span>
                            <span className="text-[10px] text-cream/45 uppercase tracking-wider">
                              {c.sublabel}
                            </span>
                          </div>
                          <span className="text-[14px] font-bold text-cream block mt-0.5">
                            {c.value}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
