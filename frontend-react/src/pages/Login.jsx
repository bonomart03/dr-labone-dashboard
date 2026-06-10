import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => { document.title = 'Acceso Clasificado — Dr. Labone'; }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'drlabone' && password === 'multiverso2026') {
      const token = 'Basic ' + btoa(`${username}:${password}`);
      localStorage.setItem('dr_labone_token', token);
      toast.success('¡Acceso concedido a la Central de Mando!');
      navigate('/admin');
    } else {
      toast.error('Credenciales incorrectas. El guardia del multiverso no te deja pasar.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh] px-4 py-10">
      <div className="w-full max-w-sm rounded-xl text-center px-6 py-8 sm:px-10 sm:py-10"
        style={{
          backgroundColor: '#1a1a1a',
          borderTop: '4px solid #FFD700',
          boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
        }}>
        <h2 className="text-xl sm:text-2xl font-black uppercase tracking-widest mb-2"
          style={{ color: '#FFD700' }}>
          🔐 Acceso al Multiverso
        </h2>
        <p className="text-zinc-500 text-sm mb-6">
          Ingresá tus credenciales de Súper Admin
        </p>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            className="w-full px-4 py-3 rounded text-sm outline-none"
            style={{ backgroundColor: '#111', border: '1px solid #444', color: '#fff' }}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 rounded text-sm outline-none"
            style={{ backgroundColor: '#111', border: '1px solid #444', color: '#fff' }}
          />
          <button
            type="submit"
            className="w-full py-3 rounded font-black text-sm uppercase tracking-widest transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#FFD700', color: '#000' }}
          >
            Ingresar a la Central
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
