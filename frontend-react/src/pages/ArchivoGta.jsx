import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const item = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  show:   { opacity: 1, y: 0,  scale: 1, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } },
};

const JUEGOS = ['Todos', 'GTA San Andreas', 'GTA Vice City', 'GTA V', 'GTA IV'];

const JUEGO_COLOR = {
  'GTA San Andreas': { color: '#FB923C', bg: 'rgba(251,146,60,0.1)', border: 'rgba(251,146,60,0.35)' },
  'GTA Vice City':   { color: '#F472B6', bg: 'rgba(244,114,182,0.1)', border: 'rgba(244,114,182,0.35)' },
  'GTA V':           { color: '#4ADE80', bg: 'rgba(74,222,128,0.1)', border: 'rgba(74,222,128,0.35)' },
  'GTA IV':          { color: '#94A3B8', bg: 'rgba(148,163,184,0.1)', border: 'rgba(148,163,184,0.35)' },
};

const ArchivoGta = () => {
  const [registros, setRegistros] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [filtro, setFiltro] = useState('Todos');

  useEffect(() => { document.title = 'Archivo GTA — Dr. Labone'; }, []);

  useEffect(() => {
    axios.get('http://localhost:8080/api/gta')
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
                className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300"
                style={activo
                  ? { background: c?.bg || 'rgba(234,179,8,0.12)', border: `1px solid ${c?.border || 'rgba(234,179,8,0.4)'}`, color: c?.color || '#FBBF24', boxShadow: `0 0 12px ${c?.bg || 'rgba(234,179,8,0.2)'}` }
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {visibles.map((r) => {
              const jc = JUEGO_COLOR[r.juego] || { color: '#FBBF24', bg: 'rgba(234,179,8,0.1)', border: 'rgba(234,179,8,0.35)' };

              return (
                <motion.div
                  key={r.id}
                  variants={item}
                  className="group relative flex flex-col rounded-2xl overflow-hidden"
                  style={{
                    background: 'rgba(24,24,27,0.6)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-6px) scale(1.01)';
                    e.currentTarget.style.borderColor = jc.border;
                    e.currentTarget.style.boxShadow = `0 20px 40px rgba(0,0,0,0.5), 0 0 25px ${jc.bg}`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.4)';
                  }}
                >
                  {/* Top glow line */}
                  <div className="absolute top-0 left-0 w-full h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"
                    style={{ background: `linear-gradient(90deg, transparent, ${jc.color}, transparent)` }} />

                  {/* Imagen */}
                  <div className="relative h-48 overflow-hidden bg-zinc-950 flex-shrink-0">
                    <img
                      src={r.imagenUrl || `https://via.placeholder.com/400x200/0a0a0f/1a1a2e?text=${encodeURIComponent(r.juego || 'GTA')}`}
                      alt={r.titulo}
                      className="w-full h-full object-cover transition-all duration-700 opacity-75 group-hover:opacity-100 group-hover:scale-105"
                    />
                    {/* Gradiente sobre la imagen */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#18181b] via-[#18181b]/30 to-transparent" />

                    {/* Badges en la imagen */}
                    <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end z-10">
                      <span
                        className="text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full"
                        style={{ background: jc.bg, border: `1px solid ${jc.border}`, color: jc.color, backdropFilter: 'blur(8px)' }}
                      >
                        {r.juego}
                      </span>
                      {r.categoria && (
                        <span className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-1.5 rounded-full"
                          style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.1)', color: '#71717A', backdropFilter: 'blur(8px)' }}>
                          {r.categoria}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Contenido */}
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-base font-extrabold text-zinc-100 mb-2 group-hover:text-yellow-400 transition-colors duration-300 leading-snug">
                      {r.titulo}
                    </h3>
                    <p className="text-zinc-500 text-xs font-light leading-relaxed flex-grow mb-5">
                      {r.descripcion}
                    </p>

                    {r.videoUrl && (
                      <a
                        href={r.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300"
                        style={{ background: jc.bg, border: `1px solid ${jc.border}`, color: jc.color }}
                        onMouseEnter={e => {
                          e.currentTarget.style.background = jc.bg.replace('0.1', '0.2');
                          e.currentTarget.style.boxShadow = `0 0 14px ${jc.bg}`;
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.background = jc.bg;
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      >
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 flex-shrink-0">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                        Ver Evidencia
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
