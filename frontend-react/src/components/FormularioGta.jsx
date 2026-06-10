import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

const FormularioGta = ({ alTerminar }) => {
    const [titulo, setTitulo] = useState('');
    const [juego, setJuego] = useState('GTA San Andreas');
    const [categoria, setCategoria] = useState('Misterio');
    const [imagenUrl, setImagenUrl] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [descripcion, setDescripcion] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const nuevoRegistro = { titulo, juego, categoria, imagenUrl, videoUrl, descripcion, publicado: true };

        try {
            const config = { headers: { 'Authorization': localStorage.getItem('dr_labone_token') } };
            await axios.post('http://localhost:8080/api/gta', nuevoRegistro, config);
            
            toast.success("¡Registro de GTA creado con éxito!");
            
            setTitulo(''); setImagenUrl(''); setVideoUrl(''); setDescripcion('');
            alTerminar(); 
        } catch (error) {
            console.error("Error al guardar en GTA:", error);
            toast.error("Hubo un error al guardar el registro.");
        }
    };

    return (
        <div style={{ backgroundColor: '#111', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem', border: '1px solid #444' }}>
            <h3 style={{ color: '#FFD700', marginTop: 0 }}>Añadir al Archivo GTA</h3>
            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '10px', gridTemplateColumns: '1fr 1fr' }}>
                <input type="text" placeholder="Título del Misterio/Easter Egg" value={titulo} onChange={(e) => setTitulo(e.target.value)} required style={styles.input} />
                <select value={juego} onChange={(e) => setJuego(e.target.value)} style={styles.input}>
                    <option value="GTA San Andreas">GTA San Andreas</option>
                    <option value="GTA Vice City">GTA Vice City</option>
                    <option value="GTA V">GTA V</option>
                    <option value="GTA IV">GTA IV</option>
                </select>
                <input type="text" placeholder="Categoría (Ej: Easter Egg, Mito)" value={categoria} onChange={(e) => setCategoria(e.target.value)} required style={styles.input} />
                <input type="text" placeholder="URL de la Imagen (Miniatura)" value={imagenUrl} onChange={(e) => setImagenUrl(e.target.value)} style={styles.input} />
                <input type="text" placeholder="URL del Video de YouTube (Opcional)" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} style={{ ...styles.input, gridColumn: 'span 2' }} />
                <textarea placeholder="Descripción detallada del hallazgo..." value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required style={{ ...styles.input, gridColumn: 'span 2', minHeight: '80px' }} />
                <button type="submit" style={{ ...styles.btnAccion, gridColumn: 'span 2' }}>Guardar en Archivo</button>
            </form>
        </div>
    );
};

const styles = {
    input: { padding: '0.8rem', borderRadius: '4px', border: '1px solid #444', backgroundColor: '#222', color: '#fff' },
    btnAccion: { padding: '0.8rem 1.5rem', backgroundColor: '#28a745', color: '#fff', fontWeight: 'bold', border: 'none', borderRadius: '4px', cursor: 'pointer' }
};

export default FormularioGta;