import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner'; // <-- IMPORTAMOS LA HERRAMIENTA ACÁ

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === 'drlabone' && password === 'multiverso2026') {
      const token = 'Basic ' + btoa(`${username}:${password}`);
      localStorage.setItem('dr_labone_token', token);
      
      // <-- REEMPLAZAMOS EL ALERT POR TOAST.SUCCESS
      toast.success('¡Acceso concedido a la Central de Mando! 🚀'); 
      navigate('/admin');
    } else {
      // <-- REEMPLAZAMOS EL ALERT POR TOAST.ERROR
      toast.error('Credenciales incorrectas. El guardia del multiverso no te deja pasar. ❌'); 
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>🔐 Acceso al Multiverso</h2>
        <p style={styles.subtitle}>Ingresá tus credenciales de Súper Admin</p>
        
        <form onSubmit={handleLogin} style={styles.form}>
          <input 
            type="text" 
            placeholder="Usuario" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            style={styles.input} 
            required 
          />
          <input 
            type="password" 
            placeholder="Contraseña" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            style={styles.input} 
            required 
          />
          <button type="submit" style={styles.button}>Ingresar a la Central</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh', color: '#fff' },
  card: { backgroundColor: '#1a1a1a', padding: '2.5rem', borderRadius: '10px', borderTop: '4px solid #FFD700', boxShadow: '0 8px 16px rgba(0,0,0,0.5)', width: '100%', maxWidth: '400px', textAlign: 'center' },
  title: { color: '#FFD700', margin: '0 0 10px 0', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '1.6rem' },
  subtitle: { color: '#888', margin: '0 0 2rem 0', fontSize: '0.9rem' },
  form: { display: 'flex', flexDirection: 'column', gap: '1.2rem' },
  input: { padding: '0.8rem', borderRadius: '4px', border: '1px solid #444', backgroundColor: '#111', color: '#fff', fontSize: '1rem', outline: 'none' },
  button: { padding: '1rem', backgroundColor: '#FFD700', color: '#000', fontWeight: 'bold', border: 'none', borderRadius: '4px', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '1px' }
};

export default Login;