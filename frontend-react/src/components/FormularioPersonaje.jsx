import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { API_URL } from '../lib/api';

const FormularioPersonaje = ({ alTerminar }) => {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [imagenUrl, setImagenUrl] = useState('');
    const [tipo, setTipo] = useState('TRIBUTO');
    const [audioUrl, setAudioUrl] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const nuevoPersonaje = { nombre, descripcion, imagenUrl, tipo, audioEasterEggUrl: audioUrl };

        try {
            const config = { headers: { 'Authorization': localStorage.getItem('dr_labone_token') } };
            await axios.post(`${API_URL}/api/personajes`, nuevoPersonaje, config);
            
            toast.success("¡Personaje creado con éxito en el Multiverso!");
            
            setNombre(''); setDescripcion(''); setImagenUrl(''); setAudioUrl(''); setTipo('TRIBUTO');
            alTerminar(); 
        } catch (error) {
            console.error("Error al guardar:", error);
            toast.error("Hubo un error al guardar el personaje.");
        }
    };

    return (
        <div style={{ backgroundColor: '#111', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem', border: '1px solid #444' }}>
            <h3 style={{ color: '#FFD700', marginTop: 0 }}>Añadir Nuevo Personaje</h3>
            <form onSubmit={handleSubmit} className="grid gap-[10px] grid-cols-1 sm:grid-cols-2">
                <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required style={styles.input} />
                <select value={tipo} onChange={(e) => setTipo(e.target.value)} style={styles.input}>
                    <option value="TRIBUTO">Tributo</option>
                    <option value="MASCOTA">Mascota</option>
                    <option value="MUÑECO">Muñeco</option>
                </select>
                <input type="text" placeholder="URL de la Imagen" value={imagenUrl} onChange={(e) => setImagenUrl(e.target.value)} required style={styles.input} />
                <input type="text" placeholder="URL del Audio (Opcional)" value={audioUrl} onChange={(e) => setAudioUrl(e.target.value)} style={styles.input} />
                <textarea placeholder="Descripción del personaje..." value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required className="sm:col-span-2" style={{ ...styles.input, minHeight: '80px' }} />
                <button type="submit" className="sm:col-span-2" style={styles.btnAccion}>Guardar Personaje</button>
            </form>
        </div>
    );
};

const styles = {
    input: { padding: '0.8rem', borderRadius: '4px', border: '1px solid #444', backgroundColor: '#222', color: '#fff' },
    btnAccion: { padding: '0.8rem 1.5rem', backgroundColor: '#28a745', color: '#fff', fontWeight: 'bold', border: 'none', borderRadius: '4px', cursor: 'pointer' }
};

export default FormularioPersonaje;