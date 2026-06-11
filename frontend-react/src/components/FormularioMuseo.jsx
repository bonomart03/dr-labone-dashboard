import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { API_URL } from '../lib/api';
import SubirImagen from './SubirImagen';

const FormularioMuseo = ({ alTerminar }) => {
    const [nombre, setNombre] = useState('');
    const [anio, setAnio] = useState('');
    const [imagenAntesUrl, setImagenAntesUrl] = useState('');
    const [imagenDespuesUrl, setImagenDespuesUrl] = useState('');
    const [descripcion, setDescripcion] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const nuevaRestauracion = { nombre, anio: parseInt(anio), imagenAntesUrl, imagenDespuesUrl, descripcion };

        try {
            const config = { headers: { 'Authorization': localStorage.getItem('dr_labone_token') } };
            await axios.post(`${API_URL}/api/museo`, nuevaRestauracion, config);
            
            toast.success("¡Proyecto del Museo guardado con éxito!");
            
            setNombre(''); setAnio(''); setImagenAntesUrl(''); setImagenDespuesUrl(''); setDescripcion('');
            alTerminar(); 
        } catch (error) {
            console.error("Error al guardar en el Museo:", error);
            toast.error("Hubo un error al guardar el proyecto de restauración.");
        }
    };

    return (
        <div style={{ backgroundColor: '#111', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem', border: '1px solid #444' }}>
            <h3 style={{ color: '#FFD700', marginTop: 0 }}>Añadir al Museo de Restauraciones</h3>
            <form onSubmit={handleSubmit} className="grid gap-[10px] grid-cols-1 sm:grid-cols-2">
                <input type="text" placeholder="Nombre del Objeto / Proyecto" value={nombre} onChange={(e) => setNombre(e.target.value)} required style={styles.input} />
                <input type="number" placeholder="Año del Modelo / Proyecto" value={anio} onChange={(e) => setAnio(e.target.value)} required style={styles.input} />
                <SubirImagen value={imagenAntesUrl} onChange={setImagenAntesUrl} label="Imagen: Antes 📸" />
                <SubirImagen value={imagenDespuesUrl} onChange={setImagenDespuesUrl} label="Imagen: Después ✨" />
                <textarea placeholder="Detalles de la restauración, modificaciones y proceso..." value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required className="sm:col-span-2" style={{ ...styles.input, minHeight: '80px' }} />
                <button type="submit" className="sm:col-span-2" style={styles.btnAccion}>Guardar en Museo</button>
            </form>
        </div>
    );
};

const styles = {
    input: { padding: '0.8rem', borderRadius: '4px', border: '1px solid #444', backgroundColor: '#222', color: '#fff' },
    btnAccion: { padding: '0.8rem 1.5rem', backgroundColor: '#28a745', color: '#fff', fontWeight: 'bold', border: 'none', borderRadius: '4px', cursor: 'pointer' }
};

export default FormularioMuseo;