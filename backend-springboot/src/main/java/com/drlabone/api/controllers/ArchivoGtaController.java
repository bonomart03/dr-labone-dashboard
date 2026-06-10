package com.drlabone.api.controllers;

import com.drlabone.api.models.ArchivoGta;
import com.drlabone.api.services.ArchivoGtaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/gta")
public class ArchivoGtaController {

    @Autowired
    private ArchivoGtaService service;

    @GetMapping
    public ResponseEntity<List<ArchivoGta>> listarArchivo() {
        return ResponseEntity.ok(service.obtenerTodos());
    }

    @PostMapping
    public ResponseEntity<ArchivoGta> crearEntrada(@Valid @RequestBody ArchivoGta item) {
        return new ResponseEntity<>(service.guardar(item), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ArchivoGta> actualizarEntrada(@PathVariable Long id, @RequestBody ArchivoGta itemActualizado) {
        // Le forzamos el ID de la ruta al objeto para que Hibernate entienda que es un UPDATE y no un INSERT nuevo
        itemActualizado.setId(id);
        return ResponseEntity.ok(service.guardar(itemActualizado));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarEntrada(@PathVariable Long id) {
        service.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}