import { Link } from 'react-router-dom';
import logoImg from '../assets/logo.jpeg';

const YOUTUBE_URL = 'https://www.youtube.com/@Dr.LaboneOficial';

const links = [
  { to: '/',            label: 'Inicio'      },
  { to: '/multiverso',  label: 'Multiverso'  },
  { to: '/archivo-gta', label: 'Archivo GTA' },
  { to: '/museo',       label: 'Museo'       },
];

const IconYoutube = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 flex-shrink-0">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const Footer = () => (
  <footer
    style={{
      position: 'relative',
      zIndex: 1,
      borderTop: '1px solid rgba(255,255,255,0.06)',
      background: 'rgba(9,9,11,0.85)',
      backdropFilter: 'blur(12px)',
    }}
  >
    {/* Línea de acento dorada superior */}
    <div className="w-full h-[1px]"
      style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(251,191,36,0.25) 30%, rgba(251,191,36,0.5) 50%, rgba(251,191,36,0.25) 70%, transparent 100%)' }} />

    <div className="max-w-7xl mx-auto px-6 md:px-10 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6">

        {/* Columna 1 — Identidad */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img
              src={logoImg}
              alt="Dr. Labone"
              className="w-12 h-12 rounded-full object-cover"
              style={{ border: '2px solid rgba(251,191,36,0.5)', boxShadow: '0 0 16px rgba(251,191,36,0.2)' }}
            />
            <span className="text-xl font-black tracking-[0.15em]"
              style={{ color: '#FBBF24', filter: 'drop-shadow(0 0 8px rgba(251,191,36,0.3))' }}>
              Dr.Labone
            </span>
          </Link>
          <p className="text-zinc-600 text-xs font-light leading-relaxed text-center md:text-left max-w-[200px]">
            El laboratorio del contenido. Explorando los límites del universo digital.
          </p>
        </div>

        {/* Columna 2 — Navegación */}
        <div className="flex flex-col items-center gap-3">
          <p className="text-[9px] font-black uppercase tracking-[0.4em] mb-1"
            style={{ color: 'rgba(251,191,36,0.3)' }}>
            Secciones
          </p>
          {links.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm font-medium transition-colors duration-200"
              style={{ color: '#52525B' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#FBBF24'; }}
              onMouseLeave={e => { e.currentTarget.style.color = '#52525B'; }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Columna 3 — YouTube CTA */}
        <div className="flex flex-col items-center md:items-end gap-4">
          <p className="text-[9px] font-black uppercase tracking-[0.4em]"
            style={{ color: 'rgba(251,191,36,0.3)' }}>
            Canal Oficial
          </p>
          <a
            href={YOUTUBE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-5 py-3 rounded-xl font-bold text-sm transition-all duration-300"
            style={{
              background: 'rgba(255,0,0,0.08)',
              border: '1px solid rgba(255,0,0,0.2)',
              color: '#EF4444',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(255,0,0,0.15)';
              e.currentTarget.style.borderColor = 'rgba(255,0,0,0.5)';
              e.currentTarget.style.boxShadow = '0 0 20px rgba(255,0,0,0.15)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(255,0,0,0.08)';
              e.currentTarget.style.borderColor = 'rgba(255,0,0,0.2)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <IconYoutube />
            Suscribirse
          </a>
          <p className="text-zinc-700 text-xs text-center md:text-right">
            Nuevo contenido cada semana
          </p>
        </div>

      </div>
    </div>

    {/* Barra inferior */}
    <div style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex flex-col sm:flex-row justify-between items-center gap-2">
        <p className="text-zinc-700 text-[11px] tracking-wide">
          © {new Date().getFullYear()} Dr. Labone — Todos los derechos reservados
        </p>
        <p className="text-zinc-800 text-[10px] tracking-widest uppercase">
          Hecho con React + Spring Boot
        </p>
      </div>
    </div>

  </footer>
);

export default Footer;
