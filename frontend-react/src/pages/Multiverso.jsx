import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};
const item = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  show:   { opacity: 1, y: 0,  scale: 1, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } },
};

const TIPOS = ['Todos', 'TRIBUTO', 'MUÑECO', 'MASCOTA'];

const TIPO_COLOR = {
  TRIBUTO: { bg: 'rgba(234,179,8,0.12)', border: 'rgba(234,179,8,0.4)', text: '#FBBF24' },
  MUÑECO:  { bg: 'rgba(139,92,246,0.12)', border: 'rgba(139,92,246,0.4)', text: '#A78BFA' },
  MASCOTA: { bg: 'rgba(20,184,166,0.12)', border: 'rgba(20,184,166,0.4)', text: '#2DD4BF' },
};

const Multiverso = () => {
  const [personajes, setPersonajes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [filtro, setFiltro] = useState('Todos');
  const [expandidos, setExpandidos] = useState({});

  useEffect(() => {
    axios.get('http://localhost:8080/api/personajes')
      .then(r => setPersonajes(r.data))
      .catch(e => console.error(e))
      .finally(() => setCargando(false));
  }, []);

  const reproducirAudio = (url) => url && new Audio(url).play();

  const toggleExpand = (id) =>
    setExpandidos(prev => ({ ...prev, [id]: !prev[id] }));

  const visibles = filtro === 'Todos'
    ? personajes
    : personajes.filter(p => p.tipo === filtro);

  return (
    <div className="min-h-screen bg-zinc-950 relative overflow-hidden">

      {/* Ambient orbs */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full opacity-[0.06]"
          style={{ background: '#FBBF24', filter: 'blur(100px)' }} />
        <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] rounded-full opacity-[0.05]"
          style={{ background: '#8B5CF6', filter: 'blur(100px)' }} />
      </div>

      <div className="relative px-4 py-14 md:px-8">

        {/* Header */}
        <div className="text-center mb-12 flex flex-col items-center">
          <p className="text-yellow-500/40 text-[10px] font-bold tracking-[0.5em] uppercase mb-3">
            Base de Datos
          </p>
          <h1 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-yellow-100 via-yellow-400 to-yellow-700 uppercase tracking-[0.12em]"
            style={{ filter: 'drop-shadow(0 0 20px rgba(234,179,8,0.25))' }}>
            Archivo Multiverso
          </h1>
          <div className="flex items-center gap-4 mt-5">
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-yellow-500/40" />
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/60" />
            <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-yellow-500/40" />
          </div>
          {!cargando && (
            <p className="text-zinc-600 text-xs mt-4 tracking-wide">
              {visibles.length} {visibles.length === 1 ? 'entidad registrada' : 'entidades registradas'}
            </p>
          )}
        </div>

        {/* Filtros */}
        <div className="flex justify-center gap-2 flex-wrap mb-10">
          {TIPOS.map(tipo => {
            const c = TIPO_COLOR[tipo];
            const activo = filtro === tipo;
            return (
              <button
                key={tipo}
                onClick={() => setFiltro(tipo)}
                className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300"
                style={activo
                  ? { background: c?.bg || 'rgba(234,179,8,0.15)', border: `1px solid ${c?.border || 'rgba(234,179,8,0.5)'}`, color: c?.text || '#FBBF24', boxShadow: `0 0 12px ${c?.border || 'rgba(234,179,8,0.3)'}` }
                  : { background: 'transparent', border: '1px solid rgba(255,255,255,0.08)', color: '#52525B' }
                }
              >
                {tipo === 'Todos' ? 'Todos' : tipo.charAt(0) + tipo.slice(1).toLowerCase()}
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
            <div className="w-20 h-20 rounded-full border border-yellow-500/20 flex items-center justify-center mb-5"
              style={{ background: 'rgba(234,179,8,0.05)' }}>
              <span className="text-3xl opacity-40">🌀</span>
            </div>
            <p className="text-zinc-500 text-sm">No hay entidades en esta categoría.</p>
          </div>
        )}

        {/* Grid */}
        {!cargando && visibles.length > 0 && (
          <motion.div
            variants={container} initial="hidden" animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto"
          >
            {visibles.map((p) => {
              const tc = TIPO_COLOR[p.tipo] || TIPO_COLOR.TRIBUTO;
              const expandido = expandidos[p.id];
              const descripcionLarga = p.descripcion?.length > 120;

              return (
                <motion.div
                  key={p.id}
                  variants={item}
                  className="group relative flex flex-col items-center text-center rounded-2xl p-6 overflow-hidden"
                  style={{
                    background: 'rgba(24,24,27,0.6)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-6px) scale(1.01)';
                    e.currentTarget.style.borderColor = tc.border;
                    e.currentTarget.style.boxShadow = `0 20px 40px rgba(0,0,0,0.5), 0 0 30px ${tc.bg}`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.4)';
                  }}
                >
                  {/* Top glow line */}
                  <div className="absolute top-0 left-0 w-full h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `linear-gradient(90deg, transparent, ${tc.text}, transparent)` }} />

                  {/* Imagen */}
                  <div className="relative mb-6 mt-1">
                    <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: tc.bg, filter: 'blur(16px)', transform: 'scale(1.2)' }} />
                    <img
                      src={p.imagenUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(p.nombre)}&background=18181b&color=a1a1aa&size=200&bold=true`}
                      alt={p.nombre}
                      className="relative w-24 h-24 rounded-full object-cover object-top z-10 transition-all duration-500 group-hover:scale-105"
                      style={{ border: `2px solid rgba(255,255,255,0.08)` }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = tc.border; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
                    />
                    <span
                      className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 text-[9px] font-black uppercase px-3 py-1 rounded-full tracking-widest z-20 whitespace-nowrap"
                      style={{ background: 'rgba(10,10,15,0.95)', border: `1px solid ${tc.border}`, color: tc.text }}
                    >
                      {p.tipo}
                    </span>
                  </div>

                  {/* Nombre */}
                  <h3 className="text-base font-extrabold text-zinc-100 mt-1 mb-2 tracking-wide transition-colors duration-300 group-hover:text-yellow-400 leading-tight">
                    {p.nombre}
                  </h3>

                  {/* Descripción con expand */}
                  <div className="flex-grow w-full">
                    <p className="text-zinc-500 text-xs leading-relaxed font-light">
                      {descripcionLarga && !expandido
                        ? p.descripcion.slice(0, 120) + '…'
                        : p.descripcion}
                    </p>
                    {descripcionLarga && (
                      <button
                        onClick={() => toggleExpand(p.id)}
                        className="text-[10px] font-bold uppercase tracking-widest mt-2 transition-colors duration-200"
                        style={{ color: tc.text + '80' }}
                        onMouseEnter={e => { e.currentTarget.style.color = tc.text; }}
                        onMouseLeave={e => { e.currentTarget.style.color = tc.text + '80'; }}
                      >
                        {expandido ? 'Ver menos ↑' : 'Ver más ↓'}
                      </button>
                    )}
                  </div>

                  {/* Audio */}
                  {p.audioEasterEggUrl && (
                    <button
                      onClick={() => reproducirAudio(p.audioEasterEggUrl)}
                      className="mt-5 w-full py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-2"
                      style={{
                        background: tc.bg,
                        border: `1px solid ${tc.border}`,
                        color: tc.text,
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = tc.bg.replace('0.12', '0.22');
                        e.currentTarget.style.boxShadow = `0 0 12px ${tc.bg}`;
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = tc.bg;
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                      Easter Egg
                    </button>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Multiverso;
