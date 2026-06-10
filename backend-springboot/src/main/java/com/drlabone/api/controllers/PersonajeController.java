package com.drlabone.api.controllers;

import com.drlabone.api.models.Personaje;
import com.drlabone.api.services.PersonajeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/personajes")
public class PersonajeController {

    @Autowired
    private PersonajeService personajeService;

    // ==========================================
    //   ENDPOINTS (Temporales sin seguridad)
    // ==========================================

    @GetMapping
    public ResponseEntity<List<Personaje>> listarPersonajes() {
        List<Personaje> personajes = personajeService.obtenerTodos();
        return ResponseEntity.ok(personajes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Personaje> obtenerPersonajePorId(@PathVariable Long id) {
        Personaje personaje = personajeService.buscarPorId(id);
        return ResponseEntity.ok(personaje);
    }

    @PostMapping
    public ResponseEntity<Personaje> crearPersonaje(@Valid @RequestBody Personaje personaje) {
        Personaje nuevoPersonaje = personajeService.guardar(personaje);
        return new ResponseEntity<>(nuevoPersonaje, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Personaje> actualizarPersonaje(
            @PathVariable Long id, 
            @Valid @RequestBody Personaje detallesPersonaje) {
        
        Personaje personajeActualizado = personajeService.actualizar(id, detallesPersonaje);
        return ResponseEntity.ok(personajeActualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarPersonaje(@PathVariable Long id) {
        personajeService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}