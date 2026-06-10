import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound = () => {
  useEffect(() => { document.title = '404 — Dr. Labone'; }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">

      {/* Orbs de fondo */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full opacity-[0.04]"
          style={{ background: '#FBBF24', filter: 'blur(100px)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full opacity-[0.04]"
          style={{ background: '#7C3AED', filter: 'blur(80px)' }} />
      </div>

      {/* 404 gigante de fondo */}
      <div
        className="absolute select-none pointer-events-none font-black"
        style={{
          fontSize: 'clamp(180px, 35vw, 400px)',
          color: 'rgba(251,191,36,0.03)',
          letterSpacing: '-0.05em',
          lineHeight: 1,
          userSelect: 'none',
        }}
      >
        404
      </div>

      {/* Contenido */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative flex flex-col items-center text-center gap-5"
      >
        {/* Badge */}
        <div
          className="px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.4em]"
          style={{
            background: 'rgba(251,191,36,0.07)',
            border: '1px solid rgba(251,191,36,0.2)',
            color: 'rgba(251,191,36,0.5)',
          }}
        >
          Señal perdida
        </div>

        {/* Número */}
        <h1
          className="font-black leading-none"
          style={{
            fontSize: 'clamp(72px, 15vw, 140px)',
            background: 'linear-gradient(180deg, #FEF3C7 0%, #FBBF24 50%, #92400E 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 0 40px rgba(251,191,36,0.2))',
            letterSpacing: '-0.02em',
          }}
        >
          404
        </h1>

        {/* Divisor */}
        <div className="flex items-center gap-4">
          <div className="h-[1px] w-12" style={{ background: 'linear-gradient(90deg, transparent, rgba(251,191,36,0.3))' }} />
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'rgba(251,191,36,0.4)' }} />
          <div className="h-[1px] w-12" style={{ background: 'linear-gradient(90deg, rgba(251,191,36,0.3), transparent)' }} />
        </div>

        {/* Texto */}
        <div className="flex flex-col gap-2 max-w-sm">
          <p className="text-zinc-300 font-semibold text-lg">
            Expediente no encontrado
          </p>
          <p className="text-zinc-600 text-sm font-light leading-relaxed">
            Esta ruta no existe en la base de datos del laboratorio. Puede que haya sido eliminada o nunca existió.
          </p>
        </div>

        {/* CTA */}
        <Link
          to="/"
          className="flex items-center gap-2.5 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 mt-2"
          style={{
            background: 'rgba(251,191,36,0.1)',
            border: '1px solid rgba(251,191,36,0.25)',
            color: '#FBBF24',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(251,191,36,0.18)';
            e.currentTarget.style.borderColor = 'rgba(251,191,36,0.5)';
            e.currentTarget.style.boxShadow = '0 0 20px rgba(251,191,36,0.15)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(251,191,36,0.1)';
            e.currentTarget.style.borderColor = 'rgba(251,191,36,0.25)';
            e.currentTarget.style.boxShadow = 'none';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Volver al inicio
        </Link>
      </motion.div>

    </div>
  );
};

export default NotFound;
