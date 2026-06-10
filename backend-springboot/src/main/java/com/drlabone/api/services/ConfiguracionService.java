package com.drlabone.api.services;

import com.drlabone.api.models.Configuracion;
import com.drlabone.api.repositories.ConfiguracionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ConfiguracionService {

    @Autowired
    private ConfiguracionRepository repository;

    // Busca el video, y si la tabla está vacía, devuelve un video por defecto para que no se rompa la página
    public String obtenerVideoInicio() {
        return repository.findById("VIDEO_INICIO")
                .map(Configuracion::getValor)
                .orElse("https://www.youtube.com/embed/n4RjJKxsamQ"); 
    }

    // Guarda o pisa la URL existente
    public Configuracion guardarVideoInicio(String nuevaUrl) {
        Configuracion config = new Configuracion("VIDEO_INICIO", nuevaUrl);
        return repository.save(config);
    }
}