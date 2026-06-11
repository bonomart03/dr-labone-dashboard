import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { API_URL } from '../lib/api';
import SubirImagen from './SubirImagen';

const FormularioGta = ({ alTerminar, itemEditar }) => {
    const [titulo, setTitulo] = useState('');
    const [juego, setJuego] = useState('GTA San Andreas');
    const [categoria, setCategoria] = useState('Misterio');
    const [imagenUrl, setImagenUrl] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [descripcion, setDescripcion] = useState('');

    const editando = !!itemEditar;

    useEffect(() => {
        if (itemEditar) {
            setTitulo(itemEditar.titulo || '');
            setJuego(itemEditar.juego || 'GTA San Andreas');
            setCategoria(itemEditar.categoria || 'Misterio');
            setImagenUrl(itemEditar.imagenUrl || '');
            setVideoUrl(itemEditar.videoUrl || '');
            setDescripcion(itemEditar.descripcion || '');
        }
    }, [itemEditar]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const datos = { titulo, juego, categoria, imagenUrl, videoUrl, descripcion, publicado: true };
        const config = { headers: { 'Authorization': localStorage.getItem('dr_labone_token') } };

        try {
            if (editando) {
                await axios.put(`${API_URL}/api/gta/${itemEditar.id}`, datos, config);
                toast.success('Registro GTA actualizado.');
            } else {
                await axios.post(`${API_URL}/api/gta`, datos, config);
                toast.success('¡Registro de GTA creado!');
            }
            setTitulo(''); setImagenUrl(''); setVideoUrl(''); setDescripcion('');
            alTerminar();
        } catch (error) {
            toast.error('Error al guardar el registro.');
        }
    };

    return (
        <div style={{ backgroundColor: '#111', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem', border: '1px solid #444' }}>
            <h3 style={{ color: '#FFD700', marginTop: 0 }}>
                {editando ? `Editando: ${itemEditar.titulo}` : 'Añadir al Archivo GTA'}
            </h3>
            <form onSubmit={handleSubmit} className="grid gap-[10px] grid-cols-1 sm:grid-cols-2">
                <input type="text" placeholder="Título del Misterio/Easter Egg" value={titulo} onChange={(e) => setTitulo(e.target.value)} required style={styles.input} />
                <select value={juego} onChange={(e) => setJuego(e.target.value)} style={styles.input}>
                    <option value="GTA San Andreas">GTA San Andreas</option>
                    <option value="GTA Vice City">GTA Vice City</option>
                    <option value="GTA V">GTA V</option>
                    <option value="GTA IV">GTA IV</option>
                </select>
                <input type="text" placeholder="Categoría (Ej: Easter Egg, Mito)" value={categoria} onChange={(e) => setCategoria(e.target.value)} required style={styles.input} />
                <SubirImagen value={imagenUrl} onChange={setImagenUrl} label="Imagen miniatura" />
                <input type="text" placeholder="URL del Video de YouTube (Opcional)" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} className="sm:col-span-2" style={styles.input} />
                <textarea placeholder="Descripción detallada del hallazgo..." value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required className="sm:col-span-2" style={{ ...styles.input, minHeight: '80px' }} />
                <button type="submit" className="sm:col-span-2" style={editando ? styles.btnEditar : styles.btnAccion}>
                    {editando ? 'Actualizar Registro' : 'Guardar en Archivo'}
                </button>
            </form>
        </div>
    );
};

const styles = {
    input: { padding: '0.8rem', borderRadius: '4px', border: '1px solid #444', backgroundColor: '#222', color: '#fff' },
    btnAccion: { padding: '0.8rem 1.5rem', backgroundColor: '#28a745', color: '#fff', fontWeight: 'bold', border: 'none', borderRadius: '4px', cursor: 'pointer' },
    btnEditar: { padding: '0.8rem 1.5rem', backgroundColor: '#2563eb', color: '#fff', fontWeight: 'bold', border: 'none', borderRadius: '4px', cursor: 'pointer' },
};

export default FormularioGta;
