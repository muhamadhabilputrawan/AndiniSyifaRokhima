const words = ['Administrasi', 'Perkantoran', 'Layanan Bisnis', 'Komunikasi', 'Profesional', 'Disiplin', 'Teamwork', 'MPLB'];

export default function MarqueeStrip({ reverse = false }) {
  const doubled = [...words, ...words];
  return (
    <div className="overflow-hidden border-y border-white/8 py-4 bg-dark2">
      <div className={reverse ? 'marquee-track-reverse' : 'marquee-track'}>
        {doubled.map((w, i) => (
          <span key={i} className="flex items-center gap-6 px-6">
            {/* Marquee text — lebih jelas */}
            <span className="text-[13px] font-bold uppercase tracking-[0.25em] whitespace-nowrap"
              style={{ color: 'rgba(201,168,124,0.65)' }}>
              {w}
            </span>
            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: 'rgba(201,168,124,0.50)' }} />
          </span>
        ))}
      </div>
    </div>
  );
}
