package com.drlabone.api.controllers;

import com.drlabone.api.models.Configuracion;
import com.drlabone.api.services.ConfiguracionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Map;

@RestController
@RequestMapping("/api/configuracion")
public class ConfiguracionController {

    @Autowired
    private ConfiguracionService service;

    // Endpoint para que React pida el video
    @GetMapping("/video")
    public Map<String, String> obtenerVideo() {
        String url = service.obtenerVideoInicio();
        return Collections.singletonMap("url", url);
    }

    // Endpoint para que el Panel de Control actualice el video
    @PostMapping("/video")
    public Configuracion actualizarVideo(@RequestBody Map<String, String> payload) {
        return service.guardarVideoInicio(payload.get("url"));
    }
}