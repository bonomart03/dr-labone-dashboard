import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { API_URL } from '../lib/api';

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
  const [reproduciendo, setReproduciendo] = useState(null);

  useEffect(() => { document.title = 'Multiverso — Dr. Labone'; }, []);

  useEffect(() => {
    axios.get(`${API_URL}/api/personajes`)
      .then(r => setPersonajes(r.data))
      .catch(e => console.error(e))
      .finally(() => setCargando(false));
  }, []);

  const reproducirAudio = (url, id) => {
    if (!url) return;
    const audio = new Audio(url);
    setReproduciendo(id);
    audio.play();
    audio.onended = () => setReproduciendo(null);
    audio.onerror = () => setReproduciendo(null);
  };

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
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
          >
            {visibles.map((p, index) => {
              const tc = TIPO_COLOR[p.tipo] || TIPO_COLOR.TRIBUTO;
              const expandido = expandidos[p.id];
              const descripcionLarga = p.descripcion?.length > 110;

              return (
                <motion.div
                  key={p.id}
                  variants={item}
                  className="group relative flex flex-col rounded-2xl overflow-hidden"
                  style={{
                    background: 'rgba(13,13,18,0.95)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.5)',
                    transition: 'all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-6px)';
                    e.currentTarget.style.borderColor = tc.border;
                    e.currentTarget.style.boxShadow = `0 24px 50px rgba(0,0,0,0.6), 0 0 40px ${tc.bg.replace('0.12','0.18')}`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                    e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.5)';
                  }}
                >
                  {/* ── IMAGEN ── */}
                  <div className="relative h-56 overflow-hidden flex-shrink-0">

                    {/* Foto del personaje */}
                    <img
                      src={p.imagenUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(p.nombre)}&background=0d0d12&color=52525b&size=400&bold=true&font-size=0.4`}
                      alt={p.nombre}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Gradiente inferior — funde imagen con el card */}
                    <div className="absolute inset-0"
                      style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(13,13,18,0.5) 50%, rgba(13,13,18,0.97) 100%)' }} />

                    {/* Línea de color superior */}
                    <div className="absolute top-0 left-0 w-full h-[2px] transition-opacity duration-500 opacity-60 group-hover:opacity-100"
                      style={{ background: `linear-gradient(90deg, transparent, ${tc.text}, transparent)` }} />

                    {/* Número de registro */}
                    <span className="absolute top-3.5 left-4 text-[10px] font-black tracking-[0.3em] z-10"
                      style={{ color: 'rgba(255,255,255,0.2)' }}>
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    {/* Badge de tipo */}
                    <span
                      className="absolute top-3 right-3 text-[9px] font-black uppercase px-2.5 py-1 rounded-full tracking-widest z-10"
                      style={{ background: 'rgba(5,5,8,0.85)', border: `1px solid ${tc.border}`, color: tc.text, backdropFilter: 'blur(8px)' }}
                    >
                      {p.tipo}
                    </span>

                    {/* Nombre sobre la imagen (parte baja) */}
                    <div className="absolute bottom-0 left-0 right-0 px-5 pb-4 z-10">
                      <h3 className="text-xl font-black text-white leading-tight tracking-wide transition-colors duration-300 group-hover:text-yellow-300"
                        style={{ textShadow: '0 2px 12px rgba(0,0,0,0.8)' }}>
                        {p.nombre}
                      </h3>
                      {/* Línea de acento bajo el nombre */}
                      <div className="mt-1.5 h-[1px] w-8 transition-all duration-500 group-hover:w-16"
                        style={{ background: `linear-gradient(90deg, ${tc.text}, transparent)` }} />
                    </div>
                  </div>

                  {/* ── CONTENIDO ── */}
                  <div className="flex flex-col flex-grow px-5 py-4">

                    {/* Descripción */}
                    <div className="flex-grow">
                      <p className="text-zinc-500 text-xs leading-relaxed font-light">
                        {descripcionLarga && !expandido
                          ? p.descripcion.slice(0, 110) + '…'
                          : p.descripcion}
                      </p>
                      {descripcionLarga && (
                        <button
                          onClick={() => toggleExpand(p.id)}
                          className="text-[10px] font-bold uppercase tracking-widest mt-2 transition-colors duration-200"
                          style={{ color: tc.text + '70' }}
                          onMouseEnter={e => { e.currentTarget.style.color = tc.text; }}
                          onMouseLeave={e => { e.currentTarget.style.color = tc.text + '70'; }}
                        >
                          {expandido ? 'Ver menos ↑' : 'Ver más ↓'}
                        </button>
                      )}
                    </div>

                    {/* Audio Easter Egg */}
                    {p.audioEasterEggUrl && (
                      <button
                        onClick={() => reproducirAudio(p.audioEasterEggUrl, p.id)}
                        disabled={reproduciendo === p.id}
                        className="mt-4 w-full py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-2"
                        style={{
                          background: reproduciendo === p.id ? tc.bg.replace('0.12', '0.22') : tc.bg,
                          border: `1px solid ${reproduciendo === p.id ? tc.border.replace('0.4', '0.8') : tc.border}`,
                          color: tc.text,
                          boxShadow: reproduciendo === p.id ? `0 0 18px ${tc.bg.replace('0.12', '0.35')}` : 'none',
                          cursor: reproduciendo === p.id ? 'default' : 'pointer',
                        }}
                        onMouseEnter={e => {
                          if (reproduciendo === p.id) return;
                          e.currentTarget.style.background = tc.bg.replace('0.12', '0.22');
                          e.currentTarget.style.boxShadow = `0 0 14px ${tc.bg}`;
                        }}
                        onMouseLeave={e => {
                          if (reproduciendo === p.id) return;
                          e.currentTarget.style.background = tc.bg;
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      >
                        {reproduciendo === p.id ? (
                          <>
                            <span className="flex items-end gap-[3px] h-3">
                              {[1, 3, 2, 4, 2].map((h, i) => (
                                <span key={i} className="w-[3px] rounded-full animate-bounce"
                                  style={{ height: `${h * 3}px`, background: tc.text, animationDelay: `${i * 0.1}s`, animationDuration: '0.6s' }} />
                              ))}
                            </span>
                            Reproduciendo...
                          </>
                        ) : (
                          <>
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                              <path d="M8 5v14l11-7z"/>
                            </svg>
                            Easter Egg
                          </>
                        )}
                      </button>
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

export default Multiverso;
