package com.drlabone.api.services;

import com.drlabone.api.models.ObjetoMuseo;
import com.drlabone.api.repositories.ObjetoMuseoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ObjetoMuseoService {

    @Autowired
    private ObjetoMuseoRepository repository;

    public List<ObjetoMuseo> obtenerTodos() {
        return repository.findAll();
    }

    public ObjetoMuseo buscarPorId(Long id) {
        // Si no encuentra el ID, lanza una excepción rápida
        return repository.findById(id).orElseThrow(() -> new RuntimeException("Objeto de museo no encontrado"));
    }

    public ObjetoMuseo guardar(ObjetoMuseo objeto) {
        return repository.save(objeto);
    }

    public ObjetoMuseo actualizar(Long id, ObjetoMuseo detalles) {
        ObjetoMuseo objetoExistente = buscarPorId(id);
        
        objetoExistente.setNombre(detalles.getNombre());
        objetoExistente.setDescripcion(detalles.getDescripcion());
        objetoExistente.setAnio(detalles.getAnio());
        objetoExistente.setImagenAntesUrl(detalles.getImagenAntesUrl());
        objetoExistente.setImagenDespuesUrl(detalles.getImagenDespuesUrl());
        
        return repository.save(objetoExistente);
    }

    public void eliminar(Long id) {
        repository.deleteById(id);
    }
}