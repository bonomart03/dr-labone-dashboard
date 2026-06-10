package com.drlabone.api.services;

import com.drlabone.api.models.ArchivoGta;
import com.drlabone.api.repositories.ArchivoGtaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ArchivoGtaService {

    @Autowired
    private ArchivoGtaRepository repository;

    public List<ArchivoGta> obtenerTodos() {
        return repository.findAll();
    }

    public ArchivoGta guardar(ArchivoGta item) {
        return repository.save(item);
    }
    
    public void eliminar(Long id) {
        repository.deleteById(id);
    }
}