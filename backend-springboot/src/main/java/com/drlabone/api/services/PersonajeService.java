package com.drlabone.api.services;

import com.drlabone.api.models.Personaje;
import com.drlabone.api.repositories.PersonajeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PersonajeService {

    @Autowired
    private PersonajeRepository repository;

    public List<Personaje> obtenerTodos() {
        return repository.findAll();
    }

    public Personaje buscarPorId(Long id) {
        return repository.findById(id).orElseThrow(() -> new RuntimeException("Personaje no encontrado"));
    }

    public Personaje guardar(Personaje personaje) {
        return repository.save(personaje);
    }

    public Personaje actualizar(Long id, Personaje detalles) {
        Personaje existente = buscarPorId(id);
        existente.setNombre(detalles.getNombre());
        existente.setTipo(detalles.getTipo());
        existente.setDescripcion(detalles.getDescripcion());
        existente.setImagenUrl(detalles.getImagenUrl());
        existente.setAudioEasterEggUrl(detalles.getAudioEasterEggUrl());
        return repository.save(existente);
    }

    public void eliminar(Long id) {
        repository.deleteById(id);
    }
}