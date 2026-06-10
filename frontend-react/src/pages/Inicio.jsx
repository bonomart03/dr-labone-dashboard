import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { API_URL } from '../lib/api';

const PORTALES = [
  {
    num: '01',
    to: '/multiverso',
    titulo: 'Multiverso',
    sub: 'Base de Datos',
    desc: 'Personajes, entidades y criaturas que habitan el universo expandido.',
    grad: 'radial-gradient(ellipse at 30% 40%, rgba(109,40,217,0.45) 0%, rgba(12,18,34,0) 70%)',
    glow: 'rgba(139,92,246,0.5)',
    border: 'rgba(139,92,246,0.25)',
    hoverBorder: 'rgba(139,92,246,0.6)',
    tag: '#8B5CF6',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-full h-full">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
        <path d="M2 12h20"/>
        <path d="M12 2a9 9 0 0 1 0 20"/>
      </svg>
    ),
  },
  {
    num: '02',
    to: '/archivo-gta',
    titulo: 'Archivo GTA',
    sub: 'Expedientes Clasificados',
    desc: 'Easter Eggs, misterios y curiosidades descubiertas en la saga Grand Theft Auto.',
    grad: 'radial-gradient(ellipse at 70% 30%, rgba(29,78,216,0.45) 0%, rgba(12,18,34,0) 70%)',
    glow: 'rgba(59,130,246,0.5)',
    border: 'rgba(59,130,246,0.2)',
    hoverBorder: 'rgba(59,130,246,0.6)',
    tag: '#3B82F6',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-full h-full">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <path d="M8 21h8M12 17v4"/>
        <path d="M7 8l2 2-2 2M11 10h4"/>
      </svg>
    ),
  },
  {
    num: '03',
    to: '/museo',
    titulo: 'Museo',
    sub: 'Registro Histórico',
    desc: 'El antes y después de restauraciones, proyectos y creaciones del laboratorio.',
    grad: 'radial-gradient(ellipse at 50% 60%, rgba(13,148,136,0.4) 0%, rgba(12,18,34,0) 70%)',
    glow: 'rgba(20,184,166,0.5)',
    border: 'rgba(20,184,166,0.2)',
    hoverBorder: 'rgba(20,184,166,0.6)',
    tag: '#14B8A6',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-full h-full">
        <path d="M3 21h18M3 10h18M3 7l9-4 9 4M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3"/>
      </svg>
    ),
  },
];

const toEmbedUrl = (url) => {
  if (!url) return '';
  // ya es embed
  if (url.includes('youtube.com/embed/')) return url;
  // youtu.be/ID
  const short = url.match(/youtu\.be\/([^?&]+)/);
  if (short) return `https://www.youtube.com/embed/${short[1]}`;
  // youtube.com/watch?v=ID
  const watch = url.match(/[?&]v=([^?&]+)/);
  if (watch) return `https://www.youtube.com/embed/${watch[1]}`;
  return url;
};

const Inicio = () => {
  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => { document.title = 'Dr. Labone'; }, []);

  useEffect(() => {
    axios.get(`${API_URL}/api/configuracion/video`)
      .then(res => { if (res.data?.url) setVideoUrl(toEmbedUrl(res.data.url)); })
      .catch(() => setVideoUrl('https://www.youtube.com/embed/CXZ4RX11kAY'));
  }, []);

  return (
    <div className="min-h-screen bg-transparent">

      {/* ── HERO ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="text-center pt-14 pb-10 px-4 flex flex-col items-center"
      >
        {/* Dr. */}
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(20px, 3.5vw, 32px)',
            fontWeight: 700,
            fontStyle: 'italic',
            color: 'rgba(251,191,36,0.5)',
            letterSpacing: '0.12em',
            lineHeight: 1,
            marginBottom: '4px',
          }}
        >
          Dr.
        </motion.p>

        {/* Labone */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(52px, 10vw, 100px)',
            fontWeight: 900,
            fontStyle: 'italic',
            color: '#FBBF24',
            letterSpacing: '0.04em',
            lineHeight: 1,
            textShadow: '0 0 60px rgba(251,191,36,0.25), 0 0 20px rgba(251,191,36,0.15)',
          }}
        >
          Labone
        </motion.h1>

        {/* Divisor */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-center gap-5 mt-6 mb-5"
        >
          <div className="h-[1px] w-20 bg-gradient-to-r from-transparent to-yellow-500/30" />
          <div className="w-1 h-1 rounded-full bg-yellow-500/50" />
          <div className="h-[1px] w-20 bg-gradient-to-l from-transparent to-yellow-500/30" />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-zinc-600 text-xs max-w-xs font-light leading-relaxed tracking-[0.3em] uppercase"
        >
          El laboratorio del contenido
        </motion.p>
      </motion.div>

      {/* ── VIDEO ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        className="px-4 md:px-8 mb-20"
      >
        <div
          className="group relative w-full max-w-3xl mx-auto aspect-video rounded-2xl overflow-hidden flex items-center justify-center"
          style={{
            background: 'rgba(18,18,24,0.8)',
            border: '1px solid rgba(255,255,255,0.07)',
            boxShadow: '0 8px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(251,191,36,0.04)',
            backdropFilter: 'blur(8px)',
            transition: 'all 0.5s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'rgba(251,191,36,0.2)';
            e.currentTarget.style.boxShadow = '0 20px 80px rgba(0,0,0,0.8), 0 0 40px rgba(251,191,36,0.08)';
            e.currentTarget.style.transform = 'translateY(-4px)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
            e.currentTarget.style.boxShadow = '0 8px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(251,191,36,0.04)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          {/* Scanline overlay sutil */}
          <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.03]"
            style={{ backgroundImage: 'repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 3px)' }} />

          {videoUrl ? (
            <iframe
              className="absolute inset-0 w-full h-full"
              src={videoUrl}
              title="Transmisión Central"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="flex flex-col items-center gap-4 z-20">
              <div className="flex gap-1.5">
                {[0,1,2].map(i => (
                  <div key={i} className="w-2 h-2 rounded-full bg-yellow-400/50 animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }} />
                ))}
              </div>
              <p className="text-yellow-500/50 text-[10px] font-black tracking-[0.3em] uppercase">
                Conectando transmisión...
              </p>
            </div>
          )}

          {/* Corner decorations */}
          {['top-0 left-0', 'top-0 right-0', 'bottom-0 left-0', 'bottom-0 right-0'].map((pos, i) => (
            <div key={i} className={`absolute ${pos} w-6 h-6 z-20 pointer-events-none`}
              style={{
                borderTop:    i < 2 ? '1px solid rgba(251,191,36,0.3)' : 'none',
                borderBottom: i >= 2 ? '1px solid rgba(251,191,36,0.3)' : 'none',
                borderLeft:   i % 2 === 0 ? '1px solid rgba(251,191,36,0.3)' : 'none',
                borderRight:  i % 2 === 1 ? '1px solid rgba(251,191,36,0.3)' : 'none',
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* ── PORTALES ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="px-4 md:px-8 pb-20"
      >
        <div className="max-w-7xl mx-auto">

          {/* Encabezado de sección */}
          <div className="flex items-center gap-4 mb-8">
            <div className="h-[1px] flex-1" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08))' }} />
            <p className="text-[10px] font-black uppercase tracking-[0.4em]" style={{ color: 'rgba(251,191,36,0.35)' }}>
              Explorar
            </p>
            <div className="h-[1px] flex-1" style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.08), transparent)' }} />
          </div>

          {/* Grid de portales */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {PORTALES.map((p, i) => (
              <motion.div
                key={p.to}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <Link to={p.to} className="block group relative h-[360px] md:h-[420px] rounded-2xl overflow-hidden"
                  style={{
                    background: '#0d1117',
                    border: `1px solid ${p.border}`,
                    boxShadow: `0 4px 30px rgba(0,0,0,0.5)`,
                    transition: 'all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = p.hoverBorder;
                    e.currentTarget.style.boxShadow = `0 20px 60px rgba(0,0,0,0.7), 0 0 40px ${p.glow.replace('0.5', '0.2')}`;
                    e.currentTarget.style.transform = 'translateY(-8px) scale(1.01)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = p.border;
                    e.currentTarget.style.boxShadow = '0 4px 30px rgba(0,0,0,0.5)';
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  }}
                >
                  {/* Fondo degradado animado */}
                  <div className="absolute inset-0 transition-opacity duration-500 opacity-70 group-hover:opacity-100"
                    style={{ background: p.grad }} />

                  {/* Número decorativo gigante */}
                  <div
                    className="absolute -bottom-4 -right-2 text-[160px] font-black leading-none select-none pointer-events-none transition-all duration-500 group-hover:-bottom-2 group-hover:-right-1"
                    style={{
                      color: p.tag,
                      opacity: 0.05,
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  >
                    {p.num}
                  </div>

                  {/* Ícono grande */}
                  <div className="absolute top-7 right-7 w-14 h-14 transition-all duration-500 opacity-20 group-hover:opacity-50 group-hover:scale-110"
                    style={{ color: p.tag }}>
                    {p.icon}
                  </div>

                  {/* Línea superior de color */}
                  <div className="absolute top-0 left-0 w-full h-[2px] transition-opacity duration-500 opacity-40 group-hover:opacity-100"
                    style={{ background: `linear-gradient(90deg, transparent, ${p.tag}, transparent)` }} />

                  {/* Contenido */}
                  <div className="absolute inset-0 flex flex-col justify-end p-8">
                    <p className="text-[9px] font-black uppercase tracking-[0.45em] mb-2 transition-colors duration-300"
                      style={{ color: `${p.tag}99` }}>
                      {p.num} · {p.sub}
                    </p>
                    <h2
                      className="text-3xl md:text-4xl font-black uppercase leading-none mb-4 transition-all duration-300"
                      style={{ color: '#F8FAFC', letterSpacing: '0.06em' }}
                    >
                      {p.titulo}
                    </h2>
                    <p className="text-sm font-light leading-relaxed mb-6 max-w-xs transition-colors duration-300"
                      style={{ color: 'rgba(148,163,184,0.75)' }}>
                      {p.desc}
                    </p>

                    {/* CTA */}
                    <div className="flex items-center gap-3 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                      <span className="text-xs font-black uppercase tracking-[0.25em]"
                        style={{ color: p.tag }}>
                        Acceder
                      </span>
                      <div className="flex-1 h-[1px] max-w-[40px] transition-all duration-500 group-hover:max-w-[80px]"
                        style={{ background: `linear-gradient(90deg, ${p.tag}, transparent)` }} />
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                        className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                        style={{ color: p.tag }}>
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </div>
                  </div>

                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

    </div>
  );
};

export default Inicio;
