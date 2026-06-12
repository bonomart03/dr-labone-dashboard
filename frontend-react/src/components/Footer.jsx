import { Link } from 'react-router-dom';
import logoImg from '../assets/logo.jpeg';

const YOUTUBE_URL = 'https://www.youtube.com/@Dr.LaboneOficial';
const LINKEDIN_URL = 'https://www.linkedin.com/in/bono-martinez-8b638227a';
const GITHUB_URL = 'https://github.com/bonomart03';

const links = [
  { to: '/',            label: 'Inicio'      },
  { to: '/multiverso',  label: 'Multiverso'  },
  { to: '/archivo-gta', label: 'Archivo GTA' },
  { to: '/museo',       label: 'Museo'       },
];

const IconLinkedIn = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const IconGitHub = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
);

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

    <div className="max-w-7xl mx-auto px-6 md:px-10 py-8 md:py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">

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
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex flex-col sm:flex-row justify-between items-center gap-3">
        <p className="text-zinc-700 text-[11px] tracking-wide">
          © {new Date().getFullYear()} Dr. Labone — Todos los derechos reservados
        </p>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 transition-colors duration-200"
              style={{ color: '#3F3F46' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#0A66C2'; }}
              onMouseLeave={e => { e.currentTarget.style.color = '#3F3F46'; }}
              aria-label="LinkedIn"
            >
              <IconLinkedIn />
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 transition-colors duration-200"
              style={{ color: '#3F3F46' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#E4E4E7'; }}
              onMouseLeave={e => { e.currentTarget.style.color = '#3F3F46'; }}
              aria-label="GitHub"
            >
              <IconGitHub />
            </a>
          </div>
          <p className="text-zinc-800 text-[10px] tracking-widest uppercase">
            Developed by <span style={{ color: 'rgba(251,191,36,0.4)' }}>Bonomart</span>
          </p>
        </div>
      </div>
    </div>

  </footer>
);

export default Footer;
