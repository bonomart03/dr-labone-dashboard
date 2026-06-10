package com.drlabone.api.controllers;

import com.drlabone.api.models.ObjetoMuseo;
import com.drlabone.api.services.ObjetoMuseoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/museo")
public class ObjetoMuseoController {

    @Autowired
    private ObjetoMuseoService service;

    @GetMapping
    public ResponseEntity<List<ObjetoMuseo>> listarObjetos() {
        return ResponseEntity.ok(service.obtenerTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ObjetoMuseo> obtenerObjeto(@PathVariable Long id) {
        return ResponseEntity.ok(service.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<ObjetoMuseo> crearObjeto(@Valid @RequestBody ObjetoMuseo objeto) {
        return new ResponseEntity<>(service.guardar(objeto), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ObjetoMuseo> actualizarObjeto(
            @PathVariable Long id, 
            @Valid @RequestBody ObjetoMuseo detalles) {
        return ResponseEntity.ok(service.actualizar(id, detalles));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarObjeto(@PathVariable Long id) {
        service.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}