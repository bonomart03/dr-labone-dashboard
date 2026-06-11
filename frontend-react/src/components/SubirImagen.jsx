import { useState, useRef } from 'react';

const CLOUD_NAME = 'dwczdrevc';
const UPLOAD_PRESET = 'xcvzpqdl';

const SubirImagen = ({ value, onChange, label = 'Imagen', placeholder = 'Clic o arrastrá una imagen' }) => {
  const [subiendo, setSubiendo] = useState(false);
  const [progreso, setProgreso] = useState(0);
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  const subir = async (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Solo se permiten imágenes.');
      return;
    }
    setSubiendo(true);
    setError('');
    setProgreso(0);

    const fd = new FormData();
    fd.append('file', file);
    fd.append('upload_preset', UPLOAD_PRESET);

    try {
      const xhr = new XMLHttpRequest();
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) setProgreso(Math.round((e.loaded / e.total) * 100));
      };
      await new Promise((resolve, reject) => {
        xhr.onload = () => {
          const data = JSON.parse(xhr.responseText);
          if (data.secure_url) { onChange(data.secure_url); resolve(); }
          else reject(new Error('Sin URL'));
        };
        xhr.onerror = reject;
        xhr.open('POST', `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`);
        xhr.send(fd);
      });
    } catch {
      setError('Error al subir. Intentá de nuevo.');
    } finally {
      setSubiendo(false);
      setProgreso(0);
    }
  };

  const onDrop = (e) => {
    e.preventDefault();
    subir(e.dataTransfer.files[0]);
  };

  const borderColor = error ? '#ef4444' : subiendo ? '#FFD700' : '#3f3f46';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>

      <span style={{ color: '#71717a', fontSize: '0.7rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
        {label}
      </span>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={e => subir(e.target.files[0])}
      />

      {value ? (
        <div style={{ position: 'relative', borderRadius: '6px', overflow: 'hidden', border: `1px solid ${borderColor}` }}>
          <img
            src={value}
            alt="preview"
            style={{ width: '100%', height: '100px', objectFit: 'cover', display: 'block' }}
          />
          {/* Barra de progreso al re-subir */}
          {subiendo && (
            <div style={{ position: 'absolute', bottom: 0, left: 0, height: '3px', background: '#FFD700', width: `${progreso}%`, transition: 'width 0.2s' }} />
          )}
          {/* Overlay "Cambiar" */}
          <button
            type="button"
            onClick={() => inputRef.current.click()}
            disabled={subiendo}
            style={{
              position: 'absolute', inset: 0, width: '100%', background: 'rgba(0,0,0,0.55)',
              color: '#fff', border: 'none', cursor: subiendo ? 'default' : 'pointer',
              fontSize: '0.7rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.15em',
              opacity: 0, transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = 1; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = 0; }}
          >
            {subiendo ? `${progreso}%` : '↑ Cambiar'}
          </button>
        </div>
      ) : (
        <div
          onClick={() => !subiendo && inputRef.current.click()}
          onDrop={onDrop}
          onDragOver={e => e.preventDefault()}
          style={{
            border: `2px dashed ${borderColor}`,
            borderRadius: '6px',
            padding: '18px 10px',
            textAlign: 'center',
            cursor: subiendo ? 'default' : 'pointer',
            background: subiendo ? 'rgba(255,215,0,0.03)' : '#0d0d0d',
            transition: 'border-color 0.2s',
            position: 'relative',
            overflow: 'hidden',
          }}
          onMouseEnter={e => { if (!subiendo) e.currentTarget.style.borderColor = '#71717a'; }}
          onMouseLeave={e => { if (!subiendo) e.currentTarget.style.borderColor = borderColor; }}
        >
          {subiendo ? (
            <div>
              <div style={{ color: '#FFD700', fontSize: '0.78rem', fontWeight: '700', marginBottom: '6px' }}>
                Subiendo {progreso}%
              </div>
              <div style={{ height: '3px', background: '#27272a', borderRadius: '9px', overflow: 'hidden' }}>
                <div style={{ height: '100%', background: '#FFD700', width: `${progreso}%`, transition: 'width 0.2s', borderRadius: '9px' }} />
              </div>
            </div>
          ) : (
            <>
              <svg viewBox="0 0 24 24" fill="none" stroke="#52525b" strokeWidth="1.5" style={{ width: 24, height: 24, margin: '0 auto 6px' }}>
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
              <div style={{ color: '#52525b', fontSize: '0.72rem' }}>{placeholder}</div>
            </>
          )}
        </div>
      )}

      {error && <span style={{ color: '#ef4444', fontSize: '0.68rem' }}>{error}</span>}
    </div>
  );
};

export default SubirImagen;
