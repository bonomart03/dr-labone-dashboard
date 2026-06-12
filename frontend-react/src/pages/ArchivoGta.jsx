import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { API_URL } from '../lib/api';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const item = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  show:   { opacity: 1, y: 0,  scale: 1, transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] } },
};

const JUEGOS = ['Todos', 'GTA San Andreas', 'GTA Vice City', 'GTA V', 'GTA IV'];

const JUEGO_COLOR = {
  'GTA San Andreas': { color: '#FB923C', bg: 'rgba(251,146,60,0.12)', border: 'rgba(251,146,60,0.4)', glow: 'rgba(251,146,60,0.2)' },
  'GTA Vice City':   { color: '#F472B6', bg: 'rgba(244,114,182,0.12)', border: 'rgba(244,114,182,0.4)', glow: 'rgba(244,114,182,0.2)' },
  'GTA V':           { color: '#4ADE80', bg: 'rgba(74,222,128,0.12)', border: 'rgba(74,222,128,0.4)', glow: 'rgba(74,222,128,0.2)' },
  'GTA IV':          { color: '#94A3B8', bg: 'rgba(148,163,184,0.12)', border: 'rgba(148,163,184,0.4)', glow: 'rgba(148,163,184,0.2)' },
};

const ArchivoGta = () => {
  const [registros, setRegistros] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [filtro, setFiltro] = useState('Todos');

  useEffect(() => { document.title = 'Archivo GTA — Dr. Labone'; }, []);

  useEffect(() => {
    axios.get(`${API_URL}/api/gta`)
      .then(r => setRegistros(r.data.filter(x => x.publicado)))
      .catch(e => console.error(e))
      .finally(() => setCargando(false));
  }, []);

  const visibles = filtro === 'Todos'
    ? registros
    : registros.filter(r => r.juego === filtro);

  return (
    <div className="min-h-screen bg-zinc-950 relative overflow-hidden">

      {/* Ambient orbs */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full opacity-[0.05]"
          style={{ background: '#2563EB', filter: 'blur(100px)' }} />
        <div className="absolute bottom-[5%] left-[20%] w-[350px] h-[350px] rounded-full opacity-[0.04]"
          style={{ background: '#FBBF24', filter: 'blur(80px)' }} />
      </div>

      <div className="relative px-4 py-14 md:px-8">

        {/* Header */}
        <div className="text-center mb-12 flex flex-col items-center">
          <p className="text-yellow-500/40 text-[10px] font-bold tracking-[0.5em] uppercase mb-3">
            Expedientes Clasificados
          </p>
          <h1 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-yellow-100 via-yellow-400 to-yellow-700 uppercase tracking-[0.12em]"
            style={{ filter: 'drop-shadow(0 0 20px rgba(234,179,8,0.25))' }}>
            Archivo GTA
          </h1>
          <div className="flex items-center gap-4 mt-5">
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-yellow-500/40" />
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/60" />
            <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-yellow-500/40" />
          </div>
          {!cargando && (
            <p className="text-zinc-600 text-xs mt-4 tracking-wide">
              {visibles.length} {visibles.length === 1 ? 'expediente' : 'expedientes'}
            </p>
          )}
        </div>

        {/* Filtros por juego */}
        <div className="flex justify-center gap-2 flex-wrap mb-10">
          {JUEGOS.map(juego => {
            const c = JUEGO_COLOR[juego];
            const activo = filtro === juego;
            return (
              <button
                key={juego}
                onClick={() => setFiltro(juego)}
                className="px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300"
                style={activo
                  ? { background: c?.bg || 'rgba(234,179,8,0.12)', border: `1px solid ${c?.border || 'rgba(234,179,8,0.4)'}`, color: c?.color || '#FBBF24', boxShadow: `0 0 16px ${c?.glow || 'rgba(234,179,8,0.2)'}` }
                  : { background: 'transparent', border: '1px solid rgba(255,255,255,0.08)', color: '#52525B' }
                }
              >
                {juego === 'Todos' ? 'Todos' : juego.replace('GTA ', '')}
              </button>
            );
          })}
        </div>

        {/* Loading */}
        {cargando && (
          <div className="flex justify-center items-center h-64 gap-2">
            {[0, 1, 2].map(i => (
              <div key={i} className="w-2 h-2 rounded-full bg-yellow-400/60 animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }} />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!cargando && visibles.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 rounded-full border border-blue-500/20 flex items-center justify-center mb-5"
              style={{ background: 'rgba(37,99,235,0.05)' }}>
              <span className="text-3xl opacity-40">🎮</span>
            </div>
            <p className="text-zinc-500 text-sm">No hay expedientes para este título.</p>
          </div>
        )}

        {/* Grid */}
        {!cargando && visibles.length > 0 && (
          <motion.div variants={container} initial="hidden" animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 max-w-7xl mx-auto">
            {visibles.map((r, index) => {
              const jc = JUEGO_COLOR[r.juego] || { color: '#FBBF24', bg: 'rgba(234,179,8,0.12)', border: 'rgba(234,179,8,0.4)', glow: 'rgba(234,179,8,0.2)' };

              return (
                <motion.div
                  key={r.id}
                  variants={item}
                  className="group relative flex flex-col rounded-2xl overflow-hidden"
                  style={{
                    background: 'rgba(13,13,18,0.98)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.5)',
                    transition: 'all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.borderColor = jc.border;
                    e.currentTarget.style.boxShadow = `0 28px 60px rgba(0,0,0,0.7), 0 0 40px ${jc.glow}`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                    e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.5)';
                  }}
                >
                  {/* ── IMAGEN ── */}
                  <div className="relative h-56 overflow-hidden flex-shrink-0">
                    <img
                      src={r.imagenUrl || `https://via.placeholder.com/400x220/0a0a0f/1a1a2e?text=${encodeURIComponent(r.juego || 'GTA')}`}
                      alt={r.titulo}
                      className="w-full h-full object-cover transition-transform duration-700"
                      style={{ transform: 'scale(1.04)' }}
                      onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1)'; }}
                      onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1.04)'; }}
                    />

                    {/* Gradiente inferior */}
                    <div className="absolute inset-0"
                      style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(13,13,18,0.5) 50%, rgba(13,13,18,0.98) 100%)' }} />

                    {/* Línea de color superior */}
                    <div className="absolute top-0 left-0 w-full h-[3px]"
                      style={{ background: `linear-gradient(90deg, transparent 0%, ${jc.color} 50%, transparent 100%)`, opacity: 0.8 }} />

                    {/* Número de expediente */}
                    <span className="absolute top-4 left-4 text-[11px] font-black tracking-[0.35em] z-10"
                      style={{ color: 'rgba(255,255,255,0.18)' }}>
                      EXP·{String(index + 1).padStart(2, '0')}
                    </span>

                    {/* Badge del juego */}
                    <span
                      className="absolute top-3.5 right-3.5 text-[9px] font-black uppercase px-3 py-1.5 rounded-full tracking-widest z-10"
                      style={{ background: 'rgba(5,5,8,0.88)', border: `1px solid ${jc.border}`, color: jc.color, backdropFilter: 'blur(10px)' }}
                    >
                      {r.juego.replace('GTA ', '')}
                    </span>

                    {/* Título sobre la imagen */}
                    <div className="absolute bottom-0 left-0 right-0 px-5 pb-5 z-10">
                      <h3 className="text-xl font-black text-white leading-tight tracking-wide transition-colors duration-300 group-hover:text-yellow-300"
                        style={{ textShadow: '0 2px 16px rgba(0,0,0,0.9)' }}>
                        {r.titulo}
                      </h3>
                      <div className="mt-2 h-[2px] w-10 transition-all duration-500 group-hover:w-20"
                        style={{ background: `linear-gradient(90deg, ${jc.color}, transparent)` }} />
                    </div>
                  </div>

                  {/* ── CONTENIDO ── */}
                  <div className="flex flex-col flex-grow px-5 pt-4 pb-5">

                    {/* Categoría */}
                    {r.categoria && (
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-1 h-4 rounded-full" style={{ background: jc.color, opacity: 0.6 }} />
                        <span className="text-xs font-bold uppercase tracking-widest" style={{ color: jc.color + 'aa' }}>
                          {r.categoria}
                        </span>
                      </div>
                    )}

                    {/* Descripción */}
                    <p className="text-zinc-400 text-sm leading-relaxed flex-grow mb-5">
                      {r.descripcion}
                    </p>

                    {/* Separador */}
                    {r.videoUrl && (
                      <div className="mb-4 h-[1px]" style={{ background: 'rgba(255,255,255,0.05)' }} />
                    )}

                    {/* Botón ver evidencia */}
                    {r.videoUrl && (
                      <a
                        href={r.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2.5 w-full py-3 rounded-xl text-xs font-black uppercase tracking-[0.2em] transition-all duration-300"
                        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#71717A' }}
                        onMouseEnter={e => {
                          e.currentTarget.style.background = jc.bg;
                          e.currentTarget.style.borderColor = jc.border;
                          e.currentTarget.style.color = jc.color;
                          e.currentTarget.style.boxShadow = `0 0 16px ${jc.glow}`;
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                          e.currentTarget.style.color = '#71717A';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      >
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 flex-shrink-0">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                        Ver Evidencia en Video
                      </a>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ArchivoGta;
