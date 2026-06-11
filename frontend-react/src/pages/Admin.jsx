import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { API_URL } from '../lib/api';
import FormularioPersonaje from '../components/FormularioPersonaje';
import FormularioMuseo from '../components/FormularioMuseo';
import FormularioGta from '../components/FormularioGta';

const TABS = [
  {
    key: 'multiverso',
    label: 'Multiverso',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
        <circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>
      </svg>
    ),
    descripcion: 'Personajes y entidades del universo.',
    color: '#8B5CF6',
    ruta: '/multiverso',
  },
  {
    key: 'museo',
    label: 'Museo',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
        <path d="M3 21h18M3 10h18M3 7l9-4 9 4M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3"/>
      </svg>
    ),
    descripcion: 'Proyectos de restauración histórica.',
    color: '#14B8A6',
    ruta: '/museo',
  },
  {
    key: 'gta',
    label: 'Archivo GTA',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
        <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/><path d="M7 8l2 2-2 2M11 10h4"/>
      </svg>
    ),
    descripcion: 'Easter eggs y misterios de GTA.',
    color: '#2563EB',
    ruta: '/archivo-gta',
  },
  {
    key: 'configuracion',
    label: 'Configuración',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
        <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
      </svg>
    ),
    descripcion: 'Ajustes del sitio.',
    color: '#F59E0B',
    ruta: null,
  },
];

const ENDPOINTS = {
  multiverso: `${API_URL}/api/personajes`,
  museo: `${API_URL}/api/museo`,
  gta: `${API_URL}/api/gta`,
};

const Admin = () => {
  const navigate = useNavigate();
  const [seccion, setSeccion] = useState('multiverso');
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [itemEditando, setItemEditando] = useState(null);
  const [items, setItems] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [videoUrl, setVideoUrl] = useState('');

  const token = localStorage.getItem('dr_labone_token');
  const authConfig = { headers: { Authorization: token } };

  useEffect(() => { document.title = 'Admin — Dr. Labone'; }, []);

  useEffect(() => {
    if (!token) navigate('/login');
  }, [token, navigate]);

  useEffect(() => {
    setMostrarFormulario(false);
    setItemEditando(null);
    if (seccion === 'configuracion') {
      axios.get(`${API_URL}/api/configuracion/video`)
        .then(res => setVideoUrl(res.data?.url || ''))
        .catch(() => toast.error('Error al cargar configuración.'));
    } else {
      cargarItems();
    }
  }, [seccion]);

  const cargarItems = async () => {
    setCargando(true);
    try {
      const res = await axios.get(ENDPOINTS[seccion]);
      setItems(res.data);
    } catch {
      toast.error('Error al cargar los datos.');
    } finally {
      setCargando(false);
    }
  };

  const guardarVideo = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/configuracion/video`, { url: videoUrl }, authConfig);
      toast.success('Video de portada actualizado.');
    } catch {
      toast.error('Error al guardar el video.');
    }
  };

  const eliminar = async (id) => {
    if (!window.confirm('¿Eliminar este registro?')) return;
    try {
      await axios.delete(`${ENDPOINTS[seccion]}/${id}`, authConfig);
      toast.success('Eliminado correctamente.');
      cargarItems();
    } catch {
      toast.error('Error al eliminar.');
    }
  };

  const editar = (item) => {
    setItemEditando(item);
    setMostrarFormulario(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const alTerminar = () => {
    setMostrarFormulario(false);
    setItemEditando(null);
    cargarItems();
  };

  const etiquetaItem = (item) => {
    if (seccion === 'multiverso') return { titulo: item.nombre, sub: item.tipo };
    if (seccion === 'museo') return { titulo: item.nombre, sub: String(item.anio) };
    if (seccion === 'gta') return { titulo: item.titulo, sub: item.juego };
    return { titulo: String(item.id), sub: '' };
  };

  const tabActual = TABS.find(t => t.key === seccion);

  return (
    <div className="min-h-screen" style={{ background: '#0C1222' }}>

      {/* Ambient glow orbs */}
      <div className="glow-orb w-[600px] h-[600px] top-[-200px] left-[-200px]" style={{ background: '#1E3A8A' }} />
      <div className="glow-orb w-[500px] h-[500px] top-[30%] right-[-150px]" style={{ background: '#7C3AED' }} />
      <div className="glow-orb w-[400px] h-[400px] bottom-[-100px] left-[30%]" style={{ background: '#F59E0B' }} />

      <div className="relative px-4 py-8 md:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto">

          {/* ── HEADER ── */}
          <div className="flex items-start justify-between mb-10">
            <div>
              <p className="text-xs font-bold tracking-[0.5em] uppercase mb-2" style={{ color: 'rgba(251,191,36,0.5)' }}>
                Panel de Control · Admin
              </p>
              <h1
                className="text-3xl md:text-4xl font-black uppercase tracking-wider"
                style={{
                  background: 'linear-gradient(135deg, #FCD34D, #FBBF24, #F59E0B)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0 0 20px rgba(251,191,36,0.3))',
                }}
              >
                Central de Mando
              </h1>
            </div>
            <button
              onClick={() => { localStorage.removeItem('dr_labone_token'); navigate('/login'); }}
              className="mt-1 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300"
              style={{
                border: '1px solid rgba(248,250,252,0.08)',
                color: '#94A3B8',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(239,68,68,0.4)';
                e.currentTarget.style.color = '#FCA5A5';
                e.currentTarget.style.background = 'rgba(239,68,68,0.08)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(248,250,252,0.08)';
                e.currentTarget.style.color = '#94A3B8';
                e.currentTarget.style.background = 'transparent';
              }}
            >
              Cerrar sesión
            </button>
          </div>

          {/* ── TABS ── */}
          <div className="flex gap-3 flex-wrap mb-8">
            {TABS.map(tab => (
              <button
                key={tab.key}
                onClick={() => setSeccion(tab.key)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-bold tracking-wide transition-all duration-300"
                style={
                  seccion === tab.key
                    ? {
                        background: `linear-gradient(135deg, ${tab.color}cc, ${tab.color}88)`,
                        border: `1px solid ${tab.color}60`,
                        color: '#fff',
                        boxShadow: `0 0 16px ${tab.color}40`,
                        transform: 'scale(1.04)',
                      }
                    : {
                        background: 'rgba(30,41,59,0.5)',
                        border: '1px solid rgba(248,250,252,0.08)',
                        color: '#64748B',
                      }
                }
              >
                <span style={seccion === tab.key ? { color: tab.color } : {}}>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* ── CONFIGURACIÓN ── */}
          {seccion === 'configuracion' && (
            <div className="glass-card p-8 max-w-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{ background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.3)' }}
                >
                  <span style={{ color: '#F59E0B' }}>{tabActual?.icon}</span>
                </div>
                <div>
                  <h3 className="text-white font-extrabold text-xl">Video de Portada</h3>
                  <p className="text-slate-500 text-xs mt-0.5">URL embed de YouTube · Página de Inicio</p>
                </div>
              </div>

              <form onSubmit={guardarVideo} className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="https://www.youtube.com/embed/..."
                  value={videoUrl}
                  onChange={e => setVideoUrl(e.target.value)}
                  required
                  className="w-full rounded-xl px-5 py-4 text-sm outline-none transition-all duration-300"
                  style={{
                    background: 'rgba(12,18,34,0.8)',
                    border: '1px solid rgba(248,250,252,0.08)',
                    color: '#E2E8F0',
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3)',
                  }}
                  onFocus={e => { e.currentTarget.style.borderColor = 'rgba(245,158,11,0.5)'; }}
                  onBlur={e => { e.currentTarget.style.borderColor = 'rgba(248,250,252,0.08)'; }}
                />
                <button type="submit" className="btn-gold self-start px-8 py-3 text-sm uppercase tracking-widest">
                  Guardar cambios
                </button>
              </form>
            </div>
          )}

          {/* ── BENTO GRID ── */}
          {seccion !== 'configuracion' && (
            <div className="grid grid-cols-12 gap-6">

              {/* ─ Main card (items) ─ */}
              <div className="col-span-12 lg:col-span-8 glass-card overflow-hidden">

                {/* Card header */}
                <div
                  className="flex items-center justify-between px-6 py-5"
                  style={{ borderBottom: '1px solid rgba(248,250,252,0.05)' }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{
                        background: `${tabActual?.color}20`,
                        border: `1px solid ${tabActual?.color}40`,
                        color: tabActual?.color,
                      }}
                    >
                      {tabActual?.icon}
                    </div>
                    <div>
                      <h2 className="text-white font-extrabold text-lg leading-tight">{tabActual?.label}</h2>
                      <p className="text-slate-500 text-xs">
                        {cargando ? '...' : `${items.length} registro${items.length !== 1 ? 's' : ''}`}
                      </p>
                    </div>
                  </div>

                  {!mostrarFormulario && (
                    <button
                      onClick={() => setMostrarFormulario(true)}
                      className="btn-gold flex items-center gap-2 px-5 py-2.5 text-xs uppercase tracking-widest"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5">
                        <path d="M12 5v14M5 12h14"/>
                      </svg>
                      Agregar
                    </button>
                  )}
                </div>

                {/* Formulario */}
                {mostrarFormulario && (
                  <div className="px-6 py-5" style={{ borderBottom: '1px solid rgba(248,250,252,0.05)' }}>
                    {seccion === 'multiverso' && <FormularioPersonaje alTerminar={alTerminar} itemEditar={itemEditando} />}
                    {seccion === 'museo' && <FormularioMuseo alTerminar={alTerminar} itemEditar={itemEditando} />}
                    {seccion === 'gta' && <FormularioGta alTerminar={alTerminar} itemEditar={itemEditando} />}
                    <button
                      onClick={() => { setMostrarFormulario(false); setItemEditando(null); }}
                      className="mt-3 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300"
                      style={{ border: '1px solid rgba(248,250,252,0.08)', color: '#64748B' }}
                    >
                      Cancelar
                    </button>
                  </div>
                )}

                {/* Lista */}
                <div className="p-4">
                  {cargando ? (
                    <div className="flex justify-center py-14">
                      <div
                        className="w-9 h-9 rounded-full border-[3px] animate-spin"
                        style={{ borderColor: 'rgba(245,158,11,0.15)', borderTopColor: '#F59E0B' }}
                      />
                    </div>
                  ) : items.length === 0 ? (
                    <div className="text-center py-14">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3"
                        style={{ background: 'rgba(30,41,59,0.6)', color: '#334155' }}
                      >
                        {tabActual?.icon}
                      </div>
                      <p className="text-slate-600 text-sm">No hay registros aún.</p>
                      <button
                        onClick={() => setMostrarFormulario(true)}
                        className="mt-4 text-xs font-bold uppercase tracking-widest transition-colors"
                        style={{ color: '#F59E0B' }}
                      >
                        + Agregar el primero
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-1.5">
                      {items.map(item => {
                        const { titulo, sub } = etiquetaItem(item);
                        return (
                          <div
                            key={item.id}
                            className="group flex justify-between items-center px-5 py-3.5 rounded-xl transition-all duration-300 cursor-default"
                            style={{ border: '1px solid transparent' }}
                            onMouseEnter={e => {
                              e.currentTarget.style.background = 'rgba(12,18,34,0.6)';
                              e.currentTarget.style.borderColor = 'rgba(248,250,252,0.06)';
                            }}
                            onMouseLeave={e => {
                              e.currentTarget.style.background = 'transparent';
                              e.currentTarget.style.borderColor = 'transparent';
                            }}
                          >
                            <div>
                              <p className="text-slate-200 text-sm font-semibold leading-tight">{titulo}</p>
                              <p className="text-slate-500 text-xs mt-0.5">{sub}</p>
                            </div>
                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                              <button
                                onClick={() => editar(item)}
                                className="px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300"
                                style={{ color: '#64748B', border: '1px solid transparent' }}
                                onMouseEnter={e => {
                                  e.currentTarget.style.color = '#60A5FA';
                                  e.currentTarget.style.borderColor = 'rgba(59,130,246,0.35)';
                                  e.currentTarget.style.background = 'rgba(59,130,246,0.08)';
                                }}
                                onMouseLeave={e => {
                                  e.currentTarget.style.color = '#64748B';
                                  e.currentTarget.style.borderColor = 'transparent';
                                  e.currentTarget.style.background = 'transparent';
                                }}
                              >
                                Editar
                              </button>
                              <button
                                onClick={() => eliminar(item.id)}
                                className="px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300"
                                style={{ color: '#64748B', border: '1px solid transparent' }}
                                onMouseEnter={e => {
                                  e.currentTarget.style.color = '#F87171';
                                  e.currentTarget.style.borderColor = 'rgba(239,68,68,0.35)';
                                  e.currentTarget.style.background = 'rgba(239,68,68,0.08)';
                                }}
                                onMouseLeave={e => {
                                  e.currentTarget.style.color = '#64748B';
                                  e.currentTarget.style.borderColor = 'transparent';
                                  e.currentTarget.style.background = 'transparent';
                                }}
                              >
                                Eliminar
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* ─ Side cards ─ */}
              <div className="col-span-12 lg:col-span-4 flex flex-col gap-5">

                {/* Stat card */}
                <div
                  className="glass-card p-6"
                  style={{ borderColor: `${tabActual?.color}25` }}
                >
                  <p className="text-xs font-bold uppercase tracking-[0.3em] mb-1" style={{ color: `${tabActual?.color}80` }}>
                    Total registros
                  </p>
                  <p
                    className="text-5xl font-black mt-2 mb-4"
                    style={{ color: tabActual?.color, filter: `drop-shadow(0 0 12px ${tabActual?.color}50)` }}
                  >
                    {cargando ? '—' : items.length}
                  </p>
                  <p className="text-slate-500 text-xs leading-relaxed">{tabActual?.descripcion}</p>
                  {tabActual?.ruta && (
                    <Link
                      to={tabActual.ruta}
                      className="inline-flex items-center gap-1.5 mt-4 text-xs font-bold uppercase tracking-widest transition-colors"
                      style={{ color: `${tabActual?.color}80` }}
                      onMouseEnter={e => { e.currentTarget.style.color = tabActual?.color; }}
                      onMouseLeave={e => { e.currentTarget.style.color = `${tabActual?.color}80`; }}
                    >
                      Ver página pública
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </Link>
                  )}
                </div>

                {/* Otras secciones */}
                <div className="glass-card p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-500 mb-4">Secciones</p>
                  <div className="flex flex-col gap-2">
                    {TABS.filter(t => t.key !== 'configuracion' && t.key !== seccion).map(tab => (
                      <button
                        key={tab.key}
                        onClick={() => setSeccion(tab.key)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-300"
                        style={{ border: '1px solid rgba(248,250,252,0.05)', color: '#64748B' }}
                        onMouseEnter={e => {
                          e.currentTarget.style.background = `${tab.color}10`;
                          e.currentTarget.style.borderColor = `${tab.color}30`;
                          e.currentTarget.style.color = '#E2E8F0';
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.borderColor = 'rgba(248,250,252,0.05)';
                          e.currentTarget.style.color = '#64748B';
                        }}
                      >
                        <span style={{ color: tab.color }}>{tab.icon}</span>
                        <span className="text-sm font-semibold">{tab.label}</span>
                      </button>
                    ))}
                    <button
                      onClick={() => setSeccion('configuracion')}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-300 mt-1"
                      style={{ border: '1px solid rgba(245,158,11,0.15)', color: 'rgba(245,158,11,0.5)' }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = 'rgba(245,158,11,0.08)';
                        e.currentTarget.style.borderColor = 'rgba(245,158,11,0.35)';
                        e.currentTarget.style.color = '#F59E0B';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.borderColor = 'rgba(245,158,11,0.15)';
                        e.currentTarget.style.color = 'rgba(245,158,11,0.5)';
                      }}
                    >
                      <span style={{ color: '#F59E0B' }}>{TABS[3].icon}</span>
                      <span className="text-sm font-semibold">Configuración</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Admin;
