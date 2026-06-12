import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { API_URL } from '../lib/api';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const item = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] } },
};

const Museo = () => {
  const [proyectos, setProyectos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [expandidos, setExpandidos] = useState({});

  useEffect(() => { document.title = 'Museo — Dr. Labone'; }, []);

  useEffect(() => {
    axios.get(`${API_URL}/api/museo`)
      .then(r => setProyectos(r.data))
      .catch(e => console.error(e))
      .finally(() => setCargando(false));
  }, []);

  const toggleExpand = (id) =>
    setExpandidos(prev => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="min-h-screen bg-zinc-950 relative overflow-hidden">

      {/* Ambient orbs */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-5%] right-[-5%] w-[500px] h-[500px] rounded-full opacity-[0.05]"
          style={{ background: '#14B8A6', filter: 'blur(100px)' }} />
        <div className="absolute bottom-[5%] left-[-5%] w-[400px] h-[400px] rounded-full opacity-[0.05]"
          style={{ background: '#FBBF24', filter: 'blur(100px)' }} />
      </div>

      <div className="relative px-4 py-14 md:px-8">

        {/* Header */}
        <div className="text-center mb-12 flex flex-col items-center">
          <p className="text-yellow-500/40 text-[10px] font-bold tracking-[0.5em] uppercase mb-3">
            Registro Histórico
          </p>
          <h1 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-yellow-100 via-yellow-400 to-yellow-700 uppercase tracking-[0.12em]"
            style={{ filter: 'drop-shadow(0 0 20px rgba(234,179,8,0.25))' }}>
            Museo de Restauración
          </h1>
          <div className="flex items-center gap-4 mt-5">
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-yellow-500/40" />
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/60" />
            <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-yellow-500/40" />
          </div>
          {!cargando && (
            <p className="text-zinc-600 text-xs mt-4 tracking-wide">
              {proyectos.length} {proyectos.length === 1 ? 'proyecto restaurado' : 'proyectos restaurados'}
            </p>
          )}
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
        {!cargando && proyectos.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 rounded-full border border-teal-500/20 flex items-center justify-center mb-5"
              style={{ background: 'rgba(20,184,166,0.05)' }}>
              <span className="text-3xl opacity-40">🏛️</span>
            </div>
            <p className="text-zinc-500 text-sm">El museo aún no tiene proyectos cargados.</p>
          </div>
        )}

        {/* Grid */}
        {!cargando && proyectos.length > 0 && (
          <motion.div variants={container} initial="hidden" animate="show"
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {proyectos.map((p, i) => {
              const expandido = expandidos[p.id];
              const descripcionLarga = p.descripcion?.length > 160;
              const imagen = p.imagenAntesUrl || p.imagenUrl;

              return (
                <motion.div
                  key={p.id}
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
                    e.currentTarget.style.borderColor = 'rgba(20,184,166,0.4)';
                    e.currentTarget.style.boxShadow = '0 28px 60px rgba(0,0,0,0.7), 0 0 40px rgba(20,184,166,0.15)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                    e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.5)';
                  }}
                >
                  {/* ── IMAGEN ── */}
                  <div className="relative h-64 overflow-hidden flex-shrink-0">
                    <img
                      src={imagen || 'https://via.placeholder.com/600x300/0d0d12/1a1a2e?text=Restauracion'}
                      alt={p.nombre}
                      className="w-full h-full object-cover transition-transform duration-700"
                      style={{ transform: 'scale(1.04)' }}
                    />

                    {/* Gradiente inferior */}
                    <div className="absolute inset-0"
                      style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(13,13,18,0.4) 40%, rgba(13,13,18,0.98) 100%)' }} />

                    {/* Línea de color superior — teal */}
                    <div className="absolute top-0 left-0 w-full h-[3px]"
                      style={{ background: 'linear-gradient(90deg, transparent 0%, #14B8A6 50%, transparent 100%)', opacity: 0.7 }} />

                    {/* Número de proyecto */}
                    <span className="absolute top-4 left-4 text-[11px] font-black tracking-[0.35em] z-10"
                      style={{ color: 'rgba(255,255,255,0.18)' }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    {/* Badge de año */}
                    <span className="absolute top-3.5 right-3.5 text-[10px] font-black tracking-widest px-3 py-1.5 rounded-full z-10"
                      style={{ background: 'rgba(5,5,8,0.88)', border: '1px solid rgba(20,184,166,0.4)', color: '#2DD4BF', backdropFilter: 'blur(10px)' }}>
                      {p.anio}
                    </span>

                    {/* Nombre sobre la imagen */}
                    <div className="absolute bottom-0 left-0 right-0 px-6 pb-5 z-10">
                      <h3 className="text-2xl font-black text-white leading-tight tracking-wide transition-colors duration-300 group-hover:text-teal-300"
                        style={{ textShadow: '0 2px 16px rgba(0,0,0,0.9)' }}>
                        {p.nombre}
                      </h3>
                      <div className="mt-2 h-[2px] w-10 transition-all duration-500 group-hover:w-20"
                        style={{ background: 'linear-gradient(90deg, #14B8A6, transparent)' }} />
                    </div>
                  </div>

                  {/* ── CONTENIDO ── */}
                  <div className="px-6 pt-5 pb-6 flex flex-col flex-grow">

                    {/* Badge "Restauración" */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-1 h-4 rounded-full" style={{ background: '#14B8A6', opacity: 0.5 }} />
                      <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'rgba(20,184,166,0.55)' }}>
                        Proyecto de restauración
                      </span>
                    </div>

                    {/* Descripción */}
                    <p className="text-zinc-400 text-sm leading-relaxed flex-grow">
                      {descripcionLarga && !expandido
                        ? p.descripcion.slice(0, 160) + '…'
                        : p.descripcion}
                    </p>

                    {descripcionLarga && (
                      <button
                        onClick={() => toggleExpand(p.id)}
                        className="text-[11px] font-bold uppercase tracking-widest mt-3 self-start transition-colors duration-200"
                        style={{ color: 'rgba(20,184,166,0.5)' }}
                        onMouseEnter={e => { e.currentTarget.style.color = '#14B8A6'; }}
                        onMouseLeave={e => { e.currentTarget.style.color = 'rgba(20,184,166,0.5)'; }}
                      >
                        {expandido ? '↑ Ver menos' : '↓ Ver más'}
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

export default Museo;
