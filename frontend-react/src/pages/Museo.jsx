import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const item = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] } },
};

const Museo = () => {
  const [proyectos, setProyectos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8080/api/museo')
      .then(r => setProyectos(r.data))
      .catch(e => console.error(e))
      .finally(() => setCargando(false));
  }, []);

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
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {proyectos.map((p, i) => (
              <motion.div
                key={p.id}
                variants={item}
                className="group relative rounded-2xl overflow-hidden"
                style={{
                  background: 'rgba(24,24,27,0.6)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.borderColor = 'rgba(234,179,8,0.3)';
                  e.currentTarget.style.boxShadow = '0 20px 50px rgba(0,0,0,0.6), 0 0 30px rgba(234,179,8,0.08)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.4)';
                }}
              >
                {/* Top glow line */}
                <div className="absolute top-0 left-0 w-full h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(234,179,8,0.6), transparent)' }} />

                {/* Número de proyecto */}
                <div className="absolute top-4 left-4 z-30">
                  <span className="text-[10px] font-black text-zinc-600 tracking-widest">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Imágenes Antes / Después */}
                <div className="flex h-56 sm:h-64" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>

                  {/* Antes */}
                  <div className="relative w-1/2 overflow-hidden bg-zinc-950">
                    <img
                      src={p.imagenAntesUrl || 'https://via.placeholder.com/300x300/111111/333333?text=Antes'}
                      alt={`Antes — ${p.nombre}`}
                      className="w-full h-full object-cover transition-all duration-700 grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-80 scale-100 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-zinc-950/60" />
                    <span className="absolute bottom-3 left-3 text-[9px] font-black uppercase tracking-[0.2em] px-2.5 py-1 rounded-full"
                      style={{ background: 'rgba(0,0,0,0.75)', border: '1px solid rgba(255,255,255,0.12)', color: '#71717A', backdropFilter: 'blur(4px)' }}>
                      Antes
                    </span>
                  </div>

                  {/* Divisor central */}
                  <div className="relative w-[2px] flex-shrink-0 bg-zinc-800 flex items-center justify-center z-10">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center"
                      style={{ background: 'rgba(10,10,15,0.95)', border: '1px solid rgba(234,179,8,0.3)' }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="#FBBF24" strokeWidth="2" className="w-3.5 h-3.5">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </div>
                  </div>

                  {/* Después */}
                  <div className="relative w-1/2 overflow-hidden bg-zinc-950">
                    <img
                      src={p.imagenDespuesUrl || 'https://via.placeholder.com/300x300/111111/333333?text=Despu%C3%A9s'}
                      alt={`Después — ${p.nombre}`}
                      className="w-full h-full object-cover transition-all duration-700 opacity-85 group-hover:opacity-100 scale-100 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-l from-transparent to-zinc-950/30" />
                    <span className="absolute bottom-3 right-3 text-[9px] font-black uppercase tracking-[0.2em] px-2.5 py-1 rounded-full"
                      style={{ background: 'rgba(0,0,0,0.75)', border: '1px solid rgba(234,179,8,0.4)', color: '#FBBF24', backdropFilter: 'blur(4px)' }}>
                      Después
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg md:text-xl font-extrabold text-zinc-100 group-hover:text-yellow-400 transition-colors duration-300 leading-tight pr-3">
                      {p.nombre}
                    </h3>
                    <span className="flex-shrink-0 text-xs font-black font-mono px-3 py-1 rounded-lg"
                      style={{ background: 'rgba(234,179,8,0.08)', border: '1px solid rgba(234,179,8,0.25)', color: '#D97706' }}>
                      {p.anio}
                    </span>
                  </div>
                  <p className="text-zinc-500 text-sm font-light leading-relaxed">
                    {p.descripcion}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Museo;
