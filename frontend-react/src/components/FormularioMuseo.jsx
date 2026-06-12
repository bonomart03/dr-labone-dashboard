import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { API_URL } from '../lib/api';
import SubirImagen from './SubirImagen';

const FormularioMuseo = ({ alTerminar, itemEditar }) => {
    const [nombre, setNombre] = useState('');
    const [anio, setAnio] = useState('');
    const [imagenUrl, setImagenUrl] = useState('');
    const [descripcion, setDescripcion] = useState('');

    const editando = !!itemEditar;

    useEffect(() => {
        if (itemEditar) {
            setNombre(itemEditar.nombre || '');
            setAnio(itemEditar.anio || '');
            setImagenUrl(itemEditar.imagenAntesUrl || itemEditar.imagenUrl || '');
            setDescripcion(itemEditar.descripcion || '');
        }
    }, [itemEditar]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const datos = { nombre, anio: parseInt(anio), imagenAntesUrl: imagenUrl, imagenDespuesUrl: imagenUrl, descripcion };
        const config = { headers: { 'Authorization': localStorage.getItem('dr_labone_token') } };

        try {
            if (editando) {
                await axios.put(`${API_URL}/api/museo/${itemEditar.id}`, datos, config);
                toast.success('Proyecto del Museo actualizado.');
            } else {
                await axios.post(`${API_URL}/api/museo`, datos, config);
                toast.success('¡Proyecto del Museo guardado!');
            }
            setNombre(''); setAnio(''); setImagenUrl(''); setDescripcion('');
            alTerminar();
        } catch (error) {
            toast.error('Error al guardar el proyecto.');
        }
    };

    return (
        <div style={{ backgroundColor: '#111', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem', border: '1px solid #444' }}>
            <h3 style={{ color: '#FFD700', marginTop: 0 }}>
                {editando ? `Editando: ${itemEditar.nombre}` : 'Añadir al Museo de Restauraciones'}
            </h3>
            <form onSubmit={handleSubmit} className="grid gap-[10px] grid-cols-1 sm:grid-cols-2">
                <input type="text" placeholder="Nombre del Objeto / Proyecto" value={nombre} onChange={(e) => setNombre(e.target.value)} required style={styles.input} />
                <input type="number" placeholder="Año del Modelo / Proyecto" value={anio} onChange={(e) => setAnio(e.target.value)} required style={styles.input} />
                <div className="sm:col-span-2">
                    <SubirImagen value={imagenUrl} onChange={setImagenUrl} label="Imagen del proyecto 📸" />
                </div>
                <textarea placeholder="Detalles de la restauración..." value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required className="sm:col-span-2" style={{ ...styles.input, minHeight: '80px' }} />
                <button type="submit" className="sm:col-span-2" style={editando ? styles.btnEditar : styles.btnAccion}>
                    {editando ? 'Actualizar Proyecto' : 'Guardar en Museo'}
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

export default FormularioMuseo;
