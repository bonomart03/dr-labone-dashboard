import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

const SECCIONES = [
  {
    key: 'personajes',
    url: 'http://localhost:8080/api/personajes',
    to: '/multiverso',
    label: 'Multiverso',
    color: '#8B5CF6',
    bg: 'rgba(139,92,246,0.12)',
    border: 'rgba(139,92,246,0.3)',
    campos: ['nombre', 'descripcion', 'tipo'],
    getTitle: item => item.nombre,
    getDesc:  item => item.descripcion,
    getMeta:  item => item.tipo,
  },
  {
    key: 'gta',
    url: 'http://localhost:8080/api/gta',
    to: '/archivo-gta',
    label: 'Archivo GTA',
    color: '#3B82F6',
    bg: 'rgba(59,130,246,0.12)',
    border: 'rgba(59,130,246,0.3)',
    campos: ['titulo', 'descripcion', 'juego', 'categoria'],
    getTitle: item => item.titulo,
    getDesc:  item => item.descripcion,
    getMeta:  item => item.juego,
    filter:   items => items.filter(x => x.publicado),
  },
  {
    key: 'museo',
    url: 'http://localhost:8080/api/museo',
    to: '/museo',
    label: 'Museo',
    color: '#14B8A6',
    bg: 'rgba(20,184,166,0.12)',
    border: 'rgba(20,184,166,0.3)',
    campos: ['nombre', 'descripcion'],
    getTitle: item => item.nombre,
    getDesc:  item => item.descripcion,
    getMeta:  item => item.anio?.toString(),
  },
];

const highlight = (text, query) => {
  if (!query || !text) return text;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark style={{ background: 'rgba(251,191,36,0.25)', color: '#FBBF24', borderRadius: 2 }}>
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </>
  );
};

const SearchModal = ({ onClose }) => {
  const [query, setQuery] = useState('');
  const [datos, setDatos] = useState({});
  const [cargando, setCargando] = useState(true);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Cargar todos los datos al abrir
  useEffect(() => {
    Promise.all(
      SECCIONES.map(s =>
        axios.get(s.url)
          .then(r => ({ key: s.key, items: s.filter ? s.filter(r.data) : r.data }))
          .catch(() => ({ key: s.key, items: [] }))
      )
    ).then(results => {
      const map = {};
      results.forEach(r => { map[r.key] = r.items; });
      setDatos(map);
      setCargando(false);
    });
  }, []);

  // Auto-focus
  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 80);
  }, []);

  // Cerrar con Escape
  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const q = query.trim();

  const resultados = SECCIONES.map(s => {
    const items = datos[s.key] || [];
    const filtrados = q
      ? items.filter(item =>
          s.campos.some(c => item[c]?.toString().toLowerCase().includes(q.toLowerCase()))
        )
      : [];
    return { ...s, items: filtrados.slice(0, 5) };
  }).filter(s => s.items.length > 0);

  const totalResultados = resultados.reduce((acc, s) => acc + s.items.length, 0);

  const irA = (to) => {
    navigate(to);
    onClose();
  };

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="fixed inset-0 z-[200] flex flex-col items-center pt-[10vh] px-4"
      style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: -12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: -12 }}
        transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        className="w-full max-w-2xl flex flex-col"
        style={{
          background: 'rgba(13,14,18,0.97)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 20,
          boxShadow: '0 25px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(251,191,36,0.06)',
          maxHeight: '75vh',
          overflow: 'hidden',
        }}
      >
        {/* Input */}
        <div className="flex items-center gap-3 px-5 py-4"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            className="w-5 h-5 flex-shrink-0" style={{ color: 'rgba(251,191,36,0.4)' }}>
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Buscar personajes, archivos GTA, proyectos..."
            className="flex-1 bg-transparent outline-none text-base font-medium placeholder:text-zinc-700"
            style={{ color: '#F8FAFC' }}
          />
          {query && (
            <button onClick={() => setQuery('')}
              className="text-zinc-600 hover:text-zinc-400 transition-colors text-lg leading-none">
              ×
            </button>
          )}
          <button onClick={onClose}
            className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded transition-colors"
            style={{ color: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.08)' }}
            onMouseEnter={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.2)'; }}>
            Esc
          </button>
        </div>

        {/* Resultados */}
        <div className="overflow-y-auto flex-1">

          {/* Estado inicial — sin query */}
          {!q && !cargando && (
            <div className="flex flex-col items-center justify-center py-14 gap-3">
              <div className="flex gap-3">
                {SECCIONES.map(s => (
                  <button key={s.key} onClick={() => irA(s.to)}
                    className="px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-200"
                    style={{ background: s.bg, border: `1px solid ${s.border}`, color: s.color }}
                    onMouseEnter={e => { e.currentTarget.style.opacity = '0.7'; }}
                    onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}>
                    {s.label}
                  </button>
                ))}
              </div>
              <p className="text-zinc-700 text-xs">Escribí para buscar en todo el archivo</p>
            </div>
          )}

          {/* Loading */}
          {cargando && (
            <div className="flex justify-center items-center py-14 gap-2">
              {[0,1,2].map(i => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-yellow-400/40 animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }} />
              ))}
            </div>
          )}

          {/* Sin resultados */}
          {q && !cargando && totalResultados === 0 && (
            <div className="flex flex-col items-center justify-center py-14 gap-2">
              <p className="text-zinc-500 text-sm">Sin resultados para <span style={{ color: '#FBBF24' }}>"{q}"</span></p>
              <p className="text-zinc-700 text-xs">Probá con otro término</p>
            </div>
          )}

          {/* Resultados agrupados */}
          {q && !cargando && totalResultados > 0 && (
            <div className="py-2">
              {resultados.map(s => (
                <div key={s.key}>
                  {/* Header de sección */}
                  <div className="flex items-center gap-2 px-5 py-2 mt-1">
                    <span className="text-[9px] font-black uppercase tracking-[0.35em]"
                      style={{ color: s.color }}>
                      {s.label}
                    </span>
                    <div className="flex-1 h-[1px]" style={{ background: `linear-gradient(90deg, ${s.border}, transparent)` }} />
                    <span className="text-[9px] font-bold" style={{ color: s.color + '80' }}>
                      {s.items.length}
                    </span>
                  </div>

                  {/* Items */}
                  {s.items.map((item, i) => (
                    <button
                      key={i}
                      onClick={() => irA(s.to)}
                      className="w-full flex items-start gap-3 px-5 py-3 text-left transition-all duration-150"
                      style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                    >
                      {/* Dot de color */}
                      <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full mt-1.5"
                        style={{ background: s.color }} />

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <p className="text-sm font-semibold text-zinc-200 truncate">
                            {highlight(s.getTitle(item), q)}
                          </p>
                          {s.getMeta(item) && (
                            <span className="flex-shrink-0 text-[9px] font-bold uppercase px-2 py-0.5 rounded-full"
                              style={{ background: s.bg, color: s.color }}>
                              {s.getMeta(item)}
                            </span>
                          )}
                        </div>
                        {s.getDesc(item) && (
                          <p className="text-xs text-zinc-600 truncate">
                            {highlight(
                              s.getDesc(item).length > 80
                                ? s.getDesc(item).slice(0, 80) + '…'
                                : s.getDesc(item),
                              q
                            )}
                          </p>
                        )}
                      </div>

                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                        className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 opacity-20"
                        style={{ color: s.color }}>
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </button>
                  ))}
                </div>
              ))}

              {/* Total */}
              <p className="text-center text-[10px] text-zinc-700 py-3">
                {totalResultados} resultado{totalResultados !== 1 ? 's' : ''} encontrado{totalResultados !== 1 ? 's' : ''}
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
};

export default SearchModal;
