import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import logoImg from '../assets/logo.jpeg';
import SearchModal from './SearchModal';

const YOUTUBE_URL = 'https://www.youtube.com/@Dr.LaboneOficial';

const links = [
  { to: '/',            label: 'Inicio',      color: '#FBBF24', glow: 'rgba(251,191,36,0.35)',  bg: 'rgba(251,191,36,0.1)'  },
  { to: '/multiverso',  label: 'Multiverso',  color: '#8B5CF6', glow: 'rgba(139,92,246,0.35)',  bg: 'rgba(139,92,246,0.1)'  },
  { to: '/archivo-gta', label: 'Archivo GTA', color: '#3B82F6', glow: 'rgba(59,130,246,0.35)',   bg: 'rgba(59,130,246,0.1)'  },
  { to: '/museo',       label: 'Museo',       color: '#14B8A6', glow: 'rgba(20,184,166,0.35)',   bg: 'rgba(20,184,166,0.1)'  },
];

const IconYoutube = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const IconLock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

const IconSearch = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
  </svg>
);

const Navbar = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [searchAbierto, setSearchAbierto] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/60 shadow-[0_1px_0_rgba(234,179,8,0.08)]">
      <div className="flex justify-between items-center px-6 md:px-10 py-3">

        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
          <img
            src={logoImg}
            alt="Dr. Labone"
            className="w-11 h-11 rounded-full object-cover border-2 border-yellow-500/80 shadow-[0_0_14px_rgba(234,179,8,0.5)] hover:scale-105 transition-transform duration-300"
          />
          <span className="hidden sm:block text-yellow-400 text-xl font-black tracking-[0.15em] drop-shadow-[0_0_8px_rgba(234,179,8,0.35)]">
            Dr.Labone
          </span>
        </NavLink>

        {/* Links desktop */}
        <div className="hidden md:flex items-center gap-1">
          {links.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `px-4 py-2 rounded-md text-sm font-semibold tracking-wide transition-all duration-300 ${
                  isActive ? '' : 'text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/50'
                }`
              }
              style={({ isActive }) => isActive ? {
                color: l.color,
                background: l.bg,
                boxShadow: `0 0 14px ${l.glow}`,
              } : {}}
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        {/* Derecha: buscar + YouTube + admin + hamburger */}
        <div className="flex items-center gap-1">

          {/* Buscar */}
          <button
            onClick={() => setSearchAbierto(true)}
            title="Buscar"
            className="p-2 rounded-full transition-all duration-300 text-zinc-600 hover:text-yellow-400 hover:bg-zinc-800/60"
          >
            <IconSearch />
          </button>

          {/* YouTube */}
          <a
            href={YOUTUBE_URL}
            target="_blank"
            rel="noopener noreferrer"
            title="Canal de YouTube"
            className="p-2 rounded-full transition-all duration-300 text-zinc-600 hover:text-[#FF0000] hover:bg-red-950/30"
          >
            <IconYoutube />
          </a>

          {/* Admin */}
          <NavLink
            to="/login"
            title="Acceso Clasificado"
            className={({ isActive }) =>
              `p-2 rounded-full transition-all duration-300 inline-flex items-center justify-center ${
                isActive
                  ? 'text-yellow-400 bg-yellow-500/10'
                  : 'text-zinc-600 hover:text-yellow-400 hover:bg-zinc-800/60'
              }`
            }
          >
            <IconLock />
          </NavLink>

          {/* Hamburger mobile */}
          <button
            className="md:hidden p-2 rounded-md text-zinc-400 hover:text-yellow-400 hover:bg-zinc-800/60 transition-all ml-1"
            onClick={() => setMenuAbierto(v => !v)}
            aria-label="Menú"
          >
            <div className={`w-5 h-0.5 bg-current mb-1.5 transition-all duration-300 origin-center ${menuAbierto ? 'rotate-45 translate-y-2' : ''}`} />
            <div className={`w-5 h-0.5 bg-current mb-1.5 transition-all duration-300 ${menuAbierto ? 'opacity-0 scale-x-0' : ''}`} />
            <div className={`w-5 h-0.5 bg-current transition-all duration-300 origin-center ${menuAbierto ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Search modal */}
      <AnimatePresence>
        {searchAbierto && <SearchModal onClose={() => setSearchAbierto(false)} />}
      </AnimatePresence>

      {/* Menú mobile animado */}
      <AnimatePresence>
        {menuAbierto && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
            className="md:hidden overflow-hidden border-t border-zinc-800/60 bg-zinc-950/95"
          >
            <div className="px-4 py-3 flex flex-col gap-1">
              {links.map(l => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.to === '/'}
                  onClick={() => setMenuAbierto(false)}
                  className={({ isActive }) =>
                    `px-4 py-2.5 rounded-md text-sm font-semibold tracking-wide transition-all duration-300 ${
                      isActive ? '' : 'text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/50'
                    }`
                  }
                  style={({ isActive }) => isActive ? {
                    color: l.color,
                    background: l.bg,
                    boxShadow: `0 0 14px ${l.glow}`,
                  } : {}}
                >
                  {l.label}
                </NavLink>
              ))}

              <div className="mt-2 pt-2 border-t border-zinc-800/40 flex items-center gap-3 px-4">
                <a
                  href={YOUTUBE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-zinc-600 hover:text-[#FF0000] transition-colors text-xs font-semibold"
                  onClick={() => setMenuAbierto(false)}
                >
                  <IconYoutube />
                  YouTube
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
